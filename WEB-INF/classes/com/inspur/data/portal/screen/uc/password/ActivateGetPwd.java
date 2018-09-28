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

import com.inspur.ucweb.utils.ServiceConst;
import com.inspur.ucweb.utils.UCUtil;
import com.inspur.ucweb.utils.UcServiceUtil;
import com.inspur.utils.AuditLogUtil;
import com.inspur.utils.UserUtils;

public class ActivateGetPwd implements ViewHandler {
	
	private static Logger log = Logger.getLogger(ActivateGetPwd.class);
	
	/**
	 * 找回密码邮件待激活
	 */
	public void execute(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
	
		//权限校验
		HttpSession session = request.getSession();
		if(session.getAttribute("tempUid") == null){
			response.getWriter().write(Function.getLink("password/getPwd.jsp"));
			return;
		}
		int uid = Integer.parseInt(String.valueOf(session.getAttribute("tempUid")));
		Map user = UCUtil.getUserBasic(uid);
		Map user_security = UCUtil.getUserSecPass(uid);
		
		request.setAttribute("user_id", user.get("user_id"));
		request.setAttribute("secEmail", user_security.get("security_email"));
		request.setAttribute("email_url", UCUtil.getEmailUrl(user_security.get("security_email").toString()));
		request.setAttribute("flag", 1);
		request.setAttribute("meta_title", "找回密码");
//		request.setAttribute("meta_pageType", "getpwd");
//		request.setAttribute("meta_title", "找回密码");
		
		//记录页面访问日志
		AuditLogUtil.addPageVisitAutiLog(request, "个人设置", "");
	}

	/**
	 * 通过安全邮箱找回密码时,点击重新发送邮件
	 */
	public void doReSendActivateGetPwd(HttpServletRequest request, HttpServletResponse response)
	throws ServletException, IOException {
	
		//权限校验
		HttpSession session = request.getSession();
		if(session.getAttribute("tempUid") == null){
			response.getWriter().write(Function.getLink("password/getPwd.jsp"));
			return;
		}
		int uid = Integer.parseInt(String.valueOf(session.getAttribute("tempUid")));
		int res = UserUtils.getUserDomain().sendGetPwdEmail(uid);
		if(res == 1){
			response.getWriter().write("1");
		}else{
			response.getWriter().write("0");
		}
	}
	/**
	 * 通过邮箱进入找回密码页面
	 */
	public void doActivateGetPwd(HttpServletRequest request, HttpServletResponse response)
		throws ServletException, IOException {
	
		int validationid = Integer.parseInt(request.getParameter("validationid"));
		String validationcode = request.getParameter("validationcode");
		
		// 检验链接是否有效，
		/*
		 * uid：链接有效时返回uid ; 0：激活链接已失效； -1：无效的激活链接；
		*/
		int res = UserUtils.getUserDomain().doActivateGetPwd(validationid, validationcode);
		if (res > 0) {
			//验证通过，将验证通过的标记放入session，并跳转至重置密码页面。
			request.getSession().setAttribute("resetpwd", "1");
			request.getSession().setAttribute("tempUid", res);
			response.sendRedirect(Function.getLink("password/resetPwd.jsp"));
		} else {
			// 打开找回密码页面
			String go = "<html>"+
			"<head>"+
			"<meta charset='utf-8'/>"+
			"<script type='text/javascript'>"+
			"alert('链接已失效,请重新找回密码!');"+
			"window.location.href='"+Function.getLink("password/getPwd.jsp")+"'"+
			"</script>"+
			"</head>"+
			"</html>";
			response.getWriter().write(go);
		}
	}
}