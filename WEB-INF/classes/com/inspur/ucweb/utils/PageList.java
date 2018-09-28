package com.inspur.ucweb.utils;

import java.util.ArrayList;
import java.util.List;

/**
 * dataTable公用分页处理类
 * <br>
 * <strong>Title :</strong> PageUtils.java
 * <br>
 * <strong>Description : </strong>
 * <br>
 * <strong>For Examples :</strong>
 * <br>
 * <strong>Create on : 2014年12月22日 上午8:54:54<br></strong>
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
public class PageList<T> {
	
	private List<T> data;
	private int draw;
	private int recordsTotal;
	private int recordsFiltered;
	public List<T> getData() {
		if(data==null) data = new ArrayList<T>();
		return data;
	}
	public void setData(List<T> data) {
		this.data = data;
	}
	public int getDraw() {
		return draw;
	}
	public void setDraw(int draw) {
		this.draw = draw;
	}
	public int getRecordsTotal() {
		return recordsTotal;
	}
	public void setRecordsTotal(int recordsTotal) {
		this.recordsTotal = recordsTotal;
	}
	public int getRecordsFiltered() {
		return recordsFiltered;
	}
	public void setRecordsFiltered(int recordsFiltered) {
		this.recordsFiltered = recordsFiltered;
	}
}
