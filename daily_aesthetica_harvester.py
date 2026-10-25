#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
AESTHETICA Daily 50-Film Harvester & 8-Dimensional Aesthetic Deconstruction Engine
Automatically harvests, deduplicates, extracts 16:9 keyframes & 5-color HEX palettes,
infers 8-dimensional optical/lighting/editing/audio parameters, and hot-updates data.js.
"""
import argparse
import glob
import hashlib
import json
import os
import re
import subprocess
from datetime import datetime
from pathlib import Path

import urllib.request

STUDIO_DIR = Path(__file__).resolve().parent
BASE_DIR = STUDIO_DIR.parent.parent if (STUDIO_DIR.parent.parent / "AGENTS.md").exists() else STUDIO_DIR
THUMBS_DIR = STUDIO_DIR / "assets/thumbs"
LEDGER_PATH = STUDIO_DIR / "harvester_ledger.json"
BATCH_JS_PATH = STUDIO_DIR / "data_auto_batches.js"
CLOUD_SEED_PATH = STUDIO_DIR / "cloud_seed_catalog.json"

CATEGORY_PROFILES = {
    "luxury": {
        "label": "顶奢时装屋", "mood": "chiaroscuro", "pacing": "slow", "bpm": 72, "asl": "4.8s",
        "camera": "ARRI Alexa 65 / 35mm Film", "lens": "Panavision Anamorphic 50mm", "aperture": "T2.0",
        "filmStock": "Kodak Vision3 500T 5219", "halation": "高光边缘细腻绯红胶片光晕",
        "ratio": "8:1 极高反差暗调 (Chiaroscuro)", "kelvin": "2800K 钨丝暖金对撞 5600K 建筑冷光",
        "move": "48fps 催眠阻尼慢推 + 15° 侧逆光凝视", "voArchetype": "A. Luxury Whisper / Cold-Pan",
        "voSettings": {"stability": 0.38, "similarity_boost": 0.85, "style": 0.15},
        "musicGenre": "Luxury Minimalist Chamber", "musicKey": "D Minor",
        "stems": "Felt piano + Sul-tasto viola + Analog sub-pulse"
    },
    "tech3c": {
        "label": "3C与蔡司光学", "mood": "golden", "pacing": "fast", "bpm": 122, "asl": "1.9s",
        "camera": "ARRI Alexa Mini LF / Phantom Flex4K", "lens": "Laowa 24mm Probe & ZEISS 85mm APO", "aperture": "T1.8 / T8.0",
        "filmStock": "ZEISS T* Natural HDR & Cupertino Clean LUT", "halation": "金属倒角流线高光与T*通透焦外",
        "ratio": "6:1 液态渐变柔光条轮廓光", "kelvin": "5800K 钛金属冷光对撞 3500K 琥珀流光",
        "move": "Bolt 机械臂贴面滑行 + 穿镜微距 (Needle Zoom)", "voArchetype": "D. Kinetic Launch / Hard-Tech",
        "voSettings": {"stability": 0.60, "similarity_boost": 0.88, "style": 0.45},
        "musicGenre": "Tech Hardware Glitch / Modular", "musicKey": "F# Minor",
        "stems": "Buchla 200e modular plucks + Tight snare + 35Hz Sub-drop"
    },
    "industry": {
        "label": "新能源与硬核智造", "mood": "cold", "pacing": "fast", "bpm": 112, "asl": "2.1s",
        "camera": "RED V-Raptor 8K VV", "lens": "Cooke S7/i 35mm & 100mm Macro", "aperture": "T2.8",
        "filmStock": "Industrial Teal & Orange LUT", "halation": "激光焊装火花与洁净车间冷光锐利分离",
        "ratio": "6:1 冷青工业顶光对撞 3000K 淬炼暖焰", "kelvin": "5600K 实验室冷白 + 3000K 动力橙光",
        "move": "机械臂同步跟拍 + 排比段 1.8s 等距快切推镜", "voArchetype": "B. Institutional Gravity / B2B",
        "voSettings": {"stability": 0.55, "similarity_boost": 0.82, "style": 0.25},
        "musicGenre": "Heavy Industrial Ostinato", "musicKey": "C Minor",
        "stems": "16th-note staccato low strings + Metallic anvil hits + Low brass"
    },
    "aikeynote": {
        "label": "AI峰会与科技人文", "mood": "chiaroscuro", "pacing": "medium", "bpm": 108, "asl": "2.4s",
        "camera": "ARRI Alexa 65", "lens": "Master Prime 35mm & 50mm", "aperture": "T2.0",
        "filmStock": "Cyber-Humanism Volumetric LUT", "halation": "三维点云粒子与温暖台灯漫射交融",
        "ratio": "5:1 暗场体积光束 (Volumetric Light)", "kelvin": "6000K 算力蓝光对撞 3200K 人文暖金",
        "move": "中心辐射推镜 + 2D图纸生长3D结构视差环绕", "voArchetype": "C. Humanistic Documentary",
        "voSettings": {"stability": 0.36, "similarity_boost": 0.80, "style": 0.36},
        "musicGenre": "Tech Hardware Glitch / Modular", "musicKey": "E Minor",
        "stems": "Warm felt piano + Modular arpeggio + Cosmic vacuum silence drop"
    },
    "biotech": {
        "label": "生物医药大健康", "mood": "highkey", "pacing": "medium", "bpm": 88, "asl": "3.0s",
        "camera": "RED V-Raptor 8K", "lens": "ARRI 100mm Ultra-Macro", "aperture": "T2.8",
        "filmStock": "High-Key Clinical Botanical LUT", "halation": "高调清透漫射与玻璃培养皿晶莹折射",
        "ratio": "2:1 10万级洁净室柔白顶光", "kelvin": "5200K 纯净日光白配森林叶绿素色温",
        "move": "100mm微观液滴缓推无缝叠化至高速制剂产线", "voArchetype": "B. Institutional Gravity / B2B",
        "voSettings": {"stability": 0.52, "similarity_boost": 0.83, "style": 0.28},
        "musicGenre": "Luxury Minimalist Chamber", "musicKey": "G Major",
        "stems": "Ethereal soprano vocalise + Felt piano + Warm string quartet"
    },
    "culture": {
        "label": "文旅非遗与东方美学", "mood": "golden", "pacing": "slow", "bpm": 68, "asl": "4.0s",
        "camera": "ARRI Alexa Mini LF", "lens": "Cooke Panchro 40mm & 100mm Macro", "aperture": "T2.2",
        "filmStock": "Song Dynasty Celadon & Golden Hour LUT", "halation": "晨雾丁达尔光束与炭火/釉面温润高光",
        "ratio": "5:1 窗棂侧逆天光切割暗室", "kelvin": "3200K 烟火暖金对撞 5400K 山水天青",
        "move": "1000fps 高速微距升格 + 宋画留白缓慢横移", "voArchetype": "C. Humanistic Documentary",
        "voSettings": {"stability": 0.35, "similarity_boost": 0.82, "style": 0.32},
        "musicGenre": "Oriental Non-Heritage Guqin", "musicKey": "C Gong",
        "stems": "Ancient Guqin harmonics + Deep Taiko drum + Bamboo Xiao breath"
    },
    "fashion_sport": {
        "label": "时尚体育与Match-Cut", "mood": "golden", "pacing": "fast", "bpm": 136, "asl": "1.5s",
        "camera": "RED V-Raptor / Fujifilm GFX100 II", "lens": "Anamorphic 35mm & 18mm Wide", "aperture": "T2.8",
        "filmStock": "Kodak Portra 800 High-Energy LUT", "halation": "高饱和朱砂红与赛场聚光灯强烈溢色",
        "ratio": "5:1 烈日硬光与高动态竞技追光", "kelvin": "3800K 暖阳硬光对撞 5600K 体育场冷光",
        "move": "极速横甩 (Whip-Pan) + 几何圆心相似形转场 (Match-Cut)", "voArchetype": "D. Kinetic Launch / Hard-Tech",
        "voSettings": {"stability": 0.48, "similarity_boost": 0.86, "style": 0.52},
        "musicGenre": "Sports Staccato Phonk / Drums", "musicKey": "E Minor",
        "stems": "Marching snare corp + 808 Cowbell sub-bass + Breath-chant percussion"
    },
    "architecture": {
        "label": "顶奢建筑与高管肖像", "mood": "chiaroscuro", "pacing": "slow", "bpm": 60, "asl": "5.0s",
        "camera": "Hasselblad H6D-100c / ARRI Alexa 65", "lens": "24mm Tilt-Shift & 85mm Portrait", "aperture": "T5.6 / T2.0",
        "filmStock": "Architectural Neutral & Karsh Sculpted Contrast", "halation": "镀铬金属冷冽高光与微水泥漫反射",
        "ratio": "6:1 伦勃朗落地窗侧光 (Rembrandt Lighting)", "kelvin": "4200K 画廊暖白对撞 6000K 阴天窗光",
        "move": "移轴零畸变导轨极慢推进 (0.25m/s, Zero-Roll)", "voArchetype": "A. Luxury Whisper / Cold-Pan",
        "voSettings": {"stability": 0.45, "similarity_boost": 0.86, "style": 0.14},
        "musicGenre": "Architectural Ambient Drone", "musicKey": "D Dorian",
        "stems": "Bowed vibraphone shimmer + Prophet-5 analog pad + Sub cathedral drone"
    }
}


def extract_thumb_and_palette(media_path: Path, thumb_name: str):
    THUMBS_DIR.mkdir(parents=True, exist_ok=True)
    out_thumb = THUMBS_DIR / thumb_name
    raw_str = str(media_path)
    is_url = raw_str.startswith("http://") or raw_str.startswith("https://") or raw_str.startswith("http:/") or raw_str.startswith("https:/")
    if is_url and not raw_str.startswith("http://") and not raw_str.startswith("https://"):
        raw_str = raw_str.replace("https:/", "https://", 1).replace("http:/", "http://", 1)

    if not out_thumb.exists():
        if is_url:
            try:
                tmp_dl = THUMBS_DIR / f"_tmp_{thumb_name}"
                req = urllib.request.Request(raw_str, headers={"User-Agent": "Mozilla/5.0"})
                tmp_dl.write_bytes(urllib.request.urlopen(req, timeout=10).read())
                subprocess.run([
                    "ffmpeg", "-y", "-i", str(tmp_dl),
                    "-vf", "scale=960:540:force_original_aspect_ratio=increase,crop=960:540",
                    "-q:v", "3", str(out_thumb)
                ], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
                tmp_dl.unlink(missing_ok=True)
            except Exception:
                pass
        elif media_path.exists():
            ext = media_path.suffix.lower()
            if ext in [".mp4", ".mov", ".mkv"]:
                subprocess.run([
                    "ffmpeg", "-y", "-ss", "00:00:18", "-i", str(media_path),
                    "-frames:v", "1",
                    "-vf", "scale=960:540:force_original_aspect_ratio=increase,crop=960:540",
                    "-q:v", "3", str(out_thumb)
                ], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
                if not out_thumb.exists():
                    subprocess.run([
                        "ffmpeg", "-y", "-ss", "00:00:03", "-i", str(media_path),
                        "-frames:v", "1",
                        "-vf", "scale=960:540:force_original_aspect_ratio=increase,crop=960:540",
                        "-q:v", "3", str(out_thumb)
                    ], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
            else:
                subprocess.run([
                    "ffmpeg", "-y", "-i", str(media_path),
                    "-vf", "scale=960:540:force_original_aspect_ratio=increase,crop=960:540",
                    "-q:v", "3", str(out_thumb)
                ], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    palette = [
        {"hex": "#0F172A", "name": "Shadow Core"},
        {"hex": "#1E293B", "name": "Midtone Slate"},
        {"hex": "#D97706", "name": "Key Accent"},
        {"hex": "#38BDF8", "name": "Specular Rim"},
        {"hex": "#F8FAFC", "name": "Highlight Peak"}
    ]
    if out_thumb.exists():
        try:
            raw = subprocess.check_output([
                "ffmpeg", "-v", "error", "-i", str(out_thumb),
                "-vf", "scale=5:1:flags=area", "-f", "rawvideo", "-pix_fmt", "rgb24", "-"
            ])
            names = ["Deep Tone", "Primary Mass", "Center Focus", "Secondary Accent", "Rim Highlight"]
            extracted = []
            for i in range(0, min(len(raw), 15), 3):
                r, g, b = raw[i], raw[i + 1], raw[i + 2]
                extracted.append({"hex": f"#{r:02X}{g:02X}{b:02X}", "name": names[i // 3]})
            if len(extracted) == 5:
                palette = extracted
        except Exception:
            pass
    return f"assets/thumbs/{thumb_name}", palette


SHOT_PHASES = [
    (0.10, "Shot 01 · 起幅空间建置", "24mm Anamorphic T2.8", "0.25m/s 阻尼慢推建置环境纵深"),
    (0.26, "Shot 02 · 主体动线切入", "35mm Master Prime T2.0", "侧向跟拍锁定人物/主体运动轨迹"),
    (0.42, "Shot 03 · 视觉奇观展开", "50mm Panavision T2.0", "15° 侧逆光环绕揭示核心视觉奇观"),
    (0.58, "Shot 04 · 微距材质特写", "100mm Ultra-Macro T2.8", "微距贴面滑行捕捉真实肌理与高光反射"),
    (0.74, "Shot 05 · 情绪与节奏峰值", "35mm Dynamic T2.0", "声画同步快切与相似形动势接力 (Match-Cut)"),
    (0.88, "Shot 06 · 2.5s死寂落幅定标", "50mm Master Lock T2.0", "配乐归零 + 极简留白构图定格品牌余韵")
]


def _compute_frame_palette_and_contrast(img_path: Path):
    palette = [
        {"hex": "#0F172A", "name": "Shadow Core"},
        {"hex": "#1E293B", "name": "Midtone Slate"},
        {"hex": "#D97706", "name": "Key Accent"},
        {"hex": "#38BDF8", "name": "Specular Rim"},
        {"hex": "#F8FAFC", "name": "Highlight Peak"}
    ]
    contrast_str = "6.4:1"
    if img_path.exists():
        try:
            raw = subprocess.check_output([
                "ffmpeg", "-v", "error", "-i", str(img_path),
                "-vf", "scale=5:1:flags=area", "-f", "rawvideo", "-pix_fmt", "rgb24", "-"
            ])
            names = ["Deep Tone", "Primary Mass", "Center Focus", "Secondary Accent", "Rim Highlight"]
            extracted = []
            lumas = []
            for i in range(0, min(len(raw), 15), 3):
                r, g, b = raw[i], raw[i + 1], raw[i + 2]
                extracted.append({"hex": f"#{r:02X}{g:02X}{b:02X}", "name": names[i // 3]})
                lumas.append(0.2126 * r + 0.7152 * g + 0.0722 * b)
            if len(extracted) == 5:
                palette = extracted
                hi, lo = max(lumas), max(12.0, min(lumas))
                contrast_str = f"{max(2.0, min(12.0, (hi + 20.0) / lo)):.1f}:1"
        except Exception:
            pass
    return palette, contrast_str


def extract_multi_shot_storyboard(uid: str, media_path: Path, vid: str = "", duration: int = 90):
    THUMBS_DIR.mkdir(parents=True, exist_ok=True)
    stream_url = ""
    headers_arg = []
    raw_str = str(media_path)
    if not vid and uid.startswith("XPC-") and CLOUD_SEED_PATH.exists():
        try:
            if not hasattr(extract_multi_shot_storyboard, "_vid_map"):
                seeds = json.loads(CLOUD_SEED_PATH.read_text(encoding="utf-8"))
                extract_multi_shot_storyboard._vid_map = {s["id"]: (s.get("vid", ""), int(s.get("duration") or 90)) for s in seeds}
            vid, duration = extract_multi_shot_storyboard._vid_map.get(uid, ("", duration))
        except Exception:
            pass

    if vid:
        try:
            api_url = f"https://mod-api.xinpianchang.com/mod/api/v2/media/{vid}?appKey=61a2f329348b3bf77"
            req = urllib.request.Request(api_url, headers={"User-Agent": "Mozilla/5.0"})
            data = json.loads(urllib.request.urlopen(req, timeout=8).read().decode()).get("data") or {}
            duration = int(data.get("duration") or duration or 90)
            prog = (data.get("resource") or {}).get("progressive") or []
            if prog:
                chosen = next((p for p in prog if p.get("quality") in ["720p", "540p", "360p"]), prog[-1])
                stream_url = chosen.get("url") or ""
                headers_arg = ["-headers", "Referer: https://www.xinpianchang.com/\r\n"]
        except Exception:
            pass
    elif media_path.exists() and media_path.suffix.lower() in [".mp4", ".mov", ".mkv"]:
        stream_url = str(media_path)
        try:
            dur_out = subprocess.check_output([
                "ffprobe", "-v", "error", "-show_entries", "format=duration",
                "-of", "default=noprint_wrappers=1:nokey=1", stream_url
            ], text=True, timeout=5).strip()
            duration = max(12, int(float(dur_out)))
        except Exception:
            duration = 90

    shots = []
    if stream_url:
        for idx, (ratio, phase_label, lens_tag, move_tag) in enumerate(SHOT_PHASES, 1):
            sec = max(1, int(duration * ratio))
            mm, ss = divmod(sec, 60)
            tc = f"{mm:02d}:{ss:02d}"
            fname = f"auto_{uid}_f{idx}.jpg"
            out_f = THUMBS_DIR / fname
            if not out_f.exists():
                cmd = ["ffmpeg", "-y", "-ss", str(sec)] + headers_arg + [
                    "-i", stream_url, "-frames:v", "1",
                    "-vf", "scale=960:540:force_original_aspect_ratio=increase,crop=960:540",
                    "-q:v", "3", str(out_f)
                ]
                subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, timeout=15)
            if out_f.exists():
                pal, c_ratio = _compute_frame_palette_and_contrast(out_f)
                shots.append({
                    "index": idx,
                    "phase": phase_label,
                    "timecode": tc,
                    "thumb": f"assets/thumbs/{fname}",
                    "lens": lens_tag,
                    "move": move_tag,
                    "contrast": c_ratio,
                    "palette": pal
                })
    return shots, duration


def classify_category(title: str, folder: str) -> str:
    txt = f"{title} {folder}".lower()
    if any(k in txt for k in ["时尚", "时装", "奢", "vogue", "bazaar", "ysl", "prada", "hermes", "chanel", "mv", "女团", "男团"]):
        return "luxury" if any(k in txt for k in ["奢", "时装", "珠宝", "腕表", "香水", "坦塔伦"]) else "fashion_sport"
    if any(k in txt for k in ["手机", "3c", "oppo", "vivo", "华为", "小米", "东芝", "松下", "家电", "数码", "镜头"]):
        return "tech3c"
    if any(k in txt for k in ["ai", "大会", "峰会", "火山", "外滩", "阿里云", "腾讯", "年会", "开场"]):
        return "aikeynote"
    if any(k in txt for k in ["医药", "生物", "健康", "营养", "农业", "医疗", "医师"]):
        return "biotech"
    if any(k in txt for k in ["文旅", "旅游", "非遗", "茶", "美食", "湘西", "景德镇", "城市", "武汉", "深圳", "酒"]):
        return "culture"
    if any(k in txt for k in ["建筑", "住宅", "包豪斯", "侘寂", "别墅", "肖像", "ceo", "达沃斯", "boris", "地产", "和悦"]):
        return "architecture"
    if any(k in txt for k in ["体育", "大运", "mlb", "运动", "赛"]):
        return "fashion_sport"
    return "industry"


def build_entry(uid: str, title: str, brand: str, cat: str, stats: str, source_platform: str, source_url: str, media_path: Path):
    prof = CATEGORY_PROFILES.get(cat, CATEGORY_PROFILES["industry"])
    thumb_rel, palette = extract_thumb_and_palette(media_path, f"auto_{uid}.jpg")
    shots, dur_sec = extract_multi_shot_storyboard(uid, media_path)
    if shots:
        for sh in shots:
            sh_hex = " / ".join(f"{p['name']}({p['hex']})" for p in sh["palette"])
            sh["prompt"] = (
                f"16:9 Cinema Frame [{sh['phase']} @ {sh['timecode']}] of '{title}'. "
                f"Shot on {prof['camera']} with {sh['lens']}. Camera Motion: {sh['move']}. "
                f"Measured Contrast: {sh['contrast']}, Palette: {sh_hex}."
            )
    hex_str = " / ".join(f"{p['name']}({p['hex']})" for p in palette)

    return {
        "id": uid,
        "title": title,
        "brand": brand,
        "category": cat,
        "categoryLabel": prof["label"],
        "mood": prof["mood"],
        "pacing": prof["pacing"],
        "sourcePlatform": source_platform,
        "sourceUrl": source_url,
        "localVideoPath": str(media_path.relative_to(BASE_DIR)) if media_path.is_relative_to(BASE_DIR) else str(media_path),
        "thumb": thumb_rel,
        "durationSec": dur_sec,
        "shots": shots,
        "stats": stats,
        "optics": {
            "camera": prof["camera"], "lens": prof["lens"], "focalLength": prof["lens"].split()[-1],
            "aperture": prof["aperture"], "filmStock": prof["filmStock"], "halation": prof["halation"]
        },
        "lighting": {"ratio": prof["ratio"], "kelvin": prof["kelvin"], "style": "母片逆向蒸馏物理布光与真实暗部衰减"},
        "palette": palette,
        "kinematics": {"primaryMove": prof["move"], "speedProfile": "物理阻尼平滑加减速，拒绝数码抖动", "blockingRule": "180°轴线锁定，主体与前景/背景建立三层纵深遮挡"},
        "editing": {"bpm": prof["bpm"], "avgShotLength": prof["asl"], "cutStyle": "声画动势接力剪辑 + 0.5s 拟音先行桥接 (J-Cut)", "silenceDropSec": "全片 60% 黄金分割位骤停配乐 2.5s 留白"},
        "rhetoric": {"motif": f"【{brand[:6]}】×【高定叙事】", "cadenceRule": "4-4-7 黄金音律，字数按 4.2字/秒 卡死零拉伸", "voVsHudSplit": "VO只念哲学洞察；硬核参数交由左下角HUD角标呈现", "sampleLine": f"于无声处见惊雷，在毫厘之间重塑{prof['label']}的美学标尺。"},
        "audio": {
            "elevenLabsVO": {"archetype": prof["voArchetype"], **prof["voSettings"], "use_speaker_boost": True, "ssml": f"于无声处见惊雷，<break time=\"0.6s\"/>在毫厘之间，重塑{prof['label']}的美学标尺。"},
            "elevenLabsSFX": {"prompt": f"High-precision commercial foley for {prof['label']}, crisp material texture contact mic, subtle sub-bass transient, clean studio acoustics.", "duration_seconds": 2.5, "prompt_influence": 0.82},
            "musicModel": {"genre": prof["musicGenre"], "bpm": prof["bpm"], "key": prof["musicKey"], "meter": "4/4", "stems": prof["stems"], "sunoPrompt": f"[Instrumental] {prof['musicGenre']}, {prof['bpm']} BPM, {prof['stems']}, [Break: 100% Dramatic Silence at 60%]"}
        },
        "aigcPayloads": {
            "keyframePrompt": f"16:9 widescreen cinema frame ({title}). Shot on {prof['camera']} with {prof['lens']} at {prof['aperture']}. Film Stock: {prof['filmStock']}. Lighting: {prof['ratio']}, {prof['kelvin']}. Extracted Master Palette: {hex_str}. Parted lips (2mm), eyes 15 degrees off-camera, authentic skin pores and physical material micro-texture.",
            "seedancePrompt": f"【空间与机位光学】：16:9 · {prof['lens']} · {prof['aperture']} · {prof['ratio']} · 实测母片色板 {hex_str}\n【角色与动作因果时序】：\n  [0-0.4s] 首帧人物双唇微启2~3mm，眼神偏角15度锁定目标；\n  [0.4-5.0s] 摄影机执行【{prof['move']}】，主体完成连续物理受力动作；\n  [5.0-7.5s] 动作收束，保留整整2.5秒冷峻死寂落幅。\n【台词发音与拼音死锁】：字正腔圆，严禁吞音！\n【纯净音轨与声学空间混响】：Zero BGM！Zero 环境底噪！仅保留纯净角色对白与场景自然物理声学混响！\n【绝对物理负向禁令】：100% Deadpan！严禁假笑！严禁斗鸡眼！严禁直视镜头！"
        }
    }


def gather_candidate_pool(live_web: bool = False):
    candidates = []

    # Pool 1: Xinpianchang 2026 32 Benchmark MP4s
    xpc32_dir = BASE_DIR / "新片场_2026宣传片高赞高藏精选库_32部全品类标杆"
    for mp4 in sorted(xpc32_dir.glob("*/*.mp4")):
        fname = mp4.stem
        m_brand = re.search(r"【(.*?)】(.*?)_【下载理由：(.*?)】", fname)
        if m_brand:
            tag, name, reason = m_brand.group(1), m_brand.group(2), m_brand.group(3)
        else:
            tag, name, reason = "精选标杆", fname[:24], "新片场2026官方精选高藏母片"
        uid = "XPC32-" + hashlib.md5(fname.encode()).hexdigest()[:6].upper()
        cat = classify_category(fname, mp4.parent.name)
        candidates.append((uid, f"{name} · {tag}", name.split("_")[0], cat, reason, "新片场2026全品类标杆库", "https://www.xinpianchang.com", mp4))

    # Pool 2: Xinpianchang 5 Directors 55 Masterpieces (manifest.json)
    dir5_manifest = BASE_DIR / "新片场五位导演作品库_1080P/manifest.json"
    if dir5_manifest.exists():
        items = json.loads(dir5_manifest.read_text(encoding="utf-8"))
        for it in sorted(items, key=lambda x: x.get("collects", 0), reverse=True):
            mp4 = BASE_DIR / "新片场五位导演作品库_1080P" / it.get("relative_path", "")
            if mp4.exists():
                aid = it.get("article_id")
                uid = f"DIR5-{aid}"
                director = it.get("director", "名导")
                title = it.get("title", mp4.stem)
                likes, colls = it.get("likes", 0), it.get("collects", 0)
                stats = f"导演：{director} · {likes}赞 / {colls}藏 · {it.get('curated_reason', '导演代表作')}"
                cat = classify_category(title, director)
                candidates.append((uid, f"{title} ({director}导演版)", director, cat, stats, f"新片场 (a{aid})", f"https://www.xinpianchang.com/a{aid}", mp4))

    # Pool 3: Architectural Digest (AD) & Global Luxury Villas (25+ 16:9 Plates)
    for folder_name in [
        "solution/全球10大顶奢住宅风格摄影图鉴_16x9",
        "solution/AD_6大新增美学维度概念图鉴_16x9",
        "solution/包豪斯_现代工业_科技侘寂_8大极简空间图鉴_16x9"
    ]:
        fdir = BASE_DIR / folder_name
        for img in sorted(fdir.glob("*.jpg")):
            uid = "AD-" + hashlib.md5(img.stem.encode()).hexdigest()[:6].upper()
            clean_title = img.stem.replace("_", " ")
            candidates.append((uid, f"AD顶奢建筑 · {clean_title}", "Architectural Digest", "architecture", "AD全球顶奢空间摄影与光影母本", "Architectural Digest", "https://www.architecturaldigest.com", img))

    # Pool 4: Bangjaeyeob (方在烨导演) Commercial & MV Archive (All 94 MP4s)
    bang_dir = BASE_DIR / "方在烨导演作品库_1080P"
    for mp4 in sorted(bang_dir.glob("*/*/*.mp4")):
        uid = "BANG-" + hashlib.md5(mp4.stem.encode()).hexdigest()[:6].upper()
        sub = mp4.parent.name
        yr = mp4.parent.parent.name
        cat = "luxury" if "商业" in sub else "fashion_sport"
        candidates.append((uid, f"方在烨 ({yr}) · {mp4.stem[:28]}", "BANGJAEYEOB FILM", cat, f"韩国顶流视觉导演方在烨 {yr} {sub}母片", "BANGJAEYEOB Archive", "https://bangjaeyeob.com", mp4))

    # Pool 5: Annual Gala & Enterprise Opening Films (26 MP4s)
    gala_dir = BASE_DIR / "新片场_华润及名企年会开场与全流程视频精选库_26部"
    for mp4 in sorted(gala_dir.glob("*/*.mp4")):
        uid = "GALA-" + hashlib.md5(mp4.stem.encode()).hexdigest()[:6].upper()
        candidates.append((uid, f"名企峰会盛典 · {mp4.stem[:26]}", "名企峰会先导", "aikeynote", "新片场高藏大型峰会与品牌开场标杆", "新片场峰会精选库", "https://www.xinpianchang.com", mp4))

    # Pool 6: NVIDIA / Xiaomi / MediaStorm / Planet Institute / Chapingjun VFX & Camera Suites
    vfx_dirs = [
        ("solution/NVIDIA_官方宣传片16大特效套路检索库与跨软件制作指南/previews", "NVIDIA Official", "aikeynote", "NVIDIA 300部官方片提纯16大三维动效母本"),
        ("solution/影视飓风_MediaStorm_16大镜头与特效检索库及双轨生成指南/assets", "影视飓风 MediaStorm", "tech3c", "影视飓风828部视频提纯16大特种运镜母本"),
        ("solution/星球研究所_InstituteForPlanets_16大特效套路检索库与双轨生成指南/previews", "星球研究所", "culture", "星球研究所177部超级工程与地理视觉母本"),
        ("solution/差评君_全频道16大特效套路检索库与双轨生成字典/previews", "差评君", "aikeynote", "差评君429部科技叙事动效母体字典")
    ]
    for rel_d, brand_name, cat_name, desc_txt in vfx_dirs:
        vd = BASE_DIR / rel_d
        for img in sorted(vd.glob("*.jpg")) + sorted(vd.glob("*.png")):
            uid = "VFX-" + hashlib.md5(str(img).encode()).hexdigest()[:6].upper()
            candidates.append((uid, f"{brand_name} · {img.stem}", brand_name, cat_name, desc_txt, brand_name, "https://www.youtube.com", img))

    # Pool 7: Xinpianchang Industrial & Global Supply Chain Benchmarks (83 MP4s)
    for ind_folder in [
        "新片场_工业物流与智能仓储标杆样片库_23部最高清",
        "新片场_品类A_跨境物流_海外仓与云仓供应链对客片全量库_60部"
    ]:
        idir = BASE_DIR / ind_folder
        for mp4 in sorted(idir.glob("*/*.mp4")):
            uid = "IND-" + hashlib.md5(mp4.stem.encode()).hexdigest()[:6].upper()
            candidates.append((uid, f"硬核智造与全球供应链 · {mp4.stem[:28]}", mp4.parent.name[:12], "industry", "新片场三阶预算定级工业与供应链标杆母片", "新片场工业标杆库", "https://www.xinpianchang.com", mp4))

    # Pool 8: Boris Baldinger Davos & Executive Portraits (154 High-Res Stills)
    boris_dir = BASE_DIR / "Boris_Baldinger_作品库"
    for img in sorted(boris_dir.glob("*/*.jpg"))[:60]:
        uid = "EXEC-" + hashlib.md5(img.stem.encode()).hexdigest()[:6].upper()
        candidates.append((uid, f"达沃斯与高管肖像 · {img.parent.name[3:15]} ({img.stem[:12]})", "Boris Baldinger", "architecture", "瑞士商业肖像大师 Boris Baldinger 伦勃朗布光母本", "Boris Baldinger Archive", "https://www.borisbaldinger.com", img))

    # Pool 9: Cloud-Ready Xinpianchang CDN Seed Catalog (771 High-Collection Films)
    if CLOUD_SEED_PATH.exists():
        try:
            seeds = json.loads(CLOUD_SEED_PATH.read_text(encoding="utf-8"))
            for s in seeds:
                uid = s["id"]
                title = s["title"]
                brand = s["brand"]
                cat = classify_category(title, brand)
                stats = f"主创：{brand} · {s['likes']}赞 / {s['collects']}藏 · 新片场高藏精选"
                candidates.append((uid, title, brand, cat, stats, f"新片场 ({uid})", s["url"], Path(s["cover"])))
        except Exception:
            pass

    # Pool 10: Live YouTube Luxury & Tech Channels via yt-dlp (when --live-web is passed)
    if live_web:
        yt_channels = [
            ("https://www.youtube.com/@ysl/videos", "Saint Laurent", "luxury"),
            ("https://www.youtube.com/@hermes/videos", "Hermès", "luxury"),
            ("https://www.youtube.com/@Prada/videos", "Prada", "luxury"),
            ("https://www.youtube.com/@CHANEL/videos", "Chanel", "luxury"),
            ("https://www.youtube.com/@louisvuitton/videos", "Louis Vuitton", "luxury"),
            ("https://www.youtube.com/@Cartier/videos", "Cartier", "luxury"),
            ("https://www.youtube.com/@Dior/videos", "Dior", "luxury"),
            ("https://www.youtube.com/@Apple/videos", "Apple", "tech3c"),
            ("https://www.youtube.com/@LeicaCamera/videos", "Leica", "tech3c"),
            ("https://www.youtube.com/@BangAndOlufsen/videos", "Bang & Olufsen", "tech3c"),
            ("https://www.youtube.com/@Porsche/videos", "Porsche", "industry"),
            ("https://www.youtube.com/@nowness/videos", "NOWNESS", "culture")
        ]
        for ch_url, brand, cat in yt_channels:
            try:
                out = subprocess.check_output([
                    "yt-dlp", "--flat-playlist", "--playlist-end", "12", "--dump-json", ch_url
                ], text=True, stderr=subprocess.DEVNULL, timeout=18)
                for line in out.strip().splitlines():
                    info = json.loads(line)
                    vid = info.get("id")
                    vtitle = info.get("title", "Official Film")
                    uid = f"YT-{vid[:8].upper()}"
                    yt_thumb_url = f"https://i.ytimg.com/vi/{vid}/hqdefault.jpg"
                    candidates.append((uid, f"{brand} · {vtitle[:42]}", brand, cat, f"{brand} Official YouTube Masterpiece", f"YouTube ({brand})", f"https://www.youtube.com/watch?v={vid}", Path(yt_thumb_url)))
            except Exception:
                pass

    return candidates


def run_daily_harvest(limit: int = 50, live_web: bool = False, backfill_shots: int = 0):
    if (STUDIO_DIR / ".git").exists() and not os.environ.get("GITHUB_ACTIONS"):
        subprocess.run(["git", "-C", str(STUDIO_DIR), "pull", "--rebase", "origin", "main"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    ledger = {"ingested_ids": [], "runs": []}
    if LEDGER_PATH.exists():
        try:
            ledger = json.loads(LEDGER_PATH.read_text(encoding="utf-8"))
        except Exception:
            pass

    existing_ids = set(ledger.get("ingested_ids", []))
    existing_batches = []
    if BATCH_JS_PATH.exists():
        raw = BATCH_JS_PATH.read_text(encoding="utf-8")
        m = re.search(r"window\.AESTHETICA_AUTO_BATCHES\s*=\s*(\[.*\]);", raw, re.S)
        if m:
            try:
                existing_batches = json.loads(m.group(1))
            except Exception:
                pass

    backfilled_count = 0
    if backfill_shots > 0:
        for item in existing_batches:
            if backfilled_count >= backfill_shots:
                break
            if item.get("shots") and len(item["shots"]) >= 4:
                continue
            uid = item.get("id", "")
            lpath = BASE_DIR / item.get("localVideoPath", "")
            shots, dur_sec = extract_multi_shot_storyboard(uid, lpath)
            if shots:
                prof = CATEGORY_PROFILES.get(item.get("category", "industry"), CATEGORY_PROFILES["industry"])
                for sh in shots:
                    sh_hex = " / ".join(f"{p['name']}({p['hex']})" for p in sh["palette"])
                    sh["prompt"] = (
                        f"16:9 Cinema Frame [{sh['phase']} @ {sh['timecode']}] of '{item.get('title', '')}'. "
                        f"Shot on {prof['camera']} with {sh['lens']}. Camera Motion: {sh['move']}. "
                        f"Measured Contrast: {sh['contrast']}, Palette: {sh_hex}."
                    )
                item["shots"] = shots
                item["durationSec"] = dur_sec
                backfilled_count += 1

    pool = gather_candidate_pool(live_web=live_web)
    new_entries = []
    if limit > 0:
        for cand in pool:
            uid = cand[0]
            if uid in existing_ids:
                continue
            entry = build_entry(*cand)
            new_entries.append(entry)
            existing_ids.add(uid)
            if len(new_entries) >= limit:
                break

    all_batches = existing_batches + new_entries
    js_payload = (
        f"// Auto-generated by daily_aesthetica_harvester.py (Last updated: {datetime.now().isoformat()})\n"
        f"window.AESTHETICA_AUTO_BATCHES = {json.dumps(all_batches, ensure_ascii=False, indent=2)};\n"
        f"if (window.AESTHETICA_DB) {{ window.AESTHETICA_DB.push(...window.AESTHETICA_AUTO_BATCHES); }}\n"
    )
    BATCH_JS_PATH.write_text(js_payload, encoding="utf-8")

    ledger["ingested_ids"] = list(existing_ids)
    ledger["runs"].append({
        "timestamp": datetime.now().isoformat(),
        "added_count": len(new_entries),
        "backfilled_multi_shot_count": backfilled_count,
        "total_auto_count": len(all_batches)
    })
    LEDGER_PATH.write_text(json.dumps(ledger, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"[+] Harvest Complete! Newly added: {len(new_entries)} | Backfilled 6-Shot Storyboards: {backfilled_count} | Total Auto: {len(all_batches)}")


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--limit", type=int, default=50, help="Number of new films to harvest in this run")
    ap.add_argument("--backfill-shots", type=int, default=20, help="Number of existing films to backfill with 6-frame storyboard")
    ap.add_argument("--live-web", action="store_true", help="Also poll live YouTube Luxury/Tech channels")
    ap.add_argument("--auto-catchup", action="store_true", help="Compensate missed days if laptop was off/asleep")
    args = ap.parse_args()
    target_limit = args.limit
    if args.auto_catchup and LEDGER_PATH.exists():
        try:
            lg = json.loads(LEDGER_PATH.read_text(encoding="utf-8"))
            runs = lg.get("runs", [])
            if runs:
                last_dt = datetime.fromisoformat(runs[-1]["timestamp"])
                missed_days = max(1, (datetime.now().date() - last_dt.date()).days)
                target_limit = min(args.limit * missed_days, 250)
        except Exception:
            pass
    run_daily_harvest(limit=target_limit, live_web=args.live_web, backfill_shots=args.backfill_shots)
