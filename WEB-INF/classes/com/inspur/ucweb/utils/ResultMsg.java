package com.inspur.ucweb.utils;

import com.inspur.data.common.utils.StringUtils;

/**
 * 执行返回消息体实体对象
 * <br>
 * <strong>Title :</strong> ResultMsg.java
 * <br>
 * <strong>Description : </strong>
 * <br>
 * <strong>For Examples :</strong>
 * <br>
 * <strong>Create on : 2015年6月6日 上午9:32:50<br></strong>
 * <p>
 * <strong>Copyright (C) Inspur Co.,Ltd.<br></strong>
 * <p>
 * @author <a href=mailto:haowenxiang@inspur.com>haowx</a><br>
 * @version <strong>V1.0</strong>
 * <PRE>
 * </PRE>
 * -------------------------------------------<br>
 * Change History:[Formatter: author date description] <br/>
 * 1<br>
 * 2<br>
 * 3<br>
 */
public class ResultMsg {
	/**
	 * 状态码
	 */
	private String result_code;
	/**
	 * 消息体
	 */
	private String result_msg;
	public String getResult_code() {
		return result_code;
	}
	public void setResult_code(String result_code) {
		this.result_code = result_code;
	}
	public String getResult_msg() {
		return result_msg;
	}
	public void setResult_msg(String result_msg) {
		this.result_msg = result_msg;
	}
	@Override
	public String toString() {
		String msg = "";
		if(StringUtils.isNotBlank(result_code)){
			msg +="状态码："+result_code;
		}
		if(StringUtils.isNotBlank(result_code)){
			msg +="&nbsp;结果描述："+result_msg;
		}
		return msg;
	}
}
