/*
 * @FileName: [RegionCodeUtil.java] 
 * @Package com.inspur.utils 
 * 
 * 
 * Copyright (c) 2011-2015 Inspur.
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
 * @author zhanghuayun@outlook.com<br>
 *
 * Change History:[Formatter: author date description] <br>
 * 1
 * 2
 * 3
*/


package com.inspur.utils;

import java.util.ArrayList;
import java.util.List;

import com.inspur.data.common.utils.StringUtils;

/**
 * 地区编码工具类
 * <br>
 * <strong>Title :</strong> RegionCodeUtil.java
 * <br>
 * <strong>Description : </strong>
 * <br>
 * <strong>For Examples :</strong>
 * <br>
 * <strong>Create on : 2014年12月28日 上午8:34:56<br></strong>
 * <p>
 * <strong>Copyright (C) Inspur Co.,Ltd.<br></strong>
 * <p>
 * @author  zhanghuayun@outlook.com<br>
 * @version <strong>V1.0</strong>
 * <PRE>
 * </PRE>
 * -------------------------------------------<br>
 * Change History:[Formatter: author date description] <br/>
 * 1<br>
 * 2<br>
 * 3<br>
 */
public class RegionCodeUtil {
	
	/**
	 * 判断地区是省还是市
	 * <br>
	 * <p>Description: 
	 * <br>
	 *  zhanghuayun@outlook.com<br>
	 * <p>Date: 2014年12月28日 上午8:38:28<br/>
	 * <p>
	 * @param regionCode
	 * @return   
	 * @see boolean
	 */
	public static boolean isProvince(String regionCode){
		if(StringUtils.isNotBlank(regionCode)){
			if("000".equals(regionCode.substring(3))){
				return true;
			}
		}
		return false;
	}
	
	/**
	 * 判断是否为国家
	 * <br>
	 * <p>Description: 
	 * <br>
	 *  zhanghuayun@outlook.com<br>
	 * <p>Date: 2014年12月28日 上午9:08:02<br/>
	 * <p>
	 * @param regionCode
	 * @return   
	 * @see boolean
	 */
	public static boolean isCountry(String regionCode){
		if(StringUtils.isNotBlank(regionCode) && "100000".equals(regionCode)){
			return true;
		}
		return false;
	}
	
	/**
	 * 获取父级ID
	 * <br>
	 * <p>Description: 
	 * <br>
	 *  zhanghuayun@outlook.com<br>
	 * <p>Date: 2014年12月28日 上午9:07:50<br/>
	 * <p>
	 * @param regionCode
	 * @return   
	 * @see String
	 */
	public static String getParentCode(String regionCode){
		if(isProvince(regionCode)){
			return "100000";
		}else if(isCountry(regionCode)){
			return null;
		}else{
			return regionCode.substring(0, 3) + "000";
		}
	}
	
	/**
	 * 队规获取父级地市ID
	 * <br>
	 * <p>Description: 
	 * <br>
	 *  zhanghuayun@outlook.com<br>
	 * <p>Date: 2014年12月28日 上午9:07:26<br/>
	 * <p>
	 * @param regionCode
	 * @return   
	 * @see List<String>
	 */
	public static List<String> getParentRgionList(String regionCode){
		List<String> regionList = null;
		if(isCountry(regionCode)){
			regionList = new ArrayList<String>();
			regionList.add(regionCode);
		}else if(isProvince(regionCode)){
			String parentRegionCode = getParentCode(regionCode);
			regionList = new ArrayList<String>();
			regionList.add(regionCode);
			regionList.add(parentRegionCode);
		}else{
			String parentRegionCode = getParentCode(regionCode);
			regionList = new ArrayList<String>();
			regionList.add(regionCode);
			regionList.add(parentRegionCode);
			regionList.add("100000");
		}
		return regionList;
	}
	
	public static void main(String[] args) {
		System.out.println(getParentCode("370100"));
	}

}
