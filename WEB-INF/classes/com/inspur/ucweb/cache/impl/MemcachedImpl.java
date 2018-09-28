package com.inspur.ucweb.cache.impl;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.loushang.memcache.MemcachedClient;
import org.loushang.memcache.exception.MemcachedIOException;

import com.inspur.ucweb.cache.CacheInterface;


/**
 * memcahed缓存实现类
 * @author Gaoht
 *
 */
public class MemcachedImpl implements CacheInterface{
	private static Log log = LogFactory.getLog(MemcachedImpl.class);
	public Object get(String key) {
		try {
			return this.client.get(key);
		} catch (MemcachedIOException e) {
			log.error(e);
		}
		return null;
	}

	public boolean remove(String key){
		try {
			return this.client.delete(key);
		} catch (MemcachedIOException e) {
			log.error(e);
		}
		return false;
	}

	public void set(String key, Object value, int duration) {
		try {
			int defaultDuration = this.client.getDuration();
			this.client.put(key, value);
			this.client.setDuration(defaultDuration);
		} catch (MemcachedIOException e) {
			log.error(e);
		}
		
	}
	public void set(String key, Object value) {
		try {
			this.client.put(key, value);
		} catch (MemcachedIOException e) {
			log.error(e);
		}
	}
	public void clear() {
		try {
			this.client.flush();
		} catch (MemcachedIOException e) {
			log.error(e);
		}
	}
	/**
	 * memcached客户端
	 */
	private MemcachedClient client;
	public void setClient(MemcachedClient client){
		this.client = client;
	}
}