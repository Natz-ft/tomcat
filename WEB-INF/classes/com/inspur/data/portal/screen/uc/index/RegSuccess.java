package com.inspur.data.portal.screen.uc.index;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.loushang.internet.view.ViewHandler;

public class RegSuccess implements ViewHandler {

	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO 自动生成的方法存根
		String account = request.getParameter("account");
		String login_phone = request.getParameter("login_phone");
		String login_email = request.getParameter("login_email");
		
		request.setAttribute("account", account);
		request.setAttribute("login_phone", login_phone);
		request.setAttribute("login_email",login_email);

	}

}
