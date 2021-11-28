<%--
  Created by IntelliJ IDEA.
  User: 87428
  Date: 2021/11/17
  Time: 19:12
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
  <title>Login DaTouGe ID</title>

  <!-- Bootstrap -->
  <link href="../bootstrap-3.3.7-dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="../css/admLogin.css">
</head>

<body>
<nav class="navbar navbar-default navbar-fixed-top bar-text navbar-inverse" style="margin: 0rem;">
  <div class="container">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
              data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="#">大头哥面馆</a>
    </div>
  </div>
</nav>
<header>
  <div class="jumbotron bg-white">
    <div class="container" style="padding-top: 3rem; margin-left: 25rem;">
      <h1 style="margin-bottom: 8rem; font-weight: bold;">管理员请登录。</h1>
      <div>
        <form>
          <div class="form-group">
            <div style="height: 10rem;">
              <input type="text" name="" oninput="value=value.replace(/[\u4e00-\u9fa5d]/g,'')" class="form-control" id="DtgIDInput" placeholder="Dtg ID" >
            </div>
            <div style="height: 6rem;">
              <input type="password" class="form-control" id="DtgpwdInput" placeholder="密码">
            </div>
            <p style="color:rgb(221, 7, 28); font-size: 0.8rem; visibility: hidden" id="loginErrorMsg" >
              <span class="glyphicon glyphicon-remove-sign" aria-hidden="true"></span>
              Dtg ID 错误或密码错误
            </p>
          </div>
          <div style="height: 8rem;">
            <input type="button" value="登录" class="btn btn-default" id="DtgIDSubmit">
          </div>
        </form>
      </div>
    </div>
  </div>
</header>
<footer class="bg-dark" style="margin-top: -3rem;">
  <div class="container">
    <p class="text-center text-white">&copy; 2021 DaTouGe Noodle House</p>
  </div>
</footer>
<!-- jQuery (Bootstrap 的所有 JavaScript 插件都依赖 jQuery，所以必须放在前边) -->
<script src="../js/jquery-3.4.1.min.js"></script>
<!-- 加载 Bootstrap 的所有 JavaScript 插件。你也可以根据需要只加载单个插件。 -->
<script src="../bootstrap-3.3.7-dist/js/bootstrap.min.js"></script>
<!-- 加载 自定义的js文件 -->
<script src="../js/admLogin.js"></script>
</body>

</html>
