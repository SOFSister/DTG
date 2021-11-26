<%--
  Created by IntelliJ IDEA.
  User: 87428
  Date: 2021/11/17
  Time: 19:14
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
    <link rel="stylesheet" href="../css/login.css">
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
            <a class="navbar-brand">大头哥面馆</a>
        </div>
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav">
                <li class="nav-item">
                    <a class="nav-link active" href="../index.jsp">主页</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="../html/aboutUs.jsp" target="_blank">关于</a>
                </li>
                <li class="dropdown">
                    <a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
                       aria-expanded="false">商店 <span class="caret"></span></a>
                    <ul class="dropdown-menu">
                        <li><a href="#">所有商品</a></li>
                        <li role="separator" class="divider"></li>
                        <li><a href="#">热门商品</a></li>
                        <li><a href="#">新品上市</a></li>
                    </ul>
                </li>
                <li class="nav-item">
                    <form class="navbar-form navbar-left" role="search">
                        <div class="form-group">
                            <input type="text" class="form-control" placeholder="搜索商品">
                        </div>
                        <button type="submit" class="btn btn-default">搜索</button>
                    </form>
                </li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
                <li class="nav-item">
                    <a tabindex="0" class="btn  btn-outline-dark navbar-btn" role="button" type="submit"
                       data-container="body" data-toggle="popover" data-placement="bottom" data-trigger="focus"
                       data-html="true" style="margin: 0rem;" data-content='
                            <div style="width:20rem; height:20rem">
                                <div class="text-center">
                                    <p style="padding-top:1rem;">你的购物车是空的</p>
                                    <button class="btn btn-primary" style="width:20rem;">结账</button>
                                </div>
                                <hr>
                                <div>
                                    <span class="glyphicon glyphicon-shopping-cart" aria-hidden="true">
                                        <a href="" class="text-black">购物车（0）</a>
                                    </span>
                                </div>
                                <hr>
                                <div>
                                    <span class="glyphicon glyphicon-circle-arrow-right" aria-hidden="true">
                                        <a href="login.jsp" class="text-black">登录</a>
                                    </span>
                                </div>
                            </div>'>
                        购物车
                        <span class=" glyphicon glyphicon-shopping-cart badge bg-dark text-white ms-1 rounded-pill"
                              aria-hidden="true">0</span>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</nav>
<header>
    <div class="jumbotron bg-white">
        <div class="container" style="padding-top: 3rem; margin-left: 25rem;">
            <h1 style="margin-bottom: 8rem; font-weight: bold;">请登录。</h1>
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
                        <p class="help-block" style="font-size: 1.5rem; margin-bottom: 2rem;">你的 Dtg ID 是你用来登录大头哥面馆的电子邮件地址。</p>
                    </div>
                    <div style="height: 8rem;">
                        <input type="button" value="登录" class="btn btn-default" id="DtgIDSubmit">
                    </div>
                    <p class="help-block" style="font-size: 1.5rem;"><a href="password.jsp" style="color: rgb(0, 113, 227);">忘了自己的 Dtg ID 或密码？</a></p>
                    <p class="help-block" style="font-size: 1.5rem;"><a href="account.jsp" style="color: rgb(0, 113, 227);">没有 Dtg ID？立即创建一个。</a></p>
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
<script src="../js/login.js"></script>
</body>

</html>
