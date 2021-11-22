<%--
  Created by IntelliJ IDEA.
  User: 87428
  Date: 2021/11/17
  Time: 19:10
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
  <title>Account DaTouGe ID</title>

  <!-- Bootstrap -->
  <link href="../bootstrap-3.3.7-dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="../css/account.css">
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
            <li><a>所有商品</a></li>
            <li role="separator" class="divider"></li>
            <li><a href="#">热门商品</a></li>
            <li><a href="#">新品上市</a></li>
          </ul>
        </li>
        <li class="nav-item">
          <form class="navbar-form navbar-left" role="search">
            <div class="form-group">
              <input type="text" class="form-control" placeholder="搜索商品" id="inputSelect">
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
  <div class="jumbotron bg-white" style="margin: 0rem; height: 12rem;">
    <div class="container" style="padding-top: 0rem; padding-left: 5rem; position:relative;">
      <h3>Dtg ID</h3>
      <hr style="margin-bottom: 4rem;">
    </div>
  </div>
</header>
<section>
  <div class="container text-center" id="mainSection">
    <form>
      <h1 style="font-weight: bolder;">创建你的 Dtg ID</h1>
      <p>只需一个 Dtg ID，您即可访问大头哥面馆所有内容。</p>
      <p>已有 Dtg ID？ <a href="findID.jsp">在此查找&gt;</a></p>
      <div class="form-group">
        <div class="div-line">
          <input type="text" class="form-control form-textbox isEmpty" maxlength="5" placeholder="姓氏" id="inputLastName">
        </div>
        <div class="div-line">
          <input type="text" class="form-control form-textbox isEmpty" maxlength="5" placeholder="名字" id="inputFirstName">
        </div>
      </div>
      <div class="form-group">
        <h3>选择地区</h3>
        <div>
          <select name="input_province" id="input_province" class="form-control form-selectbox isEmpty">
            <option value="">--请选择--</option>
          </select>
        </div>
        <div>
          <select name="input_city" id="input_city" class="form-control form-selectbox isEmpty">
            <option value="">--请选择--</option>
          </select>
        </div>
      </div>
      <hr>
      <div class="form-group">
        <h3>这将是您的新 Dtg ID。</h3>
        <div>
          <input type="text" name="" oninput="value=value.replace(/[\u4e00-\u9fa5d]/g,'')" class="form-control form-textbox-long isEmail" placeholder="name@example.com" id="inputEmail">
        </div>
        <div>
          <p style="color:rgb(221, 7, 28); margin-left: -29rem; font-size: 0.8rem; visibility:hidden"  id="IDErrorMsg">
            <span class="glyphicon glyphicon-remove-sign" aria-hidden="true"></span>
            该邮箱已被注册
          </p>
        </div>
        <div>
          <input type="password" id="inputPwd" class="form-control form-textbox-long isPassword" style="margin-left: auto; margin-right: auto;" placeholder="密码" data-container="body"
                 data-toggle="popover" data-placement="bottom" data-trigger="focus" data-html="true"
                 style="margin: 0rem;" data-content='<div style="width:20rem; height:24rem" id="pwdDown"></div>'>
        </div>
        <div>
          <div>
            <input type="password" class="form-control form-textbox-long isAgainPwd" placeholder="确认密码" id="inputAgainPwd">
          </div>
          <p style="color:rgb(221, 7, 28); margin-left: -29rem; font-size: 0.8rem; visibility:hidden" id="pwdErrorMsg" >
            <span class="glyphicon glyphicon-remove-sign" aria-hidden="true"></span>
            您输入的密码不匹配
          </p>
        </div>
      </div>
      <hr>
      <div class="form-group">
        <div>
          <input type="text" name="" oninput="value=value.replace(/[^\d]/g,'')" class="form-control form-textbox-long isPhoneNumber" placeholder="电话号码" id="inputPhoneNumber">
        </div>
        <p style="color:rgb(221, 7, 28); margin-left: -29rem; font-size: 0.8rem; visibility:hidden"  id="PhoneNumberErrorMsg">
          <span class="glyphicon glyphicon-remove-sign" aria-hidden="true"></span>
          该电话号码已被注册
        </p>
      </div>
      <hr>
      <div class="form-group">
        <h3>验证你的邮箱</h3>
        <div class="div-line">
          <input type="text" class="form-control form-textbox isEmpty" placeholder="键入邮箱中的验证码" id="inputEmailCode">
        </div>
        <input type="button" class="btn btn-primary form-textbox" id="sendEmailMsgBtn" value="发送验证码">
        <div>
          <p style="color:rgb(221, 7, 28); margin-left: -29rem; font-size: 0.8rem; visibility:hidden"  id="emailErrorMsg">
            <span class="glyphicon glyphicon-remove-sign" aria-hidden="true"></span>
            您输入的验证码不匹配
          </p>
        </div>
      </div>
      <hr>
      <div class="form-group">
        <div>
          <div class="div-line">
            <div>
              <img id="image" src="image.jsp" style="width: 15rem;margin-right: 7rem">
              <div class="div-line">
                <input type="text" class="form-control form-textbox isEmpty" style="width: 20rem; height: 5rem;margin-left: auto; margin-right: auto;" placeholder="键入图中的字符" id="inputImgCode">
              </div>
            </div>
            <input type="button" style="margin-left: -27rem;" id="newCode" value="新代码" class="btn btn-link">
          </div>
          <div>
            <p id="imgErrorMsg" style="color:rgb(221, 7, 28); margin-left: -29rem; font-size: 0.8rem; visibility:hidden"  >
              <span class="glyphicon glyphicon-remove-sign" aria-hidden="true"></span>
              您输入的字符不匹配
            </p>
          </div>
        </div>
      </div>
      <input type="button" value="继续" class="btn btn-primary" style="margin-bottom: 5rem" id="nextBtn">
    </form>
  </div>
</section>
<footer class="bg-dark">
  <div class="container">
    <p class="text-center text-white">&copy; 2021 DaTouGe Noodle House</p>
  </div>
</footer>
<!-- jQuery (Bootstrap 的所有 JavaScript 插件都依赖 jQuery，所以必须放在前边) -->
<script src="../js/jquery-3.4.1.min.js"></script>
<!-- 加载 Bootstrap 的所有 JavaScript 插件。你也可以根据需要只加载单个插件。 -->
<script src="../bootstrap-3.3.7-dist/js/bootstrap.min.js"></script>
<!-- 加载 自定义的js文件 -->
<script src="../js/cityAndPro.js"></script>
<script src="../js/account.js"></script>
</body>

</html>
