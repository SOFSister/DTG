var filePath, fileFormat, src = "";
var lastEditBtn = "";

function mustEnter(obj) {
    $(obj).html("编辑");
    $(obj).removeClass("enterBtn").removeClass("btn-success").addClass("editBtn").addClass("btn-primary");
    $(obj).unbind('click');
    $(obj).click(edit);
    //产品名称
    var tdNameObj = $(obj).parent().prev().prev().prev().prev().prev();
    var preNameText = $(tdNameObj).children().val();
    $(tdNameObj).html(preNameText);

    //产品价格
    var tdPriceObj = $(obj).parent().prev().prev().prev().prev();
    var prePriceText = $(tdPriceObj).children().val();
    $(tdPriceObj).html(prePriceText);

    //产品评价
    var tdEvaluationObj = $(obj).parent().prev().prev().prev();
    var preEvaluationText = $(tdEvaluationObj).children().val();
    $(tdEvaluationObj).html(preEvaluationText);

    //产品图片
    var tdImgObj = $(obj).parent().prev().prev();
    if (src == "" || src == undefined) {
        $(tdImgObj).html("无");
    } else {
        var inputImgObj = $('<img src="" alt="">');
        tdImgObj.html(""); //清空td中的所有元素
        inputImgObj
            .width(tdImgObj.width() * 0.5)
            .height(tdImgObj.height())
            .appendTo(tdImgObj);
        $(inputImgObj).attr('src', src).attr('data-url', filePath);
    }
    //产品状态
    var tdStatusObj = $(obj).parent().prev();
    var preStatusText = $(tdStatusObj).children().val();
    $(tdStatusObj).html(preStatusText);
}

function enter(params) {
    $(this).html("编辑");
    $(this).removeClass("enterBtn").removeClass("btn-success").addClass("editBtn").addClass("btn-primary");
    $(this).unbind('click');
    $(this).click(edit);
    //产品名称
    var tdNameObj = $(this).parent().prev().prev().prev().prev().prev();
    var preNameText = $(tdNameObj).children().val();
    if(preNameText==""){
        prePriceText="未命名";
    }
    $(tdNameObj).html(preNameText);

    //产品价格
    var tdPriceObj = $(this).parent().prev().prev().prev().prev();
    var prePriceText = $(tdPriceObj).children().val();
    if(prePriceText==""){
        prePriceText="9999";
    }
    $(tdPriceObj).html(prePriceText);

    //产品评价
    var tdEvaluationObj = $(this).parent().prev().prev().prev();
    var preEvaluationText = $(tdEvaluationObj).children().val();
    $(tdEvaluationObj).html(preEvaluationText);

    //产品图片
    var tdImgObj = $(this).parent().prev().prev();
    if (src == "" || src == undefined) {
        $(tdImgObj).html("无");
    } else {
        var inputImgObj = $('<img src="" alt="">');
        tdImgObj.html(""); //清空td中的所有元素
        inputImgObj
            .width(tdImgObj.width() * 0.5)
            .height(tdImgObj.height())
            .appendTo(tdImgObj);
        $(inputImgObj).attr('src', src).attr('data-url', filePath);
    }
    //产品状态
    var tdStatusObj = $(this).parent().prev();
    var preStatusText = $(tdStatusObj).children().val();
    $(tdStatusObj).html(preStatusText);
}

function edit(params) {
    if (lastEditBtn != $(this)) {
        mustEnter(lastEditBtn);
        src = "";
    }
    lastEditBtn = $(this);
    $(this).html("确认");
    $(this).removeClass("editBtn").removeClass("btn-primary").addClass("enterBtn").addClass("btn-success");
    $(this).unbind('click');
    $(this).click(enter);
    //产品名称
    var tdNameObj = $(this).parent().prev().prev().prev().prev().prev();
    var preNameText = tdNameObj.html();
    //得到当前文本内容
    var inputNameObj = $("<input type='text' />");
    //创建一个文本框元素
    tdNameObj.html(""); //清空td中的所有元素
    inputNameObj
        .width(tdNameObj.width())
        //设置文本框宽度与td相同
        .height(tdNameObj.height())
        .val(preNameText)
        .appendTo(tdNameObj);

    //产品价格
    var tdPriceObj = $(this).parent().prev().prev().prev().prev();
    var prePriceText = tdPriceObj.html();
    var inputPriceObj = $("<input type='text' />");
    tdPriceObj.html(""); //清空td中的所有元素
    inputPriceObj
        .width(tdPriceObj.width())
        .height(tdPriceObj.height())
        .val(prePriceText)
        .appendTo(tdPriceObj)
        .bind("input propertychange", function () {
            console.log('changed');
            this.value=this.value.replace(/[^\d]/g,'')
        });

    //产品评价
    var tdEvaluationObj = $(this).parent().prev().prev().prev();
    var preEvaluationText = tdEvaluationObj.html();
    var inputEvaluationObj = $('<select name="" id="" style="width: 100%;height: 100%;"><option value="5">5</option><option value="4">4</option><option value="3">3</option><option value="2">2</option</select>');
    tdEvaluationObj.html(""); //清空td中的所有元素
    inputEvaluationObj
        .width(tdEvaluationObj.width())
        .height(tdEvaluationObj.height())
        .val(preEvaluationText)
        .appendTo(tdEvaluationObj);

    //产品图片
    var tdImgObj = $(this).parent().prev().prev();
    src = tdImgObj.children().attr("src");
    var inputImgObj = $("<input type='file'/>");
    tdImgObj.html(""); //清空td中的所有元素
    inputImgObj
        .width((tdImgObj.width()))
        .height(tdImgObj.height())
        .appendTo(tdImgObj);
    $(inputImgObj).on('change', function () {
        filePath = $(this).val(); //获取到input的value，里面是文件的路径
        fileFormat = filePath.substring(filePath.lastIndexOf(".")).toLowerCase();
        // 检查是否是图片
        if (!fileFormat.match(/.png|.jpg|.jpeg/)) {
            alert('上传错误,文件格式必须为：png/jpg/jpeg');
            $(this).val("");
            return;
        }
        src = window.URL.createObjectURL(this.files[0]); //转成可以在本地预览的格式
    });
    //产品状态
    var tdStatusObj = $(this).parent().prev();
    var preStatusText = tdStatusObj.html();
    var inputStatusObj = $('<select name="" id="" style="width: 100%;height: 100%;"><option value="启用">启用</option><option value="禁用">禁用</option></select>');
    tdStatusObj.html(""); //清空td中的所有元素
    inputStatusObj
        .width(tdStatusObj.width())
        .height(tdStatusObj.height())
        .val(preStatusText)
        .appendTo(tdStatusObj);
}

function dele() {
    $(this).parent().parent().remove();
}

function add() {
    var nameText=$("#nameText").val();
    var priceText=$("#priceText").val();
    var evaluationText=$("#evaluationText").val();
    var imgSrcText=$("#aimImg").attr("src");
    var statusText=$("#statusText").val();
    console.log(imgSrcText);
    if(nameText==""||priceText==""||evaluationText=="--请选择--"||imgSrcText==undefined||statusText=="--请选择--"){
        alert("必须填写完整信息才能添加商品");
        return;
    }
    var addStr="";
    addStr+="<tr>";
    addStr+="<td>"+nameText+"</td>";
    addStr+="<td>"+priceText+"</td>";
    addStr+="<td>"+evaluationText+"</td>";
    addStr+="<td>"+'<img src="'+imgSrcText+'" alt="" style="width:50%;height:100%;">'+"</td>";
    addStr+="<td>"+statusText+"</td>";
    addStr+="<td>"+'<button class="btn btn-primary editBtn">编辑</button><button class="btn btn-primary deleBtn">删除</button>'+"</td>";
    addStr+="</tr>";
    $("#productList").append(addStr);
    $(".editBtn").unbind('click');
    $(".deleBtn").unbind('click');
    $(".editBtn").click(edit);
    $(".deleBtn").click(dele);
}
$(function () {
    $(".editBtn").click(edit);
    $(".deleBtn").click(dele);
    //$(".addBtn").click(add);
    var changed=false;
    $("#resetBtn1").click(function (e) { 
        changed=false;
        $("#aimImg").remove();
    });
    $("#imgText").change(function (e) { 
        var imgfilePath = $(this).val(); //获取到input的value，里面是文件的路径
        var imgfileFormat = imgfilePath.substring(imgfilePath.lastIndexOf(".")).toLowerCase();
        // 检查是否是图片
        if (!imgfileFormat.match(/.png|.jpg|.jpeg/)) {
            alert('上传错误,文件格式必须为：png/jpg/jpeg');
            $(this).val("");
            return;
        }
        var imgsrc = window.URL.createObjectURL(this.files[0]); //转成可以在本地预览的格式
        var tdImgObj=$(this).parent();
        if(changed==false){
            var inputImgObj = $('<img src="" alt="" id="aimImg">');
            //tdImgObj.html(""); //清空td中的所有元素
            inputImgObj
                .width(tdImgObj.width() * 0.5)
                .height(tdImgObj.height())
                .appendTo(tdImgObj);
            tdImgObj.children("img").attr('src', imgsrc);
        }
        else{
            tdImgObj.children("img").attr('src', imgsrc);
        }
        changed=true;
    });
});