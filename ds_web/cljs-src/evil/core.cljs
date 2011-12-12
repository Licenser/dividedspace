(ns evil.core
  (:require
   [goog.dom :as dom]
   [evil.script :as script]
   [evil.shiptype :as shiptype]
   [evil.epic :as epic]))

(def $ (js* "$"))

(defn td [& s]
  (str "<td>" (apply str s) "</td>"))

(defn fight-row [fight]
  (let [div ($ "<tr/>")]
    (doto div
      (.attr "id" (fight "id"))
      (.append (td (fight "id") "s"))
      (.append (td (fight "state")))
      (.append (td (fight "time")))
      (.append (td (fight "ticks"))))))

(defn update-epic-server [id]
  (epic/do-get
   id
   (fn [res]
     (let [div ($ (str "div#" id))
           tab ($ "<table><tr><th>Fight</th><th>Status</th><th>Time</th><th>Ticks</th></tr></table>")]
       (doto div
         (.text "")
         (.append (str "<h2>" id "</h2>"))
         (.append tab))
       (dorun
        (map (fn [fight]
               (.append tab (fight-row fight)))
             res))))))

(defn update-epic-servers []
  (.text ($ "div#epic") "")
  (epic/do-list
   (fn [res]
     (dorun
      (map (fn [id]
             (let [div ($ "<div/>")]
               (doto div
                 (.attr "id" id)
                 (.append id))
               (.append  ($ "div#epic")
                         div)
               (update-epic-server id)))
           res)))))

(defn update-script []
  (.text ($ "div#script") "")
  (script/do-list
   (fn [res]
     (dorun
      (map (fn [script]
             (let [div ($ "<div/>")]
               (doto div
                 (.attr "id" (str "script-" (script "id")))
                 (.append (script "name")))
               (.append  ($ "div#script")
                         div)))
           res)))))


(defn update-shiptype []
  (.text ($ "div#shiptype") "")
  (shiptype/do-list
   (fn [res]
     (dorun
      (map (fn [shiptype]
             (let [div ($ "<div/>")]
               (doto div
                 (.attr "id" (str "shiptype-" (shiptype "id")))
                 (.append (shiptype "name")))
               (.append  ($ "div#shiptype")
                         div)))
           res)))))

(.ready
 ($ (js* "document"))
 (update-epic-servers)
 (update-script)
 (update-shiptype))