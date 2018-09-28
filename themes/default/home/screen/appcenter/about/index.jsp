<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<website:title> ${regionStatistics.region_name }公共信息资源开放平台_平台介绍</website:title>
<website:meta name="title" content="数据开放平台_数据目录" />
<website:meta name="Keywords" content="大数据,数据开放,数据应用" />
<website:meta name="Description"
	content="数据开放平台融合政府数据、社会数据，面向社会开放提供海量数据资源。" />
<style>
	.content {
		text-indent: 2em;
		margin-top: 15px;
		font-size: 14px;
		line-height: 35px;
		color: #003333;
	}
</style>
<div class="g-main">
	<div class="body">
		<div class="b-left">
			<image src="${fn:getLink('img/about/menubg2.png')}"></image>
			<ul>
				<li id="1" <c:if test="${'1' == tab }">class="changeColor"</c:if>>平台介绍</li>
				<li id="2" <c:if test="${'2' == tab }">class="changeColor"</c:if>>平台声明</li>
				<li id="3" <c:if test="${'3' == tab }">class="changeColor"</c:if>>平台导航</li>
				<li id="4" <c:if test="${'4' == tab }">class="changeColor"</c:if>>联系我们</li>
			</ul>
		</div>
		<div class="b-right">
			<!--网站介绍-->
			<div class="introduction"
				<c:if test="${'1' != tab }">style="display: none"</c:if>>
				<div class="website">平台介绍</div>
				<image src="${fn:getLink('img/about/Introduction.png')}" style="width: 100%;height: 100%"></image>
				<div class="content">本网站致力于提供成都市政务部门可开放的各类数据的下载与服务，为企业和个人开展政务信息资源的社会化开发利用提供数据支撑， 推动信息增值服务业的发展以及相关数据分析与研究工作的开展。 我们真诚邀请您光临和深入了解本网站， 欢迎您指出我们工作中存在的不足，提出建议和意见，帮助改善我们的服务水平。</div>
			</div>
			<!--网站声明-->
			<div class="statement"
				<c:if test="${'2' != tab }">style="display: none"</c:if>>
				<div class="website">平台声明</div>
				<image src="${fn:getLink('img/about/Statement.png')}"  style="width: 100%;height: 100%"></image>
				<div class="content">
						平台声明
				</div>
				<!-- <div class="content">
					<p>请用户使用成都市公共信息资源开放平台（http://www.cddata.gov.cn/，以下简称“平台”）前仔细阅读本服务条款。使用平台提供的任何服务、应用、数据前，您必须完全接受本协议中所包含的条款、条件和平台即时刊登的通告，并且遵守中华人民共和国关于互联网的相关法律、规定与规则。 一旦发生用户协议的条款变动，我们将及时在平台页面上提示修改内容，用户如果不同意协议变动，可放弃访问使用平台提供的任何服务、应用、数据；如果用户在协议变动后继续访问或使用平台，则视为已经接受协议的变动。</p>
					<p>一、提供服务</p>
					<p>本网站主要提供数据下载、API开发服务、应用程序上传与下载等功能。网站数据涉及了表格、文本、图片、地图、多媒体等各类实时与非实时的政府可公开数据。网站所提供数据全部可供下载，具体使用详情请参阅网站提供的下载指引。</p>
					<p>二、用户的权利与义务</p>
					<p>(一)用户的权利与义务</p>
					<p>1.遵守所有与网络服务有关的网络协议、规定和程序；</p>
					<p>2.禁止对网站进行技术性破坏，不得干扰或妨害本网站提供正常的互联网服务；</p>
					<p>3.不得利用本网站进行任何可能对互联网的正常运转造成不利影响的行为；</p>
					<p>4.不得为任何非法目的而使用、利用本网站；</p>
					<p>5.不得利用本网站散布广告以及其它商业化的宣传；</p>
					<p>6.不得利用本网站发布或传输任何骚扰性的、中伤他人的、辱骂性的、恐吓性的、庸俗淫秽的或其他任何非法的、可能产生不良后果的信息资料，不得发布任何包含种族、性别、宗教有歧视性和攻击性的信息内容；</p>
					<p>7.用户发现任何非法使用用户帐号或安全漏洞的情况，应当立即告知本网站运营管理方。</p>
					<p>8．现阶段，用户有权免费获取本网站所提供的所有政务数据资源，享有数据资源的非排他使用权。用户不得有偿或无偿转让在本网站中获取的各种数据资源。</p>
					<p>9．用户应在应用本网站政务数据资源所产生的成果中注明政务数据资源来源为"成都市公共信息资源开平台"，及时将应用情况通过网站进行备案，并应积极配合有关的用户需求调查和数据资源调查。</p>
					<p>10．用户在发布基于本网站获取的政务数据资源开发的APP应用时，应确保其发布内容不会侵犯任何第三方的合法权益（包括但不限于著作权、商标权、专利权等），不会违反任何法律、法规、条例或规章，如造成法律纠纷及事故，由用户承担相应法律责任。</p>
					<p>(二)"成都市公共信息资源开放平台"的权利与义务</p>
					<p>1．本网站包含的所有内容（包括但不限于：文本、图形、图片、视像及声音内容、LOGO标识，版面设计，专栏目录与名称、内容分类）的所有权归成都市人民政府所有。</p>
					<p>2．在任何情况下，本网站合理地认为用户的行为可能违反法律、法规，本网站可以在任何时候，终止向该用户提供服务，并通知用户。</p>
					<p>3．用户在发布其APP应用之前，本网站有权对该应用予以审核，决定是否同意发布该应用。APP应用发布后，本网站如发现其违反该服务条款或任何相关法律、法规，有权在不通知的情况下对其予以删除或屏蔽。</p>
					<p>三、免责声明</p>
					<p>本网站所提供数据资源均为政务部门在履行政府职能过程中所采集，网站数据资源提供者对所提供数据的完整性、准确性、及时性不作担保。用户因使用本网站所提供数据而造成的任何损失，由用户自行承担。</p>
					<p>本网站包含到其他网站的链接，这些网站内容和隐私策略可能与本网站不同，本网站不对由于这些网站内容和隐私策略造成的后果承担责任；</p>
					<p>本网站保留由于法律、法规、规章或政策调整等原因而修订、中止、终止部分或全部网站、网络服务的权利。</p>
					<p>四、隐私保护声明</p>
					<p>本网站尊重并保护所有网站用户的个人隐私权，未经用户许可或根据相关法律、法规的强制性规定，本网站不会主动地将用户个人信息泄露给任意第三方。</p>
				</div> -->
			</div>
			<!--网站导航-->
			<div class="navigator"
				<c:if test="${'3' != tab }">style="display: none"</c:if>>
				<div class="website bottom-line">平台导航</div>
				<div class="content">
					<p>[首页]</p>
					<p><a href="/odweb//index.htm">首页</a></p>
					<p>[数据目录]</p>
					<p><a href="/odweb//catalog/index.htm?cata_type=default">数据目录</a></p>
					<p>[API目录]</p>
					<p><a href="/odweb/dev/developer/serviceList.htm">API目录</a></p>
					<p>[地图服务]</p>
					<p><a href="/odweb//map/index.htm">地图服务</a></p>
					<p>[开放指数]</p>
					<p><a href="/odweb//analyse/index.htm">开放指数</a></p>
					<p>[APP应用]</p>
					<p><a href="/odweb//appcenter/index.htm">APP应用</a></p>
					<p>[互动交流]</p>
					<p><a href="/odweb//interact/index.htm">互动交流</a></p>
					<p>[开发者中心]</p>
					<p><a href="/odweb/dev/developer/index.htm">开发者中心</a></p>
				</div>
			</div>
			<!--联系我们-->
			<div class="contact"
				<c:if test="${'4' != tab }">style="display: none"</c:if>>
				<div class="website bottom-line">联系我们</div>
				<div class="imgContainer">
					<image src="${fn:getLink('img/about/ContactUs.png')}"></image>
				</div>
				<div class="ContactInfo" style="">
					<p>E- Mail：</p>
					<p>联系电话：</p>
					<p>联系地址：</p>
					<p>邮政编码：</p>
				</div>
			</div>
		</div>
	</div>
</div>
<script type="text/javascript">
</script>
<!-- reference css -->
<website:style href="css/about/index.css" />

<!-- reference javascript-->
<website:script src="js/about/index.js" />
