var searchAjax=function(){};
//设置最多添加标签个数
var maxTips=5;
var initAppTagEvent = function(){
		var a=$(".plus-tag");
//		$("a em",a).on("click",function(){
//			var c=$(this).parents("a"),b=c.attr("title"),d=c.attr("value");
//			delTips(b,d);
//		});
		
		//点击删除按钮
		deltags=function(b,d){
			delTips(b,d);
		}
		
		hasTips=function(b){
			var d=$("a",a),c=false;
			d.each(function(){
				if($(this).attr("title")==b){
					c=true;
					return false
				}
			});
			return c
		};
        //判断是否大于设置最大标签个数
		isMaxTips=function(){
			return	$("a",a).length>=maxTips
		};
        //点击添加标签触发事件
		setTips=function(c,d){
			if(hasTips(c)){
				return false
			}if(isMaxTips()){
				layer.tips("最多添加"+maxTips+"个标签！",$(".plus-tag"),1);
				return false
			}
			var b=d?'value="'+d+'"':"";
			a.append($("<a "+b+' title="'+c+'" href="javascript:void(0);" ><span>'+c+"</span><em onclick='deltags(\""+c+"\",\""+d+"\")'></em></a>"));
			searchAjax(c,d,true);
			return true
		};
        //删除标签事件
		delTips=function(b,c){
			if(!hasTips(b)){
				return false
			}
			$("a",a).each(function(){
				var d=$(this);
				if(d.attr("title")==b){
					d.remove();
					return false
				}
			});
			searchAjax(b,c,false);
			return true
		};
        //该方法获取选中的标签名称 用逗号隔开
		getTips=function(){
			var b=[];
			$("a",a).each(function(){
				b.push($(this).attr("title"))
			});
			return b
		};
        //该方法获取选中的标签Id 用逗号隔开
		getTipsId=function(){
			var b=[];
			$("a",a).each(function(){
				b.push($(this).attr("value"))
			});
			return b
		};
		//该方法获取选中的标签名称和ID 用逗号隔开
		getTipsIdAndTag=function(){
			var b=[];
			$("a",a).each(function(){
				b.push($(this).attr("value")+"##"+$(this).attr("title"))
			});
			return b
		}
		// 下一组链接单击处理
        var $b = $('#change-tips'),t = 'nowtips';
	    $b.click(function(){
			var $d = $('.default-tag div')
			var len = $d.length;
			var i = $d.index($('.default-tag .nowtips'));
			i = (i+1 < len) ? (i+1) : 0;
			$d.hide().removeClass(t);
			$d.eq(i).show().addClass(t);
	    });
	    
	  //点击div弹出服务分组
    	$('#myTags').click(function(){
		    var $this = $(this),
		    $con = $('#tag-plus');
            $con.show();
            $('body').on('click.mytags',function(e){
				var target = e.target;
				if(target == $('#myTags')[0] 
					|| target == $('#change-tips')[0] 
					|| $.contains($con[0],target) ){
					return false;
				} else {
					$con.hide();
					$('body').off('click.mytags');
				}
			});
	   });
    	
	   $('.default-tag a').click(function(){
		   var $this = $(this),
		   name = $this.attr('title'),
		   id = $this.attr('value');
		   setTips(name, id);
	   });
	   // 更新高亮显示
	   setSelectTips = function(){
   		var arrName = getTips();
		$('.default-tag a').removeClass('selected');
		$.each(arrName, function(index,name){
			$('.default-tag a').each(function(){
				var $this = $(this);
				if($this.attr('title') == name){
					$this.addClass('selected');
					return false;
				}
			})
		});
	}
     var searchAjax = function(name, id, isAdd){
    	setSelectTips();
     };
};	

//异步请求一次加载标签数据
function initTag(){
	//alert("initTag");
    $.ajax({
		url: "./appCreate.do?method=getTagList",
		type: "POST",
		data : {},
		dataType: "json",
		success: function(data){	
			//alert(data);
			if(data==null){
				data="";
			}
			var result = {'data' : data};
			var htm =template.render("tagTemplate", result);
		    $("div.default-tag").html(htm);
		    
		    initAppTagEvent();
	     }
    });
}