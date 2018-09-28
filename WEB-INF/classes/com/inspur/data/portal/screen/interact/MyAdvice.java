package com.inspur.data.portal.screen.interact;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.loushang.internet.util.JsonUtils;
import org.loushang.internet.view.ViewHandler;

import com.inspur.data.common.exception.InvalidParametersException;
import com.inspur.data.common.web.PaginationList;
import com.inspur.data.common.web.ParamUtil;
import com.inspur.portal.model.interact.MessageFeedBack;
import com.inspur.utils.PortalUtils;

public class MyAdvice extends DataTable implements ViewHandler {

	public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	}

	public void doQueryMyInteractiveList(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException, InvalidParametersException {
		Object uid = request.getSession().getAttribute("uid");
		Map<String, String> map_res = new HashMap<String, String>();
		if (uid == null || "".equals(uid.toString())) {
			map_res.put("code", "000001");
			map_res.put("msg", "用户未登录！");
			response.getWriter().write(JsonUtils.convertToString(map_res));
			return;
		}

		PaginationList<MessageFeedBack> result = new PaginationList<MessageFeedBack>();
		int page = ParamUtil.getInteger(request, "page", 1);
		int pageSize = ParamUtil.getInteger(request, "pageSize", 10);
		//内容类型 （1：评论；2：留言反馈；3：纠错）
		String content_type = request.getParameter("interactType");
		if ("0".equals(content_type)) {
			result = PortalUtils.getMessageFeedBackService().queryMessageFeedBackByUserAndType(null,
					Integer.parseInt(uid.toString()), null, null, page, pageSize);
		} else {
			result = PortalUtils.getMessageFeedBackService().queryMessageFeedBackByUserAndType(null,
					Integer.parseInt(uid.toString()), content_type, null, page, pageSize);
		}
		response.getWriter().write(JsonUtils.convertToString(result));
	}

}
