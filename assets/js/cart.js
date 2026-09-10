/* =========================================================
   CART SYSTEM
   ========================================================= */

const CART_KEY = "kamagra_cart";


/* =========================================================
   GET CART
   ========================================================= */

function getCart() {

    try {

        const cart = localStorage.getItem(CART_KEY);

        return cart ? JSON.parse(cart) : [];

    } catch (error) {

        console.error("Unable to read cart:", error);

        return [];

    }

}


/* =========================================================
   SAVE CART
   ========================================================= */

function saveCart(cart) {

    localStorage.setItem(
        CART_KEY,
        JSON.stringify(cart)
    );

}


/* =========================================================
   FORMAT PRICE
   ========================================================= */

function formatPrice(price) {

    return `$${Number(price).toFixed(2)}`;

}


/* =========================================================
   UPDATE HEADER
   ========================================================= */

function updateCartHeader() {

    const cart = getCart();

    const totalItems = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const totalPrice = cart.reduce(
        (total, item) =>
            total + (Number(item.price) * item.quantity),
        0
    );


    const navTotal =
        document.getElementById("nav-cart-total");

    const cartCount =
        document.getElementById("cart-count");


    if (navTotal) {

        navTotal.textContent =
            formatPrice(totalPrice);

    }


    if (cartCount) {

        cartCount.textContent = totalItems;

        cartCount.style.display =
            totalItems > 0 ? "flex" : "none";

    }

}


/* =========================================================
   RENDER CART
   ========================================================= */

function renderCart() {

    const cart = getCart();

    const cartItems =
        document.getElementById("cart-items");

    const emptyCart =
        document.getElementById("empty-cart");

    const cartItemsCount =
        document.getElementById("cart-items-count");

    const summaryItems =
        document.getElementById("summary-items");

    const subtotalElement =
        document.getElementById("cart-subtotal");

    const totalElement =
        document.getElementById("cart-total");

    const checkoutButton =
        document.getElementById("checkout-button");

    const clearButton =
        document.getElementById("clear-cart");


    if (!cartItems) {
        return;
    }


    /* =====================================================
       EMPTY CART
       ===================================================== */

    if (cart.length === 0) {

        cartItems.innerHTML = "";

        emptyCart?.classList.add("show");

        if (cartItemsCount) {
            cartItemsCount.textContent = "0 items";
        }

        if (summaryItems) {
            summaryItems.textContent = "0";
        }

        if (subtotalElement) {
            subtotalElement.textContent = "$0.00";
        }

        if (totalElement) {
            totalElement.textContent = "$0.00";
        }

        if (checkoutButton) {
            checkoutButton.disabled = true;
        }

        if (clearButton) {
            clearButton.style.display = "none";
        }

        updateCartHeader();

        return;

    }


    /* =====================================================
       CART HAS ITEMS
       ===================================================== */

    emptyCart?.classList.remove("show");

    if (checkoutButton) {
        checkoutButton.disabled = false;
    }

    if (clearButton) {
        clearButton.style.display = "";
    }


    let totalItems = 0;
    let totalPrice = 0;


    cartItems.innerHTML = cart.map(item => {

        const quantity =
            Number(item.quantity) || 1;

        const price =
            Number(item.price) || 0;

        const itemTotal =
            price * quantity;


        totalItems += quantity;
        totalPrice += itemTotal;


        return `

            <article class="cart-item"
                data-id="${item.id}">

                <img
                    src="${item.image}"
                    alt="${item.name}"
                    class="cart-item__image"
                >


                <div class="cart-item__content">

                    <span class="cart-item__category">
                        ${item.category || "Healthcare"}
                    </span>

                    <h3 class="cart-item__title">
                        ${item.name}
                    </h3>

                    <span class="cart-item__price">
                        ${formatPrice(price)}
                    </span>


                    <div class="cart-item__controls">

                        <div class="cart-item__quantity">

                            <button
                                type="button"
                                class="quantity-minus"
                                data-id="${item.id}"
                                aria-label="Decrease quantity">

                                <i class="ri-subtract-line"></i>

                            </button>


                            <span>
                                ${quantity}
                            </span>


                            <button
                                type="button"
                                class="quantity-plus"
                                data-id="${item.id}"
                                aria-label="Increase quantity">

                                <i class="ri-add-line"></i>

                            </button>

                        </div>

                    </div>

                </div>


                <div class="cart-item__right">

                    <strong class="cart-item__total">
                        ${formatPrice(itemTotal)}
                    </strong>


                    <button
                        type="button"
                        class="cart-item__remove"
                        data-id="${item.id}"
                        aria-label="Remove ${item.name}">

                        <i class="ri-delete-bin-line"></i>

                    </button>

                </div>

            </article>

        `;

    }).join("");


    /* =====================================================
       UPDATE SUMMARY
       ===================================================== */

    if (cartItemsCount) {

        cartItemsCount.textContent =
            `${totalItems} ${
                totalItems === 1 ? "item" : "items"
            }`;

    }


    if (summaryItems) {
        summaryItems.textContent = totalItems;
    }


    if (subtotalElement) {
        subtotalElement.textContent =
            formatPrice(totalPrice);
    }


    if (totalElement) {
        totalElement.textContent =
            formatPrice(totalPrice);
    }


    updateCartHeader();

}


/* =========================================================
   CHANGE QUANTITY
   ========================================================= */

function changeQuantity(id, change) {

    const cart = getCart();

    const item = cart.find(
        product => product.id === id
    );

    if (!item) {
        return;
    }


    item.quantity += change;


    if (item.quantity <= 0) {

        const updatedCart =
            cart.filter(product => product.id !== id);

        saveCart(updatedCart);

    } else {

        saveCart(cart);

    }


    renderCart();

}


/* =========================================================
   REMOVE PRODUCT
   ========================================================= */

function removeFromCart(id) {

    const cart = getCart();

    const updatedCart =
        cart.filter(product => product.id !== id);

    saveCart(updatedCart);

    renderCart();

}


/* =========================================================
   CLEAR CART
   ========================================================= */

function clearCart() {

    const cart = getCart();

    if (cart.length === 0) {
        return;
    }


    const confirmed =
        window.confirm(
            "Are you sure you want to clear your cart?"
        );


    if (!confirmed) {
        return;
    }


    localStorage.removeItem(CART_KEY);

    renderCart();

}


/* =========================================================
   EVENTS
   ========================================================= */

document.addEventListener(
    "click",
    event => {

        const plusButton =
            event.target.closest(".quantity-plus");

        const minusButton =
            event.target.closest(".quantity-minus");

        const removeButton =
            event.target.closest(".cart-item__remove");


        if (plusButton) {

            changeQuantity(
                plusButton.dataset.id,
                1
            );

            return;

        }


        if (minusButton) {

            changeQuantity(
                minusButton.dataset.id,
                -1
            );

            return;

        }


        if (removeButton) {

            removeFromCart(
                removeButton.dataset.id
            );

            return;

        }

    }
);


/* =========================================================
   CLEAR BUTTON
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const clearButton =
            document.getElementById("clear-cart");

        const checkoutButton =
            document.getElementById("checkout-button");


        if (clearButton) {

            clearButton.addEventListener(
                "click",
                clearCart
            );

        }


        if (checkoutButton) {

            checkoutButton.addEventListener(
                "click",
                () => {

                    const cart = getCart();

                    if (cart.length === 0) {
                        return;
                    }

                    /*
                     * Checkout page can be connected later.
                     */

                    window.location.href =
                        "proceed.html";

                }
            );

        }


        renderCart();

    }
);