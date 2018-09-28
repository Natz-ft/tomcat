package com.inspur.data.portal.widget.index;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.loushang.internet.view.ViewHandler;

import com.inspur.data.common.exception.DataBaseException;
import com.inspur.data.common.web.PaginationList;
import com.inspur.data.common.web.ParamUtil;
import com.inspur.portal.model.news.ResNews;
import com.inspur.utils.PortalUtils;

public class DataNews implements ViewHandler{
	
	public void execute(HttpServletRequest request, HttpServletResponse response) 
			throws ServletException, IOException {
		try {
			//获取地市编码
			String regionCode = null;
			regionCode = (String) request.getSession().getAttribute("area_code");
			int page = ParamUtil.getInteger(request, "page", 1);
			int pageSize = ParamUtil.getInteger(request, "pageSize", 10);
			PaginationList<ResNews> noticePage = PortalUtils.getResNewsService().queryNewsByPage(null, "3", regionCode, null, page, pageSize);
			List<ResNews> list=noticePage.getRecords();
			request.setAttribute("noticePage", list);
		} catch (DataBaseException e) {
			e.printStackTrace();
		}
	}
	
}
