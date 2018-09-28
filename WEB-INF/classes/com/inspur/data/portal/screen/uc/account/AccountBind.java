package com.inspur.data.portal.screen.uc.account;

import java.io.IOException;
import java.net.URLEncoder;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.loushang.internet.context.ContextHolder;
import org.loushang.internet.util.el.Function;
import org.loushang.internet.view.ViewHandler;

import com.inspur.uc.api.user.IUserOutBindDomain;
import com.inspur.ucweb.utils.UCUtil;
import com.inspur.ucweb.utils.UrlUtils;
import com.inspur.utils.AuditLogUtil;
import com.inspur.utils.UserUtils;

public class AccountBind implements ViewHandler {

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
			return;
		}
		int uid = Integer.parseInt(session.getAttribute("uid").toString());
		// 重置sessionid
		UCUtil.reGenerateSessionId(request);
		session = request.getSession();
		IUserOutBindDomain outDomain= UserUtils.getOutBindDomain();
		//IUserOutBindDomain outDomain= (IUserOutBindDomain) ServiceFactory.getService("uc.IUserOutBindDomain");
		List<Map> bindList = outDomain.getBindListByUid(uid);
		
		if(bindList != null){
			for(Map temp:bindList){
				if("qq".equals(temp.get("type"))){
					request.setAttribute("bindQQ", temp);
				}else if("sina".equals(temp.get("type"))){
					request.setAttribute("bindSina", temp);
				}
			}
		}
		String qqOauthUrl = URLEncoder.encode(Function.getLink("login/login.do?method=otherLogin&type=qq"), "utf-8");
		String sinaOauthUrl = URLEncoder.encode(Function.getLink("login/login.do?method=otherLogin&type=sina"), "utf-8");
		request.setAttribute("qqOauthUrl", qqOauthUrl);
		request.setAttribute("sinaOauthUrl", sinaOauthUrl);
		request.setAttribute("accountType", "accountBind");//accountBase--lever1 navigation
		
		//记录页面访问日志
		AuditLogUtil.addPageVisitAutiLog(request, "个人设置", "");
	}
}
