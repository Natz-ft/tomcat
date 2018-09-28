package com.inspur.data.portal.screen.uc.index;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.loushang.internet.util.el.Function;
import org.loushang.internet.view.ViewHandler;

import com.inspur.ucweb.utils.ConfUtil;
import com.inspur.ucweb.utils.JsonUtils;
import com.inspur.ucweb.utils.PhpUtil;
import com.inspur.ucweb.utils.SecurityUtil;
import com.inspur.ucweb.utils.UCUtil;
import com.inspur.utils.UserUtils;

public class Cabind implements ViewHandler {

	/**
	 * 进入CA--本地账户绑定页面
	 */
	public void execute(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
			// 如果session中不存在ca信息，则强制转向登录页面
			HttpSession session = request.getSession();
			if(session.getAttribute("ca") == null || session.getAttribute("ca").toString().isEmpty()){
				response.sendRedirect(Function.getLink("login/login.jsp"));
				return;
			}
			Map ca =(Map)session.getAttribute("ca");
			// 如果已经与本地账户绑定，则强制转向home页面
			String ca_subject = "";
			if(ca.get("subject") != null){
				ca_subject = ca.get("subject").toString();
			}
			Map user = UserUtils.getUserBindDomain().getMapByOutUidAndType(ca_subject, "ca");
			if(user != null && !user.isEmpty()){
				response.sendRedirect(ConfUtil.getValue("default_relay_state"));
				return;
			}
			// 正常进入绑定页面
			request.setAttribute("ca", ca);
			String msg = "";
			if(ca.get("Type") != null && Integer.parseInt(ca.get("Type").toString()) == 1){
				msg = "e证通 ";
				request.setAttribute("type", 2);
			}else{
				String res = "<html>"
							+"<head>"
							+"<meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\">"
							+"</head>"
							+"<body>"
							+"无效的数字证书类型！"+ca.get("Type")
							+"</body>"
							+"</html>";
				response.getWriter().write(res);
				return;
			}
			request.setAttribute("meta_title", msg+"登录成功，如您已有本地账号，可以直接与本地账号绑定，如没有账号，请先设置本地账号信息：");
			//查询登录失败次数，仅用于判断是否显示验证码及是否进行验证码的校验。
			int login_fail_time = 0;
			if(session.getAttribute("login_fail_time") != null){
				login_fail_time = Integer.parseInt(session.getAttribute("login_fail_time").toString());
			}
			request.setAttribute("title", "证书绑定");
			request.setAttribute("login_fail_time", login_fail_time);
	}
	
	/**
	 * 执行CA与本地用户绑定
	 * 绑定成功返回1，绑定失败，直接返回错误信息。
	 */
	
	public void doCaBind(HttpServletRequest request, HttpServletResponse response)
		throws ServletException, IOException {
		String type = request.getParameter("type");
		HttpSession session = request.getSession();
		
		Map resultInfo = new HashMap();
		// 与现有账号绑定（前提：用户已在本系统登录）
		if ("has_account".equals(type)) {
			if(session.getAttribute("uid") == null){
				resultInfo.put("success", false);
				resultInfo.put("info", "您尚未登录本系统，无权执行该绑定！");
				response.getWriter().write(JsonUtils.convertToString(resultInfo));
				return;
			}
			if(session.getAttribute("ca") == null){
				resultInfo.put("success", false);
				resultInfo.put("info", "数字证书验签失败，绑定失败！");
				response.getWriter().write(JsonUtils.convertToString(resultInfo));
				return;
			}
			//一个证书只能绑定一个用户
			Map ca = (Map)session.getAttribute("ca");
			Map user1 = UserUtils.getUserBindDomain().getMapByOutUidAndType(ca.get("subject").toString(), "ca");
			if(user1 != null){
				resultInfo.put("success", false);
				resultInfo.put("info", "绑定失败，该证书已经与本系统另外一个账号进行了绑定！");
				response.getWriter().write(JsonUtils.convertToString(resultInfo));
				return;
			}
			int uid = Integer.parseInt(session.getAttribute("uid").toString());
			//一个用户也只能绑定一个ca证书
			Map user2 = UserUtils.getUserBindDomain().getMapByUidAndType(uid, "ca");
			if(user2 != null){
				resultInfo.put("success", false);
				resultInfo.put("info", "绑定失败，该账号已经绑定了其他证书！");
				response.getWriter().write(JsonUtils.convertToString(resultInfo));
				return;
			}
			
			Map userInfo = (Map)session.getAttribute("userInfo");
			String user_type = userInfo.get("user_type").toString();
			if(!user_type.startsWith("2")){
				//e证通证书，只能绑定单位用户，不能绑定个人用户。
				resultInfo.put("success", false);
				resultInfo.put("info", "绑定失败，该账号与证书类型不匹配，e证通证书只能绑定单位用户！");
				response.getWriter().write(JsonUtils.convertToString(resultInfo));
				return;
			}
			
			Map param = new HashMap();
			param.put("uid", uid);
			param.put("out_uid", ca.get("subject"));
			param.put("type", "ca");
			
			boolean res = UserUtils.getUserBindDomain().add(param);
			if(res){
				//将证书中的信息，更新至用户的身份资料
				ca.put("uid", uid);
				ca.put("user_type", user_type);
				UserUtils.getUserDomain().updateUserFromCA(ca);
				resultInfo.put("success", true);
				response.getWriter().write(JsonUtils.convertToString(resultInfo));
				return;
			}else{
				resultInfo.put("success", false);
				resultInfo.put("info", "绑定失败，请稍后重试！");
				response.getWriter().write(JsonUtils.convertToString(resultInfo));
				return;
			}
		// 没有本地账号时的绑定
		} else if ("no_account".equals(type)) {
			
			if(session.getAttribute("ca") == null){
				resultInfo.put("success", false);
				resultInfo.put("info", "数字证书验签失败，绑定失败！");
				response.getWriter().write(JsonUtils.convertToString(resultInfo));
				return;
			}
			Map ca = (Map)session.getAttribute("ca");
			if(ca.get("Type")== null || Integer.parseInt(ca.get("Type").toString()) != 1){
				resultInfo.put("success", false);
				resultInfo.put("info", "数字证书验签失败，绑定失败！");
				response.getWriter().write(JsonUtils.convertToString(resultInfo));
				return;
			}
			
			//检查CA是否已与本地账户绑定过。
			Map user1 = UserUtils.getUserBindDomain().getMapByOutUidAndType(ca.get("subject").toString(), "ca");
			if(user1 != null){
				resultInfo.put("success", false);
				resultInfo.put("info", "绑定失败！无效的数字证书类型！");
				response.getWriter().write(JsonUtils.convertToString(resultInfo));
				return;
			}
			Map param = new HashMap();
			param.put("user_id", request.getParameter("login_name"));
			param.put("password", request.getParameter("password"));
			param.put("nick_name", request.getParameter("nick_name"));
			param.put("password_strength", request.getParameter("password_strength"));
			param.put("user_type", 21);
			if(request.getParameter("login_email") != null && !request.getParameter("login_email").toString().isEmpty()){
				param.put("login_email", request.getParameter("login_email"));
			}
			//青岛项目，e证通用户，不存在昵称，昵称即单位名称，取自证书，不允许修改。
			if(ca.get("uname") != null && !ca.get("uname").toString().isEmpty()){
				param.put("nick_name", ca.get("uname"));
				param.put("org_name", ca.get("uname"));
				param.put("uname", ca.get("uname"));
				param.put("org_code", ca.get("Zzjgid"));
				param.put("business_license", ca.get("Gsid"));
				param.put("tax_register_no", ca.get("Swid"));
			}
			//添加关联信息(对应表：uc_user_bind)
			param.put("out_uid", ca.get("subject"));
			param.put("type", "ca");
			
			int res = UserUtils.getUserBindDomain().caBindUser(param);
			
			if(res > 0){
				// 设置session
				session.setAttribute("uid", String.valueOf(res));
				Map user = UCUtil.getUserBasic(res);
				session.setAttribute("userInfo",user );
				session.setAttribute("login_type", "cert");

				//设置cookie
				String cookieDomain = UCUtil.getCookieDomain();
				UCUtil.setCookie("uc_uid", SecurityUtil.jiami(String.valueOf(res)), -1, "/", cookieDomain, response);
				UCUtil.setCookie("login_time", PhpUtil.time(), -1, "/", cookieDomain, response);
				UCUtil.setCookie("uc_user_id", String.valueOf(user.get("user_id")),-1, "/", cookieDomain, response);
				UCUtil.setCookie("uc_nick_name", String.valueOf(user.get("nick_name")), -1, "/", cookieDomain, response);
				UCUtil.setCookie("login_type", "cert", -1, "/", cookieDomain, response);
				
				String ip = UCUtil.getClientIP(request);
				Map loginInfo = new HashMap();
				loginInfo.put("uid", res);
				loginInfo.put("login_ip", UCUtil.getClientIP(request));
				loginInfo.put("login_type", "outacc");
				UserUtils.getUserDomain().afterLoginOk(loginInfo);
				
				resultInfo.put("success", true);
				response.getWriter().write(JsonUtils.convertToString(resultInfo));
				return;
			}else{
				resultInfo.put("success", false);
				resultInfo.put("info", "绑定失败，请稍后重试！");
				response.getWriter().write(JsonUtils.convertToString(resultInfo));
				return;
			}
		}else{
			resultInfo.put("success", false);
			resultInfo.put("info", "无效的绑定类型！" + type);
			response.getWriter().write(JsonUtils.convertToString(resultInfo));
			return;
		}
	}
}
