package com.inspur.data.portal.screen.dev.console;

import java.io.IOException;
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
import org.loushang.internet.util.StringUtils;
import org.loushang.internet.view.ViewHandler;

import com.inspur.api.ac.IAppService;
import com.inspur.api.ac.IAppStatisticService;
import com.inspur.api.ac.IDeveloperService;
import com.inspur.common.utils.PropertiesUtil;
import com.inspur.data.common.exception.DataBaseException;
import com.inspur.data.common.exception.InvalidParametersException;
import com.inspur.data.common.web.PaginationList;
import com.inspur.data.common.web.ParamUtil;
import com.inspur.data.od.exception.datatag.TagInfoNotExistException;
import com.inspur.data.od.service.datatag.TagGroupService;
import com.inspur.data.od.service.datatag.TagInfoService;
import com.inspur.hsf.config.ServiceFactory;
import com.inspur.portal.model.user.UserOperationLog;
import com.inspur.portal.service.user.UserOperationLogService;
import com.inspur.uc.api.organization.RegionInfo;
import com.inspur.uc.api.organization.RegionInfoService;
import com.inspur.utils.AuditLogUtil;
import com.inspur.utils.OamUtils;
import com.inspur.utils.PortalUtils;
import com.inspur.utils.StringUtil;
import com.inspur.utils.SystemUtil;
import com.inspur.utils.UserUtil;

public class AppCreate implements ViewHandler {
    private static Log log = LogFactory.getLog(AppCreate.class);

    private static IAppService appService = OamUtils.getAppService();

    private static IDeveloperService developerService = OamUtils.getDeveloperService();

    private static TagInfoService tagInfoService = OamUtils.getTagInfoService();

    private static TagGroupService tagGroupService = OamUtils.getTagGroupService();

    private static IAppStatisticService appStatisticService = OamUtils.getAppStatisticService();

    private static RegionInfoService regionInfoService;
    static {
        try {
            if (regionInfoService == null) {
                regionInfoService = (RegionInfoService) ServiceFactory.getService("regionInfoService");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @SuppressWarnings("unchecked")
    public void execute(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Object uid = UserUtil.getUserID(request);
        if (StringUtils.isNotEmptyObject(uid)) {
            try {
                // 创建应用的类型：移动、站内、站外
                Map param = new HashMap();
                request.setAttribute("app_type", request.getParameter("type"));
                Map<String, Object> appGroups = appService.findAppGroup(param, 1000, 1);
                request.setAttribute("regionCode", request.getParameter("regionCode"));
                request.setAttribute("app_icon", request.getParameter("app_icon"));
                request.setAttribute("uid", uid);
                request.setAttribute("groupJson", JsonUtils.convertToString(appGroups.get("data")));
                try {
                    // 获得一级省份
                    PaginationList<RegionInfo> provinceList = regionInfoService.queryRegionInfoByPage(null, "1", "0", null, 1, 100);
                    request.setAttribute("provinceList", provinceList.getRecords());
                    PaginationList<RegionInfo> cityList = null;
                    if (null == provinceList.getRecords() || provinceList.getRecords().size() == 0) {
                        cityList = regionInfoService.queryRegionInfoByPage(null, "1", null, "2", 1, 100);
                        request.setAttribute("cityList", cityList.getRecords());
                    }
                } catch (InvalidParametersException e) {
                    log.error(e.getMessage(), e);
                } catch (DataBaseException e) {
                    log.error(e.getMessage(), e);
                }
            } catch (Exception ex) {
                this.output(response, "", 0, ex.getMessage());
            } finally {
                // 记录页面访问日志
                AuditLogUtil.addPageVisitAutiLog(request, "开发者控制台", "");
            }
        } else {
            // 统一跳转错误页面
            String error_url = PropertiesUtil.getValue("conf.properties", "global.index.odweb").trim()
                    + PropertiesUtil.getValue("conf.properties", "error_url").trim();
            response.sendRedirect(error_url);
            return;
        }
    }

    //
    // 获取分类列表
    //
    public void doGetGroupList(HttpServletRequest request, HttpServletResponse response) {
        try {
            Map param = new HashMap();
            Map<String, Object> res = appService.findAppGroup(param, 1000, 1);
            this.output(response, res, 1, "获取成功");
        } catch (Exception e) {
            this.output(response, "", 0, e.getMessage());
        }
    }

    //
    // 创建应用
    //
    public void doCreateAppProject(HttpServletRequest request, HttpServletResponse response) {
        try {
            // 参数校验
            String app_name = request.getParameter("app_name");
            String group_id = request.getParameter("group_id");
            String usertype = request.getParameter("usertype");
            String app_type = request.getParameter("app_type");
            String description = request.getParameter("description");
            String app_icon = request.getParameter("app_icon");
            String site_code = request.getParameter("site_code");
            if (app_type == null || "".equals(app_type)) {
                app_type = "default";
            }
            // 应用的绑定类型，默认为0，不需要绑定
            String bind_type = request.getParameter("bindType");
            if (bind_type == null || "".equals(bind_type)) {
                bind_type = "0";
            }
            String app_owner = request.getParameter("app_owner");
            String app_owner_name = request.getParameter("app_owner_name");
            Object uid = UserUtil.getUserID(request);
            if (StringUtils.isNotEmpty(app_name) && StringUtils.isNotEmpty(group_id) && StringUtils.isNotEmptyObject(uid)) {
                String developer_id = UserUtil.getDevelopIdFromSession(request);
                Map developerMap = developerService.getAppDeveloperById(developer_id);
                String developerName = null;
                if (developerMap != null && developerMap.get("name") != null) {
                    developerName = String.valueOf(developerMap.get("name"));
                }
                Map<String, Object> projectMap = new HashMap<String, Object>();
                projectMap.put("app_name", app_name);
                projectMap.put("app_alias", app_name);
                // 将绑定类型插入应用信息表 20150906 by ct
                projectMap.put("bind_type", bind_type);
                projectMap.put("app_type", app_type);
                projectMap.put("description", description);
                projectMap.put("developer_id", developer_id);
                projectMap.put("developer_name", developerName);
                projectMap.put("create_time", System.currentTimeMillis() / 1000);
                projectMap.put("app_status", 0);
                projectMap.put("group_id", group_id);
                projectMap.put("app_icon", app_icon);
                // 添加内外网状态
                projectMap.put("audience_type", "externalUser");
                // 添加用户类型
                if (StringUtils.isNotEmpty(usertype)) {
                    projectMap.put("user_types", usertype);
                }
                /* 处理标签开始 */
                String app_tags = request.getParameter("app_tags");
                String app_tagnames = request.getParameter("app_tagnames");
                // 如果传了标签参数，则进行处理
                if (StringUtils.isNotEmpty(app_tags)) {
                    projectMap.put("tagIds", app_tags);
                    projectMap.put("tagNames", app_tagnames);
                }
                /* 处理标签结束 */
                // 应用使用地市（站点）
                /*
                 * Map<String, Object> userInfo = (Map<String, Object>) request.getSession().getAttribute("userInfo"); String regionCode = userInfo.get("site_code") == null ? null :
                 * userInfo.get("site_code").toString(); if (StringUtils.isNotEmpty(regionCode)) { projectMap.put("site_code", regionCode); } else { HttpSession session = request.getSession();
                 * RegionInfo regionStatistics = (RegionInfo) session.getAttribute("regionStatistics"); projectMap.put("site_code", regionStatistics.getRegion_code()); }
                 */
                // 站点信息改为用户创建应用时候选择
                projectMap.put("site_code", site_code);
                Map<String, String> resMap = appService.saveApp(projectMap);
                // Map<String, Object> resMap =
                // appAdminService.createAppProject(projectMap);
                if ("0".equals(resMap.get("code"))) {
                    this.output(response, resMap, 1, "创建成功");
                    UserOperationLog auditlog = new UserOperationLog();
                    auditlog.setLog_lk_id(null);
                    auditlog.setClient_browser(SystemUtil.getRequestBrowserInfo(request));
                    auditlog.setClient_code(null);
                    auditlog.setClient_ip(SystemUtil.getIpAddr(request));
                    auditlog.setClient_system(SystemUtil.getRequestSystemInfo(request));
                    auditlog.setClient_type("PC");
                    auditlog.setCreate_time(new Date());
                    auditlog.setObj_id(resMap.get("key"));
                    auditlog.setObj_name(app_name);
                    auditlog.setObj_type("app");
                    auditlog.setOp_type("create");// 创建
                    auditlog.setUser_id(developer_id);
                    auditlog.setUser_name(developerName);
                    // 添加审计日志
                    UserOperationLogService operLog = PortalUtils.getUserOperationLogService();
                    operLog.add(auditlog);
                    Map<String, Object> appStatistics = new HashMap<String, Object>();
                    appStatistics.put("client_id", resMap.get("key"));
                    appStatistics.put("feature_id", "0");
                    appStatistics.put("developer_id", developer_id);
                    appStatistics.put("org_code", app_owner);
                    appStatistics.put("statistics_date", StringUtils.getDate());
                    appStatistics.put("user_amount", 0);
                    appStatistics.put("use_amount", 0);
                    appStatistics.put("avg_grade", 0);
                    appStatistics.put("grade_amount", 0);
                    appStatistics.put("install_amount", 0);
                    appStatistics.put("download_amount", 0);
                    appStatistics.put("fav_amount", 0);
                    appStatistics.put("comment_amount", 0);
                    appStatisticService.saveAppStatistic(appStatistics);
                } else {
                    this.output(response, "", 0, "创建失败");
                }
            }
        } catch (Exception e) {
            this.output(response, "", 0, e.getMessage());
        }
    }

    /**
     * 获取当前开发者的应用列表
     * 
     * @param request
     * @param response
     */
    public void doGetAppList(HttpServletRequest request, HttpServletResponse response) {
        Object uid = UserUtil.getUserID(request);
        if (StringUtils.isNotEmptyObject(uid)) {
            try {
                String developer_id = UserUtil.getDevelopIdFromSession(request);
                Map<String, Object> filterMap = new HashMap<String, Object>();
                filterMap.put("developer_id", developer_id);
                // Map<String, Object> appidListMap =
                // appAdminService.getAppIdPageForAdmin(filterMap, "",
                // "client_id desc", 1, 1);
                Map<String, Object> appidListMap = appService.findAppInfo(filterMap, 1, 1);
                this.output(response, appidListMap, 1, "获取成功");
            } catch (Exception e) {
                this.output(response, "", 0, e.getMessage());
            }
        }
    }
    /**
     * 获取用户类型列表
     * 
     * @param request
     * @param response
     *//*
        * public void doGetUserTypeList(HttpServletRequest request, HttpServletResponse response){ List list=null; try { IUserType dataTool = (IUserType) CommonUtil.getBean(
        * PropertiesUtil.getValue("conf.properties","common_userType").trim()); list = dataTool.getUserTypeList(request); if(list==null){ list=new ArrayList(); } this.output(response,list, 1, "获取成功");
        * } catch (Exception e) { log.error("获取用户类型出错", e); this.output(response,"", 0, "获取失败"); } }
        */

    /**
     * Description: 输出结果;
     */
    private void output(HttpServletResponse response, Object data, int code, String msg) {
        Map<String, Object> result = new HashMap();
        result.put("code", code);
        result.put("msg", msg);
        result.put("data", data);
        if (result != null) {
            try {
                response.getWriter().print(JsonUtils.convertToString(result));
            } catch (IOException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }
    }

    /**
     * 获取标签
     * 
     * @param request
     * @param response
     * @throws InvalidParametersException
     * @throws DataBaseException
     * @throws TagInfoNotExistException
     */
    public void doGetTagList(HttpServletRequest request, HttpServletResponse response)
            throws TagInfoNotExistException, DataBaseException, InvalidParametersException {
        try {
            List<Map<String, Object>> list = tagGroupService.getGroup("root");
            // List<Map<String,Object>> list =
            // tagGroupService.getGroup("1964539");
            for (Map<String, Object> map : list) {
                List<Map<String, Object>> taginfo = tagInfoService.getTagListByGroupCodeAndTagName(map.get("group_code").toString(), null);
                map.put("CHILD", taginfo);
            }
            response.getWriter().print(JsonUtils.convertToString(list));
        } catch (IOException e) {
            log.error("doGetTagList:" + e);
            e.printStackTrace();
        }
    }

    /**
     * 获取下一级行政区划 <br>
     * <p>
     * Description: <br>
     * <p>
     * Date: 2014年12月29日 下午10:27:14<br/>
     * <p>
     * 
     * @param request
     * @param response
     * @throws ServletException
     * @throws IOException
     * @see void
     */
    public void doGetCity(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String parent_code = ParamUtil.getString(request, "parent_code", "");
        try {
            if (StringUtil.isNotEmpty(parent_code)) {
                PaginationList<RegionInfo> list = regionInfoService.queryRegionInfoByPage(null, "1", parent_code, null, 1, 100);
                response.getWriter().write(JsonUtils.convertToString(list.getRecords()));
            }
        } catch (Exception e) {
            log.error(e.getMessage(), e);
        }
    }
}
