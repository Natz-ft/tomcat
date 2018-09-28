package com.inspur.data.portal.datav2.widget.catalog.detail;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.loushang.internet.view.ViewHandler;

import com.inspur.data.catalog.domain.catalog.CatalogAPI;
import com.inspur.data.catalog.domain.catalog.CatalogConfigure;
import com.inspur.utils.DataUtils;
import com.inspur.utils.OamUtils;

public class CataApi implements ViewHandler{
	private static Log log = LogFactory.getLog(CataApi.class);// 日志
	
	public void execute(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		try{
			//相关API
			String cata_id = request.getParameter("cata_id");
			List<CatalogAPI> cataApi = DataUtils.getCatalogApiService().getCatalogAPI(cata_id, "2");
			
			CatalogConfigure conf = DataUtils.getCatalogConfigureService().getCatalogConfigure(cata_id, "2");
        	String use_type = conf.getUse_type();
        	if(use_type.indexOf("1")>=0 || use_type.indexOf("4")>=0){//数据集或地图数据集
        		//平台默认目录服务
    			Map serviceInfo = OamUtils.getServiceManageService().getServiceInfo("/catalog/get_columns", "1.0");
    			if (serviceInfo != null ) {
    				CatalogAPI temp = new CatalogAPI();
    				temp.setCata_id(cata_id);
    				temp.setConf_type("2");
    				temp.setOpen_service_id(String.valueOf(serviceInfo.get("service_id")));
    				temp.setOpen_service_name(String.valueOf(serviceInfo.get("service_name")));
    				cataApi.add(temp);
    			}
        	}
			request.setAttribute("cataApi", cataApi);			
		}catch(Exception e){
			log.error(e, e);
		}
	}

}
