(ns evil.script
  (:require
   [evil.ajaj :as ajaj]))

(defn do-list [fun]
  (ajaj/do-ajaj
   "/script"
           (fn [res]
             (fun res))))

(defn do-get [id fun]
  (ajaj/do-ajaj
   (str "/api/v1/script/" id)
   (fn [res]
     (fun res))))

