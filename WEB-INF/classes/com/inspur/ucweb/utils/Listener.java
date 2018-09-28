package com.inspur.ucweb.utils;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionAttributeListener;
import javax.servlet.http.HttpSessionBindingEvent;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

import org.apache.log4j.Logger;

import com.inspur.utils.UserUtils;


public class Listener implements HttpSessionListener,HttpSessionAttributeListener,ServletContextListener {

	private static Logger log = Logger.getLogger(Listener.class);
	
	/**
	 * 有新session创建时触发
	 */
	@Override
	public void sessionCreated(HttpSessionEvent event) {
	}

	/**
	 * 有session销毁时触发
	 */
	@Override
	public void sessionDestroyed(HttpSessionEvent event) {

		HttpSession session = event.getSession();
		Object uid = session.getAttribute("uid");
		
		//将当前用户设置为 未登录 状态
 		if(uid != null){
 			UserUtils.getUserLoginDomain().updateIsOnLine(Integer.parseInt(String.valueOf(uid)), false);
 			if(log.isDebugEnabled()){
 				log.debug(uid+"下线了");
 			}
 		}
	}

	/**
	 * session新增属性时触发
	 */
	@Override
	public void attributeAdded(HttpSessionBindingEvent event) {
		
		//新增加的属性key
		String name = event.getName();
		if("uid".equals(name)){
			String uid = String.valueOf(event.getValue());//新增加的属性value
			if(log.isDebugEnabled()){
 				log.debug(uid+"上线了");
 			}
		}
		
	}

	@Override
	public void attributeRemoved(HttpSessionBindingEvent arg0) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void attributeReplaced(HttpSessionBindingEvent arg0) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void contextDestroyed(ServletContextEvent arg0) {
		if(log.isDebugEnabled()){
			log.debug("stop ucweb");
		}
	}

	@Override
	public void contextInitialized(ServletContextEvent arg0) {
		if(log.isDebugEnabled()){
				log.debug("start ucweb");
			}
		try {
			UserUtils.getUserLoginDomain().clearOnlineUser();
		} catch (Exception e) {
			log.error("重启ucweb，清理在线用户失败！", e);
		}
	}

}
