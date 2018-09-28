<%@ page trimDirectiveWhitespaces="true" %>
<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8" buffer="none" %>
<%@ taglib uri="/tags/website" prefix="website" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="func" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<div class="m-dt-intro">
    <div class="dt-intro-img">
        <!-- 此处使用base64码显示图片，动态化后直接显示图片url即可 -->
        <image src="data:image/png;base64,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" />
    </div>
    <div class="dt-intro-operate" style="width:350px">
    	<ul>
            <li class="dt-btn-share bdsharebuttonbox">
                <a href="#" class="bds_more" data-cmd="more">
                    <i class="fa fa-share-alt" aria-hidden="true"></i><span>分享</span>
                </a>
            </li>
        </ul>
		<ul>
			<li class="dt-btn-collection bdsharebuttonbox" style="margin-left: 20px">
				<i class="fa fa-briefcase"></i> <c:choose>
					<c:when test="${0 == isFav}">
						<span id="collection" onclick="collection()">收藏</span>
						<span id="cancelCollection" onclick="cancleCollection()"
							style="display: none;"> 已收藏</span>
					</c:when>
					<c:otherwise>
						<span id="collection" onclick="collection()"
							style="display: none;">收藏</span>
						<span id="cancelCollection" onclick="cancleCollection()">
							已收藏</span>
					</c:otherwise>
				</c:choose>
			</li>
		</ul>
		<ul>
        	<li class="dt-btn-correct bdsharebuttonbox" style="margin-left: 20px"  id="corBtn">
		   		<i class="fa fa-times"></i><span>纠错</span>
			</li>
		</ul>
		<c:if test="${1 == isShowApplyBtn}">
		  	<ul>
	        	<li id="apply" class="dt-btn-sub" style="margin-left: 20px"  id="corBtn">
			   		<i class="fa fa-hand-o-right"></i><span>
			   		<c:choose>  
					   <c:when test="${'0003' == isApply || '0009' == isApply}">
								申请
					   </c:when>  
					   <c:otherwise> 已申请 
					   </c:otherwise>  
					</c:choose> 
			   		</span>
				</li>
		 	</ul>
		</c:if>
    </div>
    <div class="dt-intro-main">
        <div class="dt-intro-title">
            <span class="dt-intro-name" id="dataCatalogTitle">${openCatalog.cata_title }</span>
            <c:choose>           	
            	<c:when test="${!empty openCatalog.conf_catalog_format}">           	
            		<c:if test="${func:contains(openCatalog.conf_catalog_format, '2') }"><span class="wid-format dt-xml">XML</span></c:if>
            		<c:if test="${func:contains(openCatalog.conf_catalog_format, '3') }"><span class="wid-format dt-json">JSON</span></c:if>
            		<c:if test="${func:contains(openCatalog.conf_catalog_format, '5') }"><span class="wid-format dt-lbs">LBS</span></c:if>
            		<c:if test="${func:contains(openCatalog.conf_catalog_format, '1') }"><span class="wid-format dt-xls">XLS</span></c:if>
            		<c:if test="${func:contains(openCatalog.conf_catalog_format, '4') }"><span class="wid-format dt-csv">CSV</span></c:if>
            	</c:when>
            	<c:otherwise>
                     <span></span>               	
                </c:otherwise>
            </c:choose>
        </div>
        <div class="dt-intro-row">
            <div class="dt-intro-info">
                <label>数据来源：</label>
                <span>${openCatalog.org_name }</span>
            </div>
            <div class="dt-intro-info">
                <label>开放属性：</label>
                <span>${openCatalogFromDict.open_type}</span>
            </div>
        </div>
        <div class="dt-intro-row">
            <div class="dt-intro-info">
           	 	
	            <c:if test="${func:contains(openCatalog.conf_use_type, '1') || func:contains(openCatalog.conf_use_type, '4')}">
					<label>数据总量：</label><span>${empty openCatalog.catalogStatistic || empty openCatalog.catalogStatistic.data_count? 0:openCatalog.catalogStatistic.data_count}</span>
				</c:if>
				<c:if test="${func:contains(openCatalog.conf_use_type, '2')}">
					<label>文件数：</label><span>${empty openCatalog.catalogStatistic || empty openCatalog.catalogStatistic.file_count? 0:openCatalog.catalogStatistic.file_count}</span>
				</c:if>
				<c:if test="${func:contains(openCatalog.conf_use_type, '3')}">
					<label>接口数量：</label><span>${empty openCatalog.catalogStatistic ||empty openCatalog.catalogStatistic.api_count? 0:openCatalog.catalogStatistic.api_count}</span>
				</c:if>
            </div>
            <div class="dt-intro-info">
                <label>所属主题：</label>
                <span>${cataLogGroupsStr}</span>
            </div>
            <div class="dt-intro-info">
                <label>所属行业：</label>
                <span>${cataLogIndustrysStr}</span>
            </div>
        </div>
        <div class="dt-intro-row">
            <div class="dt-intro-info">
                <label>发布时间：</label>
                <span>
                	<fmt:formatDate value="${openCatalog.conf_released_time}"
														type="both" />
				</span>
            </div>
            <div class="dt-intro-info">
                <label>更新时间：</label>
                <span>${openCatalog.update_time }</span>
            </div>
            <div class="dt-intro-info">
                <label>更新频率：</label>
                <span>${openCatalogFromDict.conf_update_cycle}</span>
            </div>
        </div>
    </div>
</div>

<!-- 纠错Modal -->
<div class="modal fade modal-ui dt-modal-correct" id="correctModal" tabindex="-1" role="dialog"
     aria-labelledby="correctModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                        aria-hidden="true">×</span></button>
                <h4 class="modal-title" id="correctModalLabel">数据集纠错</h4>
            </div>
            <div class="modal-body">
                <form class="m-form" action="" id="form_advance">
                    <div class="form-row">
                        <label class="form-label"><em>*</em>问题类别</label>

                        <div class="form-content">
                            <!--HTML部分-->
                            <select>
                                <option value="">请选择</option>
                                <option value="1">数据与实际情况不符</option>
                                <option value="2">资源过时</option>
                                <option value="3">数据无法下载</option>
                                <option value="4">其他</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-row">
                        <label class="form-label"><em>*</em>问题描述</label>

                        <div class="form-content">
                            <textarea rows="4" class="m-input"></textarea>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="m-btn btn-warning" id="correctionBtn" >提交</button>
                <button type="button" class="m-btn btn-default" data-dismiss="modal">取消</button>
            </div>
        </div>
    </div>
</div>
<script>
var correctionSubmit_url = "${fn:getLink('interact/correctionFd.do') }?method=addCorrection";

    $(function () {
		//  纠错
		$("#corBtn").click(function() {
			if (!isLogged()) {
				showLoginDialog();
				return;
			}
			$('#correctModal').modal('show');
		});
		//  纠错关闭
		$("#closeBtn").click(function() {
			$("#desc").val("");
			$('#correctModal').modal('hide');
		});
    	
        //分享功能
        window._bd_share_config = {
            "common": {
                "bdSnsKey": {},
                "bdText": "",
                "bdMini": "2",
                "bdMiniList": ["mshare", "qzone", "tsina", "weixin", "tqq", "douban", "sqq", "copy"],
                "bdPic": "",
                "bdStyle": "0",
                "bdSize": "16"
            }, "share": {}
        };
        with (document)0[(getElementsByTagName('head')[0] || body).appendChild(createElement('script')).src = 'http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion=' + ~(-new Date() / 36e5)];


       /*  //订阅功能，根据是否有active样式判断是否订阅
        $('.dt-btn-sub').click(function () {
            if ($(this).hasClass('active')) {
                $(this).removeClass('active').find('span').text('订阅');
            }
            else {
                $(this).addClass('active').find('span').text('已订阅');
            }
        }); */


    });
    
	$("#correctionBtn").click(function() {
		var desc = $("#desc").val();
		var visit_url = $("#visit_url").find("option:selected").val();
		var cataid = "${cata_id}";
		var title = $("#dataCatalogTitle").html();
		var catacode = $("#catacode").val();

		if (desc == "") {
			dialog.info('请输入描述内容', function() {
			}, 2000);

		} else {
			$.ajax({
				url : correctionSubmit_url,
				type : "POST",
				data : {
					"desc" : desc,
					"cataid" : cataid,
					"visit_url" : visit_url,
					"title" : title
				},
				success : function(data) {
					dialog.info(data, function() {
					}, 2000);
					$('#correctModal').modal('hide');
					$("#desc").val("");
				},
				error : function(data) {
					dialog.info("网络错误！", function() {
					}, 2000);
				}
			});
		}

	});
	
	 //申请按钮单击
    $("#apply").click(function(){
    	var isApply = "${isApply}";
    	var applyTip = "${applyTip}";
    	if(isApply == "0000" || isApply == "0002"){
    		dialog.info(applyTip, function() {}, 2000);
    	}else if(isApply == "0001" || isApply == "0003" || isApply == "0004" || isApply == "0009"){
    		dialog.info(applyTip, function() {
    			var cataid = "${cata_id}";
            	var authen_level = "${authen_level}";
            	var partopen_user_level = "${partopen_user_level}";
            	var user_type = "${user_type}";
            	var cata_name = $("#cata_name").val();
            	var org_name = $("#org_name").val();
            	if (partopen_user_level == "0" || authen_level == partopen_user_level) { //认证等级一致
            		 window.location.href = "${fn:getLink('catalog/catalogApply.jsp')}" + "?cata_id=" + cataid;
            	} else {
            		dialog.info("请先进行实名认证！", function() {}, 2000);
            		if(user_type == "21"){//企业
            			window.location.href = "${fn:getConfValue('global.index.ucweb')}/account/OrgCertification.htm"
            		}
            	}
    			
    		}, 2000);
    		
    	}
    	
    });
</script>
 <!--  引用收藏功能 -->
<script src="${fn:getUrl('js/catalog/catalogInteract.js')}"></script>
