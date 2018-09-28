package com.inspur.ucweb.utils;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;

public class UrlUtils {
    public static String urlEncodeUTF8(String s) {
        try {
            return URLEncoder.encode(s, "UTF-8");
        } catch (UnsupportedEncodingException e) {
            throw new UnsupportedOperationException(e);
        }
    }
    public static String urlEncodeUTF8(Map<?,?> map) {
        StringBuilder sb = new StringBuilder();
        for (Map.Entry<?,?> entry : map.entrySet()) {
            if (sb.length() > 0) {
                sb.append("&");
            }
            sb.append(String.format("%s=%s",
                urlEncodeUTF8(entry.getKey().toString()),
                urlEncodeUTF8(entry.getValue().toString())
            ));
        }
        return sb.toString();       
    }
    public static Map getParamMap(HttpServletRequest request){
    	Map map = new HashMap();
    	Enumeration enu=request.getParameterNames();
        while(enu.hasMoreElements()){
            String paraName=(String)enu.nextElement();
            map.put(paraName, request.getParameter(paraName));
        } 
    	return map;
    }
    /**
     * 将参数组装为url字符串
     * @param param
     * @param urlRoot
     * @return
     */
    public static String getUrlString(Map<String, Object> param, String urlRoot) {
    	if(urlRoot == null) 
    		urlRoot = "";
    	if(param == null || param.size() <= 0) return urlRoot;
    	String url = urlRoot;
    	//拼接参数
    	Set<String> keys = param.keySet();
    	StringBuilder params = new StringBuilder();
    	for(String key : keys) {
    		if(params.length() > 0) 
    			params.append("&");
    		Object value = param.get(key);
    		if(value != null) {
    			params.append(key).append("=").append(value);
    		} else {
    			params.append(key).append("=");
    		}
    	}
    	if(url.length() <= 0) return params.toString();
    	if(url.lastIndexOf("?") == -1) {
    		url += "?";
    	} else if(url.lastIndexOf("?") != (url.length() - 1) && url.lastIndexOf("&") != (url.length() - 1)) {
    		url += "&";
    	}
    	url += params;
    	return url;
    }
    public static String getUrlString(Map<String, Object> param) {
    	return UrlUtils.getUrlString(param, null);
    }
    public static void main(String[] args) {
        Map<String,Object> map = new HashMap<String,Object>();
        map.put("p1", 12);
        map.put("p2", "cat");
        map.put("p3", "a & b");         
        System.out.println(urlEncodeUTF8(map));
        // prints "p3=a+%26+b&p2=cat&p1=12"
    }
}