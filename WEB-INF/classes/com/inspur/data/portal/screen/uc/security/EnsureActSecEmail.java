package com.inspur.data.portal.screen.uc.security;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.loushang.internet.util.el.Function;
import org.loushang.internet.view.ViewHandler;

import com.inspur.ucweb.utils.UCUtil;
import com.inspur.utils.AuditLogUtil;
import com.inspur.utils.UserUtils;

public class EnsureActSecEmail implements ViewHandler {

	public void execute(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		HttpSession session = request.getSession();
		if(session.getAttribute("uid") == null){
			response.sendRedirect(Function.getLink("login/login.jsp"));
		}
		int uid = Integer.parseInt(session.getAttribute("uid").toString());
		
		//	1：激活成功；
		//	0：激活链接已失效；
		//	-1：无效的激活链接；
		//	-2：服务端错误，稍后重试
		if(!UCUtil.isEmpty(request.getParameter("validationid")) 
				&& !UCUtil.isEmpty(request.getParameter("validationcode"))){
			
			int validationid = Integer.parseInt(request.getParameter("validationid"));
			String validationcode = request.getParameter("validationcode");
			int res = UserUtils.getSecurityPasswordDomain().doActivateSecEmail(uid,validationid,validationcode);
			if (res == 0 ||res == 1 ||res == - 1) {
				request.setAttribute("flag", res);
			}else{
				request.setAttribute("flag", -2);
			}
		}else{
			request.setAttribute("flag", -1);
		}
		request.setAttribute("nav", "bindedMail");
		request.setAttribute("accountType_l2", "secCenter");
		
		//记录页面访问日志
		AuditLogUtil.addPageVisitAutiLog(request, "个人设置", "");
	}
	
}
