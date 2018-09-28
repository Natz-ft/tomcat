package com.inspur.data.portal.screen.uc.wcms;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.loushang.internet.util.JsonUtils;
import org.loushang.internet.view.ViewHandler;

import com.google.code.yanf4j.core.Session;

public class UserInfo implements ViewHandler {

	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO 自动生成的方法存根
		HttpSession session = request.getSession();
		Map<String, Object> map = new HashMap<String, Object>();
		String str_null = "暂未填写";
		Map<String, Object> sessionMap = (Map<String, Object>) session.getAttribute("userInfo");
		String username = (String) sessionMap.get("nick_name");
		String login_phone = (String) sessionMap.get("login_phone");
		String login_email = (String) sessionMap.get("login_email");
		String userImag = (String)sessionMap.get("avatar");
		
		if(login_phone==null||login_phone==""){
			request.setAttribute("login_phone", "");
		}else{
			request.setAttribute("login_phone", login_phone);			
		}
		
		if(login_email==null||login_email==""){
			request.setAttribute("login_email", "");
		}else{			
			request.setAttribute("login_email", login_email);
		}
		request.setAttribute("username", username);
		request.setAttribute("userImag", userImag);
	}
	
	public void doGetsessionForWcms(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException{
		HttpSession session = request.getSession();
		if(session.getAttribute("userInfo")!=null){
			response.getWriter().write(JsonUtils.convertToString(true));
		}else{
			response.getWriter().write(JsonUtils.convertToString(false));
		}
	}

}
