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
    //搜索功能
    
    //添加商品
    $addCommodityBtn= $('[data-target="#myModal"]');//加号按钮
    $selectedLocation=1;//当前选中的位
    $.each($addCommodityBtn, function (index, value) { 
        $($addCommodityBtn[index]).click(function (e) { 
           $selectedLocation=index;
        });
    });
    $("#myModalEnterBtn").click(function (e) { 
        $nowVal=$('[class="col-sm-6 col-md-4"]:nth-of-type('+($selectedLocation+1)+') h4:nth-of-type(2)').html();//获取当前商品个数
        $('[class="col-sm-6 col-md-4"]:nth-of-type('+($selectedLocation+1)+') h4:nth-of-type(2)').html((1+Number($nowVal)));//设置新的商品个数+1
    });
    //模态框选项切换
    $('#pickle').click(function (e) { 
        $('#sweetness').hide();
    });
    $('#soySauce').click(function (e) { 
        $('#sweetness').show();
    });
    //减少商品

    //
})