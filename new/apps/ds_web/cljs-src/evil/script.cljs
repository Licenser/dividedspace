(ns evil.script
  (:require
   [evil.dom :as dom]
   [evil.ajaj :as ajaj]))

(defn do-list [fun]
  (ajaj/do-ajaj
   "/script"
   (fn [res]
     (fun res))))

(defn do-get [id fun]
  (ajaj/do-ajaj
   (str "/script/" id)
   (fn [res]
     (fun res))))

(defn save-fn [entity]
  (fn [] 
    (ajaj/put-clj
     (str "/api/v1/user/"
          evil.ajaj.uid
          "/script/" (entity "id"))
     {"id" (entity "id")
      "name" (dom/val (str "#script-" (entity "id") "-name"))
      "code" (dom/val (str "#script-" (entity "id") "-code"))
      "user_id" evil.ajaj.uid}
     (fn [s]
       (dom/text "#script-save-state" "OK")
       (dom/text (str "span[name=script-" (s "id") "-name]") (s "name"))))))

(defn show-script-fn [entity]
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
                     :id (str "script-" (s "id") "-name")
                     :value (s "name")}] [:br]
            [:span "Code: "] [:br]
            [:textarea {:class "code"
                        :keypress (fn []
                                  (dom/text "#script-save-state" "!!!"))
                        :id  (str "script-" (s "id") "-code")}
             (s "code")] [:br]
            [:input {:type "submit"
                     :value "Save"
                     :click (save-fn entity)}]
            " - "
            [:span {:id "script-save-state"} "OK"]
            [:br]
            [:a {:class "help"
                 :target "_blank"
                 :href "https://github.com/Licenser/dividedspace/wiki/Scripting"}
             "Scripting Help"]
            ])))))))

(defn del-script-fn [entity]
  (fn []
    (ajaj/del-clj
     (str "/api/v1/user/" evil.ajaj.uid "/script/" (entity "id"))
     (fn []
       (dom/del
        (str "#script-" (entity "id")))))))

(defn add-script
  ([entity]
     (add-script (dom/select "div#script") entity))
  ([div entity]
     (dom/append
      div
      (dom/c [:div
              {:id (str "script-" (entity "id"))}
              [:span
               {:click (show-script-fn entity)
                :name (str "script-" (entity "id") "-name")}
               (or (entity "name") "-")]
              [:span
                {:class "del"
                 :click (del-script-fn entity)}
                "del"]
              ]))))

; External Functions
(defn update-scripts []
  (let [div (dom/select "div#script")]
    (dom/clear div)
    (dom/append
     div
     (dom/c
      [:span
       [:input {:id "script-new-input"}]
       [:span
        {:class "add"
         :click
         (fn []
           (ajaj/post-clj
            (str "/api/v1/user/"
                 evil.ajaj.uid
                 "/script")
            {"user_id" evil.ajaj.uid
             "name" (dom/val (dom/select "#script-new-input"))
             "code" ""}
            add-script)
           )} "add"]
       [:br]]))
    (do-list
     (fn [res]
       (dorun
        (map (partial add-script div) res))))))