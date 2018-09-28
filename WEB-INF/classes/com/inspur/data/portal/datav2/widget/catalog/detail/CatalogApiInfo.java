package com.inspur.data.portal.datav2.widget.catalog.detail;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.loushang.internet.view.ViewHandler;

import com.inspur.utils.OamUtils;

public class CatalogApiInfo implements ViewHandler{
	private static Log log = LogFactory.getLog(CatalogApiInfo.class);// 日志
	
	public void execute(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		try{
			Map<String, Object> obj = new HashMap<String, Object>();
            String service_id = request.getParameter("service_id");
            @SuppressWarnings("rawtypes")
			Map serviceInfo = OamUtils.getServiceManageService().getServiceInfoById(service_id);
            if (null != serviceInfo) {
            	obj.put("service_id", serviceInfo.get("service_id"));
                obj.put("service_name", serviceInfo.get("service_name"));
                obj.put("service_desc", serviceInfo.get("service_desc"));
                obj.put("version_name", serviceInfo.get("version_name"));
                obj.put("service_url", serviceInfo.get("context"));
                obj.put("api_result", serviceInfo.get("api_result"));
                obj.put("http_method", serviceInfo.get("http_method"));
                if (serviceInfo != null && serviceInfo.containsKey("additional_info") && serviceInfo.get("additional_info") != null) {
                    JSONObject add_info = JSONObject.fromObject(serviceInfo.get("additional_info").toString());
                    obj.put("additional_info", add_info);
                }
            }
            request.setAttribute("obj", obj);
        }catch(Exception e){
			log.error(e, e);
		}
	}

}
