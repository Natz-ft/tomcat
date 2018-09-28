package com.inspur.data.portal.screen.developer;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.loushang.internet.view.ViewHandler;

import com.inspur.data.common.web.PaginationList;
import com.inspur.data.common.web.ParamUtil;
import com.inspur.portal.model.user.UserCollection;
import com.inspur.utils.JsonUtils;
import com.inspur.utils.OamUtils;
import com.inspur.utils.PortalUtils;

/**
 * 我的应用
 * <br>
 * <strong>Title :</strong> AppList.java
 * <br>
 * <strong>Description : </strong>
 * <br>
 * <strong>For Examples :</strong>
 * <br>
 * <strong>Create on : 2016年6月16日 上午10:36:00<br></strong>
 * <p>
 * <strong>Copyright (C) Inspur Co.,Ltd.<br></strong>
 * <p>
 * @author <a href=mailto:miaozhq@inspur.com></a><br>
 * @version <strong>V1.0</strong>
 * <PRE>
 * </PRE>
 * -------------------------------------------<br>
 * Change History:[Formatter: author date description] <br/>
 * 1<br>
 * 2<br>
 * 3<br>
 */
public class AppList implements ViewHandler {
	private static final Log log = LogFactory.getLog(AppList.class);
	
	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

	}

	/**
	 * 获取我收藏的应用列表
	 * <br>
	 * <p>Description: 
	 * <br> <a href=mailto:miaozhq@inspur.com></a><br>
	 * <p>Date: 2016年6月16日 上午10:41:06<br/>
	 * <p>
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException   
	 * @see void
	 */
	public void doGetMyFavoriteList(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		try{
			String uid = String.valueOf(request.getSession().getAttribute("uid"));
			int page = ParamUtil.getInteger(request, "page", 1);
			int pageSize = ParamUtil.getInteger(request, "pageSize", 10);
			PaginationList<UserCollection> collectionList = PortalUtils.getUserCollectionService().queryUserCollectionListByPage(uid, String.valueOf(3), "1", page, pageSize);
			Map<String,Object> result = new HashMap<String,Object>();
			List appList = collectionList.getRecords();
			List appResList = new ArrayList();
			if(appList != null && appList.size() > 0){
				for(int i = 0; i < appList.size(); i++){
					UserCollection userCollection = (UserCollection) appList.get(i);
					Map<String,Object> map = new HashMap<String,Object>();
					map.put("id", userCollection.getObject_id());
					map.put("install_status", 2);//站点上线应用
					Map appInfo = OamUtils.getAppService().findAppInfo(map, 1000, 1);
					appResList.add(appInfo);
				}
				result.put("records", appResList);
				result.put("totalRecord", collectionList.getTotalRecord());
				response.getWriter().write(JsonUtils.convertToString(result));
			}
		}catch(Exception ex){
			log.error(ex, ex);
		}
	}
	
	/**
	 * 获取我使用过的应用列表
	 * <br>
	 * <p>Description: 
	 * <br> <a href=mailto:miaozhq@inspur.com></a><br>
	 * <p>Date: 2016年6月16日 上午10:41:36<br/>
	 * <p>
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException   
	 * @see void
	 */
	public void doGetVisitLogList(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		try{
			String uid = String.valueOf(request.getSession().getAttribute("uid"));
			String developer_id = String.valueOf(request.getSession().getAttribute("developer_id"));
//			uid="1";
			int page = ParamUtil.getInteger(request, "page", 1);
			int pageSize = ParamUtil.getInteger(request, "pageSize", 10);
			Map<String,Object> param = new HashMap<String,Object>();
			param.put("developer_id", developer_id);
			Map usedAppList = OamUtils.getAppService().findAppInfo(param, pageSize,page);
			Map<String,Object> result = new HashMap<String, Object>();
			List<Map<String,Object>> list = new ArrayList<Map<String,Object>>();
			List<String> versionList = (List<String>) usedAppList.get("data");
			if(versionList != null && versionList.size() > 0){
				for(int i = 0; i < versionList.size(); i++){
					Map<String,Object> map = new HashMap<String, Object>();
					Map<String,Object> temp = new HashMap<String, Object>();
					map.put("id",versionList.get(i));
					Map appInfo = OamUtils.getAppService().findAppFeature(map, 1000, 1);
					temp.putAll(appInfo);
					list.add(temp);
				}
				result.put("totalRecord", usedAppList.get("count"));
				result.put("records", list);
				response.getWriter().write(JsonUtils.convertToString(result));
			}
		}catch(Exception ex){
			ex.printStackTrace();
		}
	}
	
}
