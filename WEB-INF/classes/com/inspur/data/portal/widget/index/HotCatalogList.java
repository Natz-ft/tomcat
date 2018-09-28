package com.inspur.data.portal.widget.index;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.loushang.internet.view.ViewHandler;

import com.inspur.data.catalog.domain.catalog.OpenCatalog;
import com.inspur.utils.DataUtils;

/**
 * 热门数据目录
 */
public class HotCatalogList implements ViewHandler {
	public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try {
			// 获取地市编码
			String regionCode = (String) request.getSession().getAttribute("area_code");
			// 获得数据目录下载排行
	List<OpenCatalog> result = DataUtils.getOpenCatalogService().getOpenCataLogRankingList(regionCode, null,
			null,null, "s.use_file_count desc", 8 );
	List<OpenCatalog> catalogDownloadPageList = new ArrayList<OpenCatalog>() ;
	if(null != result && result.size() > 0) {
		for (OpenCatalog openCatalog : result) {
			if(openCatalog.getCata_id()!=null){
				openCatalog.setCata_id(openCatalog.getCata_id());
			}
			if(openCatalog.getCata_logo()!=null){
				openCatalog.setCata_logo(openCatalog.getCata_logo());
			}
			if(openCatalog.getOrg_name()!=null){
				openCatalog.setOrg_name(openCatalog.getOrg_name());
			}
			if(openCatalog.getCata_title()!=null){
				openCatalog.setCata_title(openCatalog.getCata_title());
			}
			catalogDownloadPageList.add(openCatalog);
		}
	}
	if (null != catalogDownloadPageList && !catalogDownloadPageList.isEmpty() && catalogDownloadPageList.size() > 0) {
		request.setAttribute("hotCatalogList", catalogDownloadPageList);
	}
	
	//获取最新目录
	List<OpenCatalog> newresult = DataUtils.getOpenCatalogService().getOpenCataLogRankingList(regionCode, null,
			null,null, "c.update_time desc", 8 );
	List<OpenCatalog> catalogNewPageList = new ArrayList<OpenCatalog>() ;
	if(null != newresult && newresult.size() > 0) {
		for (OpenCatalog openCatalog : newresult) {
			if(openCatalog.getCata_id()!=null){
				openCatalog.setCata_id(openCatalog.getCata_id());
			}
			if(openCatalog.getCata_logo()!=null){
				openCatalog.setCata_logo(openCatalog.getCata_logo());
			}
			if(openCatalog.getOrg_name()!=null){
				openCatalog.setOrg_name(openCatalog.getOrg_name());
			}
			if(openCatalog.getCata_title()!=null){
				openCatalog.setCata_title(openCatalog.getCata_title());
			}
			catalogNewPageList.add(openCatalog);
		}
	}
	if (null != catalogNewPageList && !catalogNewPageList.isEmpty() && catalogNewPageList.size() > 0) {
		request.setAttribute("newCatalogList", catalogNewPageList);
	}
} catch (Exception e) {
	e.printStackTrace();
}
}

}
