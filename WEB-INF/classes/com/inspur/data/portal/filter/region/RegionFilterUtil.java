package com.inspur.data.portal.filter.region;

import org.loushang.internet.util.RequestURIFilter;
import org.loushang.internet.util.StringUtils;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.inspur.data.common.utils.PropertiesUtils;


public class RegionFilterUtil {
	private static ApplicationContext context = null;
	
	public static RequestURIFilter getSecurityExcludes() {
		String excludes = PropertiesUtils.getValue("frame.properties","security.whiteList");
		if(excludes==null || excludes.isEmpty()){
			return null;
		}
		return new RequestURIFilter(excludes);
	}
	
	public static Object getBean(String beanId) {
		if(StringUtils.isEmpty(beanId)) return null;
		if(context == null) {
			context = new ClassPathXmlApplicationContext("conf/regionfilter.xml");
		}
		return context.getBean(beanId);
	}
}
