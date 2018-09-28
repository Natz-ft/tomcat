(function($){
	/*
	 * 默认配置项
	 */
	var options = {
            timeStep : 300000,
            sinceId:0,
            lastId:0,
            show_feed:0,
            follow_gid:0,
//            gid:0,
            weiboType:0,
            type:0,
            systemType:{
                    emotions:false,
                    topic:false
            },
            childrenMenu:'.tab_dropdown',
            hoverClass:'hover',
            loadNewDiv:'#countNew',
            weiboListDiv:"#feed_list",
            loadMoreDiv:'#loadMoreDiv',
            publishForm:{
                type:"input[name=publish_type]",
                weiboType:"#publish_type_content_before",
                wordNum:".wordNum",
                textarea:"#content_publish",
                button:"#publish_handle",
                form:"#miniblog_publish",
                publishMsg:"#publish-success-msg"
            },
            weiboList:{
                comment:{a:"a[rel='comment']",form:"form[rel='miniblog_comment']"}
            },
            initForm:false,
            loading:'<div class="feed_quote feed_wb" style="text-align:center"><img src="/images/icon_waiting.gif" width="15"></div>',
            leftAppPublish:'.user_app_link'
        },popup=null,isLoading=false,operateFactory=null;
	
	$.extend({
			weibo : function(config){//debugger;
				$.extend(options, config);
		    	operateFactory = new OperateFactory(options.type);
		        
		        this.countNew();//激活定式更新微博数事件
		        if(options.initForm){
		           this.initForm();
		        }
		        
		        for(var one in events){
		            events[one]();
		        }
				return this;
			},
			obj:null,
            countNew : function(){
                if(!options.show_feed && options.lastId>0){
                    setInterval(function(){
                        operateFactory.create('countNew',function(txt){
                            if(txt.indexOf('<TSAJAX>')==0) {
                                if(txt.indexOf('<HASNEW>')!=-1) {
                                    $('#countNew').html(txt);
                                    events.loadNew();
                                }
                            }else{
                                //location.reload();
                            }
                        });
                    },options.timeStep);
                }
            },
            closeCallback:function(fn){
                popup.closeCallback = fn;
            },
            showAndHideMenu:function (id, e, on, off){  
                try{  
                    var sbtitle=document.getElementById(id);  
                    if(sbtitle){  
                        if(sbtitle.style.display=='block'){  
                            sbtitle.style.display='none';  
                            $(e).removeClass(off).addClass(on);
                        }else{  
                            sbtitle.style.display='block';
                            $(e).removeClass(on).addClass(off);
                        }  
                    }  
                }catch(e){}  
            },
            setLastIdByWeiboListDiv:function(){
               setLastIdByWeiboListDiv();
            },
            reset:function(){
            	$(options.publishForm.type).val(0);
                popup && popup.remove();
                if($.obj != null){
                    $.obj.destroy();
                    $.obj = null;
                }
                if(popup && popup.closeCallback != undefined && typeof popup.closeCallback == 'function'){
                    popup.closeCallback();
                }
                hasBox = false;
            },
            publish_type_val:function(publish_type){
                $(options.publishForm.type).val( publish_type );
            },
            //发布操作
            do_publish:function(){
                if( before_publish() ){
                    textareaStatus('sending');
                    var options = {
                        success: function(txt) {
                          if(txt){
                              after_publish(txt);
                              setLastIdByWeiboListDiv();
                          }else{
                              alert( '发布失败' );
                          }
                        }
                    };
                    $(options.publishForm.form).ajaxSubmit( options );
                    return false;
                }
            },
            //删除一条微博
            deleted:function(weibo_id,appid,src_id){
            	operateFactory.create("deleteWeibo",function(txt){
            		txt = parseInt(txt);
                    if(txt != -1){
                        $("#list_li_"+weibo_id).slideUp('fast');
                        downCount('weibo');
                        if(src_id) {
                        	//更新评论数
                        	$("a[rel='comment'][minid='"+src_id+"']").html("评论("+txt+")");
                        }
                    }else{
                        dialog.error('删除失败');
                    }
               },{app_id:appid,id:weibo_id,src_id:src_id});
            },
            upCount:function(){
                upCount();
            },
            addtheme:function(){
                var text = '#请在这里输入自定义话题#';
                var   patt   =   new   RegExp(text,"g");  
                var content_publish = $(options.publishForm.textarea);
                var result;
                            
                if( content_publish.val().search(patt) == '-1' ){
                    content_publish.insertAtCaret(text);
                
                var textArea = document.getElementById(options.publishForm.textarea.split('#').pop());
                
                result = patt.exec( content_publish.val() );
                
                var end = patt.lastIndex-1 ;
                var start = patt.lastIndex - text.length +1;
                
                if (document.selection) { //IE
                     var rng = textArea.createTextRange();
                     rng.collapse(true);
                     rng.moveEnd("character",end);
                     rng.moveStart("character",start);
                     rng.select();
                }else if (textArea.selectionStart || (textArea.selectionStart == '0')) { // Mozilla/Netscape…
                    textArea.selectionStart = start;
                    textArea.selectionEnd = end;
                }
                textArea.focus();
                return ;
                }
            },
            publish_type_box:function(content,obj){
                var obj_left = $(obj).offset().left;
                var mg_left = obj_left - $('#publish_type_content_before').offset().left+($(obj).width()/2);
                //if(this.hasBox) return;
                var html = '<div class="talkPop">'
                    + '<div style="position:relative; height:7px; line-height:3px; z-index:99">'
                    + '<img class="talkPop_arrow" style="margin-left:'+ mg_left +'px;position:absolute;" src="/images/zw_img.gif" /></div>'
                    + '<div class="talkPop_box">'
                    + '<div class="pop_tit close" id="weibo_close_handle"><a href="javascript:void(0)" class="del" onclick="$.reset()" > </a></div>'
                    + '<div id="publish_type_content">'+content+'</div>'
                    + '</div></div>';
                $('div.talkPop').remove();
                $("#publish_type_content_before").after( html );
                popup = $('.talkPop');
                //点击以后消失
                pubBoxBtn = obj;
                $('body').on('click.wbpubbox',closePubBox);
            },
            //检查字数输入
            checkInputLength:function(num){
                var len = getLength($(options.publishForm.textarea).val(), true);
                var wordNumObj = $(options.publishForm.wordNum);
                checkInputLength(num,$(options.publishForm.wordNum),$(options.publishForm.textarea));
            },
            contentFirst:function(id){
                var text = document.getElementById(id);
                if (document.selection) { //IE
                     var rng = text.createTextRange();
                     rng.collapse(true);
                     rng.moveStart("character",0);
                }else if (text.selectionStart || (text.selectionStart == '0')) { // Mozilla/Netscape…
                    text.selectionStart = 0;
                    text.selectionEnd = 0;
                }
                text.focus();
            },
            initForm:function(id,callback,systemType){
            	id = id || options.publishForm.form.split('#').pop();
            	if(!callback){
            		callback = { 
            			enter:function(formObj,buttonObj,contentObj,numObj,txt){
            				after_publish(txt);
            			}
            		};
            	}
                var formObj    = $('#'+id),
                    buttonObj  = formObj.find('.buttonObj'),
                    contentObj = formObj.find('.contentObj'),
                    numObj     = formObj.find('.numObj');
          
                
                var defType = $.extend(options.systemType, systemType);
                initHtml(formObj,defType.emotions,defType.topic);
                form(formObj,buttonObj,contentObj,numObj,callback);
            },
            plugin:{}
	});
	
	
	/*------------------工具方法----------------------------*/
	//发布按钮状态
    var textareaStatus = function(type,obj){
        var obj = (obj==undefined)?$(options.publishForm.button):obj;
        switch(type){
            case 'on':
                obj.removeAttr('disabled').removeClass('btn_big_disable').addClass('btn_big_after');
            break;
            case 'off':
                obj.attr('disabled','true');
            break;
            case 'sending':
                obj.attr('disabled','true').removeClass('btn_big_after').addClass('btn_big_disable');
            break;
        }
    },
    pubBoxBtn = null,
    closePubBox = function(event){
		var ptc = $('#publish_type_content');
		if(ptc.length==0){
			$('body').off('click.wbpubbox',closePubBox);
			return false;
		}
		var inBtn = (pubBoxBtn == event.target) || $.contains(pubBoxBtn,event.target);
		if(inBtn){
			return false;
		}
		var ct = ptc[0].parentNode.parentNode;
		var inContent = (ct == event.target) || $.contains(ct,event.target);
		if(inContent){
			return false;
		}
		$(ct).remove();
		$('body').off('click.wbpubbox',closePubBox);
	},
    checkInputLength = function(num,numObj,contentObj,buttonObj){
        var len = getLength(contentObj.val(), true);//getLength工具方法
        var wordNumObj = numObj;
        if(len==0){
            wordNumObj.css('color','').html('你还可以输入<strong id="strconunt">'+ (num-len) + '</strong>字');
            textareaStatus('off',buttonObj);
        }else if( len > num ){
            wordNumObj.css('color','red').html('已超出<strong id="strconunt">'+ (len-num) +'</strong>字');
            textareaStatus('off',buttonObj);
        }else if( len <= num ){
            wordNumObj.css('color','').html('你还可以输入<strong id="strconunt">'+ (num-len) + '</strong>字');
            textareaStatus('on',buttonObj);
        }
    },
    before_publish = function(obj){
        var obj = obj==undefined?$(options.publishForm.textarea):obj;
        if( $.trim( obj.val() ) == '' ){
            dialog.error('内容不能为空');     
            return false;
        }else if($.trim( obj.val() ) == '#请在这里输入自定义话题#'){
        	dialog.error('请输入自定义话题');
			return false;
		}
        return true;
    },
    //发布后的处理
    after_publish = function(txt){
            $.reset();
            $(options.weiboListDiv).prepend( txt ).slideDown('slow');
            var sync = [];
            $('#Sync').find('input[type="checkbox"]').each(function(){
                if($(this).attr('checked')){
                    sync.push($(this));
                }
            });
            
            $(options.publishForm.form).clearForm();
            for(var one in sync){
                sync[one].attr('checked',true);
            }
            var publishMsg = $(options.publishForm.publishMsg).val();
            dialog.success(publishMsg || '发言成功');
    },
    upCount=function(type){
        if(type=='weibo'){
            $("#miniblog_count").html( parseInt($('#miniblog_count').html())+1 );
        }
    },
    downCount=function(type){
        if(type=='weibo'){
            $("#miniblog_count").html( parseInt($('#miniblog_count').html())-1 );
        }
    },
    setLastIdByWeiboListDiv=function(){
        options.lastId = $(options.weiboListDiv).find('li:first').attr('id').split("_").pop();
    },
    form=function(formObj,buttonObj,contentObj,numObj,callback){
        var callbackStruct={
            keypress:function(formObj,buttonObj,contentObj,numObj){},
            blur:function(formObj,buttonObj,contentObj,numObj){},
            focus:function(formObj,buttonObj,contentObj,numObj){},
            enter:function(formObj,buttonObj,contentObj,numObj,txt){},
            after:function(formObj,buttonObj,contentObj,numObj){}
        },Interval;
        callback = $.extend(callbackStruct, callback);
        contentObj.keypress(function(event){
            var key = event.keyCode?event.keyCode:event.which?event.which:event.charCode;
            if (key == 27) {
                clearInterval(Interval);
            }
            callback.keypress(formObj,buttonObj,contentObj,numObj);
            checkInputLength(_LENGTH_,numObj,contentObj,buttonObj);
        }).blur(function(){
            clearInterval(Interval);
            callback.blur(formObj,buttonObj,contentObj,numObj);
            checkInputLength(_LENGTH_,numObj,contentObj,buttonObj);
        }).focus(function(){
            if(callback.focus(formObj,buttonObj,contentObj,numObj)){
                 checkInputLength(_LENGTH_,numObj,contentObj,buttonObj);
            }
             //微博字数监控
            clearInterval(Interval);
            Interval = setInterval(function(){
                         checkInputLength(_LENGTH_,numObj,contentObj,buttonObj);
                        },300);
        });
        callback.after(formObj,buttonObj,contentObj,numObj);
        checkInputLength(_LENGTH_,numObj,contentObj,buttonObj);
        
        var publish = function(){
            if(before_publish(contentObj)){
               textareaStatus('sending',buttonObj);
               var options = {
                   success:function(txt){
                       if(txt){
                           if(txt==0){
                        	   dialog.success('您的发言含有敏感词，请等待审核！');
                           }else if(txt=='disable_publish_weibo'){
                        	   dialog.error("系统升级维护，暂停发言，敬请谅解！");//add by hqq
                           }else if(txt=='failed'){
                        	   dialog.error("失败！");
                           }else{
                               callback.enter(formObj,buttonObj,contentObj,numObj,txt);
                               upCount('weibo');
                               checkInputLength(_LENGTH_,numObj,contentObj,buttonObj);
                               if(options.lastId>0){
                                   setLastIdByWeiboListDiv();
                               }
                           }
                       }else{
                    	   dialog.error(buttonObj.attr('error'));
                       }
                       textareaStatus('on',buttonObj);
                   }
               };
               clearInterval(Interval); 
               //formObj.ajaxSubmit( options );
            }
         };
         buttonObj.click(publish);
        shortcut('ctrl+return', publish,{'target':formObj.attr('id')});
    };
    
    var events = {
            loadNew:function(){
                $(options.loadNewDiv).find('a').click(function() {
                    var limit = $(this).attr('limit');
                    operateFactory.create("loadNew",function(txt){
                        if(txt.indexOf('<TSAJAX>')==0){
                            if(txt.indexOf('<HASNEW>')!=-1) {
                                $(options.loadNewDiv).html('');
                                $(options.weiboListDiv).prepend(txt);
                                setLastIdByWeiboListDiv();
                            }
                        }else{
                            location.reload();
                        }
                    },{limit:limit});
                });
            },
            lodeMore:function(){
                 $(options.loadMoreDiv).click(function() {
                    $(this).html('加载中...');
                    var self = this;
                    try{
                    	var tempSinceId = $(options.weiboListDiv).find('li:last').attr('id').split("_").pop();
                    }catch(e){
                    	var tempSinceId = false;
                    }
                    options.sinceId = tempSinceId ? tempSinceId : options.sinceId;
                    operateFactory.create("loadMore",function(txt){
                        clearInterval(isLoading);
                        isLoading = false;
                        $(options.weiboListDiv).append(txt);
                        try{
                        	// var tempSinceId = $(options.weiboListDiv).find('li:last').attr('id').split("_").pop();
                        	var tempSinceId = $(options.weiboListDiv).find("li[id^='list_li_']").last().attr('id').split('_').pop();
                        }catch(e){
                        	var tempSinceId = false;
                        }
                        options.sinceId = typeof(sinceId) == 'undefined' ? tempSinceId : (tempSinceId || sinceId) ;
						//判断没有更多数据时.不显示更多按钮
						if(txt.indexOf('<HASNEW>')==-1){
							$(self).parent().html('<span class="morefoot">没有更多数据了</span>');
						}else{
							$(self).html('<span class="ico_morefoot"></span>更多');
						}
					});
                });
            },
            comment:function(){
            	// 评论切换
                $(options.weiboList.comment.a).bind("click",function(){
                	var id = $(this).attr('minid');
                	var appid = $(this).attr('appid');
                	var $comment_list = $("#comment_list_"+id);
					if( $comment_list.html() == '' ){
						$comment_list.html(options.loading);
						operateFactory.create("comment",function(txt){
							$comment_list.html( txt ) ;
						},{id:id,appid:appid});
					}else{
						$comment_list.html("");
					}
					return false;
                });
            },
            scrollResize:function(){
            	var loadCount = 0;
                $(window).bind('scroll resize',function(event){
                    if(loadCount <3 && !isLoading){
                        var bodyTop = document.documentElement.scrollTop + document.body.scrollTop;
                           //滚动到底部时出发函数
                           //滚动的当前位置+窗口的高度 >= 整个body的高度
                        if(bodyTop+$(window).height() >= $(document.body).height()){
                               isLoading = true;
                               $(options.loadMoreDiv).click();
                               loadCount ++;
                        }
                    }
                    
               });
            }
    };
        
    
    var initHtml=function(parent,emtions,topic){
        var emotionsHtml = "<a href=\"javascript:void(0)\" target_set=\"content_publish\" onclick=\"ui.emotions(this)\" class=\"a52\">"
            + "<img class=\"icon_add_face_d\" src=\"/images/zw_img.gif\" />表情</a> ";
        var topicHtml    = "<a href=\"javascript:void(0)\" onclick=\"$.addtheme()\" class=\"a52\">"
            + "<img class=\"icon_add_topic_d\" src=\"/images/zw_img.gif\" />话题</a> ";
        var html = '';
        if(emtions){
            html += emotionsHtml;
        }
        if(topic){
            html += topicHtml;
        }
        parent.find(options.publishForm.weiboType).prepend(html);
    };
            
	
	
	/*-----------------------------操作类型的一个控制器---------------------*/
	var OperateFactory = function (type){
		this.init(type);
	};
	/*
	OperateFactory.prototype = {
			
		    appcomment : {
		        deleteWeibo:{
		          url:U("appstore/Evaluate/removeComment")
		        },
		        comment:{
		            url:U("appstore/Evaluate/getReplyListBySrcId")
		        }
		    },
		    type : null,
		    typeList:{
                APPCOMMENT:4
            },
		    init : function (nowType){
		        switch(nowType){
		            case this.typeList.APPCOMMENT:
		            	this.type = this.appcomment;
		                break;
		        };
		    },
		    post : function(type,otherParam){
		    	//debugger;
				var param = {};
		        for(var one in type.param){
		            if(options[type.param[one]] != undefined){
		                param[one] = options[type.param[one]];
		            }else{
		                param[one] = type.param[one];
		            }
		        }
		        if(otherParam){
		            param = $.extend(param, otherParam);
		        }
		        $.post(type.url,param,type.callback);
			},
		    create : function(commond,callback,params){
		    	//debugger;
		        var temp = this.type[commond];
		        if(temp != undefined){ 
		            temp.callback = callback;
		            this.post(temp,params);
		        }
		    }
	};
	*/
	
})(jQuery);
