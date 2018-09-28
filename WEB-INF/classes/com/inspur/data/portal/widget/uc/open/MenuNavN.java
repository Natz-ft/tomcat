package com.inspur.data.portal.widget.uc.open;

import java.io.IOException;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.loushang.internet.view.ViewHandler;

import com.inspur.ucweb.utils.UcServiceUtil;
import com.inspur.utils.UserUtils;

public class MenuNavN implements ViewHandler {

	public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		Map<String, Object> userInfo = (Map<String, Object>) request.getSession().getAttribute("userInfo");
		String authen_level = "0"; // 认证级别，2表示已经认证通过
		if (userInfo != null) {
			authen_level = UserUtils.getUserDomain()
					.getAuthenLevelByUid(Integer.valueOf(String.valueOf(userInfo.get("uid")))) + "";
		}
		request.setAttribute("authen_level", authen_level);
	}

}
