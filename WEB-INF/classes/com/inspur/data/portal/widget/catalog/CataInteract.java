package com.inspur.data.portal.widget.catalog;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.exception.ExceptionUtils;
import org.loushang.internet.view.ViewHandler;

import com.inspur.data.common.logger.SystemLogger;
import com.inspur.data.common.web.ParamUtil;
import com.inspur.data.od.model.catalog.DataCatalogStatistic;
import com.inspur.portal.model.user.UserScore;
import com.inspur.utils.DataUtils;
import com.inspur.utils.PortalUtils;

/**
 * 数据目录互动信息
 */
public class CataInteract implements ViewHandler {
	
	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String cata_id = ParamUtil.getString(request, "cata_id", "");
		try {
			// 获取统计热度
			DataCatalogStatistic cataInteractive = DataUtils.getDataCatalogStatisticService()
					.getDataCatalogStatistic(cata_id, "2");
			request.setAttribute("interactiveMap", cataInteractive);
			//获取当前目录的评分值
			Map<String, Object> userInfo = (Map<String, Object>) request.getSession().getAttribute("userInfo");
			int score=0;
			if (userInfo!=null) {
				String uid = userInfo.get("uid").toString();
				List<UserScore> list = PortalUtils.getUserScoreService().queryUserScore(1, cata_id, uid);
				if(null != list && !list.isEmpty() && list.size()>0){
					score = list.get(0).getScore();
				}
			}
			
			request.setAttribute("score", score);
			
		} catch (Exception e) {
			SystemLogger.error("CataInteract", "execute失败", ExceptionUtils.getStackTrace(e));
		}
	}
}
