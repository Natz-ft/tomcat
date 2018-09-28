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

   
	var url = window.document.location.href;
	if (url.indexOf("catalog") > 0) {
		$(".sy_nav .sy_content ul a li").eq(1).addClass("sy_content_header_select");
	} else if (url.indexOf("analyse") > 0) {
		$(".sy_nav .sy_content ul a li").eq(2).addClass("sy_content_header_select");
	} else if (url.indexOf("relnet") > 0) {
		$(".sy_nav .sy_content ul a li").eq(3).addClass("sy_content_header_select");
	} else if (url.indexOf("map") > 0) {
		$(".sy_nav .sy_content ul a li").eq(4).addClass("sy_content_header_select");
	} else if (url.indexOf("appcenter") > 0) {
		$(".sy_nav .sy_content ul a li").eq(5).addClass("sy_content_header_select");
	} else if (url.indexOf("interact") > 0) {
		$(".sy_nav .sy_content ul a li").eq(6).addClass("sy_content_header_select");
	}else if (url.indexOf("developer") > 0) {
		$(".sy_nav .sy_content ul a li").eq(7).addClass("sy_content_header_select");
	}else if (url.indexOf("analysis") > 0) {
		$(".sy_nav .sy_content ul a li").eq(8).addClass("sy_content_header_select");
	}else{
		$(".sy_nav .sy_content ul a li").eq(0).addClass("sy_content_header_select");
	}
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
	$('.bounceIn').live(
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
		pass = toMD5Str(toMD5Str(pass) + login_salt);
		account = document.getElementById('account').value;
		edaccount = encodeURI(account);
		$("#pwd").val(pass);
		$("#dialog").hide();
		$("#dialogBg").hide();
//		easyDialog.open({
//			container : {
//				content : "请稍候"
//			}
//		});
		
		//跨域访问请求ucweb
		var uid = $('#sessionId').val();
		$.ajax({
			type: "post",
			url: loginAjax,
			dataType: "jsonp",
			data: {pwd:pass,account:edaccount},
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
						document.cookie = "uc_nick_name=" + encodeURIComponent(data.uc_nick_name) +";path=/";
					}
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
			}
		});
//		$("#formLogin").ajaxSubmit(ajaxInit);
		return false;
	});
	$("#logout").live(
					"click",
					function() {
						easyDialog.open({
							container : {
								content : "请稍候"
							}
						});
						$.ajax({
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
		debugger;
		var vrl = window.location.href;
		
		try {
			alert(0);
			$(this).style.behavior = 'url(#default#homepage)';
			alert(1);
			$(this).setHomePage(vrl);
		} catch (e) {
			alert(e);
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

//设为首页
function SetHome(obj,url){
    try{
        obj.style.behavior='url(#default#homepage)';
        obj.setHomePage(url);
    }catch(e){
        if(window.netscape){
            try{
                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
            }catch(e){
                alert("抱歉，此操作被浏览器拒绝！\n\n请在浏览器地址栏输入“about:config”并回车然后将[signed.applets.codebase_principal_support]设置为'true'");
            }
        }else{
            alert("抱歉，您所使用的浏览器无法完成此操作。\n\n您需要手动将【"+url+"】设置为首页。");
        }
    }
}
 
//收藏本站
function AddFavorite(title, url) {
    try {
        window.external.addFavorite(url, title);
    }
    catch (e) {
        try {
            window.sidebar.addPanel(title, url, "");
        }
        catch (e) {
            alert("抱歉，您所使用的浏览器无法完成此操作。\n\n加入收藏失败，请使用Ctrl+D进行添加");
        }
    }
}
 