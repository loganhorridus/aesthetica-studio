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

  function filterItems() {
    return db.filter((item) => {
      if (activeCat !== "all" && item.category !== activeCat) return false;
      if (activeMood !== "all" && item.mood !== activeMood) return false;
      if (activePacing !== "all" && item.pacing !== activePacing) return false;
      if (searchQuery) {
        const hay = JSON.stringify(item).toLowerCase();
        if (!hay.includes(searchQuery.toLowerCase())) return false;
      }
      return true;
    });
  }

  function renderMatrix() {
    const items = filterItems();
    resultCount.textContent = `当前命中 ${items.length} / ${db.length} 部殿堂级母片标杆（点击色块直接复制 HEX，点击卡片展开八维拆解与 AIGC 载荷）`;

    matrixGrid.innerHTML = items.map((item) => {
      const swatches = item.palette.map((p) =>
        `<div class="swatch-chip" style="background:${p.hex};" title="${p.name}: 点击复制 ${p.hex}" onclick="event.stopPropagation();window.copyText('${p.hex}', this)">${p.hex}</div>`
      ).join("");

      return `
        <div class="card-container">
          <article class="aesthetic-card" onclick="window.openForensicModal('${item.id}')">
            <div class="card-thumb-wrap">
              <img src="${item.thumb}" alt="${item.title}" loading="lazy" />
              <div class="card-badges">
                <span class="badge badge-gold">🏷️ ${item.categoryLabel}</span>
                <span class="badge">🥁 ${item.editing.bpm} BPM · ${item.editing.avgShotLength}/镜</span>
              </div>
            </div>
            <div class="palette-strip" aria-label="核心5色HEX色板">${swatches}</div>
            <div class="card-body">
              <div style="font-size:0.74rem;color:var(--accent-cyan);font-weight:600;">${item.brand} · ${item.stats}</div>
              <h2 style="font-size:1.02rem;font-weight:700;">${item.title}</h2>
              <div class="card-meta-grid">
                <div><strong>📷 光学：</strong>${item.optics.lens} (${item.optics.aperture})</div>
                <div><strong>💡 光比：</strong>${item.lighting.ratio}</div>
                <div><strong>🎥 运镜：</strong>${item.kinematics.primaryMove}</div>
                <div><strong>🔇 60%静音：</strong>${item.editing.silenceDropSec}</div>
              </div>
              <div style="display:flex;justify-content:space-between;align-items:center;margin-top:auto;padding-top:0.4rem;">
                <span style="font-size:0.75rem;color:var(--text-muted);">母题：${item.rhetoric.motif}</span>
                <span class="btn-copy">🔬 展开八维拆解 & Prompt</span>
              </div>
            </div>
          </article>
        </div>
      `;
    }).join("");
  }

  window.openForensicModal = function (id) {
    const item = db.find((x) => x.id === id);
    if (!item) return;
    const voJson = JSON.stringify(item.audio.elevenLabsVO, null, 2);
    const sfxJson = JSON.stringify(item.audio.elevenLabsSFX, null, 2);

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
