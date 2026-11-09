import os
import json
import zipfile
import shutil
import re

print("Starting Precision MIT App Inventor to Kodular Creator Migration...")

ORIG_AIA = "public/assets/aistudio/Excel_Project_V2_83e77d5d.aia"
OUTPUT_DIR = "kodular_migrated_project"
OUTPUT_AIA = "public/Excel_Learning_V2_Kodular.aia"
ROOT_OUTPUT_AIA = "Excel_Learning_V2_Kodular.aia"

if os.path.exists(OUTPUT_DIR):
    shutil.rmtree(OUTPUT_DIR)

# 1. Unzip original to a temporary directory
TEMP_EXTRACT = "temp_orig_extract"
if os.path.exists(TEMP_EXTRACT):
    shutil.rmtree(TEMP_EXTRACT)

with zipfile.ZipFile(ORIG_AIA, 'r') as z:
    z.extractall(TEMP_EXTRACT)

# Kodular package paths: user is yossef0srk, app is Excel_Learning_V2
PACKAGE_SUBDIR = os.path.join("src", "io", "kodular", "yossef0srk", "Excel_Learning_V2")
TARGET_SRC = os.path.join(OUTPUT_DIR, PACKAGE_SUBDIR)
TARGET_PROP = os.path.join(OUTPUT_DIR, "youngandroidproject")
TARGET_ASSETS = os.path.join(OUTPUT_DIR, "assets")

os.makedirs(TARGET_SRC, exist_ok=True)
os.makedirs(TARGET_PROP, exist_ok=True)
os.makedirs(TARGET_ASSETS, exist_ok=True)

# 2. project.properties
# Matched exactly to native Kodular specification from Educational_Task_0f4f5f0f.aia
project_properties = """##Sun Nov 09 18:00:00 UTC 2026
sizing=Responsive
projectColors=[{"hexa"\\:"18C869FF","freq"\\:"3"}]
color.primary.dark=&HFF18C869
color.primary=&HFF18C869
color.accent=&HFF18C869
rtlSupport=False
aname=Excel Learning
icon=ExcelLogoSmall.contrast-white_scale-140.png
main=io.kodular.yossef0srk.Excel_Learning_V2.Screen1
screenNames=Screen1, Start_Screen, Logic_Screen, Detail_Screen
source=../src
useslocation=False
assets=../assets
minSdk=23
build=../build
name=Excel_Learning_V2
splashEnabled=True
showlistsasjson=True
theme=AppTheme.Light
versioncode=1
versionname=1.0
"""

with open(os.path.join(TARGET_PROP, "project.properties"), "w", encoding="utf-8") as f:
    f.write(project_properties)

# Empty remix_history file
with open(os.path.join(TARGET_PROP, "remix_history"), "w", encoding="utf-8") as f:
    pass

# 3. Copy all original assets byte-for-byte
orig_assets_dir = os.path.join(TEMP_EXTRACT, "assets")
for asset_name in os.listdir(orig_assets_dir):
    shutil.copy2(os.path.join(orig_assets_dir, asset_name), os.path.join(TARGET_ASSETS, asset_name))
    print(f"Copied asset: {asset_name} ({os.path.getsize(os.path.join(orig_assets_dir, asset_name))} bytes)")

# 4. Migrate SCM files
# Find the original scm directory
orig_src_dir = os.path.join(TEMP_EXTRACT, "src", "appinventor", "ai_yossef0srk", "Excel_Project_V2")

screens = ["Screen1", "Start_Screen", "Logic_Screen", "Detail_Screen"]

def transform_component(comp):
    t = comp.get("$Type")
    
    # Version adjustments for Kodular Creator
    if t == "Form":
        comp["$Version"] = "46"
        comp.pop("ActionBar", None)
        comp.pop("Scrollable", None)
        comp["AccentColor"] = "&HFF18C869"
        comp["ScreenOrientation"] = "portrait"
        comp["Theme"] = "AppTheme.Light"
        comp["ShowListsAsJson"] = "True"
    elif t == "VerticalScrollArrangement":
        comp["$Version"] = "8"
    elif t == "VerticalArrangement":
        comp["$Version"] = "10"
    elif t == "HorizontalArrangement":
        comp["$Version"] = "10"
    elif t == "TableArrangement":
        comp["$Version"] = "2"
    elif t == "Image":
        comp["$Version"] = "7"  # Kodular max known version is 7
    elif t == "Button":
        comp["$Version"] = "13"
    elif t == "Label":
        comp["$Version"] = "10"
    elif t == "TextBox":
        comp["$Version"] = "13"
    elif t == "ListView":
        comp["$Version"] = "6"
        comp.pop("FontSizeDetail", None)
    elif t == "WebViewer":
        comp["$Version"] = "10"
        
    # Remove drag coordinates Left/Top
    comp.pop("Left", None)
    comp.pop("Top", None)
    
    # Custom font fix: FontTypeface -> FontTypefaceImport
    # In App Inventor: "FontTypeface": "Cairo-Bold.ttf"
    # In Kodular: "FontTypefaceImport": "Cairo-Bold.ttf", "FontTypeface": "0" (or omitted)
    if "FontTypeface" in comp:
        val = comp["FontTypeface"]
        if isinstance(val, str) and (val.endswith(".ttf") or val.endswith(".otf")):
            comp["FontTypefaceImport"] = val
            comp.pop("FontTypeface", None)

    # Recurse for children
    for child in comp.get("$Components", []):
        transform_component(child)

for screen in screens:
    orig_scm_path = os.path.join(orig_src_dir, f"{screen}.scm")
    with open(orig_scm_path, "r", encoding="utf-8") as f:
        raw = f.read()
    
    match = re.search(r"\$JSON\s*(\{.*\})\s*\|\#", raw, re.DOTALL)
    if not match:
        raise ValueError(f"Could not parse JSON from {orig_scm_path}")
    
    scm_data = json.loads(match.group(1))
    
    # Transform top-level Form and metadata
    scm_data["authURL"] = ["creator.kodular.io"]
    scm_data["YaVersion"] = "247"
    
    props = scm_data["Properties"]
    transform_component(props)
    
    # Write transformed SCM
    dest_scm_path = os.path.join(TARGET_SRC, f"{screen}.scm")
    with open(dest_scm_path, "w", encoding="utf-8") as f:
        f.write("#|\n$JSON\n" + json.dumps(scm_data, ensure_ascii=False) + "\n|#\n")
    print(f"Transformed SCM: {screen}.scm")

# 5. Migrate BKY files
# Transform namespace from https://developers.google.com/blockly/xml to http://www.w3.org/1999/xhtml
# And yacodeblocks ya-version="247" language-version="34"
for screen in screens:
    orig_bky_path = os.path.join(orig_src_dir, f"{screen}.bky")
    with open(orig_bky_path, "r", encoding="utf-8") as f:
        bky_raw = f.read()
    
    # Replace root xml namespace
    bky_transformed = bky_raw.replace('xmlns="https://developers.google.com/blockly/xml"', 'xmlns="http://www.w3.org/1999/xhtml"')
    
    # Remove redundant xmlns="http://www.w3.org/1999/xhtml" on child mutations
    bky_transformed = re.sub(r'<mutation\s+xmlns="http://www\.w3\.org/1999/xhtml"', '<mutation', bky_transformed)
    
    # Replace yacodeblocks tag
    bky_transformed = re.sub(
        r'<yacodeblocks\s+[^>]*></yacodeblocks>',
        '<yacodeblocks ya-version="247" language-version="34"></yacodeblocks>',
        bky_transformed
    )
    
    dest_bky_path = os.path.join(TARGET_SRC, f"{screen}.bky")
    with open(dest_bky_path, "w", encoding="utf-8") as f:
        f.write(bky_transformed)
    print(f"Transformed BKY: {screen}.bky")

# 6. Build the final AIA archive
with zipfile.ZipFile(OUTPUT_AIA, "w", zipfile.ZIP_DEFLATED) as zip_f:
    for root, dirs, files in os.walk(OUTPUT_DIR):
        for file in files:
            full_path = os.path.join(root, file)
            rel_path = os.path.relpath(full_path, OUTPUT_DIR)
            zip_f.write(full_path, rel_path)

shutil.copy2(OUTPUT_AIA, ROOT_OUTPUT_AIA)
print(f"Created {OUTPUT_AIA} ({os.path.getsize(OUTPUT_AIA)} bytes)")

# Clean temp extract
shutil.rmtree(TEMP_EXTRACT)
print("Migration completed successfully!")
