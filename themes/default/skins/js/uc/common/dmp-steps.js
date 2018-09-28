/**
 * Created by ZhangYe on 2015/8/29.
 */
$(function() {
    /**表单验证**/
    var form = $(".dmp-step-form");
    form.validate({
        errorPlacement: function errorPlacement(error, element) {
            element.after(error);
        }
    });
    /**步骤生成**/
    form.children("div").steps({
        headerTag: "h3",
        bodyTag: "section",
        transitionEffect: "slideLeft",
        labels: {
            cancel: "取消",
            current: "当前：",
            pagination: "分页",
            finish: "完成",
            next: "下一步",
            previous: "上一步",
            loading: "载入中..."
        },
        onStepChanging: function (event, currentIndex, newIndex) {
            form.validate().settings.ignore = ":disabled,:hidden";
            return form.valid();
        },
        onFinishing: function (event, currentIndex) {
            form.validate().settings.ignore = ":disabled";
            return form.valid();
        },
        onFinished: function (event, currentIndex) {
            alert("Submitted!");
        }
    });
    var step_width = 100/($('.wizard .steps ul li').length);
    $('.wizard .steps ul li').css('width',step_width+'%');

});