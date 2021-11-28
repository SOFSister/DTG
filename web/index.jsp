<%--
  Created by IntelliJ IDEA.
  User: 87428
  Date: 2021/11/17
  Time: 16:33
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
  <title>DaTouGe Noodle House</title>

  <!-- Bootstrap -->
  <link href="bootstrap-3.3.7-dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="css/indexStyle.css">
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
          <a class="nav-link active" href="index.jsp">主页</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="html/aboutUs.jsp" target="_blank">关于</a>
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
          <a id="cart" tabindex="0" class="btn  btn-outline-dark navbar-btn" role="button" type="submit"
             data-container="body" data-toggle="popover" data-placement="bottom" data-trigger="focus"
             data-html="true" style="margin: 0rem;" data-content='
                            <div style="width:20rem;">
                                <div style="max-height:20rem;overflow-y:auto;" class="text-center" id="cartItems">
                                    <p style="padding-top:1rem;">你的购物车是空的</p>
                                </div>
                                <br>
                                <button class="btn btn-primary" style="width:20rem;">结账</button>
                                <hr>
                                <div>
                                    <span class="glyphicon glyphicon-shopping-cart" aria-hidden="true">
                                        <a class="text-black" id="sumCart">购物车（0）</a>
                                    </span>
                                </div>
                                <hr>
                                <div id="loginChange">
                                    <span class="glyphicon glyphicon-circle-arrow-right" aria-hidden="true">
                                        <a href="html/login.jsp" class="text-black">登录</a>
                                    </span>
                                </div>
                            </div>'>
            购物车
            <span class=" glyphicon glyphicon-shopping-cart badge  text-white ms-1 rounded-pill"
                  aria-hidden="true">0</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</nav>
<header>
  <div class="jumbotron">
    <div class="container text-center" style="padding-top: 3rem;">
      <h1>河蟹面新品上市！</h1>
      <p>全新口味，爆炸你的味蕾</p>
      <p><a class="btn btn-primary btn-lg" href="#" role="button">了解更多</a></p>
    </div>
  </div>
</header>
<section>
  <!-- Modal -->
  <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
       style="margin-top: 15rem;">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <form id="modalForm" action="">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                    aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="myModalLabel">选规格</h4>
          </div>
          <div class="modal-body">
            <div class="family-info-item">
              <span class="text-bold">风味：</span>
              <label>
                <input name="flavor" id="pickle" type="radio" value="1">
                <span>咸菜风味</span>
              </label>
              <label>
                <input checked name="flavor" id="soySauce" type="radio" value="2">
                <span>酱油风味</span>
              </label>
            </div>
            <div class="family-info-item">
              <span class="text-bold">辣度：</span>
              <label>
                <input name="spicy" id="notSpicy" type="radio" value="1">
                <span>不辣</span>
              </label>
              <label>
                <input checked name="spicy" id="isSpicy" type="radio" value="2">
                <span>加辣</span>
              </label>
            </div>
            <div class="family-info-item" id="sweetness">
              <span class="text-bold">甜度：</span>
              <label>
                <input name="sugar" id="notSugar" type="radio" value="1">
                <span>不放糖</span>
              </label>
              <label>
                <input checked name="sugar" id="isSugar" type="radio" value="2">
                <span>放糖</span>
              </label>
            </div>
            <div class="family-info-item">
              <span class="text-bold">分量：</span>
              <label>
                <input checked name="noodle" id="lessNoodle" type="radio" value="1">
                <span>少面</span>
              </label>
              <label>
                <input name="noodle" id="nomalNoodle" type="radio" value="2">
                <span>正常</span>
              </label>
              <label>
                <input checked name="noodle" id="moreNoodle" type="radio" value="3">
                <span>加面</span>
              </label>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
            <button type="button" class="btn btn-primary" data-dismiss="modal"
                    id="myModalEnterBtn">确定</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="row">
      <div class="col-sm-6 col-md-4">
        <div class="thumbnail">
          <img src="images/野生桂鱼面.jpg" alt="...">
          <div class="caption text-center">
            <h3 id="0">大排面</h3>
            <p>
              <span class="glyphicon glyphicon-star" aria-hidden="true"></span>
              <span class="glyphicon glyphicon-star" aria-hidden="true"></span>
              <span class="glyphicon glyphicon-star" aria-hidden="true"></span>
              <span class="glyphicon glyphicon-star" aria-hidden="true"></span>
              <span class="glyphicon glyphicon-star-empty" aria-hidden="true"></span>
            </p>
            <h4>￥16</h4>
            <h4 style="display: inline-block;">0</h4>
            <button type="button" class="btn btn-default" style="margin-left: 1rem;" data-toggle="modal"
                    data-target="#myModal">
              <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
            </button>
          </div>
        </div>
      </div>
      <div class="col-sm-6 col-md-4">
        <div class="thumbnail">
          <img class="img-size" src="images/大排面.jpg" alt="..." >
          <div class="caption text-center">
            <h3 id="1">小排面</h3>
            <p>
              <span class="glyphicon glyphicon-star" aria-hidden="true"></span>
              <span class="glyphicon glyphicon-star" aria-hidden="true"></span>
              <span class="glyphicon glyphicon-star" aria-hidden="true"></span>
              <span class="glyphicon glyphicon-star" aria-hidden="true"></span>
              <span class="glyphicon glyphicon-star-empty" aria-hidden="true"></span>
            </p>
            <h4>￥16</h4>
            <h4 style="display: inline-block;">0</h4>
            <button type="button" class="btn btn-default" style="margin-left: 1rem;" data-toggle="modal"
                    data-target="#myModal">
              <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
            </button>
          </div>
        </div>
      </div>
      <div class="col-sm-6 col-md-4">
        <div class="thumbnail">
          <img src="images/野生桂鱼面.jpg" alt="...">
          <div class="caption text-center">
            <h3 id="2">咸菜肉丝面</h3>
            <p>
              <span class="glyphicon glyphicon-star" aria-hidden="true"></span>
              <span class="glyphicon glyphicon-star" aria-hidden="true"></span>
              <span class="glyphicon glyphicon-star" aria-hidden="true"></span>
              <span class="glyphicon glyphicon-star" aria-hidden="true"></span>
              <span class="glyphicon glyphicon-star-empty" aria-hidden="true"></span>
            </p>
            <h4>￥16</h4>
            <h4 style="display: inline-block;">0</h4>
            <button type="button" class="btn btn-default" style="margin-left: 1rem;" data-toggle="modal"
                    data-target="#myModal">
              <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
<footer class="bg-dark">
  <div class="container">
    <p class="text-center text-white">&copy; 2021 DaTouGe Noodle House</p>
  </div>
</footer>
<!-- jQuery (Bootstrap 的所有 JavaScript 插件都依赖 jQuery，所以必须放在前边) -->
<script src="js/jquery-3.4.1.min.js"></script>
<!-- 加载 Bootstrap 的所有 JavaScript 插件。你也可以根据需要只加载单个插件。 -->
<script src="bootstrap-3.3.7-dist/js/bootstrap.min.js"></script>
<!-- 加载 自定义的js文件 -->
<script src="js/index.js"></script>
</body>

</html>
