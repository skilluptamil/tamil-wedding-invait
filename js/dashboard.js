/**
 * AURA & VELLUM ATELIER — ADMIN & CLIENT DASHBOARD INTERACTION SCRIPT
 */

(function () {
  'use strict';

  function initDashboardActions() {
    // --- Navigation & Section Switching ---
    const navItems = document.querySelectorAll('.dash-sidebar-nav .dash-nav-item[data-target]');
    const breadcrumbCurrent = document.getElementById('dash-breadcrumb-current');
    const sidebar = document.querySelector('.dash-sidebar');
    const backdrop = document.getElementById('dash-backdrop');
    const mobileToggle = document.getElementById('dash-sidebar-toggle');

    const sectionMap = {
      overview: {
        el: document.getElementById('dash-stats-overview'),
        title: 'Atelier Studio Command'
      },
      proofs: {
        el: document.getElementById('dash-proofs-section'),
        title: 'Digital Proof Approval Queue'
      },
      orders: {
        el: document.getElementById('dash-orders-section'),
        title: 'Client Orders Pipeline'
      },
      inquiries: {
        el: document.getElementById('dash-inquiries-section'),
        title: 'Bridal Inquiries & Chat'
      },
      revenue: {
        el: document.getElementById('dash-revenue-section'),
        title: 'Revenue & Equipment Status'
      },
      invoices: {
        el: document.getElementById('dash-invoices-section'),
        title: 'Client Invoices & Billing'
      }
    };

    function closeMobileSidebar() {
      if (sidebar) sidebar.classList.remove('open');
      if (backdrop) backdrop.classList.remove('open');
    }

    function openMobileSidebar() {
      if (sidebar) sidebar.classList.add('open');
      if (backdrop) backdrop.classList.add('open');
    }

    function navigateToSection(target) {
      const config = sectionMap[target];
      if (!config) return;

      // Update active nav state
      navItems.forEach(item => {
        if (item.dataset.target === target) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });

      // Update breadcrumb
      if (breadcrumbCurrent) {
        breadcrumbCurrent.textContent = config.title;
      }

      // Scroll smoothly to section and highlight
      if (config.el) {
        config.el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        config.el.classList.remove('dash-section-focus');
        void config.el.offsetWidth;
        config.el.classList.add('dash-section-focus');
      }

      closeMobileSidebar();
    }

    navItems.forEach(item => {
      item.addEventListener('click', () => {
        const target = item.dataset.target;
        if (target) navigateToSection(target);
      });

      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const target = item.dataset.target;
          if (target) navigateToSection(target);
        }
      });
    });

    if (mobileToggle) {
      mobileToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        if (sidebar && sidebar.classList.contains('open')) {
          closeMobileSidebar();
        } else {
          openMobileSidebar();
        }
      });
    }

    if (backdrop) {
      backdrop.addEventListener('click', closeMobileSidebar);
    }

    // --- Proof approval / revision handlers ---
    document.querySelectorAll('.btn-approve-proof').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const item = e.target.closest('.proof-review-item');
        if (!item) return;

        const badge = item.querySelector('.proof-status-badge');
        if (badge) {
          badge.className = 'proof-status-badge status-approved';
          badge.textContent = 'Approved';
        }

        btn.disabled = true;
        btn.textContent = 'Approved ✓';
        btn.style.opacity = '0.7';

        const revBtn = item.querySelector('.btn-revision-proof');
        if (revBtn) revBtn.style.display = 'none';

        if (window.showToast) {
          window.showToast('Design proof successfully approved for artisan press production!', 'success');
        }
      });
    });

    document.querySelectorAll('.btn-revision-proof').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const notes = prompt('Enter specific revision notes for master calligrapher / typesetter (e.g. font size, wording change):');
        if (notes && notes.trim() !== '') {
          const item = e.target.closest('.proof-review-item');
          const badge = item?.querySelector('.proof-status-badge');
          if (badge) {
            badge.className = 'proof-status-badge status-revision';
            badge.textContent = 'Revision Requested';
          }
          if (window.showToast) {
            window.showToast('Revision notes transmitted to atelier design team.', 'info');
          }
        }
      });
    });

    // --- Client Inquiries Mock Reply ---
    const replyForm = document.getElementById('dash-reply-form');
    if (replyForm) {
      replyForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = replyForm.querySelector('input');
        if (input && input.value.trim() !== '') {
          input.value = '';
          if (window.showToast) {
            window.showToast('Message sent to client portal and email dispatched.', 'success');
          }
        }
      });
    }

    // --- Filter table rows by status ---
    const filterTabs = document.querySelectorAll('.dash-order-tab');
    const tableRows = document.querySelectorAll('.dash-table tbody tr');

    filterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const status = tab.dataset.status;
        tableRows.forEach(row => {
          if (status === 'all' || row.dataset.orderStatus === status) {
            row.style.display = '';
          } else {
            row.style.display = 'none';
          }
        });
      });
    });
  }

  document.addEventListener('DOMContentLoaded', initDashboardActions);
})();
