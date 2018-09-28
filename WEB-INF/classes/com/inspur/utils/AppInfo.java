package com.inspur.utils;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.loushang.internet.util.StringUtils;

import com.inspur.api.ac.IAppAdminService;
import com.inspur.api.ac.IAppService;
import com.inspur.api.ac.IAppStatisticService;
import com.inspur.hsf.config.ServiceFactory;
import com.inspur.uc.api.user.IUserExtendDomain;
import com.inspur.ucweb.utils.Validator;

/**
 * 获取应用信息工具类
 * @author zhanglch
 *
 */
public class AppInfo {
	public static final String CACHE_KEY_PREFIX_APPID_INFO="app_id_info_";
	public static final String CACHE_KEY_PREFIX_APPGROUP_ID_INFO="appgroup_id_info_";
	public static final String APP_STATUS_REPORTS_CACHE_KEY="app_status_reports_info_";
	public static final String CACHE_KEY_PREFIX_APP_FEATURE_INFO = "app_feature_info_";
	
	public static final boolean USER_VERSION_ID = true;
	
	private static Log log = LogFactory.getLog(AppInfo.class);// 日志
	
	/**
	 * 判断应用是否 隶属 当前委办局，即应用是否是当前委办局开发
	 * @param appId
	 * @param uid
	 * @return
	 */
	public static boolean checkAppBelongToDept(String appId, String uid) {
		if(Validator.isEmpty(appId) || Validator.isEmpty(uid)) return false;
		int mainUid = UserUtil.getUidByFid(uid);
		if(mainUid > 0) 
			uid = String.valueOf(mainUid);
		IUserExtendDomain user = (IUserExtendDomain)ServiceFactory.getService("IUserExtendDomain");
		//根据uid获取developer_id
		Map extendInfo = user.getUserExtendByUid(Integer.parseInt(uid));
		if(extendInfo!=null && extendInfo.get("developer_id")!=null){
			String developer_id = String.valueOf(extendInfo.get("developer_id"));
			IAppAdminService appAdminService;
			try {
				appAdminService = OamUtils.getAppAdminService();
				return appAdminService.checkAppForAdmin(appId, developer_id);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				return false;
			}
			
		}
		return false;
		
	}
	public static Map getAppProjectInfo(String app_id){
		Map appInfo = new HashMap();
		if(StringUtils.isNotEmpty(app_id)){
			try{
				IAppAdminService appAdminService = OamUtils.getAppAdminService();
				return appAdminService.getAppProjectInfo(app_id);
			}catch(Exception e){
				log.error("getAppProjectInfo出错",e);
			}
			
		}
		return appInfo;
	}
	
	/**
	 * 根据appId获取应用信息
	 */
	@SuppressWarnings("unchecked")
	public static Map getAppByVersionId(Object versionId){
		if(versionId == null){
			return null;
		}
		try{
			IAppService appService = OamUtils.getAppService();
			IAppStatisticService appStatisticService = OamUtils.getAppStatisticService();
			Map<String,Object> param = new HashMap<String,Object>();
			param.put("app_id", versionId.toString());
			Map appMap=appService.findOnlineAppInfo(param, 99, 1);
			Map appcount = appStatisticService.getAppStatisticCount(param);
			if(null != appcount){
				appMap.put("ucount", appMap.get("use_amount"));
				appMap.put("grade", appMap.get("avg_grade"));
			}
			return appMap;
		}catch(Exception ex){
			ex.printStackTrace();
			log.error("getAppById()出错！",ex);
			return new HashMap();
		}
	}
	
	
	/**
	 * 过滤应用的信息，如文本显示内容的安全处理、应用访问地址等的初始化等等
	 * @param app
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public static Map appInfoFilter(Map app) {
		try{
			if(!StringUtils.isNotEmptyMap(app)){
				return new HashMap();
			}
			//获取应用图片
			app = AppPicUtil.getAppIcon(app);
			//应用所属标签
			List tagList=new ArrayList();
			if(app.get("tag")!=null){
				String [] tags=app.get("tag").toString().split(",");
				tagList=Arrays.asList(tags);
				if(tagList.get(tagList.size()-1).equals("")){
					if(tagList.size()>1){
						tagList.remove(tagList.size()-1);
					}
				}
			}
			app.put("tagList", tagList);

			/** 以下方法，用到时再实现，暂时用不到
			$ref_info = S1('app_id_refinfo_'.$app['app_id']);
			if(!empty($ref_info)){
				$app = array_merge($app,$ref_info,$dynamic_info);
				return $app;
			}
			
			$group_name = array();
			foreach($app['group_id'] as $a){
				$group_ar = getAppGroupById($a);
				$group_name[] = $group_ar['name'];
				$group[$a] = $group_ar['name'];
			}
			$ref_info['group'] = $group;
			$ref_info['group_name'] = implode(",",$group_name);
			$ref_info['detail_url'] = U('appstore/Index/detail',array('app_id'=>$app['app_id']));
			//设置应用的优先访问页面
			if($app['access_type'] == '0') {
				//使用默认设置，优先访问详细页
				$ref_info['access_url'] = $ref_info['detail_url'];
			} else if($app['access_type'] == '1') {
				//设置为优先访问详细页
				$ref_info['access_url'] = $ref_info['detail_url'];
			} else {
				//使用默认设置
				if($app['app_type']=='outter_app' || $app['app_type']=='item_app') {
					//站外应用（网站接入）默认优先访问详细页
					$ref_info['access_url'] = $ref_info['detail_url'];
				} else {
					//站内应用和官方应用默认优先访问应用页
					$ref_info['access_url'] = getAppEntry($app);
				}
			}
			//部分字段的值转换为安全的纯文本
			$ref_info['tag'] = t($app['tag'],false,ENT_QUOTES);
			$ref_info['app_name'] = t($app['app_name'],false,ENT_QUOTES);
			$ref_info['app_alias'] = t($app['app_alias'],false,ENT_QUOTES);
			$ref_info['description'] = getShort($app['description'],140,'...');
			$ref_info['description'] = t($ref_info['description'],false,ENT_QUOTES);
			
			*/
		}catch(Exception ex){
			ex.printStackTrace();
			log.error("appInfoFilter()出错！",ex);
		}
		return app;
	}

	/**
	 * 根据app_name获取app的详细内容，包括api的级别，是否需要用户授权的信息
	 * @param name
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public static Map getAppByName(String name){
		if(StringUtils.isEmpty(name))return new HashMap();
		try {
			IAppAdminService appAdminService = OamUtils.getAppAdminService();
			return appAdminService.getAppByName(name);
		} catch (Exception ex) {
			ex.printStackTrace();
			log.error("getAppByName()出错！",ex);
			return new HashMap();
		}
	}
	
	
	/**
	 * 通过app信息
	 * @param {Array,String} $app
	 */
	
	@SuppressWarnings("unchecked")
	public static String getAppEntry(String appId,Map appInfo){
		if(StringUtils.isEmpty(appId)){
			return "";
		}
		String appEntry ="";
		String appType = (String)appInfo.get("app_type");
		if("inner".equals(appType)){//站内应用
			appEntry = "extapp.htm?id=" + appId;
		}else{
			appEntry=(String)appInfo.get("app_url");
		}
		return appEntry;
		
	}
	
	/**
	 * 判断是否为空
	 * @param str
	 * @return
	 */
	public static boolean isNull(String str){
		return (StringUtils.isEmpty(str) || ("null".equals(str)));
	}
}
