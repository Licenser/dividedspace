(ns evil.core
  (:require
   [evil.script :as script]
   [evil.dom :as dom]
   [evil.ajaj :as ajaj]
   [evil.shiptype :as shiptype]
   [evil.epic :as epic]))

(def $ (js* "$"))

(def x 1)

(def modules (atom {}))

(def shiptype (atom {}))

(defn fight-row [fight]
  (dom/clear
   [:tr {:id (fight "id")}
    [:td (str (fight "id") "s")]
    [:td (fight "state")]
    [:td (fight "time")]
    [:td (fight "ticks")]
    ]))


(defn update-epic-server [id]
  (epic/do-get
   id
   (fn [res]
     (let [tab (dom/c
                [:table
                 [:tr
                  [:th "Fight"]
                  [:th "Status"]
                  [:th "Time"]
                  [:th "Ticks"]]])]
       (doto (dom/select (str "div#" id))
         (dom/clear)
         (dom/append (com/c [:h2 id]))
         (dom/append tab))
       (dorun
        (map (fn [fight]
               (dom/append tab (fight-row fight)))
             res))))))

(defn update-epic-servers []
  (let [div (dom/select "div#epic")]
    (dom/clear div)
    (epic/do-list
     (fn [res]
       (dorun
        (map (fn [id]
               (dom/append
                div
                (dom/c
                 [:div {:id id}
                  id]))
               (update-epic-server id))
             res))))))


(defn show-shiptype-fn [entity]
  (fn []        
    (shiptype/do-get
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
            [:span "Size: " [:span {:id (str "shiptype-" (s "id") "-size")} used "/" total]] [:br]
            [:span "Modules"] [:br]
            (module-section s)])))))))
(defn del-shiptype-fn [entity]
  (fn []
    (ajaj/del-clj
     (str "/api/v1/user/" evil.ajaj.uid "/shiptype/" (entity "id"))
     (fn []
       (dom/del
        (dom/select (str "#shiptype-" (entity "id"))))))))

(defn  add-shiptype
  ([entity]
     (add-shiptype (dom/select (str "div#shiptype"))))
  ([div entity]
     (let [c (dom/c
              [:div
               {:id (str "shiptype-" (entity "id"))}
               [:span
                {:click (show-shiptype-fn entity)
                 :name (str "shiptype-" (entity "id") "-name")}
                (or (str "!" (entity "name")) "-")]
               [:span
                {:click (del-shiptype-fn entity)}
                " del"]
               [:br]
               ])
           del (dom/c [:span ])]
       (dom/append div c))))

(defn updater [name getter & [f]]
  (fn []
    (let [div (dom/select (str "div#" name))]
      (dom/clear div)
      (dom/append
       div
       (dom/c
        [:span
         [:input {:id (str name "-new-input")}]
         [:span
          {:click
           (fn [])} "add"]
         [:br]]))
      (getter
       (fn [res]
         (dorun
          (map (fn [entity]
                 (let [c (dom/c [:span
                                 {:id (str name "-" (entity "id"))
                                  :name (str "shiptype-" (entity "id") "-name")}
                                 (or (entity "name") "-") [:br]])
                       c (if f (f entity c) c)]
                   
                   (dom/append div c)))
               res)))))))

(def update-script (updater "script" script/do-list))

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


(defn click-fn [s]
  (fn []
    (let [module-name (dom/val (dom/select (str "#shiptype-" (s "id") "-module-select")))
          module (get @modules module-name)
          [used total] (shiptype-size @shiptype)]
      (cond
       (and
        (= "hull" (module "type"))
        (not (nil? (shiptype-hull @shiptype))))
       (js/alert "A ship can only have one Hull.")
       (> (+ used (module "size")) total)
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
                         (str  n " (" (m "size") ")")])
                      @modules)))]
          [:td
           {:click (click-fn s)}
           "add"]]]
        (vec (map
              (fn [m]
                (module-line (s "id") m))
              (s "modules"))))))

(defn update-shiptype []
  (let [div (dom/select (str "div#shiptype"))]
    (dom/clear div)
    (dom/append
     div
     (dom/c
      [:span
       [:input {:id "shiptype-new-input"}]
       [:span
        {:click
         (fn [])} "add"]
       [:br]]))
      (shiptype/do-list
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

(.ready
 ($ (js* "document"))
 (fn []
                                        ;(update-epic-servers)
   (update-script)
   (fetch-modules)
   (update-shiptype)))
