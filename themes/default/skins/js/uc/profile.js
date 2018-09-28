/**
 * widget-drag-handle  cls 加到widget 里面的某个元素上面，限定拖拽元素
 * ui-state-disabled   cls widget不可以拖拽了
 * ui-state-default-w  cls widget 如果带有，就不允许删除
 * @private widget-close-btn    cls 动态的为widget增加 删除按钮
 */
function getWidgetTemplate(tpl){
	if(!tpl){
		tpl = 'width_height';
	}
	var mo = tpl.split('_');
	var title = '<div class="w-title widget-drag-handle"><h3>{widget-title}</h3></div>'
		,width=''
		,height=''
		,drag='widget-drag-handle'
		,tslider = ''
		;
	if(mo.length==3 && mo[2]=='title'){//有title
		drag = '';
	} 
	else {//没有title
//		tslider = ' w-slide-title ';
		title = '';
	}
	if(tpl.length>=1){
		width = ' '+mo[0]+' ';
	}
	if(tpl.length>=2){
		height = ' '+mo[1]+' ';
	}
	return '<div class="widget '+width+height+tslider+' ">'+title+'<div class="w-cnt '+drag+'">'
		+'<iframe width="100%" height="100%" frameborder="no" scrolling="no" id="{iframe-name}" class="iframe-proxy" name="{iframe-name}" src2={widget-path}></iframe></div></div>';
}

//更改以后提交
function submit_widget_form(btn,callback){
	var colData = {}
		,menuCt = $('#menu-for-widget')
		;
	$('.widget-accept-ct').each(function(){
		colData[this.id] = getCtWidgetIds($(this));
	});
	var ws = menuCt.find('.menu-4-widget[widget-id]');
	var str = '';
	for(var i = 0 , len = ws.length ; i < len ; i++ ){
		if(str!=''){
			str += ';';
		}
		str += ws[i].getAttribute('widget-id');
	}
	colData['menu-for-widget'] = str;
	
	$.ajax({
		url : "index.do?method=saveSpace",
		data : {colData:colData},
		type : 'post',
		success : function(res){
			$(btn).prop('disabled',false);
			if(res==0){
				Tips.error('保存失败');
			}else{
				if($.isFunction(callback)){
					callback.apply(window);
				}
			}
		},
		error : function(){
			$(btn).prop('disabled',false);
			Tips.error('保存失败');
		}
	});
}
function getCtWidgetIds(ct){
	var ws = ct.find('.widget[widget-id]');
	var str = '';
	for(var i = 0 , len = ws.length ; i < len ; i++ ){
		if(str!=''){
			str += ';';
		}
		str += ws[i].getAttribute('widget-id');
	}
	return str;
}
//根据widget详细信息创建一个widget
/**
 * widget = { app_id :'', id :'', type :'', path :'' ,title:"",widget_tpl:'',menu_action:''} 
 */

function createWidget(widget,cbFn){
	if(widget.type=='sys'){ // 系统提供
		var path = widget.path;
		if(path.indexOf('isWidget') < 0){
			if(path.indexOf("?") < 0){
				path += '?isWidget=true';
			} else {
				path += '&isWidget=true';
			}
		}
		path = path.replace(".jsp?",".htm?");
		$.ajax({
			url : path,
			type : 'get',
			success : function(res){
				if(createWidget.reSuccess.test(res)===false){
					res = '<div widget-load="widget-load-failed" class="widget" style="background-color: rgb(239, 245, 241);" >'
						+'<div class="w-title widget-drag-handle" >'
						+'<h3>{widget-title}</h3>'
						+'</div>'
						+'<div class="w-cnt " >'
						+'加载失败'
						+'</div>'
						+'</div>';
					res = res.replace(/{widget-title}/g,widget.title);
				}
				cbFn(res);
			}
		});
	} else { //外部的
		var wStr = getWidgetTemplate(widget.widget_tpl);
		wStr = wStr.replace(/{widget-title}/g,widget.title);
		wStr = wStr.replace(/{iframe-name}/g,'iframe_proxy_'+(new Date().getTime()));
		wStr = wStr.replace(/{widget-path}/g,widget.path);
		cbFn(wStr);
	}
}
createWidget.reSuccess = /widget-load="widget-load-success"/i;

function createLeftMenu(widget,menuCt,rec){
	if(!widget.menu_action){
		return ;
	}
	
	var menuTpl = '<li><a class="lnav-item menu-4-widget" widget-id="{widget-id}" href="javascript:;"><i class="p-icon li-icon"></i>{widget-title}</a></li>'
		,menuEle;
	
	menuTpl = menuTpl.replace(/{widget-title}/g,widget.title);
	menuTpl = menuTpl.replace(/{widget-id}/g,widget.id);
	
	if(widget.menu_action.indexOf('http://')>-1){
		menuEle = $(menuTpl).appendTo(menuCt);
		try{
			$('a.menu-4-widget',menuEle).on('click',function(){
				maxWidget(this,widget,widget.menu_action);
			});
		} catch(ex){
		}
	}
	
}
/**
 * 初始化widget的关闭按钮
*/
function initWidgetsCloseBtn(show) {
	//class带有“ui-state-default-w”的为不可删除widget
	var widgets = $(".widget-accept-ct .widget").not(".ui-state-default-w");
	if(show) {
		for(var i=0; i<widgets.length; i++) {
			if(widgets.eq(i).find(".widget-close-btn").length == 0) {
				widgets.eq(i).prepend('<span class="widget-close-btn" title="关闭"></span>');
			}
		}
		widgets.find(".widget-close-btn").off("click.closewidget");
		widgets.find(".widget-close-btn").on("click.closewidget",function(e){
			Tips.confirm("是否删除？删除后可在\"组件商店\"中重新添加。",e.target,function(ok){
				if(ok){
					$(e.target).closest(".widget").remove();
					initWidgetShopItemState();
					submit_widget_form(null);
	 			}
			});
//			confirm("是否隐藏？隐藏后可在页面顶部“增删模块”中重新添加。");
		}).hover(function(){
				$(this).addClass("hover");
			},function(){
				$(this).removeClass("hover");
			});
		
	} else {
		widgets.find(".widget-close-btn").off("click.closewidget").remove();
	}
}

/*初始化widgetsLoader中widget item的状态*/
function initWidgetShopItemState() {
	var widgetCt = $(".widget-accept-ct")
		,menuCt = $('#menu-for-widget');
	$(".widgetListUL .widget-drag-item").each(function(){
		var _this = $(this);
		var dragWid = this.getAttribute("widget-id");
		if(widgetCt.find(".widget[widget-id='"+dragWid+"']").length > 0){
			_this.addClass("widget_checked").find('.widget-drag-action').off('click.widget').on('click.widget',removeWidget);
			_this.find('.widget-drag-action').removeClass("addToDesk").addClass("removeFromDesk");
			_this.find('.widget-drag-action').removeAttr("title");
			_this.find('.widget-drag-action').attr("title","从桌面删除");
			_this.data("draggable").disable();
		} else {
			_this.removeClass("widget_checked").find('.widget-drag-action').off('click.widget').on('click.widget',addWidget);
			_this.find('.widget-drag-action').removeClass("removeFromDesk").addClass("addToDesk");
			_this.find('.widget-drag-action').removeAttr("title");
			_this.find('.widget-drag-action').attr("title","添加到桌面");
			_this.data("draggable").enable();
		}
		if(menuCt.find(".menu-4-widget[widget-id='"+dragWid+"']").length > 0){
			_this.find('.widget-menu-action').off('click.menu').on('click.menu',removeFromMenu);
			_this.find('.widget-menu-action').removeClass("addToMenu").addClass("removeFromMenu");
			_this.find('.widget-menu-action').removeAttr("title");
			_this.find('.widget-menu-action').attr("title","从导航删除");
		} else {
			_this.find('.widget-menu-action').off('click.menu').on('click.menu',addToMenu);
			_this.find('.widget-menu-action').removeClass("removeFromMenu").addClass("addToMenu");
			_this.find('.widget-menu-action').removeAttr("title");
			_this.find('.widget-menu-action').attr("title","添加到导航");
		}
	});
}
function removeFromMenu(e){
	if(e.target.getAttribute('doing')=='doing'){
		return;
	}
	e.target.setAttribute('doing','doing');
	var wid = e.target.getAttribute("widget-id");
	if(wid){
		var menuCt = $('#menu-for-widget');
		menuCt.find(".menu-4-widget[widget-id='"+wid+"']").remove();
		initWidgetShopItemState();
		submit_widget_form(null,function(){
			e.target.setAttribute('doing','down');
		});
	}
}
function addToMenu(e){
	if(e.target.getAttribute('doing')=='doing'){
		return;
	}
	e.target.setAttribute('doing','doing');
	var witem = $(e.target).closest("li.widget-drag-item");
	var widget = {};
	widget.app_id = witem.attr("widget-app");
	widget.id = witem.attr("widget-id");
	widget.type = witem.attr("widget-type");
	widget.path = witem.attr("widget-path");
	widget.title = witem.attr("widget-title");
	widget.widget_tpl = witem.attr("widget-tpl");
	widget.menu_action = witem.attr("widget-menu_action");
	
	createLeftMenu(widget,$('#menu-for-widget'));
	
	initWidgetShopItemState();
	submit_widget_form(null,function(){
		e.target.setAttribute('doing','down');
	});
	
}
function removeWidget(e){
	var wid = e.target.getAttribute("widget-id");
	if(wid){
		var widgets = $(".widget-accept-ct");
		widgets.find(".widget[widget-id='"+wid+"']").remove();
		initWidgetShopItemState();
		submit_widget_form(null);
	}
}

function addWidget(e){
	var witem = $(e.target).closest("li.widget-drag-item");
	var widget = {};
	widget.app_id = witem.attr("widget-app");
	widget.id = witem.attr("widget-id");
	widget.type = witem.attr("widget-type");
	widget.path = witem.attr("widget-path");
	widget.title = witem.attr("widget-title");
	widget.widget_tpl = witem.attr("widget-tpl");
	widget.menu_action = witem.attr("widget-menu_action");
	
	createWidget(widget,function(wStr){
		var ct = $(".widget-accept-ct.default-ct");
		if(ct.length==0){
			ct = $(".widget-accept-ct:first");
		}
		var newWidget = $(wStr);
		ct.prepend(newWidget);
		
		var iframe = newWidget.find('iframe[src2]');
		
		newWidget.attr('widget-id',widget.id);
		
		iframe.attr('src',iframe.attr('src2'));
		iframe.removeAttr('src2');
		
		initWidgetShopItemState();
		//显示关闭按钮
		initWidgetsCloseBtn(1);
		//保存修改
		submit_widget_form(null);
	});
}
$(function(){
	var sortChanged = false
		,acceptsCt = $('.widget-accept-ct')
		;
	/**
	 * widget-width-fixed  cls 加到widget 的div上面 widget改变咧的时候宽度就不会自适应了
	 * widget-drag-handle  cls 加到widget 里面的某个元素上面，限定拖拽元素
	 * ui-state-disabled   cls widget不可以拖拽了
	 * @private sortable-widget-dragging  cls 是拖拽过程中增加的中间过程js， 用于动态改变widget的高度，因为如果widget过高拖拽元素不方便定位
	 * ui-state-default-w" cls widget 如果带有，就不允许删除
	 */
	acceptsCt.sortable({
		//chrome 的配置是只有containment: $('.content-holder'),即可
//		appendTo: document.body,
//		containment: $('.frame-view-ct'),
		revert: true,
//		grid: [ 280, 280 ],
		items: ">.widget,>.place-holder-support",
		handle:".widget-drag-handle",
		cursor: "move",
		cancel: ".ui-state-disabled",
		zIndex:999999,
		tolerance: "pointer" ,
//		connectWith: ".widget-accept-ct,.widget-recycle-bin",
//		helper: function(event,item){
//			var cloneEl = item.clone().addClass('ui-sortable-helper');
//			cloneEl.find('iframe').attr('src','about:blank');
//			return cloneEl;
//		},
		placeholder : {
			element: function(currentItem) {
				var width = ''
					,height=''
					,tpl = currentItem.attr('widget-tpl')
					;
				if(currentItem.hasClass('width2') || (tpl && tpl.indexOf('width2')>-1)){
					width = ' width2 ';
				}
				if(currentItem.hasClass('width3') || (tpl && tpl.indexOf('width3')>-1)){
					width = ' width3 ';
				}
				if(currentItem.hasClass('height2') || (tpl && tpl.indexOf('height2')>-1)){
					height = ' height2 ';
				}
				if(currentItem.hasClass('height3') || (tpl && tpl.indexOf('height3')>-1)){
					height = ' height3 ';
				}
				return $('<h3 class="place-holder '+width+height+' "></h3>');
			},
			update: function(container, p) {
				
			}
		},
		start : function(event,ui){
			fixPlace(ui.placeholder,ui.item);
			sortChanged = false;
			//开始拖拽的时候
			//改变了widget的高度信息后需要刷新position
			$('iframe').each(function(){
				var $this = $(this);
				if($this.attr('iframefixed')=='iframefixed'){
					return;
				}
				var iframeFix = $('<div class="widget-draggable-iframeFix" style="background: #fff;"></div>')
				.css({
					width: this.offsetWidth+"px", height: this.offsetHeight+"px",
					position: "absolute", opacity: "0.001",  zIndex: 1000
				})
				.css($this.position());
				$this.after(iframeFix);
				$this.attr('iframefixed','iframefixed');
			});
		},
		update:function(event,ui){
			sortChanged = true;
		},
		change:function(event,ui){
			fixPlace(ui.placeholder,ui.item);
		},
		stop : function(event,ui){
			$('.place-holder-support',acceptsCt).remove();
			
			$('.widget-draggable-iframeFix').each(function(){
				var $this = $(this);
				$this.prev('iframe').removeAttr('iframefixed');
				$this.remove();
			});
			var item = ui.item ;
			if(!item.parent().hasClass("widget-accept-ct")){
				return;
			}
			if(item.attr("action-type")=="drag-widget"){//从widget商店拖拽过来的widget，创建及渲染过程
				var widget = {};
				widget.app_id = item.attr("widget-app");
				widget.id = item.attr("widget-id");
				widget.type = item.attr("widget-type");
				widget.path = item.attr("widget-path");
				widget.title = item.attr("widget-title");
				widget.widget_tpl = item.attr("widget-tpl");
				widget.menu_action = item.attr("widget-menu_action");
				
				createWidget(widget,function(wStr){
					item.after(wStr);
					var nw = item.find('~.widget').eq(0) ,iframe;
					iframe = nw.find('iframe[src2]');
					
					nw.attr('widget-id',item.attr('widget-id'));
					
					iframe.attr('src',iframe.attr('src2'));
					iframe.removeAttr('src2');
					item.remove();
					initWidgetShopItemState();
					//显示关闭按钮
					initWidgetsCloseBtn(1);
					//保存修改
					if(sortChanged){
						submit_widget_form(null);
					}
				});
				
			} else {
				//保存修改
				if(sortChanged){
					submit_widget_form(null);
				}
			}
			
		}
	});
	
	
});
function fixPlace(placeholder,item){
	var acceptsCt = $('.widget-accept-ct');
	$('.place-holder-support',acceptsCt).remove();
	if(!placeholder){
		return;
	}
	
	var psupport = '<h3 class="place-holder-support '+placeholder[0].className.replace('place-holder','')+' "></h3>'
		,ws
		,pi = 0
		,curApt
		,mx
		,mh
		,px = placeholder[0].clientWidth
		,ph = placeholder[0].clientHeight
		,cw
		,widgetId = placeholder.attr('widget-id')
		;

	while(curApt = acceptsCt.eq(pi++)){
		if(curApt.length==0){
			break;
		}
		ws = curApt.find('>.widget:visible,.place-holder').not('.ui-sortable-helper');
		mx = curApt[0].clientWidth;
		mh = curApt[0].clientHeight;
		var tw = 0;
		var nw = 0;
		for(var ii = 0 ,len = ws.length ;ii<len;ii++){
			cw = ws.eq(ii);
			if(item[0]==cw[0]){
				continue;
			}
			nw = cw[0].clientWidth+10;
			if(tw+nw > mx){//需要看看helper是否合适
				if(tw+px+10 <= mx){ //helper需要新增一个
					tw += (px+10);
					cw.before(psupport);
					if(tw+px+10 > mx){
						tw = nw;
					}
				} else {//说明宽度不够，但是+上placeholder又多了需要重新计算tw了
					tw = 0;
				}
			} else {//小于总宽度需要继续计算
				tw += nw;
				if(tw+px+10 > mx){
					tw = 0;
				}
				continue;
			}
		}
		while(tw!=0 && tw<mx){
			tw += (px+10);
			if(tw <= mx){ //helper需要新增一个
				curApt.append(psupport);
			}
		}
	}
	acceptsCt.sortable("refresh");
}
$(function(){
	var sortChanged = false;
	var menuCt = $('#menu-for-widget');
	
	menuCt.sortable({
		//chrome 的配置是只有containment: $('.content-holder'),即可
		revert: true,
		axis: "y",
		items: ">li",
		cursor: "move",
		distance : 5,
		zIndex:999999,
		
		placeholder : {
			element: function(currentItem) {
				return $('<h3 class="menu-place-holder"></h3>');
			},
			update: function(container, p) {
			}
		},
		start : function(event,ui){
			sortChanged = false;
			menuCt.attr('menuSorting','menuSorting');
			$('iframe').each(function(){
				var $this = $(this);
				if($this.attr('iframefixed')=='iframefixed'){
					return;
				}
				var iframeFix = $('<div class="widget-draggable-iframeFix" style="background: #fff;"></div>')
				.css({
					width: this.offsetWidth+"px", height: this.offsetHeight+"px",
					position: "absolute", opacity: "0.001",  zIndex: 1000
				})
				.css($this.position());
				$this.after(iframeFix);
				$this.attr('iframefixed','iframefixed');
			});
		},
		update:function(event,ui){
			sortChanged = true;
		},
		stop : function(event,ui){
			$('.widget-draggable-iframeFix').each(function(){
				var $this = $(this);
				$this.prev('iframe').removeAttr('iframefixed');
				$this.remove();
			});
			var item = ui.item ;
			if(!item.parent().hasClass("widget-menu-ct")){
				return;
			}
			menuCt.attr('menuSorting','menuSorted');
			if(sortChanged){
				submit_widget_form(null);
			}
			
		}
	});
});

//初始化商店的item的拖拽
function initShopItemDD(){
	var wct = $(".widget-accept-ct:first");
	$('.widget-drag-item',document.getElementById('_widgetshopcontainer_')).draggable({
		connectToSortable : ".widget-accept-ct",
//		appendTo : $('.content-holder'),
//		containment : $('.content'),
		cursorAt : {
			right : 125,
			top : 30
		},
		zIndex:999999,
		helper : function(event){
			var tpl = this.getAttribute('widget-tpl')
			,width=''
			,w=288;
			if(tpl.indexOf('width2')!=-1){
				width = ' width2 ';
				w = 588;
			}
			
			var el = $('<div class="'+width+'" style="border:2px dotted red;"></div>').appendTo(document.body);
			el.css({
				zIndex:10000,
				width:w,
				height:288,
				position:"absolute"
			});
			return el;
			
		},
		start : function(){
			$('#_widgetshopcontainer_').hide();
		},
		stop : function(event,ui){
			$('#_widgetshopcontainer_').show();
		}
	});
}
//初始化商店的分页
function initShopPaper(pagesize,current,count,url){
	var _paper = $("#paper");
	_paper.ui_paper({
		pagesize:pagesize,
		current:current,
		count:count,
		url:url,
		ajaxOption : {
			callback: function(widgetsHtm) {
				$('#widget_shop_content').empty().append(widgetsHtm);
			}
		}
	});
}

function showWin(w){
	w.setAttribute('win-state','opening');
	w.style.display = 'block';
	$(w).stop().animate({
		width:802,
		height:560,
		top:35
	},function(){
		this.setAttribute('win-state','open');
		//$('.shop-show-btn').show();
		$(document).on('click.monitorDocClick',function(e){
			if($.contains(w,e.target) || w==e.target || $(e.target).hasClass('ui_paper_prep') || $(e.target).hasClass('ui_paper_next') || $(e.target).hasClass('ui_paper_num')){
				return;
			} else {
				setTimeout(function(){
					hideWin(w);
				},10);
			}
		});
	});
}
function hideWin(w){
	w.setAttribute('win-state','closing');
	$(w).stop().animate({
		width:0,
		height:0,
		top:175
	},function(){
		w.style.display = 'none';
		this.setAttribute('win-state','close');
		//$('.shop-show-btn').show();
		$(document).off("click.monitorDocClick");
	});
}

function showWidgetShop(){
	$('#max_widget_container').hide();
	var content = $('.content:first');
	if(!content.is(':visible')){
		content.show();
	}
	$('#portal_menu .lnav-item').removeClass('on');
	$('#portal_menu').find("#show_widget_shop_btn").addClass('on');
	$('#menu-for-widget .lnav-item').removeClass('on');
	var win = document.getElementById('_widgetshopcontainer_');
	if(win){
		if(win.getAttribute('win-state')=='close' || win.getAttribute('win-state')=='closing'){
			showWin(win);
		} else if(win.getAttribute('win-state')=='open' || win.getAttribute('win-state')=='opening'){
			hideWin(win);
		} else {
			showWin(win);
		}
	} else {
		var shopwin = $('<div style="width:0px;height:0px;top:175px;display:none;" id="_widgetshopcontainer_" class="widget-shop-container"><div class="shop-hide-btn"></div><div id="widget_shop_nav" class="widget-shop-nav"></div><div id="widget_shop_content" class="widget-shop-content"></div></div>');//<div class="shop-show-btn"></div>
		shopwin.appendTo($('.content-holder'));
		$('.shop-hide-btn',shopwin).on('click',function(){
			$('#portal_menu').find("#show_widget_shop_btn").removeClass('on');
			hideWin(shopwin[0]);
		});
		/*$('.shop-show-btn').on('click',function(){
			$('#portal_menu').find("#show_widget_shop_btn").addClass('on');
			showWin(shopwin[0]);
		});*/
		showWin(shopwin[0]);
		
		var wc = document.getElementById('_widgetshopcontainer_');
		if(!wc.getAttribute('data-load')){//没有loaddata，这时候就需要去loaddata
			//加载widget信息
			//首先加载分组
			$.ajax({
				url:'widgetGroup.htm?isWidget=true',
				type:'get',
				success:function(groupHtm){
					$('#widget_shop_nav').append(groupHtm);
				}
			});
			//然后加载某个grouo下的widget
			$.ajax({
				url:'widgetShop.htm?isWidget=true&group_id=',
				type:'get',
				success:function(widgetsHtm){
					$('#widget_shop_content').append(widgetsHtm);
				}
			});
			wc.setAttribute('data-load','loaded');
		}
	}
}
function maxWidget(menu,widgetData,src2){
	var maxCt = $('#max_widget_container')
		,menuCt = $('#menu-for-widget')
		,portalMenu = $('#portal_menu')
		;
	
	if((maxCt.data('max-id')==widgetData.id && maxCt.is(':visible')) || menuCt.attr('menuSorting')=='menuSorting'){
		return;
	}
	
	$('.lnav-item.on',portalMenu).addClass('dis');
	
	var toolbar = '<div class="max-widget-tools"><a class="restore-btn" href="###" title="返回"></a></div>';
	var iframeTpl = '<iframe width="100%" height="100%" frameborder="no" scrolling="no" id="{iframe-name}" class="iframe-proxy" name="{iframe-name}" src="{iframe-src}" ></iframe>';
	//创建iframe
	iframeTpl = iframeTpl.replace(/{iframe-name}/g,'iframe_proxy_'+(new Date().getTime()));
	//src赋值
	iframeTpl = iframeTpl.replace(/{iframe-src}/g,src2);
	
	$('.content:first').hide();
	//maxCt
	maxCt.empty().append(toolbar+iframeTpl).show();
	
	maxCt.find('.max-widget-tools .restore-btn').on('click',function(){
		maxCt.hide();
		$(menu).removeClass('on');
		$('.lnav-item.on',portalMenu).removeClass('dis');
		$('.content:first').show();
	});
	
	maxCt.data('max-id',widgetData.id);
	$('.lnav-item',menuCt).removeClass('on');
	$(menu).addClass('on');
}
