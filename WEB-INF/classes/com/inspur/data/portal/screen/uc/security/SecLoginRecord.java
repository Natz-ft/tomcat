package com.inspur.data.portal.screen.uc.security;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.loushang.internet.context.ContextHolder;
import org.loushang.internet.util.el.Function;
import org.loushang.internet.view.ViewHandler;

import com.inspur.ucweb.utils.PageUtil;
import com.inspur.ucweb.utils.UrlUtils;
import com.inspur.utils.AuditLogUtil;
import com.inspur.utils.UserUtils;

public class SecLoginRecord implements ViewHandler {

	public void execute(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		HttpSession session = request.getSession();
		if(session.getAttribute("uid") == null 
				|| session.getAttribute("uid").toString().isEmpty() 
				|| Integer.parseInt(session.getAttribute("uid").toString())<=0){
			// 请求登录
			String currentUrl = Function.getCurrentUrl();
			Map paramMap = UrlUtils.getParamMap(request);
			String paramUrl = UrlUtils.getUrlString(paramMap, currentUrl);
			String relayState = "?RelayState="+paramUrl;
			String redirectUrl = Function.getLink("login/login.jsp") + relayState;
			ContextHolder.sendRedirect(redirectUrl);
		}
		int uid = Integer.parseInt(session.getAttribute("uid").toString());
		int showPage = PageUtil.getShowPage(request);
		int pageSize = PageUtil.getpageSize(request);
		Map param = new HashMap();
		param.put("showPage", showPage);
		param.put("pageSize", pageSize);
		param.put("uid", uid);
		Map res = UserUtils.getHistoryDomain().getLoginHistoryForPage(param);
//		{totalRows=65, count=65, data=[{login_id=65130, uid=5, login_address=归属地未知, login_time=1392083306, login_ip=0:0:0:0:0:0:0:1}, {login_id=65126, uid=5, login_address=归属地未知, login_time=1392043353, login_ip=0:0:0:0:0:0:0:1}, {login_id=65125, uid=5, login_address=归属地未知, login_time=1392043210, login_ip=0:0:0:0:0:0:0:1}, {login_id=65124, uid=5, login_address=归属地未知, login_time=1392043025, login_ip=0:0:0:0:0:0:0:1}, {login_id=65123, uid=5, login_address=归属地未知, login_time=1392042890, login_ip=0:0:0:0:0:0:0:1}, {login_id=65122, uid=5, login_address=归属地未知, login_time=1392041161, login_ip=0:0:0:0:0:0:0:1}, {login_id=65121, uid=5, login_address=归属地未知, login_time=1392041026, login_ip=0:0:0:0:0:0:0:1}, {login_id=65120, uid=5, login_address=归属地未知, login_time=1392039913, login_ip=0:0:0:0:0:0:0:1}, {login_id=65119, uid=5, login_address=归属地未知, login_time=1392039851, login_ip=0:0:0:0:0:0:0:1}, {login_id=65118, uid=5, login_address=归属地未知, login_time=1392039684, login_ip=0:0:0:0:0:0:0:1}], pageSize=10, nowPage=1, totalPages=7}
		if(res != null && res.get("data") != null){
			List dataList = (List) res.get("data");
			request.setAttribute("index",showPage);
			request.setAttribute("pageSize",pageSize);
			request.setAttribute("count",res.get("count"));
			request.setAttribute("historyList",dataList);
		}
		request.setAttribute("nav", "secCenter");
		request.setAttribute("accountType_l2", "secCenter");
		
		//记录页面访问日志
		AuditLogUtil.addPageVisitAutiLog(request, "个人设置", "");
	}
	
}
