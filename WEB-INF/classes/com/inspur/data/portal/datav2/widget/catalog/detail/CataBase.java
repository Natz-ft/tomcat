package com.inspur.data.portal.datav2.widget.catalog.detail;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.loushang.internet.view.ViewHandler;

import com.inspur.data.catalog.domain.catalog.OpenCatalog;
import com.inspur.data.common.web.ParamUtil;
import com.inspur.utils.DataUtils;

public class CataBase implements ViewHandler{
	private static Log log = LogFactory.getLog(CataBase.class);// 日志
	
	public void execute(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		try{
			String cata_id = ParamUtil.getString(request, "cata_id", "");
			List<OpenCatalog> linkCatalogList =  DataUtils.getOpenCatalogService().getRelatedOpenCatalogList (cata_id, 5);
			// 返回相关应用列表
			request.setAttribute("relatedCatalog", linkCatalogList);			
		}catch(Exception e){
			log.error(e, e);
		}
	}

}
