package com.inspur.ucweb.utils;

import java.util.Map;

public interface IUserListener 	{
	
	//新增用户
	public String addUser(Map<String,Object> param);
	
	//编辑用户
	public String editUser(Map<String,Object> param);
	
	//删除用户(更改用户状态，并不是做物理删除)
	public String updateUserState(Map<String,Object> param);
	
	//重置密码
	public String resetPWD(Map<String,Object> param);
}
