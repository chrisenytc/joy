{% extends '../layouts/login.swig' %}

{% block scripts %}
<!-- Directive -->
<script type="text/javascript" src="/js/directives/captcha.js"></script>
<!-- Controller -->
<script type="text/javascript" src="/js/controllers/forgotCtrl.js"></script>
{% endblock %}

{% block title %}
Forgot Password
{% endblock %}

{% block description %}
Recover your password
{% endblock %}

{% block content %}
<div ng-view></div>
{% endblock %}
