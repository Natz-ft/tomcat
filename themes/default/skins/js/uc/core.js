
/**
 * author: zhanglixian
 * 
 */
jQuery.fn.extend({
	/**
	 * tab切换
	 * 用法：$(express).ui_tabs(option);
	 * 
	 * 使用时需要设置包含标题的容器class为ui_tabs_title
	 * 需要设置内容容器的class为ui_tabs_content
	 * 
	 * @param option {
	 * 	event: 触发tab切换的事件
	 * 	type: 查找内容的方式，是通过下标索引(值为index时)还是id索引(值为target时)
	 * 	preventClick：是否阻止内部的超链接事件
	 * 	showEffect：是否有动画效果(支持淡入淡出)
	 * 	ajaxOption { ：通过ajax方式引用页面时的操作参数
	 * 		content：异步获取的内容存放的容器
	 * 		callback：异步获取到内容后的回调函数
	 * 	}
	 * 	floatOption{ ：可以设置内容层是否为浮动的
	 * 		positionOption：浮动内容的位置参数
	 * 		//hideTag：触发消失事件的对象
	 * 		//hideEvent：消失事件
	 * 	}
	 * }
	 */
	ui_tabs: function(option) {
		var rootTag = $(this);
		this.each( function() {
			var thisTag = $(this);
			
			var opt = {event:"click", type:"index", preventClick:true, showEffect: false};
			$.copyValue(option, opt);
			
			var titleList = thisTag.find(".ui_tabs_titles li, .ui_tabs_trigger");
			var alist = titleList.find("a");
			var panels = thisTag.find(".ui_tabs_content");
			
			if(opt.preventClick) {
				alist.bind("click", function(e) {
					e.preventDefault();
				});
			}
			titleList.bind(opt.event, function(e, tri) {
				var thisTitle = $(this);
				var panel;
				var ajaxload = false;
				var index = $.inArray(this, titleList);
				if(opt.type == "index") {
					if (panels) {
						panel = panels.eq(index);
					}
				} else if(opt.type == "target") {
					var a = thisTitle.find("a");
					var href = a.attr("href");
					if(href && href !== "#") {
						if(href.substring(0, 1) === "#") {
							panel = $(href);
						} else {
							if(opt.ajaxOption) {
								ajaxload = true;
								if(opt.ajaxOption.content)
									panel = $(opt.ajaxOption.content);
							}
						}
					} else {	// 无链接URL
						return;
					}
				}
				if(panel || opt.ajaxOption) {
					titleList.removeClass("selectedItem");
					thisTitle.addClass("selectedItem");
					if(opt.showEffect) panels.filter(".selectedContent").fadeOut("fast");
					panels.removeClass("selectedContent");
					if(panel) {
						if(!tri) {
							rootTag.trigger($.ui_change, [index]);
						}
						panel.addClass("selectedContent");
						if(opt.showEffect) panel.fadeIn("fast");
						if(opt.floatOption) {
							var poption = new Object();
							poption.of = thisTitle;
							$.copyValue(opt.floatOption.positionOption, poption);
							panel.css("position", "absolute");
							panel.css("z-index", "10");
							panel.position(poption);
							panel.position(poption);
							//if(opt.floatOption.hideEvent) {
								thisTag.hover(function(e) { }, function(e) {
									thisTitle.removeClass("selectedItem");
									if(opt.showEffect) panel.fadeOut("fast");
									panel.removeClass("selectedContent");
								});
							//}
						}
					}
					
					if(ajaxload) {
						if(!opt.ajaxOption) opt.ajaxOption = new Object();
						opt.ajaxOption.url = href;
						$.ajaxLoad(opt.ajaxOption);
					}
				}
			});
			
			// 选择当前选中标题对应的内容
			titleList.filter(".selectedItem").trigger(opt.event);
			
			thisTag.bind($.ui_bindChange, function(e, index){
				titleList.eq(index).trigger(opt.event, 1);
			});
		});
		return this;
	},
	/**
	 * 图片轮换
	 * 用法：$(express).ui_switchs(option)
	 * 
	 * @param option {
	 * 	time: 图片自动切换时间
	 * 	changeTime：图片消失和显示的时间
	 * 	currentIndex：默认显示的图片索引
	 * 	isAuto：是否自动播放
	 * 	showIndex：是否显示索引
	 * 	eq：是否等比例缩放
	 * }
	 */
	ui_switch: function(option) {
		var rootTag = $(this);
		this.each( function() {
			var thisTag = $(this);
			
			var opt = {time:3000, changeTime:400, currentIndex: 0,  
					isAuto:true, showIndex: true, eq: true};
			$.copyValue(option, opt);
			
			var currentImg,		// 当前显示的图片
			currentIndp,	// 当前显示的索引
			newImg,			// 待更换的图片
			newIndp,		// 待更换的图片索引
			autoTimer,		// 自动轮换时的时间对象（可用于clearInterval）
			maxlength,		// 图片的个数
			fadeing = false,// 是否正在切换图片
			expIndex = -1;	// 正在切换图片的过程中，用户如果选择了新的图片，则存储新的图片索引
			
			var imgs = thisTag.find('.ui_switch_list li');
			var indexPanel = thisTag.find(".ui_switch_index");
			var imgPanel = thisTag.find("ui_switch_panel");
			var indexs;
			maxlength = imgs.length;
			var w = thisTag.width();
			var h = thisTag.height();
			
			var setImageSize = function() {
				imgs.find("img").ui_scale({
					targetX: w,
					targetY: h,
					eq: opt.eq
				});
			};
			
			// 创建轮换图片的索引标签
			var createIndexView = function() {
				if(maxlength <=  1) {
					opt.showIndex = false;
				}
				if(opt.showIndex) {
					var lis = "<ul>";
					for(var i=1; i <= maxlength; i++) {
						lis += "<li>" + i + "</li>";
					}
					lis += "</ul>";
					indexPanel.append(lis);
				}
				indexs = indexPanel.find("li");
			};
			// 图片轮换处理
			var imgSwitch = function(index, tri) {
				
				if(fadeing) {
					expIndex = index;
					return;
				}
				
				if(currentImg) {
					fadeing = true;
					
					currentImg.fadeOut(opt.changeTime);
					setTimeout(function(){
						if(expIndex != -1) {
							index = expIndex;
							expIndex = -1;
						}
						
						newImg = imgs.eq(index);
						newIndp = indexs.eq(index);

						//currentImg.removeClass("selectedItem");
						currentIndp.removeClass("selectedItem");
						newIndp.addClass("selectedItem");
						
						opt.currentIndex = index;
						currentImg = newImg;
						currentIndp = newIndp;
						
						if(!tri) {
							rootTag.trigger($.ui_change, [index]);
						}
						
						newImg.fadeIn(opt.changeTime, function() {
							currentImg.addClass("selectedItem");
							fadeing = false;
							if(expIndex != -1) {
								imgSwitch(expIndex);
							}
						});
					}, opt.changeTime - 20);
					
				} else {
					opt.currentIndex = index;
					currentImg = imgs.eq(index);
					currentIndp = indexs.eq(index);
					currentImg.addClass("selectedItem");
					currentIndp.addClass("selectedItem");
				}
			};
			// 轮换到下一张图片
			var intervalImage = function() {
				var index = opt.currentIndex;
				index += 1;
				if(index >= maxlength) {
					index = 0;
				}
				if(index != opt.currentIndex) {
					imgSwitch(index);
				}
			};
			// 自动轮换处理
			var autoSwitch = function() {
				if(opt.isAuto) {
					if(autoTimer) {
						clearInterval(autoTimer);
					}
					autoTimer = setInterval(intervalImage, opt.time);
				}
			};
			// 手动轮换处理
			var manualSwitch = function() {
				indexs.each(function(i) {
					$(this).hover(function(e) {
						if(autoTimer) {
							clearInterval(autoTimer);
						}
						imgSwitch(i);
					}, function(e) {
						autoSwitch();
					});
				});
			};
			// 自动轮换停止处理（鼠标移入停止）
			var stopSwitch = function() {
				thisTag.hover(function(e) {
					if(autoTimer) {
						clearInterval(autoTimer);
					}
				}, function(e) {
					autoSwitch();
				});
			};
			
			setImageSize();
			imgs.addClass("noneSelected");
			createIndexView();
			imgSwitch(opt.currentIndex);
			manualSwitch();
			stopSwitch();
			autoSwitch();
			
			thisTag.bind($.ui_bindChange, function(e, index){
				if(index >= 0 && index < maxlength) {
					imgSwitch(index, 1);
				}
				autoSwitch();
			});
		});
		return this;
	},
	/**
	 * 图片横向或纵向移动轮换
	 * 用法：$(express).ui_tumble(option)
	 * 
	 * @param option {
	 * 	time: 图片每次自动移动的时间间隔
	 * 	changeTime：图片移动所需要的时间
	 * 	isAuto：是否自动播放
	 * 	changeSize：一次移动的像素值
	 * 	changeType：移动的方向
	 * 	event: 触发联动的事件
	 * 	preventClick：是否阻止内部的超链接事件
	 * }
	 */
	ui_tumble: function(option) {
		var rootTag = $(this);
		this.each( function() {
			var thisTag = $(this);
			
			var par, first, last, autoTimer, moveing = false;
			par = thisTag.find(".ui_tumble_list");

			autoTimer = thisTag.data("autoTimer");
			clearInterval(autoTimer);
			
			if(option == "clear") {
				par.find(".listisclone").remove();
				
				par.find("li").unbind(thisTag.data("event"));
				par.find("li a").unbind("click");
				par.unbind("mouseenter").unbind("mouseleave"); 
				
				thisTag.find(".ui_tumble_left").unbind("click");
				thisTag.find(".ui_tumble_right").unbind("click");
				thisTag.find(".ui_tumble_top").unbind("click");
				thisTag.find(".ui_tumble_bottom").unbind("click");
				
				thisTag.unbind($.ui_bindChange);
				
				return;
			}
			
			var opt = {time:3000, changeTime: 300, isAuto: true, 
					changeSize: "100px", changeType:"left", event: "click",
					preventClick: true};
			$.copyValue(option, opt);
			
			thisTag.data("event", opt.event);
			
			var list = par.find("li");
			if(list.length <= 1) {
				if(opt.buttons) {
					if(opt.buttons.left) {
						$(opt.buttons.left).hide();
					}
					if(opt.buttons.right) {
						$(opt.buttons.right).hide();
					}
					if(opt.buttons.top) {
						$(opt.buttons.top).hide();
					}
					if(opt.buttons.bottom) {
						$(opt.buttons.bottom).hide();
					}
				}
				return;
			}
			
			for(var i=0; i<list.length; i++) {
				$(list[i]).attr("data-index", i);
			}
			var clonelist = list.clone(true);
			clonelist.addClass("listisclone");
			par.append(clonelist);
			par.prepend(par.find("li:last-child"));
			
			var init = function() {
				first = par.find("li:first-child");
				last = par.find("li:last-child");
			};
			init();
			
			var setSelected = function(index) {
				par.find("li").removeClass("ui_tumble_selected");
				par.find("li[data-index="+index+"]").addClass("ui_tumble_selected");
			};
			
			par.find("li").bind(opt.event, function(e) {
				var $target = $(e.currentTarget);
				var index = $target.attr("data-index");
				
				setSelected(index);
				rootTag.trigger($.ui_change, [index]);
			});
			par.find("li a").bind("click", function(e) {
				if(opt.preventClick) {
					e.preventDefault();
				}
			});
			
			if(opt.changeType == "right" || opt.changeType == "bottom") {
				par.css($.contrary(opt.changeType), "-"+opt.changeSize);
			} else {
				par.css(opt.changeType, "-"+opt.changeSize);
			}
			
			var imgTumble = function(type) {
				if(!moveing) {
					moveing = true;
					
					var t = type;
					var o1 = "-=";
					var o2 = "+=";
					if(type == "right" || type == "bottom") {
						o1 = "+=";
						o2 = "-=";
						t = $.contrary(type);
					}
					
					var obj = new Object();
					obj[t] = o1 + opt.changeSize;
					
					par.animate(obj, {duration:opt.changeTime, complete:function(e) {
						if(type == "left" || type == "top") {
							first.insertAfter(last);
						} else if(type == "right" || type == "bottom") {
							last.insertBefore(first);
						}
						obj[t] = o2 + opt.changeSize;
						par.animate(obj, 0);
						init();
						
						moveing = false;
					}});
				}
			};
			
			var intervalImage = function() {
				imgTumble(opt.changeType);
			};
			
			var autoTumble = function() {
				if(opt.isAuto) {
					if(autoTimer) {
						clearInterval(autoTimer);
					}
					autoTimer = setInterval(intervalImage, opt.time);
					thisTag.data("autoTimer", autoTimer);
				}
			};
			
			// 手动轮换处理
			var manualTumble = function() {
				thisTag.find(".ui_tumble_left").bind("click", function(e) {
					imgTumble("left");
					autoTumble();
				});
				thisTag.find(".ui_tumble_right").bind("click", function(e) {
					imgTumble("right");
					autoTumble();
				});
				thisTag.find(".ui_tumble_top").bind("click", function(e) {
					imgTumble("top");
					autoTumble();
				});
				thisTag.find(".ui_tumble_bottom").bind("click", function(e) {
					imgTumble("bottom");
					autoTumble();
				});
				if(opt.buttons) {
					if(opt.buttons.left) {
						$(opt.buttons.left).unbind("click");
						$(opt.buttons.left).bind("click", function(e) {
							imgTumble("left");
							autoTumble();
						});
					}
					if(opt.buttons.right) {
						$(opt.buttons.right).unbind("click");
						$(opt.buttons.right).bind("click", function(e) {
							imgTumble("right");
							autoTumble();
						});
					}
					if(opt.buttons.top) {
						$(opt.buttons.top).unbind("click");
						$(opt.buttons.top).bind("click", function(e) {
							imgTumble("top");
							autoTumble();
						});
					}
					if(opt.buttons.bottom) {
						$(opt.buttons.bottom).unbind("click");
						$(opt.buttons.bottom).bind("click", function(e) {
							imgTumble("bottom");
							autoTumble();
						});
					}
				}
			};
			// 自动轮换停止处理（鼠标移入停止）
			var stopTumble = function() {
				par.hover(function(e) {
					if(autoTimer) {
						clearInterval(autoTimer);
					}
				}, function(e) {
					autoTumble();
				});
			};
			
			manualTumble();
			stopTumble();
			autoTumble();
			
			// 组件事件联动处理
			thisTag.bind($.ui_bindChange, function(e, index){
				setSelected(index);
			});
		});
		return this;
	},
	/**
	 * 用于缩放DOM元素
	 * 
	 * @param option {
	 * 	targetX：目标宽度
	 * 	targetY：目标高度
	 * 	eq：是否等比例缩放(暂不支持Chrome浏览器，该浏览器下始终为非等比例缩放)
	 * }
	 */
	ui_scale: function(option) {
		var opt = {targetX: 0, targetY: 0, eq: true};
		$.copyValue(option, opt);
		
		this.each( function() {
			var thisTag = $(this);
			var obj = $.equalScale({
				targetX: opt.targetX,
				targetY: opt.targetY,
				sourceX: thisTag.width(),
				sourceY: thisTag.height()
			});
			if(!opt.eq) {
				obj.scaleX = opt.targetX;
				obj.scaleY = opt.targetY;
			}
			
			thisTag.width(obj.scaleX);
			thisTag.height(obj.scaleY);
			thisTag.css("margin-left", (obj.targetX - obj.scaleX) / 2);
			thisTag.css("margin-top", (obj.targetY - obj.scaleY) / 2);
		});
		return this;
	},
	/*ui_layer: function(option) {
		this.each( function() {
			var thisTag = $(this);
			
			var opt = new Object();
			$.copyValue(option, opt);
			
			var trigger = thisTag.find("ui_layer_trigger");
			var target = thisTag.find("ui_layer_target");
			
			if(!trigger || !target) return;
			
			trigger.bind("click", function(e) {
				trigger.addClass("selectedItem");
				target.addClass("selectedContent");
			});
			thisTag.hover(function(e){}, function(e) {
				trigger.removeClass("selectedItem");
				target.removeClass("selectedContent");
			});
		});
	},*/
	/**
	 * 给可输入文本的控件增加提示文字
	 * 用法：$(express).ui_prompt(option);
	 * 
	 * @param option {
	 *	prompt：提示文字	//也可在控件上增加data-prompt属性 
	 * }
	 */
	ui_prompt: function(option) {
		this.each( function() {
			var thisTag = $(this);
			
			var opt = new Object();
			$.copyValue(option, opt);
			
			thisTag.unbind("focusin");
			thisTag.unbind("focusout");
			if(thisTag.attr("value") === thisTag.attr("data-prompt")) {
				thisTag.attr("value", "");
			}
			if(opt.prompt) {
				thisTag.attr("data-prompt", opt.prompt);
			}
			
			thisTag.bind("focusin", function(e) {
				if(thisTag.attr("value") === thisTag.attr("data-prompt")) {
					thisTag.attr("value", "");
				}
				thisTag.removeClass("ui_prompt_font");
			});
			var focusout = function(e) {
				if(!thisTag.attr("value")){
					thisTag.addClass("ui_prompt_font");
					thisTag.attr("value", thisTag.attr("data-prompt"));
				}
			};
			thisTag.bind("focusout", focusout);
			
			focusout();
		});
		return this;
	},
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
				
				//tags += getButton("第一页", "ui_paper_first", getUrl(1));
				if(opt.model.ln) {
					tags += getButton("上一页", "ui_paper_prep", getUrl(parseInt(opt.current) - 1));
				}
				
				// 取得要显示那些页码，默认为当前页的左右5页
				s = opt.current - opt.lp;
				e = opt.current + opt.rp;
				if(s < 1) e -= s;
				if(e > max) s -= e - max;
				s = Math.max(1, s);
				e = Math.min(e, max);
				
				if(opt.model.num) {
					for(var i = s; i <= e; i++) {
						tags += getButton(i, "ui_paper_num", getUrl(i));
					}
				}
				if(opt.model.ln) {
					tags += getButton("下一页", "ui_paper_next", getUrl(parseInt(opt.current) + 1));
				}

//				if(opt.model.select) {
//					tags += "<select class='select ui_paper_select'>";
//					for(i = 1; i <= max; i++) {
//						if(i === opt.current) 
//							tags += "<option value='" + i + "' selected>第" + i + "页</option>";
//						else
//							tags += "<option value='" + i + "'>第" + i + "页</option>";
//					}
//					tags += "</select>";
//				}
				
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
					first.attr("href", "javascript:void(0)");
					prev.addClass("disabled");
					prev.attr("href", "javascript:void(0)");
				}
				if(opt.current >= max) {
					next.addClass("disabled");
					next.attr("href", "javascript:void(0)");
					last.addClass("disabled");
					last.attr("href", "javascript:void(0)");
				}
				nums.removeClass("selected");
				if(nums.eq(opt.current - s)) 
					nums.eq(opt.current - s).addClass("selected")
					.attr("href", "javascript:void(0);");
				
				select.unbind("change");
				select.bind("change", function(e) {
					var url = getUrl(select.attr("value"));
					document.location.href = url;
				});
			};
			
			var optionmethod = function() {
				if(opt.ajaxOption || opt.callbackOption) {
					var alist = thisTag.find("a");
					alist.bind("click", function(e) {
						e.preventDefault();
						var a = $(e.currentTarget);
						if(!a.hasClass("selected")) {
							var href = a.attr("href");
							loadUrl(href);
						}
					});
					var selectlist = thisTag.find("select");
					selectlist.unbind("change");
					selectlist.bind("change", function(e){
						var url = getUrl(select.attr("value"));
						loadUrl(url);
					});
				}
			};
			
			var loadUrl = function(url) {
				if(url && url !== "#" && url != "javascript:void(0)") {
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
			
			var getButton = function(label, clazz, url) {
				return "<a href='" + url + "' class='button " + clazz + "'>" + label + "</a>";
			};
			var getUrl = function(index) {
				var url = opt.url;
				if(url.indexOf("?") != -1) url += "&";
				else url += "?";
				url += "pagesize=" + opt.pagesize + "&index=" + index;
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
	},
	ui_paper2: function(option) {
		this.each( function() {
			var thisTag = $(this);
			var opt = {pagesize: 10, current: 1, count: 0, lp: 5, rp: 5, model: {num: true, ln: true, select: true}};
			$.copyValue(option, opt);
			
			var max = parseInt((parseInt(opt.count) - 1) / parseInt(opt.pagesize) + 1);
			var first, prep, next, last, nums, select, s, e;
			
			var fillTags = function() {
				
				var tags = "";
				var current_index = 1;
				
				//tags += getButton("第一页", "ui_paper_first", getUrl(1));
				if(opt.model.ln && parseInt(opt.current) >1) {
					current_index = parseInt(opt.current) - 1;
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
				if(opt.model.ln && opt.current<max) {
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
					var index = select.attr("value");
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
						var url = getUrl(select.attr("value"));
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
					if(url.indexOf("?") != -1) url += "&";
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
	},
	/**
	 * 给一个集合增加或移除class样式
	 * @param option {
	 * 	className:
	 * 	type:
	 * 	start:
	 * 	step:
	 * }
	 */
	ui_class: function(option) {
		var opt = {type:"add", start: 1, step: 1 };
		$.copyValue(option, opt);
		
		var className = opt.className;
		$.each(this, function(i, obj) {
			var className2 = className.replace("&x", opt.start + i * opt.step);
			if(opt.type == "add")
				$(obj).addClass(className2);
			else if(opt.type == "remove")
				$(obj).removeClass(className2);
		});
		return this;
	},
	/**
	 * 
	 * @param option {
	 * 	props:
	 * 	start:
	 * 	step:
	 * 	units:
	 * }
	 */
	ui_styles: function(option) {
		var opt = {};
		$.copyValue(option, opt);
		if(opt.props) {
			$.each(this, function(i, m) {
				var obj = $(m);
				$.each(opt.props, function(j, n) {
					var start = "", step = "", unit = "px";
					if(opt.start && opt.start[j]) start = opt.start[j];
					if(opt.step && opt.step[j]) step = opt.step[j];
					if(opt.units && opt.units[j]) unit = opt.units[j];
					var s1 = start.split(" ");
					var s2 = step.split(" ");
					var val = "";
					$.each(s1, function(k, o) {
						val += (parseInt(o) + parseInt(s2[k]) * i) + unit + " ";
					});
					obj.css(n, val);
				});
			});
		}
		return this;
	},
	ui_htmlloader: function(option) {
		this.each( function() {
			var thisTag = $(this);
			var opt = {};
			$.copyValue(option, opt);
			
			$.ajaxLoad({url:opt.url, callback: function(data) {
				thisTag.replaceWith(data);
			}});
		});
		return this;
	},
	/**
	 * 设置层在顶部或底部浮动
	 * @param option {
	 * 	at：在顶部浮动“top”，还是在底部浮动“bottom”
	 * 	of：浮动相对的父容器
	 * }
	 */
	ui_fixed: function(option) {
		var rootTag = $(this);
		this.each( function() {
			var thisTag = $(this);
			var $cloneTag = thisTag.clone(true);
			$cloneTag.attr("id", thisTag.attr("id") + "1");
			$cloneTag.hide().appendTo($(document.body))
				.css("width", thisTag.css("width"))
				.css("height", thisTag.css("height"));
			
			var opt = {at: "top", of: "body", offset: 0};
			$.copyValue(option, opt);
			
			var $ofc = $(opt.of);
			
			var settop = function() {
				var sctop = $(window).scrollTop();
				var elmtop = thisTag.offset().top;
				if (sctop > elmtop && sctop <= (elmtop + $ofc.height())) {
					if (jQuery.browser.msie && jQuery.browser.version == "6.0")
						$cloneTag.css({
							"position" : "absolute",
							"top" : $(window).scrollTop() + opt.offset,
							"left" : thisTag.offset().left
						});
					else
						$cloneTag.css({
							"position" : "fixed",
							"top" : 0 + opt.offset,
							"left" : thisTag.offset().left - $(window).scrollLeft()
						});
					$cloneTag.show();
				}
				else {
					$cloneTag.hide();
				}
			};
			
			var setbottom = function() {
				var sctop = $(window).scrollTop() + $(window).height();
				var elmtop = thisTag.offset().top + thisTag.height();
				if (sctop < elmtop && $ofc.offset().top < sctop - thisTag.height()) {
					if (jQuery.browser.msie && jQuery.browser.version == "6.0")
						$cloneTag.css({
							"position" : "absolute",
							"top" : sctop - thisTag.height() - opt.offset,
							"left" : thisTag.offset().left
						});
					else
						$cloneTag.css({
							"position" : "fixed",
							"bottom" : 0 + opt.offset,
							"left" : thisTag.offset().left - $(window).scrollLeft()
						});
					$cloneTag.show();
				}
				else {
					$cloneTag.hide();
				}
			};
			
			var repos = function() {
				if(opt.at == "top") {
					settop();
				} else if(opt.at == "bottom") {
					setbottom();
				}
			};
			
			$(window).scroll(repos);
			$(window).resize(function() {
				if ($cloneTag.outerWidth() != thisTag.outerWidth()) {
					$cloneTag.width(thisTag.outerWidth());
				}
				$cloneTag.css("left", thisTag.offset().left);
			});
			thisTag.bind("refresh", function(e) {
				$cloneTag.empty();
				var a = thisTag.clone(true);
				
				$cloneTag.append(thisTag.clone(true).html());
				
				if (e.stopPropagation) e.stopPropagation();
				else e.cancelBubble = true;
			});
			repos();
		});
	},

	/**
	 * 输出五角星图标
	 * @param hue
	 * @param count
	 */
	ui_star: function(hue, count, callback) {
		var rootTag = $(this);
		this.each( function() {
			var thisTag = $(this);
			var max = Math.max(hue, count);
			
			var str = "<a style='cursor:pointer;'>";
			for(var i=1; i <= max; i++) {
				if(i <= hue) {
					str += "<span class='icons_12 icon_star1' data-index='"+i+"'>&nbsp;</span>";
//				} else if(i - hue < 1){
//					str += "<span class='icons_12 icon_star3' data-index='"+i+"'>&nbsp;</span>";
				} else {
					str += "<span class='icons_12 icon_star2' data-index='"+i+"'>&nbsp;</span>";
				}
			}
			str += "</a>";
			var t = $(str);
			thisTag.append(t);
			
			var list = t.find("span");
			
			var setList = function(index) {
				$.each(list, function(i, obj) {
					var sp = $(obj);
					var dataindex = sp.attr("data-index");
					if(index >= dataindex) {
						sp.addClass("icon_star1");
						sp.removeClass("icon_star2");
					} else {
						sp.addClass("icon_star2");
						sp.removeClass("icon_star1");
					}
				});
			};
			
			list.click(function(e) {
				var sp = $(e.currentTarget);
				var index = sp.attr("data-index");
				setList(index);
				
				if(callback) {
					callback(index);
				}
				
				thisTag.attr("data-value", index);
			});
		});
	}
});

jQuery.extend ({
	ui_change: "uiChangeEvent",
	ui_bindChange: "uiBindChangeEvent",
	/**
	 * 将多个元素绑定ui_change事件，一个发生变化时，其他元素跟着一起变化
	 * @param arr
	 */
	ui_bind : function(arr) {
		$.each(arr, function(i, tag){
			var tag0 = tag;
			tag0.bind($.ui_change, function(e, index){
				$.each(arr, function(j, tag1) {
					if(tag0 != tag1) {
						tag1.trigger($.ui_bindChange, [index]);
					}
				});
			});
		});
	},
	/**
	 * 用于给url增加ajax请求参数，标识该url是ajax方式
	 * @param url
	 * @returns
	 */
	ajaxUrl: function(url) {
		if(url.indexOf("?") != -1) {
			url += "&_view=async";
		} else {
			url += "?_view=async";
		}
		return url;
	},
	/**
	 * 通过ajax异步获取
	 * 用法：$.ajaxLoad(option);
	 * 
	 * @param 
	 * option {
	 * 	url：ajax方式请求的url
	 * 	callback: 加载完成后的回调函数
	 * 	type：使用'GET'方式还是使用'POST'方式
	 * 	dataType：服务器返回数据的预期类型，可传html、xml、script、json、jsonp、text
	 * 	data：发送到服务器的参数，必须为key/value格式
	 * }
	 */
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
	/**
	 * 把source对象的所有属性复制到target对象中
	 * @param source
	 * @param target
	 */
	copyValue: function(source, target) {
		for(var s in source) {
			target[s] = source[s];
		}
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
	},
	/**
	 * 用于取定位值相反的属性值
	 * @param value
	 * @returns
	 */
	contrary: function(value) {
		switch(value) {
		case "left": return "right"; break;
		case "right": return "left"; break;
		case "top": return "bottom"; break;
		case "bottom": return "top"; break;
		}
		return value;
	},
	/**
	 * 输出五角星图标
	 * @param hue
	 * @param count
	 */
	fiveStar: function(hue, count, container) {
		var max = Math.max(hue, count);
		var c = $(container);
		var tags = "";
		for(var i=1; i <= max; i++) {
			if(i <= hue) {
				tags += "<span class='icons_12 icon_star1'>&nbsp;</span>";
			} else if(i - hue < 1){
				tags += "<span class='icons_12 icon_star3'>&nbsp;</span>";
			} else {
				tags += "<span class='icons_12 icon_star2'>&nbsp;</span>";
			}
		}
		if(c) {
			c.html(tags);
		} else {
			document.write(tags);
		}
	},
	/**
	 * 获取等比例缩放所需要的值
	 * @param option {targetX, targetY, sourceX, sourceY}
	 * @returns 增加：{scaleX, scaleY}
	 */
	equalScale: function(option) {
		if(option.sourceX == 0 || option.sourceY == 0) {
			option.scaleX = option.targetX;
			option.scaleY = option.targetY;
			return option;
		}
		if(option.targetX == 0 || option.targetY == 0) {
			option.scaleX = 0;
			option.scaleY = 0;
			return option;
		}
		var scale = option.targetX / option.sourceX;
		scale = Math.min(option.targetY / option.sourceY, scale);
		option.scaleX = option.sourceX * scale;
		option.scaleY = option.sourceY * scale;
		return option;
	},
	Obj2str: function(o) {
        if (o == undefined) {
            return "";
        }
        var r = [];
        if (typeof o == "string") return "\"" + o.replace(/([\"\\])/g, "\\$1").replace(/(\n)/g, "\\n").replace(/(\r)/g, "\\r").replace(/(\t)/g, "\\t") + "\"";
        if (typeof o == "object") {
            if (!o.sort) {
                for (var i in o)
                    r.push("\"" + i + "\":" + $.Obj2str(o[i]));
                if (!!document.all && !/^\n?function\s*toString\(\)\s*\{\n?\s*\[native code\]\n?\s*\}\n?\s*$/.test(o.toString)) {
                    r.push("toString:" + o.toString.toString());
                }
                r = "{" + r.join() + "}";
            } else {
                for (var i = 0; i < o.length; i++)
                    r.push($.Obj2str(o[i]));
                r = "[" + r.join() + "]";
            }
            return r;
        }
        return o.toString().replace(/\"\:/g, '":""');
    },
    /**
     * 处理ajax错误信息
     */
    ajaxErrMsg: function(XMLHttpRequest) {
    	var errMsg = { code : "", info : "未知错误" };
    	if(typeof XMLHttpRequest == "object") {
    		var resTxt = XMLHttpRequest.responseText;
    		if(resTxt) {
    			resTxt = eval("("+resTxt+")");
        		if(typeof resTxt != "undefined") {
        			errMsg = $.extend(errMsg,{ code : resTxt.errCode, info : resTxt.errInfo + "！" });
        		} else {
        			errMsg = $.extend(errMsg,{ info : resTxt });
        		}
        	} else {
        		var statusText = XMLHttpRequest.statusText;
        		if(statusText) {
        			if(statusText.indexOf("NetworkError") != -1) {
        				errMsg = $.extend(errMsg,{ info : "网络请求超时！" });
        			} else {
        				errMsg = $.extend(errMsg,{ info : statusText });
        			}
        		}
        	}
    	}
    	return errMsg;
    }
});
/**
 * 左右滑动方法
 * @param {} id：容器id
 * @param {} width：宽度
 * @param {} height：高度
 * @param {} active：是否显示公用的滑动按钮
 */
function slidesjsHandle(id,width,height,active){
	var rab = $('#'+id);
	if((rab.find('div').length > 1) || (rab.find('ul').length > 1)|| (rab.find('img').length > 1)){
			rab.slidesjs({
			width: width,
			height: height,
			navigation: false,
		    pagination: {
		    	active: active,
		        effect: "slide"
		    },
		    play: {
		        active: false,
		        effect: "slide",
		        interval: 8000,
		        auto: false,
		        swap: false,
		        pauseOnHover: true,
		        restartDelay: 4000
		    }
		});
	}else{
		rab.find('.slidesjs-navigation').hide();
	}
}
function setCookie(name, value,cookieDomain) {
	var expires = new Date();
	expires.setMonth(expires.getMonth() + 1);
	var str = name + "=" + value + "; path=/;expires=" + expires.toGMTString();
	if(cookieDomain){
		str += ";domain="+cookieDomain;
	}
	document.cookie = str;
}
function getCookie(name) {
	var re = new RegExp("\\b"+name+"=([^;]*)\\b");
	var arr = re.exec(document.cookie);
	return arr ? arr[1] : "";
}

String.prototype.trim = function(){
	var exp = /(^\s*)|(\s*$)/g;
	return this.replace(exp, '');
};

String.prototype.isEmpty = function(){
    if (this != null && !/^\s*$/.test(this)) {
        return false;
    } else {
        return true;
    }
};



/**
 * 初始化页面css信息，为body加上基础的css比如<body class="jq-ie jq-ie8">
 */
var initJQCss = function() {
	$.isStrict = document.compatMode == "CSS1Compat";
	
	var ua = navigator.userAgent.toLowerCase();
	var isMac = (ua.indexOf("macintosh") != -1 || ua.indexOf("mac os x") != -1),
	isLinux = ua.indexOf("linux") != -1 
	, isChrome = ua.indexOf("chrome") > -1
	, isBorderBox = $.browser.msie && !$.isStrict;
	
	var bd = document.body || document.getElementsByTagName('body')[0];
	if (!bd) {
		return false;
	}
	var cls = [
			' ',
			$.browser.msie ? "jq-ie jq-ie"
					+ ($.browser.version.split("\.")[0]) : $.browser.gecko ? "jq-gecko jq-gecko"
					+ ($.browser.version.split("\.")[0])
					: $.browser.opera ? "jq-opera" : $.browser.chrome ? "jq-chrome"
							: $.browser.safari ? "jq-safari" : $.browser.mozilla ? "jq-mozilla" : "" ];

	if (isMac) {
		cls.push("jq-mac");
	}
	if (isLinux) {
		cls.push("jq-linux");
	}
	if (isBorderBox) {
		cls.push('jq-border-box');
	}
	if ($.isStrict) { // add to the parent to allow for selectors like
		// ".jq-strict .jq-ie"
		var p = bd.parentNode;
		if (p) {
			p.className += ' jq-strict';
		}
	}
	bd.className += cls.join(' ');
	return true;
}

if (!initJQCss()) {
	$(document).ready(initJQCss);
}

function ready(fun) {
	$(document).ready(fun);
}