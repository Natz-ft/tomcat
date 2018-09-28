package com.inspur.data.portal.screen.uc.index;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.loushang.internet.view.ViewHandler;

import com.inspur.utils.UserUtils;

public class DoRegisterActivateEmail implements ViewHandler {
	
	private static Log log = LogFactory.getLog(DoRegisterActivateEmail.class);
	
	/**
	 * 邮箱注册，激活账号
	 */
	public void execute(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String validationid = request.getParameter("validationid");
		String validationcode = request.getParameter("validationcode");
		int validationid_int = -1;
		try {
			validationid_int = Integer.parseInt(validationid);
		} catch (Exception e) {
			log.error("无效的validationid", e);
		}
		if(validationid_int == -1){
			request.setAttribute("flag", "0");
		}else{
			// 点击激活操作，1、激活成功；-1、无效的激活链接；0、激活链接已失效；-2，账户已锁定或删除，不允许激活；-3，未知的错误
			int res = UserUtils.getUserDomain().doActivate(validationid_int, validationcode);
			if(res == 0){
				//等于0时，查询该用户的login_email，并放入session
				int uid = UserUtils.getValidationDomain().getUidByValidationId(validationid_int);
				if(uid > 0){
					String login_email = UserUtils.getUserDomain().getLoginEmailByUid(uid+"");
					if(login_email != null && login_email.length()>0){
						request.getSession().setAttribute("login_email_for_activate", login_email);
					}
				}
			}
			request.setAttribute("flag", res);
		}
		request.setAttribute("meta_title", "邮件激活");
		request.setAttribute("title", "用户注册");
	}
}
