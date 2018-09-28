package com.inspur.data.portal.screen.uc.account;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.loushang.internet.util.JsonUtils;
import org.loushang.internet.view.ViewHandler;

import com.inspur.ucweb.utils.UCUtil;
import com.inspur.utils.UserUtils;

public class SubAccount implements ViewHandler {

	public void execute(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		HttpSession session = request.getSession();
		int uid = Integer.parseInt(session.getAttribute("uid").toString());
		request.setAttribute("mainAccountId", uid);
		//查询当前机构
		List subList = UserUtils.getRelationDomain().getSubAccount(uid);
		request.setAttribute("subList",subList);
		Map userInfo = UCUtil.getUserBasic(uid);
		List deptList = UserUtils.getRelationDomain().getAllChildrenUserList(uid);
		if(userInfo != null && deptList != null){
			Map userParam = new HashMap();
			userParam.put("uid", uid); 
			userParam.put("nick_name", userInfo.get("nick_name")); 
			userParam.put("pid", -1); 
			deptList.add(userParam);
		}else if(userInfo != null && deptList == null){
			deptList = new ArrayList();
			Map userParam = new HashMap();
			userParam.put("uid", uid); 
			userParam.put("nick_name", userInfo.get("nick_name")); 
			userParam.put("pid", -1); 
			deptList.add(userParam);
		}
		if(deptList == null){
			request.setAttribute("deptList", JsonUtils.convertToString("null"));
		}else{
			request.setAttribute("deptList", JsonUtils.convertToString(deptList));
		}
		request.setAttribute("uid", uid);
		request.setAttribute("accountType", "subAccount");//accountBase--lever1 navigation
	}

	
}
