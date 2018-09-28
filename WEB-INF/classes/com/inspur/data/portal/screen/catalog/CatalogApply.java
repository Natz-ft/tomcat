package com.inspur.data.portal.screen.catalog;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.loushang.internet.view.ViewHandler;

import com.inspur.data.common.web.ParamUtil;
import com.inspur.data.catalog.domain.catalog.Catalog;
import com.inspur.utils.AuditLogUtil;
import com.inspur.utils.DataUtils;

/**
 * 目录申请渲染类*/
public class CatalogApply implements ViewHandler {
    private static Log log = LogFactory.getLog(CatalogApply.class);
	public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try {
			String cata_id = ParamUtil.getString(request, "cata_id", "");
			if (cata_id != null && !"".equals(cata_id.trim())) {
				// 返回cata_id
				request.setAttribute("cata_id", cata_id);
				Catalog catalog = DataUtils.getCatalogServiceNew().getCatalogById(cata_id);
				if (catalog !=null) {
					request.setAttribute("cata_name", catalog.getCata_title());
				}
			}
		} catch (Exception e) {
			log.error(e,e);
		} finally {
			//记录页面访问日志
			AuditLogUtil.addPageVisitAutiLog(request, "数据目录", "");
		}
	}
}
