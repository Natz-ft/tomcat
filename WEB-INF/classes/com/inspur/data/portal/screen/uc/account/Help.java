package com.inspur.data.portal.screen.uc.account;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.loushang.internet.view.ViewHandler;

public class Help implements ViewHandler {

	public void execute(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		request.setAttribute("accountType", "accountBase");
		request.setAttribute("accountType_l2", "help");
	}
	
	
}
