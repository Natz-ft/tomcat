package com.inspur.data.portal.screen.dev.console.app;

import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.loushang.internet.util.JsonUtils;
import org.loushang.internet.util.StringUtils;
import org.loushang.internet.view.ViewHandler;

import com.inspur.api.ac.IAppAdminService;
import com.inspur.paas.api.oam.IServiceGroupManageService;
import com.inspur.paas.api.oam.IServiceLevelManage;
import com.inspur.paas.api.oam.IServiceManageService;
import com.inspur.paas.api.oam.IServiceSubscriptionService;
import com.inspur.paas.api.oam.ServiceSubscriptionStatus;
import com.inspur.ucweb.utils.RequestParamUtil;
import com.inspur.ucweb.utils.Validator;
import com.inspur.utils.OamUtils;
import com.inspur.utils.AuditLogUtil;
import com.inspur.utils.ErrorUtil;
/*import com.inspur.utils.RequestParamUtil;*/
import com.inspur.utils.UserUtil;


public class Services implements ViewHandler {

	private static Log log = LogFactory.getLog(Services.class);
	
	private HttpServletRequest request;
	private HttpServletResponse response;
	
	@SuppressWarnings("unchecked")
	public void execute(HttpServletRequest request, HttpServletResponse response){
		this.request = request;
		this.response = response;
		String appIdString = request.getParameter("app_id") == null ? "" : request.getParameter("app_id").toString();
		//String appIdString = (String)request.getParameter("app_id");
		int appId = Integer.valueOf(appIdString);
		request.setAttribute("app_id", appId);
		
		//记录页面访问日志
		AuditLogUtil.addPageVisitAutiLog(request, "开发者控制台", "");
	}
	
	
	
	/**
	 * 获取应用申请的服务
	 */
	public void doGetAppServices(HttpServletRequest request, HttpServletResponse response){
		
		String app_id = request.getParameter("app_id");
		Object uid = UserUtil.getUserID(request);
		if(StringUtils.isNotEmpty(app_id) && Validator.isNumeric(app_id) && StringUtils.isNotEmptyObject(uid)){
			
			String pageString = request.getParameter("page") == null ? "1" : request.getParameter("page").toString();
			//空字符串转整形会报异常
			if("".equals(pageString)) pageString = "1";
			
			int page = StringUtils.toInteger(pageString);
			
			if(page == 0){
				page = 1;
			}
			
			String pagesizeString = request.getParameter("pagesize") == null ? "15" : request.getParameter("pagesize").toString();
			if("".equals(pagesizeString)) pagesizeString = "15";
			
			int pagesize = Integer.valueOf(pagesizeString);
			
			if(pagesize == 0){
				pagesize = 20;
			}
			
			String serviceTypeString = request.getParameter("service_type") == null ? "" : request.getParameter("service_type").toString();
			
			if(!("default".equals(serviceTypeString) || "other".equals(serviceTypeString))){
				serviceTypeString = "default";
			}
			String serviceType = serviceTypeString;
			
			try{
				//获取服务列表
				IServiceSubscriptionService oamService =  OamUtils.getServiceSubscriptionService();
				Map<String,Object> param = new HashMap<String,Object>();
				Map<String,Object> serviceList = new HashMap();
				
				if("default".equals(serviceType)){
					serviceList = oamService.getServiceDefaultByPage(param, "", page, pagesize);
				}else{
					param.put("app_id", app_id);
					serviceList = oamService.getSubscribedServicePage(param, "", page, pagesize);
				}
				
				if(serviceList == null){
					throw new Exception("服务暂不可用，请稍后再试");
				}
				
				if(StringUtils.isNotEmptyMap(serviceList)){
					List<Map<String,Object>> list = (List)serviceList.get("data");
					if(StringUtils.isNotEmptyList(list)){
						for(Map cur_service_info : list){
							String service_id = cur_service_info.get("service_id").toString();
							Map serviceInfoWithSubId = oamService.getSubscriptionInfoByServiceIDAppID(service_id, String.valueOf(app_id));
							if(StringUtils.isNotEmptyMap(serviceInfoWithSubId)){
								cur_service_info.put("subscribed_id", serviceInfoWithSubId.get("subscription_id"));
								cur_service_info.put("subscription_status", serviceInfoWithSubId.get("subscription_status"));
							}
							
						}
					}
					this.output(response, serviceList, 1, "获取成功");
					
				}
			}catch(Exception e){
				this.output(response, "", 0, e.getMessage());
			}
			
		}
		
	}
	
	
	
	/**
	 * 取消申请
	 */
	public void doCancelApply(HttpServletRequest request, HttpServletResponse response){
		
		try{
			
			String subIdString = request.getParameter("sub_id") == null ? "" : request.getParameter("sub_id").toString();
			
			if("".equals(subIdString)){
				throw new Exception("请求参数错误");
			}
			
			String[] sub_ids = subIdString.split(",");
			
			IServiceSubscriptionService subService = OamUtils.getServiceSubscriptionService();
			IAppAdminService appAdminService = OamUtils.getAppAdminService();
			for(int i=0; i<sub_ids.length; i++){
				String sub_id = sub_ids[i];
				
				Map subInfo = subService.getSubscriptionInfoByID(sub_id);
				if(StringUtils.isNotEmptyMap(subInfo)){
					String app_id = subInfo.get("app_id").toString();
					String service_id = subInfo.get("service_id").toString();
					boolean ret = subService.deleteServiceSubscription(service_id, app_id);
					/*
					if(ret){
						//如果是已经申请成功的申请，则递减申请次数
						Object subStatus = subInfo.get("subscription_status");
						IServiceManageService service = DevServiceUtil.serviceManage;
						service.decreaseServiceSubCountByID(service_id);
						
					}else{
						//throw new Exception("操作失败");
						continue;
					}*/
				}
			}
			
			this.output(response, 1, 1, "取消成功");

		}catch(Exception e){
			this.output(response, "", 0, e.getMessage());
		}
		
	}
	/**
	 * 获取服务的调用级别
	 * @return
	 */
	public void doGetSubLevel(HttpServletRequest request, HttpServletResponse response){
		try{
			IServiceLevelManage levelService  = OamUtils.getServiceLevelManage();
			List<Map> result = levelService.getAllServiceLevel(null, null, null);
			PrintWriter out = response.getWriter();
			out.write(JsonUtils.convertToString(result));
			out.close();
		}catch(Exception exp){
			log.error("doGetSubLevel", exp);
		}
	}
	
	
	private static final String GROUP_FILTER_KEY = "group_filter";
	
	private final static int PAGE_SIZE = 15;

	public void doGetApplyServiceList(HttpServletRequest request, HttpServletResponse response){
		
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		try{
			String appId = request.getParameter("app_id");
			//app_id
			if(!ErrorUtil.checkDev(appId)){
				throw new Exception("参数请求错误");
			}
			
			String param_group_type = "";//调用服务传的group_type参数
			String param_group_id = "";//调用服务传的group_id参数
			
			String root_group_id = request.getParameter("root_gid");
			String second_group_id = request.getParameter("sec_gid");
			String second_group_type = request.getParameter("g_type");
			Map<String, Integer> limit = RequestParamUtil.getRequestLimit(request, 1, 15);
			//获取分组信息的服务
			IServiceGroupManageService groupService =  OamUtils.getServiceGroupManageService();
			List<Map> rootGroupList = new ArrayList<Map>();
			rootGroupList = groupService.getRootCategoryList();
			if(StringUtils.isNotEmptyList(rootGroupList)){
				Map root_group_info = new HashMap();//存当前页面root分组的信息
				if(StringUtils.isEmpty(root_group_id)){
					root_group_info = rootGroupList.get(0);//第一个root分组信息
					root_group_id = root_group_info.get("group_id").toString();//如果一级分组为空则取第一个
				}else{
					for(Map cur_root_group : rootGroupList){
						if(root_group_id.equals(cur_root_group.get("group_id").toString())){
							root_group_info = cur_root_group;
							break;
						}
					}
				}
				//Hongcun
				resultMap.put("rootGroupList", rootGroupList);
				resultMap.put("cur_group_id", root_group_id);
				
				//先把取数据的参数值置为root分组 如果有二级分组，则覆盖
				param_group_type = root_group_info.get("group_type").toString();//给参数赋值
				param_group_id = root_group_id;//没传二级分组id和type  则取root分组
				//二级分组相关
				List<Map> secondGroupList = new ArrayList<Map>();
				secondGroupList = groupService.getServiceGroupsByPid(root_group_id);
				
				if(StringUtils.isNotEmptyList(secondGroupList)){
					if(StringUtils.isNotEmpty(second_group_id) && StringUtils.isNotEmpty(second_group_type) && !"all".equals(second_group_id)){
						param_group_type = second_group_type;
						param_group_id = second_group_id;
					}
					if(StringUtils.isEmpty(second_group_id)){
						second_group_id = "all";
					}
					
					//Hongcun
					resultMap.put("cur_group_type", param_group_type);
					resultMap.put("cur_sec_group_id", second_group_id);
					resultMap.put("secondGroupList", secondGroupList);
				}
				
				IServiceManageService serviceManage =  OamUtils.getServiceManageService();
				Map<String, Object> param = new HashMap<String, Object>();
				Map<String, String> group_filter = new HashMap<String, String>();
				group_filter.put(param_group_type, param_group_id);
				param.put(GROUP_FILTER_KEY, group_filter);
				param.put("service_status", "published");
				Map allServices = serviceManage.getServicePage(param, null, null, limit.get("_pindex"), PAGE_SIZE);
				
				//获取该应用在该分组下的所有已申请的服务
				Map params = new HashMap();
				params.put("app_id", appId);
				params.put("group_id", param_group_id);
				Map allSubscribedServices = getServiceByAppidAndgroupid(params,null,1,100);
				
				
				List<Map> allServicesList = (List<Map>)allServices.get("data");//所有的服务列表
				List<Map> allSubscribedServicesList = (List<Map>)allSubscribedServices.get("data");//所有已申请的服务列表
				if(StringUtils.isNotEmptyList(allServicesList) && StringUtils.isNotEmptyList(allSubscribedServicesList)){
					for(Map cur_subscribed_service : allSubscribedServicesList){
						Object cur_subscribed_service_id = cur_subscribed_service.get("service_id");
						String time =convertToDate(cur_subscribed_service.get("online_time"));
						if(time==null){
							time = "";
						}
						cur_subscribed_service.put("online_time", time);
						for(Map cur_service : allServicesList){
							Object cur_service_id = cur_service.get("service_id");
							if(cur_subscribed_service_id.equals(cur_service_id)){
								cur_service.put("is_subscribed", "1");
								cur_service.put("subscription_status", cur_subscribed_service.get("subscription_status"));
								break;
							}
						}
					}
				}
				if(StringUtils.isNotEmptyList(allServicesList)){
					for(Map cur_service : allServicesList){
						String formatDate = convertToDate(cur_service.get("online_time"));
						if(formatDate == null){
							formatDate = "";
						}
						cur_service.put("online_time", formatDate);
					}
				}
				
				//Hongcun
				resultMap.put("pagesize", 15);
				resultMap.put("index", limit.get("_pindex"));
				resultMap.put("count", allServices.get("count"));
				resultMap.put("serviceList", allServices);
			}
			
			this.output(response, resultMap, 1, "获取成功");
		}catch(Exception ex){
			this.output(response, "", 0, ex.getMessage());
		}
	}
	
	
	
	
	//根据分组id和app_id获取申请的服务
	public static Map getServiceByAppidAndgroupid(Map param, String order, Integer page, Integer num){
		try{
			IServiceSubscriptionService subService = null;
			subService = OamUtils.getServiceSubscriptionService();
			Map res = subService.getServiceByAppidAndgroupid(param, order, page, num);
			return res;
		}catch(Exception e){
			e.printStackTrace();
			log.error("获取该应用在某分组下所有已申请的服务出错",e);
			return null;
		}
	}
	
	/**
	 * 某个应用是否已经申请过指定的服务
	 * 已定返回true
	 */
	public static boolean checkHasSubscribed(String service_id,String app_id){
		try{
			IServiceSubscriptionService subService = OamUtils.getServiceSubscriptionService();
			Map subInfo = subService.getSubscriptionInfoByServiceIDAppID(service_id, app_id);
			
			if(subInfo != null){
				//说明用户已经申请该服务
				return true;
			}
			
		}catch(Exception e){
			log.error("检查应用是否申请服务出错",e);
			return true;
		}
		return false;
	}
	
	
	
	/*
	 * 服务申请
	 * 复制代码
	 */
	public void doSubService(HttpServletRequest request, HttpServletResponse response) throws IOException{
		String serviceIds = request.getParameter("service_ids");
		Object uid = UserUtil.getUserID(request);
		String service_lv_id = request.getParameter("level_id");
		String app_id = request.getParameter("app_id");
		if(StringUtils.isNotEmpty(service_lv_id) && StringUtils.isNotEmpty(serviceIds) && Validator.isNumeric(app_id) && StringUtils.isNotEmptyObject(uid)){
			try{
				Map<String,Object> result = new  HashMap<String, Object>(); //记录返回结果
				//循环去添加
				String [] serviceIds_arr = serviceIds.split(",");
				for(String cur_service_id : serviceIds_arr){
					//是否已经申请过
					boolean is_subscribed = checkHasSubscribed(cur_service_id,app_id);
					if(is_subscribed)
						continue;
					int cur_result = addApplyService(cur_service_id,app_id,uid,service_lv_id);
				}
				
				this.output(response, 1, 1, "申请成功");
				return;
			}catch(Exception exp){
				this.output(response, "", 0, exp.getMessage());
			}
		}else{
			this.output(response, "", 0, "缺少必要的参数");
		}
	}
	
	/**
	 * 给一个应用申请一个服务
	 */
	public static int addApplyService(String service_id,String app_id,Object uid,String service_lv_id){
		if(service_id != null){
			IServiceManageService serviceManage  = OamUtils.getServiceManageService();
			Map serviceInfo = serviceManage.getServiceInfoById(service_id);
			if(serviceInfo != null){
				Object needApply = serviceInfo.get("need_apply");
				Map submap = new HashMap();
				submap.put("service_id", service_id);
				submap.put("app_id", app_id);
				submap.put("user_id", uid);
				submap.put("service_level_id", service_lv_id);
				submap.put("audit_time", System.currentTimeMillis()/1000);
				int subret = 0;
				if(needApply instanceof Integer){
					IServiceSubscriptionService subService = OamUtils.getServiceSubscriptionService();
					//由谁审核
					Object objApprove= serviceInfo.get("approval_authority");
					Integer t = (Integer)needApply;
					switch(t.intValue()){
					case 0:
						submap.put("subscription_status", "1");
						subret = subService.addServiceSubscription(submap);
						/*if(subret != 0){
							serviceManage.increaseServiceSubCountByID(service_id);
						}*/
						break;
					case 1:
					case 2:
						submap.put("approval_authority", objApprove);
						submap.put("subscription_status", ServiceSubscriptionStatus.CREATED);
						subret = subService.addServiceSubscription(submap);
						break;
					}
					if(subret == 0){
						return 0;
					}
					else{
						return 1;
					}
				}
				else{
					return 0;
				}
			}
		}
			return 0;
	}
	
	/**
	 * 搜索未申请服务
	 */
	public void doSearchApplyServices(HttpServletRequest request, HttpServletResponse response){
		
		try{
			request.setCharacterEncoding("utf-8");
			response.setCharacterEncoding("utf-8");
			String keyword = request.getParameter("keyword");
			String strIndex = request.getParameter("index");
			int pagesize = PAGE_SIZE;
			if(StringUtils.isNotEmpty(request.getParameter("pagesize"))){
				pagesize = Integer.parseInt(request.getParameter("pagesize"));
			}
			if(StringUtils.isEmpty(keyword)){
				request.setAttribute("is_illegal", 1);
				return;
			}
			int index = 1;
			if(strIndex!=null&&!strIndex.equals("")){
				try{
					index = Integer.parseInt(strIndex);
				}catch(NumberFormatException exp){
					index = 1;
				}
			}
			Map<String, String> param = new HashMap<String, String>();
			param.put("service_status", "published");
			IServiceManageService service = OamUtils.getServiceManageService();
			Map map = service.getServicePage(param, keyword, null, index, pagesize);
			List<Map> serviceList = (List<Map>) map.get("data");
			
			if(StringUtils.isNotEmptyList(serviceList)){
				for(Map cur_service : serviceList){
					String formatDate = convertToDate(cur_service.get("online_time"));
					if(formatDate == null){
						formatDate = "";
					}
					cur_service.put("online_time", formatDate);
					
				}
			}
			
			
			this.output(response, serviceList, 1, "获取成功");
			request.setAttribute("keyword", keyword);
			request.setAttribute("serviceList", serviceList);
			Object total = map.get("count");
			request.setAttribute("total", total);
			request.setAttribute("pageindex", index);
			request.setAttribute("pagesize", pagesize);
		}catch(Exception exp){
			this.output(response, "", 0, exp.getMessage());
			log.error("ServiceSearch.execute", exp);
		}
	}
	
	
	public static SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
	public Date date = new Date();
	
	public String convertToDate(Object timestamp){
		if(timestamp != null && !"0".equals(timestamp.toString())){
			try{
				long time = Long.parseLong(timestamp.toString()+"000");
				date.setTime(time);
				return format.format(date);
			}catch(Exception exp){
				log.error("convertToDate", exp);
			}
		}
		return null;
	}
	
	
	
	/**
	 * Description: 输出结果;
	 */
	private void output(HttpServletResponse response, Object data, int code, String msg){
		Map<String, Object> result = new HashMap();
		
		result.put("code", code);
		result.put("msg", msg);
		result.put("data", data);
		
		if(result != null){
			try {
				response.getWriter().print(JsonUtils.convertToString(result));
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}	
	}
 
	 
}


