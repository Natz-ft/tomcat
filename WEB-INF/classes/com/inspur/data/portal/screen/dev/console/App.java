package com.inspur.data.portal.screen.dev.console; 

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
import org.loushang.internet.util.JsonUtils;
import org.loushang.internet.util.StringUtils;
import org.loushang.internet.view.ViewHandler;

import com.inspur.api.ac.IAppAdminService;
import com.inspur.api.ac.IAppService;
import com.inspur.common.utils.PropertiesUtil;
import com.inspur.data.od.model.datatag.TagInfo;
import com.inspur.data.od.service.datatag.TagInfoService;
import com.inspur.ucweb.utils.Validator;
import com.inspur.utils.ACUtil;
import com.inspur.utils.AppDomainUtil;
import com.inspur.utils.AuditLogUtil;
import com.inspur.utils.DataUtils;
import com.inspur.utils.OamUtils;
/*import com.inspur.paas.ac.appmgr.AppDomain;*/
import com.inspur.utils.PhpUtil;
import com.inspur.utils.UserUtil;


public class App implements ViewHandler {

	private static Log log = LogFactory.getLog(App.class);
	private static TagInfoService tagInfoService = DataUtils.getTagInfoService();
	IAppService appService = OamUtils.getAppService();
	
	public void execute(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException{
		
		String app_id = request.getParameter("app_id");
		Object uid = UserUtil.getUserID(request);
		if(StringUtils.isNotEmpty(app_id) && Validator.isNumeric(app_id) && StringUtils.isNotEmptyObject(uid)){
			
			String developer_id = UserUtil.getDevelopIdFromSession(request);
			//验证应用是否为当前所有
			
			Boolean checkBoolean = checkAccess(app_id, developer_id);
			if(!checkBoolean){
				//统一跳转错误页面
				String error_url = PropertiesUtil.getValue("conf.properties","global.index.odweb").trim()+PropertiesUtil.getValue("conf.properties","error_url").trim();
				response.sendRedirect(error_url);
				return;
			}
			
			
			int appId = Integer.valueOf(app_id);
			Map app = this.getAppInfo(appId);
			app.put("additional_information", processAddInfo(app.get("additional_information")));
			List<Map<String, Object>> list = (List<Map<String, Object>>) app.get("data");
			for (Map<String, Object> appMap : list) {
				Object addInfo = appMap.get("additional_information");
				appMap.put("additional_information", processAddInfo(addInfo));
			}
			//获取分组
			Map<String, Object> param  = new HashMap<String, Object>();
			Map<String,Object> groups = appService.findAppGroup(param, 1000, 1);
			
			//根据app状态，添加应用下线信息，用于页面判断是否显示删除按钮。 1-提交审核，2-上线，5审核通过三个状态不能删除
			/*int installStatus = StringUtils.parseInt(String.valueOf(app.get("install_status")));
			if(AppDomain.STATE_PENDING == installStatus || AppDomain.STATE_ONLINE == installStatus || AppDomain.STATE_PASSED == installStatus ){
				app.put("has_online_version", true);
			}else{
				app.put("has_online_version", false);
			}*/
			
			//应用下没有feature则可以删除
			Map<String, Object> param2 = new HashMap<String,Object>();
			param2.put("app_id", app_id);
			if(null != developer_id && !"".equals(developer_id)) {
				param2.put("developer_id", developer_id);
			}
			Map<String, Object> features = appService.findAppFeature(param2, 99, 1);
			if(null != features && null != features.get("count") && !"0".equals(String.valueOf(features.get("count")))){
				app.put("has_online_version", true);
			}else{
				app.put("has_online_version", false);
			}
			
			request.setAttribute("app_id", appId);
			request.setAttribute("uid", uid);
			request.setAttribute("app", app);
			request.setAttribute("appJson", JsonUtils.convertToString(app));
			request.setAttribute("groupsJson", JsonUtils.convertToString(groups.get("data")));
			
			request.setAttribute("has_online_version", false);
		}else{
			//统一跳转错误页面
			String error_url = PropertiesUtil.getValue("conf.properties","global.index.odweb")+PropertiesUtil.getValue("conf.properties","error_url");
			response.sendRedirect(error_url);
			return;
		}
		
		//记录页面访问日志
		AuditLogUtil.addPageVisitAutiLog(request, "开发者控制台", "");
	}
	
	public void doGetAppInfo(HttpServletRequest request, HttpServletResponse response){
		
		String app_id = request.getParameter("app_id");
		Object uid = UserUtil.getUserID(request);
		if(StringUtils.isNotEmpty(app_id) && Validator.isNumeric(app_id) && StringUtils.isNotEmptyObject(uid)){
			
			String developer_id = UserUtil.getDevelopIdFromSession(request);
			//验证应用是否为当前所有
			
			Boolean checkBoolean =  checkAccess(app_id,developer_id);
			if(!checkBoolean){
				this.output(response,"", 0, "没有权限");
				return;
			}
			
			int appId = Integer.valueOf(app_id);
			//获取应用信息
			IAppAdminService appAdminService = OamUtils.getAppAdminService();
			Map<String, Object> app = appAdminService.getAppById(appId);
			String appSecret = appAdminService.getAppSecret(appId);
			app.put("client_secret", appSecret);
			this.output(response,app, 1, "获取成功");
		}else{
			this.output(response,"", 0, "没有权限");
			return;
		}
	}
	/**
	 * 
	 * @param request
	 * @param response
	 */
	public void doCheckAppCanDel(HttpServletRequest request, HttpServletResponse response){
		String app_id = request.getParameter("app_id");
		Object uid = UserUtil.getUserID(request);
		if(StringUtils.isNotEmpty(app_id) && Validator.isNumeric(app_id) && StringUtils.isNotEmptyObject(uid)){
			
			String developer_id = UserUtil.getDevelopIdFromSession(request);
			//验证应用是否为当前所有
			
			Boolean checkBoolean =  ACUtil.checkAccess(app_id,developer_id);
			if(!checkBoolean){
				this.output(response,"", 0, "没有权限");
				return;
			}
			IAppAdminService appAdminService = OamUtils.getAppAdminService();
			List<Map> features = appAdminService.getAppFeatures(app_id);
			boolean flag = true;
			if(null != features){
				for(Map cur_feature : features){
					int status = 0;
					String tmpStatus = cur_feature.get("app_status") == null?"":String.valueOf(cur_feature.get("app_status"));
					if(""!=tmpStatus){
						status = Integer.parseInt(tmpStatus);
						if(status>0){
							flag = false;
							break;
						}
					}
				}
			}
			if(flag){
				this.output(response,"", 1, "");
			}else{
				this.output(response,"", 0, "已接入上线或已提交审核的应用，暂不可删除！");
			}
		}
	}
	private Map getAppInfo(int appId){
		Map<String, Object> app = new HashMap<String,Object>();
		try{
			Map<String,Object> resultMap = new HashMap<String,Object>();
			resultMap.put("app_id", appId);
			//获取应用信息
			app = appService.findAppInfo(resultMap, 1000, 1);
			app.put("create_date", app.get("create_time").toString());
			//获取应用标签信息
			List<Map> tagList=new ArrayList();
			List<String> tagIds = (List<String>)app.get("tagIds");
			if(StringUtils.isNotEmptyList(tagIds)){
				//组织app_tagnames：明细使用，并组织tagList编辑使用
				StringBuffer app_tagnames =new StringBuffer();
				for(int i=0;i<tagIds.size();i++){
					String tagId=(String)tagIds.get(i);
					//根据标签ID获取name
					
					if(i>0){
						app_tagnames.append(",");
					}
					TagInfo taginfo = tagInfoService.getTagInfo(tagId);
					//tagid 匹配不到tagname的时候，直接显示id
					if(taginfo==null){
						app_tagnames.append(tagId);
					}else{
						app_tagnames.append(taginfo.getTag());
					}
					
					Map tag=new HashMap();
					tag.put("tag_id", tagId);
					tag.put("tag_name", taginfo.getTag()==null?tagId:taginfo.getTag());
					
					tagList.add(tag);
					
				}
				app.put("app_tags", app_tagnames.length()>0?app_tagnames.toString():app.get("tagIds"));
				app.put("tagList", tagList);
			}
			
		}catch(Exception ex){
			if(log.isDebugEnabled()){
				log.error("getAppInfo",ex);
			}
		}
		return app;
	}
	
	private Map<String, Object> processAddInfo(Object additionInfo) {
		Map<String, Object> result = new HashMap<String, Object>();
		if (null == additionInfo) {
			return null;
		}
		try {
			result = JsonUtils.readToObject((String)additionInfo, Map.class);
		} catch (IOException e) {
			log.info("additionInfo转换失败", e);
		}
		return result;
	}

	
	public void doUpdateAppInfo(HttpServletRequest request, HttpServletResponse response){
		
		String app_id = request.getParameter("app_id");
		String app_alias = request.getParameter("app_alias");
		String app_groups = request.getParameter("app_groups");
		String usertype = request.getParameter("usertype");
		Object uid = UserUtil.getUserID(request);
		if(StringUtils.isNotEmpty(app_id) && Validator.isNumeric(app_id) && StringUtils.isNotEmpty(app_alias) && StringUtils.isNotEmpty(app_groups)){
			
			String developer_id = UserUtil.getDevelopIdFromSession(request);
			try{
				//验证应用是否为当前所有
				IAppService appService = OamUtils.getAppService();
				String auth_type = request.getParameter("auth_type") == null ? "" : request.getParameter("auth_type").toString();
				
				String callback_url = request.getParameter("callback_url") == null ? "" : request.getParameter("callback_url").toString();
				
				Map<String, Object> projectMap = new HashMap<String, Object>();
				projectMap.put("app_id", app_id);
				projectMap.put("app_alias", app_alias);
				projectMap.put("group_id", app_groups);
				projectMap.put("developer_id", developer_id);
				
				//添加用户类型
				if(usertype != null){//改为 空串能保存
					projectMap.put("user_types", usertype.trim());
				}
				
				/*处理标签开始*/
				String app_tags= request.getParameter("app_tags");
				//如果传了标签参数，则进行处理
				if(StringUtils.isNotEmpty(app_tags)){
					projectMap.put("tagIds", app_tags);
				}
				/*处理标签结束*/
				
				/*处理应用所有者*/
				String app_owner = request.getParameter("app_owner");
				String app_owner_name = request.getParameter("app_owner_name");
				if(StringUtils.isNotEmpty(app_owner)){
					projectMap.put("app_owner", app_owner);
				}
				if(StringUtils.isNotEmpty(app_owner_name)){
					projectMap.put("app_owner_name", app_owner_name);
				}
				
				projectMap.put("authorized_grant_types", auth_type);
				projectMap.put("callback_url", callback_url);
				
				Map<String,String> retBoolean = appService.saveApp(projectMap);
				
				Map app = this.getAppInfo(Integer.parseInt(app_id));
				this.output(response, app, Integer.valueOf(retBoolean.get("code")), retBoolean.get("msg"));
			}catch(Exception ex){
				this.output(response, "", -1, "doUpdateAppInfo()更新失败");
			}
		}else{
			this.output(response, "", -1, "doUpdateAppInfo()更新失败");
		}
	}
	
	public static boolean checkAccess(String app_id,String developer_id){
		boolean access = false;
		try{
			IAppAdminService appAdminService = OamUtils.getAppAdminService();
			access = appAdminService.checkAppForAdmin(app_id, developer_id);
		}catch(Exception ex){
			if(log.isDebugEnabled()){
				log.error("checkAccess出错",ex);
			}
		}
		return access;
	}
	/*
	 * 删除一个应用
	 */
	public void doDeleteApp(HttpServletRequest request, HttpServletResponse response)  throws IOException, ServletException{
		
		String app_id = request.getParameter("app_id");
		Object uid = UserUtil.getUserID(request);
		if(!StringUtils.isEmpty(app_id) && Validator.isNumeric(app_id) && StringUtils.isNotEmptyObject(uid)){
			
			String developer_id = UserUtil.getDevelopIdFromSession(request);
			//验证应用是否为当前所有
			
			Boolean checkBoolean = checkAccess(app_id, developer_id);
			if(!checkBoolean){
				this.output(response, 0, 0, "没有操作权限");
				return;
			}
			Map<String, Object> param2 = new HashMap<String,Object>();
			param2.put("app_id", app_id);
			if(null != developer_id && !"".equals(developer_id)) {
				param2.put("developer_id", developer_id);
			}
			Map<String, Object> features = appService.findAppFeature(param2, 99, 1);
			
			if(null != features && null != features.get("count") && !"0".equals(String.valueOf(features.get("count")))){
				this.output(response, 0, 0, "请先删除应用版本信息，再删除应用！");
				return;
			}
			
			Map app = this.getAppInfo(StringUtils.parseInt(app_id));
			
			//根据app状态，添加应用下线信息，用于页面判断是否显示删除按钮。 1-提交审核，2-上线，5审核通过三个状态不能删除
			int installStatus = StringUtils.parseInt(String.valueOf(app.get("install_status")));
			if( AppDomainUtil.STATE_PENDING == installStatus ){
				this.output(response, 0, 0, "删除失败，提交审核的应用无法删除");
				return;
			}else if( AppDomainUtil.STATE_ONLINE == installStatus ){
				this.output(response, 0, 0, "删除失败，上线的应用无法删除");
				return;
			}else if( AppDomainUtil.STATE_PASSED == installStatus ){
				this.output(response, 0, 0, "删除失败，审核通过的应用无法删除");
				return;
			}
			
			IAppAdminService appAdminService = OamUtils.getAppAdminService();
			Boolean ret= appAdminService.deleteAppByKeys(app_id);
			if(ret){
				this.output(response, 1, 1, "删除成功");
			}else{
				this.output(response, 0, 0, "删除失败");
			}
		}
	}
	
	
	/*
	 * 重置应用密钥
	 */
	public void doResetKey(HttpServletRequest request, HttpServletResponse response){
		try {
			
			Object uid = UserUtil.getUserID(request);
			
			String appIdString = request.getParameter("app_id");
			if(!StringUtils.isEmpty(appIdString) && Validator.isNumeric(appIdString) && StringUtils.isNotEmptyObject(uid)){
				String developer_id = UserUtil.getDevelopIdFromSession(request);
				//验证应用是否为当前所有
				IAppService appService = OamUtils.getAppService();
				Map app = appService.getAppInfoByAppId(appIdString);
				String app_nameString = app.get("app_alias").toString();
				String secretString = PhpUtil.md5(app_nameString + PhpUtil.time());
				Map<String,Object> param = new HashMap<String,Object>();
				param.put("developer_id", developer_id);
				param.put("secret", secretString);
				param.put("app_id", appIdString);
				Map<String,String> ret = appService.updateClientSecret(param);
				this.output(response, secretString, Integer.valueOf(ret.get("code")), ret.get("msg"));
			}else{
				this.output(response, "", -1, "操作失败");
			}
		} catch (Exception e) {
			this.output(response, "", -1, e.getMessage());
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
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}	
	}
 
	 
}


