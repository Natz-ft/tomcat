package com.inspur.data.portal.screen.developer.interact;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.loushang.internet.util.JsonUtils;
import org.loushang.internet.view.ViewHandler;

import com.inspur.data.common.exception.DataBaseException;
import com.inspur.data.common.exception.InvalidParametersException;
import com.inspur.data.common.web.PaginationList;
import com.inspur.data.common.web.ParamUtil;
import com.inspur.data.portal.screen.interact.DataTable;
import com.inspur.portal.model.user.UserCollection;
import com.inspur.portal.model.user.UserOperationLog;
import com.inspur.utils.AuditLogUtil;
import com.inspur.utils.ConfUtil;
import com.inspur.utils.OamUtils;
import com.inspur.utils.PortalUtils;
import com.inspur.utils.SystemUtil;

public class MyCollectionApi extends DataTable implements ViewHandler {

	public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		Object uid = request.getSession().getAttribute("uid");
		if (uid == null || "".equals(uid.toString())) {
			request.setAttribute("count", 0);
			request.setAttribute("code", "000001");
			return;
		}

		int page = ParamUtil.getInteger(request, "page", 1);
		int pageSize = ParamUtil.getInteger(request, "pageSize", 10);
		String type = ParamUtil.getString(request, "type", "3");

		PaginationList<UserCollection> list = PortalUtils.getUserCollectionService()
				.queryUserCollectionListByPage(uid.toString(), type, null, page, pageSize);
		int count = list.getTotalRecord();
		request.setAttribute("count", count);
		request.setAttribute("current_page", page);

		List<UserCollection> collection_list = list.getRecords();

		List<String> app_list = new ArrayList<String>();

		if (collection_list == null || collection_list.size() <= 0) {
			return;
		}
		for (UserCollection m : collection_list) {
			app_list.add(m.getObject_id());
		}
		Map<String, Object> appInfoMap = new HashMap<String, Object>();
		Map paramMap = new HashMap();
		paramMap.put("app_ids", app_list);
		String flag_app = "1";
		paramMap.put("flag_app", flag_app);
		paramMap.put("install_status", 2);//站点上线应用
		try {
			appInfoMap = OamUtils.getAppService().findOnlineAppInfo(paramMap, pageSize, 1);

		} catch (Exception e) {
			e.printStackTrace();
		}

		List<Map<String, Object>> dataList = (List<Map<String, Object>>) appInfoMap.get("data");

		List<Map<String, Object>> resultList = new ArrayList<Map<String, Object>>();
		for (Map<String, Object> dataMap : dataList) {
			SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			if (dataMap != null && dataMap.get("create_time") != null) {
				String create_time = dataMap.get("create_time").toString();
				long time = Long.parseLong(create_time + "000");
				Date date = new Date(time);
				String date_str = sf.format(date);
				dataMap.put("create_time", date_str);
			}

			if (null != dataMap && dataMap.containsKey("app_icon")) {
				String icon = (String) dataMap.get("app_icon");
				String logoUrl = "";
				logoUrl = ConfUtil.getConfValue("global.index.rcservice") + "/doc?doc_id=" + icon;
				dataMap.put("logoUrl", logoUrl);
				resultList.add(dataMap);
			}
		}

		request.setAttribute("app_list", resultList);
		//记录页面访问日志
		AuditLogUtil.addPageVisitAutiLog(request, "个人中心", "");
	}

	// 取消收藏
	public void doDelCollection(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException, InvalidParametersException {
		Map<String, Object> userInfo = (Map<String, Object>) request.getSession().getAttribute("userInfo");
		Map<String, Object> appInfoMap = new HashMap<String, Object>();

		String app_id = request.getParameter("id");
		String type = request.getParameter("type");
		Object uid = request.getSession().getAttribute("uid");

		Map<String, String> map_res = new HashMap<String, String>();
		try {
			appInfoMap = OamUtils.getAppService().getAppInfoByAppId(app_id);

		} catch (Exception e) {
			e.printStackTrace();
		}
		if (uid == null || "".equals(uid.toString())) {
			map_res.put("code", "000001");
			map_res.put("msg", "用户未登录！");
			response.getWriter().write(JsonUtils.convertToString(map_res));
			return;
		}
		int del_num = PortalUtils.getUserCollectionService().deleteUserCollection(app_id, type, uid.toString());
		if (del_num != 0) {
			try {
				UserOperationLog userOperationLog = new UserOperationLog();
				userOperationLog.setLog_lk_id(null);
				userOperationLog.setClient_browser(SystemUtil.getRequestBrowserInfo(request));
				userOperationLog.setClient_code(null);
				userOperationLog.setClient_ip(SystemUtil.getIpAddr(request));
				userOperationLog.setClient_type("PC");
				userOperationLog.setCreate_time(new Date());
				userOperationLog.setClient_system(SystemUtil.getRequestSystemInfo(request));
				userOperationLog.setObj_type("app");
				userOperationLog.setObj_id(app_id);
				System.out.println(userInfo);
				userOperationLog.setUser_name(userInfo.get("user_id").toString());
				userOperationLog.setOp_type("favCancel");
				userOperationLog.setUser_id(uid.toString());
				userOperationLog.setObj_name(appInfoMap.get("app_name").toString());
				String site_code=request.getSession().getAttribute("area_code").toString();
	            if(StringUtils.isNotEmpty(site_code)){
	           	 userOperationLog.setSite_code(site_code);
	            }
				PortalUtils.getUserOperationLogService().add(userOperationLog);
			} catch (Exception e) {
				e.printStackTrace();
			}
			map_res.put("code", "000000");
			map_res.put("msg", "取消成功！");
		} else {
			map_res.put("code", "000002");
			map_res.put("msg", "取消失败！");
		}
		response.getWriter().write(JsonUtils.convertToString(map_res));
	}

	/**
	 * 移动应用提供我收藏的应用
	 * 
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	public void doGetMyCorrectionApp(HttpServletRequest request, HttpServletResponse response) throws IOException {
		Object uid = request.getSession().getAttribute("uid");
		if (uid == null || "".equals(uid.toString())) {
			request.setAttribute("count", 0);
			return;
		}

		int page = ParamUtil.getInteger(request, "page", 1);
		int pageSize = ParamUtil.getInteger(request, "pageSize", 10);
		String type = ParamUtil.getString(request, "type", "3");

		PaginationList<Map<String, Object>> newlist = new PaginationList<Map<String, Object>>();
		PaginationList<UserCollection> list = PortalUtils.getUserCollectionService()
				.queryUserCollectionListByPage(uid.toString(), type, null, page, pageSize);

		List<UserCollection> collection_list = list.getRecords();
		List<Map<String, Object>> api_list = new ArrayList<Map<String, Object>>();

		if (collection_list == null) {
			return;
		}
		for (UserCollection m : collection_list) {
			String api_id = m.getObject_id();
			Map<String, Object> api = new HashMap<String, Object>();
			Map<String, Object> app = new HashMap<String, Object>();
			try {
				api = OamUtils.getAppService().getAppInfoByAppId(api_id);
			} catch (Exception e) {
				e.printStackTrace();
			}
			if (api == null) {
				api = new HashMap<String, Object>();
			}
			api.put("collection_id", m.getId());
			api_list.add(api);
		}
		newlist.setCurrPage(list.getCurrPage());
		newlist.setPageSize(list.getPageSize());
		newlist.setRecords(api_list);
		newlist.setTotalPage(list.getTotalPage());
		newlist.setTotalRecord(list.getTotalRecord());
		response.getWriter().write(JsonUtils.convertToString(newlist));
	}
}
