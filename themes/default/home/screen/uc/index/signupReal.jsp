<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8" buffer="none" %>
<%@page import="com.inspur.ucweb.utils.ConfUtil"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<website:style href="css/uc/blockui_css.css"/>
<website:style href="css/icon/style.css" rel="stylesheet" />
<website:style href="images/favicon.ico" rel="shortcut icon" type="image/x-icon"/>
<style>
.form-body  dd.form-tip{
  width:140px;
}
.form-body  dd.form-tip span{
  line-height: 15px;
}
</style>
<!-- action需要使用全局变量然后加控制器 -->
<link href="${fn:getLink('css/uc/index/signupReal.css')}" rel="stylesheet" type="text/css" />
<div style="width:100%;" class="clearfix">
  <div class="form-contain">
  <div style="width:650px; margin:0 auto;">
    <div class="form-type">
      <!-- <input type="button" class="btn-per btn-per-hover" id="btn-per"
        style="margin-left: 40px;" value="个人邮箱注册">  -->
      <input type="button" class="btn-per btn-per-hover" id="btn-per1" value="个人手机注册" style="margin-left: 50px;">
      <input type="button" class="btn-org" id="btn-org" value="单位注册">
    </div>
    <div class="form_per_contain" id="form_per_contain" style="display: none;">
      <form
        action="${fn:getLink('uc/index/signUp.do?method=signUp') }"
        method="post" id="register_form_per">
      <!--  <div class="m_warn" style="margin-right:0px;margin-top:10px;border:1px solid #FF0000;background:#FFE2CF;color:#FFf0000">
        本账号是您享受全面的城市咨询及服务的网上通行证，请确保账号的唯一性以及资料的准确性！
        </div>  -->
        <div class="form-body form-signup-body">
          <dl>
            <dt>
              <em>*</em>&nbsp;登录邮箱：
            </dt>
            <dd>
              <input id="email_per" name="login_email" type="text"
                class="input" />
            </dd>
            <dd class="form-tip"></dd>
            <dd class="check_rule" >该邮箱用于账号激活及登录。</dd>
          </dl>
          <dl>
            <dt>
              <em>*</em>&nbsp;个人登录用户名：
            </dt>
            <dd>
              <input id="login_name_per" name="login_name" type="text"
                class="input" />
            </dd>
            <dd class="form-tip" ></dd>
            <dd class="check_rule">以字母开头，允许使用字母数字下划线，5-20位组成</dd>
          </dl>
          <dl>
            <dt>
              <em>*</em>&nbsp;昵称：
            </dt>
            <dd>
              <input id="nick_per" name="nick" type="text"
                class="input" />
            </dd>
            <dd class="form-tip"></dd>
            <dd class="check_rule">不能超过20个字符串，汉字算一个字符</dd>
          </dl>

          <dl style="width:640px;">
            <dt>
              <em>*</em>&nbsp;登录密码：
            </dt>
            <dd>
              <input id="password_per" name="password" type="password"
                class="input " />
            </dd>
            <dd class="form-tip" style="width:180px;line-height:20px;"></dd>
            <dd class="check_rule">密码由6-15位字母、数字或特殊符号组成</dd>
          </dl>

          <dl>
            <dt>
              <em>*</em>&nbsp;确认密码：
            </dt>
            <dd>
              <input id="confirm_password_per" name="confirm_password"
                type="password" class="input" />
            </dd>
            <dd class="form-tip"></dd>
            <dd class="check_rule">请再次输入您设置的密码</dd>
          </dl>

          <dl style="display: none;">
            <select name="user_type" id="user_type_per" class="select">
              <option value="11" checked="true">个人</option>
            </select>
          </dl>
          <dl>
            <dt>
              <em>*</em>&nbsp;验证码：
            </dt>
            <dd>
              <input id="checknum_per" name="checknum" type="text"
                class="input" style="width: 100px; padding: 0px 0px 0px 2px;" />
              &nbsp <a href="javascript:changeVerify_per();"
                hideFocus="hidefocus"> <img
                src="${fn:getLink('uc/index/verify.jsp')}"
                id="verifyImg_per" alt="换一张" /></a>&nbsp; <a
                href="javascript:changeVerify_per();" style="font-size: 12px;"
                hideFocus="hidefocus">看不清楚可换一个</a>
                <input id="verifycode_hid_p" type="hidden" value="" />
            </dd>
            <dd class="form-tip"></dd>
          </dl>

          <dl style="display: none">
            <dt></dt>
            <dd style="margin-left: -20px;">
              <input id="login_allow_per2" name="login_allow" type="checkbox"
                class="checkbox" checked="checked"/>&nbsp;&nbsp;我已阅读并同意 <a href="${fn:getConfValue('global.index.odweb')}/uc/register.html" target='_blank' 
                class="m-link" hideFocus="hidefocus">《浪潮IOP网络服务使用协议》</a> <label
                for="login_allow" class="error" generated="true"></label>
            </dd>
            <dd class="form-tip" style="width:120px;"></dd>
            <input id="passwordStrength_per" name="passwordStrength"
              type="text" class="input" style="display: none" />
          </dl>
        </div>
        <div class="form-submit">
          <dl>
            <dd style="text-align: center;">
              <input type="button" class="btn-reg" id="btn-submit_per">
            </dd>
          </dl>
        </div>
      </form>
    </div>
    <div class="form_per_contain" id="form_per_contain1">
      <form
        action="${fn:getLink('uc/index/signUpReal.do?method=PhoneSignUp') }"
        method="post" id="register_form_per1">
      <!--  <div class="m_warn" style="margin-right:0px;margin-top:10px;border:1px solid #FF0000;background:#FFE2CF;color:#FFf0000">
        本账号是您享受全面的城市咨询及服务的网上通行证，请确保账号的唯一性以及资料的准确性！
        </div>  -->
        <div class="form-body form-signup-body">
          <dl>    
            <dt>
              <em>*</em>登录名：
            </dt>
            <dd>
              <input id="login_name_per1" class="input" name="login_person_name" type="text"/>
            </dd>
            <dd class="form-tip"></dd>
            <dd class="check_rule">以字母开头，允许使用字母数字下划线，5-20位组成</dd>
          </dl>
          <dl>    
            <dt>
              <em>*</em>登录密码：
            </dt>
            <dd>
              <input id="password_per1" class="input" name="password" type="password"/>
            </dd>
            <dd class="form-tip"></dd>
            <dd class="check_rule">密码由6-15位字母、数字或特殊符号组成</dd>
          </dl>
          <dl>    
            <dt>
              <em>*</em>确认密码：
            </dt>
            <dd>
              <input id="confirm_password_per1" class="input" name="confirm_password" type="password"/>
            </dd>
            <dd class="form-tip"></dd>
            <dd class="check_rule">请再次输入您设置的密码</dd>
          </dl>
          <dl>    
            <dt>
              <em>*</em>真实姓名：
            </dt>
            <dd>
              <input id="uname" class="input" name="uname" type="text"/>
            </dd>
            <dd class="form-tip"></dd>
            <dd class="check_rule">请输入您的真实姓名</dd>
          </dl>
          <dl>
            <dt>
              <em>*</em>您的手机号：
            </dt>
            <dd>
              <input id="login_phone" class="input" name="login_phone" type="text"/>
            </dd>
            <dd class="form-tip"></dd>
            <dd class="check_rule"><a href="javascript:void(0);" id="send_btn"><span>发送验证码</span></a></dd>
          </dl>
            <dl>
            <dt>
              <em>*</em>&nbsp;手机验证码：
            </dt>
            <dd>
              <input id="vcode" class="input" name="vcode" type="text" />
            </dd>
            <dd class="form-tip" ></dd>
            <dd class="check_rule" id="sendOK">请输入您收到的手机验证码</dd>
          </dl>

          <dl class="m-b">    
            <dt>
              <em>*</em>称呼：
            </dt>
            <dd>
              <input type="radio" name="sex" id="optionsRadios_sex1" value="0" > 先生
              <input type="radio" name="sex" id="optionsRadios_sex2" value="1" > 女士
            </dd>
          </dl>
          <dl  class="m-b">    
            <dt>
              <em>*</em>职业：
            </dt>
            <span  class="check-box">
              <input type="radio" name="profession" id="optionsRadios_per1" value="1" > 学生
              <input type="radio" name="profession" id="optionsRadios_per2" value="2" > 公司职员
              <input type="radio" name="profession" id="optionsRadios_per3" value="3" > 私营业主
              <input type="radio" name="profession" id="optionsRadios_per4" value="4" > 科研人员
              <input type="radio" name="profession" id="optionsRadios_per5" value="5" > 军人
              <input type="radio" name="profession" id="optionsRadios_per6" value="6" > 自由职业
            </span>
            <span class="check-box"  style="display:block">
              <input type="radio" name="profession" id="optionsRadios_per7" value="7" > 私营业主
              <input type="radio" name="profession" id="optionsRadios_per8" value="8" > 事业编制人员
              <input type="radio" name="profession" id="optionsRadios_per9" value="9" > 其他
            </span>
          </dl>
          <dl  class="m-b">    
            <dt>
              <em>*</em>用途：
            </dt>
            <dd>
              <input type="checkbox" name="application" id="application_per1" value="1" > 商业
              <input type="checkbox" name="application" id="application_per2" value="2" > 公司职员
              <input type="checkbox" name="application" id="application_per3" value="3" > 科研
              <input type="checkbox" name="application" id="application_per4" value="4" > 公益
              <input type="checkbox" name="application" id="application_per5" value="5" > 个人
              <input type="checkbox" name="application" id="application_per6" value="6" > 其他
            </dd>
          </dl>
          <dl >    
            <dt class="m-b" >
              <em>*</em>地址：
            </dt>
            <dd>
              <select class="form-control" id="provence" name="prov_code">
                <!-- <option>四川</option>
                <option>2</option> -->
              </select>
              <select class="form-control" id="city" name="city_code">
               <!--  <option>成都</option>
                <option>2</option> -->
              </select>
              <select class="form-control" id="area" name="district">
               <!--  <option>高新区</option>
                <option>2</option> -->
              </select>
            </dd>
          </dl>
          <dl style="width:620px;">    
            <dt>
              <em>*</em>所属行业：
            </dt>
            <span class="check-box">
              <input type="checkbox" name="industry" id="optionsRadios1" value="1" > 教育
              <input type="checkbox" name="industry" id="optionsRadios2" value="2" > 旅游
              <input type="checkbox" name="industry" id="optionsRadios3" value="3" > 工业
              <input type="checkbox" name="industry" id="optionsRadios4" value="4" > IT互联网
              <input type="checkbox" name="industry" id="optionsRadios5" value="5" > 房地产
              <input type="checkbox" name="industry" id="optionsRadios6" value="6" > 制造业
              <input type="checkbox" name="industry" id="optionsRadios7" value="7" > 交通物流
            </span>
            <span class="check-box" style="display:block">
              <input type="checkbox" name="industry" id="optionsRadios8" value="8" > 政府
              <input type="checkbox" name="industry" id="optionsRadios11" value="9" > 贸易
              <input type="checkbox" name="industry" id="optionsRadios22" value="10" > 文化娱乐
              <input type="checkbox" name="industry" id="optionsRadios33" value="11" > 农林渔牧业
              <input type="checkbox" name="industry" id="optionsRadios44" value="12" > 体育艺术
              <input type="checkbox" name="industry" id="optionsRadios55" value="13" > 其他
            </span>
          </dl>
          <dl style="display: none">
            <dt></dt>
            <dd style="margin-left: -20px;">
              <input id="login_allow_per" name="login_allow" type="checkbox"
                class="checkbox" checked="checked"/>&nbsp;&nbsp;我已阅读并同意 <a href="${fn:getConfValue('global.index.odweb')}/uc/register.html" target='_blank' 
                class="m-link" hideFocus="hidefocus">《浪潮IOP网络服务使用协议》</a> <label
                for="login_allow" class="error" generated="true"></label>
            </dd>
            <dd class="form-tip" style="width:120px;"></dd>
            <input id="passwordStrength_per1" name="passwordStrength"
              type="text" class="input" style="display: none" />
          </dl>
        </div>

        <div class="form-submit">
          <dl>
            <dd style="text-align: center;">
              <input type="button" class="btn-reg" id="btn-submit_per1">
            </dd>
          </dl>
        </div>
      </form>
    </div>
    <div class="form_org_contain" style="display: none;" id="form_org_contain">
            <form
        action="${fn:getLink('uc/index/signUpReal.do?method=OrgSignUp') }"
        method="post" id="register_form_org">
      <!--  <div class="m_warn" style="margin-right:0px;margin-top:10px;border:1px solid #FF0000;background:#FFE2CF;color:#FFf0000">
        本账号是您享受全面的城市咨询及服务的网上通行证，请确保账号的唯一性以及资料的准确性！
        </div>  -->
        <div class="form-body form-signup-body">
          <dl>    
            <dt>
              <em>*</em>登录名：
            </dt>
            <dd>
              <input id="login_org_name1" class="input" name="login_org_name" type="text"/>
            </dd>
            <dd class="form-tip"></dd>
            <dd class="check_rule">以字母开头，允许使用字母数字下划线，5-20位组成</dd>
          </dl>
          <dl>    
            <dt>
              <em>*</em>登录密码：
            </dt>
            <dd>
              <input id="password_org" class="input" name="password" type="password"/>
            </dd>
            <dd class="form-tip"></dd>
            <dd class="check_rule">密码由6-15位字母、数字或特殊符号组成</dd>
          </dl>
          <dl>    
            <dt>
              <em>*</em>确认密码：
            </dt>
            <dd>
              <input id="confirm_password_org" class="input" name="confirm_password" type="password"/>
            </dd>
            <dd class="form-tip"></dd>
            <dd class="check_rule">请再次输入您设置的密码</dd>
          </dl>
          <dl>    
            <dt>
              <em>*</em>企业名称：
            </dt>
            <dd>
              <input id="org_name" class="input" name="org_name" type="text"/>
            </dd>
            <dd class="form-tip"></dd>
            <dd class="check_rule">请输入企业名称</dd>
          </dl>
          <dl>    
            <dt>
              <em>*</em>企业联系人：
            </dt>
            <dd>
              <input id="contact_name" class="input" name="contact_name" type="text"/>
            </dd>
            <dd class="form-tip"></dd>
            <dd class="check_rule">请输入联系人真实姓名</dd>
          </dl>
          <dl>
            <dt>
              <em>*</em>企业联系人电话：
            </dt>
            <dd>
              <input id="contact_phone" class="input" name="contact_phone" type="text"/>
            </dd>
            <dd class="form-tip"></dd>
            <dd class="check_rule"><a href="javascript:void(0);" id="verify_btn"><span>发送验证码</span></a></dd>
          </dl>
          <dl>
            <dt>
              <em>*</em>&nbsp;手机验证码：
            </dt>
            <dd>
              <input id="vcode1" class="input" name="vcode1" type="text" />
            </dd>
            <dd class="form-tip"></dd>
            <dd class="check_rule" id="verifyOK">请输入您收到的手机验证码</dd>
          </dl>
          <dl>    
            <dt>
              <em>*</em>统一社会信用码：
            </dt>
            <dd>
              <input id="org_code" class="input" name="org_code" type="text"/>
            </dd>
          </dl>
          <dl>    
            <dt>
              <em>*</em>注册地址：
            </dt>
            <dd>
              <select class="form-control" id="provencef" name="prov_code">
                <!-- <option>四川</option>
                <option>2</option> -->
              </select>
              <select class="form-control" id="cityf" name="city_code">
               <!--  <option>成都</option>
                <option>2</option> -->
              </select>
              <select class="form-control" id="areaf" name="district">
                <!-- <option>高新区</option>
                <option>2</option> -->
              </select>
            </dd>
          </dl>
          <dl  class="check-box">    
            <dt>
              <em>*</em>所属行业：
            </dt>
            <span>
              <input type="checkbox" name="industry_type1" id="optionsRadios_org1" value="1" > 教育
              <input type="checkbox" name="industry_type1" id="optionsRadios_org2" value="2" > 旅游
              <input type="checkbox" name="industry_type1" id="optionsRadios_org3" value="3" > 工业
              <input type="checkbox" name="industry_type1" id="optionsRadios_org4" value="4" > IT互联网
              <input type="checkbox" name="industry_type1" id="optionsRadios_org5" value="5" > 房地产
              <input type="checkbox" name="industry_type1" id="optionsRadios_org6" value="6" > 制造业
              <input type="checkbox" name="industry_type1" id="optionsRadios_org7" value="7" > 交通物流
            </span>
            <span class="check-box"  style="display:block">
              <input type="checkbox" name="industry_type1" id="optionsRadios_org8" value="8" > 政府
              <input type="checkbox" name="industry_type1" id="optionsRadios_org9" value="9" > 贸易
              <input type="checkbox" name="industry_type1" id="optionsRadios_org10" value="10" > 文化娱乐
              <input type="checkbox" name="industry_type1" id="optionsRadios_org11" value="11" > 农林渔牧业
              <input type="checkbox" name="industry_type1" id="optionsRadios_org12" value="12" > 体育艺术
              <input type="checkbox" name="industry_type1" id="optionsRadios_org13" value="13" > 其他
            </span>
          </dl>
          <dl style="display: none">
            <dt></dt>
            <dd style="margin-left: -20px;">
              <input id="login_allow_per1" name="login_allow" type="checkbox"
                class="checkbox" checked="checked"/>&nbsp;&nbsp;我已阅读并同意 <a href="${fn:getConfValue('global.index.odweb')}/uc/register.html" target='_blank' 
                class="m-link" hideFocus="hidefocus">《浪潮IOP网络服务使用协议》</a> <label
                for="login_allow" class="error" generated="true"></label>
            </dd>
            <dd class="form-tip" style="width:120px;"></dd>
            <input id="passwordStrength_org" name="passwordStrength"
              type="text" class="input" style="display: none" />
          </dl>
        </div>
        <div class="form-submit">
          <dl>
            <dd style="text-align: center;">
              <input type="button" class="btn-reg" id="btn-submit_org">
            </dd>
          </dl>
        </div>
      </form>
    </div>
  </div>
  </div>
  <div class="tip-box-contain" style="border-left:1px solid #D9EEF8">
    <div class="title">
    <h1><strong>说明</strong></h1>
    </div>
    <div class="content">
      <ul>
        <%--<li style="padding-top: 0px;"><span>1. 注册的账号需要通过邮件激活之后才能使用，请正确填写您的邮箱。</span></li>--%>
        <li style="padding-top: 0px;"><span>1. 可以使用用户名、手机号、邮箱任意一个进行登录。</span></li>
        <li><span>2. 昵称是登录后显示的用户名，账号申请成功后可以修改昵称。 </span></li>
                <li><span>3. 以上信息对于保护您的账号安全极为重要，请您慎重填写并牢记。 </span></li>
      </ul>


    </div>
  </div>
</div>
<script type="text/javascript" src="${fn:getLink('js/uc/jquery.form.js')}"></script>
<script language="javascript" src="${fn:getLink('js/uc/jquery.validate.js')}"></script>
<script language="javascript" src="${fn:getLink('js/uc/jquery.validate.ext.js')}"></script>
<script language="javascript" src="${fn:getLink('js/uc/passwordStrength.js')}"></script>
<script language="javascript" src="${fn:getLink('js/uc/md5.js')}"></script>
<website:script src="js/uc/jquery.blockUI.js"/>
<website:script src="js/uc/dialog.js"/> 
<website:style href="css/uc/common/easydialog.css"/>

<script type="text/javascript">
  var checkLoginNameUrl = "${fn:getLink('uc/index/index.do?method=checkLoginName')}";
  var checkEmailUrl = "${fn:getLink('uc/index/index.do?method=checkEmail')}";
  var getVerifyCodeUrl = "${fn:getLink('uc/index/index.do?method=getVerifyCode')}";
  var activateEmailUrl = "${fn:getLink('uc/index/registerActivateEmail.jsp?flag=1')}";
  var dataUrl = "${fn:getConfValue('global.index.odweb')}";

  $("#send_btn").on("click",phoneClick);
  $("#verify_btn").on("click",phoneClick1);
  // $("#verify_btn").on("click",phoneClick('contact_phone'));
  // $("#send_btn").on("click",phoneClick('login_phone'));
  //获取手机验证码(个人)
  function phoneClick(){
      var phoneNum_input = document.getElementById("login_phone").value;
      if(phoneNum_input==null || phoneNum_input==""){
          dialog.error("请输入手机号码");
          return false;
      }
    $.ajax({
      type : "POST",
      url : "${fn:getLink('uc/index/SignUp.do?method=verifyPhone')}",
      data:{
        phoneNum:phoneNum_input
      },
      dataType: "JSON",
      success : function(str) {
              var value = $("#sendOK")[0].firstChild.nodeValue;
              $("#sendOK")[0].firstChild.nodeValue = "已发送到你的手机,请查收并输入";
              $("#sendOK").css("color","#f00");
              $("#vcode").on("change",function(){
                $("#sendOK")[0].firstChild.nodeValue = value;
              });
          phoneSettime();
          $("#send_btn").unbind("click",phoneClick);
      },
      error : function(data) {
          dialog.error("由于网络原因，获取验证码失败！");
      }
    });
  }
  var phoneTimedown=60;
  function phoneSettime(){
    if (phoneTimedown == 0) {
        $("#send_btn").attr("disabled", false);
        $("#send_btn").find("span")[0].firstChild.nodeValue = "获取短信验证码";
        $("#send_btn").bind("click", phoneClick);
        $("#sendOK")[0].firstChild.nodeValue = "请输入短信验证码";
        phoneTimedown = 60;
        //清除session
       /* $.ajax({
          type : "POST",
          url : "${fn:getLink('uc/index/SignUp.do?method=clearPhonenum')}",
          data:{},
          dataType: "JSON",
          success : function(str) {
          },
          error : function(data) {
          }
        });*/
    }
    else {
      $("#send_btn").find("span")[0].firstChild.nodeValue = phoneTimedown+"s后重新发送";
      phoneTimedown--; 
      setTimeout(function() { 
        phoneSettime();
      },1000); 
    } 
  }

 //获取手机验证码(单位)
  function phoneClick1(){
      var phoneNum_input = document.getElementById('contact_phone').value;
      if(phoneNum_input==null || phoneNum_input==""){
          dialog.error("请输入手机号码");
          return false;
      }
      $.ajax({
          type : "POST",
          url : "${fn:getLink('uc/index/SignUp.do?method=verifyPhone')}",
          data:{
              phoneNum:phoneNum_input
          },
          dataType: "JSON",
          success : function(str) {
              var value = $("#verifyOK")[0].firstChild.nodeValue;
              $("#verifyOK")[0].firstChild.nodeValue = "已发送到你的手机,请查收并输入";
              $("#verifyOK").css("color", "#f00");
              $("#vcode1").on("change",function(){
                  $("#verifyOK")[0].firstChild.nodeValue = value;
              });
              phoneSettime1();
              $("#verify_btn").unbind("click",phoneClick1);
          },
          error : function(data) {
              dialog.error("由于网络原因，获取验证码失败！");
          }
      });
  }
  var phoneTimedown1=60;
  function phoneSettime1(){
      if (phoneTimedown1 == 0) {
          $("#verify_btn").attr("disabled", false);
          $("#verify_btn").find("span")[0].firstChild.nodeValue = "获取短信验证码";
          $("#verify_btn").bind("click", phoneClick1);
          $("#verifyOK")[0].firstChild.nodeValue = "请输入短信验证码";
          phoneTimedown1 = 60;
      }
      else {
          $("#verify_btn").find("span")[0].firstChild.nodeValue = phoneTimedown1+"s后重新发送";
          phoneTimedown1--;
          setTimeout(function() {
              phoneSettime1();
          },1000);
      }
  }
</script>
<script language="javascript"
  src="${fn:getLink('js/uc/index/signupReal.js')}"></script>
