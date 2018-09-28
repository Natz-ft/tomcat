define(function(require, exports, module){
	require("lib/core");
	GetNextAppPage = function(data){
		
		layer.load('加载中...');
		var param = {};
		param["pageindex"] = data.index;
		param["pagesize"] = data.pagesize;
		if(keyword != ''){
			param["keyword"] = keyword;
		}
		$.ajax({
			url: "./appList.do?method=getAppList",
			type: "POST",
			data: param,
			dataType: "json",
			success: function(data){
				layer.closeAll();
				var map =data;
				var strPanel = buildNextAppPage(map);
				$("ul.app-all-list").html(strPanel);
	  		}
		});
	}
	
	
	exports.renderPage = function(count, pagesize, nowpage){
		debugger;
		count = parseInt(count); 
		pagesize = parseInt(pagesize);
		nowpage = parseInt(nowpage);
		if(count > pagesize){
			$("#paper").show();
			$("#paper").ui_paper({
				count : count,
				pagesize : pagesize,
				current : nowpage,
				fun : "GetNextAppPage"
			});
		}
		else{
			$("#paper").hide();
		}
	};
	
	
	buildNextAppPage = function(map){
		debugger;
		var data = map.data;
		var strPanel = "";
		for(var t=0; t<data.length; ++t){
			strPanel += '<li class="clearfix">';
			  strPanel += '<div class="c1">';
			    strPanel += '<a class="app-icon" href="./app.htm?app_id='+data[t].app_id +'">';
			      strPanel += '<img class="appicon-css3" alt="" src="'
				+ICON_PREFIX+'css-open/images/app-icon1.png"/>';
			    strPanel += '</a>';
			    strPanel += '<div class="app-info">';
			      strPanel += '<a class="app-name ellipse" href="./app.htm?app_id='+data[t].app_id+'">'+data[t].app_alias+'</a>';
			      strPanel += '<p class="app-intro ellipse">';
			      var group_names = data[t].group_names;
			      if(group_names && typeof group_names.length != 'undefined'){
			      for(var p=0; p<group_names.length; ++p){
			    	  strPanel += '<span>' + group_names[p] + '</span>';
			      }
			      }
			    strPanel += '</div>';
			  strPanel += '</div>';
			  strPanel += '<div class="c2">';
			  if(data[t].has_website=='1'){
				  strPanel += '<div class="app-type on">';
			  }else{
				  strPanel += '<div class="app-type">';
			  }
			  strPanel += '<a href="./app.htm?app_id='+data[t].app_id+'#outter">';
		      strPanel += '<p class="txt">站外应用</p>';
		      strPanel += '<div class="menu-icons outter"></div>';
		      strPanel += '</a>';
		      strPanel += '</div>';
		      if(data[t].has_inner=='1'){
		      	strPanel += '<div class="app-type on">';
		      }else{
		    	strPanel += '<div class="app-type">';
		      }
			  strPanel += '<a href="./app.htm?app_id='+data[t].app_id+'#inner">';
		      strPanel += '<p class="txt">站内应用</p>';
		      strPanel += '<div class="menu-icons inner"></div>';
		      strPanel += '</a>';
		      strPanel += '</div>';
		      
		      if(data[t].has_mobile=='1'){
		    	  strPanel += '<div class="app-type on">';
		      }else{
		    	  strPanel += '<div class="app-type">';
		      }
			  strPanel += '<a href="./app.htm?app_id='+data[t].app_id+'#mobile">';
		      strPanel += '<p class="txt">移动应用</p>';
		      strPanel += '<div class="menu-icons mobile"></div>';
		      strPanel += '</a>';
		      strPanel += '</div>';
		      
		      if(data[t].has_pc=='1'){
		    	  strPanel += '<div class="app-type on">';
		      }else{
		    	  strPanel += '<div class="app-type">';
		      }
		    	strPanel += '<a href="./app.htm?app_id='+data[t].app_id+'#pc">';
			    strPanel += '<p class="txt">桌面应用</p>';
			    strPanel += '<div class="menu-icons pc"></div>';
			    strPanel += '</a>';
			    strPanel += '</div>';
		     
			    
			strPanel += '</div>';
			strPanel += '</li>';
		}
		return strPanel;
	}
}); 