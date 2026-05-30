/* ============================================================
   NSCA-CPT 学习工具箱 — 学习日志页
   localStorage存储，测验自动记录 + 手动时间记录
   ============================================================ */

const LogPage = (() => {
  'use strict';

  function render() {
    const list = document.getElementById('log-list');
    const empty = document.getElementById('log-empty');
    const logs = Shared.getLogs().slice(0, 10);

    if (logs.length === 0) {
      list.innerHTML = ''; empty.style.display = 'block'; return;
    }
    empty.style.display = 'none';
    list.innerHTML = logs.map(l => {
      const date = Shared.formatDate(l.date);
      if (l.type === 'quiz') return `<div class="log-item"><span>📝 测验得分：${l.score}/${l.total}</span><span style="color:var(--text-muted);font-size:0.85rem;">${date}</span></div>`;
      if (l.type === 'study') return `<div class="log-item"><span>⏱ 学习时长：${l.duration} 分钟</span><span style="color:var(--text-muted);font-size:0.85rem;">${date}</span></div>`;
      return '';
    }).join('');
  }

  function init() {
    render();
    document.getElementById('log-save').addEventListener('click', () => {
      const min = parseInt(document.getElementById('study-min').value);
      if (isNaN(min) || min <= 0) { alert('请输入有效的学习时长（正数分钟）。'); return; }
      Shared.saveStudyDuration(min);
      document.getElementById('study-min').value = '';
      render();
    });
    document.getElementById('log-clear').addEventListener('click', () => {
      if (!confirm('确定清除所有学习记录？此操作不可撤销。')) return;
      Shared.clearLogs();
      render();
    });
  }

  return { init };
})();
