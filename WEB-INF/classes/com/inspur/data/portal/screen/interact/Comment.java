package com.inspur.data.portal.screen.interact;

import java.io.IOException;
import java.net.URLDecoder;
import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.exception.ExceptionUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.loushang.internet.util.JsonUtils;
import org.loushang.internet.view.ViewHandler;

import com.inspur.data.common.exception.DataBaseException;
import com.inspur.data.common.exception.InvalidParametersException;
import com.inspur.data.common.utils.StringUtils;
import com.inspur.data.common.web.PaginationList;
import com.inspur.data.common.web.ParamUtil;
import com.inspur.data.common.web.RequestUtils;
import com.inspur.data.logger.SystemLogger;
import com.inspur.data.od.model.catalog.DataCatalogStatisticDay;
import com.inspur.portal.model.interact.MessageFeedBack;
import com.inspur.portal.model.user.UserOperationLog;
import com.inspur.portal.model.user.UserScore;
import com.inspur.utils.DataUtils;
import com.inspur.utils.PortalUtils;
import com.inspur.utils.UserUtils;

/**
 * @Description:
 * @author heshuying@inspur.com
 * @date 2014年8月27日 下午4:34:46
 */
public class Comment implements ViewHandler {
	private static Log log = LogFactory.getLog(Comment.class);
	public void execute(HttpServletRequest arg0, HttpServletResponse arg1) throws ServletException, IOException {
	}

	public void doAddComment(HttpServletRequest request, HttpServletResponse response)
			throws DataBaseException, IOException {
		try {
			Map<String, String> map = new HashMap<String, String>();
			Map<String, Object> userInfo = (Map<String, Object>) request.getSession().getAttribute("userInfo");
			if (userInfo != null) {
				String content = URLDecoder.decode(ParamUtil.getString(request, "content", ""), "UTF-8");
				int obj_type = ParamUtil.getInteger(request, "obj_type", 0);
				String object_code = ParamUtil.getString(request, "object_code", "");
				int obj_id = ParamUtil.getInteger(request, "obj_id", 0);
				String obj_title = ParamUtil.getString(request, "obj_title", "");
				int content_type = ParamUtil.getInteger(request, "content_type", 1);
				String obj_name=ParamUtil.getString(request, "obj_name","");
				int message_type = ParamUtil.getInteger(request, "message_type", 1);
				
				if (!StringUtils.isBlank(content) && obj_id > 0 && obj_type > 0) {
					Map<String, Object> messageFeedBackMap = new HashMap<String, Object>();
					messageFeedBackMap.put("content", content);
					messageFeedBackMap.put("object_type", obj_type);
					messageFeedBackMap.put("object_code", object_code);
					messageFeedBackMap.put("object_id", obj_id);
					messageFeedBackMap.put("object_title", obj_title);
					messageFeedBackMap.put("ip_addr", RequestUtils.getIpAddr(request));
					messageFeedBackMap.put("status", 0);
					messageFeedBackMap.put("create_Time", new Timestamp(System.currentTimeMillis()));
					messageFeedBackMap.put("uid", Integer.parseInt(userInfo.get("uid").toString()));
					messageFeedBackMap.put("content_type", content_type);
					messageFeedBackMap.put("user_name", userInfo.get("nick_name"));
					messageFeedBackMap.put("message_type",message_type );
					// 创建评论	
					int ID = PortalUtils.getMessageFeedBackService().addMessageFeedBack(messageFeedBackMap);
					if (ID != 0) {
						if (obj_type == 1) {
							// 获取当前日期零点
							SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
							SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
							Calendar calendar = Calendar.getInstance();
							String time = sdf.format(calendar.getTime()) + " 00:00:00";
							Date date = format.parse(time);
							// 数据集评论数加1
							DataCatalogStatisticDay catalogStatisticDay = new DataCatalogStatisticDay();
							catalogStatisticDay.setCata_id(String.valueOf(obj_id));
							catalogStatisticDay.setStatistics_date(date);
							catalogStatisticDay.setAudience_type("2");
							catalogStatisticDay.setComment_count(1);
							catalogStatisticDay.setUpdate_time(new Date());
							DataUtils.getDataCatalogStatisticDayService().addDataCatalogStatisticDay(catalogStatisticDay);											
						} else {
							// 应用评论数加1
							// statisticsService.updateAppStatistics(userInfo.getUid(),
							// obj_id, object_code,
							// AppStatisticsType.COMMENT_COUNT, 1);
						}												
						//添加用户操作日志
						UserOperationLog userOperationLog =new UserOperationLog();
						userOperationLog.setObj_type(String.valueOf(obj_type));
						userOperationLog.setObj_name(obj_name);
						userOperationLog.setObj_id(String.valueOf(obj_id));
						userOperationLog.setOp_type("comment");
						userOperationLog.setUser_id(userInfo.get("user_id").toString());
						userOperationLog.setUser_name(userInfo.get("nick_name").toString());
						 String site_code=request.getSession().getAttribute("area_code").toString();
                         if(StringUtils.isNotEmpty(site_code)){
                        	 userOperationLog.setSite_code(site_code);
                         }
						int logID=PortalUtils.getUserOperationLogService().add(userOperationLog);
						if(logID==0){
							log.error("doAddComment方法中userOperationLog出错");
						}
						map.put("code", "000000");
						map.put("msg", "评论成功，审核之后方能显示！");
						
					} else {
						map.put("code", "000005");
						map.put("msg", "评论发布失败！");												
					}
				} else {
					map.put("code", "000002");
					map.put("msg", "信息不完整！");
				}
			} else {
				map.put("code", "000001");
				map.put("msg", "用户未登录！");
			}			
			response.getWriter().write(JsonUtils.convertToString(map));
			
		} catch (DataBaseException e) {
			SystemLogger.error("UserComment", "查询用户互动交流信息失败", ExceptionUtils.getMessage(e));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	public void doQueryCommentList(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		try {
			int page = ParamUtil.getInteger(request, "page", 1);
			int pageSize = ParamUtil.getInteger(request, "pageSize", 3);
			int message_type = ParamUtil.getInteger(request, "message_type", 1);
			int content_type = ParamUtil.getInteger(request, "content_type", 1);
			String object_id = ParamUtil.getString(request, "object_id", "");

			HashMap<String, Object> params = new HashMap<String, Object>();
			params.put("status", 1);
			params.put("message_type", message_type);
			params.put("content_type", content_type);
			params.put("object_id", object_id);

			PaginationList<MessageFeedBack> messagefeedBackList = PortalUtils.getMessageFeedBackService()
					.queryMessageFeedBackByMap(params, page, pageSize);

			PaginationList<Map<String, Object>> pagelists = new PaginationList<Map<String, Object>>();
			List<Map<String, Object>> maplist = new ArrayList<Map<String, Object>>();

			if (messagefeedBackList.getRecords() != null && !"".equals(messagefeedBackList.getRecords())) {
				for (int i = 0; i < messagefeedBackList.getRecords().size(); i++) {

					MessageFeedBack messageFeedBack = messagefeedBackList.getRecords().get(i);
					Map<String, Object> mparam = new HashMap<String, Object>();
					mparam.put("content", messageFeedBack.getContent());
					if (messageFeedBack.getCreate_time() != null) {
						DateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
						mparam.put("create_time", sdf.format(messageFeedBack.getCreate_time()));
					} else {
						mparam.put("create_time", null);
					}

					String uid = messageFeedBack.getUid().toString();
					String obj_id = messageFeedBack.getObject_id().toString();
					List<UserScore> userScorelist = PortalUtils.getUserScoreService().queryUserScore(3, obj_id, uid);
					if (userScorelist.size() > 0) {
						mparam.put("score", userScorelist.get(0).getScore());
					}

					Map<String, Object> umap = UserUtils.getUserDomain().getUserByUid(Integer.parseInt(uid));

					if (umap != null && !"".equals(umap)) {
						mparam.put("nick_name", umap.get("nick_name"));
						mparam.put("avatar", umap.get("avatar"));// 根据uid调用接口获取头像
					}

					maplist.add(mparam);
				}
			}
			pagelists.setCurrPage(messagefeedBackList.getCurrPage());
			pagelists.setPageSize(messagefeedBackList.getPageSize());
			pagelists.setRecords(maplist);
			pagelists.setTotalPage(messagefeedBackList.getTotalPage());
			pagelists.setTotalRecord(messagefeedBackList.getTotalRecord());

			response.getWriter().write(JsonUtils.convertToString(pagelists));// 返回前台数据
		} catch (DataBaseException e) {
			SystemLogger.error("UserComment", "查询用户互动交流信息失败", ExceptionUtils.getMessage(e));
		} catch (InvalidParametersException e) {
			e.printStackTrace();
		}
	}

}
