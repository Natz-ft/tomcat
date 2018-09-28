package com.inspur.data.portal.screen.about;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.loushang.internet.view.ViewHandler;

import com.inspur.data.common.web.ParamUtil;
import com.inspur.utils.AuditLogUtil;

public class Index implements ViewHandler {

	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		String tab = ParamUtil.getString(request, "tab","1");
		request.setAttribute("tab", tab);
		request.setAttribute("footerStr", ParamUtil.getString(request, "footerStr",""));
		try {
			//记录页面访问日志
			AuditLogUtil.addPageVisitAutiLog(request, "网站介绍", "");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
