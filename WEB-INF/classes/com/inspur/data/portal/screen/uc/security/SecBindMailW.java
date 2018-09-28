package com.inspur.data.portal.screen.uc.security;

import java.io.IOException;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.loushang.internet.context.ContextHolder;
import org.loushang.internet.util.el.Function;
import org.loushang.internet.view.ViewHandler;
import com.inspur.ucweb.utils.UCUtil;
import com.inspur.ucweb.utils.UrlUtils;
import com.inspur.utils.AuditLogUtil;

public class SecBindMailW implements ViewHandler {

	public void execute(HttpServletRequest request, HttpServletResponse response)throws ServletException, IOException {
		
		HttpSession session = request.getSession();
		if(session.getAttribute("uid") == null){
			response.sendRedirect(Function.getLink("login/login.jsp"));
			return;
		}
		int uid = Integer.parseInt(session.getAttribute("uid").toString());
		Map userSecPass = UCUtil.getUserSecPass(uid);
		if(!UCUtil.isEmpty(userSecPass) && !UCUtil.isEmpty(userSecPass.get("security_email"))){
			String bindedMail = userSecPass.get("security_email").toString();
			
			//0，未绑定，1，邮箱验证，2，绑定成功
			int bindedMailStatus = Integer.parseInt(userSecPass.get("security_email_status").toString());
			if(bindedMailStatus == 1){
				response.sendRedirect(Function.getLink("uc/security/activateSecEmail.jsp"));
				return;
			}else if(bindedMailStatus == 2){
				session.setAttribute("bindedMail", bindedMail);
			}
			int at_index = bindedMail.lastIndexOf("@");
	    	if(at_index > 0){
	    		request.setAttribute("emailSuffix", bindedMail.substring(at_index));
	    	}
	    	request.setAttribute("bindedMail", bindedMail);
		}
		request.setAttribute("nav", "secBindMailW");
		request.setAttribute("accountType_l2", "secCenter");
		
		//记录页面访问日志
		AuditLogUtil.addPageVisitAutiLog(request, "个人设置", "");
	}
}
