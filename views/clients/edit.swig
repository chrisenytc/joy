{% extends '../layouts/default.swig' %}

{% block scripts %}
<!-- Service -->
<script type="text/javascript" src="/js/services/clientFactory.js"></script>
<!-- Controller -->
<script type="text/javascript" src="/js/controllers/clientCtrl.js"></script>
{% endblock %}

{% block title %}
Clients
{% endblock %}

{% block description %}
Update ({{ client.name }})
{% endblock %}

{% block content %}
<div ng-view></div>
{% endblock %}
