{% if msg.error.length > 0 %}
    <aside class="pure-alert-error">
        <p>
            <strong>ERROR</strong>: {{ msg.error }}
        </p>
    </aside>
{% endif %}