package com.inspur.utils;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.inspur.hsf.config.ServiceFactory;
import com.inspur.portal.service.interact.MessageFeedBackService;
import com.inspur.portal.service.news.NewsColumnService;
import com.inspur.portal.service.news.NewsMediaService;
import com.inspur.portal.service.news.ResNewsService;
import com.inspur.portal.service.survey.UserSurveyService;
import com.inspur.portal.service.user.UserCollectionService;
import com.inspur.portal.service.user.UserOperationLogService;
import com.inspur.portal.service.user.UserPraiseService;
import com.inspur.portal.service.user.UserScoreService;

/**
 * portal接口公用类
 * <br>
 * <strong>Title :</strong> PortalUtils.java
 * <br>
 * <strong>Description : </strong>
 * <br>
 * <strong>For Examples :</strong>
 * <br>
 * <strong>Create on : 2017年2月14日 下午2:24:23<br></strong>
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
public class PortalUtils {
	
	private static Log log = LogFactory.getLog(PortalUtils.class);
	
	private static MessageFeedBackService messageFeedBackService;
    private static UserCollectionService userCollectionService;
    private static UserScoreService userScoreService;
    private static UserPraiseService userPraiseService;
    private static ResNewsService resNewsService;
    private static NewsMediaService newsMediaService;
    private static UserSurveyService userSurveyService;
    private static NewsColumnService newsColumnService;
    private static UserOperationLogService userOperationLogService;
    
    
    static{
    	try{
    		messageFeedBackService = (MessageFeedBackService) ServiceFactory.getService("messageFeedBackService");
    		userCollectionService = (UserCollectionService) ServiceFactory.getService("userCollectionService");
    		userScoreService = (UserScoreService) ServiceFactory.getService("userScoreService");
    		userPraiseService = (UserPraiseService) ServiceFactory.getService("userPraiseService");
    		resNewsService = (ResNewsService)ServiceFactory.getService("resNewsService");
    		newsMediaService = (NewsMediaService) ServiceFactory.getService("newsMediaService");
    		userSurveyService = (UserSurveyService) ServiceFactory.getService("userSurveyService");
    		newsColumnService = (NewsColumnService) ServiceFactory.getService("newsColumnService");
    		userOperationLogService=(UserOperationLogService)ServiceFactory.getService("userOperationLogService");
    		
    	}catch(Exception e){
    		log.debug("PortalUtils获取服务失败", e);
    	}
    }



	public static MessageFeedBackService getMessageFeedBackService() {
		return messageFeedBackService;
	}
	public static UserCollectionService getUserCollectionService() {
		return userCollectionService;
	}
	public static UserScoreService getUserScoreService() {
		return userScoreService;
	}
	public static UserPraiseService getUserPraiseService() {
		return userPraiseService;
	}
	public static ResNewsService getResNewsService() {
		return resNewsService;
	}
	public static NewsMediaService getNewsMediaService() {
		return newsMediaService;
	}
	public static UserSurveyService getUserSurveyService() {
		return userSurveyService;
	}
	public static NewsColumnService getNewsColumnService() {
		return newsColumnService;
	}
    
	public static UserOperationLogService getUserOperationLogService() {
		return userOperationLogService;
	}
    
    

}
