{% extends '../layout.swig' %}
{% block title %}
Getting Started
{% endblock %}
{% block description %}
Don't worry, we've got your back.
{% endblock %}
{% block content %}
<div class="steps">
    <ul class="getting-started">
        <li>
            <div class="sprite one"></div>
            <div>
                <h3>Get your API going.</h3>
                <p>
                    Run <span class="boxy">sails generate foo</span>.  This will create a model <span class="boxy">Foo</span> and controller <span class="boxy">FooController</span>
                </p>
            </div>
        </li>
        <li>
            <div class="sprite two"></div>
            <div>
                <h3>
                    Lift your app.
                </h3>
                <p>
                    Run <span class="boxy">sails lift</span> to start up your app.  If you visit <span class="boxy">http://localhost:1337/foo</span> in your browser, you'll see a socket.io-compatible REST API was generated for your 'Foo' model.
                </p>
            </div>
        </li>
        <li>
            <div class="sprite three"></div>
            <div>
                <h3>
                    Dive in and start building.
                </h3>
                <p>From here, you can modify your models, create custom controller methods as Express middleware, and create custom routes (routes are set up in <span class="boxy">config/routes.js</span>).  Visit <a href="http://sailsjs.org">the Sails website</a> for more information on next steps.</p>
            </div>
        </li>
    </ul>
</div>
<div class="delete">
    <div class="sprite">You're looking at: <span class="boxy">views/home/index.ejs</span></div>
</div>
{% endblock %}