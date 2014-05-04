{% extends 'layouts/default.swig' %} 

{% block content %}
<h1>Oops something went wrong</h1>
<br>
<span>Error 404</span>
<div id="error-message-box">
  <div id="error-stack-trace">
    <h2> 
      The page you were trying to reach doesn't exist.
    </h2>
    <p class="help">
      <a href="http://en.wikipedia.org/wiki/HTTP_404">Why</a> might this be happening?
    </p>
  </div>
</div>
{% endblock %}