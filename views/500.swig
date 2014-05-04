{% extends 'layouts/default.swig' %} 

{% block content %}
<h1>Oops something went wrong</h1>
<br>
<span>Error 500</span>
<div id="error-message-box">
  <div id="error-stack-trace">
  	{% if (errors) %}
      {% for error in errors %}
        <pre>{{ error }}</pre>
      {% endfor %}
    {% else %}
    <p class="error">
      A team of highly trained sea bass is working on this as we speak.<br/>
      If the problem persists, please <a href="mailto://hello@example.com">contact the system administrator</a> and inform them of the time that the error occured, and anything you might have done that may have caused the error.
    </p> 
    {% endif %}
  </div>
</div>
{% endblock %}
