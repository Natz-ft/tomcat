package com.inspur.utils;

import com.inspur.api.ac.IAppAdminService;
import com.inspur.api.ac.IAppEvaluateService;
import com.inspur.api.ac.IAppService;
import com.inspur.api.ac.IAppStatisticService;
import com.inspur.api.ac.IDeveloperService;
import com.inspur.paas.api.dataservice.DataServiceExecutorService;
import com.inspur.paas.api.dataservice.DataServiceManageService;
import com.inspur.paas.api.oam.IMonitorItemService;
import com.inspur.paas.api.oam.IServiceDocManageService;
import com.inspur.paas.api.oam.IServiceErrorCodeService;
import com.inspur.paas.api.oam.IServiceGroupManageService;
import com.inspur.paas.api.oam.IServiceLevelManage;
import com.inspur.paas.api.oam.IServiceManageService;
import com.inspur.paas.api.oam.IServiceRespTimeReport;
import com.inspur.paas.api.oam.IServiceSubscriptionService;
import com.inspur.paas.api.oam.IServiceUsageReport;
/**
 * 服务工厂
 * 
 * @author zhfeng
 *
 */
public class DevServiceUtil {
	
	
	public static IAppAdminService appAdminService = SpringContextHolder.getBean("ac.appAdminServiceBean");

	public static IDeveloperService appDeveloperService = SpringContextHolder.getBean("ac.developerServiceBean");

	public static IAppService appService = SpringContextHolder.getBean("ac.appServiceBean");

	public static IAppStatisticService appStatisticService = SpringContextHolder.getBean("ac.appStatisticServiceBean");

	public static IAppEvaluateService appEvaluateService = SpringContextHolder.getBean("ac.appEvaluateServiceBean");

	//oam
	public static IServiceManageService serviceManage = SpringContextHolder.getBean("oam.serviceManageServiceBean");
	public static IServiceUsageReport serviceUsageReport = SpringContextHolder.getBean("monitor.serviceUsageReport");
		
	public static IServiceGroupManageService ServiceGroupManageService = SpringContextHolder.getBean("oam.serviceGroupServiceBean");
	
	public static IServiceSubscriptionService ServiceSubscriptionService = SpringContextHolder.getBean("oam.serviceSubscriptionServiceBean");
	public static IServiceLevelManage serviceLevelManage = SpringContextHolder.getBean("oam.serviceLevelManage");
	
	public static IMonitorItemService monitorItemService = SpringContextHolder.getBean("quality.MonitorItemService");
	
	public static IServiceErrorCodeService serviceErrorCodeService = SpringContextHolder.getBean("oam.serviceErrorCodeServiceBean");
	public static IServiceRespTimeReport serviceRespTimeReport = SpringContextHolder.getBean("serviceRespTimeReport");
	public static IServiceDocManageService serviceDocManageService = SpringContextHolder.getBean("oam.serviceDocServiceBean");
	//数据服务
	public static DataServiceExecutorService dataServiceExecutorService = SpringContextHolder.getBean("dataServiceExecutorServiceImpl");
	public static DataServiceManageService dataServiceManageService = SpringContextHolder.getBean("dataServiceManageServiceImpl");
	
	
}
