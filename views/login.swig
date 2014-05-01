{% extends 'layout.swig' %}
{% block title %}
Login
{% endblock %}
{% block description %}
Enter your email and password
{% endblock %}
{% block content %}
{% if msg.length > 0 %}
<div class="delete">
    <div class="sprite">{{ msg }}</div>
</div>
{% endif %}
<form action="/login" method="post">
    <div class="list-group">
        <div class="list-group-item">
            <input id="email" name="email" type="email" placeholder="Enter your email">
        </div>
        <div class="list-group-item">
            <input id="password" name="password" type="password" placeholder="Enter your password">
        </div>
        <div class="list-group-item">
            <input id="redirect" name="redirect" type="hidden" value="{{ redirect }}">
        </div>
    </div>
    <button type="submit">Sign in</button>
</form>
{% endblock %}