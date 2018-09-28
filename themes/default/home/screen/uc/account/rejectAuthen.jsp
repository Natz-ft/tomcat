<%@page import="java.io.Writer"%>
<%@page import="java.util.*"%>
<%@page import="java.io.UnsupportedEncodingException"%>
<%@page import="java.net.URLDecoder"%>
<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<website:style href="css/account.css"/>
<website:style href="css/account/rejectauth.css"/>
<div class="panel account-show-panel">
	<div class="content-title">
		<span class="title-icon"></span><span>实名认证</span>
	</div>
	<div class="cause-tips">
		<img class="reject-img" src="${fn:getLink('images/reject-th.png')}">
		<div class="tip-cause">
			对不起，您上传的照片<span class="cause-detail" title="${rejectCause}">${rejectCause}</span>不能通过审核，请阅读上传照片要求，并<a
				style="color: #F17303;"
				href="${fn:getLink('account/realAuthen.jsp')}">重新上传</a>您的证件！
		</div>
	</div>
	<div class="explain-contain">
		<p style="color:#1687cd;font-size:15px;line-height:24px;margin-bottom:7px;">认证审核不通过原因解释：</p>
		<p class="cause-explain">1、照片证件模糊：即手持证件照中的证件上面的信息模糊，要求是看清每个字。</p>
		<p class="cause-explain">2、证件信息不完整：即手持证件照中的证件信息不完整，可能是一部分未拍摄进照片，也可能是被手指等遮挡住了。</p>
		<p class="cause-explain">3、照片有修改痕迹：照片的内容有切割、ps过的情况，或者照片拍摄角度诡异，被误认为有修改痕迹。
		</p>
		<p class="cause-explain">4、头像与身份证照片不符：即持身份证人与身份证中头像不符，也就是非本人。</p>
		<p class="cause-explain">5、无效照片，请手持身份证证件与本人头部合影：即不符合示例图的姿势，或者照片中无法判定是否为本人手持，建议拍摄的时候身份证比例不要超过照片的1/2，直接上传示例图也属于无效。
		</p>
		<p class="cause-explain">6、身份认证信息与照片信息不符：即手持证件照中的证件与实名注册的信息不符。</p>
		<p class="cause-explain">7、头像模糊：即手持证件照中，本人头像模糊，可能是照片整体模糊，也可能是因为对焦问题导致模糊。
		</p>
		<p class="cause-explain">8、无效半身照：即半身照不符要求，将手持证件照再次上传到半身照属于无效，半身照只有本人头部也无效。
		</p>
		<p class="cause-explain">9、无效证件：即过期证件，或者是不在允许范围的证件，青岛政务网身份认证只允许使用身份证。</p>
		<p class="cause-explain">10、
			照片无法显示，建议更换浏览器重新上传：即由于某些原因（主要是浏览器原因）造成提交认证之后，认证后台无法查看您提交的照片，所以需要更换浏览器（建议使用IE）再次上传照片。
		</p>
		<p class="cause-explain">11、由于您的帐户存在信息安全方面问题，故认证无法通过
		信息安全方面包括但不限于以下情况、青岛政务网终止向用户提供服务后，用户涉嫌再一次直接或间接或以他人名义注册为青岛政务网用户的；用户注册认证信息中的主要内容不真实或不准确；其它青岛政务网认证认为应该终止认证的情况
		：由于您的账户存在以上情况，因此审核不予通过。</p>

	</div>
</div>



