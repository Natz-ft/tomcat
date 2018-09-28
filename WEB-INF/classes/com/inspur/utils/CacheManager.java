package com.inspur.utils;

import java.util.Date;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.inspur.data.common.cache.mem.MemClusterCache;

/**
 * 
 * 缓存管理
 *
 */
public class CacheManager{
	private static Log log = LogFactory.getLog(CacheManager.class);
	private static MemClusterCache cacheInstance;
	/**
	 * 设置缓存
	 * @param key  缓存id
	 * @param obj  缓存内容
	 */
	public static void set(String key, Object value){
		try {
			getMemClusterCache().set(key, value);
		} catch (IllegalArgumentException e) {
			log.error("参数不合法！",e);
		}
	}
	/**
	 * 设置缓存
	 * @param key  缓存id
	 * @param obj  缓存内容
	 * @param duration 有效时间
	 */
	public static void set(String key, Object value, Date duration){
		try {
			getMemClusterCache().add(key, value,duration);
		} catch (IllegalArgumentException e) {
			log.error("参数不合法！",e);
		}
	}
	/**
	 * 获取缓存
	 * @param key  缓存keyid
	 * @return
	 */
	public static Object get(String key){
		Object s = getMemClusterCache().get(key);
		if(s == null){
			return null;
		}
		try {
			return s;
		} catch (IllegalArgumentException e) {
			log.error("参数不合法！",e);
		}
		return null;
	}
	/**
	 * 移除缓存
	 * @param key
	 * @return
	 */
	public static boolean remove(String key){
		return getMemClusterCache().delete(key);
	}
	/**
	 * 清空缓存
	 */
	public static void clear(){
		getMemClusterCache().flush();
	}
	
	public static MemClusterCache getMemClusterCache(){
		if(cacheInstance == null){
			try{
				cacheInstance = (MemClusterCache)SpringContextHolder.getBean("memCache");
			}catch (Exception e) {
				log.error(e);
				throw new RuntimeException("获取缓存配置信息失败!");
			}
		}
		return cacheInstance;
	}
}