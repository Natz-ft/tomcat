package com.inspur.data.portal.screen.map;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.jboss.netty.util.internal.ConcurrentHashMap;
import org.loushang.internet.util.JsonUtils;
import org.loushang.internet.view.ViewHandler;

import com.inspur.data.catalog.domain.catalog.Catalog;
import com.inspur.data.catalog.domain.catalog.CatalogMeta;
import com.inspur.data.catalog.domain.catalog.OpenCatalog;
import com.inspur.data.common.utils.MapUtils;
import com.inspur.data.common.web.PaginationList;
import com.inspur.data.common.web.ParamUtil;
import com.inspur.dataview.dao.statistics.base.RegionForMapInfo;
import com.inspur.utils.AuditLogUtil;
import com.inspur.utils.ConfUtil;
import com.inspur.utils.DataUtils;



public class Index implements ViewHandler {
	private static final int MAP_LEVEL_DETAIL = 12; // 展示详细的级别
	private static final int MAP_LEVEL_DISTRICT = 10; // 区县界别
	private static final int MAP_LEVEL_CITY = 8; // 市级别 ,小于该值规定为省级
	private static Log log = LogFactory.getLog(Index.class);
	

	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// 行政区划编码,获取地市编码用的是getSession()；
		String regionCode = (String) request.getSession().getAttribute("area_code");
		try {
			// 获取包含地理信息数据目录信息的目录分组
			Map<String, Object> paramMap = new HashMap<String, Object>();
			paramMap.put("parent_id", "0");
			//只显示主题分组
			paramMap.put("group_type", "10");
			paramMap.put("region_code", regionCode);
			// 查询所有地图目录的主题
			List<Map<String, Object>> list = DataUtils.getCataLogGroupService().getGroupListForMappage(paramMap);
			request.setAttribute("reslist", list);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			//记录页面访问日志
			AuditLogUtil.addPageVisitAutiLog(request, "地图服务", "");
		}

	}
	
	private static ConcurrentHashMap <String,RegionForMapInfo> cache=new ConcurrentHashMap <String,RegionForMapInfo>();
	
	/*
	 * 根据regionCode查询带有坐标的行政区划信息，，调用本地dataanaly服务
	 */
	private RegionForMapInfo getRegionForMapInfo(String regionCode){
		if(StringUtils.isNotEmpty(regionCode)){
			RegionForMapInfo region = cache.get(regionCode);
			if(region == null){
				try {
					region = DataUtils.getRegionForMapInfoService().getRegionInfo(regionCode, null);
					if(region != null){
						cache.putIfAbsent(regionCode, region);
					}
				} catch (Exception e) {
					log.error(e);
				} 
			}
			return region;
		}
		return null;
	}
	
	
	 //根据cata_id查询打点数据是新数据还是历史数据
		public void doGetMapDataType(HttpServletRequest request, HttpServletResponse response)
				throws ServletException, IOException {	
			try {
				String cata_id = ParamUtil.getString(request, "cata_id", ""); // 数据目录ID
			    String conf_type = ParamUtil.getString(request, "conf_type", "2"); // 目录类型
			    String dataType="old";
			    String map_config_showtype = "1";
			    if(cata_id!=null){
		        	CatalogMeta catalogMeta = DataUtils.getCatalogMetaServiceNew().getCatalogMeta(cata_id, conf_type);
					Catalog catalog = DataUtils.getCatalogServiceNew().getCatalogById(cata_id);
					if (catalog!=null && catalogMeta != null) {
						String table_name_en = catalogMeta.getTable_name_en();
						String database_id = catalogMeta.getDatabase_id();
						String sql = "";
						//获取目录列配置
						Map<String,Object> mapConf =DataUtils.getCatalogColumnService().getMapColumnInfoById(cata_id, conf_type);
						//判断地图动态配置是否为空，若为空，使用原始打点方法
						if(mapConf!=null){	
							map_config_showtype = mapConf.get("map_config_showtype")==null?"1":mapConf.get("map_config_showtype").toString();
						    if(!"".equals(map_config_showtype)&&Integer.parseInt(map_config_showtype) == 2){
						    		dataType="new";
						     }
						}	
						response.getWriter().write(JsonUtils.convertToString(dataType));	
					}
			    }
			}catch (Exception e) {
				log.error(e, e);
			}
		}

	//根据级别和地图边界获取不同数据，在地图上打点 
	public void doGetCatalog(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
			 String cata_id = ParamUtil.getString(request, "cata_id", ""); // 数据目录ID
			 String conf_type = ParamUtil.getString(request, "conf_type", "2"); // 目录类型
		     String showLevel = ParamUtil.getString(request, "showLevel", ""); // 显示级别  	    
		     String longiLeft = ParamUtil.getString(request, "longiLeft", ""); // 边界坐标经度
		     String longiRight = ParamUtil.getString(request, "longiRight", ""); // 边界坐标经度
		     String latiLeft = ParamUtil.getString(request, "latiLeft", ""); // 边界坐标纬度
		     String latiRight = ParamUtil.getString(request, "latiRight", ""); // 边界坐标纬度
		     String where = ParamUtil.getString(request, "where", "");//如果不为空，以“where ”开头
		     if(StringUtils.isNotEmpty(where)){
		    	 where = where.replaceFirst("where ", " AND ");
		     }	
		     // 边界左下点经度
	         double pLongiLeft = Double.parseDouble(longiLeft);
	         // 边界左下点纬度
	         double pLatiLeft = Double.parseDouble(latiLeft);
	         // 边界右上点经度
	         double pLongiRight = Double.parseDouble(longiRight);
	         // 边界右上点纬度
	         double pLatiRight = Double.parseDouble(latiRight);
	         int reqLevel = Integer.parseInt(showLevel);
		     //地图展示默认设置
	         String map_config_showtype = "1";
	         String longitude = "longitude";
	         String latitude = "latitude";
	         String  inspur_region_code="inspur_region_code" ;
	         String queryColumns="";
	     	boolean isQueryClusterData = false;
	         List<Map<String, Object>> list = new ArrayList<Map<String,Object>>();
	       //暂存行政区划信息
	 		Map<String,Object> regionTempMap = new HashMap<String, Object>();
	 		try {
		     if(cata_id!=null){
		    	 List<Map<String,Object>> showColumns = new ArrayList<Map<String,Object>>();
		    	 CatalogMeta catalogMeta = DataUtils.getCatalogMetaServiceNew().getCatalogMeta(cata_id, conf_type);
				 Catalog catalog = DataUtils.getCatalogServiceNew().getCatalogById(cata_id);
				 if (catalog!=null && catalogMeta != null) {
					 String table_name_en = catalogMeta.getTable_name_en();
					 String database_id = catalogMeta.getDatabase_id();
					 String sql = "";
				     //获取目录列配置
					 Map<String,Object> mapConf =DataUtils.getCatalogColumnService().getMapColumnInfoById(cata_id, conf_type);
					 Map<String,Object> showcolumns=new HashMap<String,Object> (); 
					 if(mapConf!=null&&MapUtils.isNotEmpty(mapConf)){
						 //获取地图配置类型， 1：数据直接展现; 2：通过地图级别分层展现
						 map_config_showtype = mapConf.get("map_config_showtype")==null?"1":mapConf.get("map_config_showtype").toString();
						 //获取坐标列
						 longitude= mapConf.get("conf_longitude")==null?"longitude":mapConf.get("conf_longitude").toString();
				         latitude= mapConf.get("conf_latitude")==null?"latitude":mapConf.get("conf_latitude").toString();			           
				         //获取地区代码
				         inspur_region_code =mapConf.get("conf_regioncode")==null?"inspur_region_code":mapConf.get("inspur_region_code").toString();
				         //获取显示列			           	   
					     if(mapConf.get("conf_showcolumns")!=null){
					    	 //地图展示栏信息
					         showcolumns=(Map<String, Object>) mapConf.get("conf_showcolumns");   
					      }else{
					          //动态配置里若没有展现项，添加默认展现项
					          Map<String,Object> longMap = new HashMap<String, Object>();
					          longMap.put("name_en", longitude);
					          longMap.put("name_cn", "经度");
				           		Map<String,Object> latMap = new HashMap<String, Object>();
				           		latMap.put("name_en", latitude);
				           		latMap.put("name_cn", "纬度");
				           		showColumns.add(longMap);
				           		showColumns.add(latMap);
						  	}
					      StringBuilder sb = new StringBuilder(); 
					      for(String key : showcolumns.keySet()) {
					        	
					            if(showcolumns.get(key)!=null && !longitude.equals(showcolumns.get(key)) && !latitude.equals(showcolumns.get(key))){
					            	Map<String,Object> temp = new HashMap<String, Object>();
				           			temp.put("name_en", showcolumns.get(key).toString());
				           			temp.put("name_cn", key);
				           			showColumns.add(temp);
					               String tempStr=","+"t."+showcolumns.get(key)+" AS "+key;
						           sb.append(tempStr);
					            }
					        }  
					        queryColumns="t."+longitude +" AS longitude,"+"t."+latitude+" AS latitude"+sb.toString();				              
						}else{
							queryColumns = " * ";		
						}
						 if(map_config_showtype.equals("2")){
			            	
			        		if(reqLevel >= MAP_LEVEL_DETAIL){
			        			String temp = ParamUtil.getString(request, "temp", ""); // 循环分页获取点断点标志
				        		int breakpoint = Integer.parseInt(temp);
				        		sql = "SELECT "+queryColumns+" FROM "+ table_name_en+" t" +" WHERE "+"t."+longitude +"> "+
				            				+ pLongiLeft + " AND "+"t."+ longitude+" < " + pLongiRight
				            				+ " AND "+"t."+latitude+">"
				            				+ pLatiLeft + " AND "+ "t."+latitude +" < " + pLatiRight 
				            				+ where
				            				+" LIMIT "+ breakpoint+",1000"       				
				            				+ ";";				
			            		isQueryClusterData = false;
			            	}else if(reqLevel >= MAP_LEVEL_DISTRICT && reqLevel < MAP_LEVEL_DETAIL){
			            			// 获取区县统计数据
				            		sql = "SELECT SUBSTRING"+"(t."+inspur_region_code+",1,6) AS inspur_region_code, COUNT(1) AS inspur_total_number FROM "+ table_name_en 
				            				+" t WHERE "+"t."+longitude +" > "
				            				+ pLongiLeft + " AND "+"t."+longitude +"< " + pLongiRight
				            				+ " AND "+"t."+latitude+" >"
				            				+ pLatiLeft + " AND "+"t."+latitude +"< " + pLatiRight
				            				+ where
				            				+ " GROUP BY SUBSTRING(t."+inspur_region_code+",1,6);";
				            		isQueryClusterData = true;
			            	}else if(reqLevel >= MAP_LEVEL_CITY && reqLevel < MAP_LEVEL_DISTRICT) {
			            		// 获取市统计数据
			            			sql = "SELECT SUBSTRING"+"(t."+inspur_region_code+",1,4) AS inspur_region_code, COUNT(1) AS inspur_total_number FROM "+ table_name_en 
				            				+" t WHERE "+"t."+longitude +" > "
				            				+ pLongiLeft + " AND "+"t."+longitude +"< " + pLongiRight
				            				+ " AND "+"t."+latitude+" >"
				            				+ pLatiLeft + " AND "+"t."+latitude +"< " + pLatiRight
				            				+ where
				            				+ " GROUP BY SUBSTRING(t."+inspur_region_code+",1,4);";
				            		isQueryClusterData = true;
			            		
			            	} else {
			            		// 获取省统计数据
			            			sql = "SELECT SUBSTRING"+"(t."+inspur_region_code+",1,2) AS inspur_region_code, COUNT(1) AS inspur_total_number FROM "+ table_name_en 
				            				+" t WHERE "+"t."+longitude +" > "
				            				+ pLongiLeft + " AND "+"t."+longitude +"< " + pLongiRight
				            				+ " AND "+"t."+latitude+" >"
				            				+ pLatiLeft + " AND "+"t."+latitude +"< " + pLatiRight
				            				+ where
				            				+ " GROUP BY SUBSTRING(t."+inspur_region_code+",1,2);";
				            		isQueryClusterData = true;
			            	}		        		
			        	
					}else{
			        		String temp = ParamUtil.getString(request, "temp", ""); // 循环分页获取点断点标志
			        		int breakpoint = Integer.parseInt(temp);
			        		sql = "SELECT "+queryColumns+" FROM "+ table_name_en+" t" +" WHERE "+"t."+longitude +"> "+
			            				+ pLongiLeft + " AND "+"t."+ longitude+" < " + pLongiRight
			            				+ " AND "+"t."+latitude+">"
			            				+ pLatiLeft + " AND "+ "t."+latitude +" < " + pLatiRight 
			            				+ where
			            				+" LIMIT "+ breakpoint+",1000"       				
			            				+ ";";				
			        		isQueryClusterData = false;
			        	}
						//查询数据
						List<Map<String, Object>> templist = DataUtils.getDataTableService().queryListBySql(sql, 1, database_id);
			        	if(isQueryClusterData == false){
			        		Map<String,Object> cataMap = new HashMap<String, Object>();
							String cata_logo = catalog.getCata_logo();
							if(StringUtils.isNotBlank(cata_logo)){
								String rc_url = ConfUtil.getConfValue("global.index.rcservice")+"/doc?doc_id=";
								cata_logo = rc_url+cata_logo;
							}
							
							for (Map<String, Object> map : templist) {
								List<Map<String,Object>> showInfoList = new ArrayList<Map<String,Object>>();
								for(Map<String,Object> tempmap: showColumns){
									Map<String,Object> showInfoMap = new HashMap<String, Object>();
									String name_cn = tempmap.get("name_cn")==null?"":tempmap.get("name_cn").toString();
									showInfoMap.put("name_cn", name_cn);
									if(StringUtils.isNotBlank(name_cn)){
										showInfoMap.put("value", map.get(name_cn));
									}else{
										showInfoMap.put("value", "暂无");
									}
									showInfoList.add(showInfoMap);								
								}
								map.put("showInfoList", showInfoList);
							}
							cataMap.put("cata_logo", cata_logo);
							cataMap.put("dataList", templist);
							list.add(cataMap);
						}else{
			        		//对于地图聚合统计数据按inspur_region_code补充坐标信息
			        		if(templist != null){
			            		for(Map<String, Object> map : templist) {
									if(map!=null && map.get("inspur_region_code")!=null &&StringUtils.isNotEmpty(map.get("inspur_region_code").toString())){
										String region_code =map.get("inspur_region_code")==null?"":map.get("inspur_region_code").toString();
										if (StringUtils.isNotEmpty(region_code)) {
											RegionForMapInfo regionMapInfo = getRegionForMapInfo(region_code);
											if(regionMapInfo!=null){
												if(regionTempMap.get(region_code)!=null){
													//暂存行政区划统计信息
													Map<String, Object> tempRegion = (Map<String, Object>) regionTempMap.get(region_code);
													List<Map<String, Object>> infoList = (List<Map<String, Object>>) tempRegion.get("infoList");
													Map<String,Object> regionCount = new HashMap<String, Object>();
													regionCount.put("cata_title", catalog.getCata_title());
													regionCount.put("inspur_total_number", map.get("inspur_total_number"));
													regionTempMap.put("infoList", infoList);
												}else{
													//暂存行政区划统计信息
													Map<String, Object> tempRegion = new HashMap<String,Object>();
													tempRegion.put("region_code",regionMapInfo.getRegion_code());
													tempRegion.put("region_name",regionMapInfo.getRegion_name());
													tempRegion.put("longitude",regionMapInfo.getLongitude());
													tempRegion.put("latitude",regionMapInfo.getLatitude());
													List<Map<String, Object>> infoList = new ArrayList<Map<String,Object>>();
													Map<String,Object> regionCount = new HashMap<String, Object>();
													regionCount.put("cata_title", catalog.getCata_title());
													regionCount.put("inspur_total_number", map.get("inspur_total_number"));
													infoList.add(regionCount);
													tempRegion.put("inspur_InfoList", infoList);
													regionTempMap.put(region_code, tempRegion);
												}
											}
											
										}
										
									}
								}
									
							}
						}
			         }
			     }
				     
		 	//取出临时Map中的地市统计数据，转化成List返回
				if(isQueryClusterData){
					if(regionTempMap!=null){
						for (String key : regionTempMap.keySet()) {
							Map<String, Object> regionMap = (Map<String, Object>) regionTempMap.get(key);
							list.add(regionMap);
						}
					}
				}
			}catch (Exception e) {
				 log.error(e, e);
		} 
		response.getWriter().write(JsonUtils.convertToString(list));
	}
	
	//获取需要打点的总个数
		public void doGetMapPointNum(HttpServletRequest request, HttpServletResponse response)
				throws ServletException, IOException {
			try{
				 String cata_id = ParamUtil.getString(request, "cata_id", ""); // 数据目录ID
				 String conf_type = ParamUtil.getString(request, "conf_type", "2"); // 目录类型
				    
			        String longiLeft = ParamUtil.getString(request, "longiLeft", ""); // 边界坐标经度
			        String longiRight = ParamUtil.getString(request, "longiRight", ""); // 边界坐标经度
			        String latiLeft = ParamUtil.getString(request, "latiLeft", ""); // 边界坐标纬度
			        String latiRight = ParamUtil.getString(request, "latiRight", ""); // 边界坐标纬度
			        String where = ParamUtil.getString(request, "where", "");//如果不为空，以“where ”开头
			        if(StringUtils.isNotEmpty(where)){
			        	where = where.replaceFirst("where ", " AND ");
			        }
			        CatalogMeta catalogMeta = DataUtils.getCatalogMetaServiceNew()
							.getCatalogMeta(cata_id, conf_type);
					Catalog catalog = DataUtils.getCatalogServiceNew().getCatalogById(cata_id);
					if (catalog!=null && catalogMeta != null) {
			
						String table_name_en = catalogMeta.getTable_name_en();
						String database_id = catalogMeta.getDatabase_id();
						String sql = "";
						//获取目录列配置
						Map<String,Object> mapConf =DataUtils.getCatalogColumnService().getMapColumnInfoById(cata_id, conf_type);						
						String longitude = "longitude";
						String latitude = "latitude";
						if(mapConf!=null){ 
							//获取坐标列
							longitude= mapConf.get("conf_longitude")==null?"longitude":mapConf.get("conf_longitude").toString();
				           	latitude= mapConf.get("conf_latitude")==null?"latitude":mapConf.get("conf_latitude").toString();
						}

		         	 // 边界左下点经度
		             double pLongiLeft = Double.parseDouble(longiLeft);
		             // 边界左下点纬度
		             double pLatiLeft = Double.parseDouble(latiLeft);
		             // 边界右上点经度
		             double pLongiRight = Double.parseDouble(longiRight);
		             // 边界右上点纬度
		             double pLatiRight = Double.parseDouble(latiRight);
		                      	
		         	
		             sql = "SELECT  COUNT(1) AS inspur_total_number FROM "+ table_name_en 
		      				+" WHERE "+ longitude+" > "
		      				+ pLongiLeft + " AND "+ longitude +" < " + pLongiRight
		      				+ " AND "+latitude+">"
		      				+ pLatiLeft + " AND "+ latitude+" < " + pLatiRight
		      				+ where
		      				+ ";";
		         		List<Map<String, Object>> pointList = DataUtils.getDataTableService().queryListBySql(sql, 1, database_id);       	
		         		response.getWriter().write(JsonUtils.convertToString(pointList));
	        
		}
				
			}catch (Exception e) {
				log.error(e, e);
			} 
		}
		

	/**
	 * 获取地图类型的数据目录
	 * 
	 * @Title: doSearchCatalog
	 * @author haowenxiang@inspur.com
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 * @see void
	 * @throws ServletException
	 *             IOException
	 */
	public void doSearchCatalog(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// 主题分类
		String subjectId = ParamUtil.getString(request, "subjectId", "");
		// 行政区划编码
		String regionCode = (String) request.getSession().getAttribute("area_code");
		String title = ParamUtil.getString(request, "title", "");
		// 获取当前页
		int page = ParamUtil.getInteger(request, "page", 1);
		int pageSize = ParamUtil.getInteger(request, "pageSize", 10);
		//获取目录类型
		String cata_type = ParamUtil.getString(request, "cata_type");
		try {
			 //开放状态
			 String status = "4";
			 //排序方式
			 String _order = "c.update_time desc";
			 HashMap<String, Object> extentParams = new HashMap<String, Object>();
			// 目录上线状态
			extentParams.put("config_status", "4");
			// 政务数据目录
			extentParams.put("cata_type", cata_type);
			// 开放目录
			extentParams.put("conf_type", "2");
			// 关键字
			extentParams.put("cata_title", title);
			// 地图类型
			extentParams.put("conf_use_type", "4");
			PaginationList<OpenCatalog> result = DataUtils.getOpenCatalogService().queryOpenCataLogByPage(title, null, regionCode, null, subjectId, null, status, _order, extentParams, page, pageSize);
			
			if(result!=null && result.getRecords()!=null && result.getRecords().size()>0){
				List<OpenCatalog> cataList = result.getRecords();
				for (OpenCatalog temp : cataList) {
					String logo = temp.getCata_logo();
					// 图标展示地址
					String logoUrl = "";
					if (StringUtils.isNotEmpty(logo)) {
						logoUrl = ConfUtil.getConfValue("global.index.rcservice") + "/doc?doc_id=" + logo;
					}
					temp.setCata_logo(logoUrl);
				}
			}
			response.getWriter().write(JsonUtils.convertToString(result));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
