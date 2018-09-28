package com.inspur.utils;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

/**
 * 字符串处理类
 * <br>
 * <strong>Title :</strong> DataStringUitls.java
 * <br>
 * <strong>Description : </strong>
 * <br>
 * <strong>For Examples :</strong>
 * <br>
 * <strong>Create on : 2015-9-26 下午5:52:17<br></strong>
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
public class DateStringUitls {
	
	private final static String dateFormat = "yyyy-MM-dd HH:mm:ss";
	 /**
     * 获取当前日期
     * @return
     */
    public static String getDateTime(){
   	 return new   SimpleDateFormat(dateFormat).format(Calendar.getInstance().getTime());
    }

    /**
     * 获取当前日期
     * @return
     */
    public static String getDate(){
   	 return new   SimpleDateFormat( "yyyy-MM-dd").format(Calendar.getInstance().getTime());
    }
    
    /**
     * 获取当前日期（下划线分隔）
     * @return
     */
    public static String getDateBottom(){
   	 return new   SimpleDateFormat( "yyyy_MM_dd").format(Calendar.getInstance().getTime());
    }
    
    /**
     * 获取当前时间
     * @return
     */
    public static String getTime(){
   	 return new   SimpleDateFormat( "HH:mm:ss").format(Calendar.getInstance().getTime());
    }
    /**
     * 获取当前的月份
     * @return
     */
    public static String getCurrentMonth(){
    	return new SimpleDateFormat("yyyy-MM").format(Calendar.getInstance().getTime());
    }
    
    /**
     * 
     * @title compareDate<br/>
     * <p>Description: 比较日期大小
     * <br>
     * @author <a href=mailto:yinyin@inspur.com></a><br>
     * <p>Date: 2017年4月20日 下午3:28:27<br/>
     * <p>
     * @param DATE1
     * @param DATE2
     * @param format
     * @return   
     * @see int
     */
	public static int compareDate(String DATE1, String DATE2,String format) {
		DateFormat df = new SimpleDateFormat(format);
		try {
			Date dt1 = df.parse(DATE1);
			Date dt2 = df.parse(DATE2);
			if (dt1.getTime() > dt2.getTime()) {
				return 1;
			} else if (dt1.getTime() < dt2.getTime()) {
				return -1;
			} else {
				return 0;
			}
		} catch (Exception exception) {
			exception.printStackTrace();
		}
		return 0;
	}

}
