package com.inspur.data.portal.screen.uc.index;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.loushang.internet.view.ViewHandler;

import com.inspur.portal.model.user.UserOperationLog;
import com.inspur.portal.service.user.UserOperationLogService;
import com.inspur.ucweb.utils.ServiceConst;
import com.inspur.ucweb.utils.SystemUtil;
import com.inspur.ucweb.utils.UCUtil;
import com.inspur.utils.JsonUtils;
import com.inspur.utils.UserUtils;

public class SignUp implements ViewHandler {
    private static Logger log = Logger.getLogger(SignUp.class);

    /**
     * 进入注册页面
     */
    public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setAttribute("meta_title", "用户注册");
        request.setAttribute("title", "用户注册");
    }
    /**
     * 获取短信验证码
     */
    public void doVerifyPhone(HttpServletRequest request, HttpServletResponse response) throws Exception {
    	Map<String, Object> param = new HashMap<String, Object>();
		String mobileStr = request.getParameter("phoneNum");
		System.out.println(mobileStr);
		boolean flag = UserUtils.getUserDomain().sendRegCodeToPhone(mobileStr);
		if (!flag) {
			response.getWriter().write("ExistError");
			return;
		}
		
		Map<String,Object> resultMap = new HashMap<String,Object>();
		resultMap.put("result", 1);
		resultMap.put("msg", "成功");
		PrintWriter outp = response.getWriter();
		outp.write(JsonUtils.convertToString(String.valueOf(resultMap)));
		
    }
    public void doclearPhonenum(HttpServletRequest request, HttpServletResponse response) {
		HttpSession session = request.getSession();
		session.removeAttribute("CertNum");
	}

    /**
     * 注册保存
     */
    public void doSignUp(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession();
        String verify_request = request.getParameter("checknum");
        Object verifyCode = session.getAttribute("verify_code");
        // fix 安全问题，第一次注册后，可以无限注册
        if (verifyCode == null) {
            response.getWriter().write("verifyError");
            return;
        }
        String verify_session = String.valueOf(verifyCode);
        if (!verify_session.equals(verify_request)) {
            response.getWriter().write("verifyError");
            return;
        }
        Map<String, Object> param = new HashMap<String, Object>();
        param.put("is_internal_user", "0");
        param.put("user_id", request.getParameter("login_name"));
        param.put("password_strength", request.getParameter("passwordStrength"));
        String login_email = request.getParameter("login_email");
        param.put("login_email", login_email);
        param.put("password", request.getParameter("password"));
        param.put("nick_name", request.getParameter("nick"));
        param.put("user_type", request.getParameter("user_type"));
        param.put("authen_level", "0");
        int res = UserUtils.getUserDomain().registUser(param);
        if (res > 0) {
            // fix 安全问题，第一次注册后，可以无限注册
            session.removeAttribute("verify_code");
            //重置sessionid
            UCUtil.reGenerateSessionId(request);
            session = request.getSession();
            session.setAttribute("login_email_for_activate", login_email);
            //新开发审计模块  记录用户注册操作
            try {
                //获取用户uid
                Map<String, Object> userinfo = UserUtils.getUserDomain().getUserByUserId(String.valueOf(param.get("user_id")));
                UserOperationLog userOperationLog = new UserOperationLog();
                userOperationLog.setLog_lk_id(null);
                userOperationLog.setClient_browser(SystemUtil.getRequestBrowserInfo(request));
                userOperationLog.setClient_code(null);
                userOperationLog.setClient_ip(SystemUtil.getIpAddr(request));
                userOperationLog.setClient_system(SystemUtil.getRequestSystemInfo(request));
                userOperationLog.setClient_type("PC");
                userOperationLog.setCreate_time(new Date());
                userOperationLog.setObj_id(String.valueOf(userinfo.get("uid")));
                userOperationLog.setObj_name("用户");
                userOperationLog.setObj_type("user");
                userOperationLog.setOp_type("register");//用户注册
                //uc_users中uid对应uc_audit_log_new中user_id
                userOperationLog.setUser_id(String.valueOf(userinfo.get("uid")));
                userOperationLog.setUser_name(request.getParameter("nick"));
                //添加审计日志
                UserOperationLogService userOperationLogService = ServiceConst.getUserOperationLogService();
                int ret = userOperationLogService.add(userOperationLog);
                if (ret > 0) {
                    log.info("注册审计日志添加成功");
                    System.out.println("注册审计日志添加成功");
                }
            } catch (Exception e) {
                log.error("注册审计日志添加失败", e);
                System.out.println("注册审计日志添加失败");
            }
        }
        response.getWriter().write(res + "");
    }

    /**
     * 注册保存
     */
    public void doPhoneSignUp(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession();
        String verify_request = request.getParameter("checknum");
        String verify_session = String.valueOf(session.getAttribute("verify_code"));
        if (!verify_session.equals(verify_request)) {
            response.getWriter().write("verifyError");
            return;
        }
        int result = -3;
        try {
            String login_phone = request.getParameter("login_phone");
            String vcode = request.getParameter("vcode");
            Map<String, Object> param = new HashMap<String, Object>();
            param.put("user_id", request.getParameter("login_name"));
            param.put("password_strength", request.getParameter("passwordStrength"));
            param.put("login_phone", login_phone);
            param.put("code", vcode);
            param.put("password", request.getParameter("password"));
            param.put("nick_name", request.getParameter("nickname"));
            param.put("user_type", request.getParameter("user_type"));
            result = UserUtils.getUserDomain().registUserForPhone(param);
            
            if (result > 0) {
               Map<String, Object> authenParam = new HashMap<String, Object>();
                authenParam.put("uid", result);
                authenParam.put("security_phone", login_phone);
                authenParam.put("security_phone_status", 2);
                UserUtils.getSecurityPasswordDomain().add(authenParam);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        response.getWriter().write(result + "");
    }

    /**
     * 山东注册保存
     */
    public void doPhoneSignUpForSd(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession();
        String verify_request = request.getParameter("checknum");
        String verify_session = String.valueOf(session.getAttribute("verify_code"));
        if (!verify_session.equals(verify_request)) {
            response.getWriter().write("verifyError");
            return;
        }
        int result = -3;
        try {
            String login_phone = request.getParameter("login_phone");
            String vcode = request.getParameter("vcode");
            String login_email = request.getParameter("login_email");
            Map<String, Object> param = new HashMap<String, Object>();
            //			param.put("user_id", request.getParameter("login_name"));//登录用户名，写一个方法，调用接口实现用户名的获取
            param.put("user_id", getUseableUserId(request));
            param.put("password_strength", request.getParameter("passwordStrength"));
            param.put("login_phone", login_phone);
            param.put("login_email", login_email);
            param.put("code", vcode);
            param.put("password", request.getParameter("password"));
            param.put("nick_name", request.getParameter("nickname"));
            param.put("user_type", request.getParameter("user_type"));
            result = UserUtils.getUserDomain().registRealNameUserForPhone(param);
            if (result > 0) {
                //				Map<String,Object> authenParam = new HashMap<String,Object>();
                //				authenParam.put("uid", result);
                //				authenParam.put("security_phone", login_phone);
                //				authenParam.put("security_phone_status", 2);
                //				ServiceConst.getUC_ISecurityPasswordDomain().add(authenParam);	
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        response.getWriter().write(result + "");
    }

    /**
     * 获取可用的User_id，先实现在ucservice中进行获取，之后更改为调用统一用户的服务
     * @return
     */
    private Object getUseableUserId(HttpServletRequest request) {
        // TODO 自动生成的方法存根
        Map userInfo = new HashMap();
        //此处以后会更改为统一用户的服务，进而会做相应的用户信息处理
        int user_id = UserUtils.getUserDomain().getUseableUserId(userInfo);
        return user_id;
    }
}
