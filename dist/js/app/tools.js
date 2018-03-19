(function() {
	var Tools = {
		//表单验证
		validForm: function(ele, mode) {
			var b = true,
				tips = '',
				toptips = '';
			if(typeof mode === 'undefined') mode = 0;
			$(ele).find('*').each(function() {
				var $this = $(this),
					msg = '';
	
				if(typeof($this.attr("verify")) !== "undefined") {
					var data = $.trim($this.val());
					if(data.length < 1) {
						b = false;
						msg = $this.attr("msg-empty");
						showErr(msg);
						return false;
					}
					msg = $this.attr("msg");
					b = validData(data, $this.attr("verify"));
					if(!b) {
						showErr(msg);
						return false;
					}
				}
			});
			return b;
	
			function validData(value, type) {
				//  验证数字：
				if(type == 'number') {
					var reg = /^[0-9]*$/
					if(!reg.test(value)) {
						return false;
					}
				}
				//  验证Email地址：
				if(type == 'email') {
					var reg = /^w+([-+.]w+)*@w+([-.]w+)*.w+([-.]w+)*$/
					if(!reg.test(value)) {
						return false;
					}
				}
	
				//  手机号码：^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$或 var regMobile=/^1[3,5,8]\d{9}$/;
				if(type == 'phone') {
					var reg = /^1[34578]\d{9}$/
					if(!reg.test(value)) {
						return false;
					}
				}
	
				//  验证电话号码：：--正确格式为：XXXX-XXXXXXX，XXXX-XXXXXXXX，XXX-XXXXXXX，XXX-XXXXXXXX，XXXXXXX，XXXXXXXX。
				if(type == 'telephone') {
					var reg = /^((d{3,4})|d{3,4}-)?d{7,8}$/
					if(!reg.test(value)) {
						return false;
					}
				}
	
				//  验证身份证号（15位或18位数字）：
				if(type == 'ID') {
					var reg = /^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/
					if(!reg.test(value)) {
						return false;
					}
				}
	
				if(type == 'bank') {
					var reg = /\d{15}|\d{19}/
					if(!reg.test(value)) {
						return false;
					}
				}
	
				//  非负浮点数（正浮点数 + 0）：^\d+(\.\d+)?$ 或 ^[1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0$
				if(type == 'decimal') {
					var reg = /^\d+(\.\d{0,5})?$/
					if(!reg.test(value)) {
						return false;
					}
				}
	
				//  验证用户密码: 正确格式为：以字母开头，长度在6-18之间，只能包含字符、数字和下划线。
				if(type == 'password') {
					var reg = /^[\w]{6,16}$/
					if(!reg.test(value)) {
						return false;
					}
				}
	
				if(type == 'QQ') {
					var reg = /^\d{5,10}$/
					if(!reg.test(value)) {
						return false;
					}
				}
				return true;
			}
	
			function showErr(msg) {
				if(mode === 0) {
					Tools.alert({
						msg: msg
					});
				} else if(mode === 1) {
					Tools.toast(msg);
				}
			}
		},
		getFormData: function(ele) {
			var data = {};
			var $ele = $(ele) || $('body');
			//  遍历页面中，所有符合条件的input 输入类型控件，eg：<input type="..." column="columnA"/>
			$ele.find("input").each(function(i, e) {
				if(typeof($(e).attr("column")) != "undefined") {
					data["" + $(e).attr('column')] = $(e).val();
				}
			});
			//  遍历页面中，所有符合条件的select 输入类型控件，eg：<select column="columnA">...</select>
			$ele.find("select").each(function(i, e) {
				if(typeof($(e).attr("column")) != "undefined") {
					data["" + $(e).attr('column')] = $(e).val();
				}
			});
	
			$ele.find("textarea").each(function(i, e) {
				if(typeof($(e).attr("column")) != "undefined") {
					data["" + $(e).attr('column')] = $(e).val();
				}
			});
			return data;
		},
		alert: function(params) {
			//title, msg, fun, isConfirm, icon
			var def = {
				title: '提示',
				msg: '内容',
				fn: null,
				isConfirm: false,
				icon: false
			};
			params = $.extend(def, params, {});
			var classes = params.isConfirm ? 'cube-dialog-confirm' : 'cube-dialog-alert',
				btnHtml = params.isConfirm ? '<a href="javascript:;" class="cube-dialog-btn border-top-1px">取消</a>' : '',
				iconHtml = params.icon ? '<p class="cube-dialog-icon"><i class="cubeic-alert"></i></p>' : '';
			enterclass = 'cube-dialog-fade-enter',
				leaveclass = 'cube-dialog-fade-leave',
				$container = $('<div class="cube-popup cube-dialog"><div class="cube-popup-mask"></div> <div class="cube-popup-container cube-popup-center"><div class="cube-popup-content"><div class="cube-dialog-main"><div class="' + classes + '">' + iconHtml + '<h2 class="cube-dialog-title"><p class="cube-dialog-title-def">' + params.title + '</p></h2> <div class="cube-dialog-content"><div class="cube-dialog-content-def"><p>' + params.msg + '</p></div></div><div class="cube-dialog-btns border-right-1px">' + btnHtml + '<a href="javascript:;" class="cube-dialog-btn border-top-1px cube-dialog-btn_highlight sure">确定</a></div></div></div></div></div></div>');
	
			$container.find('.cube-dialog-btn').click(function() {
				hide();
				if($(this).hasClass('sure')) params.fn && params.fn();
			});
	
			$container[0].addEventListener('webkitAnimationEnd', function() {
				$container.hasClass(leaveclass) && $container.remove();
			});
	
			show();
	
			function show() {
				$container.addClass(enterclass).removeClass(leaveclass);
				$('body').append($container);
			}
	
			function hide() {
				$container.removeClass(enterclass).addClass(leaveclass);
			}
		},
		showActionSheet: function(params) {
			var def = {
				title: '请选择',
				data: [],
				fn: null
			};
			params = $.extend(def, params, {});
	
			var html = '',
				itemclass = 'cube-action-sheet-item',
				cancelclass = 'cube-action-sheet-cancel',
				enterclass = 'cube-action-sheet-fade-enter',
				leaveclass = 'cube-action-sheet-fade-leave';
			params.data.forEach(function(item, index) {
				html += '<li class="cube-action-sheet-item border-bottom-1px">' + item + '</li>';
			});
			var $container = $('<div class="cube-popup cube-action-sheet"><div class="cube-popup-mask"></div> <div class="cube-popup-container"><div class="cube-popup-content"><div class="cube-action-sheet-panel cube-safe-area-pb"><h1 class="cube-action-sheet-title border-bottom-1px">' + params.title + '</h1> <div class="cube-action-sheet-content"><ul class="cube-action-sheet-list">' + html + '</ul></div> <div class="cube-action-sheet-space"></div> <div class="cube-action-sheet-cancel"><span>取消</span></div></div></div></div></div>');
	
			$container[0].addEventListener('webkitAnimationEnd', function() {
				$container.hasClass(leaveclass) && $container.remove();
			});
	
			$container.find('.' + cancelclass).click(hide);
	
			params.maskClose && $container.find('.' + itemclass).click(function(e) {
				var $this = $(this),
					$index = $this.index();
				hide();
				params.fn && params.fn(params.data[$index], $index);
			});
	
			$('body').append($container.addClass(enterclass).removeClass(leaveclass));
	
			function hide() {
				$container.removeClass(enterclass).addClass(leaveclass);
			}
		},
		toast: function(a, icon) {
			var enterclass = 'cube-toast-fade-enter',
				leaveclass = 'cube-toast-fade-leave',
				iconHtml = icon ? '<i class="cube-toast-icon cubeic-right"></i>' : '';
			var $container = $('<div class="cube-popup cube-toast" ><div class="cube-popup-container cube-popup-center"><div class="cube-popup-content">' + iconHtml + '<div class="cube-toast-tip">' + a + '</div></div></div></div>');
	
			$container[0].addEventListener('webkitAnimationEnd', function() {
				$container.hasClass(leaveclass) && $container.remove();
			});
	
			$('body').append($container.removeClass(leaveclass).addClass(enterclass));
			setTimeout(function() {
				$container.removeClass(enterclass).addClass(leaveclass);
			}, 1500);
		},
		showLoading: function(text) {
			text = text || '加载中..';
			var $container = $('<div id="tools-loading-container" class="cube-popup cube-toast" ><div class="cube-popup-mask" ></div> <div class="cube-popup-container cube-popup-center"><div class="cube-popup-content"><i class="cube-toast-icon" style="display: none;"></i> <div class="cube-loading"><span class="cube-loading-spinners"><i class="cube-loading-spinner"></i><i class="cube-loading-spinner"></i><i class="cube-loading-spinner"></i><i class="cube-loading-spinner"></i><i class="cube-loading-spinner"></i><i class="cube-loading-spinner"></i><i class="cube-loading-spinner"></i><i class="cube-loading-spinner"></i><i class="cube-loading-spinner"></i><i class="cube-loading-spinner"></i><i class="cube-loading-spinner"></i><i class="cube-loading-spinner"></i></span></div> <div class="cube-toast-tip">' + text + '</div></div></div></div>');
			$('body').append($container);
		},
		hideLoading: function() {
			var $container = $('#tools-loading-container');
			$container.remove();
		},
		/**
		 *	cookie操作
		 */
		cookie: function() {
	
			return {
				getCookie: getCookie,
				setCookie: setCookie,
				checkCookie: checkCookie,
				delCookie: delCookie,
				clearCookies: clearCookies,
				editCookie: editCookie
			};
	
			function clearCookies() { //删除所有cookies
				var cookies = document.cookie.split(";");
				for(var i = 0; i < cookies.length; i++) {
					var exp = new Date();
					exp.setTime(exp.getTime() - 1);
					var cookie = cookies[i];
					var eqPos = cookie.indexOf("=");
					var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
					var domain = location.host.substr(location.host.indexOf('.'));
					document.cookie = name +
						"=;expires=" + exp.toGMTString();
				}
			}
	
			function delCookie(name) { //删除cookies   
				var exp = new Date();
				exp.setTime(exp.getTime() - 1);
				var cval = getCookie(name);
				if(cval != null)
					document.cookie = name + "=" + cval + ";expires=" +
					exp.toGMTString();
			}
	
			function getCookie(c_name) { //获取cookie  
				if(document.cookie.length > 0) {
					c_start = document.cookie.indexOf(c_name + "=");
					if(c_start != -1) {
						c_start = c_start + c_name.length + 1;
						c_end = document.cookie.indexOf(";", c_start);
						if(c_end == -1) {
							c_end = document.cookie.length
						}
						return unescape(document.cookie.substring(c_start, c_end))
					}
				}
				return ""
			}
	
			//修改cookie的值
			function editCookie(name, value, expiresHours) {
				var cookieString = name + "=" + escape(value);
				if(expiresHours > 0) {
					var date = new Date();
					date.setTime(date.getTime() + expiresHours * 1000); //单位是毫秒
					cookieString = cookieString + ";expires=" + date.toGMTString();
				}
				document.cookie = cookieString;
			}
	
			function setCookie(c_name, value, expiredays) { //设置cookie  
				var exdate = new Date();
				exdate.setDate(exdate.getTime() + expiredays * 1000);
				document.cookie = c_name +
					"=" +
					escape(value) +
					((expiredays == null) ? "" : ";expires=" +
						exdate.toGMTString());
			}
	
			function checkCookie(name) { //检测cookie是否存在  
				var username = getCookie(name);
				if(username != null && username != "") {
					alert('Welcome again ' + username + '!');
				} else {
					username = prompt('Please enter your name:', "");
					if(username != null && username != "") {
						setCookie('username', username, 365);
					}
				}
			}
		},
		/**
		 * 发送验证码功能
		 * @param
		 * 	__this: 发送验证码按钮,必须是input
		 * 	params: {
		 * 		ccokiename cookie名称',
		 * 		disabledcolor 不能点击按钮的背景
		 * 		color 发送按钮的颜色
		 * 		disabledtext 不能点击按钮的提示文字
		 * 		text 发送按钮的文字
		 * 		Number 发送验证码之前需要验证的手机号
		 * 		time cookie时间默认60秒
		 * 	}
		 * @return function checkIsSendding 对外暴露接口
		 * 	
		 */
		sendSms: function(__this, params) {
			var DEFAULT = {
				cookiename: 'time', //cookiename
				disabledcolor: '#ddd', //按钮失效颜色
				color: '#f7cd4a', //按钮自身颜色
				disabledtext: '重新发送', //按钮失效后文字提示
				text: '获取验证码', //按钮文字
				number: '', //验证的手机号码
				time: 60, //倒计时时间（秒）
				mode: 1
			};
			var tool = Tools.cookie();
			var _this = this;
	
			this.params = $.extend({}, DEFAULT, params);
	
			$(__this).click(function() {
				if(_this.params.number) {
					var value = $(_this.params.number).val();
					var reg = /^1[34578]\d{9}$/
					if($.trim(value) === '' || !reg.test(value)) {
						if(_this.params.mode == 1) {
							Tools.toast('手机号码格式不正确!');
						} else {
							Tools.alert({
								msg: '手机号码格式不正确!'
							});
						}
						return;
					}
				}
				_this.sendCode($(this));
			});
	
			var countdown;
			_this.settime = function(obj) {
				countdown = tool.getCookie(_this.params.cookiename);
				if(countdown == 0) {
					obj.removeAttr("disabled");
					obj.css('background-color', _this.params.color).val(_this.params.text);
					return;
				} else {
					obj.attr("disabled", true).css('background-color', _this.params.disabledcolor);
					obj.val(_this.params.disabledtext + "(" + countdown + "秒)");
					countdown--;
					tool.editCookie(_this.params.cookiename, countdown, countdown + 1);
				}
				setTimeout(function() {
					_this.settime(obj)
				}, 1000) //每1000毫秒执行一次
			}
	
			_this.sendCode = function(obj) {
				tool.setCookie(_this.params.cookiename, _this.params.time, _this.params.time);
				_this.settime(obj); //开始倒计时
	
				if(_this.params.ajax) {
					_this.params.ajax(obj);
				}
			}
	
			_this.checkIsSendding = function() {
				if(tool.getCookie(_this.params.cookiename) > 0) {
					_this.settime($(__this));
				}
			}
	
			_this.checkIsSendding();
	
			function isMobile(value) {
				var reg = /^1[34578]\d{9}$/
				if(!reg.test(value)) {
					return false;
				}
			}
		},
		/**
		 * 将日期格式化成指定格式的字符串
		 * @param date 要格式化的日期，不传时默认当前时间，也可以是一个时间戳
		 * @param fmt 目标字符串格式，支持的字符有：y,M,d,q,w,H,h,m,S，默认：yyyy-MM-dd HH:mm:ss
		 * @returns 返回格式化后的日期字符串
		 */
		formatDate: function(date, fmt) {
			date = date == undefined ? new Date() : date;
			date = typeof date == 'number' ? new Date(date) : date;
			fmt = fmt || 'yyyy-MM-dd HH:mm:ss';
			var obj = {
				'y': date.getFullYear(), // 年份，注意必须用getFullYear
				'M': date.getMonth() + 1, // 月份，注意是从0-11
				'd': date.getDate(), // 日期
				'q': Math.floor((date.getMonth() + 3) / 3), // 季度
				'w': date.getDay(), // 星期，注意是0-6
				'H': date.getHours(), // 24小时制
				'h': date.getHours() % 12 == 0 ? 12 : date.getHours() % 12, // 12小时制
				'm': date.getMinutes(), // 分钟
				's': date.getSeconds(), // 秒
				'S': date.getMilliseconds() // 毫秒
			};
			var week = ['天', '一', '二', '三', '四', '五', '六'];
			for(var i in obj) {
				fmt = fmt.replace(new RegExp(i + '+', 'g'), function(m) {
					var val = obj[i] + '';
					if(i == 'w') return(m.length > 2 ? '星期' : '周') + week[val];
					for(var j = 0, len = val.length; j < m.length - len; j++) val = '0' + val;
					return m.length == 1 ? val : val.substring(val.length - m.length);
				});
			}
			return fmt;
		},
		/**
		 * 给输入框设置最大长度
		 * 调用方法： onInput="Tools.checkTextLength(this, 10)"
		 */
		checkTextLength: function(obj, length) {
			var ele = $(obj);
			ele.get(0).oninput = function() {
				if(this.value.length >= length) {
					ele.val(this.value.substr(0, length));
					Tools.toast('您最多输入字数为' + length);
				}
			};
		},
		/** 
		 * 解决输入框弹起被顶起
		 */
		wResize: function(eles, size) {
			var $window = $(window),
				$eles = $(eles),
				wh = $window.height();
			$window.resize(function() {
				var thisHeight = $(this).height();
				if($window - thisHeight > 50) {
					$eles.css('bottom', 1000);
				} else {
					$eles.css('bottom', size);
				}
			});
		},
		//发送ajax请求
		post: function(url, params, fn, showloading, isdebug) {
			showloading && Tools.showLoading();
			if(isdebug) {
				setTimeout(function() {
					showloading && Tools.hideLoading();
					fn && fn();
				}, 1000);
			} else {
				$.post(url, params, function(data) {
					showloading && Tools.hideLoading();
					fn && fn(JSON.parse(data));
				});
			}
		},
		//懒加载
		lazyload: function(ele) {
			$("img.lazyload").lazyload({
				effect: "fadeIn",
				container: ele ? $(ele) : window
			});
		},
		infinite: function(ele, callback) {
			var $window = $(window);
			var $ele = ele ? $(ele) : $(window);
			var wh = $window.height();
			var setLoadding = false;
			$ele.scroll(function() {
				var $this = $(this);
				var scrollTop = $this.scrollTop();　　
				var scrollHeight = $(ele)[0].scrollHeight;
				var windowHeight = $window.height();
	
				if(scrollTop + windowHeight == scrollHeight && !setLoadding) {
					var df = $.Deferred();
					setLoadding = true;
					df.done(function() {
						setLoadding = false;
					})
					callback && callback(df);
				}
			});
	
			return setLoadding;
		},
		showModal: function(container, enterClass, leaveClass) {
			enterClass = enterClass || 'cube-dialog-fade-enter';
			leaveClass = leaveClass || 'cube-dialog-fade-leave';
			var $container = $(container);
			$container[0].addEventListener('webkitAnimationEnd', function() {
				$container.hasClass(leaveClass) && $container.hide().removeClass(leaveClass);
			});
	
			function show() {
				$container.show().addClass(enterClass).removeClass(leaveClass);
			}
	
			function hide() {
				$container.removeClass(enterClass).addClass(leaveClass);
			}
	
			return {
				show: show,
				hide: hide
			}
		}
	}
	if(typeof define === 'function' && define.amd) {
		define(['jquery'], function($) {
			return Tools
		})
	} else {
		window.Tools = tools;
	}
})()
