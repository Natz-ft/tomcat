package com.inspur.data.portal.screen.uc.account;

import java.io.IOException;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.loushang.internet.context.ContextHolder;
import org.loushang.internet.util.el.Function;
import org.loushang.internet.view.ViewHandler;

import com.inspur.ucweb.utils.UrlUtils;
import com.inspur.utils.AuditLogUtil;
import com.inspur.utils.UserUtils;

public class BankInfo implements ViewHandler {

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
		boolean is_organ = UserUtils.getUserDomain().isOrganByUid(uid);
		if(! is_organ){
			ContextHolder.sendRedirect(Function.getLink("account/perInfo.jsp"));
			return;
		}
		Map orgInfo = UserUtils.getOrganDomain().getOrganByUid(uid);
		if(orgInfo != null){
			request.setAttribute("orgInfo", orgInfo);
		}
		request.setAttribute("accountType", "accountBase");//accountBase--lever1 navigation
		request.setAttribute("accountType_l2", "accountBase_bank");//accountBase_account--lever2 navigation
		
		//记录页面访问日志
		AuditLogUtil.addPageVisitAutiLog(request, "个人设置", "");
		}
	}
