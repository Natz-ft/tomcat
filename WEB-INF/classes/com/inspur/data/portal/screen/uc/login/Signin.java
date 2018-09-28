package com.inspur.data.portal.screen.uc.login;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.loushang.internet.util.el.Function;
import org.loushang.internet.view.ViewHandler;

import com.inspur.ucweb.utils.ConfUtil;
import com.inspur.ucweb.utils.UCUtil;

public class Signin implements ViewHandler {
	private static Logger log = Logger.getLogger(Signin.class);

	/**
	 * 进入登陆页面
	 */
	public void execute(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		// 进入手机web登录页面
		String show_phone_login = request.getParameter("show_phone_login");
		if ("1".equals(show_phone_login)) {
			String queryString = request.getQueryString();
			response.sendRedirect(Function.getLink("login/loginPhone.jsp")
					+ "?" + queryString);
			return;
		}

		// 首先检查是否存在RelayState，如果存在，则首先将RelayState放到session中
		HttpSession session = request.getSession();
		String RelayState = request.getParameter("RelayState");
		
		if (RelayState == null) {
			RelayState = request.getParameter("SAMLRequest");
			RelayState = RelayState != null ? RelayState : (String) session.getAttribute("SAMLRequest");
			if (RelayState != null) {
				session.setAttribute("sso_type", "samlsso");
				session.setAttribute("SAMLRequest", RelayState);
			}
			
		}
		
		if (RelayState == null) {
			RelayState = request.getParameter("callback_url");
		}
		if (RelayState != null) {
			session.setAttribute("RelayState", RelayState);
		}

		// 如果已登录，并且存在RelayState，则跳转至RelayState(会在RelayState尾部追加参数uclogin=1)
		// 如果已登录登录，并且不存在RelayState，则直接跳转至用户中心的home页面
		if (session.getAttribute("uid") != null) {
			session.removeAttribute("RelayState");
			
			// 假设saml单点登录肯定会发送SAMLRequest参数，则saml场景下，RelayState不可能为空
			if (RelayState == null) {
				String default_relay_state = ConfUtil.getValue("default_relay_state");
				response.sendRedirect(default_relay_state);
			} 
			
			else {
				if (RelayState.indexOf("?") > -1) {
					if (RelayState.indexOf("uclogin=1") == -1) {
						RelayState = RelayState + "&uclogin=1";
					}
				} else {
					if (RelayState.indexOf("uclogin=1") == -1) {
						RelayState = RelayState + "?uclogin=1";
					}
				}
				response.sendRedirect(RelayState);
			}
			
		} 
		// 如果未登录，则正常进入登录页面
		else {
			// 取得cookie信息
			String account = UCUtil.getCookieValue(request, "account");
			if (account != null) {
				request.setAttribute("account", account);
			}
			// 查询登录失败次数，仅用于判断是否显示验证码及是否进行验证码的校验。
			int login_fail_time = 0;
			if (session.getAttribute("login_fail_time") != null) {
				login_fail_time = Integer.parseInt(session.getAttribute(
						"login_fail_time").toString());
			}
			request.setAttribute("login_fail_time", login_fail_time);

			// 生成随机码，防止登录重放攻击
			String is_enable_login_salt = ConfUtil
					.getValue("is_enable_login_salt");
			if ("1".equals(is_enable_login_salt)) {
				String login_salt = UCUtil.getRandom(6);
				session.setAttribute("login_salt", login_salt);
				request.setAttribute("login_salt", login_salt);
			}
			if (RelayState == null) {
				RelayState = ConfUtil.getValue("default_relay_state");
			}
			request.setAttribute("relayState", RelayState);
		}
		request.setAttribute("title", "用户登录");
	}
}
