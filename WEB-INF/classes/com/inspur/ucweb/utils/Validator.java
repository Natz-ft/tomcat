package com.inspur.ucweb.utils;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.loushang.internet.context.ContextHolder;

public class Validator {
	
	/**
	 * 判断Object类型值是否为空值
	 * @param value
	 * @return 是返回true，否则返回false
	 */
	public static boolean isEmpty(Object value) {
		if(value == null) return true;
		if(value instanceof Map) return ((Map) value).size() <= 0;
		if(value instanceof List) return ((List) value).size() <= 0;
		if(value instanceof Set) return ((Set) value).size() <= 0;
		if(value instanceof CharSequence) return ((CharSequence) value).length() <= 0;
		return String.valueOf(value).length() <= 0;
	}

	/**
	 * 判断数组类型值是否为空值
	 * @param value
	 * @return 是返回true，否则返回false
	 */
	public static boolean isEmpty(Object[] value) {
		return value == null || value.length == 0;
	}

	/**
	 * 判断Object类型值是否为空值
	 * @param value
	 * @return 不是返回true，否则返回false
	 */
	public static boolean isNotEmpty(Object value) {
		if(value == null) return false;
		if(value instanceof Map) return ((Map) value).size() > 0;
		if(value instanceof List) return ((List) value).size() > 0;
		if(value instanceof Set) return ((Set) value).size() > 0;
		if(value instanceof CharSequence) return ((CharSequence) value).length() > 0;
		return String.valueOf(value).length() > 0;
	}
	
	/**
	 * 判断数组类型值是否为空值
	 * @param value
	 * @return 不是返回true，否则返回false
	 */
	public static boolean isNotEmpty(Object[] value) {
		return value != null && value.length > 0;
	}
	
	/**
	 * 判断值的最小长度
	 * @param value Object类型值
	 * @param len 最小长度
	 * @return 符合条件返回true，否则返回false
	 */
	public static boolean minLength(Object value, int len) {
		if(value == null) return len <= 0;
		if(value instanceof Map) return ((Map) value).size() >= len;
		if(value instanceof List) return ((List) value).size() >= len;
		if(value instanceof Set) return ((Set) value).size() >= len;
		if(value instanceof CharSequence) return ((CharSequence) value).length() >= len;
		return String.valueOf(value).length() >= len;
	}

	/**
	 * 判断数组类型值的最小长度
	 * @param value Object[]类型值
	 * @param len 最小长度
	 * @return 符合条件返回true，否则返回false
	 */
	public static boolean minLength(Object[] value, int len) {
		if(value == null) return len <= 0;
		return value.length >= len;
	}
	
	/**
	 * 判断值的最大长度
	 * @param value Object类型值
	 * @param len 最大长度
	 * @return 符合条件返回true，否则返回false
	 */
	public static boolean maxLength(Object value, int len) {
		if(value == null) return len > 0;
		if(value instanceof Map) return ((Map) value).size() <= len;
		if(value instanceof List) return ((List) value).size() <= len;
		if(value instanceof Set) return ((Set) value).size() <= len;
		if(value instanceof CharSequence) return ((CharSequence) value).length() <= len;
		return String.valueOf(value).length() <= len;
	}

	/**
	 * 判断数组类型值的最大长度
	 * @param value Object[]类型值
	 * @param len 最大长度
	 * @return 符合条件返回true，否则返回false
	 */
	public static boolean maxLength(Object[] value, int len) {
		if(value == null) return len > 0;
		return value.length <= len;
	}
	
	/**
	 * 判断值的长度范围
	 * @param value Object类型值
	 * @param minLen 最小长度
	 * @param maxLen 最大长度
	 * @return 符合条件返回true，否则返回false
	 */
	public static boolean rangeLength(Object value, int minLen, int maxLen) {
		if(maxLen < minLen) return false;
		if(value == null) return minLen <= 0;
		return minLength(value, minLen) && maxLength(value, maxLen);
	}

	/**
	 * 判断数组类型值的长度范围
	 * @param value Object[]类型值
	 * @param minLen 最小长度
	 * @param maxLen 最大长度
	 * @return 符合条件返回true，否则返回false
	 */
	public static boolean rangeLength(Object[] value, int minLen, int maxLen) {
		if(maxLen < minLen) return false;
		if(value == null) return minLen <= 0;
		return minLength(value, minLen) && maxLength(value, maxLen);
	}
	
	/**
	 * 判断值的最大值
	 * @param value int类型值
	 * @param max 最大值
	 * @return 符合条件返回true，否则返回false
	 */
	public static boolean max(int value, int max) {
		return value <= max;
	}
	
	/**
	 * 判断值的最小值
	 * @param value int类型值
	 * @param min 最小值
	 * @return 符合条件返回true，否则返回false
	 */
	public static boolean min(int value, int min) {
		return value >= min;
	}
	
	/**
	 * 判断值的范围
	 * @param value int类型值
	 * @param min 最小值
	 * @param max 最大值
	 * @return 符合条件返回true，否则返回false
	 */
	public static boolean range(int value, int min, int max) {
		if(max < min) return false;
		return value >= min && value <= max;
	}

	/**
	 * 判断值是不是空白字符串
	 * @param cs CharSequence或String类型值
	 * @return 是返回true，否则返回false
	 */
	public static boolean isBlank(CharSequence cs) {
		if (null == cs) return true;
		int length = cs.length();
		for (int i = 0; i < length; i++) {
			if (!(Character.isWhitespace(cs.charAt(i))))
				return false;
		}
		return true;
	}
	
	/**
	 * 判断值是否为正整数数字类型
	 * @param value String类型值
	 * @return 是返回true，否则返回false
	 */
	public static boolean isDigits(String value) {
		if(isEmpty(value)) return true;
		String regx = "^\\d+$";
		return value.matches(regx);
	}
	
	/**
	 * 判断值是否只包含英文字母
	 * @param value String类型值
	 * @return 是返回true，否则返回false
	 */
	public static boolean isEN(String value) {
		if(isEmpty(value)) return true;
		String regx = "^[a-zA-Z]+$";
		return value.matches(regx);
	}
	
	/**
	 * 判断值是否只包含英文字母、下划线
	 * @param value String类型值
	 * @return 是返回true，否则返回false
	 */
	public static boolean isEnUline(String value) {
		if(isEmpty(value)) return true;
		String regx = "^[_a-zA-Z]+$";
		return value.matches(regx);
	}
	
	/**
	 * 判断值是否只包含英文字母、数字、下划线以及中文字符
	 * @param value String类型值
	 * @return 是返回true，否则返回false
	 */
	public static boolean isString(String value) {
		if(isEmpty(value)) return true;
		String regx = "^[_0-9a-zA-Z\u4e00-\u9fa5]+$";
		return value.matches(regx);
	}
	
	/**
	 * 判断值是否只包含英文字母、数字以及下划线
	 * @param value String类型值
	 * @return 是返回true，否则返回false
	 */
	public static boolean isEnString(String value) {
		if(isEmpty(value)) return true;
		String regx = "^[_0-9a-zA-Z]+$";
		return value.matches(regx);
	}
	
	/**
	 * 判断值是否是有效的电话号码(手机号码、固定电话)
	 * @param value String类型值
	 * @return 是返回true，否则返回false
	 */
	public static boolean isPhone(String value) {
		if(isEmpty(value)) return true;
		String regx = "(^(0[0-9]{2,3}\\-?)?([2-9][0-9]{6,7})+(\\-?[0-9]{1,4})?$)|(^((\\(\\d{3}\\))|(\\d{3}\\-?))?(1[358]\\d{9})$)";
		return value.matches(regx);
	}
	
	/**
	 * 判断值是否是有效的网站地址
	 * @param value String类型值
	 * @return 是返回true，否则返回false
	 */
	public static boolean isUrl(String value) {
		if(isEmpty(value)) return true;
		String regx = "^(https?|ftp):\\/\\/(((([a-z]|\\d|-|\\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\\da-f]{2})|[!\\$&'\\(\\)\\*\\+,;=]|:)*@)?((localhost)|((\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.(\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.(\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.(\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5]))|((([a-z]|\\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\\d|-|\\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\\d|-|\\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\\.?)(:\\d*)?)(\\/((([a-z]|\\d|-|\\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\\da-f]{2})|[!\\$&'\\(\\)\\*\\+,;=]|:|@)+(\\/(([a-z]|\\d|-|\\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\\da-f]{2})|[!\\$&'\\(\\)\\*\\+,;=]|:|@)*)*)?)?(\\?((([a-z]|\\d|-|\\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\\da-f]{2})|[!\\$&'\\(\\)\\*\\+,;=]|:|@)|[\uE000-\uF8FF]|\\/|\\?)*)?(\\#((([a-z]|\\d|-|\\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\\da-f]{2})|[!\\$&'\\(\\)\\*\\+,;=]|:|@)|\\/|\\?)*)?$";
		Pattern p = Pattern.compile(regx, Pattern.CASE_INSENSITIVE);
		Matcher m = p.matcher(value);
		return m.find();
	}
	
	/**
	 * 判断值是否是有效的email地址
	 * @param value String类型值
	 * @return 是返回true，否则返回false
	 */
	public static boolean isEmail(String value) {
		if(isEmpty(value)) return true;
		String regx = "^((([a-z]|\\d|[!#\\$%&'\\*\\+\\-\\/=\\?\\^_`{\\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\\.([a-z]|\\d|[!#\\$%&'\\*\\+\\-\\/=\\?\\^_`{\\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\\x22)((((\\x20|\\x09)*(\\x0d\\x0a))?(\\x20|\\x09)+)?(([\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x7f]|\\x21|[\\x23-\\x5b]|[\\x5d-\\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\\\([\\x01-\\x09\\x0b\\x0c\\x0d-\\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\\x20|\\x09)*(\\x0d\\x0a))?(\\x20|\\x09)+)?(\\x22)))@((([a-z]|\\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\\d|-|\\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\\d|-|\\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$";
		Pattern p = Pattern.compile(regx, Pattern.CASE_INSENSITIVE);
		Matcher m = p.matcher(value);
		return m.find();
	}
	
	/**
	 * 判断值是否是有效的日期格式数据
	 * @param value String类型值
	 * @return 是返回true，否则返回false
	 */
	public static boolean isDate(String value) {
		if(isEmpty(value)) return true;
		String regx = "^(\\d{2}|\\d{4})-((0([1-9]{1}))|(1[1|2]))-(([0-2]([1-9]{1}))|(3[0|1]))$";
		return value.matches(regx);
	}
	
	/**
	 * 判断值是否是有效的ISO日期格式数据
	 * @param value String类型值
	 * @return 是返回true，否则返回false
	 */
	public static boolean isDateISO(String value) {
		if(isEmpty(value)) return true;
		String regx = "^\\d{4}[\\/\\-]\\d{1,2}[\\/\\-]\\d{1,2}$";
		return value.matches(regx);
	}
	
	/**
	 * 判断值是否是有效的数字类型（正负整数、正负浮点数，以及如366,00.25类型）数据
	 * @param value String类型值
	 * @return 是返回true，否则返回false
	 */
	public static boolean isNumber(String value) {
		if(isEmpty(value)) return true;
		String regx = "^-?(?:\\d+|\\d{1,3}(?:,\\d{3})+)?(?:\\.\\d+)?$";
		return value.matches(regx);
	}
	
	/**
	 * 判断值是否只包含英文、数字、下划线以及分号分隔符;
	 * @param value String类型值
	 * @return 是返回true，否则返回false
	 */
	public static boolean isEnSemicolon(String value) {
		if(isEmpty(value)) return true;
		String regx = "^[_A-Za-z\\d_;]{0,}$";
		return value.matches(regx);
	}
	
	/**
	 * 判断值是否只包含中英文、数字、下划线、括号、逗号以及分号分隔符;
	 * @param value String类型值
	 * @return 是返回true，否则返回false
	 */
	public static boolean isStringSpecial(String value) {
		if(isEmpty(value)) return true;
		String regx = "^[\u0391-\uFFE5\\w\\/\\()\\（\\）\\,;]{0,}$";
		return value.matches(regx);
	}
	
	/**
	 * 判断值是否是包含逗号的正整数数字类型数据
	 * @param value String类型值
	 * @return 是返回true，否则返回false
	 */
	public static boolean isNumberComma(String value) {
		if(isEmpty(value)) return true;
		String regx = "^\\d+(,\\d+)*$";
		return value.matches(regx);
	}
	
	/**
	 * 判断值是否以所给String类型参数为后缀
	 * @param value String类型值
	 * @param suffix String类型后缀
	 * @return 是返回true，否则返回false
	 */
	public static boolean suffix(String value, String suffix) {
		if(isEmpty(value)) return true;
		return value.endsWith("."+suffix);
	}
	
	/**
	 * 判断值是否以所给List<String>类型参数列表中某个值为后缀
	 * @param value String类型值
	 * @param suffixList List<String>类型后缀列表
	 * @return 是返回true，否则返回false
	 */
	public static boolean suffix(String value, List<String> suffixList) {
		if(isEmpty(value)) return true;
		for(String suffix : suffixList) {
			if(value.endsWith("."+suffix)) {
				return true;
			}
		}
		return false;
	}
	
	//idcard start
	private static String _idCard_verify_number(String idCardBase) {
		if(isEmpty(idCardBase) || idCardBase.length() != 17) return "";
		//debug 加权因子
		int[] factor = {7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2};
		//debug 校验码对应值
		String[] verifyNumbers = {"1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"};
		int sum = 0;
		for(int i=0; i<idCardBase.length(); i++) {
			sum += Integer.valueOf(idCardBase.substring(i, i+1)) * factor[i];
		}
		int mod = sum % 11;
		return verifyNumbers[mod];
	}
	
	private static String _idcard_15to18(String idCard) {
		if(isEmpty(idCard) || idCard.length() != 15) return "";
		//如果身份证顺序码是996 997 998 999，这些是为百岁以上老人的特殊编码
		List<String> centenarianNums = new ArrayList<String>();
		centenarianNums.add("996");centenarianNums.add("997");
		centenarianNums.add("998");centenarianNums.add("999");
		if(centenarianNums.contains(idCard.substring(12))) {
			idCard = idCard.substring(0, 6) + "18" + idCard.substring(6);
		} else {
			idCard = idCard.substring(0, 6) + "19" + idCard.substring(6);
		}
		idCard = idCard + _idCard_verify_number(idCard);
		return idCard;
	}
	
	public static boolean checkIdCardNum18(String idCard) {
		if(isEmpty(idCard) || idCard.length() != 18) return false;
		String idCardBase = idCard.substring(0, 17);
		return _idCard_verify_number(idCardBase).equalsIgnoreCase(idCard.substring(17));
	}
	
	public static boolean checkIdCard(String idCard) {
		if(isEmpty(idCard) || (idCard.length() != 15 && idCard.length() != 18)) return false;
		if(idCard.length() == 15) {
			idCard = _idcard_15to18(idCard);
		}
		return checkIdCardNum18(idCard);
	}
	//idcard end
	
	/**
	 * 对obj进行toString()操作,如果为null返回def中定义的值
	 * 
	 * @param obj
	 * @param def
	 *            如果obj==null返回的内容	
	 * @return obj的toString()操作
	 */
	public static String sNull(Object obj, String def) {
		return obj != null ? obj.toString() : def;
	}

    /**
	 * 对obj进行toString()操作,如果为null返回""
	 * 
	 * @param obj
	 * @return obj.toString()
	 */
	public static String sNull(Object obj) {
		return sNull(obj, "");
	}
	
	/**
	 * 写入文件
	 * @param filepath String 文件的路径（相对于项目根路径）
	 * @param data String 要写入文件的数据
	 * @param append boolean 是否以添加方式写入文件
	 * ***为方便方法调用方处理，此处抛出可能的运行时错误***
	 * @throws FileNotFoundException
	 * @throws IOException
	 */
	public static String  filePutContents(String filepath, String data, boolean append) 
			throws FileNotFoundException, IOException {
		data = Validator.sNull(data);
		String realPath = ContextHolder.getServletContext().getRealPath("/");
		realPath = new File(realPath).getParent() + "/" +filepath;
		File file = new File(realPath);
		File dir = file.getParentFile();
		if(dir == null) {
			throw new IOException();
		}
		if(!dir.exists()) {
			dir.mkdirs();
		}
		if(!file.exists()) {
			file.createNewFile();
		}
		if(!file.canWrite()) {
			file.setWritable(true, false);
		}
		//写入文件
		FileWriter fw = new FileWriter(file, append);
		fw.write(data);
		fw.flush();fw.close();
		return realPath;
	}
	
	/** 
	 * 删除单个文件 
	 * @param   sPath    被删除文件的文件名 
	 * @return 单个文件删除成功返回true，否则返回false 
	 */  
	public static boolean deleteFile(String sPath) {  
	    boolean flag = false;  
	    File file = new File(sPath);  
	    // 路径为文件且不为空则进行删除  
	    if (file.isFile() && file.exists()) {  
	        file.delete();  
	        flag = true;  
	    }  
	    return flag;  
	}
	
	/**
	 * 读取远程url文件内容
	 * @param url
	 * @return
	 * @throws Exception
	 */
	 public static String getText(String url) throws Exception {
	        URL website = new URL(url);
	        URLConnection connection = website.openConnection();
	        BufferedReader in = new BufferedReader(
	                                new InputStreamReader(
	                                    connection.getInputStream()));

	        StringBuilder response = new StringBuilder();
	        String inputLine;

	        while ((inputLine = in.readLine()) != null) 
	            response.append(inputLine);

	        in.close();
	        return response.toString();
	      
	    }
	 
	 public static String stripTags(String str) {
			if(Validator.isEmpty(str)) {
				return "";
			} else {
				// 去掉所有html元素,  
				str = str.replaceAll("\\&[a-zA-Z]{1,10};", "").replaceAll(  
		                "<[^>]*>", "");  
		        str = str.replaceAll("[(/>)<]", "");
		        return str;
			}
	}
	 /**
		 * 判断字符串中全是数字
		 * @param str
		 * @return
		 */
	public static boolean isNumeric(String str){ 
	   Pattern pattern = Pattern.compile("[0-9]*"); 
	   Matcher isNum = pattern.matcher(str);
	   if( !isNum.matches() ){
	       return false; 
	   } 
	   return true; 
	}
}
