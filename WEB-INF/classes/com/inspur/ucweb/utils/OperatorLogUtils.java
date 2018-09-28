package com.inspur.ucweb.utils;

import java.util.Date;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.exception.ExceptionUtils;

import com.inspur.data.common.exception.DataBaseException;
import com.inspur.data.common.exception.InvalidParametersException;
import com.inspur.data.common.web.RequestUtils;
import com.inspur.data.common.logger.SystemLogger;
import com.inspur.hsf.config.ServiceFactory;
import com.inspur.uc.api.audit.AuditLog;
import com.inspur.uc.api.audit.AuditLogService;
import com.inspur.ucweb.utils.UcServiceUtil;
import com.inspur.utils.UserUtils;

public class OperatorLogUtils {
	private static AuditLogService auditLogService = UserUtils.getAuditLogService();
	/**
	 * 添加操作日志
	 * <br>
	 * <p>Description: 
	 * <br>
	 * <p>Date: 2015年3月27日 上午10:41:57<br/>
	 * <p>
	 * @param op_module 操作模块
	 * @param resultMsg 操作结果
	 * @see void
	 */
	public static void writeOperatorLog(HttpServletRequest request,ModelType op_module,ResultMsg resultMsg){
		try {
			AuditLog auditLog = new AuditLog();
			auditLog.setClient_ip(RequestUtils.getIpAddr(request));
			auditLog.setOp_time(new Date());
			HttpSession session = request.getSession();
			Map userInfo = (Map) session.getAttribute("userInfo");
//			auditLog.setUser_id(SystemUtils.getOperatorId(request));
//			auditLog.setUser_name(SystemUtils.getOperator(request).getUser_name());
			auditLog.setUser_id(Integer.parseInt(String.valueOf(userInfo.get("uid"))));
			auditLog.setUser_name(String.valueOf(userInfo.get("user_id")));
			auditLog.setOp_content(resultMsg.toString());
			auditLog.setOp_module(op_module.toString());
			
			StackTraceElement stack[] = (new Throwable()).getStackTrace();
			String op_method = "";
			String op_action = "";
			if(stack.length>2){
				op_action = stack[1].getClassName();
				op_method = stack[1].getMethodName();
			}
			auditLog.setOp_action(op_action);
			auditLog.setOp_method(op_method);
			auditLog.setOp_param(request.getParameterMap().toString());
			//添加日志
			auditLogService.add(auditLog);
		} catch (DataBaseException e) {
			e.printStackTrace();
		} catch (InvalidParametersException e) {
			e.printStackTrace();
		}
	}
}
