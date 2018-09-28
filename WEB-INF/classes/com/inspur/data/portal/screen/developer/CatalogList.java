package com.inspur.data.portal.screen.developer;

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
import org.loushang.internet.view.ViewHandler;

import com.inspur.data.catalog.domain.catalog.OpenCatalog;
import com.inspur.data.common.utils.StringUtils;
import com.inspur.data.common.web.PaginationList;
import com.inspur.data.common.web.ParamUtil;
import com.inspur.portal.model.user.UserCollection;
import com.inspur.utils.DataUtils;
import com.inspur.utils.JsonUtils;
import com.inspur.utils.PortalUtils;

/**
 * 我订阅的数据 <br>
 * <strong>Title :</strong> CatalogList.java <br>
 * <strong>Description : </strong> <br>
 * <strong>For Examples :</strong> <br>
 * <strong>Create on : 2016年6月15日 下午7:48:11<br>
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
public class CatalogList implements ViewHandler {

	private static Log log = LogFactory.getLog(CatalogList.class);

	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

	}

	/**
	 * 获取我的订阅列表 <br>
	 * <p>
	 * Description: <br>
	 * <a href=mailto:miaozhq@inspur.com></a><br> <p>Date: 2016年6月15日
	 * 下午8:19:05<br/> <p>
	 * 
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 * @see void
	 */
	public void doSearchCatalog(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		try {
			String uid = String.valueOf(request.getSession().getAttribute("uid"));
			int page = ParamUtil.getInteger(request, "page", 1);
			int pageSize = ParamUtil.getInteger(request, "pageSize", 1);
			PaginationList<UserCollection> collectionList = PortalUtils.getUserCollectionService()
					.queryUserCollectionListByPage(uid, "1", "1", page, pageSize);
			Map<String, Object> result = new HashMap<String, Object>();
			List cataList = collectionList.getRecords();
			List<OpenCatalog> appResList = new ArrayList<OpenCatalog>();

			int record = 0;
			if (cataList != null && cataList.size() > 0) {
				for (int i = 0; i < cataList.size(); i++) {
					UserCollection userCollection = (UserCollection) cataList.get(i);
					if(userCollection!=null && StringUtils.isNotEmpty(userCollection.getObject_id())){
						
						OpenCatalog openCatalog = DataUtils.getOpenCatalogService().getOpenCatalogByCataId(userCollection.getObject_id());

						if (openCatalog != null && !"".equals(openCatalog)) {
							appResList.add(openCatalog);
							record++;
						}
					}
					
				}
				result.put("records", appResList);
				result.put("totalRecord", record);
				response.getWriter().write(JsonUtils.convertToString(result));
			}
		} catch (Exception ex) {
			log.error(ex, ex);
		}
	}

}
