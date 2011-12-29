(ns evil.ajaj)

(def $ (js* "$"))

(def uid (js* "uid"))

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


(defn ajaj-put [url data success]
  (.ajax $
         (str "/api/v1/user/" uid url)
         (clj->js
          {:success (fn [r] (success (js->clj r)))
           :dataType "json"
           :cache false
           :data ((js* "JSON.stringify") (clj->js data))
           :type "PUT"
           :processData false
           :contentType "application/json"
           :jsonp "json"})))

(defn do-ajaj [url success]
  (.ajax $
         (str "/api/v1/user/" uid url)
         (clj->js
          {:success (fn [r] (success (js->clj r)))
           :dataType "json"
           :cache false
           :contentType "application/json"
           :jsonp "json"})))

(defn post-clj [url data success]
  (.ajax $
         url
         (clj->js
          {:success (fn [r] (success (js->clj r)))
           :dataType "json"
           :cache false
           :type "POST"
           :data ((js* "JSON.stringify") (clj->js data))
           :processData false          
           :contentType "application/json"
           :jsonp "json"})))

(defn del-clj [url success]
  (.ajax $
         url
         (clj->js
          {:success (fn [r] (success (js->clj r)))
           :dataType "json"
           :cache false
           :type "DELETE"
           :contentType "application/json"
           :jsonp "json"})))

(defn get-clj [url success]
  (.ajax $
         url
         (clj->js
          {:success (fn [r] (success (js->clj r)))
           :dataType "json"
           :cache false
           :contentType "application/json"
           :jsonp "json"})))
