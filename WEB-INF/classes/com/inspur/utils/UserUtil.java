package com.inspur.utils;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.inspur.hsf.config.ServiceFactory;
import com.inspur.uc.api.relation.IRelationDomain;
import com.inspur.uc.api.user.IOrganDomain;
import com.inspur.uc.api.user.IUserDomain;
import com.inspur.ucweb.utils.Validator;

public class UserUtil {
	private static Log log = LogFactory.getLog(UserUtil.class);
	
	/**
	 * 获取登陆用户uid
	 * @param request
	 * @return
	 */
	
	public static Object getUserID(HttpServletRequest request){
		Object uid =null;
		HttpSession session = request.getSession(false);
		if(session!=null){
			uid = session.getAttribute("uid");
		}
		return uid;
	}
	
	public static String getDevelopIdFromSession(HttpServletRequest request){
		String developerId = "";
		HttpSession session = request.getSession(false);
		if(log.isDebugEnabled()){
			log.debug("--request.getSession is null?"+session==null);
		}
		if(session!=null){
			Object developerIdObj = session.getAttribute("developer_id");
			if(developerIdObj!=null && !"".equals(developerIdObj)){
				developerId = String.valueOf(developerIdObj);
			}else{
				//注册为开发者之后ac将developer_id存储至ac_developer_id属性中
				developerIdObj = session.getAttribute("ac_developer_id");
				developerId=developerIdObj==null?"":developerIdObj.toString();
			}
		}
		return developerId;
	}
	
	
	/**
	 * 根据uid获取用户信息
	 * @param uid
	 * @return
	 */
	public static Map getUserInfoFromUC(String uid){
		Map userInfo = new HashMap();
		try{
			IUserDomain userDomain = (IUserDomain) ServiceFactory.getService("IUserDomain");
			userInfo = userDomain.getUserByUid(Integer.parseInt(uid));
		}catch(Exception ex){
			if(log.isDebugEnabled()){
				log.error("获取用户基本信息出错！",ex);
				ex.printStackTrace();
			}
		}
		return userInfo;
	}
	
	
	/**
	 * 根据用户ID获取用户关联的法人信息
	 * @param uid
	 * @return Map 法人信息
	 * [
	 * 	(int)org_id:机构ID
	 * 
	 *  (String)org_name:机构名称
	 *      
	 *  (String)org_type:机构类型，企业、事业单位、社会团体、 机关四个大类
	 *      
	 *  (String)org_code:机构代码
	 *      
	 *  (String)contact_phone:联系电话
	 *      
	 *  (String)address:机构住所，法人登记机构注册的或批准机关批准的法人住所（通常为主要办事机构所在地）地址
	 *      
	 *  (String)zip_code:邮政编码
	 *      
	 *  (String)org_website:单位网址
	 *      
	 *  (String)org_intro:单位介绍
	 *      
	 *  (String)contact_name:联系人
	 *      
	 *  (int)$uid:用户ID
	 * ]
	 */
	public static Map<String,Object> getOrganByUid(String uid) {
		if(Validator.isEmpty(uid)) return null;
			IOrganDomain organService = (IOrganDomain)ServiceFactory.getService("IOrganDomainService");
			Map<String,Object> organInfo = organService.getOrganByUid(Integer.valueOf(uid));
			
			Map<String,Object> resMap = new HashMap<String,Object>();
			if(Validator.isNotEmpty(organInfo.get("org_id"))) {
				resMap.put("org_id", organInfo.get("org_id"));
			} else {
				resMap.put("org_id", 0);
			}
			if(Validator.isNotEmpty(organInfo.get("org_name"))) {
				resMap.put("org_name", organInfo.get("org_name"));
			} else {
				resMap.put("org_name", "");
			}
			if(Validator.isNotEmpty(organInfo.get("org_type"))) {
				resMap.put("org_type", organInfo.get("org_type"));
			} else {
				resMap.put("org_type", "");
			}
			if(Validator.isNotEmpty(organInfo.get("org_code"))) {
				resMap.put("org_code", organInfo.get("org_code"));
			} else {
				resMap.put("org_code", "");
			}
			if(Validator.isNotEmpty(organInfo.get("business_license"))) {
				resMap.put("business_license", organInfo.get("business_license"));
			} else {
				resMap.put("business_license", "");
			}
			if(Validator.isNotEmpty(organInfo.get("tax_register_no"))) {
				resMap.put("tax_register_no", organInfo.get("tax_register_no"));
			} else {
				resMap.put("tax_register_no", "");
			}
			if(Validator.isNotEmpty(organInfo.get("legal_person"))) {
				resMap.put("legal_person", organInfo.get("legal_person"));
			} else {
				resMap.put("legal_person", "");
			}
			if(Validator.isNotEmpty(organInfo.get("address"))) {
				resMap.put("address", organInfo.get("address"));
			} else {
				resMap.put("address", "");
			}
			if(Validator.isNotEmpty(organInfo.get("contact_phone"))) {
				resMap.put("contact_phone", organInfo.get("contact_phone"));
			} else {
				resMap.put("contact_phone", "");
			}
			if(Validator.isNotEmpty(organInfo.get("zip_code"))) {
				resMap.put("zip_code", organInfo.get("zip_code"));
			} else {
				resMap.put("zip_code", "");
			}
			if(Validator.isNotEmpty(organInfo.get("contact_name"))) {
				resMap.put("contact_name", organInfo.get("contact_name"));
			} else {
				resMap.put("contact_name", "");
			}
			if(Validator.isNotEmpty(organInfo.get("org_website"))) {
				resMap.put("org_website", organInfo.get("org_website"));
			} else {
				resMap.put("org_website", "");
			}
			if(Validator.isNotEmpty(organInfo.get("org_intro"))) {
				resMap.put("org_intro", organInfo.get("org_intro"));
			} else {
				resMap.put("org_intro", "");
			}
			resMap.put("uid", uid);
		return resMap;
	}
	
	
	
	/**
	 * 获取用户的信息
	 * @return
	 */
	public static Map getUserInfo(){
		Map userInfo =new HashMap();
		try{
			HttpServletRequest request = ContextHelper.getRequest();
			Object userInfoObj=request.getSession().getAttribute("userInfo");
			if(userInfoObj!=null){
				userInfo = (Map)userInfoObj;
			}
		}catch(Exception exp){
			log.error("[getUserInfo]", exp);
		}
		return userInfo;
	}
	public static String getUserType(){
		String userType=null;
		Map userInfo=getUserInfo();
		if(userInfo!=null){
			userType=String.valueOf(userInfo.get("user_type"));
		}
		return userType;
	}
	
	public static int getUidByFid(String uid){
		if(uid==null || uid.length()==0){
			return -1;
		}
		int id = Integer.parseInt(uid);
		IRelationDomain relation = (IRelationDomain)ServiceFactory.getService("IRelationDomainService");
		return relation.getUidByFid(id);
	}
	
}
