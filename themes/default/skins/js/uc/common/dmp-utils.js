/**
 * Created by Emicky on 15/9/1.
 */

/**
 * 让多个panel 登高
 */
function makeSameHeight(){
    var h = 0;
    for(var i = 0; i < arguments.length; i++){
        var h0 = $(arguments[i]).height();
        h = Math.max(h0, h);
    }

    for(var i = 0; i < arguments.length; i++){
        $(arguments[i]).height(h);
    }
}