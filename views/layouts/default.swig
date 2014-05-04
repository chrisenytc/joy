<!doctype html>
<html lang="en">
<head>
{% include '../includes/head.swig' %}
{% block header %}{% endblock %}
</head>

<body>
    <div class="pure-g-r" id="layout">

        <div class="pure-u" id="nav">
        
            <div class="nav-inner">
                <div class="user">
                    <p>
                        <img class="user-avatar" alt="{{ user.name }}" src="http://www.gravatar.com/avatar/{{ md5(user.email) }}?s=130" height="130px" width="130px">
                    </p>
                    <p>
                        <a href="/account" target="_self">
                            <span class="user-label-editor"></span>{{ user.name }}
                        </a>
                    </p>
                </div>

                <div class="pure-menu pure-menu-open">
                    <ul>
                        <li>
                            <a href="/" target="_self">Dashboard</a>
                        </li>
                        <li>
                            <a href="/apps" target="_self">Applications</a>
                        </li>
                        <li>
                            <a href="/logout" target="_self">Logout</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="pure-u" id="main">

            <div class="dashboard">
                <h2 class="main-subhead">{% block title %}{% endblock %}</h2>
                <div class="pure-g-r">
                    <div class="pure-u-1">
                        <p>{% block description %}{% endblock %}</p>
                    </div>
                    <div class="pure-u-1">
                        {% include '../includes/messages.swig' %}
                        {% block content %}{% endblock %}
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="pure-g-r">
        <div class="pure-u" id="footer">
            <p>&copy; 2014
                <a href="/">v0.2.0</a>
            </p>
        </div>
    </div>
    {% include '../includes/foot.swig' %}
    {% block scripts %}{% endblock %}
</body>

</html>
