<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8" buffer="none" %>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>

<html>
	<head>
		<meta charset="utf-8" />
        <title>登录</title>
        <link href="${fn:getLink('css/tipbox.css')}" rel="stylesheet" type="text/css" />
		<link href="${fn:getLink('css/login.css')}" rel="stylesheet" type="text/css" />
		<script type="text/javascript" src="${fn:getLink('js/jquery.js')}"></script> 
		<script type="text/javascript" src="${fn:getLink('js/jquery.form.js')}"></script>
		<script type="text/javascript" src="${fn:getLink('js/md5.js')}"></script>
		<script type="text/javascript" src="${fn:getLink('js/jquery.tipbox.js')}"></script> 
		<script type="text/javascript" src="${fn:getLink('js/jquery-dom-ext.js')}"></script>
		<script type="text/javascript" src="${fn:getLink('js/base64.js')}"></script>
		<script type="text/javascript" src="${fn:getLink('js/messenger.js')}"></script>
		<script>

//全局变量
var global_go_url = '';
try{
	global_go_url =  decodeURIComponent("${global_go_url}");
}catch(ex){  
}  
var _ucURL = "${global_index_uc}";

//全局方法
function changeVerify(){
	var date = new Date();
    var url=_ucURL+"/index/verify.htm";
    var ttime = date.getTime();
    verifyImg.src = url + '&_='+ttime;
}
var login_salt = "${login_salt}";
ucLoginDlg = {
		_ucURL : _ucURL,
		dlgHtml : null,
		dlgTop: null,
		dlgOverlayer : null,
		withOverlayer: false,
		dlgMessenger : null,
		initDlgHtml : function(){
			this.dlgHtml ='<style> span.emptyhint { color: #999;position: absolute; padding-top: 8px;padding-left:3px; }'
				+'.disabled{opacity:0.5;filter:alpha(opacity=50);}</style>'
				+'<div id="login_dialog" class="login_dialog">'
				+'<div class="login_dialog_cnt clearfix">'
				+'<div class="login_dialog_cnt_l">'
				+'<form onsubmit="return false;" action="'+this._ucURL+'/uc/login/login.do?method=login" method="post" id="login_form" name="login_form">'
				+	'<div class="item">'
				+		'<label>账号</label>'
				+		'<input id="account" name="account" type="text"  placeholder="用户名/邮箱/手机号" />'
				+	'</div>'
				+	'<input id="pwd" name ="pwd" type="hidden" value="">'
				+	'<input id="pwd2" name ="pwd2" type="hidden" value="">'
				+	'<input id="verify_code" name ="verify_code" type="hidden" value="">'
				+	'<input id="hid_remember_me" name ="hid_remember_me" type="hidden" value="">'
				+	'<input id="RelayState" name="RelayState" type="hidden" value="">' 
				+'</form>'
				+	'<div class="item">'
				+		'<label>密码</label>'
				+		'<input id="password" name="password"  type="password" placeholder="密码"/>'
				+	'</div>'
				+	'<div class="item item-verify" id="verify_code_div">'
				+		'<label>验证码</label>'
				+		'<input style="width:150px;" id="verify" name="verify"  type="text" class="text-verify"  placeholder="验证码"  />'
				+		'<a href="javascript:changeVerify();" hideFocus="hidefocus" style="text-decoration:none;"> '
				+			'<img id="verifyImg" src=""'
				+			' alt="换一张" style="position:relative;top:6px;left:0px;"/>'
				+		'</a>&nbsp; '
				+		'<a style="font-size:14px;" href="javascript:changeVerify();" hideFocus="hidefocus">换一张</a>'
				+	'</div>'
				+	'<div class="item_btn">'
				+		'<input id="btn_submit" class="btn_submit" style="margin-left:50px;" type="button" value="">'//onclick="okSubmit()"
				+		'<a hideFocus="hidefocus" class="bnt_getpwd" href="'+this._ucURL+'/password/getPwd.htm" target="_blank" style="font-size:14px;margin:0px 0px 0px 20px;">忘记密码?</a>'
				+	'</div>'
				+	'</div>'
				+	'<div class="login_dialog_cnt_r">'
				+	'<div class="item_btn_others" id="item_btn_others">'
				+		'<span>使用其他账号登录：</span>'
				+		'<a target="_blank" hideFocus="hidefocus" id="dlg_sina" class="btn_login_type type_sina"  title="使用新浪微博账号登录"  href="javascript:;" temphref="'+this._ucURL+'/uc/login/login.do?method=otherLogin&type=sina" >新浪微博账号</a>'
				+		'<a target="_blank" hideFocus="hidefocus" id="dlg_qq" class="btn_login_type type_qq" title="使用QQ账号登录"  href="javascript:;" temphref="'+this._ucURL+'/uc/login/login.do?method=otherLogin&type=qq" >QQ账号</a>'
				+	'</div>'
				+	'</div>'
				+	'</div>'
				+	'<div class="login_dialog_footer">'
				+		'<div class="item_btn_others">'
				+			'没有账号？去<a hideFocus="hidefocus" href="'+this._ucURL+'/index/signupReal.htm" class="btn_signup" title="注册账号" target="_blank">注册</a>'
				+		'</div>'	
				+	'</div>'
				+'</div>';
		},
		initDlgTop : function(){
			this.dlgTop = 
				'<DIV class="ui-dialog-titlebar" >'
				+	'<SPAN id="ui-dialog-title-login_dialog" class="ui-dialog-title">&nbsp;</SPAN>'
				+	'<A class="ui-dialog-titlebar-close"	href="javascript:;">'
				+		'<SPAN class="ui-icon ui-icon-closethick">close</SPAN>'
				+	'</A>'
				+'</DIV>';
		},

		initDlgOverlayer: function(){
			this.dlgOverlayer = '<div class="uc-overlayer"></div>';
		},
		//提交ajax登录请求
		ajaxInit : null,
		initAjaxInit : function(){
			var $this = this;
			this.ajaxInit = {
				dataType : "jsonp",
				jsonp : "callbackparam",
				success : function(data) {
					if(data != 1 && data != 10){
						changeVerify();
						$("#btn_submit").removeAttr("disabled");
						$("#btn_submit").removeClass("disabled");
					}
					if(data == 1){
						if(!$this.dlgMessenger){
							$this.initMsger();
						}
						$this.dlgMessenger.send("loginok");
					}else if(data == 10){
						if(!$this.dlgMessenger){
							$this.initMsger();
						}
						var gotoUrl = encodeURIComponent($this._ucURL + "/index/supplement.htm");
						$this.dlgMessenger.send("goto:" + gotoUrl);
					}
					else if(data == -2){
						$("#_tipbox").remove();
						$("#verify").tipBox({tips:"验证码不正确！"});
					}else if(data == -1){
						document.getElementById('verify_code_div').style.display="block";
						$("#_tipbox").remove();
						$("#account").tipBox({tips:"用户名或密码错误！",relatedTo:"#password"});
					}else if(data == -5){
						$("#_tipbox").remove();
						$("#account").tipBox({tips:"账户不存在！"});
					}else if(data == 0){
						//跳转至激活页面超链接，传参 account
						var account = $('#account').val();
						var url = $this._ucURL + "/index/registerActivateEmail.htm";
						var msg = "账户尚未激活。<a style='color:blue' href='" + url + "' hideFocus='hidefocus' target='_blank'>去激活？</a>";
						$("#_tipbox").remove();
						$("#account").tipBox({tips:msg});
					}else if(data == 2){
						$("#_tipbox").remove();
						$("#account").tipBox({tips:"账号已被锁定，请1小时后重试！",relatedTo:"#password"});
						changeVerify();//刷新验证码
					}else if(data == 9){
							$("#_tipbox").remove();
							$("#account").tipBox({tips:"账号已被禁用！",relatedTo:"#password"});
							changeVerify();//刷新验证码
					}else if(data == 3){
						$("#_tipbox").remove();
						$("#account").tipBox({tips:"该用户已被删除！",relatedTo:"#password"});
						changeVerify();//刷新验证码
					}else{
						$("#_tipbox").remove();
						$("#account").tipBox({tips:"系统错误！请稍后重试！",relatedTo:"#password"});
					}
				},
				error : function(){
					changeVerify();
					$("#btn_submit").removeAttr("disabled");
					$("#btn_submit").removeClass("disabled");
					alert("请求失败，请稍后重试！");
				}
			}
		},
		//提交
		okSubmit : function(){
				if($.trim($('#account').val())==""){
					$("#account").tipBox({tips:"请输入用户名！"});
					return;
				}
				if($.trim($('#password').val())==""){
					$("#password").tipBox({tips:"请输入密码！"});
					return;
				}
				var password = $('#password').val();
				$("#pwd").val(toMD5Str(toMD5Str(password)+login_salt)); 
				$('#verify_code').val($('#verify').val());
				$('#RelayState').val(global_go_url);
				if(!this.ajaxInit){
					this.initAjaxInit();
				}
				$("#btn_submit").attr("disabled","disabled");
				$("#btn_submit").addClass("disabled");
				
				$("#login_form").ajaxSubmit(this.ajaxInit);
		},
		initDlgEvent : function(){
			if(!this.dlg)return;
			
			//登录提交事件
			var btn_submit = $("#btn_submit");
			var $this = this;
			if(btn_submit){
				btn_submit.click(function(){
					$this.okSubmit();
				});
			}
			
			// 密码框输入域回车登录
			$('#password')[0].onkeydown = function(event){
			    var e = event || window.event || arguments.callee.caller.arguments[0];   
			     if(e && e.keyCode==13){ // enter 键
			    	 $this.okSubmit();
			    }
			};
			// 验证码输入域 回车登录
			$('#verify')[0].onkeydown = function(event){
			    var e = event || window.event || arguments.callee.caller.arguments[0];   
			     if(e && e.keyCode==13){ // enter 键
			    	 $this.okSubmit();
			    }
			};
			
			var url =  encodeURIComponent(global_go_url);

			$("#item_btn_others").find("a").hover(function(){
				//临时市民卡登录无效
				if($(this).attr("id")=="dlg_ca_type1"){
					return false;
				}
				if($(this).attr("href").indexOf("javascript:")>=0){
					var gotoUrl = ($(this).attr("temphref")+ "&RelayState=" + url);
					$(this).attr("href",gotoUrl);
				}
				
			},function(){});
		},
		initPlaceHolders: function(){

		    if('placeholder' in document.createElement('input')){ //如果浏览器原生支持placeholder
		        return ;
		    }
		    var target = function (e){
		        var e=e||window.event;
		        return e.target||e.srcElement;
		    };
		    var _getEmptyHintEl = function (el){
		        var hintEl=el.hintEl;
		        return hintEl && g(hintEl);
		    };
		    var blurFn = function(e){
		        var el=target(e);
		        if(!el || el.tagName !='INPUT' && el.tagName !='TEXTAREA') return;//IE下，onfocusin会在div等元素触发 
		        var    emptyHintEl=el.__emptyHintEl;
		        if(emptyHintEl){
		            //clearTimeout(el.__placeholderTimer||0);
		            //el.__placeholderTimer=setTimeout(function(){//在360浏览器下，autocomplete会先blur再change
		                if(el.value) emptyHintEl.style.display='none';
		                else emptyHintEl.style.display='';
		            //},600);
		        }
		    };
		    var focusFn = function(e){
		        var el=target(e);
		        if(!el || el.tagName !='INPUT' && el.tagName !='TEXTAREA') return;//IE下，onfocusin会在div等元素触发 
		        var emptyHintEl=el.__emptyHintEl;
		        if(emptyHintEl){
		            //clearTimeout(el.__placeholderTimer||0);
		            emptyHintEl.style.display='none';
		        }
		    };
		    if(document.addEventListener){//ie
		        document.addEventListener('focus',focusFn, true);
		        document.addEventListener('blur', blurFn, true);
		    }
		    else{
		        document.attachEvent('onfocusin',focusFn);
		        document.attachEvent('onfocusout',blurFn);
		    }

		    var elss=[document.getElementsByTagName('input'),document.getElementsByTagName('textarea')];
		    for(var n=0;n<2;n++){
		        var els=elss[n];
		        for(var i =0;i<els.length;i++){
		            var el=els[i];
		            var placeholder=el.getAttribute('placeholder'),
		                emptyHintEl=el.__emptyHintEl;
		            if(placeholder && !emptyHintEl){
		                emptyHintEl=document.createElement('span');
		                emptyHintEl.innerHTML=placeholder;
		                emptyHintEl.className='emptyhint';
		                emptyHintEl.onclick=function (el){return function(){try{el.focus();}catch(ex){}}}(el);
		                if(el.value) emptyHintEl.style.display='none';
		                el.parentNode.insertBefore(emptyHintEl,el);
		                el.__emptyHintEl=emptyHintEl;
		            }
		        }
		    }
		},
		clear : function(){
			$("input").val("");
		},
		execCallback : function(){
			if(!$this.dlgMessenger){
				$this.initMsger();
			}
			this.dlgMessenger.send("execCallback");
		},
		initMsger : function(){
			this.dlgMessenger = Messenger.initInIframe();
		},
		init : function(config){
			$this = this;
			jQuery(document).ready(function($){
				if(typeof ($this.dlg) != "undefined" && $this.dlg[0]){
					return;
				}
				if($this._ucURL == null){
					$this._ucURL = _ucURL;
				}
				
				//渲染出登录框
				if(!$this.dlgHtml){
					$this.initDlgHtml();
				}
				//文本框提示
				$this.initPlaceHolders();
				if(!$this.dlgTop){
					$this.initDlgTop();
				}
				
				$("body").append('<div id="dlgLogin" class="dlg-login"></div>');
				$this.dlg = $("#dlgLogin");
				$this.dlg.append($this.dlgTop);
				$this.dlg.append($this.dlgHtml);
				
				//渲染遮罩层
				if($this.withOverlayer){
					if(!$this.dlgOverlayer){
						$this.initDlgOverlayer();
					}
					$("body").append($this.dlgOverlayer);
					//有遮罩层时将登录框居中，并可拖动
					$this.dlg.center();
				}
				
				//登陆框事件初始化
				$this.initDlgEvent();
				
				//登录ajax请求初始化
				$this.initAjaxInit();
				
				changeVerify();
				//市民卡登记链接颜色
				$("#dlg_ca_type1").css("color","#999");
				//文本框提示
				$this.initPlaceHolders();

				var login_fail_time = ${login_fail_time};
				if(login_fail_time >= 1){
					document.getElementById('verify_code_div').style.display="block";
				}else{
					document.getElementById('verify_code_div').style.display="none";
				}
				
				//初始化messenger
				$this.initMsger();
			});
		}		
};
		
		</script>
		
    </head>
    <body>
    <script type="text/javascript">
	    function _execCallback(){
	    	if(typeof(ucLoginDlg) != "undefined" && typeof(ucLoginDlg.execCallback) != "undefined"){
				ucLoginDlg.execCallback();
			}
		}    
	 	if(typeof(ucLoginDlg) != "undefined"){
	 		//ucLoginDlg.withOverlayer = false;
	 		ucLoginDlg.init();
	 	}
	 	
    </script>
	</body>
</html>
