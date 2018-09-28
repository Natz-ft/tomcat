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

import org.apache.axis2.databinding.types.xsd.Date;

import com.inspur.ucweb.cache.CacheManager;
import com.inspur.ucweb.utils.UCUtil;


public class JNNewsGrab implements newsGrabInterface{
	
	private static final String URL_PREFIX = "http://10.49.7.209/";
	private static final String URL_NES_PREFIX = "http://10.49.10.9/";
	private static final String URL_NEWS_IMG = "http://10.49.7.209/mypage/index.php?name=indexpic2013";
	private static final String URL_NEW_TXT = "http://10.49.10.9/sjzy/js/list522010.js";
	//private static String  text = "";
	@Override
	public List<Map> getTodayImgNews() {
		List<Map> today_img_news = CacheManager.get("jn_today_img_news",List.class);
		if(today_img_news == null){
		
			String text = UCUtil.httpGet(URL_NEWS_IMG,null);
			if(text != null && text.indexOf("var linkurlvalue")>0){
				String line = text.substring(text.indexOf("var linkurlvalue"));
				String arr1[] = line.split("document.write");
				line = arr1[0];
				arr1 = line.split(";");
					
				List<String> imgUrlArr = new ArrayList<String>();
				List<String> imgLinkArr = new ArrayList<String>();
				List<String> imgTextArr = new ArrayList<String>();
				
				for(String value:arr1){
					if(value.indexOf("picurlvalue") == 0){
						value = value.substring(31);
						value = value.substring(0,value.length()-2);
						imgUrlArr.add(URL_PREFIX+value);
					}
					if(value.indexOf("linkurlvalue") == 0){
						value = value.substring(29);
						value = value.substring(0,value.length()-2); 
						imgLinkArr.add(URL_PREFIX+value);
					}
					if(value.indexOf("textvalue") == 0){
						value = value.substring(25);
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
				CacheManager.set("jn_today_img_news",today_img_news,60*60*1);//每一个小时更新一次
			}
		}
		return today_img_news;
	}

	@Override
	public List<Map> getTodayNewsList() {
		List<Map> today_text_news = CacheManager.get("jn_today_text_news",List.class);
		if(today_text_news == null){
			Date date = new Date();
			String url = URL_NEW_TXT+"?"+System.currentTimeMillis();
			String line = UCUtil.httpGet(URL_NEW_TXT, "utf-8");
		//	String line = text;
			String initData = line.substring(line.indexOf("<a"));
			String[] initData_array = initData.split("</a>");
			
			if(initData_array != null && initData_array.length > 0){
				int i = 0;
				today_text_news = new ArrayList<Map>();
				for(String table : initData_array){
					if(i == 10){
						break;//先暂取 10 条
					}
					if(table.indexOf("href=") > -1 && table.indexOf("title=") > -1){
						table = table.substring(table.indexOf("href=")+("href='".length()+1));
						String link_url = table.substring(0,table.indexOf(".html")+(".html".length()));
						table = table.substring(table.indexOf("title=")+("title='".length()));
						String title = table.substring(0,table.indexOf("'>"));
						Map map = new HashMap();
						map.put("title", title);
						map.put("link_url", URL_NES_PREFIX+link_url);
						today_text_news.add(map);
						i++;
					}
				}
			}
			CacheManager.set("jn_today_text_news",today_text_news,60*60*1);//每一个小时更新一次
		}
		return today_text_news;
	}

	
	/*
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
		}//考虑到编码格式
		catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return result;
	}
*/
	public static void main(String argv[]) {
//		String filePath = "E:\\Document1.txt";
//		text=readTxtFile(filePath);
		JNNewsGrab t = new JNNewsGrab();
		System.out.println(t.getTodayNewsList());
	}
	
}
