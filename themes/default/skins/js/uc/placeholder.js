var PlaceHolder = {
    _support: (function() {
        return 'placeholder' in document.createElement('input');
    })(),
	
	_options: {
		//要兼容placeholder属性的对象
		targets: (function() {
			//未对textarea处理，需要的另外加上
            var inputs = document.getElementsByTagName('input');
            return inputs;
		})(),
		className: 'input-tip' //提示文字的样式，需要在页面中其他位置定义
	},
 
    create: function(options) {
    	if (!PlaceHolder._support) {
    		PlaceHolder._options = PlaceHolder._extend(PlaceHolder._options, options);
    		var input,inputs = PlaceHolder._options.targets;
    		if (!inputs.length) {
                inputs = [inputs];
            }
            for (var i = 0, length = inputs.length; i <length; i++) {
                input = inputs[i];
                if (!PlaceHolder._support && input.attributes && input.attributes.placeholder) {
                    PlaceHolder._setValue(input);
                    PlaceHolder._onEvent(input, "focus", function(e) {
                        if (input.value === input.attributes.placeholder.nodeValue) {
                        	input.value = '';
                        	PlaceHolder._removeClass(input, PlaceHolder._options.className);
                        }
                    });
                    PlaceHolder._onEvent(input, "blur", function(e) {
                    	if (input.value === '') {
                            PlaceHolder._setValue(input);
                        }
                    });
                }
            }
    	}
    },
    
    _setValue: function(input) {
        input.value = input.attributes.placeholder.nodeValue;
        PlaceHolder._addClass(input, PlaceHolder._options.className);
    },
    
    _addClass: function(input,className) {
    	input.className += " "+className;
    },
    
    _removeClass: function(input,className) {
    	input.className = input.className.replace(" "+className,"");
    },
    
    _onEvent: function (node, event, cb) {
		if (node == null) {
			return false;
		}
		if ((typeof cb).toLowerCase() != "function") {
			return;
		}
		if (node.attachEvent) {
			node.attachEvent("on" + event, cb);
		} else {
			if (node.addEventListener) {
				node.addEventListener(event, cb, false);
			} else {
				node["on" + event] = cb;
			}
		}
		return true;
	},
	
	//模拟jquery中的$.extend方法
	_extend: function(destination,source,deepRecursion) {
		var property,deepRecursion = false || deepRecursion;
		for(var property in source) {
			if(deepRecursion && (typeof source[property]).toLowerCase() == "object") {
				PlaceHolder._extend(destination[property], source[property], true);
			} else {
				destination[property] = source[property];
			}
		}
		return destination;
	}
};

/*
//页面初始化时对所有input做初始化
PlaceHolder.create();
//或者单独设置某个元素
PlaceHolder.create({
	targets: document.getElementById('t1')
});
*/