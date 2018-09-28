package com.inspur.data.portal.screen.uc.account;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.loushang.internet.context.ContextHolder;
import org.loushang.internet.util.JsonUtils;
import org.loushang.internet.util.el.Function;
import org.loushang.internet.view.ViewHandler;

import com.inspur.ucweb.utils.UCUtil;
import com.inspur.ucweb.utils.UrlUtils;
import com.inspur.utils.UserUtils;

public class BasicInfo implements ViewHandler {

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
		//查询用户表记录，主要是获得用户类型(1-对应个人表2-机构表，对应不同的基本资料显示)
		if(! is_organ){
			ContextHolder.sendRedirect(Function.getLink("account/perInfo.jsp"));
			return;
		}
		Map orgInfo = UserUtils.getOrganDomain().getOrganByUid(uid);
		if(orgInfo != null){
			request.setAttribute("orgInfo", orgInfo);
		}
		Map userInfo = UCUtil.getUserBasic(uid);
		if(userInfo != null && userInfo.get("authen_level") != null){
			int userLevel = Integer.parseInt(userInfo.get("authen_level").toString());
			request.setAttribute("userInfo", userInfo);
			request.setAttribute("userLevel", userLevel);
		}
		Map userExtend = UCUtil.getUserExtend(uid);
		request.setAttribute("userExtend", userExtend);
		
		request.setAttribute("accountType", "accountBase");//accountBase--lever1 navigation
		request.setAttribute("accountType_l2", "accountBase_info");//accountBase_account--lever2 navigation
	}
	
	public void doOrgSubmit(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		PrintWriter out = response.getWriter();
		int result = -1;
		HttpSession session = request.getSession();
		if(session.getAttribute("uid") != null 
				&& !session.getAttribute("uid").toString().isEmpty() 
				&& Integer.parseInt(session.getAttribute("uid").toString())>0){
			int uid = Integer.parseInt(session.getAttribute("uid").toString());
			boolean is_organ = UserUtils.getUserDomain().isOrganByUid(uid);
			if(is_organ){
				String [] fields = {"org_name","org_type","legal_person","address",
						"zip_code","district","industry_type1","industry_type2",
						"org_kind","org_code","business_license","tax_register_no",
						"state","contact_name","contact_phone","contact_email",
						"found_time","business_address","business_scope","enrol_fund",
						"open_bank","bank_account","org_website","org_intro",
						"lat","lng","gov_affairs_weibo","org_info"};
				Map orgParam = new HashMap();
				orgParam.put("uid", uid);
				for(String tempStr:fields){
					if(request.getParameter(tempStr) != null){
						orgParam.put(tempStr, request.getParameter(tempStr));
					}
				}
				if(orgParam.get("enrol_fund")!= null && orgParam.get("enrol_fund").toString().isEmpty()){
					orgParam.put("enrol_fund", 0);
				}
				if(request.getParameter("is_downgrade") != null){
					orgParam.put("is_downgrade",request.getParameter("is_downgrade"));
				}
				boolean res = UserUtils.getOrganDomain().modifyOrganByUid(orgParam);
				result = res?1:0;
			}
		}
		out.write(JsonUtils.convertToString(String.valueOf(result)));
	}

}
