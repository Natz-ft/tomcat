package com.inspur.utils;

import java.io.IOException;

import org.loushang.internet.context.ContextHolder;
import org.loushang.internet.util.StringUtils;
import org.loushang.internet.util.el.Function;

/**
 * 进入出错页面
 * @author zhanglch
 *
 */
public class ErrorUtil {
	
	/**
	 * 必要的字符串为空时跳转到应用商店下的错误页面
	 * @param str
	 * @throws IOException 
	 */
	public static boolean checkStore(String str) throws IOException{
		if(StringUtils.isNotEmpty(str)){
			return true;
		}else{
			ContextHolder.sendRedirect(Function.getLink("error/error.jsp"));
			return false;
		}
	}
	
	/**
	 * 必要的字符串为空时跳转到开发中心下的错误页面
	 * @param str
	 * @throws IOException 
	 */
	public static boolean checkDev(String str) throws IOException{
		if(StringUtils.isNotEmpty(str)){
			return true;
		}else{
			ContextHolder.sendRedirect(Function.getLink("error/error.jsp"));
			return false;
		}
	}
}
