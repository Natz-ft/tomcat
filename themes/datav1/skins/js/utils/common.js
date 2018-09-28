/**
 * haowenxiang
 * @returns
 */
var loadingimg ="";

function killerrors() { return true; }

//window.onerror = killerrors; 


String.prototype.trim = function(){
	var exp = /(^\s*)|(\s*$)/g;
	return this.replace(exp, '');
};
String.prototype.rtrim = function() { 
	return this.replace(/(\s*$)/g,""); 
};
String.prototype.isEmpty = function(){
	if(typeof(this) == "undefined"){
		return false;
	}
    if (this != null && !/^\s*$/.test(this)) {
        return false;
    } else {
        return true;
    }
};
String.prototype.endWith=function(str){
	if(str == null||str == ""||this.length == 0||str.length > this.length)
	  return false;
	if(this.substring(this.length-str.length)==str)
	  return true;
	else
	  return false;
	return true;
};
String.prototype.startWith=function(str){
	if(str==null||str==""||this.length==0||str.length>this.length)
	  return false;
	if(this.substr(0,str.length)==str)
	  return true;
	else
	  return false;
	return true;
};
String.prototype.startsWith=function(str){
	if(str==null||str==""||this.length==0||str.length>this.length)
	  return false;
	if(this.substr(0,str.length)==str)
	  return true;
	else
	  return false;
	return true;
};
Array.prototype.contains = function (element) { 
	for (var i = 0; i < this.length; i++) { 
		if (this[i] == element) { 
			return true; 
		} 
	} 
	return false; 
};



/**
 * 获取cookie
 * @param c_name cookie名称
 * @returns
 */
function getCookie(c_name){
	if (document.cookie.length>0) {
		c_start=document.cookie.indexOf(c_name + "=");
		if (c_start!=-1){ 
			c_start=c_start + c_name.length+1;
			c_end=document.cookie.indexOf(";",c_start);
			if (c_end==-1) 
				c_end=document.cookie.length;
			return unescape(document.cookie.substring(c_start,c_end));
		} 
	}
	return "";
}
function setCookie(c_name,value,expiredays){
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + expiredays);
	//exdata.setTime(exdate.getTime() + expiredays*24*60*60*1000);
	//alert(exdate);
	document.cookie = c_name + "=" + escape(value) + ((expiredays==null) ? "" : ";expires=" + exdate.toGMTString())
	+ ";path=/";
}

function createFivestar(data) {
	$.fiveStar(data.value, data.max, data.id);
}

function goTopEx(){
  var obj=document.getElementById("goTopBtn");
  function getScrollTop(){
    return document.documentElement.scrollTop || document.body.scrollTop;
  }
  function setScrollTop(value){
    document.documentElement.scrollTop=value;
    document.body.scrollTop = value;
  }
  window.onscroll=function(){getScrollTop()>0?obj.style.display="":obj.style.display="none";};
  obj.onclick=function(){
    var goTop=setInterval(scrollMove,10);
    function scrollMove(){
      setScrollTop(getScrollTop()/1.2);
      if(getScrollTop()<1)clearInterval(goTop);
    }
  };
}

/**
 * 判断变量是否是整形
 * @param {} str
 */
function isInt(str){
	if((str==null) || (typeof(str)=='undefined')){
		return false;
	}
	var reg = /^(-|\+)?\d+$/ ;
	return reg.test(str);
}

/**
 * 判断一个字符是否为空
 */
function isNull(str){
	if((typeof(str) == "undefined") || (str == null) || (str.length == 0)){
		return true;
	}
	return false;
}


/**
 * 只能输入数字只能有一个小数点，小数点不能在开头，不能在结尾，第一位允许添加负号
 * @param {} obj
 */
function checkInputNum(obj){
   //得到第一个字符是否为负号
   var t = obj.value.charAt(0);  
   //先把非数字的都替换掉，除了数字和.   
   obj.value = obj.value.replace(/[^\d.]/g,"");   
   //必须保证第一个为数字而不是.   
   obj.value = obj.value.replace(/^\./g,"");   
   //保证只有出现一个.而没有多个.   
   obj.value = obj.value.replace(/\.{2,}/g,".");   
   //保证.只出现一次，而不能出现两次以上   
   obj.value = obj.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
   //如果第一位是负号，则允许添加
   if(t == '-'){
     obj.value = '-'+obj.value;
   }
}

/**
 * 判断是否为空对象
 * @param {} obj
 * @return {Boolean}
 */
function isEmptyObject(obj){
	for(var o in obj){
		if(o){}
	   return false;
	}
	return true;
}

/**
 * 获取工程根目录
 * @returns
 */
function getRootPath(){  
    //获取当前网址，如： http://localhost:8088/test/test.jsp  
    var curPath=window.document.location.href;  
    //获取主机地址之后的目录，如： test/test.jsp  
    var pathName=window.document.location.pathname;  
    var pos=curPath.indexOf(pathName);  
    //获取主机地址，如： http://localhost:8088  
    var localhostPaht=curPath.substring(0,pos);  
    //获取带"/"的项目名，如：/test  
    var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);  
    return(localhostPaht+projectName);  
} 
