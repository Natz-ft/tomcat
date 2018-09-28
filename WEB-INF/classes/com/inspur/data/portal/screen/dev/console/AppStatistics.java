package com.inspur.data.portal.screen.dev.console;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.loushang.internet.util.JsonUtils;
import org.loushang.internet.util.StringUtils;
import org.loushang.internet.view.ViewHandler;

import com.inspur.api.ac.IAppAdminService;
import com.inspur.common.utils.PropertiesUtil;
import com.inspur.data.common.web.ParamUtil;
import com.inspur.data.od.model.datatag.TagInfo;
import com.inspur.data.od.service.datatag.TagInfoService;
import com.inspur.paas.api.oam.IServiceUsageReport;
import com.inspur.ucweb.utils.Validator;
import com.inspur.utils.AuditLogUtil;
import com.inspur.utils.DataUtils;
import com.inspur.utils.OamUtils;
//import com.inspur.utils.DevServiceUtil;
import com.inspur.utils.PageList;
import com.inspur.utils.UserUtil;

/**
 * 
 * <br>
 * <strong>Title :</strong> AppStatistics.java
 * <br>
 * <strong>Description : </strong>
 * <br>
 * <br>
 * <strong>For Examples :</strong>
 * <br>
 * <strong>Create on : 2017年2月8日 下午2:25:56<br></strong>
 * <p>
 * <strong>Copyright (C) Inspur Co.,Ltd.<br></strong>
 * <p>
 * @author <a href=mailto:yinyin@inspur.com></a><br>
 * @version <strong>V1.0</strong>
 * <PRE>
 * </PRE>
 * -------------------------------------------<br>
 * Change History:[Formatter: author date description] <br/>
 * 1<br>
 * 2<br>
 * 3<br>
 */
public class AppStatistics implements ViewHandler{
	private static Log log = LogFactory.getLog(App.class);
	private static TagInfoService tagInfoService = DataUtils.getTagInfoService();
	
	public void execute(HttpServletRequest request, HttpServletResponse response) 
			throws ServletException, IOException {
		String app_id = request.getParameter("app_id");
		Object uid = UserUtil.getUserID(request);
		if(StringUtils.isNotEmpty(app_id) && Validator.isNumeric(app_id) && StringUtils.isNotEmptyObject(uid)){
			
			String developer_id = UserUtil.getDevelopIdFromSession(request);
			//验证应用是否为当前所有
			
			Boolean checkBoolean = checkAccess(app_id, developer_id);
			if(!checkBoolean){
				//统一跳转错误页面
				String error_url = PropertiesUtil.getValue("conf.properties","global.index.odweb").trim()+PropertiesUtil.getValue("conf.properties","error_url").trim();
				response.sendRedirect(error_url);
				return;
			}
			
			
			int appId = Integer.valueOf(app_id);
			Map app = this.getAppInfo(appId);
			//获取分组
			IAppAdminService appAdminService = OamUtils.getAppAdminService();
			List groups = appAdminService.getAllGroups();
			
			//设置用户的类型
			Map userInfoMap = UserUtil.getUserInfo();
			String usertypeString = userInfoMap.get("user_type") == null ? "" : userInfoMap.get("user_type").toString();
			
			request.setAttribute("app_id", appId);
			request.setAttribute("uid", uid);
			request.setAttribute("app", app);
			request.setAttribute("appJson", JsonUtils.convertToString(app));
			request.setAttribute("groupsJson", JsonUtils.convertToString(groups));
			
			//记录页面访问日志
			AuditLogUtil.addPageVisitAutiLog(request, "开发者控制台", "");
		}else{
			//统一跳转错误页面
			String error_url = PropertiesUtil.getValue("conf.properties","global.index.odweb")+PropertiesUtil.getValue("conf.properties","error_url");
			response.sendRedirect(error_url);
			return;
		}
	}
	/**
	 * 
	 * @title doAppStatisticsInfo<br/>
	 * <p>Description: 获取应用服务调用统计：调用次数，失败率，平均消耗时间，最大消耗时间
	 * <br>
	 * @author <a href=mailto:yinyin@inspur.com></a><br>
	 * <p>Date: 2017年2月15日 上午11:48:04<br/>
	 * <p>
	 * @param request
	 * @param response
	 * @throws IOException   
	 * @see void
	 */
	public void doGetAppServiceStatisticsInfo(HttpServletRequest request, HttpServletResponse response) throws IOException{
		int appId = ParamUtil.getInteger(request, "appId", -1);
		Map<String, Object> map = new HashMap<String, Object>();
		if (appId == -1) {
			map.put("code", "0");
			map.put("msg", "应用Id不正确");
		} else {
			IServiceUsageReport usageReportservice = OamUtils.getServiceUsageReport();
			// 调用次数
			int useCount = usageReportservice.getCountByAppId(appId);
			// 失败率
			double failRate = usageReportservice.getFaileRateByAppId(appId);
			// 平均消耗时间
			double averageTime = usageReportservice.getAVGByAppId(appId);
			// 最大消耗时间
			int maxCostTime = usageReportservice.getMaxCostTimeByAppId(appId);
			map.put("code", "1");
			Map<String, Object> data = new HashMap<String, Object>();
			data.put("useCount",useCount);
			data.put("failRate",failRate);
			data.put("averageTime",averageTime);
			data.put("maxCostTime",maxCostTime);
			map.put("data", data);
		}
		response.getWriter().write(JsonUtils.convertToString(map));
	}
	
	/**
	 * 
	 * @title doGetCountByDay<br/>
	 * <p>Description: 按日期返回调用服务次数
	 * <br>
	 * @author <a href=mailto:yinyin@inspur.com></a><br>
	 * <p>Date: 2017年2月15日 下午3:30:11<br/>
	 * <p>
	 * @param request
	 * @param response
	 * @throws IOException   
	 * @see void
	 */
	public void doGetCountByDay(HttpServletRequest request, HttpServletResponse response) throws IOException{
		int appId = ParamUtil.getInteger(request, "appId", -1);
		String startTime = request.getParameter("start_time");
		String endTime = request.getParameter("end_time");
		Map<String,Object> param = new HashMap<String, Object>();
		param.put("app_id", appId);
		param.put("start_time", startTime);
		param.put("end_time", endTime);
		Map<String, Object> map = new HashMap<String, Object>();
		if (appId == -1) {
			map.put("code", "0");
			map.put("msg", "应用Id不正确");
		} else {
			IServiceUsageReport usageReportservice = OamUtils.getServiceUsageReport();
			List<Map> serviceList =  usageReportservice.getEveryDaysCountByAppId(param);
			map.put("code", "1");
			map.put("data", serviceList);
		}
		response.getWriter().write(JsonUtils.convertToString(map));
	}
	
	/**
	 * 
	 * @title doGetFailRateByDay<br/>
	 * <p>Description: 按日期获取失败率
	 * <br>
	 * @author <a href=mailto:yinyin@inspur.com></a><br>
	 * <p>Date: 2017年2月15日 下午3:30:40<br/>
	 * <p>
	 * @param request
	 * @param response
	 * @throws IOException   
	 * @see void
	 */
	public void doGetFailRateByDay(HttpServletRequest request, HttpServletResponse response) throws IOException{
		int appId = ParamUtil.getInteger(request, "appId", -1);
		String startTime = request.getParameter("start_time");
		String endTime = request.getParameter("end_time");
		Map<String,Object> param = new HashMap<String, Object>();
		param.put("app_id", appId);
		param.put("start_time", startTime);
		param.put("end_time", endTime);
		Map<String, Object> map = new HashMap<String, Object>();
		if (appId == -1) {
			map.put("code", "0");
			map.put("msg", "应用Id不正确");
		} else {
			IServiceUsageReport usageReportservice = OamUtils.getServiceUsageReport();
			List<Map> serviceList =  usageReportservice.getEveryDayFaileRateByAppId(param);
			map.put("code", "1");
			map.put("data", serviceList);
		}
		response.getWriter().write(JsonUtils.convertToString(map));
	}
	
	/**
	 * 
	 * @title doGetAVGCostByDay<br/>
	 * <p>Description: 按日期获取最大消耗
	 * <br>
	 * @author <a href=mailto:yinyin@inspur.com></a><br>
	 * <p>Date: 2017年2月15日 下午3:31:23<br/>
	 * <p>
	 * @param request
	 * @param response
	 * @throws IOException   
	 * @see void
	 */
	public void doGetAVGCostByDay(HttpServletRequest request, HttpServletResponse response) throws IOException{
		int appId = ParamUtil.getInteger(request, "appId", -1);
		String startTime = request.getParameter("start_time");
		String endTime = request.getParameter("end_time");
		Map<String,Object> param = new HashMap<String, Object>();
		param.put("app_id", appId);
		param.put("start_time", startTime);
		param.put("end_time", endTime);
		Map<String, Object> map = new HashMap<String, Object>();
		if (appId == -1) {
			map.put("code", "0");
			map.put("msg", "应用Id不正确");
		} else {
			IServiceUsageReport usageReportservice = OamUtils.getServiceUsageReport();
			List<Map> serviceList =  usageReportservice.getEveryDayAVGByAppId(param);
			map.put("code", "1");
			map.put("data", serviceList);
		}
		response.getWriter().write(JsonUtils.convertToString(map));
	}
	
	/**
	 * 
	 * @title doGetMaxCostByDay<br/>
	 * <p>Description: 按日期获取最大消耗
	 * <br>
	 * @author <a href=mailto:yinyin@inspur.com></a><br>
	 * <p>Date: 2017年2月15日 下午3:34:52<br/>
	 * <p>
	 * @param request
	 * @param response
	 * @throws IOException   
	 * @see void
	 */
	public void doGetMaxCostByDay(HttpServletRequest request, HttpServletResponse response) throws IOException{
		int appId = ParamUtil.getInteger(request, "appId", -1);
		String startTime = request.getParameter("start_time");
		String endTime = request.getParameter("end_time");
		Map<String,Object> param = new HashMap<String, Object>();
		param.put("app_id", appId);
		param.put("start_time", startTime);
		param.put("end_time", endTime);
		Map<String, Object> map = new HashMap<String, Object>();
		if (appId == -1) {
			map.put("code", "0");
			map.put("msg", "应用Id不正确");
		} else {
			IServiceUsageReport usageReportservice = OamUtils.getServiceUsageReport();
			List<Map> serviceList =  usageReportservice.getEveryDayMaxByAppId(param);
			map.put("code", "1");
			map.put("data", serviceList);
		}
		response.getWriter().write(JsonUtils.convertToString(map));
	}
	
	/**
	 * 
	 * @title doGetNewUserByDay<br/>
	 * <p>Description: 获取每日新增用户数
	 * <br>
	 * @author <a href=mailto:yinyin@inspur.com></a><br>
	 * <p>Date: 2017年2月17日 上午10:00:12<br/>
	 * <p>
	 * @param request
	 * @param response
	 * @throws IOException   
	 * @see void
	 */
	public void doGetNewUserByDay(HttpServletRequest request, HttpServletResponse response) throws IOException{
		int appId = ParamUtil.getInteger(request, "appId", -1);
		int draw = ParamUtil.getInteger(request, "draw", 1);
		String startTime = request.getParameter("start_time");
		String endTime = request.getParameter("end_time");
		int pStart = ParamUtil.getInteger(request,"start" ,-1);
		int pLength = ParamUtil.getInteger(request,"length" ,-1);
		Map<String,Object> param = new HashMap<String, Object>();
		param.put("app_id", appId);
		param.put("start_time", startTime);
		param.put("end_time", endTime);
		PageList<Map<String,Object>> list = new PageList<Map<String,Object>>();
		Map<String, Object> map = new HashMap<String, Object>();
		if (appId == -1) {
			map.put("code", "0");
			map.put("msg", "应用Id不正确");
			response.getWriter().write(JsonUtils.convertToString(map));
		} else {
			IServiceUsageReport usageReportservice = OamUtils.getServiceUsageReport();
			// 获取所有的数据
			List<Map<String,Object>> serviceList =  usageReportservice.getEveryDayAddCountByAppId(param);
			int totalLength = serviceList.size();
			if(pStart != -1 && pLength != -1) {
				Map<String,Object> limit = new HashMap<String,Object>();
				limit.put("_pstart", pStart);	
				limit.put("_psize", pLength);
				param.put("_limit", limit);
				// 获取分页数据
				serviceList = usageReportservice.getEveryDayAddCountByAppId(param);
			}
			list.setData(serviceList);
			list.setRecordsTotal(totalLength);
			list.setRecordsFiltered(totalLength);
			list.setDraw(draw);
			response.getWriter().write(JsonUtils.convertToString(list));
		}
		
	}
	
	// 获取app信息
	private Map getAppInfo(int appId){
		Map<String, Object> app = new HashMap<String,Object>();
		try{
			IAppAdminService appAdminService =  OamUtils.getAppAdminService();
			//获取应用信息
			 app = appAdminService.getAppProjectInfo(String.valueOf(appId));
			//获取密钥
			String appSecret = appAdminService.getAppSecret(appId);
			app.put("client_secret", appSecret);
//			//格式化时间
//			SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"); 
//			String sd = sdf.format(new Date(Long.parseLong(app.get("create_time").toString())*1000)); 
			app.put("create_date", app.get("create_time").toString());
			List authtypeList = (List) app.get("authorized_grant_types");
			if(authtypeList != null){
				app.put("authorization_code", authtypeList.contains("authorization_code"));
				app.put("client_credentials", authtypeList.contains("client_credentials"));
				app.put("implicit", authtypeList.contains("implicit"));
				app.put("password", authtypeList.contains("password"));
			}else{
				app.put("authorization_code", false);
				app.put("client_credentials", false);
				app.put("implicit", false);
				app.put("password", false);
			}
			
			//获取应用标签信息
			List<Map> tagList=new ArrayList();
			List<String> tagIds = (List<String>)app.get("tagIds");
			if(StringUtils.isNotEmptyList(tagIds)){
				//组织app_tagnames：明细使用，并组织tagList编辑使用
				StringBuffer app_tagnames =new StringBuffer();
				for(int i=0;i<tagIds.size();i++){
					String tagId=(String)tagIds.get(i);
					//根据标签ID获取name
					
					if(i>0){
						app_tagnames.append(",");
					}
					TagInfo taginfo = tagInfoService.getTagInfo(tagId);
					//tagid 匹配不到tagname的时候，直接显示id
					if(taginfo==null){
						app_tagnames.append(tagId);
					}else{
						app_tagnames.append(taginfo.getTag());
					}
					
					Map tag=new HashMap();
					tag.put("tag_id", tagId);
					tag.put("tag_name", taginfo.getTag()==null?tagId:taginfo.getTag());
					
					tagList.add(tag);
					
				}
				app.put("app_tags", app_tagnames.length()>0?app_tagnames.toString():app.get("tagIds"));
				app.put("tagList", tagList);
			}
			
		}catch(Exception ex){
			if(log.isDebugEnabled()){
				log.error("getAppInfo",ex);
			}
		}
		return app;
	}
	public static boolean checkAccess(String app_id,String developer_id){
		boolean access = false;
		try{
			IAppAdminService appAdminService =  OamUtils.getAppAdminService();
			access = appAdminService.checkAppForAdmin(app_id, developer_id);
		}catch(Exception ex){
			if(log.isDebugEnabled()){
				log.error("checkAccess出错",ex);
			}
		}
		return access;
	}
	
}
