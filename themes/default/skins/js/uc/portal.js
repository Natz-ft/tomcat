/*$(function(){
	//对触摸屏设备的拖拽支持
	if("ontouchend" in document){
		var scripts = [
			"/js/jquery.mobile.support.js",
			"/js/jquery.mobile.vmouse.js",
			"/js/jquery.mobile.event.js",
			"/js/jquery.ui.vmouse.js",
			"/js/jquery.ui.draggable.js"
		    ];
    	for(var i = 0 , len = scripts.length ; i < len ; i++ ){
        	var script = document.createElement('script');
        	script.type = "text/javascript";
        	script.src = scripts[i];
        	document.head.appendChild(script);
    	}
	}
});*/
/**
 * widget-width-fixed  cls 加到widget 的div上面 widget改变咧的时候宽度就不会自适应了
 * widget-drag-handle  cls 加到widget 里面的某个元素上面，限定拖拽元素
 * ui-state-disabled   cls widget不可以拖拽了
 * @private sortable-widget-dragging  cls 是拖拽过程中增加的中间过程js， 用于动态改变widget的高度，因为如果widget过高拖拽元素不方便定位
 * ui-state-default-w" cls widget 如果带有，就不允许删除
 * widget-close-btn   cls 动态的为widget增加 删除按钮
 */


//更改以后提交
function submit_widget_form(btn,callback){
	var colData = {};
	$('.widget-accept-ct').each(function(){
		colData[this.id] = getCtWidgetIds($(this));
	});
	$.ajax({
		url : "index.do?method=saveSpace",
		data : {colData:colData},
		type : 'post',
		success : function(res){
			$(btn).prop('disabled',false);
			if(res==0){
				alert('保存失败');
			}else{
				if($.isFunction(callback)){
					callback.apply(window);
				}
			}
		},
		error : function(){
			$(btn).prop('disabled',false);
			alert('保存失败');
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
 * widget = { app_id :'', id :'', type :'', path :'' ,title:""} 
 */
function createWidget(widget,cbFn){
	createLeftMenu(widget);
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
				cbFn(res);
			}
		});
	} else { //外部的
		var wStr = getWidgetTemplate();
		wStr = wStr.replace(/{widget-title}/g,widget.title);
		wStr = wStr.replace(/{iframe-name}/g,'iframe_proxy_'+(new Date().getTime()));
		wStr = wStr.replace(/{widget-path}/g,widget.path);
		cbFn(wStr);
	}
}
function createLeftMenu(widget){
	if(!widget.menu_action){
		return ;
	}
	
	var menuCt = $('#menu-for-widget')
		,menuTpl = '<li><a class="lnav-item menu-4-widget" href="###">{widget-title}</a></li>'
		,menuEle;
	
	menuTpl = menuTpl.replace(/{widget-title}/g,widget.title);
	
	
	if(widget.menu_action.indexOf('http://')>-1){
		menuTpl = menuTpl.replace(/###/g,widget.menu_action);
		menuEle = $(menuTpl).appendTo(menuCt);
	} else {
		var fn = widget.menu_action;
		menuEle = $(menuTpl).appendTo(menuCt);
		try{
			$('a.menu-4-widget',menuEle).on('click',function(){
				window[fn](this,widget);
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
		widgets.find(".widget-close-btn").off("click");
		widgets.find(".widget-close-btn").on("click",function(){
			if(confirm("是否删除？删除后可在“组件商店”中重新添加。")){
				$(this).parents(".widget:first").remove();
				initWidgetShopItemState();
				submit_widget_form(null);
 			}
		}).hover(function(){
				$(this).addClass("hover");
			},function(){
				$(this).removeClass("hover");
			});
		
	} else {
		widgets.find(".widget-close-btn").off("click").remove();
	}
}

/*初始化widgetsLoader中widget item的状态*/
function initWidgetShopItemState() {
	var widgets = $(".widget-accept-ct");
	$(".widgetListUL .widget-drag-item").each(function(){
		var _this = $(this);
		var dragWid = this.getAttribute("widget-id");
		if(widgets.find(".widget[widget-id='"+dragWid+"']").length > 0){
			_this.addClass("widget_checked").find('.widget-drag-action').off('click.widget').on('click.widget',removeWidget).text("删除");
			_this.data("draggable").disable();
		} else {
			_this.removeClass("widget_checked").find('.widget-drag-action').off('click.widget').on('click.widget',addWidget).text("添加");
			_this.data("draggable").enable();
		}
	});
}
function removeWidget(e){
	if(confirm("是否删除？删除后可在“组件商店”中重新添加。")){
		var wid = e.target.getAttribute("widget-id");
		if(wid){
			var widgets = $(".widget-accept-ct");
			widgets.find(".widget[widget-id='"+wid+"']").remove();
			initWidgetShopItemState();
			submit_widget_form(null);
		}
	}
}
function addWidget(e){
	var witem = $(e.target).parents("li.widget-drag-item:first");
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
	initWidgetsCloseBtn(1);
	
	initWidgetShopItemState();

	var sortChanged = false;
	/**
	 * widget-width-fixed  cls 加到widget 的div上面 widget改变咧的时候宽度就不会自适应了
	 * widget-drag-handle  cls 加到widget 里面的某个元素上面，限定拖拽元素
	 * ui-state-disabled   cls widget不可以拖拽了
	 * @private sortable-widget-dragging  cls 是拖拽过程中增加的中间过程js， 用于动态改变widget的高度，因为如果widget过高拖拽元素不方便定位
	 * ui-state-default-w" cls widget 如果带有，就不允许删除
	 */
	$('.widget-accept-ct').sortable({
		//chrome 的配置是只有containment: $('.content-holder'),即可
//		appendTo: document.body,
//		containment: $('.frame-view-ct'),
		revert: true,
		items: ">.widget",
		handle:".widget-drag-handle",
		cursor: "move",
		cancel: ".ui-state-disabled",
		zIndex:999999,
		cursorAt: { left: 220 },
		connectWith: ".widget-accept-ct,.widget-recycle-bin",
		helper: function(event,item){
			return item.clone();
		},
		
		placeholder : {
			element: function(currentItem) {
				//优化下
				var h = currentItem.height()?(currentItem.height()):'50';
				var w = currentItem[0].style.width;
				/*if(currentItem.hasClass('widget-width-fixed')){
					w = currentItem.width()?(currentItem.width()+'px'):'auto';
				}*/
				return $('<h3 class="place-holder" style="width:'+ w +';height:'+ h +'px"></h3>');
			},
			update: function(container, p) {
			}
		},
		start : function(event,ui){
			//如果从商店拖拽过来会有action-type=drag-widget 此时初始化一次helper的宽度，
			//因为cong dragable里面移动到sortable里面的时候，在经过的第一个sortable ct里面不能检测到over（我们在这里设置了helper的宽度）事件
			if(ui.item.attr("action-type")=="drag-widget" && !ui.item.attr('init-helper-size')){
				ui.item.attr('init-helper-size','init-helper-size');
				if(!ui.helper.hasClass('widget-width-fixed')){
					var toWidth = ui.placeholder[0].clientWidth;
					ui.helper.width(toWidth);
				}
			}
			//改变widget高度的代码放在这里。如果再提前的话有滚动条那么移动的指针就不能正确的指到widget上。
			//会有高度差，差来源于此widget之上减少的高度
			$('.widget-accept-ct >.widget').addClass('sortable-widget-dragging');
			//重新设置一下高度，不至于拖拽的对象与widget距离太远（有滚动条的时候因为widgedt高度都减少了，这时候中间会有空白，重置高度消减空白）
			resetColHeight();
			//如果不重新计算未知会有widget模块定位不准确的问题
			$('.widget-accept-ct').sortable("refreshPositions");
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
		over:function(event,ui){
			if(!ui.helper.hasClass('widget-width-fixed')){
				var toWidth = ui.placeholder[0].clientWidth;
				ui.helper.width(toWidth);
			}
		},
		update:function(event,ui){
			sortChanged = true;
		},
		stop : function(event,ui){
			$('.widget-accept-ct >.widget').removeClass('sortable-widget-dragging');

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
			
			//需要将两列的高度设置为最高的
			resetColHeight();
		}
	});
});
function resetColHeight(){
	var maxHeight = 500;
	$('.widget-accept-ct').each(function(){
		var h = 0;
		$('>.widget',this).each(function(){
			h += ($(this).height()+10);
		});
		maxHeight = Math.max(maxHeight,h);
	});
	$('.widget-accept-ct').height(maxHeight);
}
//初始化商店的item的拖拽
function initShopItemDD(){
	$('.widget-drag-item',document.getElementById('_widgetshopcontainer_')).draggable({
		connectToSortable : ".widget-accept-ct",
//		appendTo : $('.content-holder'),
//		containment : $('.content'),
		cursorAt : {
			right : 25,
			bottom : 60
		},
		helper : function(event){
			var el = $('<div style="border:2px dotted red;"></div>').appendTo(document.body);
			el.css({
				zIndex:10000,
				width:100,
				height:100,
				position:"absolute"
			});
			return el;
		},
		start : function(){
			$('#_widgetshopcontainer_').dialog( "close" );
		},
		stop : function(event,ui){
			$('#_widgetshopcontainer_').dialog("open");
		}
	});
}
//初始化商店的分页
function initShopPaper(pagesize,current,count,url){
	$("#paper").ui_paper({
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

function showWidgetShop(){
	if(document.getElementById('_widgetshopcontainer_')){
		$('#_widgetshopcontainer_').dialog({
			title:'插件商店',
			width:800,
			height:480
		});
	} else {
		$('<div id="_widgetshopcontainer_" class="widget-shop-container"><div id="widget_shop_nav" class="widget-shop-nav"></div><div id="widget_shop_content" class="widget-shop-content"></div></div>').dialog({
			title:'插件商店',
			width:800,
			height:480,
			zIndex:99999,
			appendTo: document.body,
			open: function(){
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
		});
	}
}

function maxWidget(menu,widgetData){
	var widget = $(".widget-accept-ct .widget[widget-id='"+widgetData.id+"']")
		,maxCt = $('#max_widget_container')
		,maxSizeWidget = maxCt.data('maxSizeWidget');
	if(maxSizeWidget && maxSizeWidget.attr('widget-id')==widgetData.id){
		maxCt.show();
		return;
	} else {
		if(maxSizeWidget){
			maxSizeWidget.remove();
		}
		maxSizeWidget = widget.clone();
		maxSizeWidget.css({
			width:'100%',
			margin:'5px 0px',
			height:'auto'
		});
		maxCt.data('maxSizeWidget',maxSizeWidget);
		maxSizeWidget.find('.widget-max-btn,.widget-close-btn').on('click',function(){
			maxCt.hide();
		});
		maxCt.empty().append(maxSizeWidget).show();
	}
}