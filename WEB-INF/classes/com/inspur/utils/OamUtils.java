package com.inspur.utils;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.inspur.api.ac.IAppAdminService;
import com.inspur.api.ac.IAppEvaluateService;
import com.inspur.api.ac.IAppService;
import com.inspur.api.ac.IAppStatisticService;
import com.inspur.api.ac.IDeveloperService;
import com.inspur.data.od.service.datatag.TagGroupService;
import com.inspur.data.od.service.datatag.TagInfoService;
import com.inspur.hsf.config.ServiceFactory;
import com.inspur.paas.api.oam.IMonitorItemService;
import com.inspur.paas.api.oam.IServiceDocManageService;
import com.inspur.paas.api.oam.IServiceErrorCodeService;
import com.inspur.paas.api.oam.IServiceGroupManageService;
import com.inspur.paas.api.oam.IServiceLevelManage;
import com.inspur.paas.api.oam.IServiceManageService;
import com.inspur.paas.api.oam.IServiceRespTimeReport;
import com.inspur.paas.api.oam.IServiceStatisticDayService;
import com.inspur.paas.api.oam.IServiceSubscriptionService;
import com.inspur.paas.api.oam.IServiceUsageReport;

/**
 * 服务应用接口类
 * <br>
 * <strong>Title :</strong> OamUtils.java
 * <br>
 * <strong>Description : </strong>
 * <br>
 * <strong>For Examples :</strong>
 * <br>
 * <strong>Create on : 2017年2月14日 下午2:20:03<br></strong>
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
public class OamUtils {
	
	private static Log log = LogFactory.getLog(OamUtils.class);
	
	private static IServiceManageService serviceManageService;
	private static IServiceSubscriptionService serviceSubscriptionService;
	private static IAppAdminService appAdminService;
	private static IAppEvaluateService appEvaluateService;
	private static IAppService appService;
	private static IAppStatisticService appStatisticService;
	private static IServiceUsageReport serviceUsageReport;
	private static IServiceLevelManage serviceLevelManage;
	private static IServiceGroupManageService serviceGroupManageService;
	private static IDeveloperService developerService;
	private static TagGroupService tagGroupService;
	private static TagInfoService tagInfoService;
	private static IMonitorItemService monitorItemService ;
	private static IServiceDocManageService serviceDocManageService ;
	private static IServiceRespTimeReport serviceRespTimeReport;
	private static IServiceErrorCodeService serviceErrorCodeService;
	private static IServiceStatisticDayService serviceStatisticDayService;
	
	static{
		try{
			serviceManageService = (IServiceManageService) ServiceFactory.getService("iServiceManageService");
			serviceSubscriptionService = (IServiceSubscriptionService) ServiceFactory.getService("iServiceSubscriptionService");
			appAdminService = (IAppAdminService) ServiceFactory.getService("iAppAdminService");
			appEvaluateService =  (IAppEvaluateService) ServiceFactory.getService("AppEvaluateService");
			appService = (IAppService) ServiceFactory.getService("appService");
			appStatisticService = (IAppStatisticService) ServiceFactory.getService("appStatisticService");
			serviceUsageReport = (IServiceUsageReport) ServiceFactory.getService("serviceUsageReport");
			serviceLevelManage = (IServiceLevelManage) ServiceFactory.getService("serviceLevelManage");
			serviceGroupManageService = (IServiceGroupManageService) ServiceFactory.getService("serviceGroupManageService");
			developerService = (IDeveloperService) ServiceFactory.getService("developerService");
			tagGroupService = (TagGroupService) ServiceFactory.getService("tagGroupService");
			tagInfoService = (TagInfoService) ServiceFactory.getService("tagInfoService");
			
			
			monitorItemService = (IMonitorItemService) ServiceFactory.getService("ServiceMonitor");
			serviceDocManageService = (IServiceDocManageService) ServiceFactory.getService("serviceDocManageService");
			serviceRespTimeReport = (IServiceRespTimeReport) ServiceFactory.getService("serviceRespTimeReport");
			serviceErrorCodeService = (IServiceErrorCodeService) ServiceFactory.getService("serviceErrorCodeService");			
			
			serviceStatisticDayService = (IServiceStatisticDayService)ServiceFactory.getService("serviceStatisticDayService");
		}catch(Exception e){
			log.error("OamUtils获取服务失败", e);
		}
	}


	public static IServiceManageService getServiceManageService() {
		return serviceManageService;
	}
	public static IServiceSubscriptionService getServiceSubscriptionService() {
		return serviceSubscriptionService;
	}
	public static IAppAdminService getAppAdminService() {
		return appAdminService;
	}
	public static IAppEvaluateService getAppEvaluateService() {
		return appEvaluateService;
	}
	public static IAppService getAppService() {
		return appService;
	}
	public static IAppStatisticService getAppStatisticService() {
		return appStatisticService;
	}
	public static IServiceUsageReport getServiceUsageReport() {
		return serviceUsageReport;
	}
	public static IServiceLevelManage getServiceLevelManage() {
		return serviceLevelManage;
	}
	public static IServiceGroupManageService getServiceGroupManageService() {
		return serviceGroupManageService;
	}
	public static IDeveloperService getDeveloperService() {
		return developerService;
	}
	
	public static TagGroupService getTagGroupService() {
		return tagGroupService;
	}
	public static TagInfoService getTagInfoService() {
		return tagInfoService;
	}
	
	public static IMonitorItemService getMonitorItemService() {
		return monitorItemService;
	}
	public static IServiceDocManageService getIserviceDocManageService() {
		return serviceDocManageService;
	}
	public static IServiceRespTimeReport getIServiceRespTimeReport() {
		return serviceRespTimeReport;
	}
	public static IServiceErrorCodeService getIServiceErrorCodeService() {
		return serviceErrorCodeService;
	}
	public static IServiceStatisticDayService getServiceStatisticDayService() {
		return serviceStatisticDayService;
	}
}
