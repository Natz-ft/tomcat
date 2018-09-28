package com.inspur.data.portal.screen.common;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.exception.ExceptionUtils;
import org.loushang.internet.util.JsonUtils;
import org.loushang.internet.view.ViewHandler;

import com.inspur.data.common.logger.SystemLogger;
import com.inspur.data.common.utils.StringUtils;
import com.inspur.data.common.web.ParamUtil;
import com.inspur.data.od.model.catalog.DataCatalogStatisticDay;
import com.inspur.portal.model.user.UserCollection;
import com.inspur.portal.model.user.UserOperationLog;
import com.inspur.portal.model.user.UserScore;
import com.inspur.utils.DataUtils;
import com.inspur.utils.OamUtils;
import com.inspur.utils.PortalUtils;
import com.inspur.utils.SystemUtil;

public class Collection implements ViewHandler {
	
	public void execute(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

	}
	
	@SuppressWarnings("unchecked")
	public void doCollection(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
        UserCollection userCollection = new UserCollection();
        try {
            Map<String, String> map = new HashMap<String, String>();
            Map<String, Object> userInfo = (Map<String, Object>) request.getSession().getAttribute("userInfo");
            if (userInfo != null) {
                int obj_type = ParamUtil.getInteger(request, "obj_type", 1);
                String obj_id = ParamUtil.getString(request, "id", "");
                String object_name = ParamUtil.getString(request, "obj_name", "");
                Integer uid = (Integer) userInfo.get("uid");
         

                //判断用户是否已经收藏
                Map<String,Object> paramMap = new HashMap<String, Object>();
                paramMap.put("object_id", obj_id);
                paramMap.put("object_type", obj_type);
                paramMap.put("uid", uid);
                paramMap.put("status", "1");
                List<UserCollection> userCollectionList = PortalUtils.getUserCollectionService().queryUserCollectionList(paramMap);
                if(null == userCollectionList || userCollectionList.isEmpty()){
                    // Integer uid = "1";
                    if (obj_type != 0 && StringUtils.isNotBlank(obj_id)) {
                        userCollection.setObject_id(obj_id);
                        userCollection.setUid(uid);
                        // 1，目录，3应用
                        userCollection.setObject_type(obj_type);
                        userCollection.setCreateTime(new Date());
                        userCollection.setObject_extend_param("setObject_extend_param");
                        userCollection.setObject_name(object_name);
                        userCollection.setStatus(0);
                        int result = PortalUtils.getUserCollectionService().addUserCollection(userCollection);
                        if(result>0&&obj_type==3){
                        	UserOperationLog userOperationLog=new UserOperationLog();
                        	userOperationLog.setObj_name(object_name);
                        	userOperationLog.setCreate_time(new Date());
                        	userOperationLog.setClient_ip(SystemUtil.getIpAddr(request));
                        	userOperationLog.setClient_browser(SystemUtil.getRequestBrowserInfo(request));
                        	userOperationLog.setClient_system(SystemUtil.getRequestSystemInfo(request));
                        	userOperationLog.setObj_type("app");
                        	userOperationLog.setClient_type("PC");
                        	userOperationLog.setObj_id(obj_id);
                        	userOperationLog.setOp_type("fav");
                        	userOperationLog.setUser_id(userInfo.get("uid").toString());
                        	userOperationLog.setUser_name(userInfo.get("user_id").toString());
                        	 String site_code=request.getSession().getAttribute("area_code").toString();
                             if(StringUtils.isNotEmpty(site_code)){
                            	 userOperationLog.setSite_code(site_code);
                             }
                        	PortalUtils.getUserOperationLogService().add(userOperationLog);
                        }
                        if (result > 0) {
                        	// 获取当前日期零点
    						SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
    						SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    						Calendar calendar = Calendar.getInstance();
    						String time = sdf.format(calendar.getTime()) + " 00:00:00";
    						Date date = format.parse(time);
    						// 数据集收藏数加1
    						DataCatalogStatisticDay catalogStatisticDay = new DataCatalogStatisticDay();
    						catalogStatisticDay.setCata_id(obj_id);
    						catalogStatisticDay.setStatistics_date(date);
    						catalogStatisticDay.setAudience_type("2");
    						catalogStatisticDay.setFav_count(1);
    						catalogStatisticDay.setUpdate_time(new Date());
    						DataUtils.getDataCatalogStatisticDayService().addDataCatalogStatisticDay(catalogStatisticDay);
                        	
                            map.put("fav_id", String.valueOf(obj_id));
                            map.put("code", "000000");
                            map.put("msg", "收藏成功！");
                        } else {
                            map.put("code", "000005");
                            map.put("msg", "收藏失败，请稍后再试");
                        }
                    } else {
                        map.put("code", "000002");
                        map.put("msg", "收藏信息不完整！");
                    }
                }else{
                    map.put("code", "999999");
                    map.put("msg", "已收藏,请勿重新收藏！");
                }
            } else {
                map.put("code", "000001");
                map.put("msg", "用户未登录,请先登录！");
            }
            response.getWriter().write(JsonUtils.convertToString(map));// 返回前台数据
        } catch (Exception e) {
            SystemLogger.error("Collection", "保存用户 收藏信息失败", ExceptionUtils.getMessage(e));
        }
    }
	
	
	@SuppressWarnings("unchecked")
	public void doCancelCollection(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
        try {
            Map<String, String> map = new HashMap<String, String>();
            Map<String, Object> userInfo = (Map<String, Object>) request.getSession().getAttribute("userInfo");
            if (userInfo != null) {
                String obj_type = ParamUtil.getString(request, "obj_type", "1");
                String obj_id = ParamUtil.getString(request, "id");
                String uid = userInfo.get("uid").toString();
                String object_code =ParamUtil.getString(request, "object_code","");
                if (StringUtils.isNotEmpty(obj_id) || StringUtils.isNotEmpty(obj_type)) {
                	if(obj_type.equals("3")){
                		Map<String, Object> appInfoMap = new HashMap<String, Object>();
                		try {
                			appInfoMap = OamUtils.getAppService().getAppInfoByAppId(obj_id);

                		} catch (Exception e) {
                			e.printStackTrace();
                		}
                		UserOperationLog userOperationLog=new UserOperationLog();
						userOperationLog.setLog_lk_id(null);
						userOperationLog.setClient_browser(SystemUtil.getRequestBrowserInfo(request));
						userOperationLog.setClient_code(null);
						userOperationLog.setClient_ip(SystemUtil.getIpAddr(request));
						userOperationLog.setClient_type("PC");
						userOperationLog.setCreate_time(new Date());
						userOperationLog.setClient_system(SystemUtil.getRequestSystemInfo(request));
                		userOperationLog.setObj_type("app");
                    	userOperationLog.setObj_id(obj_id);
                    	userOperationLog.setOp_type("favCancel");
                    	userOperationLog.setUser_id(userInfo.get("uid").toString());
                    	userOperationLog.setUser_name(userInfo.get("user_id").toString());
                    	userOperationLog.setObj_name(appInfoMap.get("app_name").toString());
                    	 String site_code=request.getSession().getAttribute("area_code").toString();
                         if(StringUtils.isNotEmpty(site_code)){
                        	 userOperationLog.setSite_code(site_code);
                         }
                		PortalUtils.getUserOperationLogService().add(userOperationLog);
                		
                	}
                	
                    int result = PortalUtils.getUserCollectionService().deleteUserCollection(obj_id, obj_type, uid);
                    if (result > 0) {
                        map.put("code", "000000");
                        map.put("msg", "取消收藏成功！");
                    } else {
                        map.put("code", "000005");
                        map.put("msg", "取消收藏失败！");
                    }
                } else {
                    map.put("code", "000002");
                    map.put("msg", "提交取消收藏信息不完整！");
                }
            } else {
                map.put("code", "000001");
                map.put("msg", "用户未登录，请先登录！");
            }
            response.getWriter().write(JsonUtils.convertToString(map));// 返回前台数据
        } catch (Exception e) {
            SystemLogger.error("UserComment", "保存用户 取消收藏信息失败", ExceptionUtils.getMessage(e));
        }
    }
	
	/**
	 * 用户评分
	 * <br/>
	 * <p>Description:
	 * <br/>
	 * <p>Author: <a href="mailto:zhang_hy@inspur.com">张华蕴</a><br/>
	 * <p>Date: 2016年10月26日-下午3:14:15<br/>
	 * <p>
	 * @param request
	 * @param response   
	 *
	 */
    @SuppressWarnings("unchecked")
	public void doAddScore(HttpServletRequest request, HttpServletResponse response) {
        Map<String, String> map = new HashMap<String, String>();
        String cata_id = ParamUtil.getString(request, "id", "");
        int score = ParamUtil.getInteger(request, "score", 0);
        int obj_type = ParamUtil.getInteger(request, "obj_type", 1);
        try {
            // 登录验证 测试阶段暂时屏蔽登录验证功能
            Map<String, Object> userInfo = (Map<String, Object>) request.getSession().getAttribute("userInfo");
            if (userInfo != null) {
            	String uid = userInfo.get("uid").toString();
            	//判断用户是否已评分
            	boolean flag = PortalUtils.getUserScoreService().existUserScore(obj_type, cata_id, uid);
            	if(flag){
                    map.put("code", "999999");
                    map.put("msg", "已评分，请勿重复评分！");
            	}else{
	            	 // 更新评分明细表
	                UserScore userscore = new UserScore();
	                userscore.setUid(uid);
	                userscore.setScore(score);
	                userscore.setObject_type(1);
	                userscore.setObject_id(cata_id);
	                userscore.setCreate_time(new java.util.Date());
	                int result = PortalUtils.getUserScoreService().addUserScore(userscore);
	                
	                // 获取当前日期零点
					SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
					SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
					Calendar calendar = Calendar.getInstance();
					String time = sdf.format(calendar.getTime()) + " 00:00:00";
					Date date = format.parse(time);
					// 数据目录 评分加1
					DataCatalogStatisticDay catalogStatisticDay = new DataCatalogStatisticDay();
					catalogStatisticDay.setCata_id(cata_id);
					catalogStatisticDay.setStatistics_date(date);
					catalogStatisticDay.setAudience_type("2");
					catalogStatisticDay.setScore_count(1);
					catalogStatisticDay.setTotal_score(score);
					catalogStatisticDay.setUpdate_time(new Date());
					DataUtils.getDataCatalogStatisticDayService().addDataCatalogStatisticDay(catalogStatisticDay);
	                
	                if (result > 0) {
	                    map.put("code", "000000");
	                    map.put("msg", "评分成功！");
	                } else {
	                    map.put("code", "000002");
	                    map.put("msg", "评分失败！");
	                }
            	}
            } else {
                map.put("code", "000001");
                map.put("msg", "用户未登录，请先登录！");
            }
            response.getWriter().write(JsonUtils.convertToString(map));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
