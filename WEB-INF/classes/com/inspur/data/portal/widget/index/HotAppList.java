package com.inspur.data.portal.widget.index;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.loushang.internet.view.ViewHandler;

import com.inspur.utils.ConfUtil;
import com.inspur.utils.OamUtils;

/**
 * 热门app
 */
public class HotAppList implements ViewHandler {

	public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String regionCode = (String) request.getSession().getAttribute("area_code");
		// 应用推荐
		Map<String, Object> promotionalParam = new HashMap<String, Object>();
		promotionalParam.put("_order", "statistic.use_amount desc");
		if (regionCode != null && regionCode != "" && !regionCode.isEmpty()) {
			promotionalParam.put("site_code", regionCode);
		}
		String flag_app="1";
		promotionalParam.put("flag_app", flag_app);
		promotionalParam.put("install_status", 2);//站点上线应用
		Map<String,Object> appMap = OamUtils.getAppService().findOnlineAppInfo(promotionalParam, 6, 1);
		List<Map<String,Object>> appListInfoMap = (List<Map<String, Object>>) appMap.get("data");
		if (appListInfoMap != null && appListInfoMap.size() > 0) {
			for (Map<String,Object>  appInfoMap : appListInfoMap) {
				String appPic = String.valueOf(appInfoMap.get("app_icon"));
				// 图标展示地址
				String logoUrl = ConfUtil.getConfValue("global.index.rcservice") + "/doc?doc_id=" + appPic;
				appInfoMap.put("app_logo", logoUrl);
				// 查询应用平台分布，pc 安卓 or IOS
				appInfoMap.put("appFeatureList", appInfoMap.get("featureList"));
			}
		}
		request.setAttribute("hotAppList", appListInfoMap);

	}

}
