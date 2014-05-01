{% extends '../layout.swig' %}
{% block title %}
Update {{ client.name }}
{% endblock %}
{% block content %}
<form action="/clients/update/{{ client.id }}" method="post">
    <div class="list-group">
        <div class="list-group-item">
            <input id="name" name="name" type="text" placeholder="Enter a name" value="{{ client.name }}">
        </div>
        <div class="list-group-item">
            <input id="callback" name="redirectURI" type="text" placeholder="Enter a callback url" value="{{ client.redirectURI }}">
        </div>
        <input type="hidden" name="_method" value="put" />
    </div>
    <button type="submit">Update client</button>
    <a href="/clients/destroy/{{ client.id }}">Delete this client</a>
</form>
{% endblock %}