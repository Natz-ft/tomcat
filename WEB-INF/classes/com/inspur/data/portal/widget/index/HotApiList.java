package com.inspur.data.portal.widget.index;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.loushang.internet.view.ViewHandler;

import com.inspur.utils.OamUtils;

/**
 * 热门API
 */
public class HotApiList implements ViewHandler {

	public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// 获取根据申请次数获取热门API，所有的订阅
		String regionCode = (String) request.getSession().getAttribute("area_code");
		Map<String, Object> param = new HashMap<String, Object>();
		int total = 8;
		if (regionCode != null && regionCode != "" && !regionCode.isEmpty()) {
			param.put("site_code", regionCode);
		}
		param.put("is_internal", 0);
		List<Map<String, Object>> apiList = OamUtils.getServiceSubscriptionService().getServiceSubTopList(param, total);
		request.setAttribute("hotApiList", apiList);

	}

}
