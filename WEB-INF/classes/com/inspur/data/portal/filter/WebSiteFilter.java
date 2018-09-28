package com.inspur.data.portal.filter;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.loushang.internet.util.CookieUtil;
import org.loushang.internet.util.RequestURIFilter;
import org.loushang.internet.util.filter.SecurityUtil;

import com.inspur.data.common.utils.PropertiesUtils;
import com.inspur.data.common.utils.StringUtils;
import com.inspur.data.common.web.ParamUtil;
import com.inspur.data.portal.filter.region.IRegion;
import com.inspur.data.portal.filter.region.RegionFilterUtil;

public class WebSiteFilter implements Filter {

	private static Logger log = Logger.getLogger(WebSiteFilter.class);

	private RequestURIFilter excludes;
	private FilterConfig filterConfig;
	private String encode = null;
	private String fromEncode = null;

	public void init(FilterConfig filterConfig) throws ServletException {
		this.filterConfig = filterConfig;
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

	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException {
		HttpServletRequest httpRequest = (HttpServletRequest) request;
		HttpServletResponse httpResponse = (HttpServletResponse) response;
		HttpSession session = httpRequest.getSession();
		setCharacterEncoding(httpRequest, httpResponse, encode);

		String sub_domain_param = ParamUtil
				.getString(request, "sub_domain", "");

		String sub_domain = "";
		boolean cookieload = false;
		// 首先在参数中获取，如果获取的值为null，则在cookie中获取
		if (StringUtils.isNotBlank(sub_domain_param)) {
			IRegion iRegion = (IRegion) RegionFilterUtil.getBean(PropertiesUtils
					.getValue("conf.properties", "global.regionImpl"));
			sub_domain = iRegion.getRegionCode(sub_domain_param, null, session,httpResponse);
			if (StringUtils.isBlank(sub_domain)) {
				cookieload = true;
			}
		} else {
			cookieload = true;
		}
		if (cookieload) {
			// 自Cookie中取出已保存的站点编码
			String sub_domain_key = PropertiesUtils.getValue("conf.properties",
					"sub_domain_key");
			if (sub_domain_key == null || sub_domain_key.isEmpty()) {
				sub_domain_key = "sub_domain_cokie";
			}
			Cookie siteCookie = CookieUtil.getCookieByName(httpRequest,
					sub_domain_key);
			String sub_domain_cookie = "";
			if (siteCookie != null) {
				try {
					if (sub_domain_key.equals("sub_domain_cokie")) {
						sub_domain_cookie = SecurityUtil.jiemi(URLDecoder
								.decode(siteCookie.getValue(), "utf-8"));
					}
				} catch (Exception e) {
					log.error(e);
				}
				sub_domain_cookie = sub_domain_cookie == null ? ""
						: sub_domain_cookie;
			}
			// 获取子域名
			String domainName = request.getServerName();
			String domain_base_key = PropertiesUtils.getValue(
					"conf.properties", "domain_base_key");
			// 获取需要提取子域名的主域名
			if (domain_base_key == null || domain_base_key.isEmpty()) {
				domain_base_key = "insupr.com";
			}
			// 获取子域名前缀
			if (!this.excludes.matches(domainName)) {
				if (domainName.indexOf("." + domain_base_key) > 0) {
					sub_domain = domainName.split("\\.")[0];
				}
			}
			IRegion iRegion = (IRegion) RegionFilterUtil.getBean(PropertiesUtils
					.getValue("conf.properties", "global.regionImpl"));
			sub_domain = iRegion.getRegionCode(sub_domain_cookie, sub_domain,
					session,httpResponse);
			if (StringUtils.isBlank(sub_domain)) {
				String default_domain_key = PropertiesUtils.getValue(
						"conf.properties", "global.default_site_code");
				
				// 获取需要提取子域名的主域名
				if (default_domain_key == null || default_domain_key.isEmpty()) {
					default_domain_key = "3701";
				}
				sub_domain = iRegion.loadDefaultRegion(default_domain_key,
						session);
			}
			String is_enable_multistation = PropertiesUtils.getValue(
					"conf.properties", "global.is_enable_multistation");
			session.setAttribute("is_enable_multistation", is_enable_multistation);
		}

		CookieUtil.addCookie(httpResponse, "sub_domain_cokie",
				URLEncoder.encode(SecurityUtil.jiami(sub_domain), "utf-8"), 0);
		
		CookieUtil.addCookie(httpResponse, "region_name",
				URLEncoder.encode(sub_domain, "utf-8"), 0);
		
		chain.doFilter(request, response);
	}

	/**
	 * 设置编码集。
	 */
	private void setCharacterEncoding(HttpServletRequest request,
			HttpServletResponse response, String encode)
			throws UnsupportedEncodingException {
		request.setCharacterEncoding(encode);
		response.setContentType("text/html; charset=" + encode);
	}

	public void destroy() {
		this.excludes = null;
		this.filterConfig = null;
	}
}
