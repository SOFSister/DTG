<%--
  Created by IntelliJ IDEA.
  User: 87428
  Date: 2021/11/17
  Time: 19:13
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!doctype html>
<html lang="zh-CN">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- 上述3个meta标签*必须*放在最前面，任何其他内容都*必须*跟随其后！ -->
    <title>admOrder DaTouGe</title>

    <!-- Bootstrap -->
    <link href="../bootstrap-3.3.7-dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="../css/admOrder.css">
</head>

<body>
<!--手机导航栏-->
<div id="mobile-menu" class="mobile-nav">
    <ul>
        <h3 class="text-white" style="height: 5rem;">大头哥管理员系统</h3>
        <li><a href="admIndex.jsp">商品管理</a></li>
        <li><a href="admAccount.jsp">账号管理</a></li>
        <li><a href="admOrder.jsp" id="selected">查看订单</a></li>
    </ul>
</div>
<div class="container" id="main" style="overflow-y:auto;">
    <div class="jumbotron">
        <div class="container">
            <div style="display: inline-block; width: 70%; border-right: 1px solid ">
                <h2>正在制作</h2>
                <br>
                <p>订单:&nbsp;1</p>
                <p>顾客:&nbsp;874280179@qq.com</p>
                <p>时间:&nbsp;2021年11月10日19时11分</p>
                <p>详情:&nbsp;大排面——红烧加辣放糖加面</p>
                <br>
                <button class="btn btn-primary">制作完成</button>
            </div>
            <div style="display: inline-block;">
                <h2>下一个</h2>
                <br>
                <p>订单:&nbsp;1</p>
                <p>详情:&nbsp;大排面——红烧加辣放糖加面</p>
            </div>
        </div>
    </div>
    <hr>
    <div>
        <h1 style="display: inline-block;">订单列表</h1>
        <table id="productList">
            <tr>
                <th>订单号</th>
                <th>顾客</th>
                <th>下单时间</th>
                <th>订单详情</th>
            </tr>
            <tr>
                <td>1</td>
                <td>874280179@qq.com</td>
                <td>2021年11月10日19时11分</td>
                <td>大排面——红烧加辣放糖加面</td>
            </tr>
            <tr>
                <td>2</td>
                <td>874280179@qq.com</td>
                <td>2021年11月10日19时11分</td>
                <td>大排面——红烧加辣放糖加面</td>
            </tr>
            <tr>
                <td>3</td>
                <td>874280179@qq.com</td>
                <td>2021年11月10日19时11分</td>
                <td>大排面——红烧加辣放糖加面</td>
            </tr>
        </table>
    </div>
</div>


<!-- jQuery (Bootstrap 的所有 JavaScript 插件都依赖 jQuery，所以必须放在前边) -->
<script src="../js/jquery-3.4.1.min.js"></script>
<!-- 加载 Bootstrap 的所有 JavaScript 插件。你也可以根据需要只加载单个插件。 -->
<script src="../bootstrap-3.3.7-dist/js/bootstrap.min.js"></script>
<!-- 加载 自定义的js文件 -->
<script src="../js/cityAndPro.js"></script>
<script src="../js/admOrder.js"></script>
</body>

</html>
