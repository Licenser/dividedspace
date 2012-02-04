(ns evil.fight
  (:require
   [evil.ajaj :as ajaj]
   [evil.dom :as dom]
   [evil.shiptype :as shiptype]))

(defn do-list [fun]
  (ajaj/do-ajaj
   "/fleet"
   (fn [res]
     (fun res))))

(defn do-get [id fun]
  (ajaj/do-ajaj
   (str "/fleet/" id)
   (fn [res]
     (fun res))))

(defn start-fight []
  (let [fleet-a (dom/ival "#fleet-a")
        fleet-b (dom/ival "#fleet-b")]
    (ajaj/post-clj
     "/api/v1/fight"
     {"fleet_a" fleet-a
      "fleet_b" fleet-b}
     (fn []))))

(defn fight-view []
  (dom/append
   (dom/select "#center")
   (dom/c
    [:span {:id "new-fight"}]))
  (ajaj/do-ajaj
   "/fleet"
   (fn [res]
     (dom/append
      (dom/select "#new-fight")
      (dom/c
       [:span
        (dom/s
         [{:id "fleet-a"}]
         (fn [s]
           [:option
            {:value (s "id")}
            (s "name")])
         res)
        " vs. "
        (dom/s
         [{:id "fleet-b"}]
         (fn [s]
           [:option
            {:value (s "id")}
            (s "name")])
         res)
        " - "
        [:input
         {:value "Fight!"
          :type "submit"
          :click start-fight
          }]
        ]
       )))))

; External Functions

(defn update-fights []
  (let [div (dom/select (str "div#fight"))]
    (dom/clear div)
    (dom/append
     div
     (dom/c
      [:span
       [:span {:click fight-view} "add"]
       [:br]]))))