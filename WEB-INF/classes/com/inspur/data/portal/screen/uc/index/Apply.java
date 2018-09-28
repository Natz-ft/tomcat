package com.inspur.data.portal.screen.uc.index;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.loushang.internet.view.ViewHandler;

import com.inspur.utils.UserUtils;

public class Apply implements ViewHandler {

	/**
	 * 进入账号申请页面
	 */
	public void execute(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		request.setAttribute("meta_title", "申请账号");
		request.setAttribute("title", "申请账号");
	}

	/**
	 * 发送账号申请
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	public void doApply(HttpServletRequest request, HttpServletResponse response)throws ServletException, IOException {
		
		String checknum = request.getParameter("checknum");
		String checknum_session = String.valueOf(request.getSession().getAttribute("verify_code"));
		if(!checknum_session.equals(checknum)){
			response.getWriter().write("verifyError");
			return;
		}
		String user_type = request.getParameter("user_type");
		String login_email = request.getParameter("login_email");
		String nick_name = request.getParameter("nickname");
		Map<String,String> param = new HashMap<String,String>();
		param.put("user_type", user_type);
		param.put("login_email", login_email);
		param.put("nick_name", nick_name);
		
		if("11".equals(user_type)){
			param.put("login_phone", request.getParameter("phoneNum"));
		}else if("21".equals(user_type)){
			param.put("login_phone", request.getParameter("tel_phone"));
			param.put("contacts_name", request.getParameter("contacts_name"));
		}else{
			response.getWriter().write("发送申请失败！未知的用户类型"+user_type);
			return;
		}
		int res = UserUtils.getUserDomain().applyAccount(param);
		response.getWriter().write(res+"");
}
}
