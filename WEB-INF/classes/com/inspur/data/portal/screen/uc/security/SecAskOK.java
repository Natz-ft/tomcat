package com.inspur.data.portal.screen.uc.security;

import java.io.IOException;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.loushang.internet.context.ContextHolder;
import org.loushang.internet.util.el.Function;
import org.loushang.internet.view.ViewHandler;
import com.inspur.ucweb.utils.UCUtil;
import com.inspur.ucweb.utils.UrlUtils;
import com.inspur.utils.AuditLogUtil;

public class SecAskOK implements ViewHandler {

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
		// 重置sessionid
		UCUtil.reGenerateSessionId(request);
		session = request.getSession();
		Map userSecPass = UCUtil.getUserSecPass(uid);
		String result = "";
		if(userSecPass != null 
				&& userSecPass.get("question") != null 
				&& !userSecPass.get("question").toString().isEmpty()){
			result = userSecPass.get("question").toString();
		}
		request.setAttribute("result", result);
		request.setAttribute("nav", "secAsk");
		request.setAttribute("accountType_l2", "secCenter");
		
		//记录页面访问日志
		AuditLogUtil.addPageVisitAutiLog(request, "个人设置", "");
	}
	

	
}
