package com.inspur.data.portal.screen.uc.account;

import java.io.IOException;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.loushang.internet.view.ViewHandler;

import com.inspur.ucweb.utils.UCUtil;
import com.inspur.utils.UserUtils;

public class SubAccountEdit implements ViewHandler {

	public void execute(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		HttpSession session = request.getSession();
		int uid = Integer.parseInt(session.getAttribute("uid").toString());
		if(request.getParameter("subUid")!= null && request.getParameter("mainUid")!= null){
			int subUid = Integer.parseInt(request.getParameter("subUid"));
			int mainUid = Integer.parseInt(request.getParameter("mainUid"));
			if(subUid > 0){
				session.setAttribute("subAccountUid", subUid);
			}
			//主子账号关系
			int isMainSubRelation = UserUtils.getRelationDomain().isMainSubRelation(mainUid, subUid);
			//编辑主账号是当前用户的下级
			int isParentChildRelation = UserUtils.getRelationDomain().isParentChildRelation(uid,mainUid,true);
			//提供编辑子账号的条件是 1. 主子账号关系  2. 当前登录用户的子账号编辑  3. 当前登录用户的下级子账号编辑
			if(isMainSubRelation >0   && (isParentChildRelation > 0 || mainUid == uid)){
				
				Map mainAccountInfo = UCUtil.getUserBasic(mainUid);
				String parentNickName = mainAccountInfo.get("nick_name") != null ?mainAccountInfo.get("nick_name").toString():"";
				Map subAccountInfo = UCUtil.getUserBasic(subUid);
				request.setAttribute("subUid", subUid);
				request.setAttribute("parentNickName", parentNickName);
				request.setAttribute("subAccountInfo", subAccountInfo);
				
			}
		}
		request.setAttribute("uid", uid);
		request.setAttribute("accountType", "subAccount");//accountBase--lever1 navigation
	}
}
