package com.inspur.data.portal.screen.uc.security;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.loushang.internet.context.ContextHolder;
import org.loushang.internet.util.el.Function;
import org.loushang.internet.view.ViewHandler;

import com.inspur.ucweb.cache.CacheConst;
import com.inspur.ucweb.cache.CacheManager;
import com.inspur.ucweb.utils.ServiceConst;
import com.inspur.ucweb.utils.UCUtil;
import com.inspur.ucweb.utils.UrlUtils;
import com.inspur.utils.AuditLogUtil;

public class SecAsk implements ViewHandler {

	public void execute(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		HttpSession session = request.getSession();
		if(session.getAttribute("uid") == null ){
			ContextHolder.sendRedirect(Function.getLink("login/login.jsp"));
			return;
		}
		int uid = Integer.parseInt(session.getAttribute("uid").toString());
		// 重置sessionid
		UCUtil.reGenerateSessionId(request);
		session = request.getSession();
		Map userSecPass = UCUtil.getUserSecPass(uid);
		String oldQue = null;
		if(userSecPass != null 
				&& userSecPass.get("question") != null 
				&& !userSecPass.get("question").toString().isEmpty()){
			oldQue = userSecPass.get("question").toString();
		}
		request.setAttribute("oldQue", oldQue);
		request.setAttribute("nav", "secAsk");
		
		//记录页面访问日志
		AuditLogUtil.addPageVisitAutiLog(request, "个人设置", "");
	}
	

	
}
