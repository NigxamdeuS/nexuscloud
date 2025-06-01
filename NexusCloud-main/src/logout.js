document.getElementById("logout-btn").addEventListener("click", function () {
    const logoutUrl = `${config.cognitoDomain}/logout?client_id=${config.clientId}&logout_uri=${config.redirectUri}`;
    window.location.href = logoutUrl;
});
