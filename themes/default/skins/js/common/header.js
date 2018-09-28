var account;
$(function() {
   $(window).scroll(function () {
       if ($(window).scrollTop() >= 132) {
           $('.sy_nav').addClass('sy_navtop');
       }
	   if($(window).scrollTop() < 132) {
		   $('.sy_nav').removeClass('sy_navtop');
	   }
   });
});
var w, h, className;
function getSrceenWH() {
	w = $(window).width();
	h = $(window).height();
	$('#dialogBg').width(w).height(h);
}

window.onresize = function() {
	getSrceenWH();
};
$(window).resize();

$(function() {
	getSrceenWH();
	// 显示弹框
	$('#bounceIn').on(
			"click",
			function() {
				className = $(this).attr('class');
				$('#dialogBg').fadeIn(300);
				$('#dialog').removeAttr('class').addClass(
						'animated ' + className + '').fadeIn();
			});
	// 关闭弹窗
	$('.claseDialogBtn').click(function() {
		$('#dialogBg').fadeOut(300, function() {
			$('#dialog').addClass('bounceOutUp').fadeOut();
			$('#dialogBg').fadeOut();
		});
	});

	$("#formLogin").submit(function() {
		var pass = document.getElementById('password').value;
		var login_salt = document.getElementById('login_salt').value;
		var is_internal_web = document.getElementById('is_internal_web').value;
		pass = toMD5Str(toMD5Str(pass) + login_salt);
		account = document.getElementById('account').value;
		edaccount = encodeURI(account);
		$("#pwd").val(pass);
		$("#dialog").hide();
		$("#dialogBg").hide();
		var loginAjax = document.getElementById('loginAjax').value;
		//跨域访问请求ucweb
		var uid = $('#sessionId').val();
		$.ajax({
			type: "post",
			url: loginAjax,
			dataType: "jsonp",
			data: {pwd:pass,account:edaccount,is_internal_web:is_internal_web},
			async:false,
			success : function(data) {
				if (data&&data.res == "1") {
					var html_txt = "";
					var uc_home_url = document.getElementById('uc_home_url').value;
					html_txt = html_txt + "<span><a href=\"" + uc_home_url + "\">"
							+ account + "</a></span>";
					html_txt = html_txt + "<span>|</span>";
					html_txt = html_txt + "<span><a id=\"logout\">退出</a></span>";
					$(".sy_headeright").html(html_txt);
					if(data.sso_token!=null && data.sso_token!=""){
						document.cookie = "sso_token=" + encodeURIComponent(data.sso_token) +";path=/";
						document.cookie = "uc_nick_name=" + encodeURIComponent(data.uc_nick_name) +";path=/";
					}
					dialog.info("登录成功",function(){
						window.location.reload();
					},2000);
				}else if(data.res == "-5"){
					dialog.info("用户不存在",function(){
					},2000);
				}else if(data.res == "-1"){
					dialog.info("用户名或密码错误",function(){
					},2000);
				}else if(data.res == "6"){
					dialog.info("该用户密码已经过期,请及时联系管理员",function(){
					},2000);
				}else if(data.res == "7"){
					dialog.info("该用户已经在线,不能重复登录",function(){
					},2000);
				}else if(data.res == "8"){
					dialog.info("该用户是内网用户,您不能登录",function(){
					},2000);
				}else{
					dialog.info("登录失败",function(){
					},2000);
				}
			}
		});
//		$("#formLogin").ajaxSubmit(ajaxInit);
		return false;
	});
	$("#logout").on("click",function() {
		var logoutUrl = document.getElementById('logoutUrl').value;
		var dataUrl = document.getElementById('dataUrl').value;
		$.ajax({
				type : "get",
				url : logoutUrl,
				data:{callback_url:dataUrl+"/index.htm"},
				success : function(data) {
					dialog.info(data.substring(0,7),function(){
						//window.location.reload();
					},2000);
					$("#refushhtml").html(data);
				},
				error : function(e) {
					dialog.info("网络异常",function(){},2000);
				}
			});
	 	});

	$("#reginbutton").click(function(){
		location.href = register_url;
	});
	
});

function  register() {
	className = "bounceIn";
	$('#dialogBg').fadeIn(300);
	$('#dialog').removeAttr('class').addClass(
			'animated ' + className + '').fadeIn();
}

function redirect(){
	window.location.href = getRootPath() + "/index.htm";
}


//搜索相关
$(function(){

	$("#searchButton").click(function(){
		var flag = checkSearch();
		if(flag){
			$("#searchFormat").submit();
		}
		
	});
});
	function checkSearch(){
		var searchAllKey = $("#searchAllKey").val();
		
		if(null == searchAllKey || "" == searchAllKey || typeof(searchAllKey) == undefined){	
			dialog.info("搜索关键字不能为空",function(){},2000);
			return false;
		}
		return true;
	};