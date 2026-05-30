/* ============================================================
   NSCA-CPT 学习工具箱 — 章节内容加载器
   通过动态 script 标签加载 data/chXX.js 文件
   兼容 file:// 协议，无需本地服务器
   ============================================================ */

const ChapterLoader = (() => {
  'use strict';

  /**
   * 从 URL 参数中获取章节 ID
   * 例如 chapter.html?id=ch01 → 加载 data/ch01.js
   */
  function getChapterIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id') || null;
  }

  /**
   * 根据章节 ID 查找章节元数据
   */
  function getChapterMeta(chapterId) {
    return CHAPTERS_INDEX.find(ch => ch.id === chapterId) || null;
  }

  /**
   * 动态加载章节内容 JS 文件
   * 文件加载后会设置全局变量 CHAPTER_DATA
   */
  function loadChapterContent(chapterId) {
    return new Promise((resolve, reject) => {
      // 清除之前加载的内容
      window.CHAPTER_DATA = null;

      const script = document.createElement('script');
      script.src = `data/${chapterId}.js`;
      script.onload = () => {
        if (window.CHAPTER_DATA) {
          resolve(window.CHAPTER_DATA);
        } else {
          reject(new Error(`章节 ${chapterId} 内容未定义。请检查 data/${chapterId}.js 文件。`));
        }
      };
      script.onerror = () => {
        reject(new Error(`无法加载章节文件 data/${chapterId}.js。请确认文件存在。`));
      };
      document.head.appendChild(script);
    });
  }

  /**
   * 渲染章节详情页
   */
  async function renderChapterPage(containerId, headerId) {
    const container = document.getElementById(containerId);
    const headerContainer = document.getElementById(headerId);
    const chapterId = getChapterIdFromURL();

    if (!chapterId) {
      container.innerHTML = '<div class="empty-state">未指定章节ID。请从知识库主页选择章节。</div>';
      return;
    }

    const meta = getChapterMeta(chapterId);
    if (!meta) {
      container.innerHTML = `<div class="empty-state">未找到章节 "${chapterId}"。请检查章节ID。</div>`;
      return;
    }

    try {
      const content = await loadChapterContent(chapterId);

      // 渲染页头
      if (headerContainer) {
        headerContainer.innerHTML = `
          <div class="breadcrumb">
            <a href="index.html">📚 知识库</a>
            <span class="sep">›</span>
            <span>${meta.partTitle}</span>
            <span class="sep">›</span>
            <span>${meta.title}</span>
          </div>
          <h1>${meta.partIcon} ${meta.title}</h1>
          <div class="chapter-meta" style="margin-top:6px;">${meta.partTitle} · 共 ${CHAPTERS_INDEX.filter(c => c.part === meta.part).length} 章</div>`;
      }

      // 渲染内容
      container.innerHTML = content;

      // 章节导航（上一章 / 下一章）
      renderChapterNav(container, chapterId);
    } catch (err) {
      container.innerHTML = `
        <div class="card" style="text-align:center;padding:40px;">
          <p style="font-size:3rem;">📝</p>
          <p style="color:var(--text-muted);margin:12px 0;">${err.message}</p>
          <p style="color:var(--text-muted);font-size:0.85rem;">
            该章节内容尚未编写。你可以在 <code>data/${chapterId}.js</code> 中添加内容。
          </p>
          <p style="margin-top:16px;"><a href="index.html" class="btn btn-outline">← 返回知识库</a></p>
        </div>`;
    }
  }

  /**
   * 渲染上一章/下一章导航
   */
  function renderChapterNav(container, currentId) {
    const currentIdx = CHAPTERS_INDEX.findIndex(ch => ch.id === currentId);
    if (currentIdx < 0) return;

    const prev = currentIdx > 0 ? CHAPTERS_INDEX[currentIdx - 1] : null;
    const next = currentIdx < CHAPTERS_INDEX.length - 1 ? CHAPTERS_INDEX[currentIdx + 1] : null;

    const navHTML = `
      <div style="display:flex;justify-content:space-between;margin-top:32px;padding-top:20px;border-top:1px solid var(--border-light);gap:12px;">
        ${prev ? `<a href="chapter.html?id=${prev.id}" class="btn btn-outline">← ${prev.title}</a>` : '<span></span>'}
        ${next ? `<a href="chapter.html?id=${next.id}" class="btn btn-outline">${next.title} →</a>` : '<span></span>'}
      </div>`;

    container.insertAdjacentHTML('beforeend', navHTML);
  }

  /**
   * 更新收藏按钮状态
   */
  function updateFavButton(buttonId, chapterId, chapterTitle) {
    const btn = document.getElementById(buttonId);
    if (!btn) return;
    const isFav = Shared.isFavorited(chapterId);
    btn.textContent = isFav ? '⭐ 已收藏' : '☆ 收藏本章';
    btn.className = 'fav-btn-large' + (isFav ? ' active' : '');
    btn.onclick = () => {
      const added = Shared.toggleFavorite(chapterId, chapterTitle);
      btn.textContent = added ? '⭐ 已收藏' : '☆ 收藏本章';
      btn.className = 'fav-btn-large' + (added ? ' active' : '');
    };
  }

  return { getChapterIdFromURL, getChapterMeta, renderChapterPage, updateFavButton };
})();
