package com.inspur.utils;

import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.HttpVersion;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.conn.ClientConnectionManager;
import org.apache.http.conn.params.ConnManagerParams;
import org.apache.http.conn.scheme.PlainSocketFactory;
import org.apache.http.conn.scheme.Scheme;
import org.apache.http.conn.scheme.SchemeRegistry;
import org.apache.http.conn.ssl.SSLSocketFactory;
import org.apache.http.entity.mime.HttpMultipartMode;
import org.apache.http.entity.mime.MultipartEntity;
import org.apache.http.entity.mime.content.ContentBody;
import org.apache.http.entity.mime.content.FileBody;
import org.apache.http.entity.mime.content.StringBody;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.impl.conn.tsccm.ThreadSafeClientConnManager;
import org.apache.http.params.BasicHttpParams;
import org.apache.http.params.CoreProtocolPNames;
import org.apache.http.params.HttpConnectionParams;
import org.apache.http.params.HttpParams;
import org.apache.http.params.HttpProtocolParams;
import org.apache.http.protocol.HTTP;
import org.apache.http.util.EntityUtils;

import com.inspur.data.common.utils.ConfUtil;

public class UploadUtil {
	private static Log log = LogFactory.getLog(UploadUtil.class);
	private static final String CHARSET = HTTP.UTF_8;
	private static HttpClient customerHttpClient;
	private static final String TAG = "UploadUtil";

	public UploadUtil() {

	}

	/**
	 * 初始化httpclient
	 * 
	 * @return
	 */
	public static synchronized HttpClient getHttpClient() {
		if (null == customerHttpClient) {
			HttpParams params = new BasicHttpParams();
			// 设置一些基本参数
			HttpProtocolParams.setVersion(params, HttpVersion.HTTP_1_1);
			HttpProtocolParams.setContentCharset(params, CHARSET);
			HttpProtocolParams.setUseExpectContinue(params, true);
			HttpProtocolParams.setUserAgent(params,"Mozilla/5.0(Linux;U;Android 2.2.1;en-us;Nexus One Build.FRG83) "
									+ "AppleWebKit/553.1(KHTML,like Gecko) Version/4.0 Mobile Safari/533.1");
			// 超时设置
			/* 从连接池中取连接的超时时间 */
			ConnManagerParams.setTimeout(params, 10000);
			/* 连接超时 */
			HttpConnectionParams.setConnectionTimeout(params, 20000);
			/* 请求超时 */
			HttpConnectionParams.setSoTimeout(params, 20000);

			// 设置我们的HttpClient支持HTTP和HTTPS两种模式
			SchemeRegistry schReg = new SchemeRegistry();
			schReg.register(new Scheme("http", PlainSocketFactory
					.getSocketFactory(), 80));
			schReg.register(new Scheme("https", SSLSocketFactory
					.getSocketFactory(), 443));

			// 使用线程安全的连接管理来创建HttpClient
			ClientConnectionManager conMgr = new ThreadSafeClientConnManager(
					params, schReg);
			customerHttpClient = new DefaultHttpClient(conMgr, params);
		}
		return customerHttpClient;
	}

	/**
	 * httpclient+MultipartEntity方式上传
	 * 
	 * @param params
	 * @param pathToOurFile
	 * @param urlServer
	 * @return
	 * @throws ClientProtocolException
	 * @throws IOException
	 */
	public static String post(final Map<String, String> params,
			final ArrayList<String> fileURL_list, final String urlServer) {

		if (fileURL_list == null || fileURL_list.equals("")) { // 如果文件列表中没有数据，返回null
			return null;
		}
		int list_size = fileURL_list.size();
		if (list_size<=0) {
			return null;
		}
		String result = "";
		try {
			final String fileUrl = fileURL_list.get(0);
			 result = startUploadService(params,fileUrl,urlServer);
			// 上传队列
			//executorService = Executors.newFixedThreadPool(list_size);
			//executorService.shutdown();
		} catch (Exception e) {
			log.error(TAG, e);
		}finally{
				
		}
		return result;
	}

	/**
	 * 向服务器发送文件
	 * 
	 * @param file_map
	 * @param file_url
	 * @param server_url
	 * @return
	 */
	public static String startUploadService(Map<String, String> params,
			String file_url, String server_url) {
		try {
			// 开启上传队列
			File file = new File(file_url);
			HttpClient httpclient = getHttpClient();//获取htttpclient
			// 设置通信协议版本
			httpclient.getParams().setParameter(
					CoreProtocolPNames.PROTOCOL_VERSION, HttpVersion.HTTP_1_1);
			// 文件参数设置
			HttpPost httppost = new HttpPost(server_url);
			MultipartEntity mpEntity = new MultipartEntity(
					HttpMultipartMode.BROWSER_COMPATIBLE, null, Charset.forName(CHARSET));
			if (params != null && !params.isEmpty()) {
				// 编码参数
				for (String k : params.keySet()) {
					StringBody valueBody = new StringBody(params.get(k),Charset.forName(CHARSET));
					mpEntity.addPart(k, valueBody);
				}
			}
			ContentBody cbFile = new FileBody(file);
			mpEntity.addPart("uploadfile", cbFile);
			httppost.setEntity(mpEntity);
			HttpResponse response = httpclient.execute(httppost);
			HttpEntity resEntity = response.getEntity();

			if (response.getStatusLine().getStatusCode() != HttpStatus.SC_OK) {
				String sss = EntityUtils
						.toString(response.getEntity(), CHARSET);
				// throw new RuntimeException("请求失败");
				return "{\"code\":\"4000\", \"msg\":\"URL请求失败\", \"result\":\'"
						+ response.getStatusLine().toString() + "\'}";
			}
			String result = (resEntity == null) ? null : EntityUtils.toString(resEntity,
					CHARSET);
			return result;
		} catch (UnsupportedEncodingException e) {
			log.error(TAG, e);
			return "{\"code\":\"4002\", \"msg\":\"URL请求失败\", \"result\":\'UnsupportedEncodingException:"
					+ e.getMessage() + "\'}";
		} catch (ClientProtocolException e) {
			log.error(TAG, e);
			return "{\"code\":\"4003\", \"msg\":\"URL请求失败\", \"result\":\'ClientProtocolException:"
					+ e.getMessage() + "\'}";
		} catch (IOException e) {
			log.error(TAG, e);
			return "{\"code\":\"4001\", \"msg\":\"URL请求失败\", \"result\":\'IOException:"
					+ e.getMessage() + "\'}";
		}
	}
	/**
	 * 发送消息
	 * @param what
	 * @param res
	 * @param handler
	 */
	private static String sendMessage(String res){
		System.out.println(res);
		return res;
	}
	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
       Map<String, String> map = new HashMap<String, String>();
       map.put("uid", "100000098");
       map.put("type", "doc");
       
       ArrayList<String> filelList = new ArrayList<String>();
       filelList.add("E:\\chat3\\push.js");
       
       String servletUrl = ConfUtil.getConfValue("global.index.rcservice")+"/upload";//"http://rcservice.iop365.com/upload";
       
       String res = UploadUtil.post(map, filelList, servletUrl);
       System.out.println(res);
       //sendMessage();
	}
}
