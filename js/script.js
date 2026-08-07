/**
 * CHICKIES Digital Menu - Main JavaScript
 * All functionality: dynamic content, cart system, filtering, search,
 * WhatsApp integration, animations, and localStorage persistence.
 */

(function() {
  'use strict';

  // ============================================================
  // DATA
  // ============================================================

  /**
   * Categories data - Easy to edit
   * Add/remove categories as needed
   */
  const categories = [
    { id: 'all', name: 'الكل' },
    { id: 'mksrat', name: 'المكسرات' },
    { id: 'tasaly', name: 'التسالي والبذور' },
    { id: 'sodany', name: 'السوداني والمقرمشات' },
    { id: 'yamesh', name: 'الفواكه المجففه والياميش' },
    { id: 'moled', name: 'حلوه المولد' },
    { id: 'tmr', name: 'التُمور والحلويات الشرقية المصاحبة ' },
    { id: 'coffe', name: ' القهوه والشؤاب الجاف' },
    { id: 'tashkelat', name: ' التشكيلات العائليه' }
  ];

  /**
   * Menu items data - Easy to edit
   * Add/remove items as needed
   * category must match one of the category IDs above
   */
  const menuItems = [
    {
      id: 1,
      name: ' فستق امريكي',
      description: 'الوصف',
      price: 920,
      category: 'mksrat',
      image: 'images/food/فستق امريكي.jpeg'
    },
    {
      id: 2,
      name: ' لب ابيض تركي',
      description: 'الوصف',
      price: 400,
      category: 'tasaly',
      image: 'images/food/لب ابيض تركي.jpeg'
    },
    {
      id: 3,
      name: ' سوداني مقشر اسواني',
      description: 'الوصف',
      price: 240,
      category: 'sodany',
      image: 'images/food/سوداني مقشر اسواني.png'
    },
    {
      id: 4,
      name: ' سناكس مقرمش او كونو بجميع النكهات',
      description: 'الوصف',
      price: 120,
      category: 'tmr',
      image: 'images/food/سناكس مقرمش.png'
    },
    {
      id: 5,
      name: ' مكاديما',
      description: 'الوصف',
      price: 1600,
      category: 'yamesh',
      image: 'images/food/مكاديما.png'
    },
    {
      id: 6,
      name: ' حلوي المولد',
      description: 'الوصف',
      price: 800,
      category: 'moled',
      image: 'images/food/حلوي المولد.jpeg'
    },


  ];

  // WhatsApp phone number - Change this to your number
  const WHATSAPP_NUMBER = '201114666495';

  // ============================================================
  // DOM ELEMENTS
  // ============================================================

  const els = {
    loadingScreen: document.getElementById('loading-screen'),
    header: document.getElementById('header'),
    categoriesGrid: document.getElementById('categories-grid'),
    filterPills: document.getElementById('filter-pills'),
    menuGrid: document.getElementById('menu-grid'),
    searchInput: document.getElementById('search-input'),
    noResults: document.getElementById('no-results'),
    cartToggle: document.getElementById('cart-toggle'),
    cartBadge: document.getElementById('cart-badge'),
    cartSidebar: document.getElementById('cart-sidebar'),
    cartBackdrop: document.getElementById('cart-backdrop'),
    cartClose: document.getElementById('cart-close'),
    cartBody: document.getElementById('cart-body'),
    cartFooter: document.getElementById('cart-footer'),
    cartTotal: document.getElementById('cart-total'),
    whatsappOrderBtn: document.getElementById('whatsapp-order-btn'),
    clearCartBtn: document.getElementById('clear-cart-btn'),
    floatingWhatsapp: document.getElementById('floating-whatsapp'),
    toast: document.getElementById('toast'),
    toastMessage: document.getElementById('toast-message')
  };

  // ============================================================
  // STATE
  // ============================================================

  let currentCategory = 'all';
  let searchQuery = '';
  let toastTimeout = null;

  // ============================================================
  // CART SYSTEM
  // ============================================================

  const cart = {
    items: [], // { id, quantity }

    /** Load cart from localStorage */
    load() {
      try {
        const saved = localStorage.getItem('chickies_cart');
        if (saved) {
          this.items = JSON.parse(saved);
        }
      } catch (e) {
        console.warn('Failed to load cart from localStorage:', e);
        this.items = [];
      }
    },

    /** Save cart to localStorage */
    save() {
      try {
        localStorage.setItem('chickies_cart', JSON.stringify(this.items));
      } catch (e) {
        console.warn('Failed to save cart to localStorage:', e);
      }
    },

    /** Add item to cart */
    add(itemId) {
      const existing = this.items.find(i => i.id === itemId);
      if (existing) {
        existing.quantity++;
      } else {
        this.items.push({ id: itemId, quantity: 1 });
      }
      this.save();
      this.updateUI();
    },

    /** Remove item from cart */
    remove(itemId) {
      this.items = this.items.filter(i => i.id !== itemId);
      this.save();
      this.updateUI();
    },

    /** Update item quantity by delta (+1 or -1) */
    updateQuantity(itemId, delta) {
      const item = this.items.find(i => i.id === itemId);
      if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
          this.remove(itemId);
        } else {
          this.save();
          this.updateUI();
        }
      }
    },

    /** Get total price */
    getTotal() {
      return this.items.reduce((sum, item) => {
        const menuItem = menuItems.find(m => m.id === item.id);
        return sum + (menuItem ? menuItem.price * item.quantity : 0);
      }, 0);
    },

    /** Get total item count */
    getCount() {
      return this.items.reduce((sum, item) => sum + item.quantity, 0);
    },

    /** Get cart item by ID */
    getItem(itemId) {
      return this.items.find(i => i.id === itemId);
    },

    /** Clear entire cart */
    clear() {
      this.items = [];
      this.save();
      this.updateUI();
    },

    /** Update all cart UI elements */
    updateUI() {
      const count = this.getCount();
      const total = this.getTotal();

      // Update badge
      if (count > 0) {
        els.cartBadge.textContent = count;
        els.cartBadge.classList.remove('hidden');
        els.cartBadge.classList.add('pulse');
        setTimeout(() => els.cartBadge.classList.remove('pulse'), 400);
      } else {
        els.cartBadge.classList.add('hidden');
      }

      // Update cart body
      this.renderCartItems();

      // Update total
      els.cartTotal.textContent = total + ' \u062c.\u0645';

      // Show/hide footer based on items
      if (this.items.length > 0) {
        els.cartFooter.classList.remove('hidden');
      } else {
        els.cartFooter.classList.add('hidden');
      }

      // Update WhatsApp links
      updateWhatsAppLinks("https://chat.whatsapp.com/6JQb7IVSVoA8r34RHxgIsf?mode=gi_t");
    },

    /** Render cart items in sidebar */
    renderCartItems() {
      if (this.items.length === 0) {
        els.cartBody.innerHTML = `
          <div class="cart-empty">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="9" cy="21" r="1"/>
              <circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            <p>السلة فارغة</p>
            <span>ابدأ بإضافة عناصر من القائمة</span>
            <button class="btn-browse" onclick="document.getElementById('menu').scrollIntoView({behavior: 'smooth'}); closeCart();">تصفح القائمة</button>
          </div>
        `;
        return;
      }

      els.cartBody.innerHTML = this.items.map(item => {
        const menuItem = menuItems.find(m => m.id === item.id);
        if (!menuItem) return '';
        return `
          <div class="cart-item" data-cart-id="${item.id}">
            <div class="cart-item-image">
              <img src="${menuItem.image}" alt="${menuItem.name}" loading="lazy">
            </div>
            <div class="cart-item-info">
              <div class="cart-item-name">${menuItem.name}</div>
              <div class="cart-item-price">${menuItem.price * item.quantity} \u062c.\u0645</div>
            </div>
            <div class="cart-item-actions">
              <div class="cart-item-qty">
                <button class="qty-btn" onclick="cart.updateQuantity(${item.id}, -1)" aria-label="تقليل">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                    <path d="M5 12h14"/>
                  </svg>
                </button>
                <span class="qty-value">${item.quantity}</span>
                <button class="qty-btn" onclick="cart.add(${item.id})" aria-label="زيادة">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                    <path d="M12 5v14M5 12h14"/>
                  </svg>
                </button>
              </div>
              <button class="cart-item-remove" onclick="cart.remove(${item.id})" aria-label="إزالة">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                </svg>
              </button>
            </div>
          </div>
        `;
      }).join('');
    }
  };

  // ============================================================
  // RENDERING FUNCTIONS
  // ============================================================

  /** Render category cards */
  function renderCategories() {
    // Skip 'all' category for cards
    const displayCategories = categories.filter(c => c.id !== 'all');
    
    els.categoriesGrid.innerHTML = displayCategories.map((cat, index) => `
      <div class="category-card stagger-children" 
           data-animate 
           data-category="${cat.id}" 
           onclick="filterByCategory('${cat.id}')"
           style="transition-delay: ${index * 0.08}s">
        <img src="images/categories/${cat.id}.jpg" alt="${cat.name}" loading="lazy">
        <div class="category-card-overlay">
          <span class="category-card-name">${cat.name}</span>
        </div>
      </div>
    `).join('');
  }

  /** Render filter pills */
  function renderFilterPills() {
    els.filterPills.innerHTML = categories.map((cat, index) => `
      <button class="filter-pill stagger-children ${cat.id === currentCategory ? 'active' : ''}" 
              data-pill="${cat.id}" 
              onclick="filterByCategory('${cat.id}')"
              style="transition-delay: ${index * 0.05}s">
        ${cat.name}
      </button>
    `).join('');
  }

  /** Render menu items based on current filter */
  function renderMenuItems() {
    let filtered = menuItems;

    // Filter by category
    if (currentCategory !== 'all') {
      filtered = filtered.filter(item => item.category === currentCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(q) || 
        item.description.toLowerCase().includes(q)
      );
    }

    // Show/hide no results message
    if (filtered.length === 0) {
      els.menuGrid.classList.add('hidden');
      els.noResults.classList.remove('hidden');
    } else {
      els.menuGrid.classList.remove('hidden');
      els.noResults.classList.add('hidden');

      els.menuGrid.innerHTML = filtered.map((item, index) => `
        <div class="menu-card stagger-children" data-animate style="transition-delay: ${(index % 6) * 0.08}s">
          <div class="menu-card-image">
            <img src="${item.image}" alt="${item.name}" loading="lazy">
          </div>
          <div class="menu-card-content">
            <h3 class="menu-card-name">${item.name}</h3>
            <p class="menu-card-desc">${item.description}</p>
            <div class="menu-card-footer">
              <span class="menu-card-price">
                <span class="currency">\u062c.\u0645</span>${item.price}
              </span>
              <button class="menu-card-add" onclick="cart.add(${item.id})" aria-label="إضافة ${item.name} إلى السلة">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
                  <path d="M12 5v14M5 12h14"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      `).join('');
    }

    // Re-initialize scroll animations for new elements
    setTimeout(initScrollAnimations, 50);
  }

  // ============================================================
  // FILTERING & SEARCH
  // ============================================================

  /** Filter by category */
  function filterByCategory(categoryId) {
    currentCategory = categoryId;
    renderFilterPills();
    renderMenuItems();
    showToast(`تم التصفيح: ${categories.find(c => c.id === categoryId)?.name || ''}`);
  }
  // Expose to global scope for onclick handlers
  window.filterByCategory = filterByCategory;

  /** Search handler with debounce */
  let searchDebounce;
  function handleSearch(e) {
    clearTimeout(searchDebounce);
    searchDebounce = setTimeout(() => {
      searchQuery = e.target.value;
      renderMenuItems();
    }, 300);
  }

  // ============================================================
  // CART UI
  // ============================================================

  /** Open cart sidebar */
  function openCart() {
    els.cartSidebar.classList.add('open');
    els.cartBackdrop.classList.add('active');
    els.cartToggle.setAttribute('aria-expanded', 'true');
    els.cartSidebar.setAttribute('aria-hidden', 'false');
    document.body.classList.add('cart-open');
  }

  /** Close cart sidebar */
  function closeCart() {
    els.cartSidebar.classList.remove('open');
    els.cartBackdrop.classList.remove('active');
    els.cartToggle.setAttribute('aria-expanded', 'false');
    els.cartSidebar.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('cart-open');
  }
  // Expose to global scope
  window.closeCart = closeCart;

  // ============================================================
  // WHATSAPP INTEGRATION
  // ============================================================

  /** Generate WhatsApp order message */
  function generateWhatsAppMessage() {
    if (cart.items.length === 0) {
      return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('*طلب جديد من CHICKIES*\n\nأريد الطلب من القائمة')}`;
    }

    let message = '*طلب جديد من CHICKIES*\n';
    message += '════════════════\n\n';
    message += '*تفاصيل الطلب:*\n\n';

    cart.items.forEach(item => {
      const menuItem = menuItems.find(m => m.id === item.id);
      if (menuItem) {
        message += `• *${menuItem.name}*\n`;
        message += `  الكمية: ${item.quantity}\n`;
        message += `  السعر: ${menuItem.price * item.quantity} \u062c.م\n\n`;
      }
    });

    message += '════════════════\n';
    message += `*المجموع: ${cart.getTotal()} \u062c.م*`;

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }

  /** Update all WhatsApp button links */
  function updateWhatsAppLinks() {
    const url = generateWhatsAppMessage();
    els.whatsappOrderBtn.href = url;
    els.floatingWhatsapp.href = url;
  }

  // ============================================================
  // TOAST NOTIFICATIONS
  // ============================================================

  /** Show toast message */
  function showToast(message) {
    els.toastMessage.textContent = message;
    els.toast.classList.add('show');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      els.toast.classList.remove('show');
    }, 2500);
  }

  // ============================================================
  // SCROLL ANIMATIONS
  // ============================================================

  /** Initialize IntersectionObserver for scroll animations */
  function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    document.querySelectorAll('[data-animate]:not(.is-visible)').forEach(el => {
      observer.observe(el);
    });
  }

  // ============================================================
  // HEADER SCROLL EFFECT
  // ============================================================

  /** Handle header background on scroll */
  function handleHeaderScroll() {
    if (window.scrollY > 100) {
      els.header.classList.add('scrolled');
    } else {
      els.header.classList.remove('scrolled');
    }
  }

  // ============================================================
  // LOADING SCREEN
  // ============================================================

  /** Hide loading screen */
  function hideLoadingScreen() {
    setTimeout(() => {
      els.loadingScreen.classList.add('fade-out');
      setTimeout(() => {
        els.loadingScreen.style.display = 'none';
      }, 500);
    }, 1500); // Minimum display time
  }

  // ============================================================
  // EVENT LISTENERS
  // ============================================================

  function bindEvents() {
    // Cart toggle
    els.cartToggle.addEventListener('click', openCart);

    // Cart close
    els.cartClose.addEventListener('click', closeCart);

    // Backdrop click to close
    els.cartBackdrop.addEventListener('click', closeCart);

    // Clear cart
    els.clearCartBtn.addEventListener('click', () => {
      if (confirm('هل أنت متأكد من إفراغ السلة؟')) {
        cart.clear();
        showToast('تم إفراغ السلة');
      }
    });

    // Search input
    els.searchInput.addEventListener('input', handleSearch);

    // Header scroll
    window.addEventListener('scroll', handleHeaderScroll, { passive: true });

    // Keyboard: Escape to close cart
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeCart();
      }
    });

    // Expose cart to global scope for onclick handlers
    window.cart = cart;
  }

  // ============================================================
  // INITIALIZATION
  // ============================================================

  function init() {
    // Load cart from localStorage
    cart.load();

    // Render all content
    renderCategories();
    renderFilterPills();
    renderMenuItems();

    // Update cart UI
    cart.updateUI();

    // Initialize scroll animations
    initScrollAnimations();

    // Bind all events
    bindEvents();

    // Handle loading screen
    if (document.readyState === 'complete') {
      hideLoadingScreen();
    } else {
      window.addEventListener('load', hideLoadingScreen);
    }

    // Trigger hero animations
    setTimeout(() => {
      document.querySelectorAll('.hero [data-animate], .hero-logo').forEach(el => {
        el.classList.add('is-visible');
      });
    }, 100);
  }

  // Start the app
  init();

})();
