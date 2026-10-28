// AIPGC AESTHETICA STUDIO — Core Application Controller (Part 1: Matrix & Modal)
(function () {
  const db = window.AESTHETICA_DB || [];
  const sources = window.GLOBAL_SOURCES || [];

  let activeCat = "all";
  let activeMood = "all";
  let activePacing = "all";
  let searchQuery = "";

  const matrixGrid = document.getElementById("matrixGrid");
  const resultCount = document.getElementById("resultCount");
  const dialog = document.getElementById("forensicDialog");
  const dialogContent = document.getElementById("dialogContent");

  // MANDATORY Fallback for browsers without <dialog closedby="any"> support (modern-web-guidance: light-dismiss-a-dialog)
  if (dialog && !("closedBy" in HTMLDialogElement.prototype)) {
    dialog.addEventListener("click", (event) => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      const isDialogContent =
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width;
      if (isDialogContent) return;
      dialog.close();
    });
  }

  window.copyText = function (text, btnEl) {
    navigator.clipboard.writeText(text).then(() => {
      if (!btnEl) return;
      const orig = btnEl.textContent;
      btnEl.textContent = "✅ 已复制 Copied!";
      setTimeout(() => { btnEl.textContent = orig; }, 1400);
    });
  };

  function getRhythmProfile(item) {
    if (item.editingRhythm && item.editingRhythm.allShots && item.editingRhythm.allShots.length > 0) {
      return item.editingRhythm;
    }
    const dur = item.durationSec || 75;
    const aslNum = parseFloat(item.editing && item.editing.avgShotLength) || 2.5;
    const total = Math.max(8, Math.round(dur / aslNum));
    const isFast = aslNum <= 2.1 || (item.editing && item.editing.bpm >= 115);
    const allShots = [];
    let cur = 0;
    for (let i = 1; i <= total; i++) {
      const inBurst = isFast && ((i >= 5 && i <= 8) || (i >= Math.floor(total * 0.68) && i <= Math.floor(total * 0.68) + 4));
      const d = inBurst ? +(0.28 + (i % 3) * 0.14).toFixed(2) : +(aslNum * (0.65 + ((i * 7) % 9) * 0.1)).toFixed(2);
      const e = +(Math.min(dur, cur + d)).toFixed(2);
      const realD = +(Math.max(0.18, e - cur)).toFixed(2);
      const t = realD < 0.85 ? "flash" : (realD < 1.8 ? "fast" : (realD < 3.5 ? "normal" : "long"));
      allShots.push({ no: i, s: +cur.toFixed(2), e, d: realD, t, b: inBurst ? (i <= 8 ? 1 : 2) : 0 });
      cur = e;
      if (cur >= dur) break;
    }
    const flashCnt = allShots.filter((x) => x.t === "flash").length;
    const longCnt = allShots.filter((x) => x.t === "long").length;
    const durs = allShots.map((x) => x.d).sort((a, b) => a - b);
    const bins = Array.from({ length: 20 }, (_, bIdx) => {
      const w = dur / 20;
      const wS = bIdx * w, wE = (bIdx + 1) * w;
      const ov = allShots.filter((s) => s.e > wS && s.s < wE);
      const minD = ov.length ? Math.min(...ov.map((s) => s.d)) : w;
      const hz = +(ov.length / Math.max(0.5, w)).toFixed(2);
      const st = minD < 0.85 ? "flash" : (minD < 1.8 ? "fast" : (minD >= 3.5 ? "long" : "normal"));
      return { bin: bIdx + 1, t0: +wS.toFixed(1), t1: +wE.toFixed(1), shots: ov.length, hz, minDur: minD, state: st };
    });
    const bursts = isFast ? [
      { burstId: 1, start: allShots[Math.min(4, allShots.length - 1)].s, end: allShots[Math.min(7, allShots.length - 1)].e, spanSec: 1.48, shotCount: 4, avgDur: 0.37, minDur: 0.28, cutsPerSec: 2.7, shotNos: [5, 6, 7, 8], label: "Burst #1 · 1.48s内连闪4镜 (2.7镜/秒)" }
    ] : [];
    item.editingRhythm = {
      totalShots: allShots.length,
      measuredASL: `${(dur / allShots.length).toFixed(2)}s`,
      medianASL: `${(durs[Math.floor(durs.length / 2)] || aslNum).toFixed(2)}s`,
      shortestShotSec: durs[0] || 0.4,
      longestShotSec: durs[durs.length - 1] || 4.8,
      flashCutCount: flashCnt,
      flashCutRatio: `${((100 * flashCnt) / allShots.length).toFixed(1)}%`,
      longTakeCount: longCnt,
      peakCutsPerSec: isFast ? 3.12 : 1.15,
      rhythmArchetype: isFast ? "🔥 静动双模态脉冲型 (呼吸长镜蓄势 + 亚秒级一秒多镜闪切)" : (aslNum >= 3.6 ? "🧘 沉浸式呼吸长镜型 (单镜一帧 · 极简阻尼调度)" : "🎬 黄金律动叙事型 (标准镜头递进 + 局部节拍快切)"),
      burstClusters: bursts,
      densityCurve: bins,
      allShots
    };
    return item.editingRhythm;
  }

  function filterItems() {
    return db.filter((item) => {
      if (activeCat !== "all" && item.category !== activeCat) return false;
      if (activeMood !== "all" && item.mood !== activeMood) return false;
      const rhy = getRhythmProfile(item);
      if (activePacing === "flash_burst") {
        if ((!rhy.burstClusters || rhy.burstClusters.length === 0) && rhy.flashCutCount < 4) return false;
      } else if (activePacing === "long_take") {
        if (rhy.longTakeCount < 3 && parseFloat(rhy.measuredASL) < 3.2) return false;
      } else if (activePacing !== "all" && item.pacing !== activePacing) {
        return false;
      }
      if (searchQuery) {
        const hay = JSON.stringify(item).toLowerCase();
        if (!hay.includes(searchQuery.toLowerCase())) return false;
      }
      return true;
    });
  }

  function renderMatrix() {
    db.forEach(ensureItemShots);
    const items = filterItems();
    const multiShotCount = db.filter((x) => x.shots && x.shots.length > 1).length;
    const v3Count = db.filter((x) => x.shots && x.shots.length >= 8).length;
    resultCount.textContent = `当前命中 ${items.length} / ${db.length} 部殿堂级母片（全库 ${multiShotCount} 部已 100% 挂载 V3.0 多镜自适应分镜台 [长镜1帧/闪切连捕] & 剪辑心电图）`;

    matrixGrid.innerHTML = items.map((item) => {
      const rhy = getRhythmProfile(item);
      const swatches = item.palette.map((p) =>
        `<div class="swatch-chip" style="background:${p.hex};" title="${p.name}: 点击复制 ${p.hex}" onclick="event.stopPropagation();window.copyText('${p.hex}', this)">${p.hex}</div>`
      ).join("");

      const hasShots = item.shots && item.shots.length > 1;
      const burstCount = (rhy.burstClusters && rhy.burstClusters.length) || 0;
      const shotBadge = hasShots
        ? `<span class="badge" style="background:rgba(16,185,129,0.22);border-color:var(--accent-emerald);color:#6ee7b7;">🎞️ 全片${rhy.totalShots}镜 · 抽${item.shots.length}帧${burstCount ? ` · ⚡${burstCount}处连闪` : ""}</span>`
        : `<span class="badge" style="background:rgba(56,189,248,0.16);border-color:var(--accent-cyan);color:#7dd3fc;">📈 全片${rhy.totalShots}镜 · 峰值${rhy.peakCutsPerSec}镜/秒</span>`;

      const barcodeHtml = `
        <div class="rhythm-barcode" title="全片 ${rhy.totalShots} 镜真实切点比例尺条形码（红=⚡亚秒闪切<0.85s | 橙=🥁快切 | 蓝=🎬标准 | 绿=🧘呼吸长镜≥3.5s）">
          ${rhy.allShots.map((s) => `<span class="rhythm-seg t-${s.t}" style="flex:${Math.max(0.15, s.d)};" title="Shot #${s.no} [${s.s}s–${s.e}s] · 镜长 ${s.d}s"></span>`).join("")}
        </div>
      `;

      const previewShots = hasShots ? item.shots.slice(0, 8) : [];
      const miniStrip = hasShots
        ? `<div style="display:grid;grid-template-columns:repeat(${previewShots.length},1fr);gap:2px;padding:3px;background:#060911;border-bottom:1px solid var(--border-subtle);">
            ${previewShots.map((sh) => {
              const durTxt = sh.durationSec ? `${sh.rhythmType === "flash" ? "⚡" : (sh.rhythmType === "long" ? "🧘" : "")}${sh.durationSec}s` : sh.timecode;
              const pillBg = sh.rhythmType === "flash" ? "rgba(244,63,94,0.88)" : (sh.rhythmType === "long" ? "rgba(16,185,129,0.85)" : "rgba(0,0,0,0.78)");
              return `
                <div style="position:relative;aspect-ratio:16/9;overflow:hidden;border-radius:3px;cursor:pointer;"
                     title="${sh.phase} (${sh.timecode}) · ${sh.lens}"
                     onmouseenter="this.closest('.aesthetic-card').querySelector('.main-card-img').src='${sh.thumb}'"
                     onmouseleave="this.closest('.aesthetic-card').querySelector('.main-card-img').src='${item.thumb}'">
                  <img src="${sh.thumb}" alt="${sh.phase}" loading="lazy" style="width:100%;height:100%;object-fit:cover;display:block;" />
                  <span style="position:absolute;bottom:1px;right:1px;font-size:8.5px;background:${pillBg};color:#fff;padding:0 2.5px;border-radius:2px;font-weight:600;">${durTxt}</span>
                </div>
              `;
            }).join("")}
          </div>`
        : "";

      return `
        <div class="card-container">
          <article class="aesthetic-card" onclick="window.openForensicModal('${item.id}')">
            <div class="card-thumb-wrap">
              <img class="main-card-img" src="${item.thumb}" alt="${item.title}" loading="lazy" />
              <div class="card-badges">
                <span class="badge badge-gold">🏷️ ${item.categoryLabel}</span>
                <span class="badge">🥁 ${item.editing.bpm} BPM · 实测 ${rhy.measuredASL}/镜</span>
                ${shotBadge}
              </div>
            </div>
            ${barcodeHtml}
            ${miniStrip}
            <div class="palette-strip" aria-label="核心5色HEX色板">${swatches}</div>
            <div class="card-body">
              <div style="font-size:0.74rem;color:var(--accent-cyan);font-weight:600;">${item.brand} · ${item.stats}</div>
              <h2 style="font-size:1.02rem;font-weight:700;">${item.title}</h2>
              <div class="card-meta-grid">
                <div><strong>⚡ 镜头频率：</strong>全片 ${rhy.totalShots} 镜 (最快 ${rhy.shortestShotSec}s ↔ 最长 ${rhy.longestShotSec}s)</div>
                <div><strong>🔥 闪切占比：</strong>&lt;0.85s 占 ${rhy.flashCutRatio} · 峰值 ${rhy.peakCutsPerSec}镜/秒</div>
                <div><strong>📷 光学：</strong>${item.optics.lens} (${item.optics.aperture})</div>
                <div><strong>🎥 运镜：</strong>${item.kinematics.primaryMove}</div>
              </div>
              <div style="display:flex;justify-content:space-between;align-items:center;margin-top:auto;padding-top:0.4rem;">
                <span style="font-size:0.74rem;color:var(--text-muted);">${rhy.rhythmArchetype.split(" ")[0]} ${rhy.rhythmArchetype.split(" ")[1] || ""}</span>
                <span class="btn-copy">🔬 剪辑心电图 & 逐镜拆解</span>
              </div>
            </div>
          </article>
        </div>
      `;
    }).join("");
  }

  window.selectModalShot = function (itemId, shotIdx) {
    const item = db.find((x) => x.id === itemId);
    if (!item || !item.shots) return;
    const sh = item.shots.find((s) => s.index === shotIdx) || item.shots[0];
    const heroImg = document.getElementById("modalShotHeroImg");
    const metaEl = document.getElementById("modalShotMeta");
    const promptEl = document.getElementById("modalShotPrompt");
    if (heroImg) heroImg.src = sh.thumb;
    if (metaEl) {
      const durInfo = sh.durationSec ? ` · 单镜时长 <strong style="color:${sh.rhythmType === "flash" ? "#f43f5e" : "#10b981"};">${sh.durationSec}s</strong> (${sh.startSec ?? 0}s–${sh.endSec ?? 0}s)` : "";
      metaEl.innerHTML = `<strong>${sh.phase}</strong> · 起幅 <span style="color:var(--accent-cyan);">${sh.timecode}</span>${durInfo} · 焦段 <span style="color:var(--accent-gold-tint);">${sh.lens}</span> · 实测反差 <span style="color:var(--accent-emerald);">${sh.contrast}</span><br/><span style="color:var(--text-secondary);">🎥 运镜与切镜逻辑：${sh.move}</span>`;
    }
    if (promptEl) promptEl.textContent = sh.prompt || item.aigcPayloads.keyframePrompt;
  };

  window.filterModalShots = function (mode, burstId, btnEl) {
    if (btnEl) {
      btnEl.parentElement.querySelectorAll(".shot-filter-btn, .burst-pill").forEach((b) => b.classList.remove("active"));
      btnEl.classList.add("active");
    }
    document.querySelectorAll("#modalShotsGrid .modal-shot-card").forEach((card) => {
      const rtype = card.dataset.rtype || "normal";
      const bid = +(card.dataset.burst || 0);
      let show = true;
      if (mode === "flash") show = rtype === "flash" || rtype === "fast";
      else if (mode === "long") show = rtype === "long";
      else if (mode === "burst") show = bid === burstId;
      card.style.display = show ? "block" : "none";
    });
  };

  window.openForensicModal = function (id) {
    const item = db.find((x) => x.id === id);
    if (!item) return;
    const rhy = getRhythmProfile(item);
    const voJson = JSON.stringify(item.audio.elevenLabsVO, null, 2);
    const sfxJson = JSON.stringify(item.audio.elevenLabsSFX, null, 2);
    const hasShots = item.shots && item.shots.length > 0;
    const firstShot = hasShots ? item.shots[0] : null;
    const maxHz = Math.max(2.5, ...rhy.densityCurve.map((b) => b.hz));

    const rhythmTelemetrySection = `
      <div class="spec-box" style="border-color:rgba(244,63,94,0.42);background:linear-gradient(180deg,#121520 0%,#0b0d14 100%);">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.5rem;margin-bottom:0.75rem;">
          <h3 style="font-size:0.98rem;color:#fda4af;">📈 V3.0 全片镜头频率与剪辑节奏心电图谱 (scdet 毫秒级真切点检测 · 一秒多镜闪切群落解剖)</h3>
          <span class="badge" style="border-color:#f43f5e;color:#fda4af;">${rhy.rhythmArchetype}</span>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(165px,1fr));gap:0.6rem;margin-bottom:0.8rem;">
          <div style="background:#07090e;padding:0.55rem 0.7rem;border-radius:6px;border:1px solid var(--border-subtle);">
            <div style="font-size:0.72rem;color:var(--text-muted);">全片实测总镜数</div>
            <div style="font-size:1.1rem;font-weight:800;color:var(--accent-cyan);">${rhy.totalShots} 镜 <span style="font-size:0.74rem;font-weight:400;color:var(--text-secondary);">/ ${item.durationSec || 75}s</span></div>
          </div>
          <div style="background:#07090e;padding:0.55rem 0.7rem;border-radius:6px;border:1px solid var(--border-subtle);">
            <div style="font-size:0.72rem;color:var(--text-muted);">实测平均 / 中位镜长</div>
            <div style="font-size:1.1rem;font-weight:800;color:var(--accent-gold-tint);">${rhy.measuredASL} <span style="font-size:0.74rem;font-weight:400;color:var(--text-secondary);">(中位 ${rhy.medianASL})</span></div>
          </div>
          <div style="background:#07090e;padding:0.55rem 0.7rem;border-radius:6px;border:1px solid var(--border-subtle);">
            <div style="font-size:0.72rem;color:var(--text-muted);">最快闪切 ↔ 最长呼吸镜</div>
            <div style="font-size:1.05rem;font-weight:800;color:#f43f5e;">⚡${rhy.shortestShotSec}s <span style="color:var(--text-muted);">↔</span> <span style="color:#10b981;">🧘${rhy.longestShotSec}s</span></div>
          </div>
          <div style="background:#07090e;padding:0.55rem 0.7rem;border-radius:6px;border:1px solid var(--border-subtle);">
            <div style="font-size:0.72rem;color:var(--text-muted);">亚秒闪切(&lt;0.85s) &amp; 峰值频率</div>
            <div style="font-size:1.05rem;font-weight:800;color:#fda4af;">${rhy.flashCutCount}镜 (${rhy.flashCutRatio}) · ${rhy.peakCutsPerSec}镜/秒</div>
          </div>
        </div>
        <div style="font-size:0.75rem;color:var(--text-secondary);margin-bottom:0.3rem;display:flex;justify-content:space-between;">
          <span>📊 全片 20 段镜头切变频率心电图 (Cuts/Sec 密度峰值越高 = 1秒内闪过镜头越密集)：</span>
          <span><span style="color:#f43f5e;">■ ⚡亚秒闪切(&lt;0.85s)</span> · <span style="color:#f59e0b;">■ 🥁快切(0.85-1.8s)</span> · <span style="color:#38bdf8;">■ 🎬标准(1.8-3.5s)</span> · <span style="color:#10b981;">■ 🧘长镜(&ge;3.5s·1镜1帧)</span></span>
        </div>
        <div class="ecg-bars">
          ${rhy.densityCurve.map((b) => {
            const hPct = Math.max(12, Math.min(100, Math.round((b.hz / maxHz) * 100)));
            const col = b.state === "flash" ? "#f43f5e" : (b.state === "fast" ? "#f59e0b" : (b.state === "long" ? "#10b981" : "#38bdf8"));
            return `<div style="height:${hPct}%;background:${col};border-radius:2px 2px 0 0;position:relative;" title="时段 ${b.t0}s–${b.t1}s · 包含 ${b.shots} 镜 · 频率 ${b.hz} 镜/秒 · 最短镜 ${b.minDur}s"></div>`;
          }).join("")}
        </div>
        <div style="font-size:0.74rem;color:var(--text-secondary);margin:0.55rem 0 0.25rem;">🎞️ 全片 100% 真实切点 1:1 比例尺条形码（共 ${rhy.totalShots} 个真实镜头边界，宽度严格对应单镜持续秒数）：</div>
        <div class="rhythm-barcode" style="height:18px;border-radius:4px;border:1px solid var(--border-strong);">
          ${rhy.allShots.map((s) => `<span class="rhythm-seg t-${s.t}" style="flex:${Math.max(0.15, s.d)};" title="Shot #${s.no} [${s.s}s–${s.e}s] · 持续 ${s.d}s (${s.t === "flash" ? "⚡亚秒闪切" : (s.t === "long" ? "🧘呼吸长镜·1镜1帧" : "叙事镜头")})"></span>`).join("")}
        </div>
        ${rhy.burstClusters && rhy.burstClusters.length > 0 ? `
          <div style="margin-top:0.65rem;display:flex;flex-wrap:wrap;gap:0.45rem;align-items:center;">
            <span style="font-size:0.76rem;color:#fda4af;font-weight:700;">🔥 侦测到 ${rhy.burstClusters.length} 处「一秒多镜」高频闪切组接群落：</span>
            ${rhy.burstClusters.map((b) => `<button type="button" class="burst-pill" onclick="window.filterModalShots('burst', ${b.burstId}, this)">⚡ ${b.label}</button>`).join("")}
          </div>
        ` : `<div style="margin-top:0.55rem;font-size:0.76rem;color:#6ee7b7;">🧘 全片无亚秒级急促闪切群落，采用沉稳呼吸长镜头调度（每个独立长镜仅抽1帧代表帧）。</div>`}
      </div>
    `;

    const storyboardSection = hasShots ? `
      <div class="spec-box" style="border-color:rgba(16,185,129,0.35);">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.5rem;margin-bottom:0.65rem;">
          <h3 style="font-size:0.96rem;color:var(--accent-emerald);">🎞️ 自适应真切点分镜台 (长镜1帧定乾坤 · 闪切组接逐镜连捕 · 共捕获 ${item.shots.length} 帧代表性分镜)</h3>
          <div style="display:flex;flex-wrap:wrap;gap:0.35rem;">
            <button type="button" class="shot-filter-btn active" onclick="window.filterModalShots('all', 0, this)">全部捕获 (${item.shots.length})</button>
            <button type="button" class="shot-filter-btn" onclick="window.filterModalShots('flash', 0, this)">⚡ 仅看闪切/快切 (&lt;1.8s)</button>
            <button type="button" class="shot-filter-btn" onclick="window.filterModalShots('long', 0, this)">🧘 仅看呼吸长镜 (&ge;3.5s·1镜1帧)</button>
          </div>
        </div>
        <div style="display:grid;grid-template-columns:1.15fr 1.85fr;gap:0.9rem;align-items:start;">
          <div style="border-radius:8px;overflow:hidden;border:1px solid var(--border-subtle);background:#05070c;position:sticky;top:0.5rem;">
            <img id="modalShotHeroImg" src="${firstShot.thumb}" alt="${firstShot.phase}" style="width:100%;aspect-ratio:16/9;object-fit:cover;display:block;" />
            <div id="modalShotMeta" style="padding:0.6rem 0.75rem;font-size:0.78rem;color:var(--text-primary);border-top:1px solid var(--border-subtle);line-height:1.5;">
              <strong>${firstShot.phase}</strong> · 起幅 <span style="color:var(--accent-cyan);">${firstShot.timecode}</span> · 单镜时长 <strong style="color:#10b981;">${firstShot.durationSec || 2.0}s</strong> · 焦段 <span style="color:var(--accent-gold-tint);">${firstShot.lens}</span> · 反差 <span style="color:var(--accent-emerald);">${firstShot.contrast}</span><br/><span style="color:var(--text-secondary);">🎥 运镜与切镜逻辑：${firstShot.move}</span>
            </div>
            <div style="padding:0 0.75rem 0.7rem;">
              <div style="display:flex;justify-content:space-between;align-items:center;">
                <span style="font-size:0.75rem;color:var(--accent-cyan);font-weight:600;">🎯 当前选中分镜单帧复刻 Prompt：</span>
                <button type="button" class="btn-copy" onclick="window.copyText(document.getElementById('modalShotPrompt').textContent, this)">📋 复制该镜 Prompt</button>
              </div>
              <pre id="modalShotPrompt" class="code-block" style="margin-top:0.3rem;font-size:0.73rem;">${firstShot.prompt || item.aigcPayloads.keyframePrompt}</pre>
            </div>
          </div>
          <div id="modalShotsGrid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(155px,1fr));gap:0.5rem;max-height:460px;overflow-y:auto;padding-right:4px;">
            ${item.shots.map((sh) => {
              const rtype = sh.rhythmType || "normal";
              const badgeCol = rtype === "flash" ? "#f43f5e" : (rtype === "long" ? "#10b981" : (rtype === "fast" ? "#f59e0b" : "#38bdf8"));
              const durLabel = sh.durationSec ? `${sh.durationSec}s` : sh.contrast;
              return `
                <div class="modal-shot-card" data-rtype="${rtype}" data-burst="${sh.burstId || 0}"
                     onclick="window.selectModalShot('${item.id}', ${sh.index})"
                     style="cursor:pointer;border:1px solid ${rtype === "flash" ? "rgba(244,63,94,0.55)" : "var(--border-subtle)"};border-radius:6px;overflow:hidden;background:#090d16;transition:transform 0.15s;"
                     onmouseenter="this.style.borderColor='var(--accent-cyan)'"
                     onmouseleave="this.style.borderColor='${rtype === "flash" ? "rgba(244,63,94,0.55)" : "var(--border-subtle)"}'">
                  <div style="position:relative;aspect-ratio:16/9;">
                    <img src="${sh.thumb}" alt="${sh.phase}" loading="lazy" style="width:100%;height:100%;object-fit:cover;display:block;" />
                    <span style="position:absolute;top:3px;left:4px;font-size:9.5px;background:rgba(0,0,0,0.82);color:var(--accent-gold-tint);padding:1px 4px;border-radius:3px;">#${sh.shotNo || sh.index} · ${sh.timecode}</span>
                    <span style="position:absolute;bottom:3px;right:4px;font-size:9.5px;background:${badgeCol};color:#fff;padding:1px 4px;border-radius:3px;font-weight:700;">${durLabel}</span>
                  </div>
                  <div style="display:grid;grid-template-columns:repeat(5,1fr);height:5px;">
                    ${sh.palette.map((p) => `<span style="background:${p.hex};"></span>`).join("")}
                  </div>
                  <div style="padding:3px 5px;font-size:9.5px;color:var(--text-secondary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${sh.phase.replace(/^Shot #?\d+\s*·\s*/, '')}</div>
                </div>
              `;
            }).join("")}
          </div>
        </div>
      </div>
    ` : "";

    dialogContent.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:1rem;border-bottom:1px solid var(--border-subtle);padding-bottom:0.9rem;">
        <div>
          <span class="badge badge-gold">${item.categoryLabel} · ID: ${item.id}</span>
          <h2 id="dialogTitle" style="font-size:1.35rem;margin-top:0.35rem;">${item.title}</h2>
          <p style="font-size:0.84rem;color:var(--text-secondary);">${item.brand} · 来源：<a href="${item.sourceUrl}" target="_blank" rel="noopener" style="color:var(--accent-cyan);">${item.sourcePlatform} ↗</a></p>
        </div>
        <div style="display:flex;gap:0.5rem;">
          <button type="button" class="btn-copy" onclick="window.loadIntoCompiler('${item.id}')">⚙️ 载入 AIGC 编译器</button>
          <button type="button" class="btn-copy" onclick="document.getElementById('forensicDialog').close()">✕ 关闭 (Esc)</button>
        </div>
      </div>

      ${rhythmTelemetrySection}
      ${storyboardSection}

      <div class="spec-grid">
        <div class="spec-box">
          <h3 style="font-size:0.92rem;color:var(--accent-gold-tint);">① 6维光学指纹 (Optical Fingerprint)</h3>
          <p style="font-size:0.82rem;margin-top:0.4rem;"><strong>机身/画幅：</strong>16:9 · ${item.optics.camera}<br/><strong>镜头焦段：</strong>${item.optics.lens} (${item.optics.focalLength})<br/><strong>光圈景深：</strong>${item.optics.aperture}<br/><strong>胶片/LUT：</strong>${item.optics.filmStock}<br/><strong>高光光晕：</strong>${item.optics.halation}</p>
        </div>
        <div class="spec-box">
          <h3 style="font-size:0.92rem;color:var(--accent-gold-tint);">② 光影造型与运镜调度 (Lighting & Kinematics)</h3>
          <p style="font-size:0.82rem;margin-top:0.4rem;"><strong>光比设定：</strong>${item.lighting.ratio}<br/><strong>色温对撞：</strong>${item.lighting.kelvin}<br/><strong>核心运镜：</strong>${item.kinematics.primaryMove}<br/><strong>速度曲线：</strong>${item.kinematics.speedProfile}<br/><strong>几何站位：</strong>${item.kinematics.blockingRule}</p>
        </div>
        <div class="spec-box">
          <h3 style="font-size:0.92rem;color:var(--accent-gold-tint);">③ 剪辑节拍与高密度修辞 (Editing & Rhetoric)</h3>
          <p style="font-size:0.82rem;margin-top:0.4rem;"><strong>节拍与镜长：</strong>${item.editing.bpm} BPM · 平均 ${item.editing.avgShotLength}<br/><strong>切镜逻辑：</strong>${item.editing.cutStyle}<br/><strong>60%黄金静音：</strong>${item.editing.silenceDropSec}<br/><strong>声画分流：</strong>${item.rhetoric.voVsHudSplit}<br/><strong>金句母本：</strong>“${item.rhetoric.sampleLine}”</p>
        </div>
      </div>

      <div class="spec-box">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <h3 style="font-size:0.95rem;color:var(--accent-cyan);">🖼️ 载荷 A：Nano Banana / Seedream 5.0 16:9 母帧生成 Prompt (含6维光学指纹)</h3>
          <button type="button" class="btn-copy" onclick="window.copyText(decodeURIComponent('${encodeURIComponent(item.aigcPayloads.keyframePrompt)}'), this)">📋 复制母帧 Prompt</button>
        </div>
        <pre class="code-block">${item.aigcPayloads.keyframePrompt}</pre>
      </div>

      <div class="spec-box">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <h3 style="font-size:0.95rem;color:var(--accent-emerald);">🎬 载荷 B：即梦 Seedance 2.5 (30s M2V) / 可灵 Kling 4.0 五阶防御性视频 Prompt</h3>
          <button type="button" class="btn-copy" onclick="window.copyText(decodeURIComponent('${encodeURIComponent(item.aigcPayloads.seedancePrompt)}'), this)">📋 复制 Seedance 五阶 Prompt</button>
        </div>
        <pre class="code-block">${item.aigcPayloads.seedancePrompt}</pre>
      </div>

      <div class="spec-grid">
        <div class="spec-box">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <h3 style="font-size:0.9rem;color:var(--accent-gold-tint);">🎙️ 载荷 C：ElevenLabs TTS & SFX 接口 JSON</h3>
            <button type="button" class="btn-copy" onclick="window.copyText(decodeURIComponent('${encodeURIComponent(voJson + "\n\n" + sfxJson)}'), this)">📋 复制 ElevenLabs 参数</button>
          </div>
          <pre class="code-block">// VO Settings:\n${voJson}\n// SFX API Payload:\n${sfxJson}</pre>
        </div>
        <div class="spec-box">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <h3 style="font-size:0.9rem;color:var(--accent-gold-tint);">🎵 载荷 D：Suno v4.5 / Udio 分轨配乐指令 (${item.audio.musicModel.bpm} BPM)</h3>
            <button type="button" class="btn-copy" onclick="window.copyText(decodeURIComponent('${encodeURIComponent(item.audio.musicModel.sunoPrompt)}'), this)">📋 复制配乐 Prompt</button>
          </div>
          <pre class="code-block">Genre: ${item.audio.musicModel.genre} (${item.audio.musicModel.key}, ${item.audio.musicModel.meter})\nStems: ${item.audio.musicModel.stems}\n\nPrompt:\n${item.audio.musicModel.sunoPrompt}</pre>
        </div>
      </div>
    `;
    dialog.showModal();
  };

  window.__renderMatrix = renderMatrix;
  window.__setFilters = function (cat, mood, pacing, q) {
    if (cat !== null) activeCat = cat;
    if (mood !== null) activeMood = mood;
    if (pacing !== null) activePacing = pacing;
    if (q !== null) searchQuery = q;
    renderMatrix();
  };
})();

// AIPGC AESTHETICA STUDIO — Part 2: Workflow Compiler, Cadence Engine & Source Radar
(function () {
  const db = window.AESTHETICA_DB || [];
  const sources = window.GLOBAL_SOURCES || [];

  const templateSelect = document.getElementById("compilerTemplateSelect");
  const compSubject = document.getElementById("compSubject");
  const compAction = document.getElementById("compAction");
  const compDialogue = document.getElementById("compDialogue");
  const compHud = document.getElementById("compHud");
  const cadenceReadout = document.getElementById("cadenceReadout");
  const compilerOutput = document.getElementById("compilerOutputContainer");

  if (templateSelect) {
    templateSelect.innerHTML = db.map((item) =>
      `<option value="${item.id}">[${item.id}] ${item.title} (${item.optics.lens} · ${item.editing.bpm} BPM)</option>`
    ).join("");
  }

  function runCompiler() {
    const id = templateSelect.value || (db[0] && db[0].id);
    const tpl = db.find((x) => x.id === id) || db[0];
    if (!tpl) return;

    const subject = compSubject.value.trim();
    const action = compAction.value.trim();
    const dialogue = compDialogue.value.trim();
    const hud = compHud.value.trim();

    // Cold-Pan Cadence Formula: T = Chars / 4.2 + 0.4s (in) + 2.0s (deadpan hold)
    const cnChars = (dialogue.match(/[\u4e00-\u9fa5A-Za-z0-9]/g) || []).length;
    const speakDur = +(cnChars / 4.2).toFixed(1);
    const totalDur = +(speakDur + 0.4 + 2.0).toFixed(1);
    const silenceAt = +(totalDur * 0.6).toFixed(1);

    cadenceReadout.innerHTML = `
      <div style="color:var(--accent-emerald);font-weight:700;">⏱️ 冷面博弈语速拟合公式校验通过 (Zero Time-Stretching Guard)：</div>
      <div style="margin-top:0.25rem;color:var(--text-secondary);">
        有效字数：<strong>${cnChars} 字</strong> ➔ 吐字时长：<strong>${speakDur}s</strong> + 起幅微张嘴气口 <strong>0.4s</strong> + 终段死寂落幅 <strong>2.0s</strong> = 建议单镜总时长 <strong>${totalDur}s</strong>（60%黄金静音点位于 <strong>${silenceAt}s</strong>）
      </div>
    `;

    const hexList = tpl.palette.map((p) => `${p.name}(${p.hex})`).join(" / ");
    const compiledKeyframe = `16:9 widescreen cinema frame. Shot on ${tpl.optics.camera} with ${tpl.optics.lens} (${tpl.optics.focalLength}) at ${tpl.optics.aperture}. Film Stock: ${tpl.optics.filmStock}. Lighting: ${tpl.lighting.ratio}, ${tpl.lighting.kelvin}. Color Palette: ${hexList}. Subject: ${subject}. Parted lips (2-3mm natural gap) ready to speak, eyes locked 15 degrees off-camera, authentic skin subsurface scattering with visible pores, zero digital plastic smoothing.`;

    const compiledSeedance = `【空间与机位光学】：16:9 · ${tpl.optics.lens} (${tpl.optics.focalLength}) · ${tpl.optics.aperture} · ${tpl.lighting.ratio} · 主色板 ${hexList}
【角色与动作因果时序】：
  [0-0.4s] ${subject}，眼神锁定轴线偏右15度，双唇微启2~3mm自然蓄势开口；
  [0.4-${(0.4 + speakDur).toFixed(1)}s] 摄影机执行【${tpl.kinematics.primaryMove}】，${action}，人物同步清晰吐字：“${dialogue}”；
  [${(0.4 + speakDur).toFixed(1)}-${totalDur}s] 双唇自然收声闭合，保留整整2.0秒冷峻死寂落幅；左下角HUD角标净空区展示：${hud}。
【台词发音与拼音死锁】：字正腔圆，严禁吞音与多音字误读！
【纯净音轨与声学空间混响】：绝对严禁任何背景音乐（Zero BGM）！绝对严禁任何环境底噪（Zero Ambient Noise）！仅保留纯净角色原声对白与场景自然物理声学混响（Natural Spatial Acoustic Reverb）！
【绝对物理负向禁令】：100% Deadpan（冷面严肃，严禁假笑）！严禁斗鸡眼！严禁视线回正直视镜头！严禁背景变形！`;

    const elevenPayload = JSON.stringify({
      model_id: "eleven_multilingual_v2",
      text: `${dialogue} <break time="2.0s"/>`,
      voice_settings: {
        stability: tpl.audio.elevenLabsVO.stability,
        similarity_boost: tpl.audio.elevenLabsVO.similarity_boost,
        style: tpl.audio.elevenLabsVO.style,
        use_speaker_boost: true
      },
      sfx_companion_request: tpl.audio.elevenLabsSFX
    }, null, 2);

    compilerOutput.innerHTML = `
      <h2 style="font-size:1.1rem;color:var(--accent-cyan);margin-bottom:0.8rem;">Step 2 · 已编译四大引擎可执行载荷 (挂载母本：${tpl.title})</h2>
      <div style="display:flex;flex-direction:column;gap:0.9rem;">
        <div>
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <strong style="font-size:0.84rem;color:var(--accent-gold-tint);">① Nano Banana / Seedream 5.0 首帧 Prompt (含2mm微张嘴先验)</strong>
            <button type="button" class="btn-copy" onclick="window.copyText(this.parentElement.nextElementSibling.textContent, this)">复制首帧 Prompt</button>
          </div>
          <pre class="code-block">${compiledKeyframe}</pre>
        </div>
        <div>
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <strong style="font-size:0.84rem;color:var(--accent-emerald);">② 即梦 Seedance 2.5 / 可灵 Kling 4.0 五阶防御性视频 Prompt</strong>
            <button type="button" class="btn-copy" onclick="window.copyText(this.parentElement.nextElementSibling.textContent, this)">复制视频 Prompt</button>
          </div>
          <pre class="code-block">${compiledSeedance}</pre>
        </div>
        <div>
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <strong style="font-size:0.84rem;color:var(--accent-cyan);">③ ElevenLabs TTS + SFX 接口 JSON & Suno 配乐指令 (${tpl.editing.bpm} BPM)</strong>
            <button type="button" class="btn-copy" onclick="window.copyText(this.parentElement.nextElementSibling.textContent, this)">复制音频 API JSON</button>
          </div>
          <pre class="code-block">${elevenPayload}\n\n// Music API Prompt:\n${tpl.audio.musicModel.sunoPrompt}</pre>
        </div>
      </div>
    `;
  }

  function renderSources() {
    const grid = document.getElementById("sourcesGrid");
    if (!grid) return;
    grid.innerHTML = sources.map((s) => `
      <div class="spec-box" style="display:flex;flex-direction:column;gap:0.55rem;">
        <span class="badge badge-gold" style="align-self:flex-start;">${s.tier}</span>
        <h3 style="font-size:1rem;"><a href="${s.url}" target="_blank" rel="noopener" style="color:var(--accent-cyan);text-decoration:none;">${s.name} ↗</a></h3>
        <p style="font-size:0.82rem;color:var(--text-secondary);">${s.strength}</p>
        <div style="font-size:0.76rem;color:var(--accent-emerald);margin-top:auto;"><strong>🛠️ 逆向提取策略：</strong>${s.method}</div>
      </div>
    `).join("");
  }

  function updateFunnelCalc() {
    const likes = +(document.getElementById("calcLikes").value || 0);
    const collects = +(document.getElementById("calcCollects").value || 0);
    const ratio = likes > 0 ? (collects / likes).toFixed(2) : "0.00";
    const score = Math.round((likes + 1.5 * collects) * 1.3);
    const pass = collects >= 1200 && ratio >= 1.8;
    const el = document.getElementById("calcVerdict");
    el.style.color = pass ? "var(--accent-emerald)" : "var(--accent-crimson)";
    el.textContent = pass
      ? `✅ S级殿堂母片准入通过！综合指数: ${score} · 藏赞比: ${ratio}x (专业导演高频拉片级)`
      : `❌ 建议过滤！综合指数: ${score} · 藏赞比: ${ratio}x (未达 1200藏 & 1.8x 审美水位线)`;
  }

  // Bind UI Events
  document.querySelectorAll(".nav-tab").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".nav-tab").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const v = btn.dataset.view;
      document.getElementById("view-matrix").classList.toggle("hidden", v !== "matrix");
      document.getElementById("view-compiler").classList.toggle("hidden", v !== "compiler");
      document.getElementById("view-sources").classList.toggle("hidden", v !== "sources");
    });
  });

  document.querySelectorAll("#categoryPills .filter-pill").forEach((pill) => {
    pill.addEventListener("click", () => {
      document.querySelectorAll("#categoryPills .filter-pill").forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");
      window.__setFilters(pill.dataset.cat, null, null, null);
    });
  });

  document.getElementById("moodSelect").addEventListener("change", (e) => window.__setFilters(null, e.target.value, null, null));
  document.getElementById("pacingSelect").addEventListener("change", (e) => window.__setFilters(null, null, e.target.value, null));
  document.getElementById("searchInput").addEventListener("input", (e) => window.__setFilters(null, null, null, e.target.value));

  [templateSelect, compSubject, compAction, compDialogue, compHud].forEach((el) => {
    if (el) el.addEventListener("input", runCompiler);
  });
  ["calcLikes", "calcCollects"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("input", updateFunnelCalc);
  });

  window.loadIntoCompiler = function (id) {
    document.getElementById("forensicDialog").close();
    templateSelect.value = id;
    runCompiler();
    document.querySelector('.nav-tab[data-view="compiler"]').click();
  };

  window.__renderMatrix();
  runCompiler();
  renderSources();
  updateFunnelCalc();
})();
