package com.inspur.utils;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.inspur.common.utils.PropertiesUtil;

public class ViewTool {

	private static Map<String, String> itemCateMap;
	private static Map<String, String> appCateMap;
	
	private static Map<String, Map> citysMap;
	private static List<Map> personCatList;
	private static Map personCatMap;
	private static Map  personThirdCat;
	private static Map  entThirdCat;
	private static List<Map> personSpecial;
	private static List<Map> entCatList;
	private static Map entCatMap;
	private static List<Map> entSpecial;
	private static Map<String, String> UidNoteMapping;
	private static Map<String, String> docIdUUIDMapping = new HashMap<String, String>();
	private static Map<String, Map> docSwfMapping = new HashMap<String, Map>();
	private static Object lockObj = new Object();
	
	public static int ONE_MONTH = 3600*24*30;
	public static int ONE_DAY = 3600*24;
	
	public static final String CACHE_KEY_PREFIX_APPGROUP_PID_CHILDRENIDS="appgroup_pid_childrenids_";
	public static final String CACHE_KEY_PREFIX_APPGROUP_ID_INFO="appgroup_id_info_";
	
	public static String formatDateBySeconds(String seconds,String formatStr) {
		if(formatStr == null || formatStr.isEmpty()) formatStr = "yyyy-MM-dd HH:mm:ss";
		SimpleDateFormat dateFormatter = new SimpleDateFormat(formatStr);
		return dateFormatter.format(new Date(Long.valueOf(seconds+"000")));
	}
	public static String removeDisString(String content) {
		try {
			if (content != null && !"".equals(content)) {
				int pos1 = content.indexOf("<");
				int pos2 = content.indexOf(">");
				String left="",right="";
								
				if(pos1==-1 && pos2==-1){
					return content;
				}
				if(pos1<pos2 && pos1 >=0){  //左括号、右括号都存在，而且左括号在右括号的左边    < >
					if("<font".equals(content.substring(pos1,pos1+5))){
						if(content.substring(pos1,pos2+1).indexOf("color='#DD4B39'")>=0){
							left  =  content.substring(0,pos2+1);
						}
					}else if("</font".equals(content.substring(pos1,pos1+6))){  
						left  =  content.substring(0,pos2+1);
					}else{
						left  = content.substring(0,pos1);
					}
					right = content.substring(pos2 + 1);
				}else if((pos1==-1 || pos1>pos2)&& pos2>-1){   //必须存在右括号， 没有左括号 或者 左括号在右括号的右边   (>  ;  > <)
					right = content.substring(pos2 + 1);
				}else if(pos2 < 0){                          //没有右括号
					int temp =content.indexOf(" ");
					if(temp<0){
						right = content.substring(pos1+5);
					}else{
						right = content.substring(temp+1);
					}
				}
				left = left + removeDisString(right);
				return left; 

			}else{
				return content;
			}
		} catch (Exception e) {
			return content;
		}

	}
	public static String getUC() {
		String site_code = Function.getCitySite();
		String uc_url = "http://"+site_code+".icity365.com/uc/";
		return uc_url;
	}
	public static String getAC() {
		String site_code = Function.getCitySite();
		String ac_url = "http://"+site_code+".icity365.com/ac/";
		return ac_url;
	}
	public static String getConfValue(String key) {
		return ConfUtil.getValue(key).toString();
	}
	public static void main(String[] args){
		String str="@<font color='#DD4B39'>青岛</font>发布 @<font color='#DD4B39'>青岛</font>交警 @<font color='#DD4B39'>青岛</font>公安 @<font color='#DD4B39'>青岛</font>邱磊 @<font color='#DD4B39'>青岛</font>论坛 @<font color='#DD4B39'>青岛</font>广播新媒体 @在<font color='#DD4B39'>青岛</font> @城市信报 @新浪山东头条 @头条<font color='#DD4B39'>青岛</font> @山东环境sp_sina地址";
		str = removeDisString(str);
		System.out.println(str);
	}
	public static String getConfValue2(String file,String key) {
		return PropertiesUtil.getValue(file,key);
	}
}
