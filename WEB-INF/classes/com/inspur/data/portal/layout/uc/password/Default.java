package com.inspur.data.portal.layout.uc.password;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.loushang.internet.util.el.Function;
import org.loushang.internet.view.ViewHandler;

import com.inspur.data.common.exception.DataBaseException;
import com.inspur.data.common.exception.InvalidParametersException;
import com.inspur.portal.model.base.SystemConfig;
import com.inspur.utils.UserUtils;




public class Default implements ViewHandler {
	public void execute(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		try {
			SystemConfig dmp_name = UserUtils.getSystemConfigService().getSystemConfig("uc_logo_url");
			request.setAttribute("dmp_name", dmp_name);
		} catch (DataBaseException e) {
			e.printStackTrace();
		} catch (InvalidParametersException e) {
			e.printStackTrace();
		}
		// read config to get URL 
			request.setAttribute("title", "找回密码");
			request.setAttribute("helpUrl", "###");
			request.setAttribute("questionUrl", "###");
			request.setAttribute("opinionUrl", "###");
			request.setAttribute("indexUrl", Function.getLink("home/home.jsp"));
			request.setAttribute("loginUrl", Function.getLink("login/login.jsp"));
	}

}
