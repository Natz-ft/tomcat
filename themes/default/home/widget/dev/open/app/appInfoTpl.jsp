<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>


<script type="text/html" id="appInfoTpl">
			<div class="form-ct">
				<div class="form-title clearfix">
					<span class="icons title-icon"></span>
					<span class="title-txt">基本信息</span>
					<a href="#edit"><span class="menu-icons title-edit" title="编辑" ></span></a>
				</div>
				<div class="form-body">
					<dl class="clearfix">
						<dt>应用名称：</dt>
						<dd><label><?=app_alias?></label></dd>
					</dl>
					<dl class="clearfix">
						<dt>应&ensp;用&ensp;ID：</dt>
						<dd><label><?=app_id?></label></dd>
					</dl>
					<dl class="clearfix">
						<dt>应用密钥：</dt>
						<dd><label><span id="app_secret_show"><?=client_secret?></span> <button id="reset_secret_btn">重置密钥</button></label></dd>
					</dl>
						<dl class="clearfix">
						<dt>标&ensp;&ensp;&ensp;&ensp;签：</dt>
						<dd><label><?=app_tags?></label></dd>
					</dl>
					<dl class="clearfix">
						<dt>应用类别：</dt>
						<dd><label id="groups_render"></label></dd>
					</dl>

					<? if( app_owner_name!=null){?>
					<dl class="clearfix" id="dl_app_owner_info">
					</dl>
					<? }?>

					<dl class="clearfix" id="dl_user_type_info" style="display:none">
					</dl>

					<dl class="clearfix">
						<dt>授权方式：</dt>
						<dd><label>
					
							<? if( authorization_code){?>
								授权码 &nbsp;&nbsp;
							<?}?>
							<? if(client_credentials){?>
								客户端私有证书 &nbsp;&nbsp;
							<?}?>
							
							<? if(implicit){?>
								隐式授权 &nbsp;&nbsp;
							<?}?>
							<? if(password){?>
								用户密码 &nbsp;&nbsp;
							<?}?>
							
				
						</label></dd>
					</dl>
					
					<dl class="clearfix">
						<dt>回调地址：</dt>
						<dd><label><? if(callback_url != null){?><?=callback_url[0]?><?}?><? if(callback_url == null){?>暂无<?}?></label></dd>
					</dl>

					<dl class="clearfix" style="display:none">
						<dt>接入类型：</dt>
						<dd>
                           <? if(app_type == 'mobile'){?>                        
							<div class="app-type">
								<a href="#mobile" title="接入移动应用">
									<span class="menu-icons mobile"></span>
									<p class="txt">移动应用</p>
								</a>
							</div>
                           <?}?>
                           <? if(app_type == 'inner'){?>
							<div class="app-type">
								<a href="#inner" title="接入站内应用">
									<span class="menu-icons insite"></span>
									<p class="txt">站内应用</p>
								</a>
							</div>
                           <?}?>
                           <? if(app_type == 'outter'){?>
							<div class="app-type">
								<a href="#outter" title="接入站外应用">
									<span class="menu-icons outsite"></span>
									<p class="txt">站外应用</p>
								</a>
							</div>
                           <?}?>
						</dd>
					</dl>
					<dl class="clearfix">
						<dt>创建时间：</dt>
						<dd><label><?=create_date?></label></dd>
					</dl>
					<dl class="clearfix">
						<? if(has_online_version == false){?>
						<dd style="margin:auto 162px"><a class="btn_sgray" href="javascript:void(0)" id="delBtn" >删&nbsp;除</a></dd>
 						<?}?>
					</dl>
				</div>

				<div class="form-title clearfix">
					<span class="icons title-icon"></span> <span class="title-txt">统计信息</span>
				</div>
				<div class="statisticsBtn" >
					<span class="group-btn"><button class="m-btn btn-info" id="appStatisticsBtn">应用统计</button></span>
					<span class="group-btn"><button class="m-btn btn-info" id="serviceStatisticsBtn">服务统计</button></span>
				</div>
			</div>
</script>
<website:widget path="dev/open/app/appOwnerInfoTpl.jsp" />
<website:widget path="dev/open/app/userTypeInfoTpl.jsp" />
