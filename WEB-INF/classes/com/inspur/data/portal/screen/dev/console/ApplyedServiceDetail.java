package com.inspur.data.portal.screen.dev.console;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.exception.ExceptionUtils;
import org.loushang.internet.util.StringUtils;
import org.loushang.internet.view.ViewHandler;

import com.inspur.api.ac.IAppAdminService;
import com.inspur.api.ac.IAppService;
import com.inspur.api.ac.IDeveloperService;
import com.inspur.data.common.logger.SystemLogger;
import com.inspur.hsf.config.ServiceFactory;
import com.inspur.paas.api.oam.IServiceLevelManage;
import com.inspur.paas.api.oam.IServiceManageService;
import com.inspur.paas.api.oam.IServiceSubscriptionService;
import com.inspur.utils.AuditLogUtil;
import com.inspur.utils.DevServiceUtil;
import com.inspur.utils.OamUtils;

/**
 * 服务订阅详情
 * <br>
 * <strong>Title :</strong> ApplyedServiceDetail.java
 * <br>
 * <strong>Description : </strong>
 * <br>
 * <strong>For Examples :</strong>
 * <br>
 * <strong>Create on : 2016年6月22日 下午2:07:23<br></strong>
 * <p>
 * <strong>Copyright (C) Inspur Co.,Ltd.<br></strong>
 * <p>
 * @author <a href=mailto:miaozhq@inspur.com></a><br>
 * @version <strong>V1.0</strong>
 * <PRE>
 * </PRE>
 * -------------------------------------------<br>
 * Change History:[Formatter: author date description] <br/>
 * 1<br>
 * 2<br>
 * 3<br>
 */
public class ApplyedServiceDetail implements ViewHandler {
	
	private static IServiceSubscriptionService serviceSubscription = OamUtils.getServiceSubscriptionService();
	private static IServiceManageService serviceManage = OamUtils.getServiceManageService();
	private static IAppService appService = OamUtils.getAppService();
	private static IDeveloperService developerService = OamUtils.getDeveloperService();
	private static IServiceLevelManage serviceLevelService = OamUtils.getServiceLevelManage();

	public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String apply_id = request.getParameter("apply_id");
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		if (StringUtils.isNotEmpty(apply_id)) {
			Map applyInfo = serviceSubscription.getSubscriptionInfoByID(apply_id);
			if(applyInfo != null){
				String begin = String.valueOf(applyInfo.get("valid_start_time"));
				if(StringUtils.isNotEmpty(begin)&&!begin.equals("null")){
					applyInfo.put("start", sdf.format(new Date(Long.parseLong(begin))));
				}else{
					applyInfo.put("start", "");
				}
					
				String end = String.valueOf(applyInfo.get("valid_end_time"));
				if(StringUtils.isNotEmpty(end)&&!end.equals("null")){
					applyInfo.put("end", sdf.format(new Date(Long.parseLong(end))));
				}else{
					applyInfo.put("end", "");
				}
				Map serviceInfo = serviceManage.getServiceInfoById(applyInfo.get("service_id"));
				if(serviceInfo != null){
					applyInfo.put("service_name", serviceInfo.get("service_name"));
				}
				Map appInfo = appService.getAppInfoByAppId(String.valueOf(applyInfo.get("app_id")));
				if(appInfo != null){;
					applyInfo.put("app_name", appInfo.get("app_name"));
				}
				Map developInfo = developerService.getAppDeveloperByUserId(String.valueOf(applyInfo.get("user_id")));
				if(developInfo != null){
					applyInfo.put("name", developInfo.get("name"));
					applyInfo.put("tel", developInfo.get("tel"));
				}
				if(applyInfo.get("service_level_id")!=null && !"".equals(applyInfo.get("service_level_id").toString())){
					Map level = serviceLevelService.getServiceLevelById(applyInfo.get("service_level_id").toString());
					request.setAttribute("level", level);
				}
				
			}
			request.setAttribute("apply", applyInfo);
			
			//记录页面访问日志
			AuditLogUtil.addPageVisitAutiLog(request, "开发者控制台", "");
		}
	}

}
