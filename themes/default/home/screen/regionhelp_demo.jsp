<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<style>
.tab-pane {
	padding-top: 15px;
}
</style>

<div class="row">
	<div class="col-lg-12">
		<section class="panel">
			<header class="panel-heading"> 选择行政区划 </header>
			<div class="panel-body">

				<input type="text" id="regionCode"> <input type="text"
					id="regionName">
				<button data-toggle="modal" class="btn btn-info"
					id="selectRegionBtn" data-multiselect="false" data-showlevel="4"
					data-target='#selectRegionModal'>选择行政区划</button>


			</div>
		</section>
	</div>
</div>

<c:import
	url="${fn:getConfValue('global.index.odweb')}/public/selectRegionModel.htm?isWidget=true" />

<script>
$(function() {
	$('body').on('dmp-region-selected', function(e, data) {
		
		// selectregionBtn
		var triggerId = data.triggerId,
		
		   regions = data.data;
		
		if(regions.length == 0) {
			$('#regionCode').val('');
			$('#regionName').val('');
		} else {
			console.log(regions[0]);
			$('#regionCode').val(regions[0].code);
            $('#regionName').val(regions[0].name);
		}
		
	});
})

</script>














