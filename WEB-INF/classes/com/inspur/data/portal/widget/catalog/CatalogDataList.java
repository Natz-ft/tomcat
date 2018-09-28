package com.inspur.data.portal.widget.catalog;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import com.inspur.data.common.utils.PropertiesUtils;
import org.loushang.internet.view.ViewHandler;


/**
 * 数据内容列表widget处理类
 */
public class CatalogDataList implements ViewHandler{
	
	private static Logger log = Logger.getLogger(CatalogDataList.class);
	
	public void execute(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		try {
			//获取数据分析应用上下文
			String dataanaly_context = PropertiesUtils.getValue("conf.properties","global.index.dataanaly");
			request.setAttribute("dataanaly_context", dataanaly_context);
		} catch (Exception e) {
			log.error(e);
		}
	}

}
