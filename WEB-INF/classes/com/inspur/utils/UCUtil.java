package com.inspur.utils;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;

import com.inspur.utils.ConfUtil;
import com.inspur.data.common.utils.JsonUtils;
import com.inspur.hsf.config.ServiceFactory;
import com.inspur.uc.api.user.IUserDomain;


public class UCUtil {

	private static Logger log = Logger.getLogger(UCUtil.class);

	/**
	 * 根据cookieName查询对应的cookieValue
	 * 
	 * @param req
	 * @param cookieName
	 * @return
	 */
	public static String getCookieValue(HttpServletRequest req,
			String cookieName) {
		Cookie jcookies[] = req.getCookies();
		if (jcookies != null) {
			for (int i = 0; i < jcookies.length; i++) {
				Cookie cookie = jcookies[i];
				if (cookieName.equals(cookie.getName())) {
					try {
						return URLDecoder.decode(cookie.getValue(), "utf-8");
					} catch (UnsupportedEncodingException e) {
						log.error("", e);
					}
					return cookie.getValue();
				}
			}
		}
		return null;
	}

	/**
	 * 根据请求取得客户端ip
	 * 
	 * @param request
	 * @return
	 */
	public static String getClientIP(HttpServletRequest request) {
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
		ip = ip.trim();
		if (ip.equals("::1") || ip.equals("0:0:0:0:0:0:0:1")) {
			ip = "127.0.0.1";
		}
		return ip;
	}

	/**
	 * 重置sessionid，原session中的数据自动转存到新session中
	 * 
	 * @param request
	 */
	public static void reGenerateSessionId(HttpServletRequest request) {

		HttpSession session = request.getSession();

		// 首先将原session中的数据转移至一临时map中
		Map<String, Object> tempMap = new HashMap();
		Enumeration<String> sessionNames = session.getAttributeNames();
		while (sessionNames.hasMoreElements()) {
			String sessionName = sessionNames.nextElement();
			tempMap.put(sessionName, session.getAttribute(sessionName));
		}

		// 注销原session，为的是重置sessionId
		session.invalidate();

		// 将临时map中的数据转移至新session
		session = request.getSession();
		for (Map.Entry<String, Object> entry : tempMap.entrySet()) {
			session.setAttribute(entry.getKey(), entry.getValue());
		}
	}

	/**
	 * 取得cookie要写入的域
	 * 
	 * @return
	 */
	public static String getCookieDomain() {
		return ConfUtil.getConfValue("cookie_domain");
	}

	/**
	 * 写cookie
	 * 
	 * @param name
	 * @param value
	 * @param maxAge
	 *            指定cookie多长时间后过期，单位秒（正数表示多长时间后过期，0表示要删除该cookie，负数表示该cookie不会持久化
	 *            ，浏览器关闭时，则删除该cookie）
	 * @param path
	 *            设置cookie路径，在特定path下的Cookie只能被该path以及子目录下的读取，如果需要整个应用共享，
	 *            可以设置path=/
	 * @param domain
	 *            设置cookie域名，如www.test.com,.test.com
	 * @param response
	 * @return
	 */
	public static boolean setCookie(String name, String value, int maxAge,
			String path, String domain, HttpServletResponse response) {
		if (value != null) {
			try {
				value = URLEncoder.encode(value, "utf-8");
			} catch (UnsupportedEncodingException e) {
				log.error("", e);
			}
		}
		Cookie cookie = new Cookie(name, value);
		cookie.setMaxAge(maxAge);
		if (path != null) {
			cookie.setPath(path);
		}
		if (domain != null && !domain.equals("localhost")) {
			cookie.setDomain(domain);
		}
		cookie.setSecure(false);// 设置为true，则仅有https请求时，cookie才会被发送。
		// cookie.setHttpOnly(true);//设置为true，客户端脚本无法操作cookie，能有效防止跨站点脚本攻击。
		response.addCookie(cookie);
		return true;
	}


	/**
	 * 进入邮箱的链接
	 * 
	 * @param email
	 * @return
	 */
	public static String getEmailUrl(String email) {
		String email_url = "";
		String[] emailStr = email.split("@");
		String emailSuffix = emailStr[1];
		if ("hotmail.com".equals(emailSuffix)) {
			email_url = "hotmail.com";
		} else if ("yahoo.com.cn".equals(emailSuffix)) {
			email_url = "mail.cn.yahoo.com";
		} else if ("yahoo.cn".equals(emailSuffix)) {
			email_url = "mail.cn.yahoo.com";
		} else if ("gmail.com".equals(emailSuffix)) {
			email_url = "gmail.com";
		} else {
			email_url = "mail." + emailSuffix;
		}
		return email_url;
	}

	/**
	 * 根据邮箱、手机号、登录账号查询用户的基本信息
	 * 
	 * @param account
	 * @return
	 */
	public static Map getUser(String account) {
		if (account == null) {
			return null;
		}
		IUserDomain userDomain = (IUserDomain) ServiceFactory.getService("uc.IUserDomain");
		Map user = userDomain.getUser(account);
		return user;
	}

	/**
	 * 获取指定位数的随机数（不保证随机数的唯一性）
	 * 
	 * @param length
	 *            随机数的位数
	 * @return String
	 */
	public static String getRandom(int length) {
		if (length <= 0) {
			length = 1;
		}
		StringBuilder num = new StringBuilder();
		Random r = new Random();
		int i = 0;
		while (i < length) {
			num.append(r.nextInt(10));
			i++;
		}
		return num.toString();
	}

	/**
	 * 获取32位uuid
	 * 
	 * @return string
	 */
	public static String getUUID() {
		return UUID.randomUUID().toString().replace("-", "");
	}

	/**
	 * 检查String、Map、List是否为空
	 * 
	 * @param obj
	 * @return
	 */
	public static boolean isEmpty(Object obj) {
		if (obj == null) {
			return true;
		} else if (obj instanceof String) {
			if (obj.toString().isEmpty()) {
				return true;
			}
		} else if (obj instanceof Map) {
			if (((Map) obj).isEmpty()) {
				return true;
			}
		} else if (obj instanceof List) {
			if (((List) obj).isEmpty()) {
				return true;
			}
		}
		return false;
	}

	/**
	 * 检查指定URL是否在信任域里面
	 * 
	 * @param url
	 *            如http://ac.iop.com
	 * @return
	 */
	public static boolean isTrustDomain(String url) {

		if (!UCUtil.isEmpty(url)) {

			// 取url第3个斜线前的部分
			int pos = url.indexOf("/", 8);
			if (pos != -1) {
				url = url.substring(0, pos);
			}
			String trust_domains = ConfUtil.getValue("trust_domain_list");
			trust_domains = trust_domains.replace(".", "\\.");
			trust_domains = trust_domains.replace("*", "");
			Pattern p = Pattern.compile(trust_domains);
			Matcher m = p.matcher(url);
			while (m.find()) {
				return true;
			}
		}
		return false;
	}

	public static Object getUserID(HttpServletRequest request) {
		Object uid = null;
		HttpSession session = request.getSession(false);
		if (session != null) {
			uid = session.getAttribute("uid");
		}
		return uid;
	}

	/**
	 * 获取用户的信息
	 * 
	 * @return
	 */
	public static Map getUserInfo() {
		Map userInfo = new HashMap();
		try {
			HttpServletRequest request = ContextHelper.getRequest();
			Object userInfoObj = request.getSession().getAttribute("userInfo");
			if (userInfoObj != null) {
				userInfo = (Map) userInfoObj;
			}
		} catch (Exception exp) {
			log.error("[getUserInfo]", exp);
		}
		return userInfo;
	}


	/**
	 * 判定是不是正整数，
	 * 如果是，返回true;如果不是,返回false。
	 * @param orginal
	 * @return
	 */
    public static boolean isPositiveInteger(String orginal) {  
        return isMatch("^\\+{0,1}[1-9]\\d*", orginal);  
    }  

    /**
	 * 判定是不是负整数，
	 * 如果是，返回true;如果不是,返回false。
     * @param orginal
     * @return
     */
    public static boolean isNegativeInteger(String orginal) {  
        return isMatch("^-[1-9]\\d*", orginal);  
    }  
  
    /**
	 * 判定是不是整数，
	 * 如果是，返回true;如果不是,返回false。
     * @param orginal
     * @return
     */
    public static boolean isInteger(String orginal) {  
        return isMatch("[+-]{0,1}0", orginal) || isPositiveInteger(orginal) || isNegativeInteger(orginal);  
    }
    
    /**
	 * 判定字符串是否匹配，
	 * 如果匹配，返回true;如果匹配,返回false。
     * @param regex
     * @param orginal
     * @return
     */
    private static boolean isMatch(String regex, String orginal){  
        if (orginal == null || orginal.trim() == null || orginal.trim().length() < 1) {  
            return false;  
        }  
        Pattern pattern = Pattern.compile(regex);  
        Matcher isNum = pattern.matcher(orginal);  
        return isNum.matches();  
    } 
    
    
    /**
     * 向Response流输出处理结果
     * 
     * @param response 响应流
     * @param rc 状态代码 0:成功;1:发生错误;
     * @param msg 错误消息
     * @param returnData 返回的数据
     */
 	public static void write(HttpServletResponse response, String rc, String msg,Object returnData) {

 		Map<String, Object> result = new HashMap<String, Object>();
 		result.put("rc", rc);
 		result.put("msg", msg);
 		result.put("returnData", returnData);
 		try {
 			response.getWriter().write(JsonUtils.convertToString(result));
 		} catch (IOException e) {
 			e.printStackTrace();
 		}
 	}
 	
 	/**
	 *  判断是否空白字符串。
	 *  
	 * @param str
	 * @return true:空白字符; false:有空白字符串以外的内容。
	 */
	public static boolean isBlank(String str) {
		
		int strLen;
		if ((str == null) || ((strLen = str.length()) == 0)) {
			return true;
		}
		
		for (int i = 0; i < strLen; i++) {
			if (!Character.isWhitespace(str.charAt(i))) {
				return false;
			}
		}
		return true;
	}
	
	/**
	 *  判断是否空白字符串。
	 *  
	 * @param str
	 * @return true:空白字符; false:有空白字符串以外的内容。
	 */
	public static boolean isBlank(Object str) {
		
		if (null == str) {
			return true;
		}
		
		return isBlank(str.toString());
	}

	
	
	private static Object instance(String clazzName) {
		Object instance = null;
		try {
			Class clazz = Class.forName(clazzName);
			instance = clazz.newInstance();
		} catch (ClassNotFoundException e) {
			log.error("没有对应实现类[" + clazzName + "]", e);
		} catch (InstantiationException e) {
			log.error("实例化类错误[" + clazzName + "]", e);
		} catch (IllegalAccessException e) {
			log.error("访问类错误[" + clazzName + "]", e);
		}
		return instance;
	}
}
