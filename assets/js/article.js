/**
 * THE STORY LAB（事物探索研究所）
 * article.js — Article Specific Enhancements
 * Handles reading progress tracking, automatic theme application, and related story recommendations.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. 自動套用文章視覺風格（依 visual_theme 或預設 scrapbook）
  initArticleTheme();

  // 2. 閱讀進度條監聽
  initReadingProgress();

  // 3. 行動端選單綁定
  initMobileNav();

  // 4. 相關文章推薦自動載入
  loadRelatedArticles();
});

/**
 * 依據 articles.json 宣告的 visual_theme 自動設定 data-theme
 */
async function initArticleTheme() {
  if (document.body.hasAttribute('data-theme')) {
    return; // HTML 標籤已明確指定則優先使用
  }

  const pathParts = window.location.pathname.split('/');
  const currentFileName = pathParts[pathParts.length - 1] || '';
  const currentSlug = currentFileName.replace('.html', '');

  try {
    const response = await fetch('../data/articles.json');
    if (!response.ok) {
      document.body.setAttribute('data-theme', 'scrapbook');
      return;
    }
    const articles = await response.json();
    const currentArticle = articles.find(a => a.slug === currentSlug);
    const theme = (currentArticle && currentArticle.visual_theme) ? currentArticle.visual_theme : 'scrapbook';
    document.body.setAttribute('data-theme', theme);
  } catch (err) {
    document.body.setAttribute('data-theme', 'scrapbook');
  }
}

/**
 * 捲動時計算並更新閱讀進度條
 */
function initReadingProgress() {
  const progressBar = document.getElementById('read-progress');
  if (!progressBar) return;

  const updateProgress = () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight <= 0) {
      progressBar.style.width = '0%';
      return;
    }
    const currentScroll = window.scrollY;
    const progress = Math.min(100, Math.max(0, (currentScroll / totalHeight) * 100));
    progressBar.style.width = `${progress}%`;
  };

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
}

/**
 * 載入相關文章推薦
 */
async function loadRelatedArticles() {
  const container = document.getElementById('related-posts');
  if (!container) return;

  // 判斷當前文章 slug（從 URL 路徑解析）
  const pathParts = window.location.pathname.split('/');
  const currentFileName = pathParts[pathParts.length - 1] || '';
  const currentSlug = currentFileName.replace('.html', '');

  try {
    const response = await fetch('../data/articles.json');
    if (!response.ok) return;

    const articles = await response.json();
    const currentArticle = articles.find(a => a.slug === currentSlug);

    let relatedList = [];

    // 優先策略 1：如果文章有手動指定 related_articles
    if (currentArticle && Array.isArray(currentArticle.related_articles) && currentArticle.related_articles.length > 0) {
      relatedList = articles.filter(a => currentArticle.related_articles.includes(a.slug));
    }

    // 備援策略 2：若指定不足 2 篇，自動抓同分類最新文章（排除自身）
    if (relatedList.length < 2 && currentArticle) {
      const categoryMatches = articles.filter(a => a.category === currentArticle.category && a.slug !== currentSlug);
      relatedList = [...relatedList, ...categoryMatches].slice(0, 2);
    }

    // 備援策略 3：若仍無，抓全站其他最新文章
    if (relatedList.length === 0) {
      relatedList = articles.filter(a => a.slug !== currentSlug).slice(0, 2);
    }

    // 若無可推薦文章，則隱藏推薦區塊
    if (relatedList.length === 0) {
      const parentSection = container.closest('.related-articles-section');
      if (parentSection) {
        parentSection.style.display = 'none';
      }
      return;
    }

    // 渲染卡片（文章頁位於 articles/，因此相對於根目錄需加上 ../）
    container.innerHTML = relatedList.map(a => `
      <article class="article-card" data-theme="${escapeHTML(a.visual_theme || 'scrapbook')}">
        <a href="../${a.url}" class="article-card-thumb" aria-label="${escapeHTML(a.title)}">
          <img src="../${a.cover_image}" alt="${escapeHTML(a.title)}" loading="lazy">
        </a>
        <div class="article-card-body">
          <div class="article-card-meta">
            <span class="article-card-category">${escapeHTML(a.category_name || a.category)}</span>
            <span class="meta-dot">·</span>
            <span>${escapeHTML(a.read_time || '5 MIN READ')}</span>
          </div>
          <h4 class="article-card-title" style="font-size: 1.1rem;">
            <a href="../${a.url}">${escapeHTML(a.title)}</a>
          </h4>
          <p class="article-card-summary" style="-webkit-line-clamp: 2;">${escapeHTML(a.summary)}</p>
        </div>
      </article>
    `).join('');

  } catch (err) {
    console.warn('[THE STORY LAB] 相關文章載入略過：', err.message);
  }
}

/**
 * 行動端導覽列
 */
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      navLinks.classList.toggle('is-open');
    });
  }
}

/**
 * XSS 字串跳脫
 */
function escapeHTML(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
