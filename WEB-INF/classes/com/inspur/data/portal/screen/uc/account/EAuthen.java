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

import com.inspur.ucweb.utils.UCUtil;
import com.inspur.ucweb.utils.UrlUtils;
import com.inspur.utils.UserUtils;

public class EAuthen implements ViewHandler {

	public void execute(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		HttpSession session = request.getSession();
		if(session.getAttribute("uid") == null){
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
			int authenLevel = Integer.parseInt(userBasic.get("authen_level").toString());
			String user_type = String.valueOf(userBasic.get("user_type"));
			boolean is_organ = UserUtils.getUserDomain().isOrganByUserType(user_type);
			if(! is_organ){
				ContextHolder.sendRedirect(Function.getLink("account/perAuthen.jsp"));
				return;
			}
			if(authenLevel == 2){
				ContextHolder.sendRedirect(Function.getLink("account/iseAuthened.jsp"));
				return;
			}
			request.setAttribute("authenLevel", authenLevel);
			request.setAttribute("accountType", "authenSet");//accountBase--lever1 navigation
		}
	}
}
