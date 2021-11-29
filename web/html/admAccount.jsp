<%@ page import="db.DBConnection" %>
<%@ page import="java.util.Map" %>
<%@ page import="java.util.ArrayList" %><%--
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
    <title>admAccount DaTouGe</title>

    <!-- Bootstrap -->
    <link href="../bootstrap-3.3.7-dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="../css/admAccount.css">
</head>

<body>
<%
    DBConnection dbConnection=new DBConnection();
    String sql="select * from userinfo";
    ArrayList<Map<String,String>> rs=dbConnection.queryForList(sql);
%>
<!--手机导航栏-->
<div id="mobile-menu" class="mobile-nav">
    <ul>
        <h3 class="text-white" style="height: 5rem;">大头哥管理员系统</h3>
        <li><a href="admIndex.jsp">商品管理</a></li>
        <li><a href="admAccount.jsp" id="selected">账号管理</a></li>
        <li><a href="admOrder.jsp">查看订单</a></li>
    </ul>
</div>
<div class="container" id="main" style="overflow-y:auto;">
    <div>
        <form action="">
            <h1 style="display: inline-block;">查找用户</h1>
            <input type="reset" value="重置" class="btn btn-primary"
                   style="height: 4rem;width: 6rem;margin-top: -1rem;margin-left: 2rem;" id="resetBtn1">
            <table>
                <tr>
                    <th>Dtg ID</th>
                    <th>姓</th>
                    <th>名</th>
                    <th>省</th>
                    <th>市</th>
                    <th>电话</th>
                    <th>账户状态</th>
                    <th>账户操作</th>
                </tr>
                <tr>
                    <td>
                        <input type="text" name="" id="IDText" style="width: 100%;height: 100%;">
                    </td>
                    <td>
                        <input type="text" name="" id="lastNameText" style="width: 100%;height: 100%;">
                    </td>
                    <td>
                        <input type="text" name="" id="firstNameText" style="width: 100%;height: 100%;">
                    </td>
                    <td>
                        <select name="input_province" id="input_province" style="width: 100%;height: 100%;">
                            <option value="">--请选择--</option>
                        </select>
                    </td>
                    <td>
                        <select name="input_city" id="input_city" style="width: 100%;height: 100%;">
                            <option value="">--请选择--</option>
                        </select>
                    </td>
                    <td>
                        <input type="text" name="" id="phoneNumberText" style="width: 100%;height: 100%;">
                    </td>
                    <td>
                        <select name="input_province" id="statusText" style="width: 100%;height: 100%;">
                            <option value="启用">启用</option>
                            <option value="禁用">禁用</option>
                        </select>
                    </td>
                    <td>
                        <input type="button" value="查询" class="btn btn-primary" id="queryBtn">
                    </td>
                </tr>
            </table>
        </form>
    </div>
    <hr>
    <div>
        <h1 style="display: inline-block;">账户列表</h1>
        <button id="resetBtn" class="btn btn-primary"
                style="height: 4rem;width: 6rem;margin-top: -1rem;margin-left: 2rem;">重置</button>
        <table id="productList">
            <tr>
                <th>Dtg ID</th>
                <th>姓</th>
                <th>名</th>
                <th>省</th>
                <th>市</th>
                <th>电话</th>
                <th>账户状态</th>
                <th>账户操作</th>
            </tr>
            <%
                for (Map<String,String> item: rs) {
            %>
            <tr id="<%=item.get("DtgID")%>" class="users">
                <td><%=item.get("DtgID")%></td>
                <td><%=item.get("LastName")%></td>
                <td><%=item.get("FirstName")%></td>
                <td><%=item.get("Province")%></td>
                <td><%=item.get("City")%></td>
                <td><%=item.get("PhoneNumber")%></td>
                <td><%=item.get("IDStatus")%></td>
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
<script src="../js/cityAndPro.js"></script>
<script src="../js/admAccount.js"></script>
</body>

</html>
