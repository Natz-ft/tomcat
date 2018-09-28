<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="f" uri="http://java.sun.com/jsp/jstl/functions"%>

<website:style href="css/dev/document/dev_admin_entrance.css" />
<script type="text/javascript">
if(document.getElementById("nav-doc")){
	document.getElementById("nav-doc").setAttribute("class", "nav-item on");
}
</script>
<div class="body-wrap clearfix">
	<website:widget path="dev/document/leftNav.jsp?cur_css=unAuditedApps" />
	<div class="wrap_content clearfix">
		<div class="devbox cont_main main_pad clearfix" style="background-color: #ffffff;">
			<div class="des-box">
				<div class="form-title">
					5.1API概述
				</div>
				<div class="des-body">
					<div class="desc_catalog" style="height:103px;">
						<a class="catalog_header">目录</a>
						<ul>
							<li><a href="#5.1.1">5.1.1&nbsp;API文档</a></li>
							<li><a href="#5.1.2">5.1.2&nbsp;API使用规范</a></li>
						</ul>
					</div>
					<div class="desc_title" id="5.1.1">5.1.1API文档</div>
					<p>平台对外提供的服务形态为类REST(也可以叫做RPC形态)。RPC形态其实就是Web Service的一种延续，只是少了繁重的解析、安全规范等，作为一种轻量级服务交互规范得到了新一代互联网企业的认同。这样的服务形态就可以很容易地从浏览器或移动设备调用它们。</p>
					<p style="color:red;">服务请求就是标准的Http的请求。编码方式采用UTF-8编码，返回结果统一采用JSON格式。</p>
					<p>如服务请求地址：<a>http://www.cddata.gov.cn/devweb/api/application/get_promoted_applist/1.0?client_id=36&client_secret=653bf265-3085-4814-833f-4a0986735a15&nums=5</a></p>
					<div class="main_desc">
						<table>
							<tbody>
								<tr><td><em>参数名称</em></td><td><em>参数说明</em></td></tr>
								<tr><td>服务上下文</td><td>必选参数，服务唯一标识。即示例中的“/application/get_promoted_applist”</td></tr>
								<tr><td>版本号</td><td>必选参数，即示例中的“1.0”</td></tr>
								<tr><td>访问令牌</td><td>必选参数，代表应用的身份和可访问服务的权限列表。即示例中的“client_id=36&client_secret=653bf265-3085-4814-833f-4a0986735a15”</td></tr>
								<tr><td>业务参数</td><td>可选参数，访问服务可能需要的业务参数。如“nums=5”</td></tr>
							</tbody>
						</table>
					</div>
					<div class="desc_title" id="5.1.2">5.1.2API使用规范</div>
					<p>为了更好的保障线上应用有良好的用户体验，请开发者按照此规范对开放平台API进行合理使用。若因违规调用相关API导致用户体验受到不良影响，警务云计算中心将有权按照相应处理办法对违规调用接口的应用进行处理。</p>
		    	<h3 class="des-title fb margin_6" >API使用规范</h3>
					<p>1. 所有接口均需按照开放平台接口的描述进行使用，详细描述可参见开放平台<a href="${fn:getConfValue('global.index.devweb')}/dev/developer/serviceList.htm" target="_blank">API列表</a>。</p>
					<p>2. 开发者对于用户信息类接口需谨慎使用，不得将用户信息用于除应用功能所需之外的一切用途。</p>
					<p>3. 开发者在使用日志、状态类接口时需让用户确认，不得在用户不知情的情况下以用户身份进行发布。接口调用通过审核后将不得随意更改，若要更改则需进行申请。</p>
					<p>4. API使用规范包含但不限于以上三条，任何影响用户体验、网站安全的功能都将被视为违规情况。
					</p>
		    	<h3 class="des-title fb margin_6" >API违规调用处理办法</h3>
					<p>1. 开发者通过用户信息类接口调用用户信息用于除应用功能之外的其他用途或属作恶应用，一经发现立即对该应用进行下线处理。应用相应功能修改完毕后可再次向平台申请上线。如果该应用属于再次违规将不得再次申请上线。</p>
					<p>2. 对于日志、状态、通知类等接口违规调用，平台将第一时间通知该应用开发者进行整改，同时视对用户体验影响程度大小对该接口进行暂停使用或频率限制。调整完毕之后可申请恢复使用违规调用接口。此外，开放平台有权对违规应用进行公告。</p>
					<p>3. 申请邮件标题统一为“应用“***”申请开通违规调用接口”，邮件内容注明APP id、APP名称、违规事项、解决方案及修复日期。</p>
			<h3 class="des-title fb margin_6">API调用错误码</h3>	
			<p>API调用错误响应中的错误码定义如下表所示：</p>
			<table  border="1" style="width:650px; line-height: 35px;">
					<tr class="td_center tr_height" style="background-color:#F4F4F4;font-weight:700">
						<td style="width: 40%">错误码（errorcode）</td><td style="width: 60%">错误描述（error description）</td>
					</tr>
					<tr class="tr_height">
						<td>40150</td><td>缺少必要的请求参数</td>
					</tr>
					<tr class="tr_height">
						<td >40160</td><td>应用id不存在、请求授权过程应用id不一致</td>
					</tr>
					<tr class="tr_height">
						<td >40201</td><td>访问令牌access_token无效或者过期</td>
					</tr>
					<tr class="tr_height">
						<td>40202</td><td>无权限访问，所申请的访问令牌不包含当前接口的授权，需求申请该服务并重新获取访问令牌</td>
					</tr>
					<tr class="tr_height">
						<td>40203</td><td>无效的API，无此API接口</td>
					</tr>
					<tr class="tr_height">
						<td>40204</td><td>服务调用频繁，超出所申请的服务级别</td>
					</tr>
				</table>
					
				</div>
			</div>
		</div>
	</div>
</div>
