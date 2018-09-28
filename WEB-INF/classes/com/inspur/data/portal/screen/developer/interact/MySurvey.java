package com.inspur.data.portal.screen.developer.interact;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.loushang.internet.util.JsonUtils;
import org.loushang.internet.view.ViewHandler;

import com.inspur.data.common.web.ParamUtil;
import com.inspur.data.portal.screen.interact.DataTable;
import com.inspur.utils.AuditLogUtil;
import com.inspur.utils.PortalUtils;

public class MySurvey extends DataTable implements ViewHandler {

	public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		//记录页面访问日志
		AuditLogUtil.addPageVisitAutiLog(request, "个人中心", "");
	}

	public void doGetMySurvey(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		Object uid = request.getSession().getAttribute("uid");
		Map<String, String> map_res = new HashMap<String, String>();
		if (uid == null || "".equals(uid.toString())) {
			map_res.put("code", "000001");
			map_res.put("msg", "用户未登录！");
			response.getWriter().write(JsonUtils.convertToString(map_res));
			return;
		}

		int page = ParamUtil.getInteger(request, "page", 1);
		int pageSize = ParamUtil.getInteger(request, "pageSize", 10);

		List<List<Map<String, Object>>> all = doGetSurveyAnswerByUid(uid.toString());

		List<List<Map<String, Object>>> list = new ArrayList<List<Map<String, Object>>>();
		for (int i = (page - 1) * pageSize; i < page * pageSize; i++) {
			if (i < all.size()) {
				list.add(all.get(i));
			}
		}

		int count = all.size();
		String res = "";
		String draw = request.getParameter("draw");
		draw = draw == null || draw == "" ? "0" : draw;
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("page", page);
		map.put("pageSize", pageSize);
		map.put("recordsTotal", count);
		map.put("recordsFiltered", count);
		map.put("draw", Integer.parseInt(draw));
		map.put("data", list);
		try {
			res = JsonUtils.convertToString(map);
			response.getWriter().write(res);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	// 获取一个用户所有的问卷调查答案详情
	public List<List<Map<String, Object>>> doGetSurveyAnswerByUid(String uid) {
		String sql = "select create_time from user_survey where uid = " + uid
				+ " group by create_time order by create_time desc ";
		List<Map<String, Object>> t_list = PortalUtils.getUserSurveyService().doSql(sql);

		List<List<Map<String, Object>>> res = new ArrayList<List<Map<String, Object>>>();
		for (Map<String, Object> t_map : t_list) {
			String create_time = t_map.get("create_time").toString();
			sql = "select u.note, u.survey_id, s.survey_name, u.create_time, q.title " + " from user_survey u "
					+ " join survey_info s on u.survey_id = s.survey_id "
					+ " join survey_question q on u.question_id = q.question_id and u.survey_id = q.survey_id "
					+ " where u.create_time = '" + create_time + "' and u.uid = " + uid;

			List<Map<String, Object>> list = PortalUtils.getUserSurveyService().doSql(sql);

			if (list != null && list.size() > 0) {
				res.add(list);
			}

		}
		return res;
	}

	/**
	 * 移动端应用提供我的需求接口
	 * 
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	public void doGetMySurveyForAndroid(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		Object uid = request.getSession().getAttribute("uid");
		Map<String, String> map_res = new HashMap<String, String>();
		if (uid == null || "".equals(uid.toString())) {
			map_res.put("code", "000001");
			map_res.put("msg", "用户未登录！");
			response.getWriter().write(JsonUtils.convertToString(map_res));
			return;
		}

		int page = ParamUtil.getInteger(request, "page", 1);
		int pageSize = ParamUtil.getInteger(request, "pageSize", 10);
		List<List<Map<String, Object>>> all = doGetSurveyAnswerByUid(uid.toString());

		List<List<Map<String, Object>>> list = new ArrayList<List<Map<String, Object>>>();
		for (int i = (page - 1) * pageSize; i < page * pageSize; i++) {
			if (i < all.size()) {
				list.add(all.get(i));
			}
		}
		int count = all.size();
		int totalPage = (count + pageSize - 1) / pageSize;
		String res = "";
		String draw = request.getParameter("draw");
		draw = draw == null || draw == "" ? "0" : draw;
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("page", page);
		map.put("pageSize", pageSize);
		map.put("recordsTotal", count);
		map.put("recordsFiltered", count);
		map.put("totalPage", totalPage);
		map.put("draw", Integer.parseInt(draw));
		map.put("data", list);
		try {
			res = JsonUtils.convertToString(map);
			response.getWriter().write(res);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
