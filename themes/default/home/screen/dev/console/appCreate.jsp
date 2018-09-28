<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"  %>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>



<script>
if(document.getElementById("nav-open")){
	var navOpen = document.getElementById("nav-open");
	if(navOpen.getAttribute("class")){
		navOpen.setAttribute("class", navOpen.getAttribute("class")+" on");
	}else{
		navOpen.className = navOpen.className +" on";
	}
}
if(document.getElementById("nav-app")){
	document.getElementById("nav-app").setAttribute("class", "nav-item on");
}
</script>
<script type="text/javascript">
$("#appcreate").addClass('menuon');
</script>
<website:style href="css/dev/form.css"/>
<website:style href="css-open/app-create.css"/>
<website:style href="css/dev/open/servicetag.css"/>
<website:style href="css/dev/open/tag.css"/>

<style>

.body-wrap{
	width:920px;
}
a, a:visited{
    color: #666;
    text-decoration: none;
}
a:hover{
	color:#65ace9;
	text-decoration:underline;
}
.up-pic-btn {
	background: #26A3E6;
	width: 120px;
	height: 33px;
}

</style>
<div class="kfz_main">
	<div class="kfz_right">
		<div class="content-wrap">
			<div class="form-box" style="margin-top: 30px">
				<div class="text-icons form-box-title">
					<span class="icons iconl"></span> <span class="icons iconr"></span>
				</div>
				<form id="app-create-form" action="" method="post"
					onsubmit="return false;" style="margin-top: 10px">
					<input type="hidden" name="app_tags" value="" /> <input
						type="hidden" name="app_tagnames" value="" /> <input type="hidden"
						id="app_type_type" name="app_type_type" value="${app_type }" />
					<div class="form-body">
						<dl>
							<dt>
								<em class="required">*</em>应用名称：
							</dt>
							<dd>
								<input class="input" style="float: none;" name="app_name"
									value="" type="text" maxlength="15" id="app_name" />
								<p class="form-common-tip">
									该名称也用于来源显示，可以为汉字、字母、数字或下划线，但不能超过15个</p>
							</dd>
							<dd class="form-tip"></dd>
						</dl>

						<dl>
							<dt>应用标签：</dt>
							<dd>
								<a href="javascript:void(0);"
									class="plus-tag tagbtn clearfix service-tag" id="myTags"></a>
								<div id="tag-plus" class="tag-plus" style="display: none;">
									<div class="default-tag tagbtn"></div>
									<!-- <div align="right">
	                    			<a href="javascript:void(0);" id="change-tips" style="color:#3366cc;">下一组</a>
	                    		</div> -->
								</div>
							</dd>
							<dd class="form-tip"></dd>
						</dl>
						<dl>
							<dt>应用描述：</dt>
							<dd>
								<textarea name="description" id="description"
									style="width: 404px"></textarea>
							</dd>
							<dd class="form-tip"></dd>
						</dl>

						<dl>
							<dt>
								<em class="required">*</em>应用类别：
							</dt>
							<dd id="groups_render">
								<select name="app_type" id="app_types">
									<option value="0">请选择应用类别</option>
								</select>
							</dd>
							<dd class="form-tip"></dd>
						</dl>
						
						<dl class="clearfix">
							<dt>
								<em class="required">*</em>应用图标：
							</dt>
							<dd class="form-upimg style=" style="width:500px;height:80px">
								<p class="form-common-tip">
									支持PNG、JPG,JPEG,GIF格式，上传后自动生成16*16，64*64，120*120(px)尺寸图片。用于在“最新应用”、“热门应用”、“月排行榜”、“应用明细”等显示，大小不超过4M
								</p>

							</dd>

							<dd class="upload-container" style="width: 70%; height: auto;margin-left: 260px;"
								id="upload_icons_container_<?=curVersion['feature_id']?>">
								<div class="" id="">
									<div class="up-pic-btn">
										<b style="color: #fff; text-align: center; padding-left: 1px;"
											id="upload_icon">上传图片</b>
									</div>
									<div id="show_icon"
										style="border: 1px dashed #ccc; width: 400px; height: 130px; margin-top: 15px;">
									</div>
									<input type="hidden" class="update_icon_result" name="app_icon" id="app_icon" value="">
								</div>
							</dd>

						</dl>

						<dl>
							<dt></dt>
							<dd>
								<input class="vmiddle" type="checkbox" name="agreement"
									checked="checked" /> 同意<a target="_blank"
									href="${fn:getConfValue('global.index.odweb')}/agreement.html"><u style="color: blue;">${fn:getConfValue('agreement_name')}</u></a>
							</dd>
							<dd class="form-tip"></dd>
						</dl>
						<dl>
							<dt></dt>
							<dd>
								<a class="subtn" href="javascript:void(0)" id="appCreateBtn">创&nbsp;建</a>
							</dd>
						</dl>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
<!--标签模版文件 -->
<script type="text/html" id="tagTemplate">
     <?for(i=0;i<data.length;i++){?>
          <?if(i==0){?>
              <div class="clearfix nowtips">
              <?}else{?>
              <div class="clearfix" style="display:none;">
              <?}?>
			    <span class="group"><?=data[i].group_name?></span>
                <?for(j=0;j<data[i].CHILD.length;j++){?>
				<a title="<?=data[i].CHILD[j].tag?>" value="<?=data[i].CHILD[j].tag_code?>" href="javascript:void(0);"><span>
				<?if(data[i].CHILD[j].tag.length>10){?>
				<?=data[i].CHILD[j].tag.substring(0,6)+"..."?>
				<?}?> 
				<?if(data[i].CHILD[j].tag.length<=10){?>
                <?=data[i].CHILD[j].tag?>
				<?}?>
				</span><em></em></a>
			    <?}?> 
             </div>
     <?}?> 
 </script>
<style>
fieldset#favoritecolor {
	margin: 0;
	padding: 0;
	border: none;
	background: transparent;
}

#usertype_render2 div {
	width: 8em;
	float: left;
}

#usertype_render2 label {
	width: 4em;
	float: none;
	display: inline;
	overflow: hidden;
}

#usertype_render2 p {
	margin: 0.3em 0;
}

.app-btn span {
	display: block;
	text-align: center;
}

.app-btn .app-num {
	font-size: 32px;
	color: #23B3DA;
}
</style>


<script type="text/javascript">
var groups = {};
try{
	groups = eval('(' + '${groupJson}' + ')');
}catch(err){
	document.writeln("error");
}
var tagsStr = "${tagList }";
var rcservice_url = "${fn:getConfValue('global.index.rcservice')}/doc?doc_id=";
var rc_upload_url = "${fn:getConfValue('global.index.rcservice')}/upload";
var uid = "${uid}";
var context_url = "../"; 
var upload_type = 'rc';

seajs.use("modules/appCreate", function(o){
	o.init();
	template.openTag = "<?";
	template.closeTag = "?>";
    //初始化标签
    //initTag();
});
</script>






