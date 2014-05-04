{% extends '../layouts/login.swig' %}

{% block scripts %}
<!-- Directive -->
<script type="text/javascript" src="/js/directives/captcha.js"></script>
<!-- Controller -->
<script type="text/javascript" src="/js/controllers/signupCtrl.js"></script>
{% endblock %}

{% block title %}
Signup
{% endblock %}

{% block description %}
Welcome, create you account
{% endblock %}

{% block content %}
<div ng-view></div>
{% endblock %}
