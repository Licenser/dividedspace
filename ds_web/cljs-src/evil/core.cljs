(ns evil.core
  (:require
   [evil.script :as script]
   [evil.dom :as dom]
   [evil.shiptype :as shiptype]
   [evil.epic :as epic]))

(def $ (js* "$"))

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

(defn updater [name getter & [f]]
  (fn []
    (let [div (dom/select (str "div#" name))]
      (dom/clear div)
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

(def update-shiptype
  (updater
   "shiptype"
   shiptype/do-list
   (fn [e obj]
     (dom/click
      obj
      (fn []
        (shiptype/do-get
         (e "id")
         (fn [r]
           (let [center (dom/select "#center")]
             (dom/clear center)
             (dom/append
              center
              (dom/c
               [:div
                [:span "Name:"]
                [:input {:type "text"
                         :id (str "shiptype-" (r "id") "-name")
                         :value (r "name")}] [:br]]
               ))
             ))))))))


(.ready
 ($ (js* "document"))
 (fn []
   ;(update-epic-servers)
   (update-script)
   (update-shiptype)))