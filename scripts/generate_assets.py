import zlib
import struct
import math
import os

def create_png(width, height, pixel_func):
    """Generates valid 32-bit RGBA PNG data from a pixel function f(x, y) -> (r, g, b, a)"""
    raw_data = bytearray()
    for y in range(height):
        raw_data.append(0)  # filter type 0 (None)
        for x in range(width):
            r, g, b, a = pixel_func(x, y)
            raw_data.extend([int(r) & 0xff, int(g) & 0xff, int(b) & 0xff, int(a) & 0xff])
    
    def make_chunk(tag, data):
        return struct.pack(">I", len(data)) + tag + data + struct.pack(">I", zlib.crc32(tag + data) & 0xffffffff)
    
    ihdr = struct.pack(">IIBBBBB", width, height, 8, 6, 0, 0, 0)
    return b"\x89PNG\r\n\x1a\n" + make_chunk(b"IHDR", ihdr) + make_chunk(b"IDAT", zlib.compress(raw_data, 9)) + make_chunk(b"IEND", b"")

def lerp(c1, c2, t):
    t = max(0.0, min(1.0, t))
    return (
        c1[0] + (c2[0] - c1[0]) * t,
        c1[1] + (c2[1] - c1[1]) * t,
        c1[2] + (c2[2] - c1[2]) * t,
        c1[3] + (c2[3] - c1[3]) * t,
    )

def blend(bg, fg):
    a_fg = fg[3] / 255.0
    a_bg = bg[3] / 255.0 * (1.0 - a_fg)
    a_out = a_fg + a_bg
    if a_out <= 0:
        return (0, 0, 0, 0)
    r = (fg[0] * a_fg + bg[0] * a_bg) / a_out
    g = (fg[1] * a_fg + bg[1] * a_bg) / a_out
    b = (fg[2] * a_fg + bg[2] * a_bg) / a_out
    return (int(r), int(g), int(b), int(a_out * 255))

def rounded_box_dist(px, py, bx, by, bw, bh, r):
    # Distance to rounded rectangle
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

# Colors
C_DARK_GREEN = (24, 92, 55, 255)    # #185C37
C_EXCEL_GREEN = (33, 115, 70, 255)  # #217346
C_FRESH_GREEN = (51, 168, 82, 255)  # #33A852
C_LIGHT_GREEN = (232, 243, 236, 255)# #E8F3EC
C_WHITE = (255, 255, 255, 255)
C_DARK = (31, 41, 51, 255)          # #1F2933
C_BORDER = (225, 233, 227, 255)     # #E1E9E3
C_BLUE = (40, 120, 200, 255)        # #2878C8
C_ORANGE = (244, 163, 64, 255)      # #F4A340
C_TRANSPARENT = (0, 0, 0, 0)

# 1. App Logo (512x512)
def pixel_app_logo(x, y):
    # Rounded squircle base
    d = rounded_box_dist(x, y, 40, 40, 432, 432, 96)
    if d > 0:
        return C_TRANSPARENT
    
    # Gradient in background: dark green to fresh green
    t = (x + y) / (512.0 * 2)
    bg = lerp(C_DARK_GREEN, C_EXCEL_GREEN, t)
    
    # Inner border / highlight
    if d > -8:
        return lerp(bg, (255, 255, 255, 100), (8 + d) / 8.0)
    
    # 3D spreadsheet sheet folded behind on the right
    d_sheet = rounded_box_dist(x, y, 220, 120, 200, 260, 24)
    col = bg
    if d_sheet <= 0:
        # Sheet fill
        sheet_color = (255, 255, 255, 230)
        # Grid lines inside sheet
        # cells: 3 columns, 4 rows
        is_grid = False
        rx = x - 220
        ry = y - 120
        if 40 < rx < 190 and 50 < ry < 240:
            if abs(rx - 90) < 2 or abs(rx - 140) < 2:
                is_grid = True
            if abs(ry - 95) < 2 or abs(ry - 140) < 2 or abs(ry - 185) < 2:
                is_grid = True
        if is_grid:
            sheet_color = C_BORDER
        col = blend(col, sheet_color)
    
    # Main Excel bold 'X' tile on the front
    d_tile = rounded_box_dist(x, y, 90, 150, 190, 200, 36)
    if d_tile <= 0:
        t_tile = y / 512.0
        tile_col = lerp(C_EXCEL_GREEN, (16, 70, 40, 255), t_tile)
        if d_tile > -6:
            tile_col = blend(tile_col, (255, 255, 255, 80))
        col = blend(col, tile_col)
        
        # Draw bold X inside tile (center ~ 185, 250)
        cx, cy = 185, 250
        dx = abs(x - cx)
        dy = abs(y - cy)
        # Crossed bars with thickness
        # Bar 1: x - cx == y - cy
        dist1 = abs((x - cx) - (y - cy)) / 1.414
        dist2 = abs((x - cx) + (y - cy)) / 1.414
        if (dist1 < 16 or dist2 < 16) and max(dx, dy) < 55:
            col = blend(col, C_WHITE)
            
    # Small formula fx / spark badge on top right
    d_badge = circle_dist(x, y, 360, 130, 44)
    if d_badge <= 0:
        col = blend(col, C_ORANGE)
        if d_badge > -4:
            col = blend(col, C_WHITE)
    
    return col

# 2. Math Category (256x256)
def pixel_cat_math(x, y):
    d = rounded_box_dist(x, y, 16, 16, 224, 224, 52)
    if d > 0:
        return C_TRANSPARENT
    bg = lerp(C_LIGHT_GREEN, (215, 238, 223, 255), y / 256.0)
    col = bg
    # Central calculator / grid card
    d_card = rounded_box_dist(x, y, 52, 48, 152, 160, 24)
    if d_card <= 0:
        col = blend(col, C_WHITE)
        # Header display
        if 62 <= y <= 94 and 66 <= x <= 190:
            col = blend(col, C_DARK_GREEN)
        # Grid keys
        for row in range(3):
            for cell in range(3):
                kx = 68 + cell * 42
                ky = 108 + row * 28
                dk = rounded_box_dist(x, y, kx, ky, 34, 22, 6)
                if dk <= 0:
                    k_col = C_LIGHT_GREEN if (row == 2 and cell == 2) else (240, 246, 242, 255)
                    if row == 2 and cell == 2:
                        k_col = C_FRESH_GREEN
                    col = blend(col, k_col)
    # Math sigma symbol badge
    d_badge = circle_dist(x, y, 192, 54, 28)
    if d_badge <= 0:
        col = blend(col, C_EXCEL_GREEN)
        if d_badge > -3:
            col = blend(col, C_WHITE)
    return col

# 3. Logic Category (256x256)
def pixel_cat_logic(x, y):
    d = rounded_box_dist(x, y, 16, 16, 224, 224, 52)
    if d > 0:
        return C_TRANSPARENT
    bg = lerp(C_LIGHT_GREEN, (215, 238, 223, 255), y / 256.0)
    col = bg
    # Decision diamond in center (cx=128, cy=90, r=40)
    dx = abs(x - 128)
    dy = abs(y - 90)
    if dx + dy <= 44:
        col = blend(col, C_EXCEL_GREEN)
        if dx + dy <= 38:
            col = blend(col, C_WHITE)
            if dx + dy <= 28:
                col = blend(col, C_LIGHT_GREEN)
    
    # Connecting branches
    if 134 <= y <= 165 and abs(x - 128) < 3:
        col = blend(col, C_DARK_GREEN)
    if abs(y - 165) < 3 and 70 <= x <= 186:
        col = blend(col, C_DARK_GREEN)
    if 165 <= y <= 185 and (abs(x - 70) < 3 or abs(x - 186) < 3):
        col = blend(col, C_DARK_GREEN)
    
    # Left node (TRUE)
    d_true = rounded_box_dist(x, y, 46, 185, 48, 26, 8)
    if d_true <= 0:
        col = blend(col, C_FRESH_GREEN)
    # Right node (FALSE)
    d_false = rounded_box_dist(x, y, 162, 185, 48, 26, 8)
    if d_false <= 0:
        col = blend(col, C_ORANGE)
        
    return col

# 4. Lookup Category (256x256)
def pixel_cat_lookup(x, y):
    d = rounded_box_dist(x, y, 16, 16, 224, 224, 52)
    if d > 0:
        return C_TRANSPARENT
    bg = lerp(C_LIGHT_GREEN, (215, 238, 223, 255), y / 256.0)
    col = bg
    
    # Spreadsheet table card
    d_tbl = rounded_box_dist(x, y, 48, 52, 160, 150, 16)
    if d_tbl <= 0:
        col = blend(col, C_WHITE)
        # Header row
        if 52 <= y <= 84 and 48 <= x <= 208:
            col = blend(col, C_EXCEL_GREEN)
        # Highlighted matched row
        if 116 <= y <= 144 and 48 <= x <= 208:
            col = blend(col, (215, 240, 225, 255))
        # Column dividers
        if abs(x - 100) < 2 or abs(x - 154) < 2:
            col = blend(col, C_BORDER)
        # Row dividers
        if abs(y - 114) < 2 or abs(y - 144) < 2 or abs(y - 174) < 2:
            col = blend(col, C_BORDER)
            
    # Magnifying glass on the right bottom
    # lens center: (166, 156), r=34
    d_lens = circle_dist(x, y, 166, 156, 30)
    if d_lens <= 0:
        if d_lens > -6:
            col = blend(col, C_BLUE)
        else:
            col = blend(col, (240, 248, 255, 200))
    # handle
    hx = x - 188
    hy = y - 178
    if 0 <= hx <= 32 and abs(hx - hy) < 5:
        col = blend(col, C_DARK)
        
    return col

# 5. Text Category (256x256)
def pixel_cat_text(x, y):
    d = rounded_box_dist(x, y, 16, 16, 224, 224, 52)
    if d > 0:
        return C_TRANSPARENT
    bg = lerp(C_LIGHT_GREEN, (215, 238, 223, 255), y / 256.0)
    col = bg
    
    # Text card with 'ABC' blocks
    d_c1 = rounded_box_dist(x, y, 46, 68, 70, 70, 14)
    if d_c1 <= 0:
        col = blend(col, C_WHITE)
        if d_c1 > -4:
            col = blend(col, C_EXCEL_GREEN)
        # Draw letter A
        if 80 <= y <= 124 and (abs(x - 81) + abs(y - 102) < 18 or (abs(y - 106) < 3 and 72 <= x <= 90)):
            col = blend(col, C_DARK_GREEN)
            
    d_c2 = rounded_box_dist(x, y, 140, 68, 70, 70, 14)
    if d_c2 <= 0:
        col = blend(col, C_WHITE)
        if d_c2 > -4:
            col = blend(col, C_FRESH_GREEN)
        # Draw letter B
        if 80 <= y <= 124 and (abs(x - 165) < 16):
            col = blend(col, C_EXCEL_GREEN)

    # Concat linking chain in middle
    if 98 <= y <= 108 and 106 <= x <= 150:
        col = blend(col, C_ORANGE)
        
    # Lowercase text result bar
    d_bar = rounded_box_dist(x, y, 46, 162, 164, 40, 12)
    if d_bar <= 0:
        col = blend(col, C_WHITE)
        # mini text lines
        if 176 <= y <= 180 and 60 <= x <= 180:
            col = blend(col, C_DARK)
        if 186 <= y <= 189 and 60 <= x <= 140:
            col = blend(col, (104, 117, 109, 255))
            
    return col

# 6. Icons (Search, Favorite, Formula) 128x128
def pixel_icon_search(x, y):
    # Magnifying glass 128x128
    d_bg = circle_dist(x, y, 64, 64, 58)
    if d_bg > 0: return C_TRANSPARENT
    col = C_LIGHT_GREEN
    # glass rim
    d_rim = circle_dist(x, y, 56, 54, 28)
    if -8 <= d_rim <= 0:
        col = blend(col, C_EXCEL_GREEN)
    elif d_rim < -8:
        col = blend(col, C_WHITE)
    # handle
    hx = x - 76
    hy = y - 74
    if 0 <= hx <= 28 and abs(hx - hy) < 5:
        col = blend(col, C_DARK_GREEN)
    return col

def pixel_icon_favorite(x, y):
    d_bg = circle_dist(x, y, 64, 64, 58)
    if d_bg > 0: return C_TRANSPARENT
    col = C_LIGHT_GREEN
    # Star shape center (64, 62)
    # Simple star distance approximation
    px = x - 64
    py = y - 62
    r = math.sqrt(px*px + py*py)
    angle = math.atan2(py, px)
    # 5-pointed star
    star_r = 30 + 10 * math.cos(5 * angle)
    if r <= star_r:
        col = blend(col, C_ORANGE)
        if r <= star_r - 4:
            col = blend(col, (255, 215, 0, 255))
    return col

def pixel_icon_formula(x, y):
    d_bg = rounded_box_dist(x, y, 8, 8, 112, 112, 28)
    if d_bg > 0: return C_TRANSPARENT
    col = C_BLUE
    if d_bg > -4: col = blend(col, C_WHITE)
    # Draw 'fx' text
    # f stem (cx=48)
    if 34 <= y <= 94 and abs(x - 48) < 4:
        col = blend(col, C_WHITE)
    # f bar
    if abs(y - 58) < 3 and 38 <= x <= 62:
        col = blend(col, C_WHITE)
    # f hook
    if 34 <= y <= 44 and 48 <= x <= 64 and circle_dist(x, y, 58, 44, 10) < 3:
        col = blend(col, C_WHITE)
    # x (cx=82, cy=74)
    dx = abs(x - 82)
    dy = abs(y - 74)
    if (abs(dx - dy) < 4) and max(dx, dy) < 16:
        col = blend(col, C_WHITE)
    return col

# 7. Illustrations (Welcome, Empty, Practice, Quiz)
def pixel_welcome(x, y):
    # 600x450
    # Soft background gradient
    bg = lerp(C_LIGHT_GREEN, (245, 248, 246, 255), (x + y) / (600 + 450))
    col = bg
    # Big central laptop / monitor
    # Screen body (100, 60, 400, 260, 16)
    d_body = rounded_box_dist(x, y, 100, 60, 400, 260, 16)
    if d_body <= 0:
        col = blend(col, (45, 55, 65, 255))
        # Screen interior
        d_screen = rounded_box_dist(x, y, 112, 72, 376, 236, 8)
        if d_screen <= 0:
            col = blend(col, C_WHITE)
            # Excel title bar
            if 72 <= y <= 104:
                col = blend(col, C_EXCEL_GREEN)
            # Formula bar
            if 108 <= y <= 130 and 124 <= x <= 476:
                col = blend(col, (240, 244, 242, 255))
            # Grid lines
            if 136 <= y <= 296 and 124 <= x <= 476:
                gx = (x - 124) % 70
                gy = (y - 136) % 32
                if gx < 2 or gy < 2:
                    col = blend(col, C_BORDER)
            # Chart inside sheet
            if 180 <= y <= 280 and 310 <= x <= 450:
                # 3 bars
                for b_i, b_h in enumerate([50, 80, 65]):
                    bx = 330 + b_i * 38
                    by = 280 - b_h
                    if by <= y <= 280 and bx <= x <= bx + 26:
                        b_col = [C_EXCEL_GREEN, C_FRESH_GREEN, C_BLUE][b_i]
                        col = blend(col, b_col)
    # Laptop base stand
    d_base = rounded_box_dist(x, y, 70, 320, 460, 24, 12)
    if d_base <= 0:
        col = blend(col, (180, 192, 185, 255))
        
    # Floating elements around laptop
    # Sigma badge on left
    d_sig = circle_dist(x, y, 80, 140, 36)
    if d_sig <= 0:
        col = blend(col, C_EXCEL_GREEN)
        if d_sig > -4: col = blend(col, C_WHITE)
    # fx badge on right
    d_fx = circle_dist(x, y, 520, 130, 40)
    if d_fx <= 0:
        col = blend(col, C_BLUE)
        if d_fx > -4: col = blend(col, C_WHITE)
    # Checkmark badge bottom right
    d_chk = circle_dist(x, y, 490, 290, 32)
    if d_chk <= 0:
        col = blend(col, C_FRESH_GREEN)
        if d_chk > -4: col = blend(col, C_WHITE)
    return col

def pixel_empty_search(x, y):
    # 400x300
    bg = (245, 248, 246, 255)
    col = bg
    # Document sheet
    d_doc = rounded_box_dist(x, y, 140, 50, 120, 160, 12)
    if d_doc <= 0:
        col = blend(col, C_WHITE)
        if d_doc > -4: col = blend(col, C_BORDER)
        # Empty gray lines
        for row in range(4):
            ry = 80 + row * 24
            if ry <= y <= ry + 8 and 156 <= x <= 244:
                col = blend(col, (220, 228, 222, 255))
    # Big magnifying glass with question mark
    d_glass = circle_dist(x, y, 220, 160, 44)
    if -8 <= d_glass <= 0:
        col = blend(col, C_EXCEL_GREEN)
    elif d_glass < -8:
        col = blend(col, (240, 246, 242, 220))
    # handle
    hx = x - 250
    hy = y - 190
    if 0 <= hx <= 36 and abs(hx - hy) < 6:
        col = blend(col, C_DARK_GREEN)
    return col

def pixel_practice(x, y):
    # 400x300
    bg = (245, 248, 246, 255)
    col = bg
    # Interactive spreadsheet card
    d_card = rounded_box_dist(x, y, 60, 40, 280, 220, 18)
    if d_card <= 0:
        col = blend(col, C_WHITE)
        if d_card > -4: col = blend(col, C_BORDER)
        # Header bar
        if 40 <= y <= 76 and 60 <= x <= 340:
            col = blend(col, C_LIGHT_GREEN)
        # Editable cell highlight
        if 130 <= y <= 170 and 150 <= x <= 310:
            col = blend(col, (225, 245, 232, 255))
            if abs(y - 130) < 2 or abs(y - 170) < 2 or abs(x - 150) < 2 or abs(x - 310) < 2:
                col = blend(col, C_FRESH_GREEN)
    # Pencil icon editing
    px = x - 260
    py = y - 100
    if 0 <= px <= 40 and 0 <= py <= 40 and abs(px - py) < 8:
        col = blend(col, C_ORANGE)
    return col

def pixel_quiz(x, y):
    # 400x300
    bg = (245, 248, 246, 255)
    col = bg
    # Clipboard
    d_clip = rounded_box_dist(x, y, 110, 40, 180, 230, 16)
    if d_clip <= 0:
        col = blend(col, (240, 244, 242, 255))
        if d_clip > -4: col = blend(col, C_BORDER)
        # Paper
        d_paper = rounded_box_dist(x, y, 124, 60, 152, 196, 8)
        if d_paper <= 0:
            col = blend(col, C_WHITE)
            # Checklist items (checkbox + line)
            for i in range(3):
                cy = 90 + i * 40
                d_box = rounded_box_dist(x, y, 140, cy, 20, 20, 4)
                if d_box <= 0:
                    col = blend(col, C_FRESH_GREEN if i < 2 else C_BORDER)
                if cy + 6 <= y <= cy + 14 and 172 <= x <= 256:
                    col = blend(col, C_DARK if i < 2 else (180, 190, 185, 255))
    # Top clip metal
    d_top = rounded_box_dist(x, y, 160, 28, 80, 24, 8)
    if d_top <= 0:
        col = blend(col, (150, 165, 158, 255))
    # 100% medal badge on bottom right
    d_medal = circle_dist(x, y, 270, 220, 32)
    if d_medal <= 0:
        col = blend(col, C_ORANGE)
        if d_medal > -4: col = blend(col, (255, 220, 80, 255))
    return col

def main():
    assets = [
        ("app_logo.png", 512, 512, pixel_app_logo),
        ("category_math.png", 256, 256, pixel_cat_math),
        ("category_logic.png", 256, 256, pixel_cat_logic),
        ("category_lookup.png", 256, 256, pixel_cat_lookup),
        ("category_text.png", 256, 256, pixel_cat_text),
        ("icon_search.png", 128, 128, pixel_icon_search),
        ("icon_favorite.png", 128, 128, pixel_icon_favorite),
        ("icon_formula.png", 128, 128, pixel_icon_formula),
        ("welcome_illustration.png", 600, 450, pixel_welcome),
        ("empty_search.png", 400, 300, pixel_empty_search),
        ("practice_illustration.png", 400, 300, pixel_practice),
        ("quiz_illustration.png", 400, 300, pixel_quiz),
    ]
    
    out_dirs = ["public/assets", "src/assets"]
    for d in out_dirs:
        os.makedirs(d, exist_ok=True)
        
    for name, w, h, fn in assets:
        print(f"Generating {name} ({w}x{h})...")
        data = create_png(w, h, fn)
        for d in out_dirs:
            path = os.path.join(d, name)
            with open(path, "wb") as f:
                f.write(data)
        print(f"Saved {name} ({len(data)} bytes)")

if __name__ == "__main__":
    main()
