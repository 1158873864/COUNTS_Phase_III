!
function(t) {
	function n(r) {
		if (i[r]) return i[r].exports;
		var a = i[r] = {
			"i": r,
			"l": !1,
			"exports": {}
		};
		return t[r].call(a.exports, a, a.exports, n),
		a.l = !0,
		a.exports
	}
	var i = {};
	n(n.s = "N7//")
} ({
	"0": function(t, n) {
		t.exports = window.OM_BASE
	},
	"9ASm": function(t, n, i) {
		var r; (r = function(t, n, i) {
			function r() {
				var t = $("#skyContainer");
				this.render = function() {
					function n(t, n) {
						return Math.floor(Math.random() * (n - t)) + t
					}
					for (var i = ["style1", "style2", "style3", "style4"], r = ["tam1", "tam2", "tam1", "tam2", "tam3"], a = ["opacity1", "opacity1", "opacity1", "opacity2", "opacity2", "opacity3"], o = "", s = {
						"width": window.innerWidth,
						"height": window.innerHeight / 3
					},
					l = 0; l < 120; l++) o += "<span class='estrela " + i[n(0, 4)] + " " + a[n(0, 6)] + " " + r[n(0, 5)] + "' style='animation-delay: ." + n(0, 9) + "s; left: " + n(0, s.width) + "px; top: " + n(0, s.height) + "px;'></span>";
					t.html(o).css("height", window.innerHeight / 3 + "px")
				}
			}
			return r
		}.call(n, i, n, t)) !== undefined && (t.exports = r)
	},
	"N7//": function(t, n, i) {
		function r() {
			function t() {

			}
			var n = !1,

			//提示和登录按钮
			r = new l({
				"redirect": !0
			}).build(!0);
			r.eventBind();

			//背景
			this.bizInit = function() {
				return this
			},

			this.render = function() {
				return n || (n = !0, t(), d.init(), c.ajax({
					"url": "/userAuth/GetIndexMediaInfo",
					"type": "get",
					"dataType": "json"
				}).then(function(t) {
					try {
						if (!t.data || 0 == t.data.length) return void c(".galaxy").hide(); (new s).render(t.data)
					} catch(e) {
						c(".galaxy").hide()
					}
				})),
				this
			}
		}
		var a = i(0),
		o = i("lKmh"),
		s = i("Xw+Q"),
		l = a.component.newLoginFormLogic,
		c = a.$,
		d = (a.component.constantVar, new o); (new r).bizInit().render()
	},
	"Tzcj": function(t, n, i) {

	},
	"Xw+Q": function(t, n, i) {

	},
	"hCE3": function(t, n, i) {

	},
	"lKmh": function(t, n, i) {	//窗口缩放的内容、背景调整
		var r; (r = function(t, n, r) {
			function a() {
				y.on("click",
				function(e) {
					$("html, body").animate({
						"scrollTop": d
					},
					500, "easeOutCubic")
				}),
				$(window).resize(function() {
					o()
				}).on("scroll",
				function() {
					var t = $(window).scrollTop(),
					n = t / d;
					n > 1 && (n = 1),
					n < 0 && (n = 0),
					f.css("opacity", n / 2),
					t >= d + 362 ? $("#header").slideDown(200) : $("#header").slideUp(200)
				}),
				$(document).on("mousewheel",
				function() {
					if (x) return ! 1
				})
			}
			function o() {
				d = $(window).height(),
				c = $(window).width();
				var t = c / h,
				n = d / p,
				i = n * h,
				r = t * p;
				d <= 800 && $(".slogan").css("top", "30px");
				var a = 0;
				r > d ? (a = d - r, u.css({
					"width": c + "px",
					"height": r + "px",
					"marginLeft": "0px",
					"top": a + "px",
					"left": "0px",
					"position": "inherit"
				})) : u.css({
					"width": i + "px",
					"height": d + "px",
					"left": "50%",
					"top": "0px",
					"marginLeft": -i / 2 + "px",
					"position": "absolute"
				}),
				u.show(),
				$(".login-panel").show(),
				$(".first-screen").css("height", d),
				$(".last-screen").css("height", d).show(),
				$(".middle-screen").css({
					"marginTop": d
				}).show(),
				g.render()
			}
			function s() {
				this.disableMouse = function() {
					x = !0
				},
				this.enableMouse = function() {
					x = !1
				},
				this.init = function() {
					o(),
					a()
				}
			}
			var l = i("9ASm"),
			c = 0,
			d = 0,
			u = $("#skin-bg img"),
			f = $(".mask-full"),
			h = 1920,
			p = 1080,
			y = $(".mouse"),
			x = !1,
			g = new l;
			return s
		}.call(n, i, n, t)) !== undefined && (t.exports = r)
	}
});
