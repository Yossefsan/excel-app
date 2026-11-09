import zlib
import struct
import math
import os

def create_png(width, height, pixel_func):
    raw_data = bytearray()
    for y in range(height):
        raw_data.append(0)
        for x in range(width):
            r, g, b, a = pixel_func(x, y)
            raw_data.extend([int(r) & 0xff, int(g) & 0xff, int(b) & 0xff, int(a) & 0xff])
    
    def make_chunk(tag, data):
        return struct.pack(">I", len(data)) + tag + data + struct.pack(">I", zlib.crc32(tag + data) & 0xffffffff)
    
    ihdr = struct.pack(">IIBBBBB", width, height, 8, 6, 0, 0, 0)
    return b"\x89PNG\r\n\x1a\n" + make_chunk(b"IHDR", ihdr) + make_chunk(b"IDAT", zlib.compress(raw_data, 9)) + make_chunk(b"IEND", b"")

def rounded_box_dist(px, py, bx, by, bw, bh, r):
    cx = bx + bw / 2.0
    cy = by + bh / 2.0
    dx = abs(px - cx) - (bw / 2.0 - r)
    dy = abs(py - cy) - (bh / 2.0 - r)
    if dx > 0 and dy > 0:
        return math.sqrt(dx*dx + dy*dy) - r
    else:
        return max(dx, dy) - r

def circle_dist(px, py, cx, cy, r):
    return math.sqrt((px - cx)**2 + (py - cy)**2) - r

def blend(bg, fg):
    a_fg = fg[3] / 255.0
    a_bg = bg[3] / 255.0 * (1.0 - a_fg)
    a_out = a_fg + a_bg
    if a_out <= 0: return (0, 0, 0, 0)
    r = (fg[0] * a_fg + bg[0] * a_bg) / a_out
    g = (fg[1] * a_fg + bg[1] * a_bg) / a_out
    b = (fg[2] * a_fg + bg[2] * a_bg) / a_out
    return (int(r), int(g), int(b), int(a_out * 255))

C_DARK_GREEN = (24, 92, 55, 255)
C_EXCEL_GREEN = (33, 115, 70, 255)
C_FRESH_GREEN = (51, 168, 82, 255)
C_LIGHT_GREEN = (232, 243, 236, 255)
C_WHITE = (255, 255, 255, 255)
C_BG = (245, 248, 246, 255)
C_DARK = (31, 41, 51, 255)
C_BORDER = (225, 233, 227, 255)
C_BLUE = (40, 120, 200, 255)
C_ORANGE = (244, 163, 64, 255)

# Asset Preview 1200x800
def pixel_preview(x, y):
    col = C_BG
    
    # Top banner header
    if 0 <= y <= 110:
        # Gradient dark green to excel green
        t = x / 1200.0
        col = (
            int(C_DARK_GREEN[0] + (C_EXCEL_GREEN[0] - C_DARK_GREEN[0]) * t),
            int(C_DARK_GREEN[1] + (C_EXCEL_GREEN[1] - C_DARK_GREEN[1]) * t),
            int(C_DARK_GREEN[2] + (C_EXCEL_GREEN[2] - C_DARK_GREEN[2]) * t),
            255
        )
        # Header white separator line
        if abs(y - 110) < 3:
            col = C_FRESH_GREEN
            
    # Section 1: Color Palette Strip (y: 130 to 200)
    palettes = [
        ("#185C37", C_DARK_GREEN),
        ("#217346", C_EXCEL_GREEN),
        ("#33A852", C_FRESH_GREEN),
        ("#E8F3EC", C_LIGHT_GREEN),
        ("#FFFFFF", C_WHITE),
        ("#2878C8", C_BLUE),
        ("#F4A340", C_ORANGE),
        ("#1F2933", C_DARK),
    ]
    for i, (name, c_val) in enumerate(palettes):
        sw_x = 50 + i * 140
        d_sw = rounded_box_dist(x, y, sw_x, 136, 120, 60, 12)
        if d_sw <= 0:
            col = c_val
            if d_sw > -3:
                col = blend(col, C_BORDER)
                
    # Section 2: Cards for 4 Categories (y: 230 to 500)
    cat_colors = [C_EXCEL_GREEN, C_DARK_GREEN, C_BLUE, C_FRESH_GREEN]
    for i in range(4):
        cx = 50 + i * 280
        d_card = rounded_box_dist(x, y, cx, 230, 260, 250, 18)
        if d_card <= 0:
            col = C_WHITE
            if d_card > -3:
                col = C_BORDER
            # Top card colored stripe
            if 230 <= y <= 242:
                col = cat_colors[i]
            # Center icon circle
            d_icon = circle_dist(x, y, cx + 130, 310, 48)
            if d_icon <= 0:
                col = C_LIGHT_GREEN
                if d_icon > -4:
                    col = cat_colors[i]
            # Card text lines
            if 385 <= y <= 393 and cx + 30 <= x <= cx + 230:
                col = C_DARK
            if 408 <= y <= 414 and cx + 45 <= x <= cx + 215:
                col = (104, 117, 109, 255)
            if 432 <= y <= 444 and cx + 60 <= x <= cx + 200:
                d_btn = rounded_box_dist(x, y, cx + 50, 430, 160, 32, 10)
                if d_btn <= 0:
                    col = cat_colors[i]
                    
    # Section 3: Bottom showcase (App Logo, Search, Favorite, Formula fx, Welcome)
    # App Logo showcase card on left
    d_logo_card = rounded_box_dist(x, y, 50, 520, 320, 240, 18)
    if d_logo_card <= 0:
        col = C_WHITE
        if d_logo_card > -3: col = C_BORDER
        # logo badge inside
        d_lg = rounded_box_dist(x, y, 80, 550, 120, 120, 24)
        if d_lg <= 0:
            col = C_EXCEL_GREEN
        # detail lines
        if 570 <= y <= 580 and 220 <= x <= 340: col = C_DARK
        if 595 <= y <= 602 and 220 <= x <= 330: col = (104, 117, 109, 255)
        if 620 <= y <= 626 and 220 <= x <= 310: col = C_FRESH_GREEN

    # Middle card: Icon System
    d_sys_card = rounded_box_dist(x, y, 400, 520, 350, 240, 18)
    if d_sys_card <= 0:
        col = C_WHITE
        if d_sys_card > -3: col = C_BORDER
        # 3 circular icons
        for j, ic_col in enumerate([C_EXCEL_GREEN, C_ORANGE, C_BLUE]):
            ic_x = 450 + j * 100
            d_ic = circle_dist(x, y, ic_x, 620, 36)
            if d_ic <= 0:
                col = C_LIGHT_GREEN
                if d_ic > -4: col = ic_col

    # Right card: Kodular Architecture / Android Mockup
    d_mock = rounded_box_dist(x, y, 780, 520, 370, 240, 18)
    if d_mock <= 0:
        col = C_WHITE
        if d_mock > -3: col = C_BORDER
        # Header of device mockup
        if 520 <= y <= 554: col = C_DARK_GREEN
        # Mockup formula bar
        if 566 <= y <= 586 and 804 <= x <= 1126: col = C_LIGHT_GREEN
        # Mockup list items
        for row in range(3):
            ry = 600 + row * 44
            d_item = rounded_box_dist(x, y, 804, ry, 322, 34, 8)
            if d_item <= 0:
                col = (248, 250, 249, 255)
                if abs(x - 814) < 8: col = C_FRESH_GREEN

    return col

def main():
    print("Generating Asset_Preview.png (1200x800)...")
    data = create_png(1200, 800, pixel_preview)
    paths = [
        "public/assets/Asset_Preview.png",
        "public/Asset_Preview.png",
        "Asset_Preview.png"
    ]
    for p in paths:
        with open(p, "wb") as f:
            f.write(data)
    print(f"Asset_Preview.png saved successfully ({len(data)} bytes).")

if __name__ == "__main__":
    main()
