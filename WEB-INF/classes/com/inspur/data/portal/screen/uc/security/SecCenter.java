package com.inspur.data.portal.screen.uc.security;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.loushang.internet.context.ContextHolder;
import org.loushang.internet.util.el.Function;
import org.loushang.internet.view.ViewHandler;

import com.inspur.ucweb.cache.CacheConst;
import com.inspur.ucweb.cache.CacheManager;
import com.inspur.ucweb.utils.ServiceConst;
import com.inspur.ucweb.utils.UCUtil;
import com.inspur.ucweb.utils.UrlUtils;
import com.inspur.utils.AuditLogUtil;

public class SecCenter implements ViewHandler {

	public void execute(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		HttpSession session = request.getSession();
		if(session.getAttribute("uid") == null 
				|| session.getAttribute("uid").toString().isEmpty() 
				|| Integer.parseInt(session.getAttribute("uid").toString())<=0){
			// 请求登录
			String currentUrl = Function.getCurrentUrl();
			Map paramMap = UrlUtils.getParamMap(request);
			String paramUrl = UrlUtils.getUrlString(paramMap, currentUrl);
			String relayState = "?RelayState="+paramUrl;
			String redirectUrl = Function.getLink("login/login.jsp") + relayState;
			ContextHolder.sendRedirect(redirectUrl);
		}
		int uid = Integer.parseInt(session.getAttribute("uid").toString());
		Map userBasic = UCUtil.getUserBasic(uid);
		Map userLoginInfo = UCUtil.getUserLoginInfo(uid);
		Map userSecPass = UCUtil.getUserSecPass(uid);
		int accountSec = this.getAccountSafeState(uid);
		request.setAttribute("userBasic", userBasic);
		request.setAttribute("userLoginInfo", userLoginInfo);
		request.setAttribute("userSecPass", userSecPass);
		request.setAttribute("accountSec", accountSec);
		request.setAttribute("nav", "secCenter");
		request.setAttribute("accountType_l2", "secCenter");
		
		//记录页面访问日志
		AuditLogUtil.addPageVisitAutiLog(request, "个人设置", "");
	}
	
	private Map getUserSecNotify(int uid){
		if(uid<=0){
			return null;
		}
//		Map userSecNotify = CacheManager.get(CacheConst.USER_SEC_NOTIFY_UID_+uid,HashMap.class);
//		if(userSecNotify == null){
//			userSecNotify = ServiceConst.UC_ISecurityNotifyDomain.getMapByUid(uid);
//		}
//		return userSecNotify;
		return null;
	}
	// 账号安全度
	private int getAccountSafeState(int uid) {
		if (uid <= 0) {
			return 1;
		}
		Map userSecPass = UCUtil.getUserSecPass(uid);
		Map userBasic = UCUtil.getUserBasic(uid);
		Map userSecNotify = this.getUserSecNotify(uid);
		int accountSec = 0;
		//手机绑定
		if (userSecPass != null
				&& userSecPass.get("security_phone_status") != null
				&& !userSecPass.get("security_phone_status").toString().isEmpty()
				&& Integer.parseInt(userSecPass.get("security_phone_status").toString()) == 2) {
			accountSec++;
		}
		//安全邮箱绑定
		if (userSecPass != null
				&& userSecPass.get("security_email_status") != null
				&& !userSecPass.get("security_email_status").toString().isEmpty()
				&& Integer.parseInt(userSecPass.get("security_email_status").toString()) == 2) {
			accountSec++;
		}
		//密码强度
		if (userBasic != null
				&& userBasic.get("password_strength") != null
				&& !userBasic.get("password_strength").toString().isEmpty()
				&& Integer.parseInt(userBasic.get("password_strength").toString()) > 2) {
			accountSec++;
		}
		//提醒设置
		if (userSecNotify != null
				&& userSecNotify.get("update_pwd") != null
				&& !userSecNotify.get("update_pwd").toString().isEmpty()
				&& (Integer.parseInt(userSecNotify.get("update_pwd").toString()) == 1 
					|| Integer.parseInt(userSecNotify.get("update_pwd").toString()) == 2)) {
			accountSec++;
		}
		//密保问题
		if (userSecPass != null && userSecPass.get("question") != null
				&& !userSecPass.get("question").toString().isEmpty()) {
			accountSec++;
		}
		//账号安全非0
		return accountSec > 0 ? accountSec : 1;
	}
	
}
