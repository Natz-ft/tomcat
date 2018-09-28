package com.inspur.data.portal.screen.uc.index;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.loushang.internet.view.ViewHandler;

import com.inspur.ucweb.utils.UCUtil;
import com.inspur.utils.UserUtils;

public class RegisterActivateEmail implements ViewHandler {
	
	/**
	 * 邮箱注册，进入邮件激活页面
	 */
	public void execute(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		
		// 从session中取得登录邮箱（登录时，如果账号未激活会放入）
		Object loginEmail = request.getSession().getAttribute("login_email_for_activate");
		
		// 检查没有登录手机的场景
		if(loginEmail == null){
			response.getWriter().write("该链接已失效，请重新登录！");
			response.flushBuffer();//flush后，不在执行对应jsp文件
			return;
		}
		String flag = "1";
		if(request.getParameter("flag") != null){
			flag = request.getParameter("flag");
		}
		request.setAttribute("flag",flag);
		
		// 对应立即去激活邮箱，获取邮箱网址后缀
		String email_url = UCUtil.getEmailUrl(loginEmail.toString());
		request.setAttribute("loginEmail", loginEmail);
		request.setAttribute("email_url", email_url);
		request.setAttribute("meta_title", "账号激活");
		request.setAttribute("title", "用户注册");
	}
	
	/**
	 * 点击重新发送注册激活邮件
	 */
	public void doReSendRegisterActivateEmail(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String loginEmail = request.getParameter("loginEmail");
		String uid = "0";
		if(request.getSession().getAttribute("uid") != null){
			uid = request.getSession().getAttribute("uid").toString();
		}
		// 重新发送激活邮件时是无法获取uid的，设置默认为0，后台通过查询数据库进行重新赋值
		boolean res = UserUtils.getUserDomain().sendRegistActiveEmail(Integer.parseInt(uid), loginEmail);
		if (res) {
			response.getWriter().write("1");
		} else {
			response.getWriter().write("0");
		}
	}

}
