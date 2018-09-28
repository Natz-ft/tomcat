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
					5.2API调用
				</div>
				<div class="des-body">
					<div class="desc_catalog" style="height:123px;">
						<a class="catalog_header">目录</a>
						<ul>
							<li><a href="#5.2.1">5.2.1&nbsp;获取api访问账号</a></li>
							<li><a href="#5.2.2">5.2.2&nbsp;申请服务</a></li>
							<li><a href="#5.2.3">5.2.3&nbsp;使用服务</a></li>
							<li><a href="#5.2.4">5.2.4&nbsp;具体例子</a></li>
						</ul>
					</div>
					<div class="desc_title" id="5.2.1">5.2.1获取api访问账号</div>
					<p>所有开发者使用平台提供的服务之前，均需要获得平台认证的访问身份，该身份可以让您监控应用对平台API的调用频率， 方便管理维护应用，同时也可以保证平台可以实时和您取得联系。</p>
					<p>获取访问账号首先需要注册成为平台开发者（如果您尚未注册，请您点击此处 注册成为应用开发者）， 然后创建自己的应用（如果您尚未创建应用，请点击此处 页面创建应用）， 之后便可凭借平台分配的应用id和secret去申请使用平台提供的服务。</p>
					<div class="desc_title" id="5.2.2">5.2.2申请服务</div>
					<p>数据开放平台提供的服务分为默认服务和高级服务，对于默认服务，应用开发者无需申请便可以使用，对于高级服务， 应用开发者可以点击此处 申请使用服务，已申请的高级服务需要由系统管理员审核(服务提供者)审核，审核通过后，即可使用相应的服务。</p>
					<div class="desc_title" id="5.2.3">5.2.3使用服务</div>
					<p>数据开放平台提供的服务均可以通过Rest方式进行调用，返回结果统一采用JSON格式, 服务调用方访问所有的服务接口都需要在请求头中附加一个访问令牌（token）， 关于如何获取访问令牌（token）请参考URL。</p>
					<p>环境地址：即调用接口(API)时，都通过访问该地址，来获取该接口需要获取的数据。 正式环境：http://10.68.6.2/auth/api</p>
					<p>示例：调用API：application/get_promoted_applist，版本1.0 通过查看该服务的信息可知传递参数 nums , 假如获取得到的access_token为653bf265-3085-4814-833f-4a0986735a15 拼装字符串：连接参数名与参数值，即 nums=5&access_token=653bf265-3085-4814-833f-4a0986735a15</p>
					<p>完整http请求地址：http://10.68.6.2/auth/api/application/get_promoted_applist/1.0?nums=5&access_token=653bf265-3085-4814-833f-4a0986735a15</p>
					<div class="desc_title" id="5.2.4">5.2.4具体例子</div>
					<p>本示例应用在开发过程中需调用“获取系统推荐的应用列表开放服务接口为例，应用已通过申请获得该服务授权。
						平台的开放服务接口均通过Rest方式进行调用。
					</p>
					<p>开发者可通过查看服务详细信息，获知服务的请求地址、请求参数、返回参数以及返回数据格式等。</p>
					<p>其中，请求参数分为通用参数和私有参数两种。通用参数access_token是所有RestAPI的统一请求参数，用以服务验证应用是否已经授权，该参数值可通过调用通用服务接口获取。私有参数是服务创建时自定义的输入参数。</p>
					<p>获取系统推荐的应用列表接口详细信息如下:</p>
					<span class="apiInvoking_img"></span>	
					<p>调用步骤及方式如下：</p>
					<p>第一步，调用获取access_token的RestAPI，将应用的appId和appSecret作为参数一并传入，获取应用的access_token,代码示例如下：</p>
					<p style="font-weight:bolder">JavaSDK获取访问令牌</p>
					<p>Oauth auth=new Oauth();</p>
					<p>AccessToken token=auth.getAccessTokenByCredentials();</p>
					<p>String tokenValue=token.getAccessTokenString();</p>
					<p style="font-weight:bolder">JavaSDK调用示例</p>
					<p>//创建调用对象</p>
					<p>OpenApi api = new OpenApi(client_ID,client_SERCRET);</p>
					<p>//传递上一步获取到的访问令牌参数</p>
					<p>api.client.setToken(access_token);</p>
					<p>// 组装业务参数（假如服务需要传递名称为nums的参数）</p>
					<p>PostParameter[] params = new PostParameter[] { new PostParameter("nums","具体参数值") };</p>
					<p>//调用服务得到结果</p>
					<p>JSONObject result=api.sendCommand(“/application/get_promoted_applist
”, “1”, “post”, params);</p>
					
				</div>
			</div>
		</div>
	</div>
</div>