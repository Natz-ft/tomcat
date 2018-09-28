<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8" buffer="none" %>
<%@page import="com.inspur.ucweb.utils.ConfUtil"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib uri="/tags/uc-function" prefix="ucfn"%>
<website:style href="css/uc/tipbox.css"/>
<website:style href="css/uc/style.css" rel="stylesheet"/>
<website:style href="css/uc/loginnew.css" rel="stylesheet"/>
<website:script src="js/uc/jquery.js" />
<%-- <website:script src="js/login.js"/> --%>
<style>
	.u-label{
		top:5px;
	}
	.u-label input{
		height:31px;
		outline:none
	}
	.logselect{
		height:31px;
		margin-top:2px;
	}
	.main .lgContainer .lgMain .maincontain .userInfo{
		margin-top:26px;
	}
	.main .lgContainer .lgMain .maincontain .password_textInfo{
		margin-top:82px;
	}
	.main .lgContainer .lgMain .titleselect{
    font-family: "Microsoft YaHei";
    font-weight: bold;
    font-size: 14px;
    width: 350px;
    height: 46px;
    color: #ffffff;
    text-align: center;
    line-height: 46px;
    background-color: #00C0D3;
    cursor:pointer;
}
</style>
<script>
    function changeImg(objImg)
    {
        var most = 550;        //设置最大宽度
        if(objImg.width > most)
        {
            var scaling = 1-(objImg.width-most)/objImg.width;
            //计算缩小比例
            objImg.width = objImg.width*scaling;
            objImg.height = objImg.height;            //img元素没有设置高度时将自动等比例缩小
            //objImg.height = objImg.height*scaling;    //img元素设置高度时需进行等比例缩小
        }
    }
</script>
    <div class="header">
        <div class="headerContainer">
            <img src="${login_logoInfo }" class="logoInfo">
        </div>
    </div>
    <div class="main">
        <div class="content">
        <div class="content-bg">
        <div class="lgContainer" style="position: relative">
            <div class="lgMain">
                <div class="titleTab titleselect">用户登录</div>
               <!--  <div class="titleTab titleunselect">证书登录</div> -->
                <form onsubmit="return false;" action="${fn:getLink('uc/login/login.do?method=login')}" method="post" id="login_form" name="login_form">
                <input id="verify_code" name="verify_code" type="hidden" value="">
                <input id="hid_remember_me" name="hid_remember_me" type="hidden" value="0"> 
				<input id="hid_remember_login_state" name="hid_remember_login_state" type="hidden" value="0">
                <div class="maincontain">
                    <div class="userInfo">
                        <div class="u-logo"></div>
                        <div class="u-label">
                            <input type="text" id="account" name="account" class="inputText"  placeholder="手机号/邮箱/用户名">
                        </div>
                    </div>
                    <div class="password_textInfo">
                        <div class="p-logo"></div>
                        <div class="u-label">
                            <input type="password" id="password" name="password" class="inputText" autocomplete="off" placeholder="请填写登录密码">
                            <input id="pwd" name="pwd" type="hidden" value="">
                            <input id="is_internal_web" name="is_internal_web" type="hidden" value="manage">
                        </div>
                    </div>
                    <div class="verify_code_div" id="verify_code_div">
                        <div class="u-label">
                            <input type="text" class="inputTextshort" id="verify" name="verify" placeholder="验证码">
                        </div>
                        <div class="code" onclick="javascript:changeVerify();" hideFocus="hidefocus">
                        </div>
	                    <img id="verifyImg" class="code" src="" alt="换一张" onclick="javascript:changeVerify();" hideFocus="hidefocus"/>
                    </div>
                    <div class="other_textInfo" id="other_textInfo">
                        <label style="display: none"><input type="checkbox" id='remember_me'>自动登录</label>
                    </div>
                    <div class="sub_btn" id="sub_btn" onclick="okSubmit()">
                        <span class="btn_text">登录</span>
                    </div>
                </div>
                </form>
               <!--  <div class="maincontaintwo">
                    <div class="identify">
                            <select class="logselect">
                                <option>请选择CA证书</option>
                            </select>
                    </div>
                    <div class="sub_btntwo" style="margin-top: 130px">
                        <span class="btn_texttwo">CA/RA &nbsp;&nbsp;登录</span>
                    </div>
                    <div class="other_textInfotwo">
                        <label class="wordstwo">如果您还没有数字证书，请先<a class="alink" href="#">申请证书</a></label>
                    </div>
                </div> -->
            </div>
        </div>
        </div>
        </div>
    </div>
    <div class="footer">
        <span class="wordInfo">浪潮集团有限公司</span><span class="wordInfo" style="margin-left: 10px">宁ICP备00000000号</span>
    </div>

<website:script src="js/uc/md5.js" />
<website:script src="js/uc/jquery.form.js" />
<website:script src="js/uc/jquery.tipbox.js" />
<website:script src="js/uc/jquery-dom-ext.js" />
<script type="text/javascript">
	var verifyUrl = "${fn:getLink('uc/index/verify.jsp')}";
	var afterssoUrl = "${fn:getLink('uc/index/index.do?method=aftersso')}";
	var defaultRelayState = "<%=ConfUtil.getValue("default_relay_state")%>";
	var supplementUrl = "${fn:getLink('uc/index/supplement.jsp')}";
	var activateEmailUrl = "${fn:getLink('uc/index/registerActivateEmail.jsp')}";
	var signupUrl = "${ucfn:getProp('login.properties','global.sso.regUrl')}";
	var account = "${account}";
	var login_fail_time = ${login_fail_time};
	var login_salt = "${login_salt}";
</script>
<script>
/*
 * jQuery placeholder, fix for IE6,7,8,9
 * @author YL
 * @since 20161014
 * @desc IE9不支持placeholder属性
 */
var JPlaceHolder = {
    //检测
    _check : function(){
        return 'placeholder' in document.createElement('input');
    },
    //初始化
    init : function(){
        if(!this._check()){
            this.fix();
        }
    },
    //修复
    fix : function(){
        jQuery(':input[placeholder]').each(function(index, element) {
            var self = $(this), txt = self.attr('placeholder');
            self.wrap($('<div></div>').css({position:'relative', zoom:'1', border:'none', background:'none', padding:'none', margin:'none'}));
            var pos = self.position(), h = self.outerHeight(true), paddingleft = self.css('padding-left');
            var holder = $('<span></span>').text(txt).css({position:'absolute', left:pos.left, top:pos.top, height:h+'px', lineHeight:h+'px', paddingLeft:paddingleft, color:'#aaa',width:'120px'}).appendTo(self.parent());
            self.focusin(function(e) {
                holder.hide();
            }).focusout(function(e) {
                if(!self.val()){
                    holder.show();
                }
            });
            holder.click(function(e) {
                holder.hide();
                self.focus();
            });
        });
    }
};
//执行
jQuery(function(){
    JPlaceHolder.init();    
});
</script>
 
<script type="text/javascript" src="${fn:getLink('/js/uc/index/login.js')}"></script> 