package com.inspur.data.portal.screen.interact;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.loushang.internet.util.JsonUtils;

public abstract class DataTable {
	//获取前台DataTable的排序和分页信息	
	public Map<String, Object> getOrderAndLimit(HttpServletRequest request){
		Map<String, Object> param = new HashMap<String, Object>();
		String start = request.getParameter("start");
		String length = request.getParameter("length");
		String order_colum_index = request.getParameter("order[0][column]");
		String order_dir = request.getParameter("order[0][dir]");
		String _order = "";
		if(order_colum_index != null && order_dir != null){
			_order = request.getParameter("columns[" + Integer.parseInt(order_colum_index) + "][data]") + " " + order_dir;
		}
		start = start == null || "".equals(start) ? "0" : start;
		length = length == null || "".equals(length) ? "0" : length;
		Map<String, Object> _limit = new HashMap<String, Object>();
		_limit.put("_pstart", Integer.parseInt(start));
		_limit.put("_psize", Integer.parseInt(length));
		param.put("_order", _order);
		param.put("_limit", _limit);
		return param;
	}
	//转化Ajax请求数据为DataTable可接受的Json字符串形式
	public String getResponseString(HttpServletRequest request, int recordsTotal, int recordsFiltered, List<Map<String, Object>> data){
		if(data == null){
			data = new ArrayList<Map<String, Object>>();
		}
		String draw = request.getParameter("draw");
		draw = draw == null || draw == "" ? "0" : draw;
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("recordsTotal", recordsTotal);
		map.put("recordsFiltered", recordsFiltered);
		map.put("draw", Integer.parseInt(draw));
		map.put("data", data);
		try {
			return JsonUtils.convertToString(map);
		} catch (IOException e) {
			e.printStackTrace();
			return "";
		}
	}
	public String getResponseString(HttpServletRequest request, int recordsFiltered, List<Map<String, Object>> data){
		return getResponseString(request, recordsFiltered, recordsFiltered, data);
	}
	

}
