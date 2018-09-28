package com.inspur.ucweb.utils;

import java.util.Map;

public interface IOrganizationListener 	{
	
	//新增组织机构
	public String addOrganization(Map<String,Object> param);
	
	//编辑组织机构
	public String editOrganization(Map<String,Object> param);
	
	//删除组织机构
	public String delOrganization(Map<String,Object> param);
}
