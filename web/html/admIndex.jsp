<%@ page import="db.DBConnection" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="java.util.Map" %><%--
  Created by IntelliJ IDEA.
  User: 87428
  Date: 2021/11/17
  Time: 19:11
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
    <title>Adm DaTouGe</title>

    <!-- Bootstrap -->
    <link href="../bootstrap-3.3.7-dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="../css/admIndex.css">
</head>

<body>
<%
    DBConnection dbConnection=new DBConnection();
    String sql="select * from productinfo";
    ArrayList<Map<String,String>> rs=dbConnection.queryForList(sql);
%>
<!--手机导航栏-->
<div id="mobile-menu" class="mobile-nav">
    <ul>
        <h3 class="text-white" style="height: 5rem;">大头哥管理员系统</h3>
        <li><a href="admIndex.jsp" id="selected">商品管理</a></li>
        <li><a href="admAccount.jsp">账号管理</a></li>
        <li><a href="admOrder.jsp">查看订单</a></li>
    </ul>
</div>
<div class="container" id="main" style="overflow-y:auto;">
    <div>
        <form action="UploadServlet" method="post" enctype="multipart/form-data" name="addProductForm" id="addProductForm">
            <h1 style="display: inline-block;">添加产品</h1>
            <input type="reset" value="重置" class="btn btn-primary" style="height: 4rem;width: 6rem;margin-top: -1rem;margin-left: 2rem;" id="resetBtn1">
            <table>
                <tr>
                    <th>产品名称</th>
                    <th>产品价格</th>
                    <th>产品评价</th>
                    <th>产品图片</th>
                    <th>产品状态</th>
                    <th>产品操作</th>
                </tr>
                <tr>
                    <td>
                        <input type="text" name="name" id="nameText" style="width: 100%;height: 100%;">
                    </td>
                    <td>
                        <input type="text" name="price" id="priceText" oninput="value=value.replace(/[^\d]/g,'')"
                               style="width: 100%;height: 100%;">
                    </td>
                    <td>
                        <select name="evaluation" id="evaluationText" style="width: 100%;height: 100%;">
                            <option value="">--请选择--</option>
                            <option value="5">5</option>
                            <option value="4">4</option>
                            <option value="3">3</option>
                            <option value="2">2</option>
                        </select>
                    </td>
                    <td>
                        <input type="file" name="file" id="imgText" style="width: 200%;height: 100%;">
                    </td>
                    <td>
                        <select name="status" id="statusText" style="width: 100%;height: 100%;">
                            <option value="">--请选择--</option>
                            <option value="启用">启用</option>
                            <option value="禁用">禁用</option>
                        </select>
                    </td>
                    <td>
                        <input type="submit" value="添加" class="btn btn-primary addBtn">
                    </td>
                </tr>
            </table>
        </form>
    </div>
    <hr>
    <div>
        <h1 style="display: inline-block;">产品列表</h1>
        <table id="productList">
            <tr>
                <th>产品名称</th>
                <th>产品价格</th>
                <th>产品评价</th>
                <th>产品图片</th>
                <th>产品状态</th>
                <th>产品操作</th>
            </tr>
            <%
                for (Map<String,String> item: rs) {
                    sql="select FilePath from productinfo,files where ProductImgName='"+item.get("ProductImgName")+"' and ProductImgName=FileName";
                    ArrayList<Map<String,String>> imgUrl=dbConnection.queryForList(sql);
            %>
            <tr id="<%=item.get("ProductID")%>">
                <td><%=item.get("ProductName")%></td>
                <td><%=item.get("ProductPrice")%></td>
                <td><%=item.get("ProductEvaluation")%></td>
                <td><img src="../<%=imgUrl.get(0).get("FilePath")%>" alt="" style="width: 50%;height: 100%"></td>
                <td><%=item.get("ProductStatus")%></td>
                <td>
                    <button class="btn btn-primary editBtn">编辑</button>
                    <button class="btn btn-primary deleBtn">删除</button>
                </td>
            </tr>
            <%  }
                dbConnection.close();
            %>
        </table>
    </div>
</div>


<!-- jQuery (Bootstrap 的所有 JavaScript 插件都依赖 jQuery，所以必须放在前边) -->
<script src="../js/jquery-3.4.1.min.js"></script>
<!-- 加载 Bootstrap 的所有 JavaScript 插件。你也可以根据需要只加载单个插件。 -->
<script src="../bootstrap-3.3.7-dist/js/bootstrap.min.js"></script>
<!-- 加载 自定义的js文件 -->
<script src="../js/admIndex.js"></script>
</body>

</html>
