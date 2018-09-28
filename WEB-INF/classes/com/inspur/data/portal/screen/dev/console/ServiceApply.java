package com.inspur.data.portal.screen.dev.console;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.exception.ExceptionUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.loushang.internet.util.JsonUtils;
import org.loushang.internet.util.StringUtils;
import org.loushang.internet.view.ViewHandler;

import com.inspur.api.ac.IAppAdminService;
import com.inspur.api.ac.IAppService;
import com.inspur.api.ac.IDeveloperService;
import com.inspur.data.common.logger.SystemLogger;
import com.inspur.data.common.web.ParamUtil;
import com.inspur.paas.api.oam.IServiceLevelManage;
import com.inspur.paas.api.oam.IServiceManageService;
import com.inspur.paas.api.oam.IServiceSubscriptionService;
import com.inspur.paas.api.oam.ServiceSubscriptionStatus;
import com.inspur.utils.AuditLogUtil;
import com.inspur.utils.OamUtils;

/**
 * 服务申请
 * <br>
 * <strong>Title :</strong> ServiceApply.java
 * <br>
 * <strong>Description : </strong>
 * <br>
 * <strong>For Examples :</strong>
 * <br>
 * <strong>Create on : 2016年6月22日 下午2:45:56<br></strong>
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
public class ServiceApply implements ViewHandler{
	
	private static Log log = LogFactory.getLog(ServiceApply.class);
	
	private static IAppAdminService appAdminService = OamUtils.getAppAdminService();
	private static IAppService appService = OamUtils.getAppService();
	private static IServiceManageService serviceManage = OamUtils.getServiceManageService();
	private static IDeveloperService developerService = OamUtils.getDeveloperService();
	private static IServiceSubscriptionService serviceSubscription = OamUtils.getServiceSubscriptionService();
	private static IServiceLevelManage serviceLevelService = OamUtils.getServiceLevelManage();
	
	
	public void execute(HttpServletRequest request, HttpServletResponse response){
		try{
			String uid = String.valueOf(request.getSession().getAttribute("uid"));
			if(uid == null){
				return;
			}
			Map developInfo = developerService.getAppDeveloperByUserId(uid);
			if(developInfo != null){
				request.setAttribute("developInfo",developInfo);
			}
			//获取平台级的所有服务级别，暂不考虑个性化的服务级别
			List<Map> allServiceLevel = serviceLevelService.getAllServiceLevel(null, null, null);
			if(allServiceLevel != null){
				request.setAttribute("allServiceLevel",allServiceLevel);
			}
			
			String app_id = request.getParameter("app_id");
			String service_id = request.getParameter("service_id");
			if(StringUtils.isNotEmpty(app_id)){
				request.setAttribute("app_id", app_id);
				Map<String,Object> app = appAdminService.getAppById(app_id);
				if(StringUtils.isNotEmptyMap(app)){
					request.setAttribute("app_name",app.get("app_name"));
				}
			}
			if(StringUtils.isNotEmpty(service_id)){
				request.setAttribute("service_id", service_id);
				Map<String,Object> info = serviceManage.getServiceInfoById(service_id);
				if(StringUtils.isNotEmptyMap(info)){
					request.setAttribute("service_name", info.get("service_name"));
				}
			}
		}catch(Exception ex){
			SystemLogger.error("ServiceApply", "服务申请页面加载失败", ExceptionUtils.getMessage(ex));
		} finally {
			//记录页面访问日志
			AuditLogUtil.addPageVisitAutiLog(request, "开发者控制台", "");
		}
	}
	
	/**
	 * 获取当前用户对应的所有应用列表
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	public void doGetAppList(HttpServletRequest request,HttpServletResponse response){
		try{
			//获取当前开发者的应用列表
			String uid = String.valueOf(request.getSession().getAttribute("uid"));
			if(uid == null){
				throw new RuntimeException("用户没有登录");
			}
			int page =  ParamUtil.getInteger(request, "index", 1);
			String searchKey = ParamUtil.getString(request, "searchKey",null);
			Map developerInfo = developerService.getAppDeveloperByUserId(uid);
			if(developerInfo != null){
				Map<String,Object> param = new HashMap<String,Object>();
				param.put("developer_id", String.valueOf(developerInfo.get("id")));
				Map<String, Object> appInfoListMap = appService.findAppInfo(param, 99, 1);
				Map<String,Object> result = new HashMap<String,Object> ();
				if(StringUtils.isNotEmptyMap(appInfoListMap)){
					List<Map<String,Object> > app_list = (List<Map<String,Object> >)appInfoListMap.get("data");
					result.put("count", appInfoListMap.get("totalCount"));
					result.put("list", app_list);
				}
				response.getWriter().write(JsonUtils.convertToString(result));
			}
		}catch(Exception ex){
			log.error(ex, ex);
		}
	}
	
	/**
	 * 获取所有上线的服务列表
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	public void doGetServiceList(HttpServletRequest request,HttpServletResponse response){
		try{
			int page =  ParamUtil.getInteger(request, "index", 1);
			String searchKey = ParamUtil.getString(request, "searchKey",null);
			Map<String, Object> param = new HashMap<String, Object>();
			param.put("service_status", "published");
			if(searchKey != null && searchKey != ""){
				param.put("searchKey", searchKey);
			}
			Map<String, Object> result = serviceManage.getServicePage(param, null, null, page, 7);
			response.getWriter().write(JsonUtils.convertToString(result));
		}catch(Exception ex){
			ex.printStackTrace();
			SystemLogger.error("ServiceApply", "获取服务列表失败", ExceptionUtils.getMessage(ex));
		}
	}
	
	/**
	 * 添加申请的服务
	 * @param request
	 * @param response
	 */
	public void doAddApply(HttpServletRequest request,HttpServletResponse response){
		try{
			String uid = String.valueOf(request.getSession().getAttribute("uid"));
			if(uid == null){
				return;
			}
			String service_id = request.getParameter("service_id");
			String app_id = request.getParameter("app_id");
			String start_time = request.getParameter("start_time");
			String end_time = request.getParameter("end_time");
			String level_id = request.getParameter("level_id");
			String apply_reason = request.getParameter("apply_reason");
			
			Map<String,Object> serviceInfo = serviceManage.getServiceInfoById(service_id);
			Map<String,Object> serviceSubMap = new HashMap<String, Object>();
			if(serviceInfo != null){
				serviceSubMap.put("need_user_authorize", serviceInfo.get("need_user_authorize"));
				serviceSubMap.put("service", serviceInfo.get("context") + "/" + serviceInfo.get("version_name"));
			}
			serviceSubMap.put("app_id", app_id);
			serviceSubMap.put("subscription_status", ServiceSubscriptionStatus.CREATED);
			serviceSubMap.put("service_id", service_id);
			serviceSubMap.put("valid_start_time", start_time);
			serviceSubMap.put("valid_end_time", end_time);
			serviceSubMap.put("service_level_id", level_id);
			serviceSubMap.put("subscription_reason", apply_reason);
			serviceSubMap.put("user_id", uid);
			serviceSubMap.put("subscribe_time", currentTimeSecond());
			int result = serviceSubscription.addServiceSubscription(serviceSubMap);
			response.getWriter().write(JsonUtils.convertToString(result));
			
		}catch(Exception ex){
			SystemLogger.error("ServiceApply", "提交服务申请失败", ExceptionUtils.getMessage(ex));
		}
	}
	
	public static int currentTimeSecond() {
		return (int) (System.currentTimeMillis() / 1000L);
	}
	
	
}
