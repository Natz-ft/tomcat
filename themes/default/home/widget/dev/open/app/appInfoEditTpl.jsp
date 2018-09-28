<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>


<website:style href="css/dev/open/servicetag.css"/>
<script type="text/html" id="appInfoEditTpl">
			<div class="form-ct">
				<div class="form-title clearfix">
					<span class="icons title-icon"></span>
					<span class="title-txt">基本信息</span>
					<a href="#"><span class="menu-icons title-return" title="返回" ></span></a>
				</div>
				<div class="form-body">
					<dl class="clearfix">
						<dt><font color="red">*</font>应用名称：</dt>
						<dd><label><input class="input" type="text" value="<?=app_alias?>" id="app_alias"/></label></dd>
					</dl>
					<dl class="clearfix">
						<dt>应用标签：</dt>
						<dd style="width:370px">
							<input type="hidden" name="app_tags" value=""/>
							<input type="hidden" name="app_tagnames" value=""/>
							<div class="plus-tag tagbtn clearfix service-tag" id="myTags">
								 <?if(tagList!=null){
									for(j=0;j<tagList.length;j++){?>
										<a title="<?=tagList[j].tag_name?>" value="<?=tagList[j].tag_id?>" href="javascript:void(0);"><span><?=tagList[j].tag_name?></span><em></em></a>
			    				 <? }
								}
								 ?> 
							</div>
					        <div id="tag-plus" class="tag-plus"  style="display:none;">
							  	<div class="default-tag tagbtn">		     
							 
							  	</div>
								<div align="right"><a href="javascript:void(0);" id="change-tips" style="color:#3366cc;">下一组</a></div>
					    	</div>
						</dd>
					</dl>
					
					<dl class="clearfix">
						<dt><font color="red">*</font>应用类别：</dt>
						<dd id="groups_render">
							
						</dd>
					</dl>

					<dl class="clearfix" id="dl_app_owner">
					</dl>
					<dl class="clearfix" id="dl_user_type" style="display:none">
					</dl>

					<dl class="clearfix">
						<dt>授权方式：</dt>
						<dd>
							<input type="checkbox" name="auth_type" value=
"authorization_code" <?if(authorization_code){?> checked <?}?>> 授权码
							<input type="checkbox" name="auth_type" value=
"client_credentials" <?if(client_credentials){?>checked<?}?>> 客户端私有证书
							<input type="checkbox" name="auth_type" value=
"implicit" <?if(implicit){?>checked<?}?>> 隐式授权
							<input type="checkbox" name="auth_type" value=
"password" <?if(password){?>checked<?}?>>用户密码
						</dd>
						<label style="width: 350px;display: inline-block;margin-left: 238px;">授权码：适用于有Web Server的应用，并且其所申请服务需要用户授权；<br/>客户端私有证书：适用于不涉及用户隐私的服务访问；<br/>隐式授权：适用于无Web Server的应用；<br/>用户密码：适用于深度合作伙伴使用或者平台官方应用。
				</label>
					</dl>
				
					
					<dl class="clearfix">
						<dt>回调地址：</dt>
						<dd>
							<input class="input" type="text" name="callback_url" id="callback_url" value=
"<? if(callback_url != null){?><?=callback_url[0]?><?}?>" />						
						</dd>
						<label style="width: 350px;display: inline-block;margin-left: 238px;">授权处理地址是应用获取授权码后，换取访问令牌的处理页面
</label>
					</dl>
					
					<dl class="clearfix">
						<dt></dt>
						<dd><a class="btn_sgray" href="javascript:void(0)" id="submitBtn" >保&nbsp;存</a></dd>
					</dl>
				</div>
			</div>
</script>
<website:widget path="dev/open/app/appOwnerTpl.jsp" />
<%-- <website:widget path="dev/open/app/userTypeTpl.jsp" /> --%>

