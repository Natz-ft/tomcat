package com.inspur.data.portal.screen.uc;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.loushang.internet.util.JsonUtils;
import org.loushang.internet.view.ViewHandler;

import com.inspur.portal.widget.IWidgetDomain;
import com.inspur.ucweb.cache.CacheManager;
import com.inspur.ucweb.utils.ConfUtil;
import com.inspur.ucweb.utils.UcServiceUtil;
import com.inspur.utils.UserUtils;


public class Index implements ViewHandler {
	
	//widget service 获取
	IWidgetDomain widgetDomain = UserUtils.getWidgetDomain();
	private static String CACHE_PORTAL_WIDGET_ID_ = "portal_widget_id_";
	private static String CACHE_PORTAL_CONTAINERS_UID_ = "portal_containers_uid_";
	private static String CACHE_PORTAL_SYSRECOMMEND_WIDGETS = "portal_sysrecommend_widgets_";
	
	public void execute(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		HttpSession session = request.getSession();
		if(session.getAttribute("uid") == null){
			response.sendRedirect(ConfUtil.getValue("global.index.odweb"));
			return;
		}
		String uid = String.valueOf(session.getAttribute("uid"));
		
		//缓存
		List userContainers = new ArrayList();
		if(uid != null && !"".equals(uid)){
			userContainers = CacheManager.get(CACHE_PORTAL_CONTAINERS_UID_+uid,List.class);
			if(userContainers == null){
				userContainers = widgetDomain.getContainersByUid(uid);
			} 
		} 
		//缓存取系统推荐widget
		List recommends = CacheManager.get(CACHE_PORTAL_SYSRECOMMEND_WIDGETS,List.class);
		if(recommends==null || recommends.isEmpty()){
			recommends = widgetDomain.getSysRecommendWidgets();
		}
		for(Object ct : userContainers){
			Map uct = (Map) ct;
			String w_ids = (String) uct.get("w_ids");
			uct.put("widgets", getWidgetListByWidgetIds(w_ids));
		}
		request.setAttribute("recommendWidgets", JsonUtils.convertToString(recommends));
		request.setAttribute("userContainers", JsonUtils.convertToString(userContainers));
		
		//每周之星
		String time_id = UserUtils.getUserExtendDomain().getWeeklyStarTimeId();
		request.setAttribute("time_id", time_id);
	}
	
	private List getWidgetListByWidgetIds(String widgetIds){
		String widgetIds2 = "",order = "";
		StringBuffer widgetIdsbuffer = new StringBuffer();
		StringBuffer orderbuffer = new StringBuffer();
		List widgetList = new ArrayList();
		List widgetDomainList = null;
		if(widgetIds!=null && !"".equals(widgetIds)){
			String widgets[] = widgetIds.split(";");
			for(int i=0;i<widgets.length;i++){
				Map widget = CacheManager.get(CACHE_PORTAL_WIDGET_ID_+widgets[i],Map.class);
				if(widget == null){
					widgetIdsbuffer.append(widgets[i]+";");
					//记录顺序
					orderbuffer.append(String.valueOf(i)+",");
				}else{
					widgetList.add(widget);
				}
			}
			if(widgetIdsbuffer.length()>0){
				widgetIds2=widgetIdsbuffer.toString();
				widgetIds2 = widgetIds2.substring(0, widgetIds2.length()-1);
			}
			if(orderbuffer.length()>0){
				order=orderbuffer.toString();
				order = order.substring(0, order.length()-1);
			}
			//全部需要高速服务取数据
			if(widgetList.size()<=0){
				widgetList = widgetDomain.getWidgetsByIds(widgetIds);
			}else{
				//部分在高速服务取数据
				if(!"".equals(widgetIds2) && widgetIds2.length()>0){
					widgetDomainList = widgetDomain.getWidgetsByIds(widgetIds2);
					//根据顺序插入到widgetList
					String orders[] = order.split(",");
					if(widgetDomainList!=null && widgetDomainList.size()>0){
						for(int k=0,len=widgetDomainList.size(); k<len;k++){
							widgetList.add(Integer.parseInt(orders[k]), widgetDomainList.get(k));
						}
					}
					
				}
			}
		}
		return widgetList;
	}
	
	public void doSaveSpace(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		HttpSession session = request.getSession();
		String uid = String.valueOf(session.getAttribute("uid"));
		//缓存
		List userContainers = new ArrayList();
		if(uid != null && !"".equals(uid)){
			userContainers = CacheManager.get(CACHE_PORTAL_CONTAINERS_UID_+uid,List.class);
			if(userContainers == null){
				userContainers = widgetDomain.getContainersByUid(uid);
			} 
		} 
		Map <String,Map>containers = new HashMap<String,Map>();
		for(Object con : userContainers){
			Map c = (Map) con;
			containers.put((String) c.get("ct_id"),c);
		}
		Enumeration names = request.getParameterNames();
		boolean res = true;
		while(names.hasMoreElements()){
			String colData = (String) names.nextElement();
			if(colData.startsWith("colData[")){
				String colValue = request.getParameter(colData);
				String colName = colData.substring(colData.indexOf("[")+1,colData.length()-1);
				if(containers.containsKey(colName)){//update
					res &= widgetDomain.updateContiner(uid,String.valueOf(containers.get(colName).get("id")), colValue);
				} else { //add
					int id = widgetDomain.addContainer(uid, colName, colValue);
					if(id>0){
						res &= true;
					}else{
						res &= false;
					}
				}
			}
		}
		response.getWriter().write(res?"1":"0");
	}

}
