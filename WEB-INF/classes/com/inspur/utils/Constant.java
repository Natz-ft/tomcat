/*
 * @FileName: [Constant.java] 
 * @Package com.inspur.utils 
 * 
 * 
 * Copyright (c) 2011-2016 Inspur.
 * All rights reserved.
 * 
 * This software is the confidential and proprietary 
 * information of Inspur Technology Limited Company
 * ("Confidential Information"). You shall not disclose 
 * such Confidential Information and shall use it only
 * in accordance with the terms of the contract agreement 
 * you entered into with RKY.
 * 
 * $Rev$
 * $LastChangedDate$
 * $LastChangedBy$
 * 
 * @category inspur-opendata
 * @version 1.0
 * @author <a href=mailto:yinyin@inspur.com></a><br>
 *
 * Change History:[Formatter: author date description] <br>
 * 1
 * 2
 * 3
*/


package com.inspur.utils;

/**
 * <br>
 * <strong>Title :</strong> Constant.java
 * <br>
 * <strong>Description : 常量类</strong>
 * <br>
 * <br>
 * <strong>For Examples :</strong>
 * <br>
 * <strong>Create on : 2017年4月20日 上午9:55:11<br></strong>
 * <p>
 * <strong>Copyright (C) Inspur Co.,Ltd.<br></strong>
 * <p>
 * @author <a href=mailto:yinyin@inspur.com></a><br>
 * @version <strong>V1.0</strong>
 * <PRE>
 * </PRE>
 * -------------------------------------------<br>
 * Change History:[Formatter: author date description] <br/>
 * 1<br>
 * 2<br>
 * 3<br>
 */
public class Constant {
	public static String USER_LEVEL_NORMAL = "0"; // 普通用户
	public static String USER_LEVEL_AUTHEN_APPLYED = "1"; //表示准实名制用户
	public static String USER_LEVEL_AUTHEN_PASSED = "2";// 认证通过用户
	public static String USER_TYPE_PERSONAL = "11";// 个人用户
	public static String USER_TYPE_COMPANY = "21";// 企业用户
	public static String CATALOG_OPEN_TYPE_ALL = "1";// 无条件开放
	public static String CATALOG_OPEN_TYPE_AUTHEN = "3";// 授权开放
	public static int CATALOG_APPLY_STATUS_TODO = 0;// 待审批
	public static int CATALOG_APPLY_STATUS_AGREED = 1;// 审批通过
	public static int CATALOG_APPLY_STATUS_REFUSED = 2;// 审批驳回
}
