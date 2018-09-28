package com.inspur.ucweb.utils.newsGrab;

import java.util.List;
import java.util.Map;

public interface newsGrabInterface {
	/*
	 * 获取地市的新闻图片
	 * @author liupeng
	 */
	public List<Map> getTodayImgNews();
	/*
	 * 获取地市的新闻列表
	 * @author liupeng
	 */
	public  List<Map> getTodayNewsList();
}
