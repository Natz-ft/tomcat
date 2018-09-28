package com.inspur.data.portal.screen.catalog;

import java.io.IOException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.loushang.internet.util.JsonUtils;
import org.loushang.internet.view.ViewHandler;

import com.inspur.data.catalog.domain.apply.OpenCatalogApply;
import com.inspur.data.catalog.domain.catalog.CatalogGroupLink;
import com.inspur.data.catalog.domain.catalog.OpenCatalog;
import com.inspur.data.common.exception.DataBaseException;
import com.inspur.data.common.exception.InvalidParametersException;
import com.inspur.data.common.file.FileStoreFactory;
import com.inspur.data.common.file.FileType;
import com.inspur.data.common.file.IFileStore;
import com.inspur.data.common.web.PaginationList;
import com.inspur.data.common.web.ParamUtil;
import com.inspur.data.common.web.RequestParam;
import com.inspur.portal.model.user.UserOperationLog;
import com.inspur.uc.api.organization.Organization;
import com.inspur.utils.DataUtils;
import com.inspur.utils.PageList;
import com.inspur.utils.PortalUtils;
import com.inspur.utils.UserUtils;

public class Catalog implements ViewHandler {

	private static Log log = LogFactory.getLog(Catalog.class);
	
	public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

	}

	// 转换目录类型，接收类型为default（或government）、social、internet
	private String transCataTypeName(String typeName) {
		if (StringUtils.isEmpty(typeName)) {
			return null;
		}
		Map<String, String> cataTypeMap = new HashMap<String, String>();
		cataTypeMap.put("default", "10");
		cataTypeMap.put("government", "10");
		cataTypeMap.put("social", "11");
		cataTypeMap.put("internet", "12");
		if (cataTypeMap.containsKey(typeName) && cataTypeMap.get(typeName) != null) {
			return cataTypeMap.get(typeName).toString();
		} else {
			return null;
		}
	}

	/**
	 * 获取数据目录列表 <br>
	 * <p>
	 * Description: <br>
	 * 
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 * @throws ParseException 
	 * @see void
	 */
	public void doGetCatalog(HttpServletRequest request, HttpServletResponse response)
			throws  ServletException, IOException, ParseException  {
		RequestParam param = ParamUtil.getRequestParam(request);
		int draw = ParamUtil.getInteger(request, "draw", 1);
		String region_code = (String) request.getSession().getAttribute("area_code");
		if ("root".equals(region_code)) {
			region_code = "";
		}
		String org_code = ParamUtil.getString(request, "org_code");
		if ("-1".equals(org_code)) {
			org_code = "";
		}
		// 目录名称关键字
		String title = ParamUtil.getString(request, "keywords");
		// 目录使用方式
		String use_type = ParamUtil.getString(request, "use_type");
		// 分组
		String group_id = ParamUtil.getString(request, "group_id");
		// 数据格式
		String catalog_format = ParamUtil.getString(request, "catalog_format");
		// 排序方式
		String order_by = ParamUtil.getString(request, "_order");
		// 目录类型
		String cata_type = ParamUtil.getString(request, "cata_type");
		//行业id
		String ind_id = ParamUtil.getString(request, "ind_id", "");
		//标签
		String cata_tags = ParamUtil.getString(request, "tag", "");
		//评分
		String use_grade = ParamUtil.getString(request, "grade", "");

		String[] orgArr = {org_code};
		if (StringUtils.isEmpty(org_code)) {
			orgArr = null;
		}
		
		if("-1".equals(group_id)) {
			group_id = null;
		}
		
		HashMap<String, Object> extentParams = new HashMap<String, Object>();
		extentParams.put("conf_use_type", use_type);
		extentParams.put("conf_catalog_format", catalog_format);
		// 目录上线状态
		extentParams.put("conf_status", "4");

		if (StringUtils.isNotEmpty(cata_type)) {
			extentParams.put("cata_type", transCataTypeName(cata_type));
		} else {
			// 默认政务数据目录
			extentParams.put("cata_type", transCataTypeName("default"));
		}

		// 开放目录
		extentParams.put("conf_type", "2");
		//extentParams.put("audience_type", "2");//受众用户为外网用户
		// 标签和评分参数
		extentParams.put("cata_tags",cata_tags);
		if (StringUtils.isNotBlank(use_grade)) {
			extentParams.put("use_grade",Integer.parseInt(use_grade));
		}


		PageList<OpenCatalog> pagelist = new PageList<OpenCatalog>();
		PaginationList<OpenCatalog> result = new PaginationList<OpenCatalog>();

		// 只有政务目录区分region_code
		if (!"10".equals(extentParams.get("cata_type").toString())) {
			region_code = null;
		}

		if ("".equals(order_by) || null == order_by) {
			order_by = "cc.update_time desc";
		}else{
			//解决前台sql注入漏洞
			String[] orderArr = order_by.split(":");
			if(orderArr.length == 2){
				String order = " desc ";
				if("a".equals(orderArr[1])){
					order = " asc ";
				}
				if("1".equals(orderArr[0])){
					order_by = " cc.update_time " + order;
				}else if("2".equals(orderArr[0])){
					order_by = " s.data_count " + order;
				}else if("3".equals(orderArr[0])){
					order_by = " s.use_visit " + order;
				}else if("4".equals(orderArr[0])){
					order_by = " s.use_file_count " + order;
				}else if("5".equals(orderArr[0])){
					order_by = " s.use_grade " + order;
				}
			}else{
				order_by = "cc.update_time desc";
			}	
		}
		result = DataUtils.getOpenCatalogService().queryOpenCataLogByPage(title, null, region_code, orgArr, group_id,
				ind_id,"4",order_by,extentParams, param.getPage(), param.getPageSize());
		List<OpenCatalog> cataList = result.getRecords();
		if (cataList != null && cataList.size() > 0) {
			for (OpenCatalog temp : cataList) {
				if(temp.getConf_update_time()!=null){
					Date date1=new Date();
					 DateFormat df = new SimpleDateFormat("EEE MMM dd HH:mm:ss zzz yyyy", Locale.US);
				      date1 = df.parse(temp.getConf_update_time().toString());
				      df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
				      temp.setUpdate_time(df.format(date1));
				}
				if(temp.getConf_released_time()!=null){
					Date date2=new Date();
					 DateFormat df = new SimpleDateFormat("EEE MMM dd HH:mm:ss zzz yyyy", Locale.US);
				      date2 = df.parse(temp.getConf_released_time().toString());
				      df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
				      temp.setReleased_time(df.format(date2));
				}
				String logo = temp.getCata_logo();
				// 图标展示地址
				String logoUrl = "";
				if (logo != null && !"".equals(logo)) {
					IFileStore fileStore = FileStoreFactory.getFileStore();
					logoUrl = fileStore.getFileUrl(logo, FileType.OPEN_APP_DATA);
				}
				temp.setCata_logo(logoUrl);
				// 开放类型
				if(!temp.getOpen_type().equals("")||temp.getOpen_type()!=null){
					temp.setOpen_type(UserUtils.getDictItemValue("catalog_open_type", temp.getOpen_type()));
				}
			}
		}
		pagelist.setData(cataList);
		pagelist.setRecordsTotal(result.getTotalRecord());
		pagelist.setRecordsFiltered(result.getTotalRecord());
		pagelist.setDraw(draw);
		response.getWriter().write(JsonUtils.convertToString(pagelist));
	}

	/**
	 * 获取数据目录多种维度统计信息，包含开放范围、部门、行业、数据格式、热门标签、数据目录类型 <br>
	 * <p>
	 * Description: <br>
	 * //返回形式： [ { column_id_desc:"类别", group_num:256, group_count_num: [ {
	 * item:"零售", item_value:'1', count_num:169224 } ], column_id_en:"type" } ]
	 * 
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 * @see void
	 */
	public void doGetCatalogStaticsByMutiDimi(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		HashMap<String, Object> param = new HashMap<String, Object>();

		String region_code = (String) request.getSession().getAttribute("area_code");
		if ("root".equals(region_code)) {
			region_code = "";
		}
		String org_code = ParamUtil.getString(request, "org_code");
		if ("-1".equals(org_code)) {
			org_code = "";
		}
		String title = ParamUtil.getString(request, "keywords");
		String catalog_format = ParamUtil.getString(request, "catalog_format");
		String group_id = ParamUtil.getString(request, "group_id");
		String use_type = ParamUtil.getString(request, "use_type");
		String cata_type = ParamUtil.getString(request, "cata_type");
		
		String ind_id = ParamUtil.getString(request, "ind_id", "");
		//标签
		String cata_tags = ParamUtil.getString(request, "tag", "");
		//评分
		String use_grade = ParamUtil.getString(request, "grade", "");
		
		//主题类型
		//String themes_type = "10";
		//行业类型
		//String occupation_type = "20";

		if ("-1".equals(group_id)) {
			group_id = "";
		}

		// 只有政务目录区分region_code
		if (!"default".equals(cata_type)) {
			region_code = null;
		}

		String[] orgArr = {org_code};
		if (StringUtils.isEmpty(org_code)) {
			orgArr = null;
		}
		// 目录名称
		param.put("cata_title", title);
		// 数据格式
		param.put("conf_catalog_format", catalog_format);
		// 目录类型
		param.put("conf_use_type", use_type);
 		// 上线目录
		param.put("conf_status", "4");

		param.put("region_code", region_code);
		// 标签和评分参数
		param.put("cata_tags",cata_tags);
		if (StringUtils.isNotBlank(use_grade)) {
			param.put("use_grade",Integer.parseInt(use_grade));
		}

		if (StringUtils.isNotEmpty(cata_type)) {
			String cataValue = transCataTypeName(cata_type);
			param.put("cata_type", cataValue);
		} else {
			// 默认政务目录
			param.put("cata_type", transCataTypeName("default"));
		}

		// 开放目录
		param.put("conf_type", "2");

		List<Map<String, Object>> result = new ArrayList<Map<String, Object>>();
		if ("10".equals(param.get("cata_type").toString())) {
			// 部门统计
			result.add(orderOrg(catalogStatics(region_code,orgArr,group_id,ind_id,param,"department")));
		}
		// 主题统计
		result.add(orderSub(catalogStatics(region_code,orgArr,group_id,ind_id,param,"theme")));
		// 目录类型
		result.add(cataTypeStatics(region_code,orgArr,group_id,ind_id,catalog_format,param));
		// 数据格式
		result.add(cataFormatStatics(region_code,orgArr,group_id,ind_id,use_type,param));

		response.getWriter().write(JsonUtils.convertToString(result));
	}
	//部门按照seq排序的工具
	public  Map<String, Object> orderOrg(Map<String, Object> orgMap){
	List<Map<String, Object>> orglist= (List<Map<String, Object>>) orgMap.get("group_count_num");
	for (int i=0;i< orglist.size();i++) {
		String item_value=orglist.get(i).get("item_value").toString();
		Organization org=UserUtils.getOrganizationService().getOrganization(item_value);
		if(org!=null){
			if(org.getSeq()!=null){
				orglist.get(i).put("seq",org.getSeq()); 
			}else{
				orglist.get(i).put("seq","1000"); 
			}
		}else{
			orglist.get(i).put("seq","1000"); 
		}
	}
	Collections.sort(orglist, new Comparator<Map<String, Object>>(){  
           public int compare(Map<String, Object> o1, Map<String, Object> o2) {  
            int seq1 = Integer.parseInt(o1.get("seq").toString());  
            int seq2 = Integer.parseInt(o2.get("seq").toString());      
            if(seq1>seq2)
    		{
    			return 1;
    		}
    		if(seq1<seq2)
    		{
    			return -1;
    		}
    		return 0;     
       }  
       });

	orgMap.put("group_count_num", orglist);
	return orgMap;
}
	//主题按照order_id排序的工具
		public  Map<String, Object> orderSub(Map<String, Object> orgMap){
		List<Map<String, Object>> orglist= (List<Map<String, Object>>) orgMap.get("group_count_num");
		for (int i=0;i< orglist.size();i++) {
			String item_value=orglist.get(i).get("item_value").toString();
			 Map<String, Object> org=DataUtils.getCataLogGroupService().getGroupById(item_value);
			if(org!=null){
				 if(org.get("order_id")!=null){
						orglist.get(i).put("order_id",org.get("order_id")); 
					}else{
						orglist.get(i).put("order_id","1000"); 
					}
			}else{
				orglist.get(i).put("order_id","1000"); 
			}
			
		}
		Collections.sort(orglist, new Comparator<Map<String, Object>>(){  
	           public int compare(Map<String, Object> o1, Map<String, Object> o2) {  
	            int order_id1 =Integer.parseInt(o1.get("order_id").toString());  
	            int order_id2 =Integer.parseInt(o2.get("order_id").toString());      
	            if(order_id1>order_id2)
	    		{
	    			return 1;
	    		}
	    		if(order_id1<order_id2)
	    		{
	    			return -1;
	    		}
	    		return 0;  
	       }  
	       });
		orgMap.put("group_count_num", orglist);
		return orgMap;
	}
	// 目录类型
	/*
	 * [ { column_id_desc:"目录类型", group_num:4, group_count_num: [ { item:"数据集",
	 * item_value:'1', count_num:169224 } ], column_id_en:"dataset_type" } ]
	 */
	@SuppressWarnings("serial")
	private Map<String, Object> cataTypeStatics(String region_id, String[] org_ids,
			String group_id, String instr_id,
			String conf_catalog_format,HashMap<String, Object> param) {
		Map<String, Object> cataTypeStatics = new HashMap<String, Object>();
		cataTypeStatics.put("column_id_desc", "数据使用方式");
		cataTypeStatics.put("column_id_en", "use_type");

		List<Map<String, Object>> cataTypeList = new ArrayList<Map<String, Object>>() {
			{
				add(new HashMap<String, Object>() {
					{
						put("item", "数据集");
						put("item_value", "1");
					}
				});
				add(new HashMap<String, Object>() {
					{
						put("item", "文件集");
						put("item_value", "2");
					}
				});
				add(new HashMap<String, Object>() {
					{
						put("item", "API");
						put("item_value", "3");
					}
				});
				add(new HashMap<String, Object>() {
					{
						put("item", "地图");
						put("item_value", "4");
					}
				});
				add(new HashMap<String, Object>() {
					{
						put("item", "MQ");
						put("item_value", "7");
					}
				});
			}
		};
		for (Map<String, Object> map : cataTypeList) {
			map.put("count_num", DataUtils.getOpenCatalogService().getOpenCatalogCount(region_id, org_ids,
					 group_id,  instr_id, map.get("item_value").toString(),
					 conf_catalog_format, param));
		}
		cataTypeStatics.put("group_num", cataTypeList.size());
		cataTypeStatics.put("group_count_num", cataTypeList);
		return cataTypeStatics;
	}

	// 按主题、行业,部门 进行统计数据目录
	/*
	 * [ { column_id_desc:"部门", group_num:256, group_count_num: [ { item:"科技教育",
	 * item_value:'sub-1', count_num:169224 } ], column_id_en:"org_code" } ]
	 */
	private Map<String, Object> catalogStatics(String region_id,
			String[] org_ids, String group_id, String instr_id,HashMap<String, Object> param,String group_by) {
		Map<String, Object> groupStatics = new HashMap<String, Object>();
		if ("theme".equals(group_by)) {
			groupStatics.put("column_id_desc", "主题");
			groupStatics.put("column_id_en", "group_id");
		} else if ("department".equals(group_by)) {
			groupStatics.put("column_id_desc", "部门");
			groupStatics.put("column_id_en", "org_code");
		} else if ("industry".equals(group_by)){
			groupStatics.put("column_id_desc", "行业");
			groupStatics.put("column_id_en", "ind_id");
		} else {
			group_by = "theme";
			groupStatics.put("column_id_desc", "主题");
			groupStatics.put("column_id_en", "group_id");
		}
		List<Map<String, Object>> groupList = DataUtils.getOpenCatalogService().queryOpenCatalogByGroup(region_id,
				org_ids, group_id, instr_id, param, group_by);
		List<Map<String, Object>> groupMemberList = new ArrayList<Map<String, Object>>();
		if (null != groupList && !groupList.isEmpty() && groupList.size() > 0) {
			for (Map<String, Object> map : groupList) {
				Map<String, Object> temp = new HashMap<String, Object>();
				temp.put("item_value", map.get("id"));
				temp.put("item", map.get("name"));
				temp.put("count_num", map.get("count"));
				groupMemberList.add(temp);
			}
			groupStatics.put("group_num", groupList.size());
			groupStatics.put("group_count_num", groupMemberList);
		} else {
			groupStatics.put("group_num", 0);
			groupStatics.put("group_count_num", new ArrayList<Map<String, Object>>());
		}
		return groupStatics;
	}

	// 数据格式
	/*
	 * [ { column_id_desc:"数据格式", group_num:256, group_count_num: [ {
	 * item:"XML", item_value:'2', count_num:169224 } ],
	 * column_id_en:"catalog_format" //对应data_catalog表 } ]
	 */
	@SuppressWarnings("serial")
	private Map<String, Object> cataFormatStatics(String region_id, String[] org_ids,
			String group_id, String instr_id, String conf_use_type, HashMap<String, Object> param) {
		Map<String, Object> cataFormatStatics = new HashMap<String, Object>();
		cataFormatStatics.put("column_id_desc", "数据格式");
		cataFormatStatics.put("column_id_en", "catalog_format");

		List<Map<String, Object>> cataFormatMemberList = new ArrayList<Map<String, Object>>() {
			{
				add(new HashMap<String, Object>() {
					{
						put("item", "XLS");
						put("item_value", "1");
					}
				});
				add(new HashMap<String, Object>() {
					{
						put("item", "XML");
						put("item_value", "2");
					}
				});
				add(new HashMap<String, Object>() {
					{
						put("item", "JSON");
						put("item_value", "3");
					}
				});
				add(new HashMap<String, Object>() {
					{
						put("item", "CSV");
						put("item_value", "4");
					}
				});
			}
		};
		for (Map<String, Object> map : cataFormatMemberList) {
			param.put("conf_catalog_format", map.get("item_value").toString());
			map.put("count_num", DataUtils.getOpenCatalogService().getOpenCatalogCount(region_id, org_ids,
					 group_id,  instr_id, conf_use_type, map.get("item_value").toString(), param));
		}
		cataFormatStatics.put("group_num", cataFormatMemberList.size());
		cataFormatStatics.put("group_count_num", cataFormatMemberList);
		return cataFormatStatics;
	}

	/**
	 * 获取目录列表 - 手机APP使用
	 * <br>
	 * <p>Description: 
	 * <br>
	 * <a href=mailto:miaozhq@inspur.com></a><br>
	 * <p>Date: 2017年3月14日 上午10:11:54<br/>
	 * <p>
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException   
	 * @throws InvalidParametersException 
	 * @throws DataBaseException 
	 * @see void
	 */
	public void doSearchCatalog(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException, DataBaseException, InvalidParametersException {
		int page = ParamUtil.getInteger(request, "page", 1);
		int pageSize = ParamUtil.getInteger(request, "pageSize", 10);
		// 获取地市编码
		String region_code = (String) request.getSession().getAttribute("area_code");
		if (StringUtils.isBlank(region_code) || StringUtils.isEmpty(region_code)) {
			region_code = ParamUtil.getString(request, "regionCode");
		}
		if ("root".equals(region_code)) {
			region_code = "";
		}
		String org_code = ParamUtil.getString(request, "org_code");
		if ("-1".equals(org_code)) {
			org_code = "";
		}
		// 目录名称关键字
		String title = ParamUtil.getString(request, "keywords");
		// 目录使用方式
		String use_type = ParamUtil.getString(request, "use_type");
		// 分组
		String group_id = ParamUtil.getString(request, "group_id");
		// 数据格式
		String catalog_format = ParamUtil.getString(request, "catalog_format");
		// 排序方式
		String orderBy = ParamUtil.getString(request, "_order");
		// 目录类型
		String cata_type = ParamUtil.getString(request, "cata_type");
		// 行业类型
		String ind_id = ParamUtil.getString(request, "ind_id");

		String[] orgArr = { org_code };
		if (StringUtils.isEmpty(org_code)) {
			orgArr = null;
		}

		if ("-1".equals(group_id)) {
			group_id = null;
		}

		HashMap<String, Object> extentParams = new HashMap<String, Object>();
		extentParams.put("conf_use_type", use_type);
		// 目录上线状态
		extentParams.put("conf_status", "4");
		// 开放目录
		extentParams.put("conf_type", "2");
		PaginationList<OpenCatalog> result = new PaginationList<OpenCatalog>();

		String order_by = null;
		if ("".equals(orderBy) || null == orderBy) {
			order_by = "s.use_visit desc";
		}else{
			//解决前台sql注入漏洞
			String[] orderArr = orderBy.split(":");
			if(orderArr.length == 2){
				String order = " desc ";
				if("a".equals(orderArr[1])){
					order = " asc ";
				}
				if("1".equals(orderArr[0])){
					order_by = " cc.update_time " + order;
				}else if("2".equals(orderArr[0])){
					order_by = " s.data_count " + order;
				}else if("3".equals(orderArr[0])){
					order_by = " s.use_visit " + order;
				}else if("4".equals(orderArr[0])){
					order_by = " s.use_file_count " + order;
				}else{
					order_by = " s.use_visit " + order;
				}
			}else{
				order_by = "s.use_visit desc";
			}
		}

		Map<String, Object> userInfo = (Map<String, Object>) request.getSession().getAttribute("userInfo");
		if ((userInfo != null && !"".equals(userInfo))
				&&(StringUtils.isEmpty(group_id))
				&&(StringUtils.isEmpty(org_code))
				&&(StringUtils.isEmpty(orderBy))
				&&(StringUtils.isEmpty(catalog_format))) {
			HashMap<String, Object> objParams = new HashMap<String, Object>();
			objParams.put("user_id",userInfo.get("uid"));
			objParams.put("op_type","visit");
			objParams.put("obj_type","catalog");
			extentParams.put("view_count", "1");
			List<Map<String, Object>> objIdList = PortalUtils.getUserOperationLogService().queryObjIdCountOperationLog(objParams,page, pageSize);
			List<String> catalogGroupsList = new ArrayList<>();
			List<String> catalogIndustrysList = new ArrayList<>();
			String catalogGroups = "";
			String catalogIndustrys = "";
			if(objIdList!=null&&objIdList.size()!=0){
				for(Map<String,Object> tempMap:objIdList){
					OpenCatalog tempCatalog = DataUtils.getOpenCatalogService().getOpenCatalogByCataId(tempMap.get("obj_id").toString());
					if(tempCatalog!=null){
						if(tempCatalog.getCataLogGroups()!=null&&tempCatalog.getCataLogGroups().size()>0){
							for(CatalogGroupLink tempGroupLink:tempCatalog.getCataLogGroups()){
								catalogGroupsList.add(tempGroupLink.getGroup_id());
							}
						}
						if(tempCatalog.getCataLogIndustrys()!=null&&tempCatalog.getCataLogIndustrys().size()>0){
							for(CatalogGroupLink tempIndustrys:tempCatalog.getCataLogIndustrys()){
								catalogIndustrysList.add(tempIndustrys.getGroup_id());
							}
						}
					}
				}
				catalogGroups = StringUtils.join(catalogGroupsList.toArray(), ",");
				catalogIndustrys = StringUtils.join(catalogIndustrysList.toArray(), ",");
			}
			order_by = " cvs.view_count DESC";
			String tempOrgArr[] = {};
			result = DataUtils.getOpenCatalogService().getHotOpenCataLogByPage(null, null, region_code, tempOrgArr, catalogGroups,
					catalogIndustrys, "4", order_by, extentParams, page, pageSize);
		}else{
			if (StringUtils.isNotEmpty(cata_type)) {
				extentParams.put("cata_type", transCataTypeName(cata_type));
			} else {
				// 默认政务数据目录
				extentParams.put("cata_type", transCataTypeName("default"));
			}
			// 只有政务目录区分region_code
			if (!"10".equals(extentParams.get("cata_type").toString())) {
				region_code = null;
			}
			extentParams.put("conf_catalog_format", catalog_format);
			
			result = DataUtils.getOpenCatalogService().queryOpenCataLogByPage(title, null, region_code, orgArr, group_id,
					ind_id, "4", order_by, extentParams, page, pageSize);
		}
		
		List<OpenCatalog> cataList = result.getRecords();
		if (cataList != null && cataList.size() > 0) {
			for (OpenCatalog temp : cataList) {
				String logo = temp.getCata_logo();
				// 图标展示地址
				String logoUrl = "";
				if (logo != null && !"".equals(logo)) {
					IFileStore fileStore = FileStoreFactory.getFileStore();
					logoUrl = fileStore.getFileUrl(logo, FileType.OPEN_APP_DATA);
				}
				temp.setCata_logo(logoUrl);
				// 开放类型
				if(!temp.getOpen_type().equals("")||temp.getOpen_type()!=null){
					temp.setOpen_type(UserUtils.getDictItemValue("catalog_open_type",temp.getOpen_type()));
				}
			}
		}
		result.setRecords(cataList);
		//response.setHeader("Access-Control-Allow-Origin", "*");//本地测试跨域问题
		response.getWriter().write(JsonUtils.convertToString(result));
	}
	
	/**
	 * 
	 * @title doGetApplyedCatalog<br/>
	 * <p>Description: 查询用户申请的数据目录列表
	 * <br>
	 * @author <a href=mailto:yinyin@inspur.com></a><br>
	 * <p>Date: 2017年4月19日 下午6:04:04<br/>
	 * <p>
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException   
	 * @see void
	 */
	public void doGetApplyedCatalog(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
			int draw = ParamUtil.getInteger(request, "draw", 1);
			String uid = request.getSession().getAttribute("uid").toString();
			String status =  ParamUtil.getString(request, "status");
			int pStart = ParamUtil.getInteger(request,"start" ,-1);
			int pLength = ParamUtil.getInteger(request,"length" ,-1);
			 
			PaginationList<OpenCatalogApply> res = DataUtils.getOpenCatalogApplyService().queryCatalogApplyByPage(null, uid, null, null, null, null, status, null, null, pStart, pLength);
			int totalCount = res.getTotalRecord();
			@SuppressWarnings("unchecked")
			List<OpenCatalogApply> resultList =  res.getRecords();
			
			PageList<OpenCatalogApply> pagelist = new PageList<OpenCatalogApply>();
			pagelist.setData(resultList);
			pagelist.setRecordsTotal(totalCount);
			pagelist.setRecordsFiltered(totalCount);
			pagelist.setDraw(draw);
			response.getWriter().write(JsonUtils.convertToString(pagelist));
		
	}
	
	/**
	 * 
	 * @title doGetApplyData<br/>
	 * <p>Description: 查询用户申请的数据目录列表
	 * <br>
	 * @author <a href=mailto:wang_zhe@inspur.com></a><br>
	 * <p>Date: 2017年11月117日 上午10:05:04<br/>
	 * <p>
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException   
	 * @see void
	 */	
	public void doGetApplyData(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		int draw = ParamUtil.getInteger(request, "draw", 1);
		String uid = request.getSession().getAttribute("uid").toString();
		int pStart = ParamUtil.getInteger(request,"start" ,-1);
		int pLength = ParamUtil.getInteger(request,"length" ,-1);
		 
		PaginationList<Map<String, Object>>  res = DataUtils.getOpenCatalogApplyService().queryCatalogApplyByPageNewByUid(null, null, null, null, uid, pStart, pLength);
		int totalCount = res.getTotalRecord();
		@SuppressWarnings("unchecked")
        List<Map<String, Object>> dataListnew;
        dataListnew = res.getRecords();
		PageList<Map<String, Object>> pagelist = new PageList<Map<String, Object>>();
	    pagelist.setData(dataListnew);
		pagelist.setRecordsTotal(totalCount);
		pagelist.setRecordsFiltered(totalCount);
		pagelist.setDraw(draw);
		response.getWriter().write(JsonUtils.convertToString(pagelist));
	

	}	 
}
