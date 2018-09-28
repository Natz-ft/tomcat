/*
 * @FileName: [App.java] 
 * @Package com.inspur.data.portal.jn.widget.rightComment 
 * 
 * 
 * Copyright (c) 2011-2015 INSPUR Technology Limited Com.
 * All rights reserved.
 * 
 * This software is the confidential and proprietary 
 * information of INSPUR Technology Limited Company
 * ("Confidential Information"). You shall not disclose 
 * such Confidential Information and shall use it only
 * in accordance with the terms of the contract agreement 
 * you entered into with RKY.
 * 
 * $Rev$
 * $LastChangedDate$
 * $LastChangedBy$
 * 
 * @category inspur
 * @version 1.1
 * @author <a href="mailto:zhang_hy@inspur.com">张华蕴</a>
 *
 * Change History:[Formatter: author date description] <br/>
 * 1
 * 2
 * 3
*/

package com.inspur.data.portal.widget.rightComment;

import java.io.IOException;
import java.util.ArrayList;
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
 * 右侧公共推荐应用<br/>
 * <p>
 * Description:<br/>
 * <p>
 *
 * <p>
 * For Examples <br/>
 * 
 * <PRE>
 *      TODO 代码使用示例
 * </PRE>
 * <p>
 */
public class App implements ViewHandler {

	/*
	 * (non-Javadoc) Description: <br/>
	 *
	 * @param arg0
	 * 
	 * @param arg1
	 * 
	 * @throws ServletException
	 * 
	 * @throws IOException
	 * 
	 * @see org.loushang.internet.view.ViewHandler#execute(javax.servlet.http.
	 * HttpServletRequest, javax.servlet.http.HttpServletResponse)
	 */
	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// 获取推荐的应用
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
		request.setAttribute("appInfos_tj", appListInfoMap);
	}

}
