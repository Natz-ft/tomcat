var RC_UPLOAD = {
	options : {
		//上传的处理地址
		uploadUrl   : "",
		//上传flash按钮的资源地址
		resourceUrl : "",
		//
		fileSelectedNum : 0,
		//
		filesQueuedNum : 0,
		/*
		 * upload_timewait三种情况：
		 * 1.清0——在选择按钮归位的时候。
		 * 2.改变，随着选择文件的增加，使每个进度条依次消失。
		 * 3.每次清零应该是在选择按钮回到中央的时候
		 */
		timewait : 0,
		//flash上传参数配置
		postParams : null,
		//文件类型限制，类似："*.*"，"*.doc"，"*.doc;*.png"
		fileType : "*.*",
		//上传成功后的回调处理方法
		success: function(doc_id){}
	},
	upload_initFlashFlag : false,
	showPanel : function(_options) {
		RC_UPLOAD.options = $.extend(RC_UPLOAD.options,_options,true);
		if(typeof RC_UPLOAD.options.postParams == "undefined" 
			|| typeof RC_UPLOAD.options.success != "function"
			|| typeof RC_UPLOAD.options.fileType == "undefined"){
			return;
		}
		//初始化页面
		var queuestatus =$('#queuestatus');
		$('#log').empty();
		queuestatus.text("");
		var viewPanel = $("#uploadbox");
		try{
			viewPanel.dialog({
				width: 548,
		        title: "上传文件",
		        modal: true,
		        open:function(){
		        	//渲染页面后，再初始化flash对象
		        	var cancelbtn = $("#cancelbtn");
		        	cancelbtn.off("click").on("click",function(e) {
		        		viewPanel.dialog("close");
		        	});
					if(!RC_UPLOAD.upload_initFlashFlag){
						RC_UPLOAD.initFlash();
						RC_UPLOAD.upload_initFlashFlag = true;
					}
					RC_UPLOAD.btnFloatCenter();
		        }
			});
		}catch(e){}
		if(RC_UPLOAD.upload_initFlashFlag && $.browser.msie){
			try{
				RC_UPLOAD.btnFloatCenter();
			}catch(e){}
		}
	},
	//刷新
	freshData: function(){
		var queuestatus =$('#queuestatus');
		RC_UPLOAD.options.fileSelectedNum --;
		RC_UPLOAD.options.filesQueuedNum --;
		if(RC_UPLOAD.options.filesQueuedNum == 0){
			queuestatus.text("");
		} else if(RC_UPLOAD.options.filesQueuedNum > 0){
			queuestatus.text('已选中: ' + RC_UPLOAD.options.fileSelectedNum + ' / 排队中: ' + RC_UPLOAD.options.filesQueuedNum);
		}
	},
	//按钮移动到左下方
	btnFloatLeft : function(){
		if(RC_UPLOAD.options.postParams == null)return;
		var selectfilebtn = $("#uploadfirstwrapper");
		//selectfilebtn.hide();//flash隐藏会销毁！不能隐藏！
		var multiObject = $.multiupload.getInstance('#fsUploadProgress');
		multiObject.setButtonDimensions("84", "30");
		multiObject.setButtonText('<span class="flashStyle">继续添加</span>');
		multiObject.setButtonTextPadding(0, 8);
		multiObject.setButtonTextStyle(".flashStyle {color:#000;font-size:12px;text-align:center}");
		multiObject.setPostParams(RC_UPLOAD.options.postParams);
		selectfilebtn.css({
	        left: "auto",
	        top: "auto",
	        width: "80px",
	        height: "30px"
	    }).addClass("whiteBtn").removeClass("blueBtn");
	},
	//按钮移动到中央
	btnFloatCenter : function(){
		var selectfilebtn = $("#uploadfirstwrapper");
		RC_UPLOAD.options.timewait = 0;
		var multiObject = $.multiupload.getInstance('#fsUploadProgress');
		multiObject.setButtonDimensions("168", "43");
		multiObject.setButtonText('<span class="flashStyle">选择文件</span>');
		multiObject.setButtonTextPadding(0, 13);
		multiObject.setButtonTextStyle(".flashStyle {color:#FFFFFF;font-size:16px;text-align:center}");
		selectfilebtn.css({
			left: "190px",
			top: "130px",
			width: "168px",
			height: "43px"
		}).addClass("blueBtn ").removeClass("whiteBtn");
	},
	//取消上传
	cancelUpload : function(file){
		 var swfu = $.multiupload.getInstance('#fsUploadProgress');
		 swfu.cancelUpload(file.id);
		 $('#log li#' + file.id).find('p.status').text('取消');
		 $('#log li#' + file.id).find('span.stopUpload').css('background-image','none')
		 $('#log li#' + file.id).find('span.stopUpload').css('cursor','defult')
	},
	swfFileQueued : function(event, file) {
		if(RC_UPLOAD.options.postParams == null) return;
		RC_UPLOAD.btnFloatLeft();
		var listitem = '<li id="' + file.id + '" >' +
	    '文件名: <em>' + file.name + '</em> (' + Math.round(file.size / (1024)) + ' KB) <span class="progressvalue" ></span>' +
	    '<div class="progressbar" ><div class="progress" ></div></div>' +
	    '<p class="status" >Pending</p>' +
	    '<span class="stopUpload" ></span>' +
	    '</li>';
		$('#log').append(listitem);
		$('li#' + file.id + ' .stopUpload').bind('click', function () { //Remove from queue on cancel click
			var swfu = $.multiupload.getInstance('#fsUploadProgress');
			swfu.cancelUpload(file.id);
			$('#log li#' + file.id).find('p.status').text('取消');
			$('#log li#' + file.id).find('span.stopUpload').css('background-image','none')
			$('#log li#' + file.id).find('span.stopUpload').css('cursor','defult')
			$('#log li#' + file.id).remove();
			RC_UPLOAD.freshData();
		});
		if(file.size>10*1024*1024){ //超过大小不上传
			 var swfu = $.multiupload.getInstance('#fsUploadProgress');
			 swfu.cancelUpload(file.id);
			 $('#log li#' + file.id).find('p.status').text('文件大小超过10M!!!');
		}else{
			 //注意：is_update=0用来和“更新”is_update=1进行区分
			 $.multiupload.getInstance($('#fsUploadProgress')).setPostParams(RC_UPLOAD.options.postParams);
			 $(this).multiupload('startUpload');   // start the upload since it's queued
		}
	},
	fileQueueErrors : function(event, file, errorCode, message) {
	    alert(errorCode+":"+message)
	},
	fileDialogComplete : function(event, numFilesSelected, numFilesQueued) {
		var queuestatus = $('#queuestatus');
		if(RC_UPLOAD.options.timewait > 0){
			//继续添加
			RC_UPLOAD.options.fileSelectedNum += numFilesSelected;
			RC_UPLOAD.options.filesQueuedNum += numFilesQueued;
		}else if(RC_UPLOAD.options.timewait == 0){
			//第一次从电脑上传
			RC_UPLOAD.options.fileSelectedNum = numFilesSelected;
			RC_UPLOAD.options.filesQueuedNum = numFilesQueued;
		}
		if(numFilesSelected > 0){
			queuestatus.text('已选中: ' + RC_UPLOAD.options.fileSelectedNum + ' / 排队中: ' + RC_UPLOAD.options.filesQueuedNum);	
		}
	},
	uploadStart : function(event, file) {
		RC_UPLOAD.options.timewait += 1; 
	    $('#log li#' + file.id).find('p.status').text('上传中...');
	    $('#log li#' + file.id).find('span.progressvalue').text('0%');
	    $('#log li#' + file.id).find('span.cancel').hide();
	},
	uploadProgress : function(event, file, bytesLoaded, total) {
		if(total == null) total = file.size;
	    // Show Progress
	    var percentage = Math.round((bytesLoaded / total) * 100);
	    $('#log li#' + file.id).find('div.progress').css('width', percentage + '%');
	    $('#log li#' + file.id).find('span.progressvalue').text(percentage + '%');
	},
	uploadSuccess : function(event, file, serverData) {
		var json_data = $.parseJSON(serverData)
			,_success = false; 
		if(typeof json_data.docid!="undefined"){
			var doc_id=json_data.docid;
			RC_UPLOAD.options.success(doc_id);
			_success = true;
		}
		var item = $('#log li#' + file.id);
	    item.find('div.progress').css('width', '100%');
	    item.find('span.progressvalue').text('100%');
	    if(_success) {
	    	item.addClass('success').find('p.status').html('上传完成！！！ ');
	    } else {
	    	item.removeClass('success').find('p.status').html('上传失败！！资源中心服务调用出错！！！ ');
	    }
	    item.find('span.stopUpload').css('background-image','none') ;
	    item.find('span.stopUpload').css('cursor','default') ;
	    item.delay(RC_UPLOAD.options.timewait*301).animate({
	    	//height:'hide'
		},300,function(){ // 使用延时的方法不妥，暂用
			RC_UPLOAD.freshData();
	    });
	},
	uploadComplete : function(event, file) {
	    // upload has completed, try the next one in the queue
	    $(this).multiupload('startUpload');
	},
	initFlash : function(){
		try{
			$("#fsUploadProgress").multiupload({
	            upload_url:RC_UPLOAD.options.uploadUrl,
	            file_post_name:'uploadfile',
	            file_size_limit:"20000 MB",                
	            file_types:RC_UPLOAD.options.fileType?RC_UPLOAD.options.fileType:"*.*",
	            file_types_description:"All files",
	            //post_params:{uid:"5",disk_id:"248",type:"doc",update_uid:"5",is_update:'0'},
	            flash_url:RC_UPLOAD.options.resourceUrl+"?debugEnabled=true",
	            button_window_mode: SWFUpload.WINDOW_MODE.TRANSPARENT,
	            button_width:168,
	            button_height:43,
	            button_text:'<span class="btnStyle">选择文件</span>',
	            button_text_style: ".btnStyle { color: #FFFFFF; font-size:16px;text-align:center}",
	            button_text_top_padding:13,
	            button_cursor:-2,
	            button_placeholder_id:"uploadfirst",
	            debugEnabled:true
	        })
	        .off('fileQueued')
	        .bind('fileQueued', RC_UPLOAD.swfFileQueued)
	        .off('fileQueueError')
	        .bind('fileQueueError',RC_UPLOAD.fileQueueErrors)
	        .off('fileDialogComplete')
	        .bind('fileDialogComplete',RC_UPLOAD.fileDialogComplete)
	        .off('uploadStart')
	        .bind('uploadStart', RC_UPLOAD.uploadStart)
	        .off('uploadProgress')
	        .bind('uploadProgress',RC_UPLOAD.uploadProgress)
	        .off('uploadSuccess')
	        .bind('uploadSuccess', RC_UPLOAD.uploadSuccess)
	        .off('uploadComplete')
	        .bind('uploadComplete', RC_UPLOAD.uploadComplete)
	        ;
		}catch(ex){
			alert(ex);
		}
	}
};
