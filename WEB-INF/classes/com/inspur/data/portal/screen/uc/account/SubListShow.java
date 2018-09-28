package com.inspur.data.portal.screen.uc.account;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.loushang.internet.util.JsonUtils;
import org.loushang.internet.view.ViewHandler;

import com.inspur.utils.UserUtils;

public class SubListShow implements ViewHandler {

	public void execute(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		HttpSession session = request.getSession();
		int uid = Integer.parseInt(session.getAttribute("uid").toString());
		String mainAccount = request.getParameter("main_account");
		int result = 0;
		if(mainAccount != null && !mainAccount.isEmpty()){
			//main_account 是否是sessionuid的下级，否则将不展现
			int isParentChildRelation = UserUtils.getRelationDomain().isParentChildRelation(uid, Integer.parseInt(mainAccount), true);
			if(isParentChildRelation != 1 &&  Integer.parseInt(mainAccount) != uid){
				result = -1;
			}else{
				List subList = UserUtils.getRelationDomain().getSubAccount(Integer.parseInt(mainAccount));
				request.setAttribute("mainAccountId", mainAccount);
				request.setAttribute("subList", subList);
				result = 1;
			}
		}
		
		if(result != 1){
			response.getWriter().write(JsonUtils.convertToString(result));
			response.flushBuffer();//flush后，不在执行对应jsp文件
			return;
		}
	}
	
}
