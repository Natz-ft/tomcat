function Raindrop(state,canvas,img){
	//	1	2	3
	this.state = state; //这场雨的大小

	this.canvas = canvas;
	
	this.img = img;
	
	this.init();
}
Raindrop.canvas = (!!document.createElement('canvas').getContext);
Raindrop.drops = {
	/*
	 * canvasId : {
	 * 		interval: interval,
	 * 		status : status,
	 * 		rains : []
	 * }
	 * 
	 * */
};
Raindrop.getRaindrop = function(state,canvas,img){
	var rd = new Raindrop(state,canvas,img);
	return rd;
}
Raindrop.stop = function(canvasId){
	if(Raindrop.drops[canvasId] && Raindrop.drops[canvasId].interval){
		clearInterval(Raindrop.drops[canvasId].interval);
		Raindrop.drops[canvasId].interval = null;
	}
	//清理画布
	if(Raindrop.canvas){ //支持canvas
		var canvas = document.getElementById(canvasId);
		var ctx = canvas.getContext("2d");
		ctx.clearRect(0,0,canvas.clientWidth,canvas.clientHeight);
	} else {
		Raindrop.drops[canvasId].rains.stop();
	}
}
/**
 * canvasId
 * status  1 小雨 2 中雨 3大雨
 * speed 速度 默认 20
 */
Raindrop.start = function(canvasId,status,speed){
	var curDrop = Raindrop.drops[canvasId];
	if(!curDrop){
		curDrop = Raindrop.drops[canvasId] = { };
	}
	if(curDrop.status != status){//重新绘制了
		var canvas = document.getElementById(canvasId);
		if(Raindrop.canvas){ //支持canvas
			var ctx = canvas.getContext("2d");
			ctx.clearRect(0,0,canvas.clientWidth,canvas.clientHeight);
			curDrop.rains = [];
			curDrop.status = status;
			
			var imgRain = new Image();
			imgRain.src = '../skins/images/weather/rain.png';
			
			imgRain.onload = function () {
				for(var i = 0 ,len = status*20+80 ; i<len ;i++){
					var dropRain = Raindrop.getRaindrop(status,canvas,imgRain);
					curDrop.rains.push(dropRain);
				}
				curDrop.interval = setInterval(function(){
					for(var i = 0 , len = curDrop.rains.length ; i<len ; i++){
						curDrop.rains[i].drop(speed);
					}
				},speed?speed:20);
				
				Raindrop.drops[canvasId] = curDrop;
			}
		} else {
			//清空雨滴
			curDrop.status = status;
			if(!curDrop.rains){
				curDrop.rains = Raindrop.getRaindrop(status,canvas,null);
			}
			Raindrop.drops[canvasId] = curDrop;
			curDrop.rains.start(status);
		}
	} else { //不需要重绘
		if(Raindrop.canvas){ //支持canvas
			if(Raindrop.drops[canvasId].interval){
				return ;
			}
			Raindrop.drops[canvasId].interval = setInterval(function(){
				for(var i = 0 , len = curDrop.rains.length ; i<len ; i++){
					curDrop.rains[i].drop(speed);
				}
			},speed?speed:20);
		} else {
			Raindrop.drops[canvasId].rains.start(status);
		}
	}
	
}
if(Raindrop.canvas){ //支持canvas
	Raindrop.prototype = {
			init : function(){
				this.width = this.canvas.clientWidth;
				this.height = this.canvas.clientHeight;
				
				this.ctx = this.canvas.getContext("2d");
				//初始化雨点时候的位置
				this.x = this._getRandomX();
				this.y = (this.height-Math.random()*this.height);
				this.speed = this._getSpeed();
			},
			drop : function(speed){
				speed = speed?speed:20;
				this.clear();
				if(this.y>=280){
					this.speed = this._getSpeed();
					this.x = this._getRandomX();
					this.y = -16;
				} else {
					this.y = this.y + (this.speed*speed);
				}
				this.ctx.drawImage(this.img , this._getBgPosition().x , this._getBgPosition().y,  2, 16, this.x, this.y,  2, 16);
				return this;
			},
			
			clear:function(){
				this.ctx.clearRect(this.x, this.y , 2 , 16);
				return this;
			},
			
			_getRandomX : function(){
				var r = Math.random();
				r = r*this.width;
				return Math.ceil(r);
			},
			_getBgPosition : function (){
				//w -4 ~ 0 越来越大  %2
				//h -128 ~ 0 越来越清晰 %16
				if(this.dropImg){
					return this.dropImg;
				}
				var w,h ,ra = Math.random()*100,ra2 = Math.random()*100;
				if(this.state == 1){
					w = ra<50 ? 4 : (ra>93?0:2);
					h = ra2<70 ? (ra2<40?128:112) : (ra2>85?80:96);
				} else if(this.state == 2){
					w = ra<35 ? 4 : (ra>80?0:2);
					h = ra2<40 ? (ra2<25?128:112) : (ra2>80?(ra2>90?48:64):96);
				} else {
					w = ra<30 ? 4 : (ra>75?0:2);
					h = ra2<30 ? (ra2<10?128:112) : (ra2>60?(ra2>80?48:64):96);
				}
				this.dropImg = {x:w,y:h};
				return this.dropImg; 
			},
			_getSpeed : function (){
				return this.height/((this.state > 2 ? 3000 : (this.state > 1 ? 3200 : 3500))-Math.random()*2500);
			}
		}
} else { //不支持canvas
	Raindrop.prototype = {
		init : function(){
			this.runStatus = 'stop';
			this.canvas.style.display = 'none';
			this.width = this.canvas.parentNode.clientWidth;
			this.height = this.canvas.parentNode.clientHeight;
			
			this.rains = $(this._createRain(90));
			$(this.canvas).after(this.rains);
			
		},
		dropAnimate : function (ele,speed){
			var _this = this;
			//位置 雨滴大小
			ele.animate({
				top:'264px'
			},speed?speed:this._getSpeed(),function(){
				ele.css({
					'left':_this._getRandomX.call(_this)+'px',
					'top':'-16px',
					'background-position':_this._getBgPosition.call(_this)
				});
				if(_this.runStatus=='run'){
					_this.dropAnimate.call(_this, ele );
				}
			});
		},
		stop:function(){
			//this.runStatus = 'stop';
			//this.rains.stop();
//			并没有真正停止，因为IE浏览器停止再运行效率非常低
			this.canvas.parentNode.style.display = 'none';
		},
		start:function(state){
			if(state){
				this.state = state;
			}
			this.canvas.parentNode.style.display = 'block';
			if(this.runStatus=='run'){
				return this;
			}
			this.runStatus = 'run';
//			this.canvas.parentNode.style.display = 'block';
			
			var _this = this;
			this.rains.each(function(){
				var ele = $(this);
				var startP = (_this.height-Math.random()*_this.height);
				ele.css({
					'left':_this._getRandomX.call(_this)+'px',
					'top':startP+'px',
					'background-position':_this._getBgPosition.call(_this)
				});
				_this.dropAnimate.call(_this, ele , 1800-2*startP);
			});
		},
		_createRain : function(num){
			var res = ''
				,rainTpl = '<div class="rain-drop"></div>';
			while(num--){
				res += rainTpl;
			}
			return res;
		},
		_getRandomX : function(){
			var r = Math.random();
			r = r*this.width;
			return Math.ceil(r);
		},
		_getBgPosition : function (){
			//w -4 ~ 0 越来越大  %2
			//h -128 ~ 0 越来越清晰 %16
			
			var w,h ,ra = Math.random()*100,ra2 = Math.random()*100;
			if(this.state == 1){
				w = ra<50 ? -4 : (ra>93?0:-2);
				h = ra2<70 ? (ra2<40?-128:-112) : (ra2>85?-80:-96);
			} else if(this.state == 2){
				w = ra<35 ? -4 : (ra>80?0:-2);
				h = ra2<40 ? (ra2<25?-128:-112) : (ra2>80?(ra2>90?-48:-64):-96);
			} else {
				w = ra<30 ? -4 : (ra>75?0:-2);
				h = ra2<30 ? (ra2<10?-128:-112) : (ra2>60?(ra2>80?-48:-64):-96);
			}
			return w+'px '+h+'px';
		},
		_getSpeed : function (){
			return (this.state>2?3000:(this.state>1?3200:3500))-Math.random()*2500;
		}
	}
	
}
