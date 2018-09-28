package com.inspur.data.portal.screen.dev.console; 

import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.loushang.internet.util.JsonUtils;
import org.loushang.internet.util.StringUtils;
import org.loushang.internet.view.ViewHandler;

import com.inspur.api.ac.IAppAdminService;
import com.inspur.api.ac.IAppService;
import com.inspur.common.utils.PropertiesUtil;
import com.inspur.data.common.utils.ConfUtil;
import com.inspur.utils.AuditLogUtil;
import com.inspur.utils.OamUtils;
import com.inspur.utils.UCUtil;
import com.inspur.utils.UserUtil;

public class AppList implements ViewHandler {

	private static Log log = LogFactory.getLog(AppList.class);
	
	private static String DEFAULT_ICON = ConfUtil.getConfValue("app_default_icon");
	
	public static SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
	
	protected static final int PAGE_INDEX = 1;
	
	protected static final int PAGE_SIZE = 8;
	
	protected static final String TYPE_INSITE = "inner";
	
	protected static final String TYPE_MOBILE = "mobile";
	
	protected static final String TYPE_WEBSITE = "website";
	
	protected static final String TYPE_PC = "pc";
	
	protected int page, size;
	
	public Date date = new Date(); 
	
	public void execute(HttpServletRequest request, HttpServletResponse response)  throws IOException{
		Object uid = UserUtil.getUserID(request);
		if(StringUtils.isNotEmptyObject(uid)){
			try{
				String developer_id = UserUtil.getDevelopIdFromSession(request);
				String searchKey = request.getParameter("keyword");
				if(searchKey != null){
					searchKey=searchKey.trim();
					request.setAttribute("applist_title", searchKey);
				}
				Map<String, Object> list = getAppList(developer_id, PAGE_INDEX, PAGE_SIZE, searchKey);
				list.put("nowPage", PAGE_INDEX);
				list.put("pageSize", PAGE_SIZE);
				request.setAttribute("list", list);
				//applist_title
				
			}catch(Exception ex){
				this.output(response,"", 0, ex.getMessage());
				log.error("AppList.execute", ex);	
			} finally {
				//记录页面访问日志
				AuditLogUtil.addPageVisitAutiLog(request, "开发者控制台", "");
			}
			
		}else{
			//统一跳转错误页面
			String error_url = PropertiesUtil.getValue("conf.properties","global.index.odweb").trim()+PropertiesUtil.getValue("conf.properties","error_url").trim();
			response.sendRedirect(error_url);
			return;
		}
		
	}
	
	public Map<String, Object> getAppList(Object developid, int page, int size, String apptype, String searchKey ,String regionCode){
		IAppAdminService appAdminService = OamUtils.getAppAdminService();
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("developer_id", developid);
		if(apptype != null){
			param.put("app_type", apptype);
		}
		Map infoPage = appAdminService.searchMyCreatedNewestAppPageFilterByType(param, searchKey, "create_time DESC", page, size);
		if(null != infoPage){
			List<Map> dataList = (List<Map>)infoPage.get("data");
			for(Map item:dataList){
				List icons = (List)item.get("icon");
				if(icons==null||icons.size()<1){
					icons = new ArrayList();
					icons.add(DEFAULT_ICON);
					item.put("icon", icons);
				}
				String str = convertToDate(item.get("create_time"));
				if(str == null){
					str = "";
				}
				item.put("create_time", str);
			}
		}
		return infoPage;
	}
	
	public void doDeleteApp(HttpServletRequest request, HttpServletResponse response){
		
		try{
			String developID = UserUtil.getDevelopIdFromSession(request);
			IAppAdminService appAdminService = OamUtils.getAppAdminService();
			String featureID = request.getParameter("app_id");
			Map featureInfo = appAdminService.getAppFeatureById(featureID);
			boolean result = false;
			if(null != featureInfo){
				Object appID = featureInfo.get("app_id");
				if(appID != null){
					Map appInfo = appAdminService.getAppById(appID);
					Object appDevID = appInfo.get("developer_id");
					if(developID.toString().equals(appDevID.toString())){
						result = appAdminService.deleteAppFeature(featureID);
					}
				}
			}
			if(result){
				this.output(response,null, 1, "删除成功");
			}
			else{
				this.output(response,null, 0, "删除失败");
			}
		}catch(Exception exp){
			log.error("doDeleteApp", exp);
		}
	}
	
	//
	// 获取分类列表
	//
	public void doGetGroupList(HttpServletRequest request, HttpServletResponse response){
		try{
			IAppAdminService appAdminService = OamUtils.getAppAdminService();
			List res = appAdminService.getAllGroups();
			this.output(response,res, 1, "获取成功");
		}catch(Exception e){
			this.output(response,"", 0, e.getMessage());
			log.error("doGetGroupList",e);
			
		}
		
	}
	
	/**
	 * 获取用户的应用的列表
	 * @param developerId
	 * @param request
	 * @param response
	 */
	protected Map<String, Object> getAppList(Object developerId, int page, int size, String keyword){
		try{
			//获取当前开发者的应用列表
			IAppService appService = OamUtils.getAppService();
			Map<String, Object> filterMap = new HashMap<String, Object>();
			filterMap.put("developer_id", developerId);
			String order = "";
			if(null!=keyword && !keyword.equals("")){
				filterMap.put("app_name", keyword);
				order = "create_time desc";
			}
			else{
				order = "create_time desc";
			}
//			Map<String, Object> appInfoList=appAdminService.searchMyCreatedAppPageWithNewFeatureVersion(filterMap, keyword, order, page, size);
			Map<String, Object> appInfoList=appService.findAppInfo(filterMap, size,page);
			return appInfoList;
		}catch(Exception exp){
			log.error("AppList.getAppList", exp);
			return null;
		}
	}
	

	
	
	/**
	 * 获取分组的名称
	 * @param groupid
	 * @return
	 */
	public Object getGroupName(List<Map> groupInfoList, Object groupid){
		if(groupInfoList != null){
			for(Map item : groupInfoList){
				Object groupID = item.get("id");
				if(groupID.equals(groupid)){
					return item.get("name"); 
				}
			}
		}
		return null;
	}
	
	
	public void doGetAppList(HttpServletRequest request, HttpServletResponse response){
		
		try{
			getPageInfo(request);
			Object uid = UserUtil.getUserID(request);
			if(StringUtils.isNotEmptyObject(uid)){
				String developer_id = UserUtil.getDevelopIdFromSession(request);
				String searchKey = request.getParameter("keyword");
				Map<String, Object> list = getAppList(developer_id, page, size, searchKey);
				String result = JsonUtils.convertToString(list);
				PrintWriter out = response.getWriter();
				out.write(result);
				out.close();
			}else{
				this.output(response,"", 0, "登陆失效");
			}
			
		}catch(Exception exp){
			this.output(response,"", 0, exp.getMessage());
			log.error("AppList.execute", exp);	
		}
	}	
	
	/**
	 * Description: 输出结果;
	 */
	private void output(HttpServletResponse response,Object data, int code, String msg){
		Map<String, Object> result = new HashMap();
		
		result.put("code", code);
		result.put("msg", msg);
		result.put("data", data);
		
		if(result != null){
			try {
				response.getWriter().print(JsonUtils.convertToString(result));
			} catch (IOException exp) {
				// TODO Auto-generated catch block
				log.error("AppList.output", exp);
			}
		}	
	}
 
	protected void getPageInfo(HttpServletRequest request){
		String pageindex = request.getParameter("pageindex");
		if(pageindex != null){
			try{
				page = Integer.parseInt(pageindex);
			}catch(Exception exp){
				page = PAGE_INDEX;
			}
		}
		else{
			page = PAGE_INDEX;
		}
		String pagesize = request.getParameter("pagesize");
		if(pagesize != null){
			try{
				size = Integer.parseInt(pagesize);
			}catch(Exception exp){
				size = PAGE_SIZE;
			}
		}
		else{
			size = PAGE_SIZE;
		}
	} 
	
	public String convertToDate(Object timestamp){
		if(timestamp != null && !"0".equals(timestamp.toString())){
			try{
				long time = Long.parseLong(timestamp.toString()+"000");
				date.setTime(time);
				return format.format(date);
			}catch(Exception exp){
				log.error("convertToDate", exp);
			}
		}
		return null;
	}
	
	
	/**
	 * 查询用户最近使用应用记录
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	public void doGetUserApp(HttpServletRequest request, HttpServletResponse response) throws IOException{
		IAppAdminService appAdminService = OamUtils.getAppAdminService();
		List<Map<String,Object>> list = Collections.emptyList();
		Map Userinfo = UCUtil.getUserInfo();
		if(Userinfo!=null){
			String uid = Userinfo.get("uid").toString();
			Map<String,Object> map = new HashMap<String,Object>();
			map.put("uid", uid);
			//查询当前用户最近使用的应用
			list = appAdminService.getUserAppByUid(map);
		}
		response.getWriter().write(JsonUtils.convertToString(list));
	}
}


