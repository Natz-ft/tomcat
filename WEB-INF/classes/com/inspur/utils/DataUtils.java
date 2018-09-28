package com.inspur.utils;

import org.apache.commons.lang3.exception.ExceptionUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.inspur.data.catalog.service.apply.OpenCatalogApplyService;
import com.inspur.data.catalog.service.catalog.CatalogAPIService;
import com.inspur.data.catalog.service.catalog.CatalogColumnService;
import com.inspur.data.catalog.service.catalog.CatalogConfigureService;
import com.inspur.data.catalog.service.catalog.CatalogFileService;
import com.inspur.data.catalog.service.catalog.CatalogMetaService;
import com.inspur.data.catalog.service.catalog.CatalogService;
import com.inspur.data.catalog.service.catalog.CatalogTagService;
import com.inspur.data.catalog.service.catalog.OpenCatalogService;
import com.inspur.data.common.logger.SystemLogger;
import com.inspur.data.od.service.catalog.CataLogGroupService;
import com.inspur.data.statistic.service.catalog.CataLogGroupStatisticsService;
import com.inspur.data.statistic.service.catalog.CatalogOrgStatisticsService;
import com.inspur.data.statistic.service.catalog.CataLogRegionStatisticsService;
import com.inspur.data.od.service.catalog.CataLogOpenDownLoadLogServcie;
import com.inspur.data.od.service.catalog.DataCatalogStatisticDayService;
import com.inspur.data.od.service.catalog.DataCatalogStatisticService;
import com.inspur.data.od.service.datatag.TagGroupService;
import com.inspur.data.od.service.datatag.TagInfoService;
import com.inspur.data.od.service.metadata.database.DataSourceService;
import com.inspur.data.od.service.metadata.database.rds.DataTableService;
import com.inspur.dataview.service.statistics.base.RegionForMapInfoService;
import com.inspur.hsf.config.ServiceFactory;
import com.inspur.portal.service.user.UserOperationLogService;
import com.inspur.uc.api.organization.OrganizationService;





/**
 * 数据中心公用接口工具类
 */
@SuppressWarnings("deprecation")
public class DataUtils {
    private static Log log = LogFactory.getLog(DataUtils.class);

	private static TagInfoService tagInfoService;

    private static CataLogGroupService cataLogGroupService;

    private static DataSourceService dataSourceService;

    private static DataTableService dataTableService;

    private static DataCatalogStatisticService dataCatalogStatisticService;

    private static DataCatalogStatisticDayService dataCatalogStatisticDayService;

    private static CataLogRegionStatisticsService cataLogRegionStatisticsService;

    private static CatalogOrgStatisticsService catalogOrgStatisticsService;

    private static CataLogGroupStatisticsService cataLogGroupStatisticsService;

    private static CataLogOpenDownLoadLogServcie cataLogOpenDownLoadLogServcie;

    private static OpenCatalogService openCatalogService;
    
    private static UserOperationLogService userOperationLogService;
    
    private static OrganizationService organizationService;
  
	private static CatalogMetaService catalogMetaServiceNew ;
	
	private static RegionForMapInfoService regionForMapInfoService ;
	
	private static TagGroupService tagGroupService;
    
    //数据目录新接口
    private static CatalogService  catalogServiceNew;   
    private static CatalogAPIService  catalogApiService;    
    private static CatalogFileService  catalogFileService;
    private static OpenCatalogApplyService openCataLogApplyService;
    private static CatalogTagService catalogTagService;
    
    
	//地图配置服务
    private static CatalogColumnService catalogColumnService;

    private static CatalogConfigureService catalogConfigureService;
    
    static {
        try {
            cataLogOpenDownLoadLogServcie = (CataLogOpenDownLoadLogServcie) ServiceFactory.getService("cataLogOpenDownLoadLogServcie");
        } catch (Exception e) {
            log.error("CataLogOpenDownLoadLogServcie获取服务失败", e);
        }
        try {
            tagInfoService = (TagInfoService) ServiceFactory.getService("tagInfoService");
        } catch (Exception e) {
            log.error("TagInfoService获取服务失败", e);
        }
        try {
            cataLogGroupService = (CataLogGroupService) ServiceFactory.getService("cataLogGroupService");
        } catch (Exception e) {
            log.error("CataLogGroupService获取服务失败", e);
        }
        try {
            dataSourceService = (DataSourceService) ServiceFactory.getService("dataSourceService");
        } catch (Exception e) {
            log.error("DataSourceService获取服务失败", e);
        }
        try {
            dataTableService = (DataTableService) ServiceFactory.getService("dataTableService");
        } catch (Exception e) {
            log.error("DataTableService获取服务失败", e);
        }
        
        try {
            dataCatalogStatisticService = (DataCatalogStatisticService) ServiceFactory.getService("dataCatalogStatisticService");
        } catch (Exception e) {
            log.error("dataCatalogStatisticService获取服务失败", e);
        }
        
        try {
            dataCatalogStatisticDayService = (DataCatalogStatisticDayService) ServiceFactory.getService("dataCatalogStatisticDayService");
        } catch (Exception e) {
            log.error("dataCatalogStatisticDayService获取服务失败", e);
        }
        try {
            cataLogRegionStatisticsService = (CataLogRegionStatisticsService) ServiceFactory.getService("cataLogRegionStatisticsService");
        } catch (Exception e) {
            log.error("CataLogRegionStatisticsService获取服务失败", e);
        }
        try {
            catalogOrgStatisticsService = (CatalogOrgStatisticsService) ServiceFactory.getService("cataLogOrgStatisticsService");
        } catch (Exception e) {
            log.error("CataLogOrgStatisticsService获取服务失败", e);
        }
        try {
            cataLogGroupStatisticsService = (CataLogGroupStatisticsService) ServiceFactory.getService("cataLogGroupStatisticsService");
        } catch (Exception e) {
            log.error("CataLogGroupStatisticsService获取服务失败", e);
        }
        // 用户操作审计
        try {
        	userOperationLogService = (UserOperationLogService) ServiceFactory.getService("userOperationLogService");
        } catch (Exception e) {
        	log.error("userOperationLogService获取服务失败", e);
        }
        
        // 部门列表
        try {
        	organizationService = (OrganizationService) ServiceFactory.getService("organizationService");
        } catch (Exception e) {
        	log.error("organizationService获取服务失败", e);
        }

      //行政区划
        try {
        	regionForMapInfoService = (RegionForMapInfoService) ServiceFactory.getService("regionForMapInfoService");
        } catch (Exception e) {
            log.error( "获取regionForMapInfoService失败", e);
        }
        
        //数据目录新接口-元数据
        try {
    		catalogMetaServiceNew = (CatalogMetaService) ServiceFactory.getService("catalogMetaServiceNew");
        } catch (Exception e) {
            SystemLogger.error("DataUtils", "获取catalogMetaServiceNew失败", ExceptionUtils.getStackTrace(e));
        }
       //数据目录新接口-文件
    	try {
    		catalogFileService = (CatalogFileService) ServiceFactory.getService("catalogFileService");
        } catch (Exception e) {
            SystemLogger.error("DataUtils", "获取catalogFileService失败", ExceptionUtils.getStackTrace(e));
        }
    	//数据目录新接口-服务
    	try {
    		catalogApiService = (CatalogAPIService) ServiceFactory.getService("catalogApiService");
        } catch (Exception e) {
            SystemLogger.error("DataUtils", "获取catalogApiService失败", ExceptionUtils.getStackTrace(e));
        }
    	//数据目录新接口-目录
    	try {
    		catalogServiceNew = (CatalogService) ServiceFactory.getService("catalogServiceNew");
        } catch (Exception e) {
            SystemLogger.error("DataUtils", "获取catalogService失败", ExceptionUtils.getStackTrace(e));
        }
    	//数据目录新接口-开放目录
    	try {
    		openCatalogService = (OpenCatalogService) ServiceFactory.getService("openCatalogService");
        } catch (Exception e) {
            SystemLogger.error("DataUtils", "获取openCatalogService失败", ExceptionUtils.getStackTrace(e));
        }
    	//数据目录新接口-开放目录申请
    	try {
    		openCataLogApplyService = (OpenCatalogApplyService) ServiceFactory.getService("openCataLogApplyService");
        } catch (Exception e) {
            SystemLogger.error("DataUtils", "获取openCataLogApplyService失败", ExceptionUtils.getStackTrace(e));
        }
    	
    	//获取地图配置服务
    	try {
    		catalogColumnService = (CatalogColumnService) ServiceFactory.getService("catalogColumnService");
        } catch (Exception e) {
            SystemLogger.error("DataUtils", "获取catalogColumnService失败", ExceptionUtils.getStackTrace(e));
        }
    	//目录配置服务
    	try {
    		catalogConfigureService = (CatalogConfigureService) ServiceFactory.getService("catalogConfigureService");
        } catch (Exception e) {
            SystemLogger.error("DataUtils", "获取catalogConfigureService失败", ExceptionUtils.getStackTrace(e));
        }
    	
    	//目录标签
    	try {
    		catalogTagService = (CatalogTagService) ServiceFactory.getService("catalogTagService");
        } catch (Exception e) {
            SystemLogger.error("DataUtils", "获取catalogTagService失败", ExceptionUtils.getStackTrace(e));
        }
    	
    	//目录标签
    	try {
    		tagGroupService = (TagGroupService) ServiceFactory.getService("tagGroupService");
        } catch (Exception e) {
            SystemLogger.error("DataUtils", "获取tagGroupService失败", ExceptionUtils.getStackTrace(e));
        }
    	
    	
    }

    public static CataLogOpenDownLoadLogServcie getCataLogOpenDownLoadLogServcie() {
        return cataLogOpenDownLoadLogServcie;
    }

    public static TagInfoService getTagInfoService() {
        return tagInfoService;
    }

    public static CataLogGroupService getCataLogGroupService() {
        return cataLogGroupService;
    }

    public static DataSourceService getDataSourceService() {
        return dataSourceService;
    }

    public static DataTableService getDataTableService() {
        return dataTableService;
    }

    public static DataCatalogStatisticService getDataCatalogStatisticService() {
        return dataCatalogStatisticService;
    }


   public static DataCatalogStatisticDayService getDataCatalogStatisticDayService() {
        return dataCatalogStatisticDayService;
    }

    public static CataLogRegionStatisticsService getCataLogRegionStatisticsService() {
        return cataLogRegionStatisticsService;
    }

    public static CatalogOrgStatisticsService getCataLogOrgStatisticsService() {
        return catalogOrgStatisticsService;
    }

    public static CataLogGroupStatisticsService getCataLogGroupStatisticsService() {
        return cataLogGroupStatisticsService;
    }

	public static UserOperationLogService getUserOperationLogService(){
		return userOperationLogService;
	}

    public static CatalogService getCatalogServiceNew() {
		return catalogServiceNew;
	}
    
    public static OpenCatalogService getOpenCatalogService() {
		return openCatalogService;
	}

	public static CatalogAPIService getCatalogApiService() {
		return catalogApiService;
	}

	public static CatalogFileService getCatalogFileService() {
		return catalogFileService;
	}

	public static CatalogMetaService getCatalogMetaServiceNew() {
		return catalogMetaServiceNew;
	}
	
	public static OpenCatalogApplyService getOpenCatalogApplyService() {
		return openCataLogApplyService;
	}
	
	public static OrganizationService getOrganizationService(){
		return organizationService;
	}
	
	public static RegionForMapInfoService getRegionForMapInfoService() {
		return regionForMapInfoService;
	}

	//地图配置服务
	public static CatalogColumnService getCatalogColumnService() {
		return catalogColumnService;
	}
	public static CatalogConfigureService getCatalogConfigureService() {
		return catalogConfigureService;
	}
	public static CatalogTagService getCatalogTagService() {
		return catalogTagService;
	}

	public static TagGroupService getTagGroupService() {
		return tagGroupService;
	}
	 
}
