package com.inspur.ucweb.cache;


/**
 * 
 * cache抽象接口
 *
 */
public interface CacheInterface{
	/**
	 * 设置缓存
	 * @param key
	 * @param value
	 */
	public void set(String key, Object value);
	/**
	 * 设置缓存
	 * @param key
	 * @param value
	 * @param duration 有效时间s
	 */
	public void set(String key, Object value, int duration);
	/**
	 * 获取缓存
	 * @param key
	 */
	public Object get(String key);
	/**
	 * 清除缓存
	 * @param key
	 */
	public boolean remove(String key);
	/**
	 * 清空缓存
	 * @param key
	 */
	public void clear();
	
}