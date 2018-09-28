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
<website:style href="css/account/bank.css"/>
<website:style href="css/blockui_css.css"/>
<div class="panel account-show-panel">
	<div class="content-title clearfix">
		<span class="title-icon"></span><span>银行信息</span>
	</div>
	
	<div class="m_warn m_warn_tip">
		<p>温馨提示：</p>
		<p>请您放心填写银行信息，我们一定会妥善保管您的银行信息，确保安全。</p>
	</div>
	
	<div class="form-contain" style="margin-top: 0px; padding-top: 0px;">
	
		<form class="form-body form-baseInfo" id="modify-form" action="#">
			<!--组织表基本资料开始-->
			<div class="form-info">
				<dl>
					<dt>开户银行：</dt>
					<dd>
						<select id="open_bank" name='open_bank'  class='select field'>
							<optgroup label="国有商业银行">
								<option value='国家开发银行'>国家开发银行</option>
								<option value='中国工商银行'>中国工商银行</option>
								<option value='中国农业银行'>中国农业银行</option>
								<option value='中国建设银行'>中国建设银行</option>
								<option value='中国邮政储蓄银行'>中国邮政储蓄银行</option>
								<option value='中国银行'>中国银行</option>
								<option value='交通银行'>交通银行</option>
							</optgroup>
							<optgroup label="全国性股份制银行">
								<option value='招商银行'>招商银行</option>
								<option value='民生银行'>中国民生银行</option>
								<option value='光大银行'>中国光大银行</option>
								<option value='兴业银行'>兴业银行</option>
								<option value='浦发银行'>浦发银行</option>
								<option value='华夏银行'>华夏银行</option>
							</optgroup>
							<optgroup label="区域银行">
								<option value='齐鲁银行'>齐鲁银行</option>
								<option value='深圳发展银行'>深圳发展银行</option>
								<option value='广东发展银行'>广东发展银行</option>
								<option value='北京银行'>北京银行</option>
								<option value='北京农村商业银行'>北京农村商业银行</option>
								<option value='天津银行'>天津银行</option>
								<option value='上海银行'>上海银行</option>
								<option value='上海农村商业银行'>上海农村商业银行</option>
								<option value='南京银行'>南京银行</option>
								<option value='宁波银行'>宁波银行</option>
								<option value='杭州市商业银行'>杭州市商业银行</option>
								<option value='深圳平安银行'>深圳平安银行</option>
								<option value='深圳农村商业银行'>深圳农村商业银行</option>
								<option value='厦门国际银行'>厦门国际银行</option>
								<option value='济南市商业银行'>济南市商业银行</option>
								<option value='重庆银行'>重庆银行</option>
								<option value=' 哈尔滨银行'> 哈尔滨银行</option>
								<option value='成都市商业银行'>成都市商业银行</option>
								<option value='包头市商业银行'>包头市商业银行</option>
								<option value='南昌市商业银行'>南昌市商业银行</option>
								<option value='贵阳商业银行'>贵阳商业银行</option>
								<option value='兰州市商业银行'>兰州市商业银行</option>
								<option value='常熟农村商业银行'>常熟农村商业银行</option>
								<option value='青岛市商业银行'>青岛市商业银行</option>
								<option value='徽商银行'>徽商银行</option>
							</optgroup>
						</select>
					</dd>
					<dd class="form-tip" ></dd>
				</dl>
				<dl>
					<dt>银行账号：</dt>
					<dd>
						<input id="bank_account" name="bank_account" type="text" class="input field" 
						value="<c:if test="${!empty orgInfo}">${orgInfo.bank_account}</c:if>"/>
					</dd>
					<dd class="form-tip" style="margin-left:-10px"></dd>
					<dd class="check_rule" style="height:30px;width:500px;">请输入16-19位银行账号</dd>
				</dl>
			</div>
			<!-- 组织表基本资料结束 -->
			<div class="btn-contain">
				<dl>
					<dt></dt>
					<dd style="text-align: left;line-height:30px;padding-left:8px;">
						<a class="user_act_btn do" style="margin-right:25px;" href="javascript:void(0);" id="submit_btn" hideFocus="hidefocus"><span>提交</span></a> 
						<a class="user_act_btn back"  href="javascript:void(0);" id="cancel_btn" hideFocus="hidefocus"><span>取消</span></a>
					</dd>
				</dl>
			</div>
		</form>
	</div>
</div>
<website:script src="js/jquery.form.js"/>
<website:script src="js/jquery.bgifrm-2.1.2.js"/>
<website:script src="js/jquery.validate.js"/>
<website:script src="js/infoBase.comboBox.js"/>
<website:script src="js/jquery.validate.ext.js"/>
<website:script src="js/jquery.blockUI.js"/>
<website:script src="js/dialog.js"/>

<script type="text/javascript">
//校验规则初始化
$(function(){
	$("#modify-form").validate({
		rules:{
			bank_account:{
				banknum:function(){ return $("#bank_account").val()==null?false:true;},
				required:true
				},
			open_bank:{
				required:true
				}
			},
		messages:{
			bank_account:{
				required:"请填写银行账号"
			},
			open_bank:{
				required:"请填写开户银行"
			 }
			}
		});
});
$(document).ready(function(){
	
	if("${orgInfo.open_bank}" != ""){
		$("#open_bank ").attr("value","${orgInfo.open_bank}");
	}
	
	//validate banknum
	jQuery.validator.addMethod("banknum", function(value,element) {
	    var regex = /^\d{16,19}$/;
	    return this.optional(element) || regex.test(value);
	}, "银行账号仅限16-19位数字");
	
	//监听修改事件，当内容发生变化时，触发
	var modifyFlag='false';
	$(".field").change(function(){
		modifyFlag='true';
	});
	
//提交表单
 $('#submit_btn').on("click",function(){
	//监听到内容发生变化时，进行异步提交，否则提示无需更改
	if(modifyFlag=='true'){
		var validate=$("#modify-form").valid();
		if(!validate){
			return false;
		}
	 $("#modify-form").ajaxSubmit({
         url:"${fn:getLink('account/accountAction.do?method=orgSubmit')}",
         type:"post",
         success:function(data){
        	 data = eval('('+data+')');
        	 if(data==1) {
        		 dialog.success("修改成功！",function(){
    					window.location.href="${fn:getLink('account/bankInfo.jsp')}";
    			});
  			}else if(data==0) {
  				dialog.error("修改失败，请重新操作！");
  			}else {
  				dialog.error("发生错误，请重试！",function(){
  					window.location.href="${fn:getLink('account/bankInfo.jsp')}";
  				});
  				}
             }
	 	});
	 }else if($("#bank_account").val()=='' && $("#open_bank").val()==''){
		 	dialog.error("您未填写银行信息，无需提交！");
			return false;
	 }else{
			dialog.error("没有更改，无需操作！");
			return false;
		}
 });
   $("#cancel_btn").on("click",function(){
		window.location.href="${fn:getLink('account/bankInfo.jsp')}";
   });
});
</script>




