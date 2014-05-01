{% extends '../layout.swig' %}
{% block title %}
Clients
{% endblock %}
{% block description %}
List of Clients
{% endblock %}
{% block content %}
{% if msg.length > 0 %}
<div class="delete">
    <div class="sprite">{{ msg }}</div>
</div>
{% endif %}
<div class="steps">
    <ul class="getting-started">
        <a href="/clients/new">Create a new client</a>
        {% for client in clients %}
        <li>
            <div>
                <a href="/clients/{{ client.id }}"><h3>{{ client.name }}</h3></a>
            </div>
        </li>
        {% endfor %}
    </ul>
</div>
{% endblock %}