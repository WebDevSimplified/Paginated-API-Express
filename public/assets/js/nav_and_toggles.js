window.addEventListener("load", function() {
    // Primary Nav
    const toggleNavBtn = document.querySelector("nav#main #toggle-navigation-btn");
    const navItems = document.querySelector("#nav-items");
    const navBtnIconDown = toggleNavBtn.children[0];
    const navBtnIconUp = toggleNavBtn.children[1];
    let isNavOpen = false;

    toggleNavBtn.addEventListener("click", toggleNav);

    function toggleNav() {
        if (isNavOpen) {
            navItems.classList.add("hidden");
            navItems.classList.remove("flex");

            navBtnIconUp.classList.add("hidden");
            navBtnIconDown.classList.remove("hidden");
        } else {
            navItems.classList.remove("hidden");
            navItems.classList.add("flex");

            navBtnIconDown.classList.add("hidden");
            navBtnIconUp.classList.remove("hidden");
        }

        isNavOpen = !isNavOpen;
        
    }

    // #getting-started Nav
    const gsToggleNavBtn = document.querySelector("#gs-toggle-navigation-btn");
    const gsNavItems = document.querySelector("#gs-nav-items");
    const gsNavBtnIconDown = gsToggleNavBtn.children[0];
    const gsNavBtnIconUp = gsToggleNavBtn.children[1];
    let gsIsNavOpen = false;

    gsToggleNavBtn.addEventListener("click", gsToggleNav);

    function gsToggleNav() {
        if (gsIsNavOpen) {
            gsNavItems.classList.add("hidden");
            gsNavItems.classList.remove("flex");

            gsNavBtnIconUp.classList.add("hidden");
            gsNavBtnIconDown.classList.remove("hidden");
        } else {
            gsNavItems.classList.remove("hidden");
            gsNavItems.classList.add("flex");

            gsNavBtnIconDown.classList.add("hidden");
            gsNavBtnIconUp.classList.remove("hidden");
        }

        gsIsNavOpen = !gsIsNavOpen;
    }

    // #getting-started account nav-items
    const gsAcToggleNavBtn = document.querySelector("button#gs-ac-toggle-navigation-btn");
    const gsAcNavItems = document.querySelector(".gs-ac-nav-items");
    const gsAcNavIcons = document.querySelectorAll("button#gs-ac-toggle-navigation-btn > .iconify");
    const gsAcNavBtnIconDown = gsAcNavIcons[1];
    const gsAcNavBtnIconUp = gsAcNavIcons[2];
    let gsAcIsNavOpen = false;

    gsAcToggleNavBtn.addEventListener("click", gsAcToggleNav);

    function gsAcToggleNav(e) {
        e.preventDefault();
        if (gsAcIsNavOpen) {
            gsAcNavItems.classList.add("hidden");
            gsAcNavItems.classList.remove("inline-block");

            gsAcNavBtnIconUp.classList.add("hidden");
            gsAcNavBtnIconDown.classList.remove("hidden");
        } else {
            gsAcNavItems.classList.remove("hidden");
            gsAcNavItems.classList.add("inline-block");

            gsAcNavBtnIconDown.classList.add("hidden");
            gsAcNavBtnIconUp.classList.remove("hidden");
        }

        gsAcIsNavOpen = !gsAcIsNavOpen;
    }

    // auth switcher
    const loginForm = document.querySelector('form[name="login"]');
    const registrationForm = document.querySelector('form[name="registration"]');
    const authSwitcher = document.querySelectorAll("button.auth-switcher");
    let authSwitcherIsRegistrationOpen = !registrationForm.classList.contains("hidden");

    authSwitcher.forEach(function(btn){
        btn.addEventListener("click", toggleAuth);
    });

    function toggleAuth(e) {
        e.preventDefault();
        if (authSwitcherIsRegistrationOpen) {
            registrationForm.classList.add("hidden");
            loginForm.classList.remove("hidden");
        } else {
            registrationForm.classList.remove("hidden");
            loginForm.classList.add("hidden");
        }

        authSwitcherIsRegistrationOpen = !authSwitcherIsRegistrationOpen;
    }
    

    // Footer
    const copyrightYear = document.querySelector("#copyright-year");
    copyrightYear.textContent =  new Date().getFullYear();      


});