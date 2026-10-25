#!/usr/bin/env python3
"""
AIPGC Aesthetica Ingestor — Automated Reference Video to 8-Dimensional Aesthetic Card Pipeline
Usage:
  python3 aipgc_ingestor.py <input_video.mp4_or_url> --title "Brand TVC" --category luxury
"""
import argparse
import json
import os
import subprocess
import sys
from pathlib import Path


def get_video_duration(video_path: str) -> float:
    cmd = [
        "ffprobe", "-v", "error", "-show_entries", "format=duration",
        "-of", "default=noprint_wrappers=1:nokey=1", video_path
    ]
    out = subprocess.check_output(cmd, text=True).strip()
    return float(out)


def extract_keyframe_and_palette(video_path: str, out_dir: Path, slug: str, duration: float):
    out_dir.mkdir(parents=True, exist_ok=True)
    thumb_path = out_dir / f"{slug}_thumb_16x9.jpg"
    ts = f"{duration * 0.35:.2f}"
    subprocess.run([
        "ffmpeg", "-y", "-ss", ts, "-i", video_path,
        "-frames:v", "1",
        "-vf", "scale=960:540:force_original_aspect_ratio=increase,crop=960:540",
        "-q:v", "2", str(thumb_path)
    ], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)

    # Extract 5 dominant colors via ffmpeg raw RGB sampling
    raw_rgb = subprocess.check_output([
        "ffmpeg", "-v", "error", "-i", str(thumb_path),
        "-vf", "scale=5:1:flags=area", "-f", "rawvideo", "-pix_fmt", "rgb24", "-"
    ])
    palette = []
    for i in range(0, min(len(raw_rgb), 15), 3):
        r, g, b = raw_rgb[i], raw_rgb[i + 1], raw_rgb[i + 2]
        palette.append({"hex": f"#{r:02X}{g:02X}{b:02X}", "name": f"Tone_{i//3 + 1}"})
    return thumb_path, palette


def build_aesthetic_card(video_path: str, title: str, category: str, out_dir: Path):
    dur = get_video_duration(video_path)
    slug = Path(video_path).stem[:24].replace(" ", "_")
    thumb_path, palette = extract_keyframe_and_palette(video_path, out_dir, slug, dur)
    silence_start = round(dur * 0.60, 1)

    card = {
        "id": f"AUTO-{slug[:6].upper()}",
        "title": title,
        "category": category,
        "duration_sec": round(dur, 2),
        "golden_silence_window_sec": f"{silence_start}s - {silence_start + 2.5:.1f}s (60% Golden Ratio)",
        "thumb": str(thumb_path),
        "palette": palette,
        "seedance_2_5_template": (
            f"【空间与机位光学】：16:9 · 50mm电影定焦 · T2.0浅景深 · 主色板 {'/'.join(p['hex'] for p in palette)}\n"
            f"【角色与动作因果时序】：[0-0.4s] 首帧微张嘴2~3mm自然开口；[0.4-5.0s] 物理因果动作推进；[5.0-7.0s] 2秒冷峻死寂落幅。\n"
            f"【纯净音轨与声学空间混响】：Zero BGM！Zero 环境底噪！仅保留纯净人声与场景自然物理声学混响！\n"
            f"【绝对物理负向禁令】：100% Deadpan！严禁假笑！严禁斗鸡眼！严禁直视镜头！"
        )
    }
    json_out = out_dir / f"{slug}_aesthetic_card.json"
    json_out.write_text(json.dumps(card, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"[+] Extracted 16:9 Keyframe: {thumb_path}")
    print(f"[+] Dominant 5-Color HEX : {[p['hex'] for p in palette]}")
    print(f"[+] 60% Silence Window   : {card['golden_silence_window_sec']}")
    print(f"[+] Saved Aesthetic Card : {json_out}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("video", help="Path to local MP4 video")
    parser.add_argument("--title", default="Custom Benchmark TVC")
    parser.add_argument("--category", default="luxury")
    parser.add_argument("--out", default="./ingested_cards")
    args = parser.parse_args()
    build_aesthetic_card(args.video, args.title, args.category, Path(args.out))
