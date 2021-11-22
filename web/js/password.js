function init() {
    $('[data-toggle="popover"]').popover();
    $(".dropdown").mouseover(function () {
        $(this).addClass("open");
    });
    $(".dropdown").mouseleave(function () {
        $(this).removeClass("open");
    })
}
function addCheckInput(){
    $(".isEmail").bind("input propertychange", function() {
        var value=$(this).val();
        var reg = /^\w+@([a-z0-9]{1,6})(\.[a-z]{2,3})+$/i;
        if(reg.test(value)){
            $(this).parent().addClass("has-success").removeClass("has-error");
            $("#nextBtn").removeAttr("disabled");
        }
        else{
            $(this).parent().removeClass("has-success").addClass("has-error");
            $("#nextBtn").attr("disabled","disabled");
        }
    });
}
$(function () {
    //初始化
    init();
    addCheckInput();
    $("#nextBtn").click(function (){
        $(".div-left").after("666");
    });
})