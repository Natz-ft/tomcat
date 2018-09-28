package com.inspur.data.portal.screen.uc.account;

import java.io.IOException;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.loushang.internet.context.ContextHolder;
import org.loushang.internet.util.el.Function;
import org.loushang.internet.view.ViewHandler;

import com.inspur.ucweb.utils.ConfUtil;
import com.inspur.ucweb.utils.UCUtil;
import com.inspur.ucweb.utils.UrlUtils;
import com.inspur.utils.UserUtils;

public class RealAuthen implements ViewHandler {

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
		
		Map userBasic = UCUtil.getUserBasic(uid);
		if(userBasic != null){
			String user_type = String.valueOf(userBasic.get("user_type"));
			boolean is_organ = UserUtils.getUserDomain().isOrganByUserType(user_type);
			if(is_organ){
				ContextHolder.sendRedirect(Function.getLink("account/eAuthen.jsp"));
				return;
			}
			//0表示一般注册用户，1表示准实名制用户，2表示通过审核的实名认证用户, 3表示待审核状态 ， 4表示驳回认证（认证未通过）
			//只有“准实名”和“实名认证被驳回”状态的用户才能进入“实名认证”页面
			int authenLevel = Integer.parseInt(userBasic.get("authen_level").toString());
			if(authenLevel != 1 && authenLevel != 4){
				ContextHolder.sendRedirect(Function.getLink("account/perAuthen.jsp"));
				return;
			}
			String loginPhone = "";
			if(!UCUtil.isEmpty(userBasic.get("login_phone"))){
				loginPhone = userBasic.get("login_phone").toString();
			}
			Map perInfo = UserUtils.getPersonDomain().getPersonByUid(uid);
			String certNum = "";
			String uname = "";
			if(perInfo != null){
				if(!UCUtil.isEmpty(perInfo.get("uname"))){
					uname = perInfo.get("uname").toString();
				}
				if(!UCUtil.isEmpty(perInfo.get("cert_type")) && !UCUtil.isEmpty(perInfo.get("cert_num"))){
					if(Integer.parseInt(perInfo.get("cert_type").toString()) == 1){
						certNum = perInfo.get("cert_num").toString();
					}
				}
				perInfo.clear();
				perInfo.put("uname", uname);
				perInfo.put("certNum",certNum);
			}
			request.setAttribute("perInfo", perInfo);
			
			String diskId = ConfUtil.getValue("disk_id_authen_photo");
			request.setAttribute("disk_id", diskId);
			String docCenterService = ConfUtil.getValue("global.index.rcservice");
			request.setAttribute("uid", uid);
			request.setAttribute("docCenterService", docCenterService);
			String uploadUrl = ConfUtil.getValue("global.index.rcservice")+"/upload";
			request.setAttribute("uploadUrl", uploadUrl);
			request.setAttribute("loginPhone", loginPhone);
			request.setAttribute("authenLevel", authenLevel);
			request.setAttribute("accountType", "authenSet");//accountBase--lever1 navigation
		}
	}
}

