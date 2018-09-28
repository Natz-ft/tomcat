package com.inspur.data.portal.screen.dev.console;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.apache.commons.lang.exception.ExceptionUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.loushang.internet.util.JsonUtils;
import org.loushang.internet.view.ViewHandler;

import com.inspur.api.ac.IAppAdminService;
import com.inspur.api.ac.IAppService;
import com.inspur.data.common.logger.SystemLogger;
import com.inspur.data.common.web.PaginationList;
import com.inspur.data.common.web.ParamUtil;
import com.inspur.data.common.web.RequestParam;
import com.inspur.hsf.config.ServiceFactory;
import com.inspur.paas.api.oam.IServiceManageService;
import com.inspur.paas.api.oam.IServiceSubscriptionService;
import com.inspur.paas.api.oam.ServiceSubscriptionStatus;
import com.inspur.portal.model.user.UserCollection;
import com.inspur.portal.model.user.UserOperationLog;
import com.inspur.portal.service.user.UserCollectionService;
import com.inspur.portal.service.user.UserOperationLogService;
import com.inspur.utils.AuditLogUtil;
import com.inspur.utils.DevServiceUtil;
import com.inspur.utils.OamUtils;
import com.inspur.utils.SystemUtil;

/**
 * 服务管理
 * <br>
 * <strong>Title :</strong> ApplyedServiceList.java
 * <br>
 * <strong>Description : </strong>
 * <br>
 * <strong>For Examples :</strong>
 * <br>
 * <strong>Create on : 2016年6月21日 下午3:52:28<br></strong>
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
public class ApplyedServiceList implements ViewHandler {
    private static IServiceSubscriptionService serviceSubscription = OamUtils.getServiceSubscriptionService();

    private static IServiceManageService serviceManage = OamUtils.getServiceManageService();

    private static IAppService appService = OamUtils.getAppService();

    private static UserCollectionService userCollectionService;

    private static UserOperationLogService userOperationLogService;

    private static Log log = LogFactory.getLog(ApplyedServiceList.class);
    static {
        try {
            userCollectionService = (UserCollectionService) ServiceFactory.getService("userCollectionService");
        } catch (Exception e) {
            SystemLogger.error("UserCollectionService", "获取UserCollectionService失败", ExceptionUtils.getStackTrace(e));
        }
        try {
            userOperationLogService = (UserOperationLogService) ServiceFactory.getService("userOperationLogService");
        } catch (Exception e) {
            SystemLogger.error("UserOperationLogService", "获取userOperationLogService失败", ExceptionUtils.getStackTrace(e));
        }
    }

    public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    	//记录页面访问日志
    	AuditLogUtil.addPageVisitAutiLog(request, "开发者控制台", "");
    }

    public void doQueryMyApplyList(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            String uid = String.valueOf(request.getSession().getAttribute("uid"));
            if (uid == null) {
                return;
            }
            RequestParam pageparam = ParamUtil.getRequestParam(request);
            int draw = ParamUtil.getInteger(request, "draw", 1);
            String status = ParamUtil.getString(request, "status", "");
            Map<String, Object> param = new HashMap<String, Object>();
            param.put("user_id", uid);
            if (status != null && status != "") {
                //param.put("subscription_status", status);
            	String[] statusList = status.split(",");
                param.put("subscription_status_list", statusList);
            }
            Map<String, Object> result = new HashMap<String, Object>();
            List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
            String order = " subscribe_time desc ";
			Map serviceSubList = serviceSubscription.getServiceSubscriptionPage(param, order, pageparam.getPage(), pageparam.getPageSize());
            list = (List<Map<String, Object>>) serviceSubList.get("data");
            if (list != null && list.size() > 0) {
                for (int i = 0; i < list.size(); i++) {
                    Map<String, Object> temp = list.get(i);
                    Map serviceInfo = serviceManage.getServiceInfoById(temp.get("service_id"));
                    if (serviceInfo != null) {
                        temp.put("service_name", serviceInfo.get("service_name"));
                    }
                    Map appInfo = appService.getAppInfoByAppId(String.valueOf(temp.get("app_id")));
                    if (appInfo != null) {
                        temp.put("app_name", appInfo.get("app_name"));
                    }
                }
            }
            result.put("data", list);
            result.put("recordsTotal", serviceSubList.get("count"));
            result.put("recordsFiltered", serviceSubList.get("count"));
            result.put("draw", draw);
            response.getWriter().write(JsonUtils.convertToString(result));//返回前台数据
        } catch (Exception e) {
            e.printStackTrace();
            SystemLogger.error("ApplyedServiceList", "获取申请的服务列表失败", ExceptionUtils.getStackTrace(e));
        }
    }

    /**
     * 取消订阅
     * @param request
     * @param response
     */
    @SuppressWarnings("unchecked")
    public void doCancleApply(HttpServletRequest request, HttpServletResponse response) {
        try {
            String applyId = request.getParameter("apply_id");
            int result = serviceSubscription.updateServiceSubscripStatus(applyId, ServiceSubscriptionStatus.CANCALLED);
            //新开发审计，记录API服务取消申请操作
            try {
                //获取API名称 service_name
                Map<String, Object> applyInfo = serviceSubscription.getSubscriptionInfoByID(applyId);
                String service_id = "";
                String service_name = "";
                if (null != applyInfo) {
                    service_id = (String) applyInfo.get("service_id");//申请对应的api服务id
                }
                Map<String, Object> serviceInfo = serviceManage.getServiceInfoById(service_id);
                if (null != serviceInfo) {
                    service_name = (String) serviceInfo.get("service_name");//API服务名称
                }
                //获取用户信息
                Map<String, Object> userInfo = (Map<String, Object>) request.getSession().getAttribute("userInfo");
                UserOperationLog userOperationLog = new UserOperationLog();
                userOperationLog.setLog_lk_id(null);
                userOperationLog.setClient_browser(SystemUtil.getRequestBrowserInfo(request));
                userOperationLog.setClient_code(null);
                userOperationLog.setClient_ip(SystemUtil.getIpAddr(request));
                userOperationLog.setClient_system(SystemUtil.getRequestSystemInfo(request));
                userOperationLog.setClient_type("PC");
                userOperationLog.setCreate_time(new Date());
                userOperationLog.setObj_name(service_name);//API服务名称
                userOperationLog.setObj_type("API");
                userOperationLog.setOp_type("applyCancel");//取消申请
                userOperationLog.setUser_id(String.valueOf(userInfo.get("uid")));
                userOperationLog.setUser_name(String.valueOf(userInfo.get("nick_name")));
                //添加审计日志
                int ret = userOperationLogService.add(userOperationLog);
                if (ret > 0) {
                    log.info("API服务取消申请审计日志添加成功");
                    System.out.println("API服务取消申请审计日志添加成功");
                }
            } catch (Exception e) {
                log.error("API服务取消申请审计日志添加失败", e);
                System.out.println("API服务取消申请审计日志添加失败");
            }
            response.getWriter().write(JsonUtils.convertToString(result));
        } catch (Exception ex) {
            SystemLogger.error("ApplyedServiceList", "doUpdateApply接口失败", ExceptionUtils.getStackTrace(ex));
        }
    }
    
    /**
     * 重新订阅
     * @param request
     * @param response
     */
    @SuppressWarnings("unchecked")
    public void doReApply(HttpServletRequest request, HttpServletResponse response) {
    	try {
    		String applyId = request.getParameter("apply_id");
    		int result = serviceSubscription.updateServiceSubscripStatus(applyId, ServiceSubscriptionStatus.CREATED);
    		//新开发审计，记录API服务取消申请操作
    		try {
    			//获取API名称 service_name
    			Map<String, Object> applyInfo = serviceSubscription.getSubscriptionInfoByID(applyId);
    			String service_id = "";
    			String service_name = "";
    			if (null != applyInfo) {
    				service_id = (String) applyInfo.get("service_id");//申请对应的api服务id
    			}
    			Map<String, Object> serviceInfo = serviceManage.getServiceInfoById(service_id);
    			if (null != serviceInfo) {
    				service_name = (String) serviceInfo.get("service_name");//API服务名称
    			}
    			//获取用户信息
    			Map<String, Object> userInfo = (Map<String, Object>) request.getSession().getAttribute("userInfo");
    			UserOperationLog userOperationLog = new UserOperationLog();
    			userOperationLog.setLog_lk_id(null);
    			userOperationLog.setClient_browser(SystemUtil.getRequestBrowserInfo(request));
    			userOperationLog.setClient_code(null);
    			userOperationLog.setClient_ip(SystemUtil.getIpAddr(request));
    			userOperationLog.setClient_system(SystemUtil.getRequestSystemInfo(request));
    			userOperationLog.setClient_type("PC");
    			userOperationLog.setCreate_time(new Date());
    			userOperationLog.setObj_name(service_name);//API服务名称
    			userOperationLog.setObj_type("API");
    			userOperationLog.setOp_type("ReApply");//取消申请
    			userOperationLog.setUser_id(String.valueOf(userInfo.get("uid")));
    			userOperationLog.setUser_name(String.valueOf(userInfo.get("nick_name")));
    			//添加审计日志
    			int ret = userOperationLogService.add(userOperationLog);
    			if (ret > 0) {
    				log.info("API服务取消申请审计日志添加成功");
    				System.out.println("API服务取消申请审计日志添加成功");
    			}
    		} catch (Exception e) {
    			log.error("API服务取消申请审计日志添加失败", e);
    			System.out.println("API服务取消申请审计日志添加失败");
    		}
    		response.getWriter().write(JsonUtils.convertToString(result));
    	} catch (Exception ex) {
    		SystemLogger.error("ApplyedServiceList", "doUpdateApply接口失败", ExceptionUtils.getStackTrace(ex));
    	}
    }

    /**
     * 根据服务申请id删除申请
     * @param request
     * @param response
     */
    @SuppressWarnings("unchecked")
    public void doDeleteApply(HttpServletRequest request, HttpServletResponse response) {
        try {
            String applyId = request.getParameter("apply_id");
            Map serviceSub = serviceSubscription.getSubscriptionInfoByID(applyId);
            boolean result = false;
            if (serviceSub != null) {
                result = serviceSubscription.deleteServiceSubscription(String.valueOf(serviceSub.get("service_id")),
                        String.valueOf(serviceSub.get("app_id")));
            }
            response.getWriter().write(JsonUtils.convertToString(result));
        } catch (Exception ex) {
            SystemLogger.error("ApplyedServiceList", "doDeleteApply接口失败", ExceptionUtils.getStackTrace(ex));
        }
    }

    /**
     * 我收藏的服务 
     * @param request
     * @param response
     * @throws ParseException 
     */
    public void doMyCollectionService(HttpServletRequest request, HttpServletResponse response) throws ParseException {
        RequestParam param = ParamUtil.getRequestParam(request);
        int draw = ParamUtil.getInteger(request, "draw", 1);
        String uid = String.valueOf(request.getSession().getAttribute("uid"));
        String Object_type = "2";
        String status = "1";
        Map<String, Object> result = new HashMap<String, Object>();
        PaginationList<UserCollection> list = userCollectionService.queryUserCollectionListByPage(uid, Object_type, status, param.getPage(),
                param.getPageSize());
        if (list != null) {
            List<UserCollection> collection_list = list.getRecords();
            for (UserCollection m : collection_list) {
                SimpleDateFormat sf = new SimpleDateFormat("yyyy年MM月dd");
                if (m.getCreateTime() != null) {
                    String date_str = sf.format(m.getCreateTime());
                    //m.setObject_id(date_str);
                    m.setObject_extend_param(date_str);
                }
            }
            result.put("data", list.getRecords());
            result.put("recordsTotal", list.getTotalRecord());
            result.put("recordsFiltered", list.getTotalRecord());
            result.put("draw", draw);
        }
        try {
            response.getWriter().write(JsonUtils.convertToString(result));
        } catch (IOException e) {
            SystemLogger.error("doMyCollectionService", "获取我收藏的服务", ExceptionUtils.getStackTrace(e));
        }
    }

    /**
     * 取消收藏
     * @param request
     * @param response
     * @throws IOException 
     */
    public void doCancleCollection(HttpServletRequest request, HttpServletResponse response) throws IOException {
        int status = ParamUtil.getInteger(request, "status", 1);
        String id = ParamUtil.getString(request, "obj_id", "");
        String obj_type = "2";
        int result = userCollectionService.updateUserCollectionStatusById(status, id, obj_type);
        JSONObject json = new JSONObject();
        if (result > 0) {
            json.put("msg", "已经取消收藏");
        } else {
            json.put("msg", "取消收藏失败 ");
        }
        response.getWriter().write(JsonUtils.convertToString(json));
    }
}
