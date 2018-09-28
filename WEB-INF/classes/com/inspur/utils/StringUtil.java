package com.inspur.utils;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

import com.inspur.ucweb.utils.Validator;

/* 
 * 所属模块: 工具包 
 * 说明：常用字符串及数组操作 
 */
public class StringUtil {

	private final static String dateFormat = "yyyy-MM-dd HH:mm:ss";

	private static final Pattern blankPattern = Pattern.compile("\\s*|\t|\r|\n");
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
	 * 对obj进行toString()操作,如果为null返回""
	 * 
	 * @param obj
	 * @return obj.toString()
	 */
	public static String sNull(Object obj) {
		return sNull(obj, "");
	}

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
	 * 对obj进行toString()操作,如果为空串返回""
	 * 
	 * @param obj
	 * @return obj.toString()
	 */
	public static String sBlank(Object obj) {
		return sBlank(obj, "");
	}

	/**
	 * 对obj进行toString()操作,如果为空串返回def中定义的值
	 * 
	 * @param obj
	 * @param def
	 *            如果obj==null返回的内容
	 * @return obj的toString()操作
	 */
	public static String sBlank(Object obj, String def) {
		if (null == obj)
			return def;
		String s = obj.toString();
		return Validator.isBlank(s) ? def : s;
	}
	
	public static String replaceBlank(String str) {
		String dest = "";
		if (str!=null) {
			Matcher m = blankPattern.matcher(str);
			dest = m.replaceAll("");
		}
		return dest;
	}
	
	/**
	 * 去掉字符串前后空白
	 * @param cs
	 *            字符串
	 * @return 新字符串
	 */
	public static String trim(CharSequence cs) {
		if (null == cs)
			return null;
		if (cs instanceof String)
			return ((String) cs).trim();
		int length = cs.length();
		if (length == 0)
			return cs.toString();
		int l = 0;
		int last = length - 1;
		int r = last;
		for (; l < length; l++) {
			if (!Character.isWhitespace(cs.charAt(l)))
				break;
		}
		for (; r > l; r--) {
			if (!Character.isWhitespace(cs.charAt(r)))
				break;
		}
		if (l > r)
			return "";
		else if (l == 0 && r == last)
			return cs.toString();
		return cs.subSequence(l, r + 1).toString();
	}
	
	/**
	 * php的implode方法
	 * @param glue 间隔用的字符
	 * @param pieces 需要连接的字符数组
	 * @return
	 */
	public static String implode(String glue, String[] pieces){
		if(glue == null) glue = "";
		StringBuffer sb  = new StringBuffer();
		for(int i=0; i<pieces.length; i++){
			sb.append(pieces[i].trim()).append(glue);
		}
		if(sb.length() > glue.length()) {
			return sb.substring(0, sb.length()-glue.length());
		} else {
			return "";
		}
	}
	
	/**
	 * php的implode方法
	 * @param glue 间隔用的字符
	 * @param pieces 需要连接的字符数组
	 * @return
	 */
	public static String implode(String glue, List pieces){
		if(glue == null) glue = "";
		StringBuffer sb  = new StringBuffer();
		for(Object o : pieces){
			sb.append(o.toString()).append(glue);
		}
		if(sb.length() > glue.length()) {
			return sb.substring(0, sb.length()-glue.length());
		} else {
			return "";
		}
	}
	
	public static String convertList2String(List ids){
		if(ids==null||ids.size()==0){
			return "";
		}
		StringBuilder sb=new StringBuilder();
		for(int i=0;i<ids.size();i++){
			sb.append(ids.get(i));
			if(i<ids.size()-1){
				sb.append(",");
			}
		}
		return sb.toString();
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
	
	public static String toLowerCase(Object obj){
		if(obj==null){
			return null;
		}else{
			return obj.toString().toLowerCase();
		}
	}
	
	/**
	 * 格式化小数保持最少和最多小数点.
	 * 
	 * @param num
	 * @param minFractionDigits
	 * @param maxFractionDigits
	 * @return
	 */
	public static String formatFraction(double num, int minFractionDigits,
			int maxFractionDigits) {
		// 输出固定小数点位数
		java.text.NumberFormat nb = java.text.NumberFormat.getInstance();
		nb.setMaximumFractionDigits(maxFractionDigits);
		nb.setMinimumFractionDigits(minFractionDigits);
		nb.setGroupingUsed(false);
		String rate = nb.format(num);
		return rate;
	}

	/**
	 * 得到当前日期前后的日期
	 * 
	 * @return 返回日期字符串
	 */
	public static String getBefDateString(int day_i) {
		Calendar day = Calendar.getInstance();
		day.add(Calendar.DATE, day_i);
		return new SimpleDateFormat(dateFormat).format(day.getTime());
	}

	/**
	 * 获取当前日期的字符串长度
	 * 
	 * @return
	 */
	public static int getDateTimeLen() {
		return dateFormat.length();
	}

	/**
	 * 获取当前日期
	 * 
	 * @return
	 */
	public static String getDateTime() {
		return new SimpleDateFormat(dateFormat).format(Calendar.getInstance()
				.getTime());
	}

	/**
	 * 获取当前日期
	 * 
	 * @return
	 */
	public static String getDate() {
		return new SimpleDateFormat("yyyy-MM-dd").format(Calendar.getInstance()
				.getTime());
	}

	/**
	 * 获取当前时间
	 * 
	 * @return
	 */
	public static String getTime() {
		return new SimpleDateFormat("HH:mm:ss").format(Calendar.getInstance()
				.getTime());
	}

	/**
	 * 字符串转换为毫秒
	 * 
	 * @return
	 */
	public static long parseLongDate(String str) {
		try {
			return new SimpleDateFormat(dateFormat).parse(str).getTime();
		} catch (ParseException e) {
			return 0;
		}
	}

	/**
	 * 计算两个字符串转换为日期后相减得到的分钟
	 * 
	 * @param str1
	 * @param str2
	 * @return
	 */
	public static int getSubTime(String str1, String str2) {
		return (int) (parseLongDate(str2) - parseLongDate(str1)) / (1000 * 60);
	}

	/**
	 * 转换由表单读取的数据的内码(从 ISO8859 转换到 gb2312).
	 * 
	 * @param input
	 *            输入的字符串
	 * @return 转换结果, 如果有错误发生, 则返回原来的值
	 */
	public static String toChi(String input) {
		try {
			byte[] bytes = input.getBytes(" ISO8859-1 ");
			return new String(bytes, " GBK ");
		} catch (Exception ex) {
		}
		return input;
	}

	/**
	 * 转换由表单读取的数据的内码到 ISO(从 GBK 转换到ISO8859-1).
	 * 
	 * @param input
	 *            输入的字符串
	 * @return 转换结果, 如果有错误发生, 则返回原来的值
	 */
	public static String toISO(String input) {
		return changeEncoding(input, " GBK ", " ISO8859-1 ");
	}

	/**
	 * 转换字符串的内码.
	 * 
	 * @param input
	 *            输入的字符串
	 * @param sourceEncoding
	 *            源字符集名称
	 * @param targetEncoding
	 *            目标字符集名称
	 * @return 转换结果, 如果有错误发生, 则返回原来的值
	 */
	public static String changeEncoding(String input, String sourceEncoding,
			String targetEncoding) {
		if (input == null || input.equals("")) {
			return input;
		}

		try {
			byte[] bytes = input.getBytes(sourceEncoding);
			return new String(bytes, targetEncoding);
		} catch (Exception ex) {
		}
		return input;
	}

	/**
	 * 对给定字符进行 URL 编码
	 */
	public static String encode(String value) {
		if (Validator.isEmpty(value)) {
			return "";
		}

		try {
			value = java.net.URLEncoder.encode(value, " GB2312 ");
		} catch (Exception ex) {
			ex.printStackTrace();
		}

		return value;
	}

	/**
	 * 对给定字符进行 URL 解码
	 * 
	 * @param value
	 *            解码前的字符串
	 * @return 解码后的字符串
	 */
	public static String decode(String value) {
		if (Validator.isEmpty(value)) {
			return "";
		}

		try {
			return java.net.URLDecoder.decode(value, " GB2312 ");
		} catch (Exception ex) {
			ex.printStackTrace();
		}

		return value;
	}

	/**
	 * 将字符串转换为整型数字
	 * @param str
	 * @return
	 */
	public static int parseInt(String str) {
		if (Validator.isNotEmpty(str)) {
			return Integer.parseInt(str);
		} else {
			return 0;
		}
	}

	/**
	 * 获得输入字符串的字节长度(即二进制字节数), 用于发送短信时判断是否超出长度.
	 * @param input
	 *            输入字符串
	 * @return 字符串的字节长度(不是 Unicode 长度)
	 */
	public static int getBytesLength(String input) {
		if (input == null) {
			return 0;
		}
		int bytesLength = input.getBytes().length;
		return bytesLength;
	}

	/**
	 * 删除指定的 Web 应用程序目录下所上传的文件
	 * 
	 * @param application
	 *            JSP/Servlet 的 ServletContext
	 * @param filePath
	 *            相对文件路径
	 */
	public static void deleteFile(ServletContext application, String filePath) {
		if (!Validator.isEmpty(filePath)) {
			String physicalFilePath = application.getRealPath(filePath);
			if (!Validator.isEmpty(physicalFilePath)) {
				java.io.File file = new java.io.File(physicalFilePath);
				file.delete();
			}
		}
	}

	/**
	 * 在指定的 Web 应用程序目录下以指定路径创建文件
	 * 
	 * @param application
	 *            JSP/Servlet 的 ServletContext
	 * @param filePath
	 *            相对文件路径
	 */
	public static boolean createFile(ServletContext application, String filePath) {
		if (!Validator.isEmpty(filePath)) {
			String physicalFilePath = application.getRealPath(filePath);
			if (!Validator.isEmpty(physicalFilePath)) {
				java.io.File file = new java.io.File(physicalFilePath);

				try {
					// 创建文件
					return file.createNewFile();
				} catch (IOException e) {
					System.err.println(" Unable to create file  " + filePath);
				}
			}
		}

		return false;
	}

	/**
	 * 在指定的 Web 应用程序目录下以指定路径创建目录.
	 * 
	 * @param application
	 *            JSP/Servlet 的 ServletContext
	 * @param filePath
	 *            相对文件路径
	 */
	public static boolean createDir(ServletContext application, String filePath) {
		if (!Validator.isEmpty(filePath)) {
			String physicalFilePath = application.getRealPath(filePath);
			if (!Validator.isEmpty(physicalFilePath)) {
				try {
					// 创建目录
					java.io.File dir = new java.io.File(
							application.getRealPath(filePath));
					return dir.mkdirs();
				} catch (Exception e) {
					System.err.println(" Unable to create directory  "
							+ filePath);
				}
			}
		}

		return false;
	}

	/**
	 * 检查指定的 Web 应用程序目录下的文件是否存在.
	 * 
	 * @param application
	 *            JSP/Servlet 的 ServletContext
	 * @param filePath
	 *            相对文件路径
	 * @return boolean - 文件是否存在
	 */
	public static boolean checkFileExists(ServletContext application,
			String filePath) {
		if (!Validator.isEmpty(filePath)) {
			String physicalFilePath = application.getRealPath(filePath);
			if (!Validator.isEmpty(physicalFilePath)) {
				java.io.File file = new java.io.File(physicalFilePath);
				return file.exists();
			}
		}

		return false;
	}

	/**
	 * 将日期转换为中文表示方式的字符串(格式为 yyyy年MM月dd日 HH:mm:ss).
	 */
	public static String dateToChineseString(Date date) {
		if (date == null) {
			return "";
		}

		java.text.SimpleDateFormat dateFormat = new java.text.SimpleDateFormat(
				" yyyy年MM月dd日 HH:mm:ss ");

		return dateFormat.format(date);
	}

	/**
	 * 将日期转换为 14 位的字符串(格式为yyyyMMddHHmmss).
	 */
	public static String dateTo14String(Date date) {
		if (date == null) {
			return null;
		}

		java.text.SimpleDateFormat dateFormat = new java.text.SimpleDateFormat(
				" yyyyMMddHHmmss ");

		return dateFormat.format(date);
	}

	/**
	 * 将 14 位的字符串(格式为yyyyMMddHHmmss)转换为日期.
	 */
	public static Date string14ToDate(String input) {
		if (Validator.isEmpty(input)) {
			return null;
		}

		if (input.length() != 14) {
			return null;
		}

		java.text.SimpleDateFormat dateFormat = new java.text.SimpleDateFormat(
				" yyyyMMddHHmmss ");

		try {
			return dateFormat.parse(input);
		} catch (Exception ex) {
			ex.printStackTrace();
		}

		return null;
	}

	/**
	 * 获取 boolean 参数从ServletRequest中.
	 * 
	 * @param request
	 * @param name
	 * @return
	 */
	public static boolean getBoolean(HttpServletRequest request, String name) {
		return Boolean.valueOf(request.getParameter(name));
	}

	public static String replaceChar(String s, char c, char c1) {
		if (s == null) {
			return "";
		}
		return s.replace(c, c1);
	}

	public static String replaceString(String s, String s1, String s2) {
		if (s == null || s1 == null || s2 == null) {
			return "";
		}
		return s.replaceAll(s1, s2);
	}

	public static String toHtml(String s) {
		s = replaceString(s, " < ", " &#60; ");
		s = replaceString(s, " > ", " &#62; ");
		return s;
	}

	public static String toBR(String s) {
		s = replaceString(s, " \n ", " <br>\n ");
		s = replaceString(s, " \t ", " &nbsp;&nbsp;&nbsp;&nbsp; ");
		s = replaceString(s, "    ", " &nbsp;&nbsp; ");
		return s;
	}

	public static String toSQL(String s) {
		s = replaceString(s, " \r\n ", " \n ");
		return s;
	}

	public static String replaceEnter(String s) {
		if(Validator.isEmpty(s)) {
			return "";
		} else {
			return s.replaceAll(" \n ", " <br> ");
		}
	}

	public static String replacebr(String s) {
		if(Validator.isEmpty(s)) {
			return "";
		} else {
			return s.replaceAll(" <br> ", " \n ");
		}
	}

	public static String replaceQuote(String s) throws NullPointerException {
		if(Validator.isEmpty(s)) {
			return "";
		} else {
			return s.replaceAll(" ' ", " '' ");
		}
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

	public static String shortString(String str, int count) {
		if (Validator.isEmpty(str))
			return "";
		if (str.length() > count) {
			return str.substring(0, count) + "……";
		} else {
			return str;
		}
	}
	
	/**
	 * 字符串转换成十六进制字符串
	 * @param str 待转换的字符串 
	 * @param prefix 转换出来的十六进制字符串中每个字符的前缀
	 * @return 如 str="#" prefix="%" 将返回"%23"
	 */
	/*
	public static String str2Hexstr(String str, String prefix) {
		if(Validator.isEmpty(str)) return "";
		if(prefix == null) prefix = "";
		char[] chars = "0123456789ABCDEF".toCharArray();
		StringBuffer sb = new StringBuffer("");
		byte[] bytes = str.getBytes();
		int bit;
		for(int i=0; i < bytes.length; i++) {
			sb.append(prefix);
			bit = (bytes[i] & 0x0f0) >> 4;
			sb.append(chars[bit]);
			bit = bytes[i] & 0x0f;
			sb.append(chars[bit]);
		}
		return sb.toString();
	}
	
	public static String str2Hexstr(String str) {
		return str2Hexstr(str, null);
	}
	*/
	/**
	 * 十六进制的字符串转换为一般的字符串
	 * @param hexStr 十六进制字符串
	 * @param hexPrefix 十六进制字符串中每个字符的前缀
	 * @return 如 hexStr="%23" hexPrefix="%" 将返回"#"
	 */
	/*
	public static String hexStr2Str(String hexStr, String hexPrefix) {
		if(Validator.isEmpty(hexStr)) return "";
		String str = "0123456789ABCDEF";
		if(!Validator.isEmpty(hexPrefix)) {
			hexStr = hexStr.replaceAll(hexPrefix, "");
		}
		if(Validator.isEmpty(hexStr)) return "";
        char[] hexs = hexStr.toCharArray();
        byte[] bytes = new byte[hexStr.length() / 2];
        int temp;
        for (int i = 0; i < bytes.length; i++) {
        	temp = str.indexOf(hexs[2 * i]) * 16;
        	temp += str.indexOf(hexs[2 * i + 1]);
            bytes[i] = (byte) (temp & 0xff);
        }
        return new String(bytes);
	}
	
	public static String hexStr2Str(String hexStr) {
		return hexStr2Str(hexStr, null);
	}
	*/
	
	
    public static Date getStartTime() {  
        Calendar todayStart = Calendar.getInstance();  
        todayStart.set(Calendar.HOUR_OF_DAY, 0);
        todayStart.set(Calendar.MINUTE, 0);
        todayStart.set(Calendar.SECOND, 0);  
        todayStart.set(Calendar.MILLISECOND, 0);  
        return todayStart.getTime();  
    }  
  
    public static Date getEndTime() {  
        Calendar todayEnd = Calendar.getInstance();  
        todayEnd.set(Calendar.HOUR_OF_DAY, 23);  
        todayEnd.set(Calendar.MINUTE, 59);  
        todayEnd.set(Calendar.SECOND, 59);  
        todayEnd.set(Calendar.MILLISECOND, 999);  
        return todayEnd.getTime();
    }  
    
	/**
	 * 格式化日期
	 * @param date
	 * @param format
	 * @return
	 */
	public static String formatTimestampDate(Long date, String format) {
		java.util.Date dateValue = new java.util.Date(date);
		SimpleDateFormat sdf = new SimpleDateFormat(format);
		return sdf.format(dateValue);
	}
	

     /** 
     * Change the null string value to "", if not null, then return it self, use
     * this to avoid display a null string to "null".
     *
     *  @param  input
     *            the string to clear
     *  @return  the result
      */ 
     public   static  String clearNull(String input) {
         return  isEmpty(input)  ?   ""  : input;
    }

     /** 
      * 判断map是否未空, 如果不为 null 或者长度大于0, 均返回 true.
       */ 
      public   static   boolean  isNotEmptyMap(Map<?,?> input) {
          return  (input  !=   null   &&  input.size()  >   0 );
     }
     
     /** 
      * 判断list是否未空, 如果不为 null 或者长度大于0, 均返回 true.
       */ 
      public   static   boolean  isNotEmptyList(List<?> input) {
          return  (input  !=   null   &&  input.size()  >   0 );
     }
     
     /** 
      * 判断字符串数组是否未空, 如果不为 null 或者长度大于0, 均返回 .
       */ 
      public   static   boolean  isNotEmptyArray(String[] input) {
          return  (input  !=   null   &&  input.length  >   0 );
     }
     

     /** 
     * 判断字符串是否未空, 如果为 null 或者长度为0, 均返回 true.
      */ 
     public   static   boolean  isEmpty(String input) {
         return  (input  ==   null   ||  input.length()  ==   0 );
    }
     
     /** 
      * 判断字符串是否未空, 如果为 null 或者长度为0, 均返回 true.
       */ 
      public   static   boolean  isNotEmpty(String input) {
          return  !isEmpty(input);
     }
     
     public static int toInteger(Object str){
    	 return Integer.parseInt(str.toString());
     }
     
     public static String subString(String str,int count){
     	if(isEmpty(str))return null;
     	if(str.length() > count){
     		return str.substring(0,count) + "...";
     	}else{
     		return str;
     	}
     }

 	/** 
      * 判断字符串数组是否未空, 如果不为 null 或者长度大于0, 均返回 .
       */ 
     public   static   boolean  isNotEmptyObject(Object obj) {
     	return  (obj != null && isNotEmpty(obj.toString()));
     }
     
 	public static String stringId32(){
		String uuid = UUID.randomUUID().toString();
		uuid = uuid.replace("-", ""); 
		return uuid;
	}
 	
    /**
	 * 1：首先遍历需要替换的字符串，生成字符串数组以#分割
	 * 2：找传入的参数,有此参数，有则替换，没有则直接返回
	 * @param rowkey
	 * @param str
	 * @param params
	 * @return
	 */
	public static boolean replaceParam(StringBuffer paramRule,String str,Map<String,Object> params){
		boolean b = true;
		String[] rowkeys = str.split("#"); 
		//
		for(int i=0;i<rowkeys.length;i++){
			String rowItem = rowkeys[i];
			//只检查#中间的字符串
			if((i+1)%2==0){
				if(null!=params.get(rowItem)){
					rowItem = params.get(rowItem).toString();
				}else{
					b = false;
					break;
				}
			}
			paramRule.append(rowItem);
		}
		return b;
	}

}
