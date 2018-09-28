package com.inspur.utils;

import java.util.Properties;
import java.util.Random;

import org.loushang.internet.bindingclass.ThemeBindingManager;

import com.inspur.data.common.utils.PropertiesUtils;



/**
 * 统一读取conf.properties配置文件
 * 获取键为global.index. + key对应的value
 */
public class ConfUtil {
	
	private static Properties prop = new Properties();
	
	public static String getGlobalKey(String key){
		return Function.getFrameConf("global.index."+key);
	}
	
	public static String getConfValue(String key){
		return Function.getConfConf(key);
	}
	
	public static String getLoginKey(String key){
		return PropertiesUtils.getValue("login.properties","global.sso." + key);
	}
	
	public static String getWebSiteKey(String key){
		return Function.getFrameConf("web_"+key);
	}
	
	/**
	 * 获取API明细页地址
	 * @return
	 */
	public static String getAPIDetail(String apiId){
		return Function.getFrameConf("global.index.oam") + "servicelist/serviceInfo.htm?service_id=" + apiId;
	}
	/**
	 * 判断是否是当前主题
	 * @param theme
	 * @return
	 */
	public static boolean isThemes(String theme){
		return theme.equals(ThemeBindingManager.getCurrentTheme());
	}
	/**
	 * 获取文档访问请求地址
	 * <br>
	 * <p>Description: 
	 * <br>
	 * <a href=mailto:haowenxiang@inspur.com>haowx</a><br>
	 * <p>Date: 2014年9月26日 上午8:51:51<br/>
	 * <p>
	 * @return   
	 * @see String
	 */
	public static String getDocUrl(String path){
		if(path.indexOf("/")<0||path.indexOf("\\")<0){
			String web_doc = getConfValue("web_down");
			return web_doc+path;
		}
		return Function.getUrl(path);
	}
	
	public static String getImgUrl(String path){
		if(path.indexOf("/")<0||path.indexOf("\\")<0){
			String web_doc = getWebSiteKey("img");
			return web_doc+path;
		}
		return Function.getUrl(path);
	}
	
	/**
	 * 根据key，取得对应的value值
	 * @param String key
	 * @return String
	 */
	public static String getValue(String key){
		if(key == null){
			return null;
		}
		return prop.getProperty(key).trim();
	}
	public static void main(String[] args) {
		System.out.println("\\path\\ss".startsWith("\\"));
	}
	
	/**
	 * 获取指定位数的随机数（不保证随机数的唯一性）
	 * 
	 * @param length
	 *            随机数的位数
	 * @return String
	 */
	public static String getRandom(int length) {
		if (length <= 0) {
			length = 1;
		}
		StringBuilder num = new StringBuilder();
		Random r = new Random();
		int i = 0;
		while (i < length) {
			num.append(r.nextInt(10));
			i++;
		}
		return num.toString();
	}
}
