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

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.loushang.internet.util.RequestURIFilter;
import org.loushang.internet.util.RequestUtil;
import org.loushang.internet.util.StringUtils;

import com.inspur.api.ac.IDeveloperService;
import com.inspur.common.utils.PropertiesUtil;
import com.inspur.hsf.config.ServiceFactory;
import com.inspur.uc.api.user.IUserDomain;
import com.inspur.utils.ContextHelper;
import com.inspur.utils.UCUtil;


public class DeveloperFilter  implements Filter{
	
	private static Log log = LogFactory.getLog(DeveloperFilter.class);// 日志
	private ServletContext sc = null;
	private RequestURIFilter excludes;
	private FilterConfig filterConfig;
	private String encode = null;
	private String fromEncode = null;
	
	private static IUserDomain iUserDomain;
	static{
		try{
			if(iUserDomain==null){
				iUserDomain = (IUserDomain) ServiceFactory.getService("uc.IUserDomain");
			}
		}catch(Exception e){
			log.error("初始化用户Service模块失败", e);
			e.printStackTrace();
		}
	}
	
	
	public void init(FilterConfig filterConfig) throws ServletException {
		this.filterConfig = filterConfig;
		sc = filterConfig.getServletContext();
		String excludes =  this.filterConfig.getInitParameter("excludes");
		this.setExcludes(excludes);
		encode = filterConfig.getInitParameter("encode");
		fromEncode = filterConfig.getInitParameter("fromEncode");
		if(encode == null){
			encode="UTF-8";
		}
		if(fromEncode == null) {
			fromEncode = "ISO8859-1";
		}
	}
	public void setExcludes(String excludes) {
		this.excludes = new RequestURIFilter(excludes);
	}
	
	private static String getCurUri(HttpServletRequest request) {
		String action = request.getParameter("action");
		String method = request.getParameter("method");
		String curUri = RequestUtil.getRequestUrl(request);
		String suffix = "";
		// "" life/* life/ life life/index=life/index/
		// life/index.htm=life/index. life life/index/
		if (StringUtils.isEmpty(curUri)) {
			curUri = "index.";
		}

		if (curUri.indexOf(".") > -1) {
			suffix = curUri.substring(curUri.lastIndexOf(".") + 1);
			curUri = curUri.substring(0, curUri.lastIndexOf(".") + 1);
		} else if (!curUri.endsWith("/")) {
			curUri += "/";
		}
		
		if (action != null) {
			if(!"".equals(action))
				action = "act" + action.substring(0, 1).toUpperCase() + action.substring(1);
			curUri += curUri.endsWith(".") ? action : ("." + action);
		}
		if ("do".equalsIgnoreCase(suffix) && method != null) {
			if(!"".equals(method))
				method = "do" + method.substring(0, 1).toUpperCase() + method.substring(1);
			curUri += curUri.endsWith(".") ? method : ("." + method);
		}
		return curUri;
	}
	public void doFilter(ServletRequest req, ServletResponse res,
			FilterChain chain) throws IOException, ServletException {
		HttpServletRequest request = (HttpServletRequest)req;
		HttpServletResponse response = (HttpServletResponse) res;
		Object uid = UCUtil.getUserID(request);
		HttpSession session = request.getSession();
		//根据uid判断当前登陆者身份
		if(uid != null){
			Map<String,Object> userInfoMap=iUserDomain.getUserInfo(Integer.parseInt(uid.toString()));
			Map<String,Object> tempMap=(Map<String,Object>)userInfoMap.get("user_basic");
			session.setAttribute("uid", tempMap.get("uid"));
			session.setAttribute("userInfo", tempMap);
			
			setCharacterEncoding(request,response,encode);
			ContextHelper.init(request, response, sc);
			String uri = getCurUri(request);
			String requestUrl= RequestUtil.getRequestUrl(request);
			String developerRegUrl= PropertiesUtil.getValue("conf.properties","global.index.odweb").trim() + "/console/developer.htm";
			requestUrl=requestUrl.split("\\.")[0];
			if(this.excludes.matches(uri)||developerRegUrl!=null&&developerRegUrl.contains(requestUrl)){
				chain.doFilter(request, response);
				return;
			}
			//应该验证是否为开发者
			//查询是否开发者
			IDeveloperService appDeveloperService = (IDeveloperService) ServiceFactory.getService("developerService");
			Map developer = appDeveloperService.getAppDeveloperByUserId(uid.toString());
			if(developer != null){
				session.setAttribute("developer_id", developer.get("id"));
			}else{
				session.setAttribute("developer_id", "");
			}
		}
		chain.doFilter(request, res);
	}
	
	/**
	 * 设置编码集。
	 */
	private void setCharacterEncoding(HttpServletRequest request, HttpServletResponse response, String encode) throws UnsupportedEncodingException{
		request.setCharacterEncoding(encode);
        response.setContentType("text/html; charset=" + encode);
	}
	public void destroy() {
		this.excludes=null;
		this.filterConfig=null;
	}

}
