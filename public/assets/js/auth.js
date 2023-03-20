window.addEventListener("load", function() {
    /**
     * Login
     */
    const loginForm = document.querySelector("form[name='login'] button[type='submit']");
    const email = document.querySelector("#si-form-input-email");
    const password = document.querySelector("#si-form-input-password");

    loginForm.addEventListener("click", async function (e) {
        e.preventDefault();
        let response = await fetch(`/api/v1/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email: email.value, password: password.value})
        });
        response = await response.json() || false;
        if (response && response["token"] != undefined) {
            localStorage.setItem("accessToken", response.token);

            showApiSecretSection();
        } else {
            // TODO: log error
            console.log(response);
        }
    });

    /**
     * Register
     */
    const registrationForm = document.querySelector("form[name='registration'] button[type='submit']");
    const rEmail = document.querySelector("#su-form-input-email");
    const rPassword = document.querySelector("#su-form-input-password");

    registrationForm.addEventListener("click", async function (e) {
        e.preventDefault();
        let response = await fetch(`/api/v1/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email: rEmail.value, password: rPassword.value})
        });
        response = response.json() || false;
        if (response && response["token"] != undefined) localStorage.setItem("accessToken", response.token);
    });

    /**
     * Helper: Show api secret section
     */
    function showApiSecretSection() {
        const apiSecretSection = document.querySelector("#api-secret");
        const authSection = document.querySelector("#auth");

        authSection.classList.remove("flex");
        authSection.classList.add("hidden");
        apiSecretSection.classList.remove("hidden");
        apiSecretSection.classList.add("flex");
    }


});