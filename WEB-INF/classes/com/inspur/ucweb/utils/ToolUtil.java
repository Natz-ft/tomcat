package com.inspur.ucweb.utils;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Random;

import javax.servlet.http.HttpServletRequest;

public class ToolUtil {
	
	public static String phoneReplaced(String phone) {
    	if(phone == null || phone.isEmpty()){
    		return "";
    	}else if(phone.length()<9){//不标准格式的手机
    		return phone;
    	}
    	
    	
    	return phone.substring(0,3)+"****"+phone.substring(7,phone.length());
    }
    
    
    public static String getEmailReplaced(String email){
    	if(email == null || email.isEmpty()){
    		return "";
    	}
    	int at_index = email.lastIndexOf("@");
    	if(at_index>0){
    		return email.substring(0,1)+"****"+ email.substring(at_index);
    	}else{
    		return email.substring(0,1)+"****";
    	}
    }
    public static String getCertNumReplaced(String certNum){
    	if(certNum == null || certNum.isEmpty()){
    		return "";
    	}
    	int len = certNum.length();
    	return certNum.substring(0,3)+"*****"+certNum.substring(9,len-1);
    }
	public static String formatDateBySeconds(String seconds,String formatStr) {
		if(seconds == null || seconds.isEmpty() || seconds.equals("null")){
			return "";
		}
		if(formatStr == null || formatStr.isEmpty()) formatStr = "yyyy-MM-dd HH:mm:ss";
		SimpleDateFormat dateFormatter = new SimpleDateFormat(formatStr);
		return dateFormatter.format(new Date(Long.valueOf(seconds+"000")));
	}
	/**
	 * 获取当前日期
	 * @param 传入格式比如 yyyy-MM-dd
	 * @return
	 */
	public static String getDate(String f) {
		return new SimpleDateFormat(f).format(Calendar.getInstance().getTime());
	}
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
	 * 获取客户端ip地址
	 */
	public static String getIpAddr(HttpServletRequest request) {
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
		return ip;
	}
	
	public static String getRandomString(int length) { // length表示生成字符串的长度
		String base = "abcdefghijklmnopqrstuvwxyzQAZWSXEDCRFVTGBYHNUJMIKLOP0123456789";
		Random random = new Random();
		StringBuffer sb = new StringBuffer();
		for (int i = 0; i < length; i++) {
			int number = random.nextInt(base.length());
			sb.append(base.charAt(number));
		}
		return sb.toString();
	}
	
	public static void main(String[] args) {
		System.out.println(formatDateBySeconds("1408000837", ""));
	}
}
