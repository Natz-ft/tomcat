<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8" buffer="none" %>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>

<style>
.prompt-contain {
	color: #666;
	width: 640px;
	margin: 40px auto 150px;
	text-align: left;
}
.prompt-title{
	margin: 10px 25px;
}
.prompt-top { 

	background-position: 0 0;
	height: 5px;
	width: 100%;
	/* background-color: #; */
}

.prompt-content {
	margin:2px 0px 0px 0px;
	background: white;
	width:100%;
	height:280px;
}


dt{
	font-size: 18px;
	padding: 15px 0;
	border-bottom: 1px solid #EEE;
	font-weight: bold;
}


.prompt-ok {
	background:
		url(${fn:getLink('images/uc/prompt/prompt-ok.png')})
		no-repeat;
	width: 68px;
	height: 68px;
	display: inline-block;
	margin：
}
.prompt-error {
	background:
		url(${fn:getLink('images/uc/prompt/prompt-error.png')})
		no-repeat;
	width: 68px;
	height: 73px;
	display: inline-block;
	margin：
}

dd {
	float: left;
	margin: 0;
	padding: 35px 25px;
}

p {
	margin: 0px;
	font-size: 14px;
	line-height: 30px;
}
</style>

<%
String flag = String.valueOf(request.getAttribute("flag"));
if("1".equals(flag)){
%>
<div class="prompt-contain">
	<div class="prompt-top"></div>
	
	<div class="prompt-content">
		<dl>
			<dt>
				 <span class="prompt-title"> 提示信息</span>
			</dt>
			<dd>
				<span class="prompt-ok"> </span>
			</dd>
			<dd style="width: 460px; height: 150px">
				
				<p><strong style="font-size: 16px">恭喜：激活成功!
					</strong>
				</p>
				
				<p style="color: #999;">
					系统将在<span id='remaining_time' style="color:#087AD3;"></span>秒后自动跳转...
					<br>
					如果不想等待直接点击<a href="${fn:getConfValue('global.index.odweb')}/index.htm" hideFocus="hidefocus">&nbsp;这里&nbsp;</a>转到登录页面
				</p>
			</dd>
		</dl>
	</div>
	<% }else if("-1".equals(flag)){  %>
	<div class="prompt-content" style="color: #666;width: 640px;margin: 40px auto 150px;text-align: left;">
		<dl>
			<dt>
				 <span class="prompt-title"> 提示信息</span>
			</dt>
			<dd>
				<span class="prompt-error"> </span>
			</dd>
			<dd style="width: 460px; height: 150px">
				
				<p><strong style="font-size: 16px">抱歉：无效激活链接,请先注册</strong></p>
				
				<p style="color: #999;">
					系统将在<span id='remaining_time'  style="color:#087AD3;"></span>秒后自动跳转...
					<br>
					如果不想等待直接点击<a href="${fn:getLink('uc/index/signup.jsp')}" hideFocus="hidefocus">&nbsp;这里&nbsp;</a>转到注册页面
				</p>
			</dd>
		</dl>
	</div>
	
</div>
<% }else if("0".equals(flag)){ %> 
	<div class="prompt-content" style="color: #666;width: 640px;margin: 40px auto 150px;text-align: left;">
		<dl>
			<dt>
				 <span class="prompt-title"> 提示信息</span>
			</dt>
			<dd>
				<span class="prompt-error"> </span>
			</dd>
			<dd style="width: 460px; height: 150px">
				
				<p><strong style="font-size: 16px">抱歉：激活链接已失效，请重新发送激活邮件</strong></p>
				
				<p style="color: #999;">
					系统将在<span id='remaining_time' style="color:#087AD3;"></span>秒后自动跳转...
					<br>
					如果不想等待直接点击<a href="${fn:getLink('uc/index/registerActivateEmail.jsp?flag=0')}" hideFocus="hidefocus">&nbsp;这里&nbsp;</a>转到邮箱激活页面
				</p>
			</dd>
		</dl>
	</div>
	
</div>
<% }else if("-2".equals(flag)){  %>
	<div class="prompt-content" style="color: #666;width: 640px;margin: 40px auto 150px;text-align: left;">
		<dl>
			<dt>
				 <span class="prompt-title"> 提示信息</span>
			</dt>
			<dd>
				<span class="prompt-error"> </span>
			</dd>
			<dd style="width: 460px; height: 150px">
				
				<p><strong style="font-size: 16px">抱歉：您不能激活账号</strong></p>
				
				<p style="color: #999;">
					错误原因：账号锁定或已删除
				</p>
			</dd>
		</dl>
	</div>
</div>
<% }else if("-3".equals(flag)){  %>
	<div class="prompt-content" style="color: #666;width: 640px;margin: 40px auto 150px;text-align: left;">
		<dl>
			<dt>
				 <span class="prompt-title"> 提示信息</span>
			</dt>
			<dd>
				<span class="prompt-error"> </span>
			</dd>
			<dd style="width: 460px; height: 150px">
				
				<p><strong style="font-size: 16px">抱歉：您无法完成激活账号</strong></p>
				
				<p style="color: #999;">
					错误原因：未知的错误
				</p>
			</dd>
		</dl>
	</div>
</div>
<% } %>
<script type="text/javascript">
var remaining_time = document.getElementById('remaining_time');
var t = 20;
var flag = '${flag}';
function changeTime(){
	t--;
	remaining_time.innerHTML="&nbsp;"+t+"&nbsp;";
	if(t==0){
		var url = null;
		if(flag == 1){
			url = "${fn:getConfValue('global.index.odweb')}/index.htm";
		}else if(flag == -1){
			url = "${fn:getLink('uc/index/signup.jsp')}";
		}else if(flag == 0){
			url = "${fn:getLink('uc/index/registerActivateEmail.jsp?flag=0')}";
		}
		if(url != null){
			window.location.href = url;
		}
		return;
	}
	setTimeout('changeTime()', 1000);
}
if(remaining_time != null){
	changeTime();
}
</script>