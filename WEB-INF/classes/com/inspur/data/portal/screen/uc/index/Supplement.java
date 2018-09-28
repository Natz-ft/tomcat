package com.inspur.data.portal.screen.uc.index;

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

import com.inspur.ucweb.utils.UCUtil;
import com.inspur.ucweb.utils.UrlUtils;
import com.inspur.utils.UserUtils;

public class Supplement implements ViewHandler {
	
	public void execute(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		
		HttpSession session = request.getSession();
		if(session.getAttribute("uid") == null 
				|| session.getAttribute("uid").toString().isEmpty() 
				|| Integer.parseInt(session.getAttribute("uid").toString())<=0 
				|| session.getAttribute("needSupplement") == null){
			// 请求登录
			String currentUrl = Function.getCurrentUrl();
			Map paramMap = UrlUtils.getParamMap(request);
			String paramUrl = UrlUtils.getUrlString(paramMap, currentUrl);
			String relayState = "?RelayState="+paramUrl;
			String redirectUrl = Function.getLink("login/login.jsp") + relayState;
			ContextHolder.sendRedirect(redirectUrl);
			return;
		}
		
		int uid = Integer.parseInt(session.getAttribute("uid").toString());
		
		Map userBasic = UCUtil.getUserBasic(uid);
		if(userBasic != null){
			request.setAttribute("user_basic", userBasic);
			request.setAttribute("meta_title", "资料完善");
			request.setAttribute("title", "资料完善");
		}
	}
	
	public void doPerfectUserInfo(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		HttpSession session = request.getSession();
		int uid = Integer.parseInt(session.getAttribute("uid").toString());
		Map param = new HashMap();
		param.put("uid", uid);
		param.put("user_id", request.getParameter("user_id"));
		param.put("login_email",  request.getParameter("login_email"));
		
		boolean res = UserUtils.getUserDomain().update(param);
		if(res){
			session.removeAttribute("needSupplement");
		}
		String result = res?"1":"0";
		response.getWriter().write(result);
	}
}
