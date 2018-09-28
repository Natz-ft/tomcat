package com.inspur.utils;

public class AppDomainUtil {

	/**
	 * 初始创建（可以提交审核）
	 */
	public static final int STATE_CREATE = 0;
	/**
	 * 待审核
	 */
	public static final int STATE_PENDING = 1;
	/**
	 * 上线
	 */
	public static final int STATE_ONLINE = 2;
	/**
	 * 下线
	 */
	public static final int STATE_OFFLINE = 3;

	/**
	 * 驳回（可以重新提交审核）
	 */
	public static final int STATE_REJECT = 4;
	/**
	 * 审核通过
	 */
	public static final int STATE_PASSED = 5;
	
}
