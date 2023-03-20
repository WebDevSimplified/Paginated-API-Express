window.addEventListener("load", function() {
    const generateTokenBtn = document.querySelector("#generate-secret-btn");
    const apiSecretContainer = document.querySelector("#api-secret-text");
    const copySecret = this.document.querySelector("#copy-secret");
    
    console.log(generateTokenBtn);
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
            apiSecretContainer.textContent = response.key;
        } else {
            // TODO: show error log
        }
    });
});