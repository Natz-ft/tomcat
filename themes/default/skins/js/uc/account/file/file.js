$(document).ready(function() {
	$("#del-confirm").dialog({
	      autoOpen:false,
		  bgiframe: true,
		  title:"删除文件",
		  modal: true,
		  buttons: {
			  '确定': function() {
			    	$(this).dialog('close');
			    	var id = $("#del-confirm").attr("act-id");
			    	$("#del-confirm").attr("act-id","");
			    	$.ajax({
			    		url:delFileUrl,
			    		data: {id:id},
			    		type : "POST",
			    		success : function(data){
			    			data = eval('('+data+')');
					    	if(data == 1){
					    		dialog.success("删除成功",function(){
					    			window.location.href= hrefUrl;
					    		});
					    		
						    }else{
						    	dialog.error("操作失败，请稍后重试！");
							}
			    		}
			    	});
				},
				'取消':function(){$(this).dialog('close');}
		  }
	});
	$(".del-file").live("click",function(){
		var id = $(this).attr("act-id");
		$("#del-confirm").attr("act-id",id);
		$("#del-confirm").dialog("open");
	});
	
	$("#upload-file").live("click",function(){
		//var disk_id = $(this).attr("act-diskid");
		var uid = $(this).attr("act-uid");
		setTimeout(function() {
			if(typeof RC_UPLOAD != "undefined"){
				RC_UPLOAD.showPanel({
					uploadUrl : uploadUrl,
					resourceUrl : resourceUrl,
					postParams : {
						uid: uid,
						update_uid: uid,
						//disk_id: disk_id,
						type: "doc",
						is_update: '0',
						folder_name:'电子档案文件夹'
					},
					fileType : "*.jpg;*.jpeg;*.png;*.gif;*.doc;*.docx;*.xls;*.xlsx",
					success : function(doc_id){
						$("#log").append(
							'<li id="loading-text" style="text-align:center;">'+
							'	<img style="display:inline-block" src="'+loadingUrl+'"/>'+
							'	<div style="margin-top:5px;text-align:center;">设置文件信息...</div>'+
							'</li>'
						);
						if(typeof doc_id !="undefined"){
							//alert(doc_id);
							fileAdd(doc_id);
						}
						
					}
				});
			}
		}, 50);
	});
	
	$(".change-file").live("click",function(){
		//var disk_id = $("#upload-file").attr("act-diskid");
		var doc_old_id = $(this).attr("act-doc-id");
		var file_type = $(this).attr("act-file-type");
		var fileType = '*.jpg;*.jpeg;*.png;*.gif;*.doc;*.docx;*.xls;*.xlsx'
		if(file_type == 'img'){
			fileType = '*.jpg;*.jpeg;*.png;*.gif';
		}else if(file_type == 'doc'){
			fileType = '*.doc;*.docx';
		}else if(file_type == 'xls'){
			fileType = '*.xls;*.xlsx';
		}
		
		var uid = $("#upload-file").attr("act-uid");
		var file_id = $(this).attr("act-id");
		var _this = $(this).parents("tr");
		setTimeout(function() {
			if(typeof RC_UPLOAD != "undefined"){
				RC_UPLOAD.showPanel({
					uploadUrl : uploadUrl,
					resourceUrl : resourceUrl,
					postParams : {
						uid: uid,
						update_uid: uid,
						//disk_id: disk_id,
						doc_id: doc_old_id,
						type: "doc",
						is_update: '1',
						folder_name:'电子档案文件夹'
					},
					fileType : fileType,
					success : function(doc_id){
						$("#log").append(
								'<li id="loading-text" style="text-align:center;">'+
								'	<img style="display:inline-block" src="'+loadingUrl+'"/>'+
								'	<div style="margin-top:5px;text-align:center;">设置文件信息...</div>'+
								'</li>'
						);
						if(typeof doc_id !="undefined"){
							fileChange(file_id,doc_id,_this);
						}
						
					}
				});
			}
		}, 50);
	});
});


function fileChange(file_id,doc_id,_this){
	if(!doc_id) return false;
	var img = _this.find(".f-type").find(".imgFile");
	if($(img).length >0 ){
		var random = Math.random();
		var imgSrc = $(img).attr("src");
		$(img).attr("src",imgSrc+"&r="+random);
	}
	
	$("#loading-text").before(
			'<li style="border: 1px solid #393;background: #ccf9b9;">'+
			'	<span>文件设置成功！</span>'+
			'</li>'
		);
	$("#loading-text").remove();
	dialog.success("电子档案替换成功");

	/*$.ajax({
		url:fileChangeUrl,
		data: {doc_id:doc_id,id:file_id},
		type : "POST",
		success: function(upInfo) {
			upInfo = eval('('+upInfo+')');
			if(upInfo.success == 1) {
				upInfo = upInfo['info'];
				var doc_uuid = upInfo['doc_uuid'];
				var file_id = upInfo['id'];
				var doc_id = upInfo['doc_id'];
				var basename = upInfo['file_name'];
				var file_type = upInfo['file_type'];
				var imgUrl = "未知";
				if(file_type == 'img'){
					imgUrl = '<img class="" style ="width: 48px;height: 48px;"src="'+rcUrl+'/doc?doc_id='+doc_uuid+'">';
				}else if(file_type == 'doc'){
					imgUrl = '<img class="" style ="width: 48px;height: 48px;"src="'+docImgUrl+'">';
				}else if(file_type == 'xls'){
					imgUrl = '<img class="" style ="width: 48px;height: 48px;"src="'+xlsImgUrl+'">';
				}
				$("#loading-text").before(
					'<li style="border: 1px solid #393;background: #ccf9b9;">'+
					'	<span>文件【'+basename+'】设置成功！</span>'+
					'</li>'
				);
				$("#loading-text").remove();
				
				var index = $(_this).find("td")[0].innerHTML;
				var html = '<td class="f-index">'+index+'</td>'
					    +'  <td class="f-name">'
					    +'  	<a class="file-name" title="'+basename+'"'
					    +'  		 href="'+ rcUrl +'/doc?doc_id='+doc_uuid+'">'
					    + 		   basename
					    +' 	   </a>' 
					    +' </td>' 
					    +'  <td class="f-type"> '
					    +  	imgUrl
					    +'</td>'
					    +'<td class="f-do">'
					    +' 	<a class="change-file" href="javascript:;" act-id = "'+file_id+'">替换文件</a>'
					    +' 	<a class="del-file" href="javascript:;" act-id = "'+file_id+'">删除</a>'
					    +'  </td>';
				
				$(_this).html(html);
				dialog.success("电子档案替换成功");
			} else if(upInfo.success == -1) {
				upInfo = upInfo['info'];
				var basename = upInfo['file_name'];
				$("#loading-text").before(
						'<li style="border: 1px solid #393;background: #ccf9b9;">'+
						'	<span>您已上传文件【'+basename+'】，无需重复上传！您可以点击继续添加。</span>'+
						'</li>'
					);
				$("#loading-text").remove();
				$(_this).remove();
				dialog.error("您已上传该文件，无需重复上传！");
			}else if(upInfo.success == -2) {
				upInfo = upInfo['info'];
				var basename = upInfo['file_name'];
				$("#loading-text").before(
						'<li style="border: 1px solid #393;background: #ccf9b9;">'+
						'	<span>您已上传文件【'+basename+'】，无需重复上传！您可以点击继续添加。</span>'+
						'</li>'
					);
				$("#loading-text").remove();
				dialog.error("您已上传该文件，无需重复上传！");
			}else{
				var tip_html = 
					'<li style="border: 1px solid #393;background: #ccf9b9;">'+
					'	<span style="color:red;">文件信息设置失败！</span>';
				tip_html += '<a href="javascript:;"  onclick="fileChangeSync(\''+file_id+'\',\''+doc_id+'\',\''+_this+'\')">&nbsp;&nbsp;重新设置</a>'+
							'</li>';
				$("#loading-text").before(tip_html);
				$("#loading-text").remove();
				dialog.error("文件设置失败，请重新设置！");
			}
		}
	});*/
	
}

function fileChangeSync(file_id,doc_id,_this){
	if(!doc_id) return false;
	$("#log").append(
			'<li id="loading-text" style="text-align:center;">'+
			'	<img style="display:inline-block" src="'+loadingUrl+'"/>'+
			'	<div style="margin-top:5px;text-align:center;">设置文件信息...</div>'+
			'</li>'
		);
	fileAdd(doc_id);
}
function fileAdd(doc_id){
	if(!doc_id) return false;
	$.ajax({
		url:fileAddUrl,
		data: {doc_id:doc_id},
		type : "POST",
		success: function(upInfo) {
			upInfo = eval('('+upInfo+')');
			if(upInfo.success == 1) {
				upInfo = upInfo['info'];
				var doc_uuid = upInfo['doc_uuid'];
				var file_id = upInfo['id'];
				var doc_id = upInfo['doc_id'];
				var basename = upInfo['file_name'];
				var file_type = upInfo['file_type'];
				var imgUrl = "未知";
				
				if(file_type == 'img'){
					imgUrl = '<img class="imgFile" style ="width: 48px;height: 48px;"src="'+rcUrl+'/doc?doc_id='+doc_uuid+'">';
				}else if(file_type == 'doc'){
					imgUrl = '<img class="" style ="width: 48px;height: 48px;"src="'+docImgUrl+'">';
				}else if(file_type == 'xls'){
					imgUrl = '<img class="" style ="width: 48px;height: 48px;"src="'+xlsImgUrl+'">';
				}
				
				$("#loading-text").before(
						'<li style="border: 1px solid #393;background: #ccf9b9;">'+
						'	<span>文件【'+basename+'】设置成功！</span>'+
						'</li>'
				);
				$("#loading-text").remove();
				
				if( $("#file-list-body").length < 1){
					var list_table = '<table class="list_table">'
									+'   <tbody  id="file-list-body" style="border: 1px solid #CCC8C3;">'
									+'		<tr><th>序号</th><th>文件名称</th>'
									+'		<th>文件类型</th><th>操作</th></tr>'
									+'   </tbody>'
									+'</table>';
					$(".file-list").html(list_table);
				}
				
				var index = $("#file-list-body").find("tr").length;
				var html = '<tr>'	
					+'  <td  class="f-index">'+index+'</td>'
					+'  <td class="f-name">'
					+'  	<a class="file-name" title="'+basename+'"'
					+'  		 href="'+ rcUrl +'/doc?doc_id='+doc_uuid+'">'
					+ 		   basename
					+' 	   </a>' 
					+' </td>' 
					+'  <td class="f-type"> '
					+  	imgUrl
					+'</td>'
					+'<td class="f-do">'
					+' 	<a class="change-file" href="javascript:;" act-id = "'+file_id+'">替换文件</a>'
					+' 	<a class="del-file" href="javascript:;" act-id = "'+file_id+'">删除</a>'
					+'  </td>'
					+'</tr>';
				
				$("#file-list-body").append(html);
				dialog.success("电子档案上传成功！");
			} else if(upInfo.success  == -1) {
				upInfo = upInfo['info'];
				var basename = upInfo['file_name'];
				$("#loading-text").before(
						'<li style="border: 1px solid #393;background: #ccf9b9;">'+
						'	<span>您已上传文件【'+basename+'】，无需重复上传！您可以点击继续添加。</span>'+
						'</li>'
				);
				$("#loading-text").remove();
				dialog.error("您已上传该文件，无需重复上传！");
			}else{
				var tip_html = 
					'<li style="border: 1px solid #393;background: #ccf9b9;">'+
					'	<span style="color:red;">文件信息设置失败！</span>';
				tip_html += '<a href="javascript:;"  onclick="fileAddSync(\''+doc_id+'\')">&nbsp;&nbsp;重新设置</a>'+
				'</li>';
				$("#loading-text").before(tip_html);
				$("#loading-text").remove();
				dialog.error("文件设置失败，请重新设置！");
			}
		}
	});
	
}

function fileAddSync(doc_id){
	if(!doc_id) return false;
	$("#log").append(
			'<li id="loading-text" style="text-align:center;">'+
			'	<img style="display:inline-block" src="'+loadingUrl+'"/>'+
			'	<div style="margin-top:5px;text-align:center;">设置文件信息...</div>'+
			'</li>'
	);
	fileAdd(doc_id);
}
