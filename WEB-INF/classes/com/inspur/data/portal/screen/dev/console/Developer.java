package com.inspur.data.portal.screen.dev.console; 

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.loushang.internet.util.JsonUtils;
import org.loushang.internet.util.StringUtils;
import org.loushang.internet.view.ViewHandler;

import com.inspur.api.ac.IDeveloperService;
import com.inspur.common.utils.PropertiesUtil;
import com.inspur.hsf.config.ServiceFactory;
import com.inspur.utils.AuditLogUtil;
import com.inspur.utils.DevServiceUtil;
import com.inspur.utils.OamUtils;
import com.inspur.utils.UserUtil;
import com.inspur.utils.UserUtils;

public class Developer implements ViewHandler {

	private static Log log = LogFactory.getLog(Developer.class);// 日志
	IDeveloperService appDeveloperService =  OamUtils.getDeveloperService();

	@SuppressWarnings("unchecked")
	public void execute(HttpServletRequest request, HttpServletResponse response) {
		Map developer=new HashMap();
		Object uid = UserUtil.getUserID(request);
		if(uid!=null){
			developer = appDeveloperService.getAppDeveloperByUserId(String.valueOf(uid));
			if(developer!=null){
				Object devId=developer.get("");
				if(devId!=null){
					HttpSession session = request.getSession(false);
					if(session!=null){
						session.setAttribute("ac_developer_id", devId.toString());
					}
				}
			}
		}
		request.setAttribute("dev_info", developer);
		
		//记录页面访问日志
		AuditLogUtil.addPageVisitAutiLog(request, "开发者控制台", "");
	}

	/**
	 * 修改开发者信息
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@SuppressWarnings("unchecked")
	public void doUpdateDeveloper(HttpServletRequest request,HttpServletResponse response) throws IOException {
		int res=0;
		try {
			String email = request.getParameter("email");
			String idcard = request.getParameter("idcard");
			String name = request.getParameter("name");
			String qq = request.getParameter("qq");
			String tel = request.getParameter("tel");
			String type = request.getParameter("type");
			String user_agree = request.getParameter("user_agree");
			String website = request.getParameter("website");
			Map data = new HashMap();
			data.put("email", email);
			data.put("idcard", idcard);
			data.put("name", name);
			data.put("qq", qq);
			data.put("tel", tel);
			data.put("type", type);
			data.put("user_agree", user_agree);
			data.put("website", website);
			String developerId=request.getParameter("developer_id");
			//调用实名认证接口，进行实名认证，目前缺接口等待开发
			if(StringUtils.isEmpty(developerId)){
				//通知其他中心用户登录身份信息发生变化
				Cookie cookie = new Cookie("login_time", String.valueOf(System.currentTimeMillis() / 1000L));
				cookie.setDomain(PropertiesUtil.getValue("login.properties","login.cookieDomain"));
				response.addCookie(cookie);
				data.put("uid", UserUtil.getUserID(request));
				res=(Integer)appDeveloperService.addAppDeveloper(data);
				//向uc.uc_user_extend表中添加开发者信息
				Map<String, Object> userExtendMap = new HashMap<>();
				userExtendMap.put("uid", UserUtil.getUserID(request));
				userExtendMap.put("user_key", "developer_id");
				userExtendMap.put("user_value", res);
				UserUtils.getUserExtendDomain().add(userExtendMap);
				HttpSession session = request.getSession(false);
				if(session!=null){
					session.setAttribute("is_dev", 1);
					//采用ac_developer_id而非developer_id属性名称是避免PassportCookie.isLogged方法清除
					session.setAttribute("ac_developer_id", res);
				}
			}else{
				data.put("id",developerId);
				res=(Integer)appDeveloperService.updateAppDeveloper(data);
			}
			response.getWriter().write(JsonUtils.convertToString(res));
		} catch (Exception ex) {
			ex.printStackTrace();
			log.error("修改开发者信息出错！",ex);
			response.getWriter().write(JsonUtils.convertToString(0));
		}

	}
	
	/**
	 * 验证邮箱是否唯一
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	public void doIsUniqueEmail(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		try {
			String email = request.getParameter("email");
			boolean isUnique = appDeveloperService.isUniqueEmail(email);
			response.getWriter().write(JsonUtils.convertToString(isUnique));
			
		}catch (Exception ex) {
			response.getWriter().write(JsonUtils.convertToString(0));
			ex.printStackTrace();
			log.error("验证邮箱是否唯一出错！",ex);
		}
	}
	
	public void doGetDeveloper(HttpServletRequest request, HttpServletResponse response) throws IOException{
		Map developer = new HashMap();
		try{
			String uid = request.getParameter("uid");
			if(StringUtils.isNotEmpty(uid)){
				try{
					IDeveloperService appDomain =  DevServiceUtil.appDeveloperService;
					developer = appDomain.getAppDeveloperByUserId(uid);
				}catch(Exception ex){
					log.error("获取开发者信息出错！",ex);
				}
			}
			
			if(StringUtils.isNotEmptyMap(developer)){
				Object addition = developer.get("additional_information");
				if(StringUtils.isNotEmptyObject(addition)){
					developer.put("additional_information", JsonUtils.readToObject(addition.toString(), Map.class));
				}
			}
			response.setContentType("text/json"); 
			response.setCharacterEncoding("UTF-8");
			response.getWriter().write(JsonUtils.convertToString(developer));
		}catch(Exception ex){
			ex.printStackTrace();
			log.error("获取开发者信息出错！",ex);
			developer = new HashMap();
			response.getWriter().write(JsonUtils.convertToString(developer));
		}
	}
	
}
