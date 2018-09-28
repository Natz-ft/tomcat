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
	$('.bounceIn').on(
			"click",
			null,
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

	// 提交ajax登录请求
	var ajaxInit = {
		dataType : "json",
		success : function(data) {
			if (data == "1") {
				var html_txt = "";
				html_txt = html_txt + "<span><a href=\"" + uc_home_url + "\">"
						+ account + "</a></span>";
				html_txt = html_txt + "<span>|</span>";
				html_txt = html_txt + "<span><a id=\"logout\">退出</a></span>";
				$(".sy_headeright").html(html_txt);
				easyDialog.open({
					container : {
						content : '登录成功'
					},
					autoClose : 2000,
					callback : goUrl("login")
				});
			}else{
				easyDialog.open({
					container : {
						content : '登录失败'
					},
					autoClose : 2000,
					callback : goUrl("login")
				});
			}
		},
		error : function(e) {
			easyDialog.open({
				container : {
					content : "网络异常"
				},
				autoClose : 2000
			});
		}
	};

	$("#formLogin").submit(function() {
		var pass = document.getElementById('password').value;
		var login_salt = document.getElementById('login_salt').value;
		var is_internal_web = document.getElementById('is_internal_web').value;
		pass = toMD5Str(toMD5Str(pass) + login_salt);
		account = document.getElementById('account').value;
		$("#pwd").val(pass);
		$("#dialog").hide();
		$("#dialogBg").hide();
//		easyDialog.open({
//			container : {
//				content : "请稍候"
//			}
//		});
		
		$.ajax({
			type: "get",
			url: loginAjax,
			dataType: "jsonp",
			data: {pwd:pass,account:account,is_internal_web:is_internal_web},
			async:false,
			success : function(data) {
				if (data.res == "1") {
					var html_txt = "";
					html_txt = html_txt + "<span><a href=\"" + uc_home_url + "\">"
							+ account + "</a></span>";
					html_txt = html_txt + "<span>|</span>";
					html_txt = html_txt + "<span><a id=\"logout\">退出</a></span>";
					$(".sy_headeright").html(html_txt);
					if(data.sso_token!=null && data.sso_token!=""){
						document.cookie = "sso_token=" + encodeURIComponent(data.sso_token) +";path=/";
						document.cookie = "uc_nick_name=" + data.uc_nick_name +";path=/";
					}
					easyDialog.open({
						container : {
							content : '登录成功'
						},
						autoClose : 2000,
						callback : goUrl("login")
					});
				}else if(data.res == "-5"){
					easyDialog.open({
						container : {
							content : '用户不存在'
						},
						autoClose : 2000,
						callback : goUrl("login")
					});
				}else if(data.res == "-1"){
					easyDialog.open({
						container : {
							content : '用户名或密码错误'
						},
						autoClose : 2000,
						callback : goUrl("login")
					});
				}else if(data.res == "6"){
					easyDialog.open({
						container : {
							content : '该用户密码已经过期,请及时联系管理员'
						},
						autoClose : 2000,
						callback : goUrl("login")
					});
				}else if(data.res == "7"){
					easyDialog.open({
						container : {
							content : '该用户已经在线,不能重复登录'
						},
						autoClose : 2000,
						callback : goUrl("login")
					});
				}else if(data.res == "8"){
					easyDialog.open({
						container : {
							content : '该用户是内网用户,您不能登录'
						},
						autoClose : 2000,
						callback : goUrl("login")
					});
				}else if(data.res == "2"){
					easyDialog.open({
						container : {
							content : '账号被锁定，请稍后重试'
						},
						autoClose : 2000,
						callback : goUrl("login")
					});
				}else{
					easyDialog.open({
						container : {
							content : '登录失败'
						},
						autoClose : 2000,
						callback : goUrl("login")
					});
				}
			}
		});
//		$("#formLogin").ajaxSubmit(ajaxInit);
		return false;
	});
	$("#logout").on(
					"click",
					null,
					function() {
						easyDialog.open({
							container : {
								content : "请稍候"
							}
						});
						$
								.ajax({
									type : "get",
//									dataType : "json",
									url : logoutUrl,
									data:{callback_url:dataUrl+"/index.htm"},
									success : function(data) {
										easyDialog.open({
											container : {
												content : data.substring(0,7)
											},
											autoClose : 3000,
//											callback : goUrl("logout")
										});
										$("#refushhtml").html(data);
//										setTimeout('redirect()','2000');
//										window.location.href = getRootPath() + "/index.htm";
									},
									error : function(e) {
										easyDialog.open({
											container : {
												content : "网络异常"
											},
											autoClose : 2000
										});
									}
								});
					});
	var goUrl = function(type) {
		// var href_url = window.location.href;
		// if(type=="login"){
		// if(href_url.indexOf("login.htm")>=0||href_url.indexOf("register")>=0){
		// location.href = uc_home_url;
		// }
		// }else if(type=="logout"){
		// if(href_url.indexOf("login.htm")<0||href_url.indexOf("register")<0){
		// location.href = login_url;
		// }
		// }
	};

	$("#setHome").click(function() {
		var vrl = window.location.href;
		try {
			$(this).style.behavior = 'url(#default#homepage)';
			$(this).setHomePage(vrl);
		} catch (e) {
			if (window.netscape) {
				try {
					netscape.security.PrivilegeManager
							.enablePrivilege("UniversalXPConnect");
				} catch (e) {
					alert("此操作被浏览器拒绝！\n请在浏览器地址栏输入“about:config”并回车\n然后将 [signed.applets.codebase_principal_support]的值设置为'true',双击即可。");
				}
				var prefs = Components.classes['@mozilla.org/preferences-service;1']
						.getService(Components.interfaces.nsIPrefBranch);
				prefs.setCharPref('browser.startup.homepage', vrl);
			}
		}
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
			/*easyDialog.open({
				container : {
					content : "搜索关键字不能为空"
				},
				autoClose : 2000
			});*/
			dialog.info("搜索关键字不能为空",function(){},2000);
			return false;
		}
		return true;
	};

