package com.inspur.data.portal.datav2.widget.catalog.detail;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.loushang.internet.view.ViewHandler;

import com.inspur.data.catalog.domain.catalog.CatalogAPI;
import com.inspur.data.catalog.domain.catalog.OpenCatalog;
import com.inspur.utils.DataUtils;
import com.inspur.utils.OamUtils;

/**
 * <br>
 * <strong>Title :</strong> CataRelate.java
 * <br>
 * <strong>Description : </strong>
 * <br>
 * <strong>For Examples :</strong>
 * <br>
 * <strong>Create on : 2017年8月15日 下午7:33:10<br></strong>
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
public class CataRelate implements ViewHandler{
	private static Log log = LogFactory.getLog(CataRelate.class);// 日志
	public void execute(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		try{
			String conf_type="2";
			String cata_id = request.getParameter("cata_id");
			//相关服务
			List<CatalogAPI> cataApi= DataUtils.getCatalogApiService().getCatalogAPI(cata_id, conf_type);
			request.setAttribute("cata_id", cata_id);
			request.setAttribute("cataApi", cataApi);
			List<OpenCatalog> linkCatalogList =  DataUtils.getOpenCatalogService().getRelatedOpenCatalogList (cata_id, 5);
			// 返回相关目录
			request.setAttribute("relatedCatalog", linkCatalogList);
			//相关应用
			List<String> open_service_id = new ArrayList<String>();
			for(CatalogAPI temp:cataApi){
				open_service_id.add(temp.getOpen_service_id());
			}		
			@SuppressWarnings("unchecked")
			List<Map<String,Object>> applyList = OamUtils.getServiceSubscriptionService().getSubscribeServiceAppListByServiceIds(open_service_id);
			List<Map<String,Object>> applyListNew = new ArrayList<Map<String,Object>>();
			if(applyList.size()>10){
				for(int i=0;i<10;i++){
					applyListNew.add(applyList.get(i));
				}
				request.setAttribute("applyList", applyListNew);
			}else{
				request.setAttribute("applyList", applyList);
			}
			
		}catch(Exception e){
			log.error(e, e);
		}
	}
}
