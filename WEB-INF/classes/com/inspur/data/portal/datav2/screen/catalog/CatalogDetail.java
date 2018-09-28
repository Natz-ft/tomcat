package com.inspur.data.portal.datav2.screen.catalog;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.loushang.internet.util.JsonUtils;
import org.loushang.internet.view.ViewHandler;

import com.inspur.data.catalog.domain.apply.CatalogApply;
import com.inspur.data.catalog.domain.catalog.Catalog;
import com.inspur.data.catalog.domain.catalog.CatalogAPI;
import com.inspur.data.catalog.domain.catalog.CatalogColumn;
import com.inspur.data.catalog.domain.catalog.CatalogFile;
import com.inspur.data.catalog.domain.catalog.CatalogGroupLink;
import com.inspur.data.catalog.domain.catalog.CatalogMeta;
import com.inspur.data.catalog.domain.catalog.OpenCatalog;
import com.inspur.data.common.exception.DataBaseException;
import com.inspur.data.common.exception.InvalidParametersException;
import com.inspur.data.common.file.FileReader;
import com.inspur.data.common.file.FileStoreFactory;
import com.inspur.data.common.file.FileType;
import com.inspur.data.common.file.IFileStore;
import com.inspur.data.common.utils.PropertiesUtils;
import com.inspur.data.common.utils.StringUtils;
import com.inspur.data.common.web.PaginationList;
import com.inspur.data.common.web.ParamUtil;
import com.inspur.data.common.web.RequestParam;
import com.inspur.data.common.web.RequestUtils;
import com.inspur.data.od.model.catalog.DataCatalogStatistic;
import com.inspur.data.od.model.catalog.DataCatalogStatisticDay;
import com.inspur.data.od.model.metadata.database.DataSource;
import com.inspur.portal.model.interact.MessageFeedBack;
import com.inspur.portal.model.user.UserCollection;
import com.inspur.portal.model.user.UserOperationLog;
import com.inspur.portal.model.user.UserScore;
import com.inspur.portal.service.user.UserOperationLogService;
import com.inspur.utils.ConfUtil;
import com.inspur.utils.Constant;
import com.inspur.utils.DataUtils;
import com.inspur.utils.DateStringUitls;
import com.inspur.utils.JavaMemoryCacheManager;
import com.inspur.utils.OamUtils;
import com.inspur.utils.PageList;
import com.inspur.utils.PortalUtils;
import com.inspur.utils.SystemUtil;
import com.inspur.utils.UserUtils;

/**
 * 数据目录页面渲染类
 */
public class CatalogDetail extends com.inspur.data.portal.screen.catalog.CatalogDetail  implements ViewHandler  {
    private static Log log = LogFactory.getLog(CatalogDetail.class);

    public int persistenceInterval = 5;
    
    /**
     * 记录访问量或下载量或评分量等 <br/>
     * <p>
     * Description: <br/>
     * <p>
     * Author: <a href="mailto:zhanghuayun@outlook.com">黄河潮</a><br/>
     * <p>
     * Date: 2016-8-30-下午4:11:09<br/>
     * <p>
     * 
     * @param type
     * @param response
     * @throws ServletException
     * @throws IOException
     * 
     */
    public boolean count(String cacheKey) {
        try {
            long count = JavaMemoryCacheManager.incr(cacheKey, 1, 1);
            if (count % persistenceInterval == 0) {// 计数器满了
                JavaMemoryCacheManager.reset(cacheKey);
                return true;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }
    

	/**
	 * 获取数据统计报表
	 * <br>
	 * <p>Description: 
	 * <br>
	 * <a href=mailto:yuan_lei@inspur.com>haowx</a><br>
	 * <p>Date: 2017年8月23日 09:30:07<br/>
	 * <p>
	 * @param request
	 * @param response
	 * @throws IOException   
	 * @see void
	 */
	public void doGetCatalogStaticsChart (HttpServletRequest request, HttpServletResponse response) throws IOException{
		try{
			String cata_id = request.getParameter("cata_id");
			String audience_type = "2";// audience_type受众类型 1 为内网 2 为外网
			String sta_type = request.getParameter("sta_type");
			SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
			Calendar calendar = Calendar.getInstance();
			calendar.setTime(dateFormat.parse(sta_type));
			calendar.set(Calendar.DAY_OF_MONTH, calendar.getActualMinimum(Calendar.DAY_OF_MONTH));
			String start_date = dateFormat.format(calendar.getTime());
			calendar.set(Calendar.DAY_OF_MONTH, calendar.getActualMaximum(Calendar.DAY_OF_MONTH));
			String end_date = dateFormat.format(calendar.getTime());
			HashMap<String,Object> param = new HashMap<String,Object>();
			param.put("begin_time", start_date +" 00:00:00");
			param.put("end_time", end_date + " 23:59:59");
			List<DataCatalogStatisticDay> resultlist = new ArrayList <DataCatalogStatisticDay>();
			resultlist = DataUtils.getDataCatalogStatisticDayService().getDataCatalogStatisticDayList(cata_id, audience_type, param);
			String result = JsonUtils.convertToString(resultlist);
			response.getWriter().write(result);
			
		}catch(Exception e){
			log.error(e, e);
		}
	}
	
	public void doGetRelateInfo (HttpServletRequest request, HttpServletResponse response) throws IOException{
		try{
			Map<String, Object> resmap = new HashMap<String, Object>();
			String conf_type="2";
			String cata_id = request.getParameter("cata_id");
			OpenCatalog openCatalog = DataUtils.getOpenCatalogService().getOpenCatalogByCataId(cata_id);
			String cata_name = openCatalog.getCata_title();
			//相关服务
			List<CatalogAPI> cataApiList= DataUtils.getCatalogApiService().getCatalogAPI(cata_id, conf_type);			
			//相关应用
			List<String> open_service_id = new ArrayList<String>();
			for(CatalogAPI temp:cataApiList){
				open_service_id.add(temp.getOpen_service_id());
			}					
			List<Map<String,Object>> applyList = OamUtils.getServiceSubscriptionService().getSubscribeServiceAppListByServiceIds(open_service_id);;
			List<Map<String,Object>> applyListNew = new ArrayList<Map<String,Object>>();
			if(applyList.size()>10){
				for(int i=0;i<10;i++){
					applyListNew.add(applyList.get(i));
				}
				resmap.put("applyList", applyListNew);
			}else{
				resmap.put("applyList", applyList);
			}
			//相关数据目录
			List<OpenCatalog> relatedCatalogList =  DataUtils.getOpenCatalogService().getRelatedOpenCatalogList(cata_id, 10);
			//关键字
			Catalog catalog = DataUtils.getCatalogServiceNew().getCatalogById(cata_id);
			String cata_tags = catalog.getCata_tags();
			List<String> keywordList = new ArrayList<String>();
			if(StringUtils.isNotEmpty(cata_tags)){
				String[] catatags = cata_tags.split(",");
				for(int i=0;i<catatags.length;i++){
					keywordList.add(catatags[i]);
				}
			}
			resmap.put("root", cata_name);
			resmap.put("cataApiList", cataApiList);			
			resmap.put("relatedCatalogList", relatedCatalogList);
			resmap.put("keywordList", keywordList);		
			response.getWriter().write(JsonUtils.convertToString(resmap));
			
		}catch(Exception e){
			log.error(e, e);
		}
	}
	
	public void doGetCatalogFileList(HttpServletRequest request, HttpServletResponse response) throws IOException{
		try{
			RequestParam param = ParamUtil.getRequestParam(request);			
			String cata_id = request.getParameter("cata_id");
			String conf_type = "2";
			PaginationList<CatalogFile> result = new PaginationList<CatalogFile>();	
			List<CatalogFile> resultlist = new ArrayList <CatalogFile>();			
			resultlist = DataUtils.getCatalogFileService().getCatalogFile(cata_id, conf_type, null);
			result.setRecords(resultlist);
			result.setCurrPage(param.getPage());
			result.setPageSize(param.getPageSize());
			result.setTotalRecord(resultlist.size());
			response.getWriter().write(JsonUtils.convertToString(result));
			
		}catch(Exception e){
			log.error(e, e);
		}
	}
	 /**
     * 
     * @Description：获取开放目录文件下载列表
     * @author: chenlei
     * @date: 2017年7月27日 下午3:55:35
     * @param request
     * @param response
     * @throws ServletException
     * @throws IOException
     */
    public void doGetDownFileList(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		RequestParam param = ParamUtil.getRequestParam(request);
    	String cata_id = ParamUtil.getString(request, "cata_id", null);
		String conf_type = ParamUtil.getString(request, "conf_type", "2");
		int draw = ParamUtil.getInteger(request, "draw", 1);
		PaginationList<Map<String,Object>> resultList = DataUtils.getCatalogFileService().getCatalogFileGroupByName(cata_id, conf_type, null, null, param.getPage(), param.getPageSize());
		PageList<Map<String,Object>> pageList = new PageList<Map<String,Object>>();
		pageList.setData(resultList.getRecords());
		pageList.setRecordsTotal(resultList.getTotalRecord());
		pageList.setRecordsFiltered(resultList.getTotalRecord());
		pageList.setDraw(draw);
		response.getWriter().write(JsonUtils.convertToString(pageList));
	}
}
