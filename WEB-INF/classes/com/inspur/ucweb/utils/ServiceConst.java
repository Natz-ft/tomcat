package com.inspur.ucweb.utils;

import org.apache.log4j.Logger;

import com.inspur.hsf.config.ServiceFactory;
import com.inspur.portal.service.user.UserOperationLogService;

/**
 * 服务工厂类
 */
public class ServiceConst {
    private static Logger log = Logger.getLogger(ServiceConst.class);

    /**
     * 捕获异常，防止一个bean初始化失败影响其他bean的正常初始化
     * 
     * @param bean_id
     * @return
     */
    private static Object getService(String bean_id) {
        Object res = null;
        try {
            res = ServiceFactory.getService(bean_id);
            log.debug("初始化{" + bean_id + "}成功");
        } catch (Throwable e) {
            log.error("初始化{" + bean_id + "}失败", e);
        }
        return res;
    }

    // UC 后端服务
   /* public static IUserDomain getUC_IUserDomain() {
        return (IUserDomain) getService("uc.IUserDomain");
    }

    public static IUserOrganDomain getUC_IUserOrganDomain() {
        return (IUserOrganDomain) getService("uc.IUserOrganDomain");
    }

    public static IHistoryDomain getUC_IHistoryDomain() {
        return (IHistoryDomain) getService("uc.IHistoryDomain");
    }

    public static IUserLoginDomain getUC_IUserLoginDomain() {
        return (IUserLoginDomain) getService("uc.IUserLoginDomain");
    }

    public static ISecurityPasswordDomain getUC_ISecurityPasswordDomain() {
        return (ISecurityPasswordDomain) getService("uc.ISecurityPasswordDomain");
    }

    public static IValidationDomain getUC_IValidationDomain() {
        return (IValidationDomain) getService("uc.IValidationDomain");
    }

    public static IUserExtendDomain getUC_IUserExtendDomain() {
        return (IUserExtendDomain) getService("uc.IUserExtendDomain");
    }

    public static IOrganDomain getUC_IOrganDomain() {
        return (IOrganDomain) getService("uc.IOrganDomain");
    }

    public static IPersonDomain getUC_IPersonDomain() {
        return (IPersonDomain) getService("uc.IPersonDomain");
    }

    public static IRelationDomain getUC_IRelationDomain() {
        return (IRelationDomain) getService("uc.IRelationDomain");
    }

    public static IFileDomain getUC_IFileDomain() {
        return (IFileDomain) getService("uc.IFileDomain");
    }

    public static IUserOutBindDomain getUC_IUserOutBindDomain() {
        return (IUserOutBindDomain) getService("uc.IUserOutBindDomain");
    }

    public static IUserBindDomain getUC_IUserBindDomain() {
        return (IUserBindDomain) getService("uc.IUserBindDomain");
    }

    public static IFriendsDomain getUC_IFriendsDomain() {
        return (IFriendsDomain) getService("uc.IFriendsDomain");
    }

    public static IFollowDomain getUC_IFollowDomain() {
        return (IFollowDomain) getService("uc.IFollowDomain");
    }

    public static IBlackListDomain getUC_IBlackListDomain() {
        return (IBlackListDomain) getService("uc.IBlackListDomain");
    }

    public static IPublicUserDomain getUC_IPublicUserDomain() {
        return (IPublicUserDomain) getService("uc.IPublicUserDomain");
    }

    public static IGroupCategoryDomain getUC_IGroupCategoryDomain() {
        return (IGroupCategoryDomain) getService("uc.IGroupCategoryDomain");
    }

    public static IGroupDomain getUC_IGroupDomain() {
        return (IGroupDomain) getService("uc.IGroupDomain");
    }

    public static IGroupMemberDomain getUC_IGroupMemberDomain() {
        return (IGroupMemberDomain) getService("uc.IGroupMemberDomain");
    }

    public static IRoleDomain getUC_IRoleDomain() {
        return (IRoleDomain) getService("uc.IRoleDomain");
    }

    public static ILoginStatisticsDomain getUC_ILoginStatisticsDomain() {
        return (ILoginStatisticsDomain) getService("uc.ILoginStatisticsDomain");
    }

    public static IPhoneUtil getUC_IPhoneUtil() {
        return (IPhoneUtil) getService("uc.IPhoneUtil");
    }

    *//**
     * 新开发审计
     *//*
    public static NewAuditLogService getNewAuditLogService() {
        return (NewAuditLogService) getService("newAuditLogService");
    }

    *//**
     * portalservice
     *//*
    public static SystemConfigService getSystemConfigService() {
        return (SystemConfigService) getService("systemConfigService");
    }*/
    
    /**
     * 新开发审计，原来在uc的功能迁移到portal中
     */
    public static UserOperationLogService getUserOperationLogService() {
    	return (UserOperationLogService) getService("userOperationLogService");
    }
}
