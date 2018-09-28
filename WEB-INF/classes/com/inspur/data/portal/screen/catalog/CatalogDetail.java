package com.inspur.data.portal.screen.catalog;

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

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.loushang.internet.util.JsonUtils;
import org.loushang.internet.view.ViewHandler;

import com.inspur.data.catalog.domain.apply.CatalogApply;
import com.inspur.data.catalog.domain.catalog.Catalog;
import com.inspur.data.catalog.domain.catalog.CatalogAPI;
import com.inspur.data.catalog.domain.catalog.CatalogColumn;
import com.inspur.data.catalog.domain.catalog.CatalogConfigure;
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
import com.inspur.data.od.model.catalog.DataCatalogStatisticDay;
import com.inspur.data.od.model.metadata.database.DataSource;
import com.inspur.portal.model.base.Dict;
import com.inspur.portal.model.base.SystemConfig;
import com.inspur.portal.model.interact.MessageFeedBack;
import com.inspur.portal.model.user.UserCollection;
import com.inspur.portal.model.user.UserOperationLog;
import com.inspur.portal.model.user.UserScore;
import com.inspur.portal.service.base.DictService;
import com.inspur.portal.service.user.UserOperationLogService;
import com.inspur.utils.AuditLogUtil;
import com.inspur.utils.Constant;
import com.inspur.utils.DataUtils;
import com.inspur.utils.JavaMemoryCacheManager;
import com.inspur.utils.OamUtils;
import com.inspur.utils.PageList;
import com.inspur.utils.PortalUtils;
import com.inspur.utils.SystemUtil;
import com.inspur.utils.UserUtils;

import net.sf.json.JSONObject;

/**
 * 数据目录页面渲染类
 */
public class CatalogDetail implements ViewHandler {
    private static Log log = LogFactory.getLog(CatalogDetail.class);

    public int persistenceInterval = 5;
    
    @SuppressWarnings("unchecked")
    public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    	try {
            String cata_id = ParamUtil.getString(request, "cata_id", "");
            if (cata_id != null && !"".equals(cata_id.trim())) {
            	cata_id = cata_id.trim();
            	// 返回cata_id
                request.setAttribute("cata_id", cata_id);
                // 指定并返回当前tab页
                String target_tab = ParamUtil.getString(request, "target_tab", "");
                request.setAttribute("target_tab", target_tab);
                
                // 获取开放目录信息
                OpenCatalog openCatalog = DataUtils.getOpenCatalogService().getOpenCatalogByCataId(cata_id);
                
                List<CatalogColumn> cataLogColumnList = openCatalog.getColumns();
                DictService dictService = UserUtils.getDictService();
                
                for (CatalogColumn catalogColumn : cataLogColumnList) {
                    if (null != catalogColumn) {
                        Dict findDict = dictService.findDict("data_format", catalogColumn.getData_format());
                        if(findDict != null){
                            catalogColumn.setData_format(findDict.getItemValue());
                        }
                        
                    }
                }
                
                request.setAttribute("openCatalog", openCatalog);
                if(openCatalog!=null && openCatalog.getCata_tags()!=null){
                	String[] tag_list = openCatalog.getCata_tags().split(",");
                	request.setAttribute("tag_list", tag_list);
                }
                String dataanaly_context = PropertiesUtils.getValue("conf.properties","global.index.dataanaly");
    			request.setAttribute("dataanaly_context", dataanaly_context);
    			
                if(openCatalog!=null){
                	/*
                     * 字典项处理
                     */
                    Map<String,String> openCatalogFromDict = new HashMap<String,String>();
                    //开放类型
                    openCatalogFromDict.put("open_type",UserUtils.getDictItemValue("catalog_open_type", openCatalog.getOpen_type()));
                    //更新频率
                    openCatalogFromDict.put("conf_update_cycle",UserUtils.getDictItemValue("catalog_update_cycle", openCatalog.getConf_update_cycle()));
                    //如果不定期，显示用户输入的值
                    if("不定期".equals(UserUtils.getDictItemValue("catalog_update_cycle", openCatalog.getConf_update_cycle()))){
                    	openCatalogFromDict.put("conf_update_cycle", openCatalog.getConf_update_cycle_user());
                    }
                    
                    //数据格式
                    String conf_use_type = "";
                    String use_type = openCatalog.getConf_use_type();
                    if (StringUtils.isNotEmpty(use_type)) {
                        String[] stringArr = use_type.split(",");
                        for (int i = 0; i < stringArr.length; i++) {
                        	if( !"".equals(UserUtils.getDictItemValue("catalog_use_type",  stringArr[i]))){
                        		if ("".equals(conf_use_type)){
                        			conf_use_type += UserUtils.getDictItemValue("catalog_use_type",  stringArr[i]);
                        		}else{
                        			conf_use_type = conf_use_type+"，" +UserUtils.getDictItemValue("catalog_use_type",  stringArr[i]);
                        		}
                        	}
                        }
                    }
                    openCatalogFromDict.put("conf_use_type",conf_use_type);
                    request.setAttribute("openCatalogFromDict", openCatalogFromDict);
                    
                    
                   //所属主题分组
                    List<CatalogGroupLink> cataLogGroups = openCatalog.getCataLogGroups();
                    String cataLogGroupsStr = "";
                    if(cataLogGroups!=null){
                    	for (CatalogGroupLink catalogGroupLink : cataLogGroups) {
							if(catalogGroupLink!=null&&catalogGroupLink.getGroup_name()!=null &&!"".equals(catalogGroupLink.getGroup_name())){
								if("".equals(cataLogGroupsStr)){
									cataLogGroupsStr+=catalogGroupLink.getGroup_name();
								}else{
									cataLogGroupsStr=cataLogGroupsStr+"，"+catalogGroupLink.getGroup_name();
								}
							}
						}
                    }
                    request.setAttribute("cataLogGroupsStr", cataLogGroupsStr);
                	//所属行业分组
                	List<CatalogGroupLink> cataLogIndustrys = openCatalog.getCataLogIndustrys();
                	String cataLogIndustrysStr = "";
                	if(cataLogIndustrys!=null){
                		for (CatalogGroupLink catalogGroupLink : cataLogIndustrys) {
							if(catalogGroupLink!=null &&catalogGroupLink.getGroup_name()!=null &&!"".equals(catalogGroupLink.getGroup_name())){
								if("".equals(cataLogIndustrysStr)){
									cataLogIndustrysStr+=catalogGroupLink.getGroup_name();
								}else{
									cataLogIndustrysStr=cataLogIndustrysStr+"，"+catalogGroupLink.getGroup_name();
								}
							}
						}
                	}
                	request.setAttribute("cataLogIndustrysStr", cataLogIndustrysStr);
                    
                    // 查询数据目录是否被该用户收藏
                    Map<String, Object> userInfo = (Map<String, Object>) request.getSession().getAttribute("userInfo");
                    int isFav = 0;
                    if (userInfo != null) {
                        Map<String, Object> qMap = new HashMap<String, Object>();
                        qMap.put("object_id", cata_id);
                        qMap.put("object_type", "1");// 1:数据目录，2:API服务 3:应用,4:资讯
                                                     // 依据user_collection表中字段定义
                        qMap.put("uid", userInfo.get("uid"));
                        List<UserCollection> queryUserCollectionList = PortalUtils.getUserCollectionService().queryUserCollectionList(qMap);
                        isFav = queryUserCollectionList.size();
                    }
                    request.setAttribute("isFav", isFav);
                    
                    /** 授权目录相关功能开始 */
                    String open_type = openCatalog.getOpen_type(); // 目录开放类型，1，无条件开放，3授权开放
                    String current_user_type = "11";//个人
                    String current_authen_level = "0";//非实名认证
                    if (userInfo != null) {
                        if(userInfo.get("user_type")!=null){
                        	current_user_type = userInfo.get("user_type").toString();// 11 个人，21 企业
                        }
                        current_authen_level = UserUtils.getUserDomain().getAuthenLevelByUid(Integer.valueOf(String.valueOf(userInfo.get("uid")))) + "";                        
                        request.setAttribute("user_type", current_user_type);
                        request.setAttribute("authen_level", current_authen_level);
                    }
                    
                    if (Constant.CATALOG_OPEN_TYPE_ALL.equals(open_type) || "3,".equals(use_type) || "3".equals(use_type)){//无条件开放或API服务格式，无申请，只有下载控制
                    	request.setAttribute("isShowOtherTab", 1);//不进行其他tab控制
                    	String allopen_catadown_user_level = "0";//默认是0，标示不进行控制
                    	//根据配置判断是否需要限制下载
                    	SystemConfig conf = UserUtils.getSystemConfigService().getSystemConfig("fullopen_catadown_user_level");//普遍开放目录的用户认证级别
                        if(conf != null && conf.getParam_value() != null){
                        	allopen_catadown_user_level = conf.getParam_value();
                        }
                    	if(allopen_catadown_user_level.equals(current_authen_level) || "0".equals(allopen_catadown_user_level) ){ //无配置 or 配置和当前用户匹配
                        	request.setAttribute("isShowDownTab", 1); 
                        }
                    	
                    }else if(Constant.CATALOG_OPEN_TYPE_AUTHEN.equals(open_type) && !"3,".equals(use_type)){//授权开放，有申请
                    	String partopen_user_level = "0";// 是否实名认证
                    	String partopen_user_type = "11,21"; // 用户类型
                    	Boolean isApplyStatusAgreed = false;
                    	SystemConfig userlevel_conf = UserUtils.getSystemConfigService().getSystemConfig("partopen_user_level");//普遍开放目录的用户认证级别
                    	if(userlevel_conf != null && userlevel_conf.getParam_value() != null){
                    		partopen_user_level = userlevel_conf.getParam_value();
                        }
                    	SystemConfig usertype_conf = UserUtils.getSystemConfigService().getSystemConfig("partopen_user_type");//普遍开放目录的用户认证级别
                    	if(usertype_conf != null && usertype_conf.getParam_value() != null){
                    		partopen_user_type = usertype_conf.getParam_value(); //可配置多个类型，逗号隔开
                        }
                    	//当前用户申请情况
                    	if (userInfo != null) {
                            Map res = DataUtils.getOpenCatalogApplyService().validateOpenCatalogApply(cata_id, String.valueOf(userInfo.get("uid")));
                            if("0000".equals(res.get("code")) || "0001".equals(res.get("code"))){
                            	isApplyStatusAgreed = true; ///申请通过并且还有效
                            }
                            request.setAttribute("isApply", res.get("code")); // 是否申请
                            request.setAttribute("applyTip", res.get("msg")); // 是否申请
                            if("0".equals(partopen_user_level) && "11,21".equals(partopen_user_type)){ //无配置  or 配置为全部用户
                                request.setAttribute("isShowApplyBtn", 1); // 申请按钮
                        	}
                        	if(current_user_type.equals(partopen_user_type) || partopen_user_type.indexOf(current_user_type)>=0){
                        		request.setAttribute("isShowApplyBtn", 1); // 申请按钮，类型匹配了就可以申请，在申请的地方引导实名认证
                        	}
                        	if(isApplyStatusAgreed){ //申请通过了才展示所有菜单
                        		request.setAttribute("isShowDownTab", 1); 
                            	request.setAttribute("isShowOtherTab", 1); 
                        	}
                    	}
                        request.setAttribute("partopen_user_level", partopen_user_level); // 申请的认证级别
                    }
                    /** 授权目录相关功能结束  */
                 // 访问量加1
                    if (count(cata_id + "views")) {
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
                        catalogStatisticDay.setVisit_count(persistenceInterval);
                        catalogStatisticDay.setUpdate_time(new Date());
                        DataUtils.getDataCatalogStatisticDayService().addDataCatalogStatisticDay(catalogStatisticDay);
                    }
                    // 浏览记录计入审计日志
                    String uid = "";
                    String userName = "";
                    if (userInfo != null) {
                        uid = userInfo.get("uid").toString();
                        userName = userInfo.get("nick_name").toString();
                    }
                    String ipAddr = SystemUtil.getIpAddr(request);
                    String browerInfo = SystemUtil.getRequestBrowserInfo(request);
                    String catalogName = "";
                    catalogName = openCatalog.getCata_title();
                    //新开发审计，记录数据目录访问操作
                    try {
                    	/*UserOperationLog auditlog = new UserOperationLog();
                        auditlog.setLog_lk_id(null);
                        auditlog.setClient_browser(browerInfo);
                        auditlog.setClient_code(null);
                        auditlog.setClient_ip(ipAddr);
                        auditlog.setClient_system(SystemUtil.getRequestSystemInfo(request));
                        auditlog.setClient_type("PC");
                        auditlog.setCreate_time(new Date());
                        auditlog.setObj_id(cata_id);
                        auditlog.setObj_name(catalogName);//数据目录名称
                        auditlog.setObj_type("catalog"); //对象类型  数据目录
                        auditlog.setOp_type("visit");//操作类型  访问
                        auditlog.setUser_id(uid);
                        auditlog.setUser_name(userName);
                        String site_code=request.getSession().getAttribute("area_code").toString();
                        if(StringUtils.isNotEmpty(site_code)){
                        	auditlog.setSite_code(site_code);
                        }
                        //添加审计日志
                        UserOperationLogService operLog = PortalUtils.getUserOperationLogService();
                        
                        operLog.add(auditlog);*/
                        
                      //记录页面访问日志
                        AuditLogUtil.addObjectVisitAutiLog(request, catalogName, "", cata_id, "catalog", "数据目录");
                    } catch (Exception e) {
                        log.error("目录访问审计日志添加失败", e);
                    }
                }
            }
            
         } catch (Exception e) {
             log.error(e, e);
         }
    }
    /**
     * 新增目录申请
     * 
     * @param request
     * @return
     * @throws Exception
     */
    public void doAddCatalogApply(HttpServletRequest request, HttpServletResponse response) throws Exception {
        try {
            Map<String, Object> userInfo = (Map<String, Object>) request.getSession().getAttribute("userInfo");
            Map<String, Object> res = new HashMap<String, Object>();
            if (userInfo != null) {
                String uid = userInfo.get("uid").toString();
                String[] data_scopes = request.getParameterValues("data_scope");
                String data_scope = Arrays.toString(data_scopes).replace("[", "").replace("]", "");
                String apply_uname = userInfo.get("nick_name").toString();
                String apply_phone = request.getParameter("apply_phone");
                String start_date = request.getParameter("start_date");
                String end_date = request.getParameter("end_date");
                String apply_reason = request.getParameter("apply_reason");
                String cata_id = request.getParameter("cata_id");
                String cata_name = request.getParameter("cata_name");
                String conf_type = request.getParameter("conf_type");
                String apply_id = request.getParameter("apply_id");
                String apply_organ_id = request.getParameter("apply_organ_id");
                String apply_organ_name = request.getParameter("apply_organ_name");
                int status = 0;
                String apply_columns = request.getParameter("apply_columns");
                String apply_files = request.getParameter("apply_files");
                
                CatalogApply catalogApply = new CatalogApply();
                catalogApply.setApply_id(apply_id);
                catalogApply.setData_scope(data_scope);
                catalogApply.setApply_organ_name(apply_organ_name);
                catalogApply.setApply_organ_id(apply_organ_id);
                catalogApply.setApply_uname(apply_uname);
                catalogApply.setApply_phone(apply_phone);
                catalogApply.setApply_uid(uid);
                catalogApply.setStart_date(start_date);
                catalogApply.setEnd_date(end_date);
                catalogApply.setApply_reason(apply_reason);
                catalogApply.setStatus(status);
                catalogApply.setCata_id(cata_id);
                catalogApply.setCata_name(cata_name);
                catalogApply.setApply_columns(apply_columns);
                catalogApply.setApply_files(apply_files);
                // 新增目录配置类型
                catalogApply.setConf_type(conf_type);
                
                String result = DataUtils.getOpenCatalogApplyService().applyOpenCatalog(catalogApply);
                if (result != null) {
                    res.put("code", 1);
                    res.put("msg", "申请成功!");
                    //新开发审计，记录数据目录申请操作
                    try {
                    	UserOperationLog auditlog = new UserOperationLog();
                        auditlog.setLog_lk_id(null);
                        auditlog.setClient_browser(SystemUtil.getRequestBrowserInfo(request));
                        auditlog.setClient_code(null);
                        auditlog.setClient_ip(SystemUtil.getIpAddr(request));
                        auditlog.setClient_system(SystemUtil.getRequestSystemInfo(request));
                        auditlog.setClient_type("PC");
                        auditlog.setCreate_time(new Date());
                        auditlog.setObj_name(cata_name);//数据目录名称
                        auditlog.setObj_type("catalog");
                        auditlog.setObj_id(cata_id);
                        auditlog.setOp_type("apply");//操作类型申请
                        auditlog.setUser_id(String.valueOf(userInfo.get("uid")));
                        auditlog.setUser_name(String.valueOf(userInfo.get("nick_name")));
                        String site_code=request.getSession().getAttribute("area_code").toString();
                        if(StringUtils.isNotEmpty(site_code)){
                        	auditlog.setSite_code(site_code);
                        }
                        //添加审计日志
                        UserOperationLogService operLog = PortalUtils.getUserOperationLogService();
                        operLog.add(auditlog);
                    } catch (Exception e) {
                        log.error("目录申请审计日志添加失败", e);
                    }
                }else{
                	  res.put("code", 0);
                      res.put("msg", "申请失败，请稍后重试!");
                }
            } else {
                res.put("code", "000001");
                res.put("msg", "用户未登录！");
            }
            response.getWriter().write(JsonUtils.convertToString(res));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

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
     * 获取地图数据 <br>
     * <p>
     * Description: <br>
     * <a href=mailto:miaozhq@inspur.com></a><br>
     * <p>
     * Date: 2017年2月15日 下午2:21:22<br/>
     * <p>
     * 
     * @param request
     * @param response
     * @throws Exception
     * @see void
     */
    public void doGetMapPointData(HttpServletRequest request, HttpServletResponse response) throws Exception {
        try {
            String cata_id = ParamUtil.getString(request, "cata_id", "");
            // 获取元数据信息
            CatalogMeta catalogMeta=  DataUtils.getCatalogMetaServiceNew().getCatalogMeta(cata_id, "2");
            if(catalogMeta!=null){
            	String table_name = catalogMeta.getTable_name_en();
            	String database_id = catalogMeta.getDatabase_id();
            	String datasource_id = catalogMeta.getDatasource_id();
            	DataSource dataSource = DataUtils.getDataSourceService().queryDataSourceById(datasource_id, false);
            	String sql = "";
				if (dataSource != null) {
					/* 关系型数据库处理 */
					if ("rds".equals(dataSource.getDatasource_type())) {
						OpenCatalog openCatalog = DataUtils.getOpenCatalogService().getOpenCatalogByCataId(cata_id);
						List<CatalogColumn> columns = openCatalog.getColumns();
						for (CatalogColumn catalogColumn : columns) {// 获取数据项
							if (catalogColumn != null
									&& catalogColumn.getCataLogOpenColumnConfigure() != null
									&& "2".equals(catalogColumn.getCataLogOpenColumnConfigure().getConf_type())// 开放的数据项
									&& catalogColumn.getCataLogOpenColumnConfigure().getMeta_column_name_en() != null// 数据项英文名称
									&& !"".equals(catalogColumn.getCataLogOpenColumnConfigure().getMeta_column_name_en())) {
								if ("".equals(sql)) {
									sql = catalogColumn.getCataLogOpenColumnConfigure().getMeta_column_name_en();
								} else {
									sql = sql + "," + catalogColumn.getCataLogOpenColumnConfigure().getMeta_column_name_en();
								}
							}
						}
					}
					if (!"".equals(sql)) {
						sql = "select " + sql + " from " + table_name;
						// 对应js中的data
						List<Map<String, Object>> mapList = DataUtils.getDataTableService().queryListBySql(sql, 1,database_id);
						response.getWriter().write(JsonUtils.convertToString(mapList));
					}
				} else {
				}
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * 
     * <br>
     * <p>
     * Description: 添加用户评论 <br>
     * liuyuanjian<br>
     * <p>
     * Date: 2016-6-24 上午11:43:18<br/>
     * <p>
     * 
     * @param request
     * @param response
     * @throws DataBaseException
     * @throws IOException
     * @see void
     */
    @SuppressWarnings("unchecked")
    public void doAddComment(HttpServletRequest request, HttpServletResponse response) throws DataBaseException, IOException {
        try {
            Map<String, String> map = new HashMap<String, String>();
            Map<String, Object> userInfo = (Map<String, Object>) request.getSession().getAttribute("userInfo");
            String site_code = (String) request.getSession().getAttribute("area_code");
            if (userInfo != null) {
                // 评论内容
                String content = ParamUtil.getString(request, "content", "");
                // 评论对象类型 1-数据集 2-应用 3-新闻公告
                int obj_type = ParamUtil.getInteger(request, "obj_type", 1);
                // 对应cata_id
                String obj_id = ParamUtil.getString(request, "obj_id", "");
                // 对应org_code
                String org_code = ParamUtil.getString(request, "org_code", "");
                // // 内容类型 1：评论
                String content_type = "1";
                String uid = userInfo.get("uid").toString();
                // 评论对象
                String title = ParamUtil.getString(request, "title", "");
                if (!StringUtils.isBlank(content) && !StringUtils.isBlank(obj_id) && obj_type > 0) {
                    Map<String, Object> messageFeedBackMap = new HashMap<String, Object>();
                    messageFeedBackMap.put("content", content);
                    messageFeedBackMap.put("site_code", site_code);
                    messageFeedBackMap.put("object_type", obj_type);
                    messageFeedBackMap.put("object_title", title);
                    messageFeedBackMap.put("object_id", obj_id);
                    messageFeedBackMap.put("org_code", org_code);
                    /*messageFeedBackMap.put("ip_addr", RequestUtils.getIpAddr(request));*/
                    String ip_addr = RequestUtils.getIpAddr(request);
                    if(StringUtils.isNotBlank(ip_addr) && StringUtils.indexOf(ip_addr, ",") != -1){
                    	// 使用nginx代理会出现多个ip用逗号分开，在插入数据库时候会把逗号当成字段分隔符出错,取第一个ip值插入数据库
                    	String[] ip_addr_array = StringUtils.split(ip_addr, ',');
                        messageFeedBackMap.put("ip_addr", ip_addr_array[0]);
                    }else{
                    	messageFeedBackMap.put("ip_addr", ip_addr);
                    }
                    messageFeedBackMap.put("status", 0);
                    messageFeedBackMap.put("create_Time", new Timestamp(System.currentTimeMillis()));
                    messageFeedBackMap.put("uid", Integer.parseInt(uid));
                    messageFeedBackMap.put("content_type", content_type);
                    messageFeedBackMap.put("user_name", userInfo.get("user_id"));
                    // 添加评论至 message_feedback表中
                    int ID = PortalUtils.getMessageFeedBackService().addMessageFeedBack(messageFeedBackMap);
                    if (ID != 0) {
                    	String opobj_type = "catalog";
                        if (obj_type == 1) {
                            // 获取当前日期零点
                            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
                            SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                            Calendar calendar = Calendar.getInstance();
                            String time = sdf.format(calendar.getTime()) + " 00:00:00";
                            Date date = format.parse(time);
                            // 数据集评论数加1
                            DataCatalogStatisticDay catalogStatisticDay = new DataCatalogStatisticDay();
                            catalogStatisticDay.setCata_id(obj_id);
                            catalogStatisticDay.setStatistics_date(date);
                            catalogStatisticDay.setAudience_type("2");
                            catalogStatisticDay.setComment_count(1);
                            catalogStatisticDay.setUpdate_time(new Date());
                            DataUtils.getDataCatalogStatisticDayService().addDataCatalogStatisticDay(catalogStatisticDay);
                        } else {
                            // 应用 评论数加1 此处不用
                        	opobj_type = "app";
                        }
                        map.put("code", "000000");
                        map.put("msg", "保存成功！");
                        //新开发审计，记录数据目录评论操作
                        try {
                        	UserOperationLog auditlog = new UserOperationLog();
                            auditlog.setLog_lk_id(null);
                            auditlog.setClient_browser(SystemUtil.getRequestBrowserInfo(request));
                            auditlog.setClient_code(null);
                            auditlog.setClient_ip(SystemUtil.getIpAddr(request));
                            auditlog.setClient_system(SystemUtil.getRequestSystemInfo(request));
                            auditlog.setClient_type("PC");
                            auditlog.setCreate_time(new Date());
                            auditlog.setObj_id(obj_id);
                            auditlog.setObj_name(title);//数据目录名称
                            auditlog.setObj_type(opobj_type);
                            auditlog.setOp_type("comment");//目录评论
                            auditlog.setUser_id(String.valueOf(userInfo.get("uid")));
                            auditlog.setUser_name(String.valueOf(userInfo.get("nick_name")));
                            if(StringUtils.isNotEmpty(site_code)){
                            	auditlog.setSite_code(site_code);
                            }
                            //添加审计日志
                            UserOperationLogService operLog = PortalUtils.getUserOperationLogService();
                            operLog.add(auditlog);
                        } catch (Exception e) {
                            log.error("目录评论审计日志添加失败", e);
                        }
                    } else {
                        map.put("code", "000005");
                        map.put("msg", "保存失败！");
                    }
                } else {
                    map.put("code", "000002");
                    map.put("msg", "信息不完整！");
                }
            } else {
                map.put("code", "000001");
                map.put("msg", "用户未登录！");
            }
            response.getWriter().write(JsonUtils.convertToString(map));
        } catch (Exception e) {
            log.error(e);
        }
    }

    /**
     * 
     * <br>
     * <p>
     * Description: 查询评论 <br>
     * liuyuanjian<br>
     * <p>
     * Date: 2016-6-24 上午11:49:44<br/>
     * <p>
     * 
     * @param request
     * @param response
     * @throws ServletException
     * @throws IOException
     * @see void
     */
    @SuppressWarnings({"unchecked", "rawtypes" })
    public void doQueryCommentList(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            int page = ParamUtil.getInteger(request, "page", 1);
            int pageSize = ParamUtil.getInteger(request, "pageSize", 3);
            String cata_id = ParamUtil.getString(request, "cata_id", "");
            HashMap<String, Object> queryMap = new HashMap<String, Object>();
            Map<String, Object> userinfo = new HashMap<String, Object>();
            List<Map<String, Object>> mesLists = new ArrayList<Map<String, Object>>();
            queryMap.put("object_id", cata_id);
            queryMap.put("status", 1);// 已审核的
            queryMap.put("order", "create_time desc");
            queryMap.put("content_type", 1);// 信息类型信息类型 1、评论 2、信息反馈
            PaginationList<MessageFeedBack> messagefeedBackList = PortalUtils.getMessageFeedBackService().queryMessageFeedBackByMap(queryMap, page,
                    pageSize);
            String uuid = String.valueOf(request.getSession().getAttribute("uid"));
            // 循环处理comment获取nick_name avatar,收藏、评论等信息
            if (messagefeedBackList != null && messagefeedBackList.getRecords() != null) {
                for (MessageFeedBack mfb : messagefeedBackList.getRecords()) {
                    Map<String, Object> messageFeedBackMap = new HashMap<String, Object>();
                    messageFeedBackMap.put("message_id", mfb.getMessage_id());
                    messageFeedBackMap.put("uid", mfb.getUid());
                    messageFeedBackMap.put("content", mfb.getContent());
                    messageFeedBackMap.put("content_type", mfb.getContent_type());
                    messageFeedBackMap.put("create_Time", mfb.getCreate_time());
                    messageFeedBackMap.put("check_time", mfb.getCheck_time());
                    messageFeedBackMap.put("support", mfb.getSupport());
                    messageFeedBackMap.put("reply_num", mfb.getReply_num());
                    if (mfb.getUid() > 0) {
                        userinfo = UserUtils.getUserDomain().getUserByUid(mfb.getUid());
                        messageFeedBackMap.put("user_id", userinfo.get("user_id"));
                        messageFeedBackMap.put("nick_name", userinfo.get("nick_name"));
                        messageFeedBackMap.put("avatar", userinfo.get("avatar"));
                    }
                    int message_id = mfb.getMessage_id();
                    // 判断当前用户是否点赞了评论
                    if (null != uuid && !"".equals(uuid) &&!"null".equals(uuid)) {
                        Map pra = new HashMap();
                        pra.put("uid", Integer.parseInt(uuid));
                        pra.put("obj_id", message_id);
                        try {
                            List plist = PortalUtils.getUserPraiseService().getPraiseBy(pra);
                            if (plist != null && !plist.isEmpty()) {
                                messageFeedBackMap.put("praise", plist.get(0));
                            }
                        } catch (DataBaseException e) {
                            e.printStackTrace();
                        } catch (InvalidParametersException e) {
                            e.printStackTrace();
                        }
                    }
                    mesLists.add(messageFeedBackMap);
                }
            }
            PaginationList<Map<String, Object>> mesPageLists = new PaginationList<Map<String, Object>>();
            mesPageLists.setRecords(mesLists);
            mesPageLists.setCurrPage(messagefeedBackList.getCurrPage());
            mesPageLists.setPageSize(messagefeedBackList.getPageSize());
            mesPageLists.setTotalPage(messagefeedBackList.getTotalPage());
            mesPageLists.setTotalRecord(messagefeedBackList.getTotalRecord());
            if (mesPageLists != null) {
                response.getWriter().write(JsonUtils.convertToString(mesPageLists));// 返回前台数据
            }
        } catch (DataBaseException e) {
            log.error(e);
        } catch (InvalidParametersException e) {
            log.error(e);
        }
    }

    /**
     * 获取评论回复列表 <br>
     * <p>
     * Description: <br>
     * <a href=mailto:miaozhq@inspur.com></a><br>
     * <p>
     * Date: 2017年2月15日 下午2:37:13<br/>
     * <p>
     * 
     * @param request
     * @param response
     * @throws ServletException
     * @throws IOException
     * @see void
     */
    public void doGetCommentReplyList(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            String message_id = request.getParameter("message_id");
            int page = ParamUtil.getInteger(request, "page", 1);
            int pageSize = ParamUtil.getInteger(request, "pageSize", 3);
            HashMap<String, Object> commentPara = new HashMap<String, Object>();
            Map<String, Object> userinfo = new HashMap<String, Object>();
            List<Map<String, Object>> mesLists = new ArrayList<Map<String, Object>>();
            commentPara.put("parent_id", message_id);
            commentPara.put("status", 1);
            commentPara.put("order", "create_time desc");
            PaginationList<MessageFeedBack> messagefeedBackList = PortalUtils.getMessageFeedBackService().queryMessageFeedBackByMap(commentPara,
                    page, pageSize);
            if (messagefeedBackList != null && messagefeedBackList.getRecords() != null) {
                for (MessageFeedBack mfb : messagefeedBackList.getRecords()) {
                    Map<String, Object> messageFeedBackMap = new HashMap<String, Object>();
                    messageFeedBackMap.put("message_id", mfb.getMessage_id());
                    messageFeedBackMap.put("parent_id", mfb.getParent_id());
                    messageFeedBackMap.put("uid", mfb.getUid());
                    messageFeedBackMap.put("content", mfb.getContent());
                    messageFeedBackMap.put("content_type", mfb.getContent_type());
                    messageFeedBackMap.put("create_Time", mfb.getCreate_time());
                    messageFeedBackMap.put("check_time", mfb.getCheck_time());
                    if (mfb.getUid() > 0) {
                        userinfo = UserUtils.getUserDomain().getUserByUid(mfb.getUid());
                        messageFeedBackMap.put("user_id", userinfo.get("user_id"));
                        messageFeedBackMap.put("nick_name", userinfo.get("nick_name"));
                        messageFeedBackMap.put("avatar", userinfo.get("avatar"));
                    }
                    mesLists.add(messageFeedBackMap);
                }
                PaginationList<Map<String, Object>> mesPageLists = new PaginationList<Map<String, Object>>();
                mesPageLists.setRecords(mesLists);
                mesPageLists.setCurrPage(messagefeedBackList.getCurrPage());
                mesPageLists.setPageSize(messagefeedBackList.getPageSize());
                mesPageLists.setTotalPage(messagefeedBackList.getTotalPage());
                mesPageLists.setTotalRecord(messagefeedBackList.getTotalRecord());
                if (mesPageLists != null) {
                    response.getWriter().write(JsonUtils.convertToString(mesPageLists));// 返回前台数据
                }
            }
        } catch (DataBaseException e) {
            log.error(e);
        } catch (InvalidParametersException e) {
            log.error(e);
        }
    }

    /**
     * 删除评论回复 <br>
     * <p>
     * Description: <br>
     * <a href=mailto:miaozhq@inspur.com></a><br>
     * <p>
     * Date: 2017年2月15日 下午2:37:37<br/>
     * <p>
     * 
     * @param request
     * @param response
     * @throws ServletException
     * @throws IOException
     * @see void
     */
    @SuppressWarnings({"unchecked", "rawtypes" })
    public void doDeleteMessage(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            HashMap result = new HashMap();
            String message_id = request.getParameter("message_id");
            String parent_id = request.getParameter("parent_id");
            if (message_id == null || "".equals(message_id)) {
                result.put("success", 0);
                result.put("info", "评论id不能为空");
            } else {
                MessageFeedBack msg = PortalUtils.getMessageFeedBackService().getMessageFeedBackById(Integer.parseInt(message_id));
                int res = PortalUtils.getMessageFeedBackService().deleteMessageFeedBackById(Integer.parseInt(message_id));
                if (res > 0) {
                    // 减少评论回复数
                    PortalUtils.getMessageFeedBackService().updateMessageReplyNum(Integer.parseInt(parent_id), "del");
                    // 获取当前日期零点
                    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
                    SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                    Calendar calendar = Calendar.getInstance();
                    String time = sdf.format(calendar.getTime()) + " 00:00:00";
                    Date date = format.parse(time);
                    // 数据集评论数加1
                    DataCatalogStatisticDay catalogStatisticDay = new DataCatalogStatisticDay();
                    catalogStatisticDay.setCata_id(msg.getObject_id());
                    catalogStatisticDay.setStatistics_date(date);
                    catalogStatisticDay.setAudience_type("2");
                    catalogStatisticDay.setComment_count(-1);
                    catalogStatisticDay.setUpdate_time(new Date());
                    DataUtils.getDataCatalogStatisticDayService().addDataCatalogStatisticDay(catalogStatisticDay);
                    result.put("info", "删除成功");
                    result.put("status", "1");
                } else {
                    result.put("info", "删除失败");
                    result.put("status", "0");
                }
            }
            response.getWriter().write(JsonUtils.convertToString(result));
        } catch (DataBaseException e) {
            log.error(e, e);
        } catch (Exception e) {
            log.error(e, e);
        }
    }

    /**
     * 发布评论回复 <br>
     * <p>
     * Description: <br>
     * <a href=mailto:miaozhq@inspur.com></a><br>
     * <p>
     * Date: 2017年2月15日 下午2:38:24<br/>
     * <p>
     * 
     * @param request
     * @param response
     * @throws ServletException
     * @throws IOException
     * @see void
     */
    @SuppressWarnings("unchecked")
    public void doPublishComment(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            Map<String, Object> map = new HashMap<String, Object>();
            Map<String, Object> userInfo = (Map<String, Object>) request.getSession().getAttribute("userInfo");
            if (userInfo != null) {
                // 评论内容

                String parent_id = ParamUtil.getString(request, "parent_id", "");
                String content = ParamUtil.getString(request, "comment_content", "");
                String title = ParamUtil.getString(request, "title", "");
                String orgCode = ParamUtil.getString(request,"org_code","");
                // 信息类型信息类型 1、评论 2、信息反馈
                String content_type = "1";
                Date datetime = new Timestamp(System.currentTimeMillis());
                Map<String, Object> messageFeedBackMap = new HashMap<String, Object>();
                messageFeedBackMap.put("content", content);
                messageFeedBackMap.put("ip_addr", RequestUtils.getIpAddr(request));
                messageFeedBackMap.put("status", 0);
                messageFeedBackMap.put("create_Time", new Timestamp(System.currentTimeMillis()));
                messageFeedBackMap.put("uid", Integer.parseInt(userInfo.get("uid").toString()));
                messageFeedBackMap.put("content_type", content_type);
                messageFeedBackMap.put("parent_id", parent_id);
                messageFeedBackMap.put("user_name", userInfo.get("user_id"));
                messageFeedBackMap.put("object_title", title);
                messageFeedBackMap.put("org_code",orgCode);
                // 添加评论至 message_feedback表中
                int ID = PortalUtils.getMessageFeedBackService().addMessageFeedBack(messageFeedBackMap);
                if (ID != 0) {
                    // 为了避免出现未审核和审核未通过的评论也会是评论数增加，将评论数+1的操作放在审核部分实现
                    // PortalUtils.getMessageFeedBackService().updateMessageReplyNum(Integer.parseInt(parent_id),
                    // "add");
                    map.put("success", 1);
                    map.put("nick_name", userInfo.get("nick_name"));
                    map.put("avatar", userInfo.get("avatar"));
                    map.put("uid", userInfo.get("uid"));
                    map.put("create_time", datetime);
                    map.put("comment_id", ID);
                    map.put("msg", "评论成功");
                } else {
                    map.put("success", 0);
                    map.put("msg", "评论失败");
                }
            } else {
                map.put("success", "0");
                map.put("msg", "用户未登录！");
            }
            response.getWriter().write(JsonUtils.convertToString(map));
        } catch (DataBaseException e) {
            log.error(e);
        } catch (InvalidParametersException e) {
            log.error(e);
        }
    }

    /**
     * 点赞 <br>
     * <p>
     * Description: <br>
     * <a href=mailto:miaozhq@inspur.com></a><br>
     * <p>
     * Date: 2017年2月15日 下午2:38:47<br/>
     * <p>
     * 
     * @param request
     * @param response
     * @throws ServletException
     * @throws IOException
     * @see void
     */
    @SuppressWarnings({"rawtypes", "unchecked" })
    public void doPraise(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            Map<String, Object> userInfo = (Map<String, Object>) request.getSession().getAttribute("userInfo");
            HashMap map = new HashMap();
            if (userInfo != null) {
                String message_id = ParamUtil.getString(request, "message_id", "");
                Map param = new HashMap();
                param.put("obj_id", message_id);
                param.put("obj_type", 1);
                param.put("create_time", new Timestamp(System.currentTimeMillis()));
                param.put("praise_status", 0);
                param.put("uid", userInfo.get("uid").toString());
                int res = PortalUtils.getUserPraiseService().addUserPraise(param);
                if (res > 0) {
                    PortalUtils.getMessageFeedBackService().updateMessageSupportNum(Integer.parseInt(message_id), "add");
                    map.put("code", "000000");
                    map.put("info", "点赞成功");
                    map.put("id", res);
                } else {
                    map.put("code", "000002");
                    map.put("info", "点赞失败");
                }
            } else {
                map.put("code", "000001");
                map.put("info", "用户未登录！");
            }
            response.getWriter().write(JsonUtils.convertToString(map));
        } catch (DataBaseException e) {
            log.error(e);
        } catch (InvalidParametersException e) {
            log.error(e);
        }
    }

    /**
     * 取消点赞 <br>
     * <p>
     * Description: <br>
     * <a href=mailto:miaozhq@inspur.com></a><br>
     * <p>
     * Date: 2017年2月15日 下午2:40:03<br/>
     * <p>
     * 
     * @param request
     * @param response
     * @throws ServletException
     * @throws IOException
     * @see void
     */
    @SuppressWarnings({"unchecked", "rawtypes" })
    public void doDelPraise(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            Map<String, Object> userInfo = (Map<String, Object>) request.getSession().getAttribute("userInfo");
            HashMap map = new HashMap();
            if (userInfo != null) {
                String message_id = ParamUtil.getString(request, "message_id", "");
                String praise_id = ParamUtil.getString(request, "praise_id", "");
                if (null != praise_id && "" != praise_id) {
                    int res = PortalUtils.getUserPraiseService().delUserPraise(Integer.parseInt(praise_id));
                    if (res > 0) {
                        PortalUtils.getMessageFeedBackService().updateMessageSupportNum(Integer.parseInt(message_id), "del");
                        map.put("code", "000000");
                        map.put("info", "取消成功");
                    } else {
                        map.put("code", "000002");
                        map.put("info", "取消失败");
                    }
                } else {
                    map.put("code", "000003");
                    map.put("info", "参数不正确");
                }
            } else {
                map.put("code", "000001");
                map.put("info", "用户未登录！");
            }
            response.getWriter().write(JsonUtils.convertToString(map));
        } catch (DataBaseException e) {
            log.error(e);
        } catch (InvalidParametersException e) {
            log.error(e);
        }
    }

    /**
     * 
     * @title doGetFileDownloadAddr<br/>
     * <p>Description: 检测是否有权限下载
     * <br>
     * @author <a href=mailto:yinyin@inspur.com></a><br>
     * <p>Date: 2017年4月20日 下午2:33:16<br/>
     * <p>
     *  	 0000：文件无限制下载使用，或者文件已申请授权，正常使用
	 *       0001：超过下载限制次数
	 *       0002：文件使用未授权，用户无使用文件的权限
	 *       0003：文件申请已过期，请重新申请
	 *       0004：文件不存在或已下线
	 *       0009：用户未申请使用，无使用文件的权限
	 *       0008: 用户未登录
     * @param request
     * @param response
     * @throws IOException   
     * @see void
     */
    public void doCheckDownloadAuth(HttpServletRequest request, final HttpServletResponse response) throws IOException {
        try {
            Map<String, Object> map = new HashMap<String, Object>();
            String fileId = request.getParameter("fileId");
            
            //登录后才可以下载
            Map<String, Object> userInfo = (Map<String, Object>) request.getSession().getAttribute("userInfo");
            if(userInfo == null || userInfo.get("uid") == null){
            	 map.put("code", "0008");
                 map.put("msg", "用户未登录!");
            }else{
            	if(fileId == null || "".equals(fileId)){
            		 map.put("code", "0004");
                     map.put("msg", "文件不存在或已下线");
            	}else{
            		//#下载需要判断下载次数限制
                	map = DataUtils.getCatalogFileService().validateFilePermission(fileId, userInfo.get("uid").toString());
                	//未开启目录授权，只要登录了且文件实际存在就可以下载
                	if(DataUtils.getCatalogFileService().getCatalogFileById(fileId)==null){
                		 map.put("code", "0004");
                         map.put("msg", "文件不存在或已下线");
                	}
            	}
            }
            if(!map.containsKey("code") ){
            	map.put("code", "0000");
                map.put("msg", "文件可以下载使用");
            }
            response.getWriter().write(JsonUtils.convertToString(map));// 返回前台数据
        } catch (Exception e) {
            log.error(e);
        } 
    }

    /**
     * 获取数据目录服务接口 <br>
     * <p>
     * Description: <br>
     * 
     * @param request
     * @param response
     * @throws ServletException
     * @throws IOExce
     * @see void
     */
    @SuppressWarnings("rawtypes")
    public void doGetApi(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
        	RequestParam param = ParamUtil.getRequestParam(request);
    		int draw = ParamUtil.getInteger(request, "draw", 1);
            String cata_id = ParamUtil.getString(request, "cata_id");
            if(cata_id!=null&&!"".equals(cata_id)){
            	// 获取数据目录相关服务列表
            	HashMap extendparam = new HashMap<String,Object>();
            	extendparam.put("conf_type", "2");
            	PaginationList<CatalogAPI> apipage = DataUtils.getCatalogApiService().queryCatalogApiPage(cata_id, extendparam,param.getPage(), param.getPageSize());
            	int recordsTotal = apipage.getTotalRecord();
                List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
                List<CatalogAPI> apiList = apipage.getRecords();
                // 存放当前数据目录所有的对应服务的应用ID
                if (apiList != null && apiList.size() > 0) {
                    for (int i = 0; i < apiList.size(); i++) {
                    	Map<String,Object> obj = new HashMap<String,Object>();
                    	CatalogAPI catalogApi = apiList.get(i);
                        String serviceId = catalogApi.getOpen_service_id();;
                        obj.put("open_service_id", serviceId);
                        Map serviceInfo = OamUtils.getServiceManageService().getServiceInfoById(serviceId);
                        if (null != serviceInfo) {
                            obj.put("service_name", serviceInfo.get("service_name"));
                            obj.put("service_desc", serviceInfo.get("service_desc"));
                            obj.put("version_name", serviceInfo.get("version_name"));
                            obj.put("service_uri", serviceInfo.get("context"));
                            obj.put("api_result", serviceInfo.get("api_result"));
                            if (serviceInfo != null && serviceInfo.containsKey("additional_info") && serviceInfo.get("additional_info") != null) {
                                JSONObject add_info = JSONObject.fromObject(serviceInfo.get("additional_info").toString());
                                obj.put("additional_info", add_info);
                            }
                        }
                        list.add(obj);
                    }
                }
                if(param.getPage() == 1){//第一页时增加平台默认服务渲染
                	CatalogConfigure conf = DataUtils.getCatalogConfigureService().getCatalogConfigure(cata_id, "2");
                	String use_type = conf.getUse_type();
                	if(use_type.indexOf("1")>=0 || use_type.indexOf("4")>=0){//数据集或地图
                		//平台默认目录服务，目前仅有获取数据目录元数据的
            			Map serviceInfo = OamUtils.getServiceManageService().getServiceInfo("/catalog/get_columns", "1.0");
            			if (serviceInfo != null && serviceInfo.containsKey("additional_info") && serviceInfo.get("additional_info") != null) {
            				serviceInfo.put("open_service_id", serviceInfo.get("service_id"));
            				JSONObject add_info = JSONObject.fromObject(serviceInfo.get("additional_info").toString());
            				serviceInfo.put("additional_info", add_info);
            				serviceInfo.put("service_uri", serviceInfo.get("context"));
            				list.add(serviceInfo);
                        }
                	}
                	
                }
                PageList<Map<String, Object>> pagelist = new PageList<Map<String, Object>>();
                pagelist.setData(list);
                pagelist.setRecordsTotal(recordsTotal);
                pagelist.setRecordsFiltered(recordsTotal);
                pagelist.setDraw(draw);
                response.getWriter().write(JsonUtils.convertToString(pagelist));
            }
        } catch (Exception e) {
            log.error(e);
        }
    }

    /**
     * 
     * @title doAddScore<br/>
     * <p>
     * Description: 评分 <br>
     * @author liuyuanjian<br>
     * <p>
     * Date: 2016-6-29 上午10:46:48<br/>
     * <p>
     * @param request
     * @param response
     * @see void
     */
    @SuppressWarnings("unchecked")
    public void doAddScore(HttpServletRequest request, HttpServletResponse response) {
        Map<String, String> map = new HashMap<String, String>();
        String cata_id = ParamUtil.getString(request, "cata_id", "");
        int score = ParamUtil.getInteger(request, "score", 0);
        try {
            if (cata_id != null && !"".equals(cata_id)) {
                Map<String, Object> userInfo = (Map<String, Object>) request.getSession().getAttribute("userInfo");
                if (userInfo != null) {
                    UserScore userscore = new UserScore();
                    String uid = userInfo.get("uid").toString();
                    // 判断当前用户是否已经参与过评分
                    boolean existScore = PortalUtils.getUserScoreService().existUserScore(1, cata_id, uid);
                    if (!existScore) {
                        // 更新评分明细表
                        userscore.setUid(uid);
                        userscore.setScore(score);
                        userscore.setObject_type(1);
                        userscore.setObject_id(cata_id);
                        userscore.setCreate_time(new java.util.Date());
                        int result = PortalUtils.getUserScoreService().addUserScore(userscore);
                        // 获取当前日期零点
                        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
                        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                        Calendar calendar = Calendar.getInstance();
                        String time = sdf.format(calendar.getTime()) + " 00:00:00";
                        Date date = format.parse(time);
                        // 数据目录 评分加1
                        DataCatalogStatisticDay catalogStatisticDay = new DataCatalogStatisticDay();
                        catalogStatisticDay.setCata_id(cata_id);
                        catalogStatisticDay.setStatistics_date(date);
                        catalogStatisticDay.setAudience_type("2");
                        catalogStatisticDay.setScore_count(1);
                        catalogStatisticDay.setTotal_score(score);
                        catalogStatisticDay.setUpdate_time(new Date());
                        DataUtils.getDataCatalogStatisticDayService().addDataCatalogStatisticDay(catalogStatisticDay);
                        if (result > 0) {
                            map.put("code", "000000");
                            map.put("msg", "保存成功！");
                            //新开发审计，记录数据目录评分操作
                            try {
                                //获取数据目录名称
                            	Catalog catalog = DataUtils.getCatalogServiceNew().getCatalogById(cata_id);
                            	if(catalog!=null){
                            		String cata_name = catalog.getCata_title();
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
                                    auditlog.setOp_type("score");//目录评分
                                    auditlog.setUser_id(String.valueOf(userInfo.get("uid")));
                                    auditlog.setUser_name(String.valueOf(userInfo.get("nick_name")));
                                    String site_code=request.getSession().getAttribute("area_code").toString();
                                    if(StringUtils.isNotEmpty(site_code)){
                                    	auditlog.setSite_code(site_code);
                                    }
                                    //添加审计日志
                                    UserOperationLogService operLog = PortalUtils.getUserOperationLogService();
                                    operLog.add(auditlog);
                            	}
                            } catch (Exception e) {
                                log.error("目录评分审计日志添加失败", e);
                            }
                        } else {
                            map.put("code", "000002");
                            map.put("msg", "保存失败！");
                        }
                    } else {
                        map.put("code", "000003");
                        map.put("msg", "当前用户已参与过评分！");
                    }
                } else {
                    map.put("code", "000001");
                    map.put("msg", "用户未登录！");
                }
            }
            response.getWriter().write(JsonUtils.convertToString(map));
        } catch (Exception e) {
            e.printStackTrace();
            log.error(e, e);
        }
    }

    /**
     * 
     * @title doSaveFavorite<br/>
     * <p>
     * Description: 收藏 <br>
     * @author liuyuanjian<br>
     * <p>
     * Date: 2016-6-28 上午21:50:12<br/>
     * <p>
     * @param request
     * @param response
     * @throws ServletException
     * @throws IOException
     * @see void
     */
    @SuppressWarnings("unchecked")
    public void doSaveFavorite(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        UserCollection userCollection = new UserCollection();
        try {
            Map<String, String> map = new HashMap<String, String>();
            Map<String, Object> userInfo = (Map<String, Object>) request.getSession().getAttribute("userInfo");
            if (userInfo != null) {
                int obj_type = ParamUtil.getInteger(request, "obj_type", 1);
                String obj_id = ParamUtil.getString(request, "cata_id", "");
                String object_name = ParamUtil.getString(request, "obj_name", "");
                Integer uid = (Integer) userInfo.get("uid");
                if (obj_type != 0 && StringUtils.isNotBlank(obj_id)) {
                    userCollection.setObject_id(obj_id);
                    userCollection.setUid(uid);
                    // 1，目录，2应用
                    userCollection.setObject_type(obj_type);
                    userCollection.setCreateTime(new Date());
                    userCollection.setObject_extend_param("setObject_extend_param");
                    userCollection.setObject_name(object_name);
                    userCollection.setStatus(0);
                    int result = PortalUtils.getUserCollectionService().addUserCollection(userCollection);
                    if (result > 0) {
                    	String optype = "catalog";
                    	if(obj_type == 1){
                    		 // 获取当前日期零点
                            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
                            SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                            Calendar calendar = Calendar.getInstance();
                            String time = sdf.format(calendar.getTime()) + " 00:00:00";
                            Date date = format.parse(time);
                            // 数据集收藏数加1
                            DataCatalogStatisticDay catalogStatisticDay = new DataCatalogStatisticDay();
                            catalogStatisticDay.setCata_id(obj_id);
                            catalogStatisticDay.setStatistics_date(date);
                            catalogStatisticDay.setAudience_type("2");
                            catalogStatisticDay.setFav_count(1);
                            catalogStatisticDay.setUpdate_time(new Date());
                            DataUtils.getDataCatalogStatisticDayService().addDataCatalogStatisticDay(catalogStatisticDay);
                    	}else{
                    		optype = "app";
                    	}
                    	map.put("fav_id", String.valueOf(obj_id));
                        map.put("code", "000000");
                        map.put("msg", "订阅成功！");
                        //新开发审计，记录数据目录收藏操作
                        try {
                        	UserOperationLog auditlog = new UserOperationLog();
                            auditlog.setLog_lk_id(null);
                            auditlog.setClient_browser(SystemUtil.getRequestBrowserInfo(request));
                            auditlog.setClient_code(null);
                            auditlog.setClient_ip(SystemUtil.getIpAddr(request));
                            auditlog.setClient_system(SystemUtil.getRequestSystemInfo(request));
                            auditlog.setClient_type("PC");
                            auditlog.setCreate_time(new Date());
                            auditlog.setObj_id(obj_id);
                            auditlog.setObj_name(object_name);//数据目录名称
                            auditlog.setObj_type(optype);
                            auditlog.setOp_type("fav");//目录收藏
                            auditlog.setUser_id(String.valueOf(userInfo.get("uid")));
                            auditlog.setUser_name(String.valueOf(userInfo.get("nick_name")));
                            String site_code=request.getSession().getAttribute("area_code").toString();
                            if(StringUtils.isNotEmpty(site_code)){
                            	auditlog.setSite_code(site_code);
                            }
                            //添加审计日志
                            UserOperationLogService operLog = PortalUtils.getUserOperationLogService();
                            operLog.add(auditlog);
                        } catch (Exception e) {
                            log.error("目录收藏审计日志添加失败", e);
                        }
                    } else {
                        map.put("code", "000005");
                        map.put("msg", "订阅失败！");
                    }
                } else {
                    map.put("code", "000002");
                    map.put("msg", "信息不完整！");
                }
            } else {
                map.put("code", "000001");
                map.put("msg", "用户未登录！");
            }
            response.getWriter().write(JsonUtils.convertToString(map));// 返回前台数据
        } catch (Exception e) {
            log.error(e);
        }
    }

    /**
     * 
     * @title doCancelFavorite<br/>
     * <p>
     * Description: 取消收藏 <br>
     * @author user<br>
     * <p>
     * Date: 2016-6-28 下午09:45:10<br/>
     * <p>
     * @param request
     * @param response
     * @throws ServletException
     * @throws IOException
     * @see void
     */
    @SuppressWarnings("unchecked")
    public void doCancelFavorite(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            Map<String, String> map = new HashMap<String, String>();
            Map<String, Object> userInfo = (Map<String, Object>) request.getSession().getAttribute("userInfo");
            if (userInfo != null) {
                String obj_type = ParamUtil.getString(request, "obj_type", "1");
                String obj_id = ParamUtil.getString(request, "cata_id");
                String uid = userInfo.get("uid").toString();
                if (StringUtils.isNotEmpty(obj_id) || StringUtils.isNotEmpty(obj_type)) {
                    int result = PortalUtils.getUserCollectionService().deleteUserCollection(obj_id, obj_type, uid);
                    if (result > 0) {
                    	String optype = "catalog",objname = "";
                    	if("1".equals(obj_type)){
                    		 // 获取当前日期零点
                            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
                            SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                            Calendar calendar = Calendar.getInstance();
                            String time = sdf.format(calendar.getTime()) + " 00:00:00";
                            Date date = format.parse(time);
                            // 数据集收藏数减1
                            DataCatalogStatisticDay catalogStatisticDay = new DataCatalogStatisticDay();
                            catalogStatisticDay.setCata_id(obj_id);
                            catalogStatisticDay.setStatistics_date(date);
                            catalogStatisticDay.setAudience_type("2");
                            catalogStatisticDay.setFav_count(-1);
                            catalogStatisticDay.setUpdate_time(new Date());
                            DataUtils.getDataCatalogStatisticDayService().addDataCatalogStatisticDay(catalogStatisticDay);
                            
                            Catalog catalog = DataUtils.getCatalogServiceNew().getCatalogById(obj_id);
                            if(catalog!=null){
                            	objname = catalog.getCata_title();
                            }
                    	}else{
                    		optype = "app";
                    		Map appinfo = OamUtils.getAppService().getAppInfoByAppId(obj_id);
                    		if(appinfo!=null){
                    			objname = String.valueOf(appinfo.get("app_name"));
                    		}
                    	}
                        map.put("code", "000000");
                        map.put("msg", "取消订阅成功！");
                        //新开发审计，记录数据目录取消收藏操作
                        try {
                    		UserOperationLog auditlog = new UserOperationLog();
                            auditlog.setLog_lk_id(null);
                            auditlog.setClient_browser(SystemUtil.getRequestBrowserInfo(request));
                            auditlog.setClient_code(null);
                            auditlog.setClient_ip(SystemUtil.getIpAddr(request));
                            auditlog.setClient_system(SystemUtil.getRequestSystemInfo(request));
                            auditlog.setClient_type("PC");
                            auditlog.setCreate_time(new Date());
                            auditlog.setObj_name(objname);
                            auditlog.setObj_id(obj_id);
                            auditlog.setObj_type(optype);
                            auditlog.setOp_type("favCancel");
                            auditlog.setUser_id(String.valueOf(userInfo.get("uid")));
                            auditlog.setUser_name(String.valueOf(userInfo.get("nick_name")));
                            String site_code=request.getSession().getAttribute("area_code").toString();
                            if(StringUtils.isNotEmpty(site_code)){
                            	auditlog.setSite_code(site_code);
                            }
                            //添加审计日志
                            UserOperationLogService operLog = PortalUtils.getUserOperationLogService();
                            operLog.add(auditlog);
                        } catch (Exception e) {
                            log.error("目录取消收藏审计日志添加失败", e);
                        }
                    } else {
                        map.put("code", "000005");
                        map.put("msg", "取消订阅失败！");
                    }
                } else {
                    map.put("code", "000002");
                    map.put("msg", "信息不完整！");
                }
            } else {
                map.put("code", "000001");
                map.put("msg", "用户未登录！");
            }
            response.getWriter().write(JsonUtils.convertToString(map));// 返回前台数据
        } catch (Exception e) {
            log.error(e);
        }
    }

    /**
     * 文件下载 <br>
     * 废弃，此方法没有通过登录过滤器过滤，可能导致不登录就能下载文件。改为CatalogDetailDownload。doGetFileDownloadAddr
     * <p>
     * Description: <br>
     * <a href=mailto:miaozhq@inspur.com></a><br>
     * <p>
     * Date: 2017年2月15日 下午2:47:37<br/>
     * <p>
     * 
     * @param request
     * @param response
     * @throws IOException
     * @see void
     */
    /*public void doGetFileDownloadAddr(HttpServletRequest request, final HttpServletResponse response) throws IOException {
        try {
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
            DataCatalogStatistic catalogStatistic = new DataCatalogStatistic(cata_id, "2", 0, 0, 0, 0, 0, 0, 0f, 0, 0, 0, 0, 0, 0, 0, new Date());
            catalogStatistic.setUse_file_count(1);
            DataUtils.getDataCatalogStatisticService().addDataCatalogStatistic(catalogStatistic);

            Map<String, Object> userInfo = (Map<String, Object>) request.getSession().getAttribute("userInfo");
            String uid = "";
            String userName = "";
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
            } catch (Exception e) {
                log.error("目录文件下载审计日志添加失败", e);
            }
        } catch (Exception e) {
            log.error(e);
        }
    }*/

    /**
     * 验证用户是否登录 <br/>
     * <p>
     * Description: TODO <br/>
     * <p>
     * Author: <a href="mailto:zhang_hy@inspur.com">张华蕴</a><br/>
     * <p>
     * Date: 2017年3月13日-下午4:00:39<br/>
     * <p>
     * 
     * @param request
     * @param response
     * @throws IOException
     * 
     */
    public void doCheckLogin(HttpServletRequest request, final HttpServletResponse response) throws IOException {
        Map<String, String> map = new HashMap<String, String>();
        Map<String, Object> userInfo = (Map<String, Object>) request.getSession().getAttribute("userInfo");
        if (userInfo != null) {
            map.put("code", "000000");
            map.put("msg", "用户已登录！");
        } else {
            map.put("code", "000001");
            map.put("msg", "用户未登录！");
        }
        response.getWriter().write(JsonUtils.convertToString(map));// 返回前台数据
    }

    /**
     * 获取目录详情 - 手机APP使用 <br>
     * <p>
     * Description: <br>
     * <a href=mailto:miaozhq@inspur.com></a><br>
     * <p>
     * Date: 2017年3月14日 上午10:59:34<br/>
     * <p>
     * 
     * @param request
     * @param response
     * @throws ServletException
     * @throws IOException
     * @see void
     */
    public void doGetCatalogDetailForApp(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
        	String cata_id = ParamUtil.getString(request, "cata_id", "");
        	Map<String, Object> result = new HashMap<>();
            if (cata_id != null && !"".equals(cata_id.trim())) {
            	cata_id = cata_id.trim();
            	// 返回cata_id
            	result.put("cata_id", cata_id);
                // 指定并返回当前tab页
                String target_tab = ParamUtil.getString(request, "target_tab", "");
                result.put("target_tab", target_tab);
                // 获取开放目录信息
                OpenCatalog openCatalog = DataUtils.getOpenCatalogService().getOpenCatalogByCataId(cata_id);
                result.put("openCatalog", openCatalog);
                
                if(openCatalog!=null){
                	/*
                     * 字典项处理
                     */
                    Map<String,String> openCatalogFromDict = new HashMap<String,String>();
                    //开放类型
                    openCatalogFromDict.put("open_type",UserUtils.getDictItemValue("catalog_open_type", openCatalog.getOpen_type()));
                    //更新频率
                    openCatalogFromDict.put("conf_update_cycle",UserUtils.getDictItemValue("catalog_update_cycle", openCatalog.getConf_update_cycle()));
                    //数据格式
                    String conf_use_type = "";
                    String use_type = openCatalog.getConf_use_type();
                    if (StringUtils.isNotEmpty(use_type)) {
                        String[] stringArr = use_type.split(",");
                        for (int i = 0; i < stringArr.length; i++) {
                        	if( !"".equals(UserUtils.getDictItemValue("catalog_use_type",  stringArr[i]))){
                        		if ("".equals(conf_use_type)){
                        			conf_use_type += UserUtils.getDictItemValue("catalog_use_type",  stringArr[i]);
                        		}else{
                        			conf_use_type = conf_use_type+"，" +UserUtils.getDictItemValue("catalog_use_type",  stringArr[i]);
                        		}
                        	}
                        }
                    }
                    openCatalogFromDict.put("conf_use_type",conf_use_type);
                    
                    // 目录数据量级
                    openCatalogFromDict.put("conf_cata_magnitude",UserUtils.getDictItemValue("data_catalog_magnitude", openCatalog.getConf_cata_magnitude()));
                    // 目录是否允许预览
                    openCatalogFromDict.put("conf_is_view",UserUtils.getDictItemValue("catalog_is_view", String.valueOf(openCatalog.getConf_is_view())));
                    // 目录是否允许下载
                    openCatalogFromDict.put("conf_download_enable",UserUtils.getDictItemValue("catalog_download_enable", String.valueOf(openCatalog.getConf_download_enable())));
                    
                    result.put("openCatalogFromDict", openCatalogFromDict);
                    
                  //所属主题分组
                    List<CatalogGroupLink> cataLogGroups = openCatalog.getCataLogGroups();
                    String cataLogGroupsStr = "";
                    if(cataLogGroups!=null){
                    	for (CatalogGroupLink catalogGroupLink : cataLogGroups) {
							if(catalogGroupLink!=null&&catalogGroupLink.getGroup_name()!=null &&!"".equals(catalogGroupLink.getGroup_name())){
								if("".equals(cataLogGroupsStr)){
									cataLogGroupsStr+=catalogGroupLink.getGroup_name();
								}else{
									cataLogGroupsStr=cataLogGroupsStr+"，"+catalogGroupLink.getGroup_name();
								}
							}
						}
                    }
                    request.setAttribute("cataLogGroupsStr", cataLogGroupsStr);
                	//所属行业分组
                	List<CatalogGroupLink> cataLogIndustrys = openCatalog.getCataLogIndustrys();
                	String cataLogIndustrysStr = "";
                	if(cataLogIndustrys!=null){
                		for (CatalogGroupLink catalogGroupLink : cataLogIndustrys) {
							if(catalogGroupLink!=null &&catalogGroupLink.getGroup_name()!=null &&!"".equals(catalogGroupLink.getGroup_name())){
								if("".equals(cataLogIndustrysStr)){
									cataLogIndustrysStr+=catalogGroupLink.getGroup_name();
								}else{
									cataLogIndustrysStr=cataLogIndustrysStr+"，"+catalogGroupLink.getGroup_name();
								}
							}
						}
                	}
                	request.setAttribute("cataLogIndustrysStr", cataLogIndustrysStr);
                    
                    // 查询数据目录是否被该用户收藏
                    Map<String, Object> userInfo = (Map<String, Object>) request.getSession().getAttribute("userInfo");
                    int isFav = 0;
                    if (userInfo != null) {
                        Map<String, Object> qMap = new HashMap<String, Object>();
                        qMap.put("object_id", cata_id);
                        qMap.put("object_type", "1");// 1:数据目录，2:API服务 3:应用,4:资讯
                                                     // 依据user_collection表中字段定义
                        qMap.put("uid", userInfo.get("uid"));
                        List<UserCollection> queryUserCollectionList = PortalUtils.getUserCollectionService().queryUserCollectionList(qMap);
                        isFav = queryUserCollectionList.size();
                    }
                    result.put("isFav", isFav);
                }
            }
            response.getWriter().write(JsonUtils.convertToString(result));
        } catch (Exception e) {
            log.error(e, e);
        }
    }
    
    public void doGetMapPointDataTest(HttpServletRequest request, HttpServletResponse response) throws Exception {
    	String cata_id = ParamUtil.getString(request, "cata_id", "");
    	
    	List<Map<String, String>> mapStringList = new ArrayList<Map<String, String>>();
    	Map<String,String> map1 = new HashMap<String,String>();
		map1.put("TITLE", "测试地点58633");
		map1.put("ADDRESS", "测试地点58633地址位置");
		map1.put("PHONE", "0531-09879078");
		map1.put("LONGITUDE", "119.31126708984374");
		map1.put("LATITUDE", "26.07217498779297");
		Map<String,String> map2 = new HashMap<String,String>();
		map2.put("TITLE", "测试地点58445");
		map2.put("ADDRESS", "测试地点58445地址位置");
		map2.put("PHONE", "0531-09858445");
		map2.put("LONGITUDE", "119.4556086427682");
		map2.put("LATITUDE", "26.10273209486138");
		mapStringList.add(map1);
		mapStringList.add(map2);
		response.getWriter().write(JsonUtils.convertToString(mapStringList));
    }
    /**
	 * 下载文件，无权限控制，不产生下载记录,主要用于服务测试用例
	 * 并且传入文件名
	 * <br>
	 * <p>Description: 
	 * <br>
	 * <a href=mailto:miaozhq@inspur.com></a><br>
	 * <p>Date: 2016年12月26日 下午3:59:26<br/>
	 * <p>
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException   
	 * @see void
	 */
	public void doDownLoadFile(HttpServletRequest request, final HttpServletResponse response)
			throws ServletException, IOException {
		try{
			//传入doc_id
			String doc_id = request.getParameter("fileId");
			String fileBucketType = request.getParameter("fileType");
			//final String fileName = request.getParameter("fileName");
			final String fileName = new String(request.getParameter("fileName").getBytes("iso-8859-1"), "utf-8");  
			
			//判断文件存储位置
			FileType ft = null;
			switch (fileBucketType){
	    	case ("share_app_data"):
	    		ft = FileType.SHARE_APP_DATA;
	    		break;
	    	case ("share_datacatalog_file"):
	    		ft = FileType.SHARE_DATACATALOG_FILE;
	    		break;
	    	case ("open_app_data"):
	    		ft = FileType.OPEN_APP_DATA;
	    		break;
	    	case ("open_datacatalog_file"):
	    		ft = FileType.OPEN_DATACATALOG_FILE;
	    		break;
	    	}
			//下载
			IFileStore fileStore = FileStoreFactory.getFileStore();
			if(fileStore.isFileExist(doc_id, ft)) {
				fileStore.getFile(doc_id, ft, new FileReader() {
					public void readFile(InputStream in) {
						try {
							String contentType = "application/octet-stream; charset=utf-8";
							String disposition = fileName ;
							response.setHeader("Content-Disposition", "attachment; filename=" + URLEncoder.encode(disposition,"UTF-8")) ;
							response.setContentType(contentType);
							OutputStream out = response.getOutputStream();
							byte[] buffer = new byte[4*1024];
							int length = -1;
							while((length = in.read(buffer)) != -1) {
								out.write(buffer, 0, length);
							}
							out.close();
						} catch(Exception e) {
							e.printStackTrace();
						} 
					}
				});
			}else {
				response.getWriter().write(JsonUtils.convertToString("文件不存在"));
			}
		}catch(Exception e){
			e.printStackTrace();
		}
	}
	/**
	 * 获取目录文件下载列表
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	public void doGetDownLoadInfo(HttpServletRequest request, final HttpServletResponse response)
			throws ServletException, IOException {
    	String cata_id = request.getParameter("cata_id");
		String conf_type = request.getParameter("conf_type");
		String file_type = request.getParameter("file_type");
        // 获取文件下载列表
        List<CatalogFile> files = DataUtils.getCatalogFileService().getCatalogFile(cata_id, conf_type, file_type);
        if(files!=null && files.size()>0){
        	for(CatalogFile file : files){
        		String filename = file.getFileName();
        		if(filename.indexOf("xls")>=0){
        			file.setFileDescription("xls");
        		}else if(filename.indexOf("json")>=0){
        			file.setFileDescription("json");
        		}else if(filename.indexOf("xml")>=0){
        			file.setFileDescription("xml");
        		}else if(filename.indexOf("csv")>=0){
        			file.setFileDescription("csv");
        		}else{
        			file.setFileDescription("zip");
        		}
        		
        		file.setFileFormat(file.getFileFormat().toLowerCase());
        		file.setUpdateTime(file.getUpdateTime().substring(0, 19));
        	}
        }
        Map data = new HashMap();
        data.put("data", files);
        response.getWriter().write(JsonUtils.convertToString(data));
    }
	/**
	 * 获取目录关联信息
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	public void doGetCataRelactionInfo(HttpServletRequest request, final HttpServletResponse response)
			throws ServletException, IOException {
    	String cata_id = ParamUtil.getString(request, "cata_id", "");
		List<OpenCatalog> linkCatalogList =  DataUtils.getOpenCatalogService().getRelatedOpenCatalogList (cata_id, 5);
		Map data = new HashMap();
        data.put("data", linkCatalogList);
		// 返回相关应用列表
        response.getWriter().write(JsonUtils.convertToString(data));
    }
	public void doGetAppRelactionInfo(HttpServletRequest request, final HttpServletResponse response)
			throws ServletException, IOException {
    	String cata_id = ParamUtil.getString(request, "cata_id", "");
		Map data = new HashMap();
		// 获取数据目录相关服务列表
        List<CatalogAPI> apiList = DataUtils.getCatalogApiService().getCatalogAPI(cata_id, "2");
        List<String> apiidlist = new ArrayList<String>();
		if (apiList != null && apiList.size() > 0) {
			for (int i = 0; i < apiList.size(); i++) {
				CatalogAPI catalogApi = apiList.get(i);
				if(catalogApi.getOpen_service_id()!=null && !"".equals(catalogApi.getOpen_service_id())){
					apiidlist.add(catalogApi.getOpen_service_id());
				}
				
			}
			data.put("data", OamUtils.getServiceSubscriptionService().getSubscribeServiceAppListByServiceIds(apiidlist));
		}
		// 返回相关应用列表
        response.getWriter().write(JsonUtils.convertToString(data));
    }
}
