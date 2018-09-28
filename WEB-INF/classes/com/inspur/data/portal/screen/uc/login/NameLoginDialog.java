package com.inspur.data.portal.screen.uc.login;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.loushang.internet.util.JsonUtils;
import org.loushang.internet.view.ViewHandler;

import com.inspur.ucweb.utils.ConfUtil;
import com.inspur.ucweb.utils.PhpUtil;
import com.inspur.ucweb.utils.SecurityUtil;
import com.inspur.ucweb.utils.UCUtil;
import com.inspur.ucweb.utils.UcServiceUtil;
import com.inspur.utils.UserUtils;

public class NameLoginDialog implements ViewHandler {
	private static Logger log = Logger.getLogger(NameLoginDialog.class);
	
	/**
	 * 登陆框
	 */
	public void execute(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String global_go_url = request.getParameter("global_go_url");
		request.setAttribute("global_go_url", global_go_url);
	 	
	 	//查询登录失败次数
//		int login_fail_time = 0;
//		if(request.getSession().getAttribute("login_fail_time") != null){
//			login_fail_time = Integer.parseInt(String.valueOf(request.getSession().getAttribute("login_fail_time")));
//		}
//		request.setAttribute("login_fail_time", login_fail_time);
		
		String global_index_uc = ConfUtil.getValue("global.index.ucweb");
		request.setAttribute("global_index_uc", global_index_uc);
		
		//生成随机码，防止登录重放攻击
		String is_enable_login_salt = ConfUtil.getValue("is_enable_login_salt");
		if("1".equals(is_enable_login_salt)){
			String login_salt = UCUtil.getRandom(6); 
			request.getSession().setAttribute("login_salt", login_salt);
			request.setAttribute("login_salt", login_salt);
		}
	 }
	
	public void doSendVcode(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		PrintWriter out = response.getWriter();
		Map res = new HashMap();
		String phone = request.getParameter("phone");
		if(phone == null || phone.isEmpty()){
			res.put("code", "0");
			res.put("msg", "手机号不得为空！");
			response.getWriter().write(JsonUtils.convertToString(res));
			return;
		}
		Map user = UserUtils.getUserDomain().getUser(phone);
		if(user == null){
			res.put("code", "0");
			res.put("msg", "手机号"+phone+"未注册！");
			response.getWriter().write(JsonUtils.convertToString(res));
			return;
		}
		int uid = Integer.parseInt(user.get("uid").toString());
		int codeRes = UserUtils.getSecurityPasswordDomain().sendRandomCodeLogin(uid, phone);
		if(codeRes > 0){
			res.put("code", "1");
			res.put("msg", "验证码已发送至"+phone+"请注意查收！");
			response.getWriter().write(JsonUtils.convertToString(res));	
			return;
		}else{
			res.put("code", "0");
			res.put("msg", "发送失败，请稍后重试！");
			response.getWriter().write(JsonUtils.convertToString(res));
			return;
		}
	}
	/**
	 * 为委员提供真实姓名手机号登录
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	public void doNameLogin(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		HttpSession session = request.getSession();
		//姓名、密码、手机验证码
		String tname = request.getParameter("account"); // 姓名
		String phone = request.getParameter("phone");// 登录手机号
		String verify_request = request.getParameter("verify_code");//手机验证码
		if(verify_request != null){
			verify_request = verify_request.trim();
		}
		
		//跨域调用时使用jsonp返回数据	
		String callbackparam = request.getParameter("callbackparam");
		//手机号不相符、验证码已失效、姓名不正确
		//登录结果
		String res = null;
		Map user = null;
		if(phone == null || tname == null ||verify_request == null ){
			res = "-1";//参数非空
		} else {
			String is_enable_login_salt = ConfUtil.getValue("is_enable_login_salt");
			if("1".equals(is_enable_login_salt) && UCUtil.isEmpty(session.getAttribute("login_salt"))){
				res = "4";
				log.error("login_salt为空，可能的登录重放攻击！");
			}else{
				String login_salt = String.valueOf(session.getAttribute("login_salt"));
				//防止登录重放，需要将手机验证码与盐值加密=========未处理
				user = UCUtil.getUser(phone);
				if(user == null || user.size() == 0||user.get("uid") == null || user.get("uid").toString().isEmpty() || Integer.parseInt(user.get("uid").toString()) < 0){
					res = "-5";//-5:系统中不存在此用户，该用户手机号未注册
				}else if(user.get("status")==null || "0".equals(user.get("status").toString())){
					res = "0";
					//账号未激活时，在session中记录login_email，发送激活链接时使用。
					Object login_email = user.get("login_email");
					session.setAttribute("login_email_for_activate", login_email);
				}else if("3".equals(user.get("status").toString())){
					res = "-9";
				}else{
					Map personInfo = UserUtils.getPersonDomain().getPersonByUid(Integer.parseInt(user.get("uid").toString()));
					if(personInfo == null || personInfo.isEmpty()|| personInfo.get("uname") == null || personInfo.get("uname").toString().isEmpty()){
						res = "-2";//该用户名未注册
					}else{
						String perName = personInfo.get("uname").toString();
						if(!tname.equals(perName)){
							res = "-6";//该用户名与手机号不一致
						}else{
							Map vilidation = UserUtils.getValidationDomain().getLatestValidationByPhoneAndType(phone, "user_login");
							if(vilidation == null || vilidation.get("code") == null || vilidation.get("code").toString().isEmpty()){
								res = "-4";//验证码与手机不一致
							}else {
								String  vcode = vilidation.get("code").toString();
								String is_active = vilidation.get("is_active").toString();
								if(!verify_request.equals(vcode)){
									res = "-8";//验证码错误
								}else{
									res = "1";
									if(!is_active.equals("1")){
										res = "-7";//验证码失效
									}
								}
							}
						}
					}
				}
			}
		}
		if (res.equals("1")) {
			//失效:
			UserUtils.getValidationDomain().unsetValidationByPhoneAndType(phone,"user_login");
			//重置sessionid
			UCUtil.reGenerateSessionId(request);
			session = request.getSession();
			// 登录成功后，将uid等用户信息放入session
			String uid = user.get("uid").toString();
//			//查询是否开发者信息
//			String developer_id = ServiceConst.getUC_IUserExtendDomain().getValueByUidAndKey(uid, "developer_id");
//			if(developer_id != null){
//				session.setAttribute("developer_id", developer_id);
//			}
			session.setAttribute("uid", uid);
			session.setAttribute("userInfo", user);
			session.setAttribute("login_type", "userpwd");
			//弹出框登录（jsonp），会传递RelayState参数（登录完成后，如果需要完善资料，完善资料后，跳转回RelayState页面）
			String RelayState = request.getParameter("RelayState");
			if(RelayState != null){
				session.setAttribute("RelayState", RelayState);
			}
			String ip = UCUtil.getClientIP(request);
			Map loginInfo = new HashMap();
			loginInfo.put("uid", uid);
			loginInfo.put("login_ip", UCUtil.getClientIP(request));
			loginInfo.put("login_type", "userpwd");
			UserUtils.getUserDomain().afterLoginOk(loginInfo);
			
			
			//设置cookie
			String cookieDomain = UCUtil.getCookieDomain();
			//登录成功后，将当前登录用户的登录方式存储到客户端cookie，普通登录值为‘userpwd’，CA登录值为‘cert’ ,第三方账号'outacc'
			UCUtil.setCookie("login_type", "userpwd", -1, "/", cookieDomain, response);
			UCUtil.setCookie("sso_token", SecurityUtil.jiami(uid), -1, "/", cookieDomain, response);
			UCUtil.setCookie("uc_uid", SecurityUtil.jiamiOld(uid), -1, "/", cookieDomain, response);
			UCUtil.setCookie("login_time", PhpUtil.time(), -1, "/", cookieDomain, response);
			UCUtil.setCookie("uc_user_id", String.valueOf(user.get("user_id")),-1, "/", cookieDomain, response);
			UCUtil.setCookie("uc_nick_name", String.valueOf(user.get("nick_name")), -1, "/", cookieDomain, response);
			
			
			//-----记住登录状态的处理-------
			String remember_login_state = request.getParameter("hid_remember_login_state");
			
			// 登录成功后，将当前登录用户的uid存储客户端cookie中
			if("1".equals(remember_login_state)){
				//记住登录状态的cookie['uc_uid_state']将设置一周的有效期限，此cookie用于记录登录状态，无$cookieDomain，仅在用户中心处理
				UCUtil.setCookie("uc_uid_state", SecurityUtil.jiami(uid), 3600 * 24 * 7, "/", cookieDomain, response);
			}
			
			//-----记住用户名的处理---------
			String is_remember_me = request.getParameter("hid_remember_me");
			if ("1".equals(is_remember_me)) {
				// 登录用户名有效期设置为2周
				UCUtil.setCookie("account", tname, 3600 * 24 * 7 * 2, "/", cookieDomain, response);
			} else if ("0".equals(is_remember_me)) {
				UCUtil.setCookie("account", null, 0, "/", cookieDomain, response);
			} else {
				// 不作处理
			}
		}
		//登录结果是1时，如果session中包含有sso_type或RelayState，则返回-3，表示需要走aftersso
		//跨子域jsonp请求，不需要返回-3，在登录框中已保存了回调URL。
		if(res.equals("1") && callbackparam==null) {
			if (session.getAttribute("sso_type") != null || session.getAttribute("RelayState") != null) {
				res = "-3";
			}
		}
		//如果是jsonp请求，则返回jsonp格式的数据。	
		if(callbackparam != null) {
			response.getWriter().write(callbackparam+"("+res+")");
		}else {
			response.getWriter().write(res);
		}
	}
	
}
	