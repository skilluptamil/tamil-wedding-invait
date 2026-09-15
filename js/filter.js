/**
 * AURA & VELLUM ATELIER — PRODUCT & BLOG FILTERING ENGINE
 * Handles multi-category filtering, real-time search, and counter updates
 */

(function () {
  'use strict';

  // --- Product Catalog Filtering ---
  function initProductFilters() {
    const themeButtons = document.querySelectorAll('[data-filter-theme]');
    const materialButtons = document.querySelectorAll('[data-filter-material]');
    const productCards = document.querySelectorAll('.product-item-card');
    const resultCount = document.getElementById('filter-results-count');

    if (!productCards.length) return;

    let activeTheme = 'all';
    let activeMaterial = 'all';

    function filterProducts() {
      let visibleCount = 0;

      productCards.forEach(card => {
        const itemTheme = card.dataset.theme || '';
        const itemMaterial = card.dataset.material || '';

        const themeMatch = activeTheme === 'all' || itemTheme.includes(activeTheme);
        const materialMatch = activeMaterial === 'all' || itemMaterial.includes(activeMaterial);

        if (themeMatch && materialMatch) {
          card.style.display = 'flex';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      if (resultCount) {
        resultCount.textContent = `${visibleCount} ${visibleCount === 1 ? 'Design Suite' : 'Design Suites'} Found`;
      }
    }

    themeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        themeButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeTheme = btn.dataset.filterTheme;
        filterProducts();
      });
    });

    materialButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        materialButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeMaterial = btn.dataset.filterMaterial;
        filterProducts();
      });
    });
  }

  // --- Blog Articles Filtering & Search ---
  function initBlogFilters() {
    const blogCards = document.querySelectorAll('.blog-card-item');
    const categoryButtons = document.querySelectorAll('[data-blog-category]');
    const searchInput = document.getElementById('blog-search-input');

    if (!blogCards.length) return;

    let activeCategory = 'all';
    let searchQuery = '';

    function filterBlog() {
      blogCards.forEach(card => {
        const category = (card.dataset.category || '').toLowerCase();
        const title = (card.querySelector('.card-title')?.textContent || '').toLowerCase();
        const excerpt = (card.querySelector('.card-desc')?.textContent || '').toLowerCase();

        const matchesCategory = activeCategory === 'all' || category === activeCategory;
        const matchesSearch = !searchQuery || title.includes(searchQuery) || excerpt.includes(searchQuery);

        if (matchesCategory && matchesSearch) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    }

    categoryButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        categoryButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeCategory = btn.dataset.blogCategory.toLowerCase();
        filterBlog();
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.trim().toLowerCase();
        filterBlog();
      });
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    initProductFilters();
    initBlogFilters();
  });
})();
