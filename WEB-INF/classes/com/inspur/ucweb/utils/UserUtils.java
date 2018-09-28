package com.inspur.ucweb.utils;

import java.security.GeneralSecurityException;
import java.security.MessageDigest;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.exception.ExceptionUtils;
import org.loushang.bsp.security.encoding.BspEncoder;
import org.loushang.bsp.security.encoding.Md5PasswordEncoder;

import com.inspur.data.common.logger.SystemLogger;

/**
 * 运营中心--用户管理接口类
 * <br>
 * <strong>Title :</strong> UserUtils.java
 * <br>
 * <strong>Description : </strong>
 * <br>
 * <strong>For Examples :</strong>
 * <br>
 * <strong>Create on : 2015-9-23 下午7:25:24<br></strong>
 * <p>
 * <strong>Copyright (C) Inspur Co.,Ltd.<br></strong>
 * <p>
 * @author liuyu<br>
 * @version <strong>V1.0</strong>
 * <PRE>
 * </PRE>
 * -------------------------------------------<br>
 * Change History:[Formatter: author date description] <br/>
 * 1<br>
 * 2<br>
 * 3<br>
 */

public class UserUtils {
	/**
	 * 格式化用户注册时间
	 * <br>
	 * <p>Description: 
	 * <br>
	 * liuyu<br>
	 * <p>Date: 2015-9-23 下午7:26:52<br/>
	 * <p>
	 * @param seconds
	 * @param formatStr
	 * @return   
	 * @see String
	 */
	public static String formatDateBySeconds(String seconds,String formatStr) {
		if(formatStr == null || formatStr.isEmpty()) formatStr = "yyyy-MM-dd HH:mm:ss";
		SimpleDateFormat dateFormatter = new SimpleDateFormat(formatStr);
		return dateFormatter.format(new Date(Long.valueOf(seconds+"000")));
	}
	
	/**
	 * 日期格式化处理
	 * <br>
	 * <p>Description: 
	 * <br>
	 * liuyu<br>
	 * <p>Date: 2015-10-6 下午3:42:28<br/>
	 * <p>
	 * @param date
	 * @return   
	 * @see String
	 */
	public static String getDateStringByDate(Date date){
		SimpleDateFormat time=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String dateStr = "";
		if(date!=null){
			dateStr = time.format(date);
		}
		return dateStr;
	}
	
	/**
	 * MD5加密方法
	 * <br>
	 * <p>Description: 
	 * <br>
	 * liuyu<br>
	 * <p>Date: 2015-9-24 上午10:43:31<br/>
	 * <p>
	 * @param plainText
	 * @return   
	 * @see String
	 */
	public static String md5(String plainText){
		if(plainText == null)
			plainText = "";
		byte[] temp = plainText.getBytes();
		MessageDigest md;
		// 返回结果
		StringBuffer buffer = new StringBuffer();
		try {
			// 进行MD5散列
			md = MessageDigest.getInstance("md5");
			md.update(temp);
			temp = md.digest();
			// 将散列的结果转换为Hex字符串
			int i = 0;
			for (int offset = 0; offset < temp.length; offset++) {
				i = temp[offset];
				if (i < 0)
					i += 256;
				if (i < 16)
					buffer.append("0");
				buffer.append(Integer.toHexString(i));
			}
		} catch (GeneralSecurityException e) {
			SystemLogger.error("SystemUtils", "md5加密失败", ExceptionUtils.getStackTrace(e));
		}
		// 返回
		return buffer.toString();
	}
	
	/**
	 * md5_new
	 * @param plainText
	 * @return
	 */
	public static String UCMD5(String plainText) {
		if(plainText == null)
			plainText = "";
		BspEncoder bspEncoder = new BspEncoder();
	    bspEncoder.setEncoder(new Md5PasswordEncoder());
	    return bspEncoder.encodePassword(plainText);
	}
	
	/**
	 * 获取32位uuid
	 * @return string
	 */
	public static String getUUID(){
		return UUID.randomUUID().toString().replace("-", "");
	}
    public static boolean isPositiveInteger(String orginal) {  
        return isMatch("^\\+{0,1}[1-9]\\d*", orginal);  
    }  
  
    public static boolean isNegativeInteger(String orginal) {  
        return isMatch("^-[1-9]\\d*", orginal);  
    }  
  
    public static boolean isInteger(String orginal) {  
        return isMatch("[+-]{0,1}0", orginal) || isPositiveInteger(orginal) || isNegativeInteger(orginal);  
    }
    
    private static boolean isMatch(String regex, String orginal){  
        if (orginal == null || orginal.trim() == null || orginal.trim().length() < 1) {  
            return false;  
        }  
        Pattern pattern = Pattern.compile(regex);  
        Matcher isNum = pattern.matcher(orginal);  
        return isNum.matches();  
    } 

	public static void main(String[] args){
		System.out.println(md5("123456a?"));
	}
	
	/**
	 * 集合内是否有元素。
	 * 
	 * @param list
	 */
	public   static boolean  sizeIsEmpty(Object object) {
		if (object == null) {
			return true;
		}
		
		return CollectionUtils.sizeIsEmpty(object);
	}
}
