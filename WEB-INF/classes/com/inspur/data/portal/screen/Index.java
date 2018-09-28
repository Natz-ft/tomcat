package com.inspur.data.portal.screen;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.exception.ExceptionUtils;
import org.loushang.internet.util.JsonUtils;
import org.loushang.internet.view.ViewHandler;

import com.inspur.data.common.utils.MapUtils;
import com.inspur.data.common.utils.PropertiesUtils;
import com.inspur.data.common.utils.StringUtils;
import com.inspur.data.common.web.ParamUtil;
import com.inspur.data.logger.SystemLogger;
import com.inspur.data.od.model.catalog.CataLogGroup;
import com.inspur.data.statistic.domain.catalog.CataLogGroupStatistics;
import com.inspur.data.statistic.domain.organization.CataLogRegionStatistics;
import com.inspur.hsf.config.ServiceFactory;
import com.inspur.paas.util.PageData;
import com.inspur.uc.api.organization.Organization;
import com.inspur.uc.api.organization.RegionInfo;
import com.inspur.uc.api.organization.RegionInfoService;
import com.inspur.utils.ConfUtil;
import com.inspur.utils.DataUtils;
import com.inspur.utils.OamUtils;
import com.inspur.utils.UserUtils;

public class Index implements ViewHandler {
	
	private static RegionInfoService regionInfoService;
	static{
		try{
			if(regionInfoService==null){
				regionInfoService = (RegionInfoService) ServiceFactory.getService("regionInfoService");
			}
		}catch(Exception e){
			e.printStackTrace();
		}
	}

	public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try {
			// 登录是否启用login_salt，性能测试时，可不启用。(1,启用，0,不启用)
			String is_enable_login_salt = PropertiesUtils.getValue("conf.properties", "is_enable_login_salt");
			if ("1".equals(is_enable_login_salt)) {
				String login_salt = ConfUtil.getRandom(6);
				HttpSession session = request.getSession();
				session.setAttribute("login_salt", login_salt);
				request.setAttribute("login_salt", login_salt);
			}
			// 获取地市编码
			String regionCode = (String) request.getSession().getAttribute("area_code");

			// 获取数据主题
			Map<String, Object> groupMap = new HashMap<String, Object>();
			// 站点过滤
			groupMap.put("site_code", regionCode);
			// 只获取一级主题
			groupMap.put("parent_id", "0");
			groupMap.put("group_type","10");
			groupMap.put("_order", " order_id ");
			
			List<CataLogGroup> resGroup = DataUtils.getCataLogGroupService().getAllCataLogGroup(groupMap);
			//行业列表
			groupMap.put("group_type", "20");
			List<CataLogGroup> instrGroup = DataUtils.getCataLogGroupService().getAllCataLogGroup(groupMap);
			request.setAttribute("instrGroup", instrGroup);
			
			//获取一级部门
			Map orgMap = new HashMap();
			orgMap.put("region_code", regionCode);
			orgMap.put("organ_type", "21");
			orgMap.put("organRoot", "1");
			orgMap.put("_order", "u.seq ASC");
			List<Organization> orgList = UserUtils.getOrganizationService().getOrganizationAll(orgMap);
			request.setAttribute("orgList", orgList);

			// 循环处理得到每个分组的catalogcount
			Map<String, Object> group = new HashMap<String, Object>();
			List<Map<String, Object>> res = new ArrayList<Map<String, Object>>();
			for (CataLogGroup temp : resGroup) {
				if (temp != null && temp.getId() != null) {
					group = MapUtils.objectToMap(temp);
					//主题ID
					String group_code = temp.getId();
					//行政区划
					String region_code = regionCode;
					//统计类型
					String statistics_type = "'1','3'";
					//受众类型
					String audience_type = "2";
					//主题分类
					String group_type = "10";
					List<CataLogGroupStatistics> resultList = DataUtils.getCataLogGroupStatisticsService().getCataLogGroupStatisticsList(group_code, region_code,"",
							"", statistics_type, audience_type, group_type);
					if(null != resultList && resultList.size() > 0 ) {
						group.put("amount", resultList.get(0).getCata_amount());
					}else{
						group.put("amount", 0);
					}
					res.add(group);
				}
			}
			request.setAttribute("resGroup", res);

			// 获取有开放目录的部门数量
			Map<String, Object> countparam = new HashMap<String, Object>();
			countparam.put("region_code", regionCode);
			countparam.put("statistics_types", "'1','3'");
			countparam.put("audience_type", "2");
			countparam.put("provide_cata_amount_not_null", 1);
			int orgCount = DataUtils.getCataLogOrgStatisticsService().getCataLogOrgStatisticsCount(countparam);
			request.setAttribute("orgCount", orgCount);
			
			// 查询数据目录浏览总量，下载总量，数据量总数
			int cataDownCount = 0; // 下载总量
			int cataViewCount = 0; // 浏览总量
			int cataDataCount = 0; // 数据量
			int open_catalog_num = 0;// 获取数据目录总数
			int fileCount = 0;// 数据文件
			int apiCount = 0;// api数量
			
			RegionInfo region = regionInfoService.getRegionInfo(regionCode,null);
			String region_abbr = "jns";
			if(region!=null){
				region_abbr = region.getAbbr();
			}
			CataLogRegionStatistics cataLogRegionStatistics = DataUtils.getCataLogRegionStatisticsService()
					.getRegionInfoFromCache(regionCode, "2", region_abbr);
			if (null != cataLogRegionStatistics) {
				cataViewCount = cataLogRegionStatistics.getUse_cata_amount();
				cataDownCount = cataLogRegionStatistics.getUse_file_amount();
				cataDataCount = cataLogRegionStatistics.getData_amount();
				open_catalog_num = cataLogRegionStatistics.getCata_amount();
				fileCount = cataLogRegionStatistics.getFile_amount();
				apiCount = cataLogRegionStatistics.getApi_amount();
			}
			
			int appCount = OamUtils.getServiceStatisticDayService().getOrgStatisticsAppCount(null);

			request.setAttribute("cataDownCount", cataDownCount);
			request.setAttribute("cataViewCount", cataViewCount);
			request.setAttribute("cataDataCount", cataDataCount);
			request.setAttribute("catalogCount", open_catalog_num);
			request.setAttribute("fileCount", fileCount);
			request.setAttribute("apiCount", apiCount);
			request.setAttribute("appCount", appCount);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 手机端APP调用 <br>
	 * <p>
	 * Description: <br>
	 * <a href=mailto:miaozhq@inspur.com></a><br> <p>Date: 2017年3月13日
	 * 下午3:26:21<br/> <p>
	 * 
	 * @param request
	 * @param response
	 * @see void
	 */
	public void doGetDataCount(HttpServletRequest request, HttpServletResponse response) {
		try {
			// 获取地市编码
			String regionCode = (String) request.getSession().getAttribute("area_code");
			if(StringUtils.isBlank(regionCode) || StringUtils.isEmpty(regionCode)){
				regionCode = ParamUtil.getString(request, "regionCode");
			}
			// 获取有开放目录的部门数量
			Map<String, Object> countparam = new HashMap<String, Object>();
			countparam.put("region_code", regionCode);
			countparam.put("statistics_type", 4);
			countparam.put("audience_type", "2");
			int orgCount = DataUtils.getCataLogOrgStatisticsService().getCataLogOrgStatisticsCount(countparam);

			// 查询数据目录浏览总量，下载总量，数据量总数
			int cataDownCount = 0; // 下载总量
			int cataViewCount = 0; // 浏览总量
			int cataDataCount = 0; // 数据量
			int open_catalog_num = 0;// 获取数据目录总数
			int fileCount = 0;// 数据文件
			int apiCount = 0;// api数量

			String region_code = PropertiesUtils.getValue("conf.properties", "global.default_site_code");
			RegionInfo region = regionInfoService.getRegionInfo(region_code,null);
			String region_abbr = "jns";
			if(region!=null){
				region_abbr = region.getAbbr();
			}
			CataLogRegionStatistics cataLogRegionStatistics = DataUtils.getCataLogRegionStatisticsService()
					.getRegionInfoFromCache(regionCode, "2", region_abbr);
			if (null != cataLogRegionStatistics) {
				cataViewCount = cataLogRegionStatistics.getUse_cata_amount();
				cataDownCount = cataLogRegionStatistics.getUse_file_amount();
				cataDataCount = cataLogRegionStatistics.getData_amount();
				open_catalog_num = cataLogRegionStatistics.getCata_amount();
				fileCount = cataLogRegionStatistics.getFile_amount();
				apiCount = cataLogRegionStatistics.getApi_amount();
			}

			Map<String, Object> ret = new HashMap<String, Object>();
			//数据集数量
			ret.put("cataDataCount", cataDataCount);
			//目录总量
			ret.put("catalogCount", open_catalog_num);
			//部门数量
			ret.put("orgCount", orgCount);
			//目录访问量
			ret.put("cataViewCount", cataViewCount);
			//目录下载量
			ret.put("cataDownCount", cataDownCount);
			//文件数量
			ret.put("fileCount", fileCount);
			//API数量
			ret.put("apiCount", apiCount);
			response.getWriter().write(JsonUtils.convertToString(ret));
		} catch (Exception ex) {
			SystemLogger.error("Index", "获取doGetRecord失败", ExceptionUtils.getStackTrace(ex));
		}
	}

	/**
	 * 手机端APP调用 <br>
	 * <p>
	 * Description: <br>
	 * <a href=mailto:miaozhq@inspur.com></a><br> <p>Date: 2017年3月13日
	 * 下午3:31:35<br/> <p>
	 * 
	 * @param request
	 * @param response
	 * @see void
	 */
	public void doGetRecord(HttpServletRequest request, HttpServletResponse response) {
		try {
			String regionCode = (String) request.getSession().getAttribute("area_code");
			if(StringUtils.isBlank(regionCode) || StringUtils.isEmpty(regionCode)){
				regionCode = ParamUtil.getString(request, "regionCode");
			}
			List<Map<String, Object>> tagInfos = DataUtils.getTagInfoService().getHotLabelList(regionCode, 5);
			// 热门标签（基础标签）
			request.setAttribute("tagInfos", tagInfos);
			response.getWriter().write(JsonUtils.convertToString(tagInfos));
		} catch (Exception ex) {
			SystemLogger.error("Index", "获取doGetRecord失败", ExceptionUtils.getStackTrace(ex));
		}
	}

	/**
	 * 手机端APP调用 <br>
	 * <p>
	 * Description: <br>
	 * <a href=mailto:miaozhq@inspur.com></a><br> <p>Date: 2017年3月13日
	 * 上午11:49:23<br/> <p>
	 * 
	 * @param request
	 * @param response
	 * @see void
	 */
	public void doGetGroupForApp(HttpServletRequest request, HttpServletResponse response) {
		try {
			// 获取地市编码
			String regionCode = (String) request.getSession().getAttribute("area_code");
			if(StringUtils.isBlank(regionCode) || StringUtils.isEmpty(regionCode)){
				regionCode = ParamUtil.getString(request, "regionCode");
			}
			// 获取数据主题
			Map<String, Object> groupMap = new HashMap<String, Object>();
			// 站点过滤
			groupMap.put("site_code", regionCode);
			// 只获取一级主题
			groupMap.put("parent_id", "0");
			// 获取数据主题
			List<CataLogGroup> resGroup = DataUtils.getCataLogGroupService().getAllCataLogGroup(groupMap);
			request.setAttribute("resGroup", resGroup);
			response.getWriter().write(JsonUtils.convertToString(resGroup));
		} catch (Exception ex) {
			SystemLogger.error("Index", "获取doGetGroupForApp失败", ExceptionUtils.getStackTrace(ex));
		}
	}

}
