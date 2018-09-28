package com.inspur.data.portal.screen.uc.account;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.loushang.internet.context.ContextHolder;
import org.loushang.internet.util.JsonUtils;
import org.loushang.internet.util.el.Function;
import org.loushang.internet.view.ViewHandler;

import com.inspur.portal.model.base.Dict;
import com.inspur.portal.service.base.DictService;
import com.inspur.ucweb.utils.UCUtil;
import com.inspur.ucweb.utils.UrlUtils;
import com.inspur.utils.AuditLogUtil;
import com.inspur.utils.UserUtils;

public class Account implements ViewHandler {
	
	private DictService dictService = UserUtils.getDictService();

	public void execute(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		HttpSession session = request.getSession();
		if(session.getAttribute("uid") == null 
				|| session.getAttribute("uid").toString().isEmpty() 
				|| Integer.parseInt(session.getAttribute("uid").toString())<=0){
			// 请求登录
			String currentUrl = Function.getCurrentUrl();
			Map paramMap = UrlUtils.getParamMap(request);
			String paramUrl = UrlUtils.getUrlString(paramMap, currentUrl);
			String relayState = "?RelayState="+paramUrl;
			String redirectUrl = Function.getLink("login/login.jsp") + relayState;
			ContextHolder.sendRedirect(redirectUrl);
			return;
		}
		
		int uid = Integer.parseInt(session.getAttribute("uid").toString());
		// 重置sessionid
		UCUtil.reGenerateSessionId(request);
		session = request.getSession();
		//查询是否开发者
		Map developer = UserUtils.getUserExtendDomain().getUserExtendByUid(uid);
		if(developer != null){
			session.setAttribute("developer_id", developer.get("developer_id"));
		}else{
			session.setAttribute("developer_id", "");
		}
		
		Map userBasic = UCUtil.getUserBasic(uid);
		if(userBasic != null){
			int authenLevel = Integer.parseInt(userBasic.get("authen_level").toString());
			String userType = userBasic.get("user_type").toString();
			String userTypeName = UserUtils.getUserDomain().getUserTypeNameByUserTypeCode(userType);
			
			request.setAttribute("userBasic", userBasic);
			request.setAttribute("authenLevel", authenLevel);
			request.setAttribute("userTypeName", userTypeName);
			
			request.setAttribute("accountType", "accountBase");//accountBase--lever1 navigation
			request.setAttribute("accountType_l2", "accountBase_account");//accountBase_account--lever2 navigation
			//查询用户类型
			Dict dict = dictService.findDict("user_type",userType);
			request.setAttribute("itemValue", dict.getItemValue());
		}
		
		//记录页面访问日志
		AuditLogUtil.addPageVisitAutiLog(request, "个人设置", "");
		
	}
	
	/**
	 * 账号设置、修改登录手机号（pcp）
	 * 1成功，0失败
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	public void doUpdateAccountPhone(HttpServletRequest request, HttpServletResponse response)throws ServletException, IOException {
		
		String result = "0";
		PrintWriter out = response.getWriter();
		HttpSession session = request.getSession();
		if (session.getAttribute("uid") != null) {
			int uid = Integer.parseInt(session.getAttribute("uid").toString());
			String login_phone = request.getParameter("loginPhone");
			if(!UCUtil.isEmpty(login_phone)){
				Map acc = new HashMap();
				acc.put("uid", uid);
				acc.put("login_phone", login_phone);
				boolean isok = UserUtils.getUserDomain().updateAccount(acc);
				if(isok){
					result="1";
				}
			}
		}
		out.write(result);
}
	
	/**
	 * 个人身份资料保存(pcp)
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	public void doPersonSubmit(HttpServletRequest request, HttpServletResponse response)throws ServletException, IOException {
	 	
		int uid = Integer.parseInt(String.valueOf(request.getSession().getAttribute("uid")));
		boolean isPerson = UserUtils.getUserDomain().isPersonByUid(uid);
		if(! isPerson){
			response.getWriter().write(JsonUtils.convertToString("无权访问！"));
			return;
		}
		Map perInfo = new HashMap();
		perInfo.put("uid", uid);
		perInfo.put("uname", request.getParameter("uname"));
		perInfo.put("sex", request.getParameter("sex"));
		perInfo.put("birthday", request.getParameter("birthday"));
		perInfo.put("cert_type", request.getParameter("cert_type"));
		perInfo.put("cert_num", request.getParameter("cert_num"));
		perInfo.put("address", request.getParameter("address"));
		perInfo.put("zip_code", request.getParameter("zip_code"));
		boolean isok = UserUtils.getPersonDomain().modifyPersonByUid(perInfo);
	 	
		//更新扩展信息//对讲机号码
		String intercom_code = request.getParameter("intercom_code");
		Map ext_item = new HashMap();
		ext_item.put("user_key", "intercom_code");
		ext_item.put("user_value", intercom_code);
		ext_item.put("uid", uid);
		UserUtils.getUserExtendDomain().update(ext_item);
		
		//更新昵称信息
		String new_nick_name = request.getParameter("nick_name");
		UserUtils.getUserDomain().updateUserNickName(uid, new_nick_name);
		
		//更新所属部门信息
		String dept_uid = request.getParameter("org_uid");
		if(!UCUtil.isEmpty(dept_uid)){
			List list = new ArrayList();
			list.add(dept_uid);
			UserUtils.getUserOrganDomain().updateOrgUid(uid, list);
		}
		
		String res = "1";
		if(!isok){
			res = "0";
		}
		response.getWriter().write(JsonUtils.convertToString(res));
	}
}
