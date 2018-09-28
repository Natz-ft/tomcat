package com.inspur.data.portal.screen.uc.index;

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

import com.inspur.ucweb.utils.ConfUtil;
import com.inspur.ucweb.utils.PhpUtil;
import com.inspur.ucweb.utils.SecurityUtil;
import com.inspur.ucweb.utils.UCUtil;
import com.inspur.utils.UserUtils;

public class Bind implements ViewHandler {

	private static Logger log = Logger.getLogger(Bind.class);
	
	/**
	 * 第三方账号登录成功后，进入与本地账户绑定页面
	 */
	public void execute(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		
		// 如果openid为空，则强制转向登录页面
		HttpSession session = request.getSession();
		if(session.getAttribute("openid") == null || session.getAttribute("type") == null){
			response.sendRedirect(Function.getLink("login/login.jsp"));
			return;
		}
		// 如果已经与本地账户绑定
		String openid = String.valueOf(session.getAttribute("openid"));
		String type = String.valueOf(session.getAttribute("type"));
		boolean isBind = UserUtils.getOutBindDomain().isExistByOpenIdAndType(openid, type);
		if(isBind){
			response.sendRedirect(Function.getLink("index/index.do?method=aftersso"));
			return;
		}
		// 正常进入绑定页面
		request.setAttribute("meta_title", "登录成功，如您已有本地账号，可直接与本地账号绑定；如没有，您可以在此设置本地账号，或选择跳过本步骤。");
		request.setAttribute("title", "绑定账号");
		
		String is_enable_login_salt = ConfUtil.getValue("is_enable_login_salt");
		if("1".equals(is_enable_login_salt)){
			//生成随机码，防止登录重放攻击
			String login_salt = UCUtil.getRandom(6); 
			session.setAttribute("login_salt", login_salt);
			request.setAttribute("login_salt", login_salt);
		}
	}
	
	/**
	 * 第三方账号登录，与本地账号绑定，绑定绑定成功返回1，绑定失败，直接返回错误信息。
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	public void doBind(HttpServletRequest request, HttpServletResponse response)
		throws ServletException, IOException {
		
		String type = request.getParameter("type");
		HttpSession session = request.getSession();
		
		// 与现有账号绑定（前提：用户已在本系统登录）
		if ("has_account".equals(type)) {
			if(session.getAttribute("uid") == null){
				response.getWriter().write("您尚未登录本系统，无权执行该绑定！");
				return;
			}
			// 根据uid、type检查同一uid在同一个第三方是否已绑定（一个uid不能绑定2个qq号，但是一个uid可以绑定一个qq、同时绑定一个sina）。
			String uid = String.valueOf(session.getAttribute("uid"));
			String other_login_type = String.valueOf(session.getAttribute("type"));
			boolean isBind = UserUtils.getOutBindDomain().isExistByUidAndType(Integer.parseInt(uid), other_login_type);
			if(isBind){
				response.getWriter().write("绑定失败，该账号已经与另外一个"+ other_login_type+"账号进行了绑定！");
				return;
			}
			Map bind = new HashMap();
			bind.put("uid",uid);
			bind.put("type",session.getAttribute("type"));
			bind.put("access_token",session.getAttribute("access_token"));
			bind.put("openid",session.getAttribute("openid"));
			bind.put("nick_name",session.getAttribute("other_nick_name"));
			boolean res = UserUtils.getOutBindDomain().add(bind);
			
			//绑定已有账号，登录类型视同用户名密码登录，在doLogin中已处理。
			if (res) {
				response.getWriter().write("1");
			} else {
				response.getWriter().write("绑定失败，请稍后重试！");
			}
		// 没有本地账号时的绑定
		} else if ("no_account".equals(type)) {
			
			Map param = new HashMap();
			param.put("user_id", request.getParameter("login_name"));
			param.put("login_email", request.getParameter("login_email"));
			param.put("password", request.getParameter("password"));
			param.put("nick_name", request.getParameter("nickname"));
			param.put("user_type", request.getParameter("user_type"));
			param.put("password_strength", request.getParameter("passwordStrength"));
			
			// 添加 绑定信息
			param.put("type",session.getAttribute("type"));
			param.put("access_token",session.getAttribute("access_token"));
			param.put("openid",session.getAttribute("openid"));
			param.put("other_nick_name",session.getAttribute("other_nick_name"));
			
			// 返回uid
			int uid = UserUtils.getOutBindDomain().bindUser(param);
			if (uid > 0) {
				
				//重置sessionid
				UCUtil.reGenerateSessionId(request);
				session = request.getSession();
				
				// 设置session
				session.setAttribute("uid", String.valueOf(uid));
//				//查询是否开发者信息
//				String developer_id = ServiceConst.getUC_IUserExtendDomain().getValueByUidAndKey(uid+"", "developer_id");
//				if(developer_id != null){
//					session.setAttribute("developer_id", developer_id);
//				}
				Map userInfo = UserUtils.getUserDomain().getUserByUid(uid);
				session.setAttribute("userInfo", userInfo);
				session.setAttribute("login_type", "outacc");
				
				//设置cookie
				String cookie_domain = UCUtil.getCookieDomain();
				UCUtil.setCookie("sso_token", SecurityUtil.jiami(uid+""), -1, "/", cookie_domain, response);
				UCUtil.setCookie("uc_uid", SecurityUtil.jiamiOld(uid+""), -1, "/", cookie_domain, response);
				UCUtil.setCookie("login_time", PhpUtil.time(), -1, "/", cookie_domain, response);
				UCUtil.setCookie("uc_user_id", String.valueOf(userInfo.get("user_id")),-1, "/", cookie_domain, response);
				UCUtil.setCookie("login_type", "userpwd", -1, "/", cookie_domain, response);
				UCUtil.setCookie("uc_nick_name", String.valueOf(userInfo.get("nick_name")), -1, "/", cookie_domain, response);
				
				String ip = UCUtil.getClientIP(request);
				Map loginInfo = new HashMap();
				loginInfo.put("uid", uid);
				loginInfo.put("login_ip", UCUtil.getClientIP(request));
				loginInfo.put("login_type", "outacc");
				UserUtils.getUserDomain().afterLoginOk(loginInfo);
				
				response.getWriter().write("1");
			} else {
				response.getWriter().write("绑定失败，请稍后重试!");
			}
		} else {
			response.getWriter().write("绑定失败，请联系系统管理员！");
			log.error("未知的绑定类型："+type);
		}
	}
	/**
	  * 使用第三方账号登陆时，跳过绑定。。。
	  * -2   越权访问
	  * -1 当前外部账号已经与本地系统账号绑定
	  * 0  未知的系统错误
	  * 1 绑定成功
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	public void doSkipBind(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	 	
	 	// 如果openid为空，则强制转向登录页面
		HttpSession session = request.getSession();
		if(session.getAttribute("openid") == null || session.getAttribute("type")==null){
			response.getWriter().write("-2");
			return;
		}
		//为用户分配账号，并将分配的账号与第三方账号进行绑定
		Map param = new HashMap();
		param.put("type", session.getAttribute("type"));
		param.put("access_token", session.getAttribute("access_token"));
		param.put("openid", session.getAttribute("openid"));
		param.put("nick_name", session.getAttribute("other_nick_name"));
		
		// -2   越权访问	
		//-1 当前外部账号已经与本地系统账号绑定
		//0  未知的系统错误
		//uid 绑定成功，返回uid
		int res = UserUtils.getUserDomain().skipBind(param);
		if(res>0){
			Map userInfo = UCUtil.getUserBasic(res);
			if(userInfo == null){
				response.getWriter().write("0");
				return;
			}
			//重置sessionid
			UCUtil.reGenerateSessionId(request);
			session = request.getSession();
			
			// 设置session
			session.setAttribute("uid", String.valueOf(res));
//			//查询是否开发者信息
//			String developer_id = ServiceConst.getUC_IUserExtendDomain().getValueByUidAndKey(res+"", "developer_id");
//			if(developer_id != null){
//				session.setAttribute("developer_id", developer_id);
//			}
			session.setAttribute("userInfo", userInfo);
			session.setAttribute("login_type", "outacc");
			
			//设置cookie
			String cookie_domain = UCUtil.getCookieDomain();
			UCUtil.setCookie("sso_token", SecurityUtil.jiami(res+""), -1, "/", cookie_domain, response);
			UCUtil.setCookie("uc_uid", SecurityUtil.jiamiOld(res+""), -1, "/", cookie_domain, response);
			UCUtil.setCookie("login_time", PhpUtil.time(), -1, "/", cookie_domain, response);
			UCUtil.setCookie("login_type", "outacc", -1, "/", cookie_domain, response);
			UCUtil.setCookie("uc_user_id", String.valueOf(userInfo.get("user_id")), -1, "/", cookie_domain, response);
			UCUtil.setCookie("uc_nick_name", String.valueOf(userInfo.get("nick_name")), -1, "/", cookie_domain, response);

			String ip = UCUtil.getClientIP(request);
			Map loginInfo = new HashMap();
			loginInfo.put("uid", res);
			loginInfo.put("login_ip", UCUtil.getClientIP(request));
			loginInfo.put("login_type", "outacc");
			UserUtils.getUserDomain().afterLoginOk(loginInfo);
			
			response.getWriter().write("1,"+userInfo.get("user_id"));
		}else{
			response.getWriter().write(res+"");
		}
	 }
}
