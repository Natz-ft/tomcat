package com.inspur.utils;

import java.util.Arrays;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

public class JavaMemoryCacheManager {
	
	private static ConcurrentHashMap <String,AtomicLong> cache=new ConcurrentHashMap <String,AtomicLong>();
	
	private static Log log = LogFactory.getLog(JavaMemoryCacheManager.class);
	public static long incr(String key, long delta, long initValue) {
		try {
			AtomicLong counter=cache.get(key);
			if(counter==null){
				counter=new AtomicLong(initValue);
				cache.putIfAbsent(key, counter);
			}
			return counter.addAndGet(delta);
		} catch (Exception e) {
			log.error("JavaMemoryCacheManager.incr(key:"+key+",delta:"+delta+",initValue:"+initValue);
			log.error(Arrays.toString(e.getStackTrace()));
		}
		return initValue;
	}
	
	public static void reset(String key,long initValue){
		try {
			AtomicLong counter=cache.get(key);
			if(counter==null){
				counter=new AtomicLong(initValue);
				cache.put(key, counter);
			}
			counter.set(initValue);
		} catch (Exception e) {
			log.error("JavaMemoryCacheManager.reset(key:"+key+",initValue:"+initValue+")");
			log.error(Arrays.toString(e.getStackTrace()));
		}

	}
	
	public static void reset(String key){
		reset(key,0);
	}

}
