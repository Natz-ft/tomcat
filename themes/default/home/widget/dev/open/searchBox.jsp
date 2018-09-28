<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
    String keyword=request.getParameter("keyword");
	if(keyword==null){
		keyword="";
	}
%>
<div class="search-box-wrap clearfix">
	<form id="form" action="${searchUrl}" method="post" onsubmit="return formFilterSubmit(this);">
	<div class="search-input-wrap">
		<input name="keyword" class="search-input" type="text" placeholder="输入应用名称" onkeypress="formFilterEnterSubmit(event)" value="<%=keyword%>"/>
		<input name="searchtype" type="hidden" value="${searchtype}">
		<span class="icons search-icon" title="开始查找" onclick="formFilterEnterSubmit1()"></span>
	</div>
	<c:if test="${!empty filterItems}">
	<div class="search-filter-wrap">
		<c:if test="${empty currFilterItem}">
		<c:set var="filterItem" value="${filterItems[0]}"></c:set>
		</c:if>
		<c:if test="${!empty currFilterItem}">
		<c:set var="filterItem" value="${currFilterItem}"></c:set>
		</c:if>
		<input name="filter_type" value="${filterItem.value}" type="hidden"/>
		<div class="search-filter">${filterItem.label}</div>
		<span class="icons downarrow"></span>
		<div class="shadow filter-list">
			<ul>
				<c:if test="${empty currFilterItem}">
				<c:forEach var="item" items="${filterItems}" varStatus="i">
				<li class="filter-item<c:if test="${i.index eq 0}"> on</c:if>" val="${item.value}">${item.label}</li>
				</c:forEach>
				</c:if>
				<c:if test="${!empty currFilterItem}">
				<c:forEach var="item" items="${filterItems}">
				<li class="filter-item<c:if test="${item.value eq filterItem.value}"> on</c:if>" val="${item.value}">${item.label}</li>
				</c:forEach>
				</c:if>
			</ul>
		</div>
	</div>
	</c:if>
	</form>
</div>
<script type="text/javascript">

function formFilterSubmit(form) {
	$form = $(form);
	//不对inputvalue是否为空进行判断，为空时全部查询，因为有分页不必担心性能问题
	//var inputVal = $.trim($form.find("input[name='keyword']:first").val());
	if(form){
		form.submit();
	}
	return true;
}
var addEvent = function(eventType,element,handler){
	if(element.addEventListener){
		//element.addEventListener(eventType,handler,false);
		element.addEventListener(eventType,function(e){
			handler.call(element,e);
		},false);
	}else if(element.attachEvent){
		//element.attachEvent('on'+eventType,handler);
		element.attachEvent('on'+eventType,function(){
			handler.call(element,window.event);
		});
	}
}

//create method getElementsByClassName for document  
if(!document.getElementsByClassName){  
    document.getElementsByClassName = function(className, element){  
        var children = (element || document).getElementsByTagName('*');  
        var elements = new Array();  
        for (var i=0; i<children.length; i++){  
            var child = children[i];  
            var classNames = child.className.split(' ');  
            for (var j=0; j<classNames.length; j++){  
                if (classNames[j] == className){   
                    elements.push(child);  
                    break;  
                }  
            }  
        }   
        return elements;  
    };  
} 

	var search = document.getElementsByClassName("search-icon")[0];
	addEvent('click',search,submitForm);
	function submitForm(evt){
		evt = window.event || evt;
		var form = $(evt.target).parents("form:first");
		formFilterSubmit(form[0]);
	}
	 
function formFilterEnterSubmit(evt) {
	evt = window.event || evt;
	var form = $(evt.target).parents("form:first");
	if(evt.keyCode == 13) {
		formFilterSubmit(form[0]);
	}
}

function formFilterEnterSubmit1(){
	var form = $("#form");
	form.submit();
}
</script>
<script>
/*
 * jQuery placeholder, fix for IE6,7,8,9
 * @author YL
 * @since 20170217
 * @desc IE9不支持placeholder属性
 */
var JPlaceHolder = {
    //检测
    _check : function(){
        return 'placeholder' in document.createElement('input');
    },
    //初始化
    init : function(){
        if(!this._check()){
            this.fix();
        }
    },
    //修复
    fix : function(){
        jQuery(':input[placeholder]').each(function(index, element) {
            var self = $(this), txt = self.attr('placeholder');
            self.wrap($('<div></div>').css({position:'relative', zoom:'1', border:'none', background:'none', padding:'none', margin:'none'}));
            var pos = self.position(), h = self.outerHeight(true), paddingleft = self.css('padding-left');
            var holder = $('<span></span>').text(txt).css({position:'absolute', left:pos.left, top:pos.top, height:h+'px', lineHeight:h+'px', paddingLeft:paddingleft, color:'#aaa',width:'120px'}).appendTo(self.parent());
            self.focusin(function(e) {
                holder.hide();
            }).focusout(function(e) {
                if(!self.val()){
                    holder.show();
                }
            });
            holder.click(function(e) {
                holder.hide();
                self.focus();
            });
        });
    }
};
//执行
jQuery(function(){
    JPlaceHolder.init();    
});
</script>