package com.inspur.data.portal.screen.dev.console.app;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.loushang.internet.util.JsonUtils;
import org.loushang.internet.util.StringUtils;
import org.loushang.internet.view.ViewHandler;

import com.inspur.api.ac.IAppService;
import com.inspur.api.ac.IDeveloperService;
import com.inspur.data.common.utils.ConfUtil;
import com.inspur.dataview.utils.JsonUtil;
import com.inspur.portal.model.user.UserOperationLog;
import com.inspur.portal.service.user.UserOperationLogService;
import com.inspur.ucweb.utils.Validator;
import com.inspur.utils.AppPicUtil;
import com.inspur.utils.AuditLogUtil;
import com.inspur.utils.OamUtils;
import com.inspur.utils.PortalUtils;
import com.inspur.utils.StringUtil;
import com.inspur.utils.SystemUtil;
import com.inspur.utils.UploadUtil;
import com.inspur.utils.UserUtil;


public class Versions implements ViewHandler {

	private static Log log = LogFactory.getLog(Versions.class);
	
	IAppService appService = OamUtils.getAppService();
	private static IDeveloperService developerService = OamUtils.getDeveloperService();
	
	public static String APP_INSTRUCTION_TYPE = "app_instructions";
	public static String APP_PROBLEMS_TYPE = "app_problems";
	public static String APP_INNER_TYPE = "inner";
	public static String APP_WEBSITE_TYPE = "website";
	public static String APP_MOBILE_TYPE = "mobile";
	public static String APP_PC_TYPE = "pc";
	public static String RCSERVICE_URL = ConfUtil.getConfValue("global.index.rcservice");
	
	public void execute(HttpServletRequest request, HttpServletResponse response){
		//记录页面访问日志
		AuditLogUtil.addPageVisitAutiLog(request, "开发者控制台", "");
	}
	 
	/**
	 * 接入一个版本应用
	 */
	public void doCreateVersion(HttpServletRequest request, HttpServletResponse response){
		try{
			Map res = createVersion(request,response);
			this.output(response, res.get("data"),Integer.parseInt(res.get("code").toString()), res.get("msg").toString());
		}catch(Exception e){
			this.output(response, "", 0, e.getMessage());
		}
	}
	public boolean checkVersionNameVersion(IAppService appService, String app_id,String app_type,String v_name,String v_no){
		boolean res = true;
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("app_id", app_id);
		param.put("app_type", app_type);
		Map<String,Object> appfeature = appService.findAppFeature(param, 100, 1);
 		List<Map> appFeatureList = (List<Map>) appfeature.get("data");
		if(StringUtil.isNotEmptyList(appFeatureList)){
			for(Map version : appFeatureList ){
				String addInfoStr = (String)version.get("additional_information");
				try {
					Map addInfoMap = JsonUtil.readToObject(addInfoStr, Map.class);
					if(addInfoMap != null){
						//扁平化结构，方便缓存字符串反序列化及普通读取
						version.putAll(addInfoMap);
					}
					if(version.containsKey("version_name") && version.containsKey("version_number")){
						String tv_name = version.get("version_name")+"";
						String tv_no = version.get("version_number")+"";
						if(v_name.equals(tv_name) && v_no.endsWith(tv_no)){
							res = false;
							break;
						}
					}
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
		return res;
	}
	
	/**
	 * 
	 * @Description：调用新接口增加应用的版本
	 * @author: chenlei
	 * @date: 2017年7月14日 下午3:55:47
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public Map createVersion(HttpServletRequest request, HttpServletResponse response) throws Exception{
		Object uid = UserUtil.getUserID(request);
		String app_id = request.getParameter("app_id");
		String version_nameString = (String)request.getParameter("version_name");
		String version_numberString = (String)request.getParameter("version_no");
		String app_typeString = (String)request.getParameter("app_type");
		String platform_typeString = request.getParameter("platform_type");
		Map<String,String> res = new HashMap<String,String>();
		if(StringUtils.isNotEmpty(app_id) && Validator.isNumeric(app_id) && StringUtils.isNotEmpty(app_typeString)){
			Map<String, Object> m = new HashMap<String,Object>();
			m.put("app_id", app_id);
			m.put("app_type", app_typeString);
			m.put("platform_type", platform_typeString);
			Map<String, Object> appFeatureList = appService.findAppFeature(m, 10, 1);
			List<Map> featureList = (List<Map>) appFeatureList.get("data");
			
			if(null == featureList || featureList.size()==0) {
				String developer_id = UserUtil.getDevelopIdFromSession(request);
				
				Map developerMap = developerService.getAppDeveloperById(developer_id);
				String developerName = null;
				if (developerMap != null && developerMap.get("name") != null) {
					developerName = String.valueOf(developerMap.get("name"));
				}
				
				Map<String, Object> version = new HashMap<String, Object>();
				Map<String, Object> extral = new HashMap<String, Object>();
				extral.put("version_number", version_numberString);
				//调用新接口查找应用信息，将应用的app_alias赋值为版本的别名
				Map<String,Object> param = new HashMap<String,Object>();
				param.put("app_id", app_id);
				param.put("developer_id", developer_id);
				Map<String, Object> appList = appService.findAppInfo(param, 10, 1);
				List<Map> resultList = (List<Map>) appList.get("data");
				Map app = resultList.get(0);
				if(app != null){
					version.put("app_alias", app.get("app_alias"));
				}
				
				version.put("app_id", app_id);
				version.put("developer_id", developer_id);
				version.put("app_type", app_typeString);
				version.put("platform_type", platform_typeString);
					
				if(StringUtils.isNotEmpty(version_nameString)){
					version.put("version_name", version_nameString);
				}
				if(StringUtils.isNotEmpty(version_numberString)){
					version.put("version_number", version_numberString);
				}
				//创建时更新状态为1，代表刚创建, 更新应用信息时，把状态设为2，代表开发阶段
				version.put("app_status", 0);
				
				version.put("additional_information", extral);
					
				res = appService.saveAppFeature(version);
				
				//添加应用版本审计日志
				UserOperationLog auditlog = new UserOperationLog();
                auditlog.setLog_lk_id(null);
                auditlog.setClient_browser(SystemUtil.getRequestBrowserInfo(request));
                auditlog.setClient_code(null);
                auditlog.setClient_ip(SystemUtil.getIpAddr(request));
                auditlog.setClient_system(SystemUtil.getRequestSystemInfo(request));
                auditlog.setClient_type("PC");
                auditlog.setCreate_time(new Date());
                auditlog.setObj_id(res.get("feature_id"));//版本ID
                auditlog.setObj_name(version_nameString);//版本名称
                auditlog.setObj_type("feature");
                auditlog.setOp_type("create");//创建
                auditlog.setUser_id(developer_id);
                auditlog.setUser_name(developerName);
                
                //添加审计日志
                UserOperationLogService operLog = PortalUtils.getUserOperationLogService();
                operLog.add(auditlog);
                
			}else {
				res.put("code", "-1");
				res.put("msg", "版本信息已存在，不能再次添加版本");
			}
		}else{
			res.put("code", "-2");
			res.put("msg", "缺少必要的参数!");
		}
		return res;
	}
	
	/**
	 * 
	 * @Description：调用新接口获取版本信息
	 * @author: chenlei
	 * @date: 2017年7月17日 上午11:26:15
	 * @param request
	 * @param response
	 */
	public void doGetVersions(HttpServletRequest request, HttpServletResponse response){
		
		try{
			String appIdString = request.getParameter("app_id");
			String app_typeString = request.getParameter("app_type");

			String developerId = UserUtil.getDevelopIdFromSession(request);
			if(StringUtils.isNotEmpty(appIdString) && StringUtils.isNotEmpty(app_typeString)){
				
				Map<String, Object> param = new HashMap<String,Object>();
				param.put("app_id", appIdString);
				param.put("app_type", app_typeString);
				if(null != developerId && !"".equals(developerId)) {
					param.put("developer_id", developerId);
				}
				
				//创建时间倒序排列
				Map<String, Object> appFeatureMap = appService.findAppFeature(param, 99, 1);
				List<Map> appFeatureList = (List<Map>) appFeatureMap.get("data");
				
				//此处只设置展开某一个版本
				String feature_idString = request.getParameter("version") == null ? "" : request.getParameter("version").toString();
				String cur_featureString = "";
				
				if("".equals(feature_idString) && null != appFeatureList &&  appFeatureList.size()>0){
					Map firstFeatureMap = appFeatureList.get(0);
					cur_featureString = firstFeatureMap.get("feature_id").toString();
				}
				
				if(!"".equals(feature_idString)){
					for(Map<String, Object> appFeature:appFeatureList){
						if(feature_idString.equals(appFeature.get("feature_id"))){
							cur_featureString = appFeature.get("feature_id").toString();
						}
					}
					
				}
				
				Map<String,Object> featureObject = new HashMap<String,Object>();
				if(!"".equals(cur_featureString)){
					Map<String,Object> tmp = new HashMap<>();
					tmp.put("feature_id", cur_featureString);
					List<Map<String,Object>> list = (List<Map<String, Object>>) appService.findAppFeature(tmp, 1000, 1).get("data");
					featureObject = list.get(0);
				}
				
				//准备附加信息
				if(featureObject!=null){
					int defaultSize = 3;
					List individual_information = (List)featureObject.get("individual_information");
					if(individual_information == null){
						individual_information = new ArrayList();
					}
					if(individual_information.size()<3){
						for(int i=0,n=defaultSize-individual_information.size();i<n;i++){
							Map map = new HashMap();
							map.put("name", "");
							map.put("description", "");
							individual_information.add(map);
						}
						featureObject.put("individual_information", individual_information);
					}
				}
				
				Map<String, Object> resultMap = new HashMap<String, Object>();
				//获取应用的使用说明和常见问题
				Object docs = featureObject.get("docs");
				if(null != docs){
					List<Map> docList = (List<Map>)docs;
					for(Map docInfo : docList){
						String business_type = docInfo.get("business_type") == null? "":docInfo.get("business_type").toString();
						if(APP_INSTRUCTION_TYPE.equals(business_type) || APP_PROBLEMS_TYPE.equals(business_type)){
							String url = RCSERVICE_URL+"/doc?doc_id="+docInfo.get("doc_id");
							featureObject.put(business_type, Validator.getText(url));
						}
					}
				}
				resultMap.put("versionList", appFeatureList);
				resultMap.put("curVersion", featureObject);
				
				this.output(response, resultMap, 1, "获取成功");
				
			}else{
				this.output(response, "", 0, "会话失效!");
			}
			
		}catch(Exception e){
			this.output(response, "", 0, e.getMessage());
		}
	}
	
	/*
	 * 更新某个版本
	 * 
	 */
	public void doUpdateVersion(HttpServletRequest request, HttpServletResponse response){
		
		String feature_idString = request.getParameter("version_id");
		String version_nameString = request.getParameter("version_name");
		if(StringUtils.isNotEmpty(version_nameString) && StringUtils.isNotEmpty(version_nameString)){
			String developer_id = UserUtil.getDevelopIdFromSession(request);
			String version_app_urlString = request.getParameter("version_app_url") == null ? "" : request.getParameter("version_app_url").toString();
			String version_descString = request.getParameter("version_desc") == null ? "" : request.getParameter("version_desc");
			Map<String, Object> versionMap = new HashMap<String, Object>();
			versionMap.put("developer_id", developer_id);
			versionMap.put("version_name", version_nameString);
			versionMap.put("description", version_descString);
			versionMap.put("app_url", version_app_urlString);
			versionMap.put("feature_id", feature_idString);
			try{
				Map<String, String> resBoolean = appService.saveAppFeature(versionMap);
				this.output(response, "",Integer.valueOf(resBoolean.get("code")), String.valueOf(resBoolean.get("code")));
			}catch(Exception e){
				this.output(response, "", 0, e.getMessage());
			}
		}
	}
	
	
	/*
	 * 更新某个版本的版本信息
	 */
	public void doUpdateVersionInfo(HttpServletRequest request, HttpServletResponse response){
		try{
			Map res = this.updateVersionInfo(request, response);
			this.output(response, res.get("data"),Integer.parseInt(res.get("code").toString()), res.get("msg").toString());
		}catch(Exception e){
			this.output(response, "", 0, e.getMessage());
		}
	}
	
	/**
	 * @Description：调用新接口更新版本
	 * @author: chenlei
	 * @date: 2017年7月14日 上午10:45:20
	 * @param request
	 * @param response
	 * @return
	 */
	public Map updateVersionInfo(HttpServletRequest request, HttpServletResponse response){
		String feature_idString  = null;
		if(request.getAttribute("version_id")!=null){
			//复制的时候 version_id 放在attribute中
			feature_idString = request.getAttribute("version_id").toString();
		}else{
			//来自do请求时候 version_id 放在Parameter中
			feature_idString = request.getParameter("version_id");
		}
		Object uid = UserUtil.getUserID(request);
		Map<String,String> resultMap = new HashMap<String,String>();
		if(StringUtils.isNotEmpty(feature_idString) && StringUtils.isNotEmptyObject(uid)){
			String developer_id = UserUtil.getDevelopIdFromSession(request);
			
			try {
				//需要进行更新的信息放到两个map中›
				Map<String, Object> versionMap = new HashMap<String, Object>();
				Map<String, Object> extraMap = new HashMap<String, Object>();
				String file_nameString;
				String file_pathString;
				String file_sizeString;
				String platform_typeString = request.getParameter("platform_type") == null ? "" : request.getParameter("platform_type").toString();
				if("".equals(platform_typeString)){
					throw new Exception("请求参数错误");
				}
				if("windows".equals(platform_typeString) || "android".equals(platform_typeString) || "mac".equals(platform_typeString) || "window".equals(platform_typeString)){
					file_nameString = request.getParameter("file_name") == null ? "" : request.getParameter("file_name").toString();
					file_pathString = request.getParameter("file_path") == null ? "" : request.getParameter("file_path").toString();
					file_sizeString = request.getParameter("file_size") == null ? "" : request.getParameter("file_size").toString();
					
					if("".equals(file_nameString) || "".equals(file_pathString) || "".equals(file_sizeString)){
						throw new Exception("请求参数错误");
					}
					//以下信息放到additional_information
					extraMap.put("file_name", file_nameString);
					extraMap.put("file_path", file_pathString);
					extraMap.put("file_size", Integer.valueOf(file_sizeString));
				}
				String app_urlString = request.getParameter("app_url") == null ? "" : request.getParameter("app_url").toString();
				versionMap.put("app_url", app_urlString);
				if("inner".equals(platform_typeString)){
					String ext_app_tplString = request.getParameter("ext_app_tpl") == null ? "" : request.getParameter("ext_app_tpl").toString();
					if("".equals(ext_app_tplString)) throw new Exception("iframe宽度参数请求错误");
					extraMap.put("ext_app_tpl", ext_app_tplString);
				}
				if("outter".equals(platform_typeString)){
					String website_app_open_type = request.getParameter("website_app_open_type") == null ? "" : request.getParameter("website_app_open_type").toString();
					if("".equals(website_app_open_type)) throw new Exception("访问方式参数请求错误");
					extraMap.put("website_app_open_type", website_app_open_type);
				}
				//获取版本名称
				String version_nameString = request.getParameter("version_name") == null ? "" : request.getParameter("version_name").toString();
				if("".equals(version_nameString)){
					throw new Exception("请求参数错误");
				}
				//获取版本号
				String version_numberString = request.getParameter("version_number") == null ? "" : request.getParameter("version_number").toString();
				if("".equals(version_numberString))version_numberString = "0";
				//获取版本升级说明
				String upgrade_instruString = request.getParameter("upgrade_instru") == null ? "" : request.getParameter("upgrade_instru").toString();
				//更新版本名称
				versionMap.put("version_name", version_nameString);
				String app_status = request.getParameter("app_status");
				if(app_status==null||"".equals(app_status)){
					versionMap.put("app_status", 0);
				}else{
					versionMap.put("app_status", app_status);
				}
				//更新版本号
				extraMap.put("version_number", version_numberString);
				//更新升级说明
				extraMap.put("upgrade_instru", upgrade_instruString);
				//版本id
				versionMap.put("feature_id", feature_idString);
				versionMap.put("developer_id", developer_id);
				versionMap.put("additional_information", extraMap);
				
				resultMap = appService.saveAppFeature(versionMap);
			}catch(Exception e){
				resultMap.put("data", "");
				resultMap.put("code", "-1");
				resultMap.put("msg", e.getMessage());
			}
		}else{
			resultMap.put("data", "");
			resultMap.put("code", "");
			resultMap.put("msg","更新失败");
		}
		return resultMap;
	}
	
	/*
	 * 更新某个版本图标
	 * 
	 */
	public void doUpdateVersionIcon(HttpServletRequest request, HttpServletResponse response){
		
		try {
			
			String feature_idString = request.getParameter("version_id") == null ? "" : request.getParameter("version_id").toString();
			
			if(StringUtils.isEmpty(feature_idString)){
				this.output(response, "", 0, "缺少必要的参数");
				return;
			}
			
			Map<String, Object> versionMap = new HashMap<String, Object>();
			versionMap.put("feature_id", feature_idString);
			
			Object uid = UserUtil.getUserID(request);
			String developer_id = UserUtil.getDevelopIdFromSession(request);
			
			//获取应用预览图片
			String preview_conString = request.getParameter("preview_con") == null ? "" : request.getParameter("preview_con").toString();
			
			//取出版本信息
			//Map version_extra = appService.getIndividualAppInfoForVersion(feature_idString);
			Map<String, Object> paramMap = new HashMap<String, Object>();
			paramMap.put("feature_id", feature_idString);
			Map data = appService.findAppFeature(paramMap,100,1);
			List<Map<String,Object>> versionlist = (List<Map<String, Object>>) data.get("data");
			Map<String,Object> version_extra = versionlist.get(0);
			//保存原有图片信息
			String[] old_preview_con_arr = {};
			
			if(version_extra.containsKey("pic_info")){
				Map pic_infoMap = (Map) version_extra.get("pic_info");
				
				if(pic_infoMap.containsKey("preview")){
					List<String> tempList = (List<String>) pic_infoMap.get("preview");
					old_preview_con_arr = (String[]) tempList.toArray(new String[tempList.size()]);
				}
			}
			
			//
			Map<String, List<String>> addMap = new HashMap<String, List<String>>();
			Map<String, List<String>> delMap = new HashMap<String, List<String>>();
			
			Uploader up = new Uploader(request);
			
			//更新预览图标
			if(!"".equals(preview_conString)){
				
				//清除更换的小图标
				String[] preview_con_arr = preview_conString.split(",");
				
				String[] del_preview_con_arr = minus(old_preview_con_arr, preview_con_arr);
				
				// 2014.10.20 改为：不差量删除数据库，直接删除全部旧的，增加所有现在的
				delMap.put("preview", (List<String>)Arrays.asList(old_preview_con_arr));
				
				List<String> preview_insert_List = (List<String>)Arrays.asList(preview_con_arr);
				Collections.reverse(preview_insert_List);
				addMap.put("preview", preview_insert_List);

				//从物理路径删除
				for(int i=0; i< del_preview_con_arr.length; i++){
					try {
						up.deleteFile(del_preview_con_arr[i]);
					} catch (Exception e) {
					}
				}
			}
			
			//从数据库删除文件
			appService.deleteAppPics(feature_idString, delMap);
			appService.addAppPics(feature_idString, addMap);
			
			//将版本状态重新置为0，开发状态
			String app_status = request.getParameter("app_status");
			if(app_status==null||"".equals(app_status)){
				versionMap.put("app_status", 0);
			}else{
				versionMap.put("app_status", app_status);
			}
			appService.saveAppFeature(versionMap);
			this.output(response, 1, 1, "更新成功");
		} catch (Exception e) {
			this.output(response, "", 0, e.getMessage());
		}
	}
	
	//复制图片信息
	public void copyIcon(HttpServletRequest request, HttpServletResponse response) {

		try {
			String feature_idString = null;
			if(request.getAttribute("feature_id")!=null){
				//复制的时候 version_id 放在attribute中
				feature_idString = request.getAttribute("feature_id").toString();
			}else{
				//来自do请求时候 version_id 放在Parameter中
				feature_idString = request.getParameter("feature_id");
			}
			log.debug("版本id"+feature_idString);
			Map<String, Object> versionMap = new HashMap<String, Object>();
			versionMap.put("feature_id", feature_idString);
			// 取出版本信息
			Map version_extra = appService.findAppFeature(versionMap, 100, 1);

			// 保存原有图片信息
			String[] old_little_con_arr = {};
			String[] old_large_con_arr = {};
			String[] old_advise_con_arr = {};
			String[] old_preview_con_arr = {};

			if (version_extra.containsKey("pic_info")) {
				Map pic_infoMap = (Map) version_extra.get("pic_info");
				if (pic_infoMap.containsKey("icon")) {
					List<String> tempList = (List<String>) pic_infoMap
							.get("icon");
					old_little_con_arr = (String[]) tempList
							.toArray(new String[tempList.size()]);
				}

				if (pic_infoMap.containsKey("large_icon")) {
					List<String> tempList = (List<String>) pic_infoMap
							.get("large_icon");
					old_large_con_arr = (String[]) tempList
							.toArray(new String[tempList.size()]);
				}

				if (pic_infoMap.containsKey("recommend")) {
					List<String> tempList = (List<String>) pic_infoMap
							.get("recommend");
					old_advise_con_arr = (String[]) tempList
							.toArray(new String[tempList.size()]);
				}

				if (pic_infoMap.containsKey("preview")) {
					List<String> tempList = (List<String>) pic_infoMap
							.get("preview");
					old_preview_con_arr = (String[]) tempList
							.toArray(new String[tempList.size()]);
				}
			}

			//
			Map<String, List<String>> addMap = new HashMap<String, List<String>>();
			Map<String, List<String>> delMap = new HashMap<String, List<String>>();

			Uploader up = new Uploader(request);
			// 添加小图标

			if (old_little_con_arr.length > 0) {
				addMap.put("icon",
						(List<String>) Arrays.asList(old_little_con_arr));
			}

			// 更新大图标
			if (old_large_con_arr.length > 0) {
				addMap.put("large_icon",
						(List<String>) Arrays.asList(old_large_con_arr));
			}

			// 更新推荐图标
			if (old_advise_con_arr.length > 0) {
				addMap.put("recommend",
						(List<String>) Arrays.asList(old_advise_con_arr));
			}

			// 更新预览图标
			if (old_preview_con_arr.length > 0) {
				List<String> preview_insert_List = (List<String>) Arrays
						.asList(old_preview_con_arr);
				Collections.reverse(preview_insert_List);
				addMap.put("preview", preview_insert_List);
			}

			String new_feature_idString = null;
			if(request.getAttribute("version_id")!=null){
				//复制的时候 version_id 放在attribute中
				new_feature_idString = request.getAttribute("version_id").toString();
			}else{
				//来自do请求时候 version_id 放在Parameter中
				new_feature_idString = request.getParameter("version_id");
			}
			
			log.debug("获取图片地址"+addMap);
			appService.addAppPics(new_feature_idString, addMap);

			// 将版本状态重新置为0，开发状态
			versionMap.put("app_status", 0);
			versionMap.put("feature_id", new_feature_idString);
			appService.saveAppFeature(versionMap);
	
		} catch (Exception e) {
			log.debug("复制图片信息错误",e);
		}
	}

	
	/**
	 * 将JSON格式的请求参数转换为Java对象
	 * @param str
	 * @return
	 * @throws JSONException
	 */
	public List<Map<String,Object>> getListByJsonString(String str) throws JSONException{
		List<Map<String,Object>> list = new ArrayList<Map<String,Object>>();
		JSONArray jnrule = new JSONArray(str);
		//过滤列
    	int k = jnrule.length();
    	for (int r = 0; r < k;r++) {
    		JSONObject jsonObj = jnrule.getJSONObject(r);
            Iterator<?> it = jsonObj.keys();
            Map<String,Object> item = new HashMap<String,Object>();
            while (it.hasNext()) {  
                String key = (String) it.next();  
                String value = jsonObj.getString(key);
                item.put(key, value);
            }
            list.add(item);
    	}
		return list;
	}
	
	/*
	 * 更新某个版本的版本信息(描述信息、说明文档、常见问题)
	 * 
	 */
	public void doUpdateVersionDetail(HttpServletRequest request, HttpServletResponse response){
		try{
			Map res = this.updateVersionDetail(request, response);
			this.output(response, res.get("data"),Integer.parseInt(res.get("code").toString()), res.get("msg").toString());
		}catch(Exception e){
			this.output(response, "", 0, e.getMessage());
		}
	}
	public Map updateVersionDetail(HttpServletRequest request, HttpServletResponse response){
		String feature_idString = null;
		if(request.getAttribute("version_id")!=null){
			//复制的时候 version_id 放在attribute中
			feature_idString = request.getAttribute("version_id").toString();
		}else{
			//来自do请求时候 version_id 放在Parameter中
			feature_idString = request.getParameter("version_id");
		}
		Object uid = UserUtil.getUserID(request);
		Map<String,String> resboolen = new HashMap<String,String>();
		if(StringUtils.isNotEmpty(feature_idString) && StringUtils.isNotEmptyObject(uid)){
			String version_descString = request.getParameter("version_desc")!=null?request.getParameter("version_desc"):request.getParameter("description");
			String developer_id = UserUtil.getDevelopIdFromSession(request);
			Map<String, Object> versionMap = new HashMap<String, Object>();
			versionMap.put("description", version_descString);
			try{
				String app_status = request.getParameter("app_status");
				if(app_status==null||"".equals(app_status)){
					versionMap.put("app_status", 0);
				}else{
					versionMap.put("app_status", app_status);
				}
				//保存应用描述信息
				versionMap.put("feature_id", feature_idString);
				versionMap.put("developer_id", developer_id);
				resboolen = appService.saveAppFeature(versionMap);
				String appIdString = resboolen.get("app_id");
				/*将应用使用说明和常见问题保存文件并存储到RC，并把应用和doc的关联关系保存到ac*/
				List<Map> docList = new ArrayList<Map>();//存放doc信息
				String version_intructionString = Validator.sNull(request.getParameter("version_intruction"));
				String version_problemString = Validator.sNull(request.getParameter("version_problems"));
				if(StringUtils.isNotEmpty(version_intructionString)){
					String basename = APP_INSTRUCTION_TYPE;
					String docInfoStr = this.uploadToRC(uid,feature_idString,basename,version_intructionString);
					String doc_type = APP_INSTRUCTION_TYPE;
					docList = getDocList(docInfoStr,doc_type,docList);
				}
				if(StringUtils.isNotEmpty(version_problemString)){
					String basename = APP_PROBLEMS_TYPE;
					String docInfoStr = this.uploadToRC(uid,feature_idString,basename,version_problemString);
					String doc_type = APP_PROBLEMS_TYPE;
					docList = getDocList(docInfoStr,doc_type,docList);
				}
				if(docList.size()>0){
					boolean result = appService.saveAppDocs(feature_idString,appIdString,docList);
					log.debug("保存docID与应用的关联表失败！！！appAdminService.saveAppDocs(feature_idString="+feature_idString+"appIdString="+appIdString+"docList"+docList);
					if(!result){
						log.error("保存docID与应用的关联表失败！！！appAdminService.saveAppDocs(feature_idString="+feature_idString+"appIdString="+appIdString+"docList"+docList);
					}
				}
			}catch(Exception e){
				resboolen.put("data", "");
				resboolen.put("code", "0");
				resboolen.put("msg",  e.getMessage());
			}
		}else{
			resboolen.put("data", "");
			resboolen.put("code", "0");
			resboolen.put("msg",  "缺少必要的参数!");
		}
		return resboolen;
	}
	/*
	 * 更新某个版本的附加信息
	 */
	public void doUpdateVersionIndividual(HttpServletRequest request, HttpServletResponse response){
		try{
			Map res = this.updateVersionIndividual(request, response);
			this.output(response, res.get("data"),Integer.parseInt(res.get("code").toString()), res.get("msg").toString());
		}catch(Exception e){
			this.output(response, "", 0, e.getMessage());
		}
	}
	public Map updateVersionIndividual(HttpServletRequest request, HttpServletResponse response){
		String feature_idString = null;
		if(request.getAttribute("version_id")!=null){
			//复制的时候 version_id 放在attribute中
			feature_idString = request.getAttribute("version_id").toString();
		}else{
			//来自do请求时候 version_id 放在Parameter中
			feature_idString = request.getParameter("version_id");
		}
		Object uid = UserUtil.getUserID(request);
		Map<String,String> res = new HashMap<String,String>();
		if(StringUtils.isNotEmpty(feature_idString) && StringUtils.isNotEmptyObject(uid)){
			String developer_id = UserUtil.getDevelopIdFromSession(request);
			Map<String, Object> versionMap = new HashMap<String, Object>();
			
			try{
				//组装开发者输入的附加信息
				List<Map<String, Object>> individualInfo = getListByJsonString(request.getParameter("individual_information"));
				versionMap.put("individual_information", individualInfo);
				String app_status = request.getParameter("app_status");
				//未设置或者是复制版本时的状态为0
				if(app_status==null||"".equals(app_status)||"copyVersion".equals(request.getAttribute("operation"))){
					log.debug("状态1："+app_status);
					versionMap.put("app_status", 0);
				}else{
					log.debug("状态2："+app_status);
					versionMap.put("app_status", app_status);
				}
				//保存应用描述信息
				versionMap.put("feature_id", feature_idString);
				versionMap.put("developer_id", developer_id);
				res = appService.saveAppFeature(versionMap);
			}catch(Exception e){
				log.error("updateVersionIndividual"+e.getMessage());
			}
		}
		return res;
	}
	/**
	 * 
	 * @param docInfoStr
	 * @param doc_type
	 * @param docList
	 * @return
	 * @throws IOException
	 */
	public static List<Map> getDocList(String docInfoStr,String doc_type,List<Map> docList) throws IOException{
		if(StringUtils.isNotEmpty(docInfoStr)){
			Map docInfo = JsonUtils.readToObject(docInfoStr, Map.class);
			if(null != docInfo){
				 String code = docInfo.get("code") == null?"":String.valueOf(docInfo.get("code"));
				 if("0000".equals(code)){//上传成功
					 String doc_name = docInfo.get("name")+"."+docInfo.get("mime_type");
					 Map params = new HashMap();
					 params.put("business_type", doc_type);
					 params.put("doc_name", doc_name);
					 params.put("doc_id", docInfo.get("docid"));
					 docList.add(params);
				 }
			}
		}
		return docList;
	}
	/**
	 * 保存文件到rc
	 * @param uid
	 * @param feature_id
	 * @param basename
	 * @param content
	 * @return
	 */
	public  String uploadToRC(Object uid,String feature_id,String basename,String content){
		 String docInfo = "";
		try {
			String filepath = ConfUtil.getConfValue("upload_file_tmp_catalogue") + feature_id + "_" + basename + ".html";
			String realPath = Validator.filePutContents(filepath, content, false);
			if(new File(realPath).isFile()){
				 ArrayList<String> filelList = new ArrayList<String>();
				 String servletUrl =ConfUtil.getConfValue("global.index.rcservice")+"/upload";//"http://rcservice.iop365.com/upload";
			     filelList.add(realPath);
			     Map param = new HashMap();
			     param.put("uid", String.valueOf(uid));
			     param.put("type", "doc");
				 docInfo = UploadUtil.post(param, filelList, servletUrl);
				 /*保存后删除本地文件*/
				 Validator.deleteFile(realPath);
			}
		} catch (FileNotFoundException e) {
			e.printStackTrace();
			log.error("uploadToRC出错"+e);
		} catch (IOException e) {
			e.printStackTrace();
			log.error("uploadToRC出错"+e);
		}
		return docInfo;
	}
	
	//求两个字符串数组的并集，利用set的元素唯一性  
    public static String[] union(String[] arr1, String[] arr2) {  
        Set<String> set = new HashSet<String>();  
        for (String str : arr1) {  
            set.add(str);  
        }  
        for (String str : arr2) {  
            set.add(str);  
        }  
        String[] result = {};  
        return set.toArray(result);  
    }  
	
	//求两个数组的交集  
    public static String[] intersect(String[] arr1, String[] arr2) {  
        Map<String, Boolean> map = new HashMap<String, Boolean>();  
        LinkedList<String> list = new LinkedList<String>();  
        for (String str : arr1) {  
            if (!map.containsKey(str)) {  
                map.put(str, Boolean.FALSE);  
            }  
        }  
        for (String str : arr2) {  
            if (map.containsKey(str)) {  
                map.put(str, Boolean.TRUE);  
            }  
        }  
  
        for (Entry<String, Boolean> e : map.entrySet()) {  
            if (e.getValue().equals(Boolean.TRUE)) {  
                list.add(e.getKey());  
            }  
        }  
  
        String[] result = {};  
        return list.toArray(result);  
    }  
	
	//求两个数组的差集  
    public static String[] minus(String[] arr1, String[] arr2) {  
        LinkedList<String> list = new LinkedList<String>();  
        LinkedList<String> history = new LinkedList<String>();  
        String[] longerArr = arr1;  
        String[] shorterArr = arr2;  
        //找出较长的数组来减较短的数组 
        for (String str : longerArr) {  
            if (!list.contains(str)) {  
                list.add(str);  
            }  
        }  
        for (String str : shorterArr) {  
            if (list.contains(str)) {  
                history.add(str);  
                list.remove(str);  
            }
        }  
  
        String[] result = {};  
        return list.toArray(result);  
    }  

	
	/**
	 * 提交审核版本
	 * @param request
	 * @param response
	 */
	
	public void doSubmitVersion(HttpServletRequest request, HttpServletResponse response){
		
		Map<String,String> version = new HashMap<String,String>();
		String feature_idString = request.getParameter("version_id");
		Object uid = UserUtil.getUserID(request);
		if(StringUtils.isNotEmpty(feature_idString) && StringUtils.isNotEmptyObject(uid)){
			String developer_id = UserUtil.getDevelopIdFromSession(request);
			try{
				Map<String,Object> apra = new HashMap<String,Object>();
				apra.put("feature_id",feature_idString);
				apra.put("developer_id",developer_id);
				version = appService.submitAppFeature(apra);
				this.output(response, "", Integer.valueOf(version.get("code")), version.get("msg"));
			}catch(Exception e){
				this.output(response, "", -1, e.getMessage());
			}
		}else{
			this.output(response, "", -1, "缺少必要的参数!");
		}
	}
	
	/**
	 * 取消提交审核版本
	 * @param request
	 * @param response
	 */
	
	public void doCancelSubmitVersion(HttpServletRequest request, HttpServletResponse response){
		String feature_idString = request.getParameter("version_id");
		Object uid = UserUtil.getUserID(request);
		if(StringUtils.isNotEmpty(feature_idString) && StringUtils.isNotEmptyObject(uid)){
			String developer_id = UserUtil.getDevelopIdFromSession(request);
			try{
				Map<String,Object> param = new HashMap<String,Object>();
				param.put("feature_id", feature_idString);
				param.put("developer_id", developer_id);
				Map<String,String> version = appService.cancelSubmitAppFeature(param);
				this.output(response, "", Integer.valueOf(version.get("code")), version.get("msg"));
			}catch(Exception e){
				this.output(response, "", -1, e.getMessage());
			}
		}else{
			this.output(response, "", -1, "缺少必要的参数!");
		}
	}
	
	/**
	 * 调用新接口删除应用版本
	 * @Description：
	 * @author: chenlei
	 * @date: 2017年7月17日 上午10:42:24
	 * @param request
	 * @param response
	 */
	public void doDeleteVersion(HttpServletRequest request, HttpServletResponse response){
		
		String feature_id = request.getParameter("version_id")==null?"":request.getParameter("version_id");
		String []params = new String[]{feature_id};
		Boolean res = appService.deleteAppFeature(params);
		if(res) {
			this.output(response, 1, 0, "删除成功");
		}else{
			this.output(response, 0, 0, "删除失败");
		}
		
	}
	public void doCopyVersion(HttpServletRequest request, HttpServletResponse response){
		try{
			//
			request.setAttribute("operation", "copyVersion");
			Map res = this.copyVersion(request, response);
			this.output(response, res.get("data"),Integer.parseInt(res.get("code").toString()), res.get("msg").toString());
		}catch(Exception e){
			this.output(response, "", 0, e.getMessage());
		}
	}
	public Map copyVersion(HttpServletRequest request, HttpServletResponse response){
		Map res = new HashMap();
		try{
			res = this.createVersion(request,response);
			if(res.containsKey("code")&&res.get("code")!=null && "1".equals(res.get("code").toString())){
				
				String version_id = res.get("data").toString();
				request.setAttribute("version_id", version_id);
				
				res = this.updateVersionInfo(request, response);
				if(res.containsKey("code")&&res.get("code")!=null && "1".equals(res.get("code").toString())){
					res = this.updateVersionDetail(request, response);
					if(res.containsKey("code")&&res.get("code")!=null && "1".equals(res.get("code").toString())){	
						
						res = this.updateVersionIndividual(request, response);
						this.copyIcon(request, response);
					}else{
						return res;
					}
				}else{
					return res;
				}
			}else{
				return res;
			}
		}catch(Exception e){
			res.put("data", "");
			res.put("code", 0);
			res.put("msg", e.getMessage());
		}
		if(res.containsKey("code")&&res.get("code")!=null && "1".equals(res.get("code").toString())){
			res.put("msg", "应用复制成功");
		}
		return res;
	}
	
	
	public void doUploadPic(HttpServletRequest request, HttpServletResponse response)throws IOException{
	
		try{
			//进行上传
		 	Uploader up = new Uploader(request);
		    up.setSavePath(AppPicUtil.img_upload_path);
		    String[] fileType = {"jpg", "png", "gif","apk"};
		    up.setAllowFiles(fileType);
		    up.setMaxSize(10000); //单位KB
		    PrintWriter out = response.getWriter();
		    
		    up.upload();
			if(!up.getIsSuccess()){
				throw new Exception("上传失败");
			}else{
				Map<String, Object> result = new HashMap();
				result.put("code", "0000");
				result.put("msg", "上传成功");
				result.put("data", up.getUrl());
				if(result != null){
					try {
						response.getWriter().print(JsonUtils.convertToString(result));
					} catch (IOException e) {
						log.error("doUploadPic"+e.getMessage());
					}
				}	
			}
			
		}catch(Exception e){
			this.output(response, "", -1, e.getMessage());
		}
		
	}
	/**
	 * 
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	public void doUploadUEPicBsfw(HttpServletRequest request, HttpServletResponse response)throws IOException{
		try{
			//进行上传
		 	Uploader up = new Uploader(request);
		    up.setSavePath(AppPicUtil.img_upload_path);
		    String[] fileType = {"jpg", "png", "gif","apk"};
		    up.setAllowFiles(fileType);
		    up.setMaxSize(10000); //单位KB
		    PrintWriter out = response.getWriter();
		    up.upload();
			if(!up.getIsSuccess()){
				throw new Exception("上传失败");
			}else{
				Map<String, Object> result = new HashMap();
				result.put("original", up.getOriginalName());
				result.put("url", up.getUrl());
				result.put("state", up.getState());
				result.put("title", up.getOriginalName());
				try {
					response.getWriter().print(JsonUtils.convertToString(result));
				} catch (IOException e) {
					e.printStackTrace();
					log.error("UE图片上传失败doUploadUEPicBsfw"+e.getMessage());
				}
			}
		}catch(Exception e){
			log.error("UE图片上传失败doUploadUEPicBsfw"+e.getMessage());
			this.output(response, "", -1, e.getMessage());
		}
		
	}
	/*
	 * 上传APK
	 */
	public void doUploadApk(HttpServletRequest request, HttpServletResponse response)throws IOException{
		try{
			//进行上传
		 	Uploader up = new Uploader(request);
		    up.setSavePath(AppPicUtil.file_upload_path);
		    String[] fileType = {"apk"};
		    up.setAllowFiles(fileType);
		    up.setMaxSize(102400); //单位KB
		    PrintWriter out = response.getWriter();	    
		    up.upload();
			if(!up.getIsSuccess()){
				throw new Exception("上传失败");
			}else{
				Map<String, Object> result = new HashMap();
				
				result.put("code", "0000");
				result.put("msg", "上传成功");
				result.put("data", up.getUrl());
				
				if(result != null){
					try {
						response.getWriter().print(JsonUtils.convertToString(result));
					} catch (IOException e) {
						log.error(e);
					}
				}	
			}
			
		}catch(Exception e){
			this.output(response, "", 0, e.getMessage());
		}
		
	}
	
	/*
	 * 删除某一个版本下的单张图片，程序逻辑有漏洞，别人可以模拟请求删除别人的图
	 */
	public void doDeletePic(HttpServletRequest request, HttpServletResponse response)throws IOException{
	
		try{
			Object uid = UserUtil.getUserID(request);
			String feature_idString = request.getParameter("version_id");
			String typeString = request.getParameter("type");
			String pathString = request.getParameter("path");
			if(StringUtils.isNotEmpty(feature_idString) && StringUtils.isNotEmpty(typeString) && StringUtils.isNotEmpty(pathString) && StringUtils.isNotEmptyObject(uid)){
				//进行上传
			 	Uploader up = new Uploader(request);
			 	up.deleteFile(pathString);
			   
				this.output(response, 1, 1, "删除成功");
			}else{
				this.output(response, 1, 1, "删除失败");
			}
		}catch(Exception e){
			this.output(response, "", 0, e.getMessage());
		}
		
	}
	

	
	/**
	 * Description: 输出结果;
	 */
	private void output(HttpServletResponse response, Object data, int code, String msg){
		Map<String, Object> result = new HashMap();
		
		result.put("code", code);
		result.put("msg", msg);
		result.put("data", data);
		
		if(result != null){
			try {
				response.getWriter().print(JsonUtils.convertToString(result));
			} catch (IOException e) {
				log.error("output=="+e);
			}
		}	
	}
 
	 
}


