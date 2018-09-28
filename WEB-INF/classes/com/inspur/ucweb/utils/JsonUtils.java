package com.inspur.ucweb.utils;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.codehaus.jackson.map.ObjectMapper;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;


public class JsonUtils {
	
	private static final Log log = LogFactory.getLog(JsonUtils.class);

	/**
	 * 把对象转换成Json格式，支持JavaBean、Map、List
	 * 
	 * @param obj
	 * @return
	 * @throws IOException
	 */
	public static String convertToString(Object obj) throws IOException {

		if (obj == null)
			return null;

		// 通过jackson转换为json值
		ObjectMapper om = new ObjectMapper();
		return om.writeValueAsString(obj);
	}

	/**
	 * 把Json字符串读取成对象格式
	 * 
	 * @param <T>
	 * @param str
	 * @param cla
	 * @return
	 * @throws IOException
	 */
	public static <T> T readToObject(String str, Class<T> cla) throws IOException {

		if (str == null)
			return null;

		ObjectMapper om = new ObjectMapper();
		return om.readValue(str, cla);
	}

	public static List<Map<String, Object>> getListByJsonString(String str) {
		List list = new ArrayList();
		
		try {
			JSONArray jnrule = new JSONArray(str);
			int k = jnrule.length();
			for (int r = 0; r < k; r++) {
				JSONObject jsonObj = jnrule.getJSONObject(r);
				Iterator it = jsonObj.keys();
				Map item = new HashMap();
				while (it.hasNext()) {
					String key = (String) it.next();
					String value = jsonObj.getString(key);
					item.put(key, value);
				}
				list.add(item);
			}
		} catch (JSONException e) {
			
			log.error(e, e);
			throw new RuntimeException(e);
		}

		
		return list;
	}
}
