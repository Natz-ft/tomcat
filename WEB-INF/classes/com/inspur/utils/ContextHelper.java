package com.inspur.utils;

import java.io.IOException;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import java.util.Set;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class ContextHelper {

	private static class OurContext extends ThreadLocal<Map> {
		protected Map initialValue() {
			return new HashMap();
		}
	}

	public static final String KEY_REQUEST = "_request_";
	public static final String KEY_RESPONSE = "_response_";
	public static final String KEY_SERVLET_CONTEXT = "_servletcontext_";
	public static final String KEY_REQUESTURI = "_requesturi_";

	private static OurContext context = new OurContext();
	
	/**
	 * 获取上下文的所有变量名称
	 * 
	 * @return
	 */
	public static Set keys() {
		return context.get().keySet();
	}

	/**
	 * 获取某个上下文参数
	 * 
	 * @param key
	 * @return
	 */
	public static Object get(Object key) {
		return context.get().get(key);
	}

	/**
	 * 设置某个上下文参数
	 * 
	 * @param key
	 *            参数名
	 * @param value
	 *            参数值
	 */
	public static void put(Object key, Object value) {
		context.get().put(key, value);
	}

	/**
	 * 清空上下文
	 */
	public static void clear() {
		context.remove();
	}

	/**
	 * 获取当前请求对象
	 * 
	 * @return
	 */
	public static HttpServletRequest getRequest() {
		return (HttpServletRequest) get(KEY_REQUEST);
	}

	/**
	 * 获取当前的Locale
	 * 
	 * @return
	 */
	public static Locale getLocale() {
		if (getRequest() != null)
			return getRequest().getLocale();
		return Locale.getDefault();
	}

	/**
	 * 获取当前响应对象
	 * 
	 * @return
	 */
	public static HttpServletResponse getResponse() {
		return (HttpServletResponse) get(KEY_RESPONSE);
	}

	/**
	 * 获取应用上下文
	 * 
	 * @return
	 */
	public static ServletContext getServletContext() {
		return (ServletContext) get(KEY_SERVLET_CONTEXT);
	}

	/**
	 * 获取用户请求的URL
	 * 
	 * @return
	 */
	public static String getRequestURI() {
		return (String) get(KEY_REQUESTURI);
	}
	

	/**
	 * 初始化上下文
	 * 
	 * @param request
	 *            请求对象
	 * @param response
	 *            响应对象
	 * @param sc
	 */
	public static void init(HttpServletRequest request,
			HttpServletResponse response, ServletContext sc) {
		put(KEY_REQUEST, request);
		put(KEY_RESPONSE, response);
		put(KEY_SERVLET_CONTEXT, sc);
		
		put(KEY_REQUESTURI, request.getRequestURI());
		
	}
	
	
	/**
	 * 获取所有上下文参数的集合
	 * 
	 * @param name
	 *            上下文参数名称
	 */
	public static OurContext getAllContextParameter(){
		return context;
	}
	
	/**
	 * 设置某个上下文参数
	 * 
	 * @param obj
	 *            上下文参数值
	 * @param name
	 *            上下文参数名称
	 */
	public static void setContextParameter(String name,Object obj){
		context.get().put(name,obj);
	}

	/**
	 * 获取某个上下文参数
	 * 
	 * @param name
	 *            上下文参数名称
	 */
	public static Object getContextParameter(String name){
		return context.get().get(name);
	}
	
	/**
	 * 设置客户端url跳转，使用该方法代替response.sendRedirect()方法
	 * 
	 * @param url
	 * @throws IOException
	 */
	public static void sendRedirect(String url) throws IOException {
		getResponse().sendRedirect(url);
	}
	
	/**
	 * 设置服务器端url跳转
	 * @param url
	 * @throws ServletException
	 * @throws IOException
	 */
	public static void forward(String url) throws ServletException, IOException {
		getRequest().getRequestDispatcher(url).forward(getRequest(), getResponse());
	}
}
