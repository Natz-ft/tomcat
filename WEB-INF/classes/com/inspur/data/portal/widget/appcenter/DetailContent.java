package com.inspur.data.portal.widget.appcenter;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.loushang.internet.util.StringUtils;
import org.loushang.internet.view.ViewHandler;

import com.inspur.data.common.web.ParamUtil;
import com.inspur.portal.model.user.UserCollection;
import com.inspur.portal.model.user.UserScore;
import com.inspur.utils.ConfUtil;
import com.inspur.utils.OamUtils;
import com.inspur.utils.PortalUtils;
import com.inspur.utils.UCUtil;

/**
 * 
 * <strong>Title : DetailContent.java <br>
 * </strong> <strong>Description : </strong>TODO<br>
 * <strong>Create on : 2014年9月5日 下午2:22:20 <br>
 * </strong>
 * <p>
 * <strong>Copyright (C) Inspur Co.,Ltd.<br>
 * </strong>
 * <p>
 * 
 * @author <a href="mailto:heshuying@inspur.com">haowx</a><br>
 * @version <strong>V1.0</strong><br>
 *          <br>
 *          <strong>修改历史:</strong><br>
 *          修改人 修改日期 修改描述<br>
 *          -------------------------------------------<br>
 *          <br>
 *          <br>
 */
public class DetailContent implements ViewHandler {

	public void execute(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		int app_id = ParamUtil.getInteger(request, "app_id");
		Map<String, Object> param = new HashMap<String, Object>();
		String flag_app="1";
		param.put("flag_app", flag_app);
		param.put("app_id", app_id);
		param.put("install_status", 2);//站点上线应用
		Map AppInfo = OamUtils.getAppService().findOnlineAppInfo(param, 2, 1);
		List<Map<String, Object>> appList = (List<Map<String, Object>>) AppInfo.get("data");
		Map<String,Object> mapAppInfo = appList.get(0);
		List<Map<String, Object>> appFeatureList = (List<Map<String, Object>>) mapAppInfo.get("featureList");
		if(!UCUtil.isBlank(appFeatureList)){
			for(Map<String, Object> Feature : appFeatureList){
				String platform_type= Feature.get("platform_type")==null?"":Feature.get("platform_type").toString();
				String app_type= Feature.get("app_type")==null?"":Feature.get("app_type").toString();
				String app_url= Feature.get("app_url")==null?"":Feature.get("app_url").toString();
				if("pc".equals(app_type)){
					mapAppInfo.put(app_type, app_url);
				}else{
					mapAppInfo.put(platform_type, app_url);
				}
			}
		}
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("client_id", app_id);
		Map feachInfo = OamUtils.getAppStatisticService().getAppStatisticCount(map);
		
		if(feachInfo!=null){
			mapAppInfo.put("download_amount", feachInfo.get("download_amount"));
			mapAppInfo.put("use_count", feachInfo.get("use_amount"));
			mapAppInfo.put("app_comment", feachInfo.get("comment_amount"));
			mapAppInfo.put("score", feachInfo.get("avg_grade"));
			request.setAttribute("appgrade", feachInfo.get("avg_grade"));
		}
		Map<String, Object> appPic = new HashMap<String, Object>();
		appPic = (Map<String, Object>) appFeatureList.get(0).get("pic_info");
		if (null != appPic && !appPic.isEmpty()) {
			if (appPic.containsKey("icon")) {
				List<String> iconList = (List<String>) appPic.get("icon");
				if (null != iconList && iconList.size() > 0) {
					// 图标展示地址
					String logoUrl = "";
					String logo = iconList.get(0);
					if (logo != null && !"".equals(logo)) {
						logoUrl = ConfUtil.getConfValue("global.index.rcservice") + "/doc?doc_id=" + logo;
					}
					mapAppInfo.put("app_logo", logoUrl);
				}
			}
			if (appPic.containsKey("preview")) {
				List<String> previewList = (List<String>) appPic.get("preview");
				List<String> appPreviewList = new ArrayList<String>();
				if (null != previewList && previewList.size() > 0) {
					for (String temp : previewList) {
						if (temp != null && !"".equals(temp)) {
							String url = ConfUtil.getConfValue("global.index.rcservice") + "/doc?doc_id=" + temp;
							appPreviewList.add(url);
						}
					}
					mapAppInfo.put("app_preview", appPreviewList);
				}
			}
		}
		List<Map<String, Object>> groupList = new ArrayList<Map<String, Object>>();
		groupList = (List<Map<String, Object>>) mapAppInfo.get("groupList");
		if (null != groupList && groupList.size() > 0) {
			List<String> group = new ArrayList<String>();
			for (int i = 0; i < groupList.size(); i++) {
				Map<String, Object> temp = groupList.get(i);
				if (temp.containsKey("name")) {
					String group_name = (String) temp.get("name");
					group.add(group_name);
				}
			}
			mapAppInfo.put("group", group);
		}
		String obj_id=app_id+"";
		List<UserScore> userScorelist = PortalUtils.getUserScoreService().queryUserScore(3, obj_id, null);
		double appScore = 0;
		if(StringUtils.isNotEmptyList(userScorelist)){
			double appAllScore = 0;
			for(UserScore score:userScorelist){
				appAllScore += score.getScore();
			}
			appScore = appAllScore/(userScorelist.size());
		}
		mapAppInfo.put("scores", appScore);

		Map<String, Object> userInfo = (Map<String, Object>) request.getSession().getAttribute("userInfo");
		int isFav = 0;
		if (userInfo != null) {
			Map<String, Object> qMap = new HashMap<String, Object>();
			qMap.put("object_id", app_id);
			qMap.put("object_type", "3");// 3是应用4是数据目录
			qMap.put("uid", userInfo.get("uid"));
			List<UserCollection> queryUserCollectionList = PortalUtils.getUserCollectionService()
					.queryUserCollectionList(qMap);
			isFav = queryUserCollectionList.size();
		}
		request.setAttribute("appinfo", mapAppInfo);
		request.setAttribute("isFav", isFav);
		request.setAttribute("app_id", app_id);
	}
}
