package com.inspur.data.portal.screen.uc.account;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.loushang.internet.context.ContextHolder;
import org.loushang.internet.util.el.Function;
import org.loushang.internet.view.ViewHandler;

import com.inspur.ucweb.utils.UCUtil;
import com.inspur.ucweb.utils.UrlUtils;
import com.inspur.utils.UserUtils;

public class CredentialAuthen implements ViewHandler {
	private static Logger log = Logger.getLogger(CredentialAuthen.class);
	/**
	 * e政通登录,跳转至青岛ca统一认证中心去认证
	 */
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
		String uid = session.getAttribute("uid").toString();
		
		//检查请求中是否包含RelayState，如果包含，则将RelayState保存到session中
		session.setAttribute("RelayState", Function.getLink("account/eAuthen.jsp"));
		
		String randomCookie = UCUtil.getCookieValue(request, "ssoRandom");
		String appUrl = UCUtil.getCookieValue(request, "appUrl");
//		String loginTypeReturn = UCUtil.getCookieValue(request, "loginType");
		String loginRep = request.getParameter("loginRep");
		// 如果接收到SSO返回的数据，则进行验证
		if(randomCookie != null && !randomCookie.isEmpty() && loginRep != null && !loginRep.isEmpty()){
			//保存登陆类型
			String loginRepSign = request.getParameter("loginRepSign");
			/*if(loginTypeReturn != null && !loginTypeReturn.isEmpty()){
				session.setAttribute("loginType", loginTypeReturn);
			}*/
			
			//调用hsf服务，进行签名解析
			Map signMap = new HashMap();
			signMap.put("randomCookie", randomCookie);
			signMap.put("loginRep", loginRep);
			if(loginRepSign != null && !loginRepSign.isEmpty()){
				signMap.put("loginRepSign", loginRepSign);
			}
			if(appUrl != null && !appUrl.isEmpty()){
				signMap.put("appUrl", appUrl);
			}
			//调用hsf服务，进行签名解析
			Map res = UserUtils.getUserDomain().verifyDetachedSignQdRemote(signMap);
			
			if(res != null && !res.isEmpty()){
				//验签成功,检查是否有与本数字证书绑定的用户
				String ca_subject = res.get("subject").toString();
				Map user = null;
				if(ca_subject != null && !ca_subject.isEmpty()){
					user = UserUtils.getUserBindDomain().getMapByOutUidAndType(ca_subject, "ca");
				}
				if(user != null){
					ContextHolder.sendRedirect(Function.getLink("/jsp/error.jsp?errCode=Fail:Repeated use of certificates！"));
					return;
				}
				if(res.get("Type")== null || res.get("Type").toString().isEmpty()|| Integer.parseInt(res.get("Type").toString()) != 1){
					ContextHolder.sendRedirect(Function.getLink("/jsp/error.jsp?errCode=Fail:Invalid Type of Certificate！"));
					return;
				}
				if(res.get("uname")== null || res.get("uname").toString().isEmpty()){
					ContextHolder.sendRedirect(Function.getLink("/jsp/error.jsp?errCode=Fail:Can't get user msg from Certificate！"));
					return;
				}
				
				Map user2 = UserUtils.getUserBindDomain().getMapByUidAndType(Integer.parseInt(uid), "ca");
				
				if(user2 != null){
					ContextHolder.sendRedirect(Function.getLink("/jsp/error.jsp?errCode=Fail:The certificate has been binded！"));
					return;
				}
				
				boolean is_organ = UserUtils.getUserDomain().isOrganByUid(Integer.parseInt(uid));
				if(!is_organ){
					ContextHolder.sendRedirect(Function.getLink("/jsp/error.jsp?errCode=Fail: The user type and certificate mismatch！"));
					return;
				}
				Map param = new HashMap();
				param.put("uid", uid);
				param.put("out_uid", res.get("subject"));
				param.put("type", "ca");
				
				boolean resBind = UserUtils.getUserBindDomain().add(param);
				if(resBind){
					res.put("uid", uid);
					res.put("org_name", res.get("uname"));
					res.put("uname", res.get("uname"));
					res.put("org_code", res.get("Zzjgid"));
					res.put("business_license", res.get("Gsid"));
					res.put("tax_register_no", res.get("Swid"));
					res.put("user_type", 21);
					
					UserUtils.getUserDomain().updateUserFromCA(res);
					ContextHolder.sendRedirect(session.getAttribute("RelayState").toString());
					return;
				}else{
					ContextHolder.sendRedirect(Function.getLink("/jsp/error.jsp?errCode=Fail: Find error！"));
					return;
				}
			}else{
				ContextHolder.sendRedirect(Function.getLink("/jsp/error.jsp?errCode=Fail: Failure to sign the certificate！"));
				return;
			}
		}else{
			// 产生委托请求, 并提交至SSO服务器
			Map signMap = new HashMap();
			signMap.put("method", "genReqQdRemote");
			if(request.getParameter("appUrl") != null && !request.getParameter("appUrl").toString().isEmpty()){
				signMap.put("appUrl", appUrl);
			}
			Map res = UserUtils.getUserDomain().genReqQdRemote(signMap);
			if(res != null || !res.isEmpty()){
				if(res.get("appUrl") != null){
					String cookieDomain = UCUtil.getCookieDomain();
					UCUtil.setCookie("appUrl", res.get("appUrl").toString(), -1, "/", cookieDomain, response);
				}
				if(res.get("ssoRandom") != null){
					String cookieDomain = UCUtil.getCookieDomain();
					UCUtil.setCookie("ssoRandom", res.get("ssoRandom").toString(), -1, "/", cookieDomain, response);
				}
				request.setAttribute("ssoUrl", res.get("ssoUrl"));
				request.setAttribute("loginReq", res.get("loginReq"));
				request.setAttribute("returnUrl", Function.getLink("account/credentialAuthen.jsp"));
			}else{
				ContextHolder.sendRedirect(Function.getLink("/jsp/error.jsp?errCode=Fail:Certificate requests fail！"));
				return;
			}
			request.setAttribute("title", "证书登录");
		}
	}
	
	
}
