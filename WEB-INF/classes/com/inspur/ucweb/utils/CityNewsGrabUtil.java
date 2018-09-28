package com.inspur.ucweb.utils;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.inspur.ucweb.utils.newsGrab.*;


public class CityNewsGrabUtil {
	public static enum CityId{jn,qd,jnlx};
	/**
	 * 抓取各地市图片新闻
	 * @return
	 */
	public List<Map> getTodayImgNews(String cityId){
		List<Map> result = new ArrayList<Map>();
		newsGrabInterface Analyse = getAnalyseClass(cityId);
		result = Analyse.getTodayImgNews();
		return result;		
	}
	
	/**
	 * 抓取各地市非图片新闻
	 * @return
	 */
	public List<Map> getTodayNewsList(String cityId){
		List<Map> result = new ArrayList<Map>();
		newsGrabInterface Analyse = getAnalyseClass(cityId);
		result = Analyse.getTodayNewsList();
		return result;
		
	}
	public newsGrabInterface getAnalyseClass(String cityId){
		newsGrabInterface newsGrab = null;
		CityId city = CityId.valueOf(cityId);
		switch(city){
		case jn:
			newsGrab = new JNNewsGrab();
			break;
		case qd:
			newsGrab = new QDNewsGrab();
			break;
		case jnlx:
			newsGrab = new JNLXNewsGrab();
			break;
		default:
			break;
		}
		
		return newsGrab;
	}
}
