package com.inspur.data.portal.screen.interact;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.loushang.internet.util.JsonUtils;
import org.loushang.internet.view.ViewHandler;

import com.inspur.data.common.web.PaginationList;
import com.inspur.data.common.web.ParamUtil;
import com.inspur.hsf.config.ServiceFactory;
import com.inspur.portal.model.interact.MessageFeedBack;
import com.inspur.portal.service.interact.MessageFeedBackService;

public class myInteract implements ViewHandler {

	private static Logger log = Logger.getLogger(myInteract.class);

	public void execute(HttpServletRequest request, HttpServletResponse response) 
			throws ServletException, IOException {
	}

	/**
	 * 检索自己发的互动交流
	 * 
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 * @throws Exception
	 */
	public void doQueryMyInteractiveList(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException, Exception {
		Object uid = request.getSession().getAttribute("uid");
		Map<String, String> map_res = new HashMap<String, String>();
		if (uid == null || "".equals(uid.toString())) {
			map_res.put("code", "000001");
			map_res.put("msg", "用户未登录！");
			response.getWriter().write(JsonUtils.convertToString(map_res));
			return;
		}

		MessageFeedBackService messageFeedBackService = (MessageFeedBackService) ServiceFactory
				.getService("messageFeedBackService");

		// 经过过滤器过滤后，uid可在session中直接获取
		PaginationList<MessageFeedBack> result = new PaginationList<MessageFeedBack>();
		// int uid = ParamUtil.getInteger(request, "uid", 5011301);
		int page = ParamUtil.getInteger(request, "page", 1);
		int pageSize = ParamUtil.getInteger(request, "pageSize", 10);
		String content_type = request.getParameter("interactType");
		if ("0".equals(content_type)) {
			result = messageFeedBackService.queryMessageFeedBackByUserAndType(null, Integer.parseInt(uid.toString()),
					null, null, page, pageSize);
		} else {
			result = messageFeedBackService.queryMessageFeedBackByUserAndType(null, Integer.parseInt(uid.toString()),
					content_type, null, page, pageSize);
		}
		response.getWriter().write(JsonUtils.convertToString(result));// 返回前台数据
	}

	/**
	 * 删除我的互动交流
	 * 
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	public void doDeleteMyInteractive(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// 经过过滤器过滤后，uid可在session中直接获取
		MessageFeedBackService messageFeedBackService = (MessageFeedBackService) ServiceFactory
				.getService("messageFeedBackService");
		try {
			int id = ParamUtil.getInteger(request, "id", 0);
			int result = messageFeedBackService.deleteMessageFeedBackById(id);
			response.getWriter().write(result + "");// 返回前台数据
		} catch (Exception e) {
			log.error("删除我的互动交流失败");
		}
	}
}
