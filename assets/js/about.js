document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const navMenu = document.getElementById("nav-menu");
    const navToggle = document.getElementById("nav-toggle");
    const navClose = document.getElementById("nav-close");

    const searchButton =
        document.getElementById("search-button");

    const searchBox =
        document.getElementById("search");

    const searchClose =
        document.getElementById("search-close");

    const searchInput =
        document.getElementById("search-input");

    const themeButton =
        document.getElementById("theme-button");

    const themeIcon =
        themeButton
            ? themeButton.querySelector("i")
            : null;

    const scrollUp =
        document.getElementById("scroll-up");


    /* =====================================================
       MOBILE DROPDOWN
    ===================================================== */

    function openMenu() {

        if (!navMenu || !navToggle) return;

        navMenu.classList.add("show-menu");

        navToggle.setAttribute(
            "aria-expanded",
            "true"
        );

        const icon =
            navToggle.querySelector("i");

        if (icon) {

            icon.classList.remove(
                "ri-menu-line"
            );

            icon.classList.add(
                "ri-close-line"
            );

        }

    }


    function closeMenu() {

        if (!navMenu || !navToggle) return;

        navMenu.classList.remove(
            "show-menu"
        );

        navToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        const icon =
            navToggle.querySelector("i");

        if (icon) {

            icon.classList.remove(
                "ri-close-line"
            );

            icon.classList.add(
                "ri-menu-line"
            );

        }

    }


    if (navToggle) {

        navToggle.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

                event.stopPropagation();


                if (
                    navMenu.classList.contains(
                        "show-menu"
                    )
                ) {

                    closeMenu();

                } else {

                    openMenu();

                }

            }
        );

    }


    /* =====================================================
       CLOSE BUTTON
    ===================================================== */

    if (navClose) {

        navClose.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

                closeMenu();

            }
        );

    }


    /* =====================================================
       CLOSE AFTER NAV LINK CLICK
    ===================================================== */

    if (navMenu) {

        const navLinks =
            navMenu.querySelectorAll(
                ".nav__link"
            );


        navLinks.forEach((link) => {

            link.addEventListener(
                "click",
                () => {

                    closeMenu();

                }
            );

        });

    }


    /* =====================================================
       OUTSIDE CLICK
    ===================================================== */

    document.addEventListener(
        "click",
        (event) => {

            if (!navMenu || !navToggle) {
                return;
            }


            if (
                !navMenu.contains(event.target) &&
                !navToggle.contains(event.target)
            ) {

                closeMenu();

            }

        }
    );


    /* =====================================================
       ESCAPE
    ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Escape") {

                closeMenu();

                closeSearch();

            }

        }
    );


    /* =====================================================
       SEARCH OPEN
    ===================================================== */

    function openSearch() {

        if (!searchBox) return;

        searchBox.classList.add(
            "show-search"
        );

        document.body.style.overflow =
            "hidden";


        if (searchInput) {

            setTimeout(() => {

                searchInput.focus();

            }, 200);

        }

    }


    /* =====================================================
       SEARCH CLOSE
    ===================================================== */

    function closeSearch() {

        if (!searchBox) return;

        searchBox.classList.remove(
            "show-search"
        );

        document.body.style.overflow =
            "";

    }


    if (searchButton) {

        searchButton.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

                event.stopPropagation();

                openSearch();

            }
        );

    }


    if (searchClose) {

        searchClose.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

                closeSearch();

            }
        );

    }


    /* =====================================================
       SEARCH BACKGROUND CLICK
    ===================================================== */

    if (searchBox) {

        searchBox.addEventListener(
            "click",
            (event) => {

                if (
                    event.target === searchBox
                ) {

                    closeSearch();

                }

            }
        );

    }


    /* =====================================================
       DARK / LIGHT THEME
    ===================================================== */

    if (themeButton) {

        themeButton.addEventListener(
            "click",
            () => {

                document.body.classList.toggle(
                    "dark-theme"
                );


                const darkMode =
                    document.body.classList.contains(
                        "dark-theme"
                    );


                if (themeIcon) {

                    if (darkMode) {

                        themeIcon.classList.remove(
                            "ri-moon-fill"
                        );

                        themeIcon.classList.add(
                            "ri-sun-fill"
                        );

                    } else {

                        themeIcon.classList.remove(
                            "ri-sun-fill"
                        );

                        themeIcon.classList.add(
                            "ri-moon-fill"
                        );

                    }

                }


                localStorage.setItem(
                    "purevita-theme",
                    darkMode
                        ? "dark"
                        : "light"
                );

            }
        );


        /* Restore theme */

        const savedTheme =
            localStorage.getItem(
                "purevita-theme"
            );


        if (savedTheme === "dark") {

            document.body.classList.add(
                "dark-theme"
            );


            if (themeIcon) {

                themeIcon.classList.remove(
                    "ri-moon-fill"
                );

                themeIcon.classList.add(
                    "ri-sun-fill"
                );

            }

        }

    }


    /* =====================================================
       SCROLL UP
    ===================================================== */

    if (scrollUp) {

        function updateScrollButton() {

            if (window.scrollY >= 450) {

                scrollUp.classList.add(
                    "show-scroll"
                );

            } else {

                scrollUp.classList.remove(
                    "show-scroll"
                );

            }

        }


        window.addEventListener(
            "scroll",
            updateScrollButton,
            {
                passive: true
            }
        );


        scrollUp.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

                window.scrollTo({

                    top: 0,

                    behavior: "smooth"

                });

            }
        );


        updateScrollButton();

    }


    /* =====================================================
       CLOSE MENU ON DESKTOP
    ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth > 768
            ) {

                closeMenu();

            }

        }
    );


});