package com.inspur.data.portal.screen.relnet;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.loushang.internet.util.JsonUtils;
import org.loushang.internet.view.ViewHandler;

import com.inspur.data.catalog.domain.catalog.CatalogLK;
import com.inspur.data.catalog.domain.catalog.CatalogTag;
import com.inspur.data.common.exception.DataBaseException;
import com.inspur.data.common.utils.StringUtils;
import com.inspur.data.common.web.PaginationList;
import com.inspur.data.common.web.ParamUtil;
import com.inspur.data.od.utils.constant.RelnetType;
import com.inspur.uc.api.organization.Organization;
import com.inspur.utils.AuditLogUtil;
import com.inspur.utils.DataUtils;
import com.inspur.utils.UserUtils;

/**
 * 数据图谱 <strong>Title : Index<br>
 * </strong> <strong>Description : </strong>@注释写在此处@<br>
 * <strong>Create on : 2014年9月5日 上午10:02:17<br>
 * </strong>
 * <p>
 * <strong>Copyright (C) Inspur Co.,Ltd.<br>
 * </strong>
 * <p>
 * 
 * @author <a href="mailto:haowenxiang@inspur.com">haowx</a><br>
 * @version <strong>V1.0</strong><br>
 *          <br>
 *          <strong>修改历史:</strong><br>
 *          修改人 修改日期 修改描述<br>
 *          -------------------------------------------<br>
 *          <br>
 *          <br>
 */
public class Index implements ViewHandler {

	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// 行政区划编码
		String regionCode = (String) request.getSession().getAttribute("area_code");
		String cata_id = ParamUtil.getString(request, "cata_id", "0");;
		try {
			// 组织机构列表由之前从数据目录统计表中获得改为从uc中获取
			Map<String, Object> paramMap = new HashMap<String, Object>();
			paramMap.put("region_code", regionCode);
			List<Organization> organizationres = UserUtils.getOrganizationService().getOrganizationList(paramMap);
			Map<String, Object> extentParams = new HashMap<String, Object>();
			// 目录上线状态
			extentParams.put("config_status", "4");
			// 政务数据目录
			extentParams.put("cata_type", "10");
			// 开放目录
			extentParams.put("conf_type", "2");
			List<CatalogTag> cataLogTags = DataUtils.getCatalogTagService().queryCataLogTag(regionCode, null, null,null, "2", 5, extentParams);

			if (cataLogTags != null && cataLogTags.size() > 0) {
				request.setAttribute("cataLogTag", cataLogTags.get(0));
				if (StringUtils.isEmpty(cata_id)) {
					cata_id = String.valueOf(cataLogTags.get(0).getCata_id());
				}
				request.setAttribute("org_code", cataLogTags.get(0).getOrg_code());
			}
			request.setAttribute("cata_id", cata_id);
			request.setAttribute("organizationres", organizationres);

		} catch (DataBaseException e) {
			e.printStackTrace();
		}finally {
			//记录页面访问日志
			AuditLogUtil.addPageVisitAutiLog(request, "关联服务", "");
		}

	}

	public void doGetCatalogTag(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String cata_id = ParamUtil.getString(request, "id", "500047");
		String title = ParamUtil.getString(request, "title", "");
		String subType = ParamUtil.getString(request, "subType", "0");
		String regionCode = (String) request.getSession().getAttribute("area_code");
		// 获取当前页
		int pageSize = ParamUtil.getInteger(request, "pageSize", 10);

		Map<String, Object> extentParams = new HashMap<String, Object>();
		// 目录上线状态
		extentParams.put("config_status", "4");
		// 政务数据目录
		extentParams.put("cata_type", "10");
		// 开放目录
		extentParams.put("conf_type", "2");

		try {
			Map<String, Object> resmap = new HashMap<String, Object>();
			PaginationList<CatalogTag> list = DataUtils.getCatalogTagService().queryCataLogTagbyPage(cata_id,
					regionCode, null, null, title, null, "2", 1, 1, extentParams);
			if (list.getTotalRecord() > 0) {
				List<CatalogTag> subtagList = new ArrayList<CatalogTag>();
				if (list.getRecords().get(0).getTags().size() > 0) {
					int count = 0;
					for (String tag : list.getRecords().get(0).getTags()) {
						if (count < 5) {
							if (0 == Integer.valueOf(subType)) {
								// 全部
								List<CatalogTag> taglist = DataUtils.getCatalogTagService().queryCataLogTag(regionCode,
										null, null, tag, "2", pageSize, extentParams);
								subtagList.addAll(taglist);
							} else if (1 == Integer.valueOf(subType)) {
								// 同部门
								List<CatalogTag> taglist = DataUtils.getCatalogTagService().queryCataLogTag(regionCode,
										null, list.getRecords().get(0).getOrg_code(), tag, "2", pageSize, extentParams);
								subtagList.addAll(taglist);
							} else {
								// 同行业

								/*
								 * List<CataLogTag>
								 * taglist=cataLogTagService.queryCataLogTag(
								 * regionCode, null, null, tag, "4", pageSize);
								 * subtagList.addAll(taglist);
								 */
							}
							count = count + 1;
						}
					}
					Set<CatalogTag> h = new HashSet<CatalogTag>(subtagList);
					subtagList.clear();
					subtagList.addAll(h);
				}
				List<CatalogLK> Lklist = DataUtils.getCatalogTagService().queryCataLogLk(list.getRecords().get(0),
						subtagList, RelnetType.CATALOG_TAG_LK, "50");
				List<CatalogLK> notagLklist = DataUtils.getCatalogTagService().queryCataLogLk(list.getRecords().get(0),
						subtagList, RelnetType.CATALOG_LK, "50");
				resmap.put("root",
						list.getRecords().get(0).getOrg_name() + "-" + list.getRecords().get(0).getCata_title());
				resmap.put("taglist", list.getRecords().get(0).getTags());
				resmap.put("subList", subtagList);
				resmap.put("Lklist", Lklist);
				resmap.put("notagLklist", notagLklist);
			}
			response.getWriter().write(JsonUtils.convertToString(resmap));
		} catch (DataBaseException e) {
			e.printStackTrace();
		}
	}

	public void doGetCatalogTagByPage(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String cata_id = ParamUtil.getString(request, "id", "");
		String title = ParamUtil.getString(request, "title", "");
		String subType = ParamUtil.getString(request, "subType", "0");
		String tag = ParamUtil.getString(request, "tag", "");
		// 获取当前页
		int page = ParamUtil.getInteger(request, "page", 1);
		int pageSize = ParamUtil.getInteger(request, "pageSize", 10);

		Map<String, Object> extentParams = new HashMap<String, Object>();
		// 目录上线状态
		extentParams.put("config_status", "4");
		// 政务数据目录
		extentParams.put("cata_type", "10");
		// 开放目录
		extentParams.put("conf_type", "2");

		String regionCode = (String) request.getSession().getAttribute("area_code");
		try {
			if (StringUtils.isBlank(tag)) {
				PaginationList<CatalogTag> list = DataUtils.getCatalogTagService().queryCataLogTagbyPage(cata_id,
						regionCode, null, null, title, null, "2", 1, 1, extentParams);
				if (list.getTotalRecord() > 0) {
					if (list.getRecords().get(0).getTags().size() > 0) {
						if (0 == Integer.valueOf(subType)) {
							PaginationList<CatalogTag> sublist = DataUtils.getCatalogTagService().queryCataLogTagbyPage(
									null, regionCode, null, null, null, list.getRecords().get(0).getTags(), "2", page,
									pageSize, extentParams);
							response.getWriter().write(JsonUtils.convertToString(sublist));
						} else if (1 == Integer.valueOf(subType)) {
							PaginationList<CatalogTag> sublist = DataUtils.getCatalogTagService().queryCataLogTagbyPage(
									null, regionCode, null, list.getRecords().get(0).getOrg_code(), null,
									list.getRecords().get(0).getTags(), "2", page, pageSize, extentParams);
							response.getWriter().write(JsonUtils.convertToString(sublist));
						} else {
						}
					}
				}
			} else {
				List<String> tags = new ArrayList<String>();
				tags.add(tag);
				PaginationList<CatalogTag> sublist = DataUtils.getCatalogTagService().queryCataLogTagbyPage(null,
						regionCode, null, null, null, tags, "2", page, pageSize, extentParams);
				response.getWriter().write(JsonUtils.convertToString(sublist));
			}
		} catch (DataBaseException e) {
			e.printStackTrace();
		}
	}

	public void doGetCatalogByOrg(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String orgId = ParamUtil.getString(request, "id", "");
		String regionCode = (String) request.getSession().getAttribute("area_code");
		Map<String, Object> extentParams = new HashMap<String, Object>();
		// 目录上线状态
		extentParams.put("config_status", "4");
		// 政务数据目录
		extentParams.put("cata_type", "10");
		// 开放目录
		extentParams.put("conf_type", "2");
		try {
			PaginationList<CatalogTag> sublist = DataUtils.getCatalogTagService().queryCataLogTagbyPage(null,
					regionCode, null, orgId, null, null, "2", 1, 1000, extentParams);
			if (sublist != null) {
				response.getWriter().write(JsonUtils.convertToString(sublist));
			}
		} catch (DataBaseException e) {
			e.printStackTrace();
		}
	}

	public void doGetCatalogTagByTag(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String tag = ParamUtil.getString(request, "tag", "");
		String regionCode = (String) request.getSession().getAttribute("area_code");
		// 获取当前页
		int pageSize = ParamUtil.getInteger(request, "pageSize", 5);

		Map<String, Object> extentParams = new HashMap<String, Object>();
		// 目录上线状态
		extentParams.put("config_status", "4");
		// 政务数据目录
		extentParams.put("cata_type", "10");
		// 开放目录
		extentParams.put("conf_type", "2");

		try {
			Map<String, Object> resmap = new HashMap<String, Object>();
			List<CatalogTag> subList = DataUtils.getCatalogTagService().queryCataLogTag(regionCode, null, null, tag,
					"2", pageSize, extentParams);
			if (subList != null) {
				List<CatalogLK> Lklist = DataUtils.getCatalogTagService().queryCataLogLkByTag(tag, subList,
						RelnetType.CATALOG_TAG_LK, "50");
				resmap.put("root", tag);
				resmap.put("subList", subList);
				resmap.put("Lklist", Lklist);
			}
			response.getWriter().write(JsonUtils.convertToString(resmap));
		} catch (DataBaseException e) {
			e.printStackTrace();
		}
	}

}
