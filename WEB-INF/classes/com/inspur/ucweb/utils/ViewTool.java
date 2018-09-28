package com.inspur.ucweb.utils;

import java.util.Map;

import org.loushang.internet.util.StringUtils;
import org.loushang.internet.util.el.Function;

import com.inspur.common.utils.PropertiesUtil;
import com.inspur.hsf.config.ServiceFactory;
import com.inspur.uc.api.privilege.IAccessDecisionManager;

public class ViewTool {

	public static String getPNameByPId(String pid) {
		String pname = "";
		if("tqing".equals(pid)) {
			pname = "浪潮天擎";
		} else if("tji".equals(pid)) {
			pname = "浪潮天机";
		} else if("tmai".equals(pid)) {
			pname = "浪潮天脉";
		} else if("tjie".equals(pid)) {
			pname = "浪潮天街";
		} else if("tque".equals(pid)) {
			pname = "浪潮天阙";
		} else if("tlai".equals(pid)) {
			pname = "浪潮天籁";
		}
		return pname;
	}

	public static String getPIdByPName(String pname) {
		String pid = "";
		if("浪潮天擎".equals(pname)) {
			pid = "tqing";
		} else if("浪潮天机".equals(pname)) {
			pid = "tji";
		} else if("浪潮天脉".equals(pname)) {
			pid = "tmai";
		} else if("浪潮天街".equals(pname)) {
			pid = "tjie";
		} else if("浪潮天阙".equals(pname)) {
			pid = "tque";
		} else if("浪潮天籁".equals(pname)) {
			pid = "tlai";
		}
		return pid;
	}
	public static String getStarPercent(int grade) {
		return (grade*10)+"%";
	}
	/*public static String getAC() {
		return ConfUtil.getValue("global.index.devweb");
	}*/
	/*public static String getUC() {
		return ConfUtil.getValue("global.index.ucweb");
	}*/
	public static String getRC() {
		return ConfUtil.getValue("global.index.rc");
	}
	public static String getRCNote(){
		return ConfUtil.getValue("global.index.note");
	}
	public static String getBSFW(){
		return ConfUtil.getQingDaoValue("global.index.bsfw");
	}
	public static String getRCService(){
		return ConfUtil.getValue("global.index.rcservice");
	}
	public static String getDistrictBSFW(String district) {
		if(district == null || district.isEmpty()){
			return ConfUtil.getQingDaoValue("global.index.bsfw");
		}else{
			return ConfUtil.getQingDaoValue("global.index.bsfw")+"/"+district+"/htm";
		}
	}
	/*public static String getDistrictUC(String district) {
		if(district == null || district.isEmpty()){
			return ConfUtil.getValue("global.index.ucweb");
		}else{
			return ConfUtil.getValue("global.index.ucweb")+"/"+district+"/htm";
		}
	}*/
	public static String getAppicon(String url) {
		if(StringUtils.isNotEmpty(url)) {
			if(url.startsWith("http://")) {
				return url;
			} else {
				return ViewTool.getRCService() +"/doc?doc_id="+ url;
			}
		} 
		return Function.getUrl("images/defaulticon.png");
	}
	//提取html中的文字
	public static String convertHtmlToString(String content){
		if(content!=null && content.length()>0){
			content = content.replaceAll("</?[^<]+>", "");
			// 去除字符串中的空格 回车 换行符 制表符 等
			content = content.replaceAll("\\s*|\t|\r|\n", "");
			if(content.length()>200){
				content = content.substring(0,200)+"........";
			}
			return content;
		}
		return null;
		
	}
	//提取文字和第一个图片
	public static String convertHtmlToStringImg(String content){
		String textcontent = content.replaceAll("</?[^<]+>", "");
		// 去除字符串中的空格 回车 换行符 制表符 等
		textcontent = textcontent.replaceAll("\\s*|\t|\r|\n", "");
		String img = "";
		if(content.indexOf("<img")>=0 && content.indexOf("<img")<100){
			//截取img标签，只截取第一个
			int img_start = content.indexOf("<img");
			int img_end = content.indexOf(">", img_start);
			img = content.substring(img_start, img_end+1);
			if(textcontent.length()>80){
				textcontent = textcontent.substring(0,80)+"........";
			}
		}else{
			if(textcontent.length()>200){
				textcontent = textcontent.substring(0,200)+"........";
			}
		}
		return textcontent+img;
	}
	public static String getProp(String filename,String key){
		return PropertiesUtil.getValue(filename, key);
	}
	public static String getConfig(String key){
		return ConfUtil.getValue(key);
	}
}
