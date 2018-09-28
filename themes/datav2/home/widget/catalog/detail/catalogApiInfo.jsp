<%@ page trimDirectiveWhitespaces="true" %>
<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8" buffer="none" %>
<%@ taglib uri="/tags/website" prefix="website" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="/tags/website-function" prefix="fn"%>

<!----- API服务详情部分 ---->
<div class="m-dt-main">
    <div class="dt-content">
        <div class="dt-section">
            <div class="dt-sec-content">
                <div class="dt-api-info">
                    <label>调试工具：</label>
                    <a href="/devweb/developer/serviceTest.htm?service_id=${obj.service_id }" target="_blank"><i class="fa fa-link" aria-hidden="true"></i>API调试工具</a>
                </div>
                <div class="dt-api-info">
                    <label>接口地址：</label>
                    <span id="api_address" >${ obj.service_url}</span>
                </div>
                <div class="dt-api-info">
                    <label>请求方式：</label>
                    <span id="http_type">${ obj.http_method}</span>
                </div>
                			    <div class="dt-api-info">
			                        	<label>请求参数</label>
									<table id="datatable_input" class="m-table table-bordered dt-table">
												<thead>
													<tr>
														<th>参数名称</th>
														<th>参数类型</th>
														<th>是否必填</th>
														<th>参数描述</th>
													</tr>
												</thead>
												<tbody>
												
												<c:forEach var="item" items="${obj.additional_info.parameter_desc}">
												<tr style="margin-top: 10px;" class="var-tr">
													<td>
														<input type="text" class="form-control" id="param_name" name="param_name" value="${item.name}">
													</td>
													<td>
														<select class="form-control input-inline  select3me" id="param_type" name="param_type">
															<c:choose>
																<c:when test="${item.type eq 'string'}">
																	<option value="string" selected="selected">字符型</option>	
																</c:when>
																<c:otherwise>
																	<option value="string">字符型</option>
																</c:otherwise>
																</c:choose>
																<c:choose>
																	<c:when test="${item.type eq 'number'}">
																		<option value="number" selected="selected">数值型</option>	
																	</c:when>
																	<c:otherwise>
																		<option value="number">数值型</option>
																	</c:otherwise>
																</c:choose>
																<c:choose>
																	<c:when test="${item.type eq 'boolean'}">
																		<option value="boolean" selected="selected">布尔型</option>	
																	</c:when>
																	<c:otherwise>
																		<option value="boolean">布尔型</option>
																	</c:otherwise>
																</c:choose>
														</select>
													</td>
													<td>
														<select class="form-control input-inline  select2me" id="param_requires" name="param_requires">
															<c:choose>
																<c:when test="${item.requires eq '1' }">
																	<option value="1" selected="selected">必填</option>
																	<option value="0">可选</option>
																</c:when>
																<c:otherwise>
																	<option value="1">必填</option>
																	<option value="0" selected="selected">可选</option>
																</c:otherwise>
															</c:choose>
														</select>
													</td>
													<td >
														<input type="text" class="form-control" id="param_description" name="param_description" value="${item.description}">
													</td>													
												</tr>
												</c:forEach>
												
												</tbody>
											</table>
											<span class="help-block">配置服务请求参数</span>
			                        </div>
			                        
			                        <div class="dt-api-info">
			                        		<label>返回参数</label>
									<table id="datatable_output"
										class="m-table table-bordered dt-table" style="margin-bottom: 0">
										<thead>
										<tr>
											<th>字段名称</th>
											<th>字段描述</th>																					
										</tr>
										</thead>
										<tbody>
										<c:forEach var="item" items="${obj.additional_info.result_desc }">
												<tr>
													<td>
											  ${item.name }
														
													</td>
													<td>
														${item.description }
													</td>													
												</tr>
												</c:forEach>
											
										</tbody>
									</table>
									<span class="help-block">配置服务返回参数</span>
			                        </div>
                <div class="dt-api-info">
                    <label>请求示例：</label>
                    <div>
                        <pre class="brush: java;" id="requestDemo">
String httpUrl = "http://apis.baidu.com/showapi_open_bus/express/express_search";
String httpArg = "com=shentong&nu=968018776110";
String jsonResult = request(httpUrl, httpArg);
System.out.println(jsonResult);

/**
 * @param urlAll
 *            :请求接口
 * @param httpArg
 *            :参数
 * @return 返回结果
 */
public static String request(String httpUrl, String httpArg) {
    BufferedReader reader = null;
    String result = null;
    StringBuffer sbf = new StringBuffer();
    httpUrl = httpUrl + "?" + httpArg;

    try {
        URL url = new URL(httpUrl);
        HttpURLConnection connection = (HttpURLConnection) url
                .openConnection();
        connection.setRequestMethod("GET");
        // 填入apikey到HTTP header
        connection.setRequestProperty("apikey",  "您自己的apikey");
        connection.connect();
        InputStream is = connection.getInputStream();
        reader = new BufferedReader(new InputStreamReader(is, "UTF-8"));
        String strRead = null;
        while ((strRead = reader.readLine()) != null) {
            sbf.append(strRead);
            sbf.append("\r\n");
        }
        reader.close();
        result = sbf.toString();
    } catch (Exception e) {
        e.printStackTrace();
    }
    return result;
}
                        </pre>
                    </div>
                </div>
                <div class="dt-api-info">
                    <label>JSON返回示例：</label>
                    <div>
                        <pre class="brush: javascript;" id="returnDemo">
{
	"showapi_res_code": 0, //系统级调用是否成功 。0为成功，其他失败
	"showapi_res_error": "",//失败时的中文描述
	"showapi_res_body": {
		"mailNo": "968018776110",//快递单号
		"update": 1466926312666, //更新时间的long型
		"updateStr": "2016-06-26 15:31:52", //更新时间的字符串型
		"ret_code": 0, //0为业务成功，需要扣点数
		"flag": true,//是否成功的布尔型
		"status": 4, //状态值，-1 待查询，0 查询异常，1 暂无记录，2 在途中，3 派送中，4 已签收，5 用户拒签，6 疑难件，7 无效单，8 超时单，9 签收失败，10 退回
		"tel": "400-889-5543", //快递公司电话
		"expSpellName": "shentong", //快递公司代码
		"data": [
			{
				"time": "2016-06-26 12:26",
				"context": "已签收,签收人是:【本人】"
			},
			{
				"time": "2016-06-25 15:31",
				"context": "【陕西陇县公司】的派件员【西城业务员】正在派件"
			},
			{
				"time": "2016-06-25 14:11",
				"context": "快件已到达【陕西陇县公司】"
			},
			{
				"time": "2016-06-25 09:08",
				"context": "由【陕西宝鸡公司】发往【陕西陇县公司】"
			},
			{
				"time": "2016-06-24 14:08",
				"context": "由【陕西西安中转部】发往【陕西宝鸡公司】"
			},
			{
				"time": "2016-06-22 13:23",
				"context": "由【山东临沂公司】发往【陕西西安中转部】"
			},
			{
				"time": "2016-06-21 23:02",
				"context": "【江苏常熟公司】正在进行【装袋】扫描"
			},
			{
				"time": "2016-06-21 23:02",
				"context": "由【江苏常熟公司】发往【江苏江阴航空部】"
			},
			{
				"time": "2016-06-21 18:30",
				"context": "【江苏常熟公司】的收件员【严继东】已收件"
			},
			{
				"time": "2016-06-21 16:41",
				"context": "【江苏常熟公司】的收件员【凌明】已收件"
			}
		],
		"expTextName": "申通快递" //快递公司中文名
	}
}
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script>
    function apiTabInit(){
    	var service_id;
    	
        $('.dt-api-list>ul>li').click(function () {
        	debugger;
            $(this).addClass('active').siblings().removeClass('active');
            service_id = $(this).attr('id');
            
           
        });
    }
</script>