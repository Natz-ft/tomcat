<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>

<div class="interact_left">
	<div class="interact_left_panel">
		<div class="left_titlebar">
			<div class="left_title">互动交流</div>
		</div>

		<script type="text/javascript">
			function selectInteractMenu(tag) {
				$(tag).parents("ul").find("a").removeClass("inter_selected");
				$(tag).addClass("inter_selected");
			}
		</script>
		<div class="left_content">
			<ul class="interact_menu">
				<li><a id="newsList" onclick="goToNewsList()"> <img
						src="${fn:getUrl('img/interact/applydata.png') }">最新动态
				</a></li>
				<li><a id="surveyAdd" onclick="goToSurveyAdd()"> <img
						src="${fn:getUrl('img/interact/applyapp.png') }">需求调查
				</a></li>
				<li><a id="adviceAdd" onclick="goToAdviceAdd()"> <img
						src="${fn:getUrl('img/interact/suggestion.png') }">咨询建议
				</a></li>
			</ul>
		</div>
	</div>
</div>