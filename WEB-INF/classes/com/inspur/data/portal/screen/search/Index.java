package com.inspur.data.portal.screen.search;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.solr.client.solrj.SolrServerException;
import org.loushang.internet.util.JsonUtils;
import org.loushang.internet.view.ViewHandler;

import com.inspur.data.common.utils.StringUtils;
import com.inspur.data.common.web.PaginationList;
import com.inspur.data.common.web.ParamUtil;
import com.inspur.utils.AuditLogUtil;
import com.inspur.utils.SolrUtil;


public class Index implements ViewHandler {
	
	private final int PageSize = 10;
	
	public void execute(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		try {
			//获取地市编码
//			String regionCode = (String) request.getSession().getAttribute("area_code");
			String searchAllKey = ParamUtil.getString(request, "searchAllKey","");
			String searchAllType = ParamUtil.getString(request, "searchAllType","");
			request.setAttribute("searchAllKey", searchAllKey);
			request.setAttribute("searchAllType", searchAllType);
//			
//			//SystemLogger.info("SerachIndex", "搜索关键字为   "+searchKey);
//			//SystemLogger.info("SerachIndex", "搜索数据类型为   "+searchType);
//			
//			//是否显示api更多信息按钮
//			request.setAttribute("apimore", true);
//			int pageNum = Integer.parseInt(ParamUtil.getString(request, "pageNum","1"));
//
//			//搜索数据
//			Map<String,Object> fqMap = new HashMap<String,Object>();
//			fqMap.put("default_search", "*"+searchKey+"*");
//			fqMap.put("datatype", searchType);
////			fqMap.put("citycode", regionCode);
////			fqMap.put("status", 4);
//			PaginationList<Map> searchCatalogPageList = SolrUtil.getSearchList("data",searchKey, 
//					fqMap, " id DESC ",pageNum, PageSize);
//			
//			
//			if(null != searchCatalogPageList){
//				request.setAttribute("searchCatalogList", searchCatalogPageList.getRecords());
//			}
//			
//			//获取数据集搜索总数
//			fqMap.put("datatype", 1);
//			long catalogCount = SolrUtil.queryCount("data",searchKey,fqMap);
//			request.setAttribute("catalogCount", catalogCount);
//			//获取咨询数量2
//			/*long newsCount = SolrUtil.queryCount("data",searchKey,fqMap);
//			request.setAttribute("newsCount", newsCount);*/
//			long newsCount = 0;
//			
//			//API数量
//			fqMap.put("datatype", 4);
//			long apiCount = SolrUtil.queryCount("data",searchKey,fqMap);
//			request.setAttribute("apiCount", apiCount);
//			
//			//应用数量
//			fqMap.put("datatype", 3);
//			long  appCount = SolrUtil.queryCount("data",searchKey,fqMap);
//			request.setAttribute("appCount", appCount);
//			
//			//获取搜索结果总数
//			long allCount = catalogCount + newsCount + apiCount + appCount;
//			request.setAttribute("allCount", allCount);
//			request.setAttribute("pageCount", allCount);
//			request.setAttribute("searchKey", searchKey);
			
		} catch (Exception e) {
			e.printStackTrace();
		}finally {
			//记录页面访问日志
			AuditLogUtil.addPageVisitAutiLog(request, "搜索", "");
		}
	}
	
	public void doSearchByParam(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException, SolrServerException{
		//获取地市编码
		String regionCode = (String) request.getSession().getAttribute("area_code");
		String searchKey = ParamUtil.getString(request, "searchKey","");
		String searchType = ParamUtil.getString(request, "searchType","");
		String searchAllKey = ParamUtil.getString(request, "searchAllKey","");
		//判断是否是地图搜索
		String type = ParamUtil.getString(request, "type","");
		/*boolean isMap = false;
		if(StringUtils.isNotBlank(type)){
			isMap = true;
		}*/
		int pageNum = Integer.parseInt(ParamUtil.getString(request, "page","1"));
		Map<String,Object> fqMap = new HashMap<String,Object>();
		fqMap.put("default_search", searchAllKey);
		fqMap.put("datatype", searchType);
		//app,api都没有citycode字段，这个已加上就搜不到app跟api了
//		fqMap.put("citycode", regionCode);
		fqMap.put("status", 4);
		if (StringUtils.isEmpty(searchKey)) {
			searchKey = searchAllKey;
		}
		PaginationList<Map> searchCatalogPageList = SolrUtil.getSearchList("data",searchKey, 
				fqMap, "datatype ASC, id DESC ",pageNum, PageSize);
		
		
		//获取数据集搜索总数
		fqMap.put("datatype", 1);
		long catalogCount = SolrUtil.queryCount("data",searchKey,fqMap);
		request.setAttribute("catalogCount", catalogCount);
		//获取咨询数量
		//long newsCount = SolrUtil.queryCount(searchKey, "2",regionCode,isMap);
		//request.setAttribute("newsCount", newsCount);
		long newsCount = 0;
		
		//API数量
		fqMap.put("datatype", 4);
		long apiCount = SolrUtil.queryCount("data",searchKey,fqMap);
		request.setAttribute("apiCount", apiCount);

		//应用数量
		fqMap.put("datatype", 3);
		long  appCount = SolrUtil.queryCount("data",searchKey,fqMap);
		request.setAttribute("appCount", appCount);
		//获取搜索结果总数
		long allCount = catalogCount + newsCount + apiCount + appCount;
		if(null != searchCatalogPageList){
			if("1".equals(searchType)){
				searchCatalogPageList.setTotalRecord((int)catalogCount);
			}else if("2".equals(searchType)){
				searchCatalogPageList.setTotalRecord((int)newsCount);
			}else if("3".equals(searchType)){
				searchCatalogPageList.setTotalRecord((int)appCount);
			}else if("4".equals(searchType)){
				searchCatalogPageList.setTotalRecord((int)apiCount);
			}else{
				searchCatalogPageList.setTotalRecord((int)allCount);
			}
			response.getWriter().write(JsonUtils.convertToString(searchCatalogPageList));
		}
		
	}

}
