function Tips(){
	this.id = new Date().getTime()+'_'+(++Tips.index);
//	this.el
	this.init();

};
Tips.prototype = {
	init : function(){
		var div = document.createElement('div');
		div.id = this.id;
		this.el = div;
		document.body.appendChild(div);
	},
	
	getEl : function(){
		return this.el;
	}
}
Tips.index = 0;
Tips.cache = {};
Tips.isIE6 = /msie 6\.0/i.test(navigator.userAgent);

Tips.getFlashLayer = function(css){
	var box = Tips.cache['flash_layer'] , el ;
	if(!box){
		box = Tips.cache['flash_layer'] = new Tips();
		el = $(box.getEl());
		
		el.css({
			position : Tips.isIE6 ? 'absolute' : 'fixed',
			minWidth: '150px',
			maxWidth:'230px',
			minHeight:'30px',
			_height:'50px',
			top : '50px',
			border:'3px solid rgb(124, 209, 16)',
			backgroundColor:'#fafafa',
			textAlign:	'center',
			padding:'8px 15px',
			fontSize:'14px',
			fontFamily:'Microsoft YaHei',
			zIndex : 100001
		}).addClass('tips-flash-layer');
		
	} else {
		el = $(box.getEl())
	}
	
	el.css($.extend({
		border:'3px solid rgb(124, 209, 16)',
		left:($.getViewWidth()-el.width())/2
	},css));
	return box;
}
Tips.success = function(msg,ani,fn,css){
	var box = Tips.getFlashLayer(css||{}),el;
	el = $(box.getEl());
	if(jQuery.isFunction(ani)){
		fn = ani;
		ani = {};
	}
	
	el.empty().html(msg||"").show();
	var callbacks = $.Callbacks();
	callbacks.add(function(){
		el.css({
			display : 'none',
			opacity : 1
		});
	});
	callbacks.add(fn||$.noop);
	setTimeout(function(){
		el.animate($.extend({
			opacity : 0
		},ani||{}),callbacks.fire);
	},1200);
};
Tips.error = function(msg,ani,fn){
	if(jQuery.isFunction(ani)){
		fn = ani;
		ani = {};
	}
	Tips.success(msg,ani,fn,{
		border:'3px solid red'
	});
};
Tips.confirm = function(title,msg,align,fn){
	var box = Tips.cache['confirm_layer'] , el ;
	if(!box){
		box = Tips.cache['confirm_layer'] = new Tips();
		el = $(box.getEl());
		
		el.css({
			position : 'absolute',
			minWidth: '180px',
			maxWidth:'230px',
			minHeight:'50px',
			_height:'50px',
			border:'1px solid #a3a3a3',
			borderRadius:'3px',
			backgroundColor:'#fbfbfb',
			textAlign:	'right',
			padding:'8px 16px',
			boxShadow:"0px 1px 1px 1px #c1c1c1",
			zIndex : 100001
		}).addClass('tips-confirm');
		var cont = '<div class="tips-confirm-title" style="text-align:left;margin-bottom:5px;font-size:15px;font-family:\'Microsoft YaHei\';"></div>'
					+'<div class="tips-confirm-msg" style="text-align:left;line-height:16px;margin-bottom:5px;font-size:13px;padding:3px 0;"></div>'
					+'<input type="button" class="tips-button" style="border-radius:2px;background:#f9f9f9;width:70px;height:30px;border:1px solid #3c79ee;margin-right:10px;" value="确定" onclick="Tips._closeConfirm(true)">'
					+'<input type="button" class="tips-button" style="border-radius:2px;background:#f9f9f9;width:70px;height:30px;border:1px solid #b3b3b3;" value="取消" onclick="Tips._closeConfirm(false)">'
					;
		cont = $(cont).appendTo(el);
		el.find('.tips-button').mousedown(function(){
			this.style.backgroundColor = '#e6e6e6';
			this.style.fontWeight = 'bold';
		}).on('mouseout mouseup',function(){
			this.style.backgroundColor = '#f9f9f9';
			this.style.fontWeight = 'normal';
		});
	} else {
		el = $(box.getEl())
	}
	if(jQuery.isFunction(msg)){
		fn = msg;
		msg = title;
		title='确认对话框';
		align = false;
	} else if(jQuery.type(msg)!='string'){
		fn = align;
		align = msg;
		msg = title;
		title='确认对话框';
	} else if(jQuery.isFunction(align)){
		fn = align;
		align = false;
	}
	
	el.find('.tips-confirm-msg').empty().html(msg||"");
	if(!title){
		el.find('.tips-confirm-title').hide();
	} else {
		el.find('.tips-confirm-title').empty().show().html(title);
	}
	
	
	el.show().position({
		my: align?"left top":'center',
		at: align?"left bottom":'center',
		of: align||window
	});
	
	Tips._cb = fn;
	
}
Tips._closeConfirm = function(ok){
	var box = Tips.cache['confirm_layer'] , el ;
	if(!box){
		return;
	} else {
		el = $(box.getEl());
		el.hide();
		if(jQuery.isFunction(Tips._cb)){
			Tips._cb.call(this,ok);
			Tips._cb = null;
		}
	}
}
jQuery.extend({
	getViewWidth : function(){
		if (!+[1,]) {//ie
			return (document.compatMode == "CSS1Compat") ? document.documentElement.clientWidth
					: document.body.clientWidth;
		} else {
			return self.innerWidth;
		}
	},
	getViewHeight : function(){
		if (!+[1,]) {
			return (document.compatMode == "CSS1Compat") ? document.documentElement.clientHeight
					: document.body.clientHeight;
		} else {
			return self.innerHeight;
		}
	}
});	
