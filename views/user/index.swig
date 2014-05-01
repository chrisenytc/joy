{% extends '../layout.swig' %}
{% block title %}
Account
{% endblock %}
{% block description %}
View your profile
{% endblock %}
{% block content %}
<p>{{ user.name }}</p>
<p>{{ user.email }}</p>
<p>{{ user.status }}</p>
{% endblock %}