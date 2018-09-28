package com.inspur.ucweb.utils;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
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

import org.apache.commons.lang.StringUtils;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.util.EntityUtils;
import org.apache.log4j.Logger;

import com.inspur.data.common.exception.DataBaseException;
import com.inspur.data.common.exception.InvalidParametersException;
import com.inspur.data.common.utils.JsonUtils;
import com.inspur.portal.model.base.SystemConfig;
import com.inspur.portal.service.base.SystemConfigService;
import com.inspur.uc.api.user.IUserExtendDomain;
import com.inspur.uc.api.user.IUserLoginDomain;
import com.inspur.ucweb.cache.CacheConst;
import com.inspur.ucweb.cache.CacheManager;
import com.inspur.utils.ContextHelper;
import com.inspur.utils.UserUtils;
import com.sun.jersey.api.client.Client;
import com.sun.jersey.api.client.ClientResponse;
import com.sun.jersey.api.client.WebResource;
import com.sun.jersey.api.representation.Form;

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
		return ConfUtil.getValue("cookie_domain");
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
		//cookie.setHttpOnly(true);//设置为true，客户端脚本无法操作cookie，能有效防止跨站点脚本攻击。
		response.addCookie(cookie);
		return true;
	}

	/**
	 * 获取指定用户的基本信息
	 * 
	 * @param uid
	 * @return
	 */
	public static Map getUserBasic(int uid) {
		if (uid <= 0) {
			return null;
		}
		Map userInfo = CacheManager.get(CacheConst.USER_BASIC_UID_ + uid,
				HashMap.class);
		if (userInfo == null) {
			if (UserUtils.getUserDomain() != null) {
				userInfo = UserUtils.getUserDomain().getUserByUid(uid);
			}
		}
		return userInfo;
	}

	/**
	 * 获取指定用户的 扩展 信息
	 * 
	 * @param uid
	 * @return
	 */
	public static Map getUserExtend(int uid) {
		if (uid <= 0) {
			return null;
		}
		Map userExtend = UserUtils.getUserExtendDomain()
				.getUserExtendByUid(uid);
		return userExtend;
	}

	/**
	 * 获取指定用户的登录信息
	 * 
	 * @param uid
	 * @return
	 */
	public static Map getUserLoginInfo(int uid) {
		if (uid <= 0) {
			return null;
		}
		Map userInfo = CacheManager.get(CacheConst.USER_LOGIN_INFO_UID_ + uid,
				HashMap.class);
		if (userInfo == null) {
			IUserLoginDomain userLoginDomain = UserUtils.getUserLoginDomain();
			if (userLoginDomain != null) {
				userInfo = userLoginDomain.getUserLoginInfoByUid(uid);
			}
		}
		return userInfo;
	}

	/**
	 * 获取指定用户的 密码保护设置信息
	 */
	public static Map getUserSecPass(int uid) {
		if (uid <= 0) {
			return null;
		}
		Map userSecPass = CacheManager.get(CacheConst.USER_SEC_PASS_UID_ + uid,
				HashMap.class);
		if (userSecPass == null) {
			userSecPass = UserUtils.getSecurityPasswordDomain().getMapByUid(uid);
		}
		return userSecPass;
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
		Map user = UserUtils.getUserDomain().getUser(account);
		return user;
	}

	/**
	 * 根据uid，获取该用户所关注的用户数量
	 * 
	 * @param uid
	 * @return int
	 */
	/*public static int getFollowCount(String uid) {
		if (uid == null || uid.isEmpty()) {
			return 0;
		}
		return UserUtils.getFollowDomain().getFollowCount(uid);
	}*/

	/**
	 * 根据uid，获取关注该用户的用户数量
	 * 
	 * @param uid
	 * @return int
	 */
	/*public static int getFansCount(String uid) {
		if (uid == null || uid.isEmpty()) {
			return 0;
		}
		return UserUtils.getFollowDomain().getFansCount(uid);
	}*/

	/**
	 * 根据uid，获取该用户所关注的用户数量
	 * 
	 * @param uid
	 * @return int
	 */
	public static int getFriendsCount(String uid) {
		if (uid == null || uid.isEmpty()) {
			return 0;
		}
		return UserUtils.getFriendsDomain().getFriendsCountByUid(uid);
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
	 * 发送http get请求
	 * 
	 * @param url
	 * @param encode
	 * @return
	 */
	public static String httpGet(String url, String encode) {
		if (encode == null) {
			encode = "utf-8";
		}
		String content = null;
		DefaultHttpClient httpclient = new DefaultHttpClient();
		HttpGet httpGet = new HttpGet(url);
		HttpResponse http_response;
		try {
			http_response = httpclient.execute(httpGet);
			HttpEntity entity = http_response.getEntity();
			content = EntityUtils.toString(entity, encode);
		} catch (Exception e) {
			log.error("", e);
		} finally {
			httpGet.releaseConnection();
		}
		return content;
	}

	/**
	 * 发送http post请求
	 * 
	 * @param url
	 * @param encode
	 * @return
	 */
	public static String httpPost(String url, String encode) {
		if (encode == null) {
			encode = "utf-8";
		}
		String content = null;
		DefaultHttpClient httpclient = new DefaultHttpClient();
		HttpPost post = new HttpPost(url);
		HttpResponse http_response;
		try {
			http_response = httpclient.execute(post);
			HttpEntity entity = http_response.getEntity();
			content = EntityUtils.toString(entity, encode);
		} catch (Exception e) {
			log.error("", e);
		} finally {
			post.releaseConnection();
		}
		return content;
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
	 * 获取用户类型userflag 
	 * @param request
	 * @return
	 */
	public static int getUserFlag(HttpServletRequest request){
		String user_id = null;
		HttpSession session = request.getSession(false);
		if (session != null) {
			Map userInfo = (Map) session.getAttribute("userInfo");
			if(userInfo != null && userInfo.containsKey("user_id")){
				user_id = String.valueOf(userInfo.get("user_id"));
			}else{
				return 0;
			}
		}
		Map userInfo = UCUtil.getUserInfoByUserId(user_id);
		if(userInfo == null || !userInfo.containsKey("userflag")){
			return 0;
		}else{
			int userflag = (Integer) userInfo.get("userflag");
			return userflag;
		}
	}
	
	/**
	 * 根据uid获取用户信息
	 * 
	 * @param uid
	 * @return
	 */
	public static Map getUserInfoFromUC(String uid) {
		Map userInfo = new HashMap();
		try {
			userInfo = UserUtils.getUserDomain().getUserByUid(
					Integer.parseInt(uid));
		} catch (Exception ex) {
			if (log.isDebugEnabled()) {
				log.error("获取用户基本信息出错！", ex);
				ex.printStackTrace();
			}
		}
		return userInfo;
	}
	
	/**
	 * 根据userId获取用户信息
	 * 
	 * @param uid
	 * @return
	 */
	public static Map getUserInfoByUserId(String userId) {
		Map userInfo = new HashMap();
		try {
			userInfo = UserUtils.getUserDomain().getUserByUserId(userId);
		} catch (Exception ex) {
			if (log.isDebugEnabled()) {
				log.error("获取用户基本信息出错！", ex);
				ex.printStackTrace();
			}
		}
		return userInfo;
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
	 * 对用户信息进行加密，并设置有效期为1分钟
	 * 
	 * @param user_login
	 * @param password
	 * @return
	 */
	public static String encodeUserInfo(String user_login, String password) {
		password = new String(Base64.decode(password));// 解密，获取密码
		int effective = Integer.parseInt(ConfUtil
				.getValue("validate_expire_time"));// 获取有效时长
		long nowTime = System.currentTimeMillis();
		long expireTime = nowTime + effective;
		return SecurityUtil.jiami(user_login + "|" + password + "|"
				+ expireTime);
	}
	/**
	 * 国家系统带系统Id的用户信息加密
	 */
	public static String encodeUserInfoForCountySys(String user_login, String password, String sysId){
		password = new String(Base64.decode(password));// 解密，获取密码
		int effective = Integer.parseInt(ConfUtil
				.getValue("validate_expire_time"));// 获取有效时长
		long nowTime = System.currentTimeMillis();
		long expireTime = nowTime + effective;
		return SecurityUtil.jiami(user_login + "|" + password + "|"+sysId+"|"
				+ expireTime);
		
	}

	/**
	 * 调用业务系统提供的验证服务
	 * 
	 * @param url
	 * @param userInfo
	 * @return
	 */
	public static String executeService(String url, String userInfo) {
		ClientResponse response;
		WebResource webResource;
		Client client = null;
		try {
			client = Client.create();// 创建客户端
			webResource = client.resource(url);// 建立通道
			Form param = new Form();
			param.add("login_info", userInfo);// 创建表单
			response = webResource.type("application/x-www-form-urlencoded")
					.post(ClientResponse.class, param);// 发起post请求
			if (response == null)
				return "-4"; // 服务不可用
			int status = response.getStatus();
			if (status == 200)
				return response.getEntity(String.class);// 返回服务验证状态
			else
				return "-4";
		} catch (Exception e) {
			log.error("绑定用户：调用业务系统提供的用户名和密码验证服务出错！", e);
			return "-4";
		} finally {
			if (null != client) {
				client.destroy();
			}
		}
	}

	public static void main(String[] args) {
		int effective = Integer.parseInt(ConfUtil
				.getValue("validate_expire_time"));// 获取有效时长
		long nowTime = System.currentTimeMillis();
		long expireTime = nowTime + 1000000000;
//		String userInfo = SecurityUtil.jiami("LXQJYJ|123|" + expireTime);
		String userInfo = SecurityUtil.jiami("8256789|123456a?|" + expireTime);
//		String userInfo = SecurityUtil.jiami("测试用户|123456a?|" + expireTime);
//		String url = "http://www.sdzcjy.cn/inspurvalidate.aspx";//山东省成人高等教育管理服务平台
//		String url = "http://221.214.92.82/compe/inspurvalidate.aspx";//山东省职业院校技能大赛报名系统
//		String url = "http://221.214.92.82/xmgl/inspurvalidate.aspx";//山东省规范化中职学校建设工程
//		String url = "http://221.214.92.88/sdzc/inspurvalidate.aspx";//山东省中小学教育资产管理系统
//    	String url = "http://221.214.92.89:8088/GOA-0.5/inspurvalidate.do";//山东省教育厅财务处办公系统
//		String url = "http://www.sdxs.net/inspurvalidate.aspx";//山东省中小学校舍信息管理平台
//		String url = "http://221.214.92.86/inspurvalidate.aspx";//山东省普通中小学办学条件标准化
//		String url = "http://172.16.131.112:80/inspurvalidate.aspx";
//		String url = "http://172.16.146.11:8083/dbe/userValidation";
		
//		String url = "http://172.16.66.11:80/TYYH/rest/validate?app_id=13";
		String url = "http://yyzc.sdei.edu.cn:84/TYYH/rest/validate?app_id=ZZJYXSGLXT";

		System.out.println("加密后："+userInfo);
		System.out.println("解密后："+SecurityUtil
				.jiemi("UsxUDok1/+NJhR9UY5x9y14UEf+xwG3g6s5bMIzqgMA="));
		String result = executeService(url, userInfo);
		if("0".equals(result)){
			result += "密码不正确";
		}else if("-1".equals(result)){
			result += "用户不存在";
		}else if("1".equals(result)){
			result += "验证成功";
		}else if("-2".equals(result)){
			result += "用户已禁用";
		}else if("-3".equals(result)){
			result += "非法请求";
		}else if("-4".equals(result)){
			result += "服务不可用";	
		}else{
			result += "返回非指定值，请确认";
		}
		System.out.println("返回结果："+result);
	}
	
	
	/**
	 * 根据开发者develop_id获取用户昵称
	 * param:develop_id
	 * 
	 */
	
	public static String getNickNameByDevelopId(String develop_id){
		String nick_name = "";
		IUserExtendDomain userExtendDomain= UserUtils.getUserExtendDomain();
		String sort_field = "uid";
		String sort_type = "desc";
		Map condition = new HashMap();
		if (StringUtils.isNotEmpty(develop_id)) {
			condition.put("user_value", develop_id);
			condition.put("user_key", "developer_id");
		}
		condition.put("show_nick_name", true);
		Map userMap = userExtendDomain.query(condition, sort_field+" "+sort_type, 1 , 8);
		log.error(userMap.toString());
		if(!userMap.isEmpty()){
			List<Map> userList = (List<Map>) userMap.get("data");
			if(!userList.isEmpty()){
				nick_name = (String) userList.get(0).get("nick_name");			
			}			
		}
		return nick_name;
	}
	
	/*
	 * 根据应用id获取应用非单点登录地址
	 * param： app_id
	 */
	public static String getAppNOSSOUrl(String appId){
		String no_sso_url = "";
		Map appLoginUrlMap = UserUtils.getUserBindDomain().getUumSysIdByAppId(appId);
		if(appLoginUrlMap!=null){
			no_sso_url = (String) appLoginUrlMap.get("no_sso_url");
		}
		return no_sso_url;
	}
	
	public static String getAdminCheckValue(String key){
		try {
			SystemConfigService systemConfigService =UserUtils.getSystemConfigService();
			SystemConfig config = systemConfigService.getSystemConfig("admin_instr_check");
			return config.getParam_value();
		} catch (DataBaseException e) {
			e.printStackTrace();
		} catch (InvalidParametersException e) {
			e.printStackTrace();
		}
		return null;
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

	public static List<IUserListener> getIUserListener() {
		IUserListener iuserListener = null;
		List<IUserListener> list = new ArrayList<IUserListener>();
		String className = ConfUtil.getValue("userlistener");
		if (className != null) {
			String[] classnames = className.split("\\|");
			for(String name : classnames){
				iuserListener = (IUserListener) instance(name);
				if(iuserListener!=null){
					list.add(iuserListener);
				}
			}
		}
		return list;
	}
	
	public static List<IOrganizationListener> getIOrganListener() {
		IOrganizationListener iorganListener = null;
		List<IOrganizationListener> list = new ArrayList<IOrganizationListener>();
		String className = ConfUtil.getValue("organizationlistener");
		if (className != null) {
			String[] classnames = className.split("\\|");
			for(String name : classnames){
				iorganListener = (IOrganizationListener) instance(name);
				if(iorganListener!=null){
					list.add(iorganListener);
				}
			}
		}
		return list;
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
	
	
 	public static Date getStartTime() {
        Calendar todayStart = Calendar.getInstance();  
        todayStart.set(Calendar.HOUR_OF_DAY, 0);
        todayStart.set(Calendar.MINUTE, 0);
        todayStart.set(Calendar.SECOND, 0);  
        todayStart.set(Calendar.MILLISECOND, 0);  
        return todayStart.getTime();  
    }  
  
 	public static Date getEndTime() {
        Calendar todayEnd = Calendar.getInstance();  
        todayEnd.set(Calendar.HOUR_OF_DAY, 23);  
        todayEnd.set(Calendar.MINUTE, 59);  
        todayEnd.set(Calendar.SECOND, 59);  
        todayEnd.set(Calendar.MILLISECOND, 999);  
        return todayEnd.getTime();
    }
 	
 	public static String getSiteCodeByUid(int uid) {
 		return UserUtils.getUserDomain().getSiteCodeByUid(uid);
 	}
 	
 	public static String getSiteCodeByRequest(HttpServletRequest request) {
 		Object userID = getUserID(request);
 		if (userID == null) {
 			return null;
 		}
 		return getSiteCodeByUid(Integer.valueOf((String) userID));
 	}
}
