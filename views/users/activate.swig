{% extends '../layouts/login.swig' %}

{% block scripts %}
<!-- Controller -->
<script type="text/javascript" src="/js/controllers/activateCtrl.js"></script>
{% endblock %}

{% block title %}
Account Activation
{% endblock %}

{% block description %}
Activate your account
{% endblock %}

{% block content %}
<div ng-view></div>
{% endblock %}
