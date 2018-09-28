package com.inspur.ucweb.utils.newsGrab;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.inspur.ucweb.cache.CacheManager;
import com.inspur.ucweb.utils.UCUtil;

public class ZZNewsGrab implements newsGrabInterface{
	
	private static final String URL_PREFIX = "http://10.50.1.9";
	private static final String URL_NEWS_IMG = "http://10.50.1.9";
	private static final String URL_NEW_TXT = "http://10.50.1.9";
	private static String text="";
	@Override
	public List<Map> getTodayImgNews() {
		List<Map> today_img_news = CacheManager.get("zz_today_img_news",List.class);
		if(today_img_news==null){
			//String text = UCUtil.httpGet(URL_PREFIX,null);
			if(text != null && text.indexOf("<div id=\"ifocus_piclist\" style=\"left:0; top:0;\">")>0){
				text = text.substring(text.indexOf("<div id=\"ifocus_piclist\" style=\"left:0; top:0;\">"));
				String context = text.substring(0,text.indexOf("<div id=\"ifocus_btn\">"));
				context = text.split("<div id=\"ifocus_tx\">")[0];
				String context2 = text.split("<div id=\"ifocus_tx\">")[1];
				String[] lines = context.split("</li>");
				String[] lines2 = context2.split("</li>");
				List<String> imgUrlArr = new ArrayList<String>();
				List<String> imgLinkArr = new ArrayList<String>();
				List<String> imgTextArr = new ArrayList<String>();
				
				for(String value:lines){
					if(value.indexOf("SRC")>0){
						String value1 = value.substring(value.indexOf("SRC")+5,value.indexOf("BORDER"));
						imgUrlArr.add(URL_NEWS_IMG+value1);
					}
					if(value.indexOf("href=")>0){
						value = value.substring(value.indexOf("href=")+6,value.indexOf("target"));
						imgLinkArr.add(URL_NEWS_IMG+value);
					}
					
				}
				for(String value:lines2){
					if(value.indexOf("title")>0){
						value = value.substring(value.indexOf("title")+7,value.indexOf("\'>"));
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
				CacheManager.set("zz_today_img_news",today_img_news,60*60*1);//每一个小时更新一次
			}
		}
		return today_img_news;
	}

	@Override
	public List<Map> getTodayNewsList() {
		List<Map> today_text_news = CacheManager.get("zz_today_text_news",List.class);
		if(today_text_news == null){
			//String text = UCUtil.httpGet(URL_PREFIX,null);
			if(text != null && text.indexOf("<table align=\"center\" width=\"95%\" height=\"56\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"h20\">")>0){
				text = text.substring(0,text.indexOf("<table width=\"100%\" height=\"15\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">"));
				
				String[] lines = text.split("<td style=\'\'>");
				today_text_news=new ArrayList<Map>();
				for(String value: lines){
					value = value.trim();
					if(value!=null && !value.isEmpty() && value.indexOf("<table cellpadding=")==0){
						String linkUrl = value.substring(value.indexOf("href=")+6,value.indexOf("class")-2);
						String content = value.substring(value.indexOf("title=")+7,value.indexOf("target")-2);
						Map map = new HashMap();
						map.put("title", content);
						map.put("link_url", URL_NEW_TXT+linkUrl);
						today_text_news.add(map);
					}
				}
			}
			CacheManager.set("zz_today_text_news",today_text_news,60*60*1);//每一个小时更新一次
		}
		return today_text_news;
	}
	
	public static String readTxtFile(String filePath) {
		String result = "";
		try{
			String encoding="utf-8";
			File file=new File(filePath);
			if(file.isFile() && file.exists()){ //判断文件是否存在
				InputStreamReader read;
				
				read = new InputStreamReader(new FileInputStream(file),encoding);
				
				BufferedReader bufferedReader = new BufferedReader(read);
				String lineTxt = null;
				while((lineTxt = bufferedReader.readLine()) != null){
					result += lineTxt;
				}
				read.close();
			}else{
				System.out.println("找不到指定的文件");
			}
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return result;
	}

	public static void main(String argv[]) {
		String filePath = "E:\\zz.txt";
		text=readTxtFile(filePath);
		ZZNewsGrab t = new ZZNewsGrab();
		System.out.println(t.getTodayNewsList());
	}
}
