package com.inspur.data.portal.screen.interact;

import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.loushang.internet.util.JsonUtils;
import org.loushang.internet.view.ViewHandler;

import com.inspur.data.common.utils.StringUtils;
import com.inspur.data.common.web.ParamUtil;
import com.inspur.portal.model.user.UserOperationLog;
import com.inspur.portal.model.user.UserScore;
import com.inspur.utils.OamUtils;
import com.inspur.utils.PortalUtils;
import com.inspur.utils.SystemUtil;

public class Grade implements ViewHandler {
	private static Log log = LogFactory.getLog(Grade.class);

	public void execute(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
	}

	/**
	 * 增加一条评分记录
	 * 
	 * @param request
	 * @param response
	 */
	@SuppressWarnings("unchecked")
	public void doAddScore(HttpServletRequest request, HttpServletResponse response) {
		try {
			Map<String, String> map = new HashMap<String, String>();
			int obj_type = ParamUtil.getInteger(request, "obj_type", 0);
			int obj_id = ParamUtil.getInteger(request, "obj_id", 0);
			int score = ParamUtil.getInteger(request, "score", 0);
			String object_code =ParamUtil.getString(request, "object_code","");
			if (obj_id > 0 && obj_type > 0) {
				Map<String, Object> userInfo = (Map<String, Object>) request.getSession().getAttribute("userInfo");
				if (userInfo != null) {
					String user_id = userInfo.get("uid").toString();
					boolean result = PortalUtils.getUserScoreService().existUserScore(obj_type, String.valueOf(obj_id),
							user_id);
					if (result) {
						map.put("code", "000003");
						map.put("msg", "不允许重复评分");
					} else {
						UserScore userScore = new UserScore();
						userScore.setObject_id(String.valueOf(obj_id));
						userScore.setObject_type(obj_type);
						userScore.setScore(score);
						userScore.setUid(user_id);
						userScore.setCreate_time(new Date());
						PortalUtils.getUserScoreService().addUserScore(userScore);
						Object object = null;
						if (obj_type == 1) {
							// 数据集评分
						} else {
							// 应用评分
							object = OamUtils.getAppEvaluateService().grade(user_id, obj_id + "", score);
						}
						if (object != null) {
							if (obj_type == 1) {
								// 数据集评分数更新
								// dataStatisticService.updateDataStatistic("scores",obj_id,
								// score);
							} else {
								// 应用评评分更新
								// appStatisticsService.updateAppStatistics(userInfo.getUid(),
								// obj_id, object_code, AppStatisticsType.SCORE,
								// score);
							}					
							//添加用户操作日志						
							UserOperationLog userOperationLog =new UserOperationLog();
							userOperationLog.setLog_lk_id(null);
							userOperationLog.setClient_browser(SystemUtil.getRequestBrowserInfo(request));
							userOperationLog.setClient_code(null);
							userOperationLog.setClient_ip(SystemUtil.getIpAddr(request));
							userOperationLog.setClient_type("PC");
							userOperationLog.setCreate_time(new Date());
							userOperationLog.setClient_system(SystemUtil.getRequestSystemInfo(request));
							userOperationLog.setObj_type("app");
							userOperationLog.setObj_name(object_code);
							userOperationLog.setObj_id(String.valueOf(obj_id));
							userOperationLog.setOp_type("score");
							userOperationLog.setUser_id(userInfo.get("user_id").toString());
							userOperationLog.setUser_name(userInfo.get("nick_name").toString());
							 String site_code=request.getSession().getAttribute("area_code").toString();
                             if(StringUtils.isNotEmpty(site_code)){
                            	 userOperationLog.setSite_code(site_code);
                             }
							int logID=PortalUtils.getUserOperationLogService().add(userOperationLog);
							if(logID==0){
								log.error("doAddScore方法中userOperationLog出错");
							}					
							map.put("code", "000000");
							map.put("msg", "保存成功！");										
						} else {
							map.put("code", "000005");
							map.put("msg", "保存失败！");
						}
					}
				} else {
					map.put("code", "000001");
					map.put("msg", "用户未登录！");
				}
			} else {
				map.put("code", "000002");
				map.put("msg", "信息不完整！");
			}
			response.getWriter().write(JsonUtils.convertToString(map));
		} catch (Exception ex) {
			log.error(ex);
		}
	}

}
