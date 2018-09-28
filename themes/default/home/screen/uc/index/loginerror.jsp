<%@ page trimDirectiveWhitespaces="true"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<style>

@CHARSET "UTF-8";

* {
	margin: 0;
	padding: 0;
}

body {
	padding: 60px 0 0 0;
	_padding: 20px 0px 0px 0px;
	color: #333333;
	font-size: 14px;
    font-family: tahoma,arial,宋体;
	background-color: #fafafa;
}

a {
	color: #0096DB;
    cursor: pointer;
    text-decoration: none;
}

a:hover {
	color: #FF9500;
    text-decoration: underline;
}

.Prompt {
	width: 640px;
	margin: 100px auto 180px;
	text-align: left;
}

.Prompt_top,.Prompt_btm,.Prompt_ok,.Prompt_x {
	display: inline-block;
	background: url(./img/error-icons.gif) no-repeat;
}

.Prompt_top {
	width: 100%;
	height: 15px;
	background-position: 0 0;
}

.Prompt_ok {
	background-position: -72px -39px;
	width: 68px;
	height: 68px;
}

.Prompt_x {
	background-position: 0 -39px;
	width: 68px;
	height: 68px;
}

.Prompt_body {
	padding: 0 30px;
	border: 1px solid #E7E7E7;
	background: #fff;
}

.Prompt_body .title {
	font-size: 18px;
	padding: 15px 0 10px;
	border-bottom: 1px solid #EEEEEE;
	font-weight: bold;
	_height: 20px;
}

.Prompt_body .cont {
	overflow: hidden;
	zoom: 1;
}

.Prompt_body .Prompt_x {
	float: left;
	margin: 15px;
}

.Prompt_body .Prompt_txt {
	float: left;
	width: 478px;
	padding: 15px 0;
}

.Prompt_txt h2 {
	font-size: 16px;
	line-height: 24px;
	word-wrap: break-word;
	word-break: break-all; 
}

.Prompt_txt h2.error {
	color: red;
}

.Prompt_txt p {
	font-size: 15px;
	line-height: 22px;
}

.Prompt_txt .numc {
	color:blue;
	font-weight:bold;
}

.Prompt_txt a.a {
	display: inline-block;
	color: #fff;
	margin: 20px 0px;
	padding: 0 15px;
	line-height: 30px;
	background-color: #307ba0;
	font-size: 14px;
}
.Prompt_btm {
	background-position: 0 -27px;
	height: 6px;
	width: 100%;
	overflow: hidden;
}

</style>
<div class="Prompt">
		<div class="Prompt_top"></div>
		<div class="Prompt_body">
			<h2 class="title">提示信息</h2>
			<div class="cont">
				<span class="Prompt_x"></span>
				<div class="Prompt_txt">
					<h2 class="error">您尚未登录，请使用正确的证书登录！</h2>
				</div>
			</div>
    	</div>
    	<div class="Prompt_btm"></div>
	</div>