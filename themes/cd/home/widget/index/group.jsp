<%@ page trimDirectiveWhitespaces="true" %>
<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8" buffer="none" %>
<%@ taglib uri="/tags/website" prefix="website" %>
<%@ taglib uri="/tags/website-function" prefix="fn" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<style>
    .b-container .g-main .b-head.category {
        text-align:center;
        margin-top:20px;
    }
    .category-items{
        margin: 0;
        padding: 0;
        list-style:none;
        display:inline-block;
        border-bottom: 1px solid #e5e5e5;
    }
    .category-items li{
        float: left;
        width: 160px;
        height: 54px;
        line-height: 54px;
        font-size: 24px;
        transition: .5s;
        cursor: pointer;
        position: relative;
    }
    .category-items li.active{
        color: #1b59d4;
    }
    .category-items li.active:after{
        content: '';
        position: absolute;
        width: 50px;
        height: 3px;
        bottom: 0;
        left: 37%;
        margin-left: -3px;
        background-color: #1b59d4;
        position: absolute;
    }
    .b-container .g-main .b-head.category li.active span{
       color:#FFF;
    }
    .b-container .g-main .b-head.category:after{
       background-color:transparent;
    }
       /* .b-container .g-main .b-body .subj-list.dept-list > ul > li:before {
               content: '';
    display: block;
    float: left;
    width: 2px;
    height: 2px;
    margin-top: 8px;
    background-color: #999;
    vertical-align: middle;
       } */
      .b-container .g-main .b-body .subj-list.dept-list > ul > li{
          width:216px;
          height:38px;
          line-height:38px;
          text-align:left;
          margin-left:20px;
          list-style: none;
      }
      .b-container .g-main .b-body .subj-list.dept-list > ul > li .subj-name {
          font-size:16px;
      }
      /* .b-container .g-main .b-body .subj-list.dept-list > ul > li:before {
        content: '';
        display: block;
        float: left;
        width: 50px;
        height: 50px;
        background-color: #999;
        position: absolute;
        top: 14px;
        left: -10px;
       } */
      .b-container .g-main .b-body .subj-list.dept-list > ul > li a{
          padding-top:0;
      }
      .b-container .g-main .b-body .subj-list.dept-list > ul > li .subj-name {
          color:#999;
      }
      .img-bg {
          display: inline-block;
          width: 30px;
          height: 30px;
          vertical-align: -8px;
          margin-right: 5px;
      }
      .img0 {
          background:url("");
      }
</style>
<div class="b-container theme-container">
    <div class="g-main ">
        <div class="b-head category">
            <ul class="category-items">
                <li class="active">主题分类</li>
                <li>部门分类</li>
            </ul>
        </div>
        <div class="category-group">
            <div class="b-body">
            <div class="subj-list">
                <ul class="mark">
                    <c:forEach var="item" items="${resGroup}" varStatus="status">
						<li>
							<a href="${fn:getLink('catalog/index.htm?subjectId=')}${item.id}" target="_blank">
								<div class="subj-pic icon${status.index}"></div>
                            	<div class="subj-name">${item.name}</div>
							</a>
						</li>
					</c:forEach>
                </ul>
                <%--<div class="show-all">查看全部</div>--%>
            </div>
        </div>
        <div class="b-body" style="display:none">
            <div class="subj-list dept-list">
                <ul class="mark">
                    <c:forEach var="item" items="${orgList}" varStatus="status">
						<li>
							<a href="${fn:getLink('catalog/index.htm?org_code=')}${item.org_code}" target="_blank">
                                <!-- <div class="subj-pic icon${status.index}"></div> -->
                            	    <div class="subj-name dept-item${status.index}"><span class="img-bg img${status.index}"></span>${item.short_name}</div>

                            </a>
						</li>
					</c:forEach>
                </ul>
                <%--<div class="show-all">查看全部</div>--%>
            </div>
        </div>
        </div>
    </div>
</div>
<script>
    $(function () {
        $('.category-items li').on('click',function(){
            console.log( $(this).index() );
            var selected_index = $(this).index();
            $(this).siblings().removeClass('active');
            $(this).addClass('active');
            $('.category-group .b-body').eq(selected_index).siblings().hide();
            $('.category-group .b-body').eq(selected_index).show();
        })
    })
</script>