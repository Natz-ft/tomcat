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

public class QDNewsGrab implements newsGrabInterface{
	
	private static final String URL_PREFIX = "http://10.49.129.7/";
	private static final String URL_NEWS_IMG = "http://10.49.129.7/";
	private static final String URL_NEW_TXT = "http://10.49.129.7/";
//	private static  String text="";
	@Override
	public List<Map> getTodayImgNews() {
		List<Map> today_img_news = CacheManager.get("qd_today_img_news",List.class);
		if(today_img_news==null){
			
			String text = UCUtil.httpGet(URL_PREFIX,null);
			if(text!=null && text.indexOf("<script type=\"text/javascript\"><!--")>0){
				String line = text.substring(text.indexOf("<script type=\"text/javascript\"><!--"));
				String context = line.substring(0,text.indexOf("//-->"));
				//context = context.trim();
				
				List<String> imgUrlArr = new ArrayList<String>();
				List<String> imgLinkArr = new ArrayList<String>();
				List<String> imgTextArr = new ArrayList<String>();
				
				String[] indexLine = context.split(";");				
				for(String str : indexLine){
					str = str.trim();
					if(str.indexOf("var pics") == 0){
						String picsText = str.substring(str.indexOf("'")+1,str.lastIndexOf("'"));
						String[] picsIndex =picsText.split("\\|");
						for(String index : picsIndex){
							index = index.substring(6);
							imgUrlArr.add(URL_NEWS_IMG+index);
						}
					}
					if(str.indexOf("var links")==0){
						String linksText = str.substring(str.indexOf("'")+1,str.lastIndexOf("'"));
						String[] linksIndex = linksText.split("\\|");
						for(String index : linksIndex){
							imgLinkArr.add(URL_NEWS_IMG+index);
						}
					}
					if(str.indexOf("var texts")==0){
						String textsText = str.substring(str.indexOf("'")+1,str.lastIndexOf("'"));
						String[] textsIndex = textsText.split("\\|");
						for(String index : textsIndex){
							imgTextArr.add(index);
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
				CacheManager.set("qd_today_img_news",today_img_news,60*60*1);
			}
		}
		return today_img_news;
	}

	@Override
	public List<Map> getTodayNewsList() {
	//	List<Map> today_text_news = CacheManager.get("qd_today_text_news",List.class);
		List<Map> today_text_news=null;
		if(today_text_news == null){
			String text = UCUtil.httpGet(URL_PREFIX,null);
			if(text!=null && text.indexOf("<table id=\"DataList1\"")>0){
				text = text.substring(text.indexOf("<table id=\"DataList1\""));
				text = text.substring(0,text.indexOf("</table>"));
				String[] lines = text.split("</td>");
				today_text_news = new ArrayList<Map>();
				for(String line : lines){
					if(line.indexOf("<a")>0){
						line = line.substring(line.indexOf("href=")+("href='".length()));
						String link_url = line.substring(0,line.indexOf("target")-2);
						line = line.substring(line.indexOf("title=")+("title='".length()));
						String title = line.substring(1,line.indexOf("\">"));
						Map map = new HashMap();
						map.put("title", title);
						map.put("link_url", URL_NEW_TXT+link_url);
						today_text_news.add(map);
					}
					
				}
			}
			CacheManager.set("qd_today_text_news",today_text_news,60*60*1);//每一个小时更新一次
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
//		String filePath = "E:\\qdDocument.txt";
//		text=readTxtFile(filePath);
		QDNewsGrab t = new QDNewsGrab();
		System.out.println(t.getTodayNewsList());
	}
}
