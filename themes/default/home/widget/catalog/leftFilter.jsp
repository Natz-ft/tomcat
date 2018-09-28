<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<div class="side-title">
	<span><em id="total_count"></em>个数据集</span>
</div>
<div class="side-content side-sort">
    <div class="m-form">
        <label class="form-label">排序方式</label>
        <div class="form-content">
            <select class="sel-corner" name="filter_order_by">
                <option value="">综合排序</option>
                <option value="update_time">更新时间</option>
                <option value="data_count">数据量</option>
                <option value="views">访问量</option>
                <option value="downloads">下载量</option>
                <option value="use_grade">评分</option>
            </select>
            <i id="sort-style" class="fa fa-sort-amount-desc" aria-hidden="true"></i>
        </div>
    </div>
</div>
<div class="side-title">
	<span>筛选条件</span> <span class="side-remove g-right"><i
		class="fa fa-ban" aria-hidden="true"></i>清空筛选条件</span>
</div>
<div class="side-content">
	<div class="side-checked">
		<ul id="filter_container">
		</ul>
	</div>
</div>
<div id="left_group_count">
	<div class="side-search">
		<input name="keywords" type="text" class="m-input"
			placeholder="在结果中搜索..." /> <a class="do-search"><i
			class="fa fa-search" aria-hidden="true"></i></a>
	</div>
</div>

