<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<script type="text/html" id="appOwnerTpl" >
</script>
<!-- 弹出框方式 -->
 <!--<script type="text/html" id="appOwnerTpl" >
<dl>
	<dt><em class="required">*</em>应用所有者：</dt>
	<dd>
		<a ownerSelectType="artDialog" class="pseudo-input" id="app_owner_input" href="javascript:void(0);" tempValue="<?=app_owner_name?>" dlg-title="选择应用所有者">
		<?=app_owner_name?></a>
		<input class="input valid"  valid-tip="应用所有者不能为空" name="app_owner" value="<?=app_owner?>" type="hidden"  id="app_owner" />
		<p class="form-common-tip">
			请选择应用所有者
		</p>
	</dd>
	<dd class="form-tip"></dd>
</dl> 
</script>
<website:script src="js/utils/artDialog/artDialog.source.js?skin=default"/>
<website:script src="js/utils/artDialog/plugins/i_f_rame.source.js"/> -->
<!-- 弹出框方式 结束 -->


<!-- dropdown方式 -->
 <%-- <website:style href="css/open/owner.css"/>
<script type="text/html" id="appOwnerTpl" >
<dl>
	<dt><em class="required">*</em>所属地市：</dt>
	<dd>
		<a ownerSelectType="dropdown" class="pseudo-input" id="app_owner_input" href="javascript:void(0);" tempValue="<?=app_owner_name?>" tempId="<?=app_owner?>" dlg-title="选择所属地市">
			<?=app_owner_name?>
		</a>
		<input class="input valid"  valid-tip="所属地市不能为空" name="app_owner" id="app_owner" type="hidden" value="<?=app_owner?>" ownerdata=""/>
		<div id="owner-list" style="display:none;" class="dropdown-list">
			<div class="dropdown-title">
				<div class="dropdown-close"></div>
			</div>
			<ul class="tag-list" id="app_owner_list">
			</ul>
		</div>
		<p class="form-common-tip">
			请选择应用所有者
		</p>
		
	</dd>
	<dd class="form-tip"></dd>
</dl> 
</script> --%>
<!-- dropdown方式 结束-->





