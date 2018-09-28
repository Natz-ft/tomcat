package com.inspur.data.portal.screen.developer.interact;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.loushang.internet.view.ViewHandler;

import com.inspur.utils.AuditLogUtil;

public class MyApplyedData implements ViewHandler {

	@Override
	public void execute(HttpServletRequest httpservletrequest, HttpServletResponse httpservletresponse)
			throws ServletException, IOException {
		//记录页面访问日志
		AuditLogUtil.addPageVisitAutiLog(httpservletrequest, "个人中心", "");
	}

}
