package com.inspur.data.portal.layout.uc.account;

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



public class Default implements ViewHandler {
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
		}else{
			request.setAttribute("title", "账号管理-用户中心");
			int uid = Integer.parseInt(session.getAttribute("uid").toString());
			Map userInfo = UCUtil.getUserBasic(uid);
			if(userInfo.get("nick_name") != null){
				String nickName = userInfo.get("nick_name").toString();
				request.setAttribute("nickName", nickName);
			}
			//header 与  usertype相关 userTypePre=1---per userTypePre=2 --- org
			String user_type = String.valueOf(userInfo.get("user_type"));
			boolean is_organ = UserUtils.getUserDomain().isOrganByUserType(user_type);
			request.setAttribute("is_organ", is_organ);
			boolean is_person = UserUtils.getUserDomain().isPersonByUserType(user_type);
			request.setAttribute("is_person", is_person);
			
			if(request.getParameter("_PATH_") != null && !request.getParameter("_PATH_").toString().isEmpty()){
				request.setAttribute("district", request.getParameter("_PATH_"));
			}
		}
		
	}

}
