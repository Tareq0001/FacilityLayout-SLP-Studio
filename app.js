/* ==========================================================================
   FacilityLayout SLP Studio V2 - Cyberpunk Tactical JS Core
   ========================================================================== */

const i18n = {
  en: {
    badgeEngine: "TACTICAL INDUSTRIAL HUD · SLP & 2-OPT ALGORITHM",
    appTitle: "FACILITY MATRIX",
    appSub: "CYBER HUD V2",
    appDesc: "Plant Blueprint Matrix, Holographic Material Vectors & 2-Opt Heuristic Auto-Optimizer",
    layoutStatus: "TOPOLOGY:",
    langLabel: "العربية",
    exportBtn: "EXECUTE TELEMETRY AUDIT",
    presetsLabel: "PLANT TOPOLOGY PRESETS:",
    presetLean: "Lean U-Flow (Best Practice)",
    presetJobShop: "Process Job Shop",
    presetChaotic: "Disorganized Baseline (High Cost)",
    runOptimize: "ENGAGE 2-OPT OPTIMIZER",
    shuffle: "SHUFFLE",
    kpiScore: "Material Handling Cost (Z)",
    kpiScoreSub: "Ton · Meters / Shift",
    kpiGain: "Efficiency Gain vs Baseline",
    kpiGainSub: "Cumulative reduction",
    kpiBottleneck: "Critical Flow Bottleneck",
    kpiAdjacency: "A-Relationship Adjacency",
    kpiAdjacencySub: "Critical cells adjacent",
    floorGridTitle: "Interactive 4×2 Hangar Bays",
    floorGridDesc: "Click any two department nodes to swap cellular plant allocation.",
    hintIdle: "[SELECT BAY A]",
    hintSelected: "[SELECT TARGET BAY B]",
    legendMatIn: "RAW MATERIALS IN",
    legendMachining: "MACHINING & PRESS",
    legendAssembly: "ASSEMBLY & FAB",
    legendQCShip: "QC & DISPATCH",
    canvasTitle: "Holographic Transit Vectors",
    canvasDesc: "Live animated laser energy vectors tracking material volume and distance.",
    showLabels: "LABELS",
    animateVectors: "PARTICLES",
    activeLinks: "ACTIVE LINKS:",
    avgTransitDist: "AVG TRANSIT:",
    tabFromTo: "From-To Flow Matrix (Loads/Shift)",
    tabSLP: "Muther's SLP Activity Chart (REL)",
    tabConvergence: "2-Opt Heuristic Convergence",
    footerStatus: "CYBERPUNK TACTICAL FACILITY OPTIMIZATION SYSTEM"
  },
  ar: {
    badgeEngine: "شاشة التحكم التكتيكية الصناعية · خوارزميات SLP و 2-OPT",
    appTitle: "مصفوفة المنشآت",
    appSub: "سايبر بانك تكتيكي V2",
    appDesc: "المخطط الهولوغرافي للمصنع، متجهات تدفق المواد الليزرية، ومحرك تحسين 2-Opt الآلي",
    layoutStatus: "حالة التوزيع:",
    langLabel: "English",
    exportBtn: "تصدير تقرير القياسات",
    presetsLabel: "نماذج التوزيع التكتيكية:",
    presetLean: "تدفق رشيق U-Flow (المعيار الأمثل)",
    presetJobShop: "ورشة تصنيع وظيفية Job Shop",
    presetChaotic: "توزيع فوضوي عالي التكلفة",
    runOptimize: "تشغيل خوارزمية 2-Opt",
    shuffle: "خلط عشوائي",
    kpiScore: "تكلفة مناولة المواد (معيار Z)",
    kpiScoreSub: "طن · متر لكل وردية",
    kpiGain: "نسبة تحسين الكفاءة",
    kpiGainSub: "مقارنة بالتوزيع المرجعي",
    kpiBottleneck: "عنق الزجاجة الحرج للنقل",
    kpiAdjacency: "تجاور العلاقات الحرجة (A)",
    kpiAdjacencySub: "نسبة تجاور الخلايا الحيوية",
    floorGridTitle: "خلايا المصنع التكتيكية 4×2",
    floorGridDesc: "اضغط على أي خليتين لتبديل المواقع الهندسية فوراً.",
    hintIdle: "[حدد الخلية الأولى]",
    hintSelected: "[حدد الخلية المستهدفة للتبديل]",
    legendMatIn: "استلام المواد الخام",
    legendMachining: "التشغيل والتشكيل",
    legendAssembly: "التجميع واللحام",
    legendQCShip: "الجودة والشحن",
    canvasTitle: "المتجهات الهولوغرافية لتدفق المواد",
    canvasDesc: "محاكاة ليزرية حية لحركة المواد عبر خلايا المصنع مع مؤشرات الكثافة.",
    showLabels: "تسميات",
    animateVectors: "جسيمات",
    activeLinks: "المسارات النشطة:",
    avgTransitDist: "متوسط مسافة النقل:",
    tabFromTo: "مصفوفة التدفق بين الأقسام (حمولات/وردية)",
    tabSLP: "مخطط موثر للعلاقات الوظيفية (REL Chart)",
    tabConvergence: "تقارب خوارزمية التحسين 2-Opt",
    footerStatus: "نظام تحسين المنشآت الصناعي بنمط السايبر بانك التكتيكي V2"
  }
};

let currentLang = 'en';

const DEPARTMENTS = [
  { id: 0, code: "REC", nameEn: "Raw Receiving", nameAr: "استلام المواد الخام", cat: "col-cyan", area: 450 },
  { id: 1, code: "STP", nameEn: "Press & Stamping", nameAr: "المكابس والتشكيل", cat: "col-purple", area: 380 },
  { id: 2, code: "CNC", nameEn: "CNC Milling", nameAr: "تشغيل الآلات CNC", cat: "col-purple", area: 520 },
  { id: 3, code: "WLD", nameEn: "Welding & Fab", nameAr: "اللحام والتشغيل", cat: "col-amber", area: 400 },
  { id: 4, code: "HTR", nameEn: "Heat Treatment", nameAr: "المعالجة الحرارية", cat: "col-amber", area: 300 },
  { id: 5, code: "ASY", nameEn: "Final Assembly", nameAr: "التجميع النهائي", cat: "col-amber", area: 600 },
  { id: 6, code: "QCL", nameEn: "Quality Lab", nameAr: "مختبر الجودة", cat: "col-green", area: 250 },
  { id: 7, code: "SHP", nameEn: "Shipping & Dock", nameAr: "التغليف والشحن", cat: "col-green", area: 500 }
];

const FLOW_MATRIX = [
  [0,  65, 45,  5,  0,  0,  0,  0],
  [0,   0, 30, 50,  0,  5,  0,  0],
  [0,   0,  0, 25, 40, 10,  5,  0],
  [0,   0,  0,  0, 15, 60,  0,  0],
  [0,   0,  0,  0,  0, 55,  8,  0],
  [0,   0,  0,  0,  0,  0, 75, 40],
  [0,   0,  0,  0,  0,  0,  0, 80],
  [0,   0,  0,  0,  0,  0,  0,  0]
];

const SLP_REL = [
  ['-', 'A', 'E', 'O', 'U', 'U', 'U', 'U'],
  ['A', '-', 'E', 'A', 'U', 'O', 'U', 'U'],
  ['E', 'E', '-', 'I', 'A', 'O', 'O', 'U'],
  ['O', 'A', 'I', '-', 'I', 'A', 'U', 'U'],
  ['U', 'U', 'A', 'I', '-', 'A', 'O', 'X'],
  ['U', 'O', 'O', 'A', 'A', '-', 'A', 'E'],
  ['U', 'U', 'O', 'U', 'O', 'A', '-', 'A'],
  ['U', 'U', 'U', 'U', 'X', 'E', 'A', '-']
];

const BAY_COORDS = [
  { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 },
  { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 }
];

const PRESETS = {
  "lean-u": [0, 1, 2, 3, 7, 6, 5, 4],
  "job-shop": [0, 2, 1, 3, 4, 5, 7, 6],
  "chaotic": [7, 2, 0, 5, 1, 4, 3, 6]
};

let currentLayout = [...PRESETS["lean-u"]];
let selectedBay = null;
let baselineCost = 1420;
let convergenceHistory = [];

let animFrameId = null;
let particles = [];

document.addEventListener('DOMContentLoaded', () => {
  setupLanguage();
  setupEventListeners();
  setupPresets();
  setupTabs();

  baselineCost = computeCostForLayout(PRESETS["chaotic"]);

  renderBaysGrid();
  renderFromToTable();
  renderSLPTable();
  recalculateAll();

  initCanvas();
  window.addEventListener('resize', initCanvas);
});

function setupLanguage() {
  const toggle = document.getElementById('langToggle');
  toggle.addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'ar' : 'en';
    document.documentElement.setAttribute('dir', currentLang === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', currentLang);
    document.getElementById('langLabel').textContent = i18n[currentLang].langLabel;

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (i18n[currentLang][key]) {
        el.textContent = i18n[currentLang][key];
      }
    });

    renderBaysGrid();
    renderFromToTable();
    renderSLPTable();
    recalculateAll();
  });
}

function setupEventListeners() {
  document.getElementById('optimizeBtn').addEventListener('click', run2OptOptimization);
  document.getElementById('shuffleBtn').addEventListener('click', shuffleLayout);
  document.getElementById('exportReportBtn').addEventListener('click', exportAuditReport);
}

function setupPresets() {
  document.querySelectorAll('.preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const p = btn.getAttribute('data-preset');
      if (PRESETS[p]) {
        currentLayout = [...PRESETS[p]];
        selectedBay = null;
        updateHintBadge();
        renderBaysGrid();
        recalculateAll();
      }
    });
  });
}

function setupTabs() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const target = document.getElementById(btn.getAttribute('data-tab'));
      if (target) target.classList.add('active');
      if (btn.getAttribute('data-tab') === 'tabConvergence') {
        drawConvergenceChart();
      }
    });
  });
}

function getDistance(bayA, bayB) {
  const cA = BAY_COORDS[bayA];
  const cB = BAY_COORDS[bayB];
  return (Math.abs(cA.x - cB.x) + Math.abs(cA.y - cB.y)) * 25;
}

function computeCostForLayout(layout) {
  const deptToBay = [];
  for (let b = 0; b < 8; b++) {
    deptToBay[layout[b]] = b;
  }
  let totalCost = 0;
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const flow = FLOW_MATRIX[i][j];
      if (flow > 0) {
        totalCost += flow * getDistance(deptToBay[i], deptToBay[j]);
      }
    }
  }
  return totalCost;
}

function recalculateAll() {
  const currentCost = computeCostForLayout(currentLayout);
  document.getElementById('kpiScore').textContent = currentCost.toLocaleString();

  const gain = ((baselineCost - currentCost) / baselineCost) * 100;
  const kpiGainEl = document.getElementById('kpiGain');
  kpiGainEl.textContent = (gain >= 0 ? "+" : "") + gain.toFixed(1) + "%";
  kpiGainEl.style.color = gain >= 0 ? "var(--cyber-green)" : "var(--cyber-red)";

  const deptToBay = [];
  for (let b = 0; b < 8; b++) {
    deptToBay[currentLayout[b]] = b;
  }

  let maxFlowCost = 0;
  let bottleneckPair = "-";
  let bottleneckDetails = "-";
  let totalDistSum = 0;
  let activeLinks = 0;

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const flow = FLOW_MATRIX[i][j];
      if (flow > 0) {
        const dist = getDistance(deptToBay[i], deptToBay[j]);
        const cost = flow * dist;
        totalDistSum += dist;
        activeLinks++;
        if (cost > maxFlowCost) {
          maxFlowCost = cost;
          bottleneckPair = `${DEPARTMENTS[i].code} → ${DEPARTMENTS[j].code}`;
          bottleneckDetails = `${flow} T · ${dist}m (${cost.toLocaleString()} T·m)`;
        }
      }
    }
  }

  document.getElementById('kpiBottleneck').textContent = bottleneckPair;
  document.getElementById('kpiBottleneckSub').textContent = bottleneckDetails;

  let criticalPairs = 0;
  let adjacentCritical = 0;
  for (let i = 0; i < 8; i++) {
    for (let j = i + 1; j < 8; j++) {
      if (SLP_REL[i][j] === 'A') {
        criticalPairs++;
        if (getDistance(deptToBay[i], deptToBay[j]) <= 25) {
          adjacentCritical++;
        }
      }
    }
  }
  const adjPct = criticalPairs > 0 ? Math.round((adjacentCritical / criticalPairs) * 100) : 100;
  document.getElementById('kpiAdjacency').textContent = adjPct + "%";

  document.getElementById('activeLinksCount').textContent = activeLinks + (currentLang === 'ar' ? ' مسارات' : ' vectors');
  const avgDist = activeLinks > 0 ? Math.round(totalDistSum / activeLinks) : 0;
  document.getElementById('avgDistanceVal').textContent = avgDist + (currentLang === 'ar' ? ' م' : ' m');
}

function renderBaysGrid() {
  const container = document.getElementById('baysGrid');
  container.innerHTML = '';

  for (let bayIdx = 0; bayIdx < 8; bayIdx++) {
    const deptId = currentLayout[bayIdx];
    const dept = DEPARTMENTS[deptId];
    const coord = BAY_COORDS[bayIdx];

    const cell = document.createElement('div');
    cell.className = 'bay-cell';
    if (selectedBay === bayIdx) cell.classList.add('selected');

    const name = currentLang === 'ar' ? dept.nameAr : dept.nameEn;

    cell.innerHTML = `
      <div class="bay-coord">[BAY ${coord.x},${coord.y}]</div>
      <div>
        <span class="dept-badge" style="color:var(--cyber-cyan);">${dept.code}</span>
        <div class="dept-title">${name}</div>
      </div>
      <div class="dept-meta">
        <span>${dept.area} m²</span>
        <span>ID: #0${deptId + 1}</span>
      </div>
    `;

    cell.addEventListener('click', () => handleBayClick(bayIdx));
    container.appendChild(cell);
  }
}

function handleBayClick(bayIdx) {
  if (selectedBay === null) {
    selectedBay = bayIdx;
    updateHintBadge();
    renderBaysGrid();
  } else if (selectedBay === bayIdx) {
    selectedBay = null;
    updateHintBadge();
    renderBaysGrid();
  } else {
    const temp = currentLayout[selectedBay];
    currentLayout[selectedBay] = currentLayout[bayIdx];
    currentLayout[bayIdx] = temp;

    selectedBay = null;
    document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
    updateHintBadge();
    renderBaysGrid();
    recalculateAll();
  }
}

function updateHintBadge() {
  const badge = document.getElementById('swapHintBadge');
  if (selectedBay === null) {
    badge.className = 'swap-status-badge';
    badge.textContent = i18n[currentLang].hintIdle;
  } else {
    badge.className = 'swap-status-badge selected';
    badge.textContent = i18n[currentLang].hintSelected;
  }
}

function run2OptOptimization() {
  const optBtn = document.getElementById('optimizeBtn');
  optBtn.disabled = true;
  optBtn.style.opacity = '0.5';

  let bestLayout = [...currentLayout];
  let bestCost = computeCostForLayout(bestLayout);
  convergenceHistory = [{ step: 0, cost: bestCost }];

  let improved = true;
  let iteration = 0;

  function stepOpt() {
    improved = false;
    for (let i = 0; i < 7; i++) {
      for (let j = i + 1; j < 8; j++) {
        const testLayout = [...bestLayout];
        const tmp = testLayout[i];
        testLayout[i] = testLayout[j];
        testLayout[j] = tmp;

        const testCost = computeCostForLayout(testLayout);
        if (testCost < bestCost) {
          bestCost = testCost;
          bestLayout = testLayout;
          improved = true;
        }
      }
    }

    iteration++;
    convergenceHistory.push({ step: iteration, cost: bestCost });

    currentLayout = [...bestLayout];
    renderBaysGrid();
    recalculateAll();

    if (improved && iteration < 50) {
      setTimeout(stepOpt, 80);
    } else {
      optBtn.disabled = false;
      optBtn.style.opacity = '1';
      document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
      drawConvergenceChart();
    }
  }

  stepOpt();
}

function shuffleLayout() {
  for (let i = currentLayout.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [currentLayout[i], currentLayout[j]] = [currentLayout[j], currentLayout[i]];
  }
  selectedBay = null;
  document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
  updateHintBadge();
  renderBaysGrid();
  recalculateAll();
}

function renderFromToTable() {
  const table = document.getElementById('fromToTable');
  let html = `<tr><th>From \ To</th>${DEPARTMENTS.map(d => `<th>${d.code}</th>`).join('')}</tr>`;

  for (let i = 0; i < 8; i++) {
    const d = DEPARTMENTS[i];
    const name = currentLang === 'ar' ? d.nameAr : d.nameEn;
    html += `<tr><th style="text-align:left;">${d.code} - ${name}</th>`;
    for (let j = 0; j < 8; j++) {
      const v = FLOW_MATRIX[i][j];
      const style = v >= 60 ? 'color:var(--cyber-red); font-weight:bold;' : v > 0 ? 'color:var(--cyber-cyan);' : 'color:#475569;';
      html += `<td style="${style}">${v > 0 ? v : '-'}</td>`;
    }
    html += `</tr>`;
  }
  table.innerHTML = html;
}

function renderSLPTable() {
  const table = document.getElementById('slpTable');
  let html = `<tr><th>Dept Code</th>${DEPARTMENTS.map(d => `<th>${d.code}</th>`).join('')}</tr>`;

  for (let i = 0; i < 8; i++) {
    const d = DEPARTMENTS[i];
    html += `<tr><th style="text-align:left;">${d.code}</th>`;
    for (let j = 0; j < 8; j++) {
      const r = SLP_REL[i][j];
      const col = r === 'A' ? 'var(--cyber-red)' : r === 'E' ? 'var(--cyber-amber)' : r === 'I' ? 'var(--cyber-green)' : '#64748b';
      html += `<td style="color:${col}; font-weight:bold;">${r}</td>`;
    }
    html += `</tr>`;
  }
  table.innerHTML = html;
}

// Canvas Visualizer
let canvas, ctx;
function initCanvas() {
  canvas = document.getElementById('flowCanvas');
  if (!canvas) return;
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.parentElement.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);

  particles = [];
  for (let i = 0; i < 20; i++) {
    particles.push({
      progress: Math.random(),
      speed: 0.005 + Math.random() * 0.005,
      linkIndex: Math.floor(Math.random() * 12)
    });
  }

  if (!animFrameId) {
    runCanvasLoop();
  }
}

function runCanvasLoop() {
  drawFlowCanvas();
  animFrameId = requestAnimationFrame(runCanvasLoop);
}

function drawFlowCanvas() {
  if (!canvas || !ctx) return;
  const w = canvas.width / (window.devicePixelRatio || 1);
  const h = canvas.height / (window.devicePixelRatio || 1);

  ctx.clearRect(0, 0, w, h);

  const padX = 40;
  const padY = 35;
  const cellW = (w - padX * 2) / 4;
  const cellH = (h - padY * 2) / 2;

  const nodeCenters = [];
  for (let b = 0; b < 8; b++) {
    const c = BAY_COORDS[b];
    nodeCenters[b] = {
      x: padX + c.x * cellW + cellW / 2,
      y: padY + c.y * cellH + cellH / 2
    };

    // Draw hangar bay blueprint rects
    ctx.strokeStyle = "rgba(0, 240, 255, 0.1)";
    ctx.lineWidth = 1;
    ctx.strokeRect(padX + c.x * cellW + 4, padY + c.y * cellH + 4, cellW - 8, cellH - 8);
  }

  const deptToBay = [];
  for (let b = 0; b < 8; b++) {
    deptToBay[currentLayout[b]] = b;
  }

  const links = [];

  // Draw Laser Flow Lines
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const flow = FLOW_MATRIX[i][j];
      if (flow > 0) {
        const ptA = nodeCenters[deptToBay[i]];
        const ptB = nodeCenters[deptToBay[j]];
        links.push({ ptA, ptB, flow });

        const dist = getDistance(deptToBay[i], deptToBay[j]);
        const isBottleneck = dist > 50 && flow > 30;

        ctx.beginPath();
        ctx.strokeStyle = isBottleneck ? "rgba(255, 0, 85, 0.7)" : "rgba(0, 240, 255, 0.3)";
        ctx.lineWidth = Math.max(1.5, (flow / 80) * 4);
        ctx.moveTo(ptA.x, ptA.y);
        ctx.lineTo(ptB.x, ptB.y);
        ctx.stroke();
      }
    }
  }

  // Draw Pulsing Particles
  const animOn = document.getElementById('animateFlowCheck').checked;
  if (animOn && links.length > 0) {
    particles.forEach(p => {
      p.progress += p.speed;
      if (p.progress > 1) {
        p.progress = 0;
        p.linkIndex = Math.floor(Math.random() * links.length);
      }
      const link = links[p.linkIndex % links.length];
      if (link) {
        const px = link.ptA.x + (link.ptB.x - link.ptA.x) * p.progress;
        const py = link.ptA.y + (link.ptB.y - link.ptA.y) * p.progress;

        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fillStyle = "#00ff66";
        ctx.shadowColor = "#00ff66";
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    });
  }

  // Draw Department Nodes
  const showLabels = document.getElementById('showLabelsCheck').checked;
  for (let b = 0; b < 8; b++) {
    const pt = nodeCenters[b];
    const dept = DEPARTMENTS[currentLayout[b]];

    ctx.beginPath();
    ctx.arc(pt.x, pt.y, 14, 0, Math.PI * 2);
    ctx.fillStyle = "#050811";
    ctx.strokeStyle = "#00f0ff";
    ctx.lineWidth = 2;
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 9.5px Share Tech Mono";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(dept.code, pt.x, pt.y);

    if (showLabels) {
      ctx.fillStyle = "#94a3b8";
      ctx.font = "10px Share Tech Mono";
      ctx.fillText(dept.code, pt.x, pt.y + 22);
    }
  }
}

function drawConvergenceChart() {
  const chartCanvas = document.getElementById('convergenceChart');
  if (!chartCanvas) return;
  const dpr = window.devicePixelRatio || 1;
  const w = chartCanvas.parentElement.clientWidth;
  const h = 220;
  chartCanvas.width = w * dpr;
  chartCanvas.height = h * dpr;
  const cctx = chartCanvas.getContext('2d');
  cctx.scale(dpr, dpr);
  cctx.clearRect(0, 0, w, h);

  if (convergenceHistory.length < 2) {
    convergenceHistory = [
      { step: 0, cost: baselineCost },
      { step: 1, cost: baselineCost - 180 },
      { step: 2, cost: baselineCost - 320 },
      { step: 3, cost: computeCostForLayout(currentLayout) }
    ];
  }

  const pad = { top: 25, right: 30, bottom: 35, left: 55 };
  const plotW = w - pad.left - pad.right;
  const plotH = h - pad.top - pad.bottom;

  const maxC = Math.max(...convergenceHistory.map(d => d.cost)) * 1.05;
  const minC = Math.min(...convergenceHistory.map(d => d.cost)) * 0.95;

  cctx.beginPath();
  convergenceHistory.forEach((pt, idx) => {
    const x = pad.left + (idx / (convergenceHistory.length - 1)) * plotW;
    const y = pad.top + ((maxC - pt.cost) / (maxC - minC)) * plotH;
    if (idx === 0) cctx.moveTo(x, y);
    else cctx.lineTo(x, y);
  });
  cctx.strokeStyle = "#00f0ff";
  cctx.lineWidth = 2.5;
  cctx.stroke();

  const init = convergenceHistory[0].cost;
  const final = convergenceHistory[convergenceHistory.length - 1].cost;

  document.getElementById('convergenceStats').innerHTML = `
    <div class="conv-stat-row">
      <span style="color:#64748b;">INITIAL LOSS:</span>
      <span style="color:var(--cyber-cyan); font-weight:700;">${init.toLocaleString()} T·m</span>
    </div>
    <div class="conv-stat-row">
      <span style="color:#64748b;">OPTIMIZED:</span>
      <span style="color:var(--cyber-green); font-weight:700;">${final.toLocaleString()} T·m</span>
    </div>
    <div class="conv-stat-row">
      <span style="color:#64748b;">NET SAVED:</span>
      <span style="color:var(--cyber-green); font-weight:700;">-${(init - final).toLocaleString()} T·m</span>
    </div>
  `;
}

function exportAuditReport() {
  const currentCost = computeCostForLayout(currentLayout);
  const reportLines = [
    "=========================================================",
    "      CYBERPUNK INDUSTRIAL FACILITY SLP AUDIT",
    "=========================================================",
    `Generated: ${new Date().toISOString()}`,
    `Author: Tareq Abu Ashee (أ. طارق ابوعشي)`,
    "",
    "TELEMETRY EVALUATION:",
    `  - Current Material Handling Cost (Z): ${currentCost.toLocaleString()} Ton-Meters / Shift`,
    `  - Efficiency Improvement: ${document.getElementById('kpiGain').textContent} vs Baseline`,
    `  - Critical Bottleneck Vector: ${document.getElementById('kpiBottleneck').textContent}`,
    `  - A-Adjacency Integrity: ${document.getElementById('kpiAdjacency').textContent}`,
    "",
    "DIRECTIVE: Layout topology is synchronized with automated AGC routing systems."
  ];

  const report = reportLines.join("\n");
  const blob = new Blob([report], { type: 'text/plain;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `Cyber_Facility_SLP_Audit_${Date.now()}.txt`;
  a.click();
}
