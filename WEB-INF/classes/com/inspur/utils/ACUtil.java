package com.inspur.utils;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.loushang.internet.context.ContextHolder;
import org.loushang.internet.util.JsonUtils;
import org.loushang.internet.util.el.Function;

import com.inspur.api.ac.IAppAdminService;
import com.inspur.hsf.config.ServiceFactory;
import com.inspur.ucweb.utils.Validator;
import com.inspur.utils.UserUtil;

public class ACUtil {
	private static Log log = LogFactory.getLog(ACUtil.class);
	public static String getCitySite(){
		return null;
	}
	public static final List<String> GROUP_IDS_ROOT = new ArrayList<String>();
	static {
		//应用一级分组
		GROUP_IDS_ROOT.add("01450");GROUP_IDS_ROOT.add("01451");
		GROUP_IDS_ROOT.add("01545");GROUP_IDS_ROOT.add("01546");
	}
	
	public static boolean checkAccess(String app_id,String developer_id){
		boolean access = false;
		try{
			IAppAdminService appAdminService = OamUtils.getAppAdminService();
			access = appAdminService.checkAppForAdmin(app_id, developer_id);
		}catch(Exception ex){
			if(log.isDebugEnabled()){
				log.error("checkAccess出错",ex);
			}
		}
		return access;
	}
	/**
	 * 附件相关信息处理
	 * @param attachments
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public static List<Map> attachmentsFilter(List<Map> attachments) {
		List<Map> attachments_tmp = new ArrayList<Map>();
		List<String> attachIds = new ArrayList<String>();
		if(attachments == null) return attachments_tmp;
		for(int i=0; i<attachments.size(); i++) {
			Map attachment = attachments.get(i);
			String attachId = String.valueOf(attachment.get("attachment_url"));
			if(!attachIds.contains(attachId)){
				attachIds.add(attachId);
				attachments_tmp.add(attachment);
			}
		}
		return attachments_tmp;
	}
	/**
	 * 获取文件的内容
	 * @param filepath String 文件的路径（相对于项目根路径）
	 * @return
	 */
	public static String fileGetContents(String filepath) {
		String contents = "";
		String realPath = ContextHolder.getServletContext().getRealPath(Function.getHome());
		realPath = new File(realPath).getParent() + "/" + filepath;
		try {
			FileInputStream fis = new FileInputStream(realPath);
			InputStreamReader isr = new InputStreamReader(fis);
			BufferedReader br = new BufferedReader(isr);
			String temp = null;
			while ((temp = br.readLine()) != null) {
				contents += temp;
			}
		} catch (FileNotFoundException e) {
			return null;
		} catch (IOException e) {
			return null;
		}
		return contents;
	}
	
	/**
	 * 写入文件
	 * @param filepath String 文件的路径（相对于项目根路径）
	 * @param data String 要写入文件的数据
	 * @param append boolean 是否以添加方式写入文件
	 * ***为方便方法调用方处理，此处抛出可能的运行时错误***
	 * @throws FileNotFoundException
	 * @throws IOException
	 */
	public static String  filePutContents(String filepath, String data, boolean append) 
			throws FileNotFoundException, IOException {
		data = Validator.sNull(data);
		String realPath = ContextHolder.getServletContext().getRealPath("/");
		realPath = new File(realPath).getParent() + "/" +filepath;
		File file = new File(realPath);
		File dir = file.getParentFile();
		if(dir == null) {
			throw new IOException();
		}
		if(!dir.exists()) {
			dir.mkdirs();
		}
		if(!file.exists()) {
			file.createNewFile();
		}
		if(!file.canWrite()) {
			file.setWritable(true, false);
		}
		//写入文件
		FileWriter fw = new FileWriter(file, append);
		fw.write(data);
		fw.flush();fw.close();
		return realPath;
	}
	/** 
	 * 删除单个文件 
	 * @param   sPath    被删除文件的文件名 
	 * @return 单个文件删除成功返回true，否则返回false 
	 */  
	public static boolean deleteFile(String sPath) {  
	    boolean flag = false;  
	    File file = new File(sPath);  
	    // 路径为文件且不为空则进行删除  
	    if (file.isFile() && file.exists()) {  
	        file.delete();  
	        flag = true;  
	    }  
	    return flag;  
	}  
	/**
	 * 读取远程url文件内容
	 * @param url
	 * @return
	 * @throws Exception
	 */
	 public static String getText(String url) throws Exception {
	        URL website = new URL(url);
	        URLConnection connection = website.openConnection();
	        BufferedReader in = new BufferedReader(
	                                new InputStreamReader(
	                                    connection.getInputStream()));

	        StringBuilder response = new StringBuilder();
	        String inputLine;

	        while ((inputLine = in.readLine()) != null) 
	            response.append(inputLine);

	        in.close();
	        System.out.println(response.toString());
	        return response.toString();
	      
	    }
	 
	 /**
		 * 创建系统级应用网盘，用来存放应用模板
		 * @return
		 */
		/*public static Map<String,Object> createAppSysDockDisk() {
			Map<String,Object> result = new HashMap<String,Object>();
			//判断系统级默认应用网盘是否存在
			String app_sys_disk_params_key = "app_sys_disk:disk_params";
			String app_sys_disk_id_key = "app_sys_disk:disk_id";
			
			String uid = "5";
			List<String> adminUids = UserUtil.getAdminUids();
			if(Validator.isNotEmpty(adminUids)) {
				uid = adminUids.get(0);
			}
			
			Map<String,Object> params = null;
			Map<String,Object> app_sys_disk_params = XdataService.get(app_sys_disk_params_key, Map.class);
			if(Validator.isNotEmpty(app_sys_disk_params)) {
				//判断网盘是否存在
				params = app_sys_disk_params;
			} else {
				params = new HashMap<String,Object>();
				params.put("uid", uid); //当前用户id
				params.put("owner_id", uid); //拥有者id
				params.put("disk_space", "212"); //网盘大小，以G计算
				params.put("disk_name", "appSysDick");
				params.put("owner_type", "1"); //拥有者类型 0-个人，1-组织
				params.put("disk_type", "0"); //网盘类型，0-公开，1-私密
				params.put("owner_name", "appSysDick"); //拥有者名字
				params.put("disk_decribe", "appSysDick"); //网盘描述
			}
			
			IDocDiskDomain docDiskDomain = (IDocDiskDomain) ServiceFactory.getService("IDocDiskDomain");
			int res = docDiskDomain.addDocDisk(params); //增加网盘，成功返回网盘id，否则0或者-1
			String diskId = "";
			if(res == 0) {
				result.put("success", 0);
				result.put("info", "网盘创建失败");
				return result;
			} else if(res < 0) {
				Map<String,Object> param = new HashMap<String,Object>();
				param.put("owner_id", uid);
				param.put("owner_type", "1");
				param.put("name", "appSysDick");
				Map diskInfo = docDiskDomain.getDocDisk(param);
				if(Validator.isEmpty(diskInfo) || Validator.isEmpty(diskInfo.get("disk_id"))) {
					result.put("success", 0);
					result.put("info", "错误：无法获取已创建网盘的信息！");
					return result;
				}
				diskId = String.valueOf(diskInfo.get("disk_id"));
			} else {
				diskId = String.valueOf(res);
			}
			//保存网盘信息
			XdataService.put(app_sys_disk_id_key, diskId);
			if(Validator.isEmpty(app_sys_disk_params)) {
				try {
					XdataService.put(app_sys_disk_params_key, JsonUtils.convertToString(params));
				} catch (IOException e) {
					log.error(e.getMessage());
				}
			}
			result.put("success", 1);
			result.put("info", diskId);
			return result;
		}*/
		/**
		 * 为应用创建网盘
		 * @param appId
		 * @param appAlias
		 * @param uid
		 * @return
		 */
		/*public static Map<String,Object> createAppDockDisk(String appId, String appAlias, String uid) {
			Map<String,Object> result = new HashMap<String,Object>();
			if(Validator.isEmpty(appId)) {
				result.put("success", 0);
				result.put("info", "无效的应用ID参数");
				return result;
			}
			if(Validator.isEmpty(appAlias)) {
				result.put("success", 0);
				result.put("info", "无效的应用名称参数");
				return result;
			}
			if(Validator.isEmpty(uid)) {
				result.put("success", 0);
				result.put("info", "无效的用户ID参数");
				return result;
			}
			Map<String,Object> paramDisk = new HashMap<String,Object>();
			paramDisk.put("uid", uid); //当前用户id
			paramDisk.put("owner_id", uid); //拥有者id
			paramDisk.put("disk_space", "212"); //网盘大小，以G计算
			paramDisk.put("disk_name", "appDisk_"+appId);
			paramDisk.put("owner_type", "1"); //拥有者类型 0-个人，1-组织
			paramDisk.put("disk_type", "0"); //网盘类型，0-公开，1-私密
			paramDisk.put("owner_name", "appDisk_"+appAlias); //拥有者名字
			paramDisk.put("disk_decribe", "appDisk_"+appAlias); //网盘描述
			
			IDocDiskDomain docDiskDomain = (IDocDiskDomain) ServiceFactory.getService("IDocDiskDomain");
			int addRes = docDiskDomain.addDocDisk(paramDisk);
			if(addRes == 0) {
				result.put("success", 0);
				result.put("info", "错误：应用网盘创建失败！");
				return result;
			}
			String diskId = "";
			if(addRes < 0) {
				Map<String,Object> param = new HashMap<String,Object>();
				param.put("owner_id", uid);
				param.put("owner_type", "1");
				param.put("name", "appDisk_"+appId);
				Map diskInfo = docDiskDomain.getDocDisk(param);
				if(Validator.isEmpty(diskInfo) || Validator.isEmpty(diskInfo.get("disk_id"))) {
					result.put("success", 0);
					result.put("info", "错误：无法获取已创建网盘的信息！");
					return result;
				}
				diskId = String.valueOf(diskInfo.get("disk_id"));
			} else {
				diskId = String.valueOf(addRes);
			}
			//保存应用和disk的关联，在ac_app_info表的addtional_info字段
			try{
				IAppAdminService appAdminService = DevServiceUtil.appAdminService;
				Map param = new HashMap();
				Map tmp = new HashMap();
				tmp.put("disk_id", diskId);
				param.put("additional_information", tmp);
				appAdminService.updateApp(Integer.parseInt(appId),param);
			}catch(Exception e){
				log.error("ACUtil.createAppDockDisk保存app与disk_id的关联关系失败",e);
				result.put("success", 0);
				result.put("info", "错误：应用网盘创建失败！");
				return result;
			}
			result.put("success", 1);
			result.put("info", diskId);
			return result;
		}*/
	
}
