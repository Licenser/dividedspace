(ns evil.core
  (:require
   [goog.dom :as dom]
   ;[pinot.html :as html]
   ;[pinot.dom :as dom]	
   ;[pinot.events :as events]
   ;[pinot.remotes :as remotes]
   ))

(defn clj->js
  "Recursively transforms ClojureScript maps into Javascript objects,
   other ClojureScript colls into JavaScript arrays, and ClojureScript
   keywords into JavaScript strings."
  [x]
  (cond
    (string? x) x
    (keyword? x) (name x)
    (map? x) (.strobj (reduce (fn [m [k v]]
               (assoc m (clj->js k) (clj->js v))) {} x))
    (coll? x) (apply array (map clj->js x))
    :else x))

(def $ (js* "$"))


(defn do-json [url success]
  (.ajax $
         url
         (clj->js
          {:success (fn [r] (success (js->clj r)))
           :dataType "json"
           :jsonp "json"})))

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

(defn update-server [id]
  (do-json (str "/api/v1/server/" id)
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

(defn update-servers []
  (.text ($ "body") "")
  (do-json "/api/v1/server"
           (fn [res]
             (dorun
              (map (fn [id]
                     (let [div ($ "<div/>")]
                       (doto div
                         (.attr "id" id)
                         (.append id))
                       (.append  ($ "body")
                                 div)
                       (update-server id)))
                   res)))))

(.ready ($ (js* "document"))
        (.append
         ($ "body")
         ($ "<div id='server'/>"))
        (update-servers))