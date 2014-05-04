{% extends '../layouts/default.swig' %}

{% block scripts %}
<!-- Filter -->
<script type="text/javascript" src="/js/filters/startFrom.js"></script>
<!-- Service -->
<script type="text/javascript" src="/js/services/clientFactory.js"></script>
<!-- Controller -->
<script type="text/javascript" src="/js/controllers/clientCtrl.js"></script>
{% endblock %}

{% block title %}
Clients
{% endblock %}

{% block description %}
List of Clients
{% endblock %}

{% block content %}
<div ng-view></div>
{% endblock %}
