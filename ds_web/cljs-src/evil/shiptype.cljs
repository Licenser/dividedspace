(ns evil.shiptype
  (:require
   [evil.ajaj :as ajaj]
   [evil.dom :as dom]
   [evil.script :as script]))

(def modules (atom {}))

(def shiptype (atom {}))

(defn do-list [fun]
  (ajaj/do-ajaj
   "/shiptype"
           (fn [res]
             (fun res))))

(defn do-get [id fun]
  (ajaj/do-ajaj
   (str "/shiptype/" id)
   (fn [res]
     (fun res))))

(defn expand-module [{name "name" :as m}]
  (assoc (get @modules name) "id" (m "id")))

(defn set-shiptype! [s]
  (reset! shiptype (update-in
                    s
                    ["modules"]
                    #(map expand-module %))))

(defn shiptype-hull [s]
  (first (filter #(= "hull" (% "type"))
                  (s "modules"))))

(defn shiptype-size [s]
  [(reduce
    +
    (map #(get % "size")
         (filter #(not= "hull" (% "type"))
                 (s "modules"))))
   (if-let [h (shiptype-hull s)]
     (h "size")
     0)])

(defn shiptype-update-size! [s]
  (let [[used total] (shiptype-size s)]
    (dom/text (dom/select (str "#shiptype-" (s "id") "-size"))
              (str used "/" total))))

(defn module-line [ship-id m]
  (let [id (str "shiptype-" ship-id "-module-" (m "id"))]                                
                                [:tr
                                 {:id id}
                                 [:td (m "name")]
                                 [:td (get-in @modules  [(m "name") "size"])]
                                 [:td
                                  {:click (fn []
                                            (ajaj/del-clj
                                             (str "/api/v1/user/"
                                                  evil.ajaj.uid
                                                  "/shiptype/" ship-id "/module/" (m "id"))
                                             (fn []
                                               (swap! shiptype
                                                      update-in ["modules"]
                                                      (fn [ms]
                                                        (filter #(not= (m "id") (% "id")) ms)))
                                               (shiptype-update-size! @shiptype)
                                               (dom/del (dom/select (str "#" id))))))}
                                  "del"]]))

(defn add-module-fn [s]
  (fn []
    (let [module-name (dom/val (dom/select (str "#shiptype-" (s "id") "-module-select")))
          module (get @modules module-name)
          [used total] (shiptype-size @shiptype)]
      (cond
       (and
        (= "hull" (module "type"))
        (not (nil? (shiptype-hull @shiptype))))
       (js/alert "A ship can only have one Hull.")
       
       (and
        (not= "hull" (module "type"))
        (> (+ used (module "size")) total))
       (js/alert "Not enough space left in the Ship.")
       :else                                      
       (ajaj/post-clj
        (str "/api/v1/user/"
             evil.ajaj.uid
             "/shiptype/" (s "id") "/module")
        {"ship_id" (s "id")
         "name" module-name
         "user_id" evil.ajaj.uid}
        (fn [m]
          (let [m (expand-module m)]
            (swap! shiptype update-in ["modules"] conj m)
            (shiptype-update-size! @shiptype)
            (dom/append
             (dom/select (str "#shiptype-" (s "id") "-module"))
             (dom/c (module-line (s "id") m))))))))))

(defn module-section [s]
  (vec (concat
        [:table
         {:id (str "shiptype-" (s "id") "-module")}
         [:tr [:td (vec
                    (concat
                     [:select
                      {:id (str "shiptype-" (s "id") "-module-select")}
                      [:option]]
                     (map
                      (fn [[n m]]
                        [:option
                         {:value n}
                         (str (m "type") " - " n " (" (m "size") ")")])
                      @modules)))]
          [:td
           {:click (add-module-fn s)}
           "add"]]]
        (vec (map
              (fn [m]
                (module-line (s "id") m))
              (s "modules"))))))


(defn save-fn [entity]
  (fn []))

(defn show-shiptype-fn [entity]
  (fn []        
    (do-get
     (entity "id")
     (fn [s]
       (let [s (set-shiptype! s)
             center (dom/select "#center")
             [used total] (shiptype-size s)]
         (dom/clear center)
         (dom/append
          center
          (dom/c
           [:div
            [:span "Name:"]
            [:input {:type "text"
                     :id (str "shiptype-" (s "id") "-name")
                     :value (s "name")}] [:br]
            [:select
             {:id (str "shiptype-" (s "id") "-script-select")}
             [:option]]
            [:input {:type "submit"
                     :value "Save"
                     :click (save-fn entity)}] [:br]
            [:span "Size: " [:span {:id (str "shiptype-" (s "id") "-size")} used "/" total]] [:br]
            [:span "Modules"] [:br]
            (module-section s)]))
         (script/do-list
          (fn [scripts]
            (let [select (dom/select (str "#shiptype-" (s "id") "-script-select"))]
              (doall
               (map #(dom/append select
                                 (dom/c
                                  [:option
                                   {:value (% "id")}
                                   (% "name")]))
                    scripts))))))))))

(defn del-shiptype-fn [entity]
  (fn []
    (ajaj/del-clj
     (str "/api/v1/user/" evil.ajaj.uid "/shiptype/" (entity "id"))
     (fn []
       (dom/del
        (dom/select (str "#shiptype-" (entity "id"))))))))

(defn add-shiptype
  ([entity]
     (add-shiptype (dom/select (str "div#shiptype")) entity))
  ([div entity]
     (let [c (dom/c
              [:div
               {:id (str "shiptype-" (entity "id"))}
               [:span
                {:click (show-shiptype-fn entity)
                 :name (str "shiptype-" (entity "id") "-name")}
                (or (entity "name") "-")]
               [:span
                {:click (del-shiptype-fn entity)}
                " del"]
               [:br]
               ])
           del (dom/c [:span ])]
       (dom/append div c))))

; External Functions

(defn update-shiptypes []
  (let [div (dom/select (str "div#shiptype"))]
    (dom/clear div)
    (dom/append
     div
     (dom/c
      [:span
       [:input {:id "shiptype-new-input"}]
       [:span
        {:click
         (fn []
           (ajaj/post-clj
            (str "/api/v1/user/"
                 evil.ajaj.uid
                 "/shiptype")
            {"user_id" evil.ajaj.uid
             "script_id" nil
             "name" (dom/val (dom/select "#shiptype-new-input"))}
            add-shiptype)
           )} "add"]    
       [:Br]]))
      (do-list
       (fn [res]
         (dorun
          (map (partial add-shiptype div) res))))))

(defn fetch-modules []
  (ajaj/get-clj
   "/api/v1/moduletype"
   (fn [module-types]
     (doall
      (map
       (fn [module-type]
         (ajaj/get-clj
          (str "/api/v1/moduletype/" module-type)
          (fn [r]
            (swap!
             modules
             (fn [m]
               (reduce
                (fn [m o]
                  (assoc m (o "name") o))
                m
                r))))))
       module-types)))))