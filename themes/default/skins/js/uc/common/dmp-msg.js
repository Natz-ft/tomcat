/**
 * Created by ZhangYe on 2015/9/11.
 */
/**依赖 dialog.js 的消息框方法**/
/**
 * msg.confirm('title 标题','content 内容','callback 回调函数')
 * msg.alert('title 标题','content 内容','callback 回调函数')
 * msg.info('content 内容','callback 回调函数','timeout 停留时间')
 * msg.loading(option)
 * 显示加载提示信息
 * loading option = {
	 * 	type Number|String
	 * 		加载图片的类型，在公共images目录下的loading目录下维护，格式为loading_[type].gif
	 * 	text String
	 * 		加载显示的文本内容，默认没有文本内容
	 * 	modal boolean|Array
	 * 		指定是否显示遮罩层和设置遮罩层的颜色、透明度，默认为false（不显示），设置为true则显示为白色（#FFF）透明度为0.3的遮罩层，
	 * 		可用二维数组设置，一维为颜色值，二维为透明度，如['#000', 0.3]
	 * }
 *
 * 更多用法请参考 dialog.js源代码
 */
var msg_show_type = 'parent';//通用msg方法展示方式
var msg = {
    confirm: function(title, content, callback){
        if(msg_show_type == 'parent'){
            parent.dialog.confirm(title, content, callback);
        }
        if(msg_show_type == 'self'){
            dialog.confirm(title, content, callback);
        }
    },
    progress: function(content, callback, timeout){
        if(msg_show_type == 'parent'){
            parent.dialog.progress(content, callback, timeout);
        }
        if(msg_show_type == 'self'){
            dialog.progress(content, callback, timeout);
        }
    },
    alert: function(title, content, callback){
        if(msg_show_type == 'parent'){
            parent.dialog.alert(title, content, callback);
        }
        if(msg_show_type == 'self'){
            dialog.alert(title, content, callback);
        }
    },
    info: function(content, callback, timeout){
        if(msg_show_type == 'parent'){
            parent.dialog.info(content, callback, timeout);
        }
        if(msg_show_type == 'self'){
            dialog.info(content, callback, timeout);
        }
    },
    loading: function(option){
        if(msg_show_type == 'parent'){
            parent.dialog.loading(option);
        }
        if(msg_show_type == 'self'){
            dialog.loading(option);
        }
    },
    self : {
        confirm: function(title, content, callback){
            dialog.confirm(title, content, callback);
        },
        progress: function(content, callback, timeout){
            dialog.progress(content, callback, timeout);
        },
        alert: function(title, content, callback){
            dialog.alert(title, content, callback);
        },
        info: function(content, callback, timeout){
            dialog.info(content, callback, timeout);
        },
        loading: function(option){
            if(msg_show_type == 'parent'){
                parent.dialog.loading(option);
            }
            if(msg_show_type == 'self'){
                dialog.loading(option);
            }
        }
    },
    parent:{
        confirm: function(title, content, callback){
            parent.dialog.confirm(title, content, callback);
        },
        progress: function(content, callback, timeout){
            parent.dialog.progress(content, callback, timeout);
        },
        alert: function(title, content, callback){
            parent.dialog.alert(title, content, callback);
        },
        info: function(content, callback, timeout){
            parent.dialog.info(content, callback, timeout);
        },
        loading: function(option){
            parent.dialog.loading(option);
        }
    }

}