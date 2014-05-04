<h2>Hi, {{ user.name }}</h2>
<h4>Welcome to Joy</h4>
<p>To start using the Joy, you need to activate your account. Click the link to activate your account.</p>
<p>
    <a href="{{ appUrl }}/signup/activate?token={{ token }}" target="_blank">Activate your Joy account</a>
</p>
