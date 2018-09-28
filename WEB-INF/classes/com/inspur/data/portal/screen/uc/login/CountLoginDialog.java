package com.inspur.data.portal.screen.uc.login;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.loushang.internet.view.ViewHandler;

import com.inspur.ucweb.utils.ConfUtil;
import com.inspur.ucweb.utils.UCUtil;

public class CountLoginDialog implements ViewHandler {
	private static Logger log = Logger.getLogger(CountLoginDialog.class);
	
	/**
	 * 登陆框
	 */
	public void execute(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		
		String global_go_url = request.getParameter("global_go_url");
		request.setAttribute("global_go_url", global_go_url);
	 	
	 	//查询登录失败次数
		int login_fail_time = 0;
		if(request.getSession().getAttribute("login_fail_time") != null){
			login_fail_time = Integer.parseInt(String.valueOf(request.getSession().getAttribute("login_fail_time")));
		}
		request.setAttribute("login_fail_time", login_fail_time);
		
		String global_index_uc = ConfUtil.getValue("global.index.ucweb");
		request.setAttribute("global_index_uc", global_index_uc);
		
		String is_enable_login_salt = ConfUtil.getValue("is_enable_login_salt");
		if("1".equals(is_enable_login_salt)){
			//生成随机码，防止登录重放攻击
			String login_salt = UCUtil.getRandom(6); 
			request.getSession().setAttribute("login_salt", login_salt);
			request.setAttribute("login_salt", login_salt);
		}
	 }
	}
	