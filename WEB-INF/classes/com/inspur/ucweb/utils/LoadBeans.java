package com.inspur.ucweb.utils;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.inspur.hsf.config.spring.proxy.SpringProviderBean;
import com.inspur.hsf.service.common.utils.ServiceConfigUtils;
import com.inspur.hsf.service.rpc.bootstrap.ServiceExporter;

public class LoadBeans{
	private static ApplicationContext context;
	private static boolean inited = false;
	static Log log = LogFactory.getLog(LoadBeans.class);
	/**
	 * 获取bean容器context
	 * @return
	 */
	public static ApplicationContext getApplicationContext(){
		if(!inited){
			init();
		}
		return context;
	}
	
	/**
	 * 应用初始化
	 */
	public static void init(){
		if(!inited){
			context = new ClassPathXmlApplicationContext("conf/*.xml");//FileSystemXmlApplicationContext("conf/*.xml");//
			//exportServices(context);
			inited = true;
		}
	}
	
	private static void exportServices(ApplicationContext context){
		if(context == null){
			return;
		}
		
		String[] beanNames = context.getBeanNamesForType(SpringProviderBean.class);
		for(int i = 0; i < beanNames.length; i++){
			SpringProviderBean bean = null;
			try{
				bean = (SpringProviderBean) context.getBean(beanNames[i], SpringProviderBean.class);
			} catch (Exception e){
				log.error("创建javabean：  " + beanNames[i] + "出错！", e);
			}
			
			if(bean == null){
				continue;
			}
			
			try{
				if (bean.getInterfaceName() == null) {
					throw new RuntimeException("属性值interfaceName不能为空");
				}
				if (bean.getTarget() == null) {
					throw new RuntimeException("属性值target不能为空");
				}
				//加载配置文件服务发布的配置
				bean.setServiceConfig(null);
				//bean.getServiceConfig().addParam("appServerId", (String) context.getServletContext().getAttribute("appServerId"));
				ServiceExporter exporter = new ServiceExporter(bean.getServiceConfig());
				String registryHost = ServiceConfigUtils.getString("registry.host");
				String registryPort = ServiceConfigUtils.getString("registry.port");
				if (registryHost != null && registryPort != null
						&& (bean.getToRegistry() == null || "true".equals(bean.getToRegistry())))
					exporter.exportAndRegistry(bean.getTarget(), bean.getInterfaceName());
				else
					exporter.export(bean.getTarget(), bean.getInterfaceName());
			}catch (Throwable t){
				log.error("发布服务出错，出错服务： " + bean.getServiceName() + "！", t);
			}
		}
	}

}
