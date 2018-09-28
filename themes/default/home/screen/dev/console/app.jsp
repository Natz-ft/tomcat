<%@ page trimDirectiveWhitespaces="true"%> 
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<website:style href="css/dev/form.css"/>
<website:style href="css-open/dev/app-binfo.css"/>
<website:style href="css/dev/open/usertype.css"/>
<website:style href="css/dev/open/service-detail.css"/>
<style>
.body-wrap{
	width:950px;
}
.content-wrap{
	width:950px;
}
.body-content{
	width:950px;
}
</style>
<div class="body-wrap" style="float: right;padding-top: 0px;">
	<website:widget path="dev/open/sitemap.jsp"/>
	<div class="body-content clearfix">
		<div class="content-wrap" id="content-wrap" style="margin-left: 0">
			
		</div>
	</div>
</div>


<!-- 用于服务申请的时候弹出服务调用级别 -->
<div id="subServicePanel" style="display: none;" isfilled="0">
</div>
<script type="text/html" id="subServiceTpl">
<?for(t=0; t<data.length; ++t){?>
	<div style="height: 30px; border-bottom: 1px dashed;">
		<span class="_c_1_"><?=t+1?></span>
		<?if(t==0){?>
			<input type="radio" name="level_id" checked="checked" value="<?=data[t]['level_id']?>">
		<?}else{?>
			<input type="radio" name="level_id" value="<?=data[t]['level_id']?>">
		<?}?>
		
		<span class="_c_2_"><?=data[t]['level_name']?></span>
		<span class="_c_3_"><?=data[t]['hour_maximum']?>次/时</span>
		<span class="_c_3_"><?=data[t]['day_maximum']?>次/天</span>
		<span class="_c_3_"><?=data[t]['month_maximum']?>次/月</span>
	</div>
<?}?>
</script>
<website:widget path="dev/open/app/appInfoTpl.jsp?personbox=app"/>

<!-- 应用创建向导 -->
<script type="text/html" id="appGuide">
<div class="step">
		<h1 style="font-size:20px;margin:10px;auto;">第一步：选择应用接入类型</h1>
			<ul class="list-wrapper">
                <li class="item" apptype="inner">
                    <i class="selected"></i>
                    <span class="icon push-icon"></span>
                    <span class="title">站内应用</span>
                </li>
                <li class="item" apptype="website">
                  <i class="selected"></i>
                  <span class="icon bcs-icon"></span>
                  <span class="title">站外应用</span>
                </li>
                <li class="item" apptype="mobile">
                  <i class="selected"></i>
                  <span class="icon auth-icon"></span>
                  <span class="title">终端应用</span>
                </li>
              </ul>
		</div>
		<div>
		<span style="font-size:20px;margin:10px;auto;">第二步：定义版本</span>
		</div>
		
			<div class="form-box">
				<form action="" method="post" onsubmit="return false;">
						<input type="hidden" id="app_type" name="app_type" value="">
					<div class="form-body">
						<div id="terminal_type" class="access-types hidden" >
							<input id="access-iphone" type="radio" class="vmiddle" name="access_type" value="ios" checked="checked"  disabled="disabled">
							<label for="access-iphone" class="labelr">IOS应用</label>
							<input id="access-android" type="radio" class="vmiddle" name="access_type" value="android" disabled="disabled">
							<label for="access-android" class="labelr">Andriod应用</label>
							
							
							<input id="access-mobile_web" type="radio" class="vmiddle" name="access_type" value="mobile_web" disabled="disabled">
							<label for="access-mobile_web" class="labelr">移动网站</label>
						</div>
						<dl class="clearfix">
							<dt><em class="required">*</em>版本名称：</dt>
							<dd>
								<input class="input" type="text" name="version_name" id="version_name" disabled="disabled">
                                <p class="form-common-tip">该名称也用于来源显示，不超过15个字符（中英文、数字或下划线）</p> 
							</dd>
						</dl>
						<dl class="clearfix">
							<dt><em class="required">*</em>版&nbsp;本&nbsp;号：</dt>
							<dd>
								<input class="input" type="text" name="version_no" id="version_no" disabled="disabled">
                                 <p class="form-common-tip">当前的版本号,支持整数、小数</p>
							</dd>
						</dl>
						<div class="btns-opt">
							<span id="disableBtn" class="subtn disabledBtn" href="javascript:void(0)">接&nbsp;入</span>
							<a class="subtn" href="javascript:void(0)" id="postBtn" style="display:none">接&nbsp;入</a>
						</div>
					</div>
				</form>
			</div>
</script>

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

<website:widget path="dev/open/app/appInfoEditTpl.jsp?personbox=app"/>

<website:style href="css-open/dev/appWidgetAdd.css" />
<website:style href="css-open/dev/button.css" />
<script type="text/html" id="widgetListTpl">
	<div class="main_box no_padding border_blue width788">
		<div class="main_desc">
		<?if(data!=null){ if(data.length > 0){?>
			<? for(var i=0; i< data.length; i++){ ?>
				<div class="widget_list_body clearfix" id="widget_<?=data[i]['id']?>">
					<img class="widget_list_icon" src="${fn:getConfValue('global.index.rcservice')}/doc?doc_id=<?=data[i]['des_img']?>" >
					<div class="widget_list_content">
						<em class="widget_list_title"><?=data[i]['title']?></em>
						<span class="widget_list_desc">简介：<?=data[i]['describe']?></span>
						<span class="widget_list_other"><font color="#8B8970">调用地址</font>：<?=data[i]['path']?></span>
					</div>
					<span style="float:right">
						<a href="#editWidget!id=<?=data[i]['id']?>" class="btn_b" ><span>编辑</span></a>
						<a class="btn_w" id="widget_<?=data[i]['id']?>" onclick="removeWidget(<?=data[i]['id']?>)"><span>移除</span></a>
					</span>
				</div>					
		<? } ?>
			<? }else{ ?>
				<div style="text-align:center;margin-top: 100px;">
					<p style="line-height:20px;font-size:16px;text-indent:0;">
						<i class="warning" style="float:none;display:inline-block;"></i>
						该应用还没有组件！
						<a href="#creatWidget" style="color:#0000FF;">添加组件</a>
					</p>
				</div>
			<? }} ?>
		</div>
	</div>
</script>
<script type="text/javascript">
function removeWidget(widget_id){
	dialog.confirm('提示信息  ', '确定要移除此组件吗？', function(isure) {
		if(isure) {
			$.ajax({
				url: "${fn:getLink('open/AppWidgets.do?method=removeWidget')}",
				data: {widget_id:widget_id},
				type: "post",
				success: function(res) {
					res = parseInt(res);
					if(res == 1) {
						dialog.success("移除成功",function() {
							$("#widget_"+widget_id).remove();
						});
					} else {
						dialog.error("移除失败");
					}
				}
			});
		}
	});
}
</script>
<script type="text/html" id="createWidgetTpl">
	<div class="des_box wrap_content clearfix">
	<div class="main_box no_padding border_blue width788">
		<div class="main_desc form-body">							
			<form id="app_addwidget_form" action="" method="post" enctype="multipart/form-data">
				<input type="hidden" name="action" value="addAppWidget">
				<? if(data!=null){?>
				<dl>
					<dt><span class="form-require"></span>应用名称：</dt>
					<dd>
						<span class="form-require" style="font-size:14px;"><?=data.app_alias?></span>
					</dd>
					<dd class="form-tip"></dd>
				</dl>
				<?}?>
				<dl>
					<dt><span class="form-require"><em>*</em></span>组件标题：</dt>
					<dd>
						<input id="widget_title" name="widget_title" class="input" type="text"/>
						<div class="form-common-tip">
							<span>用于组件的来源显示。不超过10个字</span>
						</div>
					</dd>
					<dd class="form-tip"></dd>
				</dl>
				<dl>
					<dt><span class="form-require"><em>*</em></span>组件调用地址：</dt>
					<dd>
						<input id="widget_url" name="widget_url" class="input" type="text"/>
						<div class="form-common-tip">
							<span>组件的远程调用地址。</span>
						</div>
					</dd>
					<dd class="form-tip"></dd>
				</dl>
				<dl>
					<dt><span class="form-require"></span>组件左侧菜单链接：</dt>
					<dd>
						<input id="menu_action" name="menu_action" class="input" type="text"/>
						<div class="form-common-tip">
							<span>用户添加组件后生成的左侧菜单</span>
						</div>
					</dd>
					<dd class="form-tip"></dd>
				</dl>
				<dl>
					<dt><span class="form-require"><em>*</em></span>组件分组：</dt>
					<dd>
						<select id="group" name="group" class="select">
							<? if(groups.length>0){
								for(var i=0;i<groups.length;i++){
							?>
								<option value="<?=groups[i]['id'] ?>"><?=groups[i]['name'] ?></option>
							<?}}?>
						</select>
						<div class="form-common-tip">
							<span>请选择widget分组</span>
						</div>
					</dd>
					<dd class="form-tip"></dd>
				</dl>
				<dl>
					<dt><span class="form-require"></span>组件用户权限：</dt>
					<dd style="width:300px">
						<div id="widget_role" class="input" style="min-height:20px;height:auto"></div>
							<div id="roles-list" style="display:none;" class="dropdown-list">
								<div class="dropdown-title">
									<div class="dropdown-close"></div>
								</div>
								<ul class="role-list">
									<li>
										<span class="tag-body">
										<? if(userType!=null){
											for(var user in userType){
												if (userType.hasOwnProperty(user)) {
											?>
												<a href="javascript:void(0)" tagv="<?=user?>" tagv2="<?=userType[user] ?>"><?=userType[user] ?></a>
										<?}}}?>
										</span>
									</li>
								</ul>
							</div>
							<input id="widget_role2" name="role" type="hidden"/>
						<div class="form-common-tip">
							<span>请选择用户权限</span>
						</div>
					</dd>
					<dd class="form-tip"></dd>
				</dl>
				
				<dl>
				   <dt><span class="form-require"></span>组件模板：</dt>
				   <dd>
				   		<div>
				   		<span>宽度选择：</span>
				   		<input type="radio" class="f_radio" name="tpl_width" value="1" id="width"  checked="checked" ><label for="width">280px&nbsp;&nbsp;&nbsp;</label>
						<input type="radio" class="f_radio" name="tpl_width" value="2" id="width2" ><label for="width2">570px&nbsp;&nbsp;&nbsp;</label>
						<input type="radio" class="f_radio" name="tpl_width" value="3" id="width3"><label for="width3">860px&nbsp;&nbsp;&nbsp;</label>
						</div>
						<div>
						<span>高度选择：</span>
				   		<input type="radio" class="f_radio" name="tpl_height" value="1" id="height" checked="checked"><label for="height">280px&nbsp;&nbsp;&nbsp;</label>
						<input type="radio" class="f_radio" name="tpl_height" value="2" id="height2" ><label for="height2">570px&nbsp;&nbsp;&nbsp;</label>
						<input type="radio" class="f_radio" name="tpl_height" value="3" id="height3" ><label for="height3">860px&nbsp;&nbsp;&nbsp;</label>
						</div>
						<div>
						<span>标题选择：</span>
				   		<input type="radio" class="f_radio" name="tpl_title" value="0" id="no-title" checked="checked"><label for="no-title">无标题&nbsp;&nbsp;&nbsp;</label>
						<input type="radio" class="f_radio" name="tpl_title" value="1" id="title"><label for="title">有标题&nbsp;&nbsp;&nbsp;</label>
						</div>
						<div id="widget_tpl">
							<span>模板展示：</span>
							<div id="widget_tpl_content">
								<div id="widget_tpl_title"></div>
							</div>
						</div>
						<input id="widget_tpl" name="widget_tpl" type="hidden" />
				  </dd>
				  <dd class="form-tip" ></dd>
				</dl>
				<dl>
					<dt>组件介绍：</dt>
					<dd>
						<textarea id="widget_description" name="widget_description" class="textarea" maxlength="500" ></textarea>
						<div class="form-common-tip">
							<span>简述组件的作用、使用方法等信息，不超过500字（任意字符均可）</span>
						</div>
					</dd>
					<dd class="form-tip"></dd>
				</dl>
				<input id="app_id" type="hidden" name="app_id" value="${param.app_id}"/>
			</form>
			<dl class="clearfix">
				<dt><em class="required">*</em>组件图标：</dt>
					<dd class="form-upimg">
						<p class="form-common-tip" style="width:400px;">
							尺寸为64px*64px，大小20k以内，支持PNG、JPG
						</p>
					</dd>				
					<dd class="upload-container" >
						<div class="upload upload-before" id="upload_little_status">
							<div class="upload-box">
								<div class="upload-box-out">
									<div class="upload-box-inner">
										<div class="upload-box-inner-icon"></div>
										<div class="upload-box-inner-num" id="upload_little_percent"></div>
									</div>
								</div>
							</div>
						<div class="upload-border">
						<div class="upload-border-inner"></div>
					</div>
					<i class="upload-edit"></i>
					<div class="upload-img">
						<div class="upload-img-out" id="upload_little_img_box"></div>
						<input type="hidden" name="little_con" id="upload_little_img_value" />
					</div>
					<b id="upload_btn"></b>
					<div class="upload-delete"><a href="javascript:;" __upload_img_delete="true"  __widget_id="" __forimg="upload_little_img_value" __forbox="upload_little_status">删除</a></div>
				</div>
				</dd>						
			</dl>
			<dl class="mt20">
				<dt>&nbsp;</dt>
				<dd>
					<a id="addwidget_form" class="btn_g mr20" href="javascript:;" form_id="app_addwidget_form">
						<span>保存信息</span>
					</a>
					<a class="btn_w" href="javascript:;" onclick="window.location.reload()">
						<span>取消</span>
					</a>
				</dd>
			</dl>
		</div>
	</div>
</div>
</script>

<script type="text/html" id="editWidgetTpl">
	<div class="des_box wrap_content clearfix">
	<div class="main_box no_padding border_blue width788">
		<div class="main_desc form-body">							
			<form id="app_editwidget_form" action="" method="post" enctype="multipart/form-data">
				<input type="hidden" name="action" value="editAppWidget">
				<? if(curApp!=null){?>
				<dl>
					<dt><span class="form-require"></span>应用名称：</dt>
					<dd>
						<span class="form-require" style="font-size:14px;"><?=curApp.app_alias?></span>
					</dd>
					<dd class="form-tip"></dd>
				</dl>
				<?}?>
				<dl>
					<dt><span class="form-require"><em>*</em></span>组件标题：</dt>
					<dd>
						<input id="widget_title" name="widget_title" class="input" type="text" value="<?=widget.title?>"/>
						<div class="form-common-tip">
							<span>用于组件的来源显示,不超过10个字</span>
						</div>
					</dd>
					<dd class="form-tip"></dd>
				</dl>
				<dl>
					<dt><span class="form-require"><em>*</em></span>组件调用地址：</dt>
					<dd>
						<input id="widget_url" name="widget_url" class="input" type="text" value="<?=widget.path?>"/>
						<div class="form-common-tip">
							<span>组件的远程调用地址</span>
						</div>
					</dd>
					<dd class="form-tip"></dd>
				</dl>
				<dl>
					<dt><span class="form-require"></span>组件左侧菜单链接：</dt>
					<dd>
						<input id="menu_action" name="menu_action" class="input" type="text" value="<?=widget.menu_action?>"/>
						<div class="form-common-tip">
							<span>用户添加组件后生成的左侧菜单</span>
						</div>
					</dd>
					<dd class="form-tip"></dd>
				</dl>
				<dl>
					<dt><span class="form-require"><em>*</em></span>组件分组：</dt>
					<dd>
						<select id="group" name="group" class="select">
							<? if(groups.length>0){
								for(var i=0;i<groups.length;i++){
							?>
								<option	
									<?if(widget_group == groups[i]['id']){?>selected="selected"<?}?>
								value="<?=groups[i]['id'] ?>"><?=groups[i]['name'] ?></option>
							<?}}?>
						</select>
						<div class="form-common-tip">
							<span>请选择widget分组</span>
						</div>
					</dd>
					<dd class="form-tip"></dd>
				</dl>
				<dl>
					<dt><span class="form-require"></span>组件用户权限：</dt>
					<dd style="width:300px">
						<div id="widget_role" class="input" style="min-height:20px;height:auto"></div>
							<div id="roles-list" style="display:none;" class="dropdown-list">
								<div class="dropdown-title">
									<div class="dropdown-close"></div>
								</div>
								<ul class="role-list">
									<li>
										<span class="tag-body">
										<? if(userType!=null){
											for(var user in userType){
												if (userType.hasOwnProperty(user)) {
											?>
												<a href="javascript:void(0)" tagv="<?=user?>" tagv2="<?=userType[user] ?>"><?=userType[user] ?></a>
										<?}}}?>
										</span>
									</li>
								</ul>
							</div>
							<input id="widget_role2" name="role" type="hidden" value="<?=widget.role?><?if(widget.role!=""){?>,<?}?>"/>
							<input id="widget_role3" type="hidden" value="<?=widget.role_name?><?if(widget.role!=""){?>,<?}?>"/>
													
						<div class="form-common-tip">
							<span>请选择用户权限</span>
						</div>
					</dd>
					<dd class="form-tip"></dd>
				</dl>
				
				<dl>
				   <dt><span class="form-require"></span>组件模板：</dt>
				   <dd>
				   		<div>
				   		<span>宽度选择：</span>
				   		<input type="radio" class="f_radio" name="tpl_width" value="1" id="width" <?if(widget.widget_width == "width"){?> checked="checked" <?}?> ><label for="width">280px&nbsp;&nbsp;&nbsp;</label>
						<input type="radio" class="f_radio" name="tpl_width" value="2" id="width2" <?if(widget.widget_width == "width2"){?> checked="checked" <?}?>><label for="width2">570px&nbsp;&nbsp;&nbsp;</label>
						<input type="radio" class="f_radio" name="tpl_width" value="3" id="width3" <?if(widget.widget_width == "width3"){?> checked="checked" <?}?>><label for="width3">860px&nbsp;&nbsp;&nbsp;</label>
						</div>
						<div>
						<span>高度选择：</span>
				   		<input type="radio" class="f_radio" name="tpl_height" value="1" id="height" <?if(widget.widget_height == "height"){?> checked="checked" <?}?> ><label for="height">280px&nbsp;&nbsp;&nbsp;</label>
						<input type="radio" class="f_radio" name="tpl_height" value="2" id="height2" <?if(widget.widget_height == "height2"){?> checked="checked" <?}?> ><label for="height2">570px&nbsp;&nbsp;&nbsp;</label>
						<input type="radio" class="f_radio" name="tpl_height" value="3" id="height3" <?if(widget.widget_height == "height3"){?> checked="checked" <?}?> ><label for="height3">860px&nbsp;&nbsp;&nbsp;</label>
						</div>
						<div>
						<span>标题选择：</span>
				   		<input type="radio" class="f_radio" name="tpl_title" value="0" id="no-title"   <?if(widget.widget_title2 == "no-title"){?> checked="checked" <?}?> ><label for="no-title">无标题&nbsp;&nbsp;&nbsp;</label>
						<input type="radio" class="f_radio" name="tpl_title" value="1" id="title" <?if(widget.widget_title2 == "title"){?> checked="checked" <?}?>><label for="title">有标题&nbsp;&nbsp;&nbsp;</label>
						</div>
						<div id="widget_tpl">
							<span>模板展示：</span>
							<div id="widget_tpl_content">
								<div id="widget_tpl_title"></div>
							</div>
						</div>
						<input id="widget_tpl" name="widget_tpl" type="hidden" value="<?=widget.widget_tpl?>"/>
				  </dd>
				  <dd class="form-tip" ></dd>
				</dl>
				<input id="widget_id" name="widget_id" type="hidden" value="<?=widget.id?>"/>
				
				<dl>
					<dt>组件介绍：</dt>
					<dd>
						<textarea id="widget_description" name="widget_description" class="textarea" maxlength="500"><?=widget.describe?></textarea>
						<div class="form-common-tip">
							<span>简述组件的作用、使用方法等信息，不超过500字（任意字符均可）</span>
						</div>
					</dd>
					<dd class="form-tip"></dd>
				</dl>
				<input id="app_id" type="hidden" name="app_id" value="${param.app_id}"/>
			</form>
			<dl class="clearfix">
				<dt><em class="required">*</em>组件图标：</dt>
					<dd class="form-upimg">
						<p class="form-common-tip" style="width:400px;">
							尺寸为64px*64px，大小20k以内，支持PNG、JPG
						</p>
					</dd>				
					<dd class="upload-container" >
						<div class="upload 
							<?if(widget.des_img!=null && widget.des_img!=""){?> upload-done <?}?>
							<?if(widget.des_img==null || widget.des_img==""){?> upload-before <?}?> 
						 " id="upload_icon_status">
							<div class="upload-box">
								<div class="upload-box-out">
									<div class="upload-box-inner">
										<div class="upload-box-inner-icon"></div>
										<div class="upload-box-inner-num" id="upload_icon_percent"></div>
									</div>
								</div>
							</div>
						<div class="upload-border">
						<div class="upload-border-inner"></div>
					</div>
					<i class="upload-edit"></i>
					<div class="upload-img">
						<div class="upload-img-out" id="upload_icon_img_box">
							<?if(widget.des_img!=null && widget.des_img!=""){?>
								<img src="${fn:getConfValue('global.index.rcservice')}/doc?doc_id=<?=widget.des_img?>" style="width: auto; height: 64px;">
							<?}?>
						</div>
						<input type="hidden" name="little_con" id="upload_icon_img_value" value="${fn:getConfValue('global.index.rcservice')}/doc?doc_id=<?=widget.des_img?>"/>
					</div>
					<b id="upload_btn"></b>
					<div class="upload-delete"><a href="javascript:;" __upload_img_icon_delete="true"  __widget_id="<?=widget.id?>" __forimg="upload_icon_img_value" __forbox="upload_icon_status">删除</a></div>
				</div>
				</dd>						
			</dl>
			<dl class="mt20">
				<dt>&nbsp;</dt>
				<dd>
					<a id="editwidget_form" class="btn_g mr20" href="javascript:;" form_id="app_editwidget_form">
						<span>保存信息</span>
					</a>
					<a class="btn_w" href="javascript:;" onclick="window.location.reload()">
						<span>取消</span>
					</a>
				</dd>
			</dl>
		</div>
	</div>
</div>
</script>

<script type="text/html" id="appTestTp1">
	<div class="form-ct">
    	<div class="form-title clearfix">
	    	<span class="icons title-icon"></span>
	    	<span class="title-txt">测试信息</span>
	    	<a href="#test/addinfo">
				<span class="menu-icons title-edit" title="添加测试账号" ></span></a>
		</div>
    	<div class="test-body">
			<div class="test-content">为保证上线应用的质量,您可以申请测试帐号来测试您尚在开发中的应用。</div>
	    </div>
		<div class="test-list">
			<span class="list-title">已关联测试帐号（<?=data.length?>/20人）</span>
			<?if(data.length<=0){?>
				<div class="list-noname">您尚未关联任何账号。</div>
			<?}else{?>
		</div>
       	<div class="list_list" >
			<ul class="list_testname">
				<?for(t=0; t<data.length; ++t){?>
				<li class="li_display">
					<div class="list_detail">
					<div class="list_my" style="float:left"><img onclick="showTest('<?=data[t].user_type?>','<?=data[t].user_id?>');" src= "${fn:getUrl('img/open/Test.jpg')}"/></div>
					<span><?=data[t].user_name?></span>
					</div>
				</li>
				<?}?>
			</ul> 
		</div>
		<?}?>
		<span class="list-title">审核中的帐号</span>
			<div id="apply_list" ></div>
	</div>
</script>

<script type="text/html" id="appTestAddTp1">
	<div class="form-ct">
		<div class="form-title clearfix">
			<span class="icons title-icon"></span>
			<span class="title-txt">关联测试用户</span>
			<a href="#test"><span class="menu-icons title-return" title="返回" ></span></a>
		</div>
         <span class="tip"><font color="red">*</font>友情提示：勾选应用对应的用户类型，点击申请</span>
         <table style="margin-top:15px">
			
            <tr><td valign="top"><font color="red">*</font>用户类型：</td>
             <td valign="top"> <ul class="poplayer-tagBox-taglist"  id="usertype_render2"></ul></td>
          </tr>
         </table>

		<div class="form-body">		

			<dl class="clearfix">
				<dd style="width:100%;text-align:center;"><a class="btn_sgray" href="javascript:void(0)" id="submitBtn" >申&emsp;请</a></dd>
			</dl>
			<span class="list-title">已关联测试帐号（<?=data.length?>/20人）</span>
			
			<?if(data.length<=0){?>
				<div class="list-noname">您尚未关联任何账号。</div>
			<?}else{?>
            <div class="list_list" >
				<ul class="list_testname">
					<?for(t=0; t<data.length; ++t){?>
					<li class="li_display">
						<div class="list_detail">
						<div style="float:left"><img src= "${fn:getUrl('img/open/Test.jpg')}"/></div>
						<span style="float:left"><?=data[t].user_name?></span>
						<span  title="删除" class="list_delte_icons" onclick="delBunding(this,<?=data[t].id?>);"></span>
						</div>
					</li>
					<?}?>
				</ul> 
			</div>
			<?}?>
			<span class="list-title">审核中的帐号</span>
            <div  class="list_list_" ></div>
		</div>
	</div>
</script>

<script type="text/html" id="apply_render">
	<?if(data.length<=0){?>
		<div class="list-noname">您尚未有任何申请中的帐号。</div>
	<?}?>
	<div class="list_list">
		<ul id= "applying_list"  class="list_testname">
		<?for(t=0; t<data.length; ++t){?>
			<li class="li_display">
				<div class="list_detail">
					<div style="float:left"><img src= "${fn:getUrl('img/open/Test.jpg')}"/></div>
					<span  id="status" style="float:left">用户类型【<?=data[t].type_name?>】<?=data[t].status?></span>
				</div>
			</li>
		<?}?>
		</ul> 
	</div>
</script>

<script type="text/html" id="show_render">
	<?if(data.length<=0){?>
		<div class="list-noname">您尚未有任何申请中的帐号。</div>
	<?}?>
	<div class="list_list" >
		<ul id= "applying_list"  class="list_testname">
		<?for(t=0; t<data.length; ++t){?>
			<li class="li_display">
				<div class="list_detail">
					<div style="float:left"><img src= "${fn:getUrl('img/open/Test.jpg')}"/></div>
	     				<span  id="status" class="list_my" style="float:left">用户类型【<?=data[t].type_name?>】<?=data[t].status?></span>
				</div>
			</li>
		<?}?>
		</ul> 
	</div>
</script>
<website:style href="css-open/dev/app-service.css"/>
<script type="text/html" id="openServiceTpl">
		<div class="cont-title">
				<span class="title">我的服务列表</span>
				<span class="title2">共<span class="num"><?=count?></span>项服务</span>
				<div class="opt">
					<div class="search-box-wrap clearfix">
						<form class="search_form" action="${fn:getLink('dev/open/searchService.jsp')}" method="post">
						<div class="search-input-wrap">
							<input type="hidden" name="appid" value="${app_id}">
							<input name="keyword" class="search-input" type="text" placeholder="输入关键词查找" onkeypress="formFilterEnterSubmit(event)">
							<span class="icons search-icon _begin_search_" title="开始查找"></span>
						</div>
						</form>
					</div>
					
				</div>
			</div>
			<div class="service-title">
				<div class="group_title">
					分类: 
					<a href='#serviceList!type=default' <? if(cur_type == "default"){?> class="on" <?}?> > 默认服务</a>
					<a href='#serviceList!type=other' <? if(cur_type == "other"){?> class="on" <?}?> >申请服务</a>
				</div>
				
			</div>
			<!--循环列表-->
			<? if(data.length > 0){?>
			<? if(cur_type == "default"){ ?>
			<ul class="service-list">
			<? for(var i=0; i< data.length; i++){ ?>
				<li class="service-item" id="item<?=data[i]['subscribed_id']?>">
					<div class="c1">
						<a class="service-name ellipse" href="#serviceInfo!service_id=<?=data[i]['service_id']?>"><?=data[i]['service_name']?></a>
						<p class="service-info">服务版本：V<?=data[i]['version_name']?>&emsp;&emsp;服务上下文：<?=data[i]['service'];?></p>
					</div>
					<div class="c2">2013-12-10 </div>
					<div class="c3">
						
					</div>
				</li>
				<? } ?>
			</ul>
			
			<?}else{?>
			<ul class="service-list">
			<? for(var i=0; i< data.length; i++){ ?>
				<li class="service-item" id="item<?=data[i]['subscribed_id']?>">
					<input class="checkbox" type="checkbox" name="checkitem" value="<?=data[i]['subscribed_id']?>">
					<div class="c1">
						<a class="service-name ellipse" href="#serviceInfo!service_id=<?=data[i]['service_id']?>"><?=data[i]['service_name']?></a>
						<p class="service-info">服务版本：V<?=data[i]['version_name']?>&emsp;&emsp;服务上下文：<?=data[i]['context'];?></p>
					</div>
					<div class="c2">2014-02-05</div>
					<div class="c3">
						<a class="menu-icons btn-del" href="javascript:void(0)" title="删除" __singledel="true" __id="<?=data[i]['subscribed_id']?>"></a>
					</div>
				</li>
				<? } ?>
			</ul>
			
			<div class="service-title bottom">
				<input id="check-all-bt" class="check-all" type="checkbox"/>
				<label class="labelr" for="check-all-bt">全选</label>
				<a class="btn-del" href="javascript:void(0)" id="multidelBtn">
					<span class="menu-icons"></span>取消申请
				</a>
			</div>
			<?}?>
			<?} else{?>
			<ul class="service-list">
				<li class="service-item" style="text-align:center;">
				<a href="#applyList" style="color:#23B3DA;">暂时没有申请其它服务，赶紧去申请吧</a>
				</li>
			</ul>
			<?}?>
			
			<div class="service-title bottom" id="paper" ></div>
</script>

<script type="text/html"id="serviceInfoTpl">
			<div class="cont-title-bold">
				<span class="title" title="<?=data.service_name?>"><?=data.service_name?></span>
			</div>
			<div class="pgraph">
				<div class="pgraph-title"><span class="icons"></span>基本信息</div>
				<div class="pgraph-cont">
					<dl class="fl">
						<dt>服务版本：</dt>
						<dd><?=data.version_name?></dd>
					</dl>
					<dl class="fl">
							<dt>上线时间：</dt>
							<dd><?=data.online_time?></dd>
					</dl>
					<dl class="fl" style="width:60%">
						<dt>服务上下文：</dt>
						<dd><?=data['context']?></dd>
					</dl>
					<dl class="fl">
						<dt>是否需要用户授权：</dt>
						<dd>
							<?if(data['need_user_authorize']=='1'){?>是
							<?}else{?>否
							<?}?>
						</dd>
					</dl>
					<dl>
						<dt>服务申请审核方式：</dt>
						<dd>
							<?if(data['need_apply']=='0'){?>无需审核授权
							<?}else{?>
								<?if(data['approval_authority'] == 'platform'){?>系统管理员审核授权
								<?}else{?>服务发布者审核授权<?}?>
							<?}?>
						</dd>
					</dl>
				</div>
			</div>
			<div class="pgraph">
				<div class="pgraph-title"><span class="icons"></span>服务调用参数</div>
				<div class="pgraph-cont">
					<div class="table-wrap cell4">
						<div class="th">
							<h2 class="c1">参数名称</h2>
							<h2 class="c2">参数类型</h2>
							<h2 class="c3">参数描述</h2>
							<h2 class="c4">是否必须</h2>
						</div>
						<?for(t = 0;t<data['parameter_desc'].length; ++t){?>	
							<div class="tr">
								<span class="c1"><?=data['parameter_desc'][t]['name']?></span>
								<span class="c2">
									<?if(data['parameter_desc'][t]['type']=='string'){?>
										字符串
									<?}else if(data['parameter_desc'][t]['type']=='number'){?>
										数值型
									<?}else if(data['parameter_desc'][t]['type']=='boolean'){?>
										布尔型
									<?}?>
									
								</span>
								<span class="c3"><?=data['parameter_desc'][t]['description']?></span>
								<span class="c4">
									<?if(data['parameter_desc'][t]['requires']=='0'){?>否
									<?}else {?>否<?}?>
								</span>
							</div>			
						<?}?>
					</div>
				</div>
			</div>
			<div class="pgraph">
				<div class="pgraph-title"><span class="icons"></span>服务调用返回值</div>
				<div class="pgraph-cont">
					<div class="table-wrap cell2">
						<div class="th">
							<h2 class="c1">返回值名称</h2>
							<h2 class="c2">返回值描述</h2>
						</div>
						<?for(var t=0;t<data['result_desc'].length;t++){?>
							<div class="tr">
								<span class="c1"><?=data['result_desc'][t]['name']?></span>
								<span class="c2"><?=data['result_desc'][t]['description']?></span>
							</div>
						<?}?>
					</div>
				</div>
			</div>
			<div class="pgraph">
				<div class="pgraph-title"><span class="icons"></span>服务文档</div>
				<div class="pgraph-cont">
				</div>
			</div>
</script>

<website:style href="css-open/dev/app-service.css"/>
<script type="text/html" id="applyListTpl">
		<div class="cont-title">
				<span class="title">服务列表</span>
				<span class="title2">共<span class="num"><?=count?></span>项服务</span>
				<div class="opt">
					<div class="search-box-wrap clearfix">
						<form class="search_form" action="${fn:getLink('open/searchService.jsp')}" method="post">
						<div class="search-input-wrap">
							<input type="hidden" name="appid" value="${app_id}">
							<input name="keyword" class="search-input" type="text" placeholder="输入关键词查找" onkeypress="formFilterEnterSubmit(event)">
							<span class="icons search-icon _begin_search_" title="开始查找"></span>
						</div>
						</form>
					</div>
				</div>
			</div>
			<div class="service-title">
				<div class="group_title">
				一级分类:
				<?for(var i =0; i< rootGroupList.length; i++){?>
					<a href="#applyList!root_gid=<?=rootGroupList[i]['group_id']?>" <?if(cur_group_id == rootGroupList[i]['group_id']){?> class="on"<?}?> > <?=rootGroupList[i]['group_name']?></a>
				<?}?>
				</div>
				<div class="group_second_title">
				<?if(secondGroupList != undefined){?>
				二级分类:
				<? for(var j= 0; j< secondGroupList.length; j++){?>
				<a href="#applyList!root_gid=<?=cur_group_id?>&sec_gid=<?=secondGroupList[j]['group_id']?>&g_type=<?=secondGroupList[j]['group_type']?>" <?if(cur_sec_group_id == secondGroupList[j]['group_id']){?> class="on" <?}?> > <?=secondGroupList[j]["group_name"]?></a>
				<?}?>
				<?}?>
				</div>
			</div>
			<!--循环列表-->
			
			<ul class="service-list">
			<? for(var i=0; i< serviceList['data'].length; i++){ ?>
				<li class="service-item" id="item<?=serviceList['data'][i]['service_id']?>">
					<!--<input class="checkbox" type="checkbox" name="checkitem" value="1">-->
					<div class="c1">
						<a class="service-name ellipse" href="#serviceInfo!service_id=<?=serviceList['data'][i]['service_id']?>"><?=serviceList['data'][i]['service_name']?></a>
						<p class="service-info">服务版本：V<?=serviceList['data'][i]['version_name']?>&emsp;&emsp;服务上下文：<?=serviceList['data'][i]['context'];?></p>
					</div>
					<div class="c2"><?=serviceList['data'][i]['online_time']?></div>
					<div class="applyBtn">
						<? if(serviceList['data'][i]['is_subscribed'] == 1){?>
							<? if(serviceList['data'][i]['subscription_status'] == "1"){ ?>
							已申请
							<?}else if(serviceList['data'][i]['subscription_status'] == "created"){?>
							待审核
							<?}else if(serviceList['data'][i]['subscription_status'] == "0"){?>
							被驳回
							<?}else if(serviceList['data'][i]['subscription_status'] == "cancalled"){?>
							被取消
							<?}else{?>
							未知状态
							<?}?>
						<?}else{?>
						<a  style="color:#FFF;" href="javascript:void(0)" class="applyBtn" title="申请" __singleApply="true" __id="<?=serviceList['data'][i]['service_id']?>">申请</a>
					    <?}?>
					</div>
				</li>
				<? } ?>
			</ul>
			
			<div class="service-title bottom">
				<!--
				<input id="check-all-bt" class="check-all" type="checkbox"/>
				<label class="labelr" for="check-all-bt">全选</label>
				<a class="btn-del" href="javascript:void(0)">
					<span class="menu-icons"></span>申请
				</a>-->
			</div>
			
			<div class="service-title bottom" id="paper" ></div>
</script>


<website:style href="css/dev/form.css"/>
<website:style href="css-open/dev/app-mgr.css"/>
<script type="text/html" id="appMobileCreateTpl">
	<div class="cont-title-bold clearfix">
				<span class="title">应用名称：<?=app.app_alias?></span>
				<div class="opt">
					<a class="btn-add-version" style="color:#fff;" href="#mobile">返回</a>
				</div>
			</div>
			<div class="form-box">
				<div class="form-box-title">
					请选择您要接入的终端设备类型：
					<span class="icons iconl"></span>
					<span class="icons iconr"></span>
				</div>
				<form action="" method="post" onsubmit="return false;">
					<div class="form-body">
						<div class="access-types">
							<input id="access-iphone" type="radio" class="vmiddle" name="access_type" value="ios" checked="checked">
							<label for="access-iphone" class="labelr">IOS应用</label>
							<input id="access-android" type="radio" class="vmiddle" name="access_type" value="android">
							<label for="access-android" class="labelr">Android应用</label>
							

							<input id="access-mobile_web" type="radio" class="vmiddle" name="access_type" value="mobile_web">
							<label for="access-mobile_web" class="labelr">移动网站</label>
						</div>
						<dl class="clearfix">
							<dt><em class="required">*</em>版本名称：</dt>
							<dd>
								<input class="input" type="text" name="version_name" id="version_name">
                                <p class="form-common-tip">该名称也用于来源显示，不超过15个字符（中英文、数字或下划线）</p> 
							</dd>
						</dl>
						<dl class="clearfix">
							<dt><em class="required">*</em>版&nbsp;本&nbsp;号：</dt>
							<dd>
								<input class="input" type="text" name="version_no" id="version_no">
                                 <p class="form-common-tip">当前的版本号,支持整数、小数</p>
							</dd>
						</dl>
						<div class="btns-opt">
							<a class="subtn" href="javascript:void(0)" id="postBtn">接&nbsp;入</a>
						</div>
					</div>
				</form>
			</div>
</script>
<script type="text/html" id="appPcCreateTpl">
	<div class="cont-title-bold clearfix">
				<span class="title">应用名称：<?=app.app_alias?></span>
				<div class="opt">
					<a class="btn-add-version" style="color:#fff;" href="#pc">返回</a>
				</div>
			</div>
			<div class="form-box">
				<div class="form-box-title">
					请选择您要接入的操作系统类型：
					<span class="icons iconl"></span>
					<span class="icons iconr"></span>
				</div>
				<form action="" method="post" onsubmit="return false;">
					<div class="form-body">
						<div class="access-types">
							<input id="access-windows" type="radio" class="vmiddle" name="access_type" value="windows" checked="checked">
							<label for="access-windows" class="labelr">windows</label>
							<input id="access-mac" type="radio" class="vmiddle" name="access_type" value="mac">
							<label for="access-mac" class="labelr">mac</label>
							<input id="access-linux" type="radio" class="vmiddle" name="access_type" value="linux">
							<label for="access-linux" class="labelr">linux</label>
						</div>
						<dl class="clearfix">
							<dt><em class="required">*</em>版本名称：</dt>
							<dd>
								<input class="input" type="text" name="version_name" id="version_name">
                                <p class="form-common-tip">该名称也用于来源显示，不超过15个字符（中英文、数字或下划线）</p> 
							</dd>
						</dl>
						<dl class="clearfix">
							<dt><em class="required">*</em>版&nbsp;本&nbsp;号：</dt>
							<dd>
								<input class="input" type="text" name="version_no" id="version_no">
                                 <p class="form-common-tip">当前的版本号,支持整数、小数</p>
							</dd>
						</dl>
						<div class="btns-opt">
							<a class="subtn" href="javascript:void(0)" id="postBtn">接&nbsp;入</a>
						</div>
					</div>
				</form>
			</div>
</script>

<website:style href="css/dev/form.css"/>
<website:style href="css-open/dev/app-mgr.css"/>
<script type="text/html" id="appInnerCreateTpl">
	<div class="cont-title-bold clearfix">
				<span class="title">应用名称：<?=app.app_alias?></span>
				<div class="opt">
					<a class="btn-add-version"  style="color:#fff;" href="#inner">返回</a>
				</div>
			</div>
			<div class="form-box">
				<div class="form-box-title">
					请输入版本信息：
					<span class="icons iconl"></span>
					<span class="icons iconr"></span>
				</div>
				<form action="" method="post" onsubmit="return false;">
					<div class="form-body">
						<div class="access-types">
						
						</div>
						<dl class="clearfix">
							<dt><em class="required">*</em>版本名称：</dt>
							<dd>
								<input class="input" type="text" name="version_name" id="version_name">
                                <p class="form-common-tip">该名称也用于来源显示，不超过15个字符（中英文、数字或下划线）</p> 
							</dd>
						</dl>
						<dl class="clearfix">
							<dt><em class="required">*</em>版&nbsp;本&nbsp;号：</dt>
							<dd>
								<input class="input" type="text" name="version_no" id="version_no">
                                <p class="form-common-tip">当前的版本号,支持整数、小数</p>
							</dd>
						</dl>
						<div class="btns-opt">
							<a class="subtn" href="javascript:void(0)" id="postBtn">接&nbsp;入</a>
						</div>
					</div>
				</form>
			</div>
</script>

<website:style href="css/dev/form.css"/>
<website:style href="css-open/dev/app-mgr.css"/>
<script type="text/html" id="appOutterCreateTpl">
	<div class="cont-title-bold clearfix">
				<span class="title">应用名称：<?=app.app_alias?></span>
				<div class="opt">
					<a class="btn-add-version" style="color:#fff;"  href="#outter">返回</a>
				</div>
			</div>
			<div class="form-box">
				<div class="form-box-title">
					请输入版本信息：
					<span class="icons iconl"></span>
					<span class="icons iconr"></span>
				</div>
				<form action="" method="post" onsubmit="return false;">
					<div class="form-body">
						<div class="access-types">
						
						</div>
						<dl class="clearfix">
							<dt><em class="required">*</em>版本名称：</dt>
							<dd>
								<input class="input" type="text" name="version_name" id="version_name">
                                <p class="form-common-tip">该名称也用于来源显示，不超过15个字符（中英文、数字或下划线）</p> 
							</dd>
						</dl>
						<dl class="clearfix">
							<dt><em class="required">*</em>版&nbsp;本&nbsp;号：</dt>
							<dd>
								<input class="input" type="text" name="version_no" id="version_no">
                                <p class="form-common-tip">当前的版本号,支持整数、小数</p>
							</dd>
						</dl>
						<div class="btns-opt">
							<a class="subtn" href="javascript:void(0)" id="postBtn">接&nbsp;入</a>
						</div>
					</div>
				</form>
			</div>
</script>



<website:widget path="dev/open/app/appMobileTpl.jsp?personbox=app"/>

<website:widget path="dev/open/app/appInnerTpl.jsp?personbox=app"/>

<website:widget path="dev/open/app/appOutterTpl.jsp?personbox=app"/>

<website:widget path="dev/open/app/appPcTpl.jsp?personbox=app"/>

<!--搜索服务列表的模板文件-->
<script type="text/html" id="SearchServiceTpl">
<div class="cont-title">
	<span class="title">服务搜索</span>
	<span class="title2">共<span class="num"><?=count?></span>项服务</span>
	<div class="opt">
		<div class="search-box-wrap clearfix">
			<form class="search_form" action="" method="post">
				<div class="search-input-wrap">
					<input type="hidden" name="appid" value="${app_id}">
					<input name="keyword" class="search-input" type="text" placeholder="输入关键词查找">
					<span class="icons search-icon _begin_search_" title="开始查找"></span>
				</div>
			</form>
		</div>
	</div>
</div>
<ul class="service-list" style="min-height: 432px;">
	<? for(var i=0; i< data.length; i++){ ?>
		<li class="service-item" id="item<?=data[i]['service_id']?>">
			<div class="c1">
				<a class="service-name ellipse" href="javascript:void(0)"><?=data[i]['service_name']?></a>
				<p class="service-info">服务版本：<?=data[i]['version_name']?>&emsp;&emsp;服务上下文：<?=data[i]['context'];?></p>
			</div>
			<div class="c2"><?=data[i]['create_time']?></div>
			<div class="c3" style="width: 120px;">
				<?if(data[i]['is_subbed']=='1'){?>
					<?if(data[i]['is_subbed']=='created'){?>
						<span class="app_item_status">审核中</span>
						<a href="javascript:void(0)" class="applyBtn" title="取消" 
							__singleCancelApply="true" __id="<?=data[i]['subscription_id']?>">取消</a>
					<?}?>
					<?if(data[i]['is_subbed']=='1'){?>
						<span class="app_item_status">审核通过</span>
						<a href="javascript:void(0)" class="applyBtn" title="取消" 
							__singleCancelApply="true" __id="<?=data[i]['subscription_id']?>">取消</a>
					<?}?>
					<?if(data[i]['is_subbed']=='0'){?>
						<span class="app_item_status">驳回</span>
						<a href="javascript:void(0)" class="applyBtn" title="申请" 
							__singleApply="true" __id="<?=data[i]['service_id']?>">申请</a>
					<?}?>
				<?}else{?>
					<span class="app_item_status">未申请</span>
					<a href="javascript:void(0)" class="applyBtn" title="申请" 
						__singleApply="true" __id="<?=data[i]['service_id']?>">申请</a>
				<?}?>
			</div>
		</li>
	<? } ?>
</ul>		
<div class="service-title bottom" id="paper" ></div>
</script>

<script>
var app_id = '${app_id}';
var app = eval('('+'${appJson}'+')');
var groups = eval('(' + '${groupsJson}' + ')');

//var is_pm = ${is_pm};
var context_url = "../"; //在上传返回文件路径中使用,handlers.js
var icon_size_para="&type=thumbnail&size=64";
var rcservice_url = "${fn:getConfValue('global.index.rcservice')}/doc?doc_id=";
var rc_upload_url = "${fn:getConfValue('global.index.rcservice')}/upload";
var upload_type = "${fn:getConfValue('upload_type')}";

var uid = "${uid}";
if(app_id > 0){
	seajs.use("modules/app", function(app){
		template.openTag = "<?";
		template.closeTag = "?>";
		app.start();
	});
}else{
	alert("出错了");
}
</script>