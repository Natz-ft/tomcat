package com.inspur.data.portal.screen.uc.password;

import java.io.IOException;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.loushang.internet.view.ViewHandler;

import com.inspur.ucweb.utils.UCUtil;
import com.inspur.utils.AuditLogUtil;
import com.inspur.utils.UserUtils;

public class GetPwd implements ViewHandler {
	
	/**
	 * 进入找回密码页面
	 */
	public void execute(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		
		// 进入找回密码页面之前先将原有会话注销，然后再继续
		// 修复任意用户密码重置漏洞
		HttpSession session = request.getSession(false);
		if (session != null) {
			session.invalidate();
			request.getSession(true);
		}
		request.setAttribute("meta_title", "找回密码");
		
		//记录页面访问日志
		AuditLogUtil.addPageVisitAutiLog(request, "个人设置", "");
	}
	/**
	 * 提交信息，找回密码
	 * -1：验证码不正确
	 * 0：账号不存在
	 * 1：验证通过
	 */
	public void doGetPwd(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
	
		//检查验证码
		HttpSession session = request.getSession();
		String verify_code_session = String.valueOf(session.getAttribute("verify_code"));
		String verify_code_request = request.getParameter("checknum");
		if(!verify_code_session.equals(verify_code_request)){
			response.getWriter().write("-1");
			return;
		}
		//检查登录账号
		String account = request.getParameter("login_name");
		Map user = UCUtil.getUser(account);
		if(user == null){
			response.getWriter().write("0");
		}else{
			session.setAttribute("tempUid", user.get("uid"));
			response.getWriter().write("1");
		}
	}
	/**
	 * 通过安全邮箱找回密码，返回-1，须重新找回，返回1，表示发送邮件成功。
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	public void doGetPwdByMail(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	
		//权限检查
		HttpSession session = request.getSession();
		if(session.getAttribute("tempUid") == null){
			response.getWriter().write("-1");
			return;
		}
		//发送找回密码邮件
		int uid = Integer.parseInt(String.valueOf(session.getAttribute("tempUid")));
		int res = UserUtils.getUserDomain().sendGetPwdEmail(uid);
		if(res == 1){
			response.getWriter().write("1");
		}else{
			response.getWriter().write("-1");
		}
	}
	/**
	 * 找回密码时，向安全手机发送验证码
	 * 返回值：
	 * 0：没有权限
	 * 1：支持手机短信，并且成功生成了验证码
	 * -1:生成验证码失败
	 */
	public void doVerifyPhone(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	
		//权限检查
		HttpSession session = request.getSession();
		if(session.getAttribute("tempUid") == null){
			response.getWriter().write("0");
			return;
		}
		//发送手机验证码
		int uid = Integer.parseInt(session.getAttribute("tempUid").toString());
		Map user_security = UCUtil.getUserSecPass(uid);
		String phone = String.valueOf(user_security.get("security_phone"));
		String random_code = UserUtils.getSecurityPasswordDomain().sendSecPhoneRandomCodeGetPwd(uid, phone);
	
		//如果不支持手机短信，并且成功生成了验证码。
		if(random_code.length() == 4){
			response.getWriter().write(random_code);
			return;
		}
		//如果支持手机短信，并且成功生成了验证码
		if(random_code.equals("1")){
			response.getWriter().write("1");
			return;
		}
		//生成验证码失败
		response.getWriter().write("-1");
	}
	/**
	 * 通过手机找回密码
	 */
	public void doGetPwdByPhone(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	
		//权限检查
		HttpSession session = request.getSession();
		if(session.getAttribute("tempUid") == null){
			response.getWriter().write("0");
			return;
		}
		//接收前台传递过来的，用户提交的手机验证码
		int uid = Integer.parseInt(session.getAttribute("tempUid").toString());
		String vcode = request.getParameter("vcode");
		if(vcode == null || vcode.isEmpty()){
			response.getWriter().write("0");
			return;
		}
		//验证手机验证码的有效性
		Map validation = UserUtils.getValidationDomain().getLatestValidationByUidAndType(uid, "sec_phone_get_pwd");
		if(validation == null){
			response.getWriter().write("0");
			return;
		}
		String code2 = validation.get("code").toString();
		if(!vcode.equals(code2)){
			response.getWriter().write("0");
			return;
		}
		//验证通过，在session中打上标记，并且返回1
		session.setAttribute("resetpwd", "1");
		response.getWriter().write("1");
	}
	
	/**
	 * 通过回答问题，找回密码
	 * 1：验证通过
	 * 0：无权执行该操作
	 * -1：验证码不正确
	 * -2：答案不正确
	 */
	public void doGetPwdByQue(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	
		//权限检查
		HttpSession session = request.getSession();
		if(session.getAttribute("tempUid") == null){
			response.getWriter().write("0");
			return;
		}
		//检查验证码
		String verify_request = request.getParameter("checknum_que");
		String verify_session = String.valueOf(session.getAttribute("verify_code"));
		if(verify_request == null || !verify_request.equals(verify_session)){
			response.getWriter().write("-1");
			return;
		}
		//检查问题答案
		String answer_request = request.getParameter("answer");
		if(answer_request == null){
			response.getWriter().write("-2");
			return;
		}
		int uid = Integer.parseInt(session.getAttribute("tempUid").toString());
		Map user_security = UCUtil.getUserSecPass(uid);
		if(user_security == null){
			response.getWriter().write("-2");
			return;
		}
		String answer_db = String.valueOf(user_security.get("answer"));
		if(! answer_request.equals(answer_db)){
			response.getWriter().write("-2");
			return;
		}
		//验证通过，设置验证通过标记
		session.setAttribute("resetpwd", "1");
		response.getWriter().write("1");
	}
}
