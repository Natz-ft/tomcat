package com.inspur.data.portal.screen.uc.security;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.loushang.internet.util.JsonUtils;
import org.loushang.internet.view.ViewHandler;

import com.inspur.uc.api.security.ISecurityPasswordDomain;
import com.inspur.uc.api.user.IUserDomain;
import com.inspur.ucweb.utils.ConfUtil;
import com.inspur.ucweb.utils.UCUtil;
import com.inspur.ucweb.utils.UcServiceUtil;
import com.inspur.utils.AuditLogUtil;
import com.inspur.utils.UserUtils;
import com.inspur.uum.UumUtil;

public class SecurityAction implements ViewHandler {

	private String theme = ConfUtil.getFrameValue("frame.theme");
	private IUserDomain userDomain = UserUtils.getUserDomain();
	private ISecurityPasswordDomain securityPasswordDomain = UserUtils.getSecurityPasswordDomain();

	public void execute(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		//记录页面访问日志
		AuditLogUtil.addPageVisitAutiLog(request, "个人设置", "");
	}

	public void doSaveSecAsk(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out = response.getWriter();
		Map<String, Object> result = new HashMap<String, Object>();
		HttpSession session = request.getSession();
		if (session.getAttribute("uid") == null) {
			result.put("success", 0);
			result.put("info", "未登录或者登录已失效！");
		} else {
			String oldAnswer = request.getParameter("oldAnswer");
			String newQue = request.getParameter("newQue");
			String newAnswer = request.getParameter("newAnswer");
			String password = request.getParameter("password");
			if (newQue.isEmpty() || newAnswer.isEmpty() || password.isEmpty()) {
				result.put("success", 0);
				result.put("info", "提交表单不允许为空！");
			}
			// 检查登录密码是否正确
			int uid = Integer.parseInt(session.getAttribute("uid").toString());
			boolean match =userDomain.isMatch(uid,
					password);
			if (match) {
				// 设置新密保问题和答案（后端会进一步检查答案是否匹配）
				int bind = securityPasswordDomain.setSecurityQuestion(uid, null, oldAnswer, newQue,
								newAnswer);
				if (bind == 1) {
					session.setAttribute("newQue", newQue);
					result.put("success", 1);
					result.put("info", "保存成功！");
				} else if (bind == -1) {
					result.put("success", 0);
					result.put("info", "旧问题答案不匹配，请重新填写！");
				} else {
					result.put("success", 0);
					result.put("info", "出现错误，请稍后重试！");
				}
			} else {
				result.put("success", 0);
				result.put("info", "登录密码填写有误，请重新填写！");
			}
		}
		out.write(JsonUtils.convertToString(result));
	}

	/**
	 * 绑定安全手机
	 */
	public void doBindPhone(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {

		// 0表示尚未登录或者后台原因的绑定失败或参数为空；
		// -2表示登录密码填写有误，绑定失败；
		// -1表示手机号和校验码不一致,绑定失败；
		// 2、非预期系统错误
		int result = 0;
		HttpSession session = request.getSession();
		if (session.getAttribute("uid") != null) {
			int uid = Integer.parseInt(session.getAttribute("uid").toString());
			String vcode = request.getParameter("vcode");
			String password = request.getParameter("password");
			if (!UCUtil.isEmpty(vcode) && !UCUtil.isEmpty(password)) {

				// 检查登录密码是否正确
				boolean match = userDomain.isMatch(uid,
						password);
				if (match) {
					// 执行绑定手机，会在后端检查验证码/手机的的正确性
					result = securityPasswordDomain.bindSecPhone(uid, vcode, null);
				} else {
					result = -2;
				}
			}
		}
		PrintWriter out = response.getWriter();
		out.write(JsonUtils.convertToString(result));
	}
	
	/**
	 * 绑定安全手机
	 */
	public void doBindPhoneCQ(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {

		// 0表示尚未登录或者后台原因的绑定失败或参数为空；
		// -2表示登录密码填写有误，绑定失败；
		// -1表示手机号和校验码不一致,绑定失败；
		// 2、非预期系统错误
		int result = 0;
		HttpSession session = request.getSession();
		if (session.getAttribute("uid") != null) {
			int uid = Integer.parseInt(session.getAttribute("uid").toString());
			String vcode = request.getParameter("vcode");
			String mobile = request.getParameter("mobile");
			String password = request.getParameter("password");
			if (!UCUtil.isEmpty(vcode) && !UCUtil.isEmpty(password)) {
				// 检查登录密码是否正确
				boolean match = userDomain.isMatch(uid,
						password);
				if (match) {
					// 执行绑定手机，会在后端检查验证码/手机的的正确性
					result = securityPasswordDomain.bindSecPhone(uid, vcode, null);
					//更新专家移动电话
					Map<String,Object> perParam=new HashMap<String,Object>();
					perParam.put("uid", uid);
					perParam.put("yddh", mobile);
					perParam.put("updatedate", new Date());
				} else {
					result = -2;
				}
			}
		}
		PrintWriter out = response.getWriter();
		out.write(JsonUtils.convertToString(result));
	}

	public void doBindMail(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {

		// 1：成功发送绑定激活邮件
		// 0：用户名与登录密码不匹配
		// -1：旧绑定邮箱不匹配
		// -2：服务端错误，稍后重试
		int result = 0;
		HttpSession session = request.getSession();
		if (session.getAttribute("uid") != null) {
			int uid = Integer.parseInt(session.getAttribute("uid").toString());
			String oldMail = request.getParameter("oldMail");
			if (oldMail != null) {
				oldMail = oldMail.trim();
			}
			String newMail = request.getParameter("newMail");
			String password = request.getParameter("password");

			if (!UCUtil.isEmpty(newMail) && !UCUtil.isEmpty(password)) {
				result = securityPasswordDomain.bindSecEmail(uid, password, oldMail, newMail);
			}
		}
		response.getWriter().write(
				JsonUtils.convertToString(String.valueOf(result + "")));
	}

	public void doChangePwd(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {

		// 0-更新失败 1-更新成功 -1-原密码输入错误
		int result = 0;
		HttpSession session = request.getSession();
		if (session.getAttribute("uid") != null) {
			int uid = Integer.parseInt(session.getAttribute("uid").toString());
			String newPassWord = request.getParameter("newPassWord");
			String oldPassWord = request.getParameter("oldPassWord");
			String newPassWordStrength = request
					.getParameter("newPassWordStrength");
			if ("pcp".equals(theme)) {
				// pcp主题不检测原密码
				if (!UCUtil.isEmpty(newPassWord)) {
					result = userDomain.updatePassword(uid, newPassWord, oldPassWord, newPassWordStrength);
				}
			} else {
				if (!UCUtil.isEmpty(newPassWord)
						&& !UCUtil.isEmpty(oldPassWord)) {

					Map userMap = userDomain.getUserByUid(uid);// 获取原有usermap信息
					result = userDomain.updatePassword(
							uid, newPassWord, oldPassWord, newPassWordStrength);

					if (result == 1) { // 修改密码成功后调用统一用户管理系统修改密码
						try {
							if("true".equals(ConfUtil.getUumConf("isUse.UpdatePwd"))) {
								boolean sysResult = UumUtil.sysPassword(uid,
										newPassWord, oldPassWord);
								
								if (!sysResult) {// 同步失败,将密码改为原有密码
									String password_strength = "";
									if (userMap.get("password_strength") != null) {
										password_strength = userMap.get(
												"password_strength").toString();
									}
									userDomain.updatePassword(
											uid, (String) userMap.get("password"),
											newPassWord, password_strength);
									result = 0; // 密码更新失败
								}
							}
						} catch (Exception e) {
							System.out.println("调用统一用户管理系统修改密码失败");
						}
					}
				}
			}
		}
		response.getWriter().write(
				JsonUtils.convertToString(String.valueOf(result)));
	}

	// 绑定安全手机，发送手机短信验证码
	public void doVerifyPhone(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {

		// 0:尚未登录或参数错误、四位随机码：不支持手机短信，并且生成验证码成功、1：支持手机短信，并且生成验证码成功-1：生成验证码出错
		String result = "0";
		HttpSession session = request.getSession();
		if (session.getAttribute("uid") != null) {
			int uid = Integer.parseInt(session.getAttribute("uid").toString());
			String mobile = request.getParameter("mobile");
			if (!UCUtil.isEmpty(mobile)) {
				String code = securityPasswordDomain.sendSecPhoneRandomCode(uid, mobile);
				if (!UCUtil.isEmpty(code)
						&& (code.length() == 4 || code.length() == 1)) {
					result = "1";
				} else {
					result = "-1";
				}
			}
		}
		PrintWriter out = response.getWriter();
		out.write(JsonUtils.convertToString(result));
	}

	public void doReSendActivateEmail(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {

		PrintWriter out = response.getWriter();
		String result = "0";
		HttpSession session = request.getSession();
		if (session.getAttribute("uid") != null) {
			int uid = Integer.parseInt(session.getAttribute("uid").toString());
			result = securityPasswordDomain.sendBindActivateEmail(uid, "") ? "1" : "0";
		}
		out.write(JsonUtils.convertToString(result));
	}

}
