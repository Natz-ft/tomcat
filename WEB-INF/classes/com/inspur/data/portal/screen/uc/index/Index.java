package com.inspur.data.portal.screen.uc.index;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.io.Writer;
import java.net.URLDecoder;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.loushang.internet.filter.login.IUser;
import org.loushang.internet.filter.login.LoginFilterUtil;
import org.loushang.internet.util.CookieUtil;
import org.loushang.internet.util.JsonUtils;
import org.loushang.internet.util.el.Function;
import org.loushang.internet.view.ViewHandler;

import com.inspur.common.utils.PropertiesUtil;
import com.inspur.ucweb.utils.ConfUtil;
import com.inspur.ucweb.utils.PhpUtil;
import com.inspur.ucweb.utils.SecurityUtil;
import com.inspur.ucweb.utils.ToolUtil;
import com.inspur.ucweb.utils.UCUtil;
import com.inspur.ucweb.utils.ViewTool;
import com.inspur.utils.ContextHelper;
import com.inspur.utils.UserUtils;

public class Index implements ViewHandler {

	private static Logger log = Logger.getLogger(Index.class);

	/**
	 * 邮箱系统调用http请求,获取用户基本信息
	 * 
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	public void doGetUserBasicInfo(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		String ip = ToolUtil.getIpAddr(request);
		Boolean can_access = false;
		// String is_enable_getUserBasicInfo_access_ip =
		// ConfUtil.getFrameValue("UC.is_enable_getUserBasicInfo_access_ip");

		// //如果启用了IP访问限制，则进一步检查是否授权IP
		// if("1".equals(is_enable_getUserBasicInfo_access_ip)){
		// String[] access_ips =
		// ConfUtil.getFrameValue("get_user_info_ip").split(",");
		// for(int i = 0 ; i < access_ips.length ; i++) {
		// String access_ip = access_ips[1];
		// if(ip.equals(access_ip)){
		// can_access = true;
		// break;
		// }
		// }
		// }else{
		// can_access = true;//如果没有启用IP访问限制。。。
		// }
		can_access = true;
		if (can_access) {
			String uidStr = request.getParameter("uid");
			String serial_type = request.getParameter("serial_type");
			int uid = Integer.parseInt(uidStr);
			Map user_basic_info = UCUtil.getUserBasic(uid);
			Map res = new HashMap();
			if (null != user_basic_info && user_basic_info.size() > 0) {
				user_basic_info.remove("password");
				user_basic_info.remove("password_strength");
				user_basic_info.remove("data_from");
				user_basic_info.remove("note");
				user_basic_info.remove("space");
				res.put("user_basic", user_basic_info);
				Map userInfo = new HashMap();
				String user_type = String.valueOf(user_basic_info
						.get("user_type"));
				if (UserUtils.getUserDomain().isPersonByUserType(
						user_type)) {
					userInfo = UserUtils.getPersonDomain()
							.getPersonByUid(uid);
					if (null != userInfo) {
						if (null == userInfo.get("uname")
								|| "".equals(userInfo.get("uname"))) {
							userInfo.put("uname", userInfo.get("nick_name"));
						}
						userInfo.remove("nationality");
						userInfo.remove("nation");
						userInfo.remove("birthday");
						userInfo.remove("native_place");
						userInfo.remove("cert_type");
						userInfo.remove("cert_num");
						userInfo.remove("district");
						userInfo.remove("phone");
						userInfo.remove("fax");
						userInfo.remove("car_num");
						userInfo.remove("drive_num");
						userInfo.remove("secure_num");
					}
				} else if (UserUtils.getUserDomain().isOrganByUserType(
						user_type)) {
					userInfo = UserUtils.getOrganDomain().getOrganByUid(
							uid);
					if (null != userInfo) {
						userInfo.remove("legal_person");
						userInfo.remove("district");
						userInfo.remove("industry_type1");
						userInfo.remove("industry_type2");
						userInfo.remove("org_kind");
						userInfo.remove("org_code");
						userInfo.remove("business_license");
						userInfo.remove("tax_register_no");
						userInfo.remove("state");
						userInfo.remove("contact_phone");
						userInfo.remove("contact_email");
						userInfo.remove("found_time");
						userInfo.remove("business_address");
						userInfo.remove("business_scope");
						userInfo.remove("enrol_fund");
						userInfo.remove("open_bank");
						userInfo.remove("bank_account");
						userInfo.remove("lat");
						userInfo.remove("lng");
					}
				}
				res.put("user_info", userInfo);
				Map user_ext = UserUtils.getUserExtendDomain()
						.getUserExtendByUid(uid);
				res.put("user_ext", user_ext);

			} else {
				res = null;
			}
			if ("json".equals(serial_type)) {
				response.getWriter().write(JsonUtils.convertToString(res));
			} else if (null == res) {
				response.getWriter().write("null");
			} else {
				response.getWriter().write(res.toString());
			}
		} else {
			response.getWriter().write(
					JsonUtils.convertToString("invalid access ip:" + ip));
		}
	}

	/**
	 * 支持以jsonp方式获取登录用户信息
	 */
	public void doGetLoginUserInfo(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {

		// 跨域调用时使用jsonp返回数据
		Map user_basic_info = null;
		if (isLogged()) {
			HttpSession session = request.getSession();
			String uidStr = session.getAttribute("uid") + "";
			int uid = Integer.parseInt(uidStr);
			user_basic_info = UCUtil.getUserBasic(uid);
		}
		String callbackparam = "";
		if (null != request.getParameter("callbackparam")
				&& !"".equals(request.getParameter("callbackparam"))) {
			callbackparam = request.getParameter("callbackparam");
		}
		if (!"".equals(request.getParameter("callbackparam"))) {
			if (null != user_basic_info && user_basic_info.size() == 0) {
				response.getWriter().write(
						callbackparam + "("
								+ JsonUtils.convertToString(user_basic_info)
								+ ")");
			} else {
				response.getWriter().write("");
			}
		} else {
			response.getWriter().write("error callbackparam");
		}
	}

	/**
	 * 判断是否已经登录
	 * 
	 * @return
	 */
	public static boolean isLogged() {
		HttpServletRequest request = ContextHelper.getRequest();

		boolean isLogin = false;

		HttpSession session = request.getSession();
		Cookie uidCookie = CookieUtil.getCookieByName(request, "sso_token");
		String _uidCookie = "";
		String _uidSession = session.getAttribute("uid") == null ? "" : String
				.valueOf(session.getAttribute("uid"));
		IUser user = (IUser) LoginFilterUtil.getBean(PropertiesUtil.getValue(
				"login.properties", "login.userImpl"));
		if (uidCookie != null) {
			try {
				_uidCookie = SecurityUtil.jiemi(URLDecoder.decode(
						uidCookie.getValue(), "utf-8"));
			} catch (UnsupportedEncodingException e) {
				log.error(e);
			}
			// _uidCookie = _uidCookie == null ? "" : _uidCookie;
			// 解密方式可能会造成一些错误结果（uid里面含有非数字的字符），replaceAll更正这些错误结果
			_uidCookie = _uidCookie.replaceAll("\\D", "");

			if (!"".equals(_uidCookie)) {
				if ("".equals(_uidSession)) {
					// cookie中有登录信息而session中没有, 则设置session中登录信息
					isLogin = user.initUserInfo(_uidCookie, session);
				} else {
					if (_uidCookie.equals(_uidSession)) {
						// cookie中的登录信息和session中的登录信息一致
						if (session.getAttribute("userInfo") == null) {
							// 如果session中没有登录用户的信息，则设置session中的用户信息
							isLogin = user.initUserInfo(_uidCookie, session);
						} else {
							isLogin = true;
						}
					} else {
						// cookie中的登录信息和session中的登录信息不一致，则重新设置session中的登录信息
						user.cleanUserInfo(session);
						isLogin = user.initUserInfo(_uidCookie, session);
					}
				}
			}
		} else { // 记住登录状态的处理（如果用户未登录，但是用户选择了登录状态）

			Cookie uidStateCookie = CookieUtil.getCookieByName(request,
					"uc_uid_state");
			if (uidStateCookie != null) {
				try {
					_uidCookie = SecurityUtil.jiemi(URLDecoder.decode(
							uidStateCookie.getValue(), "utf-8"));
				} catch (UnsupportedEncodingException e) {
					log.error(e);
				}
				// _uidCookie = _uidCookie == null ? "" : _uidCookie;
				// 解密方式可能会造成一些错误结果（uid里面含有非数字的字符），replaceAll更正这些错误结果
				_uidCookie = _uidCookie.replaceAll("\\D", "");
			}

			if (!"".equals(_uidCookie)) {// 自动登录一下
				user.cleanUserInfo(session);
				isLogin = autoLogin(request, ContextHelper.getResponse(),
						session, _uidCookie);
				isLogin = isLogin && user.initUserInfo(_uidCookie, session);
			}
		}
		if (!isLogin) {
			// 未登录 则清除掉session信息
			user.cleanUserInfo(session);
		}
		return isLogin;
	}

	/**
	 * 自动登录
	 * 
	 * @param string
	 *            uid
	 */
	private static boolean autoLogin(HttpServletRequest request,
			HttpServletResponse response, HttpSession session, String uid) {

		// 存储用户信息
		// 存储登录类型
		session.setAttribute("login_type", "autologin");

		String ip = UCUtil.getClientIP(request);
		Map loginInfo = new HashMap();
		loginInfo.put("uid", uid);
		loginInfo.put("login_ip", UCUtil.getClientIP(request));
		loginInfo.put("login_type", "autologin");
		UserUtils.getUserDomain().afterLoginOk(loginInfo);

		// 设置cookie
		String cookieDomain = ConfUtil.getValue("cookie_domain");
		UCUtil.setCookie("uc_uid", SecurityUtil.jiamiOld(uid), -1, "/",
				cookieDomain, response);
		UCUtil.setCookie("sso_token", SecurityUtil.jiami(uid), -1, "/",
				cookieDomain, response);
		UCUtil.setCookie("login_time", PhpUtil.time(), -1, "/", cookieDomain,
				response);
		UCUtil.setCookie("login_type", "autologin", -1, "/", cookieDomain,
				response);
		return true;
	}

	/**
	 * 注销操作
	 * 
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	public void doLogoutAll(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {

		String callback_url = request.getParameter("callback_url");
		if (UCUtil.isEmpty(callback_url) || !UCUtil.isTrustDomain(callback_url)) {
			//增加门户登陆判断
			String portal = ConfUtil.getValue("global.index.portal");
			if(!UCUtil.isEmpty(portal)){
				callback_url = portal;
			}else{
				callback_url = Function.getLink("index.jsp");
			}
			
		}
		
		String go = "window.location.href='" + callback_url + "'";

		// 销毁session
		HttpSession session = request.getSession();
		session.invalidate();

		// 删除cookie
		String cookieDomain = UCUtil.getCookieDomain();
		UCUtil.setCookie("uc_uid", null, 0, "/", cookieDomain, response);
		UCUtil.setCookie("sso_token", null, 0, "/", cookieDomain, response);
		UCUtil.setCookie("login_time", null, 0, "/", cookieDomain, response);
		UCUtil.setCookie("login_type", null, 0, "/", cookieDomain, response);
		UCUtil.setCookie("uc_user_id", null, 0, "/", cookieDomain, response);
		UCUtil.setCookie("uc_nick_name", null, 0, "/", cookieDomain, response);
		UCUtil.setCookie("uc_uid_state", null, 0, "/", cookieDomain, response);

		// 解析各sp端的注销URL
		String urls = ConfUtil.getValue("sp_logout_url");
		StringBuilder img = new StringBuilder();
		if (urls != null) {
			String logout_urls[] = urls.split(",");
			for (int i = 0; i < logout_urls.length; i++) {
				img.append("<img src='");
				img.append(logout_urls[i]);
				img.append("'>");
			}
		}
		String msg = "正在注销..."
				+ "<html>"
				+ "<head>"
				+ "<meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\">"
				+ "</head>"
				+ "<body onload='redirect()'><div style='display:none'>"
				+ img.toString() + "</div>" + "<script>"
				+ "function redirect(){" + go + "}"
				+ "setTimeout('redirect()');" + "</script>" + "</body>"
				+ "</html>";
		PrintWriter out = response.getWriter();
		out.write(msg);
		out.flush();
		out.close();
		
	}

	/**
	 * 本方法不接受ajax请求 未登录时访问SP端资源，SP端将向本IDP端发起单点登录请求， 在IDP端登录成功后，需要进行的一系列处理。。。
	 * 
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	public void doAftersso(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {

		HttpSession session = request.getSession();
		if (session.getAttribute("uid") == null) {
			response.sendRedirect(Function.getLink("login/login.jsp"));
			return;
		}

		Map user = UCUtil.getUserBasic(Integer.valueOf(String.valueOf(session.getAttribute("uid"))));
		String is_internal_user = "0";
		if(user.get("is_internal_user")!=null){
			is_internal_user = user.get("is_internal_user").toString();
		}
		// 如果不存在RelayState，则指定默认RelayState
		if (session.getAttribute("sso_type") == null
				&& session.getAttribute("RelayState") == null) {
			String default_relay_state = ConfUtil.getValue("default_relay_state");
			if(is_internal_user.equals("0")){
				default_relay_state = ConfUtil.getValue("default_relay_state_externalUser");
			}else if(is_internal_user.equals("1")){
				default_relay_state = ConfUtil.getValue("default_relay_state_internalUser");
			}
			
			String res = "登录成功，执行页面跳转..."
					+ "<html>"
					+ "<head>"
					+ "<meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\">"
					+ "</head>" + "<body onload='redirect()'>" + "<script>"
					+ "function redirect(){" + "window.location.href='"
					+ default_relay_state + "';" + "}"
					+ "</script>" + "</body>" + "</html>";
			response.getWriter().write(res);
			return;
		}
		// 如果是从SP端过来的认证请求
		String sso_type = String.valueOf(session.getAttribute("sso_type"));
		String RelayState = String.valueOf(session.getAttribute("RelayState"));
		session.removeAttribute("sso_type");
		session.removeAttribute("RelayState");

		// 如果是saml单点登录
		if ("samlsso".equals(sso_type)) {
			String saml_request = String.valueOf(session
					.getAttribute("SAMLRequest"));
			String sp_assert_consumer_url = saml_request;// SP端解析授权断言的URL
			//2015-10-06 by ct
			String sso_url = "".equals(saml_request)?saml_request:saml_request.split("\\?")[0];//单点登录授权地址，用于取绑定信息
			
			// 检查断言消费URL是否在信任域列表，只有在可信任域列表中才生成SAML响应
			if (!UCUtil.isTrustDomain(sp_assert_consumer_url)) {
//				response.sendRedirect(ConfUtil.getValue("default_relay_state"));
				if(is_internal_user.equals("0")){
					response.sendRedirect(ConfUtil.getValue("default_relay_state_externalUser"));
				}else if(is_internal_user.equals("1")){
					response.sendRedirect(ConfUtil.getValue("default_relay_state_internalUser"));
				}else{
					response.sendRedirect(ConfUtil.getValue("default_relay_state"));
				}
				//return;
			}

			// 生成SAMLResponse
			String uid = String.valueOf(session.getAttribute("uid"));
			String user_id = String.valueOf(((Map) session
					.getAttribute("userInfo")).get("user_id"));
			
			String saml_response = null;
			String samlsso_version = String.valueOf(session
					.getAttribute("samlsso_version"));
			session.removeAttribute("samlsso_version");
			if ("old".equals(samlsso_version)) {
				saml_response = SecurityUtil.jiamiOld(uid + "|" + user_id + "|"
						+ PhpUtil.time());
			} else {
				saml_response = SecurityUtil.jiami(uid + "|" + user_id + "|"
						+ PhpUtil.time());
			}
			
			/*增加未加密的返回数据*/
			String nick_name = String.valueOf(((Map) session
					.getAttribute("userInfo")).get("nick_name"));
			String user_type = String.valueOf(((Map) session
					.getAttribute("userInfo")).get("user_type"));
			String auto_to_sp = "<html>"
					+ "<head>"
					+ "<meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\">"
					+ "<title>自动跳转至SP端解析授权断言的URL</title>" + "</head>"
					+ "<body onload='document.forms[0].submit()'>"
					+ "<form action='" + sp_assert_consumer_url
					+ "' method=\"post\">"
					+ "<input type=\"hidden\" name=\"SAMLResponse\" value='"
					+ saml_response + "'>"
					+ "<input type=\"hidden\" name=\"nick_name\" value='"
					+ nick_name + "'>"
					+ "<input type=\"hidden\" name=\"user_type\" value='"
					+ user_type + "'>"
					+ "<input type=\"hidden\" name=\"uid\" value='"
					+ uid + "'>"
					+ "<input type=\"hidden\" name=\"SAMLResponseAA\" value='"
					+ saml_response + "'>" + "</form>" + "</body>" + "</html>";
			response.getWriter().write(auto_to_sp);
			// 非Saml方式
		} else {
			// 如果是跨域，则用户中心登录后，跳转至RelayState时，追加参数uclogin=1
			String arr[] = RelayState.split("/");// http://localhost:80/
			arr = arr[2].split(":");
			if (!request.getServerName().equals(arr[0])) {
				if (RelayState.indexOf("?") > -1) {
					if (RelayState.indexOf("uclogin=1") == -1) {
						RelayState = RelayState + "&uclogin=1";
					}
				} else {
					if (RelayState.indexOf("uclogin=1") == -1) {
						RelayState = RelayState + "?uclogin=1";
					}
				}
			}
			// 检查是否在信任域列表中
			if (!UCUtil.isTrustDomain(RelayState)) {
				RelayState = ConfUtil.getValue("default_relay_state");
			}
			if(RelayState==null || "".equals(RelayState)){
				if(is_internal_user.equals("0")){
					RelayState = ConfUtil.getValue("default_relay_state_externalUser");
				}else if(is_internal_user.equals("1")){
					RelayState = ConfUtil.getValue("default_relay_state_internalUser");
				}
			}
			String res = "登录成功，执行页面跳转..."
					+ "<html>"
					+ "<head>"
					+ "<meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\">"
					+ "</head>" + "<body onload='redirect()'>" + "<script>"
					+ "function redirect(){" + "window.location.href='"
					+ RelayState + "'" + "}" + "</script>" + "</body>"
					+ "</html>";
			response.getWriter().write(res);
		}
		return;
	}

	/**
	 * 用户注册时，实时用户名检查
	 * 
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	public void doCheckLoginName(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {

		boolean res = false;
		String user_id = request.getParameter("login_name");
		String checkDuplicate = request.getParameter("checkDuplicate");

		// 检查重复性
		if ("1".equals(checkDuplicate)) {
			res = UserUtils.getUserDomain().isUserIdDuplicate(user_id);
		} else {
			// 检查唯一性
			res = UserUtils.getUserDomain().isUserIdExist(user_id);
		}
		// 在后台需要返回数据库中是否查询出该登录名的记录，返回true结果说明该登录名已经登记，返回false说明该登录名可用
		if (res) {
			response.getWriter().write(
					JsonUtils.convertToString("该用户名已被占用，请重试！"));
		} else {
			response.getWriter().write("true");
		}
	}
	
	/**
	 * 用户注册时，实时手机号码检查
	 * 
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	public void doCheckPhone(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {

		boolean res = false;
		String login_phone = request.getParameter("login_phone");
		String checkDuplicate = request.getParameter("checkDuplicate");
		;

		// 检查重复性
		if ("1".equals(checkDuplicate)) {
			res = UserUtils.getUserDomain().isPhoneDuplicate(login_phone);
		} else {
			// 检查唯一性
			res = UserUtils.getUserDomain().isPhoneExist(login_phone);
		}
		// 在后台需要返回数据库中是否查询出该登录名的记录，返回true结果说明该登录名已经登记，返回false说明该登录名可用
		if (res) {
			response.getWriter().write(
					JsonUtils.convertToString("该手机号码已被使用，请重试！"));
		} else {
			response.getWriter().write("true");
		}
	}

	/**
	 * 用户注册时，实时登录邮箱检查
	 * 
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	public void doCheckEmail(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {

		boolean res = false;
		String login_email = request.getParameter("login_email");
		String checkDuplicate = request.getParameter("checkDuplicate");
		;

		// 检查重复性
		if ("1".equals(checkDuplicate)) {
			res = UserUtils.getUserDomain()
					.isEmailDuplicate(login_email);
		} else {
			// 检查唯一性
			res = UserUtils.getUserDomain().isEmailExist(login_email);
		}
		// 在后台需要返回数据库中是否查询出该登录名的记录，返回true结果说明该登录名已经登记，返回false说明该登录名可用
		if (res) {
			response.getWriter().write(
					JsonUtils.convertToString("该邮箱已被占用，请重试！"));
		} else {
			response.getWriter().write("true");
		}
	}

	// 用于注册页面的实时手机号检测
	public void doCheckPhoneNum(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		Writer out = response.getWriter();
		String phoneNum = "";
		if (request.getParameter("phoneNum") != null
				&& !request.getParameter("phoneNum").isEmpty()) {
			phoneNum = request.getParameter("phoneNum");
		}
		if (!phoneNum.isEmpty()) {
			int checkDuplicate = 0;
			if (request.getParameter("checkDuplicate") != null) {
				checkDuplicate = Integer.parseInt(String.valueOf(request
						.getParameter("checkDuplicate")));
			}
			boolean res = false;
			if (checkDuplicate == 1) {
				// 检验重复性
				res = UserUtils.getUserDomain().isPhoneDuplicate(
						phoneNum);
			} else {
				// 检验唯一性
				res = UserUtils.getUserDomain().isPhoneExist(phoneNum);
			}
			// 在后台需要返回数据库中是否查询出该手机号的记录，返回true结果说明该手机号已经登记，返回false说明该手机号未登记可用
			if (res) {
				out.write(JsonUtils.convertToString("该手机号已登记，请重试！"));
			} else {
				out.write(JsonUtils.convertToString("true"));
			}
		} else {
			out.write(JsonUtils.convertToString("手机号不得为空，请输入！"));
		}
	}
	/**
	 * 用户注册时，实时单位用户名检查
	 * 
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	public void doCheckNickName(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {

		//int  res = 0;
		String nickname = request.getParameter("nickname");
		String user_type = "21";
		String site_code = "1";
		//res = ServiceConst.getUC_IUserDomain().getUidBySiteAndTypeAndNickName(site_code,user_type,nickname);
		boolean res = UserUtils.getUserDomain().isNickNameExist(nickname);
		// 在后台需要返回数据库中是否查询出该登录名的记录，返回true结果说明该登录名已经登记，返回false说明该登录名可用
		if (res == true) {
			response.getWriter().write(
					JsonUtils.convertToString("该名称已被注册，请重试或联系系统管理员！"));
		} else {
			response.getWriter().write("true");
		}
	}

	/**
	 * 取得当前session中的验证码
	 */
	public void doGetVerifyCode(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		response.getWriter()
				.write(String.valueOf(request.getSession().getAttribute(
						"verify_code")));
	}
	
	public void doSendPhoneVCode(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		
		PrintWriter out = response.getWriter();
		//0:尚未登录或参数错误、四位随机码：不支持手机短信，并且生成验证码成功、1：支持手机短信，并且生成验证码成功-1：生成验证码出错
		String result = "0";
		HttpSession session = request.getSession();
		String mobile = "";
		if (request.getParameter("mobile") != null
				&& !request.getParameter("mobile").isEmpty()) {
			mobile = request.getParameter("mobile");
			
			boolean mobileExist = UserUtils.getUserDomain().isPhoneExist(mobile);
			if(!mobileExist){
				boolean flag = UserUtils.getUserDomain()
						.sendRegCodeToPhone(mobile);
				if (flag) {
					result = "1";
					session.setAttribute("tempLoginPhone", mobile);
				} else {
					result = "-1";
				}
			}else{
				result = "手机号码已被占用";
			}
		}
		out.write(JsonUtils.convertToString(result));
	}
	public void doSendPhoneVCodeForSd(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		
		PrintWriter out = response.getWriter();
		//0:尚未登录或参数错误、四位随机码：不支持手机短信，并且生成验证码成功、1：支持手机短信，并且生成验证码成功-1：生成验证码出错
		String result = "0";
		HttpSession session = request.getSession();
		String mobile = "";
		if (request.getParameter("mobile") != null
				&& !request.getParameter("mobile").isEmpty()) {
			mobile = request.getParameter("mobile");
			
			//校验该手机号本日内发送条数是否超出
			Integer sendedCounts = UserUtils.getValidationDomain().getPhoneRegisterCountsInOneDay(mobile);
			//超过十条，则返回条数超过的提示
			if(sendedCounts > 10){
				result = "0";
			}else{//条数
				//校验手机号是否存在
				boolean mobileExist = UserUtils.getUserDomain().isPhoneExist(mobile);
				if(!mobileExist){
					boolean flag = UserUtils.getUserDomain()
							.sendRegCodeToPhoneForSd(mobile);
					if (flag) {
						result = "1";
						session.setAttribute("tempLoginPhone", mobile);
					} else {
						result = "-1";
					}
				}else{
					result = "手机号码已被占用";
				}
			}
		}
		out.write(JsonUtils.convertToString(result));
	}
	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

	}
}
