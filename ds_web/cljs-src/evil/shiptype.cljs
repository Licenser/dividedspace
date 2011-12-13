(ns evil.shiptype
  (:require
   [evil.ajaj :as ajaj]
   [evil.dom :as dom]))

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

(defn show [id]
  (do-get
   id
   (fn [r]
     (doto (dom/select "#content")
       (dom/clear))
     )))
