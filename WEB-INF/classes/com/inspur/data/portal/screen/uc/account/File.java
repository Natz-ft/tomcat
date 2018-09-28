package com.inspur.data.portal.screen.uc.account;

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

import com.inspur.ucweb.utils.ConfUtil;
import com.inspur.ucweb.utils.PageUtil;
import com.inspur.ucweb.utils.UrlUtils;
import com.inspur.utils.UserUtils;

public class File implements ViewHandler {

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
			return;
		}
		
		int uid = Integer.parseInt(session.getAttribute("uid").toString());
		request.setAttribute("uid", uid);
		
		Map fileParam = new HashMap();
		int showPage = PageUtil.getShowPage(request);
		int pageSize = PageUtil.getpageSize(request);
		fileParam.put("showPage", showPage);
		fileParam.put("pageSize", pageSize);
		fileParam.put("uid", uid);
		Map fileMap = UserUtils.getFileDomain().getFileByUidForPage(fileParam);
		
		if(fileMap != null && fileMap.get("data") != null){
			List dataList = (List) fileMap.get("data");
			request.setAttribute("index",showPage);
			request.setAttribute("pageSize",pageSize);
			request.setAttribute("count",fileMap.get("count"));
			request.setAttribute("fileList",dataList);
		}
		request.setAttribute("docUrl", ConfUtil.getValue("global.index.rcservice"));
		request.setAttribute("docUpUrl", ConfUtil.getValue("global.index.rcservice")+"/upload");
		boolean is_organ = UserUtils.getUserDomain().isOrganByUid(uid);
		request.setAttribute("is_organ", is_organ);
		request.setAttribute("accountType", "accountCert");//accountBase--lever1 navigation
	}
	
}
