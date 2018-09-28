package com.inspur.ucweb.utils;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import org.apache.log4j.Logger;
import org.loushang.internet.util.StringUtils;


public class PageUtil {
	
	private static Logger log = Logger.getLogger(PageUtil.class);

	/**
	 * 封装查询操作
	 * @param bizDomain
	 * @param methodName
	 * @param fields
	 * @param request
	 * @return
	 */
	public static List<Map> query(Object bizDomain,String methodName,String[] fields,HttpServletRequest request){
		try {
			Map condition = getQueryCondition(fields, request);
			String orderBy = getOrderBy(request);
			int showPage = getShowPage(request);
			int pageSize = getpageSize(request);
			Method method = bizDomain.getClass().getMethod(methodName, Map.class,String.class,int.class,int.class);
			Map res = (Map)method.invoke(bizDomain,condition,orderBy,showPage,pageSize);
			return processQueryResult(res, request);
		} catch (IllegalArgumentException e) {
			log.error("", e);
		} catch (IllegalAccessException e) {
			log.error("", e);
		} catch (InvocationTargetException e) {
			log.error("", e);
		} catch (SecurityException e) {
			log.error("", e);
		} catch (NoSuchMethodException e) {
			log.error("", e);
		}
		return null;
	}
	/**
	 * 取得查询条件
	 * @param fields
	 * @param request
	 * @return
	 */
	public static Map getQueryCondition(String fields [],HttpServletRequest request){
		Map<String, Object> condition = new HashMap<String, Object>();
		for (int i = 0; i < fields.length; i++) {
			String field_name = fields[i];
			String field_value = request.getParameter(field_name);
			if (StringUtils.isNotEmpty(field_value)) {
				condition.put(field_name, field_value);
				request.setAttribute(field_name, field_value);
			}
		}
		return condition;
	}
	/**
	 * 取得 order by
	 * @param request
	 * @return
	 */
	public static String getOrderBy(HttpServletRequest request){
		String sort_field = request.getParameter("sort_field");
		String sort_type = request.getParameter("sort_type");
		String orderBy = null;
		if(!StringUtils.isEmpty(sort_type) && !StringUtils.isEmpty(sort_field)){
			orderBy = sort_field+" "+sort_type;
			request.setAttribute("sort_type", sort_type);
			request.setAttribute("sort_field", sort_field);
		}
		return orderBy;
	}
	/**
	 * 取得 showpage
	 * @param request
	 * @return
	 */
	public static int getShowPage(HttpServletRequest request){
		int showpage = 1;
		String pageStr = request.getParameter("index");
		if (pageStr != null && !pageStr.isEmpty()) {
			showpage = Integer.parseInt(pageStr);
		}
		request.setAttribute("index", showpage);
		return showpage;
	}
	/**
	 * 取得 pagesize
	 * @param request
	 * @return
	 */
	public static int getpageSize(HttpServletRequest request){
		String pageSize = request.getParameter("pagesize");
		if (StringUtils.isEmpty(pageSize)) {
			pageSize = "10";
		}
		request.setAttribute("pagesize", pageSize);
		return Integer.parseInt(pageSize);
	}
	/**
	 * 处理查询结果
	 * @param resMap
	 * @param request
	 * @return
	 */
	public static List<Map> processQueryResult(Map resMap,HttpServletRequest request){
		int count = 0;
		int totalPages = 0;
		List<Map> dataList = null;
		if(resMap != null){
			if(resMap.get("count") != null){
				count = (Integer) resMap.get("count");
				totalPages = (Integer)resMap.get("totalPages");
			}
			dataList = (List<Map>) resMap.get("data");
		}
		request.setAttribute("count", count);
		request.setAttribute("totalPage", totalPages);
		request.setAttribute("dataList", dataList);
		return dataList;
	}
}
