/* ============================================================
   NSCA-CPT 学习工具箱 — 计算器模块
   1RM 计算器(Epley公式) + 目标心率计算器(220-age)
   ============================================================ */

const Calculator = (() => {
  'use strict';

  function init() {
    // Tab switching
    document.querySelectorAll('.calc-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.calc-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.calc-panel').forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById('calc-' + tab.dataset.calc).classList.add('active');
      });
    });

    document.getElementById('rm-go').addEventListener('click', calc1RM);
    document.getElementById('hr-go').addEventListener('click', calcHR);
  }

  function calc1RM() {
    const errEl = document.getElementById('rm-err');
    const resEl = document.getElementById('rm-res');
    errEl.classList.remove('show'); resEl.classList.remove('show');

    const w = parseFloat(document.getElementById('rm-w').value);
    const r = parseInt(document.getElementById('rm-r').value);

    if (isNaN(w) || isNaN(r) || w <= 0 || r <= 0) {
      errEl.textContent = '请输入有效的正数。';
      errEl.classList.add('show'); return;
    }
    if (r > 30) {
      errEl.textContent = '建议重复次数不超过30次，Epley公式在低次数区间最准确。';
      errEl.classList.add('show'); return;
    }

    document.getElementById('rm-val').textContent = (w * (1 + r / 30)).toFixed(1) + ' kg';
    resEl.classList.add('show');
  }

  function calcHR() {
    const errEl = document.getElementById('hr-err');
    const resEl = document.getElementById('hr-res');
    errEl.classList.remove('show'); resEl.classList.remove('show');

    const age = parseInt(document.getElementById('hr-age').value);
    const int = document.getElementById('hr-int').value;

    if (isNaN(age) || age <= 0 || age > 120) {
      errEl.textContent = '请输入有效的年龄（1-120）。';
      errEl.classList.add('show'); return;
    }
    if (!int) {
      errEl.textContent = '请选择强度百分比。';
      errEl.classList.add('show'); return;
    }

    const max = 220 - age;
    const [lo, hi] = int.split('-').map(Number);
    const zones = {
      '50-60': { n: '热身/恢复区', c: '#28a745' },
      '60-70': { n: '燃脂/有氧区', c: '#17a2b8' },
      '70-80': { n: '心肺强化区', c: '#ff6b35' },
      '80-90': { n: '高强度训练区', c: '#dc3545' }
    };
    const z = zones[int];
    document.getElementById('hr-val').textContent = `${Math.round(max*lo/100)} - ${Math.round(max*hi/100)} bpm`;
    document.getElementById('hr-label').textContent = `最大心率 ${max} bpm · 目标区间 ${lo}%-${hi}%`;
    const ze = document.getElementById('hr-zone');
    ze.textContent = '🏷 ' + z.n; ze.style.background = z.c;
    resEl.classList.add('show');
  }

  return { init };
})();
