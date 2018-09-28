package com.inspur.data.portal.screen.uc.login;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.loushang.internet.util.el.Function;
import org.loushang.internet.view.ViewHandler;

import com.inspur.ucweb.utils.ConfUtil;
import com.inspur.ucweb.utils.PhpUtil;
import com.inspur.ucweb.utils.SecurityUtil;
import com.inspur.ucweb.utils.UCUtil;
import com.inspur.utils.UserUtils;

public class AnquanLogin implements ViewHandler {
	private static Logger log = Logger.getLogger(AnquanLogin.class);
	public void doLogin(HttpServletRequest request, HttpServletResponse response)
		throws ServletException, IOException {
		HttpSession session = request.getSession();
		String tStrDN = request.getHeader("dnname"); //用户证书主题
//		tStrDN = "CN=张三,T=13092119910322341x,O=JIT,C=CN";
		if(tStrDN==null){
			tStrDN = "";
		}else{
			tStrDN = new String(tStrDN.getBytes("ISO8859-1"),"UTF-8"); //由于DN中可能存在中文,所以对DN进行转码
		}
		if(!tStrDN.isEmpty()){
			//CN=张三,T=13092119910322341x,O=JIT,C=CN 解析身份证
			String arr[] = tStrDN.split(",");
			String name_cert_str = arr[0];
			name_cert_str = name_cert_str.substring(3);//去除CN=
			String name_cert_num = arr[1];
			name_cert_num = name_cert_num.substring(2);//去除T=
			Map userInfo = new HashMap();
			userInfo.put("uname", name_cert_str);//真实姓名
			userInfo.put("cert_num", name_cert_num);//身份证
			userInfo.put("cert_type", "1");//证件类型1，代表身份证
			userInfo.put("user_type", "11");//11个人
			Map user = UserUtils.getUserBindDomain().getMapByOutUidCertNumAndType(name_cert_num, "ca");
			int uid = 0;
			if(user != null && user.get("uid") != null){
				//已绑定
				uid = Integer.parseInt(user.get("uid").toString());
			}else{
				userInfo.put("nick_name",name_cert_str );
				//添加关联信息(对应表：uc_user_bind)
				userInfo.put("out_uid",tStrDN);
				userInfo.put("user_id", "aq"+name_cert_num);
				userInfo.put("type", "ca");
				// 返回uid
				uid = UserUtils.getUserBindDomain().caBindUserAnquan(userInfo);
			}
			//创建登录会话
			if(uid > 0){
				// 设置session
				session.setAttribute("uid", uid+"");
				session.setAttribute("userInfo", UCUtil.getUserBasic(uid));
				session.setAttribute("login_type","cert");
				
				//设置cookie
				String cookieDomain = UCUtil.getCookieDomain();
				//登录成功后，将当前登录用户的登录方式存储到客户端cookie，普通登录值为‘userpwd’，CA登录值为‘cert’ ,第三方账号'outacc'
				UCUtil.setCookie("login_type", "cert", -1, "/", cookieDomain, response);
				//安全加固项目使用基线版本，先版本会报错，提交时注释
				//anquan
				UCUtil.setCookie("uc_uid", SecurityUtil.jiami(uid+""), -1, "/", cookieDomain, response);
				//new
//				UCUtil.setCookie("sso_token", SecurityUtil.jiami(uid+""), -1, "/", cookieDomain, response);
//				UCUtil.setCookie("uc_uid", SecurityUtil.jiamiOld(uid+""), -1, "/", cookieDomain, response);
				UCUtil.setCookie("login_time", PhpUtil.time(), -1, "/", cookieDomain, response);
				UCUtil.setCookie("uc_user_id", "aq"+name_cert_num,-1, "/", cookieDomain, response);
				UCUtil.setCookie("uc_nick_name", name_cert_str, -1, "/", cookieDomain, response);
				Map loginInfo = new HashMap();
				loginInfo.put("uid", uid);
				loginInfo.put("login_ip", UCUtil.getClientIP(request));
				loginInfo.put("login_type", "cert");
				loginInfo.put("is_online", "1");
				//安全加固项目使用基线版本，先版本会报错，提交时注释
				//anquan
//				UCUtil.updateLoginInfo(loginInfo);
				//new
//				ServiceConst.getUC_IUserDomain().afterLoginOk(loginInfo);
				String index_url = ConfUtil.getValue("global.icity.index");
				response.sendRedirect(index_url);
				return;
			}
		}
		String error_url = Function.getLink("index/loginerror.jsp");
		response.sendRedirect(error_url);
		return;
	}
	@Override
	public void execute(HttpServletRequest arg0, HttpServletResponse arg1)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		
	}
}
