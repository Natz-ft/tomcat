package com.inspur.data.portal.widget.catalog;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.loushang.internet.view.ViewHandler;

import com.inspur.data.common.utils.PropertiesUtils;

/**
 * 数据分析widget处理类
 */
public class CatalogAnaly implements ViewHandler{
	
	private static Logger log = Logger.getLogger(CatalogAnaly.class);
	
	public void execute(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		try {
			//获取数据分析应用上下文
			String dataanaly_context = PropertiesUtils.getValue("conf.properties","global.index.dataanaly");
			request.setAttribute("dataanaly_context", dataanaly_context);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			log.error(e.getMessage());
		}
	}

}
