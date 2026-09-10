// /* =========================================================
//    SHOP PAGE
//    ========================================================= */

// document.addEventListener("DOMContentLoaded", () => {

//     const productGrid = document.querySelector(".shop__grid");
//     const filter = document.querySelector(".shop__filter");
//     const productCount = document.querySelector(".shop__count");
//     const products = document.querySelectorAll(".product-card");


//     /* =====================================================
//        PRODUCT FILTER
//        ===================================================== */

//     if (filter && productGrid) {

//         filter.addEventListener("change", () => {

//             const selectedCategory = filter.value.toLowerCase();

//             let visibleProducts = 0;

//             products.forEach((product) => {

//                 const categoryElement =
//                     product.querySelector(".product-card__category");

//                 if (!categoryElement) return;

//                 const category =
//                     categoryElement.textContent
//                         .trim()
//                         .toLowerCase();

//                 if (
//                     selectedCategory === "all" ||
//                     category === selectedCategory
//                 ) {

//                     product.style.display = "";

//                     visibleProducts++;

//                     // Small animation
//                     product.style.opacity = "0";

//                     requestAnimationFrame(() => {
//                         product.style.transition = "opacity 0.25s ease";
//                         product.style.opacity = "1";
//                     });

//                 } else {

//                     product.style.display = "none";

//                 }

//             });


//             /* Update product count */

//             if (productCount) {

//                 productCount.textContent =
//                     `${visibleProducts} ${
//                         visibleProducts === 1
//                             ? "product"
//                             : "products"
//                     }`;

//             }

//         });

//     }


//     /* =====================================================
//        WISHLIST
//        ===================================================== */

//     const wishlistButtons =
//         document.querySelectorAll(".product-card__wishlist");


//     wishlistButtons.forEach((button) => {

//         button.addEventListener("click", () => {

//             const icon = button.querySelector("i");

//             if (!icon) return;


//             const isActive =
//                 button.classList.toggle("wishlist-active");


//             if (isActive) {

//                 icon.classList.remove("ri-heart-line");
//                 icon.classList.add("ri-heart-fill");

//             } else {

//                 icon.classList.remove("ri-heart-fill");
//                 icon.classList.add("ri-heart-line");

//             }

//         });

//     });


//     /* =====================================================
//        PRODUCT VIEW BUTTON
//        ===================================================== */

//     const viewButtons =
//         document.querySelectorAll(".product-card__button");


//     viewButtons.forEach((button) => {

//         button.addEventListener("click", (event) => {

//             /*
//              * Currently the buttons already point to
//              * product.html.
//              *
//              * Keeping the default link behavior.
//              */

//             const productCard =
//                 button.closest(".product-card");

//             if (!productCard) return;

//             const title =
//                 productCard.querySelector(
//                     ".product-card__title"
//                 );

//             if (title) {

//                 // Store selected product name
//                 localStorage.setItem(
//                     "selectedProduct",
//                     title.textContent.trim()
//                 );

//             }

//         });

//     });

// });
document.addEventListener("DOMContentLoaded", () => {

    /* =========================================================
       ELEMENTS
    ========================================================= */

    const navMenu = document.getElementById("nav-menu");
    const navToggle = document.getElementById("nav-toggle");
    const navClose = document.getElementById("nav-close");

    const searchIcon = document.querySelector(".nav__theme");
    const searchFilter = document.querySelector(".shop__filter");
    const productGrid = document.querySelector(".shop__grid");
    const productCount = document.querySelector(".shop__count");

    const productCards = document.querySelectorAll(".product-card");


    /* =========================================================
       MOBILE NAVIGATION
    ========================================================= */

    if (navToggle && navMenu) {
        navToggle.addEventListener("click", () => {
            navMenu.classList.add("show-menu");
        });
    }

    if (navClose && navMenu) {
        navClose.addEventListener("click", () => {
            navMenu.classList.remove("show-menu");
        });
    }


    // Close mobile menu when clicking a navigation link

    const navLinks = document.querySelectorAll(".nav__link");

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (navMenu) {
                navMenu.classList.remove("show-menu");
            }
        });
    });


    // Close mobile menu when clicking outside

    document.addEventListener("click", (event) => {

        if (
            navMenu &&
            navToggle &&
            !navMenu.contains(event.target) &&
            !navToggle.contains(event.target)
        ) {
            navMenu.classList.remove("show-menu");
        }

    });


    /* =========================================================
       SEARCH OVERLAY
    ========================================================= */

    if (searchIcon && productGrid) {

        const searchOverlay = document.createElement("div");

        searchOverlay.className = "shop-search";

        searchOverlay.innerHTML = `
            <div class="shop-search__overlay"></div>

            <div class="shop-search__box">

                <div class="shop-search__header">

                    <h3>Search Products</h3>

                    <button
                        type="button"
                        class="shop-search__close"
                        aria-label="Close search"
                    >
                        <i class="ri-close-line"></i>
                    </button>

                </div>

                <div class="shop-search__input">

                    <i class="ri-search-line"></i>

                    <input
                        type="search"
                        id="shop-search-input"
                        placeholder="Search medicine..."
                        autocomplete="off"
                    >

                </div>

                <p class="shop-search__result"></p>

            </div>
        `;

        document.body.appendChild(searchOverlay);


        const searchInput =
            searchOverlay.querySelector("#shop-search-input");

        const searchClose =
            searchOverlay.querySelector(".shop-search__close");

        const searchBackground =
            searchOverlay.querySelector(".shop-search__overlay");

        const searchResult =
            searchOverlay.querySelector(".shop-search__result");


        /* =====================================================
           OPEN SEARCH
        ===================================================== */

        searchIcon.addEventListener("click", (event) => {

            event.preventDefault();

            searchOverlay.classList.add("active");

            document.body.classList.add("search-open");

            setTimeout(() => {
                searchInput.focus();
            }, 150);

        });


        /* =====================================================
           CLOSE SEARCH
        ===================================================== */

        const closeSearch = () => {

            searchOverlay.classList.remove("active");

            document.body.classList.remove("search-open");

            searchInput.value = "";

            searchResult.textContent = "";

            // Show products again
            productCards.forEach(card => {
                card.style.display = "";
            });

            updateProductCount();

        };


        searchClose.addEventListener("click", closeSearch);

        searchBackground.addEventListener("click", closeSearch);


        /* =====================================================
           SEARCH PRODUCTS
        ===================================================== */

        searchInput.addEventListener("input", () => {

            const searchValue =
                searchInput.value.toLowerCase().trim();

            let foundProducts = 0;


            productCards.forEach(card => {

                const title =
                    card.querySelector(".product-card__title")
                    ?.textContent
                    .toLowerCase() || "";

                const description =
                    card.querySelector(".product-card__description")
                    ?.textContent
                    .toLowerCase() || "";

                const category =
                    card.querySelector(".product-card__category")
                    ?.textContent
                    .toLowerCase() || "";


                const searchableText =
                    `${title} ${description} ${category}`;


                if (
                    searchValue === "" ||
                    searchableText.includes(searchValue)
                ) {

                    card.style.display = "";

                    foundProducts++;

                } else {

                    card.style.display = "none";

                }

            });


            if (searchValue === "") {

                searchResult.textContent = "";

            } else if (foundProducts === 0) {

                searchResult.textContent =
                    `No products found for "${searchInput.value}"`;

            } else {

                searchResult.textContent =
                    `${foundProducts} product${foundProducts > 1 ? "s" : ""} found`;

            }

        });


        /* =====================================================
           ESCAPE KEY
        ===================================================== */

        document.addEventListener("keydown", (event) => {

            if (
                event.key === "Escape" &&
                searchOverlay.classList.contains("active")
            ) {
                closeSearch();
            }

        });

    }


    /* =========================================================
       CATEGORY FILTER
    ========================================================= */

    if (searchFilter) {

        searchFilter.addEventListener("change", () => {

            const selectedCategory =
                searchFilter.value.toLowerCase();

            let visibleProducts = 0;


            productCards.forEach(card => {

                const category =
                    card.querySelector(".product-card__category")
                    ?.textContent
                    .toLowerCase()
                    .trim() || "";


                if (
                    selectedCategory === "all" ||
                    category === selectedCategory
                ) {

                    card.style.display = "";

                    visibleProducts++;

                } else {

                    card.style.display = "none";

                }

            });


            updateProductCount(visibleProducts);

        });

    }


    /* =========================================================
       PRODUCT COUNT
    ========================================================= */

    function updateProductCount(customCount = null) {

        if (!productCount) {
            return;
        }


        if (customCount !== null) {

            productCount.textContent =
                `${customCount} product${customCount !== 1 ? "s" : ""}`;

            return;

        }


        let count = 0;

        productCards.forEach(card => {

            if (card.style.display !== "none") {
                count++;
            }

        });


        productCount.textContent =
            `${count} product${count !== 1 ? "s" : ""}`;

    }


    /* =========================================================
       WISHLIST
    ========================================================= */

    const wishlistButtons =
        document.querySelectorAll(".product-card__wishlist");


    wishlistButtons.forEach(button => {

        button.addEventListener("click", (event) => {

            event.preventDefault();

            const icon = button.querySelector("i");

            if (!icon) {
                return;
            }


            const isActive =
                button.classList.toggle("wishlist-active");


            if (isActive) {

                icon.classList.remove("ri-heart-line");

                icon.classList.add("ri-heart-fill");

            } else {

                icon.classList.remove("ri-heart-fill");

                icon.classList.add("ri-heart-line");

            }

        });

    });


    /* =========================================================
       INITIAL PRODUCT COUNT
    ========================================================= */

    updateProductCount();

});
