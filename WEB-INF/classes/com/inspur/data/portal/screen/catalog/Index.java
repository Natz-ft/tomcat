package com.inspur.data.portal.screen.catalog;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.loushang.internet.view.ViewHandler;

import com.inspur.data.common.web.ParamUtil;
import com.inspur.utils.AuditLogUtil;
import com.inspur.utils.DataUtils;

public class Index implements ViewHandler {

	public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try {
			//获取传递主题分类ID
			String subjectId = ParamUtil.getString(request, "subjectId", "");
			String tag = ParamUtil.getString(request, "tag", "");
			String org_code = ParamUtil.getString(request, "org_code", "");
			request.setAttribute("org_code",org_code);
			request.setAttribute("subjectId", subjectId);
			//request.setAttribute("org_code", org_code);
			//获取目录类型
			String cataType = ParamUtil.getString(request, "cata_type", "");
			request.setAttribute("cata_type", cataType);
			//获取目录排序
			String cataOrder = ParamUtil.getString(request, "order", "");
			request.setAttribute("order", cataOrder);
			request.setAttribute("keyWords", tag);
			
			String regionCode = (String) request.getSession().getAttribute("area_code");
			List<Map<String, Object>> tagInfos = DataUtils.getTagInfoService().getHotLabelList(regionCode, 25);
			// 热门标签（基础标签）
			request.setAttribute("tagInfos", tagInfos);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			//记录页面访问日志
			AuditLogUtil.addPageVisitAutiLog(request, "数据目录", "");
		}
	}
}
