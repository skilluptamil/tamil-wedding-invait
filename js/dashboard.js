/**
 * AURA & VELLUM ATELIER — ADMIN & CLIENT DASHBOARD INTERACTION SCRIPT
 */

(function () {
  'use strict';

  function initDashboardActions() {
    // Proof approval / revision handlers
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

    // Client Inquiries Mock Reply
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

    // Filter table rows by status
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
