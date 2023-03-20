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
        if (response && response["token"] != undefined && response.status == 200) {
            localStorage.setItem("accessToken", response.token);

            showApiSecretSection();
            document.querySelector('.login').classList.add("hidden");
            document.querySelector('.logout').classList.remove("hidden");
        } else {
            showAlert(response.status, response.message);
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
        response = await response.json() || false;
        console.log(response)
        if (response) {
            localStorage.setItem("accessToken", response.token);
            showAlert(201, "Registered successfully.");
            history.go(0);
        } else {
            showAlert(response.status, response.message);
        }
    });

    const logoutBtn = document.querySelector("button.logout");
    logoutBtn.addEventListener("click", async function() {
        const tokenId = localStorage.getItem("accessToken");
        if (tokenId != undefined && typeof(tokenId) == "string" && tokenId.trim().length > 0) {
            let response = await fetch(`/api/v1/auth/token`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id: tokenId })
            });

            response = await response.json();
            if (response && response.status == 200) {
                alert(response.status, response.message);
                history.go(0);
            } else {
                showAlert(response.status, response.message);
            }
            
        }
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

    function showAlert(status, message="Something went wrong.") {
        if (status >= 400 && status <= 499) {
            alert(message);
        } else {
            alert(message);
        }
    }


});