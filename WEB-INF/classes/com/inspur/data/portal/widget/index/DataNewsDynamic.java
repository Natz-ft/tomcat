package com.inspur.data.portal.widget.index;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.exception.ExceptionUtils;
import org.loushang.internet.view.ViewHandler;

import com.inspur.data.common.exception.DataBaseException;
import com.inspur.data.common.exception.InvalidParametersException;
import com.inspur.data.common.web.PaginationList;
import com.inspur.data.logger.SystemLogger;
import com.inspur.portal.model.interact.MessageFeedBack;
import com.inspur.utils.PortalUtils;

/**
 * 数据动态
 */
public class DataNewsDynamic implements ViewHandler {

	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		Map<String, Object> param = new HashMap<String, Object>();
		String region_code = (String) request.getSession().getAttribute("area_code");
		String parent_id = null;
		String content_type = "2";// 内容类型 1 评论、2留言反馈、3纠错
		int status = 1;// 状态 0：待审核1：已审核 2：未通过通过
		int page = 1;
		int pageSize = 4;
		param.put("site_code", region_code);
		param.put("parent_id", parent_id);
		param.put("content_type", content_type);
		param.put("status", status);
		try {
//			PaginationList<MessageFeedBack> list = PortalUtils.getMessageFeedBackService()
//					.queryMessageFeedBackListByContent_type(parent_id, content_type, status, page, pageSize);
//			request.setAttribute("MessageFeedBackList", list);
			PaginationList<MessageFeedBack> list = PortalUtils.getMessageFeedBackService()
					.queryMessageFeedBackListByContent_type(param, page, pageSize);
			request.setAttribute("MessageFeedBackList", list);
		} catch (DataBaseException | InvalidParametersException e) {
			SystemLogger.error("DataNewsDynamic", "execute失败", ExceptionUtils.getStackTrace(e));
		}

	}

}
