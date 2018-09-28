/*
s * 开发者控制台的启动模块
 * 入口方法为 start
 * written by Hongcun
 */
define(function(require, exports, module){
	require("lib/jquery.form.js");
	require("lib/jquery.validate.js");
	require("lib/jquery.blockUI.js");
	
	//因调用live方法，引入jquery1.7
	var $ = require('jquery17');
	   $A = {}; //定义window.$A;
				
		function _isType(type){
			return function(obj){
				return Object.prototype.toString.call(obj) === "[object " + type + "]";
			}
		}
		
		var _isObject = _isType("Object");
		var _isNumber = _isType("Number");
		var _isString = _isType("String");
		var _isArray = Array.isArray || _isType('Array');
		var _isFunction = _isType("Function");
		var _isUndefined = _isType("Undefined");
		var _isNull = _isType("Null");
		
		var _cloneObject = function(o){
			var e = {};
			for(var name in o){
				if(_isObject(o[name])){
					e[name] = _cloneObject(o[name]);
				}else{
					e[name] = o[name];
				}
			}
			return e;
		}
		
		var _escapeHtml = function(data){
			var escapMap = {
				"<": "&#60;",
		        ">": "&#62;",
		        '"': "&#34;",
		        "'": "&#39;",
		        "&": "&#38;"
			};
			return String(data).replace(/&(?!#[\w]+;)|[<>"']/g, function(s){
				return escapeMap[s];
			});
		}
		
		var _getHash = function(url){
			//为了兼容低版本的IE， 此处不使用window.location.hash
			url = url || document.URL;
			return '#' + url.replace(/^[^#]*#?(.*)$/, '$1' );
		}
			
			
		//定义服务工厂service ,使用方法如: 获取路由服务 $A.service('router')
		$A.service = (function(){
			//定义私有变量
			var services = {};
			services.wrapper = function(){
				//不允许当函数调用
				if(!(this instanceof services.wrapper)) return null;
				
				//获取容器
				this.getWrapper = function(id){
					this.id = id;
					return this;
				};
				
				//获取当前对象指向的容器元素
				this.getCurElement = function(){
					var e;
					if(!_isUndefined(this.id)){
						e = document.getElementById(this.id);
					}else{//默认选取body容器
						e = document.getElementsByTagName("body")[0];
					}
					return e;
				};
				
				//依次创建子容器
				this.appendChildWrapper = function(id){
					var parent = this.getCurElement();
					
					var child = document.createElement("div");
					child.setAttribute("id", id);
					parent.appendChild(child);
					
					var childWrapper = _cloneObject(this);
					childWrapper.id = id;
					
					return childWrapper;
				};
				
				this.loadCss = function(css){
					if(_isNull(css) || _isUndefined(css)) return this;
					
					if(_isString(css)){
						var cssarr = css.split("|");
						for(var i=0; i<cssarr.length; i++){
							var csse = document.createElement("link");
							csse.setAttribute("type", "text/css");
							csse.setAttribute("rel", "stylesheet");
							csse.setAttribute("href", cssarr[i]+"?"+Math.random());
							document.head.appendChild(csse);
						
						}
					}else if(_isObject(css) || _isArray(css)){
						for(var i in css){
							var csse = document.createElement("link");
							csse.setAttribute("type", "text/css");
							csse.setAttribute("rel", "stylesheet");
							csse.setAttribute("href", css[i]+"?"+Math.random());
							document.head.appendChild(csse);
						}
					}
					
					return this;
				};
				
				//向容器中依次添加子模块
				this.loadWidget = function(obj){
					if(!_isObject(obj)) return this;
					
					if(!_isUndefined(obj.id) && _isString(obj.id)){
						var parent = this.getCurElement();
						var child = document.getElementById(obj.id);
						if(!child){
							 child = document.createElement("div");
							 child.setAttribute("id", obj.id);
							 parent.appendChild(child);
						}
						
						if(!_isUndefined(obj.callbefore) && _isFunction(obj.callbefore)){
							obj.callbefore(child);
						}
						
						var tplstr = "";
						//加载css
						if(!_isUndefined(obj.css)){
							this.loadCss(obj.css);
						}
						
						if(_isObject(obj.tpl) && ("id" in obj.tpl)){
							var tplobj = document.getElementById(obj.tpl.id);
							var css = tplobj.getAttribute("css");
							this.loadCss(css);
							tplstr = tplobj.innerHTML;
						}else if(_isString(obj.tpl)){
							tplstr = obj.tpl;
						}
						
						
						var callback = function(data){
							var render = template.compile(tplstr);
							child.innerHTML = render(data);
							
							
							if(!_isUndefined(obj.callback) && _isFunction(obj.callback)){
								obj.callback.call(child);
							}
						}
						
						//设置data
						var data = {};
						if(!_isUndefined(obj.data) && _isObject(obj.data)){
							data = obj.data
						
						}else if(!_isUndefined(obj.getdata) && _isFunction(obj.getdata)){
							data = obj.getdata();
						}
						
						var render = template.compile(tplstr);

						child.innerHTML = render(data);
							
							
						if(!_isUndefined(obj.callback) && _isFunction(obj.callback)){
							obj.callback.call(child);
						}
						
						
					
					}
					return this;
				};
				
				this.isEmpty = function(){
					var parent = this.getCurElement();
					return parent.firstChild == null;
				}
				
				this.removeAll = function(){
					var parent = this.getCurElement();
					while (parent.firstChild) {
						  parent.removeChild(parent.firstChild);
					}
					return this;
				}
			
			}
			
			//request服务
			services.request = function(){
				//设置encodeURIComponent之外需要ascll转义的特殊字符
				this.escapeChar = {
					'!': '%21' // '!'定义hash中参数的开始
				};
				
				//记录reffer
				this.reffer = "";
				
				//重写encodeURIComponent函数
				// a!%a  -> a%21%25a 
				this.fixedEncodeURIComponent = function(str){
					if(!_isString(str) || str.length == 0) return '';
					
					var regArr = new Array();
					for(var c in this.escapeChar){
						regArr.push(c);
					}
					
					var regExp = new RegExp(regArr.join('|'), 'g');
					var self = this;
					return encodeURIComponent(str).replace(regExp, function(s){
						return self.escapeChar[s];
					});
				}
				
				//重写decodeEncodeURIComponent
				// a%21%25a -> a!%a 
				this.fixedDecodeURIComponent = function(str){
					if(!_isString(str) || str.length == 0) return '';
					
					var regArr = new Array();
					for(var c in this.escapeChar){
						regArr.push(this.escapeChar[c]);
					}
					
					var regExp = new RegExp(regArr.join('|'), 'g');
					var self = this;
					return decodeURIComponent(str).replace(regExp, function(s){
						for(var c in self.escapeChar){
							if(s == self.escapeChar[c]) return c;
						}
						return '';
					});
				}
				
				//返回如: #app/reg!appname=xixihaah
				this.getHash = function(url){
					return _getHash(url);
				};
				
				this.changeHash = function(hash){
					hash = hash.replace(/^#/, "");
					window.location.hash = hash;
				};
				
				this.refreshHash = function(){
					var hash = this.getHash();
					hash = hash.replace(/[&|!]refresh=(.*)?/g, "");
					if(hash.indexOf("!") != -1){
						hash += "&refresh=" + Math.random();
					}else{
						hash += "!refresh=" + Math.random();
					}
					
					window.location.hash = hash;
				};
				
				//返回如: app/reg
				this.getPath = function(url){
					url = url || document.URL;
					return url.replace(/^[^#]*#?(.*)!?.*$/, '$1');;
				}
				//返回如: appname=xixihaha
				this.getQueryString = function(){
					var hash = this.getHash();
					var temp;
					if(hash != ""){
						temp = hash.split("!");
					}
					return temp.length == 2 ? temp[1] : "";
				};
				
				//传入数组，合成请求字符串
				this.buildQueryString = function(arr){
					var queryArr = new Array();
					for(var key in arr){
						//! 字符默认在encodeURIComponent函数中不转义 需要再加转义
						key = this.fixedEncodeURIComponent(key);
						arr[key] = this.fixedEncodeURIComponent(arr[key]);
						queryArr.push(key + "=" + arr[key]);
					}
					return queryArr.join("&");
				};
				
				//返回如: xixihaha
				this.getParameter = function(key){
					var queryString = this.getQueryString();
					if(queryString != ""){
						var regexp = new RegExp("(^|&|\\!)"+ key +"=([^&]*)(&|$)");
						var match = regexp.exec(queryString);
						if(match){
							return this.fixedDecodeURIComponent(match[2]);
						}
					}
					return "";
				};
				
				
				
			}
			
			
			//单例router
			services.router = {
				//路由表
				table: {
					path: [], 
					ctrl:[]
				},
				
				//打印路由表
				printTable: function(){
				
				},
				
				//注册路由
				when: function(path, ctrl){
					this.table.path.push(path);
					this.table.ctrl.push(ctrl);
					return this;
				},
				//注册默认路由
				otherwise: function(ctrl){
					this.table.path.unshift("^default$");
					this.table.ctrl.unshift(ctrl);
					return this;
				},
				
				
				//根据hash重新路由或无缝刷新
				route: function(hash){
					hash = hash || _getHash();
					//if(_getHash() !== hash){ //及时切换当前hash
						//window.location.hash = hash;
					//}
					
					
					loop_1:
					for(var i in this.table.path){
						
						var path = this.table.path[i];
						var ctrl;
						if(_isString(path)){
							var regx = new RegExp(path, "gi");
							if(regx.test(hash)){
								ctrl = this.table.ctrl[i];
								break loop_1;
							}
						}else if(_isArray(path) || _isObject(path)){
							for(var j in path){
								if(!_isString(path[j]))continue;
								var regx = new RegExp(path, "gi");
								if(regx.test(hash)){
									ctrl = this.table.ctrl[i];
									break loop_1;
								}
							}
							
						}else{
							continue;
						}				
						
					}
					
					if(_isUndefined(ctrl)){ //load default ctrl
						ctrl = this.table.ctrl[0];
					}
						
					if(_isString(ctrl)){
						this.loadctrl(ctrl);
					}else if(_isArray(ctrl) || _isObject(ctrl)){
						for(var j in ctrl){
							this.loadctrl(ctrl[j]);
						}
					}
					return this;
				},
				
				//加载控制器,并默认执行init初始化
				loadctrl: function(ctrl){
					var self = this;
					require.async(ctrl, function(o){
						//调用销毁方法
						if(self.prevObj != null && 'destroy' in (self.prevObj)){
							self.prevObj.destroy();
						}
						//alert(self.prevObj === o);
						self.prevObj = o;
						if(_isObject(o) && ('init' in o)){
								o.init();
						}
					});
					return this;
				},
				
				//保存上一个控制器实例，以便销毁
				prevObj: null
			};
			
			
			//单例cookie服务
			services.cookie = function(){
				if(_isObject(services.cookie.self)) return services.cookie.self;
				//按需加载jquery.cookie插件
				require('lib/jquery.cookie');
				
				return services.cookie.self = {
					getCookie: $.cookie,
					setCookie: $.cookie,
					removeCookie: $.removeCookie
				}
			}
			
			
			//单例session服务,session保存前端全局数据
			services.session = {
				start: function(){
				
				},
				getSession: function(key){
				
				}
			}
			
			console.log($);
			//单例http服务
			services.http = {
			
				ajax: $.ajax,
				
				get: function(url, config, async){
					$.ajax($.extend(
						{url: url},
						config,
						{async: async}
					));
				},
				
				post: function(url, data, config, async){
					$.ajax($.extend(
						{url: url},
						{data: data},
						config,
						{async: async}
					));
				},
				
				jsonp: function(url, config, async){
					
				}
			};
			
			
			
			return function(type){ //返回服务工厂
					if(type in services){
						if(_isObject(services[type])){
							return services[type];
						}else if(_isFunction(services[type])){
							return new services[type]();
						}else{
							return null;
						}
					}else{
						return null;
					}
				};
			
		})();
	
	
		//以下待删除	
		
		$A.loadScreen = function(dataPath, tplPath, container, cacheAble){
			var data = dataPath.length > 0 ? _loadData(dataPath) : {};
			var tpl = tplPath.length > 0 ? _loadTpl($_CONFIG['tplbase'] + "screen/" + tplPath) : "";
			var render = template.compile(tpl);
			var domstr = render(data);
			$('#' + container).html(domstr);
		}

		$A.loadWidget = function(dataPath, tplPath, container, cacheAble){
			var data = dataPath.length > 0 ? _loadData(dataPath) : {};
			var tpl = tplPath.length > 0 ? _loadTpl($_CONFIG['tplbase'] + "widget/" +tplPath) : "";
			var render = template.compile(tpl);
			var domstr = render(data);
			$('#' + container).html(domstr);
		}

		function _loadTpl(path){
			var tpl;
			$.ajax({
				url: path,
				async: false,
				success: function(res){
					tpl = res;
				},
				error: function(xhr, status, error){
					alert("加载模板失败，请重试! 状态码: " + status + "; 错误信息: " + error);
				}
			});
			return tpl;
		}

		function _loadData(path){
			var data;
			$.ajax({
				url: path,
				async: false,
				success: function(res){
					data = res;
				},
				error: function(xhr, status, error){
	
					alert("加载数据失败，请重试! 状态码: " + status + "; 错误信息: " + error);
				}
			});
			return data;
		}
	

	exports.start = function (){
		
		//使用路由服务
		var router = $A.service('router');
		var request = $A.service('request');
		//注册路由表
		with(router){
			when("^#?(!.*)?$", "modules/app/info");
			when("^#edit(!.*)?$", "modules/app/edit");
			when("^#mobile(!.*)?$", "modules/app/mobile");
			when("^#mobile/create(!.*)?$", "modules/app/mobileCreate");
			when("^#inner(!.*)?$", "modules/app/inner");
			when("^#inner/create(!.*)?$", "modules/app/innerCreate");
			when("^#outter(!.*)?$", "modules/app/outter");
			when("^#outter/create(!.*)?$", "modules/app/outterCreate");
			//新增桌面应用类型 #pc
			when("^#pc(!.*)?$", "modules/app/pc");
			when("^#pc/create(!.*)?$", "modules/app/pcCreate");
			when("^#serviceList(!.*)?$", "modules/app/serviceList");
			when("^#applyList(!.*)?$", "modules/app/applyList");
			when("^#widgetList(!.*)?$", "modules/app/widgetList");
			when("^#creatWidget(!.*)?$", "modules/app/createWidget");
			when("^#editWidget(!.*)?$", "modules/app/editWidget");
			
			when("^#test(!.*)?$","modules/app/test");
			when("^#test/addinfo(!.*)?$","modules/app/testAddinfo");
			when("^#searchService(!.*)?$", "modules/app/searchService");
			when("^#serviceInfo(!.*)?$","modules/app/serviceInfo");
			when("^#guide(!.*)?$","modules/app/appGuide");
			otherwise("modules/app/info");
		}
		
		var documentMode = document.documentMode;
		//IE8虽然在兼容模式下有onhashchange事件，但不起作用
		if("onhashchange" in window && (_isUndefined(documentMode) || documentMode > 7)){
			window.onhashchange = function(){
				global();
				var hash =  request.getHash();
				router.route(hash);
			};			
		}else{
			
			//TODO: 此处必须要兼容IE低版本,暂时采用定时器模拟监听hashchange,最好使用子iframe方法
			
			var thash = request.getHash();
			var t = setInterval(function(){
				var chash = request.getHash();
				if(chash != thash){
					global();
					thash = chash;
					router.route(thash);
				}
			}, 100);
			
			//alert("浏览器不支持onhashchange");
		}
		
		
		//执行全局模块
		global();
		//进行路由
		router.route();
		
		//end
		
		
		//var wrapper = $A.service("wrapper");
		//wrapper.appendChildWrapper("asd").loadWidget("aaa", "xixihaha").loadWidget("test", "<h1><%=#title %></h1>", {title: "<h2>g<\/h2>"});
	
		//var testStr = request.fixedEncodeURIComponent("a!%a");
		//执行Hash
		//request.refreshHash();
	}
	
	
	//各个模块公用程序
	function global(){
		var request = $A.service('request');
		var hash = request.getHash();
		//$("a.menu-item").removeClass("on");
		$("a.menu-item").each(function(){
			if($(this).hasClass("on")){
				$(this).removeClass("on");
			}
		});
		
		if(hash.match(/^#inner/)){
			$("a.menu-item[href=#inner]").addClass("on");
		}else if(hash.match(/^#outter/)){
			$("a.menu-item[href=#outter]").addClass("on");
		}else if(hash.match(/^#pc/)){
			$("a.menu-item[href=#pc]").addClass("on");
		}else if(hash.match(/^#mobile/)){
			$("a.menu-item[href=#mobile]").addClass("on");
		}else if(hash.match(/^#applyList/)){
			$("a.menu-item[href=#applyList]").addClass("on");
		}else if(hash.match(/^#serviceList/)){
			$("a.menu-item[href=#serviceList]").addClass("on");
		}else if(hash.match(/^#creatWidget/)){
			$("a.menu-item[href=#creatWidget]").addClass("on");
		}else if(hash.match(/^#widgetList/)){
			$("a.menu-item[href=#widgetList]").addClass("on");
		}else if(hash.match(/^#test/)){
			$("a.menu-item[href=#test]").addClass("on");
		}else if(hash.match(/^#guide/)){
		}else{
			$("a.menu-item[href=#]").addClass("on");
		}
	}

});

