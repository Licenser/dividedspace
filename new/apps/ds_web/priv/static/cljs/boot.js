var COMPILED = !0, goog = goog || {};
goog.global = this;
goog.DEBUG = !0;
goog.LOCALE = "en";
goog.evalWorksForGlobals_ = null;
goog.provide = function(a) {
  if(!COMPILED) {
    if(goog.getObjectByName(a) && !goog.implicitNamespaces_[a]) {
      throw Error('Namespace "' + a + '" already declared.');
    }
    for(var b = a;b = b.substring(0, b.lastIndexOf("."));) {
      goog.implicitNamespaces_[b] = !0
    }
  }
  goog.exportPath_(a)
};
goog.setTestOnly = function(a) {
  if(COMPILED && !goog.DEBUG) {
    throw a = a || "", Error("Importing test-only code into non-debug environment" + a ? ": " + a : ".");
  }
};
if(!COMPILED) {
  goog.implicitNamespaces_ = {}
}
goog.exportPath_ = function(a, b, d) {
  a = a.split(".");
  d = d || goog.global;
  !(a[0] in d) && d.execScript && d.execScript("var " + a[0]);
  for(var e;a.length && (e = a.shift());) {
    !a.length && goog.isDef(b) ? d[e] = b : d = d[e] ? d[e] : d[e] = {}
  }
};
goog.getObjectByName = function(a, b) {
  for(var d = a.split("."), e = b || goog.global, f;f = d.shift();) {
    if(goog.isDefAndNotNull(e[f])) {
      e = e[f]
    }else {
      return null
    }
  }
  return e
};
goog.globalize = function(a, b) {
  var d = b || goog.global, e;
  for(e in a) {
    d[e] = a[e]
  }
};
goog.addDependency = function(a, b, d) {
  if(!COMPILED) {
    for(var e, a = a.replace(/\\/g, "/"), f = goog.dependencies_, g = 0;e = b[g];g++) {
      f.nameToPath[e] = a, a in f.pathToNames || (f.pathToNames[a] = {}), f.pathToNames[a][e] = !0
    }
    for(e = 0;b = d[e];e++) {
      a in f.requires || (f.requires[a] = {}), f.requires[a][b] = !0
    }
  }
};
goog.require = function(a) {
  if(!COMPILED && !goog.getObjectByName(a)) {
    var b = goog.getPathFromDeps_(a);
    if(b) {
      goog.included_[b] = !0, goog.writeScripts_()
    }else {
      throw a = "goog.require could not find: " + a, goog.global.console && goog.global.console.error(a), Error(a);
    }
  }
};
goog.basePath = "";
goog.nullFunction = function() {
};
goog.identityFunction = function(a) {
  return a
};
goog.abstractMethod = function() {
  throw Error("unimplemented abstract method");
};
goog.addSingletonGetter = function(a) {
  a.getInstance = function() {
    return a.instance_ || (a.instance_ = new a)
  }
};
if(!COMPILED) {
  goog.included_ = {}, goog.dependencies_ = {pathToNames:{}, nameToPath:{}, requires:{}, visited:{}, written:{}}, goog.inHtmlDocument_ = function() {
    var a = goog.global.document;
    return"undefined" != typeof a && "write" in a
  }, goog.findBasePath_ = function() {
    if(goog.global.CLOSURE_BASE_PATH) {
      goog.basePath = goog.global.CLOSURE_BASE_PATH
    }else {
      if(goog.inHtmlDocument_()) {
        for(var a = goog.global.document.getElementsByTagName("script"), b = a.length - 1;0 <= b;--b) {
          var d = a[b].src, e = d.lastIndexOf("?"), e = -1 == e ? d.length : e;
          if("base.js" == d.substr(e - 7, 7)) {
            goog.basePath = d.substr(0, e - 7);
            break
          }
        }
      }
    }
  }, goog.importScript_ = function(a) {
    var b = goog.global.CLOSURE_IMPORT_SCRIPT || goog.writeScriptTag_;
    !goog.dependencies_.written[a] && b(a) && (goog.dependencies_.written[a] = !0)
  }, goog.writeScriptTag_ = function(a) {
    return goog.inHtmlDocument_() ? (goog.global.document.write('<script type="text/javascript" src="' + a + '"><\/script>'), !0) : !1
  }, goog.writeScripts_ = function() {
    function a(f) {
      if(!(f in e.written)) {
        if(!(f in e.visited) && (e.visited[f] = !0, f in e.requires)) {
          for(var h in e.requires[f]) {
            if(h in e.nameToPath) {
              a(e.nameToPath[h])
            }else {
              if(!goog.getObjectByName(h)) {
                throw Error("Undefined nameToPath for " + h);
              }
            }
          }
        }
        f in d || (d[f] = !0, b.push(f))
      }
    }
    var b = [], d = {}, e = goog.dependencies_, f;
    for(f in goog.included_) {
      e.written[f] || a(f)
    }
    for(f = 0;f < b.length;f++) {
      if(b[f]) {
        goog.importScript_(goog.basePath + b[f])
      }else {
        throw Error("Undefined script input");
      }
    }
  }, goog.getPathFromDeps_ = function(a) {
    return a in goog.dependencies_.nameToPath ? goog.dependencies_.nameToPath[a] : null
  }, goog.findBasePath_(), goog.global.CLOSURE_NO_DEPS || goog.importScript_(goog.basePath + "deps.js")
}
goog.typeOf = function(a) {
  var b = typeof a;
  if("object" == b) {
    if(a) {
      if(a instanceof Array) {
        return"array"
      }
      if(a instanceof Object) {
        return b
      }
      var d = Object.prototype.toString.call(a);
      if("[object Window]" == d) {
        return"object"
      }
      if("[object Array]" == d || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice")) {
        return"array"
      }
      if("[object Function]" == d || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call")) {
        return"function"
      }
    }else {
      return"null"
    }
  }else {
    if("function" == b && "undefined" == typeof a.call) {
      return"object"
    }
  }
  return b
};
goog.propertyIsEnumerableCustom_ = function(a, b) {
  if(b in a) {
    for(var d in a) {
      if(d == b && Object.prototype.hasOwnProperty.call(a, b)) {
        return!0
      }
    }
  }
  return!1
};
goog.propertyIsEnumerable_ = function(a, b) {
  return a instanceof Object ? Object.prototype.propertyIsEnumerable.call(a, b) : goog.propertyIsEnumerableCustom_(a, b)
};
goog.isDef = function(a) {
  return void 0 !== a
};
goog.isNull = function(a) {
  return null === a
};
goog.isDefAndNotNull = function(a) {
  return null != a
};
goog.isArray = function(a) {
  return"array" == goog.typeOf(a)
};
goog.isArrayLike = function(a) {
  var b = goog.typeOf(a);
  return"array" == b || "object" == b && "number" == typeof a.length
};
goog.isDateLike = function(a) {
  return goog.isObject(a) && "function" == typeof a.getFullYear
};
goog.isString = function(a) {
  return"string" == typeof a
};
goog.isBoolean = function(a) {
  return"boolean" == typeof a
};
goog.isNumber = function(a) {
  return"number" == typeof a
};
goog.isFunction = function(a) {
  return"function" == goog.typeOf(a)
};
goog.isObject = function(a) {
  a = goog.typeOf(a);
  return"object" == a || "array" == a || "function" == a
};
goog.getUid = function(a) {
  return a[goog.UID_PROPERTY_] || (a[goog.UID_PROPERTY_] = ++goog.uidCounter_)
};
goog.removeUid = function(a) {
  "removeAttribute" in a && a.removeAttribute(goog.UID_PROPERTY_);
  try {
    delete a[goog.UID_PROPERTY_]
  }catch(b) {
  }
};
goog.UID_PROPERTY_ = "closure_uid_" + Math.floor(2147483648 * Math.random()).toString(36);
goog.uidCounter_ = 0;
goog.getHashCode = goog.getUid;
goog.removeHashCode = goog.removeUid;
goog.cloneObject = function(a) {
  var b = goog.typeOf(a);
  if("object" == b || "array" == b) {
    if(a.clone) {
      return a.clone()
    }
    var b = "array" == b ? [] : {}, d;
    for(d in a) {
      b[d] = goog.cloneObject(a[d])
    }
    return b
  }
  return a
};
goog.bindNative_ = function(a, b, d) {
  return a.call.apply(a.bind, arguments)
};
goog.bindJs_ = function(a, b, d) {
  var e = b || goog.global;
  if(2 < arguments.length) {
    var f = Array.prototype.slice.call(arguments, 2);
    return function() {
      var b = Array.prototype.slice.call(arguments);
      Array.prototype.unshift.apply(b, f);
      return a.apply(e, b)
    }
  }
  return function() {
    return a.apply(e, arguments)
  }
};
goog.bind = function(a, b, d) {
  goog.bind = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? goog.bindNative_ : goog.bindJs_;
  return goog.bind.apply(null, arguments)
};
goog.partial = function(a, b) {
  var d = Array.prototype.slice.call(arguments, 1);
  return function() {
    var b = Array.prototype.slice.call(arguments);
    b.unshift.apply(b, d);
    return a.apply(this, b)
  }
};
goog.mixin = function(a, b) {
  for(var d in b) {
    a[d] = b[d]
  }
};
goog.now = Date.now || function() {
  return+new Date
};
goog.globalEval = function(a) {
  if(goog.global.execScript) {
    goog.global.execScript(a, "JavaScript")
  }else {
    if(goog.global.eval) {
      if(null == goog.evalWorksForGlobals_) {
        goog.global.eval("var _et_ = 1;"), "undefined" != typeof goog.global._et_ ? (delete goog.global._et_, goog.evalWorksForGlobals_ = !0) : goog.evalWorksForGlobals_ = !1
      }
      if(goog.evalWorksForGlobals_) {
        goog.global.eval(a)
      }else {
        var b = goog.global.document, d = b.createElement("script");
        d.type = "text/javascript";
        d.defer = !1;
        d.appendChild(b.createTextNode(a));
        b.body.appendChild(d);
        b.body.removeChild(d)
      }
    }else {
      throw Error("goog.globalEval not available");
    }
  }
};
goog.getCssName = function(a, b) {
  var d = function(a) {
    return goog.cssNameMapping_[a] || a
  }, e;
  e = goog.cssNameMapping_ ? "BY_WHOLE" == goog.cssNameMappingStyle_ ? d : function(a) {
    for(var a = a.split("-"), b = [], e = 0;e < a.length;e++) {
      b.push(d(a[e]))
    }
    return b.join("-")
  } : function(a) {
    return a
  };
  return b ? a + "-" + e(b) : e(a)
};
goog.setCssNameMapping = function(a, b) {
  goog.cssNameMapping_ = a;
  goog.cssNameMappingStyle_ = b
};
goog.getMsg = function(a, b) {
  var d = b || {}, e;
  for(e in d) {
    var f = ("" + d[e]).replace(/\$/g, "$$$$"), a = a.replace(RegExp("\\{\\$" + e + "\\}", "gi"), f)
  }
  return a
};
goog.exportSymbol = function(a, b, d) {
  goog.exportPath_(a, b, d)
};
goog.exportProperty = function(a, b, d) {
  a[b] = d
};
goog.inherits = function(a, b) {
  function d() {
  }
  d.prototype = b.prototype;
  a.superClass_ = b.prototype;
  a.prototype = new d;
  a.prototype.constructor = a
};
goog.base = function(a, b, d) {
  var e = arguments.callee.caller;
  if(e.superClass_) {
    return e.superClass_.constructor.apply(a, Array.prototype.slice.call(arguments, 1))
  }
  for(var f = Array.prototype.slice.call(arguments, 2), g = !1, h = a.constructor;h;h = h.superClass_ && h.superClass_.constructor) {
    if(h.prototype[b] === e) {
      g = !0
    }else {
      if(g) {
        return h.prototype[b].apply(a, f)
      }
    }
  }
  if(a[b] === e) {
    return a.constructor.prototype[b].apply(a, f)
  }
  throw Error("goog.base called from a method of one name to a method of a different name");
};
goog.scope = function(a) {
  a.call(goog.global)
};
goog.string = {};
goog.string.Unicode = {NBSP:"\u00a0"};
goog.string.startsWith = function(a, b) {
  return 0 == a.lastIndexOf(b, 0)
};
goog.string.endsWith = function(a, b) {
  var d = a.length - b.length;
  return 0 <= d && a.indexOf(b, d) == d
};
goog.string.caseInsensitiveStartsWith = function(a, b) {
  return 0 == goog.string.caseInsensitiveCompare(b, a.substr(0, b.length))
};
goog.string.caseInsensitiveEndsWith = function(a, b) {
  return 0 == goog.string.caseInsensitiveCompare(b, a.substr(a.length - b.length, b.length))
};
goog.string.subs = function(a, b) {
  for(var d = 1;d < arguments.length;d++) {
    var e = ("" + arguments[d]).replace(/\$/g, "$$$$"), a = a.replace(/\%s/, e)
  }
  return a
};
goog.string.collapseWhitespace = function(a) {
  return a.replace(/[\s\xa0]+/g, " ").replace(/^\s+|\s+$/g, "")
};
goog.string.isEmpty = function(a) {
  return/^[\s\xa0]*$/.test(a)
};
goog.string.isEmptySafe = function(a) {
  return goog.string.isEmpty(goog.string.makeSafe(a))
};
goog.string.isBreakingWhitespace = function(a) {
  return!/[^\t\n\r ]/.test(a)
};
goog.string.isAlpha = function(a) {
  return!/[^a-zA-Z]/.test(a)
};
goog.string.isNumeric = function(a) {
  return!/[^0-9]/.test(a)
};
goog.string.isAlphaNumeric = function(a) {
  return!/[^a-zA-Z0-9]/.test(a)
};
goog.string.isSpace = function(a) {
  return" " == a
};
goog.string.isUnicodeChar = function(a) {
  return 1 == a.length && " " <= a && "~" >= a || "\u0080" <= a && "\ufffd" >= a
};
goog.string.stripNewlines = function(a) {
  return a.replace(/(\r\n|\r|\n)+/g, " ")
};
goog.string.canonicalizeNewlines = function(a) {
  return a.replace(/(\r\n|\r|\n)/g, "\n")
};
goog.string.normalizeWhitespace = function(a) {
  return a.replace(/\xa0|\s/g, " ")
};
goog.string.normalizeSpaces = function(a) {
  return a.replace(/\xa0|[ \t]+/g, " ")
};
goog.string.trim = function(a) {
  return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "")
};
goog.string.trimLeft = function(a) {
  return a.replace(/^[\s\xa0]+/, "")
};
goog.string.trimRight = function(a) {
  return a.replace(/[\s\xa0]+$/, "")
};
goog.string.caseInsensitiveCompare = function(a, b) {
  var d = ("" + a).toLowerCase(), e = ("" + b).toLowerCase();
  return d < e ? -1 : d == e ? 0 : 1
};
goog.string.numerateCompareRegExp_ = /(\.\d+)|(\d+)|(\D+)/g;
goog.string.numerateCompare = function(a, b) {
  if(a == b) {
    return 0
  }
  if(!a) {
    return-1
  }
  if(!b) {
    return 1
  }
  for(var d = a.toLowerCase().match(goog.string.numerateCompareRegExp_), e = b.toLowerCase().match(goog.string.numerateCompareRegExp_), f = Math.min(d.length, e.length), g = 0;g < f;g++) {
    var h = d[g], i = e[g];
    if(h != i) {
      d = parseInt(h, 10);
      return!isNaN(d) && (e = parseInt(i, 10), !isNaN(e) && d - e) ? d - e : h < i ? -1 : 1
    }
  }
  return d.length != e.length ? d.length - e.length : a < b ? -1 : 1
};
goog.string.encodeUriRegExp_ = /^[a-zA-Z0-9\-_.!~*'()]*$/;
goog.string.urlEncode = function(a) {
  a = "" + a;
  return!goog.string.encodeUriRegExp_.test(a) ? encodeURIComponent(a) : a
};
goog.string.urlDecode = function(a) {
  return decodeURIComponent(a.replace(/\+/g, " "))
};
goog.string.newLineToBr = function(a, b) {
  return a.replace(/(\r\n|\r|\n)/g, b ? "<br />" : "<br>")
};
goog.string.htmlEscape = function(a, b) {
  if(b) {
    return a.replace(goog.string.amperRe_, "&amp;").replace(goog.string.ltRe_, "&lt;").replace(goog.string.gtRe_, "&gt;").replace(goog.string.quotRe_, "&quot;")
  }
  if(!goog.string.allRe_.test(a)) {
    return a
  }
  -1 != a.indexOf("&") && (a = a.replace(goog.string.amperRe_, "&amp;"));
  -1 != a.indexOf("<") && (a = a.replace(goog.string.ltRe_, "&lt;"));
  -1 != a.indexOf(">") && (a = a.replace(goog.string.gtRe_, "&gt;"));
  -1 != a.indexOf('"') && (a = a.replace(goog.string.quotRe_, "&quot;"));
  return a
};
goog.string.amperRe_ = /&/g;
goog.string.ltRe_ = /</g;
goog.string.gtRe_ = />/g;
goog.string.quotRe_ = /\"/g;
goog.string.allRe_ = /[&<>\"]/;
goog.string.unescapeEntities = function(a) {
  return goog.string.contains(a, "&") ? "document" in goog.global && !goog.string.contains(a, "<") ? goog.string.unescapeEntitiesUsingDom_(a) : goog.string.unescapePureXmlEntities_(a) : a
};
goog.string.unescapeEntitiesUsingDom_ = function(a) {
  var b = goog.global.document.createElement("div");
  b.innerHTML = "<pre>x" + a + "</pre>";
  if(b.firstChild[goog.string.NORMALIZE_FN_]) {
    b.firstChild[goog.string.NORMALIZE_FN_]()
  }
  a = b.firstChild.firstChild.nodeValue.slice(1);
  b.innerHTML = "";
  return goog.string.canonicalizeNewlines(a)
};
goog.string.unescapePureXmlEntities_ = function(a) {
  return a.replace(/&([^;]+);/g, function(a, d) {
    switch(d) {
      case "amp":
        return"&";
      case "lt":
        return"<";
      case "gt":
        return">";
      case "quot":
        return'"';
      default:
        if("#" == d.charAt(0)) {
          var e = Number("0" + d.substr(1));
          if(!isNaN(e)) {
            return String.fromCharCode(e)
          }
        }
        return a
    }
  })
};
goog.string.NORMALIZE_FN_ = "normalize";
goog.string.whitespaceEscape = function(a, b) {
  return goog.string.newLineToBr(a.replace(/  /g, " &#160;"), b)
};
goog.string.stripQuotes = function(a, b) {
  for(var d = b.length, e = 0;e < d;e++) {
    var f = 1 == d ? b : b.charAt(e);
    if(a.charAt(0) == f && a.charAt(a.length - 1) == f) {
      return a.substring(1, a.length - 1)
    }
  }
  return a
};
goog.string.truncate = function(a, b, d) {
  d && (a = goog.string.unescapeEntities(a));
  a.length > b && (a = a.substring(0, b - 3) + "...");
  d && (a = goog.string.htmlEscape(a));
  return a
};
goog.string.truncateMiddle = function(a, b, d, e) {
  d && (a = goog.string.unescapeEntities(a));
  if(e) {
    e > b && (e = b);
    var f = a.length - e, a = a.substring(0, b - e) + "..." + a.substring(f)
  }else {
    a.length > b && (e = Math.floor(b / 2), f = a.length - e, a = a.substring(0, e + b % 2) + "..." + a.substring(f))
  }
  d && (a = goog.string.htmlEscape(a));
  return a
};
goog.string.specialEscapeChars_ = {"\x00":"\\0", "\u0008":"\\b", "\u000c":"\\f", "\n":"\\n", "\r":"\\r", "\t":"\\t", "\u000b":"\\x0B", '"':'\\"', "\\":"\\\\"};
goog.string.jsEscapeCache_ = {"'":"\\'"};
goog.string.quote = function(a) {
  a = "" + a;
  if(a.quote) {
    return a.quote()
  }
  for(var b = ['"'], d = 0;d < a.length;d++) {
    var e = a.charAt(d), f = e.charCodeAt(0);
    b[d + 1] = goog.string.specialEscapeChars_[e] || (31 < f && 127 > f ? e : goog.string.escapeChar(e))
  }
  b.push('"');
  return b.join("")
};
goog.string.escapeString = function(a) {
  for(var b = [], d = 0;d < a.length;d++) {
    b[d] = goog.string.escapeChar(a.charAt(d))
  }
  return b.join("")
};
goog.string.escapeChar = function(a) {
  if(a in goog.string.jsEscapeCache_) {
    return goog.string.jsEscapeCache_[a]
  }
  if(a in goog.string.specialEscapeChars_) {
    return goog.string.jsEscapeCache_[a] = goog.string.specialEscapeChars_[a]
  }
  var b = a, d = a.charCodeAt(0);
  if(31 < d && 127 > d) {
    b = a
  }else {
    if(256 > d) {
      if(b = "\\x", 16 > d || 256 < d) {
        b += "0"
      }
    }else {
      b = "\\u", 4096 > d && (b += "0")
    }
    b += d.toString(16).toUpperCase()
  }
  return goog.string.jsEscapeCache_[a] = b
};
goog.string.toMap = function(a) {
  for(var b = {}, d = 0;d < a.length;d++) {
    b[a.charAt(d)] = !0
  }
  return b
};
goog.string.contains = function(a, b) {
  return-1 != a.indexOf(b)
};
goog.string.removeAt = function(a, b, d) {
  var e = a;
  0 <= b && b < a.length && 0 < d && (e = a.substr(0, b) + a.substr(b + d, a.length - b - d));
  return e
};
goog.string.remove = function(a, b) {
  var d = RegExp(goog.string.regExpEscape(b), "");
  return a.replace(d, "")
};
goog.string.removeAll = function(a, b) {
  var d = RegExp(goog.string.regExpEscape(b), "g");
  return a.replace(d, "")
};
goog.string.regExpEscape = function(a) {
  return("" + a).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08")
};
goog.string.repeat = function(a, b) {
  return Array(b + 1).join(a)
};
goog.string.padNumber = function(a, b, d) {
  a = goog.isDef(d) ? a.toFixed(d) : "" + a;
  d = a.indexOf(".");
  if(-1 == d) {
    d = a.length
  }
  return goog.string.repeat("0", Math.max(0, b - d)) + a
};
goog.string.makeSafe = function(a) {
  return null == a ? "" : "" + a
};
goog.string.buildString = function(a) {
  return Array.prototype.join.call(arguments, "")
};
goog.string.getRandomString = function() {
  return Math.floor(2147483648 * Math.random()).toString(36) + Math.abs(Math.floor(2147483648 * Math.random()) ^ goog.now()).toString(36)
};
goog.string.compareVersions = function(a, b) {
  for(var d = 0, e = goog.string.trim("" + a).split("."), f = goog.string.trim("" + b).split("."), g = Math.max(e.length, f.length), h = 0;0 == d && h < g;h++) {
    var i = e[h] || "", j = f[h] || "", k = RegExp("(\\d*)(\\D*)", "g"), n = RegExp("(\\d*)(\\D*)", "g");
    do {
      var m = k.exec(i) || ["", "", ""], l = n.exec(j) || ["", "", ""];
      if(0 == m[0].length && 0 == l[0].length) {
        break
      }
      var d = 0 == m[1].length ? 0 : parseInt(m[1], 10), o = 0 == l[1].length ? 0 : parseInt(l[1], 10), d = goog.string.compareElements_(d, o) || goog.string.compareElements_(0 == m[2].length, 0 == l[2].length) || goog.string.compareElements_(m[2], l[2])
    }while(0 == d)
  }
  return d
};
goog.string.compareElements_ = function(a, b) {
  return a < b ? -1 : a > b ? 1 : 0
};
goog.string.HASHCODE_MAX_ = 4294967296;
goog.string.hashCode = function(a) {
  for(var b = 0, d = 0;d < a.length;++d) {
    b = 31 * b + a.charCodeAt(d), b %= goog.string.HASHCODE_MAX_
  }
  return b
};
goog.string.uniqueStringCounter_ = 2147483648 * Math.random() | 0;
goog.string.createUniqueString = function() {
  return"goog_" + goog.string.uniqueStringCounter_++
};
goog.string.toNumber = function(a) {
  var b = Number(a);
  return 0 == b && goog.string.isEmpty(a) ? NaN : b
};
goog.string.toCamelCaseCache_ = {};
goog.string.toCamelCase = function(a) {
  return goog.string.toCamelCaseCache_[a] || (goog.string.toCamelCaseCache_[a] = ("" + a).replace(/\-([a-z])/g, function(a, d) {
    return d.toUpperCase()
  }))
};
goog.string.toSelectorCaseCache_ = {};
goog.string.toSelectorCase = function(a) {
  return goog.string.toSelectorCaseCache_[a] || (goog.string.toSelectorCaseCache_[a] = ("" + a).replace(/([A-Z])/g, "-$1").toLowerCase())
};
goog.userAgent = {};
goog.userAgent.jscript = {};
goog.userAgent.jscript.ASSUME_NO_JSCRIPT = !1;
goog.userAgent.jscript.init_ = function() {
  goog.userAgent.jscript.DETECTED_HAS_JSCRIPT_ = "ScriptEngine" in goog.global && "JScript" == goog.global.ScriptEngine();
  goog.userAgent.jscript.DETECTED_VERSION_ = goog.userAgent.jscript.DETECTED_HAS_JSCRIPT_ ? goog.global.ScriptEngineMajorVersion() + "." + goog.global.ScriptEngineMinorVersion() + "." + goog.global.ScriptEngineBuildVersion() : "0"
};
goog.userAgent.jscript.ASSUME_NO_JSCRIPT || goog.userAgent.jscript.init_();
goog.userAgent.jscript.HAS_JSCRIPT = goog.userAgent.jscript.ASSUME_NO_JSCRIPT ? !1 : goog.userAgent.jscript.DETECTED_HAS_JSCRIPT_;
goog.userAgent.jscript.VERSION = goog.userAgent.jscript.ASSUME_NO_JSCRIPT ? "0" : goog.userAgent.jscript.DETECTED_VERSION_;
goog.userAgent.jscript.isVersion = function(a) {
  return 0 <= goog.string.compareVersions(goog.userAgent.jscript.VERSION, a)
};
goog.string.StringBuffer = function(a, b) {
  this.buffer_ = goog.userAgent.jscript.HAS_JSCRIPT ? [] : "";
  null != a && this.append.apply(this, arguments)
};
goog.string.StringBuffer.prototype.set = function(a) {
  this.clear();
  this.append(a)
};
goog.userAgent.jscript.HAS_JSCRIPT ? (goog.string.StringBuffer.prototype.bufferLength_ = 0, goog.string.StringBuffer.prototype.append = function(a, b, d) {
  null == b ? this.buffer_[this.bufferLength_++] = a : (this.buffer_.push.apply(this.buffer_, arguments), this.bufferLength_ = this.buffer_.length);
  return this
}) : goog.string.StringBuffer.prototype.append = function(a, b, d) {
  this.buffer_ += a;
  if(null != b) {
    for(var e = 1;e < arguments.length;e++) {
      this.buffer_ += arguments[e]
    }
  }
  return this
};
goog.string.StringBuffer.prototype.clear = function() {
  goog.userAgent.jscript.HAS_JSCRIPT ? this.bufferLength_ = this.buffer_.length = 0 : this.buffer_ = ""
};
goog.string.StringBuffer.prototype.getLength = function() {
  return this.toString().length
};
goog.string.StringBuffer.prototype.toString = function() {
  if(goog.userAgent.jscript.HAS_JSCRIPT) {
    var a = this.buffer_.join("");
    this.clear();
    a && this.append(a);
    return a
  }
  return this.buffer_
};
goog.debug = {};
goog.debug.Error = function(a) {
  this.stack = Error().stack || "";
  if(a) {
    this.message = "" + a
  }
};
goog.inherits(goog.debug.Error, Error);
goog.debug.Error.prototype.name = "CustomError";
goog.asserts = {};
goog.asserts.ENABLE_ASSERTS = goog.DEBUG;
goog.asserts.AssertionError = function(a, b) {
  b.unshift(a);
  goog.debug.Error.call(this, goog.string.subs.apply(null, b));
  b.shift();
  this.messagePattern = a
};
goog.inherits(goog.asserts.AssertionError, goog.debug.Error);
goog.asserts.AssertionError.prototype.name = "AssertionError";
goog.asserts.doAssertFailure_ = function(a, b, d, e) {
  var f = "Assertion failed";
  if(d) {
    var f = f + (": " + d), g = e
  }else {
    a && (f += ": " + a, g = b)
  }
  throw new goog.asserts.AssertionError("" + f, g || []);
};
goog.asserts.assert = function(a, b, d) {
  goog.asserts.ENABLE_ASSERTS && !a && goog.asserts.doAssertFailure_("", null, b, Array.prototype.slice.call(arguments, 2));
  return a
};
goog.asserts.fail = function(a, b) {
  if(goog.asserts.ENABLE_ASSERTS) {
    throw new goog.asserts.AssertionError("Failure" + (a ? ": " + a : ""), Array.prototype.slice.call(arguments, 1));
  }
};
goog.asserts.assertNumber = function(a, b, d) {
  goog.asserts.ENABLE_ASSERTS && !goog.isNumber(a) && goog.asserts.doAssertFailure_("Expected number but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
  return a
};
goog.asserts.assertString = function(a, b, d) {
  goog.asserts.ENABLE_ASSERTS && !goog.isString(a) && goog.asserts.doAssertFailure_("Expected string but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
  return a
};
goog.asserts.assertFunction = function(a, b, d) {
  goog.asserts.ENABLE_ASSERTS && !goog.isFunction(a) && goog.asserts.doAssertFailure_("Expected function but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
  return a
};
goog.asserts.assertObject = function(a, b, d) {
  goog.asserts.ENABLE_ASSERTS && !goog.isObject(a) && goog.asserts.doAssertFailure_("Expected object but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
  return a
};
goog.asserts.assertArray = function(a, b, d) {
  goog.asserts.ENABLE_ASSERTS && !goog.isArray(a) && goog.asserts.doAssertFailure_("Expected array but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
  return a
};
goog.asserts.assertBoolean = function(a, b, d) {
  goog.asserts.ENABLE_ASSERTS && !goog.isBoolean(a) && goog.asserts.doAssertFailure_("Expected boolean but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
  return a
};
goog.asserts.assertInstanceof = function(a, b, d, e) {
  goog.asserts.ENABLE_ASSERTS && !(a instanceof b) && goog.asserts.doAssertFailure_("instanceof check failed.", null, d, Array.prototype.slice.call(arguments, 3))
};
goog.array = {};
goog.NATIVE_ARRAY_PROTOTYPES = !0;
goog.array.peek = function(a) {
  return a[a.length - 1]
};
goog.array.ARRAY_PROTOTYPE_ = Array.prototype;
goog.array.indexOf = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.indexOf ? function(a, b, d) {
  goog.asserts.assert(null != a.length);
  return goog.array.ARRAY_PROTOTYPE_.indexOf.call(a, b, d)
} : function(a, b, d) {
  d = null == d ? 0 : 0 > d ? Math.max(0, a.length + d) : d;
  if(goog.isString(a)) {
    return!goog.isString(b) || 1 != b.length ? -1 : a.indexOf(b, d)
  }
  for(;d < a.length;d++) {
    if(d in a && a[d] === b) {
      return d
    }
  }
  return-1
};
goog.array.lastIndexOf = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.lastIndexOf ? function(a, b, d) {
  goog.asserts.assert(null != a.length);
  return goog.array.ARRAY_PROTOTYPE_.lastIndexOf.call(a, b, null == d ? a.length - 1 : d)
} : function(a, b, d) {
  d = null == d ? a.length - 1 : d;
  0 > d && (d = Math.max(0, a.length + d));
  if(goog.isString(a)) {
    return!goog.isString(b) || 1 != b.length ? -1 : a.lastIndexOf(b, d)
  }
  for(;0 <= d;d--) {
    if(d in a && a[d] === b) {
      return d
    }
  }
  return-1
};
goog.array.forEach = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.forEach ? function(a, b, d) {
  goog.asserts.assert(null != a.length);
  goog.array.ARRAY_PROTOTYPE_.forEach.call(a, b, d)
} : function(a, b, d) {
  for(var e = a.length, f = goog.isString(a) ? a.split("") : a, g = 0;g < e;g++) {
    g in f && b.call(d, f[g], g, a)
  }
};
goog.array.forEachRight = function(a, b, d) {
  for(var e = a.length, f = goog.isString(a) ? a.split("") : a, e = e - 1;0 <= e;--e) {
    e in f && b.call(d, f[e], e, a)
  }
};
goog.array.filter = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.filter ? function(a, b, d) {
  goog.asserts.assert(null != a.length);
  return goog.array.ARRAY_PROTOTYPE_.filter.call(a, b, d)
} : function(a, b, d) {
  for(var e = a.length, f = [], g = 0, h = goog.isString(a) ? a.split("") : a, i = 0;i < e;i++) {
    if(i in h) {
      var j = h[i];
      b.call(d, j, i, a) && (f[g++] = j)
    }
  }
  return f
};
goog.array.map = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.map ? function(a, b, d) {
  goog.asserts.assert(null != a.length);
  return goog.array.ARRAY_PROTOTYPE_.map.call(a, b, d)
} : function(a, b, d) {
  for(var e = a.length, f = Array(e), g = goog.isString(a) ? a.split("") : a, h = 0;h < e;h++) {
    h in g && (f[h] = b.call(d, g[h], h, a))
  }
  return f
};
goog.array.reduce = function(a, b, d, e) {
  if(a.reduce) {
    return e ? a.reduce(goog.bind(b, e), d) : a.reduce(b, d)
  }
  var f = d;
  goog.array.forEach(a, function(d, h) {
    f = b.call(e, f, d, h, a)
  });
  return f
};
goog.array.reduceRight = function(a, b, d, e) {
  if(a.reduceRight) {
    return e ? a.reduceRight(goog.bind(b, e), d) : a.reduceRight(b, d)
  }
  var f = d;
  goog.array.forEachRight(a, function(d, h) {
    f = b.call(e, f, d, h, a)
  });
  return f
};
goog.array.some = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.some ? function(a, b, d) {
  goog.asserts.assert(null != a.length);
  return goog.array.ARRAY_PROTOTYPE_.some.call(a, b, d)
} : function(a, b, d) {
  for(var e = a.length, f = goog.isString(a) ? a.split("") : a, g = 0;g < e;g++) {
    if(g in f && b.call(d, f[g], g, a)) {
      return!0
    }
  }
  return!1
};
goog.array.every = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.every ? function(a, b, d) {
  goog.asserts.assert(null != a.length);
  return goog.array.ARRAY_PROTOTYPE_.every.call(a, b, d)
} : function(a, b, d) {
  for(var e = a.length, f = goog.isString(a) ? a.split("") : a, g = 0;g < e;g++) {
    if(g in f && !b.call(d, f[g], g, a)) {
      return!1
    }
  }
  return!0
};
goog.array.find = function(a, b, d) {
  b = goog.array.findIndex(a, b, d);
  return 0 > b ? null : goog.isString(a) ? a.charAt(b) : a[b]
};
goog.array.findIndex = function(a, b, d) {
  for(var e = a.length, f = goog.isString(a) ? a.split("") : a, g = 0;g < e;g++) {
    if(g in f && b.call(d, f[g], g, a)) {
      return g
    }
  }
  return-1
};
goog.array.findRight = function(a, b, d) {
  b = goog.array.findIndexRight(a, b, d);
  return 0 > b ? null : goog.isString(a) ? a.charAt(b) : a[b]
};
goog.array.findIndexRight = function(a, b, d) {
  for(var e = a.length, f = goog.isString(a) ? a.split("") : a, e = e - 1;0 <= e;e--) {
    if(e in f && b.call(d, f[e], e, a)) {
      return e
    }
  }
  return-1
};
goog.array.contains = function(a, b) {
  return 0 <= goog.array.indexOf(a, b)
};
goog.array.isEmpty = function(a) {
  return 0 == a.length
};
goog.array.clear = function(a) {
  if(!goog.isArray(a)) {
    for(var b = a.length - 1;0 <= b;b--) {
      delete a[b]
    }
  }
  a.length = 0
};
goog.array.insert = function(a, b) {
  goog.array.contains(a, b) || a.push(b)
};
goog.array.insertAt = function(a, b, d) {
  goog.array.splice(a, d, 0, b)
};
goog.array.insertArrayAt = function(a, b, d) {
  goog.partial(goog.array.splice, a, d, 0).apply(null, b)
};
goog.array.insertBefore = function(a, b, d) {
  var e;
  2 == arguments.length || 0 > (e = goog.array.indexOf(a, d)) ? a.push(b) : goog.array.insertAt(a, b, e)
};
goog.array.remove = function(a, b) {
  var d = goog.array.indexOf(a, b), e;
  (e = 0 <= d) && goog.array.removeAt(a, d);
  return e
};
goog.array.removeAt = function(a, b) {
  goog.asserts.assert(null != a.length);
  return 1 == goog.array.ARRAY_PROTOTYPE_.splice.call(a, b, 1).length
};
goog.array.removeIf = function(a, b, d) {
  b = goog.array.findIndex(a, b, d);
  return 0 <= b ? (goog.array.removeAt(a, b), !0) : !1
};
goog.array.concat = function(a) {
  return goog.array.ARRAY_PROTOTYPE_.concat.apply(goog.array.ARRAY_PROTOTYPE_, arguments)
};
goog.array.clone = function(a) {
  if(goog.isArray(a)) {
    return goog.array.concat(a)
  }
  for(var b = [], d = 0, e = a.length;d < e;d++) {
    b[d] = a[d]
  }
  return b
};
goog.array.toArray = function(a) {
  return goog.isArray(a) ? goog.array.concat(a) : goog.array.clone(a)
};
goog.array.extend = function(a, b) {
  for(var d = 1;d < arguments.length;d++) {
    var e = arguments[d], f;
    if(goog.isArray(e) || (f = goog.isArrayLike(e)) && e.hasOwnProperty("callee")) {
      a.push.apply(a, e)
    }else {
      if(f) {
        for(var g = a.length, h = e.length, i = 0;i < h;i++) {
          a[g + i] = e[i]
        }
      }else {
        a.push(e)
      }
    }
  }
};
goog.array.splice = function(a, b, d, e) {
  goog.asserts.assert(null != a.length);
  return goog.array.ARRAY_PROTOTYPE_.splice.apply(a, goog.array.slice(arguments, 1))
};
goog.array.slice = function(a, b, d) {
  goog.asserts.assert(null != a.length);
  return 2 >= arguments.length ? goog.array.ARRAY_PROTOTYPE_.slice.call(a, b) : goog.array.ARRAY_PROTOTYPE_.slice.call(a, b, d)
};
goog.array.removeDuplicates = function(a, b) {
  for(var d = b || a, e = {}, f = 0, g = 0;g < a.length;) {
    var h = a[g++], i = goog.isObject(h) ? "o" + goog.getUid(h) : (typeof h).charAt(0) + h;
    Object.prototype.hasOwnProperty.call(e, i) || (e[i] = !0, d[f++] = h)
  }
  d.length = f
};
goog.array.binarySearch = function(a, b, d) {
  return goog.array.binarySearch_(a, d || goog.array.defaultCompare, !1, b)
};
goog.array.binarySelect = function(a, b, d) {
  return goog.array.binarySearch_(a, b, !0, void 0, d)
};
goog.array.binarySearch_ = function(a, b, d, e, f) {
  for(var g = 0, h = a.length, i;g < h;) {
    var j = g + h >> 1, k;
    k = d ? b.call(f, a[j], j, a) : b(e, a[j]);
    0 < k ? g = j + 1 : (h = j, i = !k)
  }
  return i ? g : ~g
};
goog.array.sort = function(a, b) {
  goog.asserts.assert(null != a.length);
  goog.array.ARRAY_PROTOTYPE_.sort.call(a, b || goog.array.defaultCompare)
};
goog.array.stableSort = function(a, b) {
  for(var d = 0;d < a.length;d++) {
    a[d] = {index:d, value:a[d]}
  }
  var e = b || goog.array.defaultCompare;
  goog.array.sort(a, function(a, b) {
    return e(a.value, b.value) || a.index - b.index
  });
  for(d = 0;d < a.length;d++) {
    a[d] = a[d].value
  }
};
goog.array.sortObjectsByKey = function(a, b, d) {
  var e = d || goog.array.defaultCompare;
  goog.array.sort(a, function(a, d) {
    return e(a[b], d[b])
  })
};
goog.array.isSorted = function(a, b, d) {
  for(var b = b || goog.array.defaultCompare, e = 1;e < a.length;e++) {
    var f = b(a[e - 1], a[e]);
    if(0 < f || 0 == f && d) {
      return!1
    }
  }
  return!0
};
goog.array.equals = function(a, b, d) {
  if(!goog.isArrayLike(a) || !goog.isArrayLike(b) || a.length != b.length) {
    return!1
  }
  for(var e = a.length, d = d || goog.array.defaultCompareEquality, f = 0;f < e;f++) {
    if(!d(a[f], b[f])) {
      return!1
    }
  }
  return!0
};
goog.array.compare = function(a, b, d) {
  return goog.array.equals(a, b, d)
};
goog.array.defaultCompare = function(a, b) {
  return a > b ? 1 : a < b ? -1 : 0
};
goog.array.defaultCompareEquality = function(a, b) {
  return a === b
};
goog.array.binaryInsert = function(a, b, d) {
  d = goog.array.binarySearch(a, b, d);
  return 0 > d ? (goog.array.insertAt(a, b, -(d + 1)), !0) : !1
};
goog.array.binaryRemove = function(a, b, d) {
  b = goog.array.binarySearch(a, b, d);
  return 0 <= b ? goog.array.removeAt(a, b) : !1
};
goog.array.bucket = function(a, b) {
  for(var d = {}, e = 0;e < a.length;e++) {
    var f = a[e], g = b(f, e, a);
    goog.isDef(g) && (d[g] || (d[g] = [])).push(f)
  }
  return d
};
goog.array.repeat = function(a, b) {
  for(var d = [], e = 0;e < b;e++) {
    d[e] = a
  }
  return d
};
goog.array.flatten = function(a) {
  for(var b = [], d = 0;d < arguments.length;d++) {
    var e = arguments[d];
    goog.isArray(e) ? b.push.apply(b, goog.array.flatten.apply(null, e)) : b.push(e)
  }
  return b
};
goog.array.rotate = function(a, b) {
  goog.asserts.assert(null != a.length);
  a.length && (b %= a.length, 0 < b ? goog.array.ARRAY_PROTOTYPE_.unshift.apply(a, a.splice(-b, b)) : 0 > b && goog.array.ARRAY_PROTOTYPE_.push.apply(a, a.splice(0, -b)));
  return a
};
goog.array.zip = function(a) {
  if(!arguments.length) {
    return[]
  }
  for(var b = [], d = 0;;d++) {
    for(var e = [], f = 0;f < arguments.length;f++) {
      var g = arguments[f];
      if(d >= g.length) {
        return b
      }
      e.push(g[d])
    }
    b.push(e)
  }
};
goog.array.shuffle = function(a, b) {
  for(var d = b || Math.random, e = a.length - 1;0 < e;e--) {
    var f = Math.floor(d() * (e + 1)), g = a[e];
    a[e] = a[f];
    a[f] = g
  }
};
goog.object = {};
goog.object.forEach = function(a, b, d) {
  for(var e in a) {
    b.call(d, a[e], e, a)
  }
};
goog.object.filter = function(a, b, d) {
  var e = {}, f;
  for(f in a) {
    b.call(d, a[f], f, a) && (e[f] = a[f])
  }
  return e
};
goog.object.map = function(a, b, d) {
  var e = {}, f;
  for(f in a) {
    e[f] = b.call(d, a[f], f, a)
  }
  return e
};
goog.object.some = function(a, b, d) {
  for(var e in a) {
    if(b.call(d, a[e], e, a)) {
      return!0
    }
  }
  return!1
};
goog.object.every = function(a, b, d) {
  for(var e in a) {
    if(!b.call(d, a[e], e, a)) {
      return!1
    }
  }
  return!0
};
goog.object.getCount = function(a) {
  var b = 0, d;
  for(d in a) {
    b++
  }
  return b
};
goog.object.getAnyKey = function(a) {
  for(var b in a) {
    return b
  }
};
goog.object.getAnyValue = function(a) {
  for(var b in a) {
    return a[b]
  }
};
goog.object.contains = function(a, b) {
  return goog.object.containsValue(a, b)
};
goog.object.getValues = function(a) {
  var b = [], d = 0, e;
  for(e in a) {
    b[d++] = a[e]
  }
  return b
};
goog.object.getKeys = function(a) {
  var b = [], d = 0, e;
  for(e in a) {
    b[d++] = e
  }
  return b
};
goog.object.getValueByKeys = function(a, b) {
  for(var d = goog.isArrayLike(b), e = d ? b : arguments, d = d ? 0 : 1;d < e.length && !(a = a[e[d]], !goog.isDef(a));d++) {
  }
  return a
};
goog.object.containsKey = function(a, b) {
  return b in a
};
goog.object.containsValue = function(a, b) {
  for(var d in a) {
    if(a[d] == b) {
      return!0
    }
  }
  return!1
};
goog.object.findKey = function(a, b, d) {
  for(var e in a) {
    if(b.call(d, a[e], e, a)) {
      return e
    }
  }
};
goog.object.findValue = function(a, b, d) {
  return(b = goog.object.findKey(a, b, d)) && a[b]
};
goog.object.isEmpty = function(a) {
  for(var b in a) {
    return!1
  }
  return!0
};
goog.object.clear = function(a) {
  for(var b in a) {
    delete a[b]
  }
};
goog.object.remove = function(a, b) {
  var d;
  (d = b in a) && delete a[b];
  return d
};
goog.object.add = function(a, b, d) {
  if(b in a) {
    throw Error('The object already contains the key "' + b + '"');
  }
  goog.object.set(a, b, d)
};
goog.object.get = function(a, b, d) {
  return b in a ? a[b] : d
};
goog.object.set = function(a, b, d) {
  a[b] = d
};
goog.object.setIfUndefined = function(a, b, d) {
  return b in a ? a[b] : a[b] = d
};
goog.object.clone = function(a) {
  var b = {}, d;
  for(d in a) {
    b[d] = a[d]
  }
  return b
};
goog.object.unsafeClone = function(a) {
  var b = goog.typeOf(a);
  if("object" == b || "array" == b) {
    if(a.clone) {
      return a.clone()
    }
    var b = "array" == b ? [] : {}, d;
    for(d in a) {
      b[d] = goog.object.unsafeClone(a[d])
    }
    return b
  }
  return a
};
goog.object.transpose = function(a) {
  var b = {}, d;
  for(d in a) {
    b[a[d]] = d
  }
  return b
};
goog.object.PROTOTYPE_FIELDS_ = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",");
goog.object.extend = function(a, b) {
  for(var d, e, f = 1;f < arguments.length;f++) {
    e = arguments[f];
    for(d in e) {
      a[d] = e[d]
    }
    for(var g = 0;g < goog.object.PROTOTYPE_FIELDS_.length;g++) {
      d = goog.object.PROTOTYPE_FIELDS_[g], Object.prototype.hasOwnProperty.call(e, d) && (a[d] = e[d])
    }
  }
};
goog.object.create = function(a) {
  var b = arguments.length;
  if(1 == b && goog.isArray(arguments[0])) {
    return goog.object.create.apply(null, arguments[0])
  }
  if(b % 2) {
    throw Error("Uneven number of arguments");
  }
  for(var d = {}, e = 0;e < b;e += 2) {
    d[arguments[e]] = arguments[e + 1]
  }
  return d
};
goog.object.createSet = function(a) {
  var b = arguments.length;
  if(1 == b && goog.isArray(arguments[0])) {
    return goog.object.createSet.apply(null, arguments[0])
  }
  for(var d = {}, e = 0;e < b;e++) {
    d[arguments[e]] = !0
  }
  return d
};
var cljs = {core:{}};
cljs.core._STAR_print_fn_STAR_ = function() {
  throw Error("No *print-fn* fn set for evaluation environment");
};
cljs.core.truth_ = function(a) {
  return null != a && !1 !== a
};
cljs.core.type_satisfies_ = function(a, b) {
  var d = a[goog.typeOf.call(null, b)];
  if(cljs.core.truth_(d)) {
    return d
  }
  d = a._;
  return cljs.core.truth_(d) ? d : !1
};
cljs.core.is_proto_ = function(a) {
  return a.constructor.prototype === a
};
cljs.core._STAR_main_cli_fn_STAR_ = null;
cljs.core.missing_protocol = function(a, b) {
  return Error.call(null, "No protocol method " + a + " defined for type " + goog.typeOf.call(null, b) + ": " + b)
};
cljs.core.aclone = function(a) {
  return Array.prototype.slice.call(a)
};
cljs.core.array = function(a) {
  return Array.prototype.slice.call(arguments)
};
cljs.core.aget = function(a, b) {
  return a[b]
};
cljs.core.aset = function(a, b, d) {
  return a[b] = d
};
cljs.core.alength = function(a) {
  return a.length
};
cljs.core.ICounted = {};
cljs.core._count = function(a) {
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$ICounted$_count : a)) {
    a = a.cljs$core$ICounted$_count(a)
  }else {
    var b;
    b = cljs.core._count[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(b) && (b = cljs.core._count._, !cljs.core.truth_(b))) {
      throw cljs.core.missing_protocol.call(null, "ICounted.-count", a);
    }
    a = b.call(null, a)
  }
  return a
};
cljs.core.IEmptyableCollection = {};
cljs.core._empty = function(a) {
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IEmptyableCollection$_empty : a)) {
    a = a.cljs$core$IEmptyableCollection$_empty(a)
  }else {
    var b;
    b = cljs.core._empty[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(b) && (b = cljs.core._empty._, !cljs.core.truth_(b))) {
      throw cljs.core.missing_protocol.call(null, "IEmptyableCollection.-empty", a);
    }
    a = b.call(null, a)
  }
  return a
};
cljs.core.ICollection = {};
cljs.core._conj = function(a, b) {
  var d;
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$ICollection$_conj : a)) {
    d = a.cljs$core$ICollection$_conj(a, b)
  }else {
    d = cljs.core._conj[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(d) && (d = cljs.core._conj._, !cljs.core.truth_(d))) {
      throw cljs.core.missing_protocol.call(null, "ICollection.-conj", a);
    }
    d = d.call(null, a, b)
  }
  return d
};
cljs.core.IIndexed = {};
cljs.core._nth = function() {
  var a = null;
  return function(a, d, e) {
    switch(arguments.length) {
      case 2:
        var f;
        if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IIndexed$_nth : a)) {
          f = a.cljs$core$IIndexed$_nth(a, d)
        }else {
          f = cljs.core._nth[goog.typeOf.call(null, a)];
          if(!cljs.core.truth_(f) && (f = cljs.core._nth._, !cljs.core.truth_(f))) {
            throw cljs.core.missing_protocol.call(null, "IIndexed.-nth", a);
          }
          f = f.call(null, a, d)
        }
        return f;
      case 3:
        if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IIndexed$_nth : a)) {
          f = a.cljs$core$IIndexed$_nth(a, d, e)
        }else {
          f = cljs.core._nth[goog.typeOf.call(null, a)];
          if(!cljs.core.truth_(f) && (f = cljs.core._nth._, !cljs.core.truth_(f))) {
            throw cljs.core.missing_protocol.call(null, "IIndexed.-nth", a);
          }
          f = f.call(null, a, d, e)
        }
        return f
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.ISeq = {};
cljs.core._first = function(a) {
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$ISeq$_first : a)) {
    a = a.cljs$core$ISeq$_first(a)
  }else {
    var b;
    b = cljs.core._first[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(b) && (b = cljs.core._first._, !cljs.core.truth_(b))) {
      throw cljs.core.missing_protocol.call(null, "ISeq.-first", a);
    }
    a = b.call(null, a)
  }
  return a
};
cljs.core._rest = function(a) {
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$ISeq$_rest : a)) {
    a = a.cljs$core$ISeq$_rest(a)
  }else {
    var b;
    b = cljs.core._rest[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(b) && (b = cljs.core._rest._, !cljs.core.truth_(b))) {
      throw cljs.core.missing_protocol.call(null, "ISeq.-rest", a);
    }
    a = b.call(null, a)
  }
  return a
};
cljs.core.ILookup = {};
cljs.core._lookup = function() {
  var a = null;
  return function(a, d, e) {
    switch(arguments.length) {
      case 2:
        var f;
        if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$ILookup$_lookup : a)) {
          f = a.cljs$core$ILookup$_lookup(a, d)
        }else {
          f = cljs.core._lookup[goog.typeOf.call(null, a)];
          if(!cljs.core.truth_(f) && (f = cljs.core._lookup._, !cljs.core.truth_(f))) {
            throw cljs.core.missing_protocol.call(null, "ILookup.-lookup", a);
          }
          f = f.call(null, a, d)
        }
        return f;
      case 3:
        if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$ILookup$_lookup : a)) {
          f = a.cljs$core$ILookup$_lookup(a, d, e)
        }else {
          f = cljs.core._lookup[goog.typeOf.call(null, a)];
          if(!cljs.core.truth_(f) && (f = cljs.core._lookup._, !cljs.core.truth_(f))) {
            throw cljs.core.missing_protocol.call(null, "ILookup.-lookup", a);
          }
          f = f.call(null, a, d, e)
        }
        return f
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.IAssociative = {};
cljs.core._contains_key_QMARK_ = function(a, b) {
  var d;
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IAssociative$_contains_key_QMARK_ : a)) {
    d = a.cljs$core$IAssociative$_contains_key_QMARK_(a, b)
  }else {
    d = cljs.core._contains_key_QMARK_[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(d) && (d = cljs.core._contains_key_QMARK_._, !cljs.core.truth_(d))) {
      throw cljs.core.missing_protocol.call(null, "IAssociative.-contains-key?", a);
    }
    d = d.call(null, a, b)
  }
  return d
};
cljs.core._assoc = function(a, b, d) {
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IAssociative$_assoc : a)) {
    a = a.cljs$core$IAssociative$_assoc(a, b, d)
  }else {
    var e;
    e = cljs.core._assoc[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(e) && (e = cljs.core._assoc._, !cljs.core.truth_(e))) {
      throw cljs.core.missing_protocol.call(null, "IAssociative.-assoc", a);
    }
    a = e.call(null, a, b, d)
  }
  return a
};
cljs.core.IMap = {};
cljs.core._dissoc = function(a, b) {
  var d;
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IMap$_dissoc : a)) {
    d = a.cljs$core$IMap$_dissoc(a, b)
  }else {
    d = cljs.core._dissoc[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(d) && (d = cljs.core._dissoc._, !cljs.core.truth_(d))) {
      throw cljs.core.missing_protocol.call(null, "IMap.-dissoc", a);
    }
    d = d.call(null, a, b)
  }
  return d
};
cljs.core.ISet = {};
cljs.core._disjoin = function(a, b) {
  var d;
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$ISet$_disjoin : a)) {
    d = a.cljs$core$ISet$_disjoin(a, b)
  }else {
    d = cljs.core._disjoin[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(d) && (d = cljs.core._disjoin._, !cljs.core.truth_(d))) {
      throw cljs.core.missing_protocol.call(null, "ISet.-disjoin", a);
    }
    d = d.call(null, a, b)
  }
  return d
};
cljs.core.IStack = {};
cljs.core._peek = function(a) {
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IStack$_peek : a)) {
    a = a.cljs$core$IStack$_peek(a)
  }else {
    var b;
    b = cljs.core._peek[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(b) && (b = cljs.core._peek._, !cljs.core.truth_(b))) {
      throw cljs.core.missing_protocol.call(null, "IStack.-peek", a);
    }
    a = b.call(null, a)
  }
  return a
};
cljs.core._pop = function(a) {
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IStack$_pop : a)) {
    a = a.cljs$core$IStack$_pop(a)
  }else {
    var b;
    b = cljs.core._pop[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(b) && (b = cljs.core._pop._, !cljs.core.truth_(b))) {
      throw cljs.core.missing_protocol.call(null, "IStack.-pop", a);
    }
    a = b.call(null, a)
  }
  return a
};
cljs.core.IVector = {};
cljs.core._assoc_n = function(a, b, d) {
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IVector$_assoc_n : a)) {
    a = a.cljs$core$IVector$_assoc_n(a, b, d)
  }else {
    var e;
    e = cljs.core._assoc_n[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(e) && (e = cljs.core._assoc_n._, !cljs.core.truth_(e))) {
      throw cljs.core.missing_protocol.call(null, "IVector.-assoc-n", a);
    }
    a = e.call(null, a, b, d)
  }
  return a
};
cljs.core.IDeref = {};
cljs.core._deref = function(a) {
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IDeref$_deref : a)) {
    a = a.cljs$core$IDeref$_deref(a)
  }else {
    var b;
    b = cljs.core._deref[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(b) && (b = cljs.core._deref._, !cljs.core.truth_(b))) {
      throw cljs.core.missing_protocol.call(null, "IDeref.-deref", a);
    }
    a = b.call(null, a)
  }
  return a
};
cljs.core.IDerefWithTimeout = {};
cljs.core._deref_with_timeout = function(a, b, d) {
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IDerefWithTimeout$_deref_with_timeout : a)) {
    a = a.cljs$core$IDerefWithTimeout$_deref_with_timeout(a, b, d)
  }else {
    var e;
    e = cljs.core._deref_with_timeout[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(e) && (e = cljs.core._deref_with_timeout._, !cljs.core.truth_(e))) {
      throw cljs.core.missing_protocol.call(null, "IDerefWithTimeout.-deref-with-timeout", a);
    }
    a = e.call(null, a, b, d)
  }
  return a
};
cljs.core.IMeta = {};
cljs.core._meta = function(a) {
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IMeta$_meta : a)) {
    a = a.cljs$core$IMeta$_meta(a)
  }else {
    var b;
    b = cljs.core._meta[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(b) && (b = cljs.core._meta._, !cljs.core.truth_(b))) {
      throw cljs.core.missing_protocol.call(null, "IMeta.-meta", a);
    }
    a = b.call(null, a)
  }
  return a
};
cljs.core.IWithMeta = {};
cljs.core._with_meta = function(a, b) {
  var d;
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IWithMeta$_with_meta : a)) {
    d = a.cljs$core$IWithMeta$_with_meta(a, b)
  }else {
    d = cljs.core._with_meta[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(d) && (d = cljs.core._with_meta._, !cljs.core.truth_(d))) {
      throw cljs.core.missing_protocol.call(null, "IWithMeta.-with-meta", a);
    }
    d = d.call(null, a, b)
  }
  return d
};
cljs.core.IReduce = {};
cljs.core._reduce = function() {
  var a = null;
  return function(a, d, e) {
    switch(arguments.length) {
      case 2:
        var f;
        if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IReduce$_reduce : a)) {
          f = a.cljs$core$IReduce$_reduce(a, d)
        }else {
          f = cljs.core._reduce[goog.typeOf.call(null, a)];
          if(!cljs.core.truth_(f) && (f = cljs.core._reduce._, !cljs.core.truth_(f))) {
            throw cljs.core.missing_protocol.call(null, "IReduce.-reduce", a);
          }
          f = f.call(null, a, d)
        }
        return f;
      case 3:
        if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IReduce$_reduce : a)) {
          f = a.cljs$core$IReduce$_reduce(a, d, e)
        }else {
          f = cljs.core._reduce[goog.typeOf.call(null, a)];
          if(!cljs.core.truth_(f) && (f = cljs.core._reduce._, !cljs.core.truth_(f))) {
            throw cljs.core.missing_protocol.call(null, "IReduce.-reduce", a);
          }
          f = f.call(null, a, d, e)
        }
        return f
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.IEquiv = {};
cljs.core._equiv = function(a, b) {
  var d;
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IEquiv$_equiv : a)) {
    d = a.cljs$core$IEquiv$_equiv(a, b)
  }else {
    d = cljs.core._equiv[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(d) && (d = cljs.core._equiv._, !cljs.core.truth_(d))) {
      throw cljs.core.missing_protocol.call(null, "IEquiv.-equiv", a);
    }
    d = d.call(null, a, b)
  }
  return d
};
cljs.core.IHash = {};
cljs.core._hash = function(a) {
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IHash$_hash : a)) {
    a = a.cljs$core$IHash$_hash(a)
  }else {
    var b;
    b = cljs.core._hash[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(b) && (b = cljs.core._hash._, !cljs.core.truth_(b))) {
      throw cljs.core.missing_protocol.call(null, "IHash.-hash", a);
    }
    a = b.call(null, a)
  }
  return a
};
cljs.core.ISeqable = {};
cljs.core._seq = function(a) {
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$ISeqable$_seq : a)) {
    a = a.cljs$core$ISeqable$_seq(a)
  }else {
    var b;
    b = cljs.core._seq[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(b) && (b = cljs.core._seq._, !cljs.core.truth_(b))) {
      throw cljs.core.missing_protocol.call(null, "ISeqable.-seq", a);
    }
    a = b.call(null, a)
  }
  return a
};
cljs.core.ISequential = {};
cljs.core.IRecord = {};
cljs.core.IPrintable = {};
cljs.core._pr_seq = function(a, b) {
  var d;
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IPrintable$_pr_seq : a)) {
    d = a.cljs$core$IPrintable$_pr_seq(a, b)
  }else {
    d = cljs.core._pr_seq[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(d) && (d = cljs.core._pr_seq._, !cljs.core.truth_(d))) {
      throw cljs.core.missing_protocol.call(null, "IPrintable.-pr-seq", a);
    }
    d = d.call(null, a, b)
  }
  return d
};
cljs.core.IPending = {};
cljs.core._realized_QMARK_ = function(a) {
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IPending$_realized_QMARK_ : a)) {
    a = a.cljs$core$IPending$_realized_QMARK_(a)
  }else {
    var b;
    b = cljs.core._realized_QMARK_[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(b) && (b = cljs.core._realized_QMARK_._, !cljs.core.truth_(b))) {
      throw cljs.core.missing_protocol.call(null, "IPending.-realized?", a);
    }
    a = b.call(null, a)
  }
  return a
};
cljs.core.IWatchable = {};
cljs.core._notify_watches = function(a, b, d) {
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IWatchable$_notify_watches : a)) {
    a = a.cljs$core$IWatchable$_notify_watches(a, b, d)
  }else {
    var e;
    e = cljs.core._notify_watches[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(e) && (e = cljs.core._notify_watches._, !cljs.core.truth_(e))) {
      throw cljs.core.missing_protocol.call(null, "IWatchable.-notify-watches", a);
    }
    a = e.call(null, a, b, d)
  }
  return a
};
cljs.core._add_watch = function(a, b, d) {
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IWatchable$_add_watch : a)) {
    a = a.cljs$core$IWatchable$_add_watch(a, b, d)
  }else {
    var e;
    e = cljs.core._add_watch[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(e) && (e = cljs.core._add_watch._, !cljs.core.truth_(e))) {
      throw cljs.core.missing_protocol.call(null, "IWatchable.-add-watch", a);
    }
    a = e.call(null, a, b, d)
  }
  return a
};
cljs.core._remove_watch = function(a, b) {
  var d;
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IWatchable$_remove_watch : a)) {
    d = a.cljs$core$IWatchable$_remove_watch(a, b)
  }else {
    d = cljs.core._remove_watch[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(d) && (d = cljs.core._remove_watch._, !cljs.core.truth_(d))) {
      throw cljs.core.missing_protocol.call(null, "IWatchable.-remove-watch", a);
    }
    d = d.call(null, a, b)
  }
  return d
};
cljs.core.identical_QMARK_ = function(a, b) {
  return a === b
};
cljs.core._EQ_ = function(a, b) {
  return cljs.core._equiv.call(null, a, b)
};
cljs.core.nil_QMARK_ = function(a) {
  return null === a
};
cljs.core.IHash["null"] = !0;
cljs.core._hash["null"] = function() {
  return 0
};
cljs.core.ILookup["null"] = !0;
cljs.core._lookup["null"] = function() {
  var a = null;
  return function(a, d, e) {
    switch(arguments.length) {
      case 2:
        return null;
      case 3:
        return e
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.IAssociative["null"] = !0;
cljs.core._assoc["null"] = function(a, b, d) {
  return cljs.core.hash_map.call(null, b, d)
};
cljs.core.ICollection["null"] = !0;
cljs.core._conj["null"] = function(a, b) {
  return cljs.core.list.call(null, b)
};
cljs.core.IReduce["null"] = !0;
cljs.core._reduce["null"] = function() {
  var a = null;
  return function(a, d, e) {
    switch(arguments.length) {
      case 2:
        return d.call(null);
      case 3:
        return e
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.IPrintable["null"] = !0;
cljs.core._pr_seq["null"] = function() {
  return cljs.core.list.call(null, "nil")
};
cljs.core.ISet["null"] = !0;
cljs.core._disjoin["null"] = function() {
  return null
};
cljs.core.ICounted["null"] = !0;
cljs.core._count["null"] = function() {
  return 0
};
cljs.core.IStack["null"] = !0;
cljs.core._peek["null"] = function() {
  return null
};
cljs.core._pop["null"] = function() {
  return null
};
cljs.core.ISeq["null"] = !0;
cljs.core._first["null"] = function() {
  return null
};
cljs.core._rest["null"] = function() {
  return cljs.core.list.call(null)
};
cljs.core.IEquiv["null"] = !0;
cljs.core._equiv["null"] = function(a, b) {
  return cljs.core.nil_QMARK_.call(null, b)
};
cljs.core.IWithMeta["null"] = !0;
cljs.core._with_meta["null"] = function() {
  return null
};
cljs.core.IMeta["null"] = !0;
cljs.core._meta["null"] = function() {
  return null
};
cljs.core.IIndexed["null"] = !0;
cljs.core._nth["null"] = function() {
  var a = null;
  return function(a, d, e) {
    switch(arguments.length) {
      case 2:
        return null;
      case 3:
        return e
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.IEmptyableCollection["null"] = !0;
cljs.core._empty["null"] = function() {
  return null
};
cljs.core.IMap["null"] = !0;
cljs.core._dissoc["null"] = function() {
  return null
};
Date.prototype.cljs$core$IEquiv$ = !0;
Date.prototype.cljs$core$IEquiv$_equiv = function(a, b) {
  return a.toString() === b.toString()
};
cljs.core.IHash.number = !0;
cljs.core._hash.number = function(a) {
  return a
};
cljs.core.IEquiv.number = !0;
cljs.core._equiv.number = function(a, b) {
  return a === b
};
cljs.core.IHash["boolean"] = !0;
cljs.core._hash["boolean"] = function(a) {
  return!0 === a ? 1 : 0
};
cljs.core.IHash["function"] = !0;
cljs.core._hash["function"] = function(a) {
  return goog.getUid.call(null, a)
};
cljs.core.inc = function(a) {
  return a + 1
};
cljs.core.ci_reduce = function() {
  var a = null;
  return function(a, d, e, f) {
    switch(arguments.length) {
      case 2:
        var g;
        a: {
          if(cljs.core.truth_(cljs.core._EQ_.call(null, 0, cljs.core._count.call(null, a)))) {
            g = d.call(null)
          }else {
            for(var h = cljs.core._nth.call(null, a, 0), i = 1;;) {
              if(cljs.core.truth_(i < cljs.core._count.call(null, a))) {
                h = d.call(null, h, cljs.core._nth.call(null, a, i)), i += 1
              }else {
                g = h;
                break a
              }
            }
          }
        }
        return g;
      case 3:
        a: {
          g = e;
          for(i = 0;;) {
            if(cljs.core.truth_(i < cljs.core._count.call(null, a))) {
              g = d.call(null, g, cljs.core._nth.call(null, a, i)), i += 1
            }else {
              h = g;
              break a
            }
          }
        }
        return h;
      case 4:
        a: {
          g = e;
          for(h = f;;) {
            if(cljs.core.truth_(h < cljs.core._count.call(null, a))) {
              g = d.call(null, g, cljs.core._nth.call(null, a, h)), h += 1
            }else {
              i = g;
              break a
            }
          }
        }
        return i
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.IndexedSeq = function(a, b) {
  this.a = a;
  this.i = b
};
cljs.core.IndexedSeq.prototype.cljs$core$IHash$ = !0;
cljs.core.IndexedSeq.prototype.cljs$core$IHash$_hash = function(a) {
  return cljs.core.hash_coll.call(null, a)
};
cljs.core.IndexedSeq.prototype.cljs$core$IReduce$ = !0;
cljs.core.IndexedSeq.prototype.cljs$core$IReduce$_reduce = function() {
  var a = null;
  return function(a, d, e) {
    switch(arguments.length) {
      case 2:
        return cljs.core.ci_reduce.call(null, a, d, this.a[this.i], this.i + 1);
      case 3:
        return cljs.core.ci_reduce.call(null, a, d, e, this.i)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.IndexedSeq.prototype.cljs$core$ICollection$ = !0;
cljs.core.IndexedSeq.prototype.cljs$core$ICollection$_conj = function(a, b) {
  return cljs.core.cons.call(null, b, a)
};
cljs.core.IndexedSeq.prototype.cljs$core$IEquiv$ = !0;
cljs.core.IndexedSeq.prototype.cljs$core$IEquiv$_equiv = function(a, b) {
  return cljs.core.equiv_sequential.call(null, a, b)
};
cljs.core.IndexedSeq.prototype.cljs$core$ISequential$ = !0;
cljs.core.IndexedSeq.prototype.cljs$core$IIndexed$ = !0;
cljs.core.IndexedSeq.prototype.cljs$core$IIndexed$_nth = function() {
  var a = null;
  return function(a, d, e) {
    switch(arguments.length) {
      case 2:
        var f = d + this.i;
        return cljs.core.truth_(f < this.a.length) ? this.a[f] : null;
      case 3:
        return f = d + this.i, cljs.core.truth_(f < this.a.length) ? this.a[f] : e
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.IndexedSeq.prototype.cljs$core$ICounted$ = !0;
cljs.core.IndexedSeq.prototype.cljs$core$ICounted$_count = function() {
  return this.a.length - this.i
};
cljs.core.IndexedSeq.prototype.cljs$core$ISeq$ = !0;
cljs.core.IndexedSeq.prototype.cljs$core$ISeq$_first = function() {
  return this.a[this.i]
};
cljs.core.IndexedSeq.prototype.cljs$core$ISeq$_rest = function() {
  return cljs.core.truth_(this.i + 1 < this.a.length) ? new cljs.core.IndexedSeq(this.a, this.i + 1) : cljs.core.list.call(null)
};
cljs.core.IndexedSeq.prototype.cljs$core$ISeqable$ = !0;
cljs.core.IndexedSeq.prototype.cljs$core$ISeqable$_seq = function(a) {
  return a
};
cljs.core.prim_seq = function(a, b) {
  return cljs.core.truth_(cljs.core._EQ_.call(null, 0, a.length)) ? null : new cljs.core.IndexedSeq(a, b)
};
cljs.core.array_seq = function(a, b) {
  return cljs.core.prim_seq.call(null, a, b)
};
cljs.core.IReduce.array = !0;
cljs.core._reduce.array = function() {
  var a = null;
  return function(a, d, e) {
    switch(arguments.length) {
      case 2:
        return cljs.core.ci_reduce.call(null, a, d);
      case 3:
        return cljs.core.ci_reduce.call(null, a, d, e)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.ILookup.array = !0;
cljs.core._lookup.array = function() {
  var a = null;
  return function(a, d, e) {
    switch(arguments.length) {
      case 2:
        return a[d];
      case 3:
        return cljs.core._nth.call(null, a, d, e)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.IIndexed.array = !0;
cljs.core._nth.array = function() {
  var a = null;
  return function(a, d, e) {
    switch(arguments.length) {
      case 2:
        return cljs.core.truth_(d < a.length) ? a[d] : null;
      case 3:
        return cljs.core.truth_(d < a.length) ? a[d] : e
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.ICounted.array = !0;
cljs.core._count.array = function(a) {
  return a.length
};
cljs.core.ISeqable.array = !0;
cljs.core._seq.array = function(a) {
  return cljs.core.array_seq.call(null, a, 0)
};
cljs.core.seq = function(a) {
  return cljs.core.truth_(a) ? cljs.core._seq.call(null, a) : null
};
cljs.core.first = function(a) {
  a = cljs.core.seq.call(null, a);
  return cljs.core.truth_(a) ? cljs.core._first.call(null, a) : null
};
cljs.core.rest = function(a) {
  return cljs.core._rest.call(null, cljs.core.seq.call(null, a))
};
cljs.core.next = function(a) {
  return cljs.core.truth_(a) ? cljs.core.seq.call(null, cljs.core.rest.call(null, a)) : null
};
cljs.core.second = function(a) {
  return cljs.core.first.call(null, cljs.core.next.call(null, a))
};
cljs.core.ffirst = function(a) {
  return cljs.core.first.call(null, cljs.core.first.call(null, a))
};
cljs.core.nfirst = function(a) {
  return cljs.core.next.call(null, cljs.core.first.call(null, a))
};
cljs.core.fnext = function(a) {
  return cljs.core.first.call(null, cljs.core.next.call(null, a))
};
cljs.core.nnext = function(a) {
  return cljs.core.next.call(null, cljs.core.next.call(null, a))
};
cljs.core.last = function(a) {
  for(;;) {
    if(cljs.core.truth_(cljs.core.next.call(null, a))) {
      a = cljs.core.next.call(null, a)
    }else {
      return cljs.core.first.call(null, a)
    }
  }
};
cljs.core.ICounted._ = !0;
cljs.core._count._ = function(a) {
  for(var a = cljs.core.seq.call(null, a), b = 0;;) {
    if(cljs.core.truth_(a)) {
      a = cljs.core.next.call(null, a), b += 1
    }else {
      return b
    }
  }
};
cljs.core.IEquiv._ = !0;
cljs.core._equiv._ = function(a, b) {
  return a === b
};
cljs.core.not = function(a) {
  return cljs.core.truth_(a) ? !1 : !0
};
cljs.core.conj = function() {
  var a = null, b = function() {
    var b = function(b, d, e) {
      for(;;) {
        if(cljs.core.truth_(e)) {
          b = a.call(null, b, d), d = cljs.core.first.call(null, e), e = cljs.core.next.call(null, e)
        }else {
          return a.call(null, b, d)
        }
      }
    }, e = function(a, e, h) {
      var i = null;
      goog.isDef(h) && (i = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
      return b.call(this, a, e, i)
    };
    e.cljs$lang$maxFixedArity = 2;
    e.cljs$lang$applyTo = function(a) {
      var e = cljs.core.first(a), h = cljs.core.first(cljs.core.next(a)), a = cljs.core.rest(cljs.core.next(a));
      return b.call(this, e, h, a)
    };
    return e
  }(), a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return cljs.core._conj.call(null, a, e);
      default:
        return b.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = b.cljs$lang$applyTo;
  return a
}();
cljs.core.empty = function(a) {
  return cljs.core._empty.call(null, a)
};
cljs.core.count = function(a) {
  return cljs.core._count.call(null, a)
};
cljs.core.nth = function() {
  var a = null;
  return function(a, d, e) {
    switch(arguments.length) {
      case 2:
        return cljs.core._nth.call(null, a, Math.floor(d));
      case 3:
        return cljs.core._nth.call(null, a, Math.floor(d), e)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.get = function() {
  var a = null;
  return function(a, d, e) {
    switch(arguments.length) {
      case 2:
        return cljs.core._lookup.call(null, a, d);
      case 3:
        return cljs.core._lookup.call(null, a, d, e)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.assoc = function() {
  var a = null, b = function() {
    var b = function(b, d, e, i) {
      for(;;) {
        if(b = a.call(null, b, d, e), cljs.core.truth_(i)) {
          d = cljs.core.first.call(null, i), e = cljs.core.second.call(null, i), i = cljs.core.nnext.call(null, i)
        }else {
          return b
        }
      }
    }, e = function(a, e, h, i) {
      var j = null;
      goog.isDef(i) && (j = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
      return b.call(this, a, e, h, j)
    };
    e.cljs$lang$maxFixedArity = 3;
    e.cljs$lang$applyTo = function(a) {
      var e = cljs.core.first(a), h = cljs.core.first(cljs.core.next(a)), i = cljs.core.first(cljs.core.next(cljs.core.next(a))), a = cljs.core.rest(cljs.core.next(cljs.core.next(a)));
      return b.call(this, e, h, i, a)
    };
    return e
  }(), a = function(a, e, f, g) {
    switch(arguments.length) {
      case 3:
        return cljs.core._assoc.call(null, a, e, f);
      default:
        return b.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 3;
  a.cljs$lang$applyTo = b.cljs$lang$applyTo;
  return a
}();
cljs.core.dissoc = function() {
  var a = null, b = function() {
    var b = function(b, d, e) {
      for(;;) {
        if(b = a.call(null, b, d), cljs.core.truth_(e)) {
          d = cljs.core.first.call(null, e), e = cljs.core.next.call(null, e)
        }else {
          return b
        }
      }
    }, e = function(a, e, h) {
      var i = null;
      goog.isDef(h) && (i = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
      return b.call(this, a, e, i)
    };
    e.cljs$lang$maxFixedArity = 2;
    e.cljs$lang$applyTo = function(a) {
      var e = cljs.core.first(a), h = cljs.core.first(cljs.core.next(a)), a = cljs.core.rest(cljs.core.next(a));
      return b.call(this, e, h, a)
    };
    return e
  }(), a = function(a, e, f) {
    switch(arguments.length) {
      case 1:
        return a;
      case 2:
        return cljs.core._dissoc.call(null, a, e);
      default:
        return b.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = b.cljs$lang$applyTo;
  return a
}();
cljs.core.with_meta = function(a, b) {
  return cljs.core._with_meta.call(null, a, b)
};
cljs.core.meta = function(a) {
  return cljs.core.truth_(function() {
    return cljs.core.truth_(function() {
      if(cljs.core.truth_(a)) {
        var b = a.cljs$core$IMeta$;
        return cljs.core.truth_(b) ? cljs.core.not.call(null, a.hasOwnProperty("cljs$core$IMeta$")) : b
      }
      return a
    }()) ? !0 : cljs.core.type_satisfies_.call(null, cljs.core.IMeta, a)
  }()) ? cljs.core._meta.call(null, a) : null
};
cljs.core.peek = function(a) {
  return cljs.core._peek.call(null, a)
};
cljs.core.pop = function(a) {
  return cljs.core._pop.call(null, a)
};
cljs.core.disj = function() {
  var a = null, b = function() {
    var b = function(b, d, e) {
      for(;;) {
        if(b = a.call(null, b, d), cljs.core.truth_(e)) {
          d = cljs.core.first.call(null, e), e = cljs.core.next.call(null, e)
        }else {
          return b
        }
      }
    }, e = function(a, e, h) {
      var i = null;
      goog.isDef(h) && (i = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
      return b.call(this, a, e, i)
    };
    e.cljs$lang$maxFixedArity = 2;
    e.cljs$lang$applyTo = function(a) {
      var e = cljs.core.first(a), h = cljs.core.first(cljs.core.next(a)), a = cljs.core.rest(cljs.core.next(a));
      return b.call(this, e, h, a)
    };
    return e
  }(), a = function(a, e, f) {
    switch(arguments.length) {
      case 1:
        return a;
      case 2:
        return cljs.core._disjoin.call(null, a, e);
      default:
        return b.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = b.cljs$lang$applyTo;
  return a
}();
cljs.core.hash = function(a) {
  return cljs.core._hash.call(null, a)
};
cljs.core.empty_QMARK_ = function(a) {
  return cljs.core.not.call(null, cljs.core.seq.call(null, a))
};
cljs.core.coll_QMARK_ = function(a) {
  return cljs.core.truth_(cljs.core.nil_QMARK_.call(null, a)) ? !1 : cljs.core.truth_(function() {
    if(cljs.core.truth_(a)) {
      var b = a.cljs$core$ICollection$;
      return cljs.core.truth_(b) ? cljs.core.not.call(null, a.hasOwnProperty("cljs$core$ICollection$")) : b
    }
    return a
  }()) ? !0 : cljs.core.type_satisfies_.call(null, cljs.core.ICollection, a)
};
cljs.core.set_QMARK_ = function(a) {
  return cljs.core.truth_(cljs.core.nil_QMARK_.call(null, a)) ? !1 : cljs.core.truth_(function() {
    if(cljs.core.truth_(a)) {
      var b = a.cljs$core$ISet$;
      return cljs.core.truth_(b) ? cljs.core.not.call(null, a.hasOwnProperty("cljs$core$ISet$")) : b
    }
    return a
  }()) ? !0 : cljs.core.type_satisfies_.call(null, cljs.core.ISet, a)
};
cljs.core.associative_QMARK_ = function(a) {
  return cljs.core.truth_(function() {
    if(cljs.core.truth_(a)) {
      var b = a.cljs$core$IAssociative$;
      return cljs.core.truth_(b) ? cljs.core.not.call(null, a.hasOwnProperty("cljs$core$IAssociative$")) : b
    }
    return a
  }()) ? !0 : cljs.core.type_satisfies_.call(null, cljs.core.IAssociative, a)
};
cljs.core.sequential_QMARK_ = function(a) {
  return cljs.core.truth_(function() {
    if(cljs.core.truth_(a)) {
      var b = a.cljs$core$ISequential$;
      return cljs.core.truth_(b) ? cljs.core.not.call(null, a.hasOwnProperty("cljs$core$ISequential$")) : b
    }
    return a
  }()) ? !0 : cljs.core.type_satisfies_.call(null, cljs.core.ISequential, a)
};
cljs.core.counted_QMARK_ = function(a) {
  return cljs.core.truth_(function() {
    if(cljs.core.truth_(a)) {
      var b = a.cljs$core$ICounted$;
      return cljs.core.truth_(b) ? cljs.core.not.call(null, a.hasOwnProperty("cljs$core$ICounted$")) : b
    }
    return a
  }()) ? !0 : cljs.core.type_satisfies_.call(null, cljs.core.ICounted, a)
};
cljs.core.map_QMARK_ = function(a) {
  return cljs.core.truth_(cljs.core.nil_QMARK_.call(null, a)) ? !1 : cljs.core.truth_(function() {
    if(cljs.core.truth_(a)) {
      var b = a.cljs$core$IMap$;
      return cljs.core.truth_(b) ? cljs.core.not.call(null, a.hasOwnProperty("cljs$core$IMap$")) : b
    }
    return a
  }()) ? !0 : cljs.core.type_satisfies_.call(null, cljs.core.IMap, a)
};
cljs.core.vector_QMARK_ = function(a) {
  return cljs.core.truth_(function() {
    if(cljs.core.truth_(a)) {
      var b = a.cljs$core$IVector$;
      return cljs.core.truth_(b) ? cljs.core.not.call(null, a.hasOwnProperty("cljs$core$IVector$")) : b
    }
    return a
  }()) ? !0 : cljs.core.type_satisfies_.call(null, cljs.core.IVector, a)
};
cljs.core.js_obj = function() {
  return{}
};
cljs.core.js_keys = function(a) {
  var b = cljs.core.array.call(null);
  goog.object.forEach.call(null, a, function(a, e) {
    return b.push(e)
  });
  return b
};
cljs.core.js_delete = function(a, b) {
  return delete a[b]
};
cljs.core.lookup_sentinel = cljs.core.js_obj.call(null);
cljs.core.false_QMARK_ = function(a) {
  return!1 === a
};
cljs.core.true_QMARK_ = function(a) {
  return!0 === a
};
cljs.core.undefined_QMARK_ = function(a) {
  return void 0 === a
};
cljs.core.instance_QMARK_ = function(a, b) {
  return null != b && (b instanceof a || b.constructor === a || a === Object)
};
cljs.core.seq_QMARK_ = function(a) {
  return cljs.core.truth_(cljs.core.nil_QMARK_.call(null, a)) ? !1 : cljs.core.truth_(function() {
    if(cljs.core.truth_(a)) {
      var b = a.cljs$core$ISeq$;
      return cljs.core.truth_(b) ? cljs.core.not.call(null, a.hasOwnProperty("cljs$core$ISeq$")) : b
    }
    return a
  }()) ? !0 : cljs.core.type_satisfies_.call(null, cljs.core.ISeq, a)
};
cljs.core.boolean$ = function(a) {
  return cljs.core.truth_(a) ? !0 : !1
};
cljs.core.string_QMARK_ = function(a) {
  var b = goog.isString.call(null, a);
  return cljs.core.truth_(b) ? cljs.core.not.call(null, function() {
    var b = cljs.core._EQ_.call(null, a.charAt(0), "\ufdd0");
    return cljs.core.truth_(b) ? b : cljs.core._EQ_.call(null, a.charAt(0), "\ufdd1")
  }()) : b
};
cljs.core.keyword_QMARK_ = function(a) {
  var b = goog.isString.call(null, a);
  return cljs.core.truth_(b) ? cljs.core._EQ_.call(null, a.charAt(0), "\ufdd0") : b
};
cljs.core.symbol_QMARK_ = function(a) {
  var b = goog.isString.call(null, a);
  return cljs.core.truth_(b) ? cljs.core._EQ_.call(null, a.charAt(0), "\ufdd1") : b
};
cljs.core.number_QMARK_ = function(a) {
  return goog.isNumber.call(null, a)
};
cljs.core.fn_QMARK_ = function(a) {
  return goog.isFunction.call(null, a)
};
cljs.core.integer_QMARK_ = function(a) {
  var b = cljs.core.number_QMARK_.call(null, a);
  return cljs.core.truth_(b) ? a == a.toFixed() : b
};
cljs.core.contains_QMARK_ = function(a, b) {
  return cljs.core.truth_(cljs.core._lookup.call(null, a, b, cljs.core.lookup_sentinel) === cljs.core.lookup_sentinel) ? !1 : !0
};
cljs.core.find = function(a, b) {
  return cljs.core.truth_(function() {
    if(cljs.core.truth_(a)) {
      var d = cljs.core.associative_QMARK_.call(null, a);
      return cljs.core.truth_(d) ? cljs.core.contains_QMARK_.call(null, a, b) : d
    }
    return a
  }()) ? cljs.core.Vector.fromArray([b, cljs.core._lookup.call(null, a, b)]) : null
};
cljs.core.distinct_QMARK_ = function() {
  var a = null, b = function() {
    var a = function(a, b, d) {
      if(cljs.core.truth_(cljs.core.not.call(null, cljs.core._EQ_.call(null, a, b)))) {
        a = cljs.core.set([b, a]);
        for(b = d;;) {
          var e = cljs.core.first.call(null, b), d = cljs.core.next.call(null, b);
          if(cljs.core.truth_(b)) {
            if(cljs.core.truth_(cljs.core.contains_QMARK_.call(null, a, e))) {
              return!1
            }
            a = cljs.core.conj.call(null, a, e);
            b = d
          }else {
            return!0
          }
        }
      }else {
        return!1
      }
    }, b = function(b, e, h) {
      var i = null;
      goog.isDef(h) && (i = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
      return a.call(this, b, e, i)
    };
    b.cljs$lang$maxFixedArity = 2;
    b.cljs$lang$applyTo = function(b) {
      var e = cljs.core.first(b), h = cljs.core.first(cljs.core.next(b)), b = cljs.core.rest(cljs.core.next(b));
      return a.call(this, e, h, b)
    };
    return b
  }(), a = function(a, e, f) {
    switch(arguments.length) {
      case 1:
        return!0;
      case 2:
        return cljs.core.not.call(null, cljs.core._EQ_.call(null, a, e));
      default:
        return b.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = b.cljs$lang$applyTo;
  return a
}();
cljs.core.compare = function(a, b) {
  return goog.array.defaultCompare.call(null, a, b)
};
cljs.core.fn__GT_comparator = function(a) {
  return cljs.core.truth_(cljs.core._EQ_.call(null, a, cljs.core.compare)) ? cljs.core.compare : function(b, d) {
    var e = a.call(null, b, d);
    return cljs.core.truth_(cljs.core.number_QMARK_.call(null, e)) ? e : cljs.core.truth_(e) ? -1 : cljs.core.truth_(a.call(null, d, b)) ? 1 : 0
  }
};
cljs.core.sort = function() {
  var a = null;
  return a = function(b, d) {
    switch(arguments.length) {
      case 1:
        return a.call(null, cljs.core.compare, b);
      case 2:
        var e;
        cljs.core.truth_(cljs.core.seq.call(null, d)) ? (e = cljs.core.to_array.call(null, d), goog.array.stableSort.call(null, e, cljs.core.fn__GT_comparator.call(null, b)), e = cljs.core.seq.call(null, e)) : e = cljs.core.List.EMPTY;
        return e
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.sort_by = function() {
  var a = null, b = function(a, b, f) {
    return cljs.core.sort.call(null, function(f, h) {
      return cljs.core.fn__GT_comparator.call(null, b).call(null, a.call(null, f), a.call(null, h))
    }, f)
  };
  return a = function(d, e, f) {
    switch(arguments.length) {
      case 2:
        return a.call(null, d, cljs.core.compare, e);
      case 3:
        return b.call(this, d, e, f)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.reduce = function() {
  var a = null;
  return function(a, d, e) {
    switch(arguments.length) {
      case 2:
        return cljs.core._reduce.call(null, d, a);
      case 3:
        return cljs.core._reduce.call(null, e, a, d)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.seq_reduce = function() {
  var a = null;
  return function(a, d, e) {
    switch(arguments.length) {
      case 2:
        var f;
        f = cljs.core.seq.call(null, d);
        f = cljs.core.truth_(f) ? cljs.core.reduce.call(null, a, cljs.core.first.call(null, f), cljs.core.next.call(null, f)) : a.call(null);
        return f;
      case 3:
        a: {
          for(var g = d, h = cljs.core.seq.call(null, e);;) {
            if(cljs.core.truth_(h)) {
              g = a.call(null, g, cljs.core.first.call(null, h)), h = cljs.core.next.call(null, h)
            }else {
              f = g;
              break a
            }
          }
        }
        return f
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.IReduce._ = !0;
cljs.core._reduce._ = function() {
  var a = null;
  return function(a, d, e) {
    switch(arguments.length) {
      case 2:
        return cljs.core.seq_reduce.call(null, d, a);
      case 3:
        return cljs.core.seq_reduce.call(null, d, e, a)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core._PLUS_ = function() {
  var a = null, b = function() {
    var b = function(b, d, g) {
      var h = null;
      goog.isDef(g) && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
      return cljs.core.reduce.call(null, a, a.call(null, b, d), h)
    };
    b.cljs$lang$maxFixedArity = 2;
    b.cljs$lang$applyTo = function(b) {
      var d = cljs.core.first(b), g = cljs.core.first(cljs.core.next(b)), b = cljs.core.rest(cljs.core.next(b));
      return cljs.core.reduce.call(null, a, a.call(null, d, g), b)
    };
    return b
  }(), a = function(a, e, f) {
    switch(arguments.length) {
      case 0:
        return 0;
      case 1:
        return a;
      case 2:
        return a + e;
      default:
        return b.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = b.cljs$lang$applyTo;
  return a
}();
cljs.core._ = function() {
  var a = null, b = function() {
    var b = function(b, d, g) {
      var h = null;
      goog.isDef(g) && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
      return cljs.core.reduce.call(null, a, a.call(null, b, d), h)
    };
    b.cljs$lang$maxFixedArity = 2;
    b.cljs$lang$applyTo = function(b) {
      var d = cljs.core.first(b), g = cljs.core.first(cljs.core.next(b)), b = cljs.core.rest(cljs.core.next(b));
      return cljs.core.reduce.call(null, a, a.call(null, d, g), b)
    };
    return b
  }(), a = function(a, e, f) {
    switch(arguments.length) {
      case 1:
        return-a;
      case 2:
        return a - e;
      default:
        return b.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = b.cljs$lang$applyTo;
  return a
}();
cljs.core._STAR_ = function() {
  var a = null, b = function() {
    var b = function(b, d, g) {
      var h = null;
      goog.isDef(g) && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
      return cljs.core.reduce.call(null, a, a.call(null, b, d), h)
    };
    b.cljs$lang$maxFixedArity = 2;
    b.cljs$lang$applyTo = function(b) {
      var d = cljs.core.first(b), g = cljs.core.first(cljs.core.next(b)), b = cljs.core.rest(cljs.core.next(b));
      return cljs.core.reduce.call(null, a, a.call(null, d, g), b)
    };
    return b
  }(), a = function(a, e, f) {
    switch(arguments.length) {
      case 0:
        return 1;
      case 1:
        return a;
      case 2:
        return a * e;
      default:
        return b.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = b.cljs$lang$applyTo;
  return a
}();
cljs.core._SLASH_ = function() {
  var a = null, b = function() {
    var b = function(b, d, g) {
      var h = null;
      goog.isDef(g) && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
      return cljs.core.reduce.call(null, a, a.call(null, b, d), h)
    };
    b.cljs$lang$maxFixedArity = 2;
    b.cljs$lang$applyTo = function(b) {
      var d = cljs.core.first(b), g = cljs.core.first(cljs.core.next(b)), b = cljs.core.rest(cljs.core.next(b));
      return cljs.core.reduce.call(null, a, a.call(null, d, g), b)
    };
    return b
  }(), a = function(a, e, f) {
    switch(arguments.length) {
      case 1:
        return 1 / a;
      case 2:
        return a / e;
      default:
        return b.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = b.cljs$lang$applyTo;
  return a
}();
cljs.core._LT_ = function() {
  var a = null, b = function() {
    var b = function(b, d, e) {
      for(;;) {
        if(cljs.core.truth_(a.call(null, b, d))) {
          if(cljs.core.truth_(cljs.core.next.call(null, e))) {
            b = d, d = cljs.core.first.call(null, e), e = cljs.core.next.call(null, e)
          }else {
            return a.call(null, d, cljs.core.first.call(null, e))
          }
        }else {
          return!1
        }
      }
    }, e = function(a, e, h) {
      var i = null;
      goog.isDef(h) && (i = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
      return b.call(this, a, e, i)
    };
    e.cljs$lang$maxFixedArity = 2;
    e.cljs$lang$applyTo = function(a) {
      var e = cljs.core.first(a), h = cljs.core.first(cljs.core.next(a)), a = cljs.core.rest(cljs.core.next(a));
      return b.call(this, e, h, a)
    };
    return e
  }(), a = function(a, e, f) {
    switch(arguments.length) {
      case 1:
        return!0;
      case 2:
        return a < e;
      default:
        return b.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = b.cljs$lang$applyTo;
  return a
}();
cljs.core._LT__EQ_ = function() {
  var a = null, b = function() {
    var b = function(b, d, e) {
      for(;;) {
        if(cljs.core.truth_(a.call(null, b, d))) {
          if(cljs.core.truth_(cljs.core.next.call(null, e))) {
            b = d, d = cljs.core.first.call(null, e), e = cljs.core.next.call(null, e)
          }else {
            return a.call(null, d, cljs.core.first.call(null, e))
          }
        }else {
          return!1
        }
      }
    }, e = function(a, e, h) {
      var i = null;
      goog.isDef(h) && (i = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
      return b.call(this, a, e, i)
    };
    e.cljs$lang$maxFixedArity = 2;
    e.cljs$lang$applyTo = function(a) {
      var e = cljs.core.first(a), h = cljs.core.first(cljs.core.next(a)), a = cljs.core.rest(cljs.core.next(a));
      return b.call(this, e, h, a)
    };
    return e
  }(), a = function(a, e, f) {
    switch(arguments.length) {
      case 1:
        return!0;
      case 2:
        return a <= e;
      default:
        return b.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = b.cljs$lang$applyTo;
  return a
}();
cljs.core._GT_ = function() {
  var a = null, b = function() {
    var b = function(b, d, e) {
      for(;;) {
        if(cljs.core.truth_(a.call(null, b, d))) {
          if(cljs.core.truth_(cljs.core.next.call(null, e))) {
            b = d, d = cljs.core.first.call(null, e), e = cljs.core.next.call(null, e)
          }else {
            return a.call(null, d, cljs.core.first.call(null, e))
          }
        }else {
          return!1
        }
      }
    }, e = function(a, e, h) {
      var i = null;
      goog.isDef(h) && (i = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
      return b.call(this, a, e, i)
    };
    e.cljs$lang$maxFixedArity = 2;
    e.cljs$lang$applyTo = function(a) {
      var e = cljs.core.first(a), h = cljs.core.first(cljs.core.next(a)), a = cljs.core.rest(cljs.core.next(a));
      return b.call(this, e, h, a)
    };
    return e
  }(), a = function(a, e, f) {
    switch(arguments.length) {
      case 1:
        return!0;
      case 2:
        return a > e;
      default:
        return b.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = b.cljs$lang$applyTo;
  return a
}();
cljs.core._GT__EQ_ = function() {
  var a = null, b = function() {
    var b = function(b, d, e) {
      for(;;) {
        if(cljs.core.truth_(a.call(null, b, d))) {
          if(cljs.core.truth_(cljs.core.next.call(null, e))) {
            b = d, d = cljs.core.first.call(null, e), e = cljs.core.next.call(null, e)
          }else {
            return a.call(null, d, cljs.core.first.call(null, e))
          }
        }else {
          return!1
        }
      }
    }, e = function(a, e, h) {
      var i = null;
      goog.isDef(h) && (i = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
      return b.call(this, a, e, i)
    };
    e.cljs$lang$maxFixedArity = 2;
    e.cljs$lang$applyTo = function(a) {
      var e = cljs.core.first(a), h = cljs.core.first(cljs.core.next(a)), a = cljs.core.rest(cljs.core.next(a));
      return b.call(this, e, h, a)
    };
    return e
  }(), a = function(a, e, f) {
    switch(arguments.length) {
      case 1:
        return!0;
      case 2:
        return a >= e;
      default:
        return b.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = b.cljs$lang$applyTo;
  return a
}();
cljs.core.dec = function(a) {
  return a - 1
};
cljs.core.max = function() {
  var a = null, b = function() {
    var b = function(b, d, g) {
      var h = null;
      goog.isDef(g) && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
      return cljs.core.reduce.call(null, a, a.call(null, b, d), h)
    };
    b.cljs$lang$maxFixedArity = 2;
    b.cljs$lang$applyTo = function(b) {
      var d = cljs.core.first(b), g = cljs.core.first(cljs.core.next(b)), b = cljs.core.rest(cljs.core.next(b));
      return cljs.core.reduce.call(null, a, a.call(null, d, g), b)
    };
    return b
  }(), a = function(a, e, f) {
    switch(arguments.length) {
      case 1:
        return a;
      case 2:
        return a > e ? a : e;
      default:
        return b.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = b.cljs$lang$applyTo;
  return a
}();
cljs.core.min = function() {
  var a = null, b = function() {
    var b = function(b, d, g) {
      var h = null;
      goog.isDef(g) && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
      return cljs.core.reduce.call(null, a, a.call(null, b, d), h)
    };
    b.cljs$lang$maxFixedArity = 2;
    b.cljs$lang$applyTo = function(b) {
      var d = cljs.core.first(b), g = cljs.core.first(cljs.core.next(b)), b = cljs.core.rest(cljs.core.next(b));
      return cljs.core.reduce.call(null, a, a.call(null, d, g), b)
    };
    return b
  }(), a = function(a, e, f) {
    switch(arguments.length) {
      case 1:
        return a;
      case 2:
        return a < e ? a : e;
      default:
        return b.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = b.cljs$lang$applyTo;
  return a
}();
cljs.core.fix = function(a) {
  return cljs.core.truth_(0 <= a) ? Math.floor.call(null, a) : Math.ceil.call(null, a)
};
cljs.core.mod = function(a, b) {
  return a % b
};
cljs.core.quot = function(a, b) {
  return cljs.core.fix.call(null, (a - a % b) / b)
};
cljs.core.rem = function(a, b) {
  var d = cljs.core.quot.call(null, a, b);
  return a - b * d
};
cljs.core.rand = function() {
  var a = null;
  return a = function(b) {
    switch(arguments.length) {
      case 0:
        return Math.random.call(null);
      case 1:
        return b * a.call(null)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.rand_int = function(a) {
  return cljs.core.fix.call(null, cljs.core.rand.call(null, a))
};
cljs.core.bit_xor = function(a, b) {
  return a ^ b
};
cljs.core.bit_and = function(a, b) {
  return a & b
};
cljs.core.bit_or = function(a, b) {
  return a | b
};
cljs.core.bit_and_not = function(a, b) {
  return a & ~b
};
cljs.core.bit_clear = function(a, b) {
  return a & ~(1 << b)
};
cljs.core.bit_flip = function(a, b) {
  return a ^ 1 << b
};
cljs.core.bit_not = function(a) {
  return~a
};
cljs.core.bit_set = function(a, b) {
  return a | 1 << b
};
cljs.core.bit_test = function(a, b) {
  return 0 != (a & 1 << b)
};
cljs.core.bit_shift_left = function(a, b) {
  return a << b
};
cljs.core.bit_shift_right = function(a, b) {
  return a >> b
};
cljs.core._EQ__EQ_ = function() {
  var a = null, b = function() {
    var b = function(b, d, e) {
      for(;;) {
        if(cljs.core.truth_(a.call(null, b, d))) {
          if(cljs.core.truth_(cljs.core.next.call(null, e))) {
            b = d, d = cljs.core.first.call(null, e), e = cljs.core.next.call(null, e)
          }else {
            return a.call(null, d, cljs.core.first.call(null, e))
          }
        }else {
          return!1
        }
      }
    }, e = function(a, e, h) {
      var i = null;
      goog.isDef(h) && (i = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
      return b.call(this, a, e, i)
    };
    e.cljs$lang$maxFixedArity = 2;
    e.cljs$lang$applyTo = function(a) {
      var e = cljs.core.first(a), h = cljs.core.first(cljs.core.next(a)), a = cljs.core.rest(cljs.core.next(a));
      return b.call(this, e, h, a)
    };
    return e
  }(), a = function(a, e, f) {
    switch(arguments.length) {
      case 1:
        return!0;
      case 2:
        return cljs.core._equiv.call(null, a, e);
      default:
        return b.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = b.cljs$lang$applyTo;
  return a
}();
cljs.core.pos_QMARK_ = function(a) {
  return 0 < a
};
cljs.core.zero_QMARK_ = function(a) {
  return 0 === a
};
cljs.core.neg_QMARK_ = function(a) {
  return 0 > a
};
cljs.core.nthnext = function(a, b) {
  for(var d = b, e = cljs.core.seq.call(null, a);;) {
    if(cljs.core.truth_(function() {
      var a = e;
      return cljs.core.truth_(a) ? 0 < d : a
    }())) {
      var f = d - 1, g = cljs.core.next.call(null, e), d = f, e = g
    }else {
      return e
    }
  }
};
cljs.core.IIndexed._ = !0;
cljs.core._nth._ = function() {
  var a = null;
  return function(a, d, e) {
    switch(arguments.length) {
      case 2:
        var f;
        f = cljs.core.nthnext.call(null, a, d);
        if(cljs.core.truth_(f)) {
          f = cljs.core.first.call(null, f)
        }else {
          throw Error("Index out of bounds");
        }
        return f;
      case 3:
        return f = cljs.core.nthnext.call(null, a, d), f = cljs.core.truth_(f) ? cljs.core.first.call(null, f) : e, f
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.str_STAR_ = function() {
  var a = null, b = function() {
    var b = function(b, d) {
      return function(b, d) {
        for(;;) {
          if(cljs.core.truth_(d)) {
            var e = b.append(a.call(null, cljs.core.first.call(null, d))), f = cljs.core.next.call(null, d), b = e, d = f
          }else {
            return a.call(null, b)
          }
        }
      }.call(null, new goog.string.StringBuffer(a.call(null, b)), d)
    }, e = function(a, e) {
      var h = null;
      goog.isDef(e) && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
      return b.call(this, a, h)
    };
    e.cljs$lang$maxFixedArity = 1;
    e.cljs$lang$applyTo = function(a) {
      var e = cljs.core.first(a), a = cljs.core.rest(a);
      return b.call(this, e, a)
    };
    return e
  }(), a = function(a, e) {
    switch(arguments.length) {
      case 0:
        return"";
      case 1:
        return cljs.core.truth_(cljs.core.nil_QMARK_.call(null, a)) ? "" : cljs.core.truth_("\ufdd0'else") ? a.toString() : null;
      default:
        return b.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 1;
  a.cljs$lang$applyTo = b.cljs$lang$applyTo;
  return a
}();
cljs.core.str = function() {
  var a = null, b = function() {
    var a = function(a, b) {
      var d = null;
      goog.isDef(b) && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
      return cljs.core.apply.call(null, cljs.core.str_STAR_, a, d)
    };
    a.cljs$lang$maxFixedArity = 1;
    a.cljs$lang$applyTo = function(a) {
      var b = cljs.core.first(a), a = cljs.core.rest(a);
      return cljs.core.apply.call(null, cljs.core.str_STAR_, b, a)
    };
    return a
  }(), a = function(a, e) {
    switch(arguments.length) {
      case 0:
        return"";
      case 1:
        return cljs.core.truth_(cljs.core.symbol_QMARK_.call(null, a)) ? a.substring(2, a.length) : cljs.core.truth_(cljs.core.keyword_QMARK_.call(null, a)) ? cljs.core.str_STAR_.call(null, ":", a.substring(2, a.length)) : cljs.core.truth_(cljs.core.nil_QMARK_.call(null, a)) ? "" : cljs.core.truth_("\ufdd0'else") ? a.toString() : null;
      default:
        return b.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 1;
  a.cljs$lang$applyTo = b.cljs$lang$applyTo;
  return a
}();
cljs.core.subs = function() {
  var a = null;
  return function(a, d, e) {
    switch(arguments.length) {
      case 2:
        return a.substring(d);
      case 3:
        return a.substring(d, e)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.symbol = function() {
  var a = null;
  return a = function(b, d) {
    switch(arguments.length) {
      case 1:
        return cljs.core.truth_(cljs.core.symbol_QMARK_.call(null, b)) || cljs.core.truth_(cljs.core.keyword_QMARK_.call(null, b)) && cljs.core.str_STAR_.call(null, "\ufdd1", "'", cljs.core.subs.call(null, b, 2)), cljs.core.str_STAR_.call(null, "\ufdd1", "'", b);
      case 2:
        return a.call(null, cljs.core.str_STAR_.call(null, b, "/", d))
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.keyword = function() {
  var a = null;
  return a = function(b, d) {
    switch(arguments.length) {
      case 1:
        return cljs.core.truth_(cljs.core.keyword_QMARK_.call(null, b)) ? b : cljs.core.truth_(cljs.core.symbol_QMARK_.call(null, b)) ? cljs.core.str_STAR_.call(null, "\ufdd0", "'", cljs.core.subs.call(null, b, 2)) : cljs.core.truth_("\ufdd0'else") ? cljs.core.str_STAR_.call(null, "\ufdd0", "'", b) : null;
      case 2:
        return a.call(null, cljs.core.str_STAR_.call(null, b, "/", d))
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.equiv_sequential = function(a, b) {
  return cljs.core.boolean$.call(null, cljs.core.truth_(cljs.core.sequential_QMARK_.call(null, b)) ? function() {
    for(var d = cljs.core.seq.call(null, a), e = cljs.core.seq.call(null, b);;) {
      if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null, d))) {
        return cljs.core.nil_QMARK_.call(null, e)
      }
      if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null, e))) {
        return!1
      }
      if(cljs.core.truth_(cljs.core._EQ_.call(null, cljs.core.first.call(null, d), cljs.core.first.call(null, e)))) {
        d = cljs.core.next.call(null, d), e = cljs.core.next.call(null, e)
      }else {
        return cljs.core.truth_("\ufdd0'else") ? !1 : null
      }
    }
  }() : null)
};
cljs.core.hash_combine = function(a, b) {
  return a ^ b + 2654435769 + (a << 6) + (a >> 2)
};
cljs.core.hash_coll = function(a) {
  return cljs.core.reduce.call(null, function(a, d) {
    return cljs.core.hash_combine.call(null, a, cljs.core.hash.call(null, d))
  }, cljs.core.hash.call(null, cljs.core.first.call(null, a)), cljs.core.next.call(null, a))
};
cljs.core.extend_object_BANG_ = function(a, b) {
  var d = cljs.core.seq.call(null, b);
  if(cljs.core.truth_(d)) {
    var e = cljs.core.first.call(null, d);
    cljs.core.nth.call(null, e, 0, null);
    for(cljs.core.nth.call(null, e, 1, null);;) {
      var f = e, e = cljs.core.nth.call(null, f, 0, null), f = cljs.core.nth.call(null, f, 1, null), e = cljs.core.name.call(null, e);
      a[e] = f;
      d = cljs.core.next.call(null, d);
      if(cljs.core.truth_(d)) {
        e = d, d = cljs.core.first.call(null, e), f = e, e = d, d = f
      }else {
        break
      }
    }
  }
  return a
};
cljs.core.List = function(a, b, d, e) {
  this.meta = a;
  this.first = b;
  this.rest = d;
  this.count = e
};
cljs.core.List.prototype.cljs$core$IHash$ = !0;
cljs.core.List.prototype.cljs$core$IHash$_hash = function(a) {
  return cljs.core.hash_coll.call(null, a)
};
cljs.core.List.prototype.cljs$core$ISequential$ = !0;
cljs.core.List.prototype.cljs$core$ICollection$ = !0;
cljs.core.List.prototype.cljs$core$ICollection$_conj = function(a, b) {
  return new cljs.core.List(this.meta, b, a, this.count + 1)
};
cljs.core.List.prototype.cljs$core$ISeqable$ = !0;
cljs.core.List.prototype.cljs$core$ISeqable$_seq = function(a) {
  return a
};
cljs.core.List.prototype.cljs$core$ICounted$ = !0;
cljs.core.List.prototype.cljs$core$ICounted$_count = function() {
  return this.count
};
cljs.core.List.prototype.cljs$core$IStack$ = !0;
cljs.core.List.prototype.cljs$core$IStack$_peek = function() {
  return this.first
};
cljs.core.List.prototype.cljs$core$IStack$_pop = function(a) {
  return cljs.core._rest.call(null, a)
};
cljs.core.List.prototype.cljs$core$ISeq$ = !0;
cljs.core.List.prototype.cljs$core$ISeq$_first = function() {
  return this.first
};
cljs.core.List.prototype.cljs$core$ISeq$_rest = function() {
  return this.rest
};
cljs.core.List.prototype.cljs$core$IEquiv$ = !0;
cljs.core.List.prototype.cljs$core$IEquiv$_equiv = function(a, b) {
  return cljs.core.equiv_sequential.call(null, a, b)
};
cljs.core.List.prototype.cljs$core$IWithMeta$ = !0;
cljs.core.List.prototype.cljs$core$IWithMeta$_with_meta = function(a, b) {
  return new cljs.core.List(b, this.first, this.rest, this.count)
};
cljs.core.List.prototype.cljs$core$IMeta$ = !0;
cljs.core.List.prototype.cljs$core$IMeta$_meta = function() {
  return this.meta
};
cljs.core.List.prototype.cljs$core$IEmptyableCollection$ = !0;
cljs.core.List.prototype.cljs$core$IEmptyableCollection$_empty = function() {
  return cljs.core.List.EMPTY
};
cljs.core.EmptyList = function(a) {
  this.meta = a
};
cljs.core.EmptyList.prototype.cljs$core$IHash$ = !0;
cljs.core.EmptyList.prototype.cljs$core$IHash$_hash = function(a) {
  return cljs.core.hash_coll.call(null, a)
};
cljs.core.EmptyList.prototype.cljs$core$ISequential$ = !0;
cljs.core.EmptyList.prototype.cljs$core$ICollection$ = !0;
cljs.core.EmptyList.prototype.cljs$core$ICollection$_conj = function(a, b) {
  return new cljs.core.List(this.meta, b, null, 1)
};
cljs.core.EmptyList.prototype.cljs$core$ISeqable$ = !0;
cljs.core.EmptyList.prototype.cljs$core$ISeqable$_seq = function() {
  return null
};
cljs.core.EmptyList.prototype.cljs$core$ICounted$ = !0;
cljs.core.EmptyList.prototype.cljs$core$ICounted$_count = function() {
  return 0
};
cljs.core.EmptyList.prototype.cljs$core$IStack$ = !0;
cljs.core.EmptyList.prototype.cljs$core$IStack$_peek = function() {
  return null
};
cljs.core.EmptyList.prototype.cljs$core$IStack$_pop = function() {
  return null
};
cljs.core.EmptyList.prototype.cljs$core$ISeq$ = !0;
cljs.core.EmptyList.prototype.cljs$core$ISeq$_first = function() {
  return null
};
cljs.core.EmptyList.prototype.cljs$core$ISeq$_rest = function() {
  return null
};
cljs.core.EmptyList.prototype.cljs$core$IEquiv$ = !0;
cljs.core.EmptyList.prototype.cljs$core$IEquiv$_equiv = function(a, b) {
  return cljs.core.equiv_sequential.call(null, a, b)
};
cljs.core.EmptyList.prototype.cljs$core$IWithMeta$ = !0;
cljs.core.EmptyList.prototype.cljs$core$IWithMeta$_with_meta = function(a, b) {
  return new cljs.core.EmptyList(b)
};
cljs.core.EmptyList.prototype.cljs$core$IMeta$ = !0;
cljs.core.EmptyList.prototype.cljs$core$IMeta$_meta = function() {
  return this.meta
};
cljs.core.EmptyList.prototype.cljs$core$IEmptyableCollection$ = !0;
cljs.core.EmptyList.prototype.cljs$core$IEmptyableCollection$_empty = function(a) {
  return a
};
cljs.core.List.EMPTY = new cljs.core.EmptyList(null);
cljs.core.reverse = function(a) {
  return cljs.core.reduce.call(null, cljs.core.conj, cljs.core.List.EMPTY, a)
};
cljs.core.list = function() {
  var a = function(a) {
    return cljs.core.reduce.call(null, cljs.core.conj, cljs.core.List.EMPTY, cljs.core.reverse.call(null, a))
  }, b = function(b) {
    var e = null;
    goog.isDef(b) && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return a.call(this, e)
  };
  b.cljs$lang$maxFixedArity = 0;
  b.cljs$lang$applyTo = function(b) {
    b = cljs.core.seq(b);
    return a.call(this, b)
  };
  return b
}();
cljs.core.Cons = function(a, b, d) {
  this.meta = a;
  this.first = b;
  this.rest = d
};
cljs.core.Cons.prototype.cljs$core$ISeqable$ = !0;
cljs.core.Cons.prototype.cljs$core$ISeqable$_seq = function(a) {
  return a
};
cljs.core.Cons.prototype.cljs$core$IHash$ = !0;
cljs.core.Cons.prototype.cljs$core$IHash$_hash = function(a) {
  return cljs.core.hash_coll.call(null, a)
};
cljs.core.Cons.prototype.cljs$core$IEquiv$ = !0;
cljs.core.Cons.prototype.cljs$core$IEquiv$_equiv = function(a, b) {
  return cljs.core.equiv_sequential.call(null, a, b)
};
cljs.core.Cons.prototype.cljs$core$ISequential$ = !0;
cljs.core.Cons.prototype.cljs$core$IEmptyableCollection$ = !0;
cljs.core.Cons.prototype.cljs$core$IEmptyableCollection$_empty = function() {
  return cljs.core.with_meta.call(null, cljs.core.List.EMPTY, this.meta)
};
cljs.core.Cons.prototype.cljs$core$ICollection$ = !0;
cljs.core.Cons.prototype.cljs$core$ICollection$_conj = function(a, b) {
  return new cljs.core.Cons(null, b, a)
};
cljs.core.Cons.prototype.cljs$core$ISeq$ = !0;
cljs.core.Cons.prototype.cljs$core$ISeq$_first = function() {
  return this.first
};
cljs.core.Cons.prototype.cljs$core$ISeq$_rest = function() {
  return cljs.core.truth_(cljs.core.nil_QMARK_.call(null, this.rest)) ? cljs.core.List.EMPTY : this.rest
};
cljs.core.Cons.prototype.cljs$core$IMeta$ = !0;
cljs.core.Cons.prototype.cljs$core$IMeta$_meta = function() {
  return this.meta
};
cljs.core.Cons.prototype.cljs$core$IWithMeta$ = !0;
cljs.core.Cons.prototype.cljs$core$IWithMeta$_with_meta = function(a, b) {
  return new cljs.core.Cons(b, this.first, this.rest)
};
cljs.core.cons = function(a, b) {
  return new cljs.core.Cons(null, a, b)
};
cljs.core.IReduce.string = !0;
cljs.core._reduce.string = function() {
  var a = null;
  return function(a, d, e) {
    switch(arguments.length) {
      case 2:
        return cljs.core.ci_reduce.call(null, a, d);
      case 3:
        return cljs.core.ci_reduce.call(null, a, d, e)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.ILookup.string = !0;
cljs.core._lookup.string = function() {
  var a = null;
  return function(a, d, e) {
    switch(arguments.length) {
      case 2:
        return cljs.core._nth.call(null, a, d);
      case 3:
        return cljs.core._nth.call(null, a, d, e)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.IIndexed.string = !0;
cljs.core._nth.string = function() {
  var a = null;
  return function(a, d, e) {
    switch(arguments.length) {
      case 2:
        return cljs.core.truth_(d < cljs.core._count.call(null, a)) ? a.charAt(d) : null;
      case 3:
        return cljs.core.truth_(d < cljs.core._count.call(null, a)) ? a.charAt(d) : e
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.ICounted.string = !0;
cljs.core._count.string = function(a) {
  return a.length
};
cljs.core.ISeqable.string = !0;
cljs.core._seq.string = function(a) {
  return cljs.core.prim_seq.call(null, a, 0)
};
cljs.core.IHash.string = !0;
cljs.core._hash.string = function(a) {
  return goog.string.hashCode.call(null, a)
};
String.prototype.call = function() {
  var a = null;
  return function(a, d, e) {
    switch(arguments.length) {
      case 2:
        return cljs.core.get.call(null, d, this.toString());
      case 3:
        return cljs.core.get.call(null, d, this.toString(), e)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
String.prototype.apply = function(a, b) {
  return cljs.core.truth_(2 > cljs.core.count.call(null, b)) ? cljs.core.get.call(null, b[0], a) : cljs.core.get.call(null, b[0], a, b[1])
};
cljs.core.lazy_seq_value = function(a) {
  var b = a.x;
  if(cljs.core.truth_(a.realized)) {
    return b
  }
  a.x = b.call(null);
  a.realized = !0;
  return a.x
};
cljs.core.LazySeq = function(a, b, d) {
  this.meta = a;
  this.realized = b;
  this.x = d
};
cljs.core.LazySeq.prototype.cljs$core$ISeqable$ = !0;
cljs.core.LazySeq.prototype.cljs$core$ISeqable$_seq = function(a) {
  return cljs.core.seq.call(null, cljs.core.lazy_seq_value.call(null, a))
};
cljs.core.LazySeq.prototype.cljs$core$IHash$ = !0;
cljs.core.LazySeq.prototype.cljs$core$IHash$_hash = function(a) {
  return cljs.core.hash_coll.call(null, a)
};
cljs.core.LazySeq.prototype.cljs$core$IEquiv$ = !0;
cljs.core.LazySeq.prototype.cljs$core$IEquiv$_equiv = function(a, b) {
  return cljs.core.equiv_sequential.call(null, a, b)
};
cljs.core.LazySeq.prototype.cljs$core$ISequential$ = !0;
cljs.core.LazySeq.prototype.cljs$core$IEmptyableCollection$ = !0;
cljs.core.LazySeq.prototype.cljs$core$IEmptyableCollection$_empty = function() {
  return cljs.core.with_meta.call(null, cljs.core.List.EMPTY, this.meta)
};
cljs.core.LazySeq.prototype.cljs$core$ICollection$ = !0;
cljs.core.LazySeq.prototype.cljs$core$ICollection$_conj = function(a, b) {
  return cljs.core.cons.call(null, b, a)
};
cljs.core.LazySeq.prototype.cljs$core$ISeq$ = !0;
cljs.core.LazySeq.prototype.cljs$core$ISeq$_first = function(a) {
  return cljs.core.first.call(null, cljs.core.lazy_seq_value.call(null, a))
};
cljs.core.LazySeq.prototype.cljs$core$ISeq$_rest = function(a) {
  return cljs.core.rest.call(null, cljs.core.lazy_seq_value.call(null, a))
};
cljs.core.LazySeq.prototype.cljs$core$IMeta$ = !0;
cljs.core.LazySeq.prototype.cljs$core$IMeta$_meta = function() {
  return this.meta
};
cljs.core.LazySeq.prototype.cljs$core$IWithMeta$ = !0;
cljs.core.LazySeq.prototype.cljs$core$IWithMeta$_with_meta = function(a, b) {
  return new cljs.core.LazySeq(b, this.realized, this.x)
};
cljs.core.to_array = function(a) {
  for(var b = cljs.core.array.call(null);;) {
    if(cljs.core.truth_(cljs.core.seq.call(null, a))) {
      b.push(cljs.core.first.call(null, a)), a = cljs.core.next.call(null, a)
    }else {
      return b
    }
  }
};
cljs.core.bounded_count = function(a, b) {
  for(var d = a, e = b, f = 0;;) {
    if(cljs.core.truth_(function() {
      var a = 0 < e;
      return cljs.core.truth_(a) ? cljs.core.seq.call(null, d) : a
    }())) {
      var g = cljs.core.next.call(null, d), h = e - 1, f = f + 1, d = g, e = h
    }else {
      return f
    }
  }
};
cljs.core.spread = function spread(b) {
  return cljs.core.truth_(cljs.core.nil_QMARK_.call(null, b)) ? null : cljs.core.truth_(cljs.core.nil_QMARK_.call(null, cljs.core.next.call(null, b))) ? cljs.core.seq.call(null, cljs.core.first.call(null, b)) : cljs.core.truth_("\ufdd0'else") ? cljs.core.cons.call(null, cljs.core.first.call(null, b), spread.call(null, cljs.core.next.call(null, b))) : null
};
cljs.core.concat = function() {
  var a = null, b = function() {
    return new cljs.core.LazySeq(null, !1, function() {
      return null
    })
  }, d = function(a) {
    return new cljs.core.LazySeq(null, !1, function() {
      return a
    })
  }, e = function(b, d) {
    return new cljs.core.LazySeq(null, !1, function() {
      var e = cljs.core.seq.call(null, b);
      return cljs.core.truth_(e) ? cljs.core.cons.call(null, cljs.core.first.call(null, e), a.call(null, cljs.core.rest.call(null, e), d)) : d
    })
  }, f = function() {
    var b = function(b, d, e) {
      return function m(a, b) {
        return new cljs.core.LazySeq(null, !1, function() {
          var d = cljs.core.seq.call(null, a);
          return cljs.core.truth_(d) ? cljs.core.cons.call(null, cljs.core.first.call(null, d), m.call(null, cljs.core.rest.call(null, d), b)) : cljs.core.truth_(b) ? m.call(null, cljs.core.first.call(null, b), cljs.core.next.call(null, b)) : null
        })
      }.call(null, a.call(null, b, d), e)
    }, d = function(a, d, e) {
      var f = null;
      goog.isDef(e) && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
      return b.call(this, a, d, f)
    };
    d.cljs$lang$maxFixedArity = 2;
    d.cljs$lang$applyTo = function(a) {
      var d = cljs.core.first(a), e = cljs.core.first(cljs.core.next(a)), a = cljs.core.rest(cljs.core.next(a));
      return b.call(this, d, e, a)
    };
    return d
  }(), a = function(a, h, i) {
    switch(arguments.length) {
      case 0:
        return b.call(this);
      case 1:
        return d.call(this, a);
      case 2:
        return e.call(this, a, h);
      default:
        return f.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = f.cljs$lang$applyTo;
  return a
}();
cljs.core.list_STAR_ = function() {
  var a = null, b = function() {
    var a = function(a, b, d, e, j) {
      return cljs.core.cons.call(null, a, cljs.core.cons.call(null, b, cljs.core.cons.call(null, d, cljs.core.cons.call(null, e, cljs.core.spread.call(null, j)))))
    }, b = function(b, e, h, i, j) {
      var k = null;
      goog.isDef(j) && (k = cljs.core.array_seq(Array.prototype.slice.call(arguments, 4), 0));
      return a.call(this, b, e, h, i, k)
    };
    b.cljs$lang$maxFixedArity = 4;
    b.cljs$lang$applyTo = function(b) {
      var e = cljs.core.first(b), h = cljs.core.first(cljs.core.next(b)), i = cljs.core.first(cljs.core.next(cljs.core.next(b))), j = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(b)))), b = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(b))));
      return a.call(this, e, h, i, j, b)
    };
    return b
  }(), a = function(a, e, f, g, h) {
    switch(arguments.length) {
      case 1:
        return cljs.core.seq.call(null, a);
      case 2:
        return cljs.core.cons.call(null, a, e);
      case 3:
        return cljs.core.cons.call(null, a, cljs.core.cons.call(null, e, f));
      case 4:
        return cljs.core.cons.call(null, a, cljs.core.cons.call(null, e, cljs.core.cons.call(null, f, g)));
      default:
        return b.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 4;
  a.cljs$lang$applyTo = b.cljs$lang$applyTo;
  return a
}();
cljs.core.apply = function() {
  var a = null, b = function() {
    var a = function(a, b, d, e, j, k) {
      b = cljs.core.cons.call(null, b, cljs.core.cons.call(null, d, cljs.core.cons.call(null, e, cljs.core.cons.call(null, j, cljs.core.spread.call(null, k)))));
      d = a.cljs$lang$maxFixedArity;
      return cljs.core.truth_(a.cljs$lang$applyTo) ? cljs.core.truth_(cljs.core.bounded_count.call(null, b, d) <= d) ? a.apply(a, cljs.core.to_array.call(null, b)) : a.cljs$lang$applyTo(b) : a.apply(a, cljs.core.to_array.call(null, b))
    }, b = function(b, e, h, i, j, k) {
      var n = null;
      goog.isDef(k) && (n = cljs.core.array_seq(Array.prototype.slice.call(arguments, 5), 0));
      return a.call(this, b, e, h, i, j, n)
    };
    b.cljs$lang$maxFixedArity = 5;
    b.cljs$lang$applyTo = function(b) {
      var e = cljs.core.first(b), h = cljs.core.first(cljs.core.next(b)), i = cljs.core.first(cljs.core.next(cljs.core.next(b))), j = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(b)))), k = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(cljs.core.next(b))))), b = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(cljs.core.next(b)))));
      return a.call(this, e, h, i, j, k, b)
    };
    return b
  }(), a = function(a, e, f, g, h, i) {
    switch(arguments.length) {
      case 2:
        var j = a, k = e, n = j.cljs$lang$maxFixedArity;
        return cljs.core.truth_(j.cljs$lang$applyTo) ? cljs.core.truth_(cljs.core.bounded_count.call(null, k, n + 1) <= n) ? j.apply(j, cljs.core.to_array.call(null, k)) : j.cljs$lang$applyTo(k) : j.apply(j, cljs.core.to_array.call(null, k));
      case 3:
        return j = a, k = cljs.core.list_STAR_.call(null, e, f), n = j.cljs$lang$maxFixedArity, cljs.core.truth_(j.cljs$lang$applyTo) ? cljs.core.truth_(cljs.core.bounded_count.call(null, k, n) <= n) ? j.apply(j, cljs.core.to_array.call(null, k)) : j.cljs$lang$applyTo(k) : j.apply(j, cljs.core.to_array.call(null, k));
      case 4:
        return j = a, k = cljs.core.list_STAR_.call(null, e, f, g), n = j.cljs$lang$maxFixedArity, cljs.core.truth_(j.cljs$lang$applyTo) ? cljs.core.truth_(cljs.core.bounded_count.call(null, k, n) <= n) ? j.apply(j, cljs.core.to_array.call(null, k)) : j.cljs$lang$applyTo(k) : j.apply(j, cljs.core.to_array.call(null, k));
      case 5:
        return j = a, k = cljs.core.list_STAR_.call(null, e, f, g, h), n = j.cljs$lang$maxFixedArity, cljs.core.truth_(j.cljs$lang$applyTo) ? cljs.core.truth_(cljs.core.bounded_count.call(null, k, n) <= n) ? j.apply(j, cljs.core.to_array.call(null, k)) : j.cljs$lang$applyTo(k) : j.apply(j, cljs.core.to_array.call(null, k));
      default:
        return b.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 5;
  a.cljs$lang$applyTo = b.cljs$lang$applyTo;
  return a
}();
cljs.core.vary_meta = function() {
  var a = function(a, b, f) {
    return cljs.core.with_meta.call(null, a, cljs.core.apply.call(null, b, cljs.core.meta.call(null, a), f))
  }, b = function(b, e, f) {
    var g = null;
    goog.isDef(f) && (g = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return a.call(this, b, e, g)
  };
  b.cljs$lang$maxFixedArity = 2;
  b.cljs$lang$applyTo = function(b) {
    var e = cljs.core.first(b), f = cljs.core.first(cljs.core.next(b)), b = cljs.core.rest(cljs.core.next(b));
    return a.call(this, e, f, b)
  };
  return b
}();
cljs.core.not_EQ_ = function() {
  var a = null, b = function() {
    var a = function(a, b, d) {
      var h = null;
      goog.isDef(d) && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
      return cljs.core.not.call(null, cljs.core.apply.call(null, cljs.core._EQ_, a, b, h))
    };
    a.cljs$lang$maxFixedArity = 2;
    a.cljs$lang$applyTo = function(a) {
      var b = cljs.core.first(a), d = cljs.core.first(cljs.core.next(a)), a = cljs.core.rest(cljs.core.next(a));
      return cljs.core.not.call(null, cljs.core.apply.call(null, cljs.core._EQ_, b, d, a))
    };
    return a
  }(), a = function(a, e, f) {
    switch(arguments.length) {
      case 1:
        return!1;
      case 2:
        return cljs.core.not.call(null, cljs.core._EQ_.call(null, a, e));
      default:
        return b.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = b.cljs$lang$applyTo;
  return a
}();
cljs.core.not_empty = function(a) {
  return cljs.core.truth_(cljs.core.seq.call(null, a)) ? a : null
};
cljs.core.every_QMARK_ = function(a, b) {
  for(;;) {
    if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null, cljs.core.seq.call(null, b)))) {
      return!0
    }
    if(cljs.core.truth_(a.call(null, cljs.core.first.call(null, b)))) {
      var d = a, e = cljs.core.next.call(null, b), a = d, b = e
    }else {
      return cljs.core.truth_("\ufdd0'else") ? !1 : null
    }
  }
};
cljs.core.not_every_QMARK_ = function(a, b) {
  return cljs.core.not.call(null, cljs.core.every_QMARK_.call(null, a, b))
};
cljs.core.some = function(a, b) {
  for(;;) {
    if(cljs.core.truth_(cljs.core.seq.call(null, b))) {
      var d = a.call(null, cljs.core.first.call(null, b));
      if(cljs.core.truth_(d)) {
        return d
      }
      var d = a, e = cljs.core.next.call(null, b), a = d, b = e
    }else {
      return null
    }
  }
};
cljs.core.not_any_QMARK_ = function(a, b) {
  return cljs.core.not.call(null, cljs.core.some.call(null, a, b))
};
cljs.core.even_QMARK_ = function(a) {
  if(cljs.core.truth_(cljs.core.integer_QMARK_.call(null, a))) {
    return 0 === (a & 1)
  }
  throw Error(cljs.core.str.call(null, "Argument must be an integer: ", a));
};
cljs.core.odd_QMARK_ = function(a) {
  return cljs.core.not.call(null, cljs.core.even_QMARK_.call(null, a))
};
cljs.core.identity = function(a) {
  return a
};
cljs.core.complement = function(a) {
  return function() {
    var b = null, d = function() {
      var b = function(b, d, e) {
        var i = null;
        goog.isDef(e) && (i = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
        return cljs.core.not.call(null, cljs.core.apply.call(null, a, b, d, i))
      };
      b.cljs$lang$maxFixedArity = 2;
      b.cljs$lang$applyTo = function(b) {
        var d = cljs.core.first(b), e = cljs.core.first(cljs.core.next(b)), b = cljs.core.rest(cljs.core.next(b));
        return cljs.core.not.call(null, cljs.core.apply.call(null, a, d, e, b))
      };
      return b
    }(), b = function(b, f, g) {
      switch(arguments.length) {
        case 0:
          return cljs.core.not.call(null, a.call(null));
        case 1:
          return cljs.core.not.call(null, a.call(null, b));
        case 2:
          return cljs.core.not.call(null, a.call(null, b, f));
        default:
          return d.apply(this, arguments)
      }
      throw"Invalid arity: " + arguments.length;
    };
    b.cljs$lang$maxFixedArity = 2;
    b.cljs$lang$applyTo = d.cljs$lang$applyTo;
    return b
  }()
};
cljs.core.constantly = function(a) {
  return function() {
    var b = function(b) {
      goog.isDef(b) && cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0);
      return a
    };
    b.cljs$lang$maxFixedArity = 0;
    b.cljs$lang$applyTo = function(b) {
      cljs.core.seq(b);
      return a
    };
    return b
  }()
};
cljs.core.comp = function() {
  var a = null, b = function(a, b) {
    return function() {
      var d = null, e = function() {
        var d = function(d, e, h, i) {
          var j = null;
          goog.isDef(i) && (j = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
          return a.call(null, cljs.core.apply.call(null, b, d, e, h, j))
        };
        d.cljs$lang$maxFixedArity = 3;
        d.cljs$lang$applyTo = function(d) {
          var e = cljs.core.first(d), h = cljs.core.first(cljs.core.next(d)), i = cljs.core.first(cljs.core.next(cljs.core.next(d))), d = cljs.core.rest(cljs.core.next(cljs.core.next(d)));
          return a.call(null, cljs.core.apply.call(null, b, e, h, i, d))
        };
        return d
      }(), d = function(d, h, n, m) {
        switch(arguments.length) {
          case 0:
            return a.call(null, b.call(null));
          case 1:
            return a.call(null, b.call(null, d));
          case 2:
            return a.call(null, b.call(null, d, h));
          case 3:
            return a.call(null, b.call(null, d, h, n));
          default:
            return e.apply(this, arguments)
        }
        throw"Invalid arity: " + arguments.length;
      };
      d.cljs$lang$maxFixedArity = 3;
      d.cljs$lang$applyTo = e.cljs$lang$applyTo;
      return d
    }()
  }, d = function(a, b, d) {
    return function() {
      var e = null, j = function() {
        var e = function(e, i, j, k) {
          var p = null;
          goog.isDef(k) && (p = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
          return a.call(null, b.call(null, cljs.core.apply.call(null, d, e, i, j, p)))
        };
        e.cljs$lang$maxFixedArity = 3;
        e.cljs$lang$applyTo = function(e) {
          var i = cljs.core.first(e), j = cljs.core.first(cljs.core.next(e)), k = cljs.core.first(cljs.core.next(cljs.core.next(e))), e = cljs.core.rest(cljs.core.next(cljs.core.next(e)));
          return a.call(null, b.call(null, cljs.core.apply.call(null, d, i, j, k, e)))
        };
        return e
      }(), e = function(e, i, m, l) {
        switch(arguments.length) {
          case 0:
            return a.call(null, b.call(null, d.call(null)));
          case 1:
            return a.call(null, b.call(null, d.call(null, e)));
          case 2:
            return a.call(null, b.call(null, d.call(null, e, i)));
          case 3:
            return a.call(null, b.call(null, d.call(null, e, i, m)));
          default:
            return j.apply(this, arguments)
        }
        throw"Invalid arity: " + arguments.length;
      };
      e.cljs$lang$maxFixedArity = 3;
      e.cljs$lang$applyTo = j.cljs$lang$applyTo;
      return e
    }()
  }, e = function() {
    var a = function(a, b, d, e) {
      var f = cljs.core.reverse.call(null, cljs.core.list_STAR_.call(null, a, b, d, e));
      return function() {
        var a = function(a) {
          for(var a = cljs.core.apply.call(null, cljs.core.first.call(null, f), a), b = cljs.core.next.call(null, f);;) {
            if(cljs.core.truth_(b)) {
              a = cljs.core.first.call(null, b).call(null, a), b = cljs.core.next.call(null, b)
            }else {
              return a
            }
          }
        }, b = function(b) {
          var d = null;
          goog.isDef(b) && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
          return a.call(this, d)
        };
        b.cljs$lang$maxFixedArity = 0;
        b.cljs$lang$applyTo = function(b) {
          b = cljs.core.seq(b);
          return a.call(this, b)
        };
        return b
      }()
    }, b = function(b, d, e, g) {
      var n = null;
      goog.isDef(g) && (n = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
      return a.call(this, b, d, e, n)
    };
    b.cljs$lang$maxFixedArity = 3;
    b.cljs$lang$applyTo = function(b) {
      var d = cljs.core.first(b), e = cljs.core.first(cljs.core.next(b)), g = cljs.core.first(cljs.core.next(cljs.core.next(b))), b = cljs.core.rest(cljs.core.next(cljs.core.next(b)));
      return a.call(this, d, e, g, b)
    };
    return b
  }(), a = function(a, g, h, i) {
    switch(arguments.length) {
      case 0:
        return cljs.core.identity;
      case 1:
        return a;
      case 2:
        return b.call(this, a, g);
      case 3:
        return d.call(this, a, g, h);
      default:
        return e.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 3;
  a.cljs$lang$applyTo = e.cljs$lang$applyTo;
  return a
}();
cljs.core.partial = function() {
  var a = null, b = function(a, b) {
    return function() {
      var d = function(d) {
        var e = null;
        goog.isDef(d) && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
        return cljs.core.apply.call(null, a, b, e)
      };
      d.cljs$lang$maxFixedArity = 0;
      d.cljs$lang$applyTo = function(d) {
        d = cljs.core.seq(d);
        return cljs.core.apply.call(null, a, b, d)
      };
      return d
    }()
  }, d = function(a, b, d) {
    return function() {
      var e = function(e) {
        var f = null;
        goog.isDef(e) && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
        return cljs.core.apply.call(null, a, b, d, f)
      };
      e.cljs$lang$maxFixedArity = 0;
      e.cljs$lang$applyTo = function(e) {
        e = cljs.core.seq(e);
        return cljs.core.apply.call(null, a, b, d, e)
      };
      return e
    }()
  }, e = function(a, b, d, e) {
    return function() {
      var f = function(f) {
        var m = null;
        goog.isDef(f) && (m = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
        return cljs.core.apply.call(null, a, b, d, e, m)
      };
      f.cljs$lang$maxFixedArity = 0;
      f.cljs$lang$applyTo = function(f) {
        f = cljs.core.seq(f);
        return cljs.core.apply.call(null, a, b, d, e, f)
      };
      return f
    }()
  }, f = function() {
    var a = function(a, b, d, e, f) {
      return function() {
        var g = function(g) {
          return cljs.core.apply.call(null, a, b, d, e, cljs.core.concat.call(null, f, g))
        }, h = function(a) {
          var b = null;
          goog.isDef(a) && (b = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
          return g.call(this, b)
        };
        h.cljs$lang$maxFixedArity = 0;
        h.cljs$lang$applyTo = function(a) {
          a = cljs.core.seq(a);
          return g.call(this, a)
        };
        return h
      }()
    }, b = function(b, d, e, f, h) {
      var l = null;
      goog.isDef(h) && (l = cljs.core.array_seq(Array.prototype.slice.call(arguments, 4), 0));
      return a.call(this, b, d, e, f, l)
    };
    b.cljs$lang$maxFixedArity = 4;
    b.cljs$lang$applyTo = function(b) {
      var d = cljs.core.first(b), e = cljs.core.first(cljs.core.next(b)), f = cljs.core.first(cljs.core.next(cljs.core.next(b))), h = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(b)))), b = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(b))));
      return a.call(this, d, e, f, h, b)
    };
    return b
  }(), a = function(a, h, i, j, k) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, h);
      case 3:
        return d.call(this, a, h, i);
      case 4:
        return e.call(this, a, h, i, j);
      default:
        return f.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 4;
  a.cljs$lang$applyTo = f.cljs$lang$applyTo;
  return a
}();
cljs.core.fnil = function() {
  var a = null, b = function(a, b) {
    return function() {
      var d = null, e = function() {
        var d = function(d, e, h, i) {
          return cljs.core.apply.call(null, a, cljs.core.truth_(cljs.core.nil_QMARK_.call(null, d)) ? b : d, e, h, i)
        }, e = function(a, b, e, f) {
          var g = null;
          goog.isDef(f) && (g = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
          return d.call(this, a, b, e, g)
        };
        e.cljs$lang$maxFixedArity = 3;
        e.cljs$lang$applyTo = function(a) {
          var b = cljs.core.first(a), e = cljs.core.first(cljs.core.next(a)), f = cljs.core.first(cljs.core.next(cljs.core.next(a))), a = cljs.core.rest(cljs.core.next(cljs.core.next(a)));
          return d.call(this, b, e, f, a)
        };
        return e
      }(), d = function(d, h, n, m) {
        switch(arguments.length) {
          case 1:
            return a.call(null, cljs.core.truth_(cljs.core.nil_QMARK_.call(null, d)) ? b : d);
          case 2:
            return a.call(null, cljs.core.truth_(cljs.core.nil_QMARK_.call(null, d)) ? b : d, h);
          case 3:
            return a.call(null, cljs.core.truth_(cljs.core.nil_QMARK_.call(null, d)) ? b : d, h, n);
          default:
            return e.apply(this, arguments)
        }
        throw"Invalid arity: " + arguments.length;
      };
      d.cljs$lang$maxFixedArity = 3;
      d.cljs$lang$applyTo = e.cljs$lang$applyTo;
      return d
    }()
  }, d = function(a, b, d) {
    return function() {
      var e = null, j = function() {
        var e = function(e, i, j, n) {
          return cljs.core.apply.call(null, a, cljs.core.truth_(cljs.core.nil_QMARK_.call(null, e)) ? b : e, cljs.core.truth_(cljs.core.nil_QMARK_.call(null, i)) ? d : i, j, n)
        }, i = function(a, b, d, f) {
          var g = null;
          goog.isDef(f) && (g = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
          return e.call(this, a, b, d, g)
        };
        i.cljs$lang$maxFixedArity = 3;
        i.cljs$lang$applyTo = function(a) {
          var b = cljs.core.first(a), d = cljs.core.first(cljs.core.next(a)), f = cljs.core.first(cljs.core.next(cljs.core.next(a))), a = cljs.core.rest(cljs.core.next(cljs.core.next(a)));
          return e.call(this, b, d, f, a)
        };
        return i
      }(), e = function(e, i, m, l) {
        switch(arguments.length) {
          case 2:
            return a.call(null, cljs.core.truth_(cljs.core.nil_QMARK_.call(null, e)) ? b : e, cljs.core.truth_(cljs.core.nil_QMARK_.call(null, i)) ? d : i);
          case 3:
            return a.call(null, cljs.core.truth_(cljs.core.nil_QMARK_.call(null, e)) ? b : e, cljs.core.truth_(cljs.core.nil_QMARK_.call(null, i)) ? d : i, m);
          default:
            return j.apply(this, arguments)
        }
        throw"Invalid arity: " + arguments.length;
      };
      e.cljs$lang$maxFixedArity = 3;
      e.cljs$lang$applyTo = j.cljs$lang$applyTo;
      return e
    }()
  }, e = function(a, b, d, e) {
    return function() {
      var j = null, k = function() {
        var j = function(j, o, n, m) {
          return cljs.core.apply.call(null, a, cljs.core.truth_(cljs.core.nil_QMARK_.call(null, j)) ? b : j, cljs.core.truth_(cljs.core.nil_QMARK_.call(null, o)) ? d : o, cljs.core.truth_(cljs.core.nil_QMARK_.call(null, n)) ? e : n, m)
        }, m = function(a, b, d, e) {
          var f = null;
          goog.isDef(e) && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
          return j.call(this, a, b, d, f)
        };
        m.cljs$lang$maxFixedArity = 3;
        m.cljs$lang$applyTo = function(a) {
          var b = cljs.core.first(a), d = cljs.core.first(cljs.core.next(a)), e = cljs.core.first(cljs.core.next(cljs.core.next(a))), a = cljs.core.rest(cljs.core.next(cljs.core.next(a)));
          return j.call(this, b, d, e, a)
        };
        return m
      }(), j = function(j, m, l, o) {
        switch(arguments.length) {
          case 2:
            return a.call(null, cljs.core.truth_(cljs.core.nil_QMARK_.call(null, j)) ? b : j, cljs.core.truth_(cljs.core.nil_QMARK_.call(null, m)) ? d : m);
          case 3:
            return a.call(null, cljs.core.truth_(cljs.core.nil_QMARK_.call(null, j)) ? b : j, cljs.core.truth_(cljs.core.nil_QMARK_.call(null, m)) ? d : m, cljs.core.truth_(cljs.core.nil_QMARK_.call(null, l)) ? e : l);
          default:
            return k.apply(this, arguments)
        }
        throw"Invalid arity: " + arguments.length;
      };
      j.cljs$lang$maxFixedArity = 3;
      j.cljs$lang$applyTo = k.cljs$lang$applyTo;
      return j
    }()
  };
  return function(a, g, h, i) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, g);
      case 3:
        return d.call(this, a, g, h);
      case 4:
        return e.call(this, a, g, h, i)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.map_indexed = function(a, b) {
  return function e(b, g) {
    return new cljs.core.LazySeq(null, !1, function() {
      var h = cljs.core.seq.call(null, g);
      return cljs.core.truth_(h) ? cljs.core.cons.call(null, a.call(null, b, cljs.core.first.call(null, h)), e.call(null, b + 1, cljs.core.rest.call(null, h))) : null
    })
  }.call(null, 0, b)
};
cljs.core.keep = function keep(b, d) {
  return new cljs.core.LazySeq(null, !1, function() {
    var e = cljs.core.seq.call(null, d);
    if(cljs.core.truth_(e)) {
      var f = b.call(null, cljs.core.first.call(null, e));
      return cljs.core.truth_(cljs.core.nil_QMARK_.call(null, f)) ? keep.call(null, b, cljs.core.rest.call(null, e)) : cljs.core.cons.call(null, f, keep.call(null, b, cljs.core.rest.call(null, e)))
    }
    return null
  })
};
cljs.core.keep_indexed = function(a, b) {
  return function e(b, g) {
    return new cljs.core.LazySeq(null, !1, function() {
      var h = cljs.core.seq.call(null, g);
      if(cljs.core.truth_(h)) {
        var i = a.call(null, b, cljs.core.first.call(null, h));
        return cljs.core.truth_(cljs.core.nil_QMARK_.call(null, i)) ? e.call(null, b + 1, cljs.core.rest.call(null, h)) : cljs.core.cons.call(null, i, e.call(null, b + 1, cljs.core.rest.call(null, h)))
      }
      return null
    })
  }.call(null, 0, b)
};
cljs.core.every_pred = function() {
  var a = null, b = function(a) {
    return function() {
      var b = null, d = function(b, d) {
        return cljs.core.boolean$.call(null, function() {
          var e = a.call(null, b);
          return cljs.core.truth_(e) ? a.call(null, d) : e
        }())
      }, e = function(b, d, e) {
        return cljs.core.boolean$.call(null, function() {
          var f = a.call(null, b);
          return cljs.core.truth_(f) ? (f = a.call(null, d), cljs.core.truth_(f) ? a.call(null, e) : f) : f
        }())
      }, f = function() {
        var d = function(d, e, f, i) {
          return cljs.core.boolean$.call(null, function() {
            var j = b.call(null, d, e, f);
            return cljs.core.truth_(j) ? cljs.core.every_QMARK_.call(null, a, i) : j
          }())
        }, e = function(a, b, e, f) {
          var g = null;
          goog.isDef(f) && (g = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
          return d.call(this, a, b, e, g)
        };
        e.cljs$lang$maxFixedArity = 3;
        e.cljs$lang$applyTo = function(a) {
          var b = cljs.core.first(a), e = cljs.core.first(cljs.core.next(a)), f = cljs.core.first(cljs.core.next(cljs.core.next(a))), a = cljs.core.rest(cljs.core.next(cljs.core.next(a)));
          return d.call(this, b, e, f, a)
        };
        return e
      }(), b = function(b, h, l, o) {
        switch(arguments.length) {
          case 0:
            return!0;
          case 1:
            return cljs.core.boolean$.call(null, a.call(null, b));
          case 2:
            return d.call(this, b, h);
          case 3:
            return e.call(this, b, h, l);
          default:
            return f.apply(this, arguments)
        }
        throw"Invalid arity: " + arguments.length;
      };
      b.cljs$lang$maxFixedArity = 3;
      b.cljs$lang$applyTo = f.cljs$lang$applyTo;
      return b
    }()
  }, d = function(a, b) {
    return function() {
      var d = null, e = function(d) {
        return cljs.core.boolean$.call(null, function() {
          var e = a.call(null, d);
          return cljs.core.truth_(e) ? b.call(null, d) : e
        }())
      }, f = function(d, e) {
        return cljs.core.boolean$.call(null, function() {
          var f = a.call(null, d);
          return cljs.core.truth_(f) && (f = a.call(null, e), cljs.core.truth_(f)) ? (f = b.call(null, d), cljs.core.truth_(f) ? b.call(null, e) : f) : f
        }())
      }, n = function(d, e, f) {
        return cljs.core.boolean$.call(null, function() {
          var i = a.call(null, d);
          return cljs.core.truth_(i) && (i = a.call(null, e), cljs.core.truth_(i) && (i = a.call(null, f), cljs.core.truth_(i) && (i = b.call(null, d), cljs.core.truth_(i)))) ? (i = b.call(null, e), cljs.core.truth_(i) ? b.call(null, f) : i) : i
        }())
      }, m = function() {
        var e = function(e, f, j, l) {
          return cljs.core.boolean$.call(null, function() {
            var m = d.call(null, e, f, j);
            return cljs.core.truth_(m) ? cljs.core.every_QMARK_.call(null, function(d) {
              var e = a.call(null, d);
              return cljs.core.truth_(e) ? b.call(null, d) : e
            }, l) : m
          }())
        }, f = function(a, b, d, f) {
          var g = null;
          goog.isDef(f) && (g = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
          return e.call(this, a, b, d, g)
        };
        f.cljs$lang$maxFixedArity = 3;
        f.cljs$lang$applyTo = function(a) {
          var b = cljs.core.first(a), d = cljs.core.first(cljs.core.next(a)), f = cljs.core.first(cljs.core.next(cljs.core.next(a))), a = cljs.core.rest(cljs.core.next(cljs.core.next(a)));
          return e.call(this, b, d, f, a)
        };
        return f
      }(), d = function(a, b, d, g) {
        switch(arguments.length) {
          case 0:
            return!0;
          case 1:
            return e.call(this, a);
          case 2:
            return f.call(this, a, b);
          case 3:
            return n.call(this, a, b, d);
          default:
            return m.apply(this, arguments)
        }
        throw"Invalid arity: " + arguments.length;
      };
      d.cljs$lang$maxFixedArity = 3;
      d.cljs$lang$applyTo = m.cljs$lang$applyTo;
      return d
    }()
  }, e = function(a, b, d) {
    return function() {
      var e = null, f = function(e) {
        return cljs.core.boolean$.call(null, function() {
          var f = a.call(null, e);
          return cljs.core.truth_(f) ? (f = b.call(null, e), cljs.core.truth_(f) ? d.call(null, e) : f) : f
        }())
      }, n = function(e, f) {
        return cljs.core.boolean$.call(null, function() {
          var j = a.call(null, e);
          return cljs.core.truth_(j) && (j = b.call(null, e), cljs.core.truth_(j) && (j = d.call(null, e), cljs.core.truth_(j) && (j = a.call(null, f), cljs.core.truth_(j)))) ? (j = b.call(null, f), cljs.core.truth_(j) ? d.call(null, f) : j) : j
        }())
      }, m = function(e, f, j) {
        return cljs.core.boolean$.call(null, function() {
          var l = a.call(null, e);
          return cljs.core.truth_(l) && (l = b.call(null, e), cljs.core.truth_(l) && (l = d.call(null, e), cljs.core.truth_(l) && (l = a.call(null, f), cljs.core.truth_(l) && (l = b.call(null, f), cljs.core.truth_(l) && (l = d.call(null, f), cljs.core.truth_(l) && (l = a.call(null, j), cljs.core.truth_(l))))))) ? (l = b.call(null, j), cljs.core.truth_(l) ? d.call(null, j) : l) : l
        }())
      }, l = function() {
        var f = function(f, l, m, k) {
          return cljs.core.boolean$.call(null, function() {
            var n = e.call(null, f, l, m);
            return cljs.core.truth_(n) ? cljs.core.every_QMARK_.call(null, function(e) {
              var f = a.call(null, e);
              return cljs.core.truth_(f) ? (f = b.call(null, e), cljs.core.truth_(f) ? d.call(null, e) : f) : f
            }, k) : n
          }())
        }, l = function(a, b, d, e) {
          var g = null;
          goog.isDef(e) && (g = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
          return f.call(this, a, b, d, g)
        };
        l.cljs$lang$maxFixedArity = 3;
        l.cljs$lang$applyTo = function(a) {
          var b = cljs.core.first(a), d = cljs.core.first(cljs.core.next(a)), e = cljs.core.first(cljs.core.next(cljs.core.next(a))), a = cljs.core.rest(cljs.core.next(cljs.core.next(a)));
          return f.call(this, b, d, e, a)
        };
        return l
      }(), e = function(a, b, d, e) {
        switch(arguments.length) {
          case 0:
            return!0;
          case 1:
            return f.call(this, a);
          case 2:
            return n.call(this, a, b);
          case 3:
            return m.call(this, a, b, d);
          default:
            return l.apply(this, arguments)
        }
        throw"Invalid arity: " + arguments.length;
      };
      e.cljs$lang$maxFixedArity = 3;
      e.cljs$lang$applyTo = l.cljs$lang$applyTo;
      return e
    }()
  }, f = function() {
    var a = function(a, b, d, e) {
      var f = cljs.core.list_STAR_.call(null, a, b, d, e);
      return function() {
        var a = null, b = function(a) {
          return cljs.core.every_QMARK_.call(null, function(b) {
            return b.call(null, a)
          }, f)
        }, d = function(a, b) {
          return cljs.core.every_QMARK_.call(null, function(d) {
            var e = d.call(null, a);
            return cljs.core.truth_(e) ? d.call(null, b) : e
          }, f)
        }, e = function(a, b, d) {
          return cljs.core.every_QMARK_.call(null, function(e) {
            var f = e.call(null, a);
            return cljs.core.truth_(f) ? (f = e.call(null, b), cljs.core.truth_(f) ? e.call(null, d) : f) : f
          }, f)
        }, g = function() {
          var b = function(b, d, e, g) {
            return cljs.core.boolean$.call(null, function() {
              var h = a.call(null, b, d, e);
              return cljs.core.truth_(h) ? cljs.core.every_QMARK_.call(null, function(a) {
                return cljs.core.every_QMARK_.call(null, a, g)
              }, f) : h
            }())
          }, d = function(a, d, e, f) {
            var g = null;
            goog.isDef(f) && (g = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
            return b.call(this, a, d, e, g)
          };
          d.cljs$lang$maxFixedArity = 3;
          d.cljs$lang$applyTo = function(a) {
            var d = cljs.core.first(a), e = cljs.core.first(cljs.core.next(a)), f = cljs.core.first(cljs.core.next(cljs.core.next(a))), a = cljs.core.rest(cljs.core.next(cljs.core.next(a)));
            return b.call(this, d, e, f, a)
          };
          return d
        }(), a = function(a, f, h, i) {
          switch(arguments.length) {
            case 0:
              return!0;
            case 1:
              return b.call(this, a);
            case 2:
              return d.call(this, a, f);
            case 3:
              return e.call(this, a, f, h);
            default:
              return g.apply(this, arguments)
          }
          throw"Invalid arity: " + arguments.length;
        };
        a.cljs$lang$maxFixedArity = 3;
        a.cljs$lang$applyTo = g.cljs$lang$applyTo;
        return a
      }()
    }, b = function(b, d, e, f) {
      var h = null;
      goog.isDef(f) && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
      return a.call(this, b, d, e, h)
    };
    b.cljs$lang$maxFixedArity = 3;
    b.cljs$lang$applyTo = function(b) {
      var d = cljs.core.first(b), e = cljs.core.first(cljs.core.next(b)), f = cljs.core.first(cljs.core.next(cljs.core.next(b))), b = cljs.core.rest(cljs.core.next(cljs.core.next(b)));
      return a.call(this, d, e, f, b)
    };
    return b
  }(), a = function(a, h, i, j) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return d.call(this, a, h);
      case 3:
        return e.call(this, a, h, i);
      default:
        return f.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 3;
  a.cljs$lang$applyTo = f.cljs$lang$applyTo;
  return a
}();
cljs.core.some_fn = function() {
  var a = null, b = function(a) {
    return function() {
      var b = null, d = function() {
        var d = function(d, e, f, i) {
          d = b.call(null, d, e, f);
          return cljs.core.truth_(d) ? d : cljs.core.some.call(null, a, i)
        }, e = function(a, b, e, f) {
          var g = null;
          goog.isDef(f) && (g = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
          return d.call(this, a, b, e, g)
        };
        e.cljs$lang$maxFixedArity = 3;
        e.cljs$lang$applyTo = function(a) {
          var b = cljs.core.first(a), e = cljs.core.first(cljs.core.next(a)), f = cljs.core.first(cljs.core.next(cljs.core.next(a))), a = cljs.core.rest(cljs.core.next(cljs.core.next(a)));
          return d.call(this, b, e, f, a)
        };
        return e
      }(), b = function(b, e, f, h) {
        switch(arguments.length) {
          case 0:
            return null;
          case 1:
            return a.call(null, b);
          case 2:
            var l = e, o = a.call(null, b);
            return cljs.core.truth_(o) ? o : a.call(null, l);
          case 3:
            var o = e, l = f, p = a.call(null, b);
            cljs.core.truth_(p) ? l = p : (o = a.call(null, o), l = cljs.core.truth_(o) ? o : a.call(null, l));
            return l;
          default:
            return d.apply(this, arguments)
        }
        throw"Invalid arity: " + arguments.length;
      };
      b.cljs$lang$maxFixedArity = 3;
      b.cljs$lang$applyTo = d.cljs$lang$applyTo;
      return b
    }()
  }, d = function(a, b) {
    return function() {
      var d = null, e = function(d, e, f) {
        var i = a.call(null, d);
        if(cljs.core.truth_(i)) {
          return i
        }
        i = a.call(null, e);
        if(cljs.core.truth_(i)) {
          return i
        }
        i = a.call(null, f);
        if(cljs.core.truth_(i)) {
          return i
        }
        d = b.call(null, d);
        if(cljs.core.truth_(d)) {
          return d
        }
        e = b.call(null, e);
        return cljs.core.truth_(e) ? e : b.call(null, f)
      }, f = function() {
        var e = function(e, f, j, k) {
          e = d.call(null, e, f, j);
          return cljs.core.truth_(e) ? e : cljs.core.some.call(null, function(d) {
            var e = a.call(null, d);
            return cljs.core.truth_(e) ? e : b.call(null, d)
          }, k)
        }, f = function(a, b, d, f) {
          var g = null;
          goog.isDef(f) && (g = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
          return e.call(this, a, b, d, g)
        };
        f.cljs$lang$maxFixedArity = 3;
        f.cljs$lang$applyTo = function(a) {
          var b = cljs.core.first(a), d = cljs.core.first(cljs.core.next(a)), f = cljs.core.first(cljs.core.next(cljs.core.next(a))), a = cljs.core.rest(cljs.core.next(cljs.core.next(a)));
          return e.call(this, b, d, f, a)
        };
        return f
      }(), d = function(d, i, l, o) {
        switch(arguments.length) {
          case 0:
            return null;
          case 1:
            var p = d, r = a.call(null, p);
            return cljs.core.truth_(r) ? r : b.call(null, p);
          case 2:
            var r = d, p = i, q = a.call(null, r);
            cljs.core.truth_(q) ? p = q : (q = a.call(null, p), cljs.core.truth_(q) ? p = q : (r = b.call(null, r), p = cljs.core.truth_(r) ? r : b.call(null, p)));
            return p;
          case 3:
            return e.call(this, d, i, l);
          default:
            return f.apply(this, arguments)
        }
        throw"Invalid arity: " + arguments.length;
      };
      d.cljs$lang$maxFixedArity = 3;
      d.cljs$lang$applyTo = f.cljs$lang$applyTo;
      return d
    }()
  }, e = function(a, b, d) {
    return function() {
      var e = null, f = function(e, f) {
        var j = a.call(null, e);
        if(cljs.core.truth_(j)) {
          return j
        }
        j = b.call(null, e);
        if(cljs.core.truth_(j)) {
          return j
        }
        j = d.call(null, e);
        if(cljs.core.truth_(j)) {
          return j
        }
        j = a.call(null, f);
        if(cljs.core.truth_(j)) {
          return j
        }
        j = b.call(null, f);
        return cljs.core.truth_(j) ? j : d.call(null, f)
      }, n = function(e, f, j) {
        var k = a.call(null, e);
        if(cljs.core.truth_(k)) {
          return k
        }
        k = b.call(null, e);
        if(cljs.core.truth_(k)) {
          return k
        }
        e = d.call(null, e);
        if(cljs.core.truth_(e)) {
          return e
        }
        e = a.call(null, f);
        if(cljs.core.truth_(e)) {
          return e
        }
        e = b.call(null, f);
        if(cljs.core.truth_(e)) {
          return e
        }
        f = d.call(null, f);
        if(cljs.core.truth_(f)) {
          return f
        }
        f = a.call(null, j);
        if(cljs.core.truth_(f)) {
          return f
        }
        f = b.call(null, j);
        return cljs.core.truth_(f) ? f : d.call(null, j)
      }, m = function() {
        var f = function(f, k, l, m) {
          f = e.call(null, f, k, l);
          return cljs.core.truth_(f) ? f : cljs.core.some.call(null, function(e) {
            var f = a.call(null, e);
            if(cljs.core.truth_(f)) {
              return f
            }
            f = b.call(null, e);
            return cljs.core.truth_(f) ? f : d.call(null, e)
          }, m)
        }, k = function(a, b, d, e) {
          var g = null;
          goog.isDef(e) && (g = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
          return f.call(this, a, b, d, g)
        };
        k.cljs$lang$maxFixedArity = 3;
        k.cljs$lang$applyTo = function(a) {
          var b = cljs.core.first(a), d = cljs.core.first(cljs.core.next(a)), e = cljs.core.first(cljs.core.next(cljs.core.next(a))), a = cljs.core.rest(cljs.core.next(cljs.core.next(a)));
          return f.call(this, b, d, e, a)
        };
        return k
      }(), e = function(e, j, p, r) {
        switch(arguments.length) {
          case 0:
            return null;
          case 1:
            var q;
            q = e;
            var s = a.call(null, q);
            cljs.core.truth_(s) ? q = s : (s = b.call(null, q), q = cljs.core.truth_(s) ? s : d.call(null, q));
            return q;
          case 2:
            return f.call(this, e, j);
          case 3:
            return n.call(this, e, j, p);
          default:
            return m.apply(this, arguments)
        }
        throw"Invalid arity: " + arguments.length;
      };
      e.cljs$lang$maxFixedArity = 3;
      e.cljs$lang$applyTo = m.cljs$lang$applyTo;
      return e
    }()
  }, f = function() {
    var a = function(a, b, d, e) {
      var f = cljs.core.list_STAR_.call(null, a, b, d, e);
      return function() {
        var a = null, b = function(a) {
          return cljs.core.some.call(null, function(b) {
            return b.call(null, a)
          }, f)
        }, d = function(a, b) {
          return cljs.core.some.call(null, function(d) {
            var e = d.call(null, a);
            return cljs.core.truth_(e) ? e : d.call(null, b)
          }, f)
        }, e = function(a, b, d) {
          return cljs.core.some.call(null, function(e) {
            var f = e.call(null, a);
            if(cljs.core.truth_(f)) {
              return f
            }
            f = e.call(null, b);
            return cljs.core.truth_(f) ? f : e.call(null, d)
          }, f)
        }, g = function() {
          var b = function(b, d, e, g) {
            b = a.call(null, b, d, e);
            return cljs.core.truth_(b) ? b : cljs.core.some.call(null, function(a) {
              return cljs.core.some.call(null, a, g)
            }, f)
          }, d = function(a, d, e, f) {
            var g = null;
            goog.isDef(f) && (g = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
            return b.call(this, a, d, e, g)
          };
          d.cljs$lang$maxFixedArity = 3;
          d.cljs$lang$applyTo = function(a) {
            var d = cljs.core.first(a), e = cljs.core.first(cljs.core.next(a)), f = cljs.core.first(cljs.core.next(cljs.core.next(a))), a = cljs.core.rest(cljs.core.next(cljs.core.next(a)));
            return b.call(this, d, e, f, a)
          };
          return d
        }(), a = function(a, f, h, i) {
          switch(arguments.length) {
            case 0:
              return null;
            case 1:
              return b.call(this, a);
            case 2:
              return d.call(this, a, f);
            case 3:
              return e.call(this, a, f, h);
            default:
              return g.apply(this, arguments)
          }
          throw"Invalid arity: " + arguments.length;
        };
        a.cljs$lang$maxFixedArity = 3;
        a.cljs$lang$applyTo = g.cljs$lang$applyTo;
        return a
      }()
    }, b = function(b, d, e, f) {
      var h = null;
      goog.isDef(f) && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
      return a.call(this, b, d, e, h)
    };
    b.cljs$lang$maxFixedArity = 3;
    b.cljs$lang$applyTo = function(b) {
      var d = cljs.core.first(b), e = cljs.core.first(cljs.core.next(b)), f = cljs.core.first(cljs.core.next(cljs.core.next(b))), b = cljs.core.rest(cljs.core.next(cljs.core.next(b)));
      return a.call(this, d, e, f, b)
    };
    return b
  }(), a = function(a, h, i, j) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return d.call(this, a, h);
      case 3:
        return e.call(this, a, h, i);
      default:
        return f.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 3;
  a.cljs$lang$applyTo = f.cljs$lang$applyTo;
  return a
}();
cljs.core.map = function() {
  var a = null, b = function(b, d) {
    return new cljs.core.LazySeq(null, !1, function() {
      var e = cljs.core.seq.call(null, d);
      return cljs.core.truth_(e) ? cljs.core.cons.call(null, b.call(null, cljs.core.first.call(null, e)), a.call(null, b, cljs.core.rest.call(null, e))) : null
    })
  }, d = function(b, d, e) {
    return new cljs.core.LazySeq(null, !1, function() {
      var f = cljs.core.seq.call(null, d), k = cljs.core.seq.call(null, e);
      return cljs.core.truth_(cljs.core.truth_(f) ? k : f) ? cljs.core.cons.call(null, b.call(null, cljs.core.first.call(null, f), cljs.core.first.call(null, k)), a.call(null, b, cljs.core.rest.call(null, f), cljs.core.rest.call(null, k))) : null
    })
  }, e = function(b, d, e, f) {
    return new cljs.core.LazySeq(null, !1, function() {
      var k = cljs.core.seq.call(null, d), n = cljs.core.seq.call(null, e), m = cljs.core.seq.call(null, f);
      return cljs.core.truth_(cljs.core.truth_(k) ? cljs.core.truth_(n) ? m : n : k) ? cljs.core.cons.call(null, b.call(null, cljs.core.first.call(null, k), cljs.core.first.call(null, n), cljs.core.first.call(null, m)), a.call(null, b, cljs.core.rest.call(null, k), cljs.core.rest.call(null, n), cljs.core.rest.call(null, m))) : null
    })
  }, f = function() {
    var b = function(b, d, e, f, g) {
      return a.call(null, function(a) {
        return cljs.core.apply.call(null, b, a)
      }, function o(b) {
        return new cljs.core.LazySeq(null, !1, function() {
          var d = a.call(null, cljs.core.seq, b);
          return cljs.core.truth_(cljs.core.every_QMARK_.call(null, cljs.core.identity, d)) ? cljs.core.cons.call(null, a.call(null, cljs.core.first, d), o.call(null, a.call(null, cljs.core.rest, d))) : null
        })
      }.call(null, cljs.core.conj.call(null, g, f, e, d)))
    }, d = function(a, d, e, f, h) {
      var l = null;
      goog.isDef(h) && (l = cljs.core.array_seq(Array.prototype.slice.call(arguments, 4), 0));
      return b.call(this, a, d, e, f, l)
    };
    d.cljs$lang$maxFixedArity = 4;
    d.cljs$lang$applyTo = function(a) {
      var d = cljs.core.first(a), e = cljs.core.first(cljs.core.next(a)), f = cljs.core.first(cljs.core.next(cljs.core.next(a))), h = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(a)))), a = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(a))));
      return b.call(this, d, e, f, h, a)
    };
    return d
  }(), a = function(a, h, i, j, k) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, h);
      case 3:
        return d.call(this, a, h, i);
      case 4:
        return e.call(this, a, h, i, j);
      default:
        return f.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 4;
  a.cljs$lang$applyTo = f.cljs$lang$applyTo;
  return a
}();
cljs.core.take = function take(b, d) {
  return new cljs.core.LazySeq(null, !1, function() {
    if(cljs.core.truth_(0 < b)) {
      var e = cljs.core.seq.call(null, d);
      return cljs.core.truth_(e) ? cljs.core.cons.call(null, cljs.core.first.call(null, e), take.call(null, b - 1, cljs.core.rest.call(null, e))) : null
    }
    return null
  })
};
cljs.core.drop = function(a, b) {
  var d = function(a, b) {
    for(;;) {
      var d = cljs.core.seq.call(null, b);
      if(cljs.core.truth_(function() {
        var b = 0 < a;
        return cljs.core.truth_(b) ? d : b
      }())) {
        var h = a - 1, i = cljs.core.rest.call(null, d), a = h, b = i
      }else {
        return d
      }
    }
  };
  return new cljs.core.LazySeq(null, !1, function() {
    return d.call(null, a, b)
  })
};
cljs.core.drop_last = function() {
  var a = null, b = function(a, b) {
    return cljs.core.map.call(null, function(a) {
      return a
    }, b, cljs.core.drop.call(null, a, b))
  };
  return a = function(d, e) {
    switch(arguments.length) {
      case 1:
        return a.call(null, 1, d);
      case 2:
        return b.call(this, d, e)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.take_last = function(a, b) {
  for(var d = cljs.core.seq.call(null, b), e = cljs.core.seq.call(null, cljs.core.drop.call(null, a, b));;) {
    if(cljs.core.truth_(e)) {
      d = cljs.core.next.call(null, d), e = cljs.core.next.call(null, e)
    }else {
      return d
    }
  }
};
cljs.core.drop_while = function(a, b) {
  var d = function(a, b) {
    for(;;) {
      var d = cljs.core.seq.call(null, b);
      if(cljs.core.truth_(function() {
        var b = d;
        return cljs.core.truth_(b) ? a.call(null, cljs.core.first.call(null, d)) : b
      }())) {
        var h = a, i = cljs.core.rest.call(null, d), a = h, b = i
      }else {
        return d
      }
    }
  };
  return new cljs.core.LazySeq(null, !1, function() {
    return d.call(null, a, b)
  })
};
cljs.core.cycle = function cycle(b) {
  return new cljs.core.LazySeq(null, !1, function() {
    var d = cljs.core.seq.call(null, b);
    return cljs.core.truth_(d) ? cljs.core.concat.call(null, d, cycle.call(null, d)) : null
  })
};
cljs.core.split_at = function(a, b) {
  return cljs.core.Vector.fromArray([cljs.core.take.call(null, a, b), cljs.core.drop.call(null, a, b)])
};
cljs.core.repeat = function() {
  var a = null, b = function(b) {
    return new cljs.core.LazySeq(null, !1, function() {
      return cljs.core.cons.call(null, b, a.call(null, b))
    })
  };
  return a = function(d, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, d);
      case 2:
        return cljs.core.take.call(null, d, a.call(null, e))
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.replicate = function(a, b) {
  return cljs.core.take.call(null, a, cljs.core.repeat.call(null, b))
};
cljs.core.repeatedly = function() {
  var a = null, b = function(b) {
    return new cljs.core.LazySeq(null, !1, function() {
      return cljs.core.cons.call(null, b.call(null), a.call(null, b))
    })
  };
  return a = function(d, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, d);
      case 2:
        return cljs.core.take.call(null, d, a.call(null, e))
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.iterate = function iterate(b, d) {
  return cljs.core.cons.call(null, d, new cljs.core.LazySeq(null, !1, function() {
    return iterate.call(null, b, b.call(null, d))
  }))
};
cljs.core.interleave = function() {
  var a = null, b = function(b, d) {
    return new cljs.core.LazySeq(null, !1, function() {
      var g = cljs.core.seq.call(null, b), h = cljs.core.seq.call(null, d);
      return cljs.core.truth_(cljs.core.truth_(g) ? h : g) ? cljs.core.cons.call(null, cljs.core.first.call(null, g), cljs.core.cons.call(null, cljs.core.first.call(null, h), a.call(null, cljs.core.rest.call(null, g), cljs.core.rest.call(null, h)))) : null
    })
  }, d = function() {
    var b = function(b, d, e) {
      return new cljs.core.LazySeq(null, !1, function() {
        var f = cljs.core.map.call(null, cljs.core.seq, cljs.core.conj.call(null, e, d, b));
        return cljs.core.truth_(cljs.core.every_QMARK_.call(null, cljs.core.identity, f)) ? cljs.core.concat.call(null, cljs.core.map.call(null, cljs.core.first, f), cljs.core.apply.call(null, a, cljs.core.map.call(null, cljs.core.rest, f))) : null
      })
    }, d = function(a, d, f) {
      var j = null;
      goog.isDef(f) && (j = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
      return b.call(this, a, d, j)
    };
    d.cljs$lang$maxFixedArity = 2;
    d.cljs$lang$applyTo = function(a) {
      var d = cljs.core.first(a), f = cljs.core.first(cljs.core.next(a)), a = cljs.core.rest(cljs.core.next(a));
      return b.call(this, d, f, a)
    };
    return d
  }(), a = function(a, f, g) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, f);
      default:
        return d.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = d.cljs$lang$applyTo;
  return a
}();
cljs.core.interpose = function(a, b) {
  return cljs.core.drop.call(null, 1, cljs.core.interleave.call(null, cljs.core.repeat.call(null, a), b))
};
cljs.core.flatten1 = function(a) {
  return function d(a, f) {
    return new cljs.core.LazySeq(null, !1, function() {
      var g = cljs.core.seq.call(null, a);
      return cljs.core.truth_(g) ? cljs.core.cons.call(null, cljs.core.first.call(null, g), d.call(null, cljs.core.rest.call(null, g), f)) : cljs.core.truth_(cljs.core.seq.call(null, f)) ? d.call(null, cljs.core.first.call(null, f), cljs.core.rest.call(null, f)) : null
    })
  }.call(null, null, a)
};
cljs.core.mapcat = function() {
  var a = null, b = function() {
    var a = function(a, b, d) {
      var h = null;
      goog.isDef(d) && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
      return cljs.core.flatten1.call(null, cljs.core.apply.call(null, cljs.core.map, a, b, h))
    };
    a.cljs$lang$maxFixedArity = 2;
    a.cljs$lang$applyTo = function(a) {
      var b = cljs.core.first(a), d = cljs.core.first(cljs.core.next(a)), a = cljs.core.rest(cljs.core.next(a));
      return cljs.core.flatten1.call(null, cljs.core.apply.call(null, cljs.core.map, b, d, a))
    };
    return a
  }(), a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return cljs.core.flatten1.call(null, cljs.core.map.call(null, a, e));
      default:
        return b.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = b.cljs$lang$applyTo;
  return a
}();
cljs.core.filter = function filter(b, d) {
  return new cljs.core.LazySeq(null, !1, function() {
    var e = cljs.core.seq.call(null, d);
    if(cljs.core.truth_(e)) {
      var f = cljs.core.first.call(null, e), e = cljs.core.rest.call(null, e);
      return cljs.core.truth_(b.call(null, f)) ? cljs.core.cons.call(null, f, filter.call(null, b, e)) : filter.call(null, b, e)
    }
    return null
  })
};
cljs.core.remove = function(a, b) {
  return cljs.core.filter.call(null, cljs.core.complement.call(null, a), b)
};
cljs.core.tree_seq = function(a, b, d) {
  return function f(d) {
    return new cljs.core.LazySeq(null, !1, function() {
      return cljs.core.cons.call(null, d, cljs.core.truth_(a.call(null, d)) ? cljs.core.mapcat.call(null, f, b.call(null, d)) : null)
    })
  }.call(null, d)
};
cljs.core.flatten = function(a) {
  return cljs.core.filter.call(null, function(a) {
    return cljs.core.not.call(null, cljs.core.sequential_QMARK_.call(null, a))
  }, cljs.core.rest.call(null, cljs.core.tree_seq.call(null, cljs.core.sequential_QMARK_, cljs.core.seq, a)))
};
cljs.core.into = function(a, b) {
  return cljs.core.reduce.call(null, cljs.core._conj, a, b)
};
cljs.core.partition = function() {
  var a = null, b = function(b, d, g) {
    return new cljs.core.LazySeq(null, !1, function() {
      var h = cljs.core.seq.call(null, g);
      if(cljs.core.truth_(h)) {
        var i = cljs.core.take.call(null, b, h);
        return cljs.core.truth_(cljs.core._EQ_.call(null, b, cljs.core.count.call(null, i))) ? cljs.core.cons.call(null, i, a.call(null, b, d, cljs.core.drop.call(null, d, h))) : null
      }
      return null
    })
  }, d = function(b, d, g, h) {
    return new cljs.core.LazySeq(null, !1, function() {
      var i = cljs.core.seq.call(null, h);
      if(cljs.core.truth_(i)) {
        var j = cljs.core.take.call(null, b, i);
        return cljs.core.truth_(cljs.core._EQ_.call(null, b, cljs.core.count.call(null, j))) ? cljs.core.cons.call(null, j, a.call(null, b, d, g, cljs.core.drop.call(null, d, i))) : cljs.core.list.call(null, cljs.core.take.call(null, b, cljs.core.concat.call(null, j, g)))
      }
      return null
    })
  };
  return a = function(e, f, g, h) {
    switch(arguments.length) {
      case 2:
        return a.call(null, e, e, f);
      case 3:
        return b.call(this, e, f, g);
      case 4:
        return d.call(this, e, f, g, h)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.get_in = function() {
  var a = null;
  return function(a, d, e) {
    switch(arguments.length) {
      case 2:
        return cljs.core.reduce.call(null, cljs.core.get, a, d);
      case 3:
        var f;
        a: {
          for(var g = cljs.core.lookup_sentinel, h = a, i = cljs.core.seq.call(null, d);;) {
            if(cljs.core.truth_(i)) {
              h = cljs.core.get.call(null, h, cljs.core.first.call(null, i), g);
              if(cljs.core.truth_(g === h)) {
                f = e;
                break a
              }
              i = cljs.core.next.call(null, i)
            }else {
              f = h;
              break a
            }
          }
        }
        return f
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.assoc_in = function assoc_in(b, d, e) {
  var f = cljs.core.nth.call(null, d, 0, null), d = cljs.core.nthnext.call(null, d, 1);
  return cljs.core.truth_(d) ? cljs.core.assoc.call(null, b, f, assoc_in.call(null, cljs.core.get.call(null, b, f), d, e)) : cljs.core.assoc.call(null, b, f, e)
};
cljs.core.update_in = function() {
  var a = function(a, e, f, g) {
    var h = cljs.core.nth.call(null, e, 0, null), e = cljs.core.nthnext.call(null, e, 1);
    return cljs.core.truth_(e) ? cljs.core.assoc.call(null, a, h, cljs.core.apply.call(null, b, cljs.core.get.call(null, a, h), e, f, g)) : cljs.core.assoc.call(null, a, h, cljs.core.apply.call(null, f, cljs.core.get.call(null, a, h), g))
  }, b = function(b, e, f, g) {
    var h = null;
    goog.isDef(g) && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
    return a.call(this, b, e, f, h)
  };
  b.cljs$lang$maxFixedArity = 3;
  b.cljs$lang$applyTo = function(b) {
    var e = cljs.core.first(b), f = cljs.core.first(cljs.core.next(b)), g = cljs.core.first(cljs.core.next(cljs.core.next(b))), b = cljs.core.rest(cljs.core.next(cljs.core.next(b)));
    return a.call(this, e, f, g, b)
  };
  return b
}();
cljs.core.Vector = function(a, b) {
  this.meta = a;
  this.array = b
};
cljs.core.Vector.prototype.cljs$core$IHash$ = !0;
cljs.core.Vector.prototype.cljs$core$IHash$_hash = function(a) {
  return cljs.core.hash_coll.call(null, a)
};
cljs.core.Vector.prototype.cljs$core$ILookup$ = !0;
cljs.core.Vector.prototype.cljs$core$ILookup$_lookup = function() {
  var a = null;
  return function(a, d, e) {
    switch(arguments.length) {
      case 2:
        return cljs.core._nth.call(null, a, d, null);
      case 3:
        return cljs.core._nth.call(null, a, d, e)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.Vector.prototype.cljs$core$IAssociative$ = !0;
cljs.core.Vector.prototype.cljs$core$IAssociative$_assoc = function(a, b, d) {
  a = cljs.core.aclone.call(null, this.array);
  a[b] = d;
  return new cljs.core.Vector(this.meta, a)
};
cljs.core.Vector.prototype.cljs$core$ISequential$ = !0;
cljs.core.Vector.prototype.cljs$core$ICollection$ = !0;
cljs.core.Vector.prototype.cljs$core$ICollection$_conj = function(a, b) {
  var d = cljs.core.aclone.call(null, this.array);
  d.push(b);
  return new cljs.core.Vector(this.meta, d)
};
cljs.core.Vector.prototype.cljs$core$IReduce$ = !0;
cljs.core.Vector.prototype.cljs$core$IReduce$_reduce = function() {
  var a = null;
  return function(a, d, e) {
    switch(arguments.length) {
      case 2:
        return cljs.core.ci_reduce.call(null, this.array, d);
      case 3:
        return cljs.core.ci_reduce.call(null, this.array, d, e)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.Vector.prototype.cljs$core$ISeqable$ = !0;
cljs.core.Vector.prototype.cljs$core$ISeqable$_seq = function() {
  var a = this;
  return cljs.core.truth_(0 < a.array.length) ? function d(e) {
    return new cljs.core.LazySeq(null, !1, function() {
      return cljs.core.truth_(e < a.array.length) ? cljs.core.cons.call(null, a.array[e], d.call(null, e + 1)) : null
    })
  }.call(null, 0) : null
};
cljs.core.Vector.prototype.cljs$core$ICounted$ = !0;
cljs.core.Vector.prototype.cljs$core$ICounted$_count = function() {
  return this.array.length
};
cljs.core.Vector.prototype.cljs$core$IStack$ = !0;
cljs.core.Vector.prototype.cljs$core$IStack$_peek = function() {
  var a = this.array.length;
  return cljs.core.truth_(0 < a) ? this.array[a - 1] : null
};
cljs.core.Vector.prototype.cljs$core$IStack$_pop = function() {
  if(cljs.core.truth_(0 < this.array.length)) {
    var a = cljs.core.aclone.call(null, this.array);
    a.pop();
    return new cljs.core.Vector(this.meta, a)
  }
  throw Error("Can't pop empty vector");
};
cljs.core.Vector.prototype.cljs$core$IVector$ = !0;
cljs.core.Vector.prototype.cljs$core$IVector$_assoc_n = function(a, b, d) {
  return cljs.core._assoc.call(null, a, b, d)
};
cljs.core.Vector.prototype.cljs$core$IEquiv$ = !0;
cljs.core.Vector.prototype.cljs$core$IEquiv$_equiv = function(a, b) {
  return cljs.core.equiv_sequential.call(null, a, b)
};
cljs.core.Vector.prototype.cljs$core$IWithMeta$ = !0;
cljs.core.Vector.prototype.cljs$core$IWithMeta$_with_meta = function(a, b) {
  return new cljs.core.Vector(b, this.array)
};
cljs.core.Vector.prototype.cljs$core$IMeta$ = !0;
cljs.core.Vector.prototype.cljs$core$IMeta$_meta = function() {
  return this.meta
};
cljs.core.Vector.prototype.cljs$core$IIndexed$ = !0;
cljs.core.Vector.prototype.cljs$core$IIndexed$_nth = function() {
  var a = null, b = function(a, b) {
    var d = this;
    return cljs.core.truth_(function() {
      var a = 0 <= b;
      return cljs.core.truth_(a) ? b < d.array.length : a
    }()) ? d.array[b] : null
  }, d = function(a, b, d) {
    var h = this;
    return cljs.core.truth_(function() {
      var a = 0 <= b;
      return cljs.core.truth_(a) ? b < h.array.length : a
    }()) ? h.array[b] : d
  };
  return function(a, f, g) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, f);
      case 3:
        return d.call(this, a, f, g)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.Vector.prototype.cljs$core$IEmptyableCollection$ = !0;
cljs.core.Vector.prototype.cljs$core$IEmptyableCollection$_empty = function() {
  return cljs.core.with_meta.call(null, cljs.core.Vector.EMPTY, this.meta)
};
cljs.core.Vector.EMPTY = new cljs.core.Vector(null, cljs.core.array.call(null));
cljs.core.Vector.fromArray = function(a) {
  return new cljs.core.Vector(null, a)
};
cljs.core.Vector.prototype.call = function() {
  var a = null;
  return function(a, d, e) {
    switch(arguments.length) {
      case 2:
        return cljs.core._lookup.call(null, this, d);
      case 3:
        return cljs.core._lookup.call(null, this, d, e)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.vec = function(a) {
  return cljs.core.reduce.call(null, cljs.core.conj, cljs.core.Vector.EMPTY, a)
};
cljs.core.vector = function() {
  var a = function(a) {
    var d = null;
    goog.isDef(a) && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return cljs.core.vec.call(null, d)
  };
  a.cljs$lang$maxFixedArity = 0;
  a.cljs$lang$applyTo = function(a) {
    a = cljs.core.seq(a);
    return cljs.core.vec.call(null, a)
  };
  return a
}();
cljs.core.Subvec = function(a, b, d, e) {
  this.meta = a;
  this.v = b;
  this.start = d;
  this.end = e
};
cljs.core.Subvec.prototype.cljs$core$IHash$ = !0;
cljs.core.Subvec.prototype.cljs$core$IHash$_hash = function(a) {
  return cljs.core.hash_coll.call(null, a)
};
cljs.core.Subvec.prototype.cljs$core$ILookup$ = !0;
cljs.core.Subvec.prototype.cljs$core$ILookup$_lookup = function() {
  var a = null;
  return function(a, d, e) {
    switch(arguments.length) {
      case 2:
        return cljs.core._nth.call(null, a, d, null);
      case 3:
        return cljs.core._nth.call(null, a, d, e)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.Subvec.prototype.cljs$core$IAssociative$ = !0;
cljs.core.Subvec.prototype.cljs$core$IAssociative$_assoc = function(a, b, d) {
  a = this.start + b;
  return new cljs.core.Subvec(this.meta, cljs.core._assoc.call(null, this.v, a, d), this.start, this.end > a + 1 ? this.end : a + 1)
};
cljs.core.Subvec.prototype.cljs$core$ISequential$ = !0;
cljs.core.Subvec.prototype.cljs$core$ICollection$ = !0;
cljs.core.Subvec.prototype.cljs$core$ICollection$_conj = function(a, b) {
  return new cljs.core.Subvec(this.meta, cljs.core._assoc_n.call(null, this.v, this.end, b), this.start, this.end + 1)
};
cljs.core.Subvec.prototype.cljs$core$IReduce$ = !0;
cljs.core.Subvec.prototype.cljs$core$IReduce$_reduce = function() {
  var a = null;
  return function(a, d, e) {
    switch(arguments.length) {
      case 2:
        return cljs.core.ci_reduce.call(null, a, d);
      case 3:
        return cljs.core.ci_reduce.call(null, a, d, e)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.Subvec.prototype.cljs$core$ISeqable$ = !0;
cljs.core.Subvec.prototype.cljs$core$ISeqable$_seq = function() {
  var a = this;
  return function d(e) {
    return cljs.core.truth_(cljs.core._EQ_.call(null, e, a.end)) ? null : cljs.core.cons.call(null, cljs.core._nth.call(null, a.v, e), new cljs.core.LazySeq(null, !1, function() {
      return d.call(null, e + 1)
    }))
  }.call(null, a.start)
};
cljs.core.Subvec.prototype.cljs$core$ICounted$ = !0;
cljs.core.Subvec.prototype.cljs$core$ICounted$_count = function() {
  return this.end - this.start
};
cljs.core.Subvec.prototype.cljs$core$IStack$ = !0;
cljs.core.Subvec.prototype.cljs$core$IStack$_peek = function() {
  return cljs.core._nth.call(null, this.v, this.end - 1)
};
cljs.core.Subvec.prototype.cljs$core$IStack$_pop = function() {
  if(cljs.core.truth_(cljs.core._EQ_.call(null, this.start, this.end))) {
    throw Error("Can't pop empty vector");
  }
  return new cljs.core.Subvec(this.meta, this.v, this.start, this.end - 1)
};
cljs.core.Subvec.prototype.cljs$core$IVector$ = !0;
cljs.core.Subvec.prototype.cljs$core$IVector$_assoc_n = function(a, b, d) {
  return cljs.core._assoc.call(null, a, b, d)
};
cljs.core.Subvec.prototype.cljs$core$IEquiv$ = !0;
cljs.core.Subvec.prototype.cljs$core$IEquiv$_equiv = function(a, b) {
  return cljs.core.equiv_sequential.call(null, a, b)
};
cljs.core.Subvec.prototype.cljs$core$IWithMeta$ = !0;
cljs.core.Subvec.prototype.cljs$core$IWithMeta$_with_meta = function(a, b) {
  return new cljs.core.Subvec(b, this.v, this.start, this.end)
};
cljs.core.Subvec.prototype.cljs$core$IMeta$ = !0;
cljs.core.Subvec.prototype.cljs$core$IMeta$_meta = function() {
  return this.meta
};
cljs.core.Subvec.prototype.cljs$core$IIndexed$ = !0;
cljs.core.Subvec.prototype.cljs$core$IIndexed$_nth = function() {
  var a = null;
  return function(a, d, e) {
    switch(arguments.length) {
      case 2:
        return cljs.core._nth.call(null, this.v, this.start + d);
      case 3:
        return cljs.core._nth.call(null, this.v, this.start + d, e)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.Subvec.prototype.cljs$core$IEmptyableCollection$ = !0;
cljs.core.Subvec.prototype.cljs$core$IEmptyableCollection$_empty = function() {
  return cljs.core.with_meta.call(null, cljs.core.Vector.EMPTY, this.meta)
};
cljs.core.subvec = function() {
  var a = null;
  return a = function(b, d, e) {
    switch(arguments.length) {
      case 2:
        return a.call(null, b, d, cljs.core.count.call(null, b));
      case 3:
        return new cljs.core.Subvec(null, b, d, e)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.Subvec.prototype.call = function() {
  var a = null;
  return function(a, d, e) {
    switch(arguments.length) {
      case 2:
        return cljs.core._lookup.call(null, this, d);
      case 3:
        return cljs.core._lookup.call(null, this, d, e)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.PersistentQueueSeq = function(a, b, d) {
  this.meta = a;
  this.front = b;
  this.rear = d
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$ISeqable$ = !0;
cljs.core.PersistentQueueSeq.prototype.cljs$core$ISeqable$_seq = function(a) {
  return a
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$IHash$ = !0;
cljs.core.PersistentQueueSeq.prototype.cljs$core$IHash$_hash = function(a) {
  return cljs.core.hash_coll.call(null, a)
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$IEquiv$ = !0;
cljs.core.PersistentQueueSeq.prototype.cljs$core$IEquiv$_equiv = function(a, b) {
  return cljs.core.equiv_sequential.call(null, a, b)
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$ISequential$ = !0;
cljs.core.PersistentQueueSeq.prototype.cljs$core$IEmptyableCollection$ = !0;
cljs.core.PersistentQueueSeq.prototype.cljs$core$IEmptyableCollection$_empty = function() {
  return cljs.core.with_meta.call(null, cljs.core.List.EMPTY, this.meta)
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$ICollection$ = !0;
cljs.core.PersistentQueueSeq.prototype.cljs$core$ICollection$_conj = function(a, b) {
  return cljs.core.cons.call(null, b, a)
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$ISeq$ = !0;
cljs.core.PersistentQueueSeq.prototype.cljs$core$ISeq$_first = function() {
  return cljs.core._first.call(null, this.front)
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$ISeq$_rest = function(a) {
  var b = cljs.core.next.call(null, this.front);
  return cljs.core.truth_(b) ? new cljs.core.PersistentQueueSeq(this.meta, b, this.rear) : cljs.core.truth_(cljs.core.nil_QMARK_.call(null, this.rear)) ? cljs.core._empty.call(null, a) : new cljs.core.PersistentQueueSeq(this.meta, this.rear, null)
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$IMeta$ = !0;
cljs.core.PersistentQueueSeq.prototype.cljs$core$IMeta$_meta = function() {
  return this.meta
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$IWithMeta$ = !0;
cljs.core.PersistentQueueSeq.prototype.cljs$core$IWithMeta$_with_meta = function(a, b) {
  return new cljs.core.PersistentQueueSeq(b, this.front, this.rear)
};
cljs.core.PersistentQueue = function(a, b, d, e) {
  this.meta = a;
  this.count = b;
  this.front = d;
  this.rear = e
};
cljs.core.PersistentQueue.prototype.cljs$core$IHash$ = !0;
cljs.core.PersistentQueue.prototype.cljs$core$IHash$_hash = function(a) {
  return cljs.core.hash_coll.call(null, a)
};
cljs.core.PersistentQueue.prototype.cljs$core$ISequential$ = !0;
cljs.core.PersistentQueue.prototype.cljs$core$ICollection$ = !0;
cljs.core.PersistentQueue.prototype.cljs$core$ICollection$_conj = function(a, b) {
  var d = this;
  return cljs.core.truth_(d.front) ? new cljs.core.PersistentQueue(d.meta, d.count + 1, d.front, cljs.core.conj.call(null, function() {
    var a = d.rear;
    return cljs.core.truth_(a) ? a : cljs.core.Vector.fromArray([])
  }(), b)) : new cljs.core.PersistentQueue(d.meta, d.count + 1, cljs.core.conj.call(null, d.front, b), cljs.core.Vector.fromArray([]))
};
cljs.core.PersistentQueue.prototype.cljs$core$ISeqable$ = !0;
cljs.core.PersistentQueue.prototype.cljs$core$ISeqable$_seq = function() {
  var a = this, b = cljs.core.seq.call(null, a.rear);
  return cljs.core.truth_(function() {
    var d = a.front;
    return cljs.core.truth_(d) ? d : b
  }()) ? new cljs.core.PersistentQueueSeq(null, a.front, cljs.core.seq.call(null, b)) : cljs.core.List.EMPTY
};
cljs.core.PersistentQueue.prototype.cljs$core$ICounted$ = !0;
cljs.core.PersistentQueue.prototype.cljs$core$ICounted$_count = function() {
  return this.count
};
cljs.core.PersistentQueue.prototype.cljs$core$IStack$ = !0;
cljs.core.PersistentQueue.prototype.cljs$core$IStack$_peek = function() {
  return cljs.core._first.call(null, this.front)
};
cljs.core.PersistentQueue.prototype.cljs$core$IStack$_pop = function(a) {
  return cljs.core.truth_(this.front) ? (a = cljs.core.next.call(null, this.front), cljs.core.truth_(a) ? new cljs.core.PersistentQueue(this.meta, this.count - 1, a, this.rear) : new cljs.core.PersistentQueue(this.meta, this.count - 1, cljs.core.seq.call(null, this.rear), cljs.core.Vector.fromArray([]))) : a
};
cljs.core.PersistentQueue.prototype.cljs$core$ISeq$ = !0;
cljs.core.PersistentQueue.prototype.cljs$core$ISeq$_first = function() {
  return cljs.core.first.call(null, this.front)
};
cljs.core.PersistentQueue.prototype.cljs$core$ISeq$_rest = function(a) {
  return cljs.core.rest.call(null, cljs.core.seq.call(null, a))
};
cljs.core.PersistentQueue.prototype.cljs$core$IEquiv$ = !0;
cljs.core.PersistentQueue.prototype.cljs$core$IEquiv$_equiv = function(a, b) {
  return cljs.core.equiv_sequential.call(null, a, b)
};
cljs.core.PersistentQueue.prototype.cljs$core$IWithMeta$ = !0;
cljs.core.PersistentQueue.prototype.cljs$core$IWithMeta$_with_meta = function(a, b) {
  return new cljs.core.PersistentQueue(b, this.count, this.front, this.rear)
};
cljs.core.PersistentQueue.prototype.cljs$core$IMeta$ = !0;
cljs.core.PersistentQueue.prototype.cljs$core$IMeta$_meta = function() {
  return this.meta
};
cljs.core.PersistentQueue.prototype.cljs$core$IEmptyableCollection$ = !0;
cljs.core.PersistentQueue.prototype.cljs$core$IEmptyableCollection$_empty = function() {
  return cljs.core.PersistentQueue.EMPTY
};
cljs.core.PersistentQueue.EMPTY = new cljs.core.PersistentQueue(null, 0, null, cljs.core.Vector.fromArray([]));
cljs.core.NeverEquiv = function() {
};
cljs.core.NeverEquiv.prototype.cljs$core$IEquiv$ = !0;
cljs.core.NeverEquiv.prototype.cljs$core$IEquiv$_equiv = function() {
  return!1
};
cljs.core.never_equiv = new cljs.core.NeverEquiv;
cljs.core.equiv_map = function(a, b) {
  return cljs.core.boolean$.call(null, cljs.core.truth_(cljs.core.map_QMARK_.call(null, b)) ? cljs.core.truth_(cljs.core._EQ_.call(null, cljs.core.count.call(null, a), cljs.core.count.call(null, b))) ? cljs.core.every_QMARK_.call(null, cljs.core.identity, cljs.core.map.call(null, function(a) {
    return cljs.core._EQ_.call(null, cljs.core.get.call(null, b, cljs.core.first.call(null, a), cljs.core.never_equiv), cljs.core.second.call(null, a))
  }, a)) : null : null)
};
cljs.core.scan_array = function(a, b, d) {
  for(var e = d.length, f = 0;;) {
    if(cljs.core.truth_(f < e)) {
      if(cljs.core.truth_(cljs.core._EQ_.call(null, b, d[f]))) {
        return f
      }
      f += a
    }else {
      return null
    }
  }
};
cljs.core.obj_map_contains_key_QMARK_ = function() {
  var a = null, b = function(a, b, f, g) {
    return cljs.core.truth_(function() {
      var f = goog.isString.call(null, a);
      return cljs.core.truth_(f) ? b.hasOwnProperty(a) : f
    }()) ? f : g
  };
  return a = function(d, e, f, g) {
    switch(arguments.length) {
      case 2:
        return a.call(null, d, e, !0, !1);
      case 4:
        return b.call(this, d, e, f, g)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.ObjMap = function(a, b, d) {
  this.meta = a;
  this.keys = b;
  this.strobj = d
};
cljs.core.ObjMap.prototype.cljs$core$IHash$ = !0;
cljs.core.ObjMap.prototype.cljs$core$IHash$_hash = function(a) {
  return cljs.core.hash_coll.call(null, a)
};
cljs.core.ObjMap.prototype.cljs$core$ILookup$ = !0;
cljs.core.ObjMap.prototype.cljs$core$ILookup$_lookup = function() {
  var a = null;
  return function(a, d, e) {
    switch(arguments.length) {
      case 2:
        return cljs.core._lookup.call(null, a, d, null);
      case 3:
        return cljs.core.obj_map_contains_key_QMARK_.call(null, d, this.strobj, this.strobj[d], e)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.ObjMap.prototype.cljs$core$IAssociative$ = !0;
cljs.core.ObjMap.prototype.cljs$core$IAssociative$_assoc = function(a, b, d) {
  if(cljs.core.truth_(goog.isString.call(null, b))) {
    var a = goog.object.clone.call(null, this.strobj), e = a.hasOwnProperty(b);
    a[b] = d;
    if(cljs.core.truth_(e)) {
      return new cljs.core.ObjMap(this.meta, this.keys, a)
    }
    d = cljs.core.aclone.call(null, this.keys);
    d.push(b);
    return new cljs.core.ObjMap(this.meta, d, a)
  }
  return cljs.core.with_meta.call(null, cljs.core.into.call(null, cljs.core.hash_map.call(null, b, d), cljs.core.seq.call(null, a)), this.meta)
};
cljs.core.ObjMap.prototype.cljs$core$IAssociative$_contains_key_QMARK_ = function(a, b) {
  return cljs.core.obj_map_contains_key_QMARK_.call(null, b, this.strobj)
};
cljs.core.ObjMap.prototype.cljs$core$ICollection$ = !0;
cljs.core.ObjMap.prototype.cljs$core$ICollection$_conj = function(a, b) {
  return cljs.core.truth_(cljs.core.vector_QMARK_.call(null, b)) ? cljs.core._assoc.call(null, a, cljs.core._nth.call(null, b, 0), cljs.core._nth.call(null, b, 1)) : cljs.core.reduce.call(null, cljs.core._conj, a, b)
};
cljs.core.ObjMap.prototype.cljs$core$ISeqable$ = !0;
cljs.core.ObjMap.prototype.cljs$core$ISeqable$_seq = function() {
  var a = this;
  return cljs.core.truth_(0 < a.keys.length) ? cljs.core.map.call(null, function(b) {
    return cljs.core.vector.call(null, b, a.strobj[b])
  }, a.keys) : null
};
cljs.core.ObjMap.prototype.cljs$core$ICounted$ = !0;
cljs.core.ObjMap.prototype.cljs$core$ICounted$_count = function() {
  return this.keys.length
};
cljs.core.ObjMap.prototype.cljs$core$IEquiv$ = !0;
cljs.core.ObjMap.prototype.cljs$core$IEquiv$_equiv = function(a, b) {
  return cljs.core.equiv_map.call(null, a, b)
};
cljs.core.ObjMap.prototype.cljs$core$IWithMeta$ = !0;
cljs.core.ObjMap.prototype.cljs$core$IWithMeta$_with_meta = function(a, b) {
  return new cljs.core.ObjMap(b, this.keys, this.strobj)
};
cljs.core.ObjMap.prototype.cljs$core$IMeta$ = !0;
cljs.core.ObjMap.prototype.cljs$core$IMeta$_meta = function() {
  return this.meta
};
cljs.core.ObjMap.prototype.cljs$core$IEmptyableCollection$ = !0;
cljs.core.ObjMap.prototype.cljs$core$IEmptyableCollection$_empty = function() {
  return cljs.core.with_meta.call(null, cljs.core.ObjMap.EMPTY, this.meta)
};
cljs.core.ObjMap.prototype.cljs$core$IMap$ = !0;
cljs.core.ObjMap.prototype.cljs$core$IMap$_dissoc = function(a, b) {
  var d = this;
  if(cljs.core.truth_(function() {
    var a = goog.isString.call(null, b);
    return cljs.core.truth_(a) ? d.strobj.hasOwnProperty(b) : a
  }())) {
    var e = cljs.core.aclone.call(null, d.keys), f = goog.object.clone.call(null, d.strobj);
    e.splice(cljs.core.scan_array.call(null, 1, b, e), 1);
    cljs.core.js_delete.call(null, f, b);
    return new cljs.core.ObjMap(d.meta, e, f)
  }
  return a
};
cljs.core.ObjMap.EMPTY = new cljs.core.ObjMap(null, cljs.core.array.call(null), cljs.core.js_obj.call(null));
cljs.core.ObjMap.fromObject = function(a, b) {
  return new cljs.core.ObjMap(null, a, b)
};
cljs.core.ObjMap.prototype.call = function() {
  var a = null;
  return function(a, d, e) {
    switch(arguments.length) {
      case 2:
        return cljs.core._lookup.call(null, this, d);
      case 3:
        return cljs.core._lookup.call(null, this, d, e)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.HashMap = function(a, b, d) {
  this.meta = a;
  this.count = b;
  this.hashobj = d
};
cljs.core.HashMap.prototype.cljs$core$IHash$ = !0;
cljs.core.HashMap.prototype.cljs$core$IHash$_hash = function(a) {
  return cljs.core.hash_coll.call(null, a)
};
cljs.core.HashMap.prototype.cljs$core$ILookup$ = !0;
cljs.core.HashMap.prototype.cljs$core$ILookup$_lookup = function() {
  var a = null;
  return function(a, d, e) {
    switch(arguments.length) {
      case 2:
        return cljs.core._lookup.call(null, a, d, null);
      case 3:
        var f = this.hashobj[cljs.core.hash.call(null, d)], g = cljs.core.truth_(f) ? cljs.core.scan_array.call(null, 2, d, f) : null;
        return cljs.core.truth_(g) ? f[g + 1] : e
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.HashMap.prototype.cljs$core$IAssociative$ = !0;
cljs.core.HashMap.prototype.cljs$core$IAssociative$_assoc = function(a, b, d) {
  var a = cljs.core.hash.call(null, b), e = this.hashobj[a];
  if(cljs.core.truth_(e)) {
    var e = cljs.core.aclone.call(null, e), f = goog.object.clone.call(null, this.hashobj);
    f[a] = e;
    a = cljs.core.scan_array.call(null, 2, b, e);
    if(cljs.core.truth_(a)) {
      return e[a + 1] = d, new cljs.core.HashMap(this.meta, this.count, f)
    }
    e.push(b, d);
    return new cljs.core.HashMap(this.meta, this.count + 1, f)
  }
  e = goog.object.clone.call(null, this.hashobj);
  e[a] = cljs.core.array.call(null, b, d);
  return new cljs.core.HashMap(this.meta, this.count + 1, e)
};
cljs.core.HashMap.prototype.cljs$core$IAssociative$_contains_key_QMARK_ = function(a, b) {
  var d = this.hashobj[cljs.core.hash.call(null, b)], d = cljs.core.truth_(d) ? cljs.core.scan_array.call(null, 2, b, d) : null;
  return cljs.core.truth_(d) ? !0 : !1
};
cljs.core.HashMap.prototype.cljs$core$ICollection$ = !0;
cljs.core.HashMap.prototype.cljs$core$ICollection$_conj = function(a, b) {
  return cljs.core.truth_(cljs.core.vector_QMARK_.call(null, b)) ? cljs.core._assoc.call(null, a, cljs.core._nth.call(null, b, 0), cljs.core._nth.call(null, b, 1)) : cljs.core.reduce.call(null, cljs.core._conj, a, b)
};
cljs.core.HashMap.prototype.cljs$core$ISeqable$ = !0;
cljs.core.HashMap.prototype.cljs$core$ISeqable$_seq = function() {
  var a = this;
  if(cljs.core.truth_(0 < a.count)) {
    var b = cljs.core.js_keys.call(null, a.hashobj);
    return cljs.core.mapcat.call(null, function(b) {
      return cljs.core.map.call(null, cljs.core.vec, cljs.core.partition.call(null, 2, a.hashobj[b]))
    }, b)
  }
  return null
};
cljs.core.HashMap.prototype.cljs$core$ICounted$ = !0;
cljs.core.HashMap.prototype.cljs$core$ICounted$_count = function() {
  return this.count
};
cljs.core.HashMap.prototype.cljs$core$IEquiv$ = !0;
cljs.core.HashMap.prototype.cljs$core$IEquiv$_equiv = function(a, b) {
  return cljs.core.equiv_map.call(null, a, b)
};
cljs.core.HashMap.prototype.cljs$core$IWithMeta$ = !0;
cljs.core.HashMap.prototype.cljs$core$IWithMeta$_with_meta = function(a, b) {
  return new cljs.core.HashMap(b, this.count, this.hashobj)
};
cljs.core.HashMap.prototype.cljs$core$IMeta$ = !0;
cljs.core.HashMap.prototype.cljs$core$IMeta$_meta = function() {
  return this.meta
};
cljs.core.HashMap.prototype.cljs$core$IEmptyableCollection$ = !0;
cljs.core.HashMap.prototype.cljs$core$IEmptyableCollection$_empty = function() {
  return cljs.core.with_meta.call(null, cljs.core.HashMap.EMPTY, this.meta)
};
cljs.core.HashMap.prototype.cljs$core$IMap$ = !0;
cljs.core.HashMap.prototype.cljs$core$IMap$_dissoc = function(a, b) {
  var d = cljs.core.hash.call(null, b), e = this.hashobj[d], f = cljs.core.truth_(e) ? cljs.core.scan_array.call(null, 2, b, e) : null;
  if(cljs.core.truth_(cljs.core.not.call(null, f))) {
    return a
  }
  var g = goog.object.clone.call(null, this.hashobj);
  cljs.core.truth_(3 > e.length) ? cljs.core.js_delete.call(null, g, d) : (e = cljs.core.aclone.call(null, e), e.splice(f, 2), g[d] = e);
  return new cljs.core.HashMap(this.meta, this.count - 1, g)
};
cljs.core.HashMap.EMPTY = new cljs.core.HashMap(null, 0, cljs.core.js_obj.call(null));
cljs.core.HashMap.fromArrays = function(a, b) {
  for(var d = a.length, e = 0, f = cljs.core.HashMap.EMPTY;;) {
    if(cljs.core.truth_(e < d)) {
      var g = e + 1, f = cljs.core.assoc.call(null, f, a[e], b[e]), e = g
    }else {
      return f
    }
  }
};
cljs.core.HashMap.prototype.call = function() {
  var a = null;
  return function(a, d, e) {
    switch(arguments.length) {
      case 2:
        return cljs.core._lookup.call(null, this, d);
      case 3:
        return cljs.core._lookup.call(null, this, d, e)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.hash_map = function() {
  var a = function(a) {
    for(var a = cljs.core.seq.call(null, a), b = cljs.core.HashMap.EMPTY;;) {
      if(cljs.core.truth_(a)) {
        var f = cljs.core.nnext.call(null, a), b = cljs.core.assoc.call(null, b, cljs.core.first.call(null, a), cljs.core.second.call(null, a)), a = f
      }else {
        return b
      }
    }
  }, b = function(b) {
    var e = null;
    goog.isDef(b) && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return a.call(this, e)
  };
  b.cljs$lang$maxFixedArity = 0;
  b.cljs$lang$applyTo = function(b) {
    b = cljs.core.seq(b);
    return a.call(this, b)
  };
  return b
}();
cljs.core.keys = function(a) {
  return cljs.core.seq.call(null, cljs.core.map.call(null, cljs.core.first, a))
};
cljs.core.vals = function(a) {
  return cljs.core.seq.call(null, cljs.core.map.call(null, cljs.core.second, a))
};
cljs.core.merge = function() {
  var a = function(a) {
    return cljs.core.truth_(cljs.core.some.call(null, cljs.core.identity, a)) ? cljs.core.reduce.call(null, function(a, b) {
      return cljs.core.conj.call(null, cljs.core.truth_(a) ? a : cljs.core.ObjMap.fromObject([], {}), b)
    }, a) : null
  }, b = function(b) {
    var e = null;
    goog.isDef(b) && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return a.call(this, e)
  };
  b.cljs$lang$maxFixedArity = 0;
  b.cljs$lang$applyTo = function(b) {
    b = cljs.core.seq(b);
    return a.call(this, b)
  };
  return b
}();
cljs.core.merge_with = function() {
  var a = function(a, b) {
    if(cljs.core.truth_(cljs.core.some.call(null, cljs.core.identity, b))) {
      var f = function(b, e) {
        var f = cljs.core.first.call(null, e), j = cljs.core.second.call(null, e);
        return cljs.core.truth_(cljs.core.contains_QMARK_.call(null, b, f)) ? cljs.core.assoc.call(null, b, f, a.call(null, cljs.core.get.call(null, b, f), j)) : cljs.core.assoc.call(null, b, f, j)
      };
      return cljs.core.reduce.call(null, function(a, b) {
        return cljs.core.reduce.call(null, f, cljs.core.truth_(a) ? a : cljs.core.ObjMap.fromObject([], {}), cljs.core.seq.call(null, b))
      }, b)
    }
    return null
  }, b = function(b, e) {
    var f = null;
    goog.isDef(e) && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
    return a.call(this, b, f)
  };
  b.cljs$lang$maxFixedArity = 1;
  b.cljs$lang$applyTo = function(b) {
    var e = cljs.core.first(b), b = cljs.core.rest(b);
    return a.call(this, e, b)
  };
  return b
}();
cljs.core.select_keys = function(a, b) {
  for(var d = cljs.core.ObjMap.fromObject([], {}), e = cljs.core.seq.call(null, b);;) {
    if(cljs.core.truth_(e)) {
      var f = cljs.core.first.call(null, e), g = cljs.core.get.call(null, a, f, "\ufdd0'user/not-found"), d = cljs.core.truth_(cljs.core.not_EQ_.call(null, g, "\ufdd0'user/not-found")) ? cljs.core.assoc.call(null, d, f, g) : d, e = cljs.core.next.call(null, e)
    }else {
      return d
    }
  }
};
cljs.core.Set = function(a, b) {
  this.meta = a;
  this.hash_map = b
};
cljs.core.Set.prototype.cljs$core$IHash$ = !0;
cljs.core.Set.prototype.cljs$core$IHash$_hash = function(a) {
  return cljs.core.hash_coll.call(null, a)
};
cljs.core.Set.prototype.cljs$core$ILookup$ = !0;
cljs.core.Set.prototype.cljs$core$ILookup$_lookup = function() {
  var a = null;
  return function(a, d, e) {
    switch(arguments.length) {
      case 2:
        return cljs.core._lookup.call(null, a, d, null);
      case 3:
        return cljs.core.truth_(cljs.core._contains_key_QMARK_.call(null, this.hash_map, d)) ? d : e
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.Set.prototype.cljs$core$ICollection$ = !0;
cljs.core.Set.prototype.cljs$core$ICollection$_conj = function(a, b) {
  return new cljs.core.Set(this.meta, cljs.core.assoc.call(null, this.hash_map, b, null))
};
cljs.core.Set.prototype.cljs$core$ISeqable$ = !0;
cljs.core.Set.prototype.cljs$core$ISeqable$_seq = function() {
  return cljs.core.keys.call(null, this.hash_map)
};
cljs.core.Set.prototype.cljs$core$ISet$ = !0;
cljs.core.Set.prototype.cljs$core$ISet$_disjoin = function(a, b) {
  return new cljs.core.Set(this.meta, cljs.core.dissoc.call(null, this.hash_map, b))
};
cljs.core.Set.prototype.cljs$core$ICounted$ = !0;
cljs.core.Set.prototype.cljs$core$ICounted$_count = function(a) {
  return cljs.core.count.call(null, cljs.core.seq.call(null, a))
};
cljs.core.Set.prototype.cljs$core$IEquiv$ = !0;
cljs.core.Set.prototype.cljs$core$IEquiv$_equiv = function(a, b) {
  var d = cljs.core.set_QMARK_.call(null, b);
  return cljs.core.truth_(d) ? (d = cljs.core._EQ_.call(null, cljs.core.count.call(null, a), cljs.core.count.call(null, b)), cljs.core.truth_(d) ? cljs.core.every_QMARK_.call(null, function(b) {
    return cljs.core.contains_QMARK_.call(null, a, b)
  }, b) : d) : d
};
cljs.core.Set.prototype.cljs$core$IWithMeta$ = !0;
cljs.core.Set.prototype.cljs$core$IWithMeta$_with_meta = function(a, b) {
  return new cljs.core.Set(b, this.hash_map)
};
cljs.core.Set.prototype.cljs$core$IMeta$ = !0;
cljs.core.Set.prototype.cljs$core$IMeta$_meta = function() {
  return this.meta
};
cljs.core.Set.prototype.cljs$core$IEmptyableCollection$ = !0;
cljs.core.Set.prototype.cljs$core$IEmptyableCollection$_empty = function() {
  return cljs.core.with_meta.call(null, cljs.core.Set.EMPTY, this.meta)
};
cljs.core.Set.EMPTY = new cljs.core.Set(null, cljs.core.hash_map.call(null));
cljs.core.Set.prototype.call = function() {
  var a = null;
  return function(a, d, e) {
    switch(arguments.length) {
      case 2:
        return cljs.core._lookup.call(null, this, d);
      case 3:
        return cljs.core._lookup.call(null, this, d, e)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.set = function(a) {
  for(var a = cljs.core.seq.call(null, a), b = cljs.core.Set.EMPTY;;) {
    if(cljs.core.truth_(cljs.core.not.call(null, cljs.core.empty_QMARK_.call(null, a)))) {
      var d = cljs.core.rest.call(null, a), b = cljs.core.conj.call(null, b, cljs.core.first.call(null, a)), a = d
    }else {
      return b
    }
  }
};
cljs.core.replace = function(a, b) {
  if(cljs.core.truth_(cljs.core.vector_QMARK_.call(null, b))) {
    var d = cljs.core.count.call(null, b);
    return cljs.core.reduce.call(null, function(b, d) {
      var g = cljs.core.find.call(null, a, cljs.core.nth.call(null, b, d));
      return cljs.core.truth_(g) ? cljs.core.assoc.call(null, b, d, cljs.core.second.call(null, g)) : b
    }, b, cljs.core.take.call(null, d, cljs.core.iterate.call(null, cljs.core.inc, 0)))
  }
  return cljs.core.map.call(null, function(b) {
    var d = cljs.core.find.call(null, a, b);
    return cljs.core.truth_(d) ? cljs.core.second.call(null, d) : b
  }, b)
};
cljs.core.distinct = function(a) {
  return function d(a, f) {
    return new cljs.core.LazySeq(null, !1, function() {
      return function(a, e) {
        for(;;) {
          var f = a, j = cljs.core.nth.call(null, f, 0, null), f = cljs.core.seq.call(null, f);
          if(cljs.core.truth_(f)) {
            if(cljs.core.truth_(cljs.core.contains_QMARK_.call(null, e, j))) {
              j = cljs.core.rest.call(null, f), f = e, a = j, e = f
            }else {
              return cljs.core.cons.call(null, j, d.call(null, cljs.core.rest.call(null, f), cljs.core.conj.call(null, e, j)))
            }
          }else {
            return null
          }
        }
      }.call(null, a, f)
    })
  }.call(null, a, cljs.core.set([]))
};
cljs.core.butlast = function(a) {
  for(var b = cljs.core.Vector.fromArray([]);;) {
    if(cljs.core.truth_(cljs.core.next.call(null, a))) {
      b = cljs.core.conj.call(null, b, cljs.core.first.call(null, a)), a = cljs.core.next.call(null, a)
    }else {
      return cljs.core.seq.call(null, b)
    }
  }
};
cljs.core.name = function(a) {
  if(cljs.core.truth_(cljs.core.string_QMARK_.call(null, a))) {
    return a
  }
  if(cljs.core.truth_(function() {
    var b = cljs.core.keyword_QMARK_.call(null, a);
    return cljs.core.truth_(b) ? b : cljs.core.symbol_QMARK_.call(null, a)
  }())) {
    var b = a.lastIndexOf("/");
    return cljs.core.truth_(0 > b) ? cljs.core.subs.call(null, a, 2) : cljs.core.subs.call(null, a, b + 1)
  }
  if(cljs.core.truth_("\ufdd0'else")) {
    throw Error(cljs.core.str.call(null, "Doesn't support name: ", a));
  }
  return null
};
cljs.core.namespace = function(a) {
  if(cljs.core.truth_(function() {
    var b = cljs.core.keyword_QMARK_.call(null, a);
    return cljs.core.truth_(b) ? b : cljs.core.symbol_QMARK_.call(null, a)
  }())) {
    var b = a.lastIndexOf("/");
    return cljs.core.truth_(-1 < b) ? cljs.core.subs.call(null, a, 2, b) : null
  }
  throw Error(cljs.core.str.call(null, "Doesn't support namespace: ", a));
};
cljs.core.zipmap = function(a, b) {
  for(var d = cljs.core.ObjMap.fromObject([], {}), e = cljs.core.seq.call(null, a), f = cljs.core.seq.call(null, b);;) {
    if(cljs.core.truth_(function() {
      var a = e;
      return cljs.core.truth_(a) ? f : a
    }())) {
      var d = cljs.core.assoc.call(null, d, cljs.core.first.call(null, e), cljs.core.first.call(null, f)), g = cljs.core.next.call(null, e), h = cljs.core.next.call(null, f), e = g, f = h
    }else {
      return d
    }
  }
};
cljs.core.max_key = function() {
  var a = null, b = function() {
    var b = function(b, d, e, i) {
      return cljs.core.reduce.call(null, function(d, e) {
        return a.call(null, b, d, e)
      }, a.call(null, b, d, e), i)
    }, e = function(a, e, h, i) {
      var j = null;
      goog.isDef(i) && (j = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
      return b.call(this, a, e, h, j)
    };
    e.cljs$lang$maxFixedArity = 3;
    e.cljs$lang$applyTo = function(a) {
      var e = cljs.core.first(a), h = cljs.core.first(cljs.core.next(a)), i = cljs.core.first(cljs.core.next(cljs.core.next(a))), a = cljs.core.rest(cljs.core.next(cljs.core.next(a)));
      return b.call(this, e, h, i, a)
    };
    return e
  }(), a = function(a, e, f, g) {
    switch(arguments.length) {
      case 2:
        return e;
      case 3:
        return cljs.core.truth_(a.call(null, e) > a.call(null, f)) ? e : f;
      default:
        return b.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 3;
  a.cljs$lang$applyTo = b.cljs$lang$applyTo;
  return a
}();
cljs.core.min_key = function() {
  var a = null, b = function() {
    var b = function(b, d, e, i) {
      return cljs.core.reduce.call(null, function(d, e) {
        return a.call(null, b, d, e)
      }, a.call(null, b, d, e), i)
    }, e = function(a, e, h, i) {
      var j = null;
      goog.isDef(i) && (j = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
      return b.call(this, a, e, h, j)
    };
    e.cljs$lang$maxFixedArity = 3;
    e.cljs$lang$applyTo = function(a) {
      var e = cljs.core.first(a), h = cljs.core.first(cljs.core.next(a)), i = cljs.core.first(cljs.core.next(cljs.core.next(a))), a = cljs.core.rest(cljs.core.next(cljs.core.next(a)));
      return b.call(this, e, h, i, a)
    };
    return e
  }(), a = function(a, e, f, g) {
    switch(arguments.length) {
      case 2:
        return e;
      case 3:
        return cljs.core.truth_(a.call(null, e) < a.call(null, f)) ? e : f;
      default:
        return b.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 3;
  a.cljs$lang$applyTo = b.cljs$lang$applyTo;
  return a
}();
cljs.core.partition_all = function() {
  var a = null, b = function(b, e, f) {
    return new cljs.core.LazySeq(null, !1, function() {
      var g = cljs.core.seq.call(null, f);
      return cljs.core.truth_(g) ? cljs.core.cons.call(null, cljs.core.take.call(null, b, g), a.call(null, b, e, cljs.core.drop.call(null, e, g))) : null
    })
  };
  return a = function(d, e, f) {
    switch(arguments.length) {
      case 2:
        return a.call(null, d, d, e);
      case 3:
        return b.call(this, d, e, f)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.take_while = function take_while(b, d) {
  return new cljs.core.LazySeq(null, !1, function() {
    var e = cljs.core.seq.call(null, d);
    return cljs.core.truth_(e) ? cljs.core.truth_(b.call(null, cljs.core.first.call(null, e))) ? cljs.core.cons.call(null, cljs.core.first.call(null, e), take_while.call(null, b, cljs.core.rest.call(null, e))) : null : null
  })
};
cljs.core.Range = function(a, b, d, e) {
  this.meta = a;
  this.start = b;
  this.end = d;
  this.step = e
};
cljs.core.Range.prototype.cljs$core$IHash$ = !0;
cljs.core.Range.prototype.cljs$core$IHash$_hash = function(a) {
  return cljs.core.hash_coll.call(null, a)
};
cljs.core.Range.prototype.cljs$core$ISequential$ = !0;
cljs.core.Range.prototype.cljs$core$ICollection$ = !0;
cljs.core.Range.prototype.cljs$core$ICollection$_conj = function(a, b) {
  return cljs.core.cons.call(null, b, a)
};
cljs.core.Range.prototype.cljs$core$IReduce$ = !0;
cljs.core.Range.prototype.cljs$core$IReduce$_reduce = function() {
  var a = null;
  return function(a, d, e) {
    switch(arguments.length) {
      case 2:
        return cljs.core.ci_reduce.call(null, a, d);
      case 3:
        return cljs.core.ci_reduce.call(null, a, d, e)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.Range.prototype.cljs$core$ISeqable$ = !0;
cljs.core.Range.prototype.cljs$core$ISeqable$_seq = function(a) {
  var b = cljs.core.truth_(0 < this.step) ? cljs.core._LT_ : cljs.core._GT_;
  return cljs.core.truth_(b.call(null, this.start, this.end)) ? a : null
};
cljs.core.Range.prototype.cljs$core$ICounted$ = !0;
cljs.core.Range.prototype.cljs$core$ICounted$_count = function(a) {
  return cljs.core.truth_(cljs.core.not.call(null, cljs.core._seq.call(null, a))) ? 0 : Math.ceil.call(null, (this.end - this.start) / this.step)
};
cljs.core.Range.prototype.cljs$core$ISeq$ = !0;
cljs.core.Range.prototype.cljs$core$ISeq$_first = function() {
  return this.start
};
cljs.core.Range.prototype.cljs$core$ISeq$_rest = function(a) {
  return cljs.core.truth_(cljs.core._seq.call(null, a)) ? new cljs.core.Range(this.meta, this.start + this.step, this.end, this.step) : cljs.core.list.call(null)
};
cljs.core.Range.prototype.cljs$core$IEquiv$ = !0;
cljs.core.Range.prototype.cljs$core$IEquiv$_equiv = function(a, b) {
  return cljs.core.equiv_sequential.call(null, a, b)
};
cljs.core.Range.prototype.cljs$core$IWithMeta$ = !0;
cljs.core.Range.prototype.cljs$core$IWithMeta$_with_meta = function(a, b) {
  return new cljs.core.Range(b, this.start, this.end, this.step)
};
cljs.core.Range.prototype.cljs$core$IMeta$ = !0;
cljs.core.Range.prototype.cljs$core$IMeta$_meta = function() {
  return this.meta
};
cljs.core.Range.prototype.cljs$core$IIndexed$ = !0;
cljs.core.Range.prototype.cljs$core$IIndexed$_nth = function() {
  var a = null, b = function(a, b) {
    var d = this;
    if(cljs.core.truth_(b < cljs.core._count.call(null, a))) {
      return d.start + b * d.step
    }
    if(cljs.core.truth_(function() {
      var a = d.start > d.end;
      return cljs.core.truth_(a) ? cljs.core._EQ_.call(null, d.step, 0) : a
    }())) {
      return d.start
    }
    throw Error("Index out of bounds");
  }, d = function(a, b, d) {
    var h = this;
    return cljs.core.truth_(b < cljs.core._count.call(null, a)) ? h.start + b * h.step : cljs.core.truth_(function() {
      var a = h.start > h.end;
      return cljs.core.truth_(a) ? cljs.core._EQ_.call(null, h.step, 0) : a
    }()) ? h.start : d
  };
  return function(a, f, g) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, f);
      case 3:
        return d.call(this, a, f, g)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.Range.prototype.cljs$core$IEmptyableCollection$ = !0;
cljs.core.Range.prototype.cljs$core$IEmptyableCollection$_empty = function() {
  return cljs.core.with_meta.call(null, cljs.core.List.EMPTY, this.meta)
};
cljs.core.range = function() {
  var a = null;
  return a = function(b, d, e) {
    switch(arguments.length) {
      case 0:
        return a.call(null, 0, Number.MAX_VALUE, 1);
      case 1:
        return a.call(null, 0, b, 1);
      case 2:
        return a.call(null, b, d, 1);
      case 3:
        return new cljs.core.Range(null, b, d, e)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.take_nth = function take_nth(b, d) {
  return new cljs.core.LazySeq(null, !1, function() {
    var e = cljs.core.seq.call(null, d);
    return cljs.core.truth_(e) ? cljs.core.cons.call(null, cljs.core.first.call(null, e), take_nth.call(null, b, cljs.core.drop.call(null, b, e))) : null
  })
};
cljs.core.split_with = function(a, b) {
  return cljs.core.Vector.fromArray([cljs.core.take_while.call(null, a, b), cljs.core.drop_while.call(null, a, b)])
};
cljs.core.partition_by = function partition_by(b, d) {
  return new cljs.core.LazySeq(null, !1, function() {
    var e = cljs.core.seq.call(null, d);
    if(cljs.core.truth_(e)) {
      var f = cljs.core.first.call(null, e), g = b.call(null, f), f = cljs.core.cons.call(null, f, cljs.core.take_while.call(null, function(d) {
        return cljs.core._EQ_.call(null, g, b.call(null, d))
      }, cljs.core.next.call(null, e)));
      return cljs.core.cons.call(null, f, partition_by.call(null, b, cljs.core.seq.call(null, cljs.core.drop.call(null, cljs.core.count.call(null, f), e))))
    }
    return null
  })
};
cljs.core.frequencies = function(a) {
  return cljs.core.reduce.call(null, function(a, d) {
    return cljs.core.assoc.call(null, a, d, cljs.core.get.call(null, a, d, 0) + 1)
  }, cljs.core.ObjMap.fromObject([], {}), a)
};
cljs.core.reductions = function() {
  var a = null, b = function(b, d) {
    return new cljs.core.LazySeq(null, !1, function() {
      var g = cljs.core.seq.call(null, d);
      return cljs.core.truth_(g) ? a.call(null, b, cljs.core.first.call(null, g), cljs.core.rest.call(null, g)) : cljs.core.list.call(null, b.call(null))
    })
  }, d = function(b, d, g) {
    return cljs.core.cons.call(null, d, new cljs.core.LazySeq(null, !1, function() {
      var h = cljs.core.seq.call(null, g);
      return cljs.core.truth_(h) ? a.call(null, b, b.call(null, d, cljs.core.first.call(null, h)), cljs.core.rest.call(null, h)) : null
    }))
  };
  return a = function(a, f, g) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, f);
      case 3:
        return d.call(this, a, f, g)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.juxt = function() {
  var a = null, b = function(a) {
    return function() {
      var b = null, d = function() {
        var b = function(b, d, e, f) {
          var h = null;
          goog.isDef(f) && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
          return cljs.core.vector.call(null, cljs.core.apply.call(null, a, b, d, e, h))
        };
        b.cljs$lang$maxFixedArity = 3;
        b.cljs$lang$applyTo = function(b) {
          var d = cljs.core.first(b), e = cljs.core.first(cljs.core.next(b)), f = cljs.core.first(cljs.core.next(cljs.core.next(b))), b = cljs.core.rest(cljs.core.next(cljs.core.next(b)));
          return cljs.core.vector.call(null, cljs.core.apply.call(null, a, d, e, f, b))
        };
        return b
      }(), b = function(b, e, f, h) {
        switch(arguments.length) {
          case 0:
            return cljs.core.vector.call(null, a.call(null));
          case 1:
            return cljs.core.vector.call(null, a.call(null, b));
          case 2:
            return cljs.core.vector.call(null, a.call(null, b, e));
          case 3:
            return cljs.core.vector.call(null, a.call(null, b, e, f));
          default:
            return d.apply(this, arguments)
        }
        throw"Invalid arity: " + arguments.length;
      };
      b.cljs$lang$maxFixedArity = 3;
      b.cljs$lang$applyTo = d.cljs$lang$applyTo;
      return b
    }()
  }, d = function(a, b) {
    return function() {
      var d = null, e = function() {
        var d = function(d, e, f, i) {
          return cljs.core.vector.call(null, cljs.core.apply.call(null, a, d, e, f, i), cljs.core.apply.call(null, b, d, e, f, i))
        }, e = function(a, b, e, f) {
          var g = null;
          goog.isDef(f) && (g = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
          return d.call(this, a, b, e, g)
        };
        e.cljs$lang$maxFixedArity = 3;
        e.cljs$lang$applyTo = function(a) {
          var b = cljs.core.first(a), e = cljs.core.first(cljs.core.next(a)), f = cljs.core.first(cljs.core.next(cljs.core.next(a))), a = cljs.core.rest(cljs.core.next(cljs.core.next(a)));
          return d.call(this, b, e, f, a)
        };
        return e
      }(), d = function(d, f, i, l) {
        switch(arguments.length) {
          case 0:
            return cljs.core.vector.call(null, a.call(null), b.call(null));
          case 1:
            return cljs.core.vector.call(null, a.call(null, d), b.call(null, d));
          case 2:
            return cljs.core.vector.call(null, a.call(null, d, f), b.call(null, d, f));
          case 3:
            return cljs.core.vector.call(null, a.call(null, d, f, i), b.call(null, d, f, i));
          default:
            return e.apply(this, arguments)
        }
        throw"Invalid arity: " + arguments.length;
      };
      d.cljs$lang$maxFixedArity = 3;
      d.cljs$lang$applyTo = e.cljs$lang$applyTo;
      return d
    }()
  }, e = function(a, b, d) {
    return function() {
      var e = null, f = function() {
        var e = function(e, f, j, k) {
          return cljs.core.vector.call(null, cljs.core.apply.call(null, a, e, f, j, k), cljs.core.apply.call(null, b, e, f, j, k), cljs.core.apply.call(null, d, e, f, j, k))
        }, f = function(a, b, d, f) {
          var g = null;
          goog.isDef(f) && (g = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
          return e.call(this, a, b, d, g)
        };
        f.cljs$lang$maxFixedArity = 3;
        f.cljs$lang$applyTo = function(a) {
          var b = cljs.core.first(a), d = cljs.core.first(cljs.core.next(a)), f = cljs.core.first(cljs.core.next(cljs.core.next(a))), a = cljs.core.rest(cljs.core.next(cljs.core.next(a)));
          return e.call(this, b, d, f, a)
        };
        return f
      }(), e = function(e, j, l, o) {
        switch(arguments.length) {
          case 0:
            return cljs.core.vector.call(null, a.call(null), b.call(null), d.call(null));
          case 1:
            return cljs.core.vector.call(null, a.call(null, e), b.call(null, e), d.call(null, e));
          case 2:
            return cljs.core.vector.call(null, a.call(null, e, j), b.call(null, e, j), d.call(null, e, j));
          case 3:
            return cljs.core.vector.call(null, a.call(null, e, j, l), b.call(null, e, j, l), d.call(null, e, j, l));
          default:
            return f.apply(this, arguments)
        }
        throw"Invalid arity: " + arguments.length;
      };
      e.cljs$lang$maxFixedArity = 3;
      e.cljs$lang$applyTo = f.cljs$lang$applyTo;
      return e
    }()
  }, f = function() {
    var a = function(a, b, d, e) {
      var f = cljs.core.list_STAR_.call(null, a, b, d, e);
      return function() {
        var a = null, b = function() {
          return cljs.core.reduce.call(null, function(a, b) {
            return cljs.core.conj.call(null, a, b.call(null))
          }, cljs.core.Vector.fromArray([]), f)
        }, d = function(a) {
          return cljs.core.reduce.call(null, function(b, d) {
            return cljs.core.conj.call(null, b, d.call(null, a))
          }, cljs.core.Vector.fromArray([]), f)
        }, e = function(a, b) {
          return cljs.core.reduce.call(null, function(d, e) {
            return cljs.core.conj.call(null, d, e.call(null, a, b))
          }, cljs.core.Vector.fromArray([]), f)
        }, g = function(a, b, d) {
          return cljs.core.reduce.call(null, function(e, f) {
            return cljs.core.conj.call(null, e, f.call(null, a, b, d))
          }, cljs.core.Vector.fromArray([]), f)
        }, h = function() {
          var a = function(a, b, d, e) {
            return cljs.core.reduce.call(null, function(f, g) {
              return cljs.core.conj.call(null, f, cljs.core.apply.call(null, g, a, b, d, e))
            }, cljs.core.Vector.fromArray([]), f)
          }, b = function(b, d, e, f) {
            var g = null;
            goog.isDef(f) && (g = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
            return a.call(this, b, d, e, g)
          };
          b.cljs$lang$maxFixedArity = 3;
          b.cljs$lang$applyTo = function(b) {
            var d = cljs.core.first(b), e = cljs.core.first(cljs.core.next(b)), f = cljs.core.first(cljs.core.next(cljs.core.next(b))), b = cljs.core.rest(cljs.core.next(cljs.core.next(b)));
            return a.call(this, d, e, f, b)
          };
          return b
        }(), a = function(a, f, i, j) {
          switch(arguments.length) {
            case 0:
              return b.call(this);
            case 1:
              return d.call(this, a);
            case 2:
              return e.call(this, a, f);
            case 3:
              return g.call(this, a, f, i);
            default:
              return h.apply(this, arguments)
          }
          throw"Invalid arity: " + arguments.length;
        };
        a.cljs$lang$maxFixedArity = 3;
        a.cljs$lang$applyTo = h.cljs$lang$applyTo;
        return a
      }()
    }, b = function(b, d, e, f) {
      var h = null;
      goog.isDef(f) && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
      return a.call(this, b, d, e, h)
    };
    b.cljs$lang$maxFixedArity = 3;
    b.cljs$lang$applyTo = function(b) {
      var d = cljs.core.first(b), e = cljs.core.first(cljs.core.next(b)), f = cljs.core.first(cljs.core.next(cljs.core.next(b))), b = cljs.core.rest(cljs.core.next(cljs.core.next(b)));
      return a.call(this, d, e, f, b)
    };
    return b
  }(), a = function(a, h, i, j) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return d.call(this, a, h);
      case 3:
        return e.call(this, a, h, i);
      default:
        return f.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 3;
  a.cljs$lang$applyTo = f.cljs$lang$applyTo;
  return a
}();
cljs.core.dorun = function() {
  var a = null, b = function(a, b) {
    for(;;) {
      if(cljs.core.truth_(function() {
        var f = cljs.core.seq.call(null, b);
        return cljs.core.truth_(f) ? 0 < a : f
      }())) {
        var f = a - 1, g = cljs.core.next.call(null, b), a = f, b = g
      }else {
        return null
      }
    }
  };
  return function(a, e) {
    switch(arguments.length) {
      case 1:
        var f;
        a: {
          for(var g = a;;) {
            if(cljs.core.truth_(cljs.core.seq.call(null, g))) {
              g = cljs.core.next.call(null, g)
            }else {
              f = null;
              break a
            }
          }
        }
        return f;
      case 2:
        return b.call(this, a, e)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.doall = function() {
  var a = null;
  return function(a, d) {
    switch(arguments.length) {
      case 1:
        return cljs.core.dorun.call(null, a), a;
      case 2:
        return cljs.core.dorun.call(null, a, d), d
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.re_matches = function(a, b) {
  var d = a.exec(b);
  return cljs.core.truth_(cljs.core._EQ_.call(null, cljs.core.first.call(null, d), b)) ? cljs.core.truth_(cljs.core._EQ_.call(null, cljs.core.count.call(null, d), 1)) ? cljs.core.first.call(null, d) : cljs.core.vec.call(null, d) : null
};
cljs.core.re_find = function(a, b) {
  var d = a.exec(b);
  return cljs.core.truth_(cljs.core.nil_QMARK_.call(null, d)) ? null : cljs.core.truth_(cljs.core._EQ_.call(null, cljs.core.count.call(null, d), 1)) ? cljs.core.first.call(null, d) : cljs.core.vec.call(null, d)
};
cljs.core.re_seq = function re_seq(b, d) {
  var e = cljs.core.re_find.call(null, b, d), f = d.search(b), g = cljs.core.truth_(cljs.core.coll_QMARK_.call(null, e)) ? cljs.core.first.call(null, e) : e, h = cljs.core.subs.call(null, d, f + cljs.core.count.call(null, g));
  return cljs.core.truth_(e) ? new cljs.core.LazySeq(null, !1, function() {
    return cljs.core.cons.call(null, e, re_seq.call(null, b, h))
  }) : null
};
cljs.core.re_pattern = function(a) {
  return RegExp(a)
};
cljs.core.pr_sequential = function(a, b, d, e, f, g) {
  return cljs.core.concat.call(null, cljs.core.Vector.fromArray([b]), cljs.core.flatten1.call(null, cljs.core.interpose.call(null, cljs.core.Vector.fromArray([d]), cljs.core.map.call(null, function(b) {
    return a.call(null, b, f)
  }, g))), cljs.core.Vector.fromArray([e]))
};
cljs.core.string_print = function(a) {
  cljs.core._STAR_print_fn_STAR_.call(null, a);
  return null
};
cljs.core.flush = function() {
  return null
};
cljs.core.pr_seq = function pr_seq(b, d) {
  return cljs.core.truth_(cljs.core.nil_QMARK_.call(null, b)) ? cljs.core.list.call(null, "nil") : cljs.core.truth_(cljs.core.undefined_QMARK_.call(null, b)) ? cljs.core.list.call(null, "#<undefined>") : cljs.core.truth_("\ufdd0'else") ? cljs.core.concat.call(null, cljs.core.truth_(function() {
    var e = cljs.core.get.call(null, d, "\ufdd0'meta");
    return cljs.core.truth_(e) ? (e = function() {
      return cljs.core.truth_(function() {
        if(cljs.core.truth_(b)) {
          var d = b.cljs$core$IMeta$;
          return cljs.core.truth_(d) ? cljs.core.not.call(null, b.hasOwnProperty("cljs$core$IMeta$")) : d
        }
        return b
      }()) ? !0 : cljs.core.type_satisfies_.call(null, cljs.core.IMeta, b)
    }(), cljs.core.truth_(e) ? cljs.core.meta.call(null, b) : e) : e
  }()) ? cljs.core.concat.call(null, cljs.core.Vector.fromArray(["^"]), pr_seq.call(null, cljs.core.meta.call(null, b), d), cljs.core.Vector.fromArray([" "])) : null, cljs.core.truth_(function() {
    return cljs.core.truth_(function() {
      if(cljs.core.truth_(b)) {
        var d = b.cljs$core$IPrintable$;
        return cljs.core.truth_(d) ? cljs.core.not.call(null, b.hasOwnProperty("cljs$core$IPrintable$")) : d
      }
      return b
    }()) ? !0 : cljs.core.type_satisfies_.call(null, cljs.core.IPrintable, b)
  }()) ? cljs.core._pr_seq.call(null, b, d) : cljs.core.list.call(null, "#<", cljs.core.str.call(null, b), ">")) : null
};
cljs.core.pr_str_with_opts = function(a, b) {
  var d = cljs.core.first.call(null, a), e = new goog.string.StringBuffer, f = cljs.core.seq.call(null, a);
  if(cljs.core.truth_(f)) {
    for(var g = cljs.core.first.call(null, f);;) {
      cljs.core.truth_(g === d) || e.append(" ");
      var h = cljs.core.seq.call(null, cljs.core.pr_seq.call(null, g, b));
      if(cljs.core.truth_(h)) {
        for(g = cljs.core.first.call(null, h);;) {
          if(e.append(g), g = cljs.core.next.call(null, h), cljs.core.truth_(g)) {
            h = g, g = cljs.core.first.call(null, h)
          }else {
            break
          }
        }
      }
      f = cljs.core.next.call(null, f);
      if(cljs.core.truth_(f)) {
        g = f, f = cljs.core.first.call(null, g), h = g, g = f, f = h
      }else {
        break
      }
    }
  }
  return cljs.core.str.call(null, e)
};
cljs.core.pr_with_opts = function(a, b) {
  var d = cljs.core.first.call(null, a), e = cljs.core.seq.call(null, a);
  if(cljs.core.truth_(e)) {
    for(var f = cljs.core.first.call(null, e);;) {
      cljs.core.truth_(f === d) || cljs.core.string_print.call(null, " ");
      var g = cljs.core.seq.call(null, cljs.core.pr_seq.call(null, f, b));
      if(cljs.core.truth_(g)) {
        for(f = cljs.core.first.call(null, g);;) {
          if(cljs.core.string_print.call(null, f), f = cljs.core.next.call(null, g), cljs.core.truth_(f)) {
            g = f, f = cljs.core.first.call(null, g)
          }else {
            break
          }
        }
      }
      e = cljs.core.next.call(null, e);
      if(cljs.core.truth_(e)) {
        f = e, e = cljs.core.first.call(null, f), g = f, f = e, e = g
      }else {
        return null
      }
    }
  }else {
    return null
  }
};
cljs.core.newline = function(a) {
  cljs.core.string_print.call(null, "\n");
  return cljs.core.truth_(cljs.core.get.call(null, a, "\ufdd0'flush-on-newline")) ? cljs.core.flush.call(null) : null
};
cljs.core._STAR_flush_on_newline_STAR_ = !0;
cljs.core._STAR_print_readably_STAR_ = !0;
cljs.core._STAR_print_meta_STAR_ = !1;
cljs.core._STAR_print_dup_STAR_ = !1;
cljs.core.pr_opts = function() {
  return cljs.core.ObjMap.fromObject(["\ufdd0'flush-on-newline", "\ufdd0'readably", "\ufdd0'meta", "\ufdd0'dup"], {"\ufdd0'flush-on-newline":cljs.core._STAR_flush_on_newline_STAR_, "\ufdd0'readably":cljs.core._STAR_print_readably_STAR_, "\ufdd0'meta":cljs.core._STAR_print_meta_STAR_, "\ufdd0'dup":cljs.core._STAR_print_dup_STAR_})
};
cljs.core.pr_str = function() {
  var a = function(a) {
    return cljs.core.pr_str_with_opts.call(null, a, cljs.core.pr_opts.call(null))
  }, b = function(b) {
    var e = null;
    goog.isDef(b) && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return a.call(this, e)
  };
  b.cljs$lang$maxFixedArity = 0;
  b.cljs$lang$applyTo = function(b) {
    b = cljs.core.seq(b);
    return a.call(this, b)
  };
  return b
}();
cljs.core.pr = function() {
  var a = function(a) {
    return cljs.core.pr_with_opts.call(null, a, cljs.core.pr_opts.call(null))
  }, b = function(b) {
    var e = null;
    goog.isDef(b) && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return a.call(this, e)
  };
  b.cljs$lang$maxFixedArity = 0;
  b.cljs$lang$applyTo = function(b) {
    b = cljs.core.seq(b);
    return a.call(this, b)
  };
  return b
}();
cljs.core.print = function() {
  var a = function(a) {
    return cljs.core.pr_with_opts.call(null, a, cljs.core.assoc.call(null, cljs.core.pr_opts.call(null), "\ufdd0'readably", !1))
  }, b = function(b) {
    var e = null;
    goog.isDef(b) && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return a.call(this, e)
  };
  b.cljs$lang$maxFixedArity = 0;
  b.cljs$lang$applyTo = function(b) {
    b = cljs.core.seq(b);
    return a.call(this, b)
  };
  return b
}();
cljs.core.println = function() {
  var a = function(a) {
    cljs.core.pr_with_opts.call(null, a, cljs.core.assoc.call(null, cljs.core.pr_opts.call(null), "\ufdd0'readably", !1));
    return cljs.core.newline.call(null, cljs.core.pr_opts.call(null))
  }, b = function(b) {
    var e = null;
    goog.isDef(b) && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return a.call(this, e)
  };
  b.cljs$lang$maxFixedArity = 0;
  b.cljs$lang$applyTo = function(b) {
    b = cljs.core.seq(b);
    return a.call(this, b)
  };
  return b
}();
cljs.core.prn = function() {
  var a = function(a) {
    cljs.core.pr_with_opts.call(null, a, cljs.core.pr_opts.call(null));
    return cljs.core.newline.call(null, cljs.core.pr_opts.call(null))
  }, b = function(b) {
    var e = null;
    goog.isDef(b) && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return a.call(this, e)
  };
  b.cljs$lang$maxFixedArity = 0;
  b.cljs$lang$applyTo = function(b) {
    b = cljs.core.seq(b);
    return a.call(this, b)
  };
  return b
}();
cljs.core.HashMap.prototype.cljs$core$IPrintable$ = !0;
cljs.core.HashMap.prototype.cljs$core$IPrintable$_pr_seq = function(a, b) {
  return cljs.core.pr_sequential.call(null, function(a) {
    return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "", " ", "", b, a)
  }, "{", ", ", "}", b, a)
};
cljs.core.IPrintable.number = !0;
cljs.core._pr_seq.number = function(a) {
  return cljs.core.list.call(null, cljs.core.str.call(null, a))
};
cljs.core.IndexedSeq.prototype.cljs$core$IPrintable$ = !0;
cljs.core.IndexedSeq.prototype.cljs$core$IPrintable$_pr_seq = function(a, b) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "(", " ", ")", b, a)
};
cljs.core.Subvec.prototype.cljs$core$IPrintable$ = !0;
cljs.core.Subvec.prototype.cljs$core$IPrintable$_pr_seq = function(a, b) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "[", " ", "]", b, a)
};
cljs.core.LazySeq.prototype.cljs$core$IPrintable$ = !0;
cljs.core.LazySeq.prototype.cljs$core$IPrintable$_pr_seq = function(a, b) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "(", " ", ")", b, a)
};
cljs.core.IPrintable["boolean"] = !0;
cljs.core._pr_seq["boolean"] = function(a) {
  return cljs.core.list.call(null, cljs.core.str.call(null, a))
};
cljs.core.Set.prototype.cljs$core$IPrintable$ = !0;
cljs.core.Set.prototype.cljs$core$IPrintable$_pr_seq = function(a, b) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "#{", " ", "}", b, a)
};
cljs.core.IPrintable.string = !0;
cljs.core._pr_seq.string = function(a, b) {
  return cljs.core.truth_(cljs.core.keyword_QMARK_.call(null, a)) ? cljs.core.list.call(null, cljs.core.str.call(null, ":", function() {
    var b = cljs.core.namespace.call(null, a);
    return cljs.core.truth_(b) ? cljs.core.str.call(null, b, "/") : null
  }(), cljs.core.name.call(null, a))) : cljs.core.truth_(cljs.core.symbol_QMARK_.call(null, a)) ? cljs.core.list.call(null, cljs.core.str.call(null, function() {
    var b = cljs.core.namespace.call(null, a);
    return cljs.core.truth_(b) ? cljs.core.str.call(null, b, "/") : null
  }(), cljs.core.name.call(null, a))) : cljs.core.truth_("\ufdd0'else") ? cljs.core.list.call(null, cljs.core.truth_("\ufdd0'readably".call(null, b)) ? goog.string.quote.call(null, a) : a) : null
};
cljs.core.Vector.prototype.cljs$core$IPrintable$ = !0;
cljs.core.Vector.prototype.cljs$core$IPrintable$_pr_seq = function(a, b) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "[", " ", "]", b, a)
};
cljs.core.List.prototype.cljs$core$IPrintable$ = !0;
cljs.core.List.prototype.cljs$core$IPrintable$_pr_seq = function(a, b) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "(", " ", ")", b, a)
};
cljs.core.IPrintable.array = !0;
cljs.core._pr_seq.array = function(a, b) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "#<Array [", ", ", "]>", b, a)
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$IPrintable$ = !0;
cljs.core.PersistentQueueSeq.prototype.cljs$core$IPrintable$_pr_seq = function(a, b) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "(", " ", ")", b, a)
};
cljs.core.EmptyList.prototype.cljs$core$IPrintable$ = !0;
cljs.core.EmptyList.prototype.cljs$core$IPrintable$_pr_seq = function() {
  return cljs.core.list.call(null, "()")
};
cljs.core.Cons.prototype.cljs$core$IPrintable$ = !0;
cljs.core.Cons.prototype.cljs$core$IPrintable$_pr_seq = function(a, b) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "(", " ", ")", b, a)
};
cljs.core.Range.prototype.cljs$core$IPrintable$ = !0;
cljs.core.Range.prototype.cljs$core$IPrintable$_pr_seq = function(a, b) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "(", " ", ")", b, a)
};
cljs.core.ObjMap.prototype.cljs$core$IPrintable$ = !0;
cljs.core.ObjMap.prototype.cljs$core$IPrintable$_pr_seq = function(a, b) {
  return cljs.core.pr_sequential.call(null, function(a) {
    return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "", " ", "", b, a)
  }, "{", ", ", "}", b, a)
};
cljs.core.Atom = function(a, b, d, e) {
  this.state = a;
  this.meta = b;
  this.validator = d;
  this.watches = e
};
cljs.core.Atom.prototype.cljs$core$IHash$ = !0;
cljs.core.Atom.prototype.cljs$core$IHash$_hash = function(a) {
  return goog.getUid.call(null, a)
};
cljs.core.Atom.prototype.cljs$core$IWatchable$ = !0;
cljs.core.Atom.prototype.cljs$core$IWatchable$_notify_watches = function(a, b, d) {
  var e = cljs.core.seq.call(null, this.watches);
  if(cljs.core.truth_(e)) {
    var f = cljs.core.first.call(null, e);
    cljs.core.nth.call(null, f, 0, null);
    for(cljs.core.nth.call(null, f, 1, null);;) {
      var g = f, f = cljs.core.nth.call(null, g, 0, null), g = cljs.core.nth.call(null, g, 1, null);
      g.call(null, f, a, b, d);
      e = cljs.core.next.call(null, e);
      if(cljs.core.truth_(e)) {
        f = e, e = cljs.core.first.call(null, f), g = f, f = e, e = g
      }else {
        return null
      }
    }
  }else {
    return null
  }
};
cljs.core.Atom.prototype.cljs$core$IWatchable$_add_watch = function(a, b, d) {
  return a.watches = cljs.core.assoc.call(null, this.watches, b, d)
};
cljs.core.Atom.prototype.cljs$core$IWatchable$_remove_watch = function(a, b) {
  return a.watches = cljs.core.dissoc.call(null, this.watches, b)
};
cljs.core.Atom.prototype.cljs$core$IPrintable$ = !0;
cljs.core.Atom.prototype.cljs$core$IPrintable$_pr_seq = function(a, b) {
  return cljs.core.concat.call(null, cljs.core.Vector.fromArray(["#<Atom: "]), cljs.core._pr_seq.call(null, this.state, b), ">")
};
cljs.core.Atom.prototype.cljs$core$IMeta$ = !0;
cljs.core.Atom.prototype.cljs$core$IMeta$_meta = function() {
  return this.meta
};
cljs.core.Atom.prototype.cljs$core$IDeref$ = !0;
cljs.core.Atom.prototype.cljs$core$IDeref$_deref = function() {
  return this.state
};
cljs.core.Atom.prototype.cljs$core$IEquiv$ = !0;
cljs.core.Atom.prototype.cljs$core$IEquiv$_equiv = function(a, b) {
  return a === b
};
cljs.core.atom = function() {
  var a = null, b = function() {
    var a = function(a, b) {
      var d = cljs.core.truth_(cljs.core.seq_QMARK_.call(null, b)) ? cljs.core.apply.call(null, cljs.core.hash_map, b) : b, e = cljs.core.get.call(null, d, "\ufdd0'validator"), d = cljs.core.get.call(null, d, "\ufdd0'meta");
      return new cljs.core.Atom(a, d, e, null)
    }, b = function(b, e) {
      var h = null;
      goog.isDef(e) && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
      return a.call(this, b, h)
    };
    b.cljs$lang$maxFixedArity = 1;
    b.cljs$lang$applyTo = function(b) {
      var e = cljs.core.first(b), b = cljs.core.rest(b);
      return a.call(this, e, b)
    };
    return b
  }(), a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return new cljs.core.Atom(a, null, null, null);
      default:
        return b.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 1;
  a.cljs$lang$applyTo = b.cljs$lang$applyTo;
  return a
}();
cljs.core.reset_BANG_ = function(a, b) {
  var d = a.validator;
  if(cljs.core.truth_(d) && !cljs.core.truth_(d.call(null, b))) {
    throw Error(cljs.core.str.call(null, "Assert failed: ", "Validator rejected reference state", "\n", cljs.core.pr_str.call(null, cljs.core.with_meta(cljs.core.list("\ufdd1'validate", "\ufdd1'new-value"), cljs.core.hash_map("\ufdd0'line", 3016)))));
  }
  d = a.state;
  a.state = b;
  cljs.core._notify_watches.call(null, a, d, b);
  return b
};
cljs.core.swap_BANG_ = function() {
  var a = null, b = function() {
    var a = function(a, b, d, h, i, j) {
      var k = null;
      goog.isDef(j) && (k = cljs.core.array_seq(Array.prototype.slice.call(arguments, 5), 0));
      return cljs.core.reset_BANG_.call(null, a, cljs.core.apply.call(null, b, a.state, d, h, i, k))
    };
    a.cljs$lang$maxFixedArity = 5;
    a.cljs$lang$applyTo = function(a) {
      var b = cljs.core.first(a), d = cljs.core.first(cljs.core.next(a)), h = cljs.core.first(cljs.core.next(cljs.core.next(a))), i = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(a)))), j = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(cljs.core.next(a))))), a = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(cljs.core.next(a)))));
      return cljs.core.reset_BANG_.call(null, b, cljs.core.apply.call(null, d, b.state, h, i, j, a))
    };
    return a
  }(), a = function(a, e, f, g, h, i) {
    switch(arguments.length) {
      case 2:
        return cljs.core.reset_BANG_.call(null, a, e.call(null, a.state));
      case 3:
        return cljs.core.reset_BANG_.call(null, a, e.call(null, a.state, f));
      case 4:
        return cljs.core.reset_BANG_.call(null, a, e.call(null, a.state, f, g));
      case 5:
        return cljs.core.reset_BANG_.call(null, a, e.call(null, a.state, f, g, h));
      default:
        return b.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 5;
  a.cljs$lang$applyTo = b.cljs$lang$applyTo;
  return a
}();
cljs.core.compare_and_set_BANG_ = function(a, b, d) {
  return cljs.core.truth_(cljs.core._EQ_.call(null, a.state, b)) ? (cljs.core.reset_BANG_.call(null, a, d), !0) : !1
};
cljs.core.deref = function(a) {
  return cljs.core._deref.call(null, a)
};
cljs.core.set_validator_BANG_ = function(a, b) {
  return a.validator = b
};
cljs.core.get_validator = function(a) {
  return a.validator
};
cljs.core.alter_meta_BANG_ = function() {
  var a = function(a, d, e) {
    var f = null;
    goog.isDef(e) && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return a.meta = cljs.core.apply.call(null, d, a.meta, f)
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = function(a) {
    var d = cljs.core.first(a), e = cljs.core.first(cljs.core.next(a)), a = cljs.core.rest(cljs.core.next(a));
    return d.meta = cljs.core.apply.call(null, e, d.meta, a)
  };
  return a
}();
cljs.core.reset_meta_BANG_ = function(a, b) {
  return a.meta = b
};
cljs.core.add_watch = function(a, b, d) {
  return cljs.core._add_watch.call(null, a, b, d)
};
cljs.core.remove_watch = function(a, b) {
  return cljs.core._remove_watch.call(null, a, b)
};
cljs.core.gensym_counter = null;
cljs.core.gensym = function() {
  var a = null;
  return a = function(b) {
    switch(arguments.length) {
      case 0:
        return a.call(null, "G__");
      case 1:
        if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null, cljs.core.gensym_counter))) {
          cljs.core.gensym_counter = cljs.core.atom.call(null, 0)
        }
        return cljs.core.symbol.call(null, cljs.core.str.call(null, b, cljs.core.swap_BANG_.call(null, cljs.core.gensym_counter, cljs.core.inc)))
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.fixture1 = 1;
cljs.core.fixture2 = 2;
cljs.core.Delay = function(a, b) {
  this.f = a;
  this.state = b
};
cljs.core.Delay.prototype.cljs$core$IPending$ = !0;
cljs.core.Delay.prototype.cljs$core$IPending$_realized_QMARK_ = function() {
  return cljs.core.not.call(null, cljs.core.nil_QMARK_.call(null, cljs.core.deref.call(null, this.state)))
};
cljs.core.Delay.prototype.cljs$core$IDeref$ = !0;
cljs.core.Delay.prototype.cljs$core$IDeref$_deref = function() {
  cljs.core.truth_(cljs.core.deref.call(null, this.state)) || cljs.core.swap_BANG_.call(null, this.state, this.f);
  return cljs.core.deref.call(null, this.state)
};
cljs.core.delay = function() {
  var a = function(a) {
    return new cljs.core.Delay(function() {
      return cljs.core.apply.call(null, cljs.core.identity, a)
    }, cljs.core.atom.call(null, null))
  }, b = function(b) {
    var e = null;
    goog.isDef(b) && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return a.call(this, e)
  };
  b.cljs$lang$maxFixedArity = 0;
  b.cljs$lang$applyTo = function(b) {
    b = cljs.core.seq(b);
    return a.call(this, b)
  };
  return b
}();
cljs.core.delay_QMARK_ = function(a) {
  return cljs.core.instance_QMARK_.call(null, cljs.core.Delay, a)
};
cljs.core.force = function(a) {
  return cljs.core.truth_(cljs.core.delay_QMARK_.call(null, a)) ? cljs.core.deref.call(null, a) : a
};
cljs.core.realized_QMARK_ = function(a) {
  return cljs.core._realized_QMARK_.call(null, a)
};
cljs.core.js__GT_clj = function() {
  var a = function(a, b) {
    var f = cljs.core.truth_(cljs.core.seq_QMARK_.call(null, b)) ? cljs.core.apply.call(null, cljs.core.hash_map, b) : b, f = cljs.core.get.call(null, f, "\ufdd0'keywordize-keys"), g = cljs.core.truth_(f) ? cljs.core.keyword : cljs.core.str;
    return function i(a) {
      return cljs.core.truth_(cljs.core.seq_QMARK_.call(null, a)) ? cljs.core.doall.call(null, cljs.core.map.call(null, i, a)) : cljs.core.truth_(cljs.core.coll_QMARK_.call(null, a)) ? cljs.core.into.call(null, cljs.core.empty.call(null, a), cljs.core.map.call(null, i, a)) : cljs.core.truth_(goog.isArray.call(null, a)) ? cljs.core.vec.call(null, cljs.core.map.call(null, i, a)) : cljs.core.truth_(goog.isObject.call(null, a)) ? cljs.core.into.call(null, cljs.core.ObjMap.fromObject([], {}), function() {
        return function n(b) {
          return new cljs.core.LazySeq(null, !1, function() {
            for(;;) {
              if(cljs.core.truth_(cljs.core.seq.call(null, b))) {
                var d = cljs.core.first.call(null, b);
                return cljs.core.cons.call(null, cljs.core.Vector.fromArray([g.call(null, d), i.call(null, a[d])]), n.call(null, cljs.core.rest.call(null, b)))
              }
              return null
            }
          })
        }.call(null, cljs.core.js_keys.call(null, a))
      }()) : cljs.core.truth_("\ufdd0'else") ? a : null
    }.call(null, a)
  }, b = function(b, e) {
    var f = null;
    goog.isDef(e) && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
    return a.call(this, b, f)
  };
  b.cljs$lang$maxFixedArity = 1;
  b.cljs$lang$applyTo = function(b) {
    var e = cljs.core.first(b), b = cljs.core.rest(b);
    return a.call(this, e, b)
  };
  return b
}();
cljs.core.memoize = function(a) {
  var b = cljs.core.atom.call(null, cljs.core.ObjMap.fromObject([], {}));
  return function() {
    var d = function(d) {
      var e = cljs.core.get.call(null, cljs.core.deref.call(null, b), d);
      if(cljs.core.truth_(e)) {
        return e
      }
      e = cljs.core.apply.call(null, a, d);
      cljs.core.swap_BANG_.call(null, b, cljs.core.assoc, d, e);
      return e
    }, e = function(a) {
      var b = null;
      goog.isDef(a) && (b = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
      return d.call(this, b)
    };
    e.cljs$lang$maxFixedArity = 0;
    e.cljs$lang$applyTo = function(a) {
      a = cljs.core.seq(a);
      return d.call(this, a)
    };
    return e
  }()
};
cljs.core.trampoline = function() {
  var a = null, b = function() {
    var b = function(b, d) {
      return a.call(null, function() {
        return cljs.core.apply.call(null, b, d)
      })
    }, e = function(a, e) {
      var h = null;
      goog.isDef(e) && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
      return b.call(this, a, h)
    };
    e.cljs$lang$maxFixedArity = 1;
    e.cljs$lang$applyTo = function(a) {
      var e = cljs.core.first(a), a = cljs.core.rest(a);
      return b.call(this, e, a)
    };
    return e
  }(), a = function(a, e) {
    switch(arguments.length) {
      case 1:
        var f;
        a: {
          for(var g = a;;) {
            if(g = g.call(null), !cljs.core.truth_(cljs.core.fn_QMARK_.call(null, g))) {
              f = g;
              break a
            }
          }
        }
        return f;
      default:
        return b.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  a.cljs$lang$maxFixedArity = 1;
  a.cljs$lang$applyTo = b.cljs$lang$applyTo;
  return a
}();
cljs.core.rand = function() {
  var a = null;
  return a = function(b) {
    switch(arguments.length) {
      case 0:
        return a.call(null, 1);
      case 1:
        return Math.random() * b
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.rand_int = function(a) {
  return Math.floor(Math.random() * a)
};
cljs.core.rand_nth = function(a) {
  return cljs.core.nth.call(null, a, cljs.core.rand_int.call(null, cljs.core.count.call(null, a)))
};
cljs.core.group_by = function(a, b) {
  return cljs.core.reduce.call(null, function(b, e) {
    var f = a.call(null, e);
    return cljs.core.assoc.call(null, b, f, cljs.core.conj.call(null, cljs.core.get.call(null, b, f, cljs.core.Vector.fromArray([])), e))
  }, cljs.core.ObjMap.fromObject([], {}), b)
};
cljs.core.make_hierarchy = function() {
  return cljs.core.ObjMap.fromObject(["\ufdd0'parents", "\ufdd0'descendants", "\ufdd0'ancestors"], {"\ufdd0'parents":cljs.core.ObjMap.fromObject([], {}), "\ufdd0'descendants":cljs.core.ObjMap.fromObject([], {}), "\ufdd0'ancestors":cljs.core.ObjMap.fromObject([], {})})
};
cljs.core.global_hierarchy = cljs.core.atom.call(null, cljs.core.make_hierarchy.call(null));
cljs.core.isa_QMARK_ = function() {
  var a = null, b = function(b, e, f) {
    var g = cljs.core._EQ_.call(null, e, f);
    if(cljs.core.truth_(g)) {
      return g
    }
    g = cljs.core.contains_QMARK_.call(null, "\ufdd0'ancestors".call(null, b).call(null, e), f);
    if(cljs.core.truth_(g)) {
      return g
    }
    g = cljs.core.vector_QMARK_.call(null, f);
    if(cljs.core.truth_(g)) {
      if(g = cljs.core.vector_QMARK_.call(null, e), cljs.core.truth_(g)) {
        if(g = cljs.core._EQ_.call(null, cljs.core.count.call(null, f), cljs.core.count.call(null, e)), cljs.core.truth_(g)) {
          for(var h = !0, i = 0;;) {
            if(cljs.core.truth_(function() {
              var a = cljs.core.not.call(null, h);
              return cljs.core.truth_(a) ? a : cljs.core._EQ_.call(null, i, cljs.core.count.call(null, f))
            }())) {
              return h
            }
            var g = a.call(null, b, e.call(null, i), f.call(null, i)), j = i + 1, h = g, i = j
          }
        }else {
          return g
        }
      }else {
        return g
      }
    }else {
      return g
    }
  };
  return a = function(d, e, f) {
    switch(arguments.length) {
      case 2:
        return a.call(null, cljs.core.deref.call(null, cljs.core.global_hierarchy), d, e);
      case 3:
        return b.call(this, d, e, f)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.parents = function() {
  var a = null;
  return a = function(b, d) {
    switch(arguments.length) {
      case 1:
        return a.call(null, cljs.core.deref.call(null, cljs.core.global_hierarchy), b);
      case 2:
        return cljs.core.not_empty.call(null, cljs.core.get.call(null, "\ufdd0'parents".call(null, b), d))
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.ancestors = function() {
  var a = null;
  return a = function(b, d) {
    switch(arguments.length) {
      case 1:
        return a.call(null, cljs.core.deref.call(null, cljs.core.global_hierarchy), b);
      case 2:
        return cljs.core.not_empty.call(null, cljs.core.get.call(null, "\ufdd0'ancestors".call(null, b), d))
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.descendants = function() {
  var a = null;
  return a = function(b, d) {
    switch(arguments.length) {
      case 1:
        return a.call(null, cljs.core.deref.call(null, cljs.core.global_hierarchy), b);
      case 2:
        return cljs.core.not_empty.call(null, cljs.core.get.call(null, "\ufdd0'descendants".call(null, b), d))
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.derive = function() {
  var a = null, b = function(a, b, f) {
    if(!cljs.core.truth_(cljs.core.not_EQ_.call(null, b, f))) {
      throw Error(cljs.core.str.call(null, "Assert failed: ", cljs.core.pr_str.call(null, cljs.core.with_meta(cljs.core.list("\ufdd1'not=", "\ufdd1'tag", "\ufdd1'parent"), cljs.core.hash_map("\ufdd0'line", 3312)))));
    }
    var g = "\ufdd0'parents".call(null, a), h = "\ufdd0'descendants".call(null, a), i = "\ufdd0'ancestors".call(null, a), j = function(a, b, d, e, f) {
      return cljs.core.reduce.call(null, function(a, b) {
        return cljs.core.assoc.call(null, a, b, cljs.core.reduce.call(null, cljs.core.conj, cljs.core.get.call(null, f, b, cljs.core.set([])), cljs.core.cons.call(null, e, f.call(null, e))))
      }, a, cljs.core.cons.call(null, b, d.call(null, b)))
    };
    if(cljs.core.truth_(cljs.core.contains_QMARK_.call(null, g.call(null, b), f))) {
      b = null
    }else {
      if(cljs.core.truth_(cljs.core.contains_QMARK_.call(null, i.call(null, b), f))) {
        throw Error(cljs.core.str.call(null, b, "already has", f, "as ancestor"));
      }
      if(cljs.core.truth_(cljs.core.contains_QMARK_.call(null, i.call(null, f), b))) {
        throw Error(cljs.core.str.call(null, "Cyclic derivation:", f, "has", b, "as ancestor"));
      }
      b = cljs.core.ObjMap.fromObject(["\ufdd0'parents", "\ufdd0'ancestors", "\ufdd0'descendants"], {"\ufdd0'parents":cljs.core.assoc.call(null, "\ufdd0'parents".call(null, a), b, cljs.core.conj.call(null, cljs.core.get.call(null, g, b, cljs.core.set([])), f)), "\ufdd0'ancestors":j.call(null, "\ufdd0'ancestors".call(null, a), b, h, f, i), "\ufdd0'descendants":j.call(null, "\ufdd0'descendants".call(null, a), f, i, b, h)})
    }
    return cljs.core.truth_(b) ? b : a
  };
  return a = function(d, e, f) {
    switch(arguments.length) {
      case 2:
        if(!cljs.core.truth_(cljs.core.namespace.call(null, e))) {
          throw Error(cljs.core.str.call(null, "Assert failed: ", cljs.core.pr_str.call(null, cljs.core.with_meta(cljs.core.list("\ufdd1'namespace", "\ufdd1'parent"), cljs.core.hash_map("\ufdd0'line", 3308)))));
        }
        cljs.core.swap_BANG_.call(null, cljs.core.global_hierarchy, a, d, e);
        return null;
      case 3:
        return b.call(this, d, e, f)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.underive = function() {
  var a = null, b = function(a, b, f) {
    var g = "\ufdd0'parents".call(null, a), h = cljs.core.truth_(g.call(null, b)) ? cljs.core.disj.call(null, g.call(null, b), f) : cljs.core.set([]), h = cljs.core.truth_(cljs.core.not_empty.call(null, h)) ? cljs.core.assoc.call(null, g, b, h) : cljs.core.dissoc.call(null, g, b), h = cljs.core.flatten.call(null, cljs.core.map.call(null, function(a) {
      return cljs.core.cons.call(null, cljs.core.first.call(null, a), cljs.core.interpose.call(null, cljs.core.first.call(null, a), cljs.core.second.call(null, a)))
    }, cljs.core.seq.call(null, h)));
    return cljs.core.truth_(cljs.core.contains_QMARK_.call(null, g.call(null, b), f)) ? cljs.core.reduce.call(null, function(a, b) {
      return cljs.core.apply.call(null, cljs.core.derive, a, b)
    }, cljs.core.make_hierarchy.call(null), cljs.core.partition.call(null, 2, h)) : a
  };
  return a = function(d, e, f) {
    switch(arguments.length) {
      case 2:
        return cljs.core.swap_BANG_.call(null, cljs.core.global_hierarchy, a, d, e), null;
      case 3:
        return b.call(this, d, e, f)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
cljs.core.reset_cache = function(a, b, d, e) {
  cljs.core.swap_BANG_.call(null, a, function() {
    return cljs.core.deref.call(null, b)
  });
  return cljs.core.swap_BANG_.call(null, d, function() {
    return cljs.core.deref.call(null, e)
  })
};
cljs.core.prefers_STAR_ = function prefers_STAR_(b, d, e) {
  var f = cljs.core.deref.call(null, e).call(null, b), f = cljs.core.truth_(cljs.core.truth_(f) ? f.call(null, d) : f) ? !0 : null;
  if(cljs.core.truth_(f)) {
    return f
  }
  f = function() {
    for(var f = cljs.core.parents.call(null, d);;) {
      if(cljs.core.truth_(0 < cljs.core.count.call(null, f))) {
        cljs.core.truth_(prefers_STAR_.call(null, b, cljs.core.first.call(null, f), e)), f = cljs.core.rest.call(null, f)
      }else {
        return null
      }
    }
  }();
  if(cljs.core.truth_(f)) {
    return f
  }
  f = function() {
    for(var f = cljs.core.parents.call(null, b);;) {
      if(cljs.core.truth_(0 < cljs.core.count.call(null, f))) {
        cljs.core.truth_(prefers_STAR_.call(null, cljs.core.first.call(null, f), d, e)), f = cljs.core.rest.call(null, f)
      }else {
        return null
      }
    }
  }();
  return cljs.core.truth_(f) ? f : !1
};
cljs.core.dominates = function(a, b, d) {
  d = cljs.core.prefers_STAR_.call(null, a, b, d);
  return cljs.core.truth_(d) ? d : cljs.core.isa_QMARK_.call(null, a, b)
};
cljs.core.find_and_cache_best_method = function find_and_cache_best_method(b, d, e, f, g, h, i) {
  var j = cljs.core.reduce.call(null, function(e, f) {
    var h = cljs.core.nth.call(null, f, 0, null);
    cljs.core.nth.call(null, f, 1, null);
    if(cljs.core.truth_(cljs.core.isa_QMARK_.call(null, d, h))) {
      var i = cljs.core.truth_(function() {
        var b = cljs.core.nil_QMARK_.call(null, e);
        return cljs.core.truth_(b) ? b : cljs.core.dominates.call(null, h, cljs.core.first.call(null, e), g)
      }()) ? f : e;
      if(!cljs.core.truth_(cljs.core.dominates.call(null, cljs.core.first.call(null, i), h, g))) {
        throw Error(cljs.core.str.call(null, "Multiple methods in multimethod '", b, "' match dispatch value: ", d, " -> ", h, " and ", cljs.core.first.call(null, i), ", and neither is preferred"));
      }
      return i
    }
    return e
  }, null, cljs.core.deref.call(null, f));
  if(cljs.core.truth_(j)) {
    if(cljs.core.truth_(cljs.core._EQ_.call(null, cljs.core.deref.call(null, i), cljs.core.deref.call(null, e)))) {
      return cljs.core.swap_BANG_.call(null, h, cljs.core.assoc, d, cljs.core.second.call(null, j)), cljs.core.second.call(null, j)
    }
    cljs.core.reset_cache.call(null, h, f, i, e);
    return find_and_cache_best_method.call(null, b, d, e, f, g, h, i)
  }
  return null
};
cljs.core.IMultiFn = {};
cljs.core._reset = function(a) {
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IMultiFn$_reset : a)) {
    a = a.cljs$core$IMultiFn$_reset(a)
  }else {
    var b;
    b = cljs.core._reset[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(b) && (b = cljs.core._reset._, !cljs.core.truth_(b))) {
      throw cljs.core.missing_protocol.call(null, "IMultiFn.-reset", a);
    }
    a = b.call(null, a)
  }
  return a
};
cljs.core._add_method = function(a, b, d) {
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IMultiFn$_add_method : a)) {
    a = a.cljs$core$IMultiFn$_add_method(a, b, d)
  }else {
    var e;
    e = cljs.core._add_method[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(e) && (e = cljs.core._add_method._, !cljs.core.truth_(e))) {
      throw cljs.core.missing_protocol.call(null, "IMultiFn.-add-method", a);
    }
    a = e.call(null, a, b, d)
  }
  return a
};
cljs.core._remove_method = function(a, b) {
  var d;
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IMultiFn$_remove_method : a)) {
    d = a.cljs$core$IMultiFn$_remove_method(a, b)
  }else {
    d = cljs.core._remove_method[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(d) && (d = cljs.core._remove_method._, !cljs.core.truth_(d))) {
      throw cljs.core.missing_protocol.call(null, "IMultiFn.-remove-method", a);
    }
    d = d.call(null, a, b)
  }
  return d
};
cljs.core._prefer_method = function(a, b, d) {
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IMultiFn$_prefer_method : a)) {
    a = a.cljs$core$IMultiFn$_prefer_method(a, b, d)
  }else {
    var e;
    e = cljs.core._prefer_method[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(e) && (e = cljs.core._prefer_method._, !cljs.core.truth_(e))) {
      throw cljs.core.missing_protocol.call(null, "IMultiFn.-prefer-method", a);
    }
    a = e.call(null, a, b, d)
  }
  return a
};
cljs.core._get_method = function(a, b) {
  var d;
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IMultiFn$_get_method : a)) {
    d = a.cljs$core$IMultiFn$_get_method(a, b)
  }else {
    d = cljs.core._get_method[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(d) && (d = cljs.core._get_method._, !cljs.core.truth_(d))) {
      throw cljs.core.missing_protocol.call(null, "IMultiFn.-get-method", a);
    }
    d = d.call(null, a, b)
  }
  return d
};
cljs.core._methods = function(a) {
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IMultiFn$_methods : a)) {
    a = a.cljs$core$IMultiFn$_methods(a)
  }else {
    var b;
    b = cljs.core._methods[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(b) && (b = cljs.core._methods._, !cljs.core.truth_(b))) {
      throw cljs.core.missing_protocol.call(null, "IMultiFn.-methods", a);
    }
    a = b.call(null, a)
  }
  return a
};
cljs.core._prefers = function(a) {
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IMultiFn$_prefers : a)) {
    a = a.cljs$core$IMultiFn$_prefers(a)
  }else {
    var b;
    b = cljs.core._prefers[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(b) && (b = cljs.core._prefers._, !cljs.core.truth_(b))) {
      throw cljs.core.missing_protocol.call(null, "IMultiFn.-prefers", a);
    }
    a = b.call(null, a)
  }
  return a
};
cljs.core._invoke = function(a, b) {
  var d;
  if(cljs.core.truth_(cljs.core.truth_(a) ? a.cljs$core$IMultiFn$_invoke : a)) {
    d = a.cljs$core$IMultiFn$_invoke(a, b)
  }else {
    d = cljs.core._invoke[goog.typeOf.call(null, a)];
    if(!cljs.core.truth_(d) && (d = cljs.core._invoke._, !cljs.core.truth_(d))) {
      throw cljs.core.missing_protocol.call(null, "IMultiFn.-invoke", a);
    }
    d = d.call(null, a, b)
  }
  return d
};
cljs.core.do_invoke = function(a, b, d) {
  b = cljs.core.apply.call(null, b, d);
  a = cljs.core._get_method.call(null, a, b);
  if(!cljs.core.truth_(a)) {
    throw Error(cljs.core.str.call(null, "No method in multimethod '", cljs.core.name, "' for dispatch value: ", b));
  }
  return cljs.core.apply.call(null, a, d)
};
cljs.core.MultiFn = function(a, b, d, e, f, g, h, i) {
  this.name = a;
  this.dispatch_fn = b;
  this.default_dispatch_val = d;
  this.hierarchy = e;
  this.method_table = f;
  this.prefer_table = g;
  this.method_cache = h;
  this.cached_hierarchy = i
};
cljs.core.MultiFn.prototype.cljs$core$IHash$ = !0;
cljs.core.MultiFn.prototype.cljs$core$IHash$_hash = function(a) {
  return goog.getUid.call(null, a)
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$ = !0;
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_reset = function(a) {
  cljs.core.swap_BANG_.call(null, this.method_table, function() {
    return cljs.core.ObjMap.fromObject([], {})
  });
  cljs.core.swap_BANG_.call(null, this.method_cache, function() {
    return cljs.core.ObjMap.fromObject([], {})
  });
  cljs.core.swap_BANG_.call(null, this.prefer_table, function() {
    return cljs.core.ObjMap.fromObject([], {})
  });
  cljs.core.swap_BANG_.call(null, this.cached_hierarchy, function() {
    return null
  });
  return a
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_add_method = function(a, b, d) {
  cljs.core.swap_BANG_.call(null, this.method_table, cljs.core.assoc, b, d);
  cljs.core.reset_cache.call(null, this.method_cache, this.method_table, this.cached_hierarchy, this.hierarchy);
  return a
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_remove_method = function(a, b) {
  cljs.core.swap_BANG_.call(null, this.method_table, cljs.core.dissoc, b);
  cljs.core.reset_cache.call(null, this.method_cache, this.method_table, this.cached_hierarchy, this.hierarchy);
  return a
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_get_method = function(a, b) {
  cljs.core.truth_(cljs.core._EQ_.call(null, cljs.core.deref.call(null, this.cached_hierarchy), cljs.core.deref.call(null, this.hierarchy))) || cljs.core.reset_cache.call(null, this.method_cache, this.method_table, this.cached_hierarchy, this.hierarchy);
  var d = cljs.core.deref.call(null, this.method_cache).call(null, b);
  if(cljs.core.truth_(d)) {
    return d
  }
  d = cljs.core.find_and_cache_best_method.call(null, this.name, b, this.hierarchy, this.method_table, this.prefer_table, this.method_cache, this.cached_hierarchy);
  return cljs.core.truth_(d) ? d : cljs.core.deref.call(null, this.method_table).call(null, this.default_dispatch_val)
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_prefer_method = function(a, b, d) {
  if(cljs.core.truth_(cljs.core.prefers_STAR_.call(null, b, d, this.prefer_table))) {
    throw Error(cljs.core.str.call(null, "Preference conflict in multimethod '", this.name, "': ", d, " is already preferred to ", b));
  }
  cljs.core.swap_BANG_.call(null, this.prefer_table, function(a) {
    return cljs.core.assoc.call(null, a, b, cljs.core.conj.call(null, cljs.core.get.call(null, a, b, cljs.core.set([])), d))
  });
  return cljs.core.reset_cache.call(null, this.method_cache, this.method_table, this.cached_hierarchy, this.hierarchy)
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_methods = function() {
  return cljs.core.deref.call(null, this.method_table)
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_prefers = function() {
  return cljs.core.deref.call(null, this.prefer_table)
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_invoke = function(a, b) {
  return cljs.core.do_invoke.call(null, a, this.dispatch_fn, b)
};
cljs.core.MultiFn.prototype.call = function() {
  var a = function(a, d) {
    var e = null;
    goog.isDef(d) && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
    return cljs.core._invoke.call(null, this, e)
  };
  a.cljs$lang$maxFixedArity = 1;
  a.cljs$lang$applyTo = function(a) {
    cljs.core.first(a);
    a = cljs.core.rest(a);
    return cljs.core._invoke.call(null, this, a)
  };
  return a
}();
cljs.core.remove_all_methods = function(a) {
  return cljs.core._reset.call(null, a)
};
cljs.core.remove_method = function(a, b) {
  return cljs.core._remove_method.call(null, a, b)
};
cljs.core.prefer_method = function(a, b, d) {
  return cljs.core._prefer_method.call(null, a, b, d)
};
cljs.core.methods$ = function(a) {
  return cljs.core._methods.call(null, a)
};
cljs.core.get_method = function(a, b) {
  return cljs.core._get_method.call(null, a, b)
};
cljs.core.prefers = function(a) {
  return cljs.core._prefers.call(null, a)
};
var evil = {ajaj:{}};
evil.ajaj.$ = $;
evil.ajaj.uid = uid;
evil.ajaj.stringify = JSON.stringify;
evil.ajaj.clj__GT_js = function clj__GT_js(b) {
  return cljs.core.truth_(cljs.core.string_QMARK_.call(null, b)) ? b : cljs.core.truth_(cljs.core.keyword_QMARK_.call(null, b)) ? cljs.core.name.call(null, b) : cljs.core.truth_(cljs.core.map_QMARK_.call(null, b)) ? cljs.core.reduce.call(null, function(b, e) {
    var f = cljs.core.nth.call(null, e, 0, null), g = cljs.core.nth.call(null, e, 1, null);
    return cljs.core.assoc.call(null, b, clj__GT_js.call(null, f), clj__GT_js.call(null, g))
  }, cljs.core.ObjMap.fromObject([], {}), b).strobj : cljs.core.truth_(cljs.core.coll_QMARK_.call(null, b)) ? cljs.core.apply.call(null, cljs.core.array, cljs.core.map.call(null, clj__GT_js, b)) : cljs.core.truth_("\ufdd0'else") ? b : null
};
evil.ajaj.ajaj_put = function(a, b, d) {
  return evil.ajaj.$.ajax(cljs.core.str.call(null, "/api/v1/user/", evil.ajaj.uid, a), evil.ajaj.clj__GT_js.call(null, cljs.core.ObjMap.fromObject("\ufdd0'success,\ufdd0'dataType,\ufdd0'cache,\ufdd0'data,\ufdd0'type,\ufdd0'processData,\ufdd0'contentType,\ufdd0'jsonp".split(","), {"\ufdd0'success":function(a) {
    return d.call(null, cljs.core.js__GT_clj.call(null, a))
  }, "\ufdd0'dataType":"json", "\ufdd0'cache":!1, "\ufdd0'data":evil.ajaj.stringify.call(null, evil.ajaj.clj__GT_js.call(null, b)), "\ufdd0'type":"PUT", "\ufdd0'processData":!1, "\ufdd0'contentType":"application/json", "\ufdd0'jsonp":"json"})))
};
evil.ajaj.do_ajaj = function(a, b) {
  return evil.ajaj.$.ajax(cljs.core.str.call(null, "/api/v1/user/", evil.ajaj.uid, a), evil.ajaj.clj__GT_js.call(null, cljs.core.ObjMap.fromObject(["\ufdd0'success", "\ufdd0'dataType", "\ufdd0'cache", "\ufdd0'contentType", "\ufdd0'jsonp"], {"\ufdd0'success":function(a) {
    return b.call(null, cljs.core.js__GT_clj.call(null, a))
  }, "\ufdd0'dataType":"json", "\ufdd0'cache":!1, "\ufdd0'contentType":"application/json", "\ufdd0'jsonp":"json"})))
};
evil.ajaj.post_clj = function(a, b, d) {
  return evil.ajaj.$.ajax(a, evil.ajaj.clj__GT_js.call(null, cljs.core.ObjMap.fromObject("\ufdd0'success,\ufdd0'dataType,\ufdd0'cache,\ufdd0'type,\ufdd0'data,\ufdd0'processData,\ufdd0'contentType,\ufdd0'jsonp".split(","), {"\ufdd0'success":function(a) {
    return d.call(null, cljs.core.js__GT_clj.call(null, a))
  }, "\ufdd0'dataType":"json", "\ufdd0'cache":!1, "\ufdd0'type":"POST", "\ufdd0'data":evil.ajaj.stringify.call(null, evil.ajaj.clj__GT_js.call(null, b)), "\ufdd0'processData":!1, "\ufdd0'contentType":"application/json", "\ufdd0'jsonp":"json"})))
};
evil.ajaj.put_clj = function(a, b, d) {
  return evil.ajaj.$.ajax(a, evil.ajaj.clj__GT_js.call(null, cljs.core.ObjMap.fromObject("\ufdd0'success,\ufdd0'dataType,\ufdd0'cache,\ufdd0'type,\ufdd0'data,\ufdd0'processData,\ufdd0'contentType,\ufdd0'jsonp".split(","), {"\ufdd0'success":function(a) {
    return d.call(null, cljs.core.js__GT_clj.call(null, a))
  }, "\ufdd0'dataType":"json", "\ufdd0'cache":!1, "\ufdd0'type":"PUT", "\ufdd0'data":evil.ajaj.stringify.call(null, evil.ajaj.clj__GT_js.call(null, b)), "\ufdd0'processData":!1, "\ufdd0'contentType":"application/json", "\ufdd0'jsonp":"json"})))
};
evil.ajaj.del_clj = function(a, b) {
  return evil.ajaj.$.ajax(a, evil.ajaj.clj__GT_js.call(null, cljs.core.ObjMap.fromObject("\ufdd0'success,\ufdd0'dataType,\ufdd0'cache,\ufdd0'type,\ufdd0'contentType,\ufdd0'jsonp".split(","), {"\ufdd0'success":function(a) {
    return b.call(null, cljs.core.js__GT_clj.call(null, a))
  }, "\ufdd0'dataType":"json", "\ufdd0'cache":!1, "\ufdd0'type":"DELETE", "\ufdd0'contentType":"application/json", "\ufdd0'jsonp":"json"})))
};
evil.ajaj.get_clj = function(a, b) {
  return evil.ajaj.$.ajax(a, evil.ajaj.clj__GT_js.call(null, cljs.core.ObjMap.fromObject(["\ufdd0'success", "\ufdd0'dataType", "\ufdd0'cache", "\ufdd0'contentType", "\ufdd0'jsonp"], {"\ufdd0'success":function(a) {
    return b.call(null, cljs.core.js__GT_clj.call(null, a))
  }, "\ufdd0'dataType":"json", "\ufdd0'cache":!1, "\ufdd0'contentType":"application/json", "\ufdd0'jsonp":"json"})))
};
evil.dom = {};
evil.dom.$ = $;
evil.dom.select = function(a) {
  return evil.dom.$.call(null, a)
};
evil.dom.ensure = function(a) {
  return cljs.core.truth_(cljs.core.string_QMARK_.call(null, a)) ? evil.dom.select.call(null, a) : a
};
evil.dom.append = function(a, b) {
  return evil.dom.ensure.call(null, a).append(b)
};
evil.dom.text = function(a, b) {
  return evil.dom.ensure.call(null, a).text(b)
};
evil.dom.click = function(a, b) {
  return evil.dom.ensure.call(null, a).click(b)
};
evil.dom.blur = function(a, b) {
  return evil.dom.ensure.call(null, a).blur(b)
};
evil.dom.change = function(a, b) {
  return evil.dom.ensure.call(null, a).change(b)
};
evil.dom.keypress = function(a, b) {
  return evil.dom.ensure.call(null, a).keypress(b)
};
evil.dom.clear = function(a) {
  return evil.dom.text.call(null, a, "")
};
evil.dom.val = function(a) {
  return evil.dom.ensure.call(null, a).val()
};
evil.dom.ival = function(a) {
  return parseInt.call(null, evil.dom.val.call(null, a))
};
evil.dom.del = function(a) {
  return evil.dom.ensure.call(null, a).remove()
};
evil.dom.attr = function(a, b, d) {
  return a.attr(b, d)
};
evil.dom.s = function(a, b, d) {
  return cljs.core.vec.call(null, cljs.core.concat.call(null, cljs.core.Vector.fromArray(["\ufdd0'select"]), a, cljs.core.map.call(null, b, d)))
};
evil.dom.c = function c(b) {
  if(cljs.core.truth_(cljs.core.vector_QMARK_.call(null, b))) {
    var d = cljs.core.nth.call(null, b, 0, null), e = cljs.core.nthnext.call(null, b, 1), b = cljs.core.nth.call(null, e, 0, null), e = cljs.core.nthnext.call(null, e, 1), d = evil.dom.$.call(null, cljs.core.str.call(null, "<", cljs.core.name.call(null, d), "/>"));
    return cljs.core.truth_(cljs.core.map_QMARK_.call(null, b)) ? (d = cljs.core.reduce.call(null, function(b, d) {
      var e = cljs.core.nth.call(null, d, 0, null), i = cljs.core.nth.call(null, d, 1, null), j = cljs.core._EQ_;
      return cljs.core.truth_(j.call(null, "\ufdd0'click", e)) ? evil.dom.click.call(null, b, i) : cljs.core.truth_(j.call(null, "\ufdd0'blur", e)) ? evil.dom.blur.call(null, b, i) : cljs.core.truth_(j.call(null, "\ufdd0'change", e)) ? evil.dom.change.call(null, b, i) : cljs.core.truth_(j.call(null, "\ufdd0'keypress", e)) ? evil.dom.keypress.call(null, b, i) : evil.dom.attr.call(null, b, cljs.core.name.call(null, e), i)
    }, d, b), cljs.core.reduce.call(null, function(b, d) {
      return evil.dom.append.call(null, b, c.call(null, d))
    }, d, e)) : cljs.core.reduce.call(null, function(b, d) {
      return evil.dom.append.call(null, b, c.call(null, d))
    }, d, cljs.core.cons.call(null, b, e))
  }
  return cljs.core.str.call(null, b)
};
evil.script = {};
evil.script.do_list = function(a) {
  return evil.ajaj.do_ajaj.call(null, "/script", function(b) {
    return a.call(null, b)
  })
};
evil.script.do_get = function(a, b) {
  return evil.ajaj.do_ajaj.call(null, cljs.core.str.call(null, "/script/", a), function(a) {
    return b.call(null, a)
  })
};
evil.script.save_fn = function(a) {
  return function() {
    return evil.ajaj.put_clj.call(null, cljs.core.str.call(null, "/api/v1/user/", evil.ajaj.uid, "/script/", a.call(null, "id")), cljs.core.ObjMap.fromObject(["id", "name", "code", "user_id"], {id:a.call(null, "id"), name:evil.dom.val.call(null, cljs.core.str.call(null, "#script-", a.call(null, "id"), "-name")), code:evil.dom.val.call(null, cljs.core.str.call(null, "#script-", a.call(null, "id"), "-code")), user_id:evil.ajaj.uid}), function(a) {
      evil.dom.text.call(null, "#script-save-state", "OK");
      return evil.dom.text.call(null, cljs.core.str.call(null, "span[name=script-", a.call(null, "id"), "-name]"), a.call(null, "name"))
    })
  }
};
evil.script.show_script_fn = function(a) {
  return function() {
    return evil.script.do_get.call(null, a.call(null, "id"), function(b) {
      var d = evil.dom.select.call(null, "#center");
      evil.dom.clear.call(null, d);
      return evil.dom.append.call(null, d, evil.dom.c.call(null, cljs.core.Vector.fromArray(["\ufdd0'div", cljs.core.Vector.fromArray(["\ufdd0'span", "Name:"]), cljs.core.Vector.fromArray(["\ufdd0'input", cljs.core.ObjMap.fromObject(["\ufdd0'type", "\ufdd0'id", "\ufdd0'value"], {"\ufdd0'type":"text", "\ufdd0'id":cljs.core.str.call(null, "script-", b.call(null, "id"), "-name"), "\ufdd0'value":b.call(null, "name")})]), cljs.core.Vector.fromArray(["\ufdd0'br"]), cljs.core.Vector.fromArray(["\ufdd0'span", 
      "Code: "]), cljs.core.Vector.fromArray(["\ufdd0'br"]), cljs.core.Vector.fromArray(["\ufdd0'textarea", cljs.core.ObjMap.fromObject(["\ufdd0'class", "\ufdd0'keypress", "\ufdd0'id"], {"\ufdd0'class":"code", "\ufdd0'keypress":function() {
        return evil.dom.text.call(null, "#script-save-state", "!!!")
      }, "\ufdd0'id":cljs.core.str.call(null, "script-", b.call(null, "id"), "-code")}), b.call(null, "code")]), cljs.core.Vector.fromArray(["\ufdd0'br"]), cljs.core.Vector.fromArray(["\ufdd0'input", cljs.core.ObjMap.fromObject(["\ufdd0'type", "\ufdd0'value", "\ufdd0'click"], {"\ufdd0'type":"submit", "\ufdd0'value":"Save", "\ufdd0'click":evil.script.save_fn.call(null, a)})]), " - ", cljs.core.Vector.fromArray(["\ufdd0'span", cljs.core.ObjMap.fromObject(["\ufdd0'id"], {"\ufdd0'id":"script-save-state"}), 
      "OK"]), cljs.core.Vector.fromArray(["\ufdd0'br"]), cljs.core.Vector.fromArray(["\ufdd0'a", cljs.core.ObjMap.fromObject(["\ufdd0'class", "\ufdd0'target", "\ufdd0'href"], {"\ufdd0'class":"help", "\ufdd0'target":"_blank", "\ufdd0'href":"https://github.com/Licenser/dividedspace/wiki/Scripting"}), "Scripting Help"])])))
    })
  }
};
evil.script.del_script_fn = function(a) {
  return function() {
    return evil.ajaj.del_clj.call(null, cljs.core.str.call(null, "/api/v1/user/", evil.ajaj.uid, "/script/", a.call(null, "id")), function() {
      return evil.dom.del.call(null, cljs.core.str.call(null, "#script-", a.call(null, "id")))
    })
  }
};
evil.script.add_script = function() {
  var a = null, b = function(a, b) {
    return evil.dom.append.call(null, a, evil.dom.c.call(null, cljs.core.Vector.fromArray(["\ufdd0'div", cljs.core.ObjMap.fromObject(["\ufdd0'id"], {"\ufdd0'id":cljs.core.str.call(null, "script-", b.call(null, "id"))}), cljs.core.Vector.fromArray(["\ufdd0'span", cljs.core.ObjMap.fromObject(["\ufdd0'click", "\ufdd0'name"], {"\ufdd0'click":evil.script.show_script_fn.call(null, b), "\ufdd0'name":cljs.core.str.call(null, "script-", b.call(null, "id"), "-name")}), function() {
      var a = b.call(null, "name");
      return cljs.core.truth_(a) ? a : "-"
    }()]), cljs.core.Vector.fromArray(["\ufdd0'span", cljs.core.ObjMap.fromObject(["\ufdd0'class", "\ufdd0'click"], {"\ufdd0'class":"del", "\ufdd0'click":evil.script.del_script_fn.call(null, b)}), "del"])])))
  };
  return a = function(d, e) {
    switch(arguments.length) {
      case 1:
        return a.call(null, evil.dom.select.call(null, "div#script"), d);
      case 2:
        return b.call(this, d, e)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
evil.script.update_scripts = function() {
  var a = evil.dom.select.call(null, "div#script");
  evil.dom.clear.call(null, a);
  evil.dom.append.call(null, a, evil.dom.c.call(null, cljs.core.Vector.fromArray(["\ufdd0'span", cljs.core.Vector.fromArray(["\ufdd0'input", cljs.core.ObjMap.fromObject(["\ufdd0'id"], {"\ufdd0'id":"script-new-input"})]), cljs.core.Vector.fromArray(["\ufdd0'span", cljs.core.ObjMap.fromObject(["\ufdd0'class", "\ufdd0'click"], {"\ufdd0'class":"add", "\ufdd0'click":function() {
    return evil.ajaj.post_clj.call(null, cljs.core.str.call(null, "/api/v1/user/", evil.ajaj.uid, "/script"), cljs.core.ObjMap.fromObject(["user_id", "name", "code"], {user_id:evil.ajaj.uid, name:evil.dom.val.call(null, evil.dom.select.call(null, "#script-new-input")), code:""}), evil.script.add_script)
  }}), "add"]), cljs.core.Vector.fromArray(["\ufdd0'br"])])));
  return evil.script.do_list.call(null, function(b) {
    return cljs.core.dorun.call(null, cljs.core.map.call(null, cljs.core.partial.call(null, evil.script.add_script, a), b))
  })
};
evil.shiptype = {};
evil.shiptype.modules = cljs.core.atom.call(null, cljs.core.ObjMap.fromObject([], {}));
evil.shiptype.shiptype = cljs.core.atom.call(null, cljs.core.ObjMap.fromObject([], {}));
evil.shiptype.do_list = function(a) {
  return evil.ajaj.do_ajaj.call(null, "/shiptype", function(b) {
    return a.call(null, b)
  })
};
evil.shiptype.do_get = function(a, b) {
  return evil.ajaj.do_ajaj.call(null, cljs.core.str.call(null, "/shiptype/", a), function(a) {
    return b.call(null, a)
  })
};
evil.shiptype.modules_of_type = function(a, b) {
  return cljs.core.filter.call(null, function(a) {
    return cljs.core._EQ_.call(null, b, a.call(null, "type"))
  }, a)
};
evil.shiptype.test_hull = function(a) {
  return cljs.core.truth_(cljs.core.empty_QMARK_.call(null, evil.shiptype.modules_of_type.call(null, a, "hull"))) ? cljs.core.Vector.fromArray(["No hull defined"]) : null
};
evil.shiptype.test_weapon = function(a) {
  return cljs.core.truth_(cljs.core.empty_QMARK_.call(null, evil.shiptype.modules_of_type.call(null, a, "weapon"))) ? cljs.core.Vector.fromArray(["No weapon defined"]) : null
};
evil.shiptype.test_generator = function(a) {
  return cljs.core.truth_(cljs.core.empty_QMARK_.call(null, evil.shiptype.modules_of_type.call(null, a, "generator"))) ? cljs.core.Vector.fromArray(["No generator defined"]) : null
};
evil.shiptype.test_engine = function(a) {
  return cljs.core.truth_(cljs.core.empty_QMARK_.call(null, evil.shiptype.modules_of_type.call(null, a, "engine"))) ? cljs.core.Vector.fromArray(["No engine defined"]) : null
};
evil.shiptype.test_script = function(a) {
  return cljs.core.truth_(cljs.core.empty_QMARK_.call(null, evil.dom.val.call(null, cljs.core.str.call(null, "#shiptype-", a.call(null, "id"), "-script-select")))) ? cljs.core.Vector.fromArray(["No script defined."]) : null
};
evil.shiptype.module_warnings = function(a) {
  return cljs.core.concat.call(null, cljs.core.Vector.fromArray([]), evil.shiptype.test_hull.call(null, a), evil.shiptype.test_weapon.call(null, a), evil.shiptype.test_generator.call(null, a), evil.shiptype.test_engine.call(null, a))
};
evil.shiptype.warnings = function(a) {
  a = cljs.core.concat.call(null, evil.shiptype.module_warnings.call(null, a.call(null, "modules")), evil.shiptype.test_script.call(null, a));
  evil.dom.clear.call(null, "#shiptype-warnings");
  return evil.dom.append.call(null, "#shiptype-warnings", evil.dom.c.call(null, cljs.core.vec.call(null, cljs.core.concat.call(null, cljs.core.Vector.fromArray(["\ufdd0'ul", cljs.core.ObjMap.fromObject(["\ufdd0'class"], {"\ufdd0'class":"warnings"})]), cljs.core.map.call(null, function(a) {
    return cljs.core.Vector.fromArray(["\ufdd0'li", a])
  }, a)))))
};
evil.shiptype.expand_module = function(a) {
  var a = cljs.core.truth_(cljs.core.seq_QMARK_.call(null, a)) ? cljs.core.apply.call(null, cljs.core.hash_map, a) : a, b = cljs.core.get.call(null, a, "name");
  return cljs.core.assoc.call(null, cljs.core.get.call(null, cljs.core.deref.call(null, evil.shiptype.modules), b), "id", a.call(null, "id"))
};
evil.shiptype.set_shiptype_BANG_ = function(a) {
  return cljs.core.reset_BANG_.call(null, evil.shiptype.shiptype, cljs.core.update_in.call(null, a, cljs.core.Vector.fromArray(["modules"]), function(a) {
    return cljs.core.map.call(null, evil.shiptype.expand_module, a)
  }))
};
evil.shiptype.shiptype_hull = function(a) {
  return cljs.core.first.call(null, cljs.core.filter.call(null, function(a) {
    return cljs.core._EQ_.call(null, "hull", a.call(null, "type"))
  }, a.call(null, "modules")))
};
evil.shiptype.shiptype_size = function(a) {
  return cljs.core.Vector.fromArray([cljs.core.reduce.call(null, cljs.core._PLUS_, cljs.core.map.call(null, function(a) {
    return cljs.core.get.call(null, a, "size")
  }, cljs.core.filter.call(null, function(a) {
    return cljs.core.not_EQ_.call(null, "hull", a.call(null, "type"))
  }, a.call(null, "modules")))), function() {
    var b = evil.shiptype.shiptype_hull.call(null, a);
    return cljs.core.truth_(b) ? b.call(null, "size") : 0
  }()])
};
evil.shiptype.shiptype_update_size_BANG_ = function(a) {
  var b = evil.shiptype.shiptype_size.call(null, a), d = cljs.core.nth.call(null, b, 0, null), b = cljs.core.nth.call(null, b, 1, null);
  return evil.dom.text.call(null, cljs.core.str.call(null, "#shiptype-", a.call(null, "id"), "-size"), cljs.core.str.call(null, d, "/", b))
};
evil.shiptype.module_line = function(a, b) {
  var d = cljs.core.str.call(null, "shiptype-", a, "-module-", b.call(null, "id"));
  return cljs.core.Vector.fromArray(["\ufdd0'tr", cljs.core.ObjMap.fromObject(["\ufdd0'id"], {"\ufdd0'id":d}), cljs.core.Vector.fromArray(["\ufdd0'td", b.call(null, "name")]), cljs.core.Vector.fromArray(["\ufdd0'td", cljs.core.get_in.call(null, cljs.core.deref.call(null, evil.shiptype.modules), cljs.core.Vector.fromArray([b.call(null, "name"), "size"]))]), cljs.core.Vector.fromArray(["\ufdd0'td", cljs.core.ObjMap.fromObject(["\ufdd0'click"], {"\ufdd0'click":function() {
    return evil.ajaj.del_clj.call(null, cljs.core.str.call(null, "/api/v1/user/", evil.ajaj.uid, "/shiptype/", a, "/module/", b.call(null, "id")), function() {
      cljs.core.swap_BANG_.call(null, evil.shiptype.shiptype, cljs.core.update_in, cljs.core.Vector.fromArray(["modules"]), function(a) {
        return cljs.core.filter.call(null, function(a) {
          return cljs.core.not_EQ_.call(null, b.call(null, "id"), a.call(null, "id"))
        }, a)
      });
      evil.shiptype.shiptype_update_size_BANG_.call(null, cljs.core.deref.call(null, evil.shiptype.shiptype));
      evil.shiptype.warnings.call(null, cljs.core.deref.call(null, evil.shiptype.shiptype));
      return evil.dom.del.call(null, cljs.core.str.call(null, "#", d))
    })
  }}), cljs.core.Vector.fromArray(["\ufdd0'span", cljs.core.ObjMap.fromObject(["\ufdd0'class"], {"\ufdd0'class":"del"}), "del"])])])
};
evil.shiptype.add_module_fn = function(a) {
  return function() {
    var b = evil.dom.val.call(null, cljs.core.str.call(null, "#shiptype-", a.call(null, "id"), "-module-select")), d = cljs.core.get.call(null, cljs.core.deref.call(null, evil.shiptype.modules), b), e = evil.shiptype.shiptype_size.call(null, cljs.core.deref.call(null, evil.shiptype.shiptype)), f = cljs.core.nth.call(null, e, 0, null), g = cljs.core.nth.call(null, e, 1, null);
    return cljs.core.truth_(function() {
      var a = cljs.core._EQ_.call(null, "hull", d.call(null, "type"));
      return cljs.core.truth_(a) ? cljs.core.not.call(null, cljs.core.nil_QMARK_.call(null, evil.shiptype.shiptype_hull.call(null, cljs.core.deref.call(null, evil.shiptype.shiptype)))) : a
    }()) ? alert.call(null, "A ship can only have one Hull.") : cljs.core.truth_(function() {
      var a = cljs.core.not_EQ_.call(null, "hull", d.call(null, "type"));
      return cljs.core.truth_(a) ? f + d.call(null, "size") > g : a
    }()) ? alert.call(null, "Not enough space left in the Ship.") : cljs.core.truth_("\ufdd0'else") ? evil.ajaj.post_clj.call(null, cljs.core.str.call(null, "/api/v1/user/", evil.ajaj.uid, "/shiptype/", a.call(null, "id"), "/module"), cljs.core.ObjMap.fromObject(["ship_id", "name", "user_id"], {ship_id:a.call(null, "id"), name:b, user_id:evil.ajaj.uid}), function(b) {
      b = evil.shiptype.expand_module.call(null, b);
      cljs.core.swap_BANG_.call(null, evil.shiptype.shiptype, cljs.core.update_in, cljs.core.Vector.fromArray(["modules"]), cljs.core.conj, b);
      evil.shiptype.shiptype_update_size_BANG_.call(null, cljs.core.deref.call(null, evil.shiptype.shiptype));
      evil.shiptype.warnings.call(null, cljs.core.deref.call(null, evil.shiptype.shiptype));
      return evil.dom.append.call(null, cljs.core.str.call(null, "#shiptype-", a.call(null, "id"), "-module"), evil.dom.c.call(null, evil.shiptype.module_line.call(null, a.call(null, "id"), b)))
    }) : null
  }
};
evil.shiptype.module_section = function(a) {
  return cljs.core.vec.call(null, cljs.core.concat.call(null, cljs.core.Vector.fromArray(["\ufdd0'table", cljs.core.ObjMap.fromObject(["\ufdd0'id"], {"\ufdd0'id":cljs.core.str.call(null, "shiptype-", a.call(null, "id"), "-module")}), cljs.core.Vector.fromArray(["\ufdd0'tr", cljs.core.Vector.fromArray(["\ufdd0'td", cljs.core.vec.call(null, cljs.core.concat.call(null, cljs.core.Vector.fromArray(["\ufdd0'select", cljs.core.ObjMap.fromObject(["\ufdd0'id"], {"\ufdd0'id":cljs.core.str.call(null, "shiptype-", 
  a.call(null, "id"), "-module-select")}), cljs.core.Vector.fromArray(["\ufdd0'option"])]), cljs.core.map.call(null, function(a) {
    var d = cljs.core.nth.call(null, a, 0, null), a = cljs.core.nth.call(null, a, 1, null);
    return cljs.core.Vector.fromArray(["\ufdd0'option", cljs.core.ObjMap.fromObject(["\ufdd0'value"], {"\ufdd0'value":d}), cljs.core.str.call(null, a.call(null, "type"), " - ", d, " (", a.call(null, "size"), ")")])
  }, cljs.core.deref.call(null, evil.shiptype.modules))))]), cljs.core.Vector.fromArray(["\ufdd0'td", cljs.core.ObjMap.fromObject(["\ufdd0'click"], {"\ufdd0'click":evil.shiptype.add_module_fn.call(null, a)}), "add"])])]), cljs.core.vec.call(null, cljs.core.map.call(null, function(b) {
    return evil.shiptype.module_line.call(null, a.call(null, "id"), b)
  }, a.call(null, "modules")))))
};
evil.shiptype.save_fn = function(a) {
  return function() {
    var b = evil.dom.val.call(null, cljs.core.str.call(null, "#shiptype-", a.call(null, "id"), "-script-select")), b = cljs.core.truth_(cljs.core.empty_QMARK_.call(null, b)) ? null : parseInt.call(null, b);
    return evil.ajaj.put_clj.call(null, cljs.core.str.call(null, "/api/v1/user/", evil.ajaj.uid, "/shiptype/", a.call(null, "id")), cljs.core.ObjMap.fromObject(["id", "name", "script_id", "user_id"], {id:a.call(null, "id"), name:evil.dom.val.call(null, cljs.core.str.call(null, "#shiptype-", a.call(null, "id"), "-name")), script_id:b, user_id:evil.ajaj.uid}), function(a) {
      evil.shiptype.warnings.call(null, cljs.core.deref.call(null, evil.shiptype.shiptype));
      return evil.dom.text.call(null, cljs.core.str.call(null, "span[name=shiptype-", a.call(null, "id"), "-name]"), a.call(null, "name"))
    })
  }
};
evil.shiptype.show_shiptype_fn = function(a) {
  return function() {
    return evil.shiptype.do_get.call(null, a.call(null, "id"), function(b) {
      var d = evil.shiptype.set_shiptype_BANG_.call(null, b), b = evil.dom.select.call(null, "#center"), e = evil.shiptype.shiptype_size.call(null, d), f = cljs.core.nth.call(null, e, 0, null), e = cljs.core.nth.call(null, e, 1, null);
      evil.dom.clear.call(null, b);
      evil.dom.append.call(null, b, evil.dom.c.call(null, cljs.core.Vector.fromArray(["\ufdd0'div", cljs.core.Vector.fromArray(["\ufdd0'span", cljs.core.ObjMap.fromObject(["\ufdd0'class"], {"\ufdd0'class":"label"}), "Name:"]), cljs.core.Vector.fromArray(["\ufdd0'input", cljs.core.ObjMap.fromObject(["\ufdd0'type", "\ufdd0'id", "\ufdd0'value"], {"\ufdd0'type":"text", "\ufdd0'id":cljs.core.str.call(null, "shiptype-", d.call(null, "id"), "-name"), "\ufdd0'value":d.call(null, "name")})]), cljs.core.Vector.fromArray(["\ufdd0'br"]), 
      cljs.core.Vector.fromArray(["\ufdd0'span", cljs.core.ObjMap.fromObject(["\ufdd0'class"], {"\ufdd0'class":"label"}), "Script:"]), cljs.core.Vector.fromArray(["\ufdd0'select", cljs.core.ObjMap.fromObject(["\ufdd0'id"], {"\ufdd0'id":cljs.core.str.call(null, "shiptype-", d.call(null, "id"), "-script-select")}), cljs.core.Vector.fromArray(["\ufdd0'option"])]), cljs.core.Vector.fromArray(["\ufdd0'input", cljs.core.ObjMap.fromObject(["\ufdd0'type", "\ufdd0'value", "\ufdd0'click"], {"\ufdd0'type":"submit", 
      "\ufdd0'value":"Save", "\ufdd0'click":evil.shiptype.save_fn.call(null, a)})]), cljs.core.Vector.fromArray(["\ufdd0'br"]), cljs.core.Vector.fromArray(["\ufdd0'span", cljs.core.ObjMap.fromObject(["\ufdd0'class"], {"\ufdd0'class":"label"}), "Size:"]), cljs.core.Vector.fromArray(["\ufdd0'span", cljs.core.ObjMap.fromObject(["\ufdd0'id"], {"\ufdd0'id":cljs.core.str.call(null, "shiptype-", d.call(null, "id"), "-size")}), f, "/", e]), cljs.core.Vector.fromArray(["\ufdd0'br"]), cljs.core.Vector.fromArray(["\ufdd0'span", 
      "Modules"]), cljs.core.Vector.fromArray(["\ufdd0'br"]), evil.shiptype.module_section.call(null, d)])));
      evil.dom.append.call(null, b, evil.dom.c.call(null, cljs.core.Vector.fromArray(["\ufdd0'div", cljs.core.ObjMap.fromObject(["\ufdd0'id"], {"\ufdd0'id":"shiptype-warnings"})])));
      return evil.script.do_list.call(null, function(a) {
        var b = evil.dom.select.call(null, cljs.core.str.call(null, "#shiptype-", d.call(null, "id"), "-script-select"));
        cljs.core.doall.call(null, cljs.core.map.call(null, function(a) {
          return evil.dom.append.call(null, b, evil.dom.c.call(null, cljs.core.Vector.fromArray(["\ufdd0'option", cljs.core.merge.call(null, cljs.core.ObjMap.fromObject(["\ufdd0'value"], {"\ufdd0'value":a.call(null, "id")}), cljs.core.truth_(cljs.core._EQ_.call(null, a.call(null, "id"), d.call(null, "script_id"))) ? cljs.core.ObjMap.fromObject(["\ufdd0'selected"], {"\ufdd0'selected":"selected"}) : cljs.core.ObjMap.fromObject([], {})), a.call(null, "name")])))
        }, a));
        return evil.shiptype.warnings.call(null, cljs.core.deref.call(null, evil.shiptype.shiptype))
      })
    })
  }
};
evil.shiptype.del_shiptype_fn = function(a) {
  return function() {
    return evil.ajaj.del_clj.call(null, cljs.core.str.call(null, "/api/v1/user/", evil.ajaj.uid, "/shiptype/", a.call(null, "id")), function() {
      return evil.dom.del.call(null, cljs.core.str.call(null, "#shiptype-", a.call(null, "id")))
    })
  }
};
evil.shiptype.add_shiptype = function() {
  var a = null, b = function(a, b) {
    var f = evil.dom.c.call(null, cljs.core.Vector.fromArray(["\ufdd0'div", cljs.core.ObjMap.fromObject(["\ufdd0'id"], {"\ufdd0'id":cljs.core.str.call(null, "shiptype-", b.call(null, "id"))}), cljs.core.Vector.fromArray(["\ufdd0'span", cljs.core.ObjMap.fromObject(["\ufdd0'click", "\ufdd0'name"], {"\ufdd0'click":evil.shiptype.show_shiptype_fn.call(null, b), "\ufdd0'name":cljs.core.str.call(null, "shiptype-", b.call(null, "id"), "-name")}), function() {
      var a = b.call(null, "name");
      return cljs.core.truth_(a) ? a : "-"
    }()]), " ", cljs.core.Vector.fromArray(["\ufdd0'span", cljs.core.ObjMap.fromObject(["\ufdd0'class", "\ufdd0'click"], {"\ufdd0'class":"del", "\ufdd0'click":evil.shiptype.del_shiptype_fn.call(null, b)}), "del"]), cljs.core.Vector.fromArray(["\ufdd0'br"])]));
    evil.dom.c.call(null, cljs.core.Vector.fromArray(["\ufdd0'span"]));
    return evil.dom.append.call(null, a, f)
  };
  return a = function(d, e) {
    switch(arguments.length) {
      case 1:
        return a.call(null, evil.dom.select.call(null, cljs.core.str.call(null, "div#shiptype")), d);
      case 2:
        return b.call(this, d, e)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
evil.shiptype.update_shiptypes = function() {
  var a = evil.dom.select.call(null, cljs.core.str.call(null, "div#shiptype"));
  evil.dom.clear.call(null, a);
  evil.dom.append.call(null, a, evil.dom.c.call(null, cljs.core.Vector.fromArray(["\ufdd0'span", cljs.core.Vector.fromArray(["\ufdd0'input", cljs.core.ObjMap.fromObject(["\ufdd0'id"], {"\ufdd0'id":"shiptype-new-input"})]), cljs.core.Vector.fromArray(["\ufdd0'span", cljs.core.ObjMap.fromObject(["\ufdd0'class", "\ufdd0'click"], {"\ufdd0'class":"add", "\ufdd0'click":function() {
    return evil.ajaj.post_clj.call(null, cljs.core.str.call(null, "/api/v1/user/", evil.ajaj.uid, "/shiptype"), cljs.core.ObjMap.fromObject(["user_id", "script_id", "name"], {user_id:evil.ajaj.uid, script_id:null, name:evil.dom.val.call(null, "#shiptype-new-input")}), evil.shiptype.add_shiptype)
  }}), "add"]), cljs.core.Vector.fromArray(["\ufdd0'Br"])])));
  return evil.shiptype.do_list.call(null, function(b) {
    return cljs.core.dorun.call(null, cljs.core.map.call(null, cljs.core.partial.call(null, evil.shiptype.add_shiptype, a), b))
  })
};
evil.shiptype.fetch_modules = function() {
  return evil.ajaj.get_clj.call(null, "/api/v1/moduletype", function(a) {
    return cljs.core.doall.call(null, cljs.core.map.call(null, function(a) {
      return evil.ajaj.get_clj.call(null, cljs.core.str.call(null, "/api/v1/moduletype/", a), function(a) {
        return cljs.core.swap_BANG_.call(null, evil.shiptype.modules, function(b) {
          return cljs.core.reduce.call(null, function(a, b) {
            return cljs.core.assoc.call(null, a, b.call(null, "name"), b)
          }, b, a)
        })
      })
    }, a))
  })
};
evil.fleet = {};
evil.fleet.modules = cljs.core.atom.call(null, cljs.core.ObjMap.fromObject([], {}));
evil.fleet.fleet = cljs.core.atom.call(null, cljs.core.ObjMap.fromObject([], {}));
evil.fleet.do_list = function(a) {
  return evil.ajaj.do_ajaj.call(null, "/fleet", function(b) {
    return a.call(null, b)
  })
};
evil.fleet.do_get = function(a, b) {
  return evil.ajaj.do_ajaj.call(null, cljs.core.str.call(null, "/fleet/", a), function(a) {
    return b.call(null, a)
  })
};
evil.fleet.update_count_fn = function(a, b) {
  return function() {
    var d = cljs.core.assoc.call(null, b, "count", evil.dom.ival.call(null, cljs.core.str.call(null, "#fleet-", a, "-shiptype-", b.call(null, "id"), "-cnt")));
    return evil.ajaj.put_clj.call(null, cljs.core.str.call(null, "/api/v1/user/", evil.ajaj.uid, "/fleet/", a, "/shiptype/", b.call(null, "id")), d, function() {
      return null
    })
  }
};
evil.fleet.shiptype_line = function(a, b) {
  var d = cljs.core.str.call(null, "fleet-", a, "-shiptype-", b.call(null, "id"));
  return cljs.core.Vector.fromArray(["\ufdd0'tr", cljs.core.ObjMap.fromObject(["\ufdd0'id"], {"\ufdd0'id":d}), cljs.core.Vector.fromArray(["\ufdd0'td", b.call(null, "name")]), cljs.core.Vector.fromArray(["\ufdd0'td", cljs.core.Vector.fromArray(["\ufdd0'input", cljs.core.ObjMap.fromObject(["\ufdd0'type", "\ufdd0'id", "\ufdd0'value"], {"\ufdd0'type":"text", "\ufdd0'id":cljs.core.str.call(null, d, "-cnt"), "\ufdd0'value":b.call(null, "count")})]), cljs.core.Vector.fromArray(["\ufdd0'input", cljs.core.ObjMap.fromObject(["\ufdd0'type", 
  "\ufdd0'value", "\ufdd0'click"], {"\ufdd0'type":"submit", "\ufdd0'value":"Update", "\ufdd0'click":evil.fleet.update_count_fn.call(null, a, b)})])]), cljs.core.Vector.fromArray(["\ufdd0'td", cljs.core.ObjMap.fromObject(["\ufdd0'click"], {"\ufdd0'click":function() {
    return evil.ajaj.del_clj.call(null, cljs.core.str.call(null, "/api/v1/user/", evil.ajaj.uid, "/fleet/", a, "/shiptype/", b.call(null, "id")), function() {
      return evil.dom.del.call(null, cljs.core.str.call(null, "#", d))
    })
  }}), cljs.core.Vector.fromArray(["\ufdd0'span", cljs.core.ObjMap.fromObject(["\ufdd0'class"], {"\ufdd0'class":"del"}), "del"])])])
};
evil.fleet.update_shiptypes = function(a) {
  var b = evil.dom.select.call(null, cljs.core.str.call(null, "#fleet-", a, "-shiptype-select"));
  return evil.shiptype.do_list.call(null, function(a) {
    return cljs.core.dorun.call(null, cljs.core.map.call(null, function(a) {
      return evil.dom.append.call(null, b, evil.dom.c.call(null, cljs.core.Vector.fromArray(["\ufdd0'option", cljs.core.ObjMap.fromObject(["\ufdd0'value"], {"\ufdd0'value":a.call(null, "id")}), a.call(null, "name")])))
    }, a))
  })
};
evil.fleet.add_shiptype_fn = function(a) {
  return function() {
    var b = evil.dom.ival.call(null, cljs.core.str.call(null, "#fleet-", a.call(null, "id"), "-shiptype-select")), d = evil.dom.ival.call(null, cljs.core.str.call(null, "#fleet-", evil.fleet.fleet_id, "-shiptype-cnt"));
    return evil.ajaj.post_clj.call(null, cljs.core.str.call(null, "/api/v1/user/", evil.ajaj.uid, "/fleet/", a.call(null, "id"), "/shiptype"), cljs.core.ObjMap.fromObject(["fleet_id", "shiptype_id", "count"], {fleet_id:a.call(null, "id"), shiptype_id:b, count:d}), function(b) {
      return evil.dom.append.call(null, cljs.core.str.call(null, "#fleet-", a.call(null, "id"), "-shiptype"), evil.dom.c.call(null, evil.fleet.shiptype_line.call(null, a.call(null, "id"), b)))
    })
  }
};
evil.fleet.shiptype_section = function(a) {
  return cljs.core.vec.call(null, cljs.core.concat.call(null, cljs.core.Vector.fromArray(["\ufdd0'table", cljs.core.ObjMap.fromObject(["\ufdd0'id"], {"\ufdd0'id":cljs.core.str.call(null, "fleet-", a.call(null, "id"), "-shiptype")}), cljs.core.Vector.fromArray(["\ufdd0'tr", cljs.core.Vector.fromArray(["\ufdd0'td", cljs.core.Vector.fromArray(["\ufdd0'select", cljs.core.ObjMap.fromObject(["\ufdd0'id"], {"\ufdd0'id":cljs.core.str.call(null, "fleet-", a.call(null, "id"), "-shiptype-select")}), cljs.core.Vector.fromArray(["\ufdd0'option"])])]), 
  cljs.core.Vector.fromArray(["\ufdd0'td", cljs.core.Vector.fromArray(["\ufdd0'input", cljs.core.ObjMap.fromObject(["\ufdd0'type", "\ufdd0'id", "\ufdd0'value"], {"\ufdd0'type":"text", "\ufdd0'id":cljs.core.str.call(null, "fleet-", evil.fleet.fleet_id, "-shiptype-cnt"), "\ufdd0'value":"1"})])]), cljs.core.Vector.fromArray(["\ufdd0'td", cljs.core.ObjMap.fromObject(["\ufdd0'click"], {"\ufdd0'click":evil.fleet.add_shiptype_fn.call(null, a)}), "add"])])]), cljs.core.vec.call(null, cljs.core.map.call(null, 
  function(b) {
    return evil.fleet.shiptype_line.call(null, a.call(null, "id"), b)
  }, a.call(null, "shiptypes")))))
};
evil.fleet.save_fn = function(a) {
  return function() {
    return evil.ajaj.put_clj.call(null, cljs.core.str.call(null, "/api/v1/user/", evil.ajaj.uid, "/fleet/", a.call(null, "id")), cljs.core.ObjMap.fromObject(["id", "name", "user_id"], {id:a.call(null, "id"), name:evil.dom.val.call(null, cljs.core.str.call(null, "#fleet-", a.call(null, "id"), "-name")), user_id:evil.ajaj.uid}), function(a) {
      return evil.dom.text.call(null, cljs.core.str.call(null, "span[name=fleet-", a.call(null, "id"), "-name]"), a.call(null, "name"))
    })
  }
};
evil.fleet.show_fleet_fn = function(a) {
  return function() {
    return evil.fleet.do_get.call(null, a.call(null, "id"), function(b) {
      var d = evil.dom.select.call(null, "#center");
      evil.dom.clear.call(null, d);
      evil.dom.append.call(null, d, evil.dom.c.call(null, cljs.core.Vector.fromArray(["\ufdd0'div", cljs.core.Vector.fromArray(["\ufdd0'span", "Name:"]), cljs.core.Vector.fromArray(["\ufdd0'input", cljs.core.ObjMap.fromObject(["\ufdd0'type", "\ufdd0'id", "\ufdd0'value"], {"\ufdd0'type":"text", "\ufdd0'id":cljs.core.str.call(null, "fleet-", b.call(null, "id"), "-name"), "\ufdd0'value":b.call(null, "name")})]), cljs.core.Vector.fromArray(["\ufdd0'br"]), cljs.core.Vector.fromArray(["\ufdd0'input", cljs.core.ObjMap.fromObject(["\ufdd0'type", 
      "\ufdd0'value", "\ufdd0'click"], {"\ufdd0'type":"submit", "\ufdd0'value":"Save", "\ufdd0'click":evil.fleet.save_fn.call(null, a)})]), cljs.core.Vector.fromArray(["\ufdd0'br"]), evil.fleet.shiptype_section.call(null, b)])));
      return evil.fleet.update_shiptypes.call(null, b.call(null, "id"))
    })
  }
};
evil.fleet.del_fleet_fn = function(a) {
  var b = a.call(null, "id");
  return function() {
    return evil.ajaj.del_clj.call(null, cljs.core.str.call(null, "/api/v1/user/", evil.ajaj.uid, "/fleet/", b), function() {
      return evil.dom.del.call(null, cljs.core.str.call(null, "#fleet-", b))
    })
  }
};
evil.fleet.add_fleet = function() {
  var a = null, b = function(a, b) {
    var f = evil.dom.c.call(null, cljs.core.Vector.fromArray(["\ufdd0'div", cljs.core.ObjMap.fromObject(["\ufdd0'id"], {"\ufdd0'id":cljs.core.str.call(null, "fleet-", b.call(null, "id"))}), cljs.core.Vector.fromArray(["\ufdd0'span", cljs.core.ObjMap.fromObject(["\ufdd0'click", "\ufdd0'name"], {"\ufdd0'click":evil.fleet.show_fleet_fn.call(null, b), "\ufdd0'name":cljs.core.str.call(null, "fleet-", b.call(null, "id"), "-name")}), function() {
      var a = b.call(null, "name");
      return cljs.core.truth_(a) ? a : "-"
    }()]), " ", cljs.core.Vector.fromArray(["\ufdd0'span", cljs.core.ObjMap.fromObject(["\ufdd0'class", "\ufdd0'click"], {"\ufdd0'class":"del", "\ufdd0'click":evil.fleet.del_fleet_fn.call(null, b)}), "del"])]));
    return evil.dom.append.call(null, a, f)
  };
  return a = function(d, e) {
    switch(arguments.length) {
      case 1:
        return a.call(null, evil.dom.select.call(null, cljs.core.str.call(null, "div#fleet")), d);
      case 2:
        return b.call(this, d, e)
    }
    throw"Invalid arity: " + arguments.length;
  }
}();
evil.fleet.update_fleets = function() {
  var a = evil.dom.select.call(null, cljs.core.str.call(null, "div#fleet"));
  evil.dom.clear.call(null, a);
  evil.dom.append.call(null, a, evil.dom.c.call(null, cljs.core.Vector.fromArray(["\ufdd0'span", cljs.core.Vector.fromArray(["\ufdd0'input", cljs.core.ObjMap.fromObject(["\ufdd0'id"], {"\ufdd0'id":"fleet-new-input"})]), cljs.core.Vector.fromArray(["\ufdd0'span", cljs.core.ObjMap.fromObject(["\ufdd0'class", "\ufdd0'click"], {"\ufdd0'class":"add", "\ufdd0'click":function() {
    return evil.ajaj.post_clj.call(null, cljs.core.str.call(null, "/api/v1/user/", evil.ajaj.uid, "/fleet"), cljs.core.ObjMap.fromObject(["user_id", "name"], {user_id:evil.ajaj.uid, name:evil.dom.val.call(null, evil.dom.select.call(null, "#fleet-new-input"))}), evil.fleet.add_fleet)
  }}), "add"]), cljs.core.Vector.fromArray(["\ufdd0'Br"])])));
  return evil.fleet.do_list.call(null, function(b) {
    return cljs.core.dorun.call(null, cljs.core.map.call(null, cljs.core.partial.call(null, evil.fleet.add_fleet, a), b))
  })
};
evil.fight = {};
evil.fight.add_fight_line = function(a) {
  var b = cljs.core.truth_(cljs.core.seq_QMARK_.call(null, a)) ? cljs.core.apply.call(null, cljs.core.hash_map, a) : a, a = cljs.core.get.call(null, b, "id"), d = cljs.core.get.call(null, b, "fleets"), b = cljs.core.nth.call(null, d, 0, null), e = cljs.core.truth_(cljs.core.seq_QMARK_.call(null, b)) ? cljs.core.apply.call(null, cljs.core.hash_map, b) : b, b = cljs.core.get.call(null, e, "name"), e = cljs.core.get.call(null, e, "user"), e = cljs.core.truth_(cljs.core.seq_QMARK_.call(null, e)) ? cljs.core.apply.call(null, 
  cljs.core.hash_map, e) : e, e = cljs.core.get.call(null, e, "name"), d = cljs.core.nth.call(null, d, 1, null), f = cljs.core.truth_(cljs.core.seq_QMARK_.call(null, d)) ? cljs.core.apply.call(null, cljs.core.hash_map, d) : d, d = cljs.core.get.call(null, f, "name"), f = cljs.core.get.call(null, f, "user"), f = cljs.core.truth_(cljs.core.seq_QMARK_.call(null, f)) ? cljs.core.apply.call(null, cljs.core.hash_map, f) : f, f = cljs.core.get.call(null, f, "name");
  return evil.dom.append.call(null, "#fight-list", evil.dom.c.call(null, cljs.core.Vector.fromArray(["\ufdd0'a", cljs.core.ObjMap.fromObject(["\ufdd0'href", "\ufdd0'target"], {"\ufdd0'href":cljs.core.str.call(null, "/fight/", a), "\ufdd0'target":"_blank"}), cljs.core.str.call(null, b, "(", e, ") vs. ", d, "(", f, ")"), cljs.core.Vector.fromArray(["\ufdd0'br"])])))
};
evil.fight.start_fight = function() {
  var a = evil.dom.ival.call(null, "#fleet-a"), b = evil.dom.ival.call(null, "#fleet-b");
  return evil.ajaj.post_clj.call(null, "/api/v1/fight", cljs.core.ObjMap.fromObject(["fleet_a", "fleet_b"], {fleet_a:a, fleet_b:b}), evil.fight.add_fight_line)
};
evil.fight.fight_view = function() {
  evil.dom.clear.call(null, "#center");
  evil.dom.append.call(null, "#center", evil.dom.c.call(null, cljs.core.Vector.fromArray(["\ufdd0'div", cljs.core.Vector.fromArray(["\ufdd0'span", cljs.core.ObjMap.fromObject(["\ufdd0'id"], {"\ufdd0'id":"new-fight"})]), cljs.core.Vector.fromArray(["\ufdd0'br"]), cljs.core.Vector.fromArray(["\ufdd0'span", cljs.core.ObjMap.fromObject(["\ufdd0'id"], {"\ufdd0'id":"fight-list"})])])));
  evil.ajaj.get_clj.call(null, "/api/v1/fight", function(a) {
    evil.dom.select.call(null, "#fight-list");
    return cljs.core.doall.call(null, cljs.core.map.call(null, evil.fight.add_fight_line, a))
  });
  return evil.ajaj.get_clj.call(null, "/api/v1/fleet", function(a) {
    return evil.dom.append.call(null, "#new-fight", evil.dom.c.call(null, cljs.core.Vector.fromArray(["\ufdd0'span", evil.dom.s.call(null, cljs.core.Vector.fromArray([cljs.core.ObjMap.fromObject(["\ufdd0'id"], {"\ufdd0'id":"fleet-a"})]), function(a) {
      return cljs.core.Vector.fromArray(["\ufdd0'option", cljs.core.ObjMap.fromObject(["\ufdd0'value"], {"\ufdd0'value":a.call(null, "id")}), a.call(null, "name")])
    }, a), " vs. ", evil.dom.s.call(null, cljs.core.Vector.fromArray([cljs.core.ObjMap.fromObject(["\ufdd0'id"], {"\ufdd0'id":"fleet-b"})]), function(a) {
      return cljs.core.Vector.fromArray(["\ufdd0'option", cljs.core.ObjMap.fromObject(["\ufdd0'value"], {"\ufdd0'value":a.call(null, "id")}), a.call(null, "name")])
    }, a), " - ", cljs.core.Vector.fromArray(["\ufdd0'input", cljs.core.ObjMap.fromObject(["\ufdd0'value", "\ufdd0'type", "\ufdd0'click"], {"\ufdd0'value":"Fight!", "\ufdd0'type":"submit", "\ufdd0'click":evil.fight.start_fight})])])))
  })
};
evil.fight.update_fights = function() {
  var a = evil.dom.select.call(null, "div#fight");
  evil.dom.clear.call(null, a);
  return evil.dom.append.call(null, a, evil.dom.c.call(null, cljs.core.Vector.fromArray(["\ufdd0'span", cljs.core.Vector.fromArray(["\ufdd0'span", cljs.core.ObjMap.fromObject(["\ufdd0'click"], {"\ufdd0'click":evil.fight.fight_view}), "manage"]), cljs.core.Vector.fromArray(["\ufdd0'br"])])))
};
evil.epic = {};
evil.epic.do_list = function(a) {
  return evil.ajaj.do_ajaj.call(null, "/api/v1/server/epic", function(b) {
    return a.call(null, b)
  })
};
evil.epic.do_get = function(a, b) {
  return evil.ajaj.do_ajaj.call(null, cljs.core.str.call(null, "/api/v1/server/epic/", a), function(a) {
    return b.call(null, a)
  })
};
evil.core = {};
evil.core.$ = $;
evil.core.fight_row = function(a) {
  return evil.dom.clear.call(null, cljs.core.Vector.fromArray(["\ufdd0'tr", cljs.core.ObjMap.fromObject(["\ufdd0'id"], {"\ufdd0'id":a.call(null, "id")}), cljs.core.Vector.fromArray(["\ufdd0'td", cljs.core.str.call(null, a.call(null, "id"), "s")]), cljs.core.Vector.fromArray(["\ufdd0'td", a.call(null, "state")]), cljs.core.Vector.fromArray(["\ufdd0'td", a.call(null, "time")]), cljs.core.Vector.fromArray(["\ufdd0'td", a.call(null, "ticks")])]))
};
evil.core.update_epic_server = function(a) {
  return evil.epic.do_get.call(null, a, function(b) {
    var d = evil.dom.c.call(null, cljs.core.Vector.fromArray(["\ufdd0'table", cljs.core.Vector.fromArray(["\ufdd0'tr", cljs.core.Vector.fromArray(["\ufdd0'th", "Fight"]), cljs.core.Vector.fromArray(["\ufdd0'th", "Status"]), cljs.core.Vector.fromArray(["\ufdd0'th", "Time"]), cljs.core.Vector.fromArray(["\ufdd0'th", "Ticks"])])])), e = evil.dom.select.call(null, cljs.core.str.call(null, "div#", a));
    evil.dom.clear.call(null, e);
    evil.dom.append.call(null, e, com.c.call(null, cljs.core.Vector.fromArray(["\ufdd0'h2", a])));
    evil.dom.append.call(null, e, d);
    return cljs.core.dorun.call(null, cljs.core.map.call(null, function(a) {
      return evil.dom.append.call(null, d, evil.core.fight_row.call(null, a))
    }, evil.core.a, b))
  })
};
evil.core.update_epic_servers = function() {
  var a = evil.dom.select.call(null, "div#epic");
  evil.dom.clear.call(null, a);
  return evil.epic.do_list.call(null, function(b) {
    return cljs.core.dorun.call(null, cljs.core.map.call(null, function(b) {
      evil.dom.append.call(null, a, evil.dom.c.call(null, cljs.core.Vector.fromArray(["\ufdd0'div", cljs.core.ObjMap.fromObject(["\ufdd0'id"], {"\ufdd0'id":b}), b])));
      return evil.core.update_epic_server.call(null, b)
    }, b))
  })
};
evil.core.$.call(null, document).ready(function() {
  evil.script.update_scripts.call(null);
  evil.shiptype.fetch_modules.call(null);
  evil.shiptype.update_shiptypes.call(null);
  evil.fleet.update_fleets.call(null);
  return evil.fight.update_fights.call(null)
});
