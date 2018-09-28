package com.inspur.data.portal.screen.catalog;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.loushang.internet.view.ViewHandler;

import com.inspur.data.catalog.domain.catalog.Catalog;
import com.inspur.data.catalog.domain.catalog.CatalogFile;
import com.inspur.data.common.file.FileReader;
import com.inspur.data.common.file.FileStoreFactory;
import com.inspur.data.common.file.FileType;
import com.inspur.data.common.file.IFileStore;
import com.inspur.data.common.utils.StringUtils;
import com.inspur.data.od.model.catalog.DataCatalogStatistic;
import com.inspur.data.od.model.catalog.DataCatalogStatisticDay;
import com.inspur.portal.model.user.UserOperationLog;
import com.inspur.portal.service.user.UserOperationLogService;
import com.inspur.utils.DataUtils;
import com.inspur.utils.DateStringUitls;
import com.inspur.utils.PortalUtils;
import com.inspur.utils.SystemUtil;
/**
 * Description: 用于文件下载，为了拦截，防止未登录就可以下载文件
 * <p>
 * Date: 2018年1月26日 上午11:35:37<br/>
 * <p>
 */
public class CatalogDetailDownload implements ViewHandler{
	private static Log log = LogFactory.getLog(CatalogDetailDownload.class);
	
	
	/**
     * 文件下载 <br>
     * <p>
     * Description: <br>
     * <p>
     * Date: 2018年1月26日 上午11:35:37<br/>
     * <p>
     * 
     * @param request
     * @param response
     * @throws IOException
     * @see void
     */
    public void doGetFileDownloadAddr(HttpServletRequest request, final HttpServletResponse response) throws IOException {
        try {
        	 Map<String, Object> userInfo = (Map<String, Object>) request.getSession().getAttribute("userInfo");
             String uid = "";
             String userName = "";
        	
            String fileId = request.getParameter("fileId");
            CatalogFile catalogFile = DataUtils.getCatalogFileService().getCatalogFileById(fileId);
            String docId = catalogFile.getIdInRc();
            final String fileName = catalogFile.getFileName();
            final String fileType = catalogFile.getFileFormat();
            String cata_id = catalogFile.getCatalogId();
            // 下载
            IFileStore fileStore = FileStoreFactory.getFileStore();
            fileStore.getFile(docId, FileType.OPEN_DATACATALOG_FILE, new FileReader() {
                @Override
                public void readFile(InputStream in) {
                    try {
                        String contentType = "application/octet-stream; charset=utf-8";
                        String disposition = fileName + "." + fileType;
                        response.setHeader("Content-Disposition", "attachment; filename=" + URLEncoder.encode(disposition, "UTF-8"));
                        response.setContentType(contentType);
                        OutputStream out = response.getOutputStream();
                        byte[] buffer = new byte[4 * 1024];
                        int length = -1;
                        while ((length = in.read(buffer)) != -1) {
                            out.write(buffer, 0, length);
                        }
                        out.close();
                    } catch (Exception e) {
                        if (log.isInfoEnabled()) {
                            log.error(e, e);
                        }
                    }
                }
            });
            // 下载记录计入表中，目录下载记录加1
            DataCatalogStatistic catalogStatistic = new DataCatalogStatistic(cata_id, "2", null, null, null, null, null, null, null, null, null, null, null, null, null, null, new Date());
            catalogStatistic.setUse_file_count(1);
            DataUtils.getDataCatalogStatisticService().addDataCatalogStatistic(catalogStatistic);

            
            //已登录，有条件申请的目录下载次数需要减1
            if (userInfo != null) {
            	DataUtils.getOpenCatalogApplyService().updateApplyDownloadNum(cata_id,String.valueOf(userInfo.get("uid")));
            }
            // 下载记录计入审计日志
            if (userInfo != null) {
                uid = userInfo.get("uid").toString();
                userName = userInfo.get("nick_name").toString();
            }
            String ipAddr = SystemUtil.getIpAddr(request);
            String browerInfo = SystemUtil.getRequestBrowserInfo(request);
            //获取数据目录名称
        	Catalog catalog = DataUtils.getCatalogServiceNew().getCatalogById(cata_id);
            String catalogName = "";
        	if(catalog!=null){
        		catalogName = catalog.getCata_title();
        	}
            int cata_count = 0;
            if (catalogFile != null) {
                cata_count = catalogFile.getDataCount();
            }
            String downloadTime = DateStringUitls.getDateTime();
            Map<String, Object> paramMap = new HashMap<>();
            // #uid#,#user_name#,#download_time#,#file_id#,#file_name#,#ip#,#browser#,#cata_id#,#cata_title#,#data_count#,#file_format#
            paramMap.put("uid", uid);
            paramMap.put("user_name", userName);
            paramMap.put("download_time", downloadTime);
            paramMap.put("ip", ipAddr);
            paramMap.put("browser", browerInfo);
            paramMap.put("cata_id", cata_id);
            paramMap.put("cata_title", catalogName);
            paramMap.put("data_count", cata_count);
            paramMap.put("file_id", fileId);
            paramMap.put("file_name", fileName);
            paramMap.put("file_format", fileType);
            paramMap.put("log_type", "1");
            paramMap.put("system", SystemUtil.getRequestSystemInfo(request));
            DataUtils.getCataLogOpenDownLoadLogServcie().addCataLogOpenDownLoadLog(paramMap);
            try {//新开发审计，记录数据目录文件下载操作
                //获取数据目录名称
                String cata_name = catalogName;//数据目录名称
                UserOperationLog auditlog = new UserOperationLog();
                auditlog.setLog_lk_id(null);
                auditlog.setClient_browser(SystemUtil.getRequestBrowserInfo(request));
                auditlog.setClient_code(null);
                auditlog.setClient_ip(SystemUtil.getIpAddr(request));
                auditlog.setClient_system(SystemUtil.getRequestSystemInfo(request));
                auditlog.setClient_type("PC");
                auditlog.setCreate_time(new Date());
                auditlog.setObj_id(cata_id);
                auditlog.setObj_name(cata_name);//数据目录名称
                auditlog.setObj_type("catalog");
                auditlog.setOp_type("download");//下载
                auditlog.setUser_id(String.valueOf(userInfo.get("uid")));
                auditlog.setUser_name(String.valueOf(userInfo.get("nick_name")));
                String site_code=request.getSession().getAttribute("area_code").toString();
                if(StringUtils.isNotEmpty(site_code)){
                	auditlog.setSite_code(site_code);
                }
                //添加审计日志
                UserOperationLogService operLog = PortalUtils.getUserOperationLogService();
                operLog.add(auditlog);
                
                //添加按天统计信息 data_catalog_statistic_day
                // 获取当前日期零点
				SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
				SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
				Calendar calendar = Calendar.getInstance();
				String time = sdf.format(calendar.getTime()) + " 00:00:00";
				Date date = format.parse(time);
				// 日访问量
				DataCatalogStatisticDay catalogStatisticDay = new DataCatalogStatisticDay();
				catalogStatisticDay.setCata_id(cata_id);
				catalogStatisticDay.setStatistics_date(date);
				catalogStatisticDay.setAudience_type("2");
				catalogStatisticDay.setDownload_count(1);
				catalogStatisticDay.setUpdate_time(new Date());
				DataUtils.getDataCatalogStatisticDayService().addDataCatalogStatisticDay(catalogStatisticDay);
            } catch (Exception e) {
                log.error("目录文件下载审计日志添加失败", e);
            }
        } catch (Exception e) {
            log.error(e);
        }
    }


	@Override
	public void execute(HttpServletRequest httpservletrequest, HttpServletResponse httpservletresponse)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		
	}
}
