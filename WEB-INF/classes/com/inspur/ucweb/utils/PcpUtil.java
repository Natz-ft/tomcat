package com.inspur.ucweb.utils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import com.inspur.ucweb.cache.CacheManager;

/**
 * 封装警务云项目个性化的一些公共操作
 */
public class PcpUtil {
	
	private static final String URL_PREFIX = "http://www.sd/";
	private static final String URL_NEWS_IMG = "http://www.sd/";
	private static final String URL_NEW_TXT = "http://www.sd/col/col103/index.html";

	/**
	 * 抓取警务内网图片新闻
	 * @return
	 */
	public static List<Map> getTodayImgNews(){
		List<Map> today_img_news = CacheManager.get("today_img_news",List.class);
		if(today_img_news == null){
			String text = UCUtil.httpGet(URL_NEWS_IMG,null);
			if(text != null && text.indexOf("imgUrl")>0){
				String line = text.substring(text.indexOf("imgUrl"));
				String arr1[] = line.split("object classid");
				line = arr1[0];
				arr1 = line.split(";");
					
				List<String> imgUrlArr = new ArrayList<String>();
				List<String> imgLinkArr = new ArrayList<String>();
				List<String> imgTextArr = new ArrayList<String>();
				for(String value:arr1){
					if(value.indexOf("imgUrl[i]") == 0){
						value = value.substring(11);
						value = value.substring(0,value.length()-1);
						imgUrlArr.add(URL_PREFIX+value);
					}
					if(value.indexOf("imgLink[i]") == 0){
						value = value.substring(19);
						value = value.substring(0,value.length()-2); 
						imgLinkArr.add(URL_PREFIX+value);
					}
					if(value.indexOf("imgText[i]") == 0){
						value = value.substring(12);
						value = value.substring(0,value.length()-1);
						imgTextArr.add(value);
					}
				}
				int count = 0;
				List<Map> res = new ArrayList();
				for(String value:imgUrlArr){
					Map tmp = new HashMap();
					tmp.put("des",imgTextArr.get(count));
					tmp.put("icon_url",imgUrlArr.get(count));
					tmp.put("link_url",imgLinkArr.get(count));
					res.add(tmp);
					count++;
					if(count == 10){
						break;//先暂取 10 条
					}
				}
				today_img_news = res;
				CacheManager.set("today_img_news",today_img_news,60*60*1);//每一个小时更新一次
			}
		}
		return today_img_news;
	}
	
	/**
	 * 抓取警务内网非图片新闻
	 * @return
	 */
	public static List<Map> getTodayNewsList(){
		List<Map> today_text_news = CacheManager.get("today_text_news",List.class);
		if(today_text_news == null){
			String line = UCUtil.httpGet(URL_NEW_TXT, "utf-8");
			String initData = line.substring(line.indexOf("InitData"));
			String[] initData_array = initData.split("'];");
			initData_array[0] = initData_array[0].replace("\\", "");
			String searchStr = initData_array[0];
			String tableArr[] = searchStr.split("<table");
			if(tableArr != null && tableArr.length > 0){
				int i = 0;
				today_text_news = new ArrayList<Map>();
				for(String table : tableArr){
					if(i == 10){
						break;//先暂取 10 条
					}
					if(table.indexOf("href=") > -1 && table.indexOf("title=") > -1){
						table = table.substring(table.indexOf("href=")+("href='".length()));
						String link_url = table.substring(0,table.indexOf(".html")+(".html".length()));
						table = table.substring(table.indexOf("title=")+("title='".length()));
						String title = table.substring(0,table.indexOf("'>"));
						Map map = new HashMap();
						map.put("title", title);
						map.put("link_url", URL_PREFIX+link_url);
						today_text_news.add(map);
						i++;
					}
				}
			}
			CacheManager.set("today_text_news",today_text_news,60*60*1);//每一个小时更新一次
		}
		return today_text_news;
	}
}
