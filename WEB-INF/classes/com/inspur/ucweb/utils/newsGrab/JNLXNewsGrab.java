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

public class JNLXNewsGrab implements newsGrabInterface{
	
	private static final String URL_PREFIX = "http://10.49.20.100/site/";
	private static final String URL_NEWS_IMG = "http://10.49.20.100";
	private static final String URL_NEW_TXT = "http://10.49.20.100";
	//private static String text="";
	@Override
	public List<Map> getTodayImgNews() {
		List<Map> today_img_news = CacheManager.get("jnlx_today_img_news",List.class);
		if(today_img_news==null){
			String text = UCUtil.httpGet(URL_PREFIX,null);
			if(text != null && text.indexOf("<param name=\"FlashVars\"")>0){
				text = text.substring(text.indexOf("<param name=\"FlashVars\""));
				String context = text.substring("<param name=\"FlashVars\" value=\"".length(),text.indexOf("document.write"));
				String[] lines = context.split("&");
				
				List<String> imgUrlArr = new ArrayList<String>();
				List<String> imgLinkArr = new ArrayList<String>();
				List<String> imgTextArr = new ArrayList<String>();
				
				for(String value:lines){
					if(value.indexOf("pics=")==0){
						value = value.substring(5);
						String pics[]=value.split("\\|");
						for(String var : pics){
							imgUrlArr.add(URL_NEWS_IMG+var);
						}
					}
					if(value.indexOf("links=")==0){
						value = value.substring(6);
						String pics[]=value.split("\\|");
						for(String var : pics){
							imgLinkArr.add(URL_NEWS_IMG+var);
						}
					}
					if(value.indexOf("texts=")==0){
						value = value.substring(6);
						String pics[]=value.split("\\|");
						for(String var : pics){
							imgTextArr.add(var);
						}
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
				CacheManager.set("jnlx_today_img_news",today_img_news,60*60*1);//每一个小时更新一次
			}
		}
		return today_img_news;
	}

	@Override
	public List<Map> getTodayNewsList() {
		List<Map> today_text_news = CacheManager.get("jnlx_today_text_news",List.class);
		if(today_text_news == null){
			String text = UCUtil.httpGet(URL_PREFIX,null);
			if(text != null && text.indexOf("ctl00_ContentPlaceHolder1_D_News1_ContentTable")>0){
				text = text.substring(text.indexOf("ctl00_ContentPlaceHolder1_D_News1_ContentTable"));
				text = text.substring(text.indexOf("<tr>"),text.indexOf("</table>"));
				String[] lines = text.split("<tr>");
				today_text_news=new ArrayList<Map>();
				for(String value: lines){
					value = value.trim();
					if(value!=null && !value.isEmpty()){
						String linkUrl = value.substring(value.indexOf("href=")+5,value.indexOf("title"));
						String content = value.substring(value.indexOf("title=")+6,value.indexOf("target"));
						Map map = new HashMap();
						map.put("title", content);
						map.put("link_url", URL_NEW_TXT+linkUrl);
						today_text_news.add(map);
					}
				}
			}
			CacheManager.set("jnlx_today_text_news",today_text_news,60*60*1);//每一个小时更新一次
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
//		String filePath = "E:\\jn_lxDocument.txt";
//		text=readTxtFile(filePath);
		JNLXNewsGrab t = new JNLXNewsGrab();
		System.out.println(t.getTodayNewsList());
	}
}
