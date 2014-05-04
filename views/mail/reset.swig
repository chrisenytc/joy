<h2>Hi, {{ user.name }}</h2>
<h4>Your new password</h4>
<p>Your new password was successfully generated.</p>
<p><strong>New password: </strong>{{ newPassword }}</p>
<p>
    <a href="{{ appUrl }}/login?redirect=/account" target="_blank">Access your account</a>
</p>