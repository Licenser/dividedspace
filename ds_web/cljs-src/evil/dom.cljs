(ns evil.dom)

(def $ (js* "$"))

(defn select [id]
  ($ id))

(defn append [obj cnt]
  (.append obj cnt))

(defn text [obj txt]
  (.text obj txt))

(defn click [obj f]
  (.click obj f))

(defn clear [obj]
  (text obj ""))

(defn attr [obj k v]
  (.attr obj k v))

(defn c [v]
  (if (vector? v)
    (let [[tag & [f & r]] v
          tag ($ (str "<" (name tag) "/>"))]
      (if (map? f)
        (let [tag (reduce
                   (fn [tag [k v]]
                     (attr tag (name k) v))
                   tag
                   f)]
          (reduce
           (fn [tag obj]
             (append tag (c obj)))
           tag
           r))
        (reduce
         (fn [tag obj]
           (append tag (c obj)))
         tag
         (cons f r))))
    (str v)))