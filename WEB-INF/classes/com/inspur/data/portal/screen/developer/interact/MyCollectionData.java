package com.inspur.data.portal.screen.developer.interact;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.loushang.internet.util.JsonUtils;
import org.loushang.internet.view.ViewHandler;

import com.inspur.data.catalog.domain.catalog.CatalogGroupLink;
import com.inspur.data.catalog.domain.catalog.OpenCatalog;
import com.inspur.data.common.exception.InvalidParametersException;
import com.inspur.data.common.file.FileStoreFactory;
import com.inspur.data.common.file.FileType;
import com.inspur.data.common.file.IFileStore;
import com.inspur.data.common.utils.MapUtils;
import com.inspur.data.common.utils.StringUtils;
import com.inspur.data.common.web.PaginationList;
import com.inspur.data.common.web.ParamUtil;
import com.inspur.data.portal.screen.interact.DataTable;
import com.inspur.portal.model.base.Dict;
import com.inspur.portal.model.user.UserCollection;
import com.inspur.utils.AuditLogUtil;
import com.inspur.utils.DataUtils;
import com.inspur.utils.PortalUtils;
import com.inspur.utils.UserUtils;

/**
 * 我收藏的数据 <br>
 * <strong>Title :</strong> MyCollectionData.java <br>
 * <strong>Description : </strong> <br>
 * <strong>For Examples :</strong> <br>
 * <strong>Create on : 2017年2月22日 上午10:51:01<br>
 * </strong>
 * <p>
 * <strong>Copyright (C) Inspur Co.,Ltd.<br>
 * </strong>
 * <p>
 * 
 * @author <a href=mailto:miaozhq@inspur.com></a><br>
 * @version <strong>V1.0</strong>
 * 
 *          <PRE>
 *          </PRE>
 * 
 *          -------------------------------------------<br>
 *          Change History:[Formatter: author date description] <br/>
 *          1<br>
 *          2<br>
 *          3<br>
 */
public class MyCollectionData extends DataTable implements ViewHandler {
	private static Log log = LogFactory.getLog(MyCollectionData.class);
	
	public void execute(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		try {
			Object uid = request.getSession().getAttribute("uid");
			if (uid == null || "".equals(uid.toString())) {
				request.setAttribute("count", 0);
				request.setAttribute("code", "000001");
				return;
			}

			String type = ParamUtil.getString(request, "type", "1");
			int page = ParamUtil.getInteger(request, "page", 1);
			int pageSize = ParamUtil.getInteger(request, "pageSize", 10);

			PaginationList<UserCollection> list = PortalUtils.getUserCollectionService()
					.queryUserCollectionListByPage(uid.toString(), type, null, page, pageSize);
			int count = list.getTotalRecord();
			request.setAttribute("count", count);
//			
			request.setAttribute("current_page", page);

			List<UserCollection> collection_list = list.getRecords();
			List<Map<String, Object>> collect_list = new ArrayList<Map<String, Object>>();
			if (collection_list == null) {
				return;
			}
			for (UserCollection m : collection_list) {
				if(m!=null && m.getId()!=null &&!"".equals(m.getId() )&& m.getObject_id()!=null && !"".equals(m.getObject_id())){
					String cata_id = m.getObject_id();
					
					// 获取开放目录信息
	                OpenCatalog openCatalog = DataUtils.getOpenCatalogService().getOpenCatalogByCataId(cata_id);
	                
	                if(openCatalog!=null){
	                	Map<String, Object> collectMap = new HashMap<String, Object>();
						
						String logo = openCatalog.getCata_logo();
						// 图标展示地址
						String logoUrl = "";
						if (logo != null && !"".equals(logo)) {
							IFileStore fileStore = FileStoreFactory.getFileStore();
							logoUrl = fileStore.getFileUrl(logo, FileType.OPEN_APP_DATA);
						}
						openCatalog.setCata_logo(logoUrl);
						// 开放类型描述
						if(!openCatalog.getOpen_type().equals("")||openCatalog.getOpen_type()!=null){
							Dict cataIsPublic = UserUtils.getDictService().findDict("catalog_open_type",openCatalog.getOpen_type());
							if (cataIsPublic != null) {
								openCatalog.setOpen_type(cataIsPublic.getItemValue());
							}
						}
						
						
						//增加数据格式转换
						if (StringUtils.isNotEmpty(openCatalog.getConf_catalog_format())) {
			                String[] stringArr = openCatalog.getConf_catalog_format().split(",");
			                List<String> formatList = new ArrayList<String>();
			                for (int i = 0; i < stringArr.length; i++) {
			                	formatList.add(stringArr[i]);
			                }
			                collectMap.put("catalog_format_list", formatList);
		                }
						
						//增加所属主题分组转换
	                    List<CatalogGroupLink> cataLogGroups = openCatalog.getCataLogGroups();
	                    String cataLogGroupsStr = "";
	                    if(cataLogGroups!=null){
	                    	for (CatalogGroupLink catalogGroupLink : cataLogGroups) {
								if(catalogGroupLink!=null&&catalogGroupLink.getGroup_name()!=null &&!"".equals(catalogGroupLink.getGroup_name())){
									if("".equals(cataLogGroupsStr)){
										cataLogGroupsStr+=catalogGroupLink.getGroup_name();
									}else{
										cataLogGroupsStr=cataLogGroupsStr+"，"+catalogGroupLink.getGroup_name();
									}
								}
							}
	                    }
	                    collectMap.put("cataLogGroupsStr", cataLogGroupsStr);
	                    
	                	//增加所属行业分组转换
	                	List<CatalogGroupLink> cataLogIndustrys = openCatalog.getCataLogIndustrys();
	                	String cataLogIndustrysStr = "";
	                	if(cataLogIndustrys!=null){
	                		for (CatalogGroupLink catalogGroupLink : cataLogIndustrys) {
								if(catalogGroupLink!=null &&catalogGroupLink.getGroup_name()!=null &&!"".equals(catalogGroupLink.getGroup_name())){
									if("".equals(cataLogIndustrysStr)){
										cataLogIndustrysStr+=catalogGroupLink.getGroup_name();
									}else{
										cataLogIndustrysStr=cataLogIndustrysStr+"，"+catalogGroupLink.getGroup_name();
									}
								}
							}
	                	}
	                	collectMap.put("cataLogIndustrys", cataLogIndustrysStr);
	                	
						
	                	collectMap.put("collection_id", m.getId());
	                	collectMap.put("openCatalog",openCatalog);
						collect_list.add(collectMap);
					}
				}
			}
			request.setAttribute("collect_list", collect_list);
		} catch (Exception e) {
			log.error(e);
			e.printStackTrace();
		}finally {
			//记录页面访问日志
			AuditLogUtil.addPageVisitAutiLog(request, "个人中心", "");
		}
	}

	/**
	 * 移动应用提供收藏的数据
	 * 
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 * @throws InvalidParametersException
	 */
	public void doGetMyCorrectionData(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException, InvalidParametersException {
		Object uid = request.getSession().getAttribute("uid");
		if (uid == null || "".equals(uid.toString())) {
			request.setAttribute("count", 0);
			return;
		}

		String type = ParamUtil.getString(request, "type", "1");
		int page = ParamUtil.getInteger(request, "page", 1);
		int pageSize = ParamUtil.getInteger(request, "pageSize", 10);

		PaginationList<Map<String, Object>> newlist = new PaginationList<Map<String, Object>>();
		PaginationList<UserCollection> list = PortalUtils.getUserCollectionService()
				.queryUserCollectionListByPage(uid.toString(), type, null, page, pageSize);

		List<Map<String, Object>> catalog_list = new ArrayList<Map<String, Object>>();
		if(list!=null && list.getRecords()!=null){
			List<UserCollection> collection_list = list.getRecords();
			
			for (UserCollection m : collection_list) {
				String cata_id = m.getObject_id();
				Map<String, Object> catalog = new HashMap<String, Object>();
				
				// 获取开放目录信息
	            OpenCatalog openCatalog = DataUtils.getOpenCatalogService().getOpenCatalogByCataId(cata_id);

				if (openCatalog == null) {
					catalog = new HashMap<String, Object>();
				} else {
					try {
						catalog =  MapUtils.objectToMap(openCatalog);
					} catch (Exception e) {
						log.error(e);
						e.printStackTrace();
					}
					catalog.put("collection_id", m.getId());
					catalog_list.add(catalog);
				}
			}
			
			newlist.setCurrPage(list.getCurrPage());
			newlist.setPageSize(list.getPageSize());
			newlist.setRecords(catalog_list);
			newlist.setTotalPage(list.getTotalPage());
			newlist.setTotalRecord(list.getTotalRecord());
		}else{
			newlist.setCurrPage(page);
			newlist.setPageSize(pageSize);
			newlist.setRecords(catalog_list);
			newlist.setTotalPage(0);
			newlist.setTotalRecord(0);
		}
		
		
		response.getWriter().write(JsonUtils.convertToString(newlist));
	}
	
	// 取消收藏
		public void doDelCollection(HttpServletRequest request,
				HttpServletResponse response) throws ServletException, IOException,
				InvalidParametersException {
			String data_id = request.getParameter("id");

			Object uid = request.getSession().getAttribute("uid");
			Map<String, String> map_res = new HashMap<String, String>();
			if (uid == null || "".equals(uid.toString())) {
				map_res.put("code", "000001");
				map_res.put("msg", "用户未登录！");
				response.getWriter().write(JsonUtils.convertToString(map_res));
				return;
			}
			int del_num = PortalUtils.getUserCollectionService()
					.deleteUserCollection(data_id, "1", uid.toString());
			if (del_num != 0) {
				map_res.put("code", "000000");
				map_res.put("msg", "取消成功！");
			} else {
				map_res.put("code", "000002");
				map_res.put("msg", "取消失败！");
			}
			response.getWriter().write(JsonUtils.convertToString(map_res));
		}
}
