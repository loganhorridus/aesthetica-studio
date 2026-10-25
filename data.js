// AIPGC AESTHETICA STUDIO — Full-Stack Aesthetic Deconstruction Database
window.AESTHETICA_DB = [
  {
    id: "LY-01",
    title: "Saint Laurent · 暗调绯红变形宽银幕剧场",
    brand: "Saint Laurent (YSL Productions)",
    category: "luxury",
    categoryLabel: "顶奢时装屋",
    mood: "chiaroscuro",
    pacing: "slow",
    sourcePlatform: "YouTube (@ysl) / NOWNESS",
    sourceUrl: "https://www.youtube.com/@ysl",
    thumb: "assets/thumbs/16_tantallon_fashion.jpg",
    stats: "戛纳主竞赛制片厂 · Anthony Vaccarello / Gaspar Noé 视觉母本",
    optics: {
      camera: "Panavision Millennium DXL2 / 35mm Film",
      lens: "Panavision C-Series Anamorphic",
      focalLength: "50mm / 75mm",
      aperture: "T2.0 (椭圆变形散景)",
      filmStock: "Kodak Vision3 500T 5219 (迫冲1档)",
      halation: "高光边缘强烈绯红胶片光晕 (Red Halation)"
    },
    lighting: {
      ratio: "8:1 ~ 12:1 极高反差暗调 (Chiaroscuro)",
      kelvin: "2400K 钨丝绯红对撞 5600K 冷白大理石",
      style: "顶置刀光切割黑曜石暗部，保留建筑几何轮廓"
    },
    palette: [
      { hex: "#08080A", name: "Obsidian Shadow" },
      { hex: "#8B0000", name: "Tungsten Crimson" },
      { hex: "#0A3B2C", name: "Noé Emerald" },
      { hex: "#D8DCE3", name: "Cold Marble" },
      { hex: "#C5A059", name: "Vintage Brass" }
    ],
    kinematics: {
      primaryMove: "48fps 催眠贴地慢推 + 360° 顶视漩涡旋转",
      speedProfile: "极慢速恒定阻尼推进 (0.4m/s)，杜绝急促抖动",
      blockingRule: "单轴线深长廊纵深，主体居黄金分割位偏角15°冷视"
    },
    editing: {
      bpm: 72,
      avgShotLength: "5.2s",
      cutStyle: "慢速抽帧残影叠化 + 重低音脉冲硬切",
      silenceDropSec: "全片 62% 处合成器骤停，仅留 3.5s 高跟鞋回响"
    },
    rhetoric: {
      motif: "【克制】×【危险】",
      cadenceRule: "法式冷面独白，字间留白 >1.2s，零推销词汇",
      voVsHudSplit: "全片仅1句耳语独白；季别与导演署名以极细衬线体居中闪现",
      sampleLine: "La nuit ne cache rien, elle révèle l'essentiel. (黑夜从不掩藏，它只显露本质。)"
    },
    audio: {
      elevenLabsVO: { archetype: "A. Luxury Whisper / Cold-Pan", stability: 0.38, similarity_boost: 0.85, style: 0.15, use_speaker_boost: true, ssml: "[whispers]黑夜从不掩藏，<break time=\"1.2s\"/>它只显露本质。" },
      elevenLabsSFX: { prompt: "Close-up contact mic, sharp stiletto heels walking slowly in vast cold marble cathedral corridor, subtle leather coat friction, deep natural hall reverb, zero noise.", duration_seconds: 4.0, prompt_influence: 0.82 },
      musicModel: { genre: "High-Fashion Dark Synth", bpm: 72, key: "A Minor", meter: "4/4", stems: "Analog Moog sub-bass + Arpeggiator + Cavernous snare", sunoPrompt: "[Instrumental] dark Parisian luxury synthwave, SebastiAn & Giorgio Moroder style, 72 BPM, hypnotic analog bass pulse, cold marble reverb, [Break: 100% Dramatic Silence at 60%]" }
    },
    aigcPayloads: {
      keyframePrompt: "16:9 widescreen cinema frame. Shot on 35mm Kodak Vision3 500T with Panavision 50mm Anamorphic lens at T2.0. Extreme 10:1 chiaroscuro lighting: deep obsidian shadows (#08080A) slicing across a cold modernist marble gallery, 2400K crimson tungsten rim light (#8B0000) grazing a sharp-shouldered black velvet tailored coat. Parted lips (2mm), eyes locked 15 degrees off-camera with 100% deadpan aristocratic authority, visible skin pores and subtle film halation.",
      seedancePrompt: "【空间与机位光学】：16:9 · Panavision 50mm变形宽银幕镜头 · T2.0椭圆浅景深 · 10:1极高反差暗调布光 · 2400K绯红逆光切割黑曜石暗部（#08080A）\n【角色与动作因果时序】：\n  [0-0.5s] 人物立于大理石长廊纵深中轴，双唇微启2mm，眼神偏右15度冰冷锁定前方；\n  [0.5-4.5s] 摄影机以0.4m/s恒定阻尼贴地缓慢推近，人物迈出两步，黑丝绒大衣下摆随步伐产生厚重物理垂坠摆动；\n  [4.5-8.0s] 人物停步微昂下巴，侧逆光在颧骨拉出锐利高光，整整2.5秒冷峻死寂凝视落幅。\n【台词发音与拼音死锁】：低沉冷冽耳语，吐字清晰克制。\n【纯净音轨与声学空间混响】：绝对严禁任何背景音乐（Zero BGM）！绝对严禁任何环境底噪（Zero Ambient Noise）！仅保留空旷大理石厅堂内高跟鞋踏地声、皮料摩挲声与带自然长混响的人声！\n【绝对物理负向禁令】：100% Deadpan（严禁嘴角上扬假笑）！严禁直视镜头！严禁塑料磨皮！严禁背景变形！"
    }
  },
  {
    id: "LY-02",
    title: "Hermès · 正交对称几何与马术机械奇境",
    brand: "Hermès Paris",
    category: "luxury",
    categoryLabel: "顶奢时装屋",
    mood: "highkey",
    pacing: "fast",
    sourcePlatform: "YouTube (@hermes) / Directors Library",
    sourceUrl: "https://www.youtube.com/@hermes",
    thumb: "assets/thumbs/22_milanese_villa.jpg",
    stats: "全球顶奢TVC几何调度典范 · 韦斯·安德森式正交运镜",
    optics: {
      camera: "ARRI Alexa Mini LF (Large Format)",
      lens: "ARRI Master Prime (零畸变光学)",
      focalLength: "35mm",
      aperture: "T5.6 (前后景全清晰深景深)",
      filmStock: "Kodak Portra 160 柔和暖调数字映射",
      halation: "纯净高调漫反射，零炫光污染"
    },
    lighting: {
      ratio: "2:1 高调暖白柔光箱顶光 (High-Key Softbox)",
      kelvin: "5000K 清透暖日光",
      style: "无阴影均匀包裹，凸显丝巾真丝斜纹与马鞍皮纹理"
    },
    palette: [
      { hex: "#F37021", name: "Hermès Orange" },
      { hex: "#F5EFE6", name: "Parchment Cream" },
      { hex: "#7A3E18", name: "Saddle Cognac" },
      { hex: "#A3B899", name: "Silk Pistachio" },
      { hex: "#1C252C", name: "Ink Navy" }
    ],
    kinematics: {
      primaryMove: "90° 正交导轨平摇 (Lateral Dolly) + 直角急摇卡点 (Whip-Pan)",
      speedProfile: "加速—匀速—毫秒级机械急停定格，配合Rube Goldberg连锁装置",
      blockingRule: "画面绝对水平垂直对称 (X 50% 中轴锁死)"
    },
    editing: {
      bpm: 120,
      avgShotLength: "2.1s",
      cutStyle: "动势接力剪辑 (Action Carry Match-Cut) + 拨弦重音卡点",
      silenceDropSec: "60% 处连锁装置悬停 2.0s，一根羽毛轻触橙盒瞬间引爆高潮"
    },
    rhetoric: {
      motif: "【轻盈奇想】×【百年工坊】",
      cadenceRule: "轻快跳跃的三连短句，如室内乐拨弦般灵动",
      voVsHudSplit: "零旁白或极简法语诗句；工艺参数完全隐入微距动作",
      sampleLine: "Lightness is the highest form of precision. (轻盈，是精密的最高形态。)"
    },
    audio: {
      elevenLabsVO: { archetype: "A. Luxury Whisper / Cold-Pan", stability: 0.45, similarity_boost: 0.84, style: 0.25, use_speaker_boost: true, ssml: "轻盈，<break time=\"0.4s\"/>是精密的最高形态。" },
      elevenLabsSFX: { prompt: "Crisp studio foley, saddle leather stitch needle pull tightening, silk scarf snap in air, wooden domino chain click, dry intimate workshop acoustics.", duration_seconds: 2.5, prompt_influence: 0.85 },
      musicModel: { genre: "Luxury Minimalist Chamber", bpm: 120, key: "D Major", meter: "4/4", stems: "Pizzicato strings + Harpsichord + Woodwind stabs + Hoofbeat percussion", sunoPrompt: "[Instrumental] whimsical neoclassical chamber, 120 BPM, playful pizzicato violin, crisp harpsichord, equestrian rhythm, Wes Anderson & Hermès aesthetic, [Break: 2s sudden stop at 60%]" }
    },
    aigcPayloads: {
      keyframePrompt: "16:9 symmetrical architectural frame. Shot on ARRI Alexa Mini LF with 35mm Master Prime at T5.6 deep focus. High-key 5000K warm studio daylight (2:1 ratio). Perfect Wes Anderson orthogonal composition: Hermès Orange (#F37021) geometric leather workbench centered against Parchment Cream (#F5EFE6) walls, Saddle Cognac (#7A3E18) equestrian harness and floating silk scarf in mid-air.",
      seedancePrompt: "【空间与机位光学】：16:9 · ARRI 35mm零畸变定焦 · T5.6全清晰景深 · 5000K高调柔和顶光（2:1光比） · 爱马仕橘（#F37021）与羊皮纸米白（#F5EFE6）绝对对称构图\n【角色与动作因果时序】：\n  [0-2.5s] 摄影机沿水平导轨匀速向右正交平摇，工匠指尖轻弹马鞍皮扣，橙色礼盒沿木质轨道精准滑行；\n  [2.5-5.0s] 镜头90度直角急摇（Whip-Pan）毫秒级卡点停驻于画面正中，真丝方巾如折纸般轻盈展开落入盒中。\n【台词发音与拼音死锁】：清脆灵动，字字颗粒饱满。\n【纯净音轨与声学空间混响】：Zero BGM！Zero 环境底噪！仅保留真丝掠过空气的沙沙声、皮革紧绷轻响与清脆指尖叩击声，工坊近场自然反射！\n【绝对物理负向禁令】：严禁透视歪斜！严禁脏暗阴影！严禁多余手指畸变！"
    }
  },
  {
    id: "LY-03",
    title: "Prada · 智性开心果绿与粗野主义超现实",
    brand: "Prada Milano",
    category: "luxury",
    categoryLabel: "顶奢时装屋",
    mood: "cold",
    pacing: "medium",
    sourcePlatform: "YouTube (@Prada) / FrameSet",
    sourceUrl: "https://www.youtube.com/@Prada",
    thumb: "assets/thumbs/21_alpine_brutalist.jpg",
    stats: "Ferdinando Verderi 创意指导 · 兰斯莫斯式智性怪诞标杆",
    optics: {
      camera: "ARRI Alexa 65",
      lens: "ARRI Prime DNA 24mm Wide",
      focalLength: "24mm (广角几何张力)",
      aperture: "T4.0",
      filmStock: "Clean Digital Neutral + 低饱和冷绿矩阵",
      halation: "零光晕，极致锐利边缘"
    },
    lighting: {
      ratio: "3:1 顶置大型柔光网格冷峻布光",
      kelvin: "4500K 实验室中性冷光",
      style: "建筑天井漫射，强化混凝土肌理与尼龙廓形反光"
    },
    palette: [
      { hex: "#A8C3A0", name: "Prada Pistachio" },
      { hex: "#7D807D", name: "Brutalist Concrete" },
      { hex: "#4A1216", name: "Oxblood Leather" },
      { hex: "#C88A32", name: "Industrial Ochre" },
      { hex: "#141517", name: "Re-Nylon Black" }
    ],
    kinematics: {
      primaryMove: "机械导轨匀速横移 + 三脚架锁死45°突切",
      speedProfile: "冷酷无机质匀速运动，绝无手持呼吸感",
      blockingRule: "广角微仰拍 (-5°)，人物孤立于巨大粗野主义建筑中轴"
    },
    editing: {
      bpm: 84,
      avgShotLength: "4.5s",
      cutStyle: "反高潮冷面凝视后突然硬切 (Abrupt Static Cut)",
      silenceDropSec: "58% 处工业低频嗡鸣瞬间切断，插入 3s 纯净脚步回声"
    },
    rhetoric: {
      motif: "【智性解构】×【秩序越轨】",
      cadenceRule: "哲学命题式设问，语气绝对客观平静",
      voVsHudSplit: "仅在切黑瞬间打出粗黑无衬线体概念词 (MONOLITH / PARADOX)",
      sampleLine: "Architecture is the first garment we inhabit. (建筑，是我们栖居的第一件衣裳。)"
    },
    audio: {
      elevenLabsVO: { archetype: "A. Luxury Whisper / Cold-Pan", stability: 0.58, similarity_boost: 0.86, style: 0.10, use_speaker_boost: true, ssml: "建筑，<break time=\"0.8s\"/>是我们栖居的第一件衣裳。" },
      elevenLabsSFX: { prompt: "Heavy leather monolith boots stepping slowly on raw brutalist concrete floor, crisp nylon trench coat rustle, cold gallery acoustic echo, zero background hum.", duration_seconds: 3.0, prompt_influence: 0.80 },
      musicModel: { genre: "Architectural Ambient / Acid Minimal", bpm: 84, key: "C Minor", meter: "4/4", stems: "Roland TB-303 muted pulse + Bowed vibraphone + Sub drone", sunoPrompt: "[Instrumental] intellectual minimalist electronic, 84 BPM, cold brutalist gallery atmosphere, muted analog synth pulse, Prada runway aesthetic, [Break: 100% Silence at 60%]" }
    },
    aigcPayloads: {
      keyframePrompt: "16:9 architectural fashion frame. Shot on ARRI Alexa 65 with 24mm wide rectilinear lens at T4.0, subtle -5 degree low angle. Clinical 4500K overhead diffused lighting (3:1 ratio). Brutalist raw concrete monolith interior (#7D807D) contrasted with Prada Pistachio Green (#A8C3A0) geometric panels and Oxblood leather (#4A1216). Subject in structured Re-Nylon coat standing dead-center, parted lips (2mm), 100% deadpan intellectual gaze.",
      seedancePrompt: "【空间与机位光学】：16:9 · 24mm广角零畸变定焦 · T4.0深景深 · 4500K顶置冷峻柔光（3:1光比） · 普拉达开心果绿（#A8C3A0）对撞粗野主义清水混凝土（#7D807D）\n【角色与动作因果时序】：\n  [0-4.0s] 固定机位微仰拍，人物身着黑色结构感尼龙风衣伫立于混凝土通道正中，双唇微启2mm缓慢吐字；\n  [4.0-8.0s] 摄影机沿机械导轨匀速向右横移2米，人物缓慢转头15度冷视画外，保持整整2秒雕塑般静止落幅。\n【台词发音与拼音死锁】：冷峻客观，字正腔圆，零情绪泛滥。\n【纯净音轨与声学空间混响】：Zero BGM！Zero 环境杂音！仅保留混凝土美术馆空间的清脆皮靴回响、尼龙风衣摩擦声与自然空间混响人声！\n【绝对物理负向禁令】：100% Deadpan（严禁微笑）！严禁广角桶形畸变！严禁手持晃动！"
    }
  }
];

window.AESTHETICA_DB.push(
  {
    id: "TC-04",
    title: "vivo 蔡司人文电影 · 85mm APO长焦暮色呼吸感",
    brand: "vivo × ZEISS 影像盛典 / OPPO 绍兴青年公园",
    category: "tech3c",
    categoryLabel: "3C与蔡司光学",
    mood: "golden",
    pacing: "slow",
    sourcePlatform: "新片场 (2247藏) / vivo YouTube",
    sourceUrl: "https://www.xinpianchang.com/a13752897",
    localVideoPath: "新片场_2026宣传片高赞高藏精选库_32部全品类标杆/01_3C数码与智能家电硬件（4部）/03_【手机影像】OPPO绍兴_年轻人的城市公园_【下载理由：728赞2247藏·频道精选·手机人文影像纪实标杆】_4K.mp4",
    thumb: "assets/thumbs/02_oppo_shaoxing.jpg",
    stats: "728赞 · 2247藏 · 手机人文影像与蔡司长焦散景标杆",
    optics: {
      camera: "ARRI Alexa Mini LF / vivo X200 Ultra Log",
      lens: "ZEISS APO Telephoto 85mm & Biotar 50mm",
      focalLength: "85mm / 135mm (长焦空间压缩)",
      aperture: "T1.4 (柔润猫眼旋焦散景 + T*镀膜抗眩光)",
      filmStock: "Kodak Vision3 250D 5207 暖调人文胶片",
      halation: "夕阳逆光发丝呈温暖琥珀金边 (#E5A93C)"
    },
    lighting: {
      ratio: "3:1 黄金时刻自然侧逆光 (Golden Hour Backlight)",
      kelvin: "3500K 夕阳暖金对撞 4800K 江南暮色青蓝阴影",
      style: "真实环境漫射包裹，100%保留皮肤次表面散射与老人眼角细纹"
    },
    palette: [
      { hex: "#E5A93C", name: "Zeiss Amber Flare" },
      { hex: "#1C2B4B", name: "Twilight Indigo" },
      { hex: "#C98A6B", name: "Terracotta Skin" },
      { hex: "#4A6B6E", name: "Jiangnan Mist" },
      { hex: "#F4EFEA", name: "Warm Rice Paper" }
    ],
    kinematics: {
      primaryMove: "24fps 有机手持呼吸微晃 (Organic Handheld Drift) + 前景移焦",
      speedProfile: "随人物呼吸自然浮动，焦点从前景雨滴平滑切至眼眸",
      blockingRule: "过肩或前景遮挡窥视构图，将人物从喧嚣市井中温柔剥离"
    },
    editing: {
      bpm: 74,
      avgShotLength: "3.8s",
      cutStyle: "情绪视线顺切 + 同期声先行0.5秒 (J-Cut)",
      silenceDropSec: "前 6 秒纯江南落雨与单车铃声起幅；60% 处快门声定格静音 2.5s"
    },
    rhetoric: {
      motif: "【远方的光学】×【眼前的烟火】",
      cadenceRule: "温润散文体，不提一句像素参数，只讲人与人的凝视",
      voVsHudSplit: "VO轻声叙述生活切片；镜头焦段水印(85mm f/1.4)仅在定格帧底部极简浮现",
      sampleLine: "最好的镜头，不是看清一万米外的风景，而是接住一米内欲言又止的眼神。"
    },
    audio: {
      elevenLabsVO: { archetype: "C. Humanistic Documentary", stability: 0.32, similarity_boost: 0.78, style: 0.40, use_speaker_boost: true, ssml: "[subtle inhale]最好的镜头，不是看清一万米外的风景，<break time=\"0.6s\"/>而是接住一米内，欲言又止的眼神。" },
      elevenLabsSFX: { prompt: "Warm humanistic street foley, gentle rain falling on oiled paper umbrella, distant vintage bicycle bell ring, soft footsteps on wet stone pavement, natural alley acoustics.", duration_seconds: 3.5, prompt_influence: 0.78 },
      musicModel: { genre: "Humanistic Acoustic / Cello", bpm: 74, key: "G Major", meter: "3/4", stems: "Solo breathy cello + Fingerpicked nylon guitar + Felt piano", sunoPrompt: "[Instrumental] indie cinematic acoustic score, 74 BPM, warm solo cello with rosin texture, gentle nylon guitar, vivo FIRST film festival aesthetic, [Break: 2.5s silence with camera shutter at 60%]" }
    },
    aigcPayloads: {
      keyframePrompt: "16:9 humanistic cinema frame. Shot with ZEISS 85mm APO Telephoto lens at T1.4, creamy elliptical bokeh and T* anti-reflective clarity. Golden hour 3500K warm backlight (#E5A93C) rimming hair strands against a twilight indigo江南 street background (#1C2B4B). Authentic subsurface skin scattering with visible pores, parted lips (2mm), warm gentle gaze 15 degrees off-axis, foreground raindrop bokeh.",
      seedancePrompt: "【空间与机位光学】：16:9 · 蔡司85mm APO长焦人像镜头 · T1.4柔润椭圆散景 · 3500K夕阳侧逆光勾勒发丝金边（#E5A93C）与暮色青蓝街巷（#1C2B4B） · 3:1温润人文光比\n【角色与动作因果时序】：\n  [0-3.0s] 前景屋檐雨滴虚化滑落，焦点平滑移焦至中景人物面庞，双唇微启2mm自然开口；\n  [3.0-7.5s] 摄影机带极其轻微的24fps手持呼吸感缓慢推近至近景，人物眼神温和笃定，嘴角保持克制自然神态，微风轻拂衣领。\n【台词发音与拼音死锁】：温润自然，生活化松弛语感，严禁播音腔。\n【纯净音轨与声学空间混响】：Zero BGM！Zero 机械底噪！仅保留江南街巷半开放空间的自然混响与温暖纯净人声对白！\n【绝对物理负向禁令】：严禁AI塑料磨皮假脸！严禁斗鸡眼！严禁直视镜头！"
    }
  },
  {
    id: "TC-05",
    title: "Apple Cupertino Lab · 24mm探针穿镜与匹配快切",
    brand: "Apple Inc. / 华为匠心篇 (2544藏)",
    category: "tech3c",
    categoryLabel: "3C与蔡司光学",
    mood: "chiaroscuro",
    pacing: "fast",
    sourcePlatform: "Apple YouTube / 新片场 (2544藏)",
    sourceUrl: "https://www.xinpianchang.com/a10215425",
    localVideoPath: "新片场_2026宣传片高赞高藏精选库_32部全品类标杆/01_3C数码与智能家电硬件（4部）/01_【手机3C】华为-匠心篇TVC_【下载理由：1239赞2544藏·周榜精选·3C微观工艺质感标杆】_1080P.mp4",
    thumb: "assets/thumbs/01_huawei_craft.jpg",
    stats: "1239赞 · 2544藏 · 3C旗舰微观工艺与探针穿镜冠军",
    optics: {
      camera: "ARRI Alexa 65 / Phantom Flex4K (1000fps)",
      lens: "Laowa 24mm f/14 Periprobe (潜望探针微距) + 100mm Macro",
      focalLength: "24mm Macro / 100mm Macro",
      aperture: "T8.0 (微米级金属倒角锐利景深)",
      filmStock: "Cupertino Clean Digital HDR (零噪点纯净暗场)",
      halation: "蓝宝石玻璃与钛金属拉丝边缘精确高光带"
    },
    lighting: {
      ratio: "10:1 液态渐变柔光条轮廓光 (Liquid Gradient Strip Light)",
      kelvin: "6000K 冷冽钛金白对撞 3800K 芯片硅晶流光",
      style: "纯黑消音室暗场，仅用程序化移动灯带扫过五级钛金属喷砂表面"
    },
    palette: [
      { hex: "#0B0B0C", name: "Cupertino Void" },
      { hex: "#1D1D1F", name: "Space Black Titanium" },
      { hex: "#C5B4A5", name: "Desert Titanium" },
      { hex: "#0066CC", name: "Silicon Photon Blue" },
      { hex: "#F5F5F7", name: "Specular Edge" }
    ],
    kinematics: {
      primaryMove: "Bolt 高速机械臂贴面滑行 + 穿镜头飞入芯片内部 (Needle Zoom)",
      speedProfile: "慢速微距审视 (0.2m/s) 瞬间指数级加速穿透孔径 (12m/s)",
      blockingRule: "几何中心对称，探针镜头距离金属表面 < 2cm 掠行"
    },
    editing: {
      bpm: 128,
      avgShotLength: "1.6s",
      cutStyle: "军鼓重音图形匹配硬切 (Snare Graphical Match-Cut)",
      silenceDropSec: "60% 处芯片点亮前瞬间抽空所有鼓点 2.0s，仅留晶体激发清脆单音"
    },
    rhetoric: {
      motif: "【微米级偏执】×【直觉级体验】",
      cadenceRule: "短促有力的动宾短句，与机械卡扣声严丝合缝咬合",
      voVsHudSplit: "VO只讲材质突破；纳米制程与抗摔参数由3D发光追踪角标呈现",
      sampleLine: "Forged in grade 5 titanium. Engineered down to the micron."
    },
    audio: {
      elevenLabsVO: { archetype: "D. Kinetic Launch / Hard-Tech", stability: 0.62, similarity_boost: 0.88, style: 0.50, use_speaker_boost: true, ssml: "五级钛金属锻造。<break time=\"0.4s\"/>精确至，微米之间。" },
      elevenLabsSFX: { prompt: "Macro studio foley, precision CNC anodized titanium chamfer glide, sapphire glass crystalline ping, deep 35Hz sub-bass whoosh transition, dead silent background.", duration_seconds: 2.0, prompt_influence: 0.85 },
      musicModel: { genre: "Tech Hardware Glitch / Modular", bpm: 128, key: "F# Minor", meter: "4/4", stems: "Buchla modular plucks + Tight snare + 808 Sub-bass slide", sunoPrompt: "[Instrumental] precision tech launch IDM micro-house, 128 BPM, crystalline silicon plucks, tight punchy snare, Apple keynote aesthetic, [Break: 2s pure silence at 60% before drop]" }
    },
    aigcPayloads: {
      keyframePrompt: "16:9 ultra-macro hardware frame. Shot on ARRI Alexa 65 with Laowa 24mm Probe Lens at T8.0. Cupertino dark lab lighting (10:1 ratio): 6000K liquid gradient softbox strip sweeping across brushed Grade-5 Space Black Titanium (#1D1D1F) and Desert Titanium (#C5B4A5) chamfered edges against pure void (#0B0B0C). Microscopic bead-blasted metal grain and sapphire lens reflection.",
      seedancePrompt: "【空间与机位光学】：16:9 · 24mm探针微距镜头配合Bolt高速机械臂 · T8.0锐利微距景深 · 6000K液态渐变柔光条在深空黑钛金属倒角（#1D1D1F）拉出10:1流线型高光\n【角色与动作因果时序】：\n  [0-3.5s] 摄影机距离拉丝钛金属边框2厘米处匀速贴面滑行，微米级喷砂金属颗粒与光影流动清晰可见；\n  [3.5-7.5s] 镜头瞬间90度转向并高速垂直俯冲，无缝穿过蓝宝石光学镜组内部，暗场中湛蓝硅晶电路（#0066CC）逐层点亮。\n【台词发音与拼音死锁】：利落干脆，科技感胸腔共鸣。\n【纯净音轨与声学空间混响】：Zero BGM！Zero 环境杂音！消音室级纯净声场，仅保留金属低频共鸣与空气高速切割微拟音！\n【绝对物理负向禁令】：严禁指纹油污！严禁塑料反光！严禁结构扭曲！"
    }
  },
  {
    id: "IN-08",
    title: "好盈科技无刷动力 · 工业智造3426藏断层总冠军",
    brand: "好盈科技 Hobbywing",
    category: "industry",
    categoryLabel: "新能源与硬核智造",
    mood: "cold",
    pacing: "fast",
    sourcePlatform: "新片场 (1106赞 / 3426藏 · 智造总冠)",
    sourceUrl: "https://www.xinpianchang.com/a13727632",
    localVideoPath: "新片场_2026宣传片高赞高藏精选库_32部全品类标杆/02_新能源汽车与硬核工业智造（4部）/07_【精密智造】好盈科技无刷动力_【下载理由：1106赞3426藏·周榜高藏冠·无人机与精密智造第一标杆】_4K.mp4",
    thumb: "assets/thumbs/05_hobbywing_mfg.jpg",
    stats: "1106赞 · 3426藏 · 2026工业制造赛道收藏断层总冠军",
    optics: {
      camera: "RED V-Raptor 8K VV",
      lens: "Cooke S7/i Full Frame Plus 35mm & 100mm Macro",
      focalLength: "35mm (产线纵深) / 100mm (电调焊点微距)",
      aperture: "T2.8",
      filmStock: "Hollywood Industrial Teal & Orange LUT",
      halation: "高光机械火花与激光束锐利分离"
    },
    lighting: {
      ratio: "6:1 冷青工业顶光对撞 3200K 极限测试箱橙红焰光",
      kelvin: "5600K 洁净车间冷白 + 2800K 高温淬炼暖橙",
      style: "冷暖双色温强对抗，将枯燥SMT贴片产线拍出科幻大片质感"
    },
    palette: [
      { hex: "#0F1E36", name: "Lab Deep Teal" },
      { hex: "#E65100", name: "Thermal Test Orange" },
      { hex: "#2C3E50", name: "Carbon Stator Grey" },
      { hex: "#D4AC0D", name: "Copper Winding Gold" },
      { hex: "#ECF0F1", name: "Cleanroom White" }
    ],
    kinematics: {
      primaryMove: "机械臂同步跟拍 + 冰霜/烈日/盐雾极限测试箱等距快切",
      speedProfile: "排比段 1.8s/镜 高速同向推镜，动势无缝接力",
      blockingRule: "工业设备呈 45° 斜角阵列排布，强化无限延伸的产能纵深"
    },
    editing: {
      bpm: 112,
      avgShotLength: "2.2s (排比段 1.8s)",
      cutStyle: "数字三连排比锤击切镜 (2亿研发 / 2000款型号 / 200人团队)",
      silenceDropSec: "前 6 秒纯秒表滴答声起幅；60% 处电机冲上云霄瞬间静音 2.0s"
    },
    rhetoric: {
      motif: "【终点/起点】×【方寸动力/驱动世界】",
      cadenceRule: "4-4-7 黄金音律：四字格锤击定调 + 长句破格砸硬核产能数字",
      voVsHudSplit: "VO念“筑起无刷动力的技术长城”；SMT月产269万件/交付率99%由HUD角标呈现",
      sampleLine: "从风雨烈日，到沙尘盐雾；以方寸动力，驱动世界向前。"
    },
    audio: {
      elevenLabsVO: { archetype: "B. Institutional Gravity / B2B", stability: 0.55, similarity_boost: 0.82, style: 0.25, use_speaker_boost: true, ssml: "从风雨烈日，到沙尘盐雾；<break time=\"0.5s\"/>以方寸动力，驱动世界向前。" },
      elevenLabsSFX: { prompt: "High-tech manufacturing foley, rapid SMT robotic pick-and-place arm servo whirr, brushless motor high-RPM electromagnetic spin-up, sub-bass impact.", duration_seconds: 3.0, prompt_influence: 0.82 },
      musicModel: { genre: "Heavy Industrial Ostinato", bpm: 112, key: "C Minor", meter: "4/4", stems: "16th-note staccato low strings + Metallic anvil hits + Low brass braaam", sunoPrompt: "[Instrumental] Hans Zimmer style industrial ostinato, 112 BPM, relentless staccato cello, precision metallic percussion, high-tech factory power, [Break: 2s silence at 60%]" }
    },
    aigcPayloads: {
      keyframePrompt: "16:9 Hollywood industrial sci-fi frame. Shot on RED V-Raptor with Cooke 35mm lens at T2.8. High-contrast 6:1 Teal & Orange lighting: cold 5600K cleanroom overhead light (#0F1E36) colliding with 2800K fiery orange thermal sparks (#E65100) inside an environmental test chamber. Precision copper-wound brushless motor rotor spinning through ice mist and salt spray.",
      seedancePrompt: "【空间与机位光学】：16:9 · Cooke 35mm工业定焦切100mm微距 · T2.8景深 · 6:1冷青实验室顶光（#0F1E36）对撞2800K高温测试橙光（#E65100）\n【角色与动作因果时序】：\n  [0-2.0s] 100mm微距高速推近，冰霜淋水测试箱内无刷电机转子瞬间高速旋转，水珠呈放射状飞溅；\n  [2.0-4.0s] 同机位动势硬切至高温烘烤测试箱，橙红热浪翻滚中铜线绕组（#D4AC0D）纹丝不动；\n  [4.0-7.0s] 镜头沿45度斜角SMT自动化产线高速横移，机械臂毫秒级精准贴装芯片。\n【台词发音与拼音死锁】：沉稳铿锵，字字千钧，语速4.2字/秒。\n【纯净音轨与声学空间混响】：Zero BGM！Zero 杂乱底噪！仅保留精密伺服电机电磁加速声与洁净车间自然空间反射！\n【绝对物理负向禁令】：严禁机械零件穿模变形！严禁乱码文字！"
    }
  }
);

window.AESTHETICA_DB.push(
  {
    id: "IN-09",
    title: "华北空管局《空中国门》 · 雷达天眼与60%静音转折",
    brand: "中国民航华北空管局",
    category: "industry",
    categoryLabel: "新能源与硬核智造",
    mood: "cold",
    pacing: "medium",
    sourcePlatform: "新片场 (967赞 / 2395藏 · 基建标杆)",
    sourceUrl: "https://www.xinpianchang.com/a13629269",
    localVideoPath: "新片场_2026宣传片高赞高藏精选库_32部全品类标杆/04_生物医药_现代农业与大型工程基建（4部）/16_【民航基建】华北空管局_企业品牌形象片_【下载理由：967赞2395藏·周榜高藏·航空交通枢纽调度标杆】_4K.mp4",
    thumb: "assets/thumbs/09_atc_sky.jpg",
    stats: "967赞 · 2395藏 · 国家级交通枢纽调度与声画回环教科书",
    optics: {
      camera: "ARRI Alexa Mini LF",
      lens: "Zeiss Supreme Prime 28mm & 85mm",
      focalLength: "28mm (塔台全景) / 85mm (管制员眼神特写)",
      aperture: "T2.1",
      filmStock: "现代 4K 冷蓝数字影调 + 60%处 4:3 黑白老胶片破格",
      halation: "机场跑道助航灯光在夜幕下呈现星芒扩散"
    },
    lighting: {
      ratio: "5:1 塔台暗室雷达屏幕荧光绿/湛蓝反光映射面部",
      kelvin: "6500K 雷达屏幕冷蓝对撞 3200K 夕阳停机坪暖金",
      style: "利用真实雷达终端屏幕光作为人物眼神主光，极具职业临场感"
    },
    palette: [
      { hex: "#0A192F", name: "Radar Night Navy" },
      { hex: "#00D2FF", name: "Flight Track Cyan" },
      { hex: "#FF9F43", name: "Runway Approach Amber" },
      { hex: "#8892B0", name: "Control Tower Steel" },
      { hex: "#E6F1FF", name: "Cloud Horizon White" }
    ],
    kinematics: {
      primaryMove: "塔台360度环绕运镜 + 航迹HUD三维粒子流空间追踪",
      speedProfile: "平稳庄重推进，排比段切入 2.0s 等距快切",
      blockingRule: "管制员前景剪影 (OTS) 望向窗外万米跑道起降洪流"
    },
    editing: {
      bpm: 104,
      avgShotLength: "3.2s",
      cutStyle: "无线电通话指令起幅 + 60%处音乐骤停切4:3历史胶片",
      silenceDropSec: "前12秒纯塔台无线电通话Zero-VO起幅；03:36处音乐归零4秒仅留钢琴单音"
    },
    rhetoric: {
      motif: "【空中国门】×【定义新的天空】",
      cadenceRule: "极短时间(9分钟)对撞极大吞吐(1500架航班)，以“这不是奇迹，这是安全宣言”定调",
      voVsHudSplit: "VO念“解码风云，稳控全域”；运行正常率99.999%/提前54小时预报由HUD呈现",
      sampleLine: "9分钟，无缝切换进离场方向；3小时，1500架航班零冲突运行。仰望天空，然后定义新的天空。"
    },
    audio: {
      elevenLabsVO: { archetype: "B. Institutional Gravity / B2B", stability: 0.58, similarity_boost: 0.84, style: 0.22, use_speaker_boost: true, ssml: "九分钟，无缝切换进离场方向；<break time=\"0.5s\"/>三小时，一千五百架航班零冲突运行。<break time=\"1.2s\"/>仰望天空，然后，定义新的天空。" },
      elevenLabsSFX: { prompt: "Air traffic control tower PTT radio button mechanical click, authentic VHF aviation radio static beep, distant jet turbine roar through thick glass, radar sweep ping.", duration_seconds: 3.5, prompt_influence: 0.84 },
      musicModel: { genre: "Epic Aerospace Orchestral", bpm: 104, key: "D Minor", meter: "4/4", stems: "French horn section + Pulsing synth arpeggio + Solo piano bridge + Timpani", sunoPrompt: "[Instrumental] cinematic aerospace orchestral hybrid, 104 BPM, noble French horns, radar pulse synth, [Break: 4s complete silence with solo felt piano note at 60%], triumphant finale" }
    },
    aigcPayloads: {
      keyframePrompt: "16:9 aviation command cinema frame. Shot on ARRI Alexa Mini LF with 85mm Supreme Prime at T2.1. Over-the-shoulder angle inside a darkened airport control tower at twilight (#0A192F): cyan radar screen data (#00D2FF) illuminating the controller's focused profile, parted lips (2mm) speaking into headset, sprawling amber runway lights (#FF9F43) and departing airliner in background bokeh.",
      seedancePrompt: "【空间与机位光学】：16:9 · 85mm电影定焦过肩构图 · T2.1浅景深 · 塔台暗室5:1光比 · 6500K雷达荧光蓝（#00D2FF）映射面部对撞窗外3200K跑道暮色暖金（#FF9F43）\n【角色与动作因果时序】：\n  [0-1.5s] 特写管制员右手食指果断按下通话键（PTT），双唇微启2mm对着耳麦清晰下达指令；\n  [1.5-5.5s] 摄影机缓慢向右横移并变焦拉出，窗外大型客机迎着夕阳逆光昂首起飞，机翼切开云层；\n  [5.5-8.5s] 管制员目光沉稳追随航班轨迹，保持2秒庄严静默落幅。\n【台词发音与拼音死锁】：字正腔圆，沉稳威严：调（diào）度、降（jiàng）落。\n【纯净音轨与声学空间混响】：Zero BGM！Zero 外界杂音！仅保留按键清脆咔哒声与塔台密闭控制室自然空间声学混响人声！\n【绝对物理负向禁令】：100% Deadpan！严禁微笑！严禁雷达屏幕出现乱码文字！"
    }
  },
  {
    id: "AI-10",
    title: "火山引擎 FORCE'26 先导片 · 4265藏科技峰会总冠",
    brand: "字节跳动 火山引擎 Volcano Engine",
    category: "aikeynote",
    categoryLabel: "AI峰会与科技人文",
    mood: "chiaroscuro",
    pacing: "fast",
    sourcePlatform: "新片场 (1367赞 / 4265藏 · 峰会总冠)",
    sourceUrl: "https://www.xinpianchang.com/a13727498",
    localVideoPath: "新片场_2026宣传片高赞高藏精选库_32部全品类标杆/03_AI大模型_科技峰会与互联网大厂（4部）/09_【AI云峰会】火山引擎_FORCE26大会先导片_【下载理由：1367赞4265藏·科技峰会类收藏总冠军·高密度先锋视觉标杆】_4K.mp4",
    thumb: "assets/thumbs/06_volcano_force.jpg",
    stats: "1367赞 · 4265藏 · 全网科技大会先导片收藏总冠军",
    optics: {
      camera: "ARRI Alexa 65 + Houdini / AIGC Hybrid",
      lens: "Anamorphic 35mm & 50mm Macro",
      focalLength: "35mm / 50mm",
      aperture: "T2.0",
      filmStock: "Cyber-Realism High Contrast LUT",
      halation: "发光Token粒子流在真实桌面上投射物理体积光"
    },
    lighting: {
      ratio: "8:1 暗场体积光束 (Volumetric God Rays)",
      kelvin: "5800K 算力星辰银白 + 2600K 火山熔岩琥珀脉冲",
      style: "将抽象词“Token”具象化为物理发光矩阵，在真实车间/医院/太空中穿梭"
    },
    palette: [
      { hex: "#07090E", name: "Deep Space Void" },
      { hex: "#3B82F6", name: "Token Neural Blue" },
      { hex: "#F97316", name: "Volcano Core Ignis" },
      { hex: "#E2E8F0", name: "Starlight Silver" },
      { hex: "#1E293B", name: "Server Rack Slate" }
    ],
    kinematics: {
      primaryMove: "8连“让…”字排比等距快切推镜 + 2D蓝图垂直生长3D齿轮",
      speedProfile: "前60秒 1.8s/镜 极速推进；01:04冲出大气层瞬间归零悬停",
      blockingRule: "中心辐射式构图，视觉焦点永远锁死画面中央30%区域以适配快切"
    },
    editing: {
      bpm: 126,
      avgShotLength: "1.9s",
      cutStyle: "首字动词“让”重低音Sub-Drop卡切 + 太空绝对静音转折",
      silenceDropSec: "01:04 (全片52%处) 火箭冲出大气层，音乐瞬间100%归零死寂2.5秒"
    },
    rhetoric: {
      motif: "【最小算力原子 Token】×【驱动万象引擎】",
      cadenceRule: "8连“让…”字短句排比蓄力，太空静音处转为耳语：“Token开始思考，Agent有了自己的轨道”",
      voVsHudSplit: "VO念具象物理转化(“让图纸变成零件”)；大模型架构名称隐于背景界面",
      sampleLine: "让图纸变成零件，让代码自己生长……Token开始思考，Agent，有了自己的轨道。"
    },
    audio: {
      elevenLabsVO: { archetype: "D. Kinetic Launch / Hard-Tech", stability: 0.48, similarity_boost: 0.85, style: 0.35, use_speaker_boost: true, ssml: "让图纸变成零件，让代码自己生长。<break time=\"2.2s\"/>[whispers]Token开始思考。Agent，有了自己的轨道。" },
      elevenLabsSFX: { prompt: "Futuristic data crystal ignition, 2D blueprint paper morphing into heavy 3D metallic bevel gear spinning, followed by sudden outer-space vacuum silence.", duration_seconds: 3.5, prompt_influence: 0.82 },
      musicModel: { genre: "Tech Hardware Glitch / Modular", bpm: 126, key: "E Minor", meter: "4/4", stems: "Driving analog synth bass + Staccato strings + Cosmic vacuum drop", sunoPrompt: "[Instrumental] epic AI keynote electronic orchestral, 126 BPM, accelerating modular synth pulse, [Break: 100% Outer Space Vacuum Silence at 60%], massive synth wall climax" }
    },
    aigcPayloads: {
      keyframePrompt: "16:9 high-concept tech keynote frame. Shot on ARRI Alexa 65 with 50mm lens at T2.0. Dark industrial workshop table (#07090E) where a flat glowing blue 2D CAD engineering blueprint (#3B82F6) physically extrudes and materializes upward into a spinning photorealistic 3D brushed steel bevel gear casting warm sparks (#F97316).",
      seedancePrompt: "【空间与机位光学】：16:9 · 50mm微距电影镜头 · T2.0浅景深 · 8:1暗场体积光比 · 5800K算力神经蓝（#3B82F6）与2600K熔岩暖金（#F97316）交织\n【角色与动作因果时序】：\n  [0-2.5s] 镜头以45度俯角快速推向车间桌面，平铺的发光二维工程蓝图中心突然向上隆起，物理生长出一颗精密旋转的3D金属锥齿轮；\n  [2.5-5.0s] 镜头动势硬切至浩瀚外太空，宇航员静静悬浮于璀璨银河前，四周粒子瞬间静止；\n  [5.0-8.0s] 宇航员面罩反射出蓝色算力星轨，保持3秒绝对静谧落幅。\n【台词发音与拼音死锁】：前半段铿锵有力，后半段近场轻声耳语。\n【纯净音轨与声学空间混响】：Zero BGM！Zero 杂乱底噪！仅保留金属齿轮生长咬合声与太空舱密闭头盔内的轻微呼吸混响！\n【绝对物理负向禁令】：严禁廉价五毛卡通特效！严禁乱码文字！"
    }
  },
  {
    id: "AI-11",
    title: "蚂蚁外滩大会《我在》 · 修表匠点云坍缩与人文温度",
    brand: "蚂蚁集团 Ant Group · INCLUSION 外滩大会",
    category: "aikeynote",
    categoryLabel: "AI峰会与科技人文",
    mood: "golden",
    pacing: "medium",
    sourcePlatform: "新片场 (433赞 / 1222藏 · 科技人文标杆)",
    sourceUrl: "https://www.xinpianchang.com/a13814670",
    localVideoPath: "新片场_2026宣传片高赞高藏精选库_32部全品类标杆/03_AI大模型_科技峰会与互联网大厂（4部）/10_【科技人文】蚂蚁集团_外滩大会2026品牌片我在_【下载理由：433赞1222藏·频道精选·AI科技与人文温度融合标杆】_4K.mp4",
    thumb: "assets/thumbs/07_ant_waitan.jpg",
    stats: "433赞 · 1222藏 · 硬核AI点云视效与人类脆弱之美巅峰互文",
    optics: {
      camera: "ARRI Alexa Mini LF",
      lens: "Cooke Panchro/i Classic 40mm & 75mm",
      focalLength: "40mm / 75mm",
      aperture: "T2.2 (复古温润焦外)",
      filmStock: "Kodak 5219 + 3D LiDAR Point-Cloud Shader",
      halation: "台灯钨丝暖光在银发与老花镜框边缘形成柔和光晕"
    },
    lighting: {
      ratio: "4:1 复古修表工坊台灯暖光化作数字星尘",
      kelvin: "3200K 岁月暖金对撞 5200K 数字点云微光",
      style: "实拍工坊在一秒内平滑解构为三维发光点云，隐喻肉身有限与数字无限"
    },
    palette: [
      { hex: "#D97706", name: "Watchmaker Lamp Amber" },
      { hex: "#1E1B18", name: "Vintage Walnut Workshop" },
      { hex: "#38BDF8", name: "LiDAR Point-Cloud Cyan" },
      { hex: "#FDE68A", name: "Brass Gear Gold" },
      { hex: "#F5F5F4", name: "Silver Hair Highlight" }
    ],
    kinematics: {
      primaryMove: "微距钟表齿轮缓推 ➔ 空间3D点云粒子坍缩环绕 ➔ 画幅破格切换",
      speedProfile: "克制温柔的 0.3m/s 推进，点云发散时摄影机作 45° 视差横移",
      blockingRule: "前9秒钟表微距起幅；后半段歌颂“不完美”时破格切入9:16与4:3画幅"
    },
    editing: {
      bpm: 78,
      avgShotLength: "3.5s",
      cutStyle: "前9秒纯机械滴答声Zero-VO起幅 + 4连“因为…才…”排比递进",
      silenceDropSec: "前9秒零旁白纯钟表滴答声；62%处“技术只是手段，人是目的”留白2.5s"
    },
    rhetoric: {
      motif: "【有限/脆弱】×【无限/永恒】",
      cadenceRule: "先以4连“因为…才…”道出人类软肋，再以4连“爱缓慢、爱煮糊、爱失焦”完成对技术祛魅",
      voVsHudSplit: "全片零冰冷技术参数角标，100%依靠哲学独白与点云视觉奇观共鸣",
      sampleLine: "人类的尊严，在有限与无限之间。我们的脆弱就是我们的坚强，我们的有限就是我们的永恒。"
    },
    audio: {
      elevenLabsVO: { archetype: "C. Humanistic Documentary", stability: 0.35, similarity_boost: 0.80, style: 0.38, use_speaker_boost: true, ssml: "[subtle inhale]人类的尊严，在有限与无限之间。<break time=\"0.8s\"/>我们的脆弱，就是我们的坚强；我们的有限，就是我们的永恒。" },
      elevenLabsSFX: { prompt: "Macro mechanical watch escapement ticking steadily at 60 BPM, brass gears meshing softly, morphing into gentle digital crystalline shimmer.", duration_seconds: 4.0, prompt_influence: 0.85 },
      musicModel: { genre: "Humanistic Acoustic / Cello", bpm: 78, key: "F Major", meter: "4/4", stems: "Warm felt piano + Clockwork ticking percussion + Swelling string quartet", sunoPrompt: "[Instrumental] emotional philosophical cinema score, 78 BPM, intimate felt piano, clockwork ticking rhythm, warm cello swell, Max Richter style, [Break: 2.5s silence at 60%]" }
    },
    aigcPayloads: {
      keyframePrompt: "16:9 poetic sci-fi humanistic frame. Shot on ARRI Alexa Mini LF with Cooke 50mm lens at T2.2. An elderly silver-haired watchmaker in a warm 3200K walnut workshop (#1E1B18) examining a brass escapement gear (#FDE68A); the right half of the physical workshop dissolves seamlessly into millions of glowing 3D LiDAR point-cloud particles (#38BDF8) floating in dark space.",
      seedancePrompt: "【空间与机位光学】：16:9 · Cooke 50mm复古温润定焦 · T2.2浅景深 · 4:1暖调台灯布光（3200K #D97706）平滑过渡至三维数字点云微光（#38BDF8）\n【角色与动作因果时序】：\n  [0-3.5s] 极微距特写黄铜钟表擒纵轮精准咬合跳动，镜头缓慢上移至银发修表匠专注的眼眸，双唇微启2mm；\n  [3.5-8.0s] 摄影机围绕修表匠作30度缓慢视差环绕，四周木质工坊与书架在物理空间中优雅坍缩、发散为漫天流动的发光三维点云粒子。\n【台词发音与拼音死锁】：温暖沉静，充满人文哲思与呼吸感。\n【纯净音轨与声学空间混响】：Zero BGM！Zero 杂乱底噪！仅保留清脆钟表机械滴答声与温暖木质工坊的自然空间混响人声！\n【绝对物理负向禁令】：严禁恐怖谷假笑！严禁塑料皮肤！严禁点云闪烁刺眼！"
    }
  }
);

window.AESTHETICA_DB.push(
  {
    id: "BIO-12",
    title: "营养屋生物医药 · 2192藏高调实验光影与声画分流",
    brand: "营养屋 Nutryfarm (生物制药大健康冠军)",
    category: "biotech",
    categoryLabel: "生物医药大健康",
    mood: "highkey",
    pacing: "medium",
    sourcePlatform: "新片场 (599赞 / 2192藏 · 医药赛道冠军)",
    sourceUrl: "https://www.xinpianchang.com/a13757778",
    localVideoPath: "新片场_2026宣传片高赞高藏精选库_32部全品类标杆/04_生物医药_现代农业与大型工程基建（4部）/13_【生物医药】营养屋_生物医药企业形象片_【下载理由：599赞2192藏·周榜高藏·医药大健康研发制造标杆】_4K.mp4",
    thumb: "assets/thumbs/08_nutryfarm_bio.jpg",
    stats: "599赞 · 2192藏 · 声画双通道分流(VO念诗意/HUD亮资质)典范",
    optics: { camera: "RED V-Raptor 8K", lens: "ARRI Master Macro 100mm & 35mm", focalLength: "100mm Macro / 35mm", aperture: "T2.8", filmStock: "High-Key Clinical Botanical LUT", halation: "高调清透漫射，玻璃器皿边缘纯净折射" },
    lighting: { ratio: "2:1 10万级洁净实验室高调柔白光", kelvin: "5200K 纯净日光白配森林晨曦绿", style: "阴影完全羽化，展现分子级植物萃取液的通透光泽" },
    palette: [
      { hex: "#F0FDF4", name: "Cleanroom Mint White" },
      { hex: "#15803D", name: "Botanical Chlorophyll" },
      { hex: "#0284C7", name: "Molecular Lab Cyan" },
      { hex: "#D97706", name: "Herbal Essence Gold" },
      { hex: "#334155", name: "Microscope Slate" }
    ],
    kinematics: { primaryMove: "植物叶脉100mm微距缓推无缝叠化至双锥安瓶高速产线", speedProfile: "平稳舒展 (0.5m/s)，排比段 2.2s 等距推进", blockingRule: "高调留白构图，左下角预留20%净空区承载CNAS/HACCP屏幕花字" },
    editing: { bpm: 88, avgShotLength: "3.0s", cutStyle: "微观细胞CG与实拍产线相似形叠化 + 01:34实验室欢呼同期声破冰", silenceDropSec: "01:34处配乐骤停2秒，插入青年科研人员真实欢呼：“真有效！”" },
    rhetoric: { motif: "【溯源】×【向上】", cadenceRule: "“扎根的深度，决定攀登的高度”引领60载/600篇论文/80项批文排比", voVsHudSplit: "VO绝不念拗口化学名；没食子酰基槲皮素/CNAS认证全由HUD角标呈现", sampleLine: "扎根的深度，决定攀登的高度。溯源向上，生命自有光芒。" },
    audio: {
      elevenLabsVO: { archetype: "B. Institutional Gravity / B2B", stability: 0.52, similarity_boost: 0.83, style: 0.28, use_speaker_boost: true, ssml: "我们深知，扎根的深度，决定攀登的高度。<break time=\"0.6s\"/>溯源向上，生命，自有光芒。" },
      elevenLabsSFX: { prompt: "Clean laboratory foley, precision glass pipette liquid drop resonance, morning forest dewdrop, automated glass ampoule line gentle click.", duration_seconds: 3.0, prompt_influence: 0.80 },
      musicModel: { genre: "Luxury Minimalist Chamber", bpm: 88, key: "G Major", meter: "4/4", stems: "Ethereal female vocal ahhs + Felt piano + Warm string ensemble", sunoPrompt: "[Instrumental] uplifting life-science neoclassical score, 88 BPM, ethereal soprano vocalise intro, clean piano arpeggio, [Break: 2s silence at 60%]" }
    },
    aigcPayloads: {
      keyframePrompt: "16:9 high-key biotech cinema frame. Shot on ARRI 100mm Macro at T2.8. Luminous 5200K cleanroom lighting (2:1 ratio, #F0FDF4). Golden herbal extract droplet (#D97706) suspended at the tip of a crystal glass pipette, refracting green botanical forest cellular structures (#15803D) in the soft bokeh background.",
      seedancePrompt: "【空间与机位光学】：16:9 · 100mm百微电影镜头 · T2.8柔美焦外 · 2:1高调洁净实验室漫射柔光（5200K #F0FDF4）\n【角色与动作因果时序】：\n  [0-3.5s] 极微距特写晶莹琥珀色植物精粹液滴（#D97706）从移液管尖端缓缓凝聚滴落，在玻璃培养皿中漾开细腻同心圆波纹；\n  [3.5-7.5s] 镜头平滑上移至身穿洁净白大褂的科研人员面庞，双唇微启2mm温和讲述，眼神清澈笃定。\n【台词发音与拼音死锁】：温润庄重，吐字清晰。\n【纯净音轨与声学空间混响】：Zero BGM！Zero 杂音！仅保留液滴清脆入水声与无菌实验室纯净近场空间混响人声！\n【绝对物理负向禁令】：100% Deadpan！严禁脏乱阴影！严禁器皿变形！"
    }
  },
  {
    id: "CUL-13",
    title: "景德镇申遗 × 东方茶器 · 窑变冰裂纹100mm微距与古琴",
    brand: "景德镇申遗办 × 腾讯 × 娄澧白茶",
    category: "culture",
    categoryLabel: "文旅非遗与茶食",
    mood: "golden",
    pacing: "slow",
    sourcePlatform: "新片场 (864赞 / 1926藏 · 非遗总冠)",
    sourceUrl: "https://www.xinpianchang.com/a13761357",
    localVideoPath: "新片场_2026宣传片高赞高藏精选库_32部全品类标杆/06_非遗文化_茶饮快消与风味美食（4部）/21_【非遗文保】景德镇_凭什么申遗成功_【下载理由：864赞1926藏·编辑精选·非遗文化与游戏文保联动总冠军】_1080P.mp4",
    thumb: "assets/thumbs/12_jingdezhen_craft.jpg",
    stats: "864赞 · 1926藏 · 宋代极简器物美学与开片冰裂声ASMR巅峰",
    optics: { camera: "ARRI Alexa Mini LF", lens: "100mm Ultra-Macro & 35mm Master Prime", focalLength: "100mm / 35mm", aperture: "T2.8", filmStock: "Song Dynasty Ink & Celadon LUT", halation: "窑火1300度赤金光芒与天青汝窑温润玉质感" },
    lighting: { ratio: "6:1 侧逆窗棂天光切割暗室窑火", kelvin: "2800K 柴窑烈焰赤金对撞 5400K 宋瓷天青冷光", style: "东方侘寂留白，用极细侧光勾勒瓷器釉面开片裂纹与茶汤雾气" },
    palette: [
      { hex: "#8FA89B", name: "Song Celadon Cyan" },
      { hex: "#1C1917", name: "Kiln Charcoal Black" },
      { hex: "#D97706", name: "1300°C Kiln Flame" },
      { hex: "#E7E5E4", name: "Porcelain White" },
      { hex: "#78350F", name: "Aged Tea Amber" }
    ],
    kinematics: { primaryMove: "转盘拉坯同心圆顶视旋转 + 100mm釉面开片极慢推镜", speedProfile: "禅意呼吸感慢速推进 (0.2m/s)", blockingRule: "宋画折枝构图，主体占画面35%，留出65%深邃暗调气口" },
    editing: { bpm: 62, avgShotLength: "4.8s", cutStyle: "瓷器出窑冰裂清脆开片声 (“叮—”) 作为天然切镜点", silenceDropSec: "60% 处柴窑熄火瞬间全片归零静音 3.0s，仅留一声清越瓷器开片声" },
    rhetoric: { motif: "【泥与火的劫】×【千年的玉】", cadenceRule: "古雅四字短句与宋词意境结合，一字一顿", voVsHudSplit: "VO吟咏东方器物精神；窑口年代与非遗技艺名录以竖排宋刻体呈现", sampleLine: "入窑一色，出窑万彩。听，这是时间在釉面上裂开的声音。" },
    audio: {
      elevenLabsVO: { archetype: "A. Luxury Whisper / Cold-Pan", stability: 0.42, similarity_boost: 0.85, style: 0.20, use_speaker_boost: true, ssml: "入窑一色，出窑万彩。<break time=\"1.5s\"/>[whispers]听，这是时间在釉面上，裂开的声音。" },
      elevenLabsSFX: { prompt: "Hyper-detailed macro ASMR, cooling Song dynasty celadon porcelain glaze cracking softly with crystalline high-pitched bell ping, boiling tea steam, zen room.", duration_seconds: 3.5, prompt_influence: 0.88 },
      musicModel: { genre: "Oriental Non-Heritage Guqin", bpm: 62, key: "C Gong", meter: "4/4", stems: "Ancient Guqin harmonics (泛音) + Deep Taiko skin resonance + Bamboo Xiao", sunoPrompt: "[Instrumental] avant-garde oriental zen ambient, 62 BPM, ancient Guqin silk-string harmonics, sparse bamboo flute breath, [Break: 3s silence with porcelain ping at 60%]" }
    },
    aigcPayloads: {
      keyframePrompt: "16:9 oriental Song Dynasty aesthetic macro frame. Shot on ARRI 100mm Macro at T2.8. Chiaroscuro 6:1 window side-lighting: Sky-blue Song celadon porcelain tea bowl (#8FA89B) resting on charred kiln wood (#1C1917), microscopic ice-crackle glaze network catching 2800K warm amber reflection (#D97706), delicate white tea steam rising.",
      seedancePrompt: "【空间与机位光学】：16:9 · 100mm百微微距镜头 · T2.8浅景深 · 6:1东方暗调窗棂侧逆光 · 天青汝窑釉色（#8FA89B）对撞2800K炭火暖金（#D97706）\n【角色与动作因果时序】：\n  [0-4.0s] 镜头以0.2m/s极慢速推近天青色茶盏外壁，釉面在冷却中自然浮现一道晶莹如蝉翼的微观冰裂纹；\n  [4.0-8.0s] 沸水自高处缓缓注入盏中，琥珀色茶汤翻涌，袅袅白雾升腾包裹匠人粗糙而安定的指尖。\n【台词发音与拼音死锁】：沉静悠远，气口绵长：釉（yòu）面、开片（piàn）。\n【纯净音轨与声学空间混响】：Zero BGM！Zero 杂音！仅保留瓷器开片清脆“叮”声、沸水注汤声与古窑房自然木质空间混响！\n【绝对物理负向禁令】：严禁现代艳俗色彩！严禁水面物理失真！"
    }
  },
  {
    id: "SPT-14",
    title: "时尚芭莎《陕西社火》× 烟火成都《麻辣大运》 · 先锋视觉与Match-Cut双冠",
    brand: "Harper's BAZAAR × 成都大运会 (3548藏总冠)",
    category: "fashion_sport",
    categoryLabel: "时尚体育与Match-Cut",
    mood: "golden",
    pacing: "fast",
    sourcePlatform: "新片场 (1737赞 / 3548藏 · 体育与时尚双冠)",
    sourceUrl: "https://www.xinpianchang.com/a11442459",
    localVideoPath: "新片场_2026宣传片高赞高藏精选库_32部全品类标杆/07_时尚杂志_国际体育与文娱盛典（4部）/27_【体育盛会】烟火成都_麻辣大运_【下载理由：1737赞3548藏·编辑精选·体育赛事与城市烟火Match-Cut神作】_1080P.mp4",
    thumb: "assets/thumbs/15_bazaar_shehuo.jpg",
    stats: "1737赞 · 3548藏 · 相似形无缝转场 (Match-Cut) 与中画幅民俗时尚封神作",
    optics: { camera: "RED V-Raptor / Fujifilm GFX100 II", lens: "Laowa 12mm Wide & 50mm Anamorphic", focalLength: "12mm / 50mm", aperture: "T2.8", filmStock: "Kodak Portra 800 高饱和粗粝胶片", halation: "红油火锅与社火彩绸高光浓烈溢色" },
    lighting: { ratio: "5:1 烈日硬光与川西茶馆竹影斑驳", kelvin: "3800K 黄土烈日暖金与红油朱砂红", style: "硬朗生猛的太阳直射光与高速升格动态模糊结合" },
    palette: [
      { hex: "#B91C1C", name: "Cinnabar Chili Red" },
      { hex: "#D97706", name: "Loess Plateau Ochre" },
      { hex: "#1E293B", name: "Shadow Bamboo Slate" },
      { hex: "#FACC15", name: "Folk Silk Gold" },
      { hex: "#F8FAFC", name: "Porcelain Lid White" }
    ],
    kinematics: { primaryMove: "极速横甩转场 (Whip-Pan) + 几何同心圆相似形匹配剪辑 (Match-Cut)", speedProfile: "慢动作蓄力 (120fps) ➔ 动作最高潮峰值帧毫秒级硬切", blockingRule: "前后两镜运动矢量与画面几何圆心100%重合" },
    editing: { bpm: 138, avgShotLength: "1.4s", cutStyle: "盖碗茶旋转接铁饼旋转、麻将洗牌接跨栏起跳 Match-Cut", silenceDropSec: "60% 处火锅沸腾与赛场呐喊同时在最高点切黑静音 1.8s" },
    rhetoric: { motif: "【市井烟火】×【巅峰竞技】", cadenceRule: "方言俚语节拍与川剧锣鼓点严密咬合", voVsHudSplit: "零传统解说词，以川剧锣鼓声纹与毛笔飞白大字直接砸屏", sampleLine: "茶碗一盖，乾坤旋转；黄土之上，生生不息！" },
    audio: {
      elevenLabsVO: { archetype: "D. Kinetic Launch / Hard-Tech", stability: 0.45, similarity_boost: 0.85, style: 0.55, use_speaker_boost: true, ssml: "茶碗一盖，乾坤旋转；<break time=\"0.4s\"/>黄土之上，生生不息！" },
      elevenLabsSFX: { prompt: "Crisp porcelain lidded teacup spin and clink morphing seamlessly into heavy athletic discus whoosh in stadium, Sichuan opera percussion hit.", duration_seconds: 2.5, prompt_influence: 0.85 },
      musicModel: { genre: "Sports Staccato Phonk / Drums", bpm: 138, key: "E Minor", meter: "4/4", stems: "Sichuan percussion锣鼓 + 808 Phonk cowbell + Marching snare", sunoPrompt: "[Instrumental] oriental trap phonk hybrid, 138 BPM, traditional Chinese percussion fused with heavy 808 sub bass, kinetic match-cut energy, [Break: 1.8s hard stop at 60%]" }
    },
    aigcPayloads: {
      keyframePrompt: "16:9 avant-garde fashion & kinetic folk cinema frame. Shot on medium format film with 35mm lens at T2.8. High-contrast 3800K golden sunlight over rugged Loess Plateau (#D97706) where models in structured haute couture and vibrant cinnabar red folk regalia (#B91C1C) stand in surreal geometric symmetry against swirling yellow dust.",
      seedancePrompt: "【空间与机位光学】：16:9 · 35mm广角电影定焦 · T2.8景深 · 5:1硬朗阳光直射光比 · 朱砂红（#B91C1C）与黄土赭金（#D97706）高张力撞色\n【角色与动作因果时序】：\n  [0-2.0s] 90度垂直俯拍，老茶客手腕一抖，青花盖碗茶盖在桌面上高速顺时针旋转；\n  [2.0-4.5s] 旋转最高速瞬间触发无缝相似形转场（Match-Cut），画面圆心100%对齐切换为田径赛场运动员高速旋转掷出铁饼，动作动量完美延续！\n【台词发音与拼音死锁】：铿锵豪迈，富有地域生命力。\n【纯净音轨与声学空间混响】：Zero BGM！Zero 杂乱底噪！仅保留瓷碗清脆旋转摩擦声无缝衔接铁饼破空呼啸声！\n【绝对物理负向禁令】：严禁转场错位跳帧！严禁肢体扭曲！"
    }
  },
  {
    id: "ARC-15",
    title: "柏林包豪斯镀铬阁楼 × 京都科技侘寂 · 顶奢空间与高管肖像",
    brand: "Architectural Digest (AD) × Boris Baldinger 达沃斯肖像",
    category: "architecture",
    categoryLabel: "顶奢建筑与高管肖像",
    mood: "chiaroscuro",
    pacing: "slow",
    sourcePlatform: "Architectural Digest / Boris Baldinger 作品库",
    sourceUrl: "https://www.architecturaldigest.com",
    thumb: "assets/thumbs/19_bauhaus_chrome.jpg",
    stats: "AD 250支顶奢建筑 + 达沃斯论坛政商领袖肖像光学标准",
    optics: { camera: "Hasselblad H6D-100c / ARRI Alexa 65", lens: "24mm Tilt-Shift (移轴建筑零畸变) & 85mm Portrait", focalLength: "24mm TS / 85mm", aperture: "T5.6 (空间) / T2.0 (高管肖像)", filmStock: "Medium Format Neutral & Karsh Sculpted Contrast", halation: "镀铬钢管冷冽镜面高光与雪松木温润漫反射" },
    lighting: { ratio: "空间 3:1 天窗漫射 / 肖像 6:1 伦勃朗三角光", kelvin: "4200K 画廊中性暖白对撞 6000K 柏林阴天漫射窗光", style: "建筑完全锁定垂直平行线；高管肖像保留真实骨相与威望眼神光" },
    palette: [
      { hex: "#1B242B", name: "Bauhaus Charcoal" },
      { hex: "#D1D5DB", name: "Tubular Chrome" },
      { hex: "#854D0E", name: "Wassily Cognac Leather" },
      { hex: "#57534E", name: "Kyoto Micro-Cement" },
      { hex: "#F5F5F4", name: "Gallery Alabaster" }
    ],
    kinematics: { primaryMove: "单点透视移轴导轨极慢推进 (0.25m/s)", speedProfile: "绝对水平零侧倾 (Zero-Roll)，如建筑画册般沉稳呼吸", blockingRule: "三分法或单点透视纵深，人物坐于包豪斯镀铬椅呈15度侧身智性凝视" },
    editing: { bpm: 58, avgShotLength: "5.5s", cutStyle: "光影明暗呼吸叠化 + 空间声学脉冲慢切", silenceDropSec: "60% 处阳光穿过百叶窗移动，全片留出 3.5s 纯净空间静默" },
    rhetoric: { motif: "【少即是多】×【时间的骨相】", cadenceRule: "克制、深邃的第一人称独白，拒绝一切浮夸形容词", voVsHudSplit: "仅在开篇以极细包豪斯无衬线体标注建筑师与年份", sampleLine: "Less is only more when every millimeter carries intention." },
    audio: {
      elevenLabsVO: { archetype: "A. Luxury Whisper / Cold-Pan", stability: 0.46, similarity_boost: 0.86, style: 0.14, use_speaker_boost: true, ssml: "唯有当每一毫米都承载意志，<break time=\"1.0s\"/>少，才是多。" },
      elevenLabsSFX: { prompt: "Minimalist architectural gallery acoustics, soft leather armchair creak as executive leans back, distant vinyl record needle warmth, serene room tone.", duration_seconds: 3.5, prompt_influence: 0.82 },
      musicModel: { genre: "Architectural Ambient Drone", bpm: 58, key: "D Dorian", meter: "4/4", stems: "Bowed vibraphone shimmer + Prophet-5 warm pad + Felt piano single notes", sunoPrompt: "[Instrumental] monolithic architectural ambient drone, 58 BPM, bowed vibraphone, warm analog pad, Bauhaus & Kyoto wabi-sabi gallery vibe, [Break: 3.5s silence at 60%]" }
    },
    aigcPayloads: {
      keyframePrompt: "16:9 architectural & executive portrait frame. Shot on Hasselblad Medium Format with 35mm Tilt-Shift lens (perfectly vertical lines). Berlin Bauhaus penthouse loft (#1B242B): tubular chrome Wassily chair (#D1D5DB) and cognac saddle leather (#854D0E) on raw micro-cement floor (#57534E). A silver-templed founder seated in 6:1 Rembrandt side window light, parted lips (2mm), sharp catchlights in eyes, authentic skin bone structure.",
      seedancePrompt: "【空间与机位光学】：16:9 · 35mm移轴零畸变电影镜头 · 垂直线条100%平行 · 6:1伦勃朗落地窗侧光 · 镀铬金属（#D1D5DB）与干邑马鞍皮（#854D0E）包豪斯阁楼\n【角色与动作因果时序】：\n  [0-4.0s] 摄影机沿导轨以0.25m/s极慢速向包豪斯镀铬扶手椅推进，高管身体微倾，双唇微启2mm从容开口，右手食指轻搭皮质扶手；\n  [4.0-8.5s] 窗外云层微动，一束4200K自然漫射光缓缓掠过清水混凝土墙面与高管深邃的眼眸，保持2.5秒威严静默落幅。\n【台词发音与拼音死锁】：低沉磁性，字字从容笃定。\n【纯净音轨与声学空间混响】：Zero BGM！Zero 杂音！仅保留真皮座椅轻微受力声与高挑空包豪斯阁楼的自然物理空间混响人声！\n【绝对物理负向禁令】：100% Deadpan！严禁海马体磨皮假笑！严禁建筑线条弯曲！"
    }
  }
);

window.AESTHETICA_DB.push(
  {
    id: "TC-06",
    title: "TOSHIBA 东芝 · 日本声学暗室与真实音画实证纪录",
    brand: "TOSHIBA 东芝电视",
    category: "tech3c",
    categoryLabel: "3C与蔡司光学",
    mood: "chiaroscuro",
    pacing: "slow",
    sourcePlatform: "新片场 (530赞 / 1300藏 · 家电音画标杆)",
    sourceUrl: "https://www.xinpianchang.com/a13789672",
    localVideoPath: "新片场_2026宣传片高赞高藏精选库_32部全品类标杆/01_3C数码与智能家电硬件（4部）/04_【高端家电】东芝TOSHIBA_寻找真实音画之旅_【下载理由：530赞1300藏·频道精选·家电音画技术纪录标杆】_4K.mp4",
    thumb: "assets/thumbs/03_toshiba_sound.jpg",
    stats: "530赞 · 1300藏 · 日本声学/光学工程师实证主义克制美学",
    optics: { camera: "Sony VENICE 2 8K", lens: "Leica Summilux-C 40mm & 75mm", focalLength: "40mm / 75mm", aperture: "T2.0", filmStock: "Japanese Natural Neutral LUT", halation: "OLED屏幕自发光在暗室工程师眼镜片上的精准反射" },
    lighting: { ratio: "6:1 消音室尖劈暗场 + 屏幕基准色温漫射", kelvin: "6500K D65 标准校色白光对撞 3200K 实验室工作台", style: "克制、严谨的日本工匠实证光影，拒绝浮夸光效" },
    palette: [
      { hex: "#111318", name: "Anechoic Wedge Black" },
      { hex: "#E2E8F0", name: "D65 Reference White" },
      { hex: "#94A3B8", name: "Acoustic Titanium" },
      { hex: "#C2410C", name: "Vacuum Tube Warmth" },
      { hex: "#0284C7", name: "Spectrum Wave Blue" }
    ],
    kinematics: { primaryMove: "消音室对称中轴极慢推镜 + 示波器与人耳微距切镜", speedProfile: "0.2m/s 沉静呼吸推进", blockingRule: "全消音室吸音尖劈呈几何阵列向中心汇聚" },
    editing: { bpm: 66, avgShotLength: "4.4s", cutStyle: "调音师闭眼倾听瞬间切入纯正弦波测试音留白", silenceDropSec: "60% 处进入全消音室，背景声压瞬间降至 -60dB 绝对静默 3.0s" },
    rhetoric: { motif: "【参数之上】×【真实之境】", cadenceRule: "冷静克制的工程师独白，用半世纪调校历史代替营销口号", voVsHudSplit: "VO讲真实感知；REGZA画质芯片与火箭炮声学参数由极细日式角标呈现", sampleLine: "真正的巅峰音画，是让你忘记屏幕的存在。" },
    audio: {
      elevenLabsVO: { archetype: "A. Luxury Whisper / Cold-Pan", stability: 0.50, similarity_boost: 0.85, style: 0.18, use_speaker_boost: true, ssml: "真正的巅峰音画，<break time=\"0.8s\"/>是让你忘记，屏幕的存在。" },
      elevenLabsSFX: { prompt: "Anechoic chamber dead silence, subtle acoustic tuning fork 440Hz pure sine resonance, precision rotary knob detent click.", duration_seconds: 3.0, prompt_influence: 0.86 },
      musicModel: { genre: "Luxury Minimalist Chamber", bpm: 66, key: "D Minor", meter: "4/4", stems: "Ryuichi Sakamoto style felt piano + Pure sine sub-harmonic + Solo cello", sunoPrompt: "[Instrumental] Ryuichi Sakamoto style minimalist acoustic piano and pure electronic sine tones, 66 BPM, Japanese anechoic studio clarity, [Break: 3s pure silence at 60%]" }
    },
    aigcPayloads: {
      keyframePrompt: "16:9 Japanese acoustic laboratory frame. Shot on Sony VENICE 2 with 40mm Leica Summilux-C at T2.0. Inside a geometric anechoic chamber lined with dark charcoal acoustic foam wedges (#111318), a senior acoustic engineer adjusts a precision brushed aluminum reference speaker (#94A3B8) under 6500K D65 studio light.",
      seedancePrompt: "【空间与机位光学】：16:9 · 40mm电影定焦对称构图 · T2.0景深 · 6:1全消音室暗场布光（#111318吸音尖劈阵列）\n【角色与动作因果时序】：\n  [0-4.0s] 摄影机沿消音室中轴线以0.2m/s极慢速推进，白发声学工程师双目微闭，右手食指与拇指轻旋金属调音旋钮15度；\n  [4.0-8.0s] 镜头切至75mm近景，工程师缓缓睁眼，双唇微启2mm平静开口，眼镜片映出清澈声波频谱。\n【台词发音与拼音死锁】：沉静克制，日式匠人叙事质感。\n【纯净音轨与声学空间混响】：Zero BGM！Zero 环境底噪！消音室级零反射纯净干声与清脆旋钮阻尼咔哒声！\n【绝对物理负向禁令】：100% Deadpan！严禁浮夸表情！严禁尖劈几何变形！"
    }
  },
  {
    id: "CUL-16",
    title: "深圳出海《奇境》 × 湘西风味 · 戛纳铜狮魔幻现实与高速升格",
    brand: "深圳出海 (戛纳铜狮奖) × 湘西美食人文 (2396藏)",
    category: "culture",
    categoryLabel: "文旅非遗与茶食",
    mood: "golden",
    pacing: "fast",
    sourcePlatform: "新片场 (戛纳铜狮奖 & 2396藏美食总冠)",
    sourceUrl: "https://www.xinpianchang.com/a13687309",
    localVideoPath: "新片场_2026宣传片高赞高藏精选库_32部全品类标杆/05_国家城市形象与国际文旅度假（4部）/18_【城市出海】深圳出海_奇境_戛纳铜狮奖_【下载理由：820赞1780藏·编辑精选·戛纳铜狮与金铅笔获奖标杆】_1080P.mp4",
    thumb: "assets/thumbs/10_shenzhen_cannes.jpg",
    stats: "戛纳铜狮奖 & One Show金铅笔 · 东方奇幻与硬核科技/风物缝合典范",
    optics: { camera: "ARRI Alexa Mini LF + Phantom Flex4K", lens: "Atlas Orion Anamorphic 32mm & 100mm Macro", focalLength: "32mm / 100mm", aperture: "T2.0", filmStock: "Cannes Magic Realism LUT", halation: "灯笼暖光与无人机阵列星光在晨雾中交融" },
    lighting: { ratio: "5:1 晨雾丁达尔体积光对撞奇幻霓虹", kelvin: "3000K 炭火油脂暖金对撞 5600K 山岚青碧", style: "魔幻现实主义布光，将传统民俗/山野风物与未来科技无缝拼贴" },
    palette: [
      { hex: "#0F292A", name: "Misty Mountain Jade" },
      { hex: "#EA580C", name: "Charcoal Sizzle Amber" },
      { hex: "#FACC15", name: "Lantern Gold" },
      { hex: "#38BDF8", name: "Drone Swarm Cyan" },
      { hex: "#FAF8F5", name: "Steam Cloud White" }
    ],
    kinematics: { primaryMove: "1000fps 高速微距升格 (油脂爆裂/水墨化无人机) + 穿云俯冲", speedProfile: "极慢速1000fps微观流体瞬间切入高速穿云横移", blockingRule: "前景极具质感的微观风物，后景宏大奇观" },
    editing: { bpm: 116, avgShotLength: "2.0s", cutStyle: "视觉隐喻匹配剪辑 (Visual Metaphor Cut) + 湘西鼓点/合成器共振", silenceDropSec: "60% 处云海破开瞬间静音 2.0s，随后万鼓齐鸣" },
    rhetoric: { motif: "【山海奇境】×【人间真味】", cadenceRule: "极具画面感的通感修辞（把味觉、听觉写进视觉）", voVsHudSplit: "全英文/诗意短句旁白；戛纳获奖桂冠角标置于片头", sampleLine: "Where ancient myths take flight on silicon wings." },
    audio: {
      elevenLabsVO: { archetype: "C. Humanistic Documentary", stability: 0.38, similarity_boost: 0.82, style: 0.35, use_speaker_boost: true, ssml: "当古老的东方神话，<break time=\"0.5s\"/>乘着硅基的羽翼，飞向世界。" },
      elevenLabsSFX: { prompt: "1000fps slow-motion macro sizzling oil droplet bursting on hot iron wok, morphing into futuristic drone rotor hum in mountain mist.", duration_seconds: 3.0, prompt_influence: 0.84 },
      musicModel: { genre: "Oriental Non-Heritage Guqin", bpm: 116, key: "D Minor", meter: "4/4", stems: "Ethnic Xiangxi苗鼓 + Suona brass motif + Modern cinematic synth bass", sunoPrompt: "[Instrumental] Cannes Lions award-winning oriental fantasy electronic score, 116 BPM, ethnic mountain drums, cyber synth pulse, [Break: 2s silence at 60%]" }
    },
    aigcPayloads: {
      keyframePrompt: "16:9 Cannes-winning magic realism cinema frame. Shot on ARRI Alexa Mini LF with 32mm Anamorphic lens at T2.0. Misty emerald oriental mountain peaks (#0F292A) at dawn where traditional glowing golden lanterns (#FACC15) seamlessly morph into a precision formation of futuristic autonomous drones (#38BDF8) flying through volumetric god rays.",
      seedancePrompt: "【空间与机位光学】：16:9 · 32mm变形宽银幕镜头切100mm高速微距 · T2.0浅景深 · 5:1山岚丁达尔体积光（#0F292A）对撞3000K暖金火光（#EA580C）\n【角色与动作因果时序】：\n  [0-3.0s] 100mm微距1000fps高速升格，滚烫山野松脂滴入炭火，金红火星在空气中慢动作绚烂绽放；\n  [3.0-7.0s] 飞溅的火星通过相似形转场（Match-Cut）无缝化作云海之上千架发光无人机阵列，穿越苍翠山峰高速向前推进。\n【台词发音与拼音死锁】：诗意磅礴，字字清亮。\n【纯净音轨与声学空间混响】：Zero BGM！Zero 杂乱底噪！仅保留微观油脂爆裂清脆声无缝过渡至山谷辽阔空间混响！\n【绝对物理负向禁令】：严禁廉价贴图感！严禁透视崩坏！"
    }
  }
);

window.GLOBAL_SOURCES = [
  { tier: "Tier 0 · 镜头与单帧光学圣经", name: "Eyecandy 全球运镜与转场动词库", url: "https://eyecannndy.com", strength: "将 Whip-Pan / SnorriCam / Match-Cut / Probe Lens 等 50+ 种特种运镜拆解为 3-5s 循环 MP4，可直接作为 Seedance 2.5 @video 运镜锚。", method: "抓取 /technique/<slug> 的 __NEXT_DATA__ JSON 提取原生 MP4" },
  { tier: "Tier 0 · 镜头与单帧光学圣经", name: "ShotDeck 好莱坞 DP 单帧光学库", url: "https://shotdeck.com", strength: "好莱坞摄影指导 Lawrence Sher 创立，百万级母帧精确标注镜头焦段、T-Stop、色温、布光比与 5 色 HEX 色板。", method: "按光学参数检索剧照，直接映射为 6 维光学指纹头文件" },
  { tier: "Tier 0 · 镜头与单帧光学圣经", name: "FrameSet 商业 TVC 全分镜拉片库", url: "https://frameset.app", strength: "专为广告导演写 Treatment 打造，支持按机位运动、美术置景、服装色彩检索整支 TVC 的连续分镜序列。", method: "按行业品类导出整支广告 15-30 镜完整序列反推剪辑节拍" },
  { tier: "Tier 0 · 镜头与单帧光学圣经", name: "Directors Library 全球 S 级导演馆", url: "https://directorslibrary.com", strength: "严选 Iconoclast / Division / MJZ 等顶级制片厂代表作，完整披露导演、DP、剪辑师与 Company 3 调色师。", method: "解析 WP REST API 与 Vimeo 4K 源文件，按主创聚类" },
  { tier: "Tier 1 · 顶奢时装屋与硬奢圣殿", name: "Saint Laurent 官方电影制片厂 (@ysl)", url: "https://www.youtube.com/@ysl", strength: "Anthony Vaccarello 联手王家卫、加斯帕·诺打造，35mm 变形宽银幕、8:1 暗调绯红高反差与催眠合成器美学巅峰。", method: "yt-dlp 拉取 4K 母片 + PySceneDetect 切镜提取暗调色板" },
  { tier: "Tier 1 · 顶奢时装屋与硬奢圣殿", name: "Hermès 爱马仕奇境短片库 (@hermes)", url: "https://www.youtube.com/@hermes", strength: "韦斯·安德森式 90° 正交几何对称运镜、Rube Goldberg 机械连锁装置与 120 BPM 室内乐拨弦微拟音卡点。", method: "提取正交平摇轨迹与皮革/丝绸近场 ASMR 拟音样本" },
  { tier: "Tier 1 · 顶奢时装屋与硬奢圣殿", name: "Prada 智性超现实剧场 (@Prada)", url: "https://www.youtube.com/@Prada", strength: "24mm 广角微仰拍、粗野主义混凝土对撞开心果绿、机械导轨匀速横移与 100% Deadpan 冷面哲学张力。", method: "提取广角几何构图与冷峻空间混响脉冲参数" },
  { tier: "Tier 1 · 顶奢时装屋与硬奢圣殿", name: "NOWNESS 全球先锋文化与建筑短片", url: "https://www.nowness.com", strength: "LVMH 孵化，涵盖《In Residence》顶奢建筑空间、现代舞肢体调度与东方侘寂器物美学。", method: "抓取 /series/in-residence 高清流与双语导演阐述" },
  { tier: "Tier 2 · 科技光学与精密工业旗舰", name: "vivo 影像盛典 × FIRST 超短片库", url: "https://www.xinpianchang.com", strength: "蔡司 85mm/135mm APO 长焦人像空间压缩、T* 镀膜夕阳琥珀金边、呼吸感手持与温润大提琴人文叙事。", method: "提取长焦浅景深散景特征与人文同期声混音配比" },
  { tier: "Tier 2 · 科技光学与精密工业旗舰", name: "Apple Cupertino Lab 产品硬件大片", url: "https://www.youtube.com/@Apple", strength: "Laowa 24mm 探针微距 + Bolt 高速机械臂穿镜（Needle Zoom）+ 128 BPM 军鼓图形匹配剪辑（Match-Cut）。", method: "librosa 提取瞬态鼓点切点 + 液态柔光条金属高光复刻" },
  { tier: "Tier 2 · 科技光学与精密工业旗舰", name: "Leica Camera 银盐黑白街头圣殿", url: "https://www.youtube.com/@LeicaCamera", strength: "Summilux 35mm f/1.4 平视人文视角、Tri-X 400 银盐颗粒与黄铜机械快门声（Snick）结构化切镜。", method: "提取黑白灰阶曲线（#050505-#7F7F7F-#F2F2F0）与快门转场" },
  { tier: "Tier 3 · 新片场与全球广告大奖漏斗", name: "新片场 2026 万藏级导演版量化漏斗", url: "https://www.xinpianchang.com/channel/index/id-16", strength: "通过 Score = (Likes + 1.5*Collects) 过滤 660+ 部新片，锁定收藏 >1200、藏赞比 >1.8 的 8 大赛道 Top 1% 母片。", method: "本地已落盘 32 部全品类 4K/1080P 母片库与 5 部逐帧拉片报告" }
];
