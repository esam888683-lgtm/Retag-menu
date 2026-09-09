/**
 * ============================================================
 * حلال فور يو — ELECTRONIC MENU APPLICATION LOGIC
 * ============================================================
 * Sections in this file:
 *   1. Restaurant configuration   (edit here to rebrand)
 *   2. State
 *   3. Helpers (formatting, sanitization, storage)
 *   4. Rendering — categories & products
 *   5. Product details sheet
 *   6. Cart logic
 *   7. Cart sheet rendering
 *   8. Checkout flow & validation
 *   9. WhatsApp order message
 *   10. Toasts
 *   11. Sheet open/close helpers
 *   12. Init / event wiring
 * ============================================================
 */

/* ---------------------------------------------------------------
   1. RESTAURANT CONFIGURATION
   Change the restaurant's identity from this single object.
   --------------------------------------------------------------- */
const restaurantConfig = {
    name: "حلال فور يو",
    slogan: "تاكل وانت مطمن",
    logo: "assets/logo.svg",
    // Egyptian mobile format, country code first, no + or leading 0
    // e.g. 010 1234 5678  ->  "201012345678"
    whatsappNumber: "201106122500",
    currency: "ج.م",
    primaryColor: "#7A1F2B",

    // ------------------------------------------------------------
    // DELIVERY AREAS
    // Add, remove, rename, or reprice delivery areas here — the
    // customer picks one of these from a dropdown at checkout and
    // the matching fee is added to their total automatically.
    // `id` must be unique. `fee` is in the currency above.
    // ------------------------------------------------------------
    deliveryAreas: [
        { id: "elsheme", name: "الشيمي", fee: 12 },
        { id: "tarek", name: "الطريق", fee: 10 },
        { id: "arab", name: "العرب", fee: 17 },
        { id: "nile", name: "جسر النيل", fee: 15 },
        { id: "nady", name: "شارع النادي", fee: 15 },
        { id: "big", name: "الجامع الكبير", fee: 15 },
        { id: "morad", name: "مراد", fee: 17 },
        { id: "arbain", name: "الاربعين", fee: 20 },
        { id: "amea", name: "العاميه", fee: 15 },
        { id: "saif", name: "سيف الدين", fee: 27 },
        { id: "shararara", name: "شراره", fee: 17 },
        { id: "dairy", name: "الدائري", fee: 25 },
        { id: "warak", name: "الوراق", fee: 60 },
        { id: "moza", name: "موزه وباسوس", fee: 28 },
        { id: "kharkania", name: "الخرقانيه", fee: 30 },
        { id: "khanater", name: "القناطر", fee: 45 },
        { id: "gzera", name: "جزيره بحريه", fee: 30 },
        { id: "salakhana", name: "السلخانه", fee: 17 },
        { id: "lagna", name: "لجنه الذكاه", fee: 10 },
        { id: "rashah", name: "طريق الرشاح", fee: 12 },
        { id: "mo3ez", name: "جامع المعز", fee: 15 },
        { id: "tea3t", name: "ترعه البلد", fee: 15 },
        { id: "adoelkhet", name: "موقف ابو الغيط", fee: 12 },
        { id: "kaleop", name: "طريق قليوب", fee: 20 },
        { id: "ali", name: "السعدنه - علي حامد", fee: 15 },
        { id: "lela", name: "ارض ابو ليله", fee: 17 },
        { id: "new", name: "الحي الجديد", fee: 15 },
        { id: "swelm", name: "سويلم", fee: 25 },
        { id: "abor", name: "العبور", fee: 150 },
        { id: "aida", name: "سكه عيده", fee: 15 },
        { id: "aboo", name: "ابو الغيط ", fee: 15 },
        { id: "shark", name: "الشرق", fee: 15 },
        { id: "fagala", name: "الفجالة", fee: 150 },
        { id: "sea", name: "المساكن البحريه", fee: 15 },
        { id: "khebly", name: "المساكن القبليه", fee: 15 },
        { id: "senaa", name: "ابو سنه", fee: 35 },
        { id: "sharrkk", name: "شركس", fee: 22 },
        { id: "hadsa", name: "الحادثه", fee: 30 },
        { id: "aomea", name: "القوميه", fee: 100 },
        { id: "kharis", name: "بنك القريه", fee: 12 },
        { id: "team", name: "بهتيم", fee: 70 },
        { id: "alaaan", name: "شلقان", fee: 35 },
        { id: "sfnks", name: "مطار سفنكس", fee: 250 },
        { id: "balad", name: "كوبري البد", fee: 15 },
        { id: "rostm", name: "رستم", fee: 25 },
        { id: "moasasa", name: "المؤسسه", fee: 50 },
        { id: "batek", name: "قليوب البطئ", fee: 60 },
        { id: "sobra", name: "شبرا الخيمه", fee: 50 },
        { id: "rashah", name: "الشيمي الرشاح", fee: 15 },
        { id: "aboelmenaga", name: "ابو المنجي", fee: 35 },
        { id: "sharkawya", name: "الشرقاويه", fee: 40 },
        { id: "ombayomy", name: "ام بيومي", fee: 100 },
        { id: "azbet", name: "عزبه ماهر", fee: 45 },
        { id: "mohamed", name: "عزبه الشيخ محمد", fee: 40 },
        { id: "halmos", name: "عزبه حلموس", fee: 40 },
        { id: "sag", name: "الصاج", fee: 30 },
        { id: "ashraa", name: "عزبه العشره", fee: 40 }
    ]
};

/* ---------------------------------------------------------------
   2. STATE
   --------------------------------------------------------------- */
const state = {
    activeCategory: "all",
    searchTerm: "",
    cart: [],                 // array of cart line items, see addToCart()
    activeProduct: null,      // product currently open in the details sheet
    sheetQuantity: 1,
    sheetSelectedExtras: {},  // { groupId: optionId | [optionId, ...] }
    orderType: "pickup",      // "pickup" | "delivery"
    selectedAreaId: null      // id from restaurantConfig.deliveryAreas, chosen at checkout
};

const CART_STORAGE_KEY = "hfy_cart_v1";

/* ---------------------------------------------------------------
   3. HELPERS
   --------------------------------------------------------------- */

// Format a number as Egyptian currency, e.g. 180 -> "180 ج.م"
function formatPrice(amount) {
    return `${amount.toLocaleString("ar-EG")} ${restaurantConfig.currency}`;
}

// Escape any characters that could be interpreted as HTML.
// Used everywhere user-typed text is inserted into the DOM.
function escapeHtml(value) {
    const div = document.createElement("div");
    div.textContent = value;
    return div.innerHTML;
}

// Find a product by id (never trust a price coming from user input —
// always look prices up from menuData instead).
function findProduct(id) {
    return menuData.products.find((p) => p.id === id) || null;
}

function findCategory(id) {
    return menuData.categories.find((c) => c.id === id) || null;
}

function getExtraGroup(groupId) {
    return menuData.extraGroups[groupId] || null;
}

function saveCart() {
    try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.cart));
    } catch (err) {
        console.error("Could not save cart to localStorage:", err);
    }
}

function loadCart() {
    try {
        const raw = localStorage.getItem(CART_STORAGE_KEY);
        state.cart = raw ? JSON.parse(raw) : [];
    } catch (err) {
        console.error("Could not read cart from localStorage:", err);
        state.cart = [];
    }
}

// Fallback image if a product image fails to load
function withImageFallback(imgEl, category) {
    imgEl.addEventListener("error", () => {
        const cat = findCategory(category);
        imgEl.src = cat ? `assets/products/${category}.svg` : restaurantConfig.logo;
    }, { once: true });
}

/* ---------------------------------------------------------------
   4. RENDERING — CATEGORIES & PRODUCTS
   --------------------------------------------------------------- */

function renderCategoryNav() {
    const nav = document.getElementById("categoryNav");
    const sorted = [...menuData.categories].sort((a, b) => a.order - b.order);

    const chips = [
        { id: "all", name: "الكل", icon: "🍽️" },
        ...sorted
    ];

    nav.innerHTML = chips.map((cat) => `
        <button
            type="button"
            class="category-chip ${state.activeCategory === cat.id ? "is-active" : ""}"
            data-category-id="${cat.id}"
            aria-pressed="${state.activeCategory === cat.id}"
        >
            <span class="chip-icon" aria-hidden="true">${cat.icon}</span>
            <span>${cat.name}</span>
        </button>
    `).join("");

    nav.querySelectorAll(".category-chip").forEach((chip) => {
        chip.addEventListener("click", () => {
            state.activeCategory = chip.dataset.categoryId;
            renderCategoryNav();
            renderProducts();
            chip.scrollIntoView({ inline: "center", behavior: "smooth", block: "nearest" });
        });
    });
}

// Returns the product list filtered by the current search term
function getFilteredProducts() {
    const term = state.searchTerm.trim().toLowerCase();
    if (!term) return menuData.products;

    return menuData.products.filter((p) => {
        const category = findCategory(p.category);
        const haystack = [p.name, p.description, category ? category.name : ""]
            .join(" ")
            .toLowerCase();
        return haystack.includes(term);
    });
}

function productCardHtml(product) {
    const isAvailable = product.available !== false;
    return `
        <article class="product-card ${isAvailable ? "" : "is-unavailable"}" data-product-id="${product.id}" tabindex="0" role="button" aria-label="${escapeHtml(product.name)}">
            <div class="card-image-wrap">
                <img src="${product.image}" alt="${escapeHtml(product.name)}" loading="lazy" data-category="${product.category}">
                ${product.badge ? `<span class="card-badge">${escapeHtml(product.badge)}</span>` : ""}
                ${!isAvailable ? `<div class="card-unavailable-badge">غير متاح حاليًا</div>` : ""}
            </div>
            <div class="card-body">
                <h3 class="card-name">${escapeHtml(product.name)}</h3>
                <p class="card-description">${escapeHtml(product.description)}</p>
                <div class="card-footer">
                    <span class="card-price">${formatPrice(product.price)}</span>
                    <button type="button" class="card-add-btn" data-quick-add="${product.id}" ${isAvailable ? "" : "disabled"} aria-label="إضافة ${escapeHtml(product.name)} للسلة">
                        + إضافة
                    </button>
                </div>
            </div>
        </article>
    `;
}

function renderProducts() {
    const grid = document.getElementById("productsGrid");
    const emptyState = document.getElementById("emptyState");
    const filtered = getFilteredProducts();

    if (filtered.length === 0) {
        grid.innerHTML = "";
        emptyState.hidden = false;
        return;
    }
    emptyState.hidden = true;

    let html = "";

    if (state.activeCategory === "all" && !state.searchTerm.trim()) {
        // Group by category with headings for browsability
        const sortedCats = [...menuData.categories].sort((a, b) => a.order - b.order);
        sortedCats.forEach((cat) => {
            const items = filtered.filter((p) => p.category === cat.id);
            if (items.length === 0) return;
            html += `<h2 class="category-heading"><span aria-hidden="true">${cat.icon}</span> ${escapeHtml(cat.name)}</h2>`;
            html += `<div class="products-grid" style="margin-bottom:6px">${items.map(productCardHtml).join("")}</div>`;
        });
        grid.outerHTML = `<div id="productsGrid" class="products-grid" style="display:block" aria-live="polite">${html}</div>`;
    } else {
        const visible = state.searchTerm.trim()
            ? filtered
            : filtered.filter((p) => p.category === state.activeCategory);

        if (visible.length === 0) {
            emptyState.hidden = false;
            grid.innerHTML = "";
            return;
        }

        grid.outerHTML = `<div id="productsGrid" class="products-grid" aria-live="polite">${visible.map(productCardHtml).join("")}</div>`;
    }

    attachProductCardEvents();
}

function attachProductCardEvents() {
    document.querySelectorAll(".product-card img[data-category]").forEach((img) => {
        withImageFallback(img, img.dataset.category);
    });

    document.querySelectorAll(".product-card").forEach((card) => {
        const productId = Number(card.dataset.productId);
        card.addEventListener("click", (e) => {
            if (e.target.closest("[data-quick-add]")) return; // handled separately
            openProductSheet(productId);
        });
        card.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openProductSheet(productId);
            }
        });
    });

    document.querySelectorAll("[data-quick-add]").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const productId = Number(btn.dataset.quickAdd);
            const product = findProduct(productId);
            if (!product || product.available === false) return;
            // Quick add: no extras, qty 1
            addToCart(product, 1, {});
            showToast(`تمت إضافة ${product.name} للسلة`, "success");
        });
    });
}

/* ---------------------------------------------------------------
   5. PRODUCT DETAILS SHEET
   --------------------------------------------------------------- */

function openProductSheet(productId) {
    const product = findProduct(productId);
    if (!product || product.available === false) return;

    state.activeProduct = product;
    state.sheetQuantity = 1;
    state.sheetSelectedExtras = {};

    // Initialize default selections for "single" extra groups
    (product.extraGroups || []).forEach((groupId) => {
        const group = getExtraGroup(groupId);
        if (group && group.type === "single" && group.options.length) {
            state.sheetSelectedExtras[groupId] = group.options[0].id;
        } else if (group && group.type === "multiple") {
            state.sheetSelectedExtras[groupId] = [];
        }
    });

    renderProductSheet();
    openSheet("productSheet", "productOverlay");
}

function calculateExtrasTotal(product) {
    let total = 0;
    (product.extraGroups || []).forEach((groupId) => {
        const group = getExtraGroup(groupId);
        if (!group) return;
        const selection = state.sheetSelectedExtras[groupId];

        if (group.type === "single") {
            const opt = group.options.find((o) => o.id === selection);
            if (opt) total += opt.price;
        } else if (group.type === "multiple" && Array.isArray(selection)) {
            selection.forEach((optId) => {
                const opt = group.options.find((o) => o.id === optId);
                if (opt) total += opt.price;
            });
        }
    });
    return total;
}

function renderProductSheet() {
    const product = state.activeProduct;
    if (!product) return;

    const img = document.getElementById("productSheetImage");
    img.src = product.image;
    img.alt = product.name;
    withImageFallback(img, product.category);

    document.getElementById("productSheetName").textContent = product.name;
    document.getElementById("productSheetDescription").textContent = product.description;
    document.getElementById("productSheetPrice").textContent = formatPrice(product.price);

    // Extras
    const extrasContainer = document.getElementById("productSheetExtras");
    extrasContainer.innerHTML = (product.extraGroups || []).map((groupId) => {
        const group = getExtraGroup(groupId);
        if (!group) return "";
        const inputType = group.type === "single" ? "radio" : "checkbox";

        const optionsHtml = group.options.map((opt) => {
            const selection = state.sheetSelectedExtras[groupId];
            const isChecked = group.type === "single"
                ? selection === opt.id
                : Array.isArray(selection) && selection.includes(opt.id);

            return `
                <label class="extra-option">
                    <span class="extra-option-left">
                        <input type="${inputType}" name="extra-${group.id}" value="${opt.id}" ${isChecked ? "checked" : ""} data-group="${group.id}" data-type="${group.type}">
                        ${escapeHtml(opt.name)}
                    </span>
                    <span class="extra-option-price">${opt.price > 0 ? `+${formatPrice(opt.price)}` : "مجانًا"}</span>
                </label>
            `;
        }).join("");

        return `
            <div class="extra-group">
                <h3 class="extra-group-title">${escapeHtml(group.title)}</h3>
                ${optionsHtml}
            </div>
        `;
    }).join("");

    extrasContainer.querySelectorAll("input[data-group]").forEach((input) => {
        input.addEventListener("change", () => {
            const groupId = input.dataset.group;
            const type = input.dataset.type;
            if (type === "single") {
                state.sheetSelectedExtras[groupId] = input.value;
            } else {
                const current = state.sheetSelectedExtras[groupId] || [];
                if (input.checked) {
                    state.sheetSelectedExtras[groupId] = [...current, input.value];
                } else {
                    state.sheetSelectedExtras[groupId] = current.filter((v) => v !== input.value);
                }
            }
            updateSheetTotalPrice();
        });
    });

    document.getElementById("sheetQtyValue").textContent = state.sheetQuantity;
    updateSheetTotalPrice();
}

function updateSheetTotalPrice() {
    const product = state.activeProduct;
    if (!product) return;
    const unitTotal = product.price + calculateExtrasTotal(product);
    const total = unitTotal * state.sheetQuantity;
    document.getElementById("addToCartPrice").textContent = formatPrice(total);
}

function changeSheetQuantity(delta) {
    const next = state.sheetQuantity + delta;
    if (next < 1 || next > 20) return;
    state.sheetQuantity = next;
    document.getElementById("sheetQtyValue").textContent = next;
    updateSheetTotalPrice();
}

/* ---------------------------------------------------------------
   6. CART LOGIC
   --------------------------------------------------------------- */

// Build a readable label + total for the currently selected extras,
// resolving actual option objects from menuData (never trust a
// price passed in from elsewhere).
function resolveExtras(product, selections) {
    const resolved = [];
    (product.extraGroups || []).forEach((groupId) => {
        const group = getExtraGroup(groupId);
        if (!group) return;
        const selection = selections[groupId];

        if (group.type === "single") {
            const opt = group.options.find((o) => o.id === selection);
            if (opt) resolved.push({ groupId, name: opt.name, price: opt.price });
        } else if (Array.isArray(selection)) {
            selection.forEach((optId) => {
                const opt = group.options.find((o) => o.id === optId);
                if (opt) resolved.push({ groupId, name: opt.name, price: opt.price });
            });
        }
    });
    return resolved;
}

function addToCart(product, quantity, extraSelections) {
    const resolvedExtras = resolveExtras(product, extraSelections || {});
    const extrasKey = resolvedExtras.map((e) => e.name).sort().join("|");

    // Merge into an existing identical line (same product + same extras)
    const existing = state.cart.find(
        (item) => item.productId === product.id && item.extrasKey === extrasKey
    );

    if (existing) {
        existing.quantity += quantity;
    } else {
        state.cart.push({
            lineId: `${product.id}-${Date.now()}`,
            productId: product.id,
            name: product.name,
            image: product.image,
            category: product.category,
            unitPrice: product.price,
            extras: resolvedExtras,
            extrasKey,
            quantity
        });
    }

    saveCart();
    updateCartBar();
    if (document.getElementById("cartSheet").hidden === false) {
        renderCartSheet();
    }
}

function updateCartLineQuantity(lineId, delta) {
    const item = state.cart.find((i) => i.lineId === lineId);
    if (!item) return;
    item.quantity += delta;
    if (item.quantity <= 0) {
        state.cart = state.cart.filter((i) => i.lineId !== lineId);
    }
    saveCart();
    updateCartBar();
    renderCartSheet();
}

function removeCartLine(lineId) {
    state.cart = state.cart.filter((i) => i.lineId !== lineId);
    saveCart();
    updateCartBar();
    renderCartSheet();
}

function clearCart() {
    state.cart = [];
    saveCart();
    updateCartBar();
    renderCartSheet();
}

function getLineTotal(item) {
    const extrasTotal = item.extras.reduce((sum, e) => sum + e.price, 0);
    return (item.unitPrice + extrasTotal) * item.quantity;
}

function getCartSubtotal() {
    return state.cart.reduce((sum, item) => sum + getLineTotal(item), 0);
}

function getCartItemCount() {
    return state.cart.reduce((sum, item) => sum + item.quantity, 0);
}

// Look up the fee for the currently selected delivery area.
// Returns 0 when the order type isn't delivery or no area is chosen yet.
function getSelectedArea() {
    return restaurantConfig.deliveryAreas.find((a) => a.id === state.selectedAreaId) || null;
}

function getDeliveryFee() {
    if (state.orderType !== "delivery") return 0;
    const area = getSelectedArea();
    return area ? area.fee : 0;
}

function getOrderTotal() {
    return getCartSubtotal() + getDeliveryFee();
}

function updateCartBar() {
    const bar = document.getElementById("cartBar");
    const count = getCartItemCount();

    if (count === 0) {
        bar.hidden = true;
        return;
    }

    bar.hidden = false;
    document.getElementById("cartBarCount").textContent = count;
    document.getElementById("cartBarLabel").textContent = "عرض السلة";
    document.getElementById("cartBarTotal").textContent = formatPrice(getCartSubtotal());
}

/* ---------------------------------------------------------------
   7. CART SHEET RENDERING
   --------------------------------------------------------------- */

function cartItemHtml(item) {
    const extrasLabel = item.extras.map((e) => e.name).join("، ");
    return `
        <div class="cart-item" data-line-id="${item.lineId}">
            <img class="cart-item-image" src="${item.image}" alt="" data-category="${item.category}">
            <div class="cart-item-body">
                <p class="cart-item-name">${escapeHtml(item.name)}</p>
                ${extrasLabel ? `<p class="cart-item-extras">${escapeHtml(extrasLabel)}</p>` : ""}
                <div class="cart-item-footer">
                    <span class="cart-item-price">${formatPrice(getLineTotal(item))}</span>
                    <div class="cart-item-qty">
                        <button type="button" class="qty-btn" data-decrease="${item.lineId}" aria-label="تقليل الكمية">&minus;</button>
                        <span class="qty-value">${item.quantity}</span>
                        <button type="button" class="qty-btn" data-increase="${item.lineId}" aria-label="زيادة الكمية">+</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderCartSheet() {
    const list = document.getElementById("cartItemsList");
    const emptyState = document.getElementById("cartEmptyState");
    const summary = document.getElementById("cartSummary");
    const clearBtn = document.getElementById("clearCartBtn");
    const goToCheckoutBtn = document.getElementById("goToCheckoutBtn");

    if (state.cart.length === 0) {
        list.innerHTML = "";
        emptyState.hidden = false;
        summary.hidden = true;
        clearBtn.hidden = true;
        goToCheckoutBtn.disabled = true;
        return;
    }

    emptyState.hidden = true;
    summary.hidden = false;
    clearBtn.hidden = false;
    goToCheckoutBtn.disabled = false;

    list.innerHTML = state.cart.map(cartItemHtml).join("");

    list.querySelectorAll("img[data-category]").forEach((img) => withImageFallback(img, img.dataset.category));
    list.querySelectorAll("[data-increase]").forEach((btn) => {
        btn.addEventListener("click", () => updateCartLineQuantity(btn.dataset.increase, 1));
    });
    list.querySelectorAll("[data-decrease]").forEach((btn) => {
        btn.addEventListener("click", () => updateCartLineQuantity(btn.dataset.decrease, -1));
    });

    document.getElementById("summarySubtotal").textContent = formatPrice(getCartSubtotal());
    document.getElementById("summaryTotal").textContent = formatPrice(getOrderTotal());

    const deliveryRow = document.getElementById("summaryDeliveryRow");
    if (state.orderType === "delivery" && getSelectedArea()) {
        deliveryRow.hidden = false;
        document.getElementById("summaryDelivery").textContent = formatPrice(getDeliveryFee());
    } else {
        deliveryRow.hidden = true;
    }
}

/* ---------------------------------------------------------------
   8. CHECKOUT FLOW & VALIDATION
   --------------------------------------------------------------- */

function setFieldError(fieldId, errorId, message) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(errorId);
    field.closest(".field").classList.add("has-error");
    error.textContent = message;
    error.hidden = false;
}

function clearFieldError(fieldId, errorId) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(errorId);
    field.closest(".field").classList.remove("has-error");
    error.hidden = true;
}

function clearAllFieldErrors() {
    ["Name", "Phone", "Area", "Address"].forEach((key) => {
        clearFieldError(`customer${key}`, `error${key}`);
    });
    document.getElementById("errorOrderType").hidden = true;
}

// Basic Egyptian mobile number validation: 11 digits starting with 01
function isValidEgyptianPhone(value) {
    const digitsOnly = value.replace(/[^\d]/g, "");
    return /^01[0125]\d{8}$/.test(digitsOnly);
}

function validateCheckoutForm() {
    clearAllFieldErrors();
    let isValid = true;

    const name = document.getElementById("customerName").value.trim();
    const phone = document.getElementById("customerPhone").value.trim();

    if (state.cart.length === 0) {
        showToast("السلة فارغة، من فضلك أضف أصناف أولاً.", "error");
        isValid = false;
    }

    if (!name) {
        setFieldError("customerName", "errorName", "من فضلك أدخل اسمك لإكمال الطلب.");
        isValid = false;
    }

    if (!phone) {
        setFieldError("customerPhone", "errorPhone", "من فضلك أدخل رقم هاتفك.");
        isValid = false;
    } else if (!isValidEgyptianPhone(phone)) {
        setFieldError("customerPhone", "errorPhone", "رقم الهاتف غير صحيح، تأكد من كتابته بشكل صحيح (مثال: 01012345678).");
        isValid = false;
    }

    if (state.orderType === "delivery") {
        const areaId = document.getElementById("customerArea").value;
        const address = document.getElementById("customerAddress").value.trim();

        if (!areaId) {
            setFieldError("customerArea", "errorArea", "من فضلك اختر منطقتك من القائمة.");
            isValid = false;
        } else {
            state.selectedAreaId = areaId;
        }
        if (!address) {
            setFieldError("customerAddress", "errorAddress", "من فضلك اكتب عنوانك بالتفصيل.");
            isValid = false;
        }
    }

    return isValid;
}

// Fill the "المنطقة" dropdown from restaurantConfig.deliveryAreas.
// Runs once at init — the area list is static config, not user data.
function renderDeliveryAreaOptions() {
    const select = document.getElementById("customerArea");
    const areas = restaurantConfig.deliveryAreas || [];

    const placeholder = `<option value="" disabled ${state.selectedAreaId ? "" : "selected"}>اختر منطقتك...</option>`;
    const options = areas.map((area) => `
        <option value="${area.id}" ${state.selectedAreaId === area.id ? "selected" : ""}>
            ${escapeHtml(area.name)} — رسوم توصيل ${formatPrice(area.fee)}
        </option>
    `).join("");

    select.innerHTML = placeholder + options;
}

function renderCheckoutSummary() {
    document.getElementById("checkoutSubtotal").textContent = formatPrice(getCartSubtotal());
    document.getElementById("checkoutTotal").textContent = formatPrice(getOrderTotal());

    const deliveryRow = document.getElementById("checkoutDeliveryRow");
    if (state.orderType === "delivery" && getSelectedArea()) {
        deliveryRow.hidden = false;
        document.getElementById("checkoutDelivery").textContent = formatPrice(getDeliveryFee());
    } else {
        deliveryRow.hidden = true;
    }
}

function setOrderType(type) {
    state.orderType = type;
    document.querySelectorAll(".toggle-option").forEach((btn) => {
        btn.classList.toggle("is-active", btn.dataset.orderType === type);
    });
    document.getElementById("deliveryFields").hidden = type !== "delivery";
    renderCheckoutSummary();
}

/* ---------------------------------------------------------------
   9. WHATSAPP ORDER MESSAGE
   --------------------------------------------------------------- */

function buildOrderMessage() {
    const name = document.getElementById("customerName").value.trim();
    const phone = document.getElementById("customerPhone").value.trim();
    const notes = document.getElementById("orderNotes").value.trim();
    const orderTypeLabel = state.orderType === "delivery" ? "توصيل" : "استلام من المطعم";

    const lines = [];
    lines.push(`طلب جديد 🍽️`);
    lines.push("");
    lines.push(`المطعم: ${restaurantConfig.name}`);
    lines.push("");
    lines.push(`اسم العميل:`);
    lines.push(name);
    lines.push("");
    lines.push(`رقم الهاتف:`);
    lines.push(phone);
    lines.push("");
    lines.push(`نوع الطلب:`);
    lines.push(orderTypeLabel);

    if (state.orderType === "delivery") {
        const area = getSelectedArea();
        const address = document.getElementById("customerAddress").value.trim();
        lines.push("");
        lines.push(`المنطقة:`);
        lines.push(area ? area.name : "");
        lines.push("");
        lines.push(`العنوان:`);
        lines.push(address);
    }

    lines.push("");
    lines.push(`--------------------`);
    lines.push("");
    lines.push(`الطلب:`);

    state.cart.forEach((item) => {
        lines.push("");
        lines.push(`${item.quantity} × ${item.name}`);
        item.extras.forEach((extra) => {
            const priceLabel = extra.price > 0 ? ` +${extra.price} ${restaurantConfig.currency}` : "";
            lines.push(`  - ${extra.name}${priceLabel}`);
        });
        lines.push(`${getLineTotal(item)} ${restaurantConfig.currency}`);
    });

    lines.push("");
    lines.push(`--------------------`);
    lines.push("");

    if (state.orderType === "delivery" && getSelectedArea()) {
        lines.push(`المجموع الفرعي: ${getCartSubtotal()} ${restaurantConfig.currency}`);
        lines.push(`رسوم التوصيل: ${getDeliveryFee()} ${restaurantConfig.currency}`);
    }

    lines.push(`الإجمالي:`);
    lines.push(`${getOrderTotal()} ${restaurantConfig.currency}`);

    if (notes) {
        lines.push("");
        lines.push(`ملاحظات: ${notes}`);
    }

    lines.push("");
    lines.push(`شكراً لطلبك ❤️`);

    return lines.join("\n");
}

function sendOrderViaWhatsapp() {
    if (!validateCheckoutForm()) return;

    const message = buildOrderMessage();
    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/${restaurantConfig.whatsappNumber}?text=${encoded}`;

    window.open(url, "_blank", "noopener,noreferrer");

    showToast("تم تجهيز طلبك، أكمل الإرسال عبر واتساب.", "success");

    // Clear the cart after handing off to WhatsApp so a returning
    // customer starts a fresh order next time.
    clearCart();
    resetCheckoutForm();
    closeAllSheets();
}

// Reset the checkout form fields, order type, and area selection
// back to defaults after an order has been sent.
function resetCheckoutForm() {
    document.getElementById("checkoutForm").reset();
    state.selectedAreaId = null;
    setOrderType("pickup");
    renderDeliveryAreaOptions();
}

/* ---------------------------------------------------------------
   10. TOASTS
   --------------------------------------------------------------- */

function showToast(message, type = "default") {
    const container = document.getElementById("toastContainer");
    const toast = document.createElement("div");
    toast.className = `toast ${type === "success" ? "toast-success" : ""} ${type === "error" ? "toast-error" : ""}`;
    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(() => toast.remove(), 3000);
}

/* ---------------------------------------------------------------
   11. SHEET OPEN / CLOSE HELPERS
   --------------------------------------------------------------- */

let lastFocusedElement = null;

function openSheet(sheetId, overlayId) {
    lastFocusedElement = document.activeElement;
    document.getElementById(sheetId).hidden = false;
    document.getElementById(overlayId).hidden = false;
    document.body.style.overflow = "hidden";
}

function closeSheet(sheetId, overlayId) {
    document.getElementById(sheetId).hidden = true;
    document.getElementById(overlayId).hidden = true;
    if (![...document.querySelectorAll(".bottom-sheet")].some((s) => !s.hidden)) {
        document.body.style.overflow = "";
    }
    if (lastFocusedElement) lastFocusedElement.focus();
}

function closeAllSheets() {
    ["productSheet", "cartSheet", "checkoutSheet", "infoSheet"].forEach((id) => {
        document.getElementById(id).hidden = true;
    });
    ["productOverlay", "cartOverlay", "checkoutOverlay", "infoOverlay"].forEach((id) => {
        document.getElementById(id).hidden = true;
    });
    document.body.style.overflow = "";
}

/* ---------------------------------------------------------------
   12. INIT / EVENT WIRING
   --------------------------------------------------------------- */

function applyRestaurantConfig() {
    document.getElementById("brandName").textContent = restaurantConfig.name;
    document.getElementById("brandSlogan").textContent = restaurantConfig.slogan;
    document.getElementById("infoName").textContent = restaurantConfig.name;
    document.getElementById("infoWhatsapp").textContent = `0${restaurantConfig.whatsappNumber.slice(2)}`;
    document.documentElement.style.setProperty("--primary", restaurantConfig.primaryColor);

    document.querySelectorAll('img.brand-logo, #productSheetImage').forEach((img) => {
        if (img.classList.contains("brand-logo")) img.src = restaurantConfig.logo;
    });
    document.title = `${restaurantConfig.name} | المينيو الإلكتروني`;
}

function wireHeaderEvents() {
    const searchInput = document.getElementById("searchInput");
    const searchClear = document.getElementById("searchClear");

    searchInput.addEventListener("input", () => {
        state.searchTerm = searchInput.value;
        searchClear.hidden = state.searchTerm.trim() === "";
        renderProducts();
    });

    searchClear.addEventListener("click", () => {
        searchInput.value = "";
        state.searchTerm = "";
        searchClear.hidden = true;
        renderProducts();
        searchInput.focus();
    });

    document.getElementById("infoBtn").addEventListener("click", () => {
        openSheet("infoSheet", "infoOverlay");
    });
}

function wireProductSheetEvents() {
    document.getElementById("sheetQtyMinus").addEventListener("click", () => changeSheetQuantity(-1));
    document.getElementById("sheetQtyPlus").addEventListener("click", () => changeSheetQuantity(1));

    document.getElementById("addToCartBtn").addEventListener("click", () => {
        const product = state.activeProduct;
        if (!product) return;
        addToCart(product, state.sheetQuantity, state.sheetSelectedExtras);
        showToast(`تمت إضافة ${product.name} للسلة`, "success");
        closeSheet("productSheet", "productOverlay");
    });

    document.getElementById("productSheetClose").addEventListener("click", () => closeSheet("productSheet", "productOverlay"));
    document.getElementById("productOverlay").addEventListener("click", () => closeSheet("productSheet", "productOverlay"));
}

function wireCartEvents() {
    document.getElementById("cartBar").addEventListener("click", () => {
        renderCartSheet();
        openSheet("cartSheet", "cartOverlay");
    });

    document.getElementById("cartSheetClose").addEventListener("click", () => closeSheet("cartSheet", "cartOverlay"));
    document.getElementById("cartOverlay").addEventListener("click", () => closeSheet("cartSheet", "cartOverlay"));

    document.getElementById("clearCartBtn").addEventListener("click", () => {
        clearCart();
        showToast("تم إفراغ السلة");
    });

    document.getElementById("goToCheckoutBtn").addEventListener("click", () => {
        if (state.cart.length === 0) {
            showToast("السلة فارغة، من فضلك أضف أصناف أولاً.", "error");
            return;
        }
        closeSheet("cartSheet", "cartOverlay");
        renderCheckoutSummary();
        openSheet("checkoutSheet", "checkoutOverlay");
    });
}

function wireCheckoutEvents() {
    document.querySelectorAll(".toggle-option").forEach((btn) => {
        btn.addEventListener("click", () => setOrderType(btn.dataset.orderType));
    });

    document.getElementById("checkoutSheetClose").addEventListener("click", () => closeSheet("checkoutSheet", "checkoutOverlay"));
    document.getElementById("checkoutOverlay").addEventListener("click", () => closeSheet("checkoutSheet", "checkoutOverlay"));

    document.getElementById("confirmOrderBtn").addEventListener("click", sendOrderViaWhatsapp);

    // Selecting a delivery area updates the fee shown immediately
    document.getElementById("customerArea").addEventListener("change", (e) => {
        state.selectedAreaId = e.target.value || null;
        clearFieldError("customerArea", "errorArea");
        renderCheckoutSummary();
    });

    // Clear individual field errors as the person starts fixing them
    ["customerName", "customerPhone", "customerAddress"].forEach((id) => {
        document.getElementById(id).addEventListener("input", () => {
            const errorId = `error${id.replace("customer", "")}`;
            if (document.getElementById(errorId)) {
                clearFieldError(id, errorId);
            }
        });
    });
}

function wireInfoSheetEvents() {
    document.getElementById("infoSheetClose").addEventListener("click", () => closeSheet("infoSheet", "infoOverlay"));
    document.getElementById("infoOverlay").addEventListener("click", () => closeSheet("infoSheet", "infoOverlay"));
}

function wireGlobalEvents() {
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeAllSheets();
    });
}

// Keep the category nav pinned right below the header, whatever the
// header's actual rendered height is (it varies with content/width).
function syncHeaderHeight() {
    const header = document.querySelector(".site-header");
    if (!header) return;
    document.documentElement.style.setProperty("--header-actual-h", `${header.offsetHeight}px`);
}

function init() {
    loadCart();
    applyRestaurantConfig();
    renderCategoryNav();
    renderProducts();
    updateCartBar();

    wireHeaderEvents();
    wireProductSheetEvents();
    wireCartEvents();
    wireCheckoutEvents();
    wireInfoSheetEvents();
    wireGlobalEvents();

    renderDeliveryAreaOptions();
    syncHeaderHeight();
    window.addEventListener("resize", syncHeaderHeight);
}

document.addEventListener("DOMContentLoaded", init);
