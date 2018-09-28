package com.inspur.data.portal.datav2.widget.catalog.detail;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.loushang.internet.view.ViewHandler;

import com.inspur.data.catalog.domain.catalog.CatalogFile;
import com.inspur.data.catalog.domain.catalog.OpenCatalog;
import com.inspur.data.exchange.service.file.CatalogDownloadLogService;
import com.inspur.dataview.utils.StringUtils;
import com.inspur.hsf.config.ServiceFactory;
import com.inspur.uc.api.organization.Organization;
import com.inspur.utils.DataUtils;
import com.inspur.utils.UserUtils;

/**
 * <br>
 * <strong>Title :</strong> CataFile.java
 * <br>
 * <strong>Description : </strong>
 * <br>
 * <strong>For Examples :</strong>
 * <br>
 * <strong>Create on : 2017年8月15日 下午3:18:01<br></strong>
 * <p>
 * <strong>Copyright (C) Inspur Co.,Ltd.<br></strong>
 * <p>
 * @author Payne<br>
 * @version <strong>V1.0</strong>
 * <PRE>
 * </PRE>
 * -------------------------------------------<br>
 * Change History:[Formatter: author date description] <br/>
 * 1<br>
 * 2<br>
 * 3<br>
 */
public class CataFile implements ViewHandler{
	private static Log log = LogFactory.getLog(CataFile.class);// 日志
	
	/*private static CatalogDownloadLogService catalogDownloadLogService = (CatalogDownloadLogService) ServiceFactory
			.getService("catalogDownloadLogService");*/
	
	public void execute(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		try{
			//相关文件
			String cata_id = request.getParameter("cata_id");
			String conf_type="2";
			String file_typs="3";
			List<OpenCatalog> relatedOpenCatalog = DataUtils.getOpenCatalogService().getRelatedOpenCatalogList(cata_id, 10);
			String related_ids = "";
			for(OpenCatalog temp:relatedOpenCatalog){
				related_ids += temp.getCata_id() + ",";
			}
			if(StringUtils.isNotEmpty(related_ids)){
				related_ids = related_ids.substring(0, related_ids.length()-1);
			}
			List<CatalogFile> catalogFiles = DataUtils.getCatalogFileService().getCatalogFile(related_ids, conf_type, file_typs);
			request.setAttribute("catalogFiles", catalogFiles);
			//热门文件
			List<CatalogFile> Files = DataUtils.getCatalogFileService().getCatalogFile(null,conf_type, null);
			List<Map<String,Object>> hotFiles =new ArrayList<Map<String,Object>>(); 
			for (CatalogFile catalogFile : Files) {
				CatalogFile file=DataUtils.getCatalogFileService().getCatalogFileById(catalogFile.getFileId());
				Map<String,Object> hotmap=new HashMap<String,Object>();
				hotmap.put("file_name",file.getFileName());
				hotmap.put("cata_title",file.getCatalogName());
				hotmap.put("org_name","");
				hotmap.put("num",file.getDownloadCount());
				hotFiles.add(hotmap);
			}
			hotFiles=order(hotFiles);
			request.setAttribute("hotFiles", hotFiles);
		}catch(Exception e){
			log.error(e, e);
		}
	}
	
	public  List<Map<String,Object>> order(List<Map<String,Object>> orderlist){
		if(orderlist!=null&&orderlist.size()>1){
		Collections.sort(orderlist, new Comparator<Map<String, Object>>(){  
	           public int compare(Map<String, Object> o1, Map<String, Object> o2) {  
	            int seq1 = Integer.parseInt(o1.get("num").toString());  
	            int seq2 = Integer.parseInt(o2.get("num").toString());      
	            if(seq1<seq2)
	    		{
	    			return 1;
	    		}
	    		if(seq1>seq2)
	    		{
	    			return -1;
	    		}
	    		return 0;     
	       }  
	       });
		//展示前四条
		if(orderlist.size()>5){
			orderlist=orderlist.subList(0,4);
		}
		}
		return orderlist;
}
}
