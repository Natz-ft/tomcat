package com.inspur.data.portal.filter;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.Map;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.loushang.internet.util.RequestURIFilter;

import com.inspur.data.common.utils.PhpUtil;
import com.inspur.data.common.web.ParamUtil;
import com.inspur.utils.SecurityUtil;
import com.inspur.utils.UCUtil;

public class CaLoginFilter implements Filter {
    private ServletContext sc = null;

    private RequestURIFilter excludes;

    private FilterConfig filterConfig;

    private String encode = null;

    private String fromEncode = null;

    public void init(FilterConfig filterConfig) throws ServletException {
        this.filterConfig = filterConfig;
        sc = filterConfig.getServletContext();
        String excludes = this.filterConfig.getInitParameter("excludes");
        this.setExcludes(excludes);
        encode = filterConfig.getInitParameter("encode");
        fromEncode = filterConfig.getInitParameter("fromEncode");
        if (encode == null) {
            encode = "UTF-8";
        }
        if (fromEncode == null) {
            fromEncode = "ISO8859-1";
        }
    }

    public void setExcludes(String excludes) {
        this.excludes = new RequestURIFilter(excludes);
    }

    public void doFilter(ServletRequest request, ServletResponse response, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;
        setCharacterEncoding(httpRequest, httpResponse, encode);
        if (this.excludes.matches(httpRequest)) {
            filterChain.doFilter(request, response);
            return;
        }
        //初始化ContextHolder
        //        ContextHolder.init(httpRequest, httpResponse, sc);
        try {
            String requestURI = httpRequest.getRequestURI();
            String demoToken = ParamUtil.getString(request, "_org_token", "");
            //免登录账号 
            String encodeAccount = ParamUtil.getString(request, "account", "");
            //解密加密账号
            String account = SecurityUtil.jiemi(encodeAccount);
            if ("ca".equals(demoToken) && !"".equals(account)) {
                HttpSession session = httpRequest.getSession();
                //确保登录成功后，将uid等用户信息放入session
                Map user = null;
                user = UCUtil.getUser(account);
                if (null != user) {
                    String uid = user.get("uid").toString();
                    session.setAttribute("uid", uid);
                    session.setAttribute("userInfo", user);
                    session.setAttribute("login_type", "userpwd");
                    // 设置cookie
                    String cookieDomain = UCUtil.getCookieDomain();
                    // 登录成功后，将当前登录用户的登录方式存储到客户端cookie，普通登录值为‘userpwd’，CA登录值为‘cert’
                    // ,第三方账号'outacc'
                    UCUtil.setCookie("login_type", "userpwd", -1, "/", cookieDomain, httpResponse);
                    UCUtil.setCookie("sso_token", SecurityUtil.jiami(uid), -1, "/", cookieDomain, httpResponse);
                    UCUtil.setCookie("uc_uid", SecurityUtil.jiamiOld(uid), -1, "/", cookieDomain, httpResponse);
                    UCUtil.setCookie("login_time", PhpUtil.time(), -1, "/", cookieDomain, httpResponse);
                    UCUtil.setCookie("uc_user_id", String.valueOf(user.get("user_id")), -1, "/", cookieDomain, httpResponse);
                    UCUtil.setCookie("uc_nick_name", String.valueOf(user.get("nick_name")), -1, "/", cookieDomain, httpResponse);
                }
            }
        } catch (Exception e) {
            System.out.println("免登录过滤器错误。" + e.getMessage());
            e.printStackTrace();
        }
        filterChain.doFilter(request, response);
    }

    /**
     * 设置编码集。
     */
    private void setCharacterEncoding(HttpServletRequest request, HttpServletResponse response, String encode) throws UnsupportedEncodingException {
        request.setCharacterEncoding(encode);
        response.setContentType("text/html; charset=" + encode);
    }

    public void destroy() {
        this.excludes = null;
        this.filterConfig = null;
    }
}
