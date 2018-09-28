<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="f" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>

<div style="float: left; text-align: center;" class="list_sub_title">
	<div class="data_sub_title divcheck" style="width: 100px;"
		id="data_sub_title1">
		<div class="pic">
			<a href="javaScript:void(0)" onmouseout="MM_swapImgRestore()"
				onmouseover="MM_swapImage('Image27','','${fn:getUrl('/img/catalog/detail/img_1-1.png')}',1)">
				<div class="icon icon1 icon1check" id="data_icon1"></div>
			</a>
		</div>
		<p>
			<a class="acheck" href="javaScript:void(0)" id="data_a1"
				onclick="showDataItems()">数据列表</a>
		</p>
	</div>

	<div class="data_sub_title" style="width: 100px;" id="data_sub_title2">
		<div class="pic">
			<a href="javaScript:void(0)" onmouseout="MM_swapImgRestore()"
				onmouseover="MM_swapImage('Image28','','${fn:getUrl('/img/catalog/detail/img_2-1.png')}',1)">
				<div class="icon icon2" id="data_icon2"></div>
			</a>
		</div>
		<p>
			<a href="javaScript:void(0)" id="data_a2">数据统计</a>
		</p>
	</div>

	<div class="data_sub_title" style="width: 100px;" id="data_sub_title3">
		<div class="pic">
			<a href="javaScript:void(0)" onmouseout="MM_swapImgRestore()"
				onmouseover="MM_swapImage('Image29','','${fn:getUrl('/img/catalog/detail/img_3-1.png')}.png',1)"><div
					class="icon icon3" id="data_icon3"></div></a>
		</div>
		<p>
			<a href="javaScript:void(0)" id="data_a3">数据可视化</a>
		</p>
	</div>

	<!-- 
	<div class="data_sub_title" style="width: 100px;" id="data_sub_title4">
		<div class="pic">
			<a href="javaScript:void(0)" onmouseout="MM_swapImgRestore()"
				onmouseover="MM_swapImage('Image30','','${fn:getUrl('/img/catalog/detail/img_4-1.png')}',1)"><div
					class="icon icon4" id="data_icon4"></div></a>
		</div>
		<p>
			<a href="javaScript:void(0)" id="data_a4">数据挖掘</a>
		</p>
	</div>
	 -->
</div>

<div style="float: left;" class="list_sub_content">
	<!-- 数据列表 -->
	<div class="data_sub_content">
		<div class="sjlb">
			<table class="tablelif" id="table2"></table>
			<div id="pager2"></div>
		</div>
	</div>

	<!-- 数据统计 -->
	<div class="data_sub_content">
		<div class="sjtj">
			<span class="golv golvsq" id="golvtg"></span>
			<ul class="ui_tabs_titles datamgr_tabs"
				style="margin-bottom: 0; margin-top: 0;">
				<a href="javaScript:void(0)"><li class="ksh1 ksh1check"
					id="ksh1sx">筛选</li></a>
				<a href="javaScript:void(0)"><li class="ksh1 " id="ksh1fz">分组</li></a>
				<!-- <div class="queding2 kshqd kshsubmit sjtjbtn">提交</div> -->
				<div class="queding2 kshqd kshreset sjtjbtn">还原</div>
			</ul>

		</div>
		<input id="itemCount" value="${f:length(miflist) }" type="hidden">
		<input id="meta_id" value="${dataCatalog.cata_id}" type="hidden">
		<div class="conshaifen">
			<div class="conshaixuan">
				<div class="txt sha1xuantxt">
					<div class="txtshaixuan">
						<span>请选择一个或多个数据项，并选择相关的筛选条件，筛选后的数据将会展示在下方的表格里。</span>
					</div>
					<a class="addshaixuan" id="addshaixuan1" href="#yhn"></a>
				</div>
				<a href="javaScript:void(0)"><div class="queding" id="queding">确定</div></a>
				<div class="sxtiaojian" id="sxtiaojian">
					<div class="myhiden" name="hiden">
						<div class="mytiaojianhiden">
							<div>
								筛选项 <select name="key1">
									<c:forEach var="item" items="${miflist}">
										<option value="${item.meta_column_name_en}"
											type="${item.data_type}">${item.name_cn}</option>
									</c:forEach>
								</select>
							</div>
							<div>
								条件 <select name="condition1">
									<option value="5">模糊匹配(like)</option>
									<option value="1">等于</option>
									<option value="2">不等于</option>
									<option value="3">大于</option>
									<option value="4">小于</option>
									<option value="6">包含(in)</option>
									<option value="7">不包含(not in)</option>
								</select>
							</div>
							<div>
								参数 <input type="text" name="value1" />
							</div>
						</div>
					</div>

					<div class="my" name="options">没有筛选条件</div>

					<div id="tables"></div>
				</div>

				<div class="txt">
					<p>
						<em style="color: red; margin-right: 5px;">*</em>筛选条件选择为包含(in)或不包含(not
						in)，多个参数间用中文逗号(，)隔开。
					</p>
				</div>
			</div>
			<div class="confenzu">
				<div class="txtfenzu">你可以选择一个或多个分组项和统计项进行数据分组，你也可以选择一个或多个排序项进行数据排序，对应的统计结果将会展示在下方的表格里。</div>
				<a href="javaScript:void(0)" id="tjqueding"><div
						class="queding fenzuqueding">确定</div></a>
				<div class="listfenzu">
					<div class="titfenzu titt" id="groups">
						<div>
							分组<a class="addshaixuan" id="addshaixuan2" href="#y3n"></a>
						</div>
						<div class="kshcontent" type="part1">
							<div class="kshxuxian">
								<div class="kshshujuxiang">
									<div>
										数据项 <select name="key2">
											<c:forEach var="item" items="${miflist}" varStatus="stauts">
												<option value="${item.meta_column_name_en}">${item.name_cn}</option>
											</c:forEach>
										</select>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="tittongji titt" id="dataStatistic">
						<div>
							统计<a class="addshaixuan" href="#y1n" id="addshaixuan3"></a>
						</div>
						<div class="kshcontent" type="part2">
							<div class="kshxuxian">
								<div class="kshshujuxiang">
									<c:choose>
										<c:when test="${null !=  miflist}">
											<div>
												数据项 <select name="key3">
													<c:set var="fieldType" value=""></c:set>
													<c:forEach var="item" items="${miflist}" varStatus="status">
														<c:if test="${status.count == 1 }">
															<c:set var="fieldType" value="${item.data_type}"></c:set>
														</c:if>
														<option value="${item.meta_column_name_en}"
															type="${item.data_type}">${item.name_cn}</option>
													</c:forEach>
												</select>
											</div>
											<div name="fieldTypeCondition">
												条件
												<c:choose>
													<c:when
														test="${'double' == fieldType ||  'number' == fieldType || 'int' == fieldType}">
														<select name="value3">
															<option value="1" selected="selected">个数(COUNT)</option>
															<option value="2">平均值(AVG)</option>
															<option value="3">总和(SUM)</option>
															<option value="4">最大值(MAX)</option>
															<option value="5">最小值(MIN)</option>
														</select>
													</c:when>
													<c:otherwise>
														<span style="margin-left: 24px; color: orange">个数(count)</span>
													</c:otherwise>
												</c:choose>
											</div>
										</c:when>
									</c:choose>
								</div>
							</div>
						</div>
					</div>
					<div class="titpaixu titt" id="orderType">
						<div>
							排序<a class="addshaixuan" href="#y2n" id="addshaixuan4"></a>
						</div>
						<div class="kshcontent" type="logDiv">
							<div class="kshxuxian">
								<div class="kshshujuxiang" name="orderShujuxiang">没有排序条件</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="contable" id="tableDiV">
			<table class="tablesxfz" id="table1"></table>
			<div id="pager1"></div>
		</div>
	</div>

	<!-- 数据可试化 -->
	<div class="data_sub_content kshlist">
		<div class="sjtj">
			<ul class="ui_tabs_titles datamgr_tabs"
				style="margin-bottom: 0; margin-top: 0;">
				<li class="ksh2">可视化</li>
				<div class="queding2 kshqd kshsubmit sjksh">提交</div>
				<div class="queding2 kshqd kshreset sjksh">还原</div>
			</ul>

		</div>
		<div class="txt">
			<p>请在数据统计中对数据分组、排序或筛选后再选择合适的图形展示。当然，你也可以直接在这里选择统计项。</p>
		</div>
		<div class="queding2 kshqd" id="kshqd" onclick="statisticDataShow()">确定</div>
		<div class="tblx">
			<div class="top1">
				<strong>图表类型</strong>
			</div>
			<div class="tu_1">
				<ul id="picTypeUl"
					style="overflow: hidden; float: left; width: 700px;">
					<li><a id="clickduihao1" href="javaScript:void(0)"
						onmouseout="MM_swapImgRestore()"
						onmouseover="MM_swapImage('Image31','','${fn:getUrl('/img/catalog/detail/tb_1_1.png')}',1)"><img
							src="${fn:getUrl('/img/catalog/detail/tb_1.png')}" name="Image31"
							width="60" height="60" border="0" id="Image31" /><span
							class="sjml_duihao" id="duihao1"><i class="skin_on"></i></span><span>饼状图</span></a></li>
					<li><a id="clickduihao2" href="javaScript:void(0)"
						onmouseout="MM_swapImgRestore()"
						onmouseover="MM_swapImage('Image26','','${fn:getUrl('/img/catalog/detail/tb_2_1.png')}',1)"><img
							src="${fn:getUrl('/img/catalog/detail/tb_2.png')}" name="Image26"
							width="60" height="60" border="0" id="Image26" /><span
							class="sjml_duihao" id="duihao2"></span><span>柱状图</span></a></li>
					<li><a id="clickduihao3" href="javaScript:void(0)"
						onmouseout="MM_swapImgRestore()"
						onmouseover="MM_swapImage('Image32','','${fn:getUrl('/img/catalog/detail/tb_3_1.png')}',1)"><img
							src="${fn:getUrl('/img/catalog/detail/tb_3.png')}" name="Image32"
							width="60" height="60" border="0" id="Image32" /><span
							class="sjml_duihao" id="duihao3"></span><span>曲线图</span></a></li>
					<li><a id="clickduihao4" href="javaScript:void(0)"
						onmouseout="MM_swapImgRestore()"
						onmouseover="MM_swapImage('Image33','','${fn:getUrl('/img/catalog/detail/tb_4_1.png')}',1)"><img
							src="${fn:getUrl('/img/catalog/detail/tb_4.png')}" name="Image33"
							width="60" height="60" border="0" id="Image33" /><span
							class="sjml_duihao" id="duihao4"> </span><span>树形图</span></a></li>
					<li><a id="clickduihao5" href="javaScript:void(0)"
						onmouseout="MM_swapImgRestore()"
						onmouseover="MM_swapImage('Image33','','${fn:getUrl('/img/catalog/detail/tb_5_1.png')}',1)"><img
							src="${fn:getUrl('/img/catalog/detail/tb_5.png')}" name="Image33"
							width="60" height="60" border="0" id="Image33" /><span
							class="sjml_duihao" id="duihao5"> </span><span>散点图</span></a></li>
					<li><a id="clickduihao6" href="javaScript:void(0)"
						onmouseout="MM_swapImgRestore()"
						onmouseover="MM_swapImage('Image33','','${fn:getUrl('/img/catalog/detail/tb_6_1.png')}',1)"><img
							src="${fn:getUrl('/img/catalog/detail/tb_6.png')}" name="Image33"
							width="60" height="60" border="0" id="Image33" /><span
							class="sjml_duihao" id="duihao6"> </span><span>流图</span></a></li>
				</ul>
				<input type="hidden" id="picTypeText" value="0" />
			</div>
		</div>
		<br />

		<div class="txt">

			<div class="kshtiaojian">
				<div class="kshtitle">条件</div>
				<div class="kshcontent">
					<div class="kshxuxian">
						<div class="kshshujuxiang" id="kshtj">
							<c:forEach var="item" items="${miflist}">
								<c:if
									test="${'double' == item.data_type ||  'number' == item.data_type || 'int' == item.data_type}">
									<c:set value="1" var="flag"></c:set>
								</c:if>
							</c:forEach>
							<c:choose>
								<c:when test="${null !=  miflist  && '1' == flag}">
									<div>
										数据项 <select id="tjSelect" name="1">
											<c:forEach var="item" items="${miflist}">
												<option value="${item.meta_column_name_en}">${item.name_cn}</option>
											</c:forEach>
										</select>
									</div>
									<div class="addsjztj">
										数据值 <select id="tjSelectCount" name="2">
											<c:forEach var="item" items="${miflist}">
												<c:if
													test="${'double' == item.data_type ||  'number' == item.data_type || 'int' == item.data_type}">
													<option value="${item.meta_column_name_en}">${item.name_cn}</option>
												</c:if>
											</c:forEach>
										</select>
									</div>
								</c:when>
								<c:otherwise>
									<p class="empty-tip">
										请在<a style="color: blue" href="javaScript:void(0)"
											id="goToGroups">数据统计</a>中设置统计条件
									</p>
								</c:otherwise>
							</c:choose>
							<div id="xyzhou"></div>
						</div>
						<div class="kshshujuxiang" id="kshtj2" style="display: none">
							<c:forEach var="item" items="${miflist}">
								<c:if
									test="${'double' == item.data_type ||  'number' == item.data_type || 'int' == item.data_type}">
									<c:set value="1" var="flag"></c:set>
								</c:if>
							</c:forEach>
							<c:choose>
								<c:when test="${null !=  miflist  && '1' == flag}">
									<div id='selectKeyDiv'>
										数据项 <select id="tjSelect" name="1">
											<c:forEach var="item" items="${miflist}">
												<option value="${item.meta_column_name_en}">${item.name_cn}</option>
											</c:forEach>
										</select>
									</div>
									<div class="addsjztj" id='selectValueDiv'>
										数据值 <select id="tjSelectCount" name="2">
											<c:forEach var="item" items="${miflist}">
												<c:if
													test="${'double' == item.data_type ||  'number' == item.data_type || 'int' == item.data_type}">
													<option value="${item.meta_column_name_en}">${item.name_cn}</option>
												</c:if>
											</c:forEach>
										</select>
									</div>
									<div class="addsxtj">添加数据值</div>
								</c:when>
								<c:otherwise>
									<p class="empty-tip">
										请在<a style="color: blue" href="javaScript:void(0)"
											id="goToGroups">数据统计</a>中设置统计条件
									</p>
								</c:otherwise>
							</c:choose>
							<div id="xyzhou"></div>
						</div>
					</div>
				</div>
			</div>
			<div class="kshdiv" id="kshdiv">
				<div class="kshdraw" id="kshdraw"></div>
				<div class="queding" id="kshfh">返回</div>
			</div>
		</div>
	</div>

	<!-- 数据挖掘 -->
	<!-- 
	<div class="data_sub_content">
		<div class="sjwj_main">
			<div class="sjwj_up">
				<img src="${fn:getUrl('/img/catalog/detail/wj_title.jpg')}" border="0"/>
				<div>数据挖掘（英语：Data mining），又译为资料探勘、数据采矿。它是数据库知识发现（英语：Knowledge-Discovery in Databases，简称：KDD)中的一个步骤。数据挖掘一般是指从大量的数据中通过算法搜索隐藏于其中信息的过程。数据挖掘通常与计算机科学有关，并通过统计、在线分析处理、情报检索、机器学习、专家系统（依靠过去的经验法则）和模式识别等诸多方法来实现上述目标。</div>
			</div>
			<div class="sjwj_down"></div>
		</div>
		<img src="${fn:getUrl('/img/catalog/sjwj1.png')}" border="0"/>
	</div>
	 -->
</div>
<div class="screenmubu"></div>
<div class="modalkuang">
	<a class="i_close"></a>
	<p>请为这个新的数据集命名：</p>
	<input size="30" id="new_cata_name" maxlength="100"> <input
		type="hidden" id="newCataVeiwType">
	<div class="modal_btn">
		<a class="btn-qd" id="addNewCata">确定</a> <a class="btn-qx">取消</a>
	</div>
</div>