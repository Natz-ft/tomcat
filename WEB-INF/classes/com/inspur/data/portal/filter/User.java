package com.inspur.data.portal.filter;

import java.util.Map;

import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.loushang.internet.filter.login.IUser;

import com.inspur.api.ac.IDeveloperService;
import com.inspur.hsf.config.ServiceFactory;
import com.inspur.uc.api.user.IUserDomain;
/**
 * 门户实现
 * <br>
 * <strong>Title :</strong> User.java
 * <br>
 * <strong>Description : </strong>
 * <br>
 * <strong>For Examples :</strong>
 * <br>
 * <strong>Create on : 2014年10月13日 上午11:31:19<br></strong>
 * <p>
 * <strong>Copyright (C) Inspur Co.,Ltd.<br></strong>
 * <p>
 * @author <a href=mailto:haowenxiang@inspur.com>haowx</a><br>
 * @version <strong>V1.0</strong>
 * <PRE>
 * </PRE>
 * -------------------------------------------<br>
 * Change History:[Formatter: author date description] <br/>
 * 1<br>
 * 2<br>
 * 3<br>
 */
public class User implements IUser{

	private static Logger log = Logger.getLogger(User.class);
	
	private static IUserDomain iUserDomain;
	static{
		try{
			if(iUserDomain==null){
				iUserDomain = (IUserDomain) ServiceFactory.getService("uc.IUserDomain");
			}
		}catch(Exception e){
			log.error("初始化用户Service模块失败", e);
			e.printStackTrace();
		}
	}
	
	/**
	 * 初始化session中的登录用户信息
	 * @param uid
	 * @param session
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public boolean initUserInfo(String uid, HttpSession session) {
		
		if(uid == null || session == null) return false;
		try {
			Map<String,Object> userInfoMap=iUserDomain.getUserInfo(Integer.parseInt(uid));
			Map<String,Object> tempMap=(Map<String,Object>)userInfoMap.get("user_basic");
			if (tempMap != null) {
				session.setAttribute("uid", tempMap.get("uid"));
				session.setAttribute("userInfo", tempMap);
				//查询是否开发者
				IDeveloperService appDeveloperService = (IDeveloperService) ServiceFactory.getService("developerService");
				Map  developer = appDeveloperService.getAppDeveloperByUserId(uid);
				if(developer != null){
					session.setAttribute("developer_id", developer.get("id"));
				}else{
					session.setAttribute("developer_id", "");
				}
				return true;
			}
		} catch (Exception e) {
			log.error(e);
		}
		return false;
	}
	
	/**
	 * 清除session中的登录用户信息
	 * @param session
	 * @return
	 */
	public boolean cleanUserInfo(HttpSession session) {
		if(session == null) return false;
		session.removeAttribute("userInfo");
		session.removeAttribute("uid");
		return true;
	}

	public Map<String, Object> getUserInfo(String uid) {
		// 调用UC的高速服务获取用户信息
		Map<String,Object> user = iUserDomain.getUserByUid(Integer.parseInt(uid));
		return user;
	}
	
}
