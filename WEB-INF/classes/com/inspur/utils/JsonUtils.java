package com.inspur.utils;

import java.beans.BeanInfo;
import java.beans.Introspector;
import java.beans.PropertyDescriptor;
import java.io.IOException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.commons.beanutils.PropertyUtilsBean;
import org.codehaus.jackson.map.ObjectMapper;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class JsonUtils {

	/**
	 * 把对象转换成Json格式，支持JavaBean、Map、List
	 * @param obj
	 * @return
	 * @throws IOException
	 */
	public static String convertToString(Object obj) throws IOException {
		//通过jackson转换为json值
		ObjectMapper om = new ObjectMapper();
		return om.writeValueAsString(obj);
	}
	
	/**
	 * 把Json字符串读取成对象格式
	 * @param <T>
	 * @param str
	 * @param cla
	 * @return
	 * @throws IOException
	 */
	public static <T> T readToObject(String str, Class<T> cla) throws IOException{
		ObjectMapper om = new ObjectMapper();
		return om.readValue(str, cla);
	}
	/**
	 * 将json格式转换成list对象
	 * @param str
	 * @return
	 * @throws JSONException
	 */
	public static List<Map<String,Object>> getListByJsonString(String str) throws JSONException{
		List<Map<String,Object>> list = new ArrayList<Map<String,Object>>();
		JSONArray jnrule = new JSONArray(str);
		//过滤列
    	int k = jnrule.length();
    	for (int r = 0; r < k;r++) {
    		JSONObject jsonObj = jnrule.getJSONObject(r);
            Iterator<?> it = jsonObj.keys();
            Map<String,Object> item = new HashMap<String,Object>();
            while (it.hasNext()) {  
                String key = (String) it.next();  
                String value = jsonObj.getString(key);
                item.put(key, value);
            }
            list.add(item);
    	}
		return list;
	}
	/**
	 * 对象转map工具类
	 * @param object
	 * @return
	 */
	public static Map<String, Object> objectToMap(Object obj){
		if(obj == null){  
            return null;  
        }          
        Map<String, Object> map = new HashMap<String, Object>();  
        try {  
            BeanInfo beanInfo = Introspector.getBeanInfo(obj.getClass());  
            PropertyDescriptor[] propertyDescriptors = beanInfo.getPropertyDescriptors();  
            for (PropertyDescriptor property : propertyDescriptors) {  
                String key = property.getName();  
  
                // 过滤class属性  
                if (!key.equals("class")) {  
                    // 得到property对应的getter方法  
                    Method getter = property.getReadMethod();  
                    Object value = getter.invoke(obj);  
  
                    map.put(key, value);  
                }  
  
            }  
        } catch (Exception e) {  
            System.out.println("transBean2Map Error " + e);  
        }  
  
        return map;  
	}
}
