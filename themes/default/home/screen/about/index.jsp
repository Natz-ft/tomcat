<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<website:title> ${regionStatistics.region_name }公共数据开放平台_平台介绍</website:title>
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
	.g-main .body {
		height: auto;
		overflow: hidden;
	}
	.b-right {
		border-left: 1px solid #d3d3d3;
		min-height: 238px
	}
	.b-left {
		border: none;
	}
	.center {
		text-align: center;
	}
</style>
<div class="g-main">
	<div class="body">
		<div class="b-left">
			<image src="${fn:getLink('img/about/menubg22.png')}"style="width:220px;height:70px"></image>
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
				<image src="${fn:getLink('img/about/menubg11.png')}" style="width: 925px;height: 164.44px"></image>
				<div class="content">本平台致力于提供成都市政务部门可开放的各类数据的下载与服务，为企业和个人开展公共信息资源的社会化开发利用提供数据支撑，推动信息增值服务业的发展以及相关数据分析与研究工作的开展。我们真诚邀请您光临和深入了解成都市公共数据开放平台，欢迎您指出我们工作中存在的不足，提出建议和意见，帮助改善我们的服务水平。</div>
			</div>
			<!--网站声明-->
			<div class="statement"
				<c:if test="${'2' != tab }">style="display: none"</c:if>>
				<div class="website">平台声明</div>
				<image src="${fn:getLink('img/about/Statement.png')}"  style="width: 100%;height: 100%"></image>
				<div class="content">
						<p><strong>第一条</strong> 请用户使用成都市公共数据开放平台（http://www.cddata.gov.cn/，以下简称“平台”）前仔细阅读本平台声明。使用成都市公共数据开放平台提供的任何数据、应用、服务前，您必须完全接受本声明中所包含的条款、条件和本平台即时刊登的通告，并且遵守中华人民共和国关于互联网的相关法律、规定与规则。一旦发生用户协议的条款变动，我们将及时在成都市公共数据开放平台页面上提示修改内容，用户如果不同意协议变动，可放弃访问使用成都市公共数据开放平台提供的任何服务、应用、数据；如果用户在协议变动后继续访问或使用平台，则视为已经接受协议的变动。</p>
						<p class="center" ><strong>第一章 提供服务</strong></p>
						<p><strong>第二条</strong> 成都市公共数据开放平台主要提供数据下载、API开发服务、应用程序上传与下载等功能。本平台数据涉及了表格、文本、图片、地图、多媒体等各类实时与非实时的政府可公开数据。平台所提供数据全部可供下载，具体使用详情请参阅网站提供的下载指引。</p>
						<p class="center" ><strong>第二章 用户的权利与义务</strong></p>
						<p><strong>第三条</strong> 通过平台成功注册的用户享有免费访问、获取、使用、传播分享和利用及再利用数据资源的权利。</p>
						<p><strong>第四条</strong> 用户在发布基于本平台站获取的公共信息资源开发的APP应用时，应确保其发布内容不会侵犯任何第三方的合法权益（包括但不限于著作权、商标权、专利权等），不会违反任何法律、法规、条例或规章，如造成法律纠纷及事故，由用户承担相应法律责任。</p>
						<p><strong>第五条</strong> 应遵守中华人民共和国有关互联网管理的相关法律和法规；遵守所有与网络服务有关的网络协议、规定和程序。</p>
						<p><strong>第六条</strong> 禁止对成都市公共数据开放平台进行技术性破坏，不得干扰或妨害成都市公共数据开放平台提供正常的互联网服务。</p>
						<p><strong>第七条</strong> 不得利用成都市公共数据开放平台进行任何可能对互联网的正常运转造成不利影响的行为。</p>
						<p><strong>第八条</strong> 不得利用成都市公共数据开放平台发布或传输任何骚扰性的、中伤他人的、辱骂性的、恐吓性的、庸俗淫秽的或其他任何非法的、可能产生不良后果的信息资料，不得发布任何包含种族、性别、宗教有歧视性和攻击性的信息内容。</p>
						<p><strong>第九条</strong> 用户发现任何非法使用用户帐号或安全漏洞的情况，应当立即告知本平台运营管理方。</p>
						<p><strong>第十条</strong> 不得为任何非法目的而使用、利用本平台；</p>
						<p><strong>第十一条</strong> 不得利用本平台散布广告以及其它商业化的宣传；</p>
						<p><strong>第十二条</strong> 在任何情况下，本平台合理地认为用户的行为可能违反法律、法规，本网站可以在任何时候，终止向该用户提供服务，并通知用户。</p>
						<p><strong>第十三条</strong> 用户在发布其APP应用之前，本平台有权对该应用予以审核，决定是否同意发布该应用；APP应用发布后，本平台如发现其违反该服务条款或任何相关法律、法规，有权在不通知的情况下对其予以删除或屏蔽。</p>
						<p><strong>第十四条</strong> 用户应在应用本平台的公共信息资源所产生的成果中注明公共信息资源来源为"成都市公共数据开放平台"，及时将应用情况通过本平台进行备案，并应积极配合有关的用户需求调查和数据资源调查。</p>
						<p><strong>第十五条</strong> 成都市公共数据开放平台包含的所有内容（包括但不限于：文本、图形、图片、视像及声音内容、LOGO标识，版面设计，专栏目录与名称、内容分类）的所有权归成都市人民政府所有。</p>
						<p class="center"><strong>第三章 免责声明</strong></p>
						<p><strong>第十六条</strong> 成都市公共数据开放平台不对由于操作和传播的延迟、通讯失败、互联网接入设备的困难，硬件或软件故障而造成的直接或间接损失承担责任。</p>
						<p><strong>第十七条</strong> 任何由于黑客攻击、计算机病毒侵入或发作、政府管制而造成的暂时性关闭等影响网络正常经营及其他不可抗力原因而造成的资料泄露、丢失、被盗用或被篡改等，本平台将采取必要措施尽力减少用户的损失，但本平台对此不承担任何责任。</p>
						<p><strong>第十八条</strong> 成都市公共数据开放平台包含到其他网站的链接，这些网站内容和隐私策略可能和我们不同，成都市公共数据开放平台不对由于这些网站内容和隐私策略造成的后果承担责任。</p>
						<p><strong>第十九条</strong> 成都市公共数据开放平台只作为一个通用的信息来源，可能不包括您需要的信息。我们将致力于不断丰富成都市公共数据开放平台的各项数据服务内容，但是也保留由于法律、法规、规则或政策调整等原因修订、中断或终止部分或全部网络服务的权利。</p>
						<p class="center"><strong>第四章 隐私保护声明</strong></p>
						<p><strong>第二十条</strong> 成都市公共数据开放平台尊重并保护所有本平台用户的个人隐私权，未经用户许可或根据相关法律、法规的强制性规定，本平台不会主动地将用户个人信息泄露给任意第三方。</p>
						<p class="center"><strong>第五章 平台保护</strong></p>
						<p><strong>第二十一条</strong> 成都市公共数据开放平台的内容，包括不限于源代码、页面、文档和在线图形、音频和视频等，受知识产权相关法律法规保护。</p>
						<p><strong>第二十一条</strong> 成都市公共数据开放平台的内容，包括不限于源代码、页面、文档和在线图形、音频和视频等，受知识产权相关法律法规保护。</p>
						<p><strong>第二十二条</strong> 我们将不遗余力地利用现有技术保护成都市公共数据开放平台以及所有存储和传输的用户资料，对于因计算机病毒或者其他非法软件导致的泄密事件，将依法追究责任。</p>
						<p class="center"><strong>第六章 条款申明</strong></p>
						<p><strong>第二十三条</strong> 本条款最终解释权归成都市大数据和电子政务管理办公室。</p>
				</div>
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
					<p>[APP应用]</p>
					<p><a href="/odweb//appcenter/index.htm">APP应用</a></p>
					<p>[开放统计]</p>
					<p><a href="/odweb//analyse/index.htm">开放统计</a></p>
					<p>[地图服务]</p>
					<p><a href="/odweb//map/index.htm">地图服务</a></p>
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
					<image src="${fn:getLink('img/about/contact12.png')}"style="width:380px;height:215px"></image>
				</div>
				<div class="ContactInfo" style="">
					<p>欢迎您对我们的工作提出任何宝贵的意见或建议!</p>
					<p>E- Mail：cdkfxxzysjj@126.com</p>
					<p>联系电话：028-61885952</p>
					<p style="display: none;">联系地址：成都市高新区锦悦西路2号1号楼A107室</p>
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
