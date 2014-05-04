<h2>Hi, {{ user.name }}</h2>
<h4>Forgot Password</h4>
<p>You requested a password change. Use the link below to create a new password.</p>
<p>
    <a href="{{ appUrl }}/forgot?token={{ token }}" target="_blank">Reset password</a>
</p>