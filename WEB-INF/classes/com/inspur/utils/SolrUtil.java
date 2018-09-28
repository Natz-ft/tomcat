package com.inspur.utils;

import java.net.MalformedURLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.client.solrj.SolrServer;
import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.client.solrj.impl.CommonsHttpSolrServer;
import org.apache.solr.client.solrj.response.QueryResponse;
import org.apache.solr.common.SolrDocument;
import org.apache.solr.common.SolrDocumentList;

import com.inspur.data.common.web.PaginationList;

public class SolrUtil {

	private static String serverUrl;
	private static SolrServer cataServer;// 搜索资源服务

	/**
	 * 获取服务器URL
	 */
	private static void getServerUrl(String searchType) {
		if (StringUtils.isBlank(serverUrl)) {
			// serverUrl =
			// ModuleBindingManager.getCurrentManager().getProperties("searchHost");
			serverUrl = ConfUtil.getConfValue("global.index.search") + searchType;
		}
	}

	/**
	 * 获取搜索引擎
	 * 
	 * @throws MalformedURLException
	 */
	private static void getCataServer(String searchType)
			throws MalformedURLException {
		if (cataServer == null) {
			getServerUrl(searchType);
			cataServer = new CommonsHttpSolrServer(serverUrl);
		}
	}

	/**
	 * 分页搜索 <br>
	 * <p>
	 * Description: <br>
	 * zhanghuayun@outlook.com<br>
	 * <p>
	 * Date: 2014年10月10日 上午9:25:16<br/>
	 * <p>
	 * 
	 * @param keyWord
	 *            关键字
	 * @param dataType
	 *            数据类型
	 * @param start
	 *            第几页
	 * @param rowCount
	 *            每页数量
	 * @param cityCode
	 *            城市ID
	 * @return 搜索结果分页
	 * @throws SolrServerException
	 * @see PaginationList<SearchCatalog>
	 */

	public static PaginationList<Map> getSearchList(String searchType,
			String searchKey, Map<String, Object> fqMap, String sortString,
			int page, int pageSize) {

		if (null == cataServer) {
			try {
				getCataServer(searchType);
			} catch (MalformedURLException e) {
				e.printStackTrace();
			}
		}
		// 以下原先的代码，此功能可使用query.addFilterQuery()方法替换。
		// @chenyanpeng 2016-06-29
		// String fqString = "";
		// if (fqMap != null) {
		// // 拼接过滤条件字符串
		// for (Map.Entry<String, Object> entry : fqMap.entrySet()) {
		// String key = entry.getKey();
		// String value = String.valueOf(entry.getValue());
		// if (value != null && value != "") {
		// fqString = fqString + " AND " + key + ":" + value;
		// }
		// }
		// if (fqString != null && fqString != "") {
		// fqString = fqString.substring(4);
		// }
		// }
		// 以上是原先的代码
		// 新代码+++++++++++++++++++++
		String fqString = null;
		if (fqMap != null) {
			StringBuilder sbFq = new StringBuilder();
			// 拼接过滤条件字符串
			for (Map.Entry<String, Object> entry : fqMap.entrySet()) {
				if (entry.getValue() == null) {
					continue;
				}
				String key = entry.getKey();
				String value = String.valueOf(entry.getValue());
				if (StringUtils.isNotBlank(value)) {
					sbFq.append(" AND " + key + ":" + value);
				}
			}
			if (sbFq.length() > 4) {
				fqString = sbFq.toString().substring(4);
			}
		}
		// 新代码结束-------------------
		try {
			SolrQuery query = new SolrQuery();
			/**
			 * 增加搜索关键词权重问题，将输入的关键词用空格分开，月往前的词权重越大 author:liugz 2016年3月7日
			 */
			/*
			 * if(!"*".equals(searchKey)){ String[] keys=searchKey.split(" ");
			 * searchKey=""; int num=0; for(int i=keys.length-1;i>=0;i--){
			 * if(!" ".equals(keys[i])&&!"".equals(keys[i])){
			 * searchKey=searchKey+keys[i]+"^"+Math.pow(4, num)+" "; num=num+1;
			 * } } }
			 */
			// query.set("q", "default_search:" + searchKey);

			if (fqString != null) {
				query.set("fq", fqString);
			}
			if (sortString != null) {
				query.set("sort", sortString);
			}
			query.set("start", (page - 1) * pageSize);
			query.set("rows", pageSize);
			query.setQuery("*:*");
			QueryResponse qrsp = cataServer.query(query);

			SolrDocumentList solrList = qrsp.getResults();
			List<Map> resultList = new ArrayList<Map>();
			if (solrList != null && solrList.size() > 0) {
				for (SolrDocument solrDocument : solrList) {
					Map<String, Object> result = new HashMap<String, Object>();
					result.put("id", solrDocument.getFieldValue("id"));
					result.put("orgname", solrDocument.getFieldValue("orgname"));
					
					result.put("releasedtime", solrDocument.getFieldValue("releasedtime"));
					result.put("content", solrDocument.getFieldValue("content"));
					result.put("catalogformat", solrDocument.getFieldValue("catalogformat"));
					result.put("filetype",
							solrDocument.getFieldValue("filetype"));

					result.put("datatype",
							solrDocument.getFieldValue("datatype"));
					result.put("creator", solrDocument.getFieldValue("creator"));
					//添加logo查询字段
					result.put("cata_logo", solrDocument.getFieldValue("cata_logo"));
					result.put("cityname",
							solrDocument.getFieldValue("cityname"));
					result.put("subjectname",
							solrDocument.getFieldValue("subjectname"));
					result.put("datacount",
							solrDocument.getFieldValue("datacount"));
					result.put("appcount",
							solrDocument.getFieldValue("appcount"));
					result.put("version", solrDocument.getFieldValue("version"));
					result.put("status", solrDocument.getFieldValue("status"));
					result.put("citycode",
							solrDocument.getFieldValue("citycode"));

					// 标题高亮
					String title = String.valueOf(solrDocument
							.getFieldValue("title"));
					if (StringUtils.isNotBlank(title) && !"null".equals(title)) {
						title = title.replace(searchKey, "<font color='red'>"
								+ searchKey + "</font>");
						result.put("title", title);
					} else {
						result.put("title", "");
					}
					
					// 描述高亮
					String description = String.valueOf(solrDocument
							.getFieldValue("description"));
					
					if (StringUtils.isNotBlank(description) && !"null".equals(description)) {
						description = description.replace(searchKey, "<font color='red'>"
								+ searchKey + "</font>");
						result.put("description",
								description);
					} else {
						result.put("description",
								"");
					}
					
					String groupname =  String.valueOf(solrDocument
							.getFieldValue("groupname"));
					// 主题和行业进行拆分 并高亮
					if (StringUtils.isNotBlank(groupname) && !"null".equals(groupname)) {
						String [] groupArr = groupname.split(",");
						int size = groupArr.length;
						StringBuffer groupNameBuf = new StringBuffer("");
						StringBuffer indNameBuf = new StringBuffer("");
						for (int i = 0; i < size; i++) {
							String [] tmp = groupArr[i].split(":");
							if (tmp.length > 2) {
								String name = tmp[2];
								if ("10".equals(tmp[1])) {
									// 主题
									groupNameBuf.append(name).append(",");
								} else {
									//  行业
									indNameBuf.append(name).append(",");
								}
							} else {
								// 主题
								groupNameBuf.append(groupArr[i]).append(",");
							}
						}
						String group_name = "";
						String ind_name = "";
						if (groupNameBuf.length()>1) {
							group_name = groupNameBuf.substring(0, groupNameBuf.length()-1);
//							group_name  = group_name.replace(searchKey, "<font color='red'>"
//									+ searchKey + "</font>");
						}
						if (indNameBuf.length()>1) {
							ind_name = indNameBuf.substring(0, indNameBuf.length()-1);
//							ind_name  = ind_name.replace(searchKey, "<font color='red'>"
//									+ searchKey + "</font>");
						}
						result.put("groupname", group_name);
						result.put("industryname", ind_name);
					} else {
						result.put("groupname", "");
						result.put("industryname", "");
					}
					
					// 标签高亮
					String cata_tags = String.valueOf(solrDocument
							.getFieldValue("cata_tags"));
					if (StringUtils.isNotBlank(cata_tags) && !"null".equals(cata_tags)) {
						cata_tags = cata_tags.replace(searchKey, "<font color='red'>"
								+ searchKey + "</font>");
						result.put("cata_tags", cata_tags);
					} else {
						result.put("cata_tags", "");
					}
					
					String cataType = String.valueOf(solrDocument
							.getFieldValue("datatype"));
					// 应用和API格式化日期
					if ("3".equals(cataType) || "4".equals(cataType)) {
						/*
						 * if(StringUtils.isNotEmpty(catalog.getUpdatetime())){
						 * long time = Long.valueOf(catalog.getUpdatetime());
						 * Date date = new Date(time);
						 * catalog.setUpdatetime(DateUtil.date2String(date,
						 * "yyyy-mm-dd")); }
						 */
						result.put("updatetime",
								solrDocument.getFieldValue("updatetime"));
					}
					// 应用设置评分
					if ("3".equals(cataType)) {
						String scorestr = String.valueOf(solrDocument
								.getFieldValue("score"));
						if (StringUtils.isNotEmpty(scorestr)
								&& !"null".equals(scorestr)
								&& !" ".equals(scorestr)) {
							double score = Double.parseDouble(scorestr);
							result.put("score", score / 2);
						}
					}

					resultList.add(result);
				}

				PaginationList<Map> searchCatalogPageList = new PaginationList<Map>();
				searchCatalogPageList.setCurrPage(page);
				searchCatalogPageList.setPageSize(pageSize);
				searchCatalogPageList.setRecords(resultList);
				return searchCatalogPageList;
			}
		} catch (SolrServerException e) {
			e.printStackTrace();
			return null;
		}
		return null;
	}

	/**
	 * 搜素数量 <br>
	 * <p>
	 * Description: <br>
	 * zhanghuayun@outlook.com<br>
	 * <p>
	 * Date: 2014年10月10日 上午9:39:45<br/>
	 * <p>
	 * 
	 * @param keyWord
	 *            关键字
	 * @param dataType
	 *            数据类型 1：数据目录 2：新闻公告 3:应用 4 ：API
	 * @param cityCode
	 *            城市ID
	 * @return
	 * @throws SolrServerException
	 * @see long
	 */
	public static long queryCount(String searchType, String searchKey,
			Map<String, Object> fqMap) throws SolrServerException {
		if (null == cataServer) {
			try {
				getCataServer(searchType);
			} catch (MalformedURLException e) {
				e.printStackTrace();
			}
		}
		// 以下原先的代码，此功能可使用query.addFilterQuery()方法替换。
		// @chenyanpeng 2016-06-29
		// String fqString = "";
		// if (fqMap != null) {
		// // 拼接过滤条件字符串
		// for (Map.Entry<String, Object> entry : fqMap.entrySet()) {
		// String key = entry.getKey();
		// String value = String.valueOf(entry.getValue());
		// if (value != null && value != "") {
		// fqString = fqString + " AND " + key + ":" + value;
		// }
		// }
		// if (fqString != null && fqString != "") {
		// fqString = fqString.substring(4);
		// }
		// }
		// 以上是原先的代码
		// 新代码+++++++++++++++++++++
		String fqString = null;
		if (fqMap != null) {
			StringBuilder sbFq = new StringBuilder();
			// 拼接过滤条件字符串
			for (Map.Entry<String, Object> entry : fqMap.entrySet()) {
				if (entry.getValue() == null) {
					continue;
				}
				String key = entry.getKey();
				String value = String.valueOf(entry.getValue());
				if (StringUtils.isNotBlank(value)) {
					sbFq.append(" AND " + key + ":" + value);
				}
			}
			if (sbFq.length() > 4) {
				fqString = sbFq.toString().substring(4);
			}
		}
		// 新代码结束-------------------

		SolrQuery query = new SolrQuery();

		if (fqString != null) {
			query.set("fq", fqString);
		}
		query.setQuery("*:*");
		QueryResponse queryResponse = cataServer.query(query);
		if (null != queryResponse) {
			long count = queryResponse.getResults().getNumFound();
			return count;
		}
		return 0;
	}

	public static void main(String[] args) throws Exception {

	}
}
