<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<script type="text/html" id="individualInfoTplforOutter" >
<div class="cate-head <?if(light_four){?>on<?}?>" title="附加信息">
	<span class="icons cate-icon"></span>
	<div class="cate-title">
		<p class="txt" style="cursor:pointer">附加信息</p>
		<p class="tip">请填写需要的附加信息</p>
	</div>
</div>
<div class="cate-body">
	<dl class="clearfix">
		<dt><em class="required"></em>字段描述：</dt>
		<dd>
			<input class="output-hidden" type="hidden" name="individualInfo_<?=feature_id?>" value="">
			<table   class="ret-table" style="width:400px;" border="0px" cellspacing="0">
			<thead style="background:#E4DDDD;">
				<tr style="height: 25px; text-align: center;" class="bg-1">
					<td style="width: 80px;">字段名称</td>
					<td style="width: 320px;">字段值</td>
				</tr>
			</thead>
			<tbody class="ret-body-list" id="ret-body-list-<?=feature_id?>">
				<tr>
					<td id="name">
						<input style="width:70px;"  type="text" class="input" value="<?=individual_information[0]['name']?>">
					</td>
					<td id="description">
						<input style="width:310px;"  type="text" class="input" value="<?=individual_information[0]['description']?>">
					</td>
				</tr>
				<tr>
					<td id="name">
						<input  style="width:70px;"  type="text" class="input" value="<?=individual_information[1]['name']?>">
					</td>
					<td id="description">
						<input style="width:310px;"  type="text" class="input" value="<?=individual_information[1]['description']?>">
					</td>
				</tr>
				<tr>
					<td id="name">
						<input style="width:70px;"  type="text" class="input" value="<?=individual_information[2]['name']?>">
					</td>
					<td id="description">
						<input style="width:310px;"  type="text" class="input" value="<?=individual_information[2]['description']?>">
					</td>
				</tr>
			</tbody>
			</table>	

			<p class="form-common-tip">
				最多支持三项附加信息
			</p>
		</dd>
	</dl>
	<dl class="clearfix">
		<dt></dt>
		<dd>
			<a class="file-up-btn" href="javascript:void(0)" __submitIndividualBtn="true" __version_id="<?=feature_id?>">保存</a>
		</dd>
	</dl>
</div>

</script>


