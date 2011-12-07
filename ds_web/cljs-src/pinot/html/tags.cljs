(ns pinot.html.tags
  (:require-macros [pinot.macros :as pm]))

;; From Weavejester's Hiccup: https://github.com/weavejester/hiccup/blob/master/src/hiccup/core.clj#L284
(defn add-optional-attrs
  "Add an optional attribute argument to a function that returns a vector tag."
  [func]
  (fn [& args]
    (if (map? (first args))
      (let [[tag & body] (apply func (rest args))]
        (if (map? (first body))
          (apply vector tag (merge (first body) (first args)) (rest body))
          (apply vector tag (first args) body)))
      (apply func args))))

(pm/defelem form-to [[method action] & content]
  [:form {:method (name method)
          :action action}
   content])

(pm/defelem input-field [tpe nme value]
  [:input {:type tpe
           :name (or nme nil)
           :id (or nme nil)
           :value (or value "")}])

(pm/defelem text-field [nme value]
  (input-field "text" nme value))

(pm/defelem password-field [nme value]
  (input-field "password" nme value))

(pm/defelem label [for text]
  [:label {:for for} text])

(pm/defelem submit-button [val]
  (input-field "submit" nil val))

(pm/defelem link-to [url & content]
  [:a {:href url} content])
