package com.inspur.ucweb.utils;

import org.apache.commons.lang.StringUtils;

public class RequestParam {
	private int page;
	private int pageSize;
	private String orderParam;
	private String orderDir;
	private String sorting;

	public String getSorting() {
		return this.sorting;
	}

	public void setSorting(String sorting) {
		if (StringUtils.isNotBlank(this.orderParam))
			if (StringUtils.isNotBlank(this.orderDir))
				this.sorting = (this.orderParam + " " + this.orderDir);
	}

	public int getPage() {
		return this.page;
	}

	public void setPage(int page) {
		this.page = page;
	}

	public int getPageSize() {
		return this.pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public String getOrderParam() {
		return this.orderParam;
	}

	public void setOrderParam(String orderParam) {
		this.orderParam = orderParam;
	}

	public String getOrderDir() {
		return this.orderDir;
	}

	public void setOrderDir(String orderDir) {
		this.orderDir = orderDir;
	}
}