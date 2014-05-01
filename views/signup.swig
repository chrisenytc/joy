{% extends 'layout.swig' %}
{% block title %}
Create your account
{% endblock %}
{% block content %}
<form action="/signup" method="post">
    <div class="list-group">
        <div class="list-group-item">
            <input id="name" name="name" type="text" placeholder="Enter your name">
        </div>
        <div class="list-group-item">
            <input id="email" name="email" type="email" placeholder="Enter your email">
        </div>
        <div class="list-group-item">
            <input id="password" name="password" type="password" placeholder="Enter your password">
        </div>
    </div>
    <button type="submit">Sign up</button>
</form>
{% endblock %}