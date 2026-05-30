/* ============================================================
   NSCA-CPT 学习工具箱 — 收藏页
   显示所有收藏的章节，支持取消收藏和跳转
   ============================================================ */

const FavoritesPage = (() => {
  'use strict';

  function render() {
    const container = document.getElementById('fav-list');
    const favs = Shared.getFavorites();

    if (favs.length === 0) {
      container.innerHTML = '<div class="empty-state">⭐<br>暂无收藏章节<br>在知识库中浏览章节并点击 ☆ 即可添加收藏</div>';
      return;
    }

    container.innerHTML = favs.map(f => {
      // 从章节索引中查找完整标题
      const meta = CHAPTERS_INDEX.find(ch => ch.id === f.id);
      const title = meta ? meta.title : (f.title || f.id);
      const partInfo = meta ? `${meta.partIcon} ${meta.partTitle}` : '';
      return `
        <div class="fav-item" data-chapter-id="${f.id}">
          <span class="fav-icon">⭐</span>
          <div class="fav-info">
            <a href="chapter.html?id=${f.id}" class="fav-title">${title}</a>
            <div class="fav-date">${partInfo} · ${Shared.formatDate(f.date)}</div>
          </div>
          <button class="fav-remove" title="取消收藏">✕</button>
        </div>`;
    }).join('');

    // 取消收藏
    container.addEventListener('click', (e) => {
      const removeBtn = e.target.closest('.fav-remove');
      if (!removeBtn) return;
      const item = removeBtn.closest('.fav-item');
      const chId = item.dataset.chapterId;
      Shared.removeFavorite(chId);
      render(); // 重新渲染
    });
  }

  function init() { render(); }

  return { init };
})();
