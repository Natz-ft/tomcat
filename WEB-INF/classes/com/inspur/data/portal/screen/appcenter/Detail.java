package com.inspur.data.portal.screen.appcenter;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.loushang.internet.view.ViewHandler;

import com.inspur.data.common.web.ParamUtil;
import com.inspur.utils.AuditLogUtil;
import com.inspur.utils.OamUtils;

public class Detail implements ViewHandler {
	private static Log log = LogFactory.getLog(Detail.class);
	
	@Override
	public void execute(HttpServletRequest httpservletrequest, HttpServletResponse httpservletresponse)
			throws ServletException, IOException {
		try {
			int app_id = ParamUtil.getInteger(httpservletrequest, "app_id");
			Map<String, Object> param = new HashMap<String, Object>();
			String flag_app="1";
			param.put("flag_app", flag_app);
			param.put("app_id", app_id);
			param.put("install_status", 2);//站点上线应用
			Map AppInfo = OamUtils.getAppService().findOnlineAppInfo(param, 2, 1);
			String appName = String.valueOf(((List<Map<String, Object>>) AppInfo.get("data")).get(0).get("app_name"));
			//记录页面访问日志
			int ret = AuditLogUtil.addObjectVisitAutiLog(httpservletrequest, appName, "", "" + app_id, "APP", "应用商店");
			if (ret > 0) {
				log.info("APP访问审计日志添加成功");
				System.out.println("APP访问审计日志添加成功");
			}
		} catch (Exception e) {
			log.error("APP访问审计日志添加失败", e);
			System.out.println("APP访问审计日志添加失败");
		}
	}

}
