package com.inspur.utils;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.loushang.internet.context.ContextHolder;
import org.loushang.internet.filter.login.User;

import com.inspur.api.ac.IDeveloperService;
import com.inspur.hsf.config.ServiceFactory;
import com.inspur.uc.api.user.IUserDomain;


/**
 * 项目统一登录用，用户类具体实现
 * <br>
 * <strong>Title :</strong> LoginUserImpl.java
 * <br>
 * <strong>Description : </strong>
 * <br>
 * <strong>For Examples :</strong>
 * <br>
 * <strong>Create on : 2016年05月09日 下午19:41:07<br></strong>
 * <p>
 * <strong>Copyright (C) Inspur Co.,Ltd.<br></strong>
 * <p>
 * @author <a href=mailto:liuyuanjian@inspur.com>liuyuanjian</a><br>
 * @version <strong>V1.0</strong>
 * <PRE>
 * </PRE>
 * -------------------------------------------<br>
 * Change History:[Formatter: author date description] <br/>
 * 1<br>
 * 2<br>
 * 3<br>
 */
public class LoginUserImpl extends User {
	
	private IUserDomain userDomain = (IUserDomain) ServiceFactory.getService("uc.IUserDomain");

	public Map getUserInfo(String uid) {
		// 调用UC的高速服务获取用户信息
		Map<String,Object> user = userDomain.getUserByUid(Integer.parseInt(uid));
		//查询是否开发者
		IDeveloperService appDeveloperService = (IDeveloperService) ServiceFactory.getService("developerService");
		Map  developer = appDeveloperService.getAppDeveloperByUserId(uid);
		HttpServletRequest request = ContextHolder.getRequest();
		HttpSession session = request.getSession();
		if(developer != null){
			session.setAttribute("developer_id", developer.get("id"));
		}else{
			session.setAttribute("developer_id", "");
		}
		return user;
	}

}
