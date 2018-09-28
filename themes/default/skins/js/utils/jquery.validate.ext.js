jQuery.extend(jQuery.validator.messages,{
	required:"必填字段",
	remote:"请指定一个不重复的值",
	email:"请输入正确格式的电子邮件",
	url:"请输入合法的网址",
	date:"请输入合法的日期",
	dateISO:"请输入合法的日期 (ISO).",
	number:"请输入合法的数字",
	digits:"只能输入整数",
	creditcard:"请输入合法的信用卡号",
	equalTo:"请再次输入相同的值",
	accept:"请输入拥有合法后缀名的字符串",
	maxlength:jQuery.validator.format("允许的最大长度为 {0} 个字符"),
	minlength:jQuery.validator.format("允许的最小长度为 {0} 个字符"),
	rangelength:jQuery.validator.format("允许的长度为{0}和{1}之间"),
	range:jQuery.validator.format("请输入介于 {0} 和 {1} 之间的值"),
	max:jQuery.validator.format("请输入一个最大为 {0} 的值"),
	min:jQuery.validator.format("请输入一个最小为 {0} 的值")
});
jQuery.extend(jQuery.validator.methods,{
	url: function(value, element) {
		//添加了对域名localhost的支持
		return this.optional(element) || /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?((localhost)|((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
	}
});
//只能为英文字符
jQuery.validator.addMethod("string_en", function(value, element) {       
   return this.optional(element) || /^[A-Za-z]+$/.test(value);
},"仅限英文字符");  
// 字符验证  ,只能包括中英文、数字和下划线     
jQuery.validator.addMethod("string", function(value, element) {       
   return this.optional(element) || /^[\u0391-\uFFE5\w]+$/.test(value);
},"仅限中英文、数字和下划线");
//只能为英文、数字和下划线字符
jQuery.validator.addMethod("string_nocn", function(value, element) {       
	return this.optional(element) || /^[_0-9A-Za-z]+$/.test(value);
},"仅限英文、数字和下划线");
//只能为英文、下划线字符
jQuery.validator.addMethod("string_en_underline", function(value, element) {       
   return this.optional(element) || /^[_A-Za-z]+$/.test(value);
},"仅限英文和下划线");  
//验证手机号码
jQuery.validator.addMethod("isMobile", function(value, element){
    var length = value.length;
    return this.optional(element) || length == 11 && /^1[358]\d{9}$/.test(value);
},"请填写正确的手机号码");
//验证身份证号
var idCardNoUtil = {
	provinceAndCitys: {
		11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",
		21:"辽宁",22:"吉林",23:"黑龙江",
		31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",
		41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",
		50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",
		61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",
		71:"台湾",81:"香港",82:"澳门",91:"国外"
	},
	powers: ["7","9","10","5","8","4","2","1","6","3","7","9","10","5","8","4","2"],
	parityBit: ["1","0","X","9","8","7","6","5","4","3","2"],
	genders: {male:"男",female:"女"},
	checkAddressCode: function(addressCode){
		var check = /^[1-9]\d{5}$/.test(addressCode);
		if(!check) return false;
		if(idCardNoUtil.provinceAndCitys[parseInt(addressCode.substring(0,2))]){
			return true;
		}else{
			return false;
		}
	},
	checkBirthDayCode: function(birDayCode){
		var check = /^[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))$/.test(birDayCode);
		if(!check) return false;
		var yyyy = parseInt(birDayCode.substring(0,4),10);
		var mm = parseInt(birDayCode.substring(4,6),10);
		var dd = parseInt(birDayCode.substring(6),10);
		var xdata = new Date(yyyy,mm-1,dd);
		if(xdata > new Date()){
			return false;//生日不能大于当前日期
		}else if ( ( xdata.getFullYear() == yyyy ) && ( xdata.getMonth () == mm - 1 ) && ( xdata.getDate() == dd ) ){
			return true;
		}else{
			return false;
		}
	},
	getParityBit: function(idCardNo){
		var id17 = idCardNo.substring(0,17);
		var power = 0;
		for(var i=0;i<17;i++){
			power += parseInt(id17.charAt(i),10) * parseInt(idCardNoUtil.powers[i]);
		}
		var mod = power % 11;
		return idCardNoUtil.parityBit[mod];
	},
	checkParityBit: function(idCardNo){
		var parityBit = idCardNo.charAt(17).toUpperCase();
		if(idCardNoUtil.getParityBit(idCardNo) == parityBit){
			return true;
		}else{
			return false;
		}
	},
	checkIdCardNo: function(idCardNo){
		//15位和18位身份证号码的基本校验
		var check = /^\d{15}|(\d{17}(\d|x|X))$/.test(idCardNo);
		if(!check) return false;
		//判断长度为15位或18位
		if(idCardNo.length==15){
			return idCardNoUtil.check15IdCardNo(idCardNo);
		}else if(idCardNo.length==18){
			return idCardNoUtil.check18IdCardNo(idCardNo);
		}else{
			return false;
		}
	},
	//校验15位的身份证号码
	check15IdCardNo: function(idCardNo){
		//15位身份证号码的基本校验
		var check = /^[1-9]\d{7}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))\d{3}$/.test(idCardNo);
		if(!check) return false;
		//校验地址码
		var addressCode = idCardNo.substring(0,6);
		check = idCardNoUtil.checkAddressCode(addressCode);
		if(!check) return false;
		var birDayCode = '19' + idCardNo.substring(6,12);
		//校验日期码
		return idCardNoUtil.checkBirthDayCode(birDayCode);
	},
	//校验18位的身份证号码
	check18IdCardNo: function(idCardNo){
		//18位身份证号码的基本格式校验
		var check = /^[1-9]\d{5}[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))\d{3}(\d|x|X)$/.test(idCardNo);
		if(!check) return false;
		//校验地址码
		var addressCode = idCardNo.substring(0,6);
		check = idCardNoUtil.checkAddressCode(addressCode);
		if(!check) return false;
		//校验日期码
		var birDayCode = idCardNo.substring(6,14);
		check = idCardNoUtil.checkBirthDayCode(birDayCode);
		if(!check) return false;
		//验证校检码
		return idCardNoUtil.checkParityBit(idCardNo);
	},
	formateDateCN: function(day){
		var yyyy =day.substring(0,4);
		var mm = day.substring(4,6);
		var dd = day.substring(6);
		return yyyy + '-' + mm +'-' + dd;
	},
	//获取信息
	getIdCardInfo: function(idCardNo){
		var idCardInfo = {
			gender:"", //性别
			birthday:"" // 出生日期(yyyy-mm-dd)
		};
		if(idCardNo.length==15){
			var aday = '19' + idCardNo.substring(6,12);
			idCardInfo.birthday=idCardNoUtil.formateDateCN(aday);
			if(parseInt(idCardNo.charAt(14))%2==0){
				idCardInfo.gender=idCardNoUtil.genders.female;
			}else{
				idCardInfo.gender=idCardNoUtil.genders.male;
			}
		}else if(idCardNo.length==18){
			var aday = idCardNo.substring(6,14);
			idCardInfo.birthday=idCardNoUtil.formateDateCN(aday);
			if(parseInt(idCardNo.charAt(16))%2==0){
				idCardInfo.gender=idCardNoUtil.genders.female;
			}else{
				idCardInfo.gender=idCardNoUtil.genders.male;
			}
		}
		return idCardInfo;
	},
	getId15:function(idCardNo){
		if(idCardNo.length==15){
			return idCardNo;
		}else if(idCardNo.length==18){
			return idCardNo.substring(0,6) + idCardNo.substring(8,17);
		}else{
			return null;
		}
	},
	getId18: function(idCardNo){
		if(idCardNo.length==15){
			var id17 = idCardNo.substring(0,6) + '19' + idCardNo.substring(6);
			var parityBit = idCardNoUtil.getParityBit(id17);
			return id17 + parityBit;
		}else if(idCardNo.length==18){
			return idCardNo;
		}else{
			return null;
		}
	}
};
//验证护照是否正确
function checknumber(number){
	var str=number;
	//在JavaScript中，正则表达式只能使用"/"开头和结束，不能使用双引号
	var Expression=/(P\d{7})|(G\d{8})/;
	var objExp=new RegExp(Expression);
	if(objExp.test(str)==true){
		return true;
	}else{
		return false;
	} 
};

jQuery.validator.addMethod("isIdCardNo", function(value, element) { 
	  return this.optional(element) || idCardNoUtil.checkIdCardNo(value);
}, "请正确输入您的身份证号码"); 

jQuery.validator.setDefaults({
	errorElement: "span",
	errorClass: "invalid",
	success: function(element) {
		element.addClass("valid");
	},
	onfocusout: function(element, event) {
		if ( !this.checkable(element) ) {
			this.element(element);
		}
	},
	errorPlacement: function(error,element) {
		var errorCt = element.parents("dd:first").next(".form-tip:first");
		if(errorCt.length==0){
			error.insertAfter(element);
		} else {
			error.appendTo(errorCt);
		}
	}
});
$.validator.prototype.startRequest =  function(element) {
	if (!this.pending[element.name]) {
		this.pendingRequest++;
		this.pending[element.name] = true;
		
		var label = this.errorsFor( element );
		label.addClass("loading");
	}
};
$.validator.prototype.stopRequest =  function(element, valid) {
	this.pendingRequest--;
	// sometimes synchronization fails, make sure pendingRequest is never < 0
	if (this.pendingRequest < 0) {
		this.pendingRequest = 0;
	}
	delete this.pending[element.name];
	if ( valid && this.pendingRequest === 0 && this.formSubmitted && this.form() ) {
		$(this.currentForm).submit();
		this.formSubmitted = false;
	} else if (!valid && this.pendingRequest === 0 && this.formSubmitted) {
		$(this.currentForm).triggerHandler("invalid-form", [this]);
		this.formSubmitted = false;
	}
	
	var label = this.errorsFor( element );
	label.removeClass("loading");
};
/**
 * remote重写，防止onkeyup的时候远程验证多次
 */
$.validator.methods.remote = function(value, element, param){
	if(element === document.activeElement){//低版本浏览器可能不兼容，不过不会报错只不过多验证几次
		return true;
	}
	if ( this.optional(element) ) {
		return "dependency-mismatch";
	}

	var previous = this.previousValue(element);
	if (!this.settings.messages[element.name] ) {
		this.settings.messages[element.name] = {};
	}
	previous.originalMessage = this.settings.messages[element.name].remote;
	this.settings.messages[element.name].remote = previous.message;

	param = typeof param === "string" && {url:param} || param;

	if ( this.pending[element.name] ) {
		return "pending";
	}
	if ( previous.old === value && !element.getAttribute('group_name')) {
		return previous.valid;
	}

	previous.old = value;
	var validator = this;
	this.startRequest(element);
	var data = {};
	data[element.name] = value;
	$.ajax($.extend(true, {
		url: param,
		mode: "abort",
		port: "validate" + element.name,
		dataType: "json",
		data: data,
		success: function(response) {
			validator.settings.messages[element.name].remote = previous.originalMessage;
			var valid = response === true || response === "true";
			if ( valid ) {
				var submitted = validator.formSubmitted;
				validator.prepareElement(element);
				validator.formSubmitted = submitted;
				validator.successList.push(element);
				delete validator.invalid[element.name];
				validator.showErrors();
			} else {
				var errors = {};
				var message = response || validator.defaultMessage( element, "remote" );
				errors[element.name] = previous.message = $.isFunction(message) ? message(value) : message;
				validator.invalid[element.name] = true;
				validator.showErrors(errors);
			}
			previous.valid = valid;
			validator.stopRequest(element, valid);
		}
	}, param));
	return "pending";
};
