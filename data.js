// AIPGC AESTHETICA STUDIO — Full-Stack Aesthetic Deconstruction Database
// Initialized empty; populated with 100% authentic Xinpianchang commercial films via data_auto_batches.js
window.AESTHETICA_DB = [];

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
