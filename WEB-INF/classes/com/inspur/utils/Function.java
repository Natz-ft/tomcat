package com.inspur.utils;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.loushang.internet.bindingclass.ModuleBindingManager;
import org.loushang.internet.bindingclass.ThemeBindingManager;
import org.loushang.internet.context.ContextHolder;
import org.loushang.internet.util.RequestUtil;
import org.loushang.internet.util.StringUtils;
import org.loushang.internet.util.crypto.MD5Utils;

import com.inspur.data.common.utils.PropertiesUtils;

public class Function
{
  private static String appContext;
  private static String appRootUrl;
  private static String appRootUrl_https;
  private static String rootUrl;
  private static String fileUrl;
  private static String skinName = "/skins";
  private static String CONTENT_IMAGE_PREFIX = "img/etravel";
  private static boolean isInit = false;
  private static String serverName;

  public static void init()
  {
    HttpServletRequest request = ContextHolder.getRequest();
    appContext = request.getContextPath();

    ModuleBindingManager moduleMgr = ModuleBindingManager.getCurrentManager();

    String url = moduleMgr.getProperties("url");
    if (StringUtils.isEmpty(url))
    {
      if (!(request.getServerName().equals(serverName))) {
        StringBuffer sb = new StringBuffer();
        sb.append("http://");
        sb.append(request.getServerName());
        if (!("80".equals(Integer.valueOf(request.getServerPort())))) {
          sb.append(":");
          sb.append(request.getServerPort());
        }
        sb.append(appContext);
        appRootUrl = sb.toString();

        sb = new StringBuffer();
        sb.append("https://");
        sb.append(request.getServerName());
        sb.append(appContext);
        appRootUrl_https = sb.toString();

        serverName = request.getServerName();
      }

    }
    else
    {
      appRootUrl = url;
      appRootUrl_https = appRootUrl.replaceFirst("http://", "https://");
    }

    rootUrl = moduleMgr.getResourceUrl();
    if ((rootUrl == null) || (rootUrl.equals("")))
      rootUrl = appContext + skinName;
    else {
      rootUrl = appContext + rootUrl;
    }

    fileUrl = moduleMgr.getProperties("fileUrl");

    if ((fileUrl == null) || (fileUrl.equals(""))) {
      fileUrl = appContext;
    }

    isInit = true;
  }

  public static String getLink(String target)
  {
    if (!(isInit))
      init();

    if ((target == null) || ("".endsWith(target))) return "";
    target = target.replaceAll("\\.jsp", ".htm").replaceAll("\\.ftl", ".htm");
    String interContext = ModuleBindingManager.getCurrentManager().getContext
      ();

    if ((interContext != null) && (!("".equals(interContext))))
      interContext = "/" + interContext + "/";
    else {
      interContext = "/";
    }

    String rootUrl = rewriteUrl(appRootUrl) + interContext;

    target = (target.startsWith("/")) ? target.substring(1) : target;
    return rootUrl + target;
  }

  public static String getOtherLink(String target)
  {
    HttpServletRequest request = ContextHolder.getRequest();
    String appContext = request.getContextPath();
    String appRootUrl = null;
    ModuleBindingManager moduleMgr = ModuleBindingManager.getCurrentManager();

    String url = moduleMgr.getProperties("url");

    if (StringUtils.isEmpty(url))
    {
      StringBuffer sb = new StringBuffer();
      sb.append("http://");
      sb.append(request.getServerName());

      sb.append(appContext);
      appRootUrl = sb.toString();
    } else {
      appRootUrl = url;
    }

    target = target.replaceAll("\\.jsp", ".htm").replaceAll("\\.ftl", ".htm");

    String interContext = ModuleBindingManager.getCurrentManager().getContext
      ();

    if ((interContext != null) && (!("".equals(interContext))))
      interContext = "/" + interContext + "/";
    else {
      interContext = "/";
    }

    String rootUrl = rewriteUrl(appRootUrl) + interContext;

    target = (target.startsWith("/")) ? target.substring(1) : target;
    return rootUrl + target;
  }

  public static String getHttpsLink(String target)
  {
    if (!(isInit))
      init();

    target = target.replaceAll("\\.jsp", ".htm").replaceAll("\\.ftl", ".htm");
    String interContext = ModuleBindingManager.getCurrentManager().getContext
      ();

    if (target.startsWith("/")) {
      if ((interContext != null) && (!("".equals(interContext))))
        interContext = "/" + interContext;

    }
    else if ((interContext != null) && (!("".equals(interContext))))
      interContext = "/" + interContext + "/";
    else {
      interContext = "/";
    }

    return getLink(target);
  }

  public static String getCitySite()
  {
    HttpServletRequest request = ContextHolder.getRequest();
    String serverName = request.getServerName();
    String citySite = serverName.substring(0, serverName.indexOf("."));
    return citySite;
  }

  public static String getInnerLink(String target)
  {
    String viewPath = ModuleBindingManager.getCurrentManager().getViewPath();

    viewPath = viewPath + "/screen/";

    String ret = viewPath + target;
    ret = ret.replaceAll("//", "/");
    return ret;
  }

  public static String getHome()
  {
    if (!(isInit))
      init();

    return appRootUrl;
  }

  public static String getCurrentUrl()
  {
    String uri = ContextHolder.getRequestURI();
    if (uri == null) return null;

    if (!(isInit)) {
      init();
    }

    int pos = uri.lastIndexOf(".");
    if (pos > -1) {
      String suffix = uri.substring(pos + 1).toLowerCase();
      if (!("htm".equals(suffix))) {
        StringBuffer sb = new StringBuffer();
        sb.append(uri.substring(0, pos + 1)).append("htm");
        if (suffix.startsWith("html"))
          sb.append("html");
        else if (suffix.startsWith("jsp"))
          sb.append("jsp");
        else if (suffix.startsWith("js"))
          sb.append("js");
        else if ((suffix.startsWith("css")) || (suffix.startsWith("jpg")) || (suffix.startsWith("png")) || 
          (suffix.startsWith("gif")) || (suffix.startsWith("ico")) || (suffix.startsWith("swf")))
          sb.append(suffix.substring(0, 3));
        else
          sb.append("htm");

        uri = sb.toString();
      }
    }

    String rootUrl = ((uri.startsWith("http://")) || (uri.startsWith("https://"))) ? appRootUrl : appContext;

    uri = uri.replaceAll(rootUrl, rewriteUrl(rootUrl));

    return uri;
  }

  public static boolean isWidgetUrl(String url)
  {
    if (url == null) return false;

    Map paramMap = RequestUtil.parseParameterMap(url);
    if (paramMap != null) {
      Object widgetValue = paramMap.get("isWidget");
      String isWidget = "";
      if (widgetValue != null)
        if (widgetValue instanceof String[]) {
          String[] widgetValues = (String[])widgetValue;
          if (widgetValues.length > 0)
            isWidget = widgetValues[0];
        }
        else {
          isWidget = String.valueOf(widgetValue);
        }

      return "true".equalsIgnoreCase(isWidget);
    }

    return false;
  }

  private static String rewriteUrl(String rootUrl)
  {
    HttpServletRequest request = ContextHolder.getRequest();
    String frameRewrite = getFrameConf("frame.rewrite");
    rootUrl = (rootUrl == null) ? "" : rootUrl;
    rootUrl = (rootUrl.endsWith("/")) ? rootUrl.substring(0, rootUrl.length() - 1) : rootUrl;
    StringBuffer sb = new StringBuffer(rootUrl);

    if (("on".equalsIgnoreCase(frameRewrite)) || ("1".equalsIgnoreCase(frameRewrite))) {
      String pathParam = getFrameConf("frame.rewrite.pathmark");

      String pathValue = request.getParameter(pathParam);
      if ((pathValue != null) && (!("".equals(pathValue))))
      {
        String rewritePath = (pathValue.startsWith("/")) ? pathValue.substring(1) : pathValue;
        rewritePath = (rewritePath.endsWith("/")) ? rewritePath.substring(0, rewritePath.length() - 1) : rewritePath;
        sb.append("/").append(rewritePath);
        String spaceMark = getFrameConf("frame.rewrite.spacemark");
        spaceMark = (StringUtils.isNotEmpty(spaceMark)) ? spaceMark : "htm";

        sb.append("/").append(spaceMark);
      }
    }
    return sb.toString();
  }

  public static String getUrl(String url) {
    if (!(isInit))
      init();

    if (url.startsWith("http://")) {
      return url;
    }

    StringBuffer resUrl = new StringBuffer(appContext);
    if (!(url.startsWith("/")))
      resUrl.append("/");

    resUrl.append(url);
    return resUrl.toString();
  }

  public static String getContentImage(String key, int width, int height) {
    String imageurl = null;

    if ((key == null) || ("".equals(key))) {
      imageurl = getDefaultImage();
    }
    else
    {
      imageurl = getUrl(CONTENT_IMAGE_PREFIX + key);
    }
    return imageurl;
  }

  private static String getDefaultImage() {
    return getUrl("img/noimage.jpg");
  }

  public static String getFileUrl() {
    return fileUrl;
  }

  public static String getModuleValue(String key)
  {
    if (!(isInit))
      init();

    return ModuleBindingManager.getCurrentManager().getProperties(key);
  }

  public static String getFrameConf(String key)
  {
    return PropertiesUtils.getValue("frame.properties", key);
  }
  
  public static String getConfConf(String key){
	return PropertiesUtils.getValue("conf.properties", key);
	  
  }
}