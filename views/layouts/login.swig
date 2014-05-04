<!doctype html>
<html lang="en">
<head>
{% include '../includes/head.swig' %}
<link rel="stylesheet" type="text/css" href="/theme/css/login.css">
{% block header %}{% endblock %}
</head>

<body>
    <div class="pure-g-r" id="login">
        <div class="sidebar pure-u">
            <header class="header pure-u-1">
                <hgroup>
                    <h1 class="brand-title">{% block title %}{% endblock %}</h1>
                    <h2 class="brand-tagline">{% block description %}{% endblock %}</h2>
                </hgroup>

                <nav class="nav">
                    <ul class="nav-list">
                        <li class="nav-item">
                            <a class="pure-button pure-button-success" target="_self" href="/login">Login</a>
                        </li>
                        <li class="nav-item">
                            <a class="pure-button pure-button-warning" target="_self" href="/forgot">Forgot Password</a>
                        </li>
                        <li class="nav-item">
                            <a class="pure-button pure-button-error" target="_self" href="/signup">Register</a>
                        </li>
                    </ul>
                </nav>
            </header>
        </div>
        <div class="content pure-u-1">
            {% include '../includes/messages.swig' %}
            {% block content %}{% endblock %}
        </div>
    </div>
    {% include '../includes/foot.swig' %}
    {% block scripts %}{% endblock %}
</body>

</html>
