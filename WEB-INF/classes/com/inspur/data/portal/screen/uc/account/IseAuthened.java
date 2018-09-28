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
import com.inspur.utils.UserUtils;

public class IseAuthened implements ViewHandler {

	public void execute(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		HttpSession session = request.getSession();
		if(session.getAttribute("uid") == null){
			ContextHolder.sendRedirect(Function.getLink("login/login.jsp"));
			return;
		}
		int uid = Integer.parseInt(session.getAttribute("uid").toString());
		Map userBasic = UCUtil.getUserBasic(uid);
		if(userBasic != null){
			int authenLevel = Integer.parseInt(userBasic.get("authen_level").toString());
			String user_type = String.valueOf(userBasic.get("user_type"));
			boolean is_organ = UserUtils.getUserDomain().isOrganByUserType(user_type);
			if(!is_organ){
				ContextHolder.sendRedirect(Function.getLink("account/perAuthen.jsp"));
				return;
			}
			//2表示实名制用户
			if(authenLevel != 2){
				ContextHolder.sendRedirect(Function.getLink("account/eAuthen.jsp"));
				return;
			}
			request.setAttribute("is_organ", is_organ);
			request.setAttribute("accountType", "authenSet");//accountBase--lever1 navigation
		}
	}
}
