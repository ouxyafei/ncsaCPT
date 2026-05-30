/* ============================================================
   NSCA-CPT 学习工具箱 — 共享脚本
   功能：深色模式切换、导航栏生成、localStorage 封装、收藏管理
   ============================================================ */

const Shared = (() => {
  'use strict';

  /* ---------- localStorage 封装 ---------- */
  const STORAGE_KEYS = { theme: 'nsca_theme', favorites: 'nsca_favorites', logs: 'nsca_study_log' };

  function loadJSON(key, fallback = null) {
    try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
    catch (e) { return fallback; }
  }
  function saveJSON(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {}
  }

  /* ---------- 深色模式 ---------- */
  function initTheme() {
    const saved = loadJSON(STORAGE_KEYS.theme, 'light');
    applyTheme(saved);
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.theme-toggle');
      if (!btn) return;
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      saveJSON(STORAGE_KEYS.theme, next);
    });
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const btn = document.querySelector('.theme-toggle');
    if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
    if (btn) btn.title = theme === 'dark' ? '切换浅色模式' : '切换深色模式';
  }

  /* ---------- 导航栏生成 ---------- */
  function generateNav(currentPage) {
    const pages = [
      { id: 'index',     label: '📚 知识库',    href: 'index.html' },
      { id: 'flashcards',label: '🃏 闪卡',      href: 'flashcards.html' },
      { id: 'quiz',      label: '📝 测验',      href: 'quiz.html' },
      { id: 'exercises', label: '🏋️ 动作库',    href: 'exercises.html' },
      { id: 'calculator',label: '🔢 计算器',    href: 'calculator.html' },
      { id: 'favorites', label: '⭐ 收藏',      href: 'favorites.html' },
      { id: 'log',       label: '📊 日志',      href: 'log.html' }
    ];

    let linksHTML = pages.map(p =>
      `<a href="${p.href}" class="nav-link${p.id === currentPage ? ' active' : ''}">${p.label}</a>`
    ).join('');

    return `
      <nav class="top-nav">
        <a href="index.html" class="nav-brand">NSCA-CPT 工具箱</a>
        <div class="nav-links">${linksHTML}</div>
        <button class="theme-toggle" title="切换深色模式">🌙</button>
      </nav>`;
  }

  /* ---------- 收藏管理 ---------- */
  function getFavorites() { return loadJSON(STORAGE_KEYS.favorites, []); }

  function isFavorited(chapterId) {
    const favs = getFavorites();
    return favs.includes(chapterId);
  }

  function toggleFavorite(chapterId, chapterTitle) {
    const favs = getFavorites();
    const idx = favs.findIndex(f => f.id === chapterId);
    if (idx >= 0) { favs.splice(idx, 1); }
    else { favs.push({ id: chapterId, title: chapterTitle, date: new Date().toISOString() }); }
    saveJSON(STORAGE_KEYS.favorites, favs);
    return !(idx >= 0); // true = added, false = removed
  }

  function removeFavorite(chapterId) {
    let favs = getFavorites();
    favs = favs.filter(f => f.id !== chapterId);
    saveJSON(STORAGE_KEYS.favorites, favs);
    return favs;
  }

  /* ---------- 学习日志 ---------- */
  function getLogs() { return loadJSON(STORAGE_KEYS.logs, []); }

  function saveQuizResult(score, total) {
    const logs = getLogs();
    logs.unshift({ type: 'quiz', date: new Date().toISOString(), score, total });
    if (logs.length > 100) logs.length = 100;
    saveJSON(STORAGE_KEYS.logs, logs);
  }

  function saveStudyDuration(minutes) {
    const logs = getLogs();
    logs.unshift({ type: 'study', date: new Date().toISOString(), duration: minutes });
    if (logs.length > 100) logs.length = 100;
    saveJSON(STORAGE_KEYS.logs, logs);
  }

  function clearLogs() {
    localStorage.removeItem(STORAGE_KEYS.logs);
  }

  function formatDate(iso) {
    const d = new Date(iso);
    const pad = n => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }

  /* ---------- 初始化 ---------- */
  function init(currentPage) {
    // 注入导航栏
    const navContainer = document.getElementById('top-nav-container');
    if (navContainer) {
      navContainer.innerHTML = generateNav(currentPage);
    }
    // 初始化深色模式
    initTheme();
  }

  return {
    init, getFavorites, isFavorited, toggleFavorite, removeFavorite,
    getLogs, saveQuizResult, saveStudyDuration, clearLogs, formatDate,
    STORAGE_KEYS
  };
})();
