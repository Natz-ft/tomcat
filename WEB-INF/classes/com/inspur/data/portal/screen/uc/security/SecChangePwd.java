package com.inspur.data.portal.screen.uc.security;

import java.io.IOException;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.loushang.internet.context.ContextHolder;
import org.loushang.internet.util.JsonUtils;
import org.loushang.internet.util.el.Function;
import org.loushang.internet.view.ViewHandler;

import com.inspur.ucweb.utils.UCUtil;
import com.inspur.ucweb.utils.UrlUtils;
import com.inspur.utils.AuditLogUtil;
import com.inspur.utils.UserUtils;

public class SecChangePwd implements ViewHandler {

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
		// 重置sessionid
		UCUtil.reGenerateSessionId(request);
		session = request.getSession();
		request.setAttribute("nav", "secChangePwd");
		request.setAttribute("accountType_l2", "secCenter");
		
		//记录页面访问日志
		AuditLogUtil.addPageVisitAutiLog(request, "个人设置", "");
	}
	
	public void doChangePwd(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		
		//	0-更新失败 1-更新成功 -1-原密码输入错误
		int result = 0;
		HttpSession session = request.getSession();
		if(session.getAttribute("uid") != null){
			int uid = Integer.parseInt(session.getAttribute("uid").toString());
			String newPassWord = request.getParameter("newPassWord");
			String oldPassWord = request.getParameter("oldPassWord");
			String newPassWordStrength = request.getParameter("newPassWordStrength");
			if(newPassWord!=null&&!"".equals(newPassWord)&&oldPassWord!=null&&!"".equals(oldPassWord)){
				result = UserUtils.getUserDomain().updatePassword(uid, newPassWord, oldPassWord, newPassWordStrength);
			}
		}
		response.getWriter().write(JsonUtils.convertToString(String.valueOf(result)));
	}
	
}
