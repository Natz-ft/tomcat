package com.inspur.uum;

import java.net.MalformedURLException;
import java.net.URL;
import java.rmi.RemoteException;
import java.util.Iterator;
import java.util.Map;

import javax.xml.namespace.QName;
import javax.xml.rpc.ServiceException;

import org.apache.axis.client.Call;
import org.apache.axis.client.Service;
import org.apache.axis.constants.Style;
import org.apache.axis.constants.Use;
import org.apache.log4j.Logger;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;

import com.inspur.ucweb.utils.ConfUtil;
import com.inspur.ucweb.utils.UcServiceUtil;
import com.inspur.utils.UserUtils;

public class UumUtil {

	private static Logger log = Logger.getLogger(UumUtil.class);

	private static StringBuilder sysXml = new StringBuilder(
			"<?xml version='1.0' encoding='UTF-8'?>")
			.append("<syncInfo><user><userId></userId><userName></userName>")
			.append("<accountStatus></accountStatus><employeeId></employeeId>")
			.append("<departmentId></departmentId><departmentName></departmentName>")
			.append("<coporationId></coporationId><corporationName></corporationName>")
			.append("<userSex></userSex><userDuty></userDuty><userBirthday></userBirthday>")
			.append("<userPost></userPost><userPostCode></userPostCode><userAlias></userAlias><userRank></userRank>")
			.append("<userPhone></userPhone><userHomeAddress></userHomeAddress><userMobilePhone></userMobilePhone>")
			.append("<userMailAddress></userMailAddress><userMSN></userMSN><userNt></userNt>")
			.append("<userCA></userCA><userPwd></userPwd><userClass></userClass><parentId></parentId></user>")
			.append("<operationType>UPDATE_USER</operationType></syncInfo>");

	/**
	 * 同步用户信息
	 * 
	 * @param uid
	 * @return
	 * @throws DocumentException
	 * @throws ServiceException
	 * @throws MalformedURLException
	 * @throws RemoteException
	 */
	@SuppressWarnings("rawtypes")
	public static boolean sysAccount(int uid) {
		try {
			Map user = UserUtils.getUserDomain().getUserByUid(uid);
			if ((Integer) user.get("user_type") == 11) {
				String xmlStr = dealUserXml(user);
				// 调用UUM webservice接口发送信息
				String namespace = "http://loushang.ws";
				Service service = new Service();
				Call _call = (Call) service.createCall();
				String webserviceUrl = ConfUtil
						.getUumConf("webservice.userInfo.url");
				_call.setTargetEndpointAddress(new URL(webserviceUrl));
				_call.setOperationStyle(Style.RPC);
				_call.setOperationUse(Use.LITERAL);
				// public boolean modifyUserInfo(String userId,String
				// userXml,String domainName)
				String msId = ConfUtil.getUumConf("MS_ID");
				_call.setOperationName(new QName(namespace, "modifyUserInfo"));
				String status = (String) _call.invoke(new Object[] {
						user.get("user_id"), xmlStr, msId });
				return "true".equals(status);
			}
		} catch (ServiceException e) {
			log.error("同步密码出错：" + e);
			return false;
		} catch (MalformedURLException e) {
			log.error("同步密码出错：" + e);
			return false;
		} catch (RemoteException e) {
			log.error("同步密码出错：" + e);
			return false;
		}
		return true;
	}

	/**
	 * 获取user信息拼装xml
	 * 
	 * @param user
	 * @return
	 * @throws DocumentException
	 */
	@SuppressWarnings("rawtypes")
	public static String dealUserXml(Map user) {
		try {
			Document doc = DocumentHelper.parseText(sysXml.toString());
			Element rootElement = doc.getRootElement();
			Element userElement = rootElement.element("user");

			String userName = (String) user.get("nick_name");
			if (userName != null && !"".equals(userName)) {
				userElement.element("userName").setText(userName);
			}

			String userId = (String) user.get("user_id");
			if (userId != null && !"".equals(userId)) {
				userElement.element("userId").setText(userId);
			}

			String password = (String) user.get("password");
			if (password != null && !"".equals(password)) {
				userElement.element("userPwd").setText(password);
			}

			int uid = (Integer) user.get("uid");

			dealPerson(uid, userElement);// 处理person信息
			dealUserExtend(uid, userElement);

			return doc.asXML();
		} catch (DocumentException e) {
			log.error("解析xml出错：" + e);
		}
		return "";
	}

	/**
	 * 获取person信息拼装xml
	 * 
	 * @param uid
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	public static void dealPerson(int uid, Element userElement) {
		Map personUser = UserUtils.getPersonDomain().getPersonByUid(uid);
		if (personUser != null) {
			String sex = (String) personUser.get("sex");// 获取性别
			if (sex != null && !"".equals(sex)) {
				userElement.element("userSex").setText(sex);
			}

			String birthday = (String) personUser.get("birthday");// 获取生日
			if (birthday != null && !"".equals(birthday)) {
				userElement.element("userBirthday").setText(birthday);
			}

			String address = (String) personUser.get("address");// 获取通信地址
			if (sex != null && !"".equals(sex)) {
				userElement.element("userHomeAddress").setText(address);
			}

			String zip_code = (String) personUser.get("zip_code");// 获取邮政编码
			if (sex != null && !"".equals(sex)) {
				userElement.element("userPostCode").setText(zip_code);
			}

			String phone = (String) personUser.get("phone");// 获取联系电话
			if (sex != null && !"".equals(sex)) {
				userElement.element("userPhone").setText(phone);
			}
		}
	}

	/**
	 * 获取user_extend扩展信息
	 * 
	 * @param uid
	 * @param userElement
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public static void dealUserExtend(int uid, Element userElement) {
		Map userExtend = UserUtils.getUserExtendDomain()
				.getUserExtendByUid(uid);// 获取user_extend信息
		if (userExtend != null) {
			Map.Entry<String, String> entry;
			String key;
			String value;
			Element element;
			Iterator<Map.Entry<String, String>> it = userExtend.entrySet()
					.iterator();
			while (it.hasNext()) {
				entry = it.next();
				key = entry.getKey();
				value = entry.getValue();
				if (value != null && !"".equals(value)) {
					element = userElement.element(key);
					if (element != null)
						element.setText(value);
				}
			}
		}
	}

	/**
	 * 同步密码(与统一用户管理系统)
	 * 
	 * @param uid
	 * @param newpassword
	 * @param oldpassword
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	public static boolean sysPassword(int uid, String newpassword,
			String oldpassword) {
		try {
			Map user = UserUtils.getUserDomain().getUserByUid(uid);
			if ((Integer) user.get("user_type") == 11) {
				String xmlStr;

				xmlStr = dealUserXml(user);
				// 调用UUM webservice接口发送信息
				String namespace = "http://loushang.ws";
				Service service = new Service();
				Call _call = (Call) service.createCall();
				String webserviceUrl = ConfUtil
						.getUumConf("webservice.userPwd.url");
				_call.setTargetEndpointAddress(new URL(webserviceUrl));
				_call.setOperationStyle(Style.RPC);
				_call.setOperationUse(Use.LITERAL);
				// public boolean modifyUserInfo(String userId,String
				// userXml,String domainName)
				String msId = ConfUtil.getUumConf("MS_ID");
				_call.setOperationName(new QName(namespace, "syncPassWord"));
				String status = (String) _call.invoke(new Object[] {
						user.get("user_id"), oldpassword, newpassword, msId,
						xmlStr });
				return "true".equals(status);
			}
		} catch (ServiceException e) {
			log.error("同步密码出错：" + e);
			return false;
		} catch (MalformedURLException e) {
			log.error("同步密码出错：" + e);
			return false;
		} catch (RemoteException e) {
			log.error("同步密码出错：" + e);
			return false;
		}
		return true;
	}

	/**
	 * 保存同步失败信息
	 * 
	 * @param uid
	 * @return
	 *//*
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public static int addSysUserFailure(int uid) {
		Map user = ServiceConst.getUC_IUserDomain().getUserByUid(uid);// 获取user信息
		Map sysUserFailure = new HashMap();
		sysUserFailure.put("uid", uid);
		sysUserFailure.put("operation_type", "UPDATE_USER");
		sysUserFailure.put("xml_text", dealUserXml(user));
		sysUserFailure.put("user_id", user.get("user_id"));
		return ServiceConst.getUC_IUserDomain().addUserSysFailure(
				sysUserFailure);
	}*/

}
