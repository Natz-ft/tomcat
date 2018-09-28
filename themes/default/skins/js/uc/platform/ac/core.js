jQuery.fn.extend({
	/**
	 * 分页控件
	 * 用法：$(express).ui_paper(option);
	 * 每次显示10个页码，显示当前页的前5页和后5页
	 * 点击分页按钮时，转向到url指定的页面，并通过get方式传pagesize和index两个参数
	 * 
	 * @param option {
	 * 	pagesize：每一页显示的数量
	 * 	current：当前页
	 * 	count：数据总条数
	 * 	url：点击按钮后转向的url
	 * 	ajaxOption { ：通过ajax方式引用页面时的操作参数
	 * 		content：异步获取的内容存放的容器
	 * 		callback：异步获取到内容后的回调函数
	 * 	}
	 * }
	 */
	ui_paper: function(option) {
		this.each( function() {
			var thisTag = $(this);
			var opt = {pagesize: 10, current: 1, count: 0, lp: 5, rp: 5, model: {num: true, ln: true, select: true}};
			$.copyValue(option, opt);
			
			var max = parseInt((opt.count - 1) / opt.pagesize + 1);
			var first, prep, next, last, nums, select, s, e;
			
			var fillTags = function() {
				
				var tags = "";
				var current_index = 1;
				
				//tags += getButton("第一页", "ui_paper_first", getUrl(1));
				if(opt.model.ln) {
					current_index = opt.current - 1;
					tags += getButton("上一页", "ui_paper_prep", getUrl(current_index),opt.fun,current_index);
				}
				
				// 取得要显示那些页码，默认为当前页的左右5页
				s = parseInt(opt.current) - opt.lp;
				e = parseInt(opt.current) + opt.rp;
				if(s < 1) e -= s;
				if(e > max) s -= e - max;
				s = Math.max(1, s);
				e = Math.min(e, max);
				
				if(opt.model.num) {
					for(var i = s; i <= e; i++) {
						current_index = i;
						tags += getButton(i, "ui_paper_num", getUrl(current_index),opt.fun,current_index);
					}
				}
				if(opt.model.ln) {
					current_index = opt.current + 1;
					tags += getButton("下一页", "ui_paper_next", getUrl(current_index),opt.fun,current_index);
				}

				if(opt.model.select) {
					tags += "<select class='select ui_paper_select'>";
					for(i = 1; i <= max; i++) {
						if(i === opt.current) 
							tags += "<option value='" + i + "' selected>第" + i + "页</option>";
						else
							tags += "<option value='" + i + "'>第" + i + "页</option>";
					}
					tags += "</select>";
				}
				
				thisTag.empty();
				thisTag.append(tags);
				
				first = thisTag.find(".ui_paper_first");
				prev = thisTag.find(".ui_paper_prep");
				next = thisTag.find(".ui_paper_next");
				last = thisTag.find(".ui_paper_last");
				nums = thisTag.find(".ui_paper_num");
				select = thisTag.find(".ui_paper_select");
			};
			
			var setStatus = function() {
				if(opt.current <= 1) {
					first.addClass("disabled");
					prev.addClass("disabled");
				}
				if(opt.current >= max) {
					next.addClass("disabled");
					last.addClass("disabled");
				}
				nums.removeClass("selected");
				if(nums.eq(parseInt(opt.current) - s)) 
					nums.eq(parseInt(opt.current) - s).addClass("selected");
				
				select.unbind("change");
				select.bind("change", function(e) {
					var index = select.val();
					if(!opt.fun){
						document.location.href = getUrl(index);
					}else{
						pageHandler(window[opt.fun],parseInt(index));
					}
				});
			};
			
			var optionmethod = function() {
				if(opt.ajaxOption || opt.callbackOption) {
					var alist = thisTag.find("a");
					alist.bind("click", function(e) {
						e.preventDefault();
						var a = $(e.currentTarget);
						var href = a.attr("href");
						loadUrl(href);
					});
					var selectlist = thisTag.find("select");
					selectlist.unbind("change");
					selectlist.bind("change", function(e){
						var url = getUrl(select.val());
						loadUrl(url);
					});
				}
			};
			
			var loadUrl = function(url) {
				if(url && url !== "#") {
					if(opt.ajaxOption) {
						opt.ajaxOption.url = url;
						$.ajaxLoad(opt.ajaxOption);
					} else if(opt.callbackOption){
						opt.callbackOption(url);
					}
					var obj = $.paramSplit(url);
					if(obj.index) {
						opt.current = parseInt(obj.index);
					}
					if(obj.pagesize) {
						opt.pagesize = parseInt(obj.pagesize);
					}
					start();
				}
			};
			
			var getButton = function(label, clazz, url,fun,index) {
				if(!fun){
					return "<a href='" + url + "' class='button " + clazz + "'>" + label + "</a>";
				}else{
					var count = opt.count;
					var pagesize = opt.pagesize;
					return "<a href='javascript:pageHandler(" + fun + "," + index + ")" + "' class='button " + clazz + "'>" + label + "</a>";
//					return "<a href='javascript:" + fun + "(getDataHandler(" + pagesize + "," + index + "," + count + "))" + "' class='button " + clazz + "'>" + label + "</a>";
				}
			};
			
			pageHandler = function(fun,index){
				var data = getDataHandler(opt.pagesize,index,opt.count);
				fun(data); 
				opt.current = index;
				start();
			};
			
			/**
			 * 组装回调给外部的page对象
			 */
			var getDataHandler = function(pagesize,current,count){
				var data = {};
				data.pagesize = pagesize;
				data.index = current;
				data.count = count;
				return data;
			};
			
			var getUrl = function(index) {
				var url = opt.url;
				if(url && (url.length > 0)){
					//if(url.indexOf("?") != -1) url += "&";
					if(url.indexOf("?") != -1 || url.indexOf("!") != -1) url += "&";
					else url += "?";
					url += "pagesize=" + opt.pagesize + "&index=" + index;
				}
				return url;
			};
			
			var start = function() {
				fillTags();
				setStatus();
				optionmethod();
			};
			start();
		});
		return this;
	}
});

jQuery.extend ({
	copyValue: function(source, target) {
		for(var s in source) {
			target[s] = source[s];
		}
	},
	ajaxLoad: function(option) {
		var opt = {};
		$.copyValue(option, opt);
		
		opt.url = $.ajaxUrl(opt.url);
		
		var callback = function(data) {
			if(opt.callback) {
				opt.callback(data);
			}
			if(opt.content) {
				var content = $(opt.content);
				content.empty();
				content.append(data);
			}
		};
		opt.success = function(data) {
			callback(data);
		};

		$.ajax(opt);
	},
	ajaxUrl: function(url) {
		if(url.indexOf("?") != -1) {
			url += "&_view=async";
		} else {
			url += "?_view=async";
		}
		return url;
	},
	paramSplit: function(url) {
		var obj = new Object();
		var str = url.split("?")[1];
		if(str) {
			var params = str.split("&");
			for(var i=0; i < params.length; i++) {
				var kv = params[i].split("=");
				obj[kv[0]] = kv[1];
			}
		}
		return obj;
	}
});


jQuery.fn.showLoading = function(options) {

	var indicatorID;
	var settings = {
		'addClass' : '',
		'beforeShow' : '',
		'afterShow' : '',
		'hPos' : 'center',
		'vPos' : 'center',
		'indicatorZIndex' : 5001,
		'overlayZIndex' : 5000,
		'parent' : '',
		'marginTop' : 0,
		'marginLeft' : 0,
		'overlayWidth' : null,
		'overlayHeight' : null
	};

	jQuery.extend(settings, options);

	var loadingDiv = jQuery('<div></div>');
	var overlayDiv = jQuery('<div></div>');

	//
	// Set up ID and classes
	//
	if (settings.indicatorID) {
		indicatorID = settings.indicatorID;
	} else {
		indicatorID = jQuery(this).attr('id');
	}

	jQuery(loadingDiv).attr('id', 'loading-indicator-' + indicatorID);
	jQuery(loadingDiv).addClass('loading-indicator');

	if (settings.addClass) {
		jQuery(loadingDiv).addClass(settings.addClass);
	}

	//
	// Create the overlay
	//
	jQuery(overlayDiv).css('display', 'none');

	// Append to body, otherwise position() doesn't work on Webkit-based browsers
	jQuery(document.body).append(overlayDiv);

	//
	// Set overlay classes
	//
	jQuery(overlayDiv).attr('id',
			'loading-indicator-' + indicatorID + '-overlay');

	jQuery(overlayDiv).addClass('loading-indicator-overlay');

	if (settings.addClass) {
		jQuery(overlayDiv).addClass(settings.addClass + '-overlay');
	}

	//
	// Set overlay position
	//

	var overlay_width;
	var overlay_height;

	var border_top_width = jQuery(this).css('border-top-width');
	var border_left_width = jQuery(this).css('border-left-width');

	//
	// IE will return values like 'medium' as the default border, 
	// but we need a number
	//
	border_top_width = isNaN(parseInt(border_top_width)) ? 0 : border_top_width;
	border_left_width = isNaN(parseInt(border_left_width)) ? 0
			: border_left_width;

	var overlay_left_pos = jQuery(this).offset().left
			+ parseInt(border_left_width);
	var overlay_top_pos = jQuery(this).offset().top
			+ parseInt(border_top_width);

	if (settings.overlayWidth !== null) {
		overlay_width = settings.overlayWidth;
	} else {
		overlay_width = parseInt(jQuery(this).width())
				+ parseInt(jQuery(this).css('padding-right'))
				+ parseInt(jQuery(this).css('padding-left'));
	}

	if (settings.overlayHeight !== null) {
		overlay_height = settings.overlayWidth;
	} else {
		overlay_height = parseInt(jQuery(this).height())
				+ parseInt(jQuery(this).css('padding-top'))
				+ parseInt(jQuery(this).css('padding-bottom'));
	}

	jQuery(overlayDiv).css('width', overlay_width.toString() + 'px');
	jQuery(overlayDiv).css('height', overlay_height.toString() + 'px');

	jQuery(overlayDiv).css('left', overlay_left_pos.toString() + 'px');
	jQuery(overlayDiv).css('position', 'absolute');

	jQuery(overlayDiv).css('top', overlay_top_pos.toString() + 'px');
	jQuery(overlayDiv).css('z-index', settings.overlayZIndex);

	//
	// Set any custom overlay CSS		
	//
	if (settings.overlayCSS) {
		jQuery(overlayDiv).css(settings.overlayCSS);
	}

	//
	// We have to append the element to the body first
	// or .width() won't work in Webkit-based browsers (e.g. Chrome, Safari)
	//
	jQuery(loadingDiv).css('display', 'none');
	jQuery(document.body).append(loadingDiv);

	jQuery(loadingDiv).css('position', 'absolute');
	jQuery(loadingDiv).css('z-index', settings.indicatorZIndex);

	//
	// Set top margin
	//

	var indicatorTop = overlay_top_pos;

	if (settings.marginTop) {
		indicatorTop += parseInt(settings.marginTop);
	}

	var indicatorLeft = overlay_left_pos;

	if (settings.marginLeft) {
		indicatorLeft += parseInt(settings.marginTop);
	}

	//
	// set horizontal position
	//
	if (settings.hPos.toString().toLowerCase() == 'center') {
		jQuery(loadingDiv)
				.css(
						'left',
						(indicatorLeft + ((jQuery(overlayDiv).width() - parseInt(jQuery(
								loadingDiv).width())) / 2)).toString()
								+ 'px');
	} else if (settings.hPos.toString().toLowerCase() == 'left') {
		jQuery(loadingDiv)
				.css(
						'left',
						(indicatorLeft + parseInt(jQuery(overlayDiv).css(
								'margin-left'))).toString()
								+ 'px');
	} else if (settings.hPos.toString().toLowerCase() == 'right') {
		jQuery(loadingDiv).css(
				'left',
				(indicatorLeft + (jQuery(overlayDiv).width() - parseInt(jQuery(
						loadingDiv).width()))).toString()
						+ 'px');
	} else {
		jQuery(loadingDiv).css('left',
				(indicatorLeft + parseInt(settings.hPos)).toString() + 'px');
	}

	//
	// set vertical position
	//
	if (settings.vPos.toString().toLowerCase() == 'center') {
		jQuery(loadingDiv)
				.css(
						'top',
						(indicatorTop + ((jQuery(overlayDiv).height() - parseInt(jQuery(
								loadingDiv).height())) / 2)).toString()
								+ 'px');
	} else if (settings.vPos.toString().toLowerCase() == 'top') {
		jQuery(loadingDiv).css('top', indicatorTop.toString() + 'px');
	} else if (settings.vPos.toString().toLowerCase() == 'bottom') {
		jQuery(loadingDiv).css(
				'top',
				(indicatorTop + (jQuery(overlayDiv).height() - parseInt(jQuery(
						loadingDiv).height()))).toString()
						+ 'px');
	} else {
		jQuery(loadingDiv).css('top',
				(indicatorTop + parseInt(settings.vPos)).toString() + 'px');
	}

	//
	// Set any custom css for loading indicator
	//
	if (settings.css) {
		jQuery(loadingDiv).css(settings.css);
	}

	//
	// Set up callback options
	//
	var callback_options = {
		'overlay' : overlayDiv,
		'indicator' : loadingDiv,
		'element' : this
	};

	//
	// beforeShow callback
	//
	if (typeof (settings.beforeShow) == 'function') {
		settings.beforeShow(callback_options);
	}

	//
	// Show the overlay
	//
	jQuery(overlayDiv).show();

	//
	// Show the loading indicator
	//
	jQuery(loadingDiv).show();

	//
	// afterShow callback
	//
	if (typeof (settings.afterShow) == 'function') {
		settings.afterShow(callback_options);
	}

	return this;
};

jQuery.fn.hideLoading = function(options) {

	var settings = {};

	jQuery.extend(settings, options);

	if (settings.indicatorID) {
		indicatorID = settings.indicatorID;
	} else {
		indicatorID = jQuery(this).attr('id');
	}

	jQuery(document.body).find('#loading-indicator-' + indicatorID).remove();
	jQuery(document.body)
			.find('#loading-indicator-' + indicatorID + '-overlay').remove();

	return this;
};
/**
 *jQuery easing扩展
 */
jQuery.easing['jswing'] = jQuery.easing['swing'];
jQuery.easing={
	easein:
		function(x,t,b,c,d){return c*(t/=d)*t+b},
	easeinout:
		function(x,t,b,c,d){if(t<d/2)return 2*c*t*t/(d*d)+b;var a=t-d/2;return-2*c*a*a/(d*d)+2*c*a/d+c/2+b},
	easeout:
		function(x,t,b,c,d){return-c*t*t/(d*d)+2*c*t/d+b},
	expoin:
		function(x,t,b,c,d){var a=1;if(c<0){a*=-1;c*=-1}return a*(Math.exp(Math.log(c)/d*t))+b},
	expoout:
		function(x,t,b,c,d){var a=1;if(c<0){a*=-1;c*=-1}return a*(-Math.exp(-Math.log(c)/d*(t-d))+c+1)+b},
	expoinout:
		function(x,t,b,c,d){var a=1;if(c<0){a*=-1;c*=-1}if(t<d/2)return a*(Math.exp(Math.log(c/2)/(d/2)*t))+b;return a*(-Math.exp(-2*Math.log(c/2)/d*(t-d))+c+1)+b},
	bouncein:
		function(x,t,b,c,d){return c-jQuery.easing['bounceout'](x,d-t,0,c,d)+b},
	bounceout:
		function(x,t,b,c,d){if((t/=d)<(1/2.75)){return c*(7.5625*t*t)+b}else if(t<(2/2.75)){return c*(7.5625*(t-=(1.5/2.75))*t+.75)+b}else if(t<(2.5/2.75)){return c*(7.5625*(t-=(2.25/2.75))*t+.9375)+b}else{return c*(7.5625*(t-=(2.625/2.75))*t+.984375)+b}},
	bounceinout:
		function(x,t,b,c,d){if(t<d/2)return jQuery.easing['bouncein'](x,t*2,0,c,d)*.5+b;return jQuery.easing['bounceout'](x,t*2-d,0,c,d)*.5+c*.5+b},
	elasin:
		function(x,t,b,c,d){var s=1.70158;var p=0;var a=c;if(t==0)return b;if((t/=d)==1)return b+c;if(!p)p=d*.3;if(a<Math.abs(c)){a=c;var s=p/4}else var s=p/(2*Math.PI)*Math.asin(c/a);return-(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b},
	elasout:
		function(x,t,b,c,d){var s=1.70158;var p=0;var a=c;if(t==0)return b;if((t/=d)==1)return b+c;if(!p)p=d*.3;if(a<Math.abs(c)){a=c;var s=p/4}else var s=p/(2*Math.PI)*Math.asin(c/a);return a*Math.pow(2,-10*t)*Math.sin((t*d-s)*(2*Math.PI)/p)+c+b},
	elasinout:
		function(x,t,b,c,d){var s=1.70158;var p=0;var a=c;if(t==0)return b;if((t/=d/2)==2)return b+c;if(!p)p=d*(.3*1.5);if(a<Math.abs(c)){a=c;var s=p/4}else var s=p/(2*Math.PI)*Math.asin(c/a);if(t<1)return-.5*(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b;return a*Math.pow(2,-10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p)*.5+c+b},
	backin:
		function(x,t,b,c,d){var s=1.70158;return c*(t/=d)*t*((s+1)*t-s)+b},
	backout:
		function(x,t,b,c,d){var s=1.70158;return c*((t=t/d-1)*t*((s+1)*t+s)+1)+b},
	backinout:
		function(x,t,b,c,d){var s=1.70158;if((t/=d/2)<1)return c/2*(t*t*(((s*=(1.525))+1)*t-s))+b;return c/2*((t-=2)*t*(((s*=(1.525))+1)*t+s)+2)+b},
	linear:
		function(x,t,b,c,d){return c*t/d+b}
};
jQuery.extend(jQuery.easing, {
    def: 'easeOutQuad',
    swing: function (x, t, b, c, d) {
        //alert(jQuery.easing.default);
        return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
    },
    easeInQuad: function (x, t, b, c, d) {
        return c*(t/=d)*t + b;
    },
    easeOutQuad: function (x, t, b, c, d) {
        return -c *(t/=d)*(t-2) + b;
    },
    easeInOutQuad: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t + b;
        return -c/2 * ((--t)*(t-2) - 1) + b;
    },
    easeInCubic: function (x, t, b, c, d) {
        return c*(t/=d)*t*t + b;
    },
    easeOutCubic: function (x, t, b, c, d) {
        return c*((t=t/d-1)*t*t + 1) + b;
    },
    easeInOutCubic: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t*t + b;
        return c/2*((t-=2)*t*t + 2) + b;
    },
    easeInQuart: function (x, t, b, c, d) {
        return c*(t/=d)*t*t*t + b;
    },
    easeOutQuart: function (x, t, b, c, d) {
        return -c * ((t=t/d-1)*t*t*t - 1) + b;
    },
    easeInOutQuart: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
        return -c/2 * ((t-=2)*t*t*t - 2) + b;
    },
    easeInQuint: function (x, t, b, c, d) {
        return c*(t/=d)*t*t*t*t + b;
    },
    easeOutQuint: function (x, t, b, c, d) {
        return c*((t=t/d-1)*t*t*t*t + 1) + b;
    },
    easeInOutQuint: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
        return c/2*((t-=2)*t*t*t*t + 2) + b;
    },
    easeInSine: function (x, t, b, c, d) {
        return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
    },
    easeOutSine: function (x, t, b, c, d) {
        return c * Math.sin(t/d * (Math.PI/2)) + b;
    },
    easeInOutSine: function (x, t, b, c, d) {
        return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
    },
    easeInExpo: function (x, t, b, c, d) {
        return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
    },
    easeOutExpo: function (x, t, b, c, d) {
        return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
    },
    easeInOutExpo: function (x, t, b, c, d) {
        if (t==0) return b;
        if (t==d) return b+c;
        if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
        return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
    },
    easeInCirc: function (x, t, b, c, d) {
        return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
    },
    easeOutCirc: function (x, t, b, c, d) {
        return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
    },
    easeInOutCirc: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
        return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
    },
    easeInElastic: function (x, t, b, c, d) {
        var s=1.70158;var p=0;var a=c;
        if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
        if (a < Math.abs(c)) { a=c; var s=p/4; }
        else var s = p/(2*Math.PI) * Math.asin (c/a);
        return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
    },
    easeOutElastic: function (x, t, b, c, d) {
        var s=1.70158;var p=0;var a=c;
        if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
        if (a < Math.abs(c)) { a=c; var s=p/4; }
        else var s = p/(2*Math.PI) * Math.asin (c/a);
        return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
    },
    easeInOutElastic: function (x, t, b, c, d) {
        var s=1.70158;var p=0;var a=c;
        if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
        if (a < Math.abs(c)) { a=c; var s=p/4; }
        else var s = p/(2*Math.PI) * Math.asin (c/a);
        if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
        return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
    },
    easeInBack: function (x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c*(t/=d)*t*((s+1)*t - s) + b;
    },
    easeOutBack: function (x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
    },
    easeInOutBack: function (x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158; 
        if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
        return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
    },
    easeInBounce: function (x, t, b, c, d) {
        return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
    },
    easeOutBounce: function (x, t, b, c, d) {
        if ((t/=d) < (1/2.75)) {
            return c*(7.5625*t*t) + b;
        } else if (t < (2/2.75)) {
            return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
        } else if (t < (2.5/2.75)) {
            return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
        } else {
            return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
        }
    },
    easeInOutBounce: function (x, t, b, c, d) {
        if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
        return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
    }
});

