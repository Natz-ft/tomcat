package com.inspur.utils;

import java.util.Calendar;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.inspur.data.common.exception.DataBaseException;
import com.inspur.data.common.exception.InvalidParametersException;
import com.inspur.portal.model.user.UserOperationLog;
import com.inspur.portal.service.user.UserOperationLogService;

/**
 * 
 * <br>
 * <strong>Title :</strong> AutitLogUtil.java
 * <br>
 * <strong>Description : 日志工具类</strong>
 * <br>
 * <strong>For Examples :</strong>
 * <br>
 * <strong>Create on : 2017年9月19日 下午6:16:29<br></strong>
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
public class AuditLogUtil {
	private static Log log = LogFactory.getLog(AuditLogUtil.class);// 日志
	/**
	 * 
	 * <br>
	 * <p>Description: 页面浏览日志
	 * <br>
	 * <a href=mailto:yinyin@inspur.com></a><br>
	 * <p>Date: 2017年9月19日 下午6:16:56<br/>
	 * <p>
	 * @param request
	 * @param obj_name
	 * @param url
	 * @return
	 * @throws DataBaseException
	 * @throws InvalidParametersException   
	 * @see int
	 */
	public static synchronized int addPageVisitAutiLog(HttpServletRequest request, String page_name, String additional){
		try {
			UserOperationLog auditlog = new UserOperationLog();
			auditlog.setLog_lk_id(null);
			auditlog.setClient_browser(SystemUtil.getRequestBrowserInfo(request));
			auditlog.setClient_code(null);
			auditlog.setClient_ip(SystemUtil.getIpAddr(request));
			auditlog.setClient_system(SystemUtil.getRequestSystemInfo(request));
			auditlog.setClient_type("PC");
			auditlog.setCreate_time(Calendar.getInstance().getTime());
	//		auditlog.setObj_id(request.getRequestURI());
	//		auditlog.setObj_name(obj_name);
			auditlog.setObj_type("menu");
			auditlog.setOp_type("visit");// 浏览
			auditlog.setAdditional(additional);
			//auditlog.setPage_title(page_name);
			//auditlog.setPage_url(request.getRequestURL().toString());
			//添加站点code
			auditlog.setSite_code(ConfUtil.getConfValue("global.default_site_code"));
			Map<String, Object> userInfo = (Map<String, Object>) request.getSession().getAttribute("userInfo");
			if (userInfo != null && userInfo.isEmpty() == false) {
				auditlog.setUser_id(String.valueOf(userInfo.get("uid")));
				auditlog.setUser_name(String.valueOf(userInfo.get("nick_name")));
			}
	
			// 添加审计日志
			UserOperationLogService operLog = PortalUtils.getUserOperationLogService();
			return operLog.add(auditlog);
		} catch (Exception e) {
			log.error(e);
			return 0;
		}
	}
	
	/**
	 * 
	 * <br>
	 * <p>Description: 增加某个对象的访问日志
	 * <br>
	 * <a href=mailto:yinyin@inspur.com></a><br>
	 * <p>Date: 2017年9月19日 下午10:25:05<br/>
	 * <p>
	 * @param request
	 * @param obj_name
	 * @param additional
	 * @param obj_id
	 * @param obj_type
	 * @return
	 * @throws DataBaseException
	 * @throws InvalidParametersException   
	 * @see int
	 */
	public static synchronized int addObjectVisitAutiLog(HttpServletRequest request, String obj_name, String additional,String obj_id,String obj_type,String page_title){
		try {
			UserOperationLog auditlog = new UserOperationLog();
			auditlog.setLog_lk_id(null);
			auditlog.setClient_browser(SystemUtil.getRequestBrowserInfo(request));
			auditlog.setClient_code(null);
			auditlog.setClient_ip(SystemUtil.getIpAddr(request));
			auditlog.setClient_system(SystemUtil.getRequestSystemInfo(request));
			auditlog.setClient_type("PC");
			auditlog.setCreate_time(Calendar.getInstance().getTime());
			auditlog.setObj_id(obj_id);
			auditlog.setObj_name(obj_name);
			auditlog.setObj_type(obj_type);
			auditlog.setOp_type("visit");// 浏览
			auditlog.setAdditional(additional);
			//auditlog.setPage_url(request.getRequestURL().toString());
			//auditlog.setPage_title(page_title);
			//添加站点code
			auditlog.setSite_code(ConfUtil.getConfValue("global.default_site_code"));
			Map<String, Object> userInfo = (Map<String, Object>) request.getSession().getAttribute("userInfo");
			if (userInfo != null && userInfo.isEmpty() == false) {
				auditlog.setUser_id(String.valueOf(userInfo.get("uid")));
				auditlog.setUser_name(String.valueOf(userInfo.get("nick_name")));
			}
	
			// 添加审计日志
			UserOperationLogService operLog = PortalUtils.getUserOperationLogService();
			return operLog.add(auditlog);
		} catch (Exception e) {
			log.error(e);
			return 0;
		}
	}
	
	/**
	 * 操作日志
	 * @param request
	 * @param obj_name
	 * @param additional
	 * @param obj_id
	 * @param obj_type
	 * @return
	 * @throws DataBaseException
	 * @throws InvalidParametersException
	 */
	public static synchronized int addObjectOpAutiLog(HttpServletRequest request, String obj_name, String additional,String obj_id,String obj_type,String op_type){
		try {
			UserOperationLog auditlog = new UserOperationLog();
			auditlog.setLog_lk_id(null);
			auditlog.setClient_browser(SystemUtil.getRequestBrowserInfo(request));
			auditlog.setClient_code(null);
			auditlog.setClient_ip(SystemUtil.getIpAddr(request));
			auditlog.setClient_system(SystemUtil.getRequestSystemInfo(request));
			auditlog.setClient_type("PC");
			auditlog.setCreate_time(Calendar.getInstance().getTime());
			auditlog.setObj_id(obj_id);
			auditlog.setObj_name(obj_name);
			auditlog.setObj_type(obj_type);
			auditlog.setOp_type(op_type);// 浏览
			auditlog.setAdditional(additional);
			//auditlog.setPage_url(request.getRequestURI());
			//添加站点code
			auditlog.setSite_code(ConfUtil.getConfValue("global.default_site_code"));
			Map<String, Object> userInfo = (Map<String, Object>) request.getSession().getAttribute("userInfo");
			if (userInfo != null && userInfo.isEmpty() == false) {
				auditlog.setUser_id(String.valueOf(userInfo.get("uid")));
				auditlog.setUser_name(String.valueOf(userInfo.get("nick_name")));
			}
	
			// 添加审计日志
			UserOperationLogService operLog = PortalUtils.getUserOperationLogService();
			return operLog.add(auditlog);
		} catch (Exception e) {
			log.error(e);
			return 0;
		}
	};

}
