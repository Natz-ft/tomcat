package com.inspur.data.portal.screen.interact;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.loushang.internet.view.ViewHandler;

import com.inspur.data.common.exception.DataBaseException;
import com.inspur.data.common.exception.InvalidParametersException;
import com.inspur.hsf.config.ServiceFactory;
import com.inspur.portal.model.survey.SurveyQuestion;
import com.inspur.portal.model.survey.SurveyQuestionItem;
import com.inspur.portal.service.survey.SurveyQuestionItemService;
import com.inspur.portal.service.survey.SurveyQuestionService;
import com.inspur.portal.service.survey.UserSurveyService;
import com.inspur.utils.JsonUtils;
import com.inspur.utils.UCUtil;

public class QuestionStatistics implements ViewHandler {
	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		int survey_id = 1;

		SurveyQuestionService surveyQuestionService = (SurveyQuestionService) ServiceFactory
				.getService("surveyQuestionService");
		SurveyQuestionItemService surveyQuestionItemService = (SurveyQuestionItemService) ServiceFactory
				.getService("surveyQuestionItemService");
		UserSurveyService userSurveyService = (UserSurveyService) ServiceFactory
				.getService("userSurveyService");
		ArrayList<HashMap<String, Object>> questions = new ArrayList<HashMap<String, Object>>();

		try {
			List<SurveyQuestion> surveyQuestionList = surveyQuestionService.getSurveyQuestionBySurvery_Id(survey_id);
			for (SurveyQuestion surveyQuestion : surveyQuestionList) {
				HashMap<String, Object> map = new HashMap<String, Object>();
				List<SurveyQuestionItem> surveyQuestionItemList = null;
				int question_type = surveyQuestion.getQuestion_type();
				if (question_type == 1) {
					if(surveyQuestion.getQuestion_id().toString().equals("2")){
						map.put("title", "demand");
					}else if(surveyQuestion.getQuestion_id().toString().equals("5")){
						map.put("title", "usertype");
					}else if(surveyQuestion.getQuestion_id().toString().equals("6")){
						map.put("title", "dataformat");
					}else if(surveyQuestion.getQuestion_id().toString().equals("7")){
						map.put("title", "purpose");
					}
					ArrayList<Map<String, Object>> items = new ArrayList<Map<String, Object>>();
					surveyQuestionItemList = surveyQuestionItemService
							.getSurveyQuestionItemById(surveyQuestion.getQuestion_id());
					for (SurveyQuestionItem surveyQuestionItem : surveyQuestionItemList) {
						Map<String, Object> itemsMap=new HashMap<String, Object>();
						itemsMap.put("item_id", surveyQuestionItem.getItem_id());
						itemsMap.put("name", surveyQuestionItem.getItem_content());
						int question_id=surveyQuestionItem.getItem_id();
						int amount=userSurveyService.getCountBychosen(question_id);
						itemsMap.put("amount", amount);
						items.add(itemsMap);
					}
					map.put("items", items);
					questions.add(map);
					request.setAttribute(map.get("title").toString(), JsonUtils.convertToString(map.get("items")));
				}
				
			}
		} catch (DataBaseException | InvalidParametersException e) {
			e.printStackTrace();
		}
	}
}
