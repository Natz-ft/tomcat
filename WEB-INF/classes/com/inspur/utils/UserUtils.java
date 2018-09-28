package com.inspur.utils;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.inspur.hsf.config.ServiceFactory;
import com.inspur.openserivce.IUCUserOpenService;
/*import com.inspur.mc.api.IFollowDomain;*/
import com.inspur.portal.model.base.Dict;
import com.inspur.portal.service.base.DictService;
import com.inspur.portal.service.base.SystemConfigService;
import com.inspur.portal.widget.IWidgetDomain;
import com.inspur.uc.api.audit.AuditLogService;
import com.inspur.uc.api.file.IFileDomain;
import com.inspur.uc.api.history.IHistoryDomain;
import com.inspur.uc.api.menu.IMenuDomain;
import com.inspur.uc.api.organization.OrganizationService;
import com.inspur.uc.api.organization.RegionInfoService;
import com.inspur.uc.api.privilege.IPrivilegeDomain;
import com.inspur.uc.api.privilege.IResourceDomain;
import com.inspur.uc.api.privilege.service.UcDataPermissionService;
import com.inspur.uc.api.relation.IFriendsDomain;
import com.inspur.uc.api.relation.IRelationDomain;
import com.inspur.uc.api.relation.IUserOrganDomain;
import com.inspur.uc.api.role.IRoleDomain;
import com.inspur.uc.api.security.ISecurityPasswordDomain;
import com.inspur.uc.api.user.IOrganDomain;
import com.inspur.uc.api.user.IPersonDomain;
import com.inspur.uc.api.user.IUserBindDomain;
import com.inspur.uc.api.user.IUserDomain;
import com.inspur.uc.api.user.IUserExtendDomain;
import com.inspur.uc.api.user.IUserLoginDomain;
import com.inspur.uc.api.user.IUserOutBindDomain;
import com.inspur.uc.api.validation.IValidationDomain;

/**
 * 用户中心获取服务接口
 * <br>
 * <strong>Title :</strong> UserUtils.java
 * <br>
 * <strong>Description : </strong>
 * <br>
 * <strong>For Examples :</strong>
 * <br>
 * <strong>Create on : 2017年2月14日 下午2:33:44<br></strong>
 * <p>
 * <strong>Copyright (C) Inspur Co.,Ltd.<br></strong>
 * <p>
 * @author <a href=mailto:miaozhq@inspur.com></a><br>
 * @version <strong>V1.0</strong>
 * <PRE>
 * </PRE>
 * -------------------------------------------<br>
 * Change History:[Formatter: author date description] <br/>
 * 1<br>
 * 2<br>
 * 3<br>
 */
public class UserUtils {
	
	private static Log log = LogFactory.getLog(UserUtils.class);
	
	private static IUserDomain userDomain;
    private static DictService dictService;
    private static OrganizationService organizationService;
    private static RegionInfoService regionInfoService;
    private static SystemConfigService systemConfigService;
    private static IUserExtendDomain userExtendDomain;
    private static IUserLoginDomain userLoginDomain;
    private static ISecurityPasswordDomain securityPasswordDomain;
    /*private static IFollowDomain followDomain;*/
    private static IFriendsDomain friendsDomain;
    private static IUserBindDomain userBindDomain;
    private static IPersonDomain personDomain;
    private static AuditLogService auditLogService;
    private static IUserOrganDomain userOrganDomain;
    private static IFileDomain fileDomain;
    private static IRelationDomain relationDomain;
    private static IOrganDomain organDomain;
    private static IUserOutBindDomain outBindDomain;
    private static IResourceDomain resourceDomain;
    private static IPrivilegeDomain privilegeDomain;
    private static IValidationDomain validationDomain;
    private static IHistoryDomain historyDomain;
    private static IMenuDomain menuDomain;
    private static UcDataPermissionService ucDataPermissionService;
    private static IRoleDomain roleDomain;
    private static IWidgetDomain widgetDomain;
    public static final String CACHE_UC_DICT_ = "cache_uc_dict_";
    private static IUCUserOpenService userOpenService;
    
    static{
    	try{
    		userDomain = (IUserDomain) ServiceFactory.getService("uc.IUserDomain");
            dictService = (DictService) ServiceFactory.getService("dictService");
            organizationService = (OrganizationService) ServiceFactory.getService("organizationService");
            regionInfoService = (RegionInfoService) ServiceFactory.getService("regionInfoService");
            systemConfigService = (SystemConfigService)ServiceFactory.getService("systemConfigService");
            userExtendDomain = (IUserExtendDomain) ServiceFactory.getService("uc.IUserExtendDomain");
            userLoginDomain = (IUserLoginDomain) ServiceFactory.getService("uc.IUserLoginDomain");
            securityPasswordDomain = (ISecurityPasswordDomain) ServiceFactory.getService("uc.ISecurityPasswordDomain");
            
            friendsDomain = (IFriendsDomain) ServiceFactory.getService("uc.IFriendsDomain");
            userBindDomain = (IUserBindDomain) ServiceFactory.getService("uc.IUserBindDomain");
            personDomain = (IPersonDomain) ServiceFactory.getService("uc.IPersonDomain");
            auditLogService = (AuditLogService) ServiceFactory.getService("auditLogService");
            userOrganDomain = (IUserOrganDomain) ServiceFactory.getService("uc.IUserOrganDomain");
            relationDomain = (IRelationDomain) ServiceFactory.getService("uc.IRelationDomain");
            organDomain = (IOrganDomain) ServiceFactory.getService("uc.IOrganDomain");
            outBindDomain = (IUserOutBindDomain) ServiceFactory.getService("uc.IUserOutBindDomain");
            resourceDomain = (IResourceDomain) ServiceFactory.getService("uc.IResourceDomain");
            privilegeDomain = (IPrivilegeDomain) ServiceFactory.getService("uc.IPrivilegeDomain");
            validationDomain = (IValidationDomain) ServiceFactory.getService("uc.IValidationDomain");
            historyDomain = (IHistoryDomain) ServiceFactory.getService("uc.IHistoryDomain");
            menuDomain = (IMenuDomain) ServiceFactory.getService("uc.IMenuDomain");
            ucDataPermissionService = (UcDataPermissionService) ServiceFactory.getService("ucDataPermissionService");
            roleDomain = (IRoleDomain) ServiceFactory.getService("uc.IRoleDomain");
            widgetDomain = (IWidgetDomain) ServiceFactory.getService("uc.IWidgetDomain");
            /*followDomain = (IFollowDomain) ServiceFactory.getService("uc.IFollowDomain");*/
            userOpenService = (IUCUserOpenService) ServiceFactory.getService("uc.IUCUserOpenService");
    	}catch(Exception e){
    		log.error("UserUtils获取服务失败", e);
    	}
    }


	public static IUCUserOpenService getUserOpenService() {
		return userOpenService;
	}
	public static IUserDomain getUserDomain() {
		return userDomain;
	}
	public static DictService getDictService() {
		return dictService;
	}
	public static OrganizationService getOrganizationService() {
		return organizationService;
	}
	public static RegionInfoService getRegionInfoService() {
		return regionInfoService;
	}
	public static SystemConfigService getSystemConfigService() {
		return systemConfigService;
	}
	
    /**
	 * 获取指定字典项的值
	 * 
	 * @param type 类型
	 * @param code 编码
     * @return 
	 * @return 字典项的值
	 */
	 public static String getDictItemValue(String type,String code){
	    	String result = "";
			try {
				String cacheKey = new StringBuilder(CACHE_UC_DICT_).append(type).append("_").append(code).toString();
				result = (String)CacheManager.get(cacheKey);
				if (result == null) {
					Dict dict = UserUtils.getDictService().findDict(type, code);
			        if (dict != null) {
			        	result =  dict.getItemValue();
			        	CacheManager.set(cacheKey, result);
			        }
				}
			} catch (Exception e) {
				log.error("getDictItemValue(" + type + ","+code +")", e);
			}
			return result;
	    }
	public static IUserExtendDomain getUserExtendDomain() {
		return userExtendDomain;
	}
	public static IUserLoginDomain getUserLoginDomain() {
		return userLoginDomain;
	}
	public static ISecurityPasswordDomain getSecurityPasswordDomain() {
		return securityPasswordDomain;
	}
	/*public static IFollowDomain getFollowDomain() {
		return followDomain;
	}*/
	public static IFriendsDomain getFriendsDomain() {
		return friendsDomain;
	}
	public static IUserBindDomain getUserBindDomain() {
		return userBindDomain;
	}
	public static IPersonDomain getPersonDomain() {
		return personDomain;
	}
	public static AuditLogService getAuditLogService() {
		return auditLogService;
	}
	public static IUserOrganDomain getUserOrganDomain() {
		return userOrganDomain;
	}
	public static IFileDomain getFileDomain() {
		return fileDomain;
	}
	public static IRelationDomain getRelationDomain() {
		return relationDomain;
	}
	public static IOrganDomain getOrganDomain() {
		return organDomain;
	}
	public static IUserOutBindDomain getOutBindDomain() {
		return outBindDomain;
	}
	public static IResourceDomain getResourceDomain() {
		return resourceDomain;
	}
	public static IPrivilegeDomain getPrivilegeDomain() {
		return privilegeDomain;
	}
	public static IValidationDomain getValidationDomain() {
		return validationDomain;
	}
	public static IHistoryDomain getHistoryDomain() {
		return historyDomain;
	}
	public static IMenuDomain getMenuDomain() {
		return menuDomain;
	}
	public static UcDataPermissionService getUcDataPermissionService() {
		return ucDataPermissionService;
	}
	public static IRoleDomain getRoleDomain() {
		return roleDomain;
	}
	public static IWidgetDomain getWidgetDomain() {
		return widgetDomain;
	}

}
