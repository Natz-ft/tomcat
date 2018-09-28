package com.inspur.data.portal.screen.uc.account;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.loushang.internet.context.ContextHolder;
import org.loushang.internet.util.el.Function;
import org.loushang.internet.view.ViewHandler;

import com.inspur.ucweb.utils.UCUtil;
import com.inspur.ucweb.utils.UrlUtils;
import com.inspur.utils.UserUtils;

public class PerInfo implements ViewHandler {

	public void execute(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		HttpSession session = request.getSession();
		if(session.getAttribute("uid") == null 
				|| session.getAttribute("uid").toString().isEmpty() 
				|| Integer.parseInt(session.getAttribute("uid").toString())<=0){
			// 请求登录
			String currentUrl = Function.getCurrentUrl();
			Map paramMap = UrlUtils.getParamMap(request);
			String paramUrl = UrlUtils.getUrlString(paramMap, currentUrl);
			String relayState = "?RelayState="+paramUrl;
			String redirectUrl = Function.getLink("login/login.jsp") + relayState;
			ContextHolder.sendRedirect(redirectUrl);
			return;
		}
		
		int uid = Integer.parseInt(session.getAttribute("uid").toString());
		boolean is_organ = UserUtils.getUserDomain().isOrganByUid(uid);
		if(is_organ){
			ContextHolder.sendRedirect(Function.getLink("account/orgInfo.jsp"));
			return;
		}
		//个人表信息，返回基本信息结果
		Map perInfo =  UserUtils.getPersonDomain().getPersonByUid(uid);
		
		//当前日期
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        String nowDate = df.format(new Date());  
		
        request.setAttribute("nowDate", nowDate);
		request.setAttribute("perInfo", perInfo);
		//查询用户扩展信息
		Map userExtend = UCUtil.getUserExtend(uid);
		request.setAttribute("userExtend", userExtend);
		Map userInfo = UCUtil.getUserBasic(uid);
		if(userInfo != null && userInfo.get("authen_level") != null){
			int userLevel = Integer.parseInt(userInfo.get("authen_level").toString());
			request.setAttribute("userLevel", userLevel);
		}
		request.setAttribute("accountType", "accountBase");//accountBase--lever1 navigation
		request.setAttribute("accountType_l2", "accountBase_info");//accountBase_account--lever2 navigation
			
		}
		
	}


