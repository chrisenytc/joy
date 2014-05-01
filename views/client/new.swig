{% extends '../layout.swig' %}
{% block title %}
Create new client
{% endblock %}
{% block description %}
Create new application client
{% endblock %}
{% block content %}
<form action="/clients/create" method="post">
    <div class="list-group">
        <div class="list-group-item">
            <input id="name" name="name" type="text" placeholder="Enter a name">
        </div>
        <div class="list-group-item">
            <input id="callback" name="redirectURI" type="text" placeholder="Enter a callback url">
        </div>
    </div>
    <button type="submit">Create client</button>
</form>
{% endblock %}