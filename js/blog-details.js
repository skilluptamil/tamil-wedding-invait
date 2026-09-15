/**
 * AURA & VELLUM ATELIER — DYNAMIC BLOG DETAILS CONTROLLER
 * Reads ?id=... from the URL, extracts the exact blog data, and renders matching title, image, and full content.
 */

(function () {
  'use strict';

  function getQueryParam(key) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(key);
  }

  function renderBlogDetails() {
    if (typeof BLOG_POSTS === 'undefined') {
      console.warn('BLOG_POSTS data registry not loaded.');
      return;
    }

    const requestedId = getQueryParam('id') || 'art-wax-seals';
    const post = BLOG_POSTS[requestedId] || BLOG_POSTS['art-wax-seals'];

    if (!post) {
      console.error('Blog post not found for ID:', requestedId);
      return;
    }

    // 1. Update Document Title and Meta Description
    document.title = `${post.title} — Aura & Vellum Journal`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', post.lead || post.title);
    }

    // 2. Update Breadcrumb Category
    const breadcrumbCat = document.getElementById('blog-detail-category-breadcrumb');
    if (breadcrumbCat) {
      breadcrumbCat.textContent = post.category;
    }

    // 3. Update Main Title
    const titleEl = document.getElementById('blog-detail-title');
    if (titleEl) {
      titleEl.textContent = post.title;
    }

    // 4. Update Header Meta (Author, Date, Read Time)
    const authorEl = document.getElementById('blog-detail-author');
    if (authorEl) {
      authorEl.textContent = post.author?.name || 'Genevieve Beauchamp';
    }
    const dateEl = document.getElementById('blog-detail-date');
    if (dateEl) {
      dateEl.textContent = post.date;
    }
    const readTimeEl = document.getElementById('blog-detail-read-time');
    if (readTimeEl) {
      readTimeEl.textContent = post.readTime;
    }

    // 5. Update Hero Image (EXACT SAME IMAGE & ALT)
    const heroImg = document.getElementById('blog-detail-hero-img');
    if (heroImg) {
      heroImg.src = post.image;
      heroImg.alt = post.imageAlt || post.title;
    }

    // 6. Update Lead Paragraph
    const leadEl = document.getElementById('blog-detail-lead');
    if (leadEl) {
      leadEl.textContent = post.lead;
    }

    // 7. Update Article Body Content
    const bodyContainer = document.getElementById('blog-detail-body');
    if (bodyContainer && post.sections) {
      let bodyHtml = '';
      post.sections.forEach(section => {
        if (section.heading) {
          bodyHtml += `<h2 style="font-size: 1.85rem; color: var(--text-primary); margin-top: 2.25rem; margin-bottom: 1rem;">${section.heading}</h2>`;
        }
        if (section.paragraphs && Array.isArray(section.paragraphs)) {
          section.paragraphs.forEach(p => {
            // Support markdown-style bold
            const formattedP = p.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            bodyHtml += `<p style="margin-bottom: 1.5rem; line-height: 1.75; font-size: 1.05rem;">${formattedP}</p>`;
          });
        }
        if (section.quote) {
          bodyHtml += `
          <blockquote style="margin: 2.25rem 0; padding: 1.75rem 2rem; border-inline-start: 4px solid var(--gold-primary); background: var(--bg-secondary); border-radius: 0 var(--radius-md) var(--radius-md) 0; font-family: var(--font-serif); font-size: 1.35rem; color: var(--text-primary); font-style: italic; line-height: 1.6;">
            ${section.quote}
          </blockquote>
          `;
        }
        if (section.takeaways && Array.isArray(section.takeaways)) {
          bodyHtml += `
          <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1.75rem; margin: 2rem 0; box-shadow: var(--shadow-sm);">
            <h4 style="font-size: 1.15rem; color: var(--gold-primary); margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.5rem;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              Key Atelier Recommendations
            </h4>
            <ul style="margin: 0; padding-inline-start: 1.25rem; display: flex; flex-direction: column; gap: 0.6rem; color: var(--text-secondary); font-size: 0.95rem;">
              ${section.takeaways.map(t => `<li>${t}</li>`).join('')}
            </ul>
          </div>
          `;
        }
      });

      // Social Share Bar
      bodyHtml += `
      <div style="border-top: 1px solid var(--border-light); border-bottom: 1px solid var(--border-light); padding: 1.5rem 0; margin-top: 3.5rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
        <span style="font-size: 0.9rem; font-weight: 600; color: var(--text-primary);">Share This Editorial:</span>
        <div style="display: flex; gap: 0.75rem;">
          <a href="#" class="btn-icon" aria-label="Share Editorial"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" x2="12" y1="8" y2="16"/><line x1="8" x2="16" y1="12" y2="12"/></svg></a>
          <a href="#" class="btn-icon" aria-label="Share on Pinterest"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2C6.5 2 2 6.5 2 12c0 4.2 2.6 7.8 6.3 9.3-.1-.8-.2-2 .04-2.9.2-.8 1.4-6 1.4-6s-.4-.7-.4-1.8c0-1.7 1-3 2.2-3 1 0 1.5.8 1.5 1.7 0 1-.7 2.6-1 4-.3 1.2.6 2.2 1.8 2.2 2.1 0 3.7-2.3 3.7-5.5 0-2.9-2.1-4.9-5-4.9-3.4 0-5.5 2.6-5.5 5.3 0 1 .4 2.1.9 2.7.1.1.1.2.08.3-.08.3-.26 1.1-.3 1.2-.05.2-.17.25-.38.15-1.4-.65-2.3-2.7-2.3-4.3 0-3.5 2.6-6.8 7.4-6.8 3.9 0 7 2.8 7 6.5 0 3.9-2.5 7.1-5.9 7.1-1.2 0-2.3-.6-2.6-1.3l-.7 2.7c-.3 1-1 2.3-1.5 3.1 1.1.3 2.3.5 3.5.5 5.5 0 10-4.5 10-10S17.5 2 12 2z"/></svg></a>
        </div>
      </div>
      `;

      bodyContainer.innerHTML = bodyHtml;
    }

    // 8. Update Sidebar Author Info
    const sideAvatar = document.getElementById('blog-detail-sidebar-avatar');
    if (sideAvatar && post.author) {
      sideAvatar.src = post.author.avatar;
      sideAvatar.alt = post.author.name;
    }
    const sideName = document.getElementById('blog-detail-sidebar-name');
    if (sideName && post.author) {
      sideName.textContent = post.author.name;
    }
    const sideRole = document.getElementById('blog-detail-sidebar-role');
    if (sideRole && post.author) {
      sideRole.textContent = post.author.role;
    }
    const sideBio = document.getElementById('blog-detail-sidebar-bio');
    if (sideBio && post.author) {
      sideBio.textContent = post.author.bio;
    }

    // 9. Render Dynamic 4-Column Related Stories Grid
    const relatedContainer = document.getElementById('blog-detail-related-grid');
    if (relatedContainer) {
      const relatedIds = post.relatedIds || Object.keys(BLOG_POSTS).filter(id => id !== post.id).slice(0, 4);
      let relatedHtml = '';

      relatedIds.slice(0, 4).forEach(relId => {
        const relPost = BLOG_POSTS[relId];
        if (relPost) {
          relatedHtml += `
          <article class="luxury-card blog-card-item">
            <a href="blog-details.html?id=${relPost.id}" class="card-img-wrap" aria-label="Read ${relPost.title}">
              <img src="${relPost.image}" alt="${relPost.imageAlt || relPost.title}">
              <span class="card-badge-floating">${relPost.category}</span>
            </a>
            <div class="card-body">
              <span class="card-eyebrow">${relPost.eyebrow || relPost.category}</span>
              <h3 class="card-title">
                <a href="blog-details.html?id=${relPost.id}">${relPost.title}</a>
              </h3>
              <p class="card-desc">
                ${relPost.lead ? (relPost.lead.substring(0, 105) + '...') : ''}
              </p>
              <div class="card-footer">
                <span style="font-size: 0.8rem; color: var(--text-muted);">${relPost.date} &bull; ${relPost.readTime}</span>
                <a href="blog-details.html?id=${relPost.id}" class="btn-link-luxury">Read &rarr;</a>
              </div>
            </div>
          </article>
          `;
        }
      });

      relatedContainer.innerHTML = relatedHtml;
    }
  }

  document.addEventListener('DOMContentLoaded', renderBlogDetails);
  // Also run immediately in case DOM is already parsed
  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    renderBlogDetails();
  }
})();
