package com.inspur.utils; 

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.loushang.internet.util.StringUtils;

import com.inspur.data.common.utils.ConfUtil;

/**
 * 应用图标工具类
 * @author zhanglch
 *
 */
public class AppPicUtil {

	public static final String img_upload_path = "/skins/img/upload/img";//图片上传在项目中的绝对目录
	public static final String file_upload_path = "/skins/img/upload/file";//文件上传在项目中的绝对目录

	public static final String default_icon = ConfUtil.getConfValue("app_default_icon");
	public static final String default_large_icon = ConfUtil.getConfValue("app_default_icon");
	public static final String default_recommend = ConfUtil.getConfValue("app_default_icon");
	public static final String default_poster = ConfUtil.getConfValue("app_default_icon");
	//注意，预览图必须是List,否则前台会出错，获取的时候要用getDefaultPreview()方法
	public static final String default_preview_str = ConfUtil.getConfValue("app_default_icon");
	
	private static Log log = LogFactory.getLog(AppPicUtil.class);// 日志
	
	/**
	 * 获取应用的文件的存储路径
	 * @return
	 */
	public static String getAppIcon(String str){
		if(StringUtils.isEmpty(str)){
			str = default_icon;
		}
		if(str.startsWith("[") && str.endsWith("]")){
			str = str.substring(1, str.length()-1);
		}
		String rcservice_url = ConfUtil.getConfValue("global.index.rcservice");
		if(rcservice_url == null ||"".equals(rcservice_url.trim())){
			String acweb_center_url = ConfUtil.getConfValue("global.index.odweb").trim();
			return acweb_center_url + str;
		}else{
			return rcservice_url+"/doc?doc_id="+str;
		}
		
	}
	
	/**
	 * 根据size获取指定图片的完整地址
	 */
	public static String getAppIconBySize(String pic,String size){
		if(StringUtils.isEmpty(pic)){
			pic = default_icon;
		}
		if(pic.startsWith("[") && pic.endsWith("]")){
			pic = pic.substring(1, pic.length()-1);
		}
		String rcservice_url = ConfUtil.getConfValue("global.index.rcservice");
		if(rcservice_url == null ||"".equals(rcservice_url.trim())){
			String acweb_center_url = ConfUtil.getConfValue("global.index.odweb").trim();
			return acweb_center_url + pic;
		}else{
			String params = "&type=thumbnail&size="+size;
			return rcservice_url+"/doc?doc_id="+pic+params;
		}
	}
	/**
	 * 获取应用对应的图标
	 * @param appMap
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public static Map getAppIcon(Map appMap){
		try{
			Map pic_info = null;
			Object pic = appMap.get("pic_info");
			if((pic == null) || !(pic instanceof Map) || !StringUtils.isNotEmptyMap((Map)pic)){
				pic_info = new HashMap();
				pic_info.put("icon", default_icon);//小图标
				
				//注意，预览图必须是List,否则前台会出错
				pic_info.put("preview", getDefaultPreview());
				
				pic_info.put("large_icon", default_large_icon);//大图标
				pic_info.put("recommend", default_recommend);//推荐图标
				pic_info.put("poster", default_poster);
			}else{
				pic_info = (Map)(pic);
				
				//小图标
				List iconList = (List)pic_info.get("icon");
				if(StringUtils.isNotEmptyList(iconList) && !AppInfo.isNull((String)iconList.get(0))){
					pic_info.put("icon", iconList.get(0));
				}else{
					pic_info.put("icon", default_icon);
				}
				
				//预览图
				List preview = (List)pic_info.get("preview");
				if(StringUtils.isNotEmptyList(preview)){
					pic_info.put("preview", preview);
				}else{
					pic_info.put("preview", getDefaultPreview());
				}
				
				//大图标
				List large_icon = (List)pic_info.get("large_icon");
				if(StringUtils.isNotEmptyList(large_icon) && !AppInfo.isNull((String)large_icon.get(0))){
					pic_info.put("large_icon", large_icon.get(0));
				}else{
					pic_info.put("large_icon", default_large_icon);
				}
				
				//推荐图标
				List recommend = (List)pic_info.get("recommend");
				if(StringUtils.isNotEmptyList(recommend) && !AppInfo.isNull((String)recommend.get(0))){
					pic_info.put("recommend", recommend.get(0));
				}else{
					pic_info.put("recommend", default_recommend);
				}
				
				//poster图标
				List poster = (List)pic_info.get("poster");
				if(StringUtils.isNotEmptyList(poster) && !AppInfo.isNull((String)poster.get(0))){
					pic_info.put("poster", poster.get(0));
				}else{
					pic_info.put("poster", default_poster);
				}
			}
			
			appMap.put("pic_info", pic_info);
		}catch(Exception ex){
			ex.printStackTrace();
			log.error("getAppIcon()出错",ex);
		}
		return appMap;
	}
	
	/**
	 * 获取默认的预览图
	 * @return
	 */
	public static List<String> getDefaultPreview(){
		List<String> preview = new ArrayList<String>();
		preview.add(default_preview_str);
		return preview;
	}
	
	/**
	 * 去掉默认的图片，比如应用的图标管理会用到
	 * @param map
	 */
	@SuppressWarnings("unchecked")
	public static void delDefault(Map map){
		if(!StringUtils.isNotEmptyMap(map))return;
		Object pic = map.get("pic_info");
		if(StringUtils.isNotEmptyObject(pic) && (pic instanceof Map)){
			Map<String,Object> pic_info = (Map<String,Object>)(pic);
			if(AppPicUtil.default_icon.equals(pic_info.get("icon")))pic_info.put("icon", "");
			
			//预览图比较特殊
			Object preview = pic_info.get("preview");
			if(StringUtils.isNotEmptyObject(preview)){
				if(getDefaultPreview().get(0).equals(((List)preview).get(0))){
					pic_info.put("preview", new ArrayList());
				}
			}
			
			if(AppPicUtil.default_large_icon.equals(pic_info.get("large_icon")))pic_info.put("large_icon", "");
			if(AppPicUtil.default_recommend.equals(pic_info.get("recommend")))pic_info.put("recommend", "");
			if(AppPicUtil.default_poster.equals(pic_info.get("poster")))pic_info.put("poster", "");
		}
	}
}
