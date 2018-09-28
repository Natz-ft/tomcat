/**
 * Created by LQJ on 2015/8/18.
 * ����jQuery
 */
;!function($) {
    var montageLeftHtml = function(data) {
        var html = '';

        for(var i = 0; i < data.length; i++) {
            var li_data = data[i];
            var icon_html='';
            if(li_data.icon!=null){
                icon_html = '<i class="fa '+li_data.icon+'"></i>';
            }
            html += '<li' + (li_data.children ? ' class="sub-menu"' : '') + '>'
                    + '<a href="' + (li_data.request_action ? li_data.request_action : 'javascript:;') + '"'
                    + (li_data.targetMenu ? ' data-value="' + li_data.targetMenu + '"' : '') + '>'
                    + icon_html
                    + li_data.menu_name
                    + '</a>'
                    + (li_data.children ? '<ul class="sub">' + montageLeftHtml(li_data.children) + '</ul>' : '')
                    + '</li>';
        }

        return html;
    };
    var montageTopHtml = function(data) {
        var html = '<ul class="nav navbar-nav">';
        for(var i = 0; i < data.length; i++) {
            var li_data = data[i];
            var icon_html='';
            if(li_data.icon!=null){
                icon_html = '<i class="fa '+li_data.icon+'"></i>';
            }
            html += '<li>'
                    + '<a href="javascript:;"'
                    + (li_data.targetMenu ? ' data-value="' + li_data.targetMenu + '"' : '') + '>'
                    + icon_html
                    + li_data.menu_name + '</a>'
                    + (li_data.children ?
                    function() {
                        var children = li_data.children,
                            childrenHtml = '<div class="drop-menu"><ul>';

                        for(var j = 0; j < children.length; j++) {
                            var child = children[j];
                            childrenHtml += '<li>'
                                            + '<a href="' + (child.request_action ? child.request_action : 'javascript:;') + '"'
                                            + (child.targetMenu ? ' data-value="' + child.targetMenu + '"' : '') + '>'
                                            + (child.iconImg ? '<img src="img/common/top-menu/' + child.iconImg + '.gif"><br>' : '')
                                            + child.menu_name + '</a>'
                                            + '</li>';
                        }
                        childrenHtml += '</ul></div>';

                        return childrenHtml;
                    }() : '')
                    + '</li>';
        }
        html += '</ul>';

        return html;
    };
    $.fn.dmpLoadMenu = function(data, type) {
        if(!data) return;
        var _this = $(this),
            _type = type || 'side';

        switch(_type) {
            case 'top':
                _this.html(montageTopHtml(data));
                break;
            case 'side':
                var html = '<li class="sub-menu">'
                            + '<a href="javascript:;">' + data.menu_name + '</a>'
                            + '<ul class="sub">'
                            + montageLeftHtml(data.children)
                            + '</ul></li>';
                _this.html(html);
                break;
            default: break;
        }
    }
}(jQuery);
