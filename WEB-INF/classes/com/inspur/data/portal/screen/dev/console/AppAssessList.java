package com.inspur.data.portal.screen.dev.console;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.exception.ExceptionUtils;
import org.loushang.internet.util.JsonUtils;
import org.loushang.internet.view.ViewHandler;

import com.inspur.api.ac.IAppEvaluateService;
import com.inspur.api.ac.IAppService;
import com.inspur.api.ac.IDeveloperService;
import com.inspur.data.common.logger.SystemLogger;
import com.inspur.data.common.web.PaginationList;
import com.inspur.data.common.web.ParamUtil;
import com.inspur.hsf.config.ServiceFactory;
import com.inspur.portal.model.interact.MessageFeedBack;
import com.inspur.portal.service.interact.MessageFeedBackService;
import com.inspur.uc.api.user.IUserDomain;
import com.inspur.utils.AuditLogUtil;
import com.inspur.utils.DevServiceUtil;
import com.inspur.utils.OamUtils;
import com.inspur.utils.PortalUtils;
import com.inspur.utils.UCUtil;
import com.inspur.utils.UserUtils;

/**
 * 应用评价
 * <br>
 * <strong>Title :</strong> AppAssessList.java
 * <br>
 * <strong>Description : </strong>
 * <br>
 * <strong>For Examples :</strong>
 * <br>
 * <strong>Create on : 2016年6月15日 上午10:20:33<br></strong>
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
public class AppAssessList implements ViewHandler {
	
	private static IAppService appService = OamUtils.getAppService();
	private static IDeveloperService developerService = OamUtils.getDeveloperService();
	private static IAppEvaluateService appEvaluateService = OamUtils.getAppEvaluateService();
	private static IUserDomain userDomain;
	private static MessageFeedBackService messageFeedBackService;
	static {
		try {
			userDomain = UserUtils.getUserDomain();
		} catch (Exception e) {
			SystemLogger.error("IUserDomain", "获取IUserDomain接口失败", ExceptionUtils.getStackTrace(e));
		}
		try {
			//messageFeedBackService = (MessageFeedBackService) ServiceFactory.getService("messageFeedBackService");
			messageFeedBackService = PortalUtils.getMessageFeedBackService();
		} catch (Exception e) {
			SystemLogger.error("MessageFeedBackService", "获取MessageFeedBackService接口失败", ExceptionUtils.getStackTrace(e));
		}
	}

	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		//记录页面访问日志
		AuditLogUtil.addPageVisitAutiLog(request, "开发者控制台", "");
	}
	
	/**
	 * 分页获取应用列表
	 * <br>
	 * <p>Description: 
	 * <br> <a href=mailto:miaozhq@inspur.com></a><br>
	 * <p>Date: 2016年6月15日 下午6:55:05<br/>
	 * <p>
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException   
	 * @see void
	 */
	public void doQueryAppList(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException{
		try{
			 int page = ParamUtil.getInteger(request, "page");
			 int pageSize = ParamUtil.getInteger(request, "pageSize");
			 String uid = String.valueOf(request.getSession().getAttribute("uid"));
			 if(uid != null){
				 int developer_id = 0;;
				 Map developer = developerService.getAppDeveloperByUserId(uid);
				 if(developer != null && developer.containsKey("id")){
					 developer_id = Integer.parseInt(developer.get("id").toString());
				 }
				 Map<String, Object> filterMap = new HashMap<String, Object>();
				 filterMap.put("developer_id", developer_id);
				 String flag_app="1";
				 filterMap.put("flag_app", flag_app);
				 
				 Map<String, Object> appInfo = appService.findOnlineAppInfo(filterMap, pageSize, page);
				 List<Map> appInfoList = (List<Map>) appInfo.get("data");
				 if(appInfoList != null && appInfoList.size() > 0){
					 for(int i = 0; i < appInfoList.size(); i++){
						 Map temp = appInfoList.get(i);
						 if(temp != null && temp.containsKey("app_id")){
							 String app_id = String.valueOf(temp.get("app_id"));
							 Map appGrade = appEvaluateService.getAppGradeStatistics(app_id);
							 if(appGrade != null){
								 temp.put("grade_time", appGrade.get("total"));
								 int grade = 0;
								 int gcount = (int) Math.floor(Double.parseDouble(appGrade.get("total").toString()));
								 int gcount1 = (int) Math.floor(Double.parseDouble(appGrade.get("gcount1").toString()));
								 int gcount2 = (int) Math.floor(Double.parseDouble(appGrade.get("gcount2").toString()));
								 int gcount3 = (int) Math.floor(Double.parseDouble(appGrade.get("gcount3").toString()));
								 int gcount4 = (int) Math.floor(Double.parseDouble(appGrade.get("gcount4").toString()));
								 int gcount5 = (int) Math.floor(Double.parseDouble(appGrade.get("gcount5").toString()));
								 grade = gcount1 + gcount2 * 2 + gcount3 * 3 + gcount4 * 4 + gcount5 * 5;
								 grade = grade / gcount;
								 temp.put("grade", grade);
							 }else{
								 temp.put("grade_time", "暂无");
								 temp.put("grade", "暂无");
							 }
							 Map param = new HashMap();
							 param.put("business_id", app_id);
							 int commentCount = messageFeedBackService.queryMessageFeedBackByObjectId(app_id);
							 temp.put("assess_time", commentCount);
						 }
					 }
					 Map<String,Object> result = new HashMap<String, Object>();
					 result.put("data", appInfoList);
					 result.put("totalRecord", appInfo.get("count"));
					 response.getWriter().write(JsonUtils.convertToString(result));
				 }else{
					 Map<String,Object> result = new HashMap<String, Object>();
					 response.getWriter().write(JsonUtils.convertToString(result));
				 }
			 }
		}catch(Exception ex){
			ex.printStackTrace();
		}
	}
	
	/**
	 * 根据应用获取评论列表分页
	 * <br>
	 * <p>Description: 
	 * <br> <a href=mailto:miaozhq@inspur.com></a><br>
	 * <p>Date: 2016年6月15日 下午6:56:11<br/>
	 * <p>
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException   
	 * @see void
	 */
	public void doQueryCommentList(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException{
		try{
			int page = ParamUtil.getInteger(request, "page");
			int pageSize = ParamUtil.getInteger(request, "pageSize");
			int app_id = ParamUtil.getInteger(request, "parent_id");
//			Map comment = appEvaluateService.getAppCommentNoReplyPage(app_id + "", 1, page, pageSize);
			PaginationList<MessageFeedBack> paginationlist  = messageFeedBackService.queryMessageFeedBackByProject(app_id, 1, page, pageSize);
			List<MessageFeedBack> commentList = paginationlist.getRecords();
			if(commentList != null && commentList.size() > 0){
				for(MessageFeedBack message : commentList){
					int uid = message.getUid();
					Map<String,Object> userInfo = userDomain.getUserByUid(uid);
					if(userInfo != null){
						message.setUser_name(userInfo.get("nick_name").toString());
					}
				}
				Map<String,Object> result = new HashMap<String, Object>();
				result.put("data", commentList);
				result.put("count", paginationlist.getTotalRecord());
				response.getWriter().write(JsonUtils.convertToString(result));
			}else{
				response.getWriter().write(JsonUtils.convertToString(""));
			}
		}catch(Exception ex){
			ex.printStackTrace();
		}
	}
	
	
}
