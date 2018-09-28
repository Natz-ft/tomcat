package com.inspur.data.portal.screen.news;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.loushang.internet.view.ViewHandler;

import com.inspur.data.common.exception.DataBaseException;
import com.inspur.data.common.web.PaginationList;
import com.inspur.data.common.web.ParamUtil;
import com.inspur.portal.model.news.ResNews;
import com.inspur.utils.AuditLogUtil;
import com.inspur.utils.PortalUtils;
public class NewsDetail implements ViewHandler {

	public void execute(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		int news_id = ParamUtil.getInteger(request, "news_id", 0);
		ResNews resNews = new ResNews();
		try {
			resNews = PortalUtils.getResNewsService().getResNewsById(news_id);
		} catch (DataBaseException e1) {
			e1.printStackTrace();
		}
		
		Map<String, Object> newsMap = new HashMap<String, Object>();
		newsMap = ModelToMap(resNews);
		request.setAttribute("newsMap", newsMap);
		request.setAttribute("resNews", resNews);

		// 获取上一篇
		ResNews newsMapLast = null;
		try {
			newsMapLast = PortalUtils.getResNewsService().getPreviousNewsById(news_id);
			if (newsMapLast != null) {
				request.setAttribute("newsMapLast", newsMapLast);
			}
		} catch (NumberFormatException e3) {
			e3.printStackTrace();
		} catch (DataBaseException e3) {
			e3.printStackTrace();
		}

		// 获取下一篇
		ResNews newsMapNext = null;
		try {
			newsMapNext = PortalUtils.getResNewsService().getNextNewsById(news_id);
			if (newsMapNext != null) {
				request.setAttribute("newsMapNext", newsMapNext);
			}
		} catch (NumberFormatException e2) {
			e2.printStackTrace();
		} catch (DataBaseException e2) {
			e2.printStackTrace();
		}

		// 获取推荐阅读
		try {
			PaginationList<ResNews> newsPage = PortalUtils.getResNewsService().queryNewsByPage(null, "3", "2", 1, 5);
			if (newsPage != null) {
				List<ResNews> newsList = newsPage.getRecords();
				request.setAttribute("newsList", newsList);
			}
		} catch (NumberFormatException e) {
			e.printStackTrace();
		} catch (DataBaseException e) {
			e.printStackTrace();
		} finally {
			//记录页面访问日志
			AuditLogUtil.addPageVisitAutiLog(request, "数据资讯", "");
		}
	}

	public Map<String, Object> ModelToMap(ResNews resNews) {
		Map<String, Object> newsMap = new HashMap<String, Object>();
		if(resNews!=null){
			newsMap.put("news_id", resNews.getRes_id());
			newsMap.put("admin_id", resNews.getUid());
			newsMap.put("directory_id", resNews.getDirectory_id());
			newsMap.put("provider", resNews.getProvider());
			newsMap.put("title", resNews.getTitle());
			newsMap.put("sub_title", resNews.getSub_title());
			newsMap.put("title_style", resNews.getTitle_style());
			newsMap.put("url", resNews.getUrl());
			newsMap.put("logo", resNews.getLogo());
			newsMap.put("publish_time", resNews.getPublish_time());
			newsMap.put("create_time", resNews.getCreate_time());
			newsMap.put("validate_begin", resNews.getValidate_begin());
			newsMap.put("validate_end", resNews.getValidate_end());
			newsMap.put("res_type", resNews.getRes_type());
			newsMap.put("status", resNews.getStatus());
			newsMap.put("content", resNews.getContent());
			newsMap.put("keywords", resNews.getKeywords());
			newsMap.put("abstracts", resNews.getAbstracts());
			newsMap.put("access_path", resNews.getAccess_path());
			newsMap.put("issue_time", resNews.getIssue_time());
			newsMap.put("last_modify_time", resNews.getLast_modify_time());
			newsMap.put("accept_type", resNews.getAccept_type());
			newsMap.put("weight", resNews.getWeight());
			newsMap.put("user_type", resNews.getUser_type());
			newsMap.put("interaction_type", resNews.getInteraction_type());
			newsMap.put("remark", resNews.getRemark());
		}
		return newsMap;
	}

}
