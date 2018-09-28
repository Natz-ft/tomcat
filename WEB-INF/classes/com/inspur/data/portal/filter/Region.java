package com.inspur.data.portal.filter;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;

import com.inspur.data.common.exception.DataBaseException;
import com.inspur.data.common.exception.InvalidParametersException;
import com.inspur.data.portal.filter.region.IRegion;
import com.inspur.hsf.config.ServiceFactory;
import com.inspur.uc.api.organization.RegionInfo;
import com.inspur.uc.api.organization.RegionInfoService;
import com.inspur.uc.api.system.RegionInfoNotExistException;
import com.inspur.utils.UCUtil;

public class Region implements IRegion {
	private static RegionInfoService regionInfoService;
	private static Logger log = Logger.getLogger(Region.class);
	static{
		try{
			if(regionInfoService==null){
				regionInfoService = (RegionInfoService) ServiceFactory.getService("regionInfoService");
			}
		}catch(Exception e){
			log.error("初始化行政区划Service模块失败", e);
			e.printStackTrace();
		}
	}
	
	public String getRegionCode(String site_abbr_cookie,String site_abbr, HttpSession session,HttpServletResponse response) {
		boolean reload = false;
		if(StringUtils.isNotBlank(site_abbr)&&StringUtils.isNotBlank(site_abbr_cookie)){
			if(site_abbr.equals(site_abbr_cookie)){
				if(session.getAttribute("regionStatistics")!=null){
					RegionInfo regionStatistics = (RegionInfo) session.getAttribute("regionStatistics");
					session.setAttribute("area_code", regionStatistics.getRegion_code());
					return regionStatistics.getRegion_name();
				}else{
					reload = true;
				}
			}else{
				reload = true;
			}
		}else if(StringUtils.isNotBlank(site_abbr_cookie)){
			if(session.getAttribute("regionStatistics")!=null){
				RegionInfo regionStatistics = (RegionInfo) session.getAttribute("regionStatistics");
				session.setAttribute("area_code", regionStatistics.getRegion_code());
				return regionStatistics.getRegion_name();
			}else{
				site_abbr = site_abbr_cookie;
				reload = true;
			}
		}
		if(StringUtils.isNotBlank(site_abbr)&&reload){
			try {
				RegionInfo region = regionInfoService.getRegionInfo(site_abbr);
				if(region!=null){
					session.setAttribute("regionStatistics", region);
					session.setAttribute("area_code", region.getRegion_code());
					return region.getRegion_name();
				}
			} catch (DataBaseException e) {
				e.printStackTrace();
			} catch (RegionInfoNotExistException e) {
				e.printStackTrace();
			} catch (InvalidParametersException e) {
				e.printStackTrace();
			}
		}
		return null;
	}

	public boolean clearRegion(HttpSession session) {
		session.removeAttribute("regionStatistics");
		session.removeAttribute("area_code");
		return false;
	}

	public String loadDefaultRegion(String default_domain_key,HttpSession session) {
		try {
			if(session.getAttribute("regionStatistics")!=null){
				RegionInfo regionStatistics = (RegionInfo) session.getAttribute("regionStatistics");
				session.setAttribute("area_code", regionStatistics.getRegion_code());
				return regionStatistics.getRegion_name();
			}else{
				RegionInfo region = regionInfoService.getRegionInfo(default_domain_key,null);
				if(region!=null){
					session.setAttribute("regionStatistics", region);
					session.setAttribute("area_code", region.getRegion_code());
					return region.getRegion_name();
				}
			}
		} catch (DataBaseException e) {
			e.printStackTrace();
		} catch (RegionInfoNotExistException e) {
			e.printStackTrace();
		} catch (InvalidParametersException e) {
			e.printStackTrace();
		}
		return default_domain_key;
	}

}
