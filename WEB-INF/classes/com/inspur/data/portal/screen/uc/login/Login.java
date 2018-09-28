package com.inspur.data.portal.screen.uc.login;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.loushang.internet.util.JsonUtils;
import org.loushang.internet.util.el.Function;
import org.loushang.internet.view.ViewHandler;

import com.inspur.data.common.exception.DataBaseException;
import com.inspur.data.common.exception.InvalidParametersException;
import com.inspur.portal.model.base.SystemConfig;
import com.inspur.portal.model.user.UserOperationLog;
import com.inspur.portal.service.user.UserOperationLogService;
import com.inspur.uc.api.user.IUserExtendDomain;
import com.inspur.ucweb.utils.ConfUtil;
import com.inspur.ucweb.utils.PhpUtil;
import com.inspur.ucweb.utils.SecurityUtil;
import com.inspur.ucweb.utils.ServiceConst;
import com.inspur.ucweb.utils.SystemUtil;
import com.inspur.ucweb.utils.UCUtil;
import com.inspur.utils.AuditLogUtil;
import com.inspur.utils.UserUtils;

public class Login implements ViewHandler {
    private static Logger log = Logger.getLogger(Login.class);

    /**
     * 进入登陆页面
     */
    public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // 进入手机web登录页面
        String show_phone_login = request.getParameter("show_phone_login");
        if ("1".equals(show_phone_login)) {
            String queryString = request.getQueryString();
            response.sendRedirect(Function.getLink("login/loginPhone.jsp") + "?" + queryString);
            return;
        }
        // 首先检查是否存在RelayState，如果存在，则首先将RelayState放到session中
        HttpSession session = request.getSession();
        String RelayState = request.getParameter("RelayState");
        if (RelayState == null) {
            RelayState = request.getParameter("SAMLRequest");
            RelayState = RelayState != null ? RelayState : (String) session.getAttribute("SAMLRequest");
            if (RelayState != null) {
                session.setAttribute("sso_type", "samlsso");
                session.setAttribute("SAMLRequest", RelayState);
            }
        }
        if (RelayState == null) {
            RelayState = request.getParameter("callback_url");
        }
        if (RelayState != null) {
            session.setAttribute("RelayState", RelayState);
        }
        // 如果已登录，并且存在RelayState，则跳转至RelayState(会在RelayState尾部追加参数uclogin=1)
        // 如果已登录登录，并且不存在RelayState，则直接跳转至用户中心的home页面
        if (session.getAttribute("uid") != null) {
            session.removeAttribute("RelayState");
            // 假设saml单点登录肯定会发送SAMLRequest参数，则saml场景下，RelayState不可能为空
            if (RelayState == null) {
                String default_relay_state = ConfUtil.getValue("default_relay_state");
                response.sendRedirect(default_relay_state);
            } else {
                if (RelayState.indexOf("?") > -1) {
                    if (RelayState.indexOf("uclogin=1") == -1) {
                        RelayState = RelayState + "&uclogin=1";
                    }
                } else {
                    if (RelayState.indexOf("uclogin=1") == -1) {
                        RelayState = RelayState + "?uclogin=1";
                    }
                }
    			// 检查是否在信任域列表中
    			if (!UCUtil.isTrustDomain(RelayState)) {
    				RelayState = ConfUtil.getValue("default_relay_state");
    			}
                response.sendRedirect(RelayState);
            }
        }
        // 如果未登录，则正常进入登录页面
        else {
            // 取得cookie信息
            String account = UCUtil.getCookieValue(request, "account");
            if (account != null) {
                request.setAttribute("account", account);
            }
            // 查询登录失败次数，仅用于判断是否显示验证码及是否进行验证码的校验。
            int login_fail_time = 0;
            if (session.getAttribute("login_fail_time") != null) {
                login_fail_time = Integer.parseInt(session.getAttribute("login_fail_time").toString());
            }
            request.setAttribute("login_fail_time", login_fail_time);
            // 生成随机码，防止登录重放攻击
            String is_enable_login_salt = ConfUtil.getValue("is_enable_login_salt");
            if ("1".equals(is_enable_login_salt)) {
                String login_salt = UCUtil.getRandom(6);
                session.setAttribute("login_salt", login_salt);
                request.setAttribute("login_salt", login_salt);
            }
            if (RelayState == null) {
                RelayState = ConfUtil.getValue("default_relay_state");
            }
            request.setAttribute("relayState", RelayState);
        }
        try {
            SystemConfig login_title = UserUtils.getSystemConfigService().getSystemConfig("login_title");
            if (login_title != null) {
                request.setAttribute("title", login_title.getName());
            } else {
                request.setAttribute("title", "登录首页");
            }
            //获取登录首页图标
            SystemConfig login_logoInfo = UserUtils.getSystemConfigService().getSystemConfig("login_logoInfo");
            if (login_logoInfo != null) {
                request.setAttribute("login_logoInfo", login_logoInfo.getParam_value());
            } else {
                request.setAttribute("login_logoInfo", "/ucweb/default/images/userlogin.png");
            }
        } catch (DataBaseException e) {
            e.printStackTrace();
        } catch (InvalidParametersException e) {
            e.printStackTrace();
        }finally {
        	//记录页面访问日志
        	AuditLogUtil.addPageVisitAutiLog(request, "登录", "");
		}
    }

    /**
     * 用户会话已经存在的场景下，处理SAML单点登录请求
     * 
     * @param request
     * @param response
     * @throws IOException
     */
    private void handleSamlSSO(HttpServletRequest request, HttpServletResponse response) throws IOException {
        // SP端解析授权断言的URL,暂时saml请求中只包括断言消费url
        String sp_consumer_url = request.getParameter("SAMLRequest");
        String sso_url = "".equals(sp_consumer_url) ? sp_consumer_url : sp_consumer_url.split("\\?")[0];// 单点登录授权地址，用于取绑定信息
        // 检查断言消费URL是否在信任域列表，只有在可信任域列表中才生成SAML响应
        if (!UCUtil.isTrustDomain(sp_consumer_url)) {
            response.sendRedirect(ConfUtil.getValue("default_relay_state"));
            return;
        }
        HttpSession session = request.getSession(false);
        String uid = String.valueOf(session.getAttribute("uid"));
        String user_id = String.valueOf(((Map) session.getAttribute("userInfo")).get("user_id"));
        String saml_response = SecurityUtil.jiami(uid + "|" + user_id + "|" + PhpUtil.time());
        StringBuilder auto_to_sp = new StringBuilder();
        auto_to_sp.append("<html>");
        auto_to_sp.append("<head>");
        auto_to_sp.append("<meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\">");
        auto_to_sp.append("<title>自动跳转至SP端解析授权断言的URL</title>");
        auto_to_sp.append("</head>");
        auto_to_sp.append("<body onload='document.forms[0].submit()'>");
        auto_to_sp.append("<form action='" + sp_consumer_url + "' method=\"post\">");
        auto_to_sp.append("<input type=\"hidden\" name=\"SAMLResponse\" value='" + saml_response + "'>");
        /* 增加未加密的返回数据 */
        auto_to_sp.append("<input type=\"hidden\" name=\"uid\" value='" + uid + "'>");
        String nick_name = String.valueOf(((Map) session.getAttribute("userInfo")).get("nick_name"));
        auto_to_sp.append("<input type=\"hidden\" name=\"nick_name\" value='" + nick_name + "'>");
        String user_type = String.valueOf(((Map) session.getAttribute("userInfo")).get("user_type"));
        auto_to_sp.append("<input type=\"hidden\" name=\"user_type\" value='" + user_type + "'>");
        auto_to_sp.append("</form>");
        auto_to_sp.append("</body>");
        auto_to_sp.append("</html>");
        response.getWriter().write(auto_to_sp.toString());
    }

    /**
     * 执行登录操作，接收ajax、jsonp提交
     * 
     * @param request
     * @param response
     * @throws ServletException
     * @throws IOException
     * @throws ParseException 
     */
    public void doLogin(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException, ParseException {
        // 账号、密码、验证码
        String account = URLDecoder.decode(request.getParameter("account"), "UTF-8"); // 账号 or 邮箱 or 手机号
        String pwd = request.getParameter("pwd");// (密码md5 +
                                                 // login_salt)再次md5之后的结果
        String verify_request = request.getParameter("verify_code");
        if (verify_request != null) {
            verify_request = verify_request.trim();
        }
        // 跨域调用时使用jsonp返回数据
        String callbackparam = request.getParameter("callbackparam");
        // session中的验证码
        HttpSession session = request.getSession();
        String verify_session = String.valueOf(session.getAttribute("verify_code"));
        // 查询登录失败次数,如果失败次数大于等于1,则需要检查校验码。（session中的login_fail_time与账户锁定无关，仅用于检查是否显示和检查验证码）
        int login_fail_time = 0;
        if (session.getAttribute("login_fail_time") != null) {
            login_fail_time = Integer.parseInt(session.getAttribute("login_fail_time").toString());
        }
        // 登录结果
        String res = null;
        Map user = null;
        if (account == null || pwd == null) {
            res = "-1";// 用户名或密码错误
        } else if (login_fail_time >= 1 && !"null".equals(verify_session) && !verify_session.equalsIgnoreCase(verify_request)) {
            res = "-2"; // ret: -2 验证码不匹配
        } else {
            user = UCUtil.getUser(account);
            if (user == null || user.size() == 0 || "91".equals(user.get("user_type"))) {
                res = "-1";// -5:系统中不存在此用户//因为广州登录错误消息凭证枚举原因，把返回的错误状态码-5 更改为-1 用户名或密码错误
            } else {
                //判断用户是内网用户还是外网用户，根据不同用户类型区分登录   ucweb合并到odweb后，登录页面为odweb登录页面，不再做内外网用户的判断
                Integer uid = Integer.valueOf(user.get("uid").toString());
                /*if (uid != 1) {
                    String is_internal_web = request.getParameter("is_internal_web");
                    String is_internal_user = String.valueOf(user.get("is_internal_user") == null ? "" : user.get("is_internal_user"));
                    if (!"".equals(is_internal_user) && is_internal_user != null) {
                        if (!"".equals(is_internal_web) && is_internal_web != null) {
                            if ("manage".equals(is_internal_web) && "0".equals(is_internal_user)) {
                                res = "8";
                            }
                            if ("open".equals(is_internal_web) && "1".equals(is_internal_user)) {
                                res = "8";
                            }
                        }
                    }
                }*/
                //判断用户的密码有效期
                String userPwdValidity_open = ConfUtil.getValue("userPwdValidity_open");
                if (userPwdValidity_open.equals("1")) {
                    SimpleDateFormat simpleFormat = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
                    Date date = new Date();
                    String change_time = "";
                    String now_time = "";
                    String userPwdValiditys = ConfUtil.getValue("userPwdValidity");
                    Integer userPwdValidity = 0;
                    if (userPwdValiditys == null || "".equals(userPwdValiditys)) {
                        userPwdValidity = 90;
                    } else {
                        userPwdValidity = Integer.valueOf(userPwdValiditys);
                    }
                    Map Pwdchangelist = UserUtils.getHistoryDomain().getRecentlyPwdChangeByUid(Integer.valueOf(user.get("uid").toString()));
                    if (Pwdchangelist == null) {
                        String ctime = user.get("create_time").toString();
                        change_time = ctime;
                        now_time = simpleFormat.format(date);
                    } else {
                        change_time = Pwdchangelist.get("change_time").toString();
                        now_time = simpleFormat.format(date);
                    }
                    long from = simpleFormat.parse(change_time).getTime();
                    long to = simpleFormat.parse(now_time).getTime();
                    int days = (int) ((to - from) / (1000 * 60 * 60 * 24));
                    if (days >= userPwdValidity) {
                        res = "6"; //密码过期
                    }
                }
                //查看是否单用户登录模式
                String SingleUserMode = ConfUtil.getValue("SingleUserMode");
                if ("1".equals(SingleUserMode)) {
                    Map<String, Object> UserLoginInfo = UserUtils.getUserLoginDomain().getUserLoginInfoByUid(uid);
                    if (UserLoginInfo != null && UserLoginInfo.get("is_online")!= null) {
                        String is_online =UserLoginInfo.get("is_online")==null?"0": UserLoginInfo.get("is_online").toString();
                        if ("1".equals(is_online)) {
                            res = "7"; //已经有用户在线
                        }
                    }
                }
                // (-1，用户名或密码错误；0，尚未激活；1，登录成功；10，登录成功但需完善资料；2，账户已锁定；3，账户已删除；4，未知的系统错误；5，账户不存在；9，用户被禁用)
                if (!"6".equals(res) && !"7".equals(res) && !"8".equals(res)) {
                    String is_enable_login_salt = ConfUtil.getValue("is_enable_login_salt");
                    if ("1".equals(is_enable_login_salt)) {
                        if (UCUtil.isEmpty(session.getAttribute("login_salt"))) {
                            res = "4";
                            log.error("login_salt为空，可能的登录重放攻击！");
                        } else {
                            String login_salt = String.valueOf(session.getAttribute("login_salt"));
                            res = UserUtils.getUserDomain().login(user, pwd, login_salt) + "";
                        }
                    } else {
                        res = UserUtils.getUserDomain().login(user, pwd, null) + "";
                    }
                }
            }
        }
        // ---------------登录完成，处理登录结果。-------------------
        if ("-1".equals(res)) {
            // 登录失败，设置登录失败次数加一
            login_fail_time = login_fail_time + 1;
            session.setAttribute("login_fail_time", login_fail_time);
        }
        // 1和10都表示登录成功，但是返回值是10时，表示该用户需要完善资料信息。
        if (res.equals("1") || res.equals("10")) {
            //新开发审计，记录用户登录操作
            try {
            	UserOperationLog userOperationLog = new UserOperationLog();
                userOperationLog.setLog_lk_id(null);
                userOperationLog.setClient_browser(SystemUtil.getRequestBrowserInfo(request));
                userOperationLog.setClient_code(null);
                userOperationLog.setClient_ip(SystemUtil.getIpAddr(request));
                userOperationLog.setClient_system(SystemUtil.getRequestSystemInfo(request));
                userOperationLog.setClient_type("PC");
                userOperationLog.setCreate_time(new Date());
                userOperationLog.setObj_id(user.get("uid").toString());
                userOperationLog.setObj_name("登录");
                userOperationLog.setObj_type("user");
                userOperationLog.setOp_type("login");//用户登录操作
                userOperationLog.setUser_id(user.get("uid").toString());
                userOperationLog.setUser_name(user.get("nick_name").toString());
                if(user.get("uid")!=null){
	                Map userMap=UCUtil.getUserBasic(Integer.parseInt(user.get("uid").toString()));
	                if(userMap.get("site_code")!=null){
	                	userOperationLog.setSite_code(userMap.get("site_code").toString());
	                }
                }
                //添加审计日志
                UserOperationLogService userOperationLogService = ServiceConst.getUserOperationLogService();
                int ret = userOperationLogService.add(userOperationLog);
                if (ret > 0) {
                    log.info("登录审计日志添加成功");
                    //                    System.out.println("登录审计日志添加成功");
                }
            } catch (Exception e) {
                log.error("登录审计日志添加失败", e);
                //                System.out.println("登录审计日志添加失败");
            }
            // 重置sessionid
            UCUtil.reGenerateSessionId(request);
            session = request.getSession();
            // 登录成功后，将uid等用户信息放入session
            String uid = user.get("uid").toString();
            session.setAttribute("uid", uid);
            session.setAttribute("userInfo", user);
            session.setAttribute("login_type", "userpwd");
            //查询是否开发者
            IUserExtendDomain userExtendDomain = UserUtils.getUserExtendDomain();
            Map developer = userExtendDomain.getUserExtendByUid(Integer.parseInt(uid));
            if (developer != null) {
                session.setAttribute("developer_id", developer.get("user_value"));
            } else {
                session.setAttribute("developer_id", "");
            }
            if ("10".equals(res)) {
                session.setAttribute("needSupplement", "true");
            }
            // 弹出框登录（jsonp），会传递RelayState参数（登录完成后，如果需要完善资料，完善资料后，跳转回RelayState页面）
            String RelayState = request.getParameter("RelayState");
            if (RelayState != null) {
                session.setAttribute("RelayState", RelayState);
            }
            // 记录登录历史记录/更新登录信息等
            Map loginInfo = new HashMap();
            loginInfo.put("uid", uid);
            loginInfo.put("login_ip", UCUtil.getClientIP(request));
            loginInfo.put("login_type", "userpwd");
            UserUtils.getUserDomain().afterLoginOk(loginInfo);
            // 设置cookie
            String cookieDomain = UCUtil.getCookieDomain();
            // 登录成功后，将当前登录用户的登录方式存储到客户端cookie，普通登录值为‘userpwd’，CA登录值为‘cert’
            // ,第三方账号'outacc'
            UCUtil.setCookie("login_type", "userpwd", -1, "/", cookieDomain, response);
            UCUtil.setCookie("sso_token", SecurityUtil.jiami(uid), -1, "/", cookieDomain, response);
            UCUtil.setCookie("uc_uid", SecurityUtil.jiamiOld(uid), -1, "/", cookieDomain, response);
            UCUtil.setCookie("login_time", PhpUtil.time(), -1, "/", cookieDomain, response);
            UCUtil.setCookie("uc_user_id", String.valueOf(user.get("user_id")), -1, "/", cookieDomain, response);
            UCUtil.setCookie("uc_nick_name", String.valueOf(user.get("nick_name")), -1, "/", cookieDomain, response);
            // -----记住登录状态的处理-------
            String remember_login_state = request.getParameter("hid_remember_me");
            // 登录成功后，将当前登录用户的uid存储客户端cookie中
            if ("1".equals(remember_login_state)) {
                // 记住登录状态的cookie['uc_uid_state']将设置一周的有效期限，此cookie用于记录登录状态，无$cookieDomain，仅在用户中心处理
                UCUtil.setCookie("uc_uid_state", SecurityUtil.jiami(uid), 3600 * 24 * 7, "/", cookieDomain, response);
            }
            // -----记住用户名的处理---------
            String is_remember_me = request.getParameter("hid_remember_me");
            if ("1".equals(is_remember_me)) {
                // 登录用户名有效期设置为2周
                UCUtil.setCookie("account", account, 3600 * 24 * 7 * 2, "/", cookieDomain, response);
            } else if ("0".equals(is_remember_me)) {
                UCUtil.setCookie("account", null, 0, "/", cookieDomain, response);
            } else {
                // 不作处理
            }
        }
        // 登录结果是1时，如果session中包含有sso_type或RelayState，则返回-3，表示需要走aftersso
        // 跨子域jsonp请求，不需要返回-3，在登录框中已保存了回调URL。
        if (res.equals("1") && callbackparam == null) {
            if (session.getAttribute("sso_type") != null || session.getAttribute("RelayState") != null) {
                res = "-3";
            }
        }
        // 账号未激活时，在session中记录login_email，发送激活链接时使用。
        if ("0".equals(res)) {
            Object login_email = user.get("login_email");
            session.setAttribute("login_email_for_activate", login_email);
        }
        // 如果是json请求p，则返回jsonp格式的数据。登录成功才返回sso_token数据
        if (callbackparam != null && "1".equals(res)) {
            //跨域返回sso_token
            JSONObject json = new JSONObject();
            try {
                if (user != null && user.size() != 0) {
                    String uid = user.get("uid").toString();
                    json.put("sso_token", SecurityUtil.jiami(uid));
                    json.put("uc_nick_name", String.valueOf(user.get("nick_name")));
                }
                json.put("res", res);
            } catch (JSONException e) {
                log.error("跨域返回sso_token出错");
            }
            response.getWriter().write(callbackparam + "(" + json.toString() + ")");
            
        } else if (callbackparam != null && !"1".equals(res)) {
            //跨域返回sso_token
            JSONObject json = new JSONObject();
            try {
                json.put("res", res);
            } catch (JSONException e) {
                log.error("跨域返回sso_token出错");
            }
            response.getWriter().write(callbackparam + "(" + json.toString() + ")");
        } else {
            response.getWriter().write(res);
        }
    }

    /**
     * 使用第三方账号登录（qq、sina等）
     * 
     * @param request
     * @param response
     * @throws ServletException
     * @throws IOException
     */
    public void doOtherLogin(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // 检查请求中是否包含RelayState，如果包含，则将RelayState保存到session中
        HttpSession session = request.getSession();
        String RelayState = request.getParameter("RelayState");
        if (RelayState != null) {
            session.setAttribute("RelayState", RelayState);
        }
        String type = request.getParameter("type");
        // 组装callback URL
        String oauth_callback_url = Function.getLink("login/login.do?method=oauthCallBack&type=" + type);
        session.setAttribute("oauth_callback_url", oauth_callback_url);
        if ("qq".equals(type)) {
            String oauth_state = UCUtil.getRandom(6);
            session.setAttribute("oauth_state", oauth_state);
            String authorize_url = "https://graph.qq.com/oauth2.0/authorize";
            authorize_url = authorize_url + "?response_type=code" + "&client_id=" + ConfUtil.getValue("qq_appid") + "&scope=get_user_info"
                    + "&state=" + oauth_state + "&redirect_uri=" + URLEncoder.encode(oauth_callback_url, "utf-8");
            response.sendRedirect(authorize_url);
        } else if ("sina".equals(type)) {
            String authorize_url = "https://api.weibo.com/oauth2/authorize" + "?response_type=code" + "&client_id=" + ConfUtil.getValue("sina_appid")
                    +
                    // "&scope=all" +
                    "&redirect_uri=" + URLEncoder.encode(oauth_callback_url, "utf-8");
            response.sendRedirect(authorize_url);
        } else {
            response.sendRedirect(Function.getLink("login/login.htm"));
        }
        return;
    }

    /**
     * 使用第三方账号登录时的回调地址
     * 
     * @param request
     * @param response
     * @throws ServletException
     * @throws IOException
     */
    public void doOauthCallBack(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // qq端，该code十分钟后过期，须尽快使用code换取token
        String code = request.getParameter("code");
        if (code == null) {
            response.sendRedirect(Function.getLink("login/login.jsp"));
            return;
        }
        HttpSession session = request.getSession();
        String oauth_callback_url = String.valueOf(session.getAttribute("oauth_callback_url"));
        String type = request.getParameter("type");
        if ("qq".equals(type)) {
            String oauth_state_request = request.getParameter("state");
            String oauth_state_session = String.valueOf(session.getAttribute("oauth_state"));
            if (!oauth_state_session.equals(oauth_state_request)) {
                log.error("CSRF攻击");
            }
            // 1、code换取token
            String get_token_url = "https://graph.qq.com/oauth2.0/token" + "?grant_type=authorization_code" + "&client_id="
                    + ConfUtil.getValue("qq_appid") + "&client_secret=" + ConfUtil.getValue("qq_appkey") + "&code=" + code + "&redirect_uri="
                    + URLEncoder.encode(oauth_callback_url, "utf-8");
            session.removeAttribute("oauth_callback_url");
            session.removeAttribute("oauth_state");
            String content = UCUtil.httpGet(get_token_url, null);
            if (content == null || !content.startsWith("access_token=")) {
                response.getWriter().write("换取access_token失败");
                return;
            }
            // access_token=5A34B77EB7A71FB62BA64D0B96D142BF&expires_in=7776000&refresh_token=70E29012AFFC830EBA88E8E838E8AE6D
            String access_token = content.split("&")[0].split("=")[1];
            // 2、根据access_token查询openid
            String me_url = "https://graph.qq.com/oauth2.0/me?access_token=" + access_token;
            content = UCUtil.httpGet(me_url, null);
            if (content == null || !content.startsWith("callback(")) {
                response.getWriter().write("查询openid失败");
                return;
            }
            // callback(
            // {"client_id":"100359436","openid":"8E1848F6707B05DECC374B2E0C154FA3"}
            // );
            content = content.substring("callback(".length(), content.length() - 2);
            content = content.trim();
            Map open_id_map = JsonUtils.readToObject(content, Map.class);
            String openid = String.valueOf(open_id_map.get("openid"));
            // 检查是否已经与本地系统账户绑定，如果已绑定，则直接根据本地系统账户创建会话，
            Map bind = UserUtils.getOutBindDomain().getMapByOpenIdAndType(openid, "qq");
            if (bind != null) {
                // 重置sessionid
                UCUtil.reGenerateSessionId(request);
                session = request.getSession();
                // 设置session
                String uid = String.valueOf(bind.get("uid"));
                // //查询是否开发者信息
                // String developer_id =
                // ServiceConst.getUC_IUserExtendDomain().getValueByUidAndKey(uid,
                // "developer_id");
                // if(developer_id != null){
                // session.setAttribute("developer_id", developer_id);
                // }
                Map userInfo = UserUtils.getUserDomain().getUserByUid(Integer.parseInt(uid));
                session.setAttribute("uid", uid);
                session.setAttribute("userInfo", userInfo);
                session.setAttribute("login_type", "outacc");
                // 设置cookie
                String cookieDomain = UCUtil.getCookieDomain();
                UCUtil.setCookie("login_type", "outacc", -1, "/", cookieDomain, response);
                UCUtil.setCookie("sso_token", SecurityUtil.jiami(uid), -1, "/", cookieDomain, response);
                UCUtil.setCookie("uc_uid", SecurityUtil.jiamiOld(uid), -1, "/", cookieDomain, response);
                UCUtil.setCookie("login_time", PhpUtil.time(), -1, "/", cookieDomain, response);
                UCUtil.setCookie("uc_user_id", String.valueOf(userInfo.get("user_id")), -1, "/", cookieDomain, response);
                UCUtil.setCookie("uc_nick_name", String.valueOf(userInfo.get("nick_name")), -1, "/", cookieDomain, response);
                // 记录登录历史记录//更新登录信息
                String ip = UCUtil.getClientIP(request);
                Map loginInfo = new HashMap();
                loginInfo.put("uid", uid);
                loginInfo.put("login_ip", UCUtil.getClientIP(request));
                loginInfo.put("login_type", "outacc");
                UserUtils.getUserDomain().afterLoginOk(loginInfo);
                // 使用第三方账号登录成功后，根据登录类型不同，跳转不同的地址。
                response.sendRedirect(Function.getLink("index/index.do?method=aftersso"));
                return;
            } else {
                // 如果未绑定，则查询qq用户信息，放入session，然后进入绑定页面，执行绑定。
                // 根据openid、access_token查询用户信息
                String get_user_info_url = "https://graph.qq.com/user/get_user_info" + "?access_token=" + access_token + "&oauth_consumer_key="
                        + ConfUtil.getValue("qq_appid") + "&openid=" + openid + "&format=json";
                content = UCUtil.httpGet(get_user_info_url, null);
                if (content == null) {
                    response.getWriter().write("查询用户信息失败");
                    return;
                }
                // {
                // "ret": 0,
                // "msg": "",
                // "is_lost":0,
                // "nickname": "黄启庆",
                // "gender": "男",
                // "figureurl":
                // "http:\/\/qzapp.qlogo.cn\/qzapp\/100359436\/8E1848F6707B05DECC374B2E0C154FA3\/30",
                // "figureurl_1":
                // "http:\/\/qzapp.qlogo.cn\/qzapp\/100359436\/8E1848F6707B05DECC374B2E0C154FA3\/50",
                // "figureurl_2":
                // "http:\/\/qzapp.qlogo.cn\/qzapp\/100359436\/8E1848F6707B05DECC374B2E0C154FA3\/100",
                // "figureurl_qq_1":
                // "http:\/\/q.qlogo.cn\/qqapp\/100359436\/8E1848F6707B05DECC374B2E0C154FA3\/40",
                // "figureurl_qq_2":
                // "http:\/\/q.qlogo.cn\/qqapp\/100359436\/8E1848F6707B05DECC374B2E0C154FA3\/100",
                // "is_yellow_vip": "0",
                // "vip": "0",
                // "yellow_vip_level": "0",
                // "level": "0",
                // "is_yellow_year_vip": "0"
                // }
                Map qq_user_info = JsonUtils.readToObject(content, Map.class);
                // 将qq用户信息放入session
                session.setAttribute("access_token", access_token);
                session.setAttribute("other_nick_name", qq_user_info.get("nickname"));
                session.setAttribute("type", "qq");
                session.setAttribute("openid", openid);
                response.sendRedirect(Function.getLink("index/bind.jsp"));
                return;
            }
        } else if ("sina".equals(type)) {
            // 1、code换取token 和 openid
            String get_token_url = "https://api.weibo.com/oauth2/access_token" + "?client_id=" + ConfUtil.getValue("sina_appid") + "&client_secret="
                    + ConfUtil.getValue("sina_appkey") + "&grant_type=authorization_code" + "&code=" + code + "&redirect_uri="
                    + URLEncoder.encode(oauth_callback_url, "utf-8");
            String content = UCUtil.httpPost(get_token_url, null);
            if (content != null) {
                // {"access_token":"2.002J_o8CllyxAD87e597a5730ociFS","remind_in":"157679999","expires_in":157679999,"uid":"2243216751"}
                Map res = JsonUtils.readToObject(content, Map.class);
                String token = String.valueOf(res.get("access_token"));
                String openid = String.valueOf(res.get("uid"));
                // 如果已经与本地账号进行了绑定，则直接创建会话，如果尚未与本地账号绑定，则跳转至账号绑定页面。
                Map bind = UserUtils.getOutBindDomain().getMapByOpenIdAndType(openid, "sina");
                if (bind != null) {
                    // 设置session信息
                    String uid = String.valueOf(bind.get("uid"));
                    // //查询是否开发者信息
                    // String developer_id =
                    // ServiceConst.getUC_IUserExtendDomain().getValueByUidAndKey(uid,
                    // "developer_id");
                    // if(developer_id != null){
                    // session.setAttribute("developer_id", developer_id);
                    // }
                    session.setAttribute("uid", uid);
                    Map userInfo = UserUtils.getUserDomain().getUserByUid(Integer.parseInt(uid));
                    session.setAttribute("userInfo", userInfo);
                    session.setAttribute("login_type", "outacc");
                    // 设置cookie
                    String cookieDomain = UCUtil.getCookieDomain();
                    UCUtil.setCookie("login_type", "outacc", -1, "/", cookieDomain, response);
                    UCUtil.setCookie("sso_token", SecurityUtil.jiami(uid), -1, "/", cookieDomain, response);
                    UCUtil.setCookie("uc_uid", SecurityUtil.jiamiOld(uid), -1, "/", cookieDomain, response);
                    UCUtil.setCookie("login_time", PhpUtil.time(), -1, "/", cookieDomain, response);
                    UCUtil.setCookie("uc_user_id", String.valueOf(userInfo.get("user_id")), -1, "/", cookieDomain, response);
                    UCUtil.setCookie("uc_nick_name", String.valueOf(userInfo.get("nick_name")), -1, "/", cookieDomain, response);
                    String ip = UCUtil.getClientIP(request);
                    Map loginInfo = new HashMap();
                    loginInfo.put("uid", uid);
                    loginInfo.put("login_ip", UCUtil.getClientIP(request));
                    loginInfo.put("login_type", "outacc");
                    UserUtils.getUserDomain().afterLoginOk(loginInfo);
                    // 使用第三方账号登录成功后，根据登录类型不同，跳转不同的地址。
                    response.sendRedirect(Function.getLink("index/index.do?method=aftersso"));
                } else {
                    // 如果未绑定，则查询sina用户信息，放入session，然后进入绑定页面，执行绑定。
                    // 根据openid和token查询用户信息
                    String get_user_url = "https://api.weibo.com/2/users/show.json" + "?access_token=" + token + "&uid=" + openid;
                    // {"id":2243216751,"idstr":"2243216751","class":1,"screen_name":"黄启庆","name":"黄启庆","province":"37","city":"2","location":"山东 青岛","description":"","url":"http://huangqiqing123.iteye.com/","profile_image_url":"http://tp4.sinaimg.cn/2243216751/50/22819949556/1","profile_url":"u/2243216751","domain":"","weihao":"","gender":"m","followers_count":41,"friends_count":15,"statuses_count":0,"favourites_count":0,"created_at":"Tue Jul 12 17:49:06 +0800 2011","following":false,"allow_all_act_msg":false,"geo_enabled":true,"verified":false,"verified_type":-1,"remark":"","ptype":0,"allow_all_comment":true,"avatar_large":"http://tp4.sinaimg.cn/2243216751/180/22819949556/1","avatar_hd":"http://tp4.sinaimg.cn/2243216751/180/22819949556/1","verified_reason":"","follow_me":false,"online_status":0,"bi_followers_count":2,"lang":"zh-cn","star":0,"mbtype":0,"mbrank":0,"block_word":0}
                    content = UCUtil.httpGet(get_user_url, null);
                    Map sina_user = JsonUtils.readToObject(content, Map.class);
                    // 记入session
                    session.setAttribute("access_token", token);
                    session.setAttribute("type", "sina");
                    session.setAttribute("openid", openid);
                    session.setAttribute("other_nick_name", sina_user.get("screen_name"));
                    response.sendRedirect(Function.getLink("index/bind.jsp"));
                    return;
                }
            }
        } else {
            // 暂不支持的第三方账号类型
            response.getWriter().write("<script>alert('暂不支持的第三方账号类型！');</script>");
        }
        return;
    }

    /**
     * 登录框第三方登录时跳转页面
     */
    public void doLoginJump(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        StringBuilder content = new StringBuilder();
        content.append("<html>");
        content.append("<head>");
        content.append("<meta charset='utf-8' />");
        content.append("<title>登录跳转</title>");
        content.append("</head>");
        content.append("<body>");
        content.append("登录成功，正在执行跳转...");
        content.append("</body>");
        content.append("<script>");
        content.append("if(typeof(window.opener._execCallback) != 'undefined'){");
        content.append("window.opener._execCallback();//需保证不跨域");
        content.append("if(navigator.userAgent){");
        content.append("var ua = navigator.userAgent.toLowerCase(); ");
        content.append("if(/msie 6/i.test(ua)||/msie 7/i.test(ua)||/msie 8/i.test(ua)){   ");
        content.append("window.open('','_self'); //ie6,7,8");
        content.append("}");
        content.append("}");
        content.append("window.opener = null;");
        content.append("window.close();");
        content.append("}");
        content.append("</script>");
        content.append("</html>");
    }

    /**
     * 检查是否已登录，仅供弹出登陆框调用
     * 
     * @param request
     * @param response
     * @throws ServletException
     * @throws IOException
     */
    public void doIsLoginForDlg(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        boolean isLogin = request.getSession().getAttribute("uid") == null ? false : true;
        StringBuilder content = new StringBuilder();
        content.append("<html>");
        content.append("<head>");
        content.append("<meta charset='utf-8' />");
        content.append("<script type='text/javascript' src='" + Function.getUrl("js/messenger.js") + "'></script>");
        content.append("</head>");
        content.append("<body>");
        content.append("<script>");
        content.append("var loginMessenger=Messenger.initInIframe();");
        if (isLogin) {
            content.append("loginMessenger.send('islogined');");
        } else {
            content.append("loginMessenger.send('nologined');");
        }
        content.append("</script>");
        content.append("</body>");
        content.append("</html>");
        response.getWriter().write(content.toString());
    }

    /**
     * 本函数属于IDP端专用函数,负责接收SP端的Saml的授权请求.
     * 1、验证请求方在本IDP端是否已登录，如果已登录，则生成授权断言，并跳转至请求方的解析断言的URL。
     * 2、如果请求方尚未在本IDP端登录，则跳转至IDP端登录页面
     */
    public void doSamlsso(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession();
        // 解析认证请求
        String SAMLRequest = request.getParameter("SAMLRequest");
        // 如果请求方在本IDP端已登录
        if (session.getAttribute("uid") != null) {
            handleSamlSSO(request, response);
        }
        // 如果请求方在本IDP端尚未登录
        else {
            // 跳转至本IDP端的登录页面，认证请求信息可以放到session中，登录成功后，根据session中是否存在认证请求信息来执行
            // 对应的页面跳转。
            session.setAttribute("SAMLRequest", SAMLRequest);
            session.setAttribute("sso_type", "samlsso");
            session.setAttribute("samlsso_version", "new");
            String show_phone_login = request.getParameter("show_phone_login");
            if ("1".equals(show_phone_login)) {
                response.sendRedirect(Function.getLink("login/loginPhone.jsp"));
            } else {
                response.sendRedirect(Function.getLink("login/login.jsp"));
            }
        }
    }

    /**
     * doSamlsso1 使用旧的加解密算法，为的是兼容原先已集成的系统 本函数属于IDP端专用函数,负责接收SP端的Saml的授权请求.
     * 1、验证请求方在本IDP端是否已登录，如果已登录，则生成授权断言，并跳转至请求方的解析断言的URL。
     * 2、如果请求方尚未在本IDP端登录，则跳转至IDP端登录页面
     */
    @Deprecated
    public void doSamlsso1(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession();
        // 解析认证请求
        String SAMLRequest = request.getParameter("SAMLRequest");
        // 如果请求方在本IDP端已登录
        if (session.getAttribute("uid") != null) {
            // SP端解析授权断言的URL,暂时saml请求中只包括断言消费url
            String sp_consumer_url = SAMLRequest;
            // 检查断言消费URL是否在信任域列表，只有在可信任域列表中才生成SAML响应
            if (!UCUtil.isTrustDomain(sp_consumer_url)) {
                response.sendRedirect(ConfUtil.getValue("default_relay_state"));
                return;
            }
            // 生成SAMLResponse
            String uid = String.valueOf(session.getAttribute("uid"));
            String saml_response = SecurityUtil.jiamiOld(uid + "|" + PhpUtil.time());
            StringBuilder auto_to_sp = new StringBuilder();
            auto_to_sp.append("<html>");
            auto_to_sp.append("<head>");
            auto_to_sp.append("<meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\">");
            auto_to_sp.append("<title>自动跳转至SP端解析授权断言的URL</title>");
            auto_to_sp.append("</head>");
            auto_to_sp.append("<body onload='document.forms[0].submit()'>");
            auto_to_sp.append("<form action='" + sp_consumer_url + "' method=\"post\">");
            auto_to_sp.append("<input type=\"hidden\" name=\"SAMLResponse\" value='" + saml_response + "'>");
            auto_to_sp.append("</form>");
            auto_to_sp.append("</body>");
            auto_to_sp.append("</html>");
            response.getWriter().write(auto_to_sp.toString());
            // 如果请求方在本IDP端尚未登录
        } else {
            // 跳转至本IDP端的登录页面，认证请求信息可以放到session中，登录成功后，根据session中是否存在认证请求信息来执行
            // 对应的页面跳转。
            // 1、如果存在请求认证信息，则执行与上面if语句块相同的内容。
            // 2、如果不存在请求认证信息，则正常进入登录成功页面。
            session.setAttribute("SAMLRequest", SAMLRequest);
            session.setAttribute("sso_type", "samlsso");
            session.setAttribute("samlsso_version", "old");
            String show_phone_login = request.getParameter("show_phone_login");
            if ("1".equals(show_phone_login)) {
                response.sendRedirect(Function.getLink("login/loginPhone.jsp"));
            } else {
                response.sendRedirect(Function.getLink("login/login.jsp"));
            }
        }
    }

    public static void main(String[] args) throws UnsupportedEncodingException {
        String mi = SecurityUtil.jiami("admin|5|" + PhpUtil.time());
        System.out.println(mi);
        mi = URLDecoder.decode(mi, "utf-8");
        System.out.println(mi);
    }

    /**
     * 执行登录操作，接收ajax、jsonp提交
     * 
     * @param request
     * @param response
     * @throws ServletException
     * @throws IOException
     */
    public void doZhjyLogin(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // 账号、密码、验证码
        String account = request.getParameter("account"); // 账号 or 邮箱 or 手机号
        String pwd = request.getParameter("pwd");// (密码md5 +
                                                 // login_salt)再次md5之后的结果
        String verify_request = request.getParameter("verify_code");
        if (verify_request != null) {
            verify_request = verify_request.trim();
        }
        // 跨域调用时使用jsonp返回数据
        String callbackparam = request.getParameter("callbackparam");
        // session中的验证码
        HttpSession session = request.getSession();
        String verify_session = String.valueOf(session.getAttribute("verify_code"));
        // 查询登录失败次数,如果失败次数大于等于1,则需要检查校验码。（session中的login_fail_time与账户锁定无关，仅用于检查是否显示和检查验证码）
        int login_fail_time = 0;
        if (session.getAttribute("login_fail_time") != null) {
            login_fail_time = Integer.parseInt(session.getAttribute("login_fail_time").toString());
        }
        // 登录结果
        String res = null;
        Map user = null;
        if (account == null || pwd == null) {
            res = "-1";// 用户名或密码错误
        } else if (login_fail_time >= 1 && !"null".equals(verify_session) && !verify_session.equalsIgnoreCase(verify_request)) {
            res = "-2"; // ret: -2 验证码不匹配
        } else {
            user = UCUtil.getUser(account);
            if (user == null || user.size() == 0 || user.get("user_type").toString().equals("91")) {
                res = "-5";// -5:系统中不存在此用户
            } else {
                // (-1，用户名或密码错误；0，尚未激活；1，登录成功；10，登录成功但需完善资料；2，账户已锁定；3，账户已删除；4，未知的系统错误；5，账户不存在)
                String is_enable_login_salt = ConfUtil.getValue("is_enable_login_salt");
                if ("1".equals(is_enable_login_salt)) {
                    if (UCUtil.isEmpty(session.getAttribute("login_salt"))) {
                        res = "4";
                        log.error("login_salt为空，可能的登录重放攻击！");
                    } else {
                        String login_salt = String.valueOf(session.getAttribute("login_salt"));
                        res = UserUtils.getUserDomain().login(user, pwd, login_salt) + "";
                    }
                } else {
                    res = UserUtils.getUserDomain().login(user, pwd, null) + "";
                }
            }
        }
        // ---------------登录完成，处理登录结果。-------------------
        if ("-1".equals(res)) {
            // 登录失败，设置登录失败次数加一
            login_fail_time = login_fail_time + 1;
            session.setAttribute("login_fail_time", login_fail_time);
        }
        // 1和10都表示登录成功，但是返回值是10时，表示该用户需要完善资料信息。
        if (res.equals("1") || res.equals("10")) {
            // 重置sessionid
            UCUtil.reGenerateSessionId(request);
            session = request.getSession();
            // 登录成功后，将uid等用户信息放入session
            String uid = user.get("uid").toString();
            // //查询是否开发者信息
            // String developer_id =
            // ServiceConst.getUC_IUserExtendDomain().getValueByUidAndKey(uid,
            // "developer_id");
            // if(developer_id != null){
            // session.setAttribute("developer_id", developer_id);
            // }
            session.setAttribute("uid", uid);
            session.setAttribute("userInfo", user);
            session.setAttribute("login_type", "userpwd");
            if ("10".equals(res)) {
                session.setAttribute("needSupplement", "true");
            }
            // 弹出框登录（jsonp），会传递RelayState参数（登录完成后，如果需要完善资料，完善资料后，跳转回RelayState页面）
            String RelayState = request.getParameter("RelayState");
            if (RelayState != null) {
                session.setAttribute("RelayState", RelayState);
            }
            // 记录登录历史记录/更新登录信息等
            Map loginInfo = new HashMap();
            loginInfo.put("uid", uid);
            loginInfo.put("login_ip", UCUtil.getClientIP(request));
            loginInfo.put("login_type", "userpwd");
            UserUtils.getUserDomain().afterLoginOk(loginInfo);
            // 设置cookie
            String cookieDomain = UCUtil.getCookieDomain();
            // 登录成功后，将当前登录用户的登录方式存储到客户端cookie，普通登录值为‘userpwd’，CA登录值为‘cert’
            // ,第三方账号'outacc'
            UCUtil.setCookie("login_type", "userpwd", -1, "/", cookieDomain, response);
            UCUtil.setCookie("sso_token", SecurityUtil.jiami(uid), -1, "/", cookieDomain, response);
            UCUtil.setCookie("uc_uid", SecurityUtil.jiamiOld(uid), -1, "/", cookieDomain, response);
            UCUtil.setCookie("login_time", PhpUtil.time(), -1, "/", cookieDomain, response);
            UCUtil.setCookie("uc_user_id", String.valueOf(user.get("user_id")), -1, "/", cookieDomain, response);
            UCUtil.setCookie("uc_nick_name", String.valueOf(user.get("nick_name")), -1, "/", cookieDomain, response);
            // -----记住登录状态的处理-------
            String remember_login_state = request.getParameter("hid_remember_login_state");
            // 登录成功后，将当前登录用户的uid存储客户端cookie中
            if ("1".equals(remember_login_state)) {
                // 记住登录状态的cookie['uc_uid_state']将设置一周的有效期限，此cookie用于记录登录状态，无$cookieDomain，仅在用户中心处理
                UCUtil.setCookie("uc_uid_state", SecurityUtil.jiami(uid), 3600 * 24 * 7, "/", cookieDomain, response);
            }
            // -----记住用户名的处理---------
            String is_remember_me = request.getParameter("hid_remember_me");
            if ("1".equals(is_remember_me)) {
                // 登录用户名有效期设置为2周
                UCUtil.setCookie("account", account, 3600 * 24 * 7 * 2, "/", cookieDomain, response);
            } else if ("0".equals(is_remember_me)) {
                UCUtil.setCookie("account", null, 0, "/", cookieDomain, response);
            } else {
                // 不作处理
            }
        }
        // 登录结果是1时，如果session中包含有sso_type或RelayState，则返回-3，表示需要走aftersso
        // 跨子域jsonp请求，不需要返回-3，在登录框中已保存了回调URL。
        if (res.equals("1") && callbackparam == null) {
            if (session.getAttribute("sso_type") != null || session.getAttribute("RelayState") != null) {
                res = "-3";
            }
        }
        // 账号未激活时，在session中记录login_email，发送激活链接时使用。
        if ("0".equals(res)) {
            Object login_email = user.get("login_email");
            session.setAttribute("login_email_for_activate", login_email);
        }
        // 如果是jsonp请求，则返回jsonp格式的数据。
        if (callbackparam != null) {
            response.getWriter().write(callbackparam + "(" + res + ")");
        } else {
            response.getWriter().write(res);
        }
    }
}
