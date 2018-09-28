package com.inspur.ucweb.utils;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;

import net.sf.json.JSONObject;


/**
 * HTTP请求工具类
 * @author zhanglch
 */
public class HttpUtils {
	public static JSONObject  exeHttpGetMethod(String getUrl){
		JSONObject jsonObject = new JSONObject();
		URL url;
		try {
			getUrl = getUrl.replaceAll(" ", "%20");
			url = new URL(getUrl);
			URLConnection urlConn = url.openConnection();
			HttpURLConnection httpUrlConn = (HttpURLConnection) urlConn;
			httpUrlConn.setRequestProperty("contentType", "utf-8");
			httpUrlConn.setDoOutput(false);
			httpUrlConn.setDoInput(true);
			httpUrlConn.setUseCaches(false);
			httpUrlConn.setRequestMethod("GET");
			StringBuffer sb = new StringBuffer();
			if(httpUrlConn.getInputStream()!= null){
				BufferedReader in = new BufferedReader(new InputStreamReader(httpUrlConn
						.getInputStream(),"utf-8"));
				String line;
				
				while ((line = in.readLine()) != null) {
					sb.append(line);
				}
				in.close();
			}
			jsonObject = JSONObject.fromObject(sb.toString());
		} catch (MalformedURLException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return jsonObject;
	}
	
	public static JSONObject  exeHttpPostMethod(String getUrl,String post){
		JSONObject jsonObject = new JSONObject();
		URL url;
		try {
			getUrl = getUrl.replaceAll(" ", "%20");
			//建立连接
			url = new URL(getUrl);
			URLConnection urlConn = url.openConnection();
			HttpURLConnection httpUrlConn = (HttpURLConnection) urlConn;
			//设置参数
			httpUrlConn.setDoOutput(true);//需要输出
			httpUrlConn.setDoInput(true);//需要输入
			httpUrlConn.setUseCaches(false);//不允许缓存
			httpUrlConn.setRequestMethod("POST");//设置POST方式连接
			//设置请求属性
			httpUrlConn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
			httpUrlConn.setRequestProperty("Connection", "Keep-Alive");// 维持长连接
			httpUrlConn.setRequestProperty("Charset", "UTF-8");
			//连接,也可以不用明文connect，使用下面的httpConn.getOutputStream()会自动connect
			httpUrlConn.connect();
			
			//获取URLConnection对象对应的输出流
			PrintWriter printWriter = new PrintWriter(httpUrlConn.getOutputStream());
			//发送请求参数
			printWriter.write(post);
			//flush输出流的缓冲
			printWriter.flush();
			//开始获取数据
			int resultCode=httpUrlConn.getResponseCode();
			StringBuffer sb = new StringBuffer();
		    if(HttpURLConnection.HTTP_OK==resultCode){
		    	String readLine=new String();
		    	BufferedReader responseReader=new BufferedReader(new InputStreamReader(httpUrlConn.getInputStream(),"UTF-8"));
		      	while((readLine=responseReader.readLine())!=null){
		      		sb.append(readLine).append("\n");
		      	}
		      	responseReader.close();
		    } 
			jsonObject = JSONObject.fromObject(sb.toString());
		} catch (MalformedURLException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return jsonObject;
	}
}
