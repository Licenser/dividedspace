(ns evil.fleet
  (:require
   [evil.ajaj :as ajaj]
   [evil.dom :as dom]
   [evil.shiptype :as shiptype]))

(def modules (atom {}))

(def fleet (atom {}))

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


(defn update-count-fn [fleet-id m]
  (fn []
    (let [new-m (assoc m
                  "count"
                  (dom/ival (str "#fleet-" fleet-id "-shiptype-" (m "id") "-cnt")))]
      (ajaj/put-clj
       (str "/api/v1/user/"
            evil.ajaj.uid
            "/fleet/" fleet-id "/shiptype/" (m "id"))
       new-m
       (fn [r])))))

(defn shiptype-line [fleet-id m]
  (let [id (str "fleet-" fleet-id "-shiptype-" (m "id"))]                                
    [:tr
     {:id id}
     [:td (m "name")]
     [:td
      [:input {:type "text"
               :id (str id "-cnt")
               :value (m "count")}]
      [:input {:type "submit"
               :value "Update"
               :click (update-count-fn fleet-id m)}]]
     [:td
      {:click (fn []
                (ajaj/del-clj
                 (str "/api/v1/user/"
                      evil.ajaj.uid
                      "/fleet/" fleet-id "/shiptype/" (m "id"))
                 (fn []
                   (dom/del (str "#" id)))))}
      "del"]]))

(defn update-shiptypes [id]
  (let [d (dom/select (str "#fleet-" id "-shiptype-select"))]
    (shiptype/do-list
     (fn [res]
       (dorun
        (map
         (fn [s]
           (dom/append
            d
            (dom/c
             [:option
              {:value (s "id")}
              (s "name")]))) res))))))

(defn add-shiptype-fn [s]
  (fn []
    (let [shiptype-id (dom/ival (str "#fleet-" (s "id") "-shiptype-select"))
          cnt (dom/ival (str "#fleet-" fleet-id "-shiptype-cnt"))]
      (ajaj/post-clj
       (str "/api/v1/user/"
            evil.ajaj.uid
            "/fleet/" (s "id") "/shiptype")
       {"fleet_id" (s "id")
        "shiptype_id" shiptype-id
        "count" cnt}
       (fn [t]
         (dom/append
          (str "#fleet-" (s "id") "-shiptype")
          (dom/c (shiptype-line (s "id") t))))))))

(defn shiptype-section [s]
  (let [res (vec (concat
                  [:table
                   {:id (str "fleet-" (s "id") "-shiptype")}
                   [:tr [:td [:select
                              {:id (str "fleet-" (s "id") "-shiptype-select")}
                              [:option]]]
                    [:td [:input {:type "text"
                                  :id (str "fleet-" fleet-id "-shiptype-cnt")
                                  :value "1"}]]
                    [:td
                     {:click (add-shiptype-fn s)}
                     "add"]]]
                  (vec (map
                        (fn [m]
                          (shiptype-line (s "id") m))
                        (s "shiptypes")))))]
        res))

(defn save-fn [entity]
  (fn [] 
    (ajaj/put-clj
     (str "/api/v1/user/"
          evil.ajaj.uid
          "/fleet/" (entity "id"))
     {"id" (entity "id")
      "name" (dom/val (str "#fleet-" (entity "id") "-name"))
      "user_id" evil.ajaj.uid}
     (fn [s]
       (dom/text (str  "span[name=fleet-" (s "id") "-name]") (s "name"))))))

(defn show-fleet-fn [entity]
  (fn []        
    (do-get
     (entity "id")
     (fn [s]
       (let [center (dom/select "#center")]
         (dom/clear center)
         (dom/append
          center
          (dom/c
           [:div
            [:span "Name:"]
            [:input {:type "text"
                     :id (str "fleet-" (s "id") "-name")
                     :value (s "name")}] [:br]
            [:input {:type "submit"
                     :value "Save"
                     :click (save-fn entity)}] [:br]
            (shiptype-section s)]))
         (update-shiptypes (s "id")))))))

(defn del-fleet-fn [entity]
  (let [id (entity "id")]
    (fn []
      (ajaj/del-clj
       (str "/api/v1/user/" evil.ajaj.uid "/fleet/" id)
       (fn []
         (dom/del
          (str "#fleet-" id)))))))

(defn add-fleet
  ([entity]
     (add-fleet (dom/select (str "div#fleet")) entity))
  ([div entity]
     (let [c (dom/c
              [:div
               {:id (str "fleet-" (entity "id"))}
               [:span
                {:click (show-fleet-fn entity)
                 :name (str "fleet-" (entity "id") "-name")}
                (or (entity "name") "-")]
               [:span
                {:click (del-fleet-fn entity)}
                " del"]
               [:br]
               ])
           del (dom/c [:span])]
       (dom/append div c))))

; External Functions

(defn update-fleets []
  (let [div (dom/select (str "div#fleet"))]
    (dom/clear div)
    (dom/append
     div
     (dom/c
      [:span
       [:input {:id "fleet-new-input"}]
       [:span
        {:click
         (fn []
           (ajaj/post-clj
            (str "/api/v1/user/"
                 evil.ajaj.uid
                 "/fleet")
            {"user_id" evil.ajaj.uid
             "name" (dom/val (dom/select "#fleet-new-input"))}
            add-fleet)
           )} "add"]    
       [:Br]]))
      (do-list
       (fn [res]
         (dorun
          (map (partial add-fleet div) res))))))