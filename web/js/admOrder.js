$(function () {
    $("#cookOverBtn").click(function (){
        $.ajax({
            url: "OrderListInfoServlet",
            type: "POST",
            data: {
                "action":"deletOrders",
            },
            async:false,
            dataType: "text",
            success: function (data){
                window.location.reload();
            },
            error:function (){
                alert("请求失败");
            }
        });
    });
});