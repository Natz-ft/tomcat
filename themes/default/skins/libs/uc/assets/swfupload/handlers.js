
/* This is an example of how to cancel all the files queued up.  It's made somewhat generic.  Just pass your SWFUpload
object in to this method and it loops through cancelling the uploads. */
function cancelQueue(instance) {
	document.getElementById(instance.customSettings.cancelButtonId).disabled = true;
	instance.stopUpload();
	var stats;
	
	do {
		stats = instance.getStats();
		instance.cancelUpload();
	} while (stats.files_queued !== 0);
	
}

/* **********************
   Event Handlers
   These are my custom event handlers to make my
   web application behave the way I went when SWFUpload
   completes different tasks.  These aren't part of the SWFUpload
   package.  They are part of my application.  Without these none
   of the actions SWFUpload makes will show up in my application.
   ********************** */
function fileDialogStart() {
	/* I don't need to do anything here */
}
function fileQueued(file) {
	try {
		// You might include code here that prevents the form from being submitted while the upload is in
		// progress.  Then you'll want to put code in the Queue Complete handler to "unblock" the form
		//var progress = new FileProgress(file, this.customSettings.progressTarget);
		//progress.setStatus("Pending...");
		//progress.toggleCancel(true, this);
		$("#"+this.customSettings.progressTarget).html("0%");
	} catch (ex) {
		this.debug(ex);
	}

}

function fileQueueError(file, errorCode, message) {
	try {
		if (errorCode === SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED) {
			//alert("You have attempted to queue too many files.\n" + (message === 0 ? "You have reached the upload limit." : "You may select " + (message > 1 ? "up to " + message + " files." : "one file.")));
			layer.msg("请选择一个文件上传",1,0);
			return;
		}

		//var progress = new FileProgress(file, this.customSettings.progressTarget);
		//progress.setError();
		//progress.toggleCancel(false);

		switch (errorCode) {
		case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
			//progress.setStatus("File is too big.");
			//this.debug("Error Code: File too big, File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
			parent.layer.msg("文件大小超出限制", 2, 0);
			break;
		case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
			//progress.setStatus("Cannot upload Zero Byte files.");
			//this.debug("Error Code: Zero byte file, File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
			parent.layer.msg("不能上传空文件", 2, 0);
			break;
		case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:
			//progress.setStatus("Invalid File Type.");
			//this.debug("Error Code: Invalid File Type, File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
			parent.layer.msg("请上传jpg、png、gif、jpeg格式的文件", 2,0);
			break;
		case SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED:
			parent.layer.msg("文件数目超出范围", 2, 0);
			break;
		default:
			if (file !== null) {
				//progress.setStatus("Unhandled Error");
				parent.layer.msg("未知错误", 2, 3);
			}
			//this.debug("Error Code: " + errorCode + ", File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
			break;
		}
	} catch (ex) {
        this.debug(ex);
    }
}

function fileDialogComplete(numFilesSelected, numFilesQueued) {
	try {
		if (this.getStats().files_queued > 0) {
			//document.getElementById(this.customSettings.cancelButtonId).disabled = false;
		}
		/* I want auto start and I can do that here */
		this.startUpload();
		
	} catch (ex)  {
        this.debug(ex);
	}
}

function uploadStart(file) {
	try {
		/* I don't want to do any file validation or anything,  I'll just update the UI and return true to indicate that the upload should start */
		/*
		var progress = new FileProgress(file, this.customSettings.progressTarget);
		progress.setStatus("Uploading...");
		progress.toggleCancel(true, this);
		*/
		$("#"+this.customSettings.statusTarget).removeClass("upload-done").addClass("upload-before");
		$("#"+this.customSettings.progressTarget).html("0%");
		
	}
	catch (ex) {
	}
	
	return true;
}

function uploadProgress(file, bytesLoaded, bytesTotal) {
	try {
		var percent = Math.ceil((bytesLoaded / bytesTotal) * 100);
		/*
		var percent = Math.ceil((bytesLoaded / bytesTotal) * 100);

		var progress = new FileProgress(file, this.customSettings.progressTarget);
		progress.setProgress(percent);
		progress.setStatus("Uploading...");
		*/
		$("#"+this.customSettings.progressTarget).html(percent + "%");
	} catch (ex) {
		this.debug(ex);
	}
}

function uploadSuccess(file, serverData) {
	try {
		//var progress = new FileProgress(file, this.customSettings.progressTarget);
		result = eval('(' + serverData + ')');
		debugger;
		console.log(result);
		if(result.code == "0000"){
			//上传成功
			/*
			progress.setComplete();
			progress.setStatus("Complete.");
			$("#"+this.customSettings.showTarget).append("<img src='/acweb"+result.data+"' width='"+this.customSettings.width+"' height='"+this.customSettings.height+"'/>");
			*/
			//显示图片
			
			$("#"+this.customSettings.statusTarget).removeClass("upload-before").addClass("upload-done");
			if(typeof upload_type != "undefined" && upload_type == "rc"){
				if(result.r_type=="2"){
					$("#"+this.customSettings.showTarget).html("<img src='"+rcservice_url+result.docid+"&type=thumbnail' style='width: 100%; height: 100%;'/>");
					$("#"+this.customSettings.hiddenInput).val(result.docid);
				}else{
					$("#"+this.customSettings.showTarget).hide();
					$("#file_name_show").html(result.name);
					$("#"+this.customSettings.hiddenInput).val(result.docid);
				}
			}else{
				$("#"+this.customSettings.showTarget).html("<img src='"+context_url+result.data+"' style='width: 80px; height: 64px;'/>");
				$("#"+this.customSettings.hiddenInput).val(result.data);
			}
			$("#"+this.customSettings.progressTarget).html("");
			//设置隐藏域
			
		}else{
			/*
			progress.setStatus(result.msg);
			*/
			debugger;
			layer.msg("上传失败", 2, 3);
		}
		//progress.toggleCancel(false);

	} catch (ex) {
		this.debug(ex);
	}
}

function uploadSuccess1(file, serverData) {
	try {
		//var progress = new FileProgress(file, this.customSettings.progressTarget);
		result = eval('(' + serverData + ')');
		console.log(result);
		if(result.code == "0000"){
			//上传成功
			/*
			progress.setComplete();
			progress.setStatus("Complete.");
			$("#"+this.customSettings.showTarget).append("<img src='/acweb"+result.data+"' width='"+this.customSettings.width+"' height='"+this.customSettings.height+"'/>");
			*/
			//显示图片
			$("#"+this.customSettings.statusTarget).removeClass("upload-before").addClass("upload-done");
			if(typeof upload_type != "undefined" && upload_type == "rc"){
				if(result.r_type=="2"){
					$("#"+this.customSettings.showTarget).html("<img src='"+rcservice_url+result.docid+"&type=thumbnail' style='width: 200px; height: 200px;'/>");
					$("#"+this.customSettings.hiddenInput).val(result.docid);
				}else{
					$("#"+this.customSettings.showTarget).hide();
					$("#file_name_show").html(result.name);
					$("#"+this.customSettings.hiddenInput).val(result.docid);
				}
			}else{
				$("#"+this.customSettings.showTarget).html("<img src='"+context_url+result.data+"' style='width: 80px; height: 64px;'/>");
				$("#"+this.customSettings.hiddenInput).val(result.data);
			}
			$("#"+this.customSettings.progressTarget).html("");
			//设置隐藏域
			
		}else{
			/*
			progress.setStatus(result.msg);
			*/
			layer.msg("上传失败", 2, 3);
		}
		//progress.toggleCancel(false);

	} catch (ex) {
		this.debug(ex);
	}
}

function uploadSuccessII(file, serverData) {
	try {
		//var progress = new FileProgress(file, this.customSettings.progressTarget);
		result = eval('(' + serverData + ')');
		console.log(result);
		if(result.code == "0000"){
			//上传成功
			/*
			progress.setComplete();
			progress.setStatus("Complete.");
			$("#"+this.customSettings.showTarget).append("<img src='/acweb"+result.data+"' width='"+this.customSettings.width+"' height='"+this.customSettings.height+"'/>");
			*/
			//显示图片
			$("#"+this.customSettings.statusTarget).removeClass("upload-before").addClass("upload-done");
			if(typeof upload_type != "undefined" && upload_type == "rc"){
				
				$("#file_name_show").html(result.name);
				$("#"+this.customSettings.hiddenInput).val(result.docid);
			}else{
				$("#"+this.customSettings.showTarget).html("<img src='"+context_url+result.data+"' style='width: auto; height: 64px;'/>");
				$("#"+this.customSettings.hiddenInput).val(result.data);
			}
			$("#"+this.customSettings.progressTarget).html("");
			//设置隐藏域
			
		}else{
			/*
			progress.setStatus(result.msg);
			*/
			layer.msg("上传失败", 2, 3);
		}
		//progress.toggleCancel(false);

	} catch (ex) {
		this.debug(ex);
	}
}
//用户头像定义logo上传，数据检验规则定义logo上传
function uploadSuccessIII(file, serverData) {
	try {
		result = eval('(' + serverData + ')');
		debugger;
		console.log(result);
		if(result.docid != "" && result.docid !=null){
			//上传成功
			$("#"+this.customSettings.statusTarget).removeClass("upload-before").addClass("upload-done");
			//获取图片地址，显示图片
			var addr = "";
			$("#"+this.customSettings.showTarget).html("<img src='"+__rcservicedown+"/doc?doc_id="+result.docid+"' style='width: 100%; height: 100%;'/>");
			$("#"+this.customSettings.hiddenInput).val(result.docid);
			
			$("#"+this.customSettings.logoErroTarget).siblings('.error').remove();
			$("#"+this.customSettings.progressTarget).html("");
			//设置隐藏域
		}else{
			layer.msg("上传失败", 2, 3);
		}

	} catch (ex) {
		this.debug(ex);
	}
}

function uploadIconsSuccess(file, serverData) {
	try {
		result = eval('(' + serverData + ')');
		if(result.code == "0000"){
			//显示图片
			if(typeof upload_type != "undefined" && upload_type == "rc"){
				var dataArr = [];
				dataArr.push('<img src="'+rcservice_url+result.docid+'&type=thumbnail&size=16" width=16 height=16 style="margin:30px 25px;" />');
				dataArr.push('<img src="'+rcservice_url+result.docid+'&type=thumbnail&size=64" width=64 height=64 style="margin:10px 25px;" />');
				dataArr.push('<img src="'+rcservice_url+result.docid+'&type=thumbnail&size=120" width=120 height=120 style="margin:2px 25px;" />');
				var str = dataArr.join("");
				$("#"+this.customSettings.showTarget).html(str).show();
				$("."+this.customSettings.hiddenInput).val(result.docid);
			}else{
				$("#"+this.customSettings.showTarget).html("<img src='"+context_url+result.data+"' style='width: auto; height: 64px;'/>");
				$("#"+this.customSettings.hiddenInput).val(result.data);
			}
			$("#"+this.customSettings.progressTarget).html("");
			//设置隐藏域
			
		}else{
			layer.msg("上传失败", 2, 3);
		}
	} catch (ex) {
		this.debug(ex);
	}
}

function uploadComplete(file) {
	try {
		/*  I want the next upload to continue automatically so I'll call startUpload here */
		if (this.getStats().files_queued === 0) {
			document.getElementById(this.customSettings.cancelButtonId).disabled = true;
		} else {	
			this.startUpload();
		}
	} catch (ex) {
		this.debug(ex);
	}

}

function uploadError(file, errorCode, message) {
	try {
		
		debugger;
		
		var progress = new FileProgress(file, this.customSettings.progressTarget);
		progress.setError();
		progress.toggleCancel(false);

		switch (errorCode) {
		case SWFUpload.UPLOAD_ERROR.HTTP_ERROR:
			progress.setStatus("Upload Error: " + message);
			this.debug("Error Code: HTTP Error, File name: " + file.name + ", Message: " + message);
			break;
		case SWFUpload.UPLOAD_ERROR.MISSING_UPLOAD_URL:
			progress.setStatus("Configuration Error");
			this.debug("Error Code: No backend file, File name: " + file.name + ", Message: " + message);
			break;
		case SWFUpload.UPLOAD_ERROR.UPLOAD_FAILED:
			progress.setStatus("Upload Failed.");
			this.debug("Error Code: Upload Failed, File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
			break;
		case SWFUpload.UPLOAD_ERROR.IO_ERROR:
			progress.setStatus("Server (IO) Error");
			this.debug("Error Code: IO Error, File name: " + file.name + ", Message: " + message);
			break;
		case SWFUpload.UPLOAD_ERROR.SECURITY_ERROR:
			progress.setStatus("Security Error");
			this.debug("Error Code: Security Error, File name: " + file.name + ", Message: " + message);
			break;
		case SWFUpload.UPLOAD_ERROR.UPLOAD_LIMIT_EXCEEDED:
			progress.setStatus("Upload limit exceeded.");
			this.debug("Error Code: Upload Limit Exceeded, File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
			break;
		case SWFUpload.UPLOAD_ERROR.SPECIFIED_FILE_ID_NOT_FOUND:
			progress.setStatus("File not found.");
			this.debug("Error Code: The file was not found, File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
			break;
		case SWFUpload.UPLOAD_ERROR.FILE_VALIDATION_FAILED:
			progress.setStatus("Failed Validation.  Upload skipped.");
			this.debug("Error Code: File Validation Failed, File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
			break;
		case SWFUpload.UPLOAD_ERROR.FILE_CANCELLED:
			if (this.getStats().files_queued === 0) {
				document.getElementById(this.customSettings.cancelButtonId).disabled = true;
			}
			progress.setStatus("Cancelled");
			progress.setCancelled();
			break;
		case SWFUpload.UPLOAD_ERROR.UPLOAD_STOPPED:
			progress.setStatus("Stopped");
			break;
		default:
			progress.setStatus("Unhandled Error: " + error_code);
			this.debug("Error Code: " + errorCode + ", File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
			break;
		}
	} catch (ex) {
        this.debug(ex);
    }
}