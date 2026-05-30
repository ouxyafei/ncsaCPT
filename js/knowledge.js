/* ============================================================
   NSCA-CPT 学习工具箱 — 知识库交互
   手风琴展开/折叠、快速索引跳转、收藏星标切换
   ============================================================ */

const KnowledgeModule = (() => {
  'use strict';

  /* ---------- 渲染手风琴 ---------- */
  function renderAccordion(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // 按 part 分组
    const parts = {};
    CHAPTERS_INDEX.forEach(ch => {
      if (!parts[ch.part]) {
        parts[ch.part] = { title: ch.partTitle, icon: ch.partIcon, color: ch.color, chapters: [] };
      }
      parts[ch.part].chapters.push(ch);
    });

    let html = '';
    let isFirst = true;
    Object.keys(parts).forEach(partKey => {
      const part = parts[partKey];
      html += `
        <div class="accordion-part" data-color="${part.color}" id="part-${partKey}">
          <button class="accordion-part-header${isFirst ? ' open' : ''}" data-part="${partKey}" aria-expanded="${isFirst ? 'true' : 'false'}">
            <span class="part-icon">${part.icon}</span>
            <span class="part-label">${part.title}</span>
            <span class="arrow">▼</span>
          </button>
          <div class="accordion-part-body${isFirst ? ' open' : ''}" data-part-body="${partKey}">
            <div class="chapter-list">`;

      part.chapters.forEach(ch => {
        const favClass = Shared.isFavorited(ch.id) ? ' active' : '';
        const favIcon = Shared.isFavorited(ch.id) ? '⭐' : '☆';
        html += `
              <a href="chapter.html?id=${ch.id}" class="chapter-link">
                <span class="chapter-num">第${ch.id.replace('ch','')}章</span>
                <span class="chapter-title">${ch.title.replace(/^第\d+章\s*/, '')}</span>
                <button class="fav-star-inline${favClass}" data-chapter-id="${ch.id}" data-chapter-title="${ch.title}" title="收藏" onclick="event.preventDefault(); event.stopPropagation();">${favIcon}</button>
                <span class="chapter-arrow">→</span>
              </a>`;
      });

      html += `
            </div>
          </div>
        </div>`;
      isFirst = false;
    });

    container.innerHTML = html;
  }

  /* ---------- 事件绑定（事件委托） ---------- */
  function bindEvents(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // 手风琴标题点击
    container.addEventListener('click', (e) => {
      const header = e.target.closest('.accordion-part-header');
      if (header) {
        const partKey = header.dataset.part;
        const body = container.querySelector(`[data-part-body="${partKey}"]`);
        const isOpen = body.classList.contains('open');
        body.classList.toggle('open');
        header.classList.toggle('open');
        header.setAttribute('aria-expanded', !isOpen);
        return;
      }

      // 收藏星标点击
      const starBtn = e.target.closest('.fav-star-inline');
      if (starBtn) {
        const chId = starBtn.dataset.chapterId;
        const chTitle = starBtn.dataset.chapterTitle;
        const added = Shared.toggleFavorite(chId, chTitle);
        starBtn.classList.toggle('active', added);
        starBtn.textContent = added ? '⭐' : '☆';
      }
    });
  }

  /* ---------- 快速索引栏 ---------- */
  function renderQuickIndex(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const parts = [];
    const seen = new Set();
    CHAPTERS_INDEX.forEach(ch => {
      if (!seen.has(ch.part)) {
        seen.add(ch.part);
        parts.push({ key: ch.part, icon: ch.partIcon, title: ch.partTitle });
      }
    });

    container.innerHTML = parts.map(p =>
      `<button class="quick-index-btn" data-target="part-${p.key}">${p.icon} ${p.title}</button>`
    ).join('');

    container.addEventListener('click', (e) => {
      const btn = e.target.closest('.quick-index-btn');
      if (!btn) return;
      const targetId = btn.dataset.target;
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // 自动展开该部分
        const body = target.querySelector('[data-part-body]');
        const header = target.querySelector('.accordion-part-header');
        if (body && !body.classList.contains('open')) {
          body.classList.add('open');
          if (header) { header.classList.add('open'); header.setAttribute('aria-expanded', 'true'); }
        }
      }
    });
  }

  /* ---------- 统计信息 ---------- */
  function renderStats(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const totalChapters = CHAPTERS_INDEX.length;
    const favCount = Shared.getFavorites().length;
    const learnProgress = totalChapters > 0 ? Math.round((favCount / totalChapters) * 100) : 0;
    container.innerHTML = `
      <span class="badge">📖 ${totalChapters} 章</span>
      <span class="badge">⭐ 已收藏 ${favCount} 章</span>
      <span class="badge">📊 学习进度 ${learnProgress}%</span>`;
  }

  /* ---------- 初始化 ---------- */
  function init() {
    renderQuickIndex('quick-index-bar');
    renderAccordion('knowledge-accordion');
    bindEvents('knowledge-accordion');
    renderStats('knowledge-stats');
  }

  return { init, renderAccordion, bindEvents };
})();
