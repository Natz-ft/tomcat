package com.inspur.data.portal.screen.dev.console.app; 

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.loushang.internet.util.JsonUtils;
import org.loushang.internet.util.StringUtils;

import com.inspur.api.ac.IAppAdminService;
import com.inspur.common.utils.PropertiesUtil;
import com.inspur.ucweb.utils.Validator;
import com.inspur.utils.OamUtils;
import com.inspur.utils.UserUtil;


public class AppBase {

	private static Log log = LogFactory.getLog(AppBase.class);
	
	private HttpServletRequest request;
	private HttpServletResponse response;
	
	
	protected void checkPrivileges () throws Exception{
		
		String app_id = request.getParameter("app_id");
		Object uid = UserUtil.getUserID(request);
		if(StringUtils.isNotEmpty(app_id) && Validator.isNumeric(app_id) && StringUtils.isNotEmptyObject(uid)){
			
			String developer_id = UserUtil.getDevelopIdFromSession(request);
			//验证应用是否为当前所有
			IAppAdminService appAdminService = OamUtils.getAppAdminService();
			Boolean checkBoolean = appAdminService.checkAppForAdmin(app_id, developer_id);
			
			if(!checkBoolean){
				//统一跳转错误页面
				String error_url = PropertiesUtil.getValue("conf.properties","global.index.odweb").trim()+PropertiesUtil.getValue("conf.properties","error_url").trim();
				response.sendRedirect(error_url);
				return;
			}
			
		}else{
			//统一跳转错误页面
			String error_url = PropertiesUtil.getValue("conf.properties","global.index.odweb").trim()+PropertiesUtil.getValue("conf.properties","error_url").trim();
			response.sendRedirect(error_url);
			return;
		}
		
	}
	
	
	/**
	 * Description: 输出结果;
	 */
	protected void output(Object data, int code, String msg){
		Map<String, Object> result = new HashMap();
		
		result.put("code", code);
		result.put("msg", msg);
		result.put("data", data);
		
		if(result != null){
			try {
				this.response.getWriter().print(JsonUtils.convertToString(result));
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}	
	}
 
	 
}


