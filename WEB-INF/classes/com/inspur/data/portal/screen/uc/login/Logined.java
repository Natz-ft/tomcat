package com.inspur.data.portal.screen.uc.login;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.loushang.internet.util.el.Function;
import org.loushang.internet.view.ViewHandler;


public class Logined implements ViewHandler {
	private static Logger log = Logger.getLogger(Logined.class);
	/**
	 * 警务云登录后，进入的页面（win8风格页面，对应php版本的pcphome）
	 */
	public void execute(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		HttpSession session = request.getSession();
		if(session.getAttribute("uid") == null){
			response.sendRedirect(Function.getLink("login/login.jsp"));
			return;
		}
		
	}
	
}
