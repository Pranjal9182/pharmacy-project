document.addEventListener("DOMContentLoaded", () => {

    /* =========================================================
       CONTACT FORM
    ========================================================= */

    const form = document.getElementById("contact-form");

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const subjectInput = document.getElementById("subject");
    const messageInput = document.getElementById("message");
    const termsInput = document.getElementById("terms");

    const nameError = document.getElementById("name-error");
    const emailError = document.getElementById("email-error");
    const successMessage = document.getElementById("contact-success");


    /* =========================================================
       VALIDATION FUNCTIONS
    ========================================================= */

    function showError(element, message) {

        if (element) {
            element.textContent = message;
        }

    }


    function clearError(element) {

        if (element) {
            element.textContent = "";
        }

    }


    function validateName() {

        if (!nameInput) {
            return true;
        }

        const name = nameInput.value.trim();

        if (name === "") {

            showError(
                nameError,
                "Please enter your name."
            );

            return false;
        }


        if (name.length < 2) {

            showError(
                nameError,
                "Name must contain at least 2 characters."
            );

            return false;
        }


        if (!/^[a-zA-ZÀ-ÿ\s.'-]+$/.test(name)) {

            showError(
                nameError,
                "Please enter a valid name."
            );

            return false;
        }


        clearError(nameError);

        return true;
    }


    function validateEmail() {

        if (!emailInput) {
            return true;
        }

        const email = emailInput.value.trim();

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;


        if (email === "") {

            showError(
                emailError,
                "Please enter your email address."
            );

            return false;
        }


        if (!emailPattern.test(email)) {

            showError(
                emailError,
                "Please enter a valid email address."
            );

            return false;
        }


        clearError(emailError);

        return true;
    }


    function validatePhone() {

        if (!phoneInput) {
            return true;
        }

        const phone =
            phoneInput.value.trim();


        // Phone is optional
        if (phone === "") {
            return true;
        }


        const cleanedPhone =
            phone.replace(/[\s()+-]/g, "");


        if (!/^\d{7,15}$/.test(cleanedPhone)) {

            return false;
        }


        return true;
    }


    function validateSubject() {

        if (!subjectInput) {
            return true;
        }

        return subjectInput.value.trim() !== "";
    }


    function validateMessage() {

        if (!messageInput) {
            return true;
        }

        return messageInput.value.trim() !== "";
    }


    function validateTerms() {

        if (!termsInput) {
            return true;
        }

        return termsInput.checked;
    }


    /* =========================================================
       REAL-TIME VALIDATION
    ========================================================= */

    if (nameInput) {

        nameInput.addEventListener(
            "input",
            validateName
        );

        nameInput.addEventListener(
            "blur",
            validateName
        );

    }


    if (emailInput) {

        emailInput.addEventListener(
            "input",
            validateEmail
        );

        emailInput.addEventListener(
            "blur",
            validateEmail
        );

    }


    /* =========================================================
       FORM SUBMIT
    ========================================================= */

    if (form) {

        form.addEventListener("submit", (event) => {

            event.preventDefault();


            const validName =
                validateName();

            const validEmail =
                validateEmail();

            const validPhone =
                validatePhone();

            const validSubject =
                validateSubject();

            const validMessage =
                validateMessage();

            const validTerms =
                validateTerms();


            if (
                !validName ||
                !validEmail ||
                !validPhone ||
                !validSubject ||
                !validMessage ||
                !validTerms
            ) {

                if (!validTerms && termsInput) {

                    termsInput.focus();

                }

                return;
            }


            /* ================================================
               SUCCESS
            ================================================ */

            if (successMessage) {

                successMessage.classList.add("show");

            }


            /* Button */

            const submitButton =
                form.querySelector(
                    ".contact__button"
                );


            if (submitButton) {

                const originalHTML =
                    submitButton.innerHTML;


                submitButton.disabled = true;

                submitButton.innerHTML = `
                    <i class="ri-loader-4-line"></i>
                    Sending...
                `;


                setTimeout(() => {

                    submitButton.disabled = false;

                    submitButton.innerHTML =
                        originalHTML;


                    form.reset();


                    clearError(nameError);
                    clearError(emailError);


                    if (successMessage) {

                        successMessage.classList.remove(
                            "show"
                        );

                    }

                }, 3000);

            }

        });

    }


    /* =========================================================
       SCROLL UP BUTTON
    ========================================================= */

    const scrollUp =
        document.getElementById("scroll-up");


    if (scrollUp) {

        function updateScrollButton() {

            if (window.scrollY >= 400) {

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


    /* =========================================================
       PHONE INPUT
    ========================================================= */

    if (phoneInput) {

        phoneInput.addEventListener(
            "input",
            () => {

                /*
                 * Allows:
                 * +, numbers, spaces, brackets and hyphen
                 */

                phoneInput.value =
                    phoneInput.value.replace(
                        /[^0-9+\-\s()]/g,
                        ""
                    );

            }
        );

    }


    /* =========================================================
       PREVENT DOUBLE SUBMISSION
    ========================================================= */

    if (form) {

        form.addEventListener(
            "keydown",
            (event) => {

                if (
                    event.key === "Enter" &&
                    event.target.tagName !== "TEXTAREA"
                ) {

                    event.preventDefault();

                }

            }
        );

    }

});