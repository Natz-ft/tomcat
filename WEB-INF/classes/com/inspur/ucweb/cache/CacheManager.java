package com.inspur.ucweb.cache;

import java.io.UnsupportedEncodingException;
import java.lang.reflect.InvocationTargetException;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.phprpc.util.PHPSerializer;

import com.inspur.ucweb.utils.LoadBeans;


/**
 * 
 * 缓存管理
 *
 */
public class CacheManager{
	private static Log log = LogFactory.getLog(CacheManager.class);
	private static CacheInterface cacheInstance;
	/**
	 * 设置缓存
	 * @param key  缓存id
	 * @param obj  缓存内容
	 */
	public static void set(String key, Object value){
		try {
			byte[] v = new PHPSerializer().serialize(value);
			String tt = new String(v, "utf-8");
			getCacheInstance().set(key, tt);
		} catch (IllegalArgumentException e) {
			log.error("参数不合法！",e);
		} catch (IllegalAccessException e) {
			log.error("访问出错！",e);
		} catch (InvocationTargetException e) {
			log.error("调用出错！",e);
		} catch (UnsupportedEncodingException e) {
			log.error("不支持的编码！",e);
		}
	}
	/**
	 * 设置缓存
	 * @param key  缓存id
	 * @param obj  缓存内容
	 * @param duration 有效时间
	 */
	public static void set(String key, Object value, int duration){
		try {
			byte[] v = new PHPSerializer().serialize(value);
			getCacheInstance().set(key, new String(v, "utf-8"),duration);
		} catch (IllegalArgumentException e) {
			log.error("参数不合法！",e);
		} catch (IllegalAccessException e) {
			log.error("访问出错！",e);
		} catch (InvocationTargetException e) {
			log.error("调用出错！",e);
		} catch (UnsupportedEncodingException e) {
			log.error("不支持的编码！",e);
		}
	}
	/**
	 * 获取缓存
	 * @param key  缓存keyid
	 * @return
	 */
	public static Object get(String key){
		Object s = getCacheInstance().get(key);
		if(s == null){
			return null;
		}
		try {
			return new PHPSerializer().unserialize(((String)s).getBytes("utf-8"), String.class);
		} catch (IllegalArgumentException e) {
			log.error("参数不合法！",e);
		} catch (IllegalAccessException e) {
			log.error("访问出错！",e);
		} catch (InvocationTargetException e) {
			log.error("调用出错！",e);
		} catch (UnsupportedEncodingException e) {
			log.error("不支持的编码！",e);
		}
		return null;
	}
	/**
	 * 获取缓存
	 * @param key  缓存keyid
	 * @return
	 */
	public static <T> T get(String key,Class<T> cls){
		Object s = getCacheInstance().get(key);
		if(s == null){
			return null;
		}
		try {
			return (T)(new PHPSerializer().unserialize(((String)s).getBytes("utf-8"), cls));
		}  catch (IllegalArgumentException e) {
			log.error("参数不合法！",e);
		} catch (IllegalAccessException e) {
			log.error("访问出错！",e);
		} catch (InvocationTargetException e) {
			log.error("调用出错！",e);
		}catch (UnsupportedEncodingException e) {
			log.error("不支持的编码！",e);
		}
		return null;
	}
	/**
	 * 移除缓存
	 * @param key
	 * @return
	 */
	public static boolean remove(String key){
		return getCacheInstance().remove(key);
	}
	/**
	 * 清空缓存
	 */
	public static void clear(){
		getCacheInstance().clear();
	}
	
	public static CacheInterface getCacheInstance(){
		if(cacheInstance == null){
			try{
				cacheInstance = (CacheInterface)LoadBeans.getApplicationContext().getBean("cache.instance");
			}catch (Exception e) {
				log.error("",e);
				throw new RuntimeException("获取缓存配置信息失败!");
			}
		}
		return cacheInstance;
	}
}