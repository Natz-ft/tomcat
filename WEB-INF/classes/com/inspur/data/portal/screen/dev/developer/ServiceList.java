package com.inspur.data.portal.screen.dev.developer;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.apache.commons.lang.exception.ExceptionUtils;
import org.loushang.internet.util.JsonUtils;
import org.loushang.internet.util.StringUtils;
import org.loushang.internet.view.ViewHandler;

import com.inspur.api.ac.IAppAdminService;
import com.inspur.api.ac.IDeveloperService;
import com.inspur.common.utils.PropertiesUtil;
import com.inspur.data.common.logger.SystemLogger;
import com.inspur.data.common.web.ParamUtil;
import com.inspur.hsf.config.ServiceFactory;
import com.inspur.paas.api.oam.IMonitorItemService;
import com.inspur.paas.api.oam.IServiceGroupManageService;
import com.inspur.paas.api.oam.IServiceManageService;
import com.inspur.portal.model.user.UserCollection;
import com.inspur.portal.service.user.UserCollectionService;
import com.inspur.uc.api.organization.Organization;
import com.inspur.uc.api.organization.OrganizationService;
import com.inspur.utils.AuditLogUtil;
import com.inspur.utils.OamUtils;
import com.inspur.utils.StringUtil;

public class ServiceList implements ViewHandler {
	IAppAdminService appAdminService = OamUtils.getAppAdminService();
    private static IServiceManageService serviceManageService = OamUtils.getServiceManageService();
    private static IServiceGroupManageService serviceGroupManageService ;
    private static IMonitorItemService monitorItemService = OamUtils.getMonitorItemService();
    private static UserCollectionService userCollectionService;
    private static OrganizationService organizationService;
    
    private static  IDeveloperService appDeveloperService;  
		


    static {
        try {
        	serviceGroupManageService = (IServiceGroupManageService) ServiceFactory.getService("ServiceGroup");
        } catch (Exception e) {
            SystemLogger.error("IServiceGroupManageService", "获取serviceGroupManageService失败", ExceptionUtils.getStackTrace(e));
        }
    	
        try {
        	appDeveloperService = (IDeveloperService) ServiceFactory.getService("developerService");
        } catch (Exception e) {
            SystemLogger.error("IDeveloperService", "获取appDeveloperService失败", ExceptionUtils.getStackTrace(e));
        }
    	
        try {
            organizationService = (OrganizationService) ServiceFactory.getService("organizationService");
        } catch (Exception e) {
            SystemLogger.error("OrganizationService", "获取OrganizationService失败", ExceptionUtils.getStackTrace(e));
        }
        
        try {
            userCollectionService = (UserCollectionService) ServiceFactory.getService("userCollectionService");
        } catch (Exception e) {
            SystemLogger.error("Collection", "获取userCollectionService失败", ExceptionUtils.getStackTrace(e));
        }
    }

    public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // 行政区划编码
        String regionCode = (String) request.getSession().getAttribute("area_code");
        try {
            // 获取数据主题
            Map<String, Object> param = new HashMap<String, Object>();
            param.put("parent_id", "0");
            List<Map> resGroups = serviceGroupManageService.getRootCategoryList();
            request.setAttribute("resGroups", resGroups);
            // 获取组织机构列表
            param.clear();
            // 此处添加行政区划编码条件
            param.put("region_code", regionCode);
            List<Organization> organizationres = organizationService.getOrganizationList(param);
            request.setAttribute("organizationres", organizationres);
            // 服务申请url
            request.setAttribute("odWebUrl", PropertiesUtil.getValue("conf.properties", "global.index.odweb"));
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
        	//记录页面访问日志
        	AuditLogUtil.addPageVisitAutiLog(request, "API超市", "");
		}
    }

    public void doQueryApiList(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            // 获取地市编码
            String regionCode = (String) request.getSession().getAttribute("area_code");
            String subjectId = ParamUtil.getString(request, "subjectId", null);
            String orgId = ParamUtil.getString(request, "orgId", null);
            String key = ParamUtil.getString(request, "key", null);
            String orderType = ParamUtil.getString(request, "orderType", null);
            int page = ParamUtil.getInteger(request, "page", 1);
            int pageSize = ParamUtil.getInteger(request, "pageSize", 10);
            int level = ParamUtil.getInteger(request, "level", 0);
            Map<String, Object> param = new HashMap<String, Object>();
            if (StringUtils.isNotEmpty(subjectId)) {
            	Map group_filter =  new HashMap();
            	String group_type = "group";
            	group_filter.put(group_type, subjectId);
                param.put("group_filter", group_filter);
            }
            param.put("site_code", regionCode);
            // 国家需求，增加级别筛选 1，国家级，2省级，3市级
            if (level != 0) {
            	 param.put("level", level);
            }
            param.put("area_code", regionCode);
            List<String> organ = new ArrayList<String>();
            if (StringUtils.isNotEmpty(orgId)) {
                organ.add(orgId);
            }
            if (null != organ && organ.size() > 0) {
                param.put("organs", organ);
            }
            Map<String, Object> userInfo = (Map<String, Object>) request.getSession().getAttribute("userInfo");
            param.put("is_internal", 0);
            param.put("service_status", "published");
            @SuppressWarnings("unchecked")
            Map<String, Object> serviceMap = serviceManageService.getServicePage(param, key, orderType, page, pageSize);
            List<Map<Object, String>> servicelist = (List<Map<Object, String>>) serviceMap.get("data");
            if (userInfo != null) {
                Integer uid = (Integer) userInfo.get("uid");
                Map<String, Object> paramMap = new HashMap<String, Object>();
                paramMap.put("object_type", 2);
                paramMap.put("uid", uid);
                paramMap.put("status", "1");
                List<UserCollection> userCollectionList = userCollectionService.queryUserCollectionList(paramMap);
                String colectionApis = "";
                for(UserCollection col : userCollectionList){
                	colectionApis += col.getObject_id()+",";
                }
                for(Map temp:servicelist){
                	String service_id = String.valueOf(temp.get("service_id"));
                    if(colectionApis.indexOf(service_id)>=0){
                    	temp.put("isCol", 1);
                    }
                }
            }
            SystemLogger.info("API超市列表页面", "API列表查询条件为：" + param);
            SystemLogger.info("API超市列表页面", "API列表查询条结果：" + serviceMap);
            response.getWriter().write(JsonUtils.convertToString(serviceMap));
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    /**
     * json方式获取数据集列表 <br/>
     * 
     * @Title: doSearchCatalog
     * @author haowenxiang@inspur.com
     * @param request
     * @param response
     * @throws ServletException
     * @throws IOException
     * @see
     * void
     * @throws ServletException IOException
     */
    public void doQueryOrgList(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String regionCode = (String) request.getSession().getAttribute("area_code");
        String org = ParamUtil.getString(request, "value", "1");
        // 获取组织机构列表
        // A-G顺序取
        if (org.equals("1")) {
            try {
                Map<String, Object> paramMap = new HashMap<String, Object>();
                paramMap.put("pinyin_begin", "A");
                paramMap.put("pinyin_end", "G");
                paramMap.put("region_code", regionCode);
                List<Organization> organizationresAG = organizationService.getOrganizationList(paramMap);
                response.getWriter().write(JsonUtils.convertToString(organizationresAG));
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        // H-N顺序取
        if (org.equals("2")) {
            try {
                Map<String, Object> paramMap = new HashMap<String, Object>();
                paramMap.put("pinyin_begin", "H");
                paramMap.put("pinyin_end", "N");
                paramMap.put("region_code", regionCode);
                List<Organization> organizationresHN = organizationService.getOrganizationList(paramMap);
                response.getWriter().write(JsonUtils.convertToString(organizationresHN));
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        // O-T顺序取
        if (org.equals("3")) {
            try {
                Map<String, Object> paramMap = new HashMap<String, Object>();
                paramMap.put("pinyin_begin", "O");
                paramMap.put("pinyin_end", "T");
                paramMap.put("region_code", regionCode);
                List<Organization> organizationresOT = organizationService.getOrganizationList(paramMap);
                response.getWriter().write(JsonUtils.convertToString(organizationresOT));
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        // U-Z顺序取
        if (org.equals("4")) {
            try {
                Map<String, Object> paramMap = new HashMap<String, Object>();
                paramMap.put("pinyin_begin", "U");
                paramMap.put("pinyin_end", "Z");
                paramMap.put("region_code", regionCode);
                List<Organization> organizationresUZ = organizationService.getOrganizationList(paramMap);
                response.getWriter().write(JsonUtils.convertToString(organizationresUZ));
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    /**
     * 服务申请前检查用户是否登录，是否为开发者 <br/>
     * <p>
     * Description: TODO <br/>
     * <p>
     * Author: <a href="mailto:zhang_hy@inspur.com">张华蕴</a><br/>
     * <p>
     * Date: 2016年11月8日-下午2:59:44<br/>
     * <p>
     * 
     * @param request
     * @param response
     * @throws ServletException
     * @throws IOException
     * 
     */
    @SuppressWarnings("unchecked")
    public void doCheckLogin(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String flag = "1";
        Map<String, Object> userInfo = (Map<String, Object>) request.getSession().getAttribute("userInfo");
        if (userInfo != null) {
            // 判断用户是否为开发者
            String uid = String.valueOf(userInfo.get("uid"));
  //          IDeveloperService appDomain = DevServiceUtil.appDeveloperService;
            Map<String, Object> developer = appDeveloperService.getAppDeveloperByUserId(uid);
            if (null == developer || developer.isEmpty()) {
                flag = "2";
            } else {
                flag = "0";
            }
        }
        response.getWriter().write(flag);
    }

    /**
     * 查询所有服务数量
     * 
     * @param request
     * @param response
     * @throws ServletException
     */
    public void doGetAllService(HttpServletRequest request, HttpServletResponse response) {
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            Integer serviceCount = serviceManageService.getCommonServiceCount(map);
            response.getWriter().write(serviceCount.toString());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * 调用服务数
     * 
     * @param request
     * @param response
     */
    public void doGetServiceNum(HttpServletRequest request, HttpServletResponse response) {
        Map<String, Object> map = new HashMap<String, Object>();
        Integer serviceNum = monitorItemService.getServiceCount(map);
        try {
            response.getWriter().write(serviceNum.toString());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * 调用服务次数
     * 
     * @param request
     * @param response
     */
    public void doGetServiceAllNums(HttpServletRequest request, HttpServletResponse response) {
        Map<String, Object> map = new HashMap<String, Object>();
        Integer serviceNum = monitorItemService.getServiceNum(map);
        try {
            response.getWriter().write(serviceNum.toString());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * 日均调用服务数
     * 
     * @param request
     * @param response
     */
    public void doGetServiceNumsByDay(HttpServletRequest request, HttpServletResponse response) {
        Map<String, Object> map = new HashMap<String, Object>();
        long startTime = StringUtil.getStartTime().getTime();
        long endTime = StringUtil.getStartTime().getTime();
        map.put("startTime", startTime);
        map.put("endTime", endTime);
        Integer serviceNum = monitorItemService.getServiceNumByDay(map);
        try {
            response.getWriter().write(serviceNum.toString());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * 服务统计信息
     * 
     * @param request
     * @param response
     */
    public void doGetServiceCountInfo(HttpServletRequest request, HttpServletResponse response) {
        Map<String, Object> map = new HashMap<String, Object>();
        long startTime = StringUtil.getStartTime().getTime();
        long endTime = StringUtil.getStartTime().getTime();
        // 调用服务次数
        Integer serviceTimes = monitorItemService.getServiceNum(map);
        // 调用服务数
        Integer ServiceCount = monitorItemService.getServiceCount(map);
        // 所有服务数量
        Integer CommonServiceCount = serviceManageService.getCommonServiceCount(map);
        // 日均调用次数
        map.put("startTime", startTime);
        map.put("endTime", endTime);
        Integer ServiceNumByDay = monitorItemService.getServiceNumByDay(map);
        JSONObject json = new JSONObject();
        json.put("serviceTimes", serviceTimes);
        json.put("ServiceCount", ServiceCount);
        json.put("CommonServiceCount", CommonServiceCount);
        json.put("ServiceNumByDay", ServiceNumByDay);
        try {
            response.getWriter().write(JsonUtils.convertToString(json));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
