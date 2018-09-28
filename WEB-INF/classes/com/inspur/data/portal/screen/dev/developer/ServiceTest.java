package com.inspur.data.portal.screen.dev.developer;

import java.io.IOException;
import java.io.InputStream;
import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.NameValuePair;
import org.apache.commons.httpclient.methods.PostMethod;
import org.apache.commons.httpclient.params.HttpMethodParams;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.loushang.internet.view.ViewHandler;

import com.inspur.common.utils.PropertiesUtil;
import com.inspur.data.common.utils.PropertiesUtils;
import com.inspur.data.common.web.ParamUtil;
import com.inspur.paas.api.oam.IServiceManageService;
import com.inspur.utils.AuditLogUtil;
import com.inspur.utils.OamUtils;

import net.sf.json.JSONObject;

public class ServiceTest implements ViewHandler {
	private static Log log = LogFactory.getLog(ServiceTest.class);
	 private static IServiceManageService serviceManage = OamUtils.getServiceManageService();
	private static String DEVSERVICE_URL = PropertiesUtils.getValue("conf.properties",
			"servicetest.devservice.context");

	public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try {
			String service_id = ParamUtil.getString(request, "service_id", "");
			if (service_id != null && !service_id.equals("")) {
				Map serviceInfo = serviceManage.getServiceInfoById(service_id);
				request.setAttribute("serviceInfo", serviceInfo);
				if (serviceInfo != null && serviceInfo.containsKey("additional_info")
						&& serviceInfo.get("additional_info") != null) {
					JSONObject add_info = JSONObject.fromObject(serviceInfo.get("additional_info").toString());
					request.setAttribute("additional_info", add_info);
				}
			}
		} catch (Exception exp) {
			exp.printStackTrace();
		} finally {
			//记录页面访问日志
			AuditLogUtil.addPageVisitAutiLog(request, "服务测试", "");
		}
	}

	public void doTestService(HttpServletRequest request, HttpServletResponse response) throws IOException {
		InputStream input = null;
		ServletOutputStream output = null;
		try {
			if (DEVSERVICE_URL != null) {
				String service_id = request.getParameter("serviceId");
				Map info = serviceManage.getServiceInfoById(service_id);
				response.reset();
				if (info != null) {
					String context = info.get("context").toString();
					String version = info.get("version_name").toString();
					String URI = DEVSERVICE_URL + "/test/" + context + "/" + version + "?siteCode=0";
					HttpClient httpClient = new HttpClient();
					httpClient.getParams().setParameter(HttpMethodParams.HTTP_CONTENT_CHARSET, "UTF-8");
					// 设置 HttpClient 接收 Cookie,用与浏览器一样的策略
					// httpClient.getParams().setCookiePolicy(CookiePolicy.BROWSER_COMPATIBILITY);
					PostMethod postMethod = new PostMethod(URI);
					NameValuePair[] pairs = getRequestParams(request);
					postMethod.setRequestBody(pairs);
					// 报空
					httpClient.executeMethod(postMethod);
					input = postMethod.getResponseBodyAsStream();
					output = response.getOutputStream();
					byte buf[] = new byte[1024];
					int len = 0;
					while ((len = input.read(buf, 0, 1024)) > 0) {
						output.write(buf, 0, len);
					}
				}
			}
		} catch (Exception exp) {
			exp.printStackTrace();
		} finally {
			if (null != input) {
				try {
					input.close();
				} catch (IOException e) {
					log.error(e);
				}
			}
			if (null != output) {
				try {
					output.close();
				} catch (IOException e) {
					log.error(e);
				}
			}
		}
	}

	/**
	 * 获取请求参数
	 * 
	 * @param request
	 * @return
	 */
	private NameValuePair[] getRequestParams(HttpServletRequest request) {
		boolean isV6Theme = false;
		try {
			String theme = PropertiesUtil.getValue("frame.properties", "frame.theme");
			if ("v6.xsm".equals(theme)) {
				isV6Theme = true;
			}
		} catch (Exception exp) {
			isV6Theme = false;
			exp.printStackTrace();
		}
		Map<String, String[]> params = request.getParameterMap();
		Set<Entry<String, String[]>> entries = params.entrySet();
		int len = entries.size(), index = 0;
		NameValuePair[] pairs;
		if (isV6Theme) {
			pairs = new NameValuePair[len + 2];
		} else {
			pairs = new NameValuePair[len + 1];
		}
		Iterator<Entry<String, String[]>> it = entries.iterator();
		boolean isSetSessionUid = false;
		while (it.hasNext()) {
			Entry<String, String[]> entry = it.next();
			String key = entry.getKey();
			if ("session_uid".equals(key)) {
				isSetSessionUid = true;
			}
			Object val = entry.getValue();
			String value[] = null;
			if (val instanceof String[]) {
				value = (String[]) val;
			} else if (val instanceof String) {
				value = new String[] { (String) val };
			} else {
				value = new String[] { val.toString() };
			}
			pairs[index] = new NameValuePair();
			pairs[index].setName(key);
			pairs[index].setValue(value[0]);
			++index;
		}
		if (isV6Theme) {
			pairs[index] = new NameValuePair();
			pairs[index].setName("siteCode");
			pairs[index].setValue("0");
			++index;
		}
		HttpSession session = request.getSession(false);
		if (session != null && !isSetSessionUid) {
			Object uidObj = session.getAttribute("uid");
			pairs[index] = new NameValuePair();
			pairs[index].setName("session_uid");
			String uid = uidObj == null ? null : uidObj.toString();
			pairs[index].setValue(uid);
		}
		return pairs;
	}

}
