/* ============================================================
   NSCA-CPT 学习工具箱 — 闪卡模块
   40个NSCA核心术语，3D翻转动画，随机抽取 + 历史回溯
   ============================================================ */

const Flashcards = (() => {
  'use strict';

  /* ---- 闪卡数据 ---- */
  const DATA = [
    {term:'DOMS',def:'延迟性肌肉酸痛：运动后12-72小时出现的肌肉酸痛，由离心负荷过大或不习惯的训练引起，并非乳酸堆积所致。'},{term:'VO₂max',def:'最大摄氧量：人体在高强度运动中每公斤体重每分钟能利用的最大氧气量(ml/kg/min)。评估心肺耐力的金标准。'},{term:'乳酸阈',def:'运动中血乳酸开始系统性积累的强度临界点。反映乳酸产生与清除的平衡被打破，是预测耐力表现的重要指标。'},{term:'解剖适应期',def:'训练初期（约4-8周）以神经适应性为主——动作模式改善、运动单位同步性提高——而非肌纤维显著增粗。'},{term:'向心收缩',def:'肌肉收缩时长度缩短。例如：肱二头肌弯举的举起阶段。'},{term:'离心收缩',def:'肌肉在收缩中主动拉长（抵抗外力）。例如：深蹲下降阶段的股四头肌。DOMS的主要诱因。'},{term:'等长收缩',def:'肌肉产生张力但关节角度和肌肉长度不变。例如：平板支撑、握力维持。常用于康复早期和核心稳定训练。'},{term:'RM',def:'最大重复次数(Repetition Maximum)：在保持正确技术下，某一重量能完成的最高重复次数。'},{term:'Valsalva手法',def:'深吸气后闭住声门、收紧腹部，以增加胸腹腔内压力的技巧。用于大重量举起的脊柱稳定，禁用于高血压及心脏病患者。'},{term:'Borg RPE量表',def:'自觉用力强度评分(Borg Rating of Perceived Exertion)：范围6-20或0-10。6-20量表分数×10可近似对应心率。'},{term:'代谢当量(MET)',def:'安静坐位状态下的耗氧量，1 MET≈3.5ml/kg/min。用于评估和比较不同活动的强度。'},{term:'柔韧性',def:'单个关节或关节群在其活动范围(ROM)内移动的能力。受关节囊、韧带、肌腱、肌肉长度和神经系统影响。'},{term:'稳定性',def:'关节在负荷下维持或控制其位置和运动轨迹的能力。需要肌肉协同、神经肌肉控制和韧带支撑。'},{term:'SAID原则',def:'Specific Adaptation to Imposed Demands：身体会根据施加的特定刺激类型产生适应性变化。'},{term:'过度训练',def:'持续高强度训练+恢复不足导致的慢性表现下降，伴随生理心理症状：持续疲劳、失眠、易怒、免疫力下降。'},{term:'身体成分',def:'人体内脂肪组织和去脂体重的相对比例。评估方法：皮褶测量、DEXA、BIA、水下称重等。BMI不能直接反映身体成分。'},{term:'生物力学',def:'运用力学原理分析人体运动的科学。关键概念：杠杆系统、力臂、角速度。'},{term:'杠杆系统',def:'一级杠杆(EFL)：支点在中；二级杠杆(ELF)：阻力在中；三级杠杆(FEL)：力在中。人体大多数关节是三级杠杆。'},{term:'力偶',def:'两股或以上方向不同但合力产生纯旋转的力。如前锯肌与斜方肌协同使肩胛骨上旋。'},{term:'动作补偿',def:'身体无法以标准模式完成动作时，自动采用替代策略的偏差模式。如深蹲时脚跟抬起→腓肠肌代偿。'},{term:'相对强度',def:'以个人当前最大能力为参考的强度百分比（如%1RM或%HRmax），使不同基础的客户可比较训练负荷。'},{term:'训练量',def:'总的做功量，通常表示为组数×次数。管理疲劳和适应的重要变量。'},{term:'训练频率',def:'每周训练某一肌群或动作模式的次数。一般人群2-3次/周，同一肌群间隔48-72小时。'},{term:'容量负荷',def:'组数×次数×重量(kg)计算出的训练总量。用于追踪训练负担，建议周增幅5-10%。'},{term:'RICE原则',def:'Rest(休息)+Ice(冰敷)+Compression(加压)+Elevation(抬高)——急性软组织损伤传统处理方案。'},{term:'本体感觉',def:'身体感知自身关节位置、运动方向和速度的能力。由肌梭、高尔基腱器和关节感受器提供反馈。'},{term:'下交叉综合征',def:'腰椎前凸过度+骨盆前倾。过紧：髋屈肌+竖脊肌下段；过弱：腹直肌+臀大肌+腘绳肌。'},{term:'上交叉综合征',def:'头部前倾+圆肩+胸椎后凸。过紧：胸大/小肌+上斜方肌；过弱：深层颈屈肌+中下斜方肌。'},{term:'动态拉伸',def:'通过完整关节活动范围的可控动态运动进行拉伸，如高抬腿、腿摆动。适合运动前准备。'},{term:'静态拉伸',def:'将肌肉拉伸至末端位置并保持15-60秒。运动后执行可改善柔韧性。'},{term:'PNF拉伸',def:'本体感觉神经肌肉促进法：交替收缩(6秒)与放松后拉伸(10-30秒)，效率最高但需同伴辅助。'},{term:'心输出量',def:'CO = 每搏输出量(SV) × 心率(HR)。静息约5L/min，最大运动时可达20-40L/min。'},{term:'每搏输出量',def:'左心室每次收缩射出的血量。静息约70ml/次，运动时可达100-200ml/次。'},{term:'乳酸',def:'糖酵解的副产物，现已认识到是重要的中间代谢物和能量来源（乳酸穿梭机制），而非"导致酸痛的废物"。'},{term:'肌肥大',def:'肌肉横截面积增加的过程。三大机制：机械张力→mTOR通路；代谢压力；肌肉微创伤→修复超量恢复。'},{term:'金字塔训练',def:'训练课中逐步递增或递减重量/次数的策略。递增金字塔渐进热身；递减金字塔增加代谢压力。'},{term:'拮抗肌',def:'执行与主动肌相反关节动作的肌群。如弯举中：肱二头肌(主动肌)⇄肱三头肌(拮抗肌)。需平衡发展。'},{term:'核心',def:'人体中心区域的29块肌肉。功能：稳定脊柱→传递力量→保护内脏。训练三水平：稳定→力量→爆发。'},{term:'沃夫法则',def:'骨骼会根据施加在其上的力而重塑内部结构和外部形态。骨小梁排列方向与最大应力方向一致。'},{term:'运动单位',def:'一个α运动神经元及其支配的所有肌纤维。精细肌肉约10纤维/单位，大肌肉可达数百至上千。'}
  ];

  let cards = [], history = [], currentIndex = 0;

  function shuffle() {
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    history = []; currentIndex = 0;
  }

  function showCard(index) {
    if (index < 0 || index >= cards.length) return;
    currentIndex = index;
    const c = cards[index];
    document.getElementById('fc-term').textContent = c.term;
    document.getElementById('fc-def').textContent = c.def;
    document.getElementById('fc-inner').classList.remove('flipped');
    document.getElementById('fc-counter').textContent = `${index + 1} / ${cards.length}`;
  }

  function nextCard() {
    history.push(currentIndex);
    let next;
    do { next = Math.floor(Math.random() * cards.length); }
    while (next === currentIndex && cards.length > 1);
    showCard(next);
  }

  function prevCard() {
    if (history.length > 0) showCard(history.pop());
  }

  function init() {
    cards = [...DATA]; shuffle(); showCard(0);
    document.getElementById('fc-scene').addEventListener('click', () => {
      document.getElementById('fc-inner').classList.toggle('flipped');
    });
    document.getElementById('fc-prev').addEventListener('click', prevCard);
    document.getElementById('fc-next').addEventListener('click', nextCard);
  }

  return { init };
})();
