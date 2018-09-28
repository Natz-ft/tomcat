package com.inspur.data.portal.screen.changeCity;

import java.io.IOException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.StringUtils;
import org.loushang.internet.util.CookieUtil;
import org.loushang.internet.util.JsonUtils;
import org.loushang.internet.util.filter.SecurityUtil;
import org.loushang.internet.view.ViewHandler;

import com.inspur.data.common.exception.DataBaseException;
import com.inspur.data.common.exception.InvalidParametersException;
import com.inspur.data.common.utils.PropertiesUtils;
import com.inspur.data.common.web.PaginationList;
import com.inspur.data.common.web.ParamUtil;
import com.inspur.data.statistic.domain.organization.CataLogRegionStatistics;
import com.inspur.hsf.config.ServiceFactory;
import com.inspur.uc.api.organization.RegionInfo;
import com.inspur.uc.api.organization.RegionInfoService;
import com.inspur.uc.api.system.RegionInfoNotExistException;
import com.inspur.utils.AuditLogUtil;
import com.inspur.utils.DataUtils;
import com.inspur.utils.UCUtil;
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

	/**
	 * 直辖市region_code
	 */
	private final String city = "11,12,50,31";

	public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try {
			//先取session中的值 设置当前所在站
			String default_site_code = (String) request.getSession().getAttribute("area_code");
			String default_domain_key = "jns";
			RegionInfo reg = regionInfoService.getRegionInfo(default_site_code,null);
			if(reg!=null && reg.getAbbr()!=null){
				default_domain_key = reg.getAbbr();
			}
			if (StringUtils.isEmpty(default_site_code)) {
				default_site_code = PropertiesUtils.getValue("conf.properties", "global.default_site_code");
				RegionInfo region = regionInfoService.getRegionInfo(default_site_code,null);
				if(region!=null){
					default_domain_key = region.getAbbr();
				}
			}
			CataLogRegionStatistics regionStatistics = DataUtils.getCataLogRegionStatisticsService()
					.getRegionInfoFromCache(null, "2", default_domain_key);

			PaginationList<CataLogRegionStatistics> regionInfoPageList = new PaginationList<CataLogRegionStatistics>();

			if (regionStatistics != null) {
				regionInfoPageList = DataUtils.getCataLogRegionStatisticsService().queryRegionInfoByPageFromCache(null,
						"2", regionStatistics.getParent_code(), "2", 1, 100);
			} else {
				regionInfoPageList = DataUtils.getCataLogRegionStatisticsService().queryRegionInfoByPageFromCache(null,
						"2", null, "2", 1, 100);
			}

			int max_data_amount = DataUtils.getCataLogRegionStatisticsService().getMaxRegionDataFromCache(null, "2",
					null, "2", "cata");
			int data_amount = 0;
			if (null != regionInfoPageList && !regionInfoPageList.getRecords().isEmpty()) {
				request.setAttribute("cityList", regionInfoPageList.getRecords());
				int num = 1;
				for (CataLogRegionStatistics r : regionInfoPageList.getRecords()) {
					data_amount = data_amount + r.getCata_amount();
					num = num + 1;
				}
			}
			if ("china" != default_domain_key) {

				request.setAttribute("default_region", regionStatistics);
			}
			request.setAttribute("data_amount", data_amount);
			request.setAttribute("max_data_amount", max_data_amount);
		} catch (DataBaseException e) {
			e.printStackTrace();
		} catch (RegionInfoNotExistException e) {
			e.printStackTrace();
		} catch (InvalidParametersException e) {
			e.printStackTrace();
		} finally {
			//记录页面访问日志
			AuditLogUtil.addPageVisitAutiLog(request, "切换城市", "");
		}
	}

	/**
	 * 查询全国站点信息，展现全国地图 <br>
	 * <p>
	 * Description: <br>
	 * <a href=mailto:miaozhq@inspur.com></a><br> <p>Date: 2017年3月1日
	 * 下午3:07:42<br/> <p>
	 * 
	 * @param request
	 * @param response
	 * @see void
	 */
	public void doQueryAllCity(HttpServletRequest request, HttpServletResponse response) {
		try {
			List<CataLogRegionStatistics> regionList = DataUtils.getCataLogRegionStatisticsService()
					.queryRegionInfoByParam(null, "2", "0", "1");
			HashMap<String, Object> param = new HashMap<String, Object>();
			param.put("parent_code", 0);
			List<RegionInfo> Info=UserUtils.getRegionInfoService().getRegionInfoByparam(param);
		    List<Map<String, Object>> cityList = new ArrayList<Map<String, Object>>();
			if (null != Info && !Info.isEmpty() && Info.size() > 0) {
				for (RegionInfo Infom : Info) {
					Map<String, Object> paramMap = new HashMap<String, Object>();
					paramMap.put("name", convertRegionName(Infom.getRegion_name()));
					paramMap.put("id", Infom.getRegion_code());
				    for (CataLogRegionStatistics regInfo : regionList) {
						if(regInfo.getRegion_code().equals(Infom.getRegion_code()))
						{
							paramMap.put("value", regInfo.getCata_amount());
							break;
						}
					}
					cityList.add(paramMap);
				}
			}
			if (null != cityList && !cityList.isEmpty() && cityList.size() > 0) {
				try {
					response.getWriter().write(JsonUtils.convertToString(cityList));
				} catch (IOException e) {
					e.printStackTrace();
				}
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 根据省或市的简称，获取省市城市列表，展示省或者地级市 <br>
	 * <p>
	 * Description: <br>
	 * <a href=mailto:miaozhq@inspur.com></a><br> <p>Date: 2017年3月1日
	 * 下午3:29:27<br/> <p>
	 * 
	 * @param request
	 * @param response
	 * @see void
	 */
	public void doQueryCityByParam(HttpServletRequest request, HttpServletResponse response) {
		try {
			String region_code = ParamUtil.get(request, "region_code", "");
			Map<String, Object> resultMap = new HashMap<String, Object>();
			List<Map<String, Object>> resultList = new ArrayList<Map<String, Object>>();
			String regionName = "";
			HashMap<String, Object> paramMap1 = new HashMap<String, Object>();
			paramMap1.put("region_code",region_code );
			List<RegionInfo> reInfolist=UserUtils.getRegionInfoService().getRegionInfoByparam(paramMap1);
			RegionInfo regioninfo = reInfolist.get(0);
			if (null != regioninfo) {
				String parent_code = regioninfo.getParent_code();
				if (!"0".equals(parent_code)) {
					// 说明站点为省下级地市站点，查询所属省所有地市，展示该省地图
					HashMap<String, Object> param = new HashMap<String, Object>();
					param.put("parent_code",region_code );
					List<RegionInfo> Info=UserUtils.getRegionInfoService().getRegionInfoByparam(param);
					List<CataLogRegionStatistics> regionList = DataUtils.getCataLogRegionStatisticsService()
					      .queryRegionInfoByParam(null, "2", parent_code, "2");
					if (null != Info && !Info.isEmpty() && Info.size() > 0) {
						for (RegionInfo Infom : Info) {
							Map<String, Object> paramMap = new HashMap<String, Object>();
							paramMap.put("name", convertRegionName(Infom.getRegion_name()));
							paramMap.put("id", Infom.getRegion_code());
						    for (CataLogRegionStatistics regInfo : regionList) {
								if(regInfo.getRegion_code().equals(Infom.getRegion_code()))
								{
									paramMap.put("value", regInfo.getCata_amount());
									break;
								}
							}
							resultList.add(paramMap);
						}
					}
					CataLogRegionStatistics region = DataUtils.getCataLogRegionStatisticsService()
							.getRegionInfoFromCache(parent_code, "2", "");

					regionName = region.getRegion_name();
					regionName = convertRegionName(regionName);
				} else {
					// 省属站点，或者直辖市站点
					if (city.indexOf(region_code) > 0) {
						// 直辖市，查询直辖市下级下级的区域，展现直辖市地图
						region_code=(region_code+"01");
						List<CataLogRegionStatistics> regionList = DataUtils.getCataLogRegionStatisticsService()
								.queryRegionInfoByParam(null, "2", region_code, "2");
						HashMap<String, Object> param = new HashMap<String, Object>();
						param.put("parent_code",region_code);
						List<RegionInfo> Info=UserUtils.getRegionInfoService().getRegionInfoByparam(param);
						if (null != Info && !Info.isEmpty() && Info.size() > 0) {
							for (RegionInfo Infom : Info) {
								Map<String, Object> paramMap = new HashMap<String, Object>();
								paramMap.put("name", convertRegionName(Infom.getRegion_name()));
								paramMap.put("id", Infom.getRegion_code());
							    for (CataLogRegionStatistics regInfo : regionList) {
									if(regInfo.getRegion_code().equals(Infom.getRegion_code()))
									{
										paramMap.put("value", regInfo.getCata_amount());
										break;
									}
								}
								resultList.add(paramMap);
							}
						}
						regionName = regioninfo.getRegion_name();
						regionName = convertRegionName(regionName);
					} else {
						// 省级站点
						List<CataLogRegionStatistics> regionList = DataUtils.getCataLogRegionStatisticsService()
								.queryRegionInfoByParam(null, "2", region_code, "2");
						HashMap<String, Object> param = new HashMap<String, Object>();
						param.put("parent_code",region_code);
						List<RegionInfo> Info=UserUtils.getRegionInfoService().getRegionInfoByparam(param);
						if (null != Info && !Info.isEmpty() && Info.size() > 0) {
							for (RegionInfo Infom : Info) {
								Map<String, Object> paramMap = new HashMap<String, Object>();
								paramMap.put("name", Infom.getRegion_name());
								paramMap.put("id", Infom.getRegion_code());
							    for (CataLogRegionStatistics regInfo : regionList) {
									if(regInfo.getRegion_code().equals(Infom.getRegion_code()))
									{
										paramMap.put("value", regInfo.getCata_amount());
									    break;
									}
								}
								resultList.add(paramMap);
							}
						}

						regionName = regioninfo.getRegion_name();
						regionName = convertRegionName(regionName);
					}
				}

				resultMap.put("regionList", resultList);
				resultMap.put("regionName", regionName);
				response.getWriter().write(JsonUtils.convertToString(resultMap));
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 处理省市名称，便于地图展现 <br>
	 * <p>
	 * Description: <br>
	 * <a href=mailto:miaozhq@inspur.com></a><br> <p>Date: 2017年3月1日
	 * 下午7:31:48<br/> <p>
	 * 
	 * @param region_name
	 * @return
	 * @see String
	 */
	private String convertRegionName(String region_name) {
		String regionName = region_name.replace("省", "");
		regionName = regionName.replace("市", "");
		if (regionName.contains("新疆")) {
			regionName = "新疆";
		}
		if (regionName.contains("广西")) {
			regionName = "广西";
		}
		if (regionName.contains("宁夏")) {
			regionName = "宁夏";
		}
		if (regionName.contains("内蒙古")) {
			regionName = "内蒙古";
		}
		if (regionName.contains("西藏")) {
			regionName = "西藏";
		}
		return regionName;
	}

	/**
	 * 切换城市右侧城市展现，搜索展现 <br>
	 * <p>
	 * Description: <br>
	 * <a href=mailto:miaozhq@inspur.com></a><br> <p>Date: 2017年3月2日
	 * 上午9:32:58<br/> <p>
	 * 
	 * @param request
	 * @param response
	 * @see void
	 */
	public void doGetCityList(HttpServletRequest request, HttpServletResponse response) {
		try {
			String region_code = ParamUtil.get(request, "region_code", "");
			String region_name = ParamUtil.get(request, "region_name", "");

			PaginationList<CataLogRegionStatistics> regionInfoPageList = DataUtils.getCataLogRegionStatisticsService()
					.queryRegionInfoByPageFromCache(region_name, "2", region_code, "2", 1, 100);
			
			if (null != regionInfoPageList && !regionInfoPageList.getRecords().isEmpty()) {
				response.getWriter().write(JsonUtils.convertToString(regionInfoPageList.getRecords()));
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 进入某个地市 <br>
	 * <p>
	 * Description: <br>
	 * <a href=mailto:miaozhq@inspur.com></a><br> <p>Date: 2017年3月1日
	 * 下午3:32:24<br/> <p>
	 * 
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 * @see void
	 */
	public void doEnterCity(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String cityName = ParamUtil.getString(request, "cityName", "");
		HttpSession session = request.getSession();
		RegionInfo result = regionInfoService.getRegionInfoByName(cityName);
		if (result != null) {
			response.getWriter().write(JsonUtils.convertToString("success"));
			session.setAttribute("regionStatistics", result);
			session.setAttribute("area_code", result.getRegion_code());
			CookieUtil.addCookie(response, "sub_domain_cokie",URLEncoder.encode(SecurityUtil.jiami(result.getRegion_code()), "utf-8"), 0);
			String cookieDomain = UCUtil.getCookieDomain();
			UCUtil.setCookie("region_name", result.getRegion_name(), -1, "/", cookieDomain,response);
		} else {
			response.getWriter().write(JsonUtils.convertToString("false"));
		}
	}
}
