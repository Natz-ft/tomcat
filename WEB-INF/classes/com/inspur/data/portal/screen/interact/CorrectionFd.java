package com.inspur.data.portal.screen.interact;

import java.io.File;
import java.io.IOException;
import java.sql.Timestamp;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.loushang.internet.util.JsonUtils;
import org.loushang.internet.view.ViewHandler;

import com.inspur.data.common.exception.DataBaseException;
import com.inspur.data.common.exception.InvalidParametersException;
import com.inspur.data.common.utils.StringUtils;
import com.inspur.portal.model.user.UserOperationLog;
import com.inspur.portal.service.user.UserOperationLogService;
import com.inspur.utils.DataUtils;
import com.inspur.utils.PortalUtils;
import com.inspur.utils.SystemUtil;

// 用户信息反馈
public class CorrectionFd implements ViewHandler {
    private static Log log = LogFactory.getLog(CorrectionFd.class);

    public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        if (!new File(uploadPath).isDirectory())
            new File(uploadPath).mkdirs();
        if (!new File(tempPath).isDirectory())
            new File(tempPath).mkdirs();
    }

    private String uploadPath = "D:\\upload"; // 上传文件的目录

    private String tempPath = "D:\\uploadtmp"; // 临时文件目录

    private static String fileName = "";//

    public void doAddCorrection(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String msg = "";
        try {
            Map<String, Object> paramMap = new HashMap<String, Object>();
            // 登录验证 测试阶段暂时屏蔽登录验证功能
            @SuppressWarnings("unchecked")
            Map<String, Object> userInfo = (Map<String, Object>) request.getSession().getAttribute("userInfo");
            String site_code = (String) request.getSession().getAttribute("area_code");
            if (userInfo != null) {
                paramMap.put("uid", userInfo.get("uid"));
            } else {
                msg = "用户未登录！";
                response.getWriter().write(msg);
                return;
            }
            String cata_id = request.getParameter("cataid");
            String cata_code = request.getParameter("catacode");
            String visit_url = request.getParameter("visit_url");
            String title = request.getParameter("title");
            String desc = request.getParameter("desc");
            // 添加组织机构字段
            String org_code = request.getParameter("org_code");
            // 传参为Map
            paramMap.put("site_code", site_code);
            paramMap.put("ip_addr", getIpAddr(request));// 当前IP地址
            paramMap.put("status", 0);// 状态
            paramMap.put("content", desc);
            paramMap.put("content_type", 3);// 内容类型 1 评论、2留言反馈、3纠错
                                            // paramMap.put("object_type", 1);
            paramMap.put("object_title", title);
            paramMap.put("object_code", cata_code);
            paramMap.put("object_id", cata_id);
            paramMap.put("object_url", visit_url);
            paramMap.put("check_time", new Timestamp(new Date().getTime()));
            paramMap.put("user_name", userInfo.get("nick_name"));
            paramMap.put("org_code", org_code);
            int j = PortalUtils.getMessageFeedBackService().addMessageFeedBack(paramMap);
            if (j > 0) {
                //新开发审计，记录数据目录纠错操作
                try {
                    UserOperationLog userOperationLog = new UserOperationLog();
                    userOperationLog.setLog_lk_id(null);
                    userOperationLog.setClient_browser(SystemUtil.getRequestBrowserInfo(request));
                    userOperationLog.setClient_code(null);
                    userOperationLog.setClient_ip(SystemUtil.getIpAddr(request));
                    userOperationLog.setClient_system(SystemUtil.getRequestSystemInfo(request));
                    userOperationLog.setClient_type("PC");
                    userOperationLog.setCreate_time(new Date());
                    userOperationLog.setObj_id(cata_id);
                    userOperationLog.setObj_name(title);//数据目录名称
                    userOperationLog.setObj_type("catalog");//对象类型
                    userOperationLog.setOp_type("correctErr");//操作类型 纠错
                    userOperationLog.setUser_id(String.valueOf(userInfo.get("uid")));
                    userOperationLog.setUser_name(String.valueOf(userInfo.get("nick_name")));
                    if(StringUtils.isNotEmpty(site_code)){
                   	 userOperationLog.setSite_code(site_code);
                    }
                    //添加审计日志
                    UserOperationLogService userOperationLogService = DataUtils.getUserOperationLogService();
                    int ret = userOperationLogService.add(userOperationLog);
                    if (ret > 0) {
                        log.info("目录纠错审计日志添加成功");
                        System.out.println("目录纠错审计日志添加成功");
                    }
                } catch (Exception e) {
                    log.error("目录纠错审计日志添加失败", e);
                    System.out.println("目录纠错审计日志添加失败");
                }
                msg = "保存成功！";
                response.getWriter().write(msg);
            } else {
                msg = "保存失败！";
                response.getWriter().write(msg);
            }
        } catch (DataBaseException e) {
            e.printStackTrace();
            msg = "保存失败！";
            response.getWriter().write(msg);
        } catch (InvalidParametersException e) {
            e.printStackTrace();
            msg = "保存失败！";
            response.getWriter().write(msg);
        }
    }

    // 获取当前用户IP地址
    public String getIpAddr(HttpServletRequest request) {
        String ip = request.getHeader("x-forwarded-for");
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("WL-Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
        }
        return ip;
    }

    /**
     * 上传文件
     * 
     * @param request
     * @param response
     * @return
     * @throws ServletException
     * @throws IOException
     */
    public void doIsLogin(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Map<String, String> map = new HashMap<String, String>();
        @SuppressWarnings("unchecked")
        Map<String, Object> userInfo = (Map<String, Object>) request.getSession().getAttribute("userInfo");
        if (userInfo != null) {
            map.put("code", "000000");
            map.put("msg", "用户已登录！");
        } else {
            map.put("code", "000001");
            map.put("msg", "用户未登录！");
        }
        response.getWriter().write(JsonUtils.convertToString(map));
    }
}
