/**
 * AURA & VELLUM ATELIER — CUSTOM DESIGN CONFIGURATOR & SUITE BUILDER
 * Manages live selection, pricing calculations, and interactive quotation summary
 */

(function () {
  'use strict';

  // Base pricing models
  const CONFIG_STATE = {
    format: { name: '4-Piece Classic Suite', basePrice: 650 },
    paper: { name: 'Handmade Deckle-Edge Cotton (350gsm)', addPrice: 150 },
    print: { name: 'Artisan Hot Foil Stamping (Gold)', addPrice: 220 },
    embellishments: [
      { id: 'wax-seal', name: 'Custom Monogram Wax Seal', price: 95 },
      { id: 'silk-ribbon', name: 'Hand-Dyed Raw Silk Ribbon', price: 85 }
    ],
    quantity: 100
  };

  const QUANTITY_MULTIPLIERS = {
    50: 0.65,
    75: 0.85,
    100: 1.0,
    150: 1.4,
    200: 1.75
  };

  function updatePricing() {
    const summaryFormat = document.getElementById('summary-format');
    const summaryPaper = document.getElementById('summary-paper');
    const summaryPrint = document.getElementById('summary-print');
    const summaryEmbellishments = document.getElementById('summary-embellishments');
    const summaryQty = document.getElementById('summary-qty');
    const summaryPerSuite = document.getElementById('summary-per-suite');
    const summaryTotal = document.getElementById('summary-total-price');

    if (!summaryTotal) return;

    // Subtotal base calculation
    const baseTotal = CONFIG_STATE.format.basePrice + CONFIG_STATE.paper.addPrice + CONFIG_STATE.print.addPrice;
    
    // Add embellishments
    const embellishmentsTotal = CONFIG_STATE.embellishments.reduce((sum, item) => sum + item.price, 0);
    
    // Scale by quantity multiplier
    const multiplier = QUANTITY_MULTIPLIERS[CONFIG_STATE.quantity] || 1.0;
    const finalTotal = Math.round((baseTotal + embellishmentsTotal) * multiplier);
    const perSuitePrice = (finalTotal / CONFIG_STATE.quantity).toFixed(2);

    // Update UI elements
    if (summaryFormat) summaryFormat.textContent = CONFIG_STATE.format.name;
    if (summaryPaper) summaryPaper.textContent = CONFIG_STATE.paper.name;
    if (summaryPrint) summaryPrint.textContent = CONFIG_STATE.print.name;
    if (summaryQty) summaryQty.textContent = `${CONFIG_STATE.quantity} Suites`;
    
    if (summaryEmbellishments) {
      if (CONFIG_STATE.embellishments.length === 0) {
        summaryEmbellishments.textContent = 'None Selected';
      } else {
        summaryEmbellishments.textContent = CONFIG_STATE.embellishments.map(e => e.name).join(', ');
      }
    }

    if (summaryPerSuite) summaryPerSuite.textContent = `$${perSuitePrice} / suite`;
    if (summaryTotal) summaryTotal.textContent = `$${finalTotal.toLocaleString()}`;
  }

  function initConfigurator() {
    const configuratorForm = document.getElementById('suite-configurator-form');
    if (!configuratorForm) return;

    // Format selection
    const formatRadios = configuratorForm.querySelectorAll('input[name="config-format"]');
    formatRadios.forEach(radio => {
      radio.addEventListener('change', () => {
        if (radio.checked) {
          CONFIG_STATE.format.name = radio.dataset.name;
          CONFIG_STATE.format.basePrice = parseFloat(radio.dataset.price);
          updateOptionCardStyles(formatRadios);
          updatePricing();
        }
      });
    });

    // Paper stock selection
    const paperRadios = configuratorForm.querySelectorAll('input[name="config-paper"]');
    paperRadios.forEach(radio => {
      radio.addEventListener('change', () => {
        if (radio.checked) {
          CONFIG_STATE.paper.name = radio.dataset.name;
          CONFIG_STATE.paper.addPrice = parseFloat(radio.dataset.price);
          updateOptionCardStyles(paperRadios);
          updatePricing();
        }
      });
    });

    // Print method selection
    const printRadios = configuratorForm.querySelectorAll('input[name="config-print"]');
    printRadios.forEach(radio => {
      radio.addEventListener('change', () => {
        if (radio.checked) {
          CONFIG_STATE.print.name = radio.dataset.name;
          CONFIG_STATE.print.addPrice = parseFloat(radio.dataset.price);
          updateOptionCardStyles(printRadios);
          updatePricing();
        }
      });
    });

    // Embellishments selection (Checkboxes)
    const embellishmentChecks = configuratorForm.querySelectorAll('input[name="config-embellish"]');
    embellishmentChecks.forEach(check => {
      check.addEventListener('change', () => {
        CONFIG_STATE.embellishments = [];
        embellishmentChecks.forEach(c => {
          const card = c.closest('.option-card');
          if (c.checked) {
            CONFIG_STATE.embellishments.push({
              id: c.id,
              name: c.dataset.name,
              price: parseFloat(c.dataset.price)
            });
            if (card) card.classList.add('selected');
          } else {
            if (card) card.classList.remove('selected');
          }
        });
        updatePricing();
      });
    });

    // Quantity buttons
    const qtyButtons = configuratorForm.querySelectorAll('.qty-select-btn');
    qtyButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        qtyButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        CONFIG_STATE.quantity = parseInt(btn.dataset.qty, 10);
        updatePricing();
      });
    });

    // Request quote button
    const submitBtn = document.getElementById('config-submit-btn');
    if (submitBtn) {
      submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const quoteModal = document.getElementById('quote-summary-modal');
        if (quoteModal && window.openModal) {
          window.openModal('quote-summary-modal');
        } else if (window.showToast) {
          window.showToast('Your custom suite configuration has been drafted! Check your email for consultation booking.', 'success');
        }
      });
    }

    // Initialize Quote Modal Form Validation
    initQuoteModalForm();

    // Initial state calculation
    updatePricing();
  }

  function initQuoteModalForm() {
    const form = document.getElementById('quote-modal-form');
    if (!form) return;

    const namesInput = document.getElementById('quote-names');
    const emailInput = document.getElementById('quote-email');
    const phoneInput = document.getElementById('quote-phone');
    const dateInput = document.getElementById('quote-date');

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

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

    // Phone input strict numeric filtering: allow digits only (and optional leading +)
    if (phoneInput) {
      phoneInput.addEventListener('input', () => {
        const rawVal = phoneInput.value;
        const hasPlus = rawVal.startsWith('+');
        const digits = rawVal.replace(/\D/g, '');
        phoneInput.value = (hasPlus ? '+' : '') + digits;

        if (digits.length >= 7 && digits.length <= 15) {
          clearFieldError(phoneInput, 'err-quote-phone');
        }
      });

      phoneInput.addEventListener('keydown', (e) => {
        // Allow backspace, delete, tab, escape, enter, arrows
        if (['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
          return;
        }
        // Allow ctrl/cmd combinations
        if (e.ctrlKey || e.metaKey) {
          return;
        }
        // Allow '+' only as the first character
        if (e.key === '+' && phoneInput.value.length === 0) {
          return;
        }
        // Reject non-digits
        if (!/^[0-9]$/.test(e.key)) {
          e.preventDefault();
        }
      });
    }

    // Clear errors on input/change
    if (namesInput) {
      namesInput.addEventListener('input', () => {
        if (namesInput.value.trim().length > 0) clearFieldError(namesInput, 'err-quote-names');
      });
    }
    if (emailInput) {
      emailInput.addEventListener('input', () => {
        if (emailPattern.test(emailInput.value.trim())) clearFieldError(emailInput, 'err-quote-email');
      });
    }
    if (dateInput) {
      dateInput.addEventListener('change', () => {
        if (dateInput.value.trim().length > 0) clearFieldError(dateInput, 'err-quote-date');
      });
    }

    // Submit handler with strict validation
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let hasErrors = false;
      let firstInvalid = null;

      // Validate Names
      if (!namesInput || !namesInput.value.trim()) {
        showFieldError(namesInput, 'err-quote-names', "Please enter the couple's names.");
        if (!firstInvalid) firstInvalid = namesInput;
        hasErrors = true;
      } else {
        clearFieldError(namesInput, 'err-quote-names');
      }

      // Validate Email
      if (!emailInput || !emailInput.value.trim()) {
        showFieldError(emailInput, 'err-quote-email', 'Please enter your email address.');
        if (!firstInvalid) firstInvalid = emailInput;
        hasErrors = true;
      } else if (!emailPattern.test(emailInput.value.trim())) {
        showFieldError(emailInput, 'err-quote-email', 'Please enter a valid email address (e.g. name@domain.com).');
        if (!firstInvalid) firstInvalid = emailInput;
        hasErrors = true;
      } else {
        clearFieldError(emailInput, 'err-quote-email');
      }

      // Validate Phone: reject empty, letters/spaces, or length outside 7-15 digits
      const digitsOnly = phoneInput ? phoneInput.value.replace(/\D/g, '') : '';
      if (!phoneInput || !phoneInput.value.trim()) {
        showFieldError(phoneInput, 'err-quote-phone', 'Please enter your contact phone / WhatsApp number.');
        if (!firstInvalid) firstInvalid = phoneInput;
        hasErrors = true;
      } else if (digitsOnly.length < 7 || digitsOnly.length > 15) {
        showFieldError(phoneInput, 'err-quote-phone', 'Please enter a valid numeric phone number (7 to 15 digits).');
        if (!firstInvalid) firstInvalid = phoneInput;
        hasErrors = true;
      } else {
        clearFieldError(phoneInput, 'err-quote-phone');
      }

      // Validate Date
      if (!dateInput || !dateInput.value.trim()) {
        showFieldError(dateInput, 'err-quote-date', 'Please select your wedding date.');
        if (!firstInvalid) firstInvalid = dateInput;
        hasErrors = true;
      } else {
        clearFieldError(dateInput, 'err-quote-date');
      }

      if (hasErrors) {
        if (firstInvalid && firstInvalid.focus) firstInvalid.focus();
        return;
      }

      // Submission Success
      form.reset();
      if (window.closeModal) {
        window.closeModal('quote-summary-modal');
      }
      if (window.showToast) {
        window.showToast('Configuration submitted! We will email your formal proposal within 12 hours.', 'success');
      }
    });
  }

  function updateOptionCardStyles(elements) {
    elements.forEach(el => {
      const card = el.closest('.option-card');
      if (card) {
        if (el.checked) {
          card.classList.add('selected');
        } else {
          card.classList.remove('selected');
        }
      }
    });
  }

  document.addEventListener('DOMContentLoaded', initConfigurator);
})();
