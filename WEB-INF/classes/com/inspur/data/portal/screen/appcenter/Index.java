package com.inspur.data.portal.screen.appcenter;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.exception.ExceptionUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.loushang.internet.util.JsonUtils;
import org.loushang.internet.view.ViewHandler;

import com.inspur.data.common.exception.DataBaseException;
import com.inspur.data.common.exception.InvalidParametersException;
import com.inspur.data.common.file.FileReader;
import com.inspur.data.common.file.FileStoreFactory;
import com.inspur.data.common.file.FileType;
import com.inspur.data.common.file.IFileStore;
import com.inspur.data.common.file.ResponseHeaderReader;
import com.inspur.data.common.web.PaginationList;
import com.inspur.data.common.web.ParamUtil;
import com.inspur.data.logger.SystemLogger;
import com.inspur.portal.model.user.UserCollection;
import com.inspur.portal.model.user.UserOperationLog;
import com.inspur.utils.AuditLogUtil;
import com.inspur.utils.OamUtils;
import com.inspur.utils.PortalUtils;
import com.inspur.utils.UCUtil;

/**
 * 
 * <strong>Title : appcenter<br>
 * </strong> <strong>Description : </strong>应用商店<br>
 * <strong>Create on : 2014年9月3日 下午15:36:40<br>
 * </strong>
 * <p>
 * <strong>Copyright (C) Inspur Co.,Ltd.<br>
 * </strong>
 * <p>
 * 
 * @author <a href="mailto:miaojch@inspur.com">miaojch</a><br>
 * @version <strong>V1.0</strong><br>
 *          <br>
 *          <strong>修改历史:</strong><br>
 *          修改人 修改日期 修改描述<br>
 *          -------------------------------------------<br>
 *          <br>
 *          <br>
 */
public class Index implements ViewHandler {
    private static final Log log = LogFactory.getLog(Index.class);

    public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            // 应用分类
            Map<String, Object> param = new HashMap<String, Object>();
            Map<String, Object> ListMap = OamUtils.getAppService().findAppGroup(param, 99, 1);
            List<Map<String, Object>> groupList = (List<Map<String, Object>>) ListMap.get("data");
            List<Map> resGroupList = new ArrayList<Map>();
            for (Map<String, Object> group : groupList) {
                Map resGroupInfo = new HashMap();
                resGroupInfo.put("group_code", (String) group.get("id"));
                resGroupInfo.put("group_name", (String) group.get("name"));
                resGroupList.add(resGroupInfo);
            }
            request.setAttribute("resGroup", resGroupList);
        } catch (Exception e) {
            SystemLogger.error("AppInfoAction", "应用商店首页渲染失败", ExceptionUtils.getMessage(e));
        } finally {
            // 记录页面访问日志
            AuditLogUtil.addPageVisitAutiLog(request, "应用商店", "");
        }
    }

    public void doGetAppListByPage(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        int page = ParamUtil.getInteger(request, "page", 1);
        int pageSize = ParamUtil.getInteger(request, "pageSize", 1);
        int oderlist = ParamUtil.getInteger(request, "oderlist", 0);
        String groupid = ParamUtil.getString(request, "groupid");
        String searchKey = ParamUtil.getString(request, "searchKey");
        String platForm = ParamUtil.getString(request, "platForm");
        String regionCode = (String) request.getSession().getAttribute("area_code");
        String flag_app = "1";
        PaginationList<Map<String, Object>> appInfoPaginationList = new PaginationList<Map<String, Object>>();
        List<Map<String, Object>> appInfoList = new ArrayList<Map<String, Object>>();
        Map<String, Object> userInfo = (Map<String, Object>) request.getSession().getAttribute("userInfo");
        int isFav = 0;
        try {
            Map params = new HashMap();
            params.put("flag_app", flag_app);
            if (regionCode != null && regionCode != "" && !regionCode.isEmpty()) {
                params.put("site_code", regionCode);
            }
            if (groupid != null && groupid != "" && !groupid.isEmpty()) {
                params.put("group_id", groupid);
            }
            if (platForm != null && platForm != "" && !platForm.isEmpty()) {
                params.put("platform_type", platForm);
            }
            params.put("search_key", searchKey);
            if (oderlist == 0) { // 综合排序
            	params.put("_order", "DATE_FORMAT(FROM_UNIXTIME(app.update_time),'%Y%m%d') DESC, statistic.download_amount DESC ");
            } else if (oderlist == 1) { // 最热排序
                params.put("_order", "statistic.download_amount desc");
            } else if (oderlist == 2) { // 最新排序
                params.put("_order", "app.update_time DESC ");
            } else if (oderlist == 3) { // 评分排序
                params.put("_order", "statistic.avg_grade DESC ");
            }
            params.put("install_status", 2);// 站点上线应用
            Map<String, Object> appMap = OamUtils.getAppService().findOnlineAppInfo(params, pageSize, page);
            if (appMap != null) {
                List<Map<String, Object>> appIdList = (List<Map<String, Object>>) appMap.get("data");
                for (Map<String, Object> appInfo : appIdList) {
                    // 处理版本信息
                    List<Map<String, Object>> appFeatureList = (List<Map<String, Object>>) appInfo.get("featureList");
                    if (!UCUtil.isBlank(appFeatureList)) {
                        for (Map<String, Object> Feature : appFeatureList) {
                            String platform_type = Feature.get("platform_type") == null ? "" : Feature.get("platform_type").toString();
                            String app_type = Feature.get("app_type") == null ? "" : Feature.get("app_type").toString();
                            String app_url = Feature.get("app_url") == null ? "" : Feature.get("app_url").toString();
                            if ("pc".equals(app_type)) {
                                appInfo.put(app_type, app_url);
                            } else {
                                appInfo.put(platform_type, app_url);
                            }
                        }
                    }
                    String app_id = String.valueOf(appInfo.get("app_id"));
                    Map<String, Object> map = new HashMap<String, Object>();
                    map.put("client_id", app_id);
                    Map feachInfo = OamUtils.getAppStatisticService().getAppStatisticCount(map);
                    if (feachInfo != null) {
                        appInfo.put("download_amount", feachInfo.get("download_amount"));
                        appInfo.put("use_amount", feachInfo.get("use_amount"));
                        appInfo.put("app_comment", feachInfo.get("comment_amount"));
                    }
                    // 收藏
                    if (userInfo != null && !"".equals(userInfo)) {
                        Map<String, Object> qMap = new HashMap<String, Object>();
                        qMap.put("object_id", app_id);
                        qMap.put("object_type", "3");// 3是应用4是数据目录
                        qMap.put("uid", userInfo.get("uid"));
                        List<UserCollection> queryUserCollectionList = PortalUtils.getUserCollectionService().queryUserCollectionList(qMap);
                        isFav = queryUserCollectionList.size();
                    }
                    appInfo.put("isFav", isFav);
                    appInfoList.add(appInfo);
                }
                appInfoPaginationList.setCurrPage((int) appMap.get("nowPage"));
                appInfoPaginationList.setPageSize(pageSize);
                appInfoPaginationList.setRecords(appInfoList);
                appInfoPaginationList.setTotalPage((int) appMap.get("totalPages"));
                appInfoPaginationList.setTotalRecord((int) appMap.get("count"));
                if (appInfoPaginationList != null) {
                	//response.setHeader("Access-Control-Allow-Origin", "*");
                    response.getWriter().write(JsonUtils.convertToString(appInfoPaginationList));
                }
            }
        } catch (Exception e) {
            SystemLogger.error("AppInfoAction", "分页查询应用信息失败", ExceptionUtils.getMessage(e));
        }
    }

    /**
     * 下载，主要用于应用的安装包 <br>
     * <p>
     * Description: <br>
     * <a href=mailto:miaozhq@inspur.com></a><br> <p>Date: 2016年12月30日
     * 下午2:39:00<br/> <p>
     * 
     * @param request
     * @param response
     * @throws ServletException
     * @throws IOException
     * @see void
     */
    public void doDownloadFile(HttpServletRequest request, final HttpServletResponse response) throws ServletException, IOException {
        try {
            // 传入doc_id
            String doc_id = request.getParameter("fileId");
            // 下载
            IFileStore fileStore = FileStoreFactory.getFileStore();
            if (fileStore.isFileExist(doc_id, FileType.OPEN_APP_DATA)) {
                fileStore.getFile(doc_id, FileType.OPEN_APP_DATA, new FileReader() {
                    @Override
                    public void readFile(InputStream in) {
                        try {
                            OutputStream out = response.getOutputStream();
                            byte[] buffer = new byte[4 * 1024];
                            int length = -1;
                            while ((length = in.read(buffer)) != -1) {
                                out.write(buffer, 0, length);
                            }
                            in.close();
                            out.close();
                            out.flush();
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    }
                }, new ResponseHeaderReader() {
                    @Override
                    public void readHeader(List<Map<String, String>> headers) {
                        for (Map<String, String> header : headers) {
                            if (header.get("name").equals("Content-Disposition")) {
                                String disposition = String.valueOf(header.get("value"));
                                String[] str = disposition.split(";");
                                String filename = str[1].split("=")[1];
                                try {
                                    response.setHeader("Content-Disposition", "attachment; filename=" + URLEncoder.encode(filename, "UTF-8"));
                                } catch (UnsupportedEncodingException e) {
                                    if (log.isErrorEnabled()) {
                                        log.error("编码转换错误", e);
                                    }
                                }
                            }
                            if (header.get("name").equals("Content-Type")) {
                                response.setHeader("Content-Type", header.get("value"));
                            }
                        }
                    }
                });
            } else {
                response.getWriter().write(JsonUtils.convertToString("文件不存在"));
            }
        } catch (Exception e) {
            if (log.isErrorEnabled()) {
                log.error("文件下载错误", e);
            }
        }
    }

    // 插入用户使用应用表数据
    public void doInsertUserApp(HttpServletRequest request, HttpServletResponse response) {
        String app_id = request.getParameter("app_id");
        String version_id = request.getParameter("feature_id");
        Map Userinfo = UCUtil.getUserInfo();
        Integer appcount = 0;
        if (Userinfo != null) {
            String uid = Userinfo.get("uid").toString();
            Map<String, Object> map = new HashMap<String, Object>();
            map.put("uid", uid);
            map.put("app_id", app_id);
            map.put("version_id", version_id);
            appcount = OamUtils.getAppAdminService().InsertUserApp(map);
            UserOperationLog userOperationLog = new UserOperationLog();
            userOperationLog.setObj_type("feature");
            userOperationLog.setObj_id(version_id);
            userOperationLog.setOp_type("download");
            userOperationLog.setUser_id(uid);
            userOperationLog.setUser_name(Userinfo.get("user_id").toString());
            String site_code = request.getSession().getAttribute("area_code").toString();
            if (StringUtils.isNotEmpty(site_code)) {
                userOperationLog.setSite_code(site_code);
            }
            try {
                PortalUtils.getUserOperationLogService().add(userOperationLog);
            } catch (DataBaseException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            } catch (InvalidParametersException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }
        try {
            response.getWriter().write(appcount);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * 统计上线应用版本的数量-手机客户端使用 <br>
     * <p>
     * Description: <br>
     * <a href=mailto:miaozhq@inspur.com></a><br> <p>Date: 2017年3月13日
     * 下午5:54:03<br/> <p>
     * 
     * @param request
     * @param response
     * @see void
     */
    public void doGetAllApp(HttpServletRequest request, HttpServletResponse response) {
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("app_status", 2);
        map.put("platform_type", "android");
        map.put("install_status", 2);// 站点上线应用
        try {
            Map<String, Object> resultmap = OamUtils.getAppService().findOnlineAppInfo(map, 99, 1);
            Integer appcount = Integer.valueOf(String.valueOf(resultmap.get("count")));
            response.getWriter().write(appcount.toString());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * 获取引用详情-手机客户端使用(因接口变动可能导致接口返回数据格式不正确，后续如果使用请进行相应调整)
     * <br>
     * <p>Description: 
     * <br>
     * <a href=mailto:miaozhq@inspur.com></a><br>
     * <p>Date: 2017年3月14日 上午9:40:21<br/>
     * <p>
     * @param request
     * @param response
     * @throws ServletException
     * @throws IOException   
     * @see void
     */
    public void doAppDetailinfo(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        int app_id = ParamUtil.getInteger(request, "app_id");
        Map<String, Object> mapAppInfo = new HashMap<String, Object>();
        Map app = OamUtils.getAppService().getAppInfoByAppId(String.valueOf(app_id));
        mapAppInfo.put("app_name", app.get("app_name"));
        mapAppInfo.put("developer_name", app.get("developer_name"));
        mapAppInfo.put("description", app.get("description"));
        mapAppInfo.put("app_id", app.get("app_id"));
        mapAppInfo.put("tag", app.get("tag"));
        mapAppInfo.put("user_name", app.get("user_name"));
        // 根据feature_id查询当前版本
        // if (appinfo.get("feature_id") != null) {
        // Map<String, Object> map = OamUtils.getAppAdminService()
        // .getAppFeatureById(appinfo.get("feature_id").toString());
        // if (map != null && map.get("website_app_open_type") != null) {
        // mapAppInfo.put("website_app_open_type",
        // map.get("website_app_open_type").toString());
        // }
        // }
        Map<String, Object> AppInfo = new HashMap<String, Object>();
        AppInfo.put("app_id", String.valueOf(app_id));
        Map appinfo = OamUtils.getAppService().findAppFeature(AppInfo, 99, 1);
        Map<String, Object> param = new HashMap<>();
        param.put("feature_id", appinfo.get("feature_id"));
        Map feachInfo = OamUtils.getAppStatisticService().getAppStatisticCount(param);
        mapAppInfo.put("use_count", feachInfo.get("use_amount"));
        Map<String, Object> appPic = new HashMap<String, Object>();
        appPic = (Map<String, Object>) appinfo.get("pic_info");
        if (null != appPic && !appPic.isEmpty() && appPic.containsKey("icon")) {
            List<String> iconList = (List<String>) appPic.get("icon");
            if (null != iconList && iconList.size() > 0) {
                mapAppInfo.put("app_logo", iconList.get(0));
            }
            List<String> previewList = (List<String>) appPic.get("preview");
            if (null != previewList && previewList.size() > 0) {
                mapAppInfo.put("app_preview", previewList);
            }
        }
        List<Map<String, Object>> groupList = new ArrayList<Map<String, Object>>();
        groupList = (List<Map<String, Object>>) appinfo.get("groupList");
        if (null != groupList && groupList.size() > 0) {
            List<String> group = new ArrayList<String>();
            for (int i = 0; i < groupList.size(); i++) {
                Map<String, Object> temp = groupList.get(i);
                if (temp.containsKey("name")) {
                    String group_name = (String) temp.get("name");
                    group.add(group_name);
                }
            }
            mapAppInfo.put("group", group);
        }
        Map scoreStatistics = OamUtils.getAppEvaluateService().getAppGradeStatistics(String.valueOf(app_id));
        if (null != scoreStatistics) {
            int gount1 = Integer.parseInt(String.valueOf(scoreStatistics.get("gcount1")));
            int gount2 = Integer.parseInt(String.valueOf(scoreStatistics.get("gcount2")));
            int gount3 = Integer.parseInt(String.valueOf(scoreStatistics.get("gcount3")));
            int gount4 = Integer.parseInt(String.valueOf(scoreStatistics.get("gcount4")));
            int gount5 = Integer.parseInt(String.valueOf(scoreStatistics.get("gcount5")));
            double total = Double.parseDouble(String.valueOf(scoreStatistics.get("total")));
            int score = gount1 * 1 + gount2 * 2 + gount3 * 3 + gount4 * 4 + gount5 * 5;
            double result = (double) score / total;
            mapAppInfo.put("score", result);
            request.setAttribute("appgrade", scoreStatistics);
        }
        List<Map<String, Object>> appFeatureList = OamUtils.getAppAdminService().getAppFeatures(String.valueOf(String.valueOf(app_id)));
        mapAppInfo.put("appFeatureList", appFeatureList);
        Map<String, Object> userInfo = (Map<String, Object>) request.getSession().getAttribute("userInfo");
        int isFav = 0;
        if (userInfo != null) {
            Map<String, Object> qMap = new HashMap<String, Object>();
            qMap.put("object_id", app_id);
            qMap.put("object_type", "3");// 3是应用4是数据目录
            qMap.put("uid", userInfo.get("uid"));
            // mapAppInfo.put("developer_name", userInfo.get("user_id"));
            List<UserCollection> queryUserCollectionList = PortalUtils.getUserCollectionService().queryUserCollectionList(qMap);
            isFav = queryUserCollectionList.size();
        }
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("appinfo", mapAppInfo);
        map.put("isFav", isFav);
        map.put("app_id", app_id);
        response.getWriter().write(JsonUtils.convertToString(map));
    }

    /**
     * 
     * @title doAddUseAmount<br/>
     * <p>Description: 使用次数增加1，直接在ac_app_statistic表中增加
     * <br>
     * @author cuihaichen<br>
     * <p>Date: 2018年4月25日 下午3:44:07<br/>
     * <p>
     * @param request
     * @param response
     * @throws ServletException
     * @throws IOException   
     * @see void
     */
    public void doAddUseAmount(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String client_id = request.getParameter("client_id");
        Map<String, Object> map = new HashMap();
        map.put("client_id", client_id);
        map.put("add_use_amount", "add_use_amount");
        OamUtils.getAppStatisticService().updateAppStatistic(map);
        Map<String, Object> retmMap = new HashMap<String, Object>();
        retmMap.put("flag", true);
        response.getWriter().write(JsonUtils.convertToString(retmMap));
    }
}
