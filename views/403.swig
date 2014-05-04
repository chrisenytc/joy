{% extends 'layouts/default.swig' %} 

{% block content %}
<h1>Forbidden</h1>
<br>
<span>Error 403</span>
<div id="error-message-box">
  <div id="error-stack-trace">
    {% if (message !== '') %}
        <pre>{{ message }}</pre>
    {% else %}
        <pre>You don't have permission to see the page you're trying to reach.</pre>
    {% endif %}
  </div>
</div>
{% endblock %}