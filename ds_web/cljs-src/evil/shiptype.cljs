(ns evil.shiptype
  (:require
   [evil.ajaj :as ajaj]))

(defn do-list [fun]
  (ajaj/do-ajaj
   "/api/v1/shiptype"
           (fn [res]
             (fun res))))

(defn do-get [id fun]
  (ajaj/do-ajaj
   (str "/api/v1/shiptype/" id)
   (fn [res]
     (fun res))))

