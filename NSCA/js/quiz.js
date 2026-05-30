/* ============================================================
   NSCA-CPT 学习工具箱 — 测验模块
   40题题库，随机抽10题，即时判分 + 解析 + 错题回顾 + 自动记录
   ============================================================ */

const Quiz = (() => {
  'use strict';

  /* ---- 题库（40题） ---- */
  const DATA = [
    {q:'以下哪项是心脏的起搏点？',o:['A. 房室结','B. 希氏束','C. 窦房结','D. 浦肯野纤维'],c:2,e:'窦房结(SA Node)位于右心房上部，能自发性产生电脉冲，是心脏的自然起搏点，正常发放频率约60-100次/分钟。'},{q:'在OPT力量耐力阶段，重复次数范围通常是？',o:['A. 1-5','B. 6-12','C. 8-15','D. 15-25'],c:2,e:'力量耐力阶段使用8-15次，超级组设计：力量组8-12次+稳定性组12-20次。'},{q:'俯卧撑主要训练的肌肉群是？',o:['A. 股四头肌','B. 胸大肌','C. 背阔肌','D. 臀大肌'],c:1,e:'俯卧撑主要训练胸大肌，前三角肌和肱三头肌为协同肌，核心肌群等长收缩维持身体笔直。'},{q:'以下哪种拉伸方式是借助外力并保持一段时间？',o:['A. 动态拉伸','B. 静态拉伸','C. 主动分离式拉伸','D. PNF拉伸'],c:1,e:'静态拉伸=将肌肉拉伸至末端位置并保持15-60秒。动态=可控运动；AIS=主动肌收缩带动；PNF=收缩-放松交替。'},{q:'Valsalva手法会产生以下哪种现象？',o:['A. 血压下降','B. 胸腔内压升高','C. 心率下降','D. 静脉回流增加'],c:1,e:'Valsalva手法通过声门关闭+腹肌收缩→胸腔内压和腹内压飙升，为脊柱提供额外稳定性。'},{q:'BMI属于哪种评估范畴？',o:['A. 身体成分','B. 心血管功能','C. 柔韧性','D. 肌肉耐力'],c:0,e:'BMI通过身高体重估算体型，属于身体成分评估。但不区分脂肪与去脂体重。'},{q:'磷酸原系统(ATP-PC)提供最大功率的持续时间约为？',o:['A. 1-3秒','B. 6-10秒','C. 30-60秒','D. 2-3分钟'],c:1,e:'ATP储备2-3秒+PCr分解补充约4-7秒，合计约6-10秒最大功率输出。'},{q:'以下哪项不属于核心训练三个水平？',o:['A. 核心稳定','B. 核心力量','C. 核心耐力','D. 核心爆发'],c:2,e:'核心训练三水平：稳定（静态保持）→力量（对抗动态阻力）→爆发（快速传递能量）。无独立的"核心耐力"。'},{q:'深蹲时膝盖内扣(Knee Valgus)最常见的原因是？',o:['A. 股四头肌过强','B. 臀中肌薄弱和踝背屈受限','C. 胸椎活动度不足','D. 腹肌过度紧张'],c:1,e:'膝盖内扣通常指向臀中肌薄弱+踝背屈受限。纠正：加强臀中肌（弹力带行走）+改善踝活动度。'},{q:'中等强度心肺训练对应的%HRR范围通常是？',o:['A. 20-30%','B. 40-60%','C. 60-80%','D. 85-95%'],c:1,e:'中等强度=40-60%HRR。该强度下能交谈但不轻松（talk test）。60-89%HRR为剧烈强度。'},{q:'关于离心收缩哪项正确？',o:['A. 肌纤维缩短','B. 肌纤维在产生张力的同时被拉长','C. 肌纤维不产生张力','D. 肌纤维长度不变'],c:1,e:'离心收缩=肌肉产生力但整体被拉长。消耗较少能量却产生较大力，是DOMS的主要原因。'},{q:'低或中等风险客户在开始运动前需要哪种筛查？',o:['A. 仅口头确认','B. 心电图(ECG)','C. PAR-Q问卷','D. 医生签字许可'],c:2,e:'PAR-Q是运动前分层评估的第一步。仅当PAR-Q回答"是"或高风险时才需医生许可。'},{q:'Borg RPE 6-20量表中，评分15大约对应什么？',o:['A. 非常轻松，~60 bpm','B. 有点费力，~150 bpm','C. 轻松，~90 bpm','D. 极其费力，~200 bpm'],c:1,e:'RPE范围6-20中分数×10≈心率。RPE 15≈150 bpm，对应"Hard/费力"水平。'},{q:'冠状面将身体分为？',o:['A. 左右两部分','B. 上下两部分','C. 前后两部分','D. 内外两部分'],c:2,e:'冠状面(Frontal Plane)垂直分割身体为前(anterior)和后(posterior)两部分。'},{q:'1RM预测Epley公式是？',o:['A. 1RM = weight × reps / 30','B. 1RM = weight × (1 - reps/30)','C. 1RM = weight × (1 + reps/30)','D. 1RM = weight / (1 + reps/30)'],c:2,e:'Epley公式：1RM = weight × (1 + reps/30)。在1-10次范围内较准确。'},{q:'PRICE原则相比RICE增加的元素是？',o:['A. Relax','B. Protection','C. Preparation','D. Pressure'],c:1,e:'PRICE=RICE+Protection(保护)。POLICE进一步将Rest改为Optimal Loading(最佳负荷)。'},{q:'以下哪个属于铰链关节？',o:['A. 肩关节','B. 髋关节','C. 肱尺关节（肘关节）','D. 腕关节'],c:2,e:'肱尺关节是铰链关节（单轴）。肩和髋是球窝关节（多轴），腕关节是椭圆关节。'},{q:'私教执业范围不包括？',o:['A. 设计训练计划','B. 提供营养餐单和疾病诊断','C. 进行健康筛查','D. 教授安全动作技术'],c:1,e:'私教不能提供营养餐单（→营养师RDN）或进行医学诊断（→医生）。'},{q:'哪项不是渐进超负荷的正确实施方式？',o:['A. 每次训练都冲击新的1RM','B. 增加重复次数','C. 增加训练组数','D. 缩短组间休息'],c:0,e:'渐进超负荷是循序渐进的，不需要每次都冲击1RM。安全方法：增重2-5%、增次数/组数等。'},{q:'DOMS通常何时达到峰值？',o:['A. 立即','B. 6-8小时','C. 24-72小时','D. 一周后'],c:2,e:'DOMS在24-48小时达峰值，可持续72小时以上。由离心或不习惯的负荷引起。'},{q:'肌肥大训练组间休息的最佳时长是？',o:['A. 30秒以内','B. 45-90秒','C. 3-5分钟','D. 10分钟以上'],c:1,e:'肌肥大推荐60-90秒休息。较短休息增加代谢压力（肌肥大关键因素之一）。'},{q:'核心稳定训练的正确描述是？',o:['A. 大重量杠铃训练核心','B. 在不稳定面上执行爆发动作','C. 脊柱稳定在中立位下对抗轻微挑战','D. 核心爆发力训练'],c:2,e:'核心稳定=脊柱中立位+低负荷+长时间保持。核心力量阶段才引入动态阻力。'},{q:'运动前主要一餐的最佳时间？',o:['A. 30分钟前','B. 1-4小时前','C. 8小时前','D. 空腹最佳'],c:1,e:'运动前1-4小时进食（碳水1-4g/kg+蛋白质0.25-0.4g/kg）。距离越近应越小份、液体为主。'},{q:'心输出量(CO)的计算公式是？',o:['A. CO = HR × BP','B. CO = SV × HR','C. CO = HR / SV','D. CO = BP × SV'],c:1,e:'CO = 每搏输出量(SV) × 心率(HR)。静息约5L/min，最大运动20-40L/min。'},{q:'IIx型肌纤维的主要特征是？',o:['A. 慢速+高耐力','B. 快速+高力量+低线粒体密度','C. 中速+兼具耐力和力量','D. 同时产生ATP和乳酸'],c:1,e:'IIx型：快缩+高力量+低线粒体密度+依赖糖酵解。适合短跑、跳跃、举重等爆发操作。'},{q:'每周每肌群最佳训练频率？',o:['A. 1次','B. 2-3次','C. 5-6次','D. 每天'],c:1,e:'2-3次/周为最佳。同一肌群需48-72小时恢复。1次可维持，但进步慢。'},{q:'哪项不是心肺耐力的主要指标？',o:['A. VO₂max','B. 1RM卧推重量','C. 乳酸阈','D. 运动经济性'],c:1,e:'1RM卧推是肌肉力量指标。心肺耐力核心指标：VO₂max、乳酸阈、运动经济性。'},{q:'AED电极片应贴在？',o:['A. 左右前臂','B. 右上胸和左侧肋骨','C. 左右大腿','D. 左前胸+左后背'],c:1,e:'标准位置：右胸上方（锁骨下方）+左乳头外侧（腋中线）。使电击路径通过心室肌。'},{q:'代谢当量(MET)基于哪种状态？',o:['A. 最大运动状态','B. 安静坐位状态','C. 睡眠状态','D. 站立状态'],c:1,e:'1 MET=安静坐位耗氧量≈3.5 ml/kg/min。3 METs≈慢走，10+ METs≈跑步。'},{q:'分享客户信息给理疗师前需确保什么？',o:['A. 口头告知即可','B. 客户书面同意','C. 自动默认可分享','D. 不需要同意'],c:1,e:'向第三方透露健康信息前必须获得客户书面知情同意。这是隐私保护的基本要求。'},{q:'腹直肌的主要功能是？',o:['A. 脊柱旋转','B. 脊柱侧屈','C. 脊柱屈曲和维持腹内压','D. 髋关节屈曲'],c:2,e:'腹直肌主要功能是脊柱屈曲（卷腹）和增加腹内压。旋转由腹内/外斜肌完成。'},{q:'完整热身的正确顺序？',o:['A. 只做静态拉伸','B. 5-10分轻度有氧+动态拉伸+特定动作准备','C. 直接开始训练','D. 只做动态拉伸'],c:1,e:'完整热身：轻度有氧（升高体温）→动态拉伸（活化ROM和神经肌肉）→特定动作准备。'},{q:'SAID原则中S代表？',o:['A. Speed','B. Strength','C. Specific','D. Systematic'],c:2,e:'SAID = Specific Adaptation to Imposed Demands（对强加需求的特定适应）。'},{q:'初级客户第一周最安全的做法？',o:['A. 直接85% 1RM','B. OPT稳定性阶段低负荷高次数','C. 极限1RM测试','D. 每天2小时高强度'],c:1,e:'初学者从OPT稳定性耐力阶段开始：低负荷(50-70%)、高次数(12-20)、学习动作模式。'},{q:'哪项不是CVD风险因素？',o:['A. 吸烟','B. 高血压','C. 规律运动','D. 糖尿病'],c:2,e:'规律运动是CVD保护因素，降低风险。风险因素：吸烟、高血压、血脂异常、糖尿病等。'},{q:'ACE抑制剂的作用机制？',o:['A. 增加心率','B. 扩张外周血管降低阻力','C. 增加SV','D. 增加血容量'],c:1,e:'ACE抑制剂抑制血管紧张素转化酶→外周血管舒张→外周阻力↓→血压↓。'},{q:'抗阻训练动作归类正确的是？',o:['A. 深蹲=辅助动作','B. 二头弯举=基础力量动作','C. 传统硬拉=基础力量动作','D. 平板支撑=爆发动作'],c:2,e:'硬拉是基础力量动作（多关节+大肌群+高神经需求）。深蹲同属基础力量，弯举属辅助动作。'},{q:'训练日志的主要价值不包括？',o:['A. 追踪超负荷进展','B. 发现过度训练征兆','C. 诊断心脏疾病','D. 记录动作补偿改善'],c:2,e:'训练日志是教练工具非医学诊断工具。不能替代医学设备进行疾病诊断。'},{q:'沃夫法则描述的是？',o:['A. 肌肉收缩机制','B. 骨骼根据负荷重塑','C. 心肺耐力适应','D. 神经肌肉接头功能'],c:1,e:'沃夫法则(Wolff\'s Law)：骨骼根据施加的力重塑内部结构和外部形态。'},{q:'肌梭的主要功能是？',o:['A. 检测肌肉张力','B. 检测肌肉长度变化','C. 分泌滑液','D. 产生ATP'],c:1,e:'肌梭位于肌腹内，检测肌肉长度变化和变化速率。高尔基腱器(GTO)检测张力变化。'}
  ];

  let questions = [], currentQ = 0, answers = [];

  function start() {
    const shuffled = [...DATA].sort(() => Math.random() - 0.5);
    questions = shuffled.slice(0, 10);
    currentQ = 0; answers = new Array(10).fill(null);
    renderQ();
  }

  function renderQ() {
    const area = document.getElementById('quiz-area');
    if (currentQ >= 10) { showScore(); return; }
    const q = questions[currentQ];
    let h = `<div class="quiz-q">第${currentQ+1}/10题：${q.q}</div><ul class="quiz-opts">`;
    q.o.forEach((opt, i) => {
      h += `<li><button class="quiz-opt" data-idx="${i}">${opt}</button></li>`;
    });
    h += `</ul><div class="quiz-expl" id="quiz-expl"></div><button class="btn btn-primary quiz-next-btn" id="quiz-next">下一题 ▶</button>`;
    area.innerHTML = h;
    area.querySelectorAll('.quiz-opt').forEach(b => {
      b.addEventListener('click', function() {
        if (answers[currentQ] !== null) return;
        const idx = parseInt(this.dataset.idx);
        answers[currentQ] = idx;
        showResult(idx, q.c);
      });
    });
    document.getElementById('quiz-next').addEventListener('click', () => { currentQ++; renderQ(); });
  }

  function showResult(selected, correct) {
    document.querySelectorAll('.quiz-opt').forEach((b, i) => {
      b.classList.add('disabled');
      if (i === correct) b.classList.add('correct');
      if (i === selected && selected !== correct) b.classList.add('incorrect');
    });
    const expl = document.getElementById('quiz-expl');
    expl.textContent = '💡 ' + questions[currentQ].e;
    expl.classList.add('show');
    const nb = document.getElementById('quiz-next');
    nb.classList.add('show');
    if (currentQ >= 9) nb.textContent = '查看成绩 📊';
  }

  function showScore() {
    let correct = 0; const wrong = [];
    answers.forEach((a, i) => { if (a === questions[i].c) correct++; else wrong.push({q:questions[i],ua:a}); });
    let h = `<div class="score-area"><div class="score-big">${correct}/10</div>
      <p>${correct>=8?'🎉 太棒了！':correct>=6?'👍 继续加油！':'📚 需要多复习哦'}</p>
      <button class="btn btn-primary" id="quiz-retry" style="margin-top:16px;">重新测验</button></div>`;
    if (wrong.length) {
      h += `<div style="margin-top:20px;"><h3>📋 错题回顾 (${wrong.length}道)</h3>`;
      wrong.forEach(w => {
        h += `<div class="review-item"><p><strong>${w.q.q}</strong></p>
          <p>你的答案：${w.q.o[w.ua]||'未作答'}</p>
          <p style="color:var(--success);">✅ 正确答案：${w.q.o[w.q.c]}</p>
          <p style="font-size:0.85rem;">💡 ${w.q.e}</p></div>`;
      });
      h += `</div>`;
    }
    document.getElementById('quiz-area').innerHTML = h;
    document.getElementById('quiz-retry').addEventListener('click', start);
    Shared.saveQuizResult(correct, 10);
  }

  function init() {
    document.getElementById('quiz-start').addEventListener('click', start);
  }

  return { init };
})();
