package com.inspur.data.portal.widget.rightComment;

/*
 * @FileName: [MainTag.java] 
 * @Package com.inspur.data.portal.jn.widget.rightComment 
 * 
 * 
 * Copyright (c) 2011-2015 INSPUR Technology Limited Com.
 * All rights reserved.
 * 
 * This software is the confidential and proprietary 
 * information of INSPUR Technology Limited Company
 * ("Confidential Information"). You shall not disclose 
 * such Confidential Information and shall use it only
 * in accordance with the terms of the contract agreement 
 * you entered into with RKY.
 * 
 * $Rev$
 * $LastChangedDate$
 * $LastChangedBy$
 * 
 * @category inspur
 * @version 1.1
 * @author <a href="mailto:zhang_hy@inspur.com">张华蕴</a>
 *
 * Change History:[Formatter: author date description] <br/>
 * 1
 * 2
 * 3
*/

import java.io.IOException;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.loushang.internet.view.ViewHandler;

import com.inspur.utils.DataUtils;

/**
 * <br/>
 * <p>
 * Description:<br/>
 * <p>
 *
 * <p>
 * For Examples <br/>
 * 
 * <PRE>
 *      TODO 代码使用示例
 * </PRE>
 * <p>
 */
public class MainTag implements ViewHandler {

	/*
	 * (non-Javadoc) Description: <br/>
	 *
	 * @param arg0
	 * 
	 * @param arg1
	 * 
	 * @throws ServletException
	 * 
	 * @throws IOException
	 * 
	 * @see org.loushang.internet.view.ViewHandler#execute(javax.servlet.http.
	 * HttpServletRequest, javax.servlet.http.HttpServletResponse)
	 */
	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		try {
			String regionCode = (String) request.getSession().getAttribute("area_code");
			List<Map<String, Object>> tagInfos = DataUtils.getTagInfoService().getHotLabelList(regionCode, 25);
			// 热门标签（基础标签）
			request.setAttribute("tagInfos", tagInfos);
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}

}
