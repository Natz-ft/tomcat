jQuery(document).ready(function($){
	
	var liHtml = '';
	//创建节点
	var createLi = function(ulDom,tdata,data,prepend){
		if($("#li_"+tdata.addr_id).length>0){
			$("#li_"+tdata.addr_id).remove();
		}
		if(!ulDom){
			ulDom = $('#addressList');
		}
		var addrDes = tdata.addr_txt + '&nbsp;&nbsp;'+tdata.tel+'&nbsp;&nbsp;'+tdata.phone;
		liHtml = '<li action-addr="'+ addrDes +'" style="'+tdata.display+'" class="clearfix '+ 'selected' +'"  id="li_'+ tdata.addr_id+'">'
		            +'<span class="marker" style="top: 6px;"></span>'
		            +'<span class="marker-tip">寄送至</span>'
		            +           ' <div class="address-info">'
		            +   ' <a hidefocus href="javascript:;" class="modify">修改本地址</a>'
		             +  ' <label class="user-address">'
		             +           tdata.addr_txt
		             +          '<em> &nbsp;&nbsp;'+(tdata.tel)+'</em>'
		              +          '<em> &nbsp;&nbsp;'+(tdata.phone)+'</em>'
		             +   '</label>'
		             +   '<em class="tip" style="">'+(tdata.is_default == 1?'默认地址':'')+'</em>'
		             +  ' <a class="set-default" href="#" style="display: none">设置为默认收货地址</a>'
		     +'</li>';
		     if(typeof prepend !== "undefined" && prepend == 'true'){
		     	ulDom.prepend(liHtml);
		     }else{
		     	ulDom.append(liHtml);
		     }
			 var modifyDom = $("#li_"+tdata.addr_id).find(".modify");
			 modifyDom.data("odata",data);
			 modifyDom.on("click",function(){
			 	var odata = $(this).data("odata");
			 	popupAddrDlg();
			 	initAddrPopupDlg(odata);
			 });
			 
	};
	var getAddrTxt = function(data) {
			var prov='',city='',area='';
			if(tdist[data['prov']]){
				prov = tdist[data['prov']][0];
				city = tdist[data['city']][0];
				area = tdist[data['area']][0];
			}
			return prov + "&nbsp;" + city+"&nbsp;"+area+"&nbsp;"+data['street']+"("+data['receiver_name']+"&nbsp;收)"
	};
	//初始化地址列表
	(function(){
		if(typeof addrList == 'undefined')
			return;
		if(!addrList)
			return;
			
		var liHtml = '';
		var ulDom = $('#addressList');
		var len = addrList.length;
		for(i in addrList){
			var data = addrList[i];
			i = parseInt(i);
			var tdata={
				addr_id:data['addr_id'],
				addr_txt:getAddrTxt(data),
				tel:data['tel'],
				phone:data['phone'],
				display:(i<(len-4)?'display:none;':'')
			};
			createLi (ulDom,tdata,data,'true');
		}
	})();
	//初始化编辑地址对话框
	var initAddrPopupDlg= function(data){
			$("#addr-popup-content").data('odata',data);
			$("#addrProv").val(data['prov']);
			$("#addrProv").trigger("change");
			$("#addrCity").val(data['city']);
			$("#addrArea").val(data['area']);
			$("#addrZip").val(data['postcode']);
			$("#street").val(data['street']);
			$("#receiverName").val(data['receiver_name']);
			var tel = data['tel'].split("-");
			if(typeof tel[0] != 'undefined'){
				if(tel[0]!=null){
					$("#telCode").val(tel[0]);
				}
			}
			if(typeof tel[1] != 'undefined'){
				if(tel[1]!=null){
					 $("#telNum").val(tel[1]);
				}
			}
			if(typeof tel[2] != 'undefined'){
				if(tel[2]!=null){
					 $("#telExt").val(tel[2]);
				}
			}
			$("#phone").val(data['phone']);
			
			//稍后修改，只有changed的字段才提交到update
//			var list = ["#addrProv","#addrCity","#addrArea","#addrZip"
//						"#street","#receiverName","#telCode","#telNum","#telExt","#phone"];
//			for(var i = 0,len = list.length;i<len;i++){
//				$(list[i]).removeAttr("changed");
//				$(list[i]).on("change",function(){
//					$(this).attr("changed","changed");
//				});
//			}
	};
	//编辑地址对话框
	$("#addr-popup-content").dialog({
	    autoOpen:false,
	    width:820,
		  bgiframe: true,
		  title:"使用新地址",
		  modal: true,
		  buttons: {
			  '确定': function() {
			  		if($("#addr-popup-content").data("odata")){
			  			if(validate()){
			  				modifyAddr($("#addr-popup-content").data("odata")['addr_id']);
			  				$(this).dialog('close');
			  			}
			  		}else{
			  			if(validate()){
				  			addAddr();
				  			$(this).dialog('close');
			  			}
			  		}
			  		
		         },'取消': function() {
			    	$(this).dialog('close');
		         }
	         	}
	});
	//打开地址编辑对话框
	var popupAddrDlg = function(){
		$("#_tipbox").remove();
		var list = [//"#addrProv","#addrCity","#addrArea",
						"#addrZip",
						"#street","#receiverName","#telCode","#telNum","#telExt","#phone"];
			for(var i = 0,len = list.length;i<len;i++){
				$(list[i]).val('');
			}

		$("#addr-popup-content").dialog('open');
	};
	
	//使用新地址按钮点击事件
	$("#newAddressBtn").on("click",function(){
		$("#addr-popup-content").removeData("odata");
		popupAddrDlg();
	});
	
	
	//初始化省市区下拉框
	(function(){
			if(typeof tdist != 'undefined'){
			var i;
			
			var initProv = function(){
				var provHtml = '';
				for(i in tdist){
					if(tdist[i][1]=='1'){
						provHtml+='<option value="'+ i +'">'+tdist[i][0]+'</option>';
					}
				}
				$("#addrProv").html(provHtml);
			};
			var initCity = function(){
				var cityHtml = '';
				var provVal =  $("#addrProv").val();
				for(i in tdist){
					if(tdist[i][1] == provVal ){
						cityHtml+='<option value="'+ i +'">'+tdist[i][0]+'</option>';
					}
				}
				$("#addrCity").html(cityHtml);
			};
			var initArea = function(){
				var areaHtml = '';
				var cityVal = $("#addrCity").val();
				for(i in tdist){
					if(tdist[i][1] == cityVal ){
						areaHtml+='<option value="'+ i +'">'+tdist[i][0]+'</option>';
					}
				}
				$("#addrArea").html(areaHtml);
			};
			
			initProv();
			initCity();
			initArea();	
			
			$("#addrProv").on("change",function(){
				initCity();
				initArea();	
			});
			
			$("#addrCity").on("change",function(){
				initArea();	
			});
		}
	})();
	
	//校验	
	var validate = function(){
		$("#_tipbox").remove();
		//校验区域
		if(!$.trim($("#addrProv").val())){
			$("#addrProv").tipBox({tips:"请选择地址区域"});
			return false;
		}
		//校验邮编
		var addZip = $.trim($("#addrZip").val());
		if(!addZip){
			$("#addrZip").tipBox({tips:"请填写邮政编码"});
			return false;
		}else{
			if($("#addrProv").val() == '990000'){//海外,只能包含数字
				if(!/^[0-9]*$/.test(addZip)){
					$("#addrZip").tipBox({tips:"邮政编码只能包含数字"});
					return false;
				}				
			}else{
				var re= /^[1-9][0-9]{5}$/;//邮政编码的验证（开头不能为0，共6位）
		        if(!(re.test(addZip))){
					$("#addrZip").tipBox({tips:"请输入6位数字的邮政编码"});
					return false;
		        }
			}
		}
		//校验街道地址
		if(!$.trim($("#street").val())){
			$("#street").tipBox({tips:"请选择街道地址"});
			return false;
		}
		//校验姓名
		if(!$.trim($("#receiverName").val())){
			$("#receiverName").tipBox({tips:"请选择接收人姓名"});
			return false;
		}
		
		//校验手机号
		var telCode = $.trim($("#telCode").val());
		var telNum = $.trim($("#telNum").val());
		var telExt = $.trim($("#telExt").val());
		var phone = $.trim($("#phone").val());
		if(!phone){
			if(!telCode&&!telNum&&!telExt){
				$("#telCode").tipBox({tips:"电话和手机请至少填写一个",relatedTo:"#phone"});
				return false;
			}
		}
		//填写了电话则校验电话
		if(telCode||telNum||telExt){
			if(!telCode||!telNum){
					$("#telCode").tipBox({tips:"请填写完整的电话号码",relatedTo:"#telNum"});
					return false;
				}else{
					if(!/^[0-9]*$/.test(telCode)){
						$("#telCode").tipBox({tips:"电话号码仅能由数字组成"});
						return false;
					}else if(!/^[0-9]*$/.test(telNum)){
						$("#telNum").tipBox({tips:"电话号码仅能由数字组成"});
						return false;
					}else if(!/^[0-9]*$/.test(telExt)){
						$("#telExt").tipBox({tips:"电话号码仅能由数字组成"});
						return false;
					}else{
							if(telCode.length>6||telCode.length<3){
								$("#telCode").tipBox({tips:"区位号码长度最少3位，最多6位"});
								return false;
							}
							if(telNum.length>10||telNum.length<5){
								$("#telNum").tipBox({tips:"电话号码长度最少5位，最多10位"});
								return false;
							}
							if(telExt.length>6){
								$("#telExt").tipBox({tips:"分机号码长度最多6位"});
								return false;
							}
					}
						
					
			}
		}
		//填写了手机校验手机
		if(phone){
			if(!/^13[0-9]{9}$|15[0-9]{9}$|18[0-9]{9}$/i.test(phone)){
				$("#phone").tipBox({tips:"请填写正确的手机号"});
				return false;
			}
		}
		return true;
		
	};
	
	var modifyAddr = function(addr_id){
		if(!addr_id)return false;
		var telNum = $.trim($("#telNum").val());
		var telExt = $.trim($("#telExt").val());
		var phone = $.trim($("#phone").val());
		var data = {
			'addr_id':addr_id,
			'prov':$.trim($("#addrProv").val()),
			'city': $.trim($("#addrCity").val()),
			'area': $.trim($("#addrArea").val()),
			'postcode':$.trim($("#addrZip").val()),
			'street':$.trim($("#street").val()),
			'receiver_name':$.trim($("#receiverName").val()),
			'tel':$.trim($("#telCode").val())+'-'+$.trim($("#telNum").val())+'-'+$.trim($("#telExt").val()),
			'phone':$.trim($("#phone").val()),
			'is_default':0
		};
		var des = getAddrTxt(data);
		data.des = des;
		$.ajax({
			type : "POST",
			url : doUpdateAddrUrl,
			data : data,
			success : function(res) {
				if(res){
					//地址id
					var tdata={
						addr_id:addr_id,
						addr_txt:getAddrTxt(data),
						tel:data['tel'],
						phone:data['phone'],
						display:''
					};
					//data['addr_id'] = addr_id;
					createLi (null,tdata,data,'true');
				}else{
					alert("修改失败，请稍后重试");
				}
				
			},
			error : function(res) {
				alert("error");
			}
		});
	};
	var addAddr = function(){
		var telNum = $.trim($("#telNum").val());
		var telExt = $.trim($("#telExt").val());
		var phone = $.trim($("#phone").val());
		var data = {
			'prov':$.trim($("#addrProv").val()),
			'city': $.trim($("#addrCity").val()),
			'area': $.trim($("#addrArea").val()),
			'postcode':$.trim($("#addrZip").val()),
			'street':$.trim($("#street").val()),
			'receiver_name':$.trim($("#receiverName").val()),
			'tel':$.trim($("#telCode").val())+'-'+$.trim($("#telNum").val())+'-'+$.trim($("#telExt").val()),
			'phone':$.trim($("#phone").val()),
			'is_default':0
		};
		var des = getAddrTxt(data);
		data.des = des;
		$.ajax({
			type : "POST",
			url : doAddAddrUrl,
			data : data,
			success : function(res) {
				if(res>0){
					//地址id
					var tdata={
						addr_id:res,
						addr_txt:getAddrTxt(data),
						tel:data['tel'],
						phone:data['phone'],
						display:''
					};
					data['addr_id'] = res;
					createLi (null,tdata,data,'true');
				}
				
			},
			error : function(res) {
				alert("添加新地址失败，请稍后重试。");
			}
		});
	};
});