function init() {
    $('[data-toggle="popover"]').popover();
    $(".dropdown").mouseover(function () {
        $(this).addClass("open");
    });
    $(".dropdown").mouseleave(function () {
        $(this).removeClass("open");
    })
}
$(function () {
    //初始化
    init();
    
})