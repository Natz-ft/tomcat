package com.inspur.data.portal.screen.uc.index;


import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.loushang.internet.view.ViewHandler;

import com.inspur.ucweb.utils.ConfUtil;

public class Help implements ViewHandler {
	private static Logger log = Logger.getLogger(Help.class);
	
	/**
	 * 帮助页面（pcp使用）
	 */
	public void execute(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		HttpSession session = request.getSession();
		if(session.getAttribute("uid") == null){
			response.sendRedirect(ConfUtil.getValue("global.index.ucweb")+ConfUtil.getValue("unauthorized_page"));
			return;
		}
	}
}
