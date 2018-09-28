package com.inspur.data.portal.screen.uc.password;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.loushang.internet.util.el.Function;
import org.loushang.internet.view.ViewHandler;

import com.inspur.utils.AuditLogUtil;
import com.inspur.utils.UserUtils;

public class ResetPwd implements ViewHandler {

	/**
	 * 进入重置密码页面
	 */
	public void execute(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
	
		//只有当session中存在resetpwd标记，并且该标记的值是1时，才能进入重置密码页面。
		if(!"1".equals(String.valueOf(request.getSession().getAttribute("resetpwd")))){
			response.sendRedirect(Function.getLink("password/getPwd.jsp"));
			return;
		}
		request.setAttribute("meta_title", "重置密码");
//		request.setAttribute("meta_pageType", "getpwd");
		
		//记录页面访问日志
		AuditLogUtil.addPageVisitAutiLog(request, "个人设置", "");
	}

	/**
	 * 执行重置密码
	 */
	public void doResetPwd(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
	
		//检查是否具备重置密码的条件
		HttpSession session = request.getSession();
		if(session.getAttribute("tempUid") == null || session.getAttribute("resetpwd") == null){
			response.getWriter().write("0");
			return;
		}
		int uid = Integer.parseInt(session.getAttribute("tempUid").toString());
		//密码
		String password = request.getParameter("password");
		//密码强度
		int password_strength = Integer.parseInt(request.getParameter("password_strength"));
		//重置密码
		boolean res = UserUtils.getUserDomain().resetPwd(uid, password, password_strength);
		if (res) {
			session.removeAttribute("tempUid");
			session.removeAttribute("resetpwd");
			response.getWriter().write("1");
		} else {
			response.getWriter().write("0");
		}
	}
}
