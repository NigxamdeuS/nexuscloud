document.getElementById("google-login-btn").addEventListener("click", function () {
    const loginUrl = `${config.cognitoDomain}/login?response_type=code&client_id=${config.clientId}&redirect_uri=${config.redirectUri}`;
    window.location.href = loginUrl;
});
