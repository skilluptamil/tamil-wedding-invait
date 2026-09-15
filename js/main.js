/**
 * AURA & VELLUM ATELIER — MAIN CLIENT SCRIPT
 * Manages Theme Switching, RTL Direction, Navigation, Modals, Accordions, and Global UI
 */

(function () {
  'use strict';

  // --- Theme Management (Dark / Light Mode) ---
  const THEME_KEY = 'aura_theme';
  const DIR_KEY = 'aura_direction';

  function initTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const activeTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

    document.documentElement.setAttribute('data-theme', activeTheme);
    updateThemeToggleIcons(activeTheme);
  }

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem(THEME_KEY, nextTheme);
    updateThemeToggleIcons(nextTheme);
  }

  function updateThemeToggleIcons(theme) {
    const themeBtns = document.querySelectorAll('.theme-toggle-btn');
    themeBtns.forEach(btn => {
      const sunIcon = btn.querySelector('.icon-sun');
      const moonIcon = btn.querySelector('.icon-moon');
      if (sunIcon && moonIcon) {
        if (theme === 'dark') {
          sunIcon.style.display = 'block';
          moonIcon.style.display = 'none';
        } else {
          sunIcon.style.display = 'none';
          moonIcon.style.display = 'block';
        }
      }
    });
  }

  // --- Language Direction (LTR / RTL) ---
  function initDirection() {
    const savedDir = localStorage.getItem(DIR_KEY) || 'ltr';
    document.documentElement.setAttribute('dir', savedDir);
    updateDirToggleText(savedDir);
  }

  function toggleDirection() {
    const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
    const nextDir = currentDir === 'rtl' ? 'ltr' : 'rtl';

    document.documentElement.setAttribute('dir', nextDir);
    localStorage.setItem(DIR_KEY, nextDir);
    updateDirToggleText(nextDir);
  }

  function updateDirToggleText(dir) {
    const dirBtns = document.querySelectorAll('.lang-toggle-btn');
    dirBtns.forEach(btn => {
      const label = btn.querySelector('.dir-label');
      if (label) {
        label.textContent = dir === 'rtl' ? 'LTR' : 'RTL';
      }
    });
  }

  // --- Sticky Navigation & Scroll Effects ---
  function initNavigation() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      }, { passive: true });
    }

    // Mobile Hamburger & Drawer
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const mobileDrawer = document.querySelector('.mobile-nav-drawer');

    if (hamburgerBtn && mobileDrawer) {
      hamburgerBtn.addEventListener('click', () => {
        const isOpen = mobileDrawer.classList.toggle('open');
        hamburgerBtn.classList.toggle('open');
        hamburgerBtn.setAttribute('aria-expanded', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
      });

      // Close drawer on link click
      const mobileLinks = mobileDrawer.querySelectorAll('a');
      mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
          mobileDrawer.classList.remove('open');
          hamburgerBtn.classList.remove('open');
          document.body.style.overflow = '';
        });
      });
    }

    // Dropdown Accessibility on Desktop
    const dropdownItems = document.querySelectorAll('.nav-item.has-dropdown');
    dropdownItems.forEach(item => {
      const link = item.querySelector('.nav-link');
      const menu = item.querySelector('.nav-dropdown');
      if (link && menu) {
        link.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            menu.classList.toggle('show');
          }
        });
      }
    });
  }

  // --- Global Toast Notification Utility ---
  function showToast(message, type = 'info') {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M12 16v-4"></path>
        <path d="M12 8h.01"></path>
      </svg>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }
  window.showToast = showToast;

  // --- Accordions (FAQs & Details) ---
  function initAccordions() {
    const headers = document.querySelectorAll('.accordion-header');
    headers.forEach(header => {
      header.addEventListener('click', () => {
        const item = header.closest('.accordion-item');
        const content = item.querySelector('.accordion-content');
        const isActive = item.classList.contains('active');

        // Optional: close other accordions in same container
        const parentGroup = item.closest('.accordion-group');
        if (parentGroup) {
          parentGroup.querySelectorAll('.accordion-item').forEach(other => {
            if (other !== item) {
              other.classList.remove('active');
              const otherContent = other.querySelector('.accordion-content');
              if (otherContent) otherContent.style.maxHeight = null;
            }
          });
        }

        if (isActive) {
          item.classList.remove('active');
          content.style.maxHeight = null;
        } else {
          item.classList.add('active');
          content.style.maxHeight = content.scrollHeight + 'px';
        }
      });
    });
  }

  // --- Atelier Information Sheet (Privacy, Terms, Launches, Showroom) ---
  const ATELIER_SHEET_HTML = `
  <div class="modal-overlay" id="atelier-info-sheet" role="dialog" aria-modal="true" aria-labelledby="sheet-title">
    <div class="modal-container sheet-modal-container">
      <button type="button" class="modal-close-btn" aria-label="Close information sheet" onclick="window.closeModal('atelier-info-sheet')">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>

      <!-- Header -->
      <div class="sheet-header">
        <div class="sheet-header-title-wrap">
          <div class="sheet-header-crest">AV</div>
          <div>
            <h3 id="sheet-title" style="font-size: 1.45rem; margin-bottom: 0.15rem; color: var(--text-primary);">Atelier Information &amp; Client Policies</h3>
            <p style="font-size: 0.84rem; color: var(--text-secondary); margin: 0;">Aura &amp; Vellum Haute Couture Stationery Atelier</p>
          </div>
        </div>
      </div>

      <!-- Segmented Tab Switcher -->
      <div class="sheet-nav-tabs" role="tablist">
        <button type="button" class="sheet-tab-btn active" role="tab" id="tab-btn-privacy" onclick="window.switchSheetTab('privacy')">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          <span>Privacy Policy</span>
        </button>
        <button type="button" class="sheet-tab-btn" role="tab" id="tab-btn-terms" onclick="window.switchSheetTab('terms')">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
          <span>Terms of Commission</span>
        </button>
        <button type="button" class="sheet-tab-btn" role="tab" id="tab-btn-launches" onclick="window.switchSheetTab('launches')">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          <span>Seasonal Launch</span>
        </button>
        <button type="button" class="sheet-tab-btn" role="tab" id="tab-btn-showroom" onclick="window.switchSheetTab('showroom')">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          <span>Showroom Hours</span>
        </button>
      </div>

      <!-- Tab Content Scrollable Container -->
      <div class="sheet-body-content">
        <!-- 1. Privacy Policy Tab -->
        <div class="sheet-tab-pane active" id="pane-privacy" role="tabpanel">
          <div class="sheet-highlight-box">
            <div style="font-weight: 700; color: var(--gold-primary); font-size: 0.88rem; margin-bottom: 0.35rem; display: flex; align-items: center; gap: 0.4rem;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              Strict Bridal &amp; High-Profile Client NDA Standard
            </div>
            <p style="font-size: 0.86rem; color: var(--text-secondary); margin: 0;">
              Aura &amp; Vellum Atelier adheres to strict non-disclosure and confidentiality protocols. Your wedding date, private venues, guest rosters, and custom family monograms will never be shared, sold, or publicly displayed without your prior written authorization.
            </p>
          </div>

          <div class="sheet-section-block">
            <h4>1. Information We Collect</h4>
            <p>We collect only information essential to designing and manufacturing your bespoke stationery:</p>
            <ul>
              <li><strong>Couple Details:</strong> Full names, wedding dates, ceremony venue addresses, and typography preferences.</li>
              <li><strong>Guest Addressing Data:</strong> Recipient mailing addresses and formal honorifics for handwritten or letterpress envelope calligraphy.</li>
              <li><strong>Client Portal Credentials:</strong> Encrypted authentication to access your live 3D proofs and production schedules.</li>
            </ul>
          </div>

          <div class="sheet-section-block">
            <h4>2. Post-Event Data Purge</h4>
            <p>
              Following the dispatch and confirmed delivery of your stationery suite, all digital guest spreadsheets and sensitive delivery addresses are permanently purged from our active systems after 60 days, retaining only archival production proofs for your heirloom reorders.
            </p>
          </div>

          <div class="sheet-section-block">
            <h4>3. Zero Third-Party Advertising</h4>
            <p>
              We do not engage in third-party ad tracking, pixel data brokerage, or behavioral retargeting. Your contact info is strictly used for order updates and concierge communication.
            </p>
          </div>
        </div>

        <!-- 2. Terms of Commission Tab -->
        <div class="sheet-tab-pane" id="pane-terms" role="tabpanel">
          <div class="sheet-highlight-box">
            <div style="font-weight: 700; color: var(--gold-primary); font-size: 0.88rem; margin-bottom: 0.35rem; display: flex; align-items: center; gap: 0.4rem;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              Bespoke Commission &amp; Artisan Print Agreement
            </div>
            <p style="font-size: 0.86rem; color: var(--text-secondary); margin: 0;">
              Each order at Aura &amp; Vellum is handcrafted by master pressmen on vintage Heidelberg letterpress equipment. The following terms govern custom design commissions and print manufacturing.
            </p>
          </div>

          <div class="sheet-section-block">
            <h4>1. Proof Approval &amp; Print Authorization</h4>
            <p>
              Artisan printing begins only after you provide final written sign-off on your digital proof in the Client Portal. Once copper engraving plates are milled and cotton stocks trimmed, alterations cannot be made without plate re-casting fees.
            </p>
          </div>

          <div class="sheet-section-block">
            <h4>2. Handcrafted Variations</h4>
            <p>
              Handmade cotton rag papers, feathery water-torn deckle edges, hand-mixed Pantone ink pigments, and hand-poured wax seals possess natural organic variations. These subtle nuances are celebrated hallmarks of authentic couture paperie.
            </p>
          </div>

          <div class="sheet-section-block">
            <h4>3. Production Schedules &amp; Retainer</h4>
            <ul>
              <li><strong>Standard Bespoke Timeline:</strong> 6 to 10 weeks from final proof authorization.</li>
              <li><strong>Expedited Atelier Rush:</strong> 3 to 4 weeks with dedicated press allocation (rush surcharge applies).</li>
              <li><strong>Retainer:</strong> A 50% non-refundable design retainer reserves your press slot, with the balance due prior to white-glove courier dispatch.</li>
            </ul>
          </div>
        </div>

        <!-- 3. Seasonal Launch Tab -->
        <div class="sheet-tab-pane" id="pane-launches" role="tabpanel">
          <div class="sheet-highlight-box">
            <div style="font-weight: 700; color: var(--gold-primary); font-size: 0.88rem; margin-bottom: 0.35rem; display: flex; align-items: center; gap: 0.4rem;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/></svg>
              2026 – 2027 Haute Couture Collection Calendar
            </div>
            <p style="font-size: 0.86rem; color: var(--text-secondary); margin: 0;">
              Explore our upcoming atelier releases, trunk shows, and exclusive limited-edition paper stocks sourced from European heritage mills in Amalfi and Fabriano.
            </p>
          </div>

          <div class="sheet-section-block">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.35rem; flex-wrap: wrap; gap: 0.5rem;">
              <h4 style="margin: 0;">🌸 Spring / Summer 2027 — Gilded Tuscan Botanicals</h4>
              <span style="font-size: 0.74rem; font-weight: 700; background: var(--gold-light); color: var(--gold-primary); padding: 0.2rem 0.6rem; border-radius: var(--radius-full); border: 1px solid var(--border-color);">CURRENTLY DEBUTING</span>
            </div>
            <p>
              Inspired by Italian villa gardens, featuring olive branch watermarks, translucent frosted vellum wraps, pressed olive foliage, and pale champagne gold hot foil on 600gsm Amalfi cotton.
            </p>
          </div>

          <div class="sheet-section-block">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.35rem; flex-wrap: wrap; gap: 0.5rem;">
              <h4 style="margin: 0;">🍂 Autumn / Winter 2027 — Velvet Noir &amp; Antique Letterpress</h4>
              <span style="font-size: 0.74rem; font-weight: 700; background: var(--bg-secondary); color: var(--text-muted); padding: 0.2rem 0.6rem; border-radius: var(--radius-full); border: 1px solid var(--border-light);">OCTOBER 2026 PREVIEW</span>
            </div>
            <p>
              Architectural minimalism meeting dramatic luxury: deep blind debossing, midnight obsidian handmade stock, copper edge gilding, and custom calligraphy monograms.
            </p>
          </div>

          <div class="sheet-section-block" style="text-align: center; padding: 1.5rem;">
            <h4 style="justify-content: center; margin-bottom: 0.5rem;">Receive Exclusive Private Launch Invites</h4>
            <p style="margin-bottom: 1rem;">Join the Atelier Circle to access 48-hour early reservations on limited run cotton mills.</p>
            <a href="products.html" class="btn btn-primary btn-sm" onclick="window.closeModal('atelier-info-sheet')">Explore Current 24 Suites &rarr;</a>
          </div>
        </div>

        <!-- 4. Showroom Hours Tab -->
        <div class="sheet-tab-pane" id="pane-showroom" role="tabpanel">
          <div class="sheet-highlight-box">
            <div style="font-weight: 700; color: var(--gold-primary); font-size: 0.88rem; margin-bottom: 0.35rem; display: flex; align-items: center; gap: 0.4rem;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              Private Salon &amp; Artisan Pressroom Appointments
            </div>
            <p style="font-size: 0.86rem; color: var(--text-secondary); margin: 0;">
              To ensure undivided personal attention, private consultations at our Manhattan Flagship and European appointment desks are hosted on a reserved basis.
            </p>
          </div>

          <div class="sheet-section-block">
            <h4>📍 Manhattan Flagship Atelier</h4>
            <p style="margin-bottom: 0.6rem;"><strong>Address:</strong> 482 Broome Street, 4th Floor Atelier, SoHo, New York, NY 10013</p>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; font-size: 0.88rem; color: var(--text-secondary);">
              <div><strong>Tuesday – Friday:</strong> 10:00 AM – 7:00 PM EST</div>
              <div><strong>Saturday:</strong> 11:00 AM – 6:00 PM EST</div>
              <div><strong>Sunday – Monday:</strong> Reserved for Presswork</div>
              <div><strong>Private Evening VIP:</strong> By Special Request</div>
            </div>
          </div>

          <div class="sheet-section-block">
            <h4>🌐 Worldwide Virtual Showroom (24/7 Booking)</h4>
            <p>
              For international couples and destination weddings, we host high-definition video consultations with physical sample swatch boxes dispatched prior to your session.
            </p>
            <div style="margin-top: 0.5rem;">
              <strong>Concierge Desk:</strong> concierge@auravellum.com &bull; +1 (212) 555-0198
            </div>
          </div>

          <div class="sheet-section-block" style="text-align: center; padding: 1.5rem;">
            <h4 style="justify-content: center; margin-bottom: 0.5rem;">Reserve Your Private Appointment</h4>
            <p style="margin-bottom: 1rem;">Experience paper weights, tactile foils, and wax colors in person.</p>
            <a href="contact.html" class="btn btn-primary btn-sm" onclick="window.closeModal('atelier-info-sheet')">Book Atelier Showroom Visit &rarr;</a>
          </div>
        </div>
      </div>

      <!-- Footer Actions -->
      <div class="sheet-footer-actions">
        <div style="font-size: 0.82rem; color: var(--text-muted);">
          Aura &amp; Vellum Atelier &bull; Bespoke Wedding Paperie
        </div>
        <button type="button" class="btn btn-secondary btn-sm" onclick="window.closeModal('atelier-info-sheet')">
          Close Sheet
        </button>
      </div>
    </div>
  </div>
  `;

  function ensureAtelierSheet() {
    let sheet = document.getElementById('atelier-info-sheet');
    if (!sheet) {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = ATELIER_SHEET_HTML.trim();
      sheet = wrapper.firstElementChild;
      document.body.appendChild(sheet);
      
      // Wire up newly injected modal close listeners
      sheet.addEventListener('click', (e) => {
        if (e.target === sheet) closeModal('atelier-info-sheet');
      });
      const closeBtn = sheet.querySelector('.modal-close-btn');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => closeModal('atelier-info-sheet'));
      }
    }
    return sheet;
  }

  function switchSheetTab(tabKey) {
    ensureAtelierSheet();
    const validTabs = ['privacy', 'terms', 'launches', 'showroom'];
    const activeKey = validTabs.includes(tabKey) ? tabKey : 'privacy';

    // Update buttons
    validTabs.forEach(key => {
      const btn = document.getElementById(`tab-btn-${key}`);
      const pane = document.getElementById(`pane-${key}`);
      if (btn) {
        if (key === activeKey) {
          btn.classList.add('active');
          btn.setAttribute('aria-selected', 'true');
        } else {
          btn.classList.remove('active');
          btn.setAttribute('aria-selected', 'false');
        }
      }
      if (pane) {
        if (key === activeKey) {
          pane.classList.add('active');
        } else {
          pane.classList.remove('active');
        }
      }
    });

    // Scroll sheet body to top
    const bodyContent = document.querySelector('.sheet-body-content');
    if (bodyContent) bodyContent.scrollTop = 0;
  }
  window.switchSheetTab = switchSheetTab;

  // --- Sample Kit Modal Definition & Management ---
  const SAMPLE_KIT_MODAL_HTML = `
  <div class="modal-overlay" id="sample-kit-modal" role="dialog" aria-modal="true" aria-labelledby="sample-modal-title">
    <div class="modal-container" style="max-width: 540px;">
      <button type="button" class="modal-close-btn" aria-label="Close sample kit modal" onclick="window.closeModal('sample-kit-modal')">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>

      <div style="text-align: center; margin-bottom: 1.5rem;">
        <div class="section-eyebrow no-decor">Tactile Swatch Box</div>
        <h3 id="sample-modal-title" style="font-size: 1.7rem; margin-bottom: 0.35rem; color: var(--text-primary);">Order Curated Sample Kit ($35)</h3>
        <p style="font-size: 0.88rem; color: var(--text-secondary); margin: 0;">Includes 8 finished invitation suites, paper swatch ring, foil cards, wax seals, and a $35 gift voucher.</p>
      </div>

      <form id="sample-kit-order-form" onsubmit="handleSampleKitSubmit(event)">
        <div class="form-group" style="margin-bottom: 1rem;">
          <label class="form-label" for="sample-full-name" style="font-size: 0.82rem;">Full Name *</label>
          <input type="text" id="sample-full-name" required class="form-control" placeholder="e.g. Madeleine &amp; Alexander" style="padding: 0.65rem 0.95rem;">
        </div>

        <div class="form-row" style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin-bottom: 1rem;">
          <div class="form-group" style="margin-bottom: 0;">
            <label class="form-label" for="sample-email" style="font-size: 0.82rem;">Email Address *</label>
            <input type="email" id="sample-email" required class="form-control" placeholder="name@domain.com" style="padding: 0.65rem 0.95rem;">
          </div>
          <div class="form-group" style="margin-bottom: 0;">
            <label class="form-label" for="sample-phone" style="font-size: 0.82rem;">Phone / WhatsApp *</label>
            <input type="tel" id="sample-phone" required class="form-control" placeholder="+1 (555) 000-0000" style="padding: 0.65rem 0.95rem;">
          </div>
        </div>

        <div class="form-group" style="margin-bottom: 1rem;">
          <label class="form-label" for="sample-address" style="font-size: 0.82rem;">Delivery Shipping Address *</label>
          <input type="text" id="sample-address" required class="form-control" placeholder="Street Address, City, State/Province, Postal Code, Country" style="padding: 0.65rem 0.95rem;">
        </div>

        <div class="form-group" style="margin-bottom: 1.25rem;">
          <label class="form-label" for="sample-primary-style" style="font-size: 0.82rem;">Primary Style Interest</label>
          <select id="sample-primary-style" class="form-control" style="padding: 0.65rem 0.95rem;">
            <option value="classic">Classic French Letterpress &amp; Cotton</option>
            <option value="foil" selected>Hot Foil Stamping &amp; Vellum Garden</option>
            <option value="deckle">Handmade Amalfi Deckle Edge with Botanicals</option>
            <option value="minimalist">Modern Architectural Minimalist Noir</option>
          </select>
        </div>

        <div style="background: var(--bg-secondary); border-radius: var(--radius-sm); padding: 0.85rem 1rem; border: 1px solid var(--border-light); margin-bottom: 1.25rem; display: flex; justify-content: space-between; align-items: center;">
          <div>
            <strong style="font-size: 0.88rem; color: var(--text-primary); display: block;">Curated Sample Kit + Priority Delivery</strong>
            <span style="font-size: 0.78rem; color: var(--gold-primary);">Includes $35 Wedding Invitation Credit Voucher</span>
          </div>
          <div style="font-size: 1.15rem; font-weight: 700; color: var(--gold-primary);">$35.00</div>
        </div>

        <button type="submit" class="btn btn-primary" style="width: 100%; padding: 0.8rem; font-size: 0.92rem;">
          Dispatch Sample Kit to Address &rarr;
        </button>
      </form>
    </div>
  </div>
  `;

  function ensureSampleKitModal() {
    let modal = document.getElementById('sample-kit-modal');
    if (!modal) {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = SAMPLE_KIT_MODAL_HTML.trim();
      modal = wrapper.firstElementChild;
      document.body.appendChild(modal);

      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal('sample-kit-modal');
      });
      const closeBtn = modal.querySelector('.modal-close-btn');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => closeModal('sample-kit-modal'));
      }
    }
    return modal;
  }

  function openSampleKitModal() {
    ensureSampleKitModal();
    openModal('sample-kit-modal');
  }
  window.openSampleKitModal = openSampleKitModal;

  window.handleSampleKitSubmit = function(e) {
    e.preventDefault();
    const orderNum = 'AV-SMPL-' + Math.floor(100000 + Math.random() * 900000);
    closeModal('sample-kit-modal');
    showToast(`Order Confirmed! Your Sample Kit (#${orderNum}) will be dispatched within 24 hours.`, 'success');
  };

  function openAtelierSheet(tabKey = 'privacy') {
    ensureAtelierSheet();
    switchSheetTab(tabKey);
    openModal('atelier-info-sheet');
  }
  window.openAtelierSheet = openAtelierSheet;

  // ==========================================
  // BRIDAL TOOLKIT RESOURCE 1: WORDING MATRIX MODAL
  // ==========================================
  const WORDING_DATA = {
    traditional: {
      title: "Bride's Parents Hosting (Traditional Formal)",
      text: `Mr. and Mrs. Charles Montgomery Vance\nrequest the honour of your presence\nat the marriage of their daughter\nElena Sophia\nto\nMr. Alistair Harrison Sterling\nSaturday, the nineteenth of September\ntwo thousand and twenty-six\nat four o'clock in the afternoon\nSt. Thomas Cathedral\nFifth Avenue, New York`,
      note: `<strong>Etiquette Rule:</strong> "Honour of your presence" (with British 'u') is strictly reserved for religious ceremonies in houses of worship. For venues/gardens, use "pleasure of your company".`
    },
    joint: {
      title: "Both Families Joint Hosting",
      text: `Together with their parents\nElena Sophia Vance\nand\nAlistair Harrison Sterling\nrequest the pleasure of your company\nat the celebration of their marriage\nSaturday, the nineteenth of September\ntwo thousand and twenty-six\nat five o'clock in the evening\nVilla Balbiano\nLake Como, Italy\nReception to follow`,
      note: `<strong>Etiquette Rule:</strong> Ideal when both sets of parents and/or the couple are contributing equally to the celebration.`
    },
    blended: {
      title: "Divorced / Blended Families Hosting",
      text: `Mrs. Jacqueline Montgomery Vance\nand Mr. Charles Montgomery Vance\nalong with Mr. and Mrs. Robert Sterling\nrequest the honour of your presence\nat the marriage of their children\nElena Sophia Vance\nto\nAlistair Harrison Sterling\nSaturday, the nineteenth of September\ntwo thousand and twenty-six\nat four o'clock in the afternoon\nNew York, New York`,
      note: `<strong>Etiquette Rule:</strong> Mother's name appears first on her own line without "and" between her and the father if divorced.`
    },
    couple: {
      title: "Couple Hosting Themselves (Modern Formal)",
      text: `The pleasure of your company is requested\nat the marriage of\nElena Sophia Vance\nand\nAlistair Harrison Sterling\nSaturday, September 19, 2026\nat half past five in the afternoon\nThe Glass Pavilion\nSoHo, New York\nDinner & Dancing to follow`,
      note: `<strong>Etiquette Rule:</strong> Perfect for independent couples hosting their own wedding celebration.`
    },
    enclosures: {
      title: "Reception & RSVP Enclosure Wording",
      text: `RECEPTION CARD:\nReception immediately following the ceremony\nThe Grand Ballroom, The Plaza Hotel\nBlack Tie Requested\n\nRSVP REPLY CARD:\nPlease respond by the fifteenth of August\nM__________________________________\n[ ] Accepts with pleasure\n[ ] Declines with regret\nPlease indicate dietary preferences: [ ] Beef [ ] Sea Bass [ ] Vegetarian`,
      note: `<strong>Etiquette Rule:</strong> Specify exact RSVP return date 4 to 5 weeks prior to the wedding date to confirm catering headcounts.`
    },
    honorifics: {
      title: "Envelope Honorific Addressing Protocol",
      text: `MARRIED COUPLE (SAME SURNAME):\nDr. and Mrs. Marcus Vance  OR  Mr. and Mrs. Marcus Vance\n\nMARRIED COUPLE (DIFFERENT SURNAMES):\nDr. Elena Vance and Mr. Alistair Sterling\n\nSAME-SEX COUPLE:\nMs. Camilla Rhodes and Ms. Sophia Al-Mansoor\n\nUNMARRIED COUPLE LIVING TOGETHER:\nMr. Julian Thorne\nMs. Clara Kensington\n(Each on separate line)\n\nSINGLE GUEST WITH PLUS ONE:\nInner Envelope: Mr. Julian Thorne and Guest`,
      note: `<strong>Etiquette Rule:</strong> Never abbreviate street names, cities, or state names on formal outer calligraphy envelopes.`
    }
  };

  let activeWordingCategory = 'traditional';

  function ensureWordingMatrixModal() {
    let modal = document.getElementById('wording-matrix-modal');
    if (!modal) {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = `
      <div class="modal-overlay" id="wording-matrix-modal">
        <div class="modal-card" style="max-width: 740px; width: 94%; max-height: 90vh; overflow-y: auto; padding: 2.25rem 2rem;">
          <button type="button" class="modal-close-btn" aria-label="Close modal">&times;</button>
          <div style="margin-bottom: 1.5rem;">
            <span class="badge-tag" style="background: var(--gold-light); margin-bottom: 0.5rem; display: inline-block;">18-Page Haute Etiquette Guide</span>
            <h3 style="font-size: 1.75rem; margin-bottom: 0.35rem; color: var(--text-primary);">Wedding Wording Protocol Matrix</h3>
            <p style="font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 0;">
              Curated phrasing formulas for traditional, blended, and modern ceremonies with official etiquette standards.
            </p>
          </div>

          <div style="display: flex; gap: 0.5rem; overflow-x: auto; padding-bottom: 0.5rem; margin-bottom: 1.25rem;" id="wording-tabs-bar">
            <button type="button" class="wording-tab-btn active" onclick="window.switchWordingTab('traditional')">Bride's Parents</button>
            <button type="button" class="wording-tab-btn" onclick="window.switchWordingTab('joint')">Both Families Joint</button>
            <button type="button" class="wording-tab-btn" onclick="window.switchWordingTab('blended')">Divorced / Blended</button>
            <button type="button" class="wording-tab-btn" onclick="window.switchWordingTab('couple')">Couple Hosting</button>
            <button type="button" class="wording-tab-btn" onclick="window.switchWordingTab('enclosures')">Reception &amp; RSVP</button>
            <button type="button" class="wording-tab-btn" onclick="window.switchWordingTab('honorifics')">Addressing Rules</button>
          </div>

          <div id="wording-tab-content">
            <div class="wording-sample-box" id="wording-display-text"></div>
            <div id="wording-display-note" style="margin-top: 1rem; font-size: 0.85rem; color: var(--text-secondary); line-height: 1.55;"></div>
          </div>

          <div style="display: flex; gap: 0.75rem; margin-top: 1.5rem; flex-wrap: wrap; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-color); padding-top: 1.25rem;">
            <button type="button" class="btn btn-secondary btn-sm" onclick="window.copyActiveWording()">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
              Copy Phrasing to Clipboard
            </button>
            <button type="button" class="btn btn-primary btn-sm" onclick="window.printWordingGuide()">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/></svg>
              Print / Save Full PDF Guide
            </button>
          </div>
        </div>
      </div>
      `.trim();
      modal = wrapper.firstElementChild;
      document.body.appendChild(modal);

      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal('wording-matrix-modal');
      });
      const closeBtn = modal.querySelector('.modal-close-btn');
      if (closeBtn) closeBtn.addEventListener('click', () => closeModal('wording-matrix-modal'));
    }
    return modal;
  }

  function switchWordingTab(key) {
    activeWordingCategory = key;
    const modal = ensureWordingMatrixModal();
    const data = WORDING_DATA[key] || WORDING_DATA.traditional;

    // Update tab buttons
    modal.querySelectorAll('.wording-tab-btn').forEach(btn => {
      const onclickAttr = btn.getAttribute('onclick') || '';
      btn.classList.toggle('active', onclickAttr.includes(`'${key}'`));
    });

    // Update text
    const textEl = modal.querySelector('#wording-display-text');
    const noteEl = modal.querySelector('#wording-display-note');
    if (textEl) {
      textEl.innerHTML = data.text.replace(/\n/g, '<br>');
    }
    if (noteEl) {
      noteEl.innerHTML = data.note;
    }
  }
  window.switchWordingTab = switchWordingTab;

  function openWordingMatrixModal(tabKey = 'traditional') {
    ensureWordingMatrixModal();
    switchWordingTab(tabKey);
    openModal('wording-matrix-modal');
  }
  window.openWordingMatrixModal = openWordingMatrixModal;

  window.copyActiveWording = function() {
    const data = WORDING_DATA[activeWordingCategory];
    if (data && navigator.clipboard) {
      navigator.clipboard.writeText(data.text);
      showToast('Wording template copied to clipboard!', 'success');
    } else {
      showToast('Wording template selected.', 'info');
    }
  };

  window.printWordingGuide = function() {
    showToast('Preparing printable Wedding Wording PDF Guide...', 'info');
    setTimeout(() => {
      window.print();
    }, 400);
  };

  // ==========================================
  // BRIDAL TOOLKIT RESOURCE 2: FOIL & SWATCH CHART MODAL
  // ==========================================
  function ensureSwatchChartModal() {
    let modal = document.getElementById('swatch-chart-modal');
    if (!modal) {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = `
      <div class="modal-overlay" id="swatch-chart-modal">
        <div class="modal-card" style="max-width: 780px; width: 94%; max-height: 90vh; overflow-y: auto; padding: 2.25rem 2rem;">
          <button type="button" class="modal-close-btn" aria-label="Close modal">&times;</button>
          <div style="margin-bottom: 1.5rem;">
            <span class="badge-tag" style="background: var(--gold-light); margin-bottom: 0.5rem; display: inline-block;">Tactile Color Science</span>
            <h3 style="font-size: 1.75rem; margin-bottom: 0.35rem; color: var(--text-primary);">Foil &amp; Pantone Color Ring Guide</h3>
            <p style="font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 0;">
              Calibrated daylight comparisons of our heated brass foil stamping, letterpress Pantone inks, and cotton weights.
            </p>
          </div>

          <!-- Section 1: Metallic Hot Foils -->
          <div style="margin-bottom: 1.5rem;">
            <h4 style="font-size: 0.95rem; margin-bottom: 0.75rem; color: var(--gold-primary); text-transform: uppercase; letter-spacing: 0.05em;">1. Hot Metallic Stamping Foils (Mirror &amp; Lustre)</h4>
            <div class="swatch-grid">
              <div class="swatch-chip active" onclick="window.previewFoilShimmer('Warm Champagne Gold', '22k Mirror reflection on deep cotton rag board', this)">
                <div class="swatch-color-circle foil-gold"></div>
                <div class="swatch-name">Champagne Gold</div>
                <div class="swatch-code">22k Mirror Sheen</div>
              </div>
              <div class="swatch-chip" onclick="window.previewFoilShimmer('Rose Gold Foil', 'Copper blush luster with warm pink romantic undertones', this)">
                <div class="swatch-color-circle foil-rose"></div>
                <div class="swatch-name">Rose Gold</div>
                <div class="swatch-code">Copper Blush</div>
              </div>
              <div class="swatch-chip" onclick="window.previewFoilShimmer('Antique Copper Foil', 'Burnished bronze earth tone with vintage atelier patina', this)">
                <div class="swatch-color-circle foil-copper"></div>
                <div class="swatch-name">Antique Copper</div>
                <div class="swatch-code">Burnished Patina</div>
              </div>
              <div class="swatch-chip" onclick="window.previewFoilShimmer('Obsidian Noir Foil', 'High-gloss patent-black foil with sharp architectural contrast', this)">
                <div class="swatch-color-circle foil-obsidian"></div>
                <div class="swatch-name">Obsidian Noir</div>
                <div class="swatch-code">High-Gloss Jet</div>
              </div>
              <div class="swatch-chip" onclick="window.previewFoilShimmer('Platinum Mirror Silver', 'Cool, crisp mirror sheen ideal for modern minimalist suites', this)">
                <div class="swatch-color-circle foil-platinum"></div>
                <div class="swatch-name">Platinum Silver</div>
                <div class="swatch-code">Mirror Bright</div>
              </div>
            </div>
          </div>

          <!-- Dynamic Foil Shimmer Box -->
          <div id="foil-shimmer-preview" style="background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: var(--radius-sm); padding: 1rem 1.25rem; margin-bottom: 1.5rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem;">
            <div>
              <strong id="shimmer-title" style="color: var(--gold-primary);">Warm Champagne Gold Foil</strong>
              <div id="shimmer-desc" style="font-size: 0.82rem; color: var(--text-secondary);">22k Mirror reflection on deep cotton rag board</div>
            </div>
            <span class="badge-tag" style="background: var(--gold-light);">Daylight Sim: 5500K</span>
          </div>

          <!-- Section 2: Letterpress Inks -->
          <div style="margin-bottom: 1.5rem;">
            <h4 style="font-size: 0.95rem; margin-bottom: 0.75rem; color: var(--gold-primary); text-transform: uppercase; letter-spacing: 0.05em;">2. Letterpress Pantone Inks (Matte Relief)</h4>
            <div class="swatch-grid">
              <div class="swatch-chip" onclick="window.showToast('Selected Pantone 5773 U (Amalfi Olive)', 'info')">
                <div class="swatch-color-circle" style="background: #78866B;"></div>
                <div class="swatch-name">Amalfi Olive</div>
                <div class="swatch-code">PMS 5773 U</div>
              </div>
              <div class="swatch-chip" onclick="window.showToast('Selected Pantone 5415 U (French Blue)', 'info')">
                <div class="swatch-color-circle" style="background: #768A96;"></div>
                <div class="swatch-name">French Blue</div>
                <div class="swatch-code">PMS 5415 U</div>
              </div>
              <div class="swatch-chip" onclick="window.showToast('Selected Pantone 7522 U (Terra Cotta)', 'info')">
                <div class="swatch-color-circle" style="background: #C46849;"></div>
                <div class="swatch-name">Terra Cotta</div>
                <div class="swatch-code">PMS 7522 U</div>
              </div>
              <div class="swatch-chip" onclick="window.showToast('Selected Pantone 432 U (Charcoal Slate)', 'info')">
                <div class="swatch-color-circle" style="background: #4A535A;"></div>
                <div class="swatch-name">Charcoal Slate</div>
                <div class="swatch-code">PMS 432 U</div>
              </div>
              <div class="swatch-chip" onclick="window.showToast('Selected Pantone Black 7 U (Espresso Noir)', 'info')">
                <div class="swatch-color-circle" style="background: #231F20;"></div>
                <div class="swatch-name">Espresso Noir</div>
                <div class="swatch-code">PMS Black 7 U</div>
              </div>
            </div>
          </div>

          <!-- Section 3: Paper Calipers -->
          <div style="margin-bottom: 1.5rem;">
            <h4 style="font-size: 0.95rem; margin-bottom: 0.75rem; color: var(--gold-primary); text-transform: uppercase; letter-spacing: 0.05em;">3. Paper Calipers &amp; Cotton Weights</h4>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.75rem;">
              <div style="padding: 0.85rem; border: 1px solid var(--border-color); border-radius: var(--radius-sm); background: var(--bg-card);">
                <strong style="color: var(--text-primary); font-size: 0.88rem;">300 GSM (Single-Ply)</strong>
                <p style="font-size: 0.78rem; color: var(--text-secondary); margin: 0.25rem 0 0;">Ideal for RSVP cards, details inserts, and envelope liners.</p>
              </div>
              <div style="padding: 0.85rem; border: 1px solid var(--border-color); border-radius: var(--radius-sm); background: var(--bg-card);">
                <strong style="color: var(--gold-primary); font-size: 0.88rem;">600 GSM (Double-Ply)</strong>
                <p style="font-size: 0.78rem; color: var(--text-secondary); margin: 0.25rem 0 0;">Our signature letterpress weight for deep deboss impression.</p>
              </div>
              <div style="padding: 0.85rem; border: 1px solid var(--border-color); border-radius: var(--radius-sm); background: var(--bg-card);">
                <strong style="color: var(--text-primary); font-size: 0.88rem;">900 GSM (Triple-Ply)</strong>
                <p style="font-size: 0.78rem; color: var(--text-secondary); margin: 0.25rem 0 0;">Ultra-luxurious board with hand-painted beveled gilded edges.</p>
              </div>
            </div>
          </div>

          <!-- Footer Actions -->
          <div style="display: flex; gap: 0.75rem; justify-content: flex-end; border-top: 1px solid var(--border-color); padding-top: 1.25rem; flex-wrap: wrap;">
            <button type="button" class="btn btn-secondary btn-sm" onclick="window.print()">
              Print Swatch Reference Sheet
            </button>
            <button type="button" class="btn btn-primary btn-sm" onclick="closeModal('swatch-chart-modal'); openSampleKitModal();">
              Order Physical Swatch Kit ($35)
            </button>
          </div>
        </div>
      </div>
      `.trim();
      modal = wrapper.firstElementChild;
      document.body.appendChild(modal);

      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal('swatch-chart-modal');
      });
      const closeBtn = modal.querySelector('.modal-close-btn');
      if (closeBtn) closeBtn.addEventListener('click', () => closeModal('swatch-chart-modal'));
    }
    return modal;
  }

  function openSwatchChartModal() {
    ensureSwatchChartModal();
    openModal('swatch-chart-modal');
  }
  window.openSwatchChartModal = openSwatchChartModal;

  window.previewFoilShimmer = function(title, desc, el) {
    const modal = document.getElementById('swatch-chart-modal');
    if (modal) {
      modal.querySelectorAll('.swatch-chip').forEach(c => c.classList.remove('active'));
      if (el) el.classList.add('active');
      const titleEl = modal.querySelector('#shimmer-title');
      const descEl = modal.querySelector('#shimmer-desc');
      if (titleEl) titleEl.textContent = title;
      if (descEl) descEl.textContent = desc;
    }
  };

  // ==========================================
  // BRIDAL TOOLKIT RESOURCE 3: ADDRESS SPREADSHEET DOWNLOAD
  // ==========================================
  window.downloadAddressTemplate = function() {
    const csvContent = [
      "Guest ID,Outer Envelope Honorific & Full Name,Inner Envelope Names,Street Address Line 1,Apartment/Suite,City,State/Province,Postal/ZIP Code,Country,Total Guests Allocated,Adults,Children,Dietary Restrictions,Calligraphy Script Style,Table Number,RSVP Status",
      '101,"Dr. Marcus Vance and Mrs. Eleanor Vance","Marcus and Eleanor","742 Evergreen Terrace","Apt 4B","New York","NY","10012","USA",2,2,0,"Vegetarian (Eleanor)","Copperplate Classic","Table 4","Confirmed Attending"',
      '102,"Mr. Alistair Sterling and Ms. Camilla Rhodes","Alistair and Camilla","184 Kensington High St","","London","","W8 7RG","United Kingdom",2,2,0,"Gluten-Free (Camilla)","Spencerian Flourish","Table 2","Confirmed Attending"',
      '103,"The Honorable Justice Sarah Jenkins","Justice Jenkins","950 Pennsylvania Ave NW","","Washington","DC","20530","USA",1,1,0,"None","Modern Organic Script","Table 1","Confirmed Attending"',
      '104,"Mr. Julian Thorne and Guest","Julian and Guest","520 Brickell Avenue","Suite 1802","Miami","FL","33131","USA",2,2,0,"Nut Allergy (Guest)","Copperplate Classic","Table 7","Pending RSVP"',
      '105,"Captain Robert Hayes and Dr. Patricia Hayes","Robert and Patricia","45 Beacon Street","","Boston","MA","02108","USA",2,2,0,"None","Spencerian Flourish","Table 3","Confirmed Attending"'
    ].join("\r\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'Aura_and_Vellum_Guest_Addressing_Template.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showToast('✓ "Aura_and_Vellum_Guest_Addressing_Template.csv" downloaded!', 'success');
  };

  // ==========================================
  // BRIDAL TOOLKIT RESOURCE 4: TIMELINE COUNTDOWN MODAL
  // ==========================================
  const TIMELINE_MILESTONES = [
    { months: 12, label: "12–10 Months Out", title: "Paper Sampling & Atelier Concierge Booking", desc: "Order physical paper swatch kit, select typography suites, and reserve production slot on Heidelberg presses." },
    { months: 9, label: "9–8 Months Out", title: "Save the Date Proof Approval & Platen Inking", desc: "Review digital PDF proofs for spelling and postal barcode clearance. Inking and debossing commences." },
    { months: 7, label: "7–6 Months Out", title: "Save the Date Postal Mailing", desc: "Dispatch Save the Dates (8 months ahead for destination weddings; 6 months ahead for domestic ceremonies)." },
    { months: 5, label: "5–4 Months Out", title: "Invitation Wording & Custom Wax Seal Die Forging", desc: "Finalize formal ceremony wording protocol and machine CNC copper wax monogram die." },
    { months: 3.5, label: "3–4 Months Out", title: "Haute Letterpress & Hot Foil Production", desc: "Suite printing on 600gsm cotton board, gilded edge beveling, and vellum wrap scoring." },
    { months: 2.2, label: "8–10 Weeks Out", title: "Envelope Calligraphy & Wax Sealing Assembly", desc: "Master calligrapher scripts individual envelopes with dip pens; each suite hand-sealed in molten wax." },
    { months: 1.8, label: "6–8 Weeks Out", title: "Formal Invitation Suite Postal Dispatch", desc: "Hand-cancel at main postal branch to protect tactile deckle edges and wax seals from sorting machines." },
    { months: 1.0, label: "4 Weeks Out", title: "RSVP Deadline & Final Catering Headcount", desc: "Collect remaining digital and mail RSVPs. Lock final seating allocation and dietary requirements." },
    { months: 0.5, label: "2–3 Weeks Out", title: "Day-of Stationery Suite Inking", desc: "Letterpress printing of dinner menus, place cards, cocktail signs, and wax-sealed seating charts." },
    { months: -0.7, label: "2–4 Weeks Post-Wedding", title: "Hand-Calligraphed Thank You Cards", desc: "Send personalized thank you stationery on matching deckle cotton paper to attending guests." }
  ];

  function ensureTimelineModal() {
    let modal = document.getElementById('timeline-guide-modal');
    if (!modal) {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = `
      <div class="modal-overlay" id="timeline-guide-modal">
        <div class="modal-card" style="max-width: 760px; width: 94%; max-height: 90vh; overflow-y: auto; padding: 2.25rem 2rem;">
          <button type="button" class="modal-close-btn" aria-label="Close modal">&times;</button>
          <div style="margin-bottom: 1.5rem;">
            <span class="badge-tag" style="background: var(--gold-light); margin-bottom: 0.5rem; display: inline-block;">Interactive Milestone Calculator</span>
            <h3 style="font-size: 1.75rem; margin-bottom: 0.35rem; color: var(--text-primary);">12-Month Stationery Countdown Schedule</h3>
            <p style="font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 0;">
              Interactive timeline calculator for Save the Dates, proofing cycles, wax sealing, and postal dispatch.
            </p>
          </div>

          <!-- Wedding Date Picker -->
          <div style="background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: var(--radius-sm); padding: 1rem 1.25rem; margin-bottom: 1.5rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.75rem;">
            <div>
              <label for="calc-wedding-date" style="font-weight: 700; font-size: 0.88rem; color: var(--text-primary); display: block; margin-bottom: 0.2rem;">Your Wedding Date:</label>
              <span style="font-size: 0.78rem; color: var(--text-secondary);">Select your celebration date to calculate custom milestone deadlines.</span>
            </div>
            <input type="date" id="calc-wedding-date" class="form-control" style="width: auto; font-weight: 600; padding: 0.5rem 0.75rem;" value="2027-06-20" onchange="window.updateTimelineDates()">
          </div>

          <!-- Timeline Step Items -->
          <div class="timeline-step-list" id="timeline-step-container"></div>

          <div style="display: flex; gap: 0.75rem; margin-top: 1.5rem; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-color); padding-top: 1.25rem; flex-wrap: wrap;">
            <button type="button" class="btn btn-secondary btn-sm" onclick="window.resetTimelineChecklist()">
              Reset Checklist
            </button>
            <button type="button" class="btn btn-primary btn-sm" onclick="window.print()">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/></svg>
              Print / Save Timeline (PDF)
            </button>
          </div>
        </div>
      </div>
      `.trim();
      modal = wrapper.firstElementChild;
      document.body.appendChild(modal);

      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal('timeline-guide-modal');
      });
      const closeBtn = modal.querySelector('.modal-close-btn');
      if (closeBtn) closeBtn.addEventListener('click', () => closeModal('timeline-guide-modal'));
    }
    return modal;
  }

  function updateTimelineDates() {
    const modal = ensureTimelineModal();
    const dateInput = modal.querySelector('#calc-wedding-date');
    const container = modal.querySelector('#timeline-step-container');
    if (!dateInput || !container) return;

    const baseDate = new Date(dateInput.value || '2027-06-20');
    const isValid = !isNaN(baseDate.getTime());
    const validDate = isValid ? baseDate : new Date('2027-06-20');

    let html = '';
    TIMELINE_MILESTONES.forEach((m, idx) => {
      const targetDate = new Date(validDate);
      targetDate.setDate(targetDate.getDate() - Math.round(m.months * 30.4));
      const formattedDate = targetDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

      html += `
      <div class="timeline-step-item" id="timeline-step-${idx}">
        <input type="checkbox" id="check-step-${idx}" style="margin-top: 0.35rem; cursor: pointer; accent-color: var(--gold-primary);" onchange="window.toggleTimelineStep(${idx}, this.checked)">
        <div style="flex: 1;">
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; margin-bottom: 0.25rem; flex-wrap: wrap;">
            <strong style="color: var(--text-primary); font-size: 0.95rem;">${m.title}</strong>
            <span class="timeline-step-time">${formattedDate} &bull; ${m.label}</span>
          </div>
          <p style="font-size: 0.82rem; color: var(--text-secondary); margin: 0; line-height: 1.5;">${m.desc}</p>
        </div>
      </div>
      `;
    });

    container.innerHTML = html;
  }
  window.updateTimelineDates = updateTimelineDates;

  function openTimelineModal() {
    ensureTimelineModal();
    updateTimelineDates();
    openModal('timeline-guide-modal');
  }
  window.openTimelineModal = openTimelineModal;

  window.toggleTimelineStep = function(idx, isChecked) {
    const item = document.getElementById(`timeline-step-${idx}`);
    if (item) {
      item.classList.toggle('completed', isChecked);
      if (isChecked) {
        showToast('Milestone checked off!', 'success');
      }
    }
  };

  window.resetTimelineChecklist = function() {
    const modal = document.getElementById('timeline-guide-modal');
    if (modal) {
      modal.querySelectorAll('input[type="checkbox"]').forEach(cb => {
        cb.checked = false;
      });
      modal.querySelectorAll('.timeline-step-item').forEach(item => {
        item.classList.remove('completed');
      });
      showToast('Milestone checklist reset.', 'info');
    }
  };

  // --- Modal Helpers ---
  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }
  window.openModal = openModal;

  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }
  window.closeModal = closeModal;

  function initModals() {
    // Backdrop click to close
    document.querySelectorAll('.modal-overlay').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          closeModal(modal.id);
        }
      });
    });

    // Close buttons
    document.querySelectorAll('.modal-close-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const modal = btn.closest('.modal-overlay');
        if (modal) closeModal(modal.id);
      });
    });

    // Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.active').forEach(modal => {
          closeModal(modal.id);
        });
      }
    });

    // Delegate footer legal link clicks to openAtelierSheet
    document.addEventListener('click', (e) => {
      const link = e.target.closest('[data-open-sheet], .footer-legal-links a');
      if (link) {
        e.preventDefault();
        let tabKey = link.getAttribute('data-open-sheet');
        if (!tabKey) {
          const text = link.textContent.trim().toLowerCase();
          if (text.includes('privacy')) tabKey = 'privacy';
          else if (text.includes('terms') || text.includes('commission')) tabKey = 'terms';
          else if (text.includes('season') || text.includes('launch')) tabKey = 'launches';
          else if (text.includes('showroom') || text.includes('hours')) tabKey = 'showroom';
          else tabKey = 'privacy';
        }
        openAtelierSheet(tabKey);
        return;
      }

      // Delegate Sample Kit trigger buttons
      const sampleBtn = e.target.closest('[data-open-sample-kit], .btn-order-sample, a[href*="sample-kit"], button[onclick*="sample"]');
      if (sampleBtn && !sampleBtn.hasAttribute('data-open-sheet')) {
        const href = sampleBtn.getAttribute('href') || '';
        if (href.includes('#sample-kit-box') && window.location.pathname.includes('pricing.html')) {
          // Allow in-page anchor scroll on pricing.html
          return;
        }
        e.preventDefault();
        openSampleKitModal();
        return;
      }

      // Delegate Social media icon clicks
      const socialBtn = e.target.closest('.btn-icon, a[aria-label*="Instagram"], a[aria-label*="Pinterest"], a[aria-label*="Facebook"], a[aria-label*="Share"]');
      if (socialBtn && (socialBtn.getAttribute('href') === '#' || !socialBtn.getAttribute('href') || socialBtn.getAttribute('href').startsWith('javascript'))) {
        e.preventDefault();
        const label = socialBtn.getAttribute('aria-label') || 'Social Channel';
        if (label.toLowerCase().includes('share') || label.toLowerCase().includes('copy')) {
          if (navigator.clipboard) {
            navigator.clipboard.writeText(window.location.href);
            showToast('Link copied to your clipboard!', 'success');
          } else {
            showToast('Opening ' + label + '...', 'info');
          }
        } else {
          showToast('Connecting to Aura & Vellum on ' + label + '...', 'info');
        }
        return;
      }

      // General # link fallback safety delegator
      const genericHashLink = e.target.closest('a[href="#"]');
      if (genericHashLink) {
        const text = genericHashLink.textContent.trim().toLowerCase();
        if (text.includes('forgot')) {
          e.preventDefault();
          showToast('Password reset instructions dispatched to your email.', 'info');
        } else if (text.includes('login') || text.includes('sign in')) {
          e.preventDefault();
          const loginModal = document.getElementById('global-login-modal');
          if (loginModal) openModal('global-login-modal');
          else window.location.href = 'login.html';
        } else if (text.includes('sample') || text.includes('swatch')) {
          e.preventDefault();
          openSampleKitModal();
        } else if (text.includes('consultation') || text.includes('appointment')) {
          e.preventDefault();
          window.location.href = 'contact.html';
        }
      }
    });
  }

  // --- Password Toggle Helper ---
  function initPasswordToggles() {
    document.querySelectorAll('.password-toggle-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-target');
        const input = document.getElementById(targetId);
        if (input) {
          const isPassword = input.type === 'password';
          input.type = isPassword ? 'text' : 'password';
          btn.textContent = isPassword ? 'Hide' : 'Show';
        }
      });
    });
  }

  // --- Consultation Form Validation & Submission Controller ---
  function initConsultationForm() {
    const form = document.getElementById('consultation-booking-form');
    if (!form) return;

    const successMsg = document.getElementById('consult-success-msg');
    const coupleNamesInput = document.getElementById('c-names');
    const emailInput = document.getElementById('c-email');
    const phoneInput = document.getElementById('c-phone');
    const dateInput = document.getElementById('c-date');
    const venueInput = document.getElementById('c-venue');
    const typeSelect = document.getElementById('c-type');

    // Ensure success message is explicitly hidden on initial page load / refresh
    if (successMsg) {
      successMsg.style.display = 'none';
      successMsg.classList.remove('is-visible');
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const phonePattern = /^[\d\s()+\-\.]{7,25}$/;

    function showFieldError(field, errorId, message) {
      if (!field) return;
      field.classList.add('is-invalid');
      const errEl = document.getElementById(errorId);
      if (errEl) {
        if (message) errEl.textContent = message;
        errEl.classList.add('is-visible');
      }
    }

    function clearFieldError(field, errorId) {
      if (!field) return;
      field.classList.remove('is-invalid');
      const errEl = document.getElementById(errorId);
      if (errEl) {
        errEl.classList.remove('is-visible');
      }
    }

    // Attach real-time validation clearing on user interaction
    const inputs = [
      { el: coupleNamesInput, err: 'err-c-names', validator: (val) => val.trim().length > 0 },
      { el: emailInput, err: 'err-c-email', validator: (val) => emailPattern.test(val.trim()) },
      { el: phoneInput, err: 'err-c-phone', validator: (val) => phonePattern.test(val.trim()) && val.replace(/\D/g, '').length >= 7 },
      { el: dateInput, err: 'err-c-date', validator: (val) => val.trim().length > 0 },
      { el: venueInput, err: 'err-c-venue', validator: (val) => val.trim().length > 0 },
      { el: typeSelect, err: 'err-c-type', validator: (val) => val && val.trim().length > 0 }
    ];

    inputs.forEach(({ el, err, validator }) => {
      if (!el) return;
      const clearIfValid = () => {
        if (validator(el.value)) {
          clearFieldError(el, err);
        }
      };
      el.addEventListener('input', clearIfValid);
      el.addEventListener('change', clearIfValid);
      el.addEventListener('blur', clearIfValid);
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      let hasErrors = false;
      let firstInvalidEl = null;

      // Validate Couple Names
      if (!coupleNamesInput || !coupleNamesInput.value.trim()) {
        showFieldError(coupleNamesInput, 'err-c-names', "Please enter the couple's names.");
        if (!firstInvalidEl) firstInvalidEl = coupleNamesInput;
        hasErrors = true;
      } else {
        clearFieldError(coupleNamesInput, 'err-c-names');
      }

      // Validate Email
      if (!emailInput || !emailInput.value.trim()) {
        showFieldError(emailInput, 'err-c-email', 'Please enter your email address.');
        if (!firstInvalidEl) firstInvalidEl = emailInput;
        hasErrors = true;
      } else if (!emailPattern.test(emailInput.value.trim())) {
        showFieldError(emailInput, 'err-c-email', 'Please enter a valid email address (e.g. name@domain.com).');
        if (!firstInvalidEl) firstInvalidEl = emailInput;
        hasErrors = true;
      } else {
        clearFieldError(emailInput, 'err-c-email');
      }

      // Validate Phone
      const digitsOnly = phoneInput ? phoneInput.value.replace(/\D/g, '') : '';
      if (!phoneInput || !phoneInput.value.trim()) {
        showFieldError(phoneInput, 'err-c-phone', 'Please enter your contact phone / WhatsApp number.');
        if (!firstInvalidEl) firstInvalidEl = phoneInput;
        hasErrors = true;
      } else if (!phonePattern.test(phoneInput.value.trim()) || digitsOnly.length < 7) {
        showFieldError(phoneInput, 'err-c-phone', 'Please enter a valid phone number (at least 7 digits).');
        if (!firstInvalidEl) firstInvalidEl = phoneInput;
        hasErrors = true;
      } else {
        clearFieldError(phoneInput, 'err-c-phone');
      }

      // Validate Wedding Date
      if (!dateInput || !dateInput.value.trim()) {
        showFieldError(dateInput, 'err-c-date', 'Please select your wedding date.');
        if (!firstInvalidEl) firstInvalidEl = dateInput;
        hasErrors = true;
      } else {
        clearFieldError(dateInput, 'err-c-date');
      }

      // Validate Wedding Venue
      if (!venueInput || !venueInput.value.trim()) {
        showFieldError(venueInput, 'err-c-venue', 'Please enter your wedding venue and city.');
        if (!firstInvalidEl) firstInvalidEl = venueInput;
        hasErrors = true;
      } else {
        clearFieldError(venueInput, 'err-c-venue');
      }

      // Validate Appointment Format
      if (!typeSelect || !typeSelect.value.trim()) {
        showFieldError(typeSelect, 'err-c-type', 'Please select an appointment format.');
        if (!firstInvalidEl) firstInvalidEl = typeSelect;
        hasErrors = true;
      } else {
        clearFieldError(typeSelect, 'err-c-type');
      }

      // If invalid, hide success message, focus first error field and stop
      if (hasErrors) {
        if (successMsg) {
          successMsg.style.display = 'none';
          successMsg.classList.remove('is-visible');
        }
        if (firstInvalidEl) {
          firstInvalidEl.focus();
          firstInvalidEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }

      // If valid, display the success message dynamically below the button
      if (successMsg) {
        successMsg.style.display = 'block';
        successMsg.classList.add('is-visible');
        successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      showToast('Consultation request received! Our concierge will contact you shortly.', 'success');

      // Reset form input values while keeping the success message visible
      form.reset();

      // Clear any remaining is-invalid classes after reset
      inputs.forEach(({ el, err }) => clearFieldError(el, err));
    });
  }

  // --- Initialize Everything On DOM Ready ---
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initDirection();
    initNavigation();
    initAccordions();
    initModals();
    initPasswordToggles();
    initConsultationForm();

    // Event listeners for theme and direction buttons
    document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
      btn.addEventListener('click', toggleTheme);
    });

    document.querySelectorAll('.lang-toggle-btn').forEach(btn => {
      btn.addEventListener('click', toggleDirection);
    });

    // In-page modal triggers (only explicit modal trigger buttons)
    document.querySelectorAll('.btn-open-login').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const loginModal = document.getElementById('global-login-modal');
        if (loginModal) {
          e.preventDefault();
          openModal('global-login-modal');
        }
      });
    });

    // Mobile Home Dropdown Toggle
    const mobileDropdownBtn = document.querySelector('.mobile-dropdown-toggle');
    const mobileDropdownMenu = document.querySelector('.mobile-dropdown-content');
    if (mobileDropdownBtn && mobileDropdownMenu) {
      mobileDropdownBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const isOpen = mobileDropdownMenu.style.display === 'block';
        mobileDropdownMenu.style.display = isOpen ? 'none' : 'block';
        mobileDropdownBtn.querySelector('svg')?.style.setProperty('transform', isOpen ? 'rotate(0deg)' : 'rotate(180deg)');
      });
    }
  });

})();
