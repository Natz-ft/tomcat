package com.inspur.data.portal.widget.rightComment;

/*
 * @FileName: [DownloadList.java] 
 * @Package com.inspur.data.portal.jn.widget.rightComment 
 * 
 * 
 * Copyright (c) 2011-2015 INSPUR Technology Limited Com.
 * All rights reserved.
 * 
 * This software is the confidential and proprietary 
 * information of INSPUR Technology Limited Company
 * ("Confidential Information"). You shall not disclose 
 * such Confidential Information and shall use it only
 * in accordance with the terms of the contract agreement 
 * you entered into with RKY.
 * 
 * $Rev$
 * $LastChangedDate$
 * $LastChangedBy$
 * 
 * @category inspur
 * @version 1.1
 * @author <a href="mailto:zhang_hy@inspur.com">张华蕴</a>
 *
 * Change History:[Formatter: author date description] <br/>
 * 1
 * 2
 * 3
*/


import java.io.IOException;
import java.util.HashMap;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.loushang.internet.view.ViewHandler;

import com.inspur.data.catalog.domain.catalog.OpenCatalog;
import com.inspur.data.common.web.PaginationList;
import com.inspur.utils.DataUtils;

/**
 * 页面右侧公共下载排行列表<br/>
 * <p>
 * Description:<br/>
 * <p>
 *
 * <p>
 * For Examples <br/>
 * 
 * <PRE>
 *      TODO 代码使用示例
 * </PRE>
 * <p>
 */
public class DownloadList implements ViewHandler {
	private static Log log = LogFactory.getLog(DownloadList.class);
	public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try {
			// 获取地市编码
			String regionCode = (String) request.getSession().getAttribute("area_code");
			//开放状态
			 String status = "4";
			 //排序方式
			 String _order = "s.use_file_count desc";
			 HashMap<String, Object> extentParams = new HashMap<String, Object>();
			// 目录上线状态
			extentParams.put("config_status", "4");
			// 政务数据目录
			extentParams.put("cata_type", "10");//只考虑政务目录
			// 开放目录
			extentParams.put("conf_type", "2");
			extentParams.put("_order", "s.use_file_count desc");
			int pageNum =1 ;
			int pageSize = 10;
			//  获得数据目录下载排行
			PaginationList<OpenCatalog> result = DataUtils.getOpenCatalogService().queryOpenCataLogByPage(null, null, regionCode, null, null, null, status, _order, extentParams, pageNum, pageSize);
			List<OpenCatalog> dataCatalogDownloadPageList = result.getRecords();
			if (null != dataCatalogDownloadPageList && !dataCatalogDownloadPageList.isEmpty() && dataCatalogDownloadPageList.size() > 0) {
				request.setAttribute("dataCatalogDownloadPageList", dataCatalogDownloadPageList);
			}
		} catch (Exception e) {
			log.error(e);
			e.printStackTrace();
		}
	}

}
