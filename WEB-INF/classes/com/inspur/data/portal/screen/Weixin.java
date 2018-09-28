package com.inspur.data.portal.screen;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.inspur.data.common.web.ParamUtil;

public class Weixin {
	
	public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String method = ParamUtil.getString(request, "method");
		String fileId = ParamUtil.getString(request, "fileId");
		String fileType = ParamUtil.getString(request, "fileType");
		String app_id = ParamUtil.getString(request, "app_id");
		request.setAttribute("method", method);
		request.setAttribute("fileId", fileId);
		request.setAttribute("fileType", fileType);
		request.setAttribute("app_id", app_id);
	}

}
