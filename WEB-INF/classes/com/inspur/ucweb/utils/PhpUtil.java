package com.inspur.ucweb.utils;

import java.security.GeneralSecurityException;
import java.security.MessageDigest;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.phprpc.util.Cast;
import org.phprpc.util.PHPSerializer;


/**
 * php语言相关特性转换的util
 * @author Gaoht
 *
 */
public class PhpUtil{
	private static PHPSerializer serializer = new PHPSerializer();
	/**
	 * 序列化php对象
	 * @return Object 对象结果
	 */
	public static String serialize(Object obj){
		try {
			byte[] b = serializer.serialize(obj);
			return new String(b, "utf-8");
		} catch (Exception e) {
			return "";
		}
	}
	/**
	 * 反序列化
	 * @param str 序列化后的字符串
	 * @return
	 */
	public static Object unserialize(String str){
		try {
			return serializer.unserialize(str.getBytes("utf-8"));
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	/**
	 * 反序列化
	 * @param <T>
	 * @param str 序列化后的字符串
	 * @param cls java类型
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public static <T> T unserialize(String str, Class<T> cls){
		try {
			return (T)serializer.unserialize(str.getBytes("utf-8"), cls);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	/**
	 * 反序列化
	 * @param <T>
	 * @param str 序列化后的字符串
	 * @param cls java类型
	 * @param tostring 是否默认转为string
	 * @return
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public static <T> T unserialize(String str, Class<T> cls, boolean tostring){
		try {
			T obj = (T)serializer.unserialize(str.getBytes("utf-8"), cls);
			if(tostring){
				if(obj instanceof Map){
					Map m = (Map)obj;
					Iterator<Map.Entry> it = m.entrySet().iterator();
					Map.Entry entry;
					while(it.hasNext()){
						entry = it.next();
						m.put(entry.getKey(), cast(entry.getValue(), String.class));
					}
				}else if(obj instanceof List){
					List l = (List)obj;
					for(int i=0; i<l.size(); i++){
						l.set(i, cast(l.get(i), String.class)); 
					}
				}
			}
			return obj;
		} catch (Exception e) {
			return null;
		}
	}
	/**
	 * 将反序列化的对象强制转换为需要的对象
	 * @param <T> 需要的对象类型
	 * @param obj
	 * @param cls
	 * @return 
	 */
	@SuppressWarnings("unchecked")
	public static <T> T cast(Object obj, Class<T> cls){
		return (T)Cast.cast(obj, cls);
	}
	/**
	 * 将list<map>转为key value对的Map
	 * @param data
	 * @param key
	 * @return
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public static Map<String, List> getSubBeKeyArray(List<Map> data, String key){
		if(data==null || key==null ||"".equals(key))
			return null;
		Map<String, List> ret = new HashMap<String, List>();
		String[] keys = key.split(",");
		for(int i=0; i<data.size(); i++){
			for(int j=0; j<keys.length; j++){
				String tkey = keys[j].trim();
				List values = ret.get(tkey);
				if(values == null)
					values = new ArrayList<Object>();
				values.add(data.get(i).get(tkey));
				ret.put(tkey, values);
			}
		}
		return ret;
	} 
	/**
	 * 将list<map>转为key value对的Map
	 * @param data
	 * @param key
	 * @return
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public static List getSubByKey(List<Map> data, String key){
		if(data==null || key==null ||"".equals(key))
			return null;
		List ret = new ArrayList();
		key = key.trim();
		for(int i=0; i<data.size(); i++){
			Map values = data.get(i);
			ret.add(values.get(key));
		}
		return ret;
	}
	/**
	 * 将当前毫秒数转为php的11位字串
	 * @return
	 */
	public static String time(){
		long time = System.currentTimeMillis();
		String t = String.valueOf(time);
		return t.substring(0, 10);
	}
	/**
	 * 去掉相同的元素
	 * @param data
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public static List removeSame(List data){
		Set set = new HashSet();
		set.addAll(data);
		List res = new ArrayList();
		res.addAll(set);
		return res;
	}
	/**
	 * md5
	 * @return
	 */
	public static String md5(String plainText){
		if(plainText == null)
			plainText = "";
		byte[] temp = plainText.getBytes();
		MessageDigest md;
		// 返回结果
		StringBuffer buffer = new StringBuffer();
		try {
			// 进行MD5散列
			md = MessageDigest.getInstance("md5");
			md.update(temp);
			temp = md.digest();
			// 将散列的结果转换为Hex字符串
			int i = 0;
			for (int offset = 0; offset < temp.length; offset++) {
				i = temp[offset];
				if (i < 0)
					i += 256;
				if (i < 16)
					buffer.append("0");
				buffer.append(Integer.toHexString(i));
			}
		} catch (GeneralSecurityException e) {
			e.printStackTrace();
		}
		// 返回
		return buffer.toString();
	}
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public static Map CastByteToString(Map m){
		Iterator<Map.Entry> it=m.entrySet().iterator();
		Map.Entry entry;
		while(it.hasNext()){
			entry=it.next();
			if(entry.getValue() instanceof byte[]){
				m.put(entry.getKey(), PhpUtil.cast(entry.getValue(),String.class));
			}
		}
		return m;
	}
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public static List CastByteToString(List ll){
		List c = new ArrayList();
		for(Object l : ll){
			if(l instanceof byte[]){
				c.add(PhpUtil.cast(l,String.class));
			}else{
				c.add(l);
			}
		}
		return c;
	}
	public static String formatDateBySeconds(String seconds,String formatStr) {
		if(formatStr == null || formatStr.isEmpty()) formatStr = "yyyy-MM-dd HH:mm:ss";
		SimpleDateFormat dateFormatter = new SimpleDateFormat(formatStr);
		return dateFormatter.format(new Date(Long.valueOf(seconds+"000")));
	}
	public static String subStringByInterval(String strs,String interval,int num) {
		if(strs == null || strs.isEmpty()) return "";
		String[] subList = strs.split(interval);
		if(num > subList.length){
			return "";
		}
		return subList[num-1];
	}
}