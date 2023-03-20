window.addEventListener("load", function() {
    const generateTokenBtn = document.querySelector("#generate-secret-btn");
    const apiSecretContainer = document.querySelectorAll(".api-secret-text");
    const copySecret = document.querySelector("#copy-secret");
    
    generateTokenBtn.addEventListener("click", async function() {
        const accessToken = localStorage.getItem("accessToken");
        let response = await fetch(`/api/v1/key`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        });

        response = await response.json() || false;
        if (response && response.key != undefined && response.status == 200) {
            apiSecretContainer.forEach(function(el) {
                el.textContent = response.key;
            });
        } else {
            // TODO: show error log
        }
    });

    copySecret.addEventListener("click", function() {
        navigator.clipboard.writeText(apiSecretContainer[0].textContent);
        alert("Copied the text: " + apiSecretContainer[0].textContent);
        copySecret.classList.add("hidden-key");
        apiSecretContainer.forEach(function(el) {
            el.textContent = "Dfn.__________________";
        });
    });
});
