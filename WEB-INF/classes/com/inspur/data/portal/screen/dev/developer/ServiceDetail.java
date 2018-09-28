package com.inspur.data.portal.screen.dev.developer;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.exception.ExceptionUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.loushang.internet.util.StringUtils;
import org.loushang.internet.view.ViewHandler;

import com.ctc.wstx.util.StringUtil;
import com.inspur.common.utils.PropertiesUtil;
import com.inspur.data.common.logger.SystemLogger;
import com.inspur.data.common.utils.DateUtil;
import com.inspur.data.common.utils.JsonUtils;
import com.inspur.data.common.web.ParamUtil;
import com.inspur.hsf.config.ServiceFactory;
import com.inspur.paas.api.oam.IServiceDocManageService;
import com.inspur.paas.api.oam.IServiceErrorCodeService;
import com.inspur.paas.api.oam.IServiceLevelManage;
import com.inspur.paas.api.oam.IServiceManageService;
import com.inspur.paas.api.oam.IServiceRespTimeReport;
import com.inspur.portal.model.user.UserCollection;
import com.inspur.portal.model.user.UserOperationLog;
import com.inspur.portal.service.user.UserCollectionService;
import com.inspur.portal.service.user.UserOperationLogService;
import com.inspur.utils.AuditLogUtil;
import com.inspur.utils.DevServiceUtil;
import com.inspur.utils.OamUtils;
import com.inspur.utils.SystemUtil;

import net.sf.json.JSONObject;

public class ServiceDetail implements ViewHandler {
    private static IServiceManageService serviceManage = OamUtils.getServiceManageService();

    private static IServiceErrorCodeService iServiceErrorCodeService = OamUtils.getIServiceErrorCodeService();

    private static IServiceRespTimeReport iServiceRespTimeReport = OamUtils.getIServiceRespTimeReport();


    private static IServiceLevelManage serviceLevelManage =  OamUtils.getServiceLevelManage();
		
	
    private static IServiceDocManageService serviceDocManageService = OamUtils.getIserviceDocManageService();

    private static UserOperationLogService userOperationLogService;
    private static UserCollectionService userCollectionService;
    
    private static Log log = LogFactory.getLog(ServiceDetail.class);
    static {
        
        try {
            userCollectionService = (UserCollectionService) ServiceFactory.getService("userCollectionService");
        } catch (Exception e) {
            SystemLogger.error("Collection", "获取userCollectionService失败", ExceptionUtils.getStackTrace(e));
        }
        try {
            userOperationLogService = (UserOperationLogService) ServiceFactory.getService("userOperationLogService");
        } catch (Exception e) {
            SystemLogger.error("UserOperationLogService", "初始化UserOperationLogService接口服务失败", ExceptionUtils.getMessage(e));
        }
    }

    public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String service_id = ParamUtil.getString(request, "service_id", "");
        try {
            @SuppressWarnings("unchecked")
            Map<String, Object> serviceInfo = serviceManage.getServiceInfoById(service_id);
            if (serviceInfo != null && null != serviceInfo.get("additional_info")) {
                JSONObject add_info = JSONObject.fromObject(serviceInfo.get("additional_info").toString());
                serviceInfo.put("add_info", add_info);
            }
            SystemLogger.info("API详情页面", "API详情查询结果：" + serviceInfo);
            request.setAttribute("serviceInfo", serviceInfo);
            //request.setAttribute("authUrl", PropertiesUtil.getValue("config.properties", "apiUrl"));
            //错误代码列表
            //1系统级别错误代码
            Map<String, Object> param = new HashMap<String, Object>();
            param.put("service_id", "0");
            List<Map<String, Object>> listSystem = iServiceErrorCodeService.getServiceErrorCodeList(param);
            request.setAttribute("systemErrorCode", listSystem);
            SystemLogger.info("API详情页面", "API系统级别错误查询结果：" + listSystem);
            //2.服务级别错误代码
            param.put("service_id", service_id);
            List<Map<String, Object>> listService = iServiceErrorCodeService.getServiceErrorCodeList(param);
            request.setAttribute("serviceErrorCode", listService);
            SystemLogger.info("API详情页面", "API服务级别错误查询结果：" + serviceInfo);
            //查询服务请求限制等级
            @SuppressWarnings("rawtypes")
            List<Map> allServiceLevel = serviceLevelManage.getAllServiceLevel(null, null, null);
            SystemLogger.info("API详情页面", "API请求限制等级查询结果：" + allServiceLevel);
            request.setAttribute("servceLevelList", allServiceLevel);
            //服务申请url
            request.setAttribute("odWebUrl", PropertiesUtil.getValue("conf.properties", "global.index.odweb"));
            //用户是否已收藏
            Map<String, Object> userInfo = (Map<String, Object>) request.getSession().getAttribute("userInfo");
			// 新开发审计，记录API服务访问操作
			try {
				// 获取API名称 service_name
				String service_name = (String) serviceInfo.get("service_name");// API服务名称
				/*UserOperationLog userOperationLog = new UserOperationLog();
				userOperationLog.setLog_lk_id(null);
				userOperationLog.setClient_browser(SystemUtil.getRequestBrowserInfo(request));
				userOperationLog.setClient_code(null);
				userOperationLog.setClient_ip(SystemUtil.getIpAddr(request));
				userOperationLog.setClient_system(SystemUtil.getRequestSystemInfo(request));
				userOperationLog.setClient_type("PC");
				userOperationLog.setCreate_time(new Date());
				userOperationLog.setObj_id(service_id);
				userOperationLog.setObj_name(service_name);// API服务名称
				userOperationLog.setObj_type("API");
				userOperationLog.setOp_type("visit");// 访问
				userOperationLog.setUser_id(String.valueOf(userInfo == null ? "" : userInfo.get("uid")));
				userOperationLog.setUser_name(String.valueOf(userInfo == null ? "" : userInfo.get("nick_name")));*/
				//记录页面访问日志
				int ret = AuditLogUtil.addObjectVisitAutiLog(request, service_name, "", service_id, "API", "API超市");
				if (ret > 0) {
					log.info("API服务访问审计日志添加成功");
					System.out.println("API服务访问审计日志添加成功");
				}
			} catch (Exception e) {
				log.error("API服务访问审计日志添加失败", e);
				System.out.println("API服务访问审计日志添加失败");
			}
            if (null != userInfo && !userInfo.isEmpty()) {
                Integer uid = (Integer) userInfo.get("uid");
                //判断用户是否已经收藏
                Map<String, Object> paramMap = new HashMap<String, Object>();
                paramMap.put("object_id", service_id);
                paramMap.put("object_type", "2");
                paramMap.put("uid", uid);
                paramMap.put("status", "1");
                List<UserCollection> userCollectionList = userCollectionService.queryUserCollectionList(paramMap);
                if (null != userCollectionList && !userCollectionList.isEmpty()) {
                    request.setAttribute("isCollection", "1");
                } else {
                    request.setAttribute("isCollection", "0");
                }
            } else {
                request.setAttribute("isCollection", "0");
            }
            Map<String, Object> serviceUsage = new HashMap<String, Object>();
            serviceUsage.put("service_id", serviceInfo.get("service_id"));
            List<Map<String, Object>> docList = serviceDocManageService.getServiceDocList(serviceUsage);
            if (null != docList && docList.size() > 0) {
                request.setAttribute("servicDoc", docList.get(0));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * 服务质量
     * <br/>
     * <p>Description: TODO
     * <br/>
     * <p>Author: <a href="mailto:zhang_hy@inspur.com">张华蕴</a><br/>
     * <p>Date: 2016年6月23日-下午6:00:31<br/>
     * <p>
     * @param request
     * @param response
     * @throws ServletException
     * @throws IOException   
     *
     */
    @SuppressWarnings({"rawtypes", "static-access" })
    public void doGetRespData(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            String service_id = request.getParameter("service_id");
            //统计周期，按月或者按周
            SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
            Date date = new Date();
            String dayDate = sdf.format(date);//今天日期
            Calendar calendar = new GregorianCalendar();
            calendar.setTime(date);
            Calendar calendar2 = new GregorianCalendar();
            calendar2.setTime(date);
            calendar2.add(calendar.DATE, -29);//把日期往前推29天，获取最近一个月的数据
            Date date_month = calendar2.getTime();
            String monthDate = sdf.format(date_month);
            List<Map<String, Object>> itemList = new ArrayList<Map<String, Object>>();
            //查看最近一个月响应时间统计
            List<Map> list = iServiceRespTimeReport.getDayRespTime(service_id, Integer.valueOf(monthDate).intValue(), Integer.valueOf(dayDate)
                    .intValue());
            for (int j = 0; j < 30; j++) {
                Calendar cal = Calendar.getInstance();
                cal.add(Calendar.DATE, -j);
                String dateStr = DateUtil.date2String(cal.getTime(), "yyyyMMdd");
                Map<String, Object> temp = new HashMap<String, Object>();
                if (list != null && list.size() > 0) {
                    boolean flag = false;
                    for (int i = 0; i < list.size(); i++) {
                        if (dateStr.equals(String.valueOf(list.get(i).get("period")))) {
                            temp.put("name", list.get(i).get("period"));
                            temp.put("count", list.get(i).get("avg_time"));
                            itemList.add(temp);
                            flag = true;
                            break;
                        }
                    }
                    if (!flag) {
                        temp.put("name", dateStr);
                        temp.put("count", 0);
                        itemList.add(temp);
                    }
                } else {
                    temp.put("name", dateStr);
                    temp.put("count", 0);
                    itemList.add(temp);
                }
            }
            SystemLogger.info("API详情页面", "API服务质量查询结果：" + itemList);
            response.getWriter().write(JsonUtils.convertToString(itemList));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * 用户收藏API 000000  收藏成功
     * <br/>
     * <p>Description: TODO
     * <br/>
     * <p>Author: <a href="mailto:zhang_hy@inspur.com">张华蕴</a><br/>
     * <p>Date: 2016年11月8日-下午10:34:13<br/>
     * <p>
     * @param request
     * @param response
     * @throws ServletException
     * @throws IOException   
     *
     */
    @SuppressWarnings("unchecked")
    public void doCollection(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        UserCollection userCollection = new UserCollection();
        try {
            Map<String, String> map = new HashMap<String, String>();
            Map<String, Object> userInfo = (Map<String, Object>) request.getSession().getAttribute("userInfo");
            if (userInfo != null) {
                int obj_type = ParamUtil.getInteger(request, "obj_type", 1);
                String obj_id = ParamUtil.getString(request, "id", "");
                String object_name = ParamUtil.getString(request, "obj_name", "");
                Integer uid = (Integer) userInfo.get("uid");
                //判断用户是否已经收藏
                Map<String, Object> paramMap = new HashMap<String, Object>();
                paramMap.put("object_id", obj_id);
                paramMap.put("object_type", obj_type);
                paramMap.put("uid", uid);
                paramMap.put("status", "1");
                List<UserCollection> userCollectionList = userCollectionService.queryUserCollectionList(paramMap);
                if (null == userCollectionList || userCollectionList.isEmpty()) {
                    // Integer uid = "1";
                    if (obj_type != 0 && obj_id != null) {
                        userCollection.setObject_id(obj_id);
                        userCollection.setUid(uid);
                        // 1，目录，2API 3:应用
                        userCollection.setObject_type(obj_type);
                        userCollection.setCreateTime(new Date());
                        userCollection.setObject_extend_param("setObject_extend_param");
                        userCollection.setObject_name(object_name);
                        userCollection.setStatus(1);
                        int result = userCollectionService.addUserCollection(userCollection);
                        if (result > 0) {
                            map.put("fav_id", String.valueOf(obj_id));
                            map.put("code", "000000");
                            map.put("msg", "收藏成功！");
                            //新开发审计，记录API服务收藏操作
                            try {
                                //获取API名称 service_name
                                String service_name = object_name;//API服务名称
                                UserOperationLog userOperationLog = new UserOperationLog();
                                userOperationLog.setLog_lk_id(null);
                                userOperationLog.setClient_browser(SystemUtil.getRequestBrowserInfo(request));
                                userOperationLog.setClient_code(null);
                                userOperationLog.setClient_ip(SystemUtil.getIpAddr(request));
                                userOperationLog.setClient_system(SystemUtil.getRequestSystemInfo(request));
                                userOperationLog.setClient_type("PC");
                                userOperationLog.setCreate_time(new Date());
                                userOperationLog.setObj_id(obj_id);
                                userOperationLog.setObj_name(service_name);//API服务名称
                                userOperationLog.setObj_type("API");
                                userOperationLog.setOp_type("fav");//收藏
                                userOperationLog.setUser_id(String.valueOf(userInfo.get("uid")));
                                userOperationLog.setUser_name(String.valueOf(userInfo.get("nick_name")));
                                //添加审计日志
                                int ret = userOperationLogService.add(userOperationLog);
                                if (ret > 0) {
                                    log.info("API服务收藏审计日志添加成功");
                                    System.out.println("API服务收藏审计日志添加成功");
                                }
                            } catch (Exception e) {
                                log.error("API服务收藏审计日志添加失败", e);
                                System.out.println("API服务收藏审计日志添加失败");
                            }
                        } else {
                            map.put("code", "000005");
                            map.put("msg", "收藏失败，请稍后再试");
                        }
                    } else {
                        map.put("code", "000002");
                        map.put("msg", "收藏信息不完整！");
                    }
                } else {
                    map.put("code", "999999");
                    map.put("msg", "已收藏,请勿重新收藏！");
                }
            } else {
                map.put("code", "000001");
                map.put("msg", "用户未登录,请先登录！");
            }
            response.getWriter().write(JsonUtils.convertToString(map));// 返回前台数据
        } catch (Exception e) {
            SystemLogger.error("ServiceDetail", "保存用户 收藏信息失败", ExceptionUtils.getMessage(e));
        }
    }

    /**
     * 用户取消收藏  000000  取消成功 
     * <br/>
     * <p>Description: TODO
     * <br/>
     * <p>Author: <a href="mailto:zhang_hy@inspur.com">张华蕴</a><br/>
     * <p>Date: 2016年11月8日-下午10:34:25<br/>
     * <p>
     * @param request
     * @param response
     * @throws ServletException
     * @throws IOException   
     *
     */
    @SuppressWarnings("unchecked")
    public void doCancelCollection(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            Map<String, String> map = new HashMap<String, String>();
            Map<String, Object> userInfo = (Map<String, Object>) request.getSession().getAttribute("userInfo");
            if (userInfo != null) {
                String obj_type = ParamUtil.getString(request, "obj_type", "1");
                String obj_id = ParamUtil.getString(request, "id");
                String uid = userInfo.get("uid").toString();
                if (StringUtils.isNotEmpty(obj_id) || StringUtils.isNotEmpty(obj_type)) {
                    int result = userCollectionService.deleteUserCollection(obj_id, obj_type, uid);
                    if (result > 0) {
                        map.put("code", "000000");
                        map.put("msg", "取消收藏成功！");
                        //新开发审计，记录API服务取消收藏操作
                        try {
                            //获取API名称 service_name
                            Map<String, Object> serviceInfo = serviceManage.getServiceInfoById(obj_id);
                            String service_name = (String) serviceInfo.get("service_name");//API服务名称
                            UserOperationLog userOperationLog = new UserOperationLog();
                            userOperationLog.setLog_lk_id(null);
                            userOperationLog.setClient_browser(SystemUtil.getRequestBrowserInfo(request));
                            userOperationLog.setClient_code(null);
                            userOperationLog.setClient_ip(SystemUtil.getIpAddr(request));
                            userOperationLog.setClient_system(SystemUtil.getRequestSystemInfo(request));
                            userOperationLog.setClient_type("PC");
                            userOperationLog.setCreate_time(new Date());
                            userOperationLog.setObj_id(obj_id);
                            userOperationLog.setObj_name(service_name);//API服务名称
                            userOperationLog.setObj_type("API");
                            userOperationLog.setOp_type("favCancel");//收藏
                            userOperationLog.setUser_id(String.valueOf(userInfo.get("uid")));
                            userOperationLog.setUser_name(String.valueOf(userInfo.get("nick_name")));
                            //添加审计日志
                            int ret = userOperationLogService.add(userOperationLog);
                            if (ret > 0) {
                                log.info("API服务取消收藏审计日志添加成功");
                                System.out.println("API服务取消收藏审计日志添加成功");
                            }
                        } catch (Exception e) {
                            log.error("API服务取消收藏审计日志添加失败", e);
                            System.out.println("API服务取消收藏审计日志添加失败");
                        }
                    } else {
                        map.put("code", "000005");
                        map.put("msg", "取消收藏失败！");
                    }
                } else {
                    map.put("code", "000002");
                    map.put("msg", "提交取消收藏信息不完整！");
                }
            } else {
                map.put("code", "000001");
                map.put("msg", "用户未登录，请先登录！");
            }
            response.getWriter().write(JsonUtils.convertToString(map));// 返回前台数据
        } catch (Exception e) {
            SystemLogger.error("ServiceDetail", "保存用户 取消收藏信息失败", ExceptionUtils.getMessage(e));
        }
    }
}
