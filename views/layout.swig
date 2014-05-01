<!DOCTYPE html>
<html>
  <head>
    <!--
        For demonstration purposes, the `title` is dynamically set here based on
        your `sails.config.appName` to show that you can inject data into layouts
        exactly the same way as with your other view templates.
    -->
    <title>{{ title }}</title>

    <!-- Viewport mobile tag for sensible mobile support -->
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />

    <!--

      Stylesheets
      ========================

      You can link any CSS, LESS, or image files in your `assets` directory
      as you would normally: using <link/> tags.
      
    -->

    <!--

      Support for LESS included by default
      ================================================

      LESS files are automatically compiled when they change using the Gruntfile
      located in the top-level of this Sails app.  If you run into issues with styles
      not reloading, check the Sails log output in your console for LESS compilation errors.
      If necessary, shut down and then lift your app again.
      
    -->

    <!-- Default home page -->
    <link type="text/css" href='http://sailsjs.org/styles/fonts.css' rel='stylesheet'/>
    <style>
        /* Styles included inline since you'll probably be deleting this page anyway */
        html,body{text-align:left;font-size:1em}html,body,img,form,textarea,input,fieldset,div,p,div,ul,li,ol,dl,dt,dd,h1,h2,h3,h4,h5,h6,pre,code{margin:0;padding:0}ul,li{list-style:none}img{display:block}a img{border:0}a{text-decoration:none;font-weight:normal;font-family:inherit}*:active,*:focus{outline:0;-moz-outline-style:none}h1,h2,h3,h4,h5,h6{font-weight:normal}div.clear{clear:both}.clearfix:after{clear:both;content:".";display:block;font-size:0;height:0;line-height:0;visibility:hidden}body{font-family:"Open Sans",Arial,sans-serif;font-weight:300;font-size:15px}h1{color:#0c8da0;font-size:2em;font-weight:300}h2{font-size:1.5em;font-weight:300;margin-top:4%}h3{font-size:1.25em;font-weight:300;font-style:italic;margin-bottom:5px}h4{color:#0c8da0;font-weight:300;font-size:1.5em}span{font-weight:700}ul{margin-top:5%;margin-bottom:5%}a{text-decoration:none;color:inherit}p{margin-bottom:7px;font-size:.9em}.container{max-width:997px;margin:0 auto;padding:0 4%}.sprite{font-weight:normal;background:url(http://sailsjs.org/images/newapp.sprite.png) no-repeat}.top-bar{position:relative;padding-top:10px;background-color:#001c20;height:55px}.main{float:left;max-width:610px;height:555px;margin-top:50px}.steps{height:250px}.getting-started p{ margin-bottom: 30px; line-height: 26px; }.getting-started div{float:left;width:540px}.getting-started li{clear:both;height:60px;margin-top:20px;margin-bottom:20px}.getting-started .sprite{margin-left:10px;padding-left:60px;height:42px;width:0}.getting-started .one{background-position:0 0}.getting-started .two{background-position:0 -42px}.getting-started .three{background-position:0 -83px}.delete{margin-top:5%;height:52px;background:#e3f0f1;border:1px solid #118798;color:#118798;clear:both}.delete .sprite{margin-top:10px;margin-bottom:10px;margin-left:9%;padding-left:42px;padding-top:7px;height:25px;background-position:0 -126px}.delete a{color:#0c8da0;font-weight:bold;padding-left:1%}.side-bar{max-width:327px;height:555px;float:left;border-left:1px solid #0c8da0;margin-left:25px;margin-top:50px;padding-left:25px}.side-bar ul{margin-bottom:10%}.side-bar ul li{margin-top:5px;margin-bottom:.25em}.side-bar ul li a{margin-bottom:.25em}.side-bar .sprite{padding-left:25px}.side-bar .single_page{background-position:0 -199px}.side-bar .traditional{background-position:0 -219px}.side-bar .realtime{background-position:0 -179px}.side-bar .api{background-position:0 -158px}.boxy{font-family:Courier,"Courier New",sans-serif;background-color:#e4edec;border:1px solid #d0d6d6;padding-left:5px;padding-right:5px;padding-top:2px;padding-bottom:2px;font-weight:100}.sixteen{margin-right:10px}.nineteen{margin-right:7px}
            .main { width: 100%; }
            body { min-width: 925px; }
            .inline-format {
                -ms-word-break: break-all;
                word-break: break-all;
                word-break: break-word;
                -webkit-hyphens: auto;
                -moz-hyphens: auto;
                hyphens: auto;
            }
            h3 {
              color: #0c8da2;
            }
    </style>
    <!--[if IE 7]>
        <style>
        .getting-started li{overflow:visible;clear:both}.delete{width:690px}
        </style>
    <![endif]-->

  {% block header %}{% endblock %}
  </head>

  <body>

    <!-- Include the view file for the current controller/route -->
    <div class="top-bar">
        <div class="container clearfix">
            <img class="logo" src="http://sailsjs.org/images/sails-logo.jpg" />
        </div>
    </div>
    <div class="container clearfix">
        <div class="main">
            <h1 id="main-title">{{ __('Welcome') }}</h1>
            <h2>{% block title %}{% endblock %}</h2>
            <p>{% block description %}{% endblock %}</p>
            {% block content %}{% endblock %}
        </div>
        <div class="side-bar">
            <h4 id="new">
                Menus
            </h4>
            <ul>
                <li>
                    <a href="/signup">Signup</a>
                </li>
                <li>
                    <a href="/login">Login</a>
                </li>
                <li>
                    <a href="/logout">Logout</a>
                </li>
                <li>
                    <a href="/users">Profile</a>
                </li>
                <li>
                    <a href="/clients">Applications</a>
                </li>
            </ul>
            <h4>
                Next Steps
            </h4>
            <ul>
                <li class="sprite single_page">
                    <a target="_blank" href="http://sailsjs.org">Build a single page app</a>
                </li>
                <li class="sprite traditional">
                    <a target="_blank" href="http://sailsjs.org">Build a traditional webapp</a>
                </li>
                <li class="sprite realtime">
                    <a target="_blank" href="http://sailsjs.org">Build a realtime app</a>
                </li>
                <li class="sprite api">
                    <a target="_blank" href="http://sailsjs.org">Build an API</a>
                </li>
            </ul>
        </div>
    </div>

    <!--

      Client-side Javascript
      ========================

      You can import any js files in your `assets` directory as you would 
      normally: using <script></script> tags.

      Here's an example of importing a few dependencies, in order:
    -->
    <!-- Bring in the socket.io client -->
    <script type="text/javascript" src="/js/socket.io.js"></script>
    <!-- then beef it up with some convenience logic for talking to Sails.js -->
    <script type="text/javascript" src="/js/sails.io.js"></script>
    <!-- listen on socket.io for incoming messages -->
    <script type="text/javascript" src="/js/app.js"></script>

    <!-- Your scripts here? -->
    <!-- Your scripts here? -->
    <!-- Your scripts here? -->


    <!--

      Looking for client-side CoffeeScript or TypeScript?
      ================================================

      CoffeeScript and TypeScript precompilation are not installed by default,
      but if you'd like to mix those features in, it is straightforward to
      `npm install` the relevant grunt community modules and modify your Gruntfile
      to use them.

    -->



    <!--

      Another way: The Asset Linker
      ========================

      Sails supports a Grunt-based asset linker, to automatically inject 
      <link> and <script> tags, as well any client-side templates you're using
      into your HTML layouts and views, respecting dependencies.

      You created this Sails app with the asset linker disabled.
      If you change your mind, check out the docs on the subject:
      http://sailsjs.org/#!documentation/asset-management

    -->

    </body>
</html>
