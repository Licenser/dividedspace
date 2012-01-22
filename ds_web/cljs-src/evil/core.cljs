(ns evil.core
  (:require
   [evil.script :as script]
   [evil.dom :as dom]
   [evil.ajaj :as ajaj]
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
               (dom/append tab (fight-row fight)))a
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

(.ready
 ($ (js* "document"))
 (fn []
                                        ;(update-epic-servers)
   (script/update-scripts)
   (shiptype/fetch-modules)
   (shiptype/update-shiptypes)))
