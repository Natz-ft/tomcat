package com.inspur.data.portal.screen.news;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.loushang.internet.util.JsonUtils;
import org.loushang.internet.view.ViewHandler;

import com.inspur.data.common.exception.DataBaseException;
import com.inspur.data.common.exception.InvalidParametersException;
import com.inspur.data.common.web.PaginationList;
import com.inspur.data.common.web.ParamUtil;
import com.inspur.portal.model.news.NewsColumn;
import com.inspur.portal.model.news.NewsMedia;
import com.inspur.portal.model.news.ResNews;
import com.inspur.utils.AuditLogUtil;
import com.inspur.utils.PortalUtils;

public class NewsList implements ViewHandler {

	public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		int column_id = ParamUtil.getInteger(request, "column_id", 1);
		request.setAttribute("column_id", column_id);
		try {
			PaginationList<ResNews> SideNews = PortalUtils.getResNewsService().queryNewsByPage(null, "3", "2", 1, 5);
			if (SideNews.getTotalRecord() > 0) {
				int id = SideNews.getRecords().get(0).getRes_id();
				try {
					List<NewsMedia> listBig = PortalUtils.getNewsMediaService().queryNewsMediaList(id, 5, "240*110", 0,
							null, 1);
					if (listBig != null) {
						if (listBig.size() > 0) {
							SideNews.getRecords().get(0).setLogo(listBig.get(0).getFile_addr());
						}
					}
				} catch (InvalidParametersException e) {
					e.printStackTrace();
				}
				request.setAttribute("SideNewsBig", SideNews.getRecords().get(0));
			}
			List<ResNews> SideNewsSmall = new ArrayList<ResNews>();
			for (int i = 1; i < SideNews.getRecords().size(); i++) {
				try {
					List<NewsMedia> listSmall = PortalUtils.getNewsMediaService()
							.queryNewsMediaList(SideNews.getRecords().get(i).getRes_id(), 5, "43*41", 0, null, 1);
					if (listSmall != null) {
						if (listSmall.size() > 0) {
							SideNews.getRecords().get(i).setLogo(listSmall.get(0).getFile_addr());
						}
					}
				} catch (InvalidParametersException e) {
					e.printStackTrace();
				}
				SideNewsSmall.add(SideNews.getRecords().get(i));
			}
			request.setAttribute("SideNewsSmall", SideNewsSmall);
			try {
				// 获取相应站点下的栏目
				String site_code = (String) request.getSession().getAttribute("area_code");
				PaginationList<NewsColumn> newsColumn = PortalUtils.getNewsColumnService()
						.queryNewsColumnByPage(site_code, "0", null, 1, 1, 12);
				request.setAttribute("NewsColumn", newsColumn.getRecords());
			} catch (InvalidParametersException e) {
				e.printStackTrace();
			}
		} catch (DataBaseException e) {
			e.printStackTrace();
		} finally {
			//记录页面访问日志
			AuditLogUtil.addPageVisitAutiLog(request, "数据资讯", "");
		}
	}

	public void doQueryNewsList(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		try {
			// 获取地市编码
			String regionCode = null;
			regionCode = (String) request.getSession().getAttribute("area_code");
			int page = ParamUtil.getInteger(request, "page", 1);
			int pageSize = ParamUtil.getInteger(request, "pageSize", 10);
			String column_id = ParamUtil.getString(request, "column_id", "1");
			PaginationList<ResNews> noticePage = PortalUtils.getResNewsService().queryNewsByPage(null, "3", regionCode, column_id,
					page, pageSize);
			response.getWriter().write(JsonUtils.convertToString(noticePage));
		} catch (DataBaseException e) {
			e.printStackTrace();
		}
	}

}
