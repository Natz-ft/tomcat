package com.inspur.data.portal.widget.catalog;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.loushang.internet.util.JsonUtils;
import org.loushang.internet.view.ViewHandler;

import com.inspur.data.catalog.domain.catalog.CatalogAPI;
import com.inspur.data.catalog.domain.catalog.CatalogFile;
import com.inspur.data.catalog.domain.catalog.OpenCatalog;
import com.inspur.data.common.web.ParamUtil;
import com.inspur.utils.DataUtils;
import com.inspur.utils.OamUtils;

/**
 * 数据目录相关信息widget
 */
public class CatalogRelactionInfo implements ViewHandler {

	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
	}
    
}
