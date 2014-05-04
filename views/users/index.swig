{% extends '../layouts/default.swig' %}

{% block title %}
Account Settings
{% endblock %}

{% block description %}
View your profile
{% endblock %}

{% block content %}
<p><strong>Name: </strong> {{ user.name }}</p>
<p><strong>Name: </strong> {{ user.email }}</p>
<p><strong>Activated: </strong> {{ user.status }}</p>
{% endblock %}
