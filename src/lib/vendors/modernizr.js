!(function (e, n, t) {
  function r(e, n) {
    return typeof e === n;
  }
  function o() {
    var e, n, t, o, A, i, s;
    for (var a in B)
      if (B.hasOwnProperty(a)) {
        if (((e = []), (n = B[a]), n.name && (e.push(n.name.toLowerCase()), n.options && n.options.aliases && n.options.aliases.length)))
          for (t = 0; t < n.options.aliases.length; t++) e.push(n.options.aliases[t].toLowerCase());
        for (o = r(n.fn, "function") ? n.fn() : n.fn, A = 0; A < e.length; A++)
          (i = e[A]),
            (s = i.split(".")),
            1 === s.length
              ? (Modernizr[s[0]] = o)
              : (!Modernizr[s[0]] || Modernizr[s[0]] instanceof Boolean || (Modernizr[s[0]] = new Boolean(Modernizr[s[0]])), (Modernizr[s[0]][s[1]] = o)),
            y.push((o ? "" : "no-") + s.join("-"));
      }
  }
  function A(e) {
    var n = Q.className,
      t = Modernizr._config.classPrefix || "";
    if ((C && (n = n.baseVal), Modernizr._config.enableJSClass)) {
      var r = new RegExp("(^|\\s)" + t + "no-js(\\s|$)");
      n = n.replace(r, "$1" + t + "js$2");
    }
    Modernizr._config.enableClasses && ((n += " " + t + e.join(" " + t)), C ? (Q.className.baseVal = n) : (Q.className = n));
  }
  function i() {
    return "function" != typeof n.createElement
      ? n.createElement(arguments[0])
      : C
      ? n.createElementNS.call(n, "http://www.w3.org/2000/svg", arguments[0])
      : n.createElement.apply(n, arguments);
  }
  function s() {
    var e = n.body;
    return e || ((e = i(C ? "svg" : "body")), (e.fake = !0)), e;
  }
  function a(e, t, r, o) {
    var A,
      a,
      l,
      u,
      f = "modernizr",
      c = i("div"),
      d = s();
    if (parseInt(r, 10)) for (; r--; ) (l = i("div")), (l.id = o ? o[r] : f + (r + 1)), c.appendChild(l);
    return (
      (A = i("style")),
      (A.type = "text/css"),
      (A.id = "s" + f),
      (d.fake ? d : c).appendChild(A),
      d.appendChild(c),
      A.styleSheet ? (A.styleSheet.cssText = e) : A.appendChild(n.createTextNode(e)),
      (c.id = f),
      d.fake && ((d.style.background = ""), (d.style.overflow = "hidden"), (u = Q.style.overflow), (Q.style.overflow = "hidden"), Q.appendChild(d)),
      (a = t(c, e)),
      d.fake ? (d.parentNode.removeChild(d), (Q.style.overflow = u), Q.offsetHeight) : c.parentNode.removeChild(c),
      !!a
    );
  }
  function l(e, n) {
    if ("object" == typeof e) for (var t in e) x(e, t) && l(t, e[t]);
    else {
      e = e.toLowerCase();
      var r = e.split("."),
        o = Modernizr[r[0]];
      if ((2 == r.length && (o = o[r[1]]), "undefined" != typeof o)) return Modernizr;
      (n = "function" == typeof n ? n() : n),
        1 == r.length
          ? (Modernizr[r[0]] = n)
          : (!Modernizr[r[0]] || Modernizr[r[0]] instanceof Boolean || (Modernizr[r[0]] = new Boolean(Modernizr[r[0]])), (Modernizr[r[0]][r[1]] = n)),
        A([(n && 0 != n ? "" : "no-") + r.join("-")]),
        Modernizr._trigger(e, n);
    }
    return Modernizr;
  }
  function u(e, n) {
    return !!~("" + e).indexOf(n);
  }
  function f(e) {
    return e
      .replace(/([a-z])-([a-z])/g, function (e, n, t) {
        return n + t.toUpperCase();
      })
      .replace(/^-/, "");
  }
  function c(e, n) {
    return function () {
      return e.apply(n, arguments);
    };
  }
  function d(e, n, t) {
    var o;
    for (var A in e) if (e[A] in n) return t === !1 ? e[A] : ((o = n[e[A]]), r(o, "function") ? c(o, t || n) : o);
    return !1;
  }
  function p(e) {
    return e
      .replace(/([A-Z])/g, function (e, n) {
        return "-" + n.toLowerCase();
      })
      .replace(/^ms-/, "-ms-");
  }
  function m(n, t, r) {
    var o;
    if ("getComputedStyle" in e) {
      o = getComputedStyle.call(e, n, t);
      var A = e.console;
      if (null !== o) r && (o = o.getPropertyValue(r));
      else if (A) {
        var i = A.error ? "error" : "log";
        A[i].call(A, "getComputedStyle returning null, its possible modernizr test results are inaccurate");
      }
    } else o = !t && n.currentStyle && n.currentStyle[r];
    return o;
  }
  function g(n, r) {
    var o = n.length;
    if ("CSS" in e && "supports" in e.CSS) {
      for (; o--; ) if (e.CSS.supports(p(n[o]), r)) return !0;
      return !1;
    }
    if ("CSSSupportsRule" in e) {
      for (var A = []; o--; ) A.push("(" + p(n[o]) + ":" + r + ")");
      return (
        (A = A.join(" or ")),
        a("@supports (" + A + ") { #modernizr { position: absolute; } }", function (e) {
          return "absolute" == m(e, null, "position");
        })
      );
    }
    return t;
  }
  function h(e, n, o, A) {
    function s() {
      l && (delete P.style, delete P.modElem);
    }
    if (((A = r(A, "undefined") ? !1 : A), !r(o, "undefined"))) {
      var a = g(e, o);
      if (!r(a, "undefined")) return a;
    }
    for (var l, c, d, p, m, h = ["modernizr", "tspan", "samp"]; !P.style && h.length; ) (l = !0), (P.modElem = i(h.shift())), (P.style = P.modElem.style);
    for (d = e.length, c = 0; d > c; c++)
      if (((p = e[c]), (m = P.style[p]), u(p, "-") && (p = f(p)), P.style[p] !== t)) {
        if (A || r(o, "undefined")) return s(), "pfx" == n ? p : !0;
        try {
          P.style[p] = o;
        } catch (v) {}
        if (P.style[p] != m) return s(), "pfx" == n ? p : !0;
      }
    return s(), !1;
  }
  function v(e, n, t, o, A) {
    var i = e.charAt(0).toUpperCase() + e.slice(1),
      s = (e + " " + U.join(i + " ") + i).split(" ");
    return r(n, "string") || r(n, "undefined") ? h(s, n, o, A) : ((s = (e + " " + D.join(i + " ") + i).split(" ")), d(s, n, t));
  }
  function w(e, n, r) {
    return v(e, t, t, n, r);
  }
  var y = [],
    B = [],
    b = {
      _version: "3.6.0",
      _config: { classPrefix: "", enableClasses: !0, enableJSClass: !0, usePrefixes: !0 },
      _q: [],
      on: function (e, n) {
        var t = this;
        setTimeout(function () {
          n(t[e]);
        }, 0);
      },
      addTest: function (e, n, t) {
        B.push({ name: e, fn: n, options: t });
      },
      addAsyncTest: function (e) {
        B.push({ name: null, fn: e });
      },
    },
    Modernizr = function () {};
  (Modernizr.prototype = b),
    (Modernizr = new Modernizr()),
    Modernizr.addTest("svg", !!n.createElementNS && !!n.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect);
  var E = b._config.usePrefixes ? " -webkit- -moz- -o- -ms- ".split(" ") : ["", ""];
  b._prefixes = E;
  var Q = n.documentElement,
    C = "svg" === Q.nodeName.toLowerCase(),
    _ = (function () {
      var n = e.matchMedia || e.msMatchMedia;
      return n
        ? function (e) {
            var t = n(e);
            return (t && t.matches) || !1;
          }
        : function (n) {
            var t = !1;
            return (
              a("@media " + n + " { #modernizr { position: absolute; } }", function (n) {
                t = "absolute" == (e.getComputedStyle ? e.getComputedStyle(n, null) : n.currentStyle).position;
              }),
              t
            );
          };
    })();
  b.mq = _;
  var S = (b.testStyles = a);
  Modernizr.addTest("touchevents", function () {
    var t;
    if ("ontouchstart" in e || (e.DocumentTouch && n instanceof DocumentTouch)) t = !0;
    else {
      var r = ["@media (", E.join("touch-enabled),("), "heartz", ")", "{#modernizr{top:9px;position:absolute}}"].join("");
      S(r, function (e) {
        t = 9 === e.offsetTop;
      });
    }
    return t;
  });
  var x;
  !(function () {
    var e = {}.hasOwnProperty;
    x =
      r(e, "undefined") || r(e.call, "undefined")
        ? function (e, n) {
            return n in e && r(e.constructor.prototype[n], "undefined");
          }
        : function (n, t) {
            return e.call(n, t);
          };
  })(),
    (b._l = {}),
    (b.on = function (e, n) {
      this._l[e] || (this._l[e] = []),
        this._l[e].push(n),
        Modernizr.hasOwnProperty(e) &&
          setTimeout(function () {
            Modernizr._trigger(e, Modernizr[e]);
          }, 0);
    }),
    (b._trigger = function (e, n) {
      if (this._l[e]) {
        var t = this._l[e];
        setTimeout(function () {
          var e, r;
          for (e = 0; e < t.length; e++) (r = t[e])(n);
        }, 0),
          delete this._l[e];
      }
    }),
    Modernizr._q.push(function () {
      b.addTest = l;
    }),
    Modernizr.addAsyncTest(function () {
      var e = new Image();
      (e.onload = e.onerror =
        function () {
          l("jpeg2000", 1 == e.width);
        }),
        (e.src =
          "data:image/jp2;base64,/0//UQAyAAAAAAABAAAAAgAAAAAAAAAAAAAABAAAAAQAAAAAAAAAAAAEBwEBBwEBBwEBBwEB/1IADAAAAAEAAAQEAAH/XAAEQED/ZAAlAAFDcmVhdGVkIGJ5IE9wZW5KUEVHIHZlcnNpb24gMi4wLjD/kAAKAAAAAABYAAH/UwAJAQAABAQAAf9dAAUBQED/UwAJAgAABAQAAf9dAAUCQED/UwAJAwAABAQAAf9dAAUDQED/k8+kEAGvz6QQAa/PpBABr994EAk//9k=");
    }),
    Modernizr.addAsyncTest(function () {
      function e(e, n, t) {
        function r(n) {
          var r = n && "load" === n.type ? 1 == o.width : !1,
            A = "webp" === e;
          l(e, A && r ? new Boolean(r) : r), t && t(n);
        }
        var o = new Image();
        (o.onerror = r), (o.onload = r), (o.src = n);
      }
      var n = [
          { uri: "data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=", name: "webp" },
          {
            uri: "data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA==",
            name: "webp.alpha",
          },
          {
            uri: "data:image/webp;base64,UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA",
            name: "webp.animation",
          },
          { uri: "data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=", name: "webp.lossless" },
        ],
        t = n.shift();
      e(t.name, t.uri, function (t) {
        if (t && "load" === t.type) for (var r = 0; r < n.length; r++) e(n[r].name, n[r].uri);
      });
    });
  var T = "Moz O ms Webkit",
    U = b._config.usePrefixes ? T.split(" ") : [];
  b._cssomPrefixes = U;
  var D = b._config.usePrefixes ? T.toLowerCase().split(" ") : [];
  b._domPrefixes = D;
  var k = { elem: i("modernizr") };
  Modernizr._q.push(function () {
    delete k.elem;
  });
  var P = { style: k.elem.style };
  Modernizr._q.unshift(function () {
    delete P.style;
  }),
    (b.testAllProps = v),
    (b.testAllProps = w),
    Modernizr.addTest("cssgridlegacy", w("grid-columns", "10px", !0)),
    Modernizr.addTest("cssgrid", w("grid-template-rows", "none", !0)),
    Modernizr.addTest("flexbox", w("flexBasis", "1px", !0)),
    o(),
    A(y),
    delete b.addTest,
    delete b.addAsyncTest;
  for (var z = 0; z < Modernizr._q.length; z++) Modernizr._q[z]();
  e.Modernizr = Modernizr;
})(window, document);
