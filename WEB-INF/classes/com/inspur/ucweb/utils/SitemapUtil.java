package com.inspur.ucweb.utils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.loushang.internet.util.StringUtils;
import org.loushang.internet.util.el.Function;

public class SitemapUtil {

	public static List<Map> getSitemap(Map ...maps) {
		List<Map> list = new ArrayList<Map>();
		
		int len = maps.length;
		for(int i=0; i<len; i++) {
			list.add(maps[i]);
		}
		
		return list;
	}
	
	public static Map<String,Object> getMap(String label, String url) {
		Map<String,Object> m = new HashMap<String,Object>();
		if(StringUtils.isEmpty(label)) label = "首页";
		if(StringUtils.isEmpty(url)) url = Function.getHome();
		m.put("label", label);
		m.put("url", url);
		return m;
	}
	
}
