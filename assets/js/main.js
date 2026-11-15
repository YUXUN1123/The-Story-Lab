/**
 * THE STORY LAB（事物探索研究所）
 * main.js — Core Client-side Dynamic Engine
 * Theme: French Romantic Vintage Editorial
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. 動態路徑解析（確保在根目錄與 categories/ 子目錄中參照正常）
  const isSubdir = window.location.pathname.includes('/categories/') || 
                   window.location.pathname.includes('/articles/');
  const PATH_PREFIX = isSubdir ? '../' : '';

  // 2. 行動端選單切換開關
  initMobileNav();

  // 3. 資料庫載入與頁面渲染
  loadArticlesData(PATH_PREFIX);
});

/**
 * 載入集中式文章資料庫
 * @param {string} prefix - 路徑前綴（'' 或 '../'）
 */
async function loadArticlesData(prefix) {
  const dataEndpoint = `${prefix}data/articles.json`;

  try {
    const response = await fetch(dataEndpoint);
    if (!response.ok) {
      throw new Error(`HTTP 錯誤：${response.status}`);
    }
    const articles = await response.json();

    // 依發布日期排序（最新發布置於前）
    articles.sort((a, b) => new Date(b.publish_date) - new Date(a.publish_date));

    // 判斷當前頁面類型並執行渲染
    renderCurrentPage(articles, prefix);
  } catch (error) {
    console.warn('[THE STORY LAB] 資料庫讀取通知：', error.message);
    renderErrorFallback(prefix);
  }
}

/**
 * 依頁面容器渲染不同視圖
 */
function renderCurrentPage(articles, prefix) {
  // 首頁：焦點專題與最新文章
  const featuredContainer = document.getElementById('featured-post');
  const latestContainer = document.getElementById('latest-posts');

  if (featuredContainer || latestContainer) {
    renderHomePage(articles, featuredContainer, latestContainer, prefix);
    return;
  }

  // 分類獨立頁：分類文章清單
  const categoryContainer = document.getElementById('category-posts');
  if (categoryContainer) {
    const categorySlug = categoryContainer.dataset.category;
    renderCategoryPage(articles, categorySlug, categoryContainer, prefix);
  }
}

/**
 * 首頁專題與文章渲染邏輯
 */
function renderHomePage(articles, featuredContainer, latestContainer, prefix) {
  // 空白資料庫狀態處理
  if (!articles || articles.length === 0) {
    if (featuredContainer) {
      featuredContainer.innerHTML = createEmptyStateHTML(
        'EN PRÉPARATION · 專題策劃中',
        '首期探索專題籌備中',
        '研究員正在嚴謹整理文獻資料與查證歷史檔案。第一期深度專題手帳即將出刊，敬請期待。'
      );
    }
    if (latestContainer) {
      latestContainer.innerHTML = createEmptyStateHTML(
        'CURATING · 採集中',
        '暫無發布文章',
        '敬請期待第一期專題文章上線。'
      );
    }
    return;
  }

  // 1. 焦點專題（優先取 featured === true，若無則取最新第 1 篇）
  if (featuredContainer) {
    const featuredArticle = articles.find(a => a.featured) || articles[0];
    featuredContainer.innerHTML = createFeaturedCardHTML(featuredArticle, prefix);
  }

  // 2. 最新文章列表（最多顯示 6 篇）
  if (latestContainer) {
    const latestList = articles.slice(0, 6);
    latestContainer.innerHTML = latestList.map(a => createArticleCardHTML(a, prefix)).join('');
  }
}

/**
 * 分類頁面文章渲染邏輯
 */
function renderCategoryPage(articles, categorySlug, container, prefix) {
  const filtered = articles.filter(a => a.category === categorySlug);
  const countBadge = document.getElementById('category-count');
  if (countBadge) {
    countBadge.textContent = `${filtered.length} 篇研究`;
  }

  if (filtered.length === 0) {
    container.innerHTML = createEmptyStateHTML(
      'CURATION IN PROGRESS · 採集中',
      '本分類首期研究即將出刊',
      '我們正專注查證並撰寫該領域的深度故事，確保每篇內容皆具備可信文獻與獨特視角。'
    );
    return;
  }

  container.innerHTML = filtered.map(a => createArticleCardHTML(a, prefix)).join('');
}

/**
 * 建立標準文章卡片 HTML（法式相框手帳風格）
 */
function createArticleCardHTML(article, prefix) {
  const articleUrl = `${prefix}${article.url}`;
  const imageUrl = `${prefix}${article.cover_image}`;
  const categoryUrl = `${prefix}categories/${article.category}.html`;
  const theme = article.visual_theme || 'scrapbook';

  return `
    <article class="article-card" data-theme="${escapeHTML(theme)}">
      <a href="${articleUrl}" class="article-card-thumb" aria-label="${escapeHTML(article.title)}">
        <img src="${imageUrl}" alt="${escapeHTML(article.title)}" loading="lazy">
      </a>
      <div class="article-card-body">
        <div class="article-card-meta">
          <a href="${categoryUrl}" class="article-card-category">${escapeHTML(article.category_name || article.category)}</a>
          <span class="meta-dot">·</span>
          <span class="article-card-time">${escapeHTML(article.read_time || '5 MIN READ')}</span>
        </div>
        <h3 class="article-card-title">
          <a href="${articleUrl}">${escapeHTML(article.title)}</a>
        </h3>
        <p class="article-card-summary">${escapeHTML(article.summary)}</p>
        <div class="article-card-footer">
          <span class="article-card-date">${escapeHTML(article.publish_date)}</span>
          <a href="${articleUrl}" class="category-card-link" style="font-size: 0.825rem;">Lire l'histoire →</a>
        </div>
      </div>
    </article>
  `;
}

/**
 * 建立首頁大版面特選專題卡片 HTML（Grand Thème）
 */
function createFeaturedCardHTML(article, prefix) {
  const articleUrl = `${prefix}${article.url}`;
  const imageUrl = `${prefix}${article.cover_image}`;
  const categoryUrl = `${prefix}categories/${article.category}.html`;
  const theme = article.visual_theme || 'scrapbook';

  return `
    <article class="featured-card" data-theme="${escapeHTML(theme)}">
      <a href="${articleUrl}" class="featured-card-thumb" aria-label="${escapeHTML(article.title)}">
        <img src="${imageUrl}" alt="${escapeHTML(article.title)}" loading="eager">
      </a>
      <div class="featured-card-body">
        <div class="featured-badge">
          <span class="ribbon-bow-icon" style="width: 20px; height: 14px;"></span>
          <span>GRAND THÈME · 本期特選專題</span>
        </div>
        <div class="article-card-meta">
          <a href="${categoryUrl}" class="article-card-category">${escapeHTML(article.category_name || article.category)}</a>
          <span class="meta-dot">·</span>
          <span>${escapeHTML(article.publish_date)}</span>
          <span class="meta-dot">·</span>
          <span>${escapeHTML(article.read_time || '5 MIN READ')}</span>
        </div>
        <h2 class="featured-title">
          <a href="${articleUrl}">${escapeHTML(article.title)}</a>
        </h2>
        <p class="featured-summary">${escapeHTML(article.summary)}</p>
        <div>
          <a href="${articleUrl}" class="category-card-link" style="font-size: 1rem;">
            Feuilleter l'histoire · 深入探索故事背後
          </a>
        </div>
      </div>
    </article>
  `;
}

/**
 * 建立法式浪漫復古空白狀態 HTML
 */
function createEmptyStateHTML(badgeText, title, desc) {
  return `
    <div class="empty-state" style="grid-column: 1 / -1;">
      <span class="empty-state-badge">${escapeHTML(badgeText)}</span>
      <h3 class="empty-state-title">${escapeHTML(title)}</h3>
      <p class="empty-state-desc">${escapeHTML(desc)}</p>
    </div>
  `;
}

/**
 * 行動端選單功能綁定
 */
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      navLinks.classList.toggle('is-open');
      const expanded = navLinks.classList.contains('is-open');
      toggleBtn.setAttribute('aria-expanded', expanded);
    });
  }
}

/**
 * 錯誤容錯提示
 */
function renderErrorFallback(prefix) {
  const latestContainer = document.getElementById('latest-posts');
  if (latestContainer) {
    latestContainer.innerHTML = createEmptyStateHTML(
      'NOTICE · 訊息',
      '資料讀取中',
      '目前正在連接本所文獻資料庫，請稍候重整或至「關於本所」了解更多。'
    );
  }
}

/**
 * XSS 字串跳脫防護輔助工具
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
