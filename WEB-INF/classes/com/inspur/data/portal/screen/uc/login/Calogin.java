package com.inspur.data.portal.screen.uc.login;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.loushang.internet.util.el.Function;
import org.loushang.internet.view.ViewHandler;

import com.inspur.ucweb.utils.PhpUtil;
import com.inspur.ucweb.utils.SecurityUtil;
import com.inspur.ucweb.utils.UCUtil;
import com.inspur.ucweb.utils.UcServiceUtil;
import com.inspur.utils.UserUtils;

public class Calogin implements ViewHandler {
	private static Logger log = Logger.getLogger(Calogin.class);
	/**
	 * e政通登录,跳转至青岛ca统一认证中心去认证
	 */
	public void execute(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		//检查请求中是否包含RelayState，如果包含，则将RelayState保存到session中
		HttpSession session = request.getSession();
		String RelayState = request.getParameter("RelayState");
		if(RelayState == null){
			RelayState = request.getParameter("callback_url");
		}
		if(RelayState != null){
			session.setAttribute("RelayState", RelayState);
		}
		String randomCookie = UCUtil.getCookieValue(request, "ssoRandom");
		String appUrl = UCUtil.getCookieValue(request, "appUrl");
		String loginTypeReturn = UCUtil.getCookieValue(request, "loginType");
		String loginRep = request.getParameter("loginRep");
		// 如果接收到SSO返回的数据，则进行验证
		if(randomCookie != null && !randomCookie.isEmpty() && loginRep != null && !loginRep.isEmpty()){
			//保存登陆类型
			if(loginTypeReturn != null && !loginTypeReturn.isEmpty()){
				session.setAttribute("loginType", loginTypeReturn);
			}
			String loginRepSign = request.getParameter("loginRepSign");
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
				session.setAttribute("ca", res);
				if(res.get("appUrl") != null && !res.get("appUrl").toString().isEmpty()){
					session.setAttribute("appUrl", res.get("appUrl"));
				}
				//验签成功,检查是否有与本数字证书绑定的用户
				String ca_subject = res.get("subject").toString();
				Map user = null;
				if(ca_subject != null && !ca_subject.isEmpty()){
					user = UserUtils.getUserBindDomain().getMapByOutUidAndType(ca_subject, "ca");
				}
				if(user == null){
					//如果不存在与该数字证书绑定的用户，则分为两种场景（1、已有本地账户，则与已有账户进行绑定。2、没有本地账户，则新注册用户。）
					response.sendRedirect(Function.getLink("bind/cabind"));
					return;
				}
				//如果存在与该数字证书绑定的用户，则查询本地用户，并创建会话。
				//设置session信息
				String uid = String.valueOf(user.get("uid"));
				session.setAttribute("uid", uid);
//				//查询是否开发者信息
//				String developer_id = ServiceConst.getUC_IUserExtendDomain().getValueByUidAndKey(uid, "developer_id");
//				if(developer_id != null){
//					session.setAttribute("developer_id", developer_id);
//				}
				Map userInfo = UserUtils.getUserDomain().getUserByUid(Integer.parseInt(uid));
				session.setAttribute("userInfo", userInfo);
				session.setAttribute("login_type", "cert");
				
				//设置cookie
				String cookieDomain = UCUtil.getCookieDomain();
				UCUtil.setCookie("login_type", "cert", -1, "/", cookieDomain, response);//记录登录类型（ca登录）
				UCUtil.setCookie("sso_token", SecurityUtil.jiami(uid), -1, "/", cookieDomain, response);
				UCUtil.setCookie("uc_uid", SecurityUtil.jiamiOld(uid), -1, "/", cookieDomain, response);
				UCUtil.setCookie("login_time", PhpUtil.time(), -1, "/", cookieDomain, response);
				UCUtil.setCookie("uc_user_id", String.valueOf(userInfo.get("user_id")),-1, "/", cookieDomain, response);
				UCUtil.setCookie("uc_nick_name", String.valueOf(userInfo.get("nick_name")), -1, "/", cookieDomain, response);
				
				String ip = UCUtil.getClientIP(request);
				Map loginInfo = new HashMap();
				loginInfo.put("uid", uid);
				loginInfo.put("login_ip", UCUtil.getClientIP(request));
				loginInfo.put("login_type", "cert");
				UserUtils.getUserDomain().afterLoginOk(loginInfo);
				
				//如果不存在与该数字证书绑定的用户，则分为两种场景（1、已有本地账户，则与已有账户进行绑定。2、没有本地账户，则新注册用户。）
				response.sendRedirect(Function.getLink("index/aftersso"));
				return;
				
			}else{
				response.getWriter().write("fail");
				return;
			}
		}else{
			// 产生委托请求, 并提交至SSO服务器
			Map signMap = new HashMap();
			signMap.put("method", "genReqQdRemote");
			if(request.getParameter("appUrl") != null && !request.getParameter("appUrl").toString().isEmpty()){
				signMap.put("appUrl", appUrl);
			}
			//接收登录参数类型
			if(request.getParameter("loginType") != null && request.getParameter("loginType").toString().isEmpty()){
				String loginType = request.getParameter("loginType");
				String cookieDomain = UCUtil.getCookieDomain();
				UCUtil.setCookie("loginType", loginType, -1, "/", cookieDomain, response);
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
				request.setAttribute("returnUrl", Function.getLink("login/calogin.jsp"));
			}
			request.setAttribute("title", "证书登录");
			request.setAttribute("meta_title", "证书登录");
		}
	}
	
	
}
