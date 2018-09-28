package com.inspur.data.portal.screen.uc.password;

import java.io.IOException;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.loushang.internet.util.el.Function;
import org.loushang.internet.view.ViewHandler;

import com.inspur.ucweb.utils.UCUtil;
import com.inspur.utils.AuditLogUtil;

public class ChooseSecPwd implements ViewHandler {
	
	private static Logger log = Logger.getLogger(ChooseSecPwd.class);
	
	/**
	 * 选择密码找回方式（手机、邮箱、密保）
	 */
	public void execute(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
	
		//权限校验
		HttpSession session = request.getSession();
		if(session.getAttribute("tempUid") == null){
			response.getWriter().write(Function.getLink("password/getPwd.jsp"));
			return;
		}
		//设置默认值
		String hasSecMail = "0";
		String hasSecPhone = "0";
		String hasSecAsk = "0";
	
		//检查是否设置 了安全邮箱、安全手机、密保问题
		int uid = Integer.parseInt(String.valueOf(session.getAttribute("tempUid")));
		Map bind = UCUtil.getUserSecPass(uid);
		Map user = UCUtil.getUserBasic(uid);
		if(bind != null){
			//// 检查是否 可通过绑定邮箱获找回密码
			Object security_email = bind.get("security_email");
			Object security_email_status = bind.get("security_email_status");
			if(security_email != null && "2".equals(String.valueOf(security_email_status))){
				hasSecMail = "1";
				request.setAttribute("security_email", security_email);
				request.setAttribute("email_url", UCUtil.getEmailUrl(String.valueOf(security_email)));
			}
			// 检查是否 可通过绑定手机获找回密码
			Object security_phone = bind.get("security_phone");
			Object security_phone_status = bind.get("security_phone_status");
			if (security_phone != null && "2".equals(String.valueOf(security_phone_status))){
				hasSecPhone = "1";
				request.setAttribute("security_phone", security_phone);
			}
			//检查是否 可通过密保问题获找回密码
			Object security_question = bind.get("question");
			Object security_answer = bind.get("answer");
			if (!UCUtil.isEmpty(security_question) && !UCUtil.isEmpty(security_answer)) {
				hasSecAsk = "1";
				request.setAttribute("security_question", security_question);
			}
		}
		request.setAttribute("hasSecMail", hasSecMail);
		request.setAttribute("hasSecPhone", hasSecPhone);
		request.setAttribute("hasSecAsk", hasSecAsk);
		
		request.setAttribute("user_id", user.get("user_id"));
		
		request.setAttribute("meta_title", "选择找回密码方式");
//		request.setAttribute("meta_pageType", "getpwd");
//		request.setAttribute("hasSecMail", hasSecMail);
//		request.setAttribute("hasSecMail", hasSecMail);
		
		//记录页面访问日志
		AuditLogUtil.addPageVisitAutiLog(request, "个人设置", "");
	}

}