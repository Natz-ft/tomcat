package com.inspur.data.portal.screen.interact;

import java.io.IOException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.Enumeration;
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

import com.inspur.data.common.exception.DataBaseException;
import com.inspur.data.common.exception.InvalidParametersException;
import com.inspur.data.common.web.PaginationList;
import com.inspur.data.common.web.ParamUtil;
import com.inspur.data.common.web.RequestUtils;
import com.inspur.hsf.config.ServiceFactory;
import com.inspur.portal.model.news.ResNews;
import com.inspur.portal.model.survey.SurveyQuestion;
import com.inspur.portal.model.survey.SurveyQuestionItem;
import com.inspur.portal.model.survey.UserSurvey;
import com.inspur.portal.service.news.ResNewsService;
import com.inspur.portal.service.survey.SurveyQuestionItemService;
import com.inspur.portal.service.survey.SurveyQuestionService;
import com.inspur.portal.service.survey.UserSurveyService;
import com.inspur.utils.AuditLogUtil;
import com.inspur.utils.PortalUtils;
import com.inspur.utils.UCUtil;

public class Index implements ViewHandler {

	private static Log log = LogFactory.getLog(Index.class);

	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String widgetName = request.getParameter("widgetName");
		request.setAttribute("widgetName", widgetName);
		Map<String, Object> userInfo = (Map<String, Object>) request.getSession().getAttribute("userInfo");
		if (userInfo != null) {
			Map userMap = new HashMap();
			userMap = UCUtil.getUser(userInfo.get("user_id").toString());
			request.setAttribute("zxjy_name", userMap.get("nick_name"));
			request.setAttribute("zxjy_email", userMap.get("login_email"));
			request.setAttribute("zxjy_phone", userMap.get("login_phone"));
		}
		int survey_id = 1;

		SurveyQuestionService surveyQuestionService = (SurveyQuestionService) ServiceFactory
				.getService("surveyQuestionService");
		SurveyQuestionItemService surveyQuestionItemService = (SurveyQuestionItemService) ServiceFactory
				.getService("surveyQuestionItemService");
		ArrayList<HashMap<String, Object>> questions = new ArrayList<HashMap<String, Object>>();

		try {
			List<SurveyQuestion> surveyQuestionList = surveyQuestionService.getSurveyQuestionBySurvery_Id(survey_id);
			for (SurveyQuestion surveyQuestion : surveyQuestionList) {
				HashMap<String, Object> map = new HashMap<String, Object>();
				map.put("title", surveyQuestion.getContent());
				List<SurveyQuestionItem> surveyQuestionItemList = null;
				int question_type = surveyQuestion.getQuestion_type();
				if (question_type == 1) {
					surveyQuestionItemList = surveyQuestionItemService
							.getSurveyQuestionItemById(surveyQuestion.getQuestion_id());
					map.put("type", "radio");
				} else if (question_type == 2) {
					// surveyQuestionItemList =
					// surveyQuestionItemService.getSurveyQuestionItemById(surveyQuestion.getQuestion_id());
					// map.put("type", "checkbox");
				} else if (question_type == 3) {
					surveyQuestionItemList = new ArrayList<SurveyQuestionItem>();
					SurveyQuestionItem surveyQuestionItem = new SurveyQuestionItem();
					surveyQuestionItem.setQuestion_id(surveyQuestion.getQuestion_id());
					surveyQuestionItemList.add(surveyQuestionItem);
					map.put("type", "text");
				}
				map.put("items", surveyQuestionItemList);
				questions.add(map);
				request.setAttribute("questions", questions);

			}

		} catch (DataBaseException | InvalidParametersException e) {
			e.printStackTrace();
		} finally {
			//记录页面访问日志
			AuditLogUtil.addPageVisitAutiLog(request, "互动交流", "");
		}
	}

	public void doSurveyAdd(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException, DataBaseException {
		Map<String, Object> map = new HashMap<String, Object>();
		String region_code = (String) request.getSession().getAttribute("area_code");
		if (request.getSession().getAttribute("uid") == null || "".equals(request.getSession().getAttribute("uid"))) {
			map.put("code", "000001");
			map.put("msg", "用户未登录！");
			response.getWriter().write(JsonUtils.convertToString(map));
			return;
		}
		Enumeration<String> names = request.getParameterNames();

		SurveyQuestionService surveyQuestionService = (SurveyQuestionService) ServiceFactory
				.getService("surveyQuestionService");
		SurveyQuestionItemService surveyQuestionItemService = (SurveyQuestionItemService) ServiceFactory
				.getService("surveyQuestionItemService");
		UserSurveyService userSurveyService = (UserSurveyService) ServiceFactory.getService("userSurveyService");

		int uid = Integer.parseInt(request.getSession().getAttribute("uid").toString());
		Timestamp create_time = new Timestamp(new Date().getTime());
		String ip = RequestUtils.getIpAddr(request);
		while (names.hasMoreElements()) {
			String name = names.nextElement();
			String value = request.getParameter(name);

			if (name.startsWith("item_")) {
				UserSurvey userSurvey = new UserSurvey();
				int question_id = Integer.parseInt(name.substring(5));
				userSurvey.setQuestion_id(question_id);

				SurveyQuestion surveyQuestion = surveyQuestionService.getSurveyQuestionByID(question_id);
				int question_type = surveyQuestion.getQuestion_type();
				if (question_type == 1) {
					userSurvey.setChosen(value);
					userSurvey
							.setNote(surveyQuestionItemService.getItemByID(Integer.parseInt(value)).getItem_content());
				} else if (question_type == 2) {
					// map.put("chosen", value);
				} else if (question_type == 3) {
					userSurvey.setNote(value);
				}

				userSurvey.setCreate_time(create_time);
				userSurvey.setSurvey_id(1);
				userSurvey.setUid(uid);
				userSurvey.setIp_addr(ip);
				userSurvey.setSite_code(region_code);
				try {
					userSurveyService.addUserSurvey(userSurvey);
				} catch (InvalidParametersException e) {
					e.printStackTrace();
				}
			}

		}

		map.put("code", "000000");
		map.put("msg", "提交成功！");
		response.getWriter().write(JsonUtils.convertToString(map));
		return;

	}

	public void doAdviceAdd(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException, DataBaseException {
		Map<String, Object> map = new HashMap<String, Object>();

		Object userInfo = request.getSession().getAttribute("userInfo");
		if (userInfo == null || ((Map) userInfo).get("uid") == null
				|| "".equals(((Map) userInfo).get("uid").toString())) {
			map.put("code", "000001");
			map.put("msg", "用户未登录！");
			response.getWriter().write(JsonUtils.convertToString(map));
			return;
		}

		String uid = ((Map) userInfo).get("uid").toString();
		String ctime = StringUtils.getDateTime();
		// 以下几个变量为messageFeedBack的
		String object_title = ParamUtil.getString(request, "object_title", "");
		String content = ParamUtil.getString(request, "content", "");
		String user_name = ParamUtil.getString(request, "user_name", "");
		String user_email = ParamUtil.getString(request, "user_email", "");
		String user_phone = ParamUtil.getString(request, "user_phone", "");
		//
		String site_code = (String) request.getSession().getAttribute("area_code");
		Map<String, Object> param = new HashMap<String, Object>();
		// param.put("audience_type", user_id + ":_:" + user_name);
		param.put("uid", uid);
		param.put("content_type", 2);// //内容类型 1 评论、2留言反馈、3纠错
		param.put("content", content);
		// param.put("ip_addr", 0);
		param.put("create_time", ctime);
		param.put("status", 0);
		param.put("object_title", object_title);
		param.put("user_phone", user_phone);
		param.put("user_email", user_email);
		param.put("user_name", user_name);
		//
		param.put("site_code", site_code);
		try {
			Integer result = PortalUtils.getMessageFeedBackService().addMessageFeedBack(param);
			if (result != null) {
				map.put("code", "000000");
				map.put("msg", "提交成功！");
				response.getWriter().write(JsonUtils.convertToString(map));
			}
		} catch (Exception e) {
			log.error(e);
		}

	}
}
