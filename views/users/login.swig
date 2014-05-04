{% extends '../layouts/login.swig' %}

{% block title %}
Login
{% endblock %}

{% block description %}
Enter with your login and password
{% endblock %}

{% block content %}
<div class="posts pure-g">
    <h1 class="content-subhead pure-u-1">Login</h1>

    <section class="post pure-u-1">
        <form class="pure-form pure-form-stacked" action="/login" method="post">
            <fieldset>

                <label for="email">Email</label>
                <input id="email" name="email" type="email" placeholder="Email">

                <label for="password">Password</label>
                <input id="password" name="password" type="password" placeholder="Password">

                <input id="redirect" name="redirect" type="hidden" value="{{ redirect }}">

                <label for="remember" class="pure-checkbox">
                    <input id="remember" type="checkbox">Remember me
                </label>

                <p>
                    <button type="submit" class="pure-button pure-button-success">Login</button>
                </p>
            </fieldset>
        </form>
    </section>
</div>
{% endblock %}
