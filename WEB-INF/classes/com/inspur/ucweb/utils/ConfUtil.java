package com.inspur.ucweb.utils;

import com.inspur.common.utils.PropertiesUtil;

/*
 * 对应配置文件 conf.properties
 */
public class ConfUtil{
	
//	private static Logger log = Logger.getLogger(ConfUtil.class);
//	private static PropertiesUtil prop = new PropertiesUtil();
//	static{
//		try {
//			prop.load(Thread.currentThread().getContextClassLoader().getResourceAsStream("conf.properties"));
//			
////			//转码处理
////			Set<Object> keyset = prop.keySet();
////			Iterator<Object> iter = keyset.iterator();
////			while (iter.hasNext()) {
////				String key = (String) iter.next();
////				String newValue = null;
////				try {
////					//属性配置文件自身的编码
////					String propertiesFileEncode = "utf-8";
////					newValue = new String(prop.getProperty(key).getBytes("ISO-8859-1"),propertiesFileEncode);
////				} catch (UnsupportedEncodingException e) {
////					newValue = prop.getProperty(key);
////				}
////				prop.setProperty(key, newValue);
////			}
//		} catch (Exception e) {
//			log.error("读取配置文件conf.properties出错！", e);
//		}
//	}
//	
//	/**
//	 * 根据key，取得对应的value值
//	 * @param String key
//	 * @return String
//	 */
	public static String getValue(String key){
		return PropertiesUtil.getValue("conf.properties",key);
	}
	public static String getFrameValue(String key){
		return PropertiesUtil.getValue("frame.properties",key);
	}
	public static String getPcpValue(String key){
		return PropertiesUtil.getValue("pcp.properties",key);
	}
	public static String getQingDaoValue(String key){
		return PropertiesUtil.getValue("qingdao.properties",key);
	}
	public static String getLoginConf(String key){
		return PropertiesUtil.getValue("login.properties",key);
	}
	
	public static String getUumConf(String key) {
		return PropertiesUtil.getValue("uum.properties",key);
	}
	public static String getLoginKey(String key) {
		return PropertiesUtil.getValue("login.properties","global.sso." + key);
	}
	
} 

