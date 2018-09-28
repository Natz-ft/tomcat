package com.inspur.ucweb.utils;

import java.util.Calendar;
import java.util.Date;
import java.util.Random;
import java.util.TimeZone;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.lang.StringUtils;

public class StringUtil {
	/**
	 * ENT_NOQUOTES:不过滤单引号和双引号
	 */
	public static final int ENT_NOQUOTES=0;
	/**
	 * ENT_COMPAT:过滤双引号,而不过滤单引号
	 */
	public static final int ENT_COMPAT=1;
	/**
	 * ENT_QUOTES:过滤单引号和双引号
	 */
	public static final int ENT_QUOTES=2;
	
	/**
	 * url路径侵害符。
	 */
	public static final String PathSeparator = "/";
	
	/**
	 * 判断是否为纯数字
	 * @param str
	 * @return boolean
	 */
	public static boolean isNumeric(String value){
		if(value == null || "".equals(value)){
			return false;
		}
		return value.matches("^[0-9]+$");
	}
	
	/**
	 * 判断一个字符串是否与给定的正则匹配 
	 * 		与string.matches不同这里是匹配子字符串，string.matches是全部匹配
	 * @param regx
	 * @param str
	 * @return
	 */
	public static boolean matches(String regx, String str){
		if(str == null || "".equals(str))
			return false;
		Pattern p = Pattern.compile(regx);
		return p.matcher(str).find();
	}
	/**
	 * 转换为安全的纯文本
	 * @param content
	 * @param parebr 是否转换换行符
	 * @param type ENT_NOQUOTES:不过滤单引号和双引号 ENT_QUOTES:过滤单引号和双引号 ENT_COMPAT:过滤双引号,而不过滤单引号
	 * @return
	 */
	public static String  t(String content,boolean parebr,int type){
		if(content==null) return "";        
			String html = content;
			if(type==ENT_COMPAT){
				html = StringUtils.replace(html, "\"", "&quot;");
			}
			if(type==ENT_QUOTES){
				html = StringUtils.replace(html, "\"", "&quot;");
				html = StringUtils.replace(html, "'", "&apos;");
			}
			if(parebr){
				html=StringUtils.replace(html, "\n", "<br/>");
			}else{
				html=StringUtils.replace(html, "\r", " ");
				html=StringUtils.replace(html, "\n", " ");
				html=StringUtils.replace(html, "\t", " ");
			}
			html = StringUtils.replace(html, "<", "&lt;");
			html = StringUtils.replace(html, ">", "&gt;");
			html = StringUtils.replace(html, "&", "&amp;");
	     return html;
	}
	/**
	 * 转换为安全的纯文本
	 * @param content
	 * @return
	 */
	public static String  t(String content){
		return t(content,false,0);
	}
	
	/**
	 * 获取指定位数的随机数（不保证随机数的唯一性）
	 * @param length 随机数的位数
	 * @return String
	 */
	public static String getRandom(int length){
		if(length <= 0){
			length = 1;
		}
		StringBuilder num = new StringBuilder();
		Random r = new Random();
		int i = 0;
		while(i < length){
			num.append(r.nextInt(10));
			i++;
		}
		return num.toString();
	}
	
	/**
	 * php的implode方法
	 * @param glue 间隔用的字符
	 * @param pieces 需要连接的字符数组
	 * @return
	 */
	public static String implode(String glue, String[] pieces){
		StringBuffer sb  = new StringBuffer();
		for(int i=0; i<pieces.length; i++){
			sb.append(pieces[i].trim()).append(glue);
		}
		sb.deleteCharAt(sb.length()-1);
		return sb.toString();
	}
	
	/**
	 * 邮箱检测
	 * @param email
	 * @return boolean
	 */
	public static boolean checkEmail(String email){  
	      boolean flag = false;  
	      try{  
	       String check = "^((([a-z]|\\d|[!#\\$%&'\\*\\+\\-\\/=\\?\\^_`{\\|}~]|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])+(\\.([a-z]|\\d|[!#\\$%&'\\*\\+\\-\\/=\\?\\^_`{\\|}~]|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])+)*)|((\\x22)((((\\x20|\\x09)*(\\x0d\\x0a))?(\\x20|\\x09)+)?(([\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x7f]|\\x21|[\\x23-\\x5b]|[\\x5d-\\x7e]|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])|(\\\\([\\x01-\\x09\\x0b\\x0c\\x0d-\\x7f]|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF]))))*(((\\x20|\\x09)*(\\x0d\\x0a))?(\\x20|\\x09)+)?(\\x22)))@((([a-z]|\\d|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])|(([a-z]|\\d|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])([a-z]|\\d|-|\\.|_|~|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])*([a-z]|\\d|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])))\\.)+(([a-z]|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])|(([a-z]|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])([a-z]|\\d|-|\\.|_|~|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])*([a-z]|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])))$";  
	       Pattern regex = Pattern.compile(check);  
	       Matcher matcher = regex.matcher(email);  
	       flag = matcher.matches();  
	      }catch(Exception e){  
	       flag = false;  
	      }  
	      return flag;  
	     }  
	/**
	 * 手机检测
	 * @param phone
	 * @return boolean
	 */
	public static boolean checkPhone(String phone){  
	      boolean flag = false;  
	      try{  
	       String check = "/^13[0-9]{9}$|15[0-9]{9}$|18[0-9]{9}$";  
	       Pattern regex = Pattern.compile(check);  
	       Matcher matcher = regex.matcher(phone);  
	       flag = matcher.matches();  
	      }catch(Exception e){  
	       flag = false;  
	      }  
	      return flag;  
	     } 
	/**
	 * 用户名检测
	 * @param userId
	 * @return boolean
	 */
	public static boolean checkUserId(String userId){  
		boolean flag = false;  
	      try{  
	       String check = "^[a-zA-Z][a-zA-Z0-9_]{4,19}$";  
	       Pattern regex = Pattern.compile(check);  
	       Matcher matcher = regex.matcher(userId);  
	       flag = matcher.matches();  
	      }catch(Exception e){  
	       flag = false;  
	      }  
	      return flag;  
	}
	/**
	 * 身份证号检查
	 * 只做简单检测，目的是区分开邮箱、登录账号和手机号
	 * @param idNumber
	 * @return boolean
	 */
	public static boolean checkIDNum(String idNumber) {
		if(idNumber != null && !idNumber.isEmpty()){
			if(idNumber.length() == 15 || idNumber.length() == 18){
				if(idNumber.endsWith("x") || idNumber.endsWith("X")){
					idNumber = idNumber.substring(0, idNumber.length() - 1);
				}
				if(isNumeric(idNumber)){
					return true;
				}
			}
		}
		return false;
	}
	/**
 	 * 取得取得今天0时0分0秒距历元（格林威治标准时间 1970年1月1日 0:00:00）的秒数
 	 * @return
 	 */
     public static long getTodayStartTime(){
 		Calendar cc = Calendar.getInstance(TimeZone.getTimeZone("GMT+8"));
         cc.set(Calendar.HOUR_OF_DAY, 0); 
         cc.set(Calendar.MINUTE, 0);
         cc.set(Calendar.SECOND, 0);
         cc.set(Calendar.MILLISECOND, 0);
         long t = cc.getTimeInMillis();
         t = t/1000;//去除毫秒
         return t;
 	}
	/**
	 * 取得取得这一周第一天0时0分0秒距历元（格林威治标准时间 1970年1月1日 0:00:00）的秒数
	 * @return
	 */
	public static long getThisWeekStartTime(){
		Calendar cc = Calendar.getInstance(TimeZone.getTimeZone("GMT+8"));
		cc.set(Calendar.DAY_OF_WEEK, 2);
        cc.set(Calendar.HOUR_OF_DAY, 0); 
        cc.set(Calendar.MINUTE, 0);
        cc.set(Calendar.SECOND, 0);
        cc.set(Calendar.MILLISECOND, 0);
        long t = cc.getTimeInMillis();
        t = t/1000;//去除毫秒
        return t;
	}
	/**
	 * 取得取得这个月第一天0时0分0秒距历元（格林威治标准时间 1970年1月1日 0:00:00）的秒数
	 * @return
	 */
	public static long getThisMonthStartTime(){
		Calendar cc = Calendar.getInstance(TimeZone.getTimeZone("GMT+8"));
		cc.set(Calendar.DAY_OF_MONTH, 1);
        cc.set(Calendar.HOUR_OF_DAY, 0); 
        cc.set(Calendar.MINUTE, 0);
        cc.set(Calendar.SECOND, 0);
        cc.set(Calendar.MILLISECOND, 0);
        long t = cc.getTimeInMillis();
        t = t/1000;//去除毫秒
        return t;
	}
	/**
	 * 取得取得今年第一天0时0分0秒距历元（格林威治标准时间 1970年1月1日 0:00:00）的秒数
	 * @return
	 */
	public static long getThisYEARStartTime(){
		Calendar cc = Calendar.getInstance(TimeZone.getTimeZone("GMT+8"));
		cc.set(Calendar.DAY_OF_YEAR, 1);
        cc.set(Calendar.HOUR_OF_DAY, 0); 
        cc.set(Calendar.MINUTE, 0);
        cc.set(Calendar.SECOND, 0);
        cc.set(Calendar.MILLISECOND, 0);
        long t = cc.getTimeInMillis();
        t = t/1000;//去除毫秒
        return t;
	}
	/**
	 * 取得取得这一个季度第一天0时0分0秒距历元（格林威治标准时间 1970年1月1日 0:00:00）的秒数
	 * @return
	 */
	public static long getThisQuarterStartTime(){
		Calendar cc = Calendar.getInstance(TimeZone.getTimeZone("GMT+8"));
	    cc.setTime(new Date());
	    int month = getQuarterInMonth(cc.get(Calendar.MONTH), true);  
	    cc.set(Calendar.MONTH, month); 
	    cc.set(Calendar.DAY_OF_MONTH, 1); 
        cc.set(Calendar.HOUR_OF_DAY, 0); 
        cc.set(Calendar.MINUTE, 0);
        cc.set(Calendar.SECOND, 0);
        cc.set(Calendar.MILLISECOND, 0);
        long t = cc.getTimeInMillis();
        t = t/1000;//去除毫秒
        return t;
	}
	  // 返回第几个月份，不是几月  
	  // 季度一年四季， 第一季度：2月-4月， 第二季度：5月-7月， 第三季度：8月-10月， 第四季度：11月-1月  
	public static int getQuarterInMonth(int month, boolean isQuarterStart) {
		int months[] = { 1, 4, 7, 10 };
		if (!isQuarterStart) {
			months = new int[] { 3, 6, 9, 12 };
		}
		if (month >= 2 && month <= 4)
			return months[0];
		else if (month >= 5 && month <= 7)
			return months[1];
		else if (month >= 8 && month <= 10)
			return months[2];
		else
			return months[3];
	}

	//移除指定位置的指定字符，如果不符合条件，直接返回
	public static String removeChar(String instr, int index, String delChar) {

		if ((null != instr)  && (index > -1) && (instr.indexOf(delChar,index) == index )) {
			StringBuilder sb = new StringBuilder(instr);
			sb.deleteCharAt(index);
			return sb.toString();
		}
		return instr;
	}
	
	/**
	 * 移除开始路径分割符。
	 */
	public static String removeStartPathSeparator(String urlStr) {
		if (!hasLength(urlStr)) {
			return "";
		}
		
		if (urlStr.startsWith(PathSeparator)) {
			StringBuilder sb = new StringBuilder(urlStr);
			sb.deleteCharAt(0);
			return sb.toString();
		}
		return urlStr;
	}
	
	public static boolean hasLength(String str)
	{
	    return (str != null) && (str.length() > 0);
	}
}
