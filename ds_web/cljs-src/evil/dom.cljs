(ns evil.dom)

(def $ (js* "$"))

(defn select [id]
  ($ id))

(defn ensure [o]
  (if (string? o)
    (select o)
    o))

(defn append [obj cnt]
  (.append (ensure obj) cnt))

(defn text [obj txt]
  (.text (ensure obj) txt))

(defn click [obj f]
  (.click (ensure obj) f))

(defn blur [obj f]
  (.blur (ensure obj) f))

(defn clear [obj]
  (text obj ""))

(defn val [obj]
  (if (string? obj)
    (. (select obj) (val))
    (. obj (val))))

(defn ival [obj]
  (js/parseInt (val obj)))

(defn del [obj]
  (. obj (remove)))

(defn attr [obj k v]
  (.attr obj k v))

(defn s [opts f l]
  (vec
   (concat
    [:select]
    opts
    (map f l))) )

(defn c [v]
  (if (vector? v)
    (let [[tag & [f & r]] v
          tag ($ (str "<" (name tag) "/>"))]
      (if (map? f)
        (let [tag (reduce
                   (fn [tag [k v]]
                     (condp = k
                       :click (click tag v)
                       :blur (click tag v)
                       (attr tag (name k) v)))
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