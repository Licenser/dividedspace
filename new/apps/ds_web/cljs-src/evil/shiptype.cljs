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

(defn modules-of-type [modules type]
  (filter #(= type (% "type")) modules))

(defn test-hull [modules]
  (if (empty? (modules-of-type modules "hull"))
    ["No hull defined"]))

(defn test-weapon [modules]
  (if (empty? (modules-of-type modules "weapon"))
    ["No weapon defined"]))

(defn test-generator [modules]
  (if (empty? (modules-of-type modules "generator"))
    ["No generator defined"]))

(defn test-engine [modules]
  (if (empty? (modules-of-type modules "engine"))
    ["No engine defined"]))

(defn test-script [entity]
  (if (empty? (dom/val (str "#shiptype-" (entity "id") "-script-select")))
    ["No script defined."]))

(defn module-warnings [modules]

  (concat
   []
   (test-hull modules)
   (test-weapon modules)
   (test-generator modules)
   (test-engine modules)))


(defn warnings [shiptype]

  (let [ws (concat
            (module-warnings (shiptype "modules"))
            (test-script shiptype))]
    (dom/clear "#shiptype-warnings")
    (dom/append
     "#shiptype-warnings"
     (dom/c 
      (vec
       (concat
        [:ul
         {:class "warnings"}]
        (map
         (fn [w]
           [:li w])
         ws)))))))

(defn expand-module [{name "name" :as m}]
  (assoc (get @modules name) "id" (m "id")))

(defn set-shiptype! [s]
  (reset! shiptype
          (update-in
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
    (dom/text (str "#shiptype-" (s "id") "-size")
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
                                               (warnings @shiptype)
                                               (dom/del (str "#" id)))))}
                                  [:span {:class "del"} "del"]]]))

(defn add-module-fn [s]
  (fn []
    (let [module-name (dom/val (str "#shiptype-" (s "id") "-module-select"))
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
            (warnings @shiptype)
            (dom/append
             (str "#shiptype-" (s "id") "-module")
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
  (fn [] 
    (let [script-id (dom/val (str "#shiptype-" (entity "id") "-script-select"))
          script-id (if (empty? script-id) nil (js/parseInt script-id))]
      (ajaj/put-clj
       (str "/api/v1/user/"
            evil.ajaj.uid
            "/shiptype/" (entity "id"))
     
       {"id" (entity "id")
        "name" (dom/val (str "#shiptype-" (entity "id") "-name"))
        "script_id" script-id
        "user_id" evil.ajaj.uid}
       (fn [s]
         (warnings @shiptype)
         (dom/text (str  "span[name=shiptype-" (s "id") "-name]") (s "name")))))))

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
            [:span
             {:class "label"}
             "Name:"]
            [:input {:type "text"
                     :id (str "shiptype-" (s "id") "-name")
                     :value (s "name")}] [:br]
            [:span
             {:class "label"}
             "Script:"]
            [:select
             {:id (str "shiptype-" (s "id") "-script-select")}
             [:option]]
            [:input {:type "submit"
                     :value "Save"
                     :click (save-fn entity)}] [:br]
            [:span
             {:class "label"}
             "Size:"]
            [:span {:id (str "shiptype-" (s "id") "-size")} used "/" total]
            [:br]
            [:span "Modules"] [:br]
            (module-section s)]))
         (dom/append
          center
          (dom/c [:div {:id "shiptype-warnings"}]))
         (script/do-list
          (fn [scripts]
            (let [select (dom/select (str "#shiptype-" (s "id") "-script-select"))]
              (doall
               (map #(dom/append select
                                 (dom/c
                                  [:option
                                   (merge {:value (% "id")}
                                          (if (= (% "id") (s "script_id"))
                                            {:selected "selected"}
                                            {}))
                                   (% "name")]))
                    scripts))
              (warnings @shiptype)))))))))

(defn del-shiptype-fn [entity]
  (fn []
    (ajaj/del-clj
     (str "/api/v1/user/" evil.ajaj.uid "/shiptype/" (entity "id"))
     (fn []
       (dom/del
        (str "#shiptype-" (entity "id")))))))

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
               " "
               [:span
                {:class "del"
                 :click (del-shiptype-fn entity)}
                "del"]
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
        {:class "add"
         :click
         (fn []
           (ajaj/post-clj
            (str "/api/v1/user/"
                 evil.ajaj.uid
                 "/shiptype")
            {"user_id" evil.ajaj.uid
             "script_id" nil
             "name" (dom/val "#shiptype-new-input")}
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