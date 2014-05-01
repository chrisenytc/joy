{% extends '../layout.swig' %}
{% block title %}
{{ client.name }}
{% endblock %}
{% block content %}
<div class="steps">
    <ul class="getting-started">
        <li>
            <div>
                <p><strong>Name: </strong>{{ client.name }}</p>
                <p><strong>ClientID: </strong> {{ client.clientId }}</p>
                <p class="inline-format"><strong>ClientSecret: </strong>{{ client.clientSecret }}</p>
                <p><strong>RedirectURI: </strong>{{ client.redirectURI }}</p>
                <a href="/clients/edit/{{ client.id }}">Edit</a>
            </div>
        </li>
    </ul>
</div>
{% endblock %}