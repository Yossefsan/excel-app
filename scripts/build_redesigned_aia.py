import os
import json
import zipfile
import shutil
import re

print("Building Excel_Learning_Hub.aia and source archives with Kodular Schema normalization...")

BASE_DIR = "redesigned_project"
if os.path.exists(BASE_DIR):
    shutil.rmtree(BASE_DIR)

# Project paths
PROP_DIR = os.path.join(BASE_DIR, "youngandroidproject")
SRC_DIR = os.path.join(BASE_DIR, "src", "appinventor", "ai_yossef0srk", "Excel_Project_V2")
ASSETS_DIR = os.path.join(BASE_DIR, "assets")

os.makedirs(PROP_DIR, exist_ok=True)
os.makedirs(SRC_DIR, exist_ok=True)
os.makedirs(ASSETS_DIR, exist_ok=True)

# 1. project.properties
project_properties = """#
#Mon Nov 09 15:30:00 GMT 2026
androidminsdk=14
sizing=Responsive
Status=unknown
buildnumber=2
color.primary.dark=&HFF185C37
color.primary=&HFF217346
color.accent=&HFF33A852
aname=Excel Learning Hub
IosMinSdk=12.0
icon=app_logo.png
defaultfilescope=App
main=appinventor.ai_yossef0srk.Excel_Project_V2.Screen1
source=../src
actionbar=True
useslocation=False
assets=../assets
build=../build
name=Excel_Project_V2
lastopened=Screen1
showlistsasjson=True
theme=AppTheme.Light.DarkActionBar
versioncode=2
versionname=2.0
projectcolors={"185C37FF":1, "217346FF":1, "33A852FF":1, "E8F3ECFF":1, "FFFFFFFF":1, "F5F8F6FF":1, "2878C8FF":1, "F4A340FF":1, "1F2933FF":1}
"""
with open(os.path.join(PROP_DIR, "project.properties"), "w", encoding="utf-8") as f:
    f.write(project_properties)

# 2. Copy all assets
src_asset_files = [
    "app_logo.png",
    "welcome_illustration.png",
    "category_math.png",
    "category_logic.png",
    "category_lookup.png",
    "category_text.png",
    "icon_search.png",
    "icon_favorite.png",
    "icon_formula.png",
    "empty_search.png",
    "practice_illustration.png",
    "quiz_illustration.png",
    "Cairo-Bold.ttf",
    "ExcelLogoSmall.contrast-white_scale-140.png",
    "404-error.png",
    "maths.png",
    "logic-gates.png",
    "secure-mail.png",
    "text.png"
]

for asset_name in src_asset_files:
    src_p = os.path.join("public/assets", asset_name)
    if not os.path.exists(src_p):
        src_p = os.path.join("original_extracted/assets", asset_name)
    if os.path.exists(src_p):
        shutil.copy2(src_p, os.path.join(ASSETS_DIR, asset_name))
        print(f"Copied asset: {asset_name}")
    else:
        print(f"Warning: asset {asset_name} not found")

# Helper function to enforce Kodular Creator maximum known component versions
def sanitize_component_tree(comp):
    if not isinstance(comp, dict):
        return
    t = comp.get("$Type")
    # Kodular maximum known component versions:
    # Image: 7 (MIT App Inventor recently upgraded to 8, which breaks Kodular Creator with alert)
    if t == "Image":
        comp["$Version"] = "7"
    elif t == "Button":
        comp["$Version"] = "7"
    elif t == "Form":
        comp["$Version"] = "30"
    elif t == "ListView":
        comp["$Version"] = "6"
        comp.pop("FontSizeDetail", None)
    elif t == "WebViewer":
        comp["$Version"] = "10"
    elif t == "Label":
        comp["$Version"] = "6"
    elif t == "TextBox":
        comp["$Version"] = "6"
    elif t in ("VerticalArrangement", "HorizontalArrangement"):
        comp["$Version"] = "4"
    elif t in ("VerticalScrollArrangement", "TableArrangement"):
        comp["$Version"] = "2"
    
    for child in comp.get("$Components", []):
        sanitize_component_tree(child)

# SCREEN 1: Screen1.scm
screen1_scm = {
  "authURL": ["ai2a.appinventor.mit.edu"],
  "YaVersion": "217",
  "Source": "Form",
  "Properties": {
    "$Name": "Screen1",
    "$Type": "Form",
    "$Version": "30",
    "ActionBar": "True",
    "AppName": "Excel Learning Hub",
    "BackgroundColor": "&HFFF5F8F6",
    "Icon": "app_logo.png",
    "PrimaryColor": "&HFF217346",
    "PrimaryColorDark": "&HFF185C37",
    "Title": "موسوعة إكسيل التعليمية",
    "TitleVisible": "False",
    "Uuid": "0",
    "$Components": [
      {
        "$Name": "VerticalScrollArrangement1",
        "$Type": "VerticalScrollArrangement",
        "$Version": "2",
        "AlignHorizontal": "3",
        "AlignVertical": "2",
        "BackgroundColor": "&H00FFFFFF",
        "Width": "-2",
        "Uuid": "-1027939231",
        "$Components": [
          {
            "$Name": "SpaceTop",
            "$Type": "Label",
            "$Version": "6",
            "Height": "20",
            "Text": "",
            "Uuid": "1001"
          },
          {
            "$Name": "AppLogo",
            "$Type": "Image",
            "$Version": "7",
            "Height": "100",
            "Width": "100",
            "Picture": "app_logo.png",
            "Uuid": "-2011949289"
          },
          {
            "$Name": "Title",
            "$Type": "Label",
            "$Version": "6",
            "FontBold": "True",
            "FontSize": "26",
            "FontTypeface": "Cairo-Bold.ttf",
            "Width": "-2",
            "Text": "موسوعة إكسيل التعليمية",
            "TextColor": "&HFF185C37",
            "TextAlignment": "1",
            "Uuid": "992072244"
          },
          {
            "$Name": "Subtitle",
            "$Type": "Label",
            "$Version": "6",
            "FontBold": "True",
            "FontSize": "16",
            "FontTypeface": "Cairo-Bold.ttf",
            "Width": "-2",
            "Text": "تعلم دوال Excel خطوة بخطوة",
            "TextColor": "&HFF217346",
            "TextAlignment": "1",
            "Uuid": "1002"
          },
          {
            "$Name": "WelcomeIllustration",
            "$Type": "Image",
            "$Version": "7",
            "Height": "220",
            "Width": "-2",
            "Picture": "welcome_illustration.png",
            "Uuid": "1003"
          },
          {
            "$Name": "DescriptionCard",
            "$Type": "VerticalArrangement",
            "$Version": "4",
            "AlignHorizontal": "3",
            "BackgroundColor": "&HFFFFFFFF",
            "Width": "-2",
            "Uuid": "1004",
            "$Components": [
              {
                "$Name": "Label_Desc",
                "$Type": "Label",
                "$Version": "6",
                "FontSize": "15",
                "FontTypeface": "Cairo-Bold.ttf",
                "Width": "-2",
                "Text": "اكتشف أهم دوال Excel وتعلم كيفية استخدامها من خلال شروحات مبسطة وأمثلة عملية.",
                "TextColor": "&HFF1F2933",
                "TextAlignment": "2",
                "Uuid": "909555206"
              }
            ]
          },
          {
            "$Name": "SpaceBtn",
            "$Type": "Label",
            "$Version": "6",
            "Height": "15",
            "Text": "",
            "Uuid": "1005"
          },
          {
            "$Name": "Btn_StartLearning",
            "$Type": "Button",
            "$Version": "7",
            "BackgroundColor": "&HFF217346",
            "FontBold": "True",
            "FontSize": "20",
            "FontTypeface": "Cairo-Bold.ttf",
            "Height": "52",
            "Shape": "1",
            "Text": "ابدأ التعلم",
            "TextColor": "&HFFFFFFFF",
            "TextAlignment": "1",
            "Width": "-2",
            "Uuid": "1108357330"
          }
        ]
      }
    ]
  }
}

sanitize_component_tree(screen1_scm["Properties"])
with open(os.path.join(SRC_DIR, "Screen1.scm"), "w", encoding="utf-8") as f:
    f.write("#|\n$JSON\n" + json.dumps(screen1_scm, ensure_ascii=False) + "\n|#\n")

screen1_bky = """<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="component_event" id="rL?j0QOqg0K#Df~+bN?I" x="-287" y="18">
    <mutation xmlns="http://www.w3.org/1999/xhtml" component_type="Button" is_generic="false" instance_name="Btn_StartLearning" event_name="Click"></mutation>
    <field name="COMPONENT_SELECTOR">Btn_StartLearning</field>
    <statement name="DO">
      <block type="controls_openAnotherScreen" id="6*:|+H+LDw/#mL~y`Amt">
        <value name="SCREEN">
          <block type="helpers_screen_names" id="y#6O=bC%0.O;w]L+KZbs">
            <field name="SCREEN">Start_Screen</field>
          </block>
        </value>
      </block>
    </statement>
  </block>
  <yacodeblocks xmlns="https://appinventor.mit.edu/ns/project/" ya-version="217" language-version="40"></yacodeblocks>
</xml>"""

with open(os.path.join(SRC_DIR, "Screen1.bky"), "w", encoding="utf-8") as f:
    f.write(screen1_bky)

# SCREEN 2: Start_Screen
start_screen_scm = {
  "authURL": ["ai2a.appinventor.mit.edu"],
  "YaVersion": "217",
  "Source": "Form",
  "Properties": {
    "$Name": "Start_Screen",
    "$Type": "Form",
    "$Version": "30",
    "ActionBar": "True",
    "AppName": "Excel Learning Hub",
    "BackgroundColor": "&HFFF5F8F6",
    "PrimaryColor": "&HFF217346",
    "PrimaryColorDark": "&HFF185C37",
    "Title": "الرئيسية - موسوعة إكسيل",
    "TitleVisible": "False",
    "Uuid": "0",
    "$Components": [
      {
        "$Name": "VerticalScrollArrangementMain",
        "$Type": "VerticalScrollArrangement",
        "$Version": "2",
        "AlignHorizontal": "3",
        "BackgroundColor": "&H00FFFFFF",
        "Width": "-2",
        "Uuid": "992720030",
        "$Components": [
          {
            "$Name": "HeaderCard",
            "$Type": "VerticalArrangement",
            "$Version": "4",
            "AlignHorizontal": "3",
            "BackgroundColor": "&HFFFFFFFF",
            "Width": "-2",
            "Uuid": "2001",
            "$Components": [
              {
                "$Name": "ImageHeaderLogo",
                "$Type": "Image",
                "$Version": "7",
                "Height": "60",
                "Width": "60",
                "Picture": "app_logo.png",
                "Uuid": "-1810405762"
              },
              {
                "$Name": "Lbl_AppTitle",
                "$Type": "Label",
                "$Version": "6",
                "FontBold": "True",
                "FontSize": "22",
                "FontTypeface": "Cairo-Bold.ttf",
                "Text": "مرحباً بك في عالم Excel",
                "TextColor": "&HFF185C37",
                "TextAlignment": "1",
                "Uuid": "1100238031"
              },
              {
                "$Name": "Lbl_AppSubtitle",
                "$Type": "Label",
                "$Version": "6",
                "FontSize": "14",
                "FontTypeface": "Cairo-Bold.ttf",
                "Text": "اختر المجال الذي تريد تعلمه وابدأ رحلتك.",
                "TextColor": "&HFF68756D",
                "TextAlignment": "1",
                "Uuid": "2002"
              }
            ]
          },
          {
            "$Name": "SearchContainer",
            "$Type": "HorizontalArrangement",
            "$Version": "4",
            "AlignVertical": "2",
            "BackgroundColor": "&HFFFFFFFF",
            "Width": "-2",
            "Uuid": "2003",
            "$Components": [
              {
                "$Name": "Btn_Search",
                "$Type": "Button",
                "$Version": "7",
                "BackgroundColor": "&HFF217346",
                "Height": "44",
                "Width": "44",
                "Image": "icon_search.png",
                "Uuid": "2004"
              },
              {
                "$Name": "Txt_SearchFunction",
                "$Type": "TextBox",
                "$Version": "6",
                "FontTypeface": "Cairo-Bold.ttf",
                "FontSize": "15",
                "Hint": "ابحث عن دالة مثل SUM أو VLOOKUP...",
                "Width": "-2",
                "Uuid": "2005"
              }
            ]
          },
          {
            "$Name": "StatsCard",
            "$Type": "HorizontalArrangement",
            "$Version": "4",
            "AlignHorizontal": "3",
            "BackgroundColor": "&HFFE8F3EC",
            "Width": "-2",
            "Uuid": "2006",
            "$Components": [
              {
                "$Name": "Lbl_Stats1",
                "$Type": "Label",
                "$Version": "6",
                "FontBold": "True",
                "FontSize": "13",
                "FontTypeface": "Cairo-Bold.ttf",
                "Text": "📊 4 تصنيفات رئيسية",
                "TextColor": "&HFF185C37",
                "Uuid": "2007"
              },
              {
                "$Name": "Lbl_Stats2",
                "$Type": "Label",
                "$Version": "6",
                "FontBold": "True",
                "FontSize": "13",
                "FontTypeface": "Cairo-Bold.ttf",
                "Text": "⚡ 11 دالة شاملة",
                "TextColor": "&HFF217346",
                "Uuid": "2008"
              }
            ]
          },
          {
            "$Name": "TableArrangementCategories",
            "$Type": "TableArrangement",
            "$Version": "2",
            "Columns": "2",
            "Rows": "2",
            "Uuid": "-581203849",
            "$Components": [
              {
                "$Name": "Card_Math",
                "$Type": "VerticalArrangement",
                "$Version": "4",
                "AlignHorizontal": "3",
                "BackgroundColor": "&HFFFFFFFF",
                "Column": "0",
                "Row": "0",
                "Height": "140",
                "Width": "-1048",
                "Uuid": "-1968874239",
                "$Components": [
                  {
                    "$Name": "Image_Math",
                    "$Type": "Image",
                    "$Version": "7",
                    "Height": "64",
                    "Width": "64",
                    "Picture": "category_math.png",
                    "Uuid": "939824642"
                  },
                  {
                    "$Name": "Btn_Math",
                    "$Type": "Button",
                    "$Version": "7",
                    "BackgroundColor": "&HFF217346",
                    "FontBold": "True",
                    "FontTypeface": "Cairo-Bold.ttf",
                    "FontSize": "14",
                    "Shape": "1",
                    "Text": "الدوال الحسابية (4)",
                    "TextColor": "&HFFFFFFFF",
                    "Uuid": "224820288"
                  }
                ]
              },
              {
                "$Name": "Card_Logic",
                "$Type": "VerticalArrangement",
                "$Version": "4",
                "AlignHorizontal": "3",
                "BackgroundColor": "&HFFFFFFFF",
                "Column": "1",
                "Row": "0",
                "Height": "140",
                "Width": "-1048",
                "Uuid": "135378789",
                "$Components": [
                  {
                    "$Name": "Image_Logic",
                    "$Type": "Image",
                    "$Version": "7",
                    "Height": "64",
                    "Width": "64",
                    "Picture": "category_logic.png",
                    "Uuid": "-823335273"
                  },
                  {
                    "$Name": "Btn_Logic",
                    "$Type": "Button",
                    "$Version": "7",
                    "BackgroundColor": "&HFF185C37",
                    "FontBold": "True",
                    "FontTypeface": "Cairo-Bold.ttf",
                    "FontSize": "14",
                    "Shape": "1",
                    "Text": "الدوال المنطقية (3)",
                    "TextColor": "&HFFFFFFFF",
                    "Uuid": "268344722"
                  }
                ]
              },
              {
                "$Name": "Card_Lookup",
                "$Type": "VerticalArrangement",
                "$Version": "4",
                "AlignHorizontal": "3",
                "BackgroundColor": "&HFFFFFFFF",
                "Column": "0",
                "Row": "1",
                "Height": "140",
                "Width": "-1048",
                "Uuid": "1474004754",
                "$Components": [
                  {
                    "$Name": "Image_Lookup",
                    "$Type": "Image",
                    "$Version": "7",
                    "Height": "64",
                    "Width": "64",
                    "Picture": "category_lookup.png",
                    "Uuid": "-29662381"
                  },
                  {
                    "$Name": "Btn_Lookup",
                    "$Type": "Button",
                    "$Version": "7",
                    "BackgroundColor": "&HFF2878C8",
                    "FontBold": "True",
                    "FontTypeface": "Cairo-Bold.ttf",
                    "FontSize": "14",
                    "Shape": "1",
                    "Text": "الدوال البحثية (2)",
                    "TextColor": "&HFFFFFFFF",
                    "Uuid": "-1026506568"
                  }
                ]
              },
              {
                "$Name": "Card_Text",
                "$Type": "VerticalArrangement",
                "$Version": "4",
                "AlignHorizontal": "3",
                "BackgroundColor": "&HFFFFFFFF",
                "Column": "1",
                "Row": "1",
                "Height": "140",
                "Width": "-1048",
                "Uuid": "-991758335",
                "$Components": [
                  {
                    "$Name": "Image_Text",
                    "$Type": "Image",
                    "$Version": "7",
                    "Height": "64",
                    "Width": "64",
                    "Picture": "category_text.png",
                    "Uuid": "1475336299"
                  },
                  {
                    "$Name": "Btn_Text",
                    "$Type": "Button",
                    "$Version": "7",
                    "BackgroundColor": "&HFF33A852",
                    "FontBold": "True",
                    "FontTypeface": "Cairo-Bold.ttf",
                    "FontSize": "14",
                    "Shape": "1",
                    "Text": "الدوال النصية (3)",
                    "TextColor": "&HFFFFFFFF",
                    "Uuid": "-2136081629"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
}

sanitize_component_tree(start_screen_scm["Properties"])
with open(os.path.join(SRC_DIR, "Start_Screen.scm"), "w", encoding="utf-8") as f:
    f.write("#|\n$JSON\n" + json.dumps(start_screen_scm, ensure_ascii=False) + "\n|#\n")

# Start_Screen.bky
with open("original_extracted/src/appinventor/ai_yossef0srk/Excel_Project_V2/Start_Screen.bky", "r", encoding="utf-8") as f:
    start_bky = f.read()

# Normalize ya-version
start_bky = re.sub(r'ya-version="[^"]*"', 'ya-version="217"', start_bky)
with open(os.path.join(SRC_DIR, "Start_Screen.bky"), "w", encoding="utf-8") as f:
    f.write(start_bky)

# SCREEN 3: Logic_Screen
logic_screen_scm = {
  "authURL": ["ai2a.appinventor.mit.edu"],
  "YaVersion": "217",
  "Source": "Form",
  "Properties": {
    "$Name": "Logic_Screen",
    "$Type": "Form",
    "$Version": "30",
    "ActionBar": "True",
    "AppName": "Excel Learning Hub",
    "BackgroundColor": "&HFFF5F8F6",
    "PrimaryColor": "&HFF217346",
    "PrimaryColorDark": "&HFF185C37",
    "Title": "قائمة الدوال",
    "TitleVisible": "False",
    "Uuid": "0",
    "$Components": [
      {
        "$Name": "VerticalScrollArrangement1",
        "$Type": "VerticalScrollArrangement",
        "$Version": "2",
        "BackgroundColor": "&H00FFFFFF",
        "Width": "-2",
        "Uuid": "1325478940",
        "$Components": [
          {
            "$Name": "CategoryHeaderCard",
            "$Type": "HorizontalArrangement",
            "$Version": "4",
            "AlignVertical": "2",
            "BackgroundColor": "&HFFFFFFFF",
            "Width": "-2",
            "Uuid": "3001",
            "$Components": [
              {
                "$Name": "Img_CategoryIcon",
                "$Type": "Image",
                "$Version": "7",
                "Height": "48",
                "Width": "48",
                "Picture": "category_math.png",
                "Uuid": "3002"
              },
              {
                "$Name": "CategoryTitleGroup",
                "$Type": "VerticalArrangement",
                "$Version": "4",
                "Width": "-2",
                "Uuid": "3003",
                "$Components": [
                  {
                    "$Name": "Lbl_CategoryTitle2",
                    "$Type": "Label",
                    "$Version": "6",
                    "FontBold": "True",
                    "FontSize": "22",
                    "FontTypeface": "Cairo-Bold.ttf",
                    "Width": "-2",
                    "Text": "الدوال المختارة",
                    "TextColor": "&HFF185C37",
                    "TextAlignment": "1",
                    "Uuid": "308328472"
                  },
                  {
                    "$Name": "Lbl_CategorySub",
                    "$Type": "Label",
                    "$Version": "6",
                    "FontSize": "13",
                    "FontTypeface": "Cairo-Bold.ttf",
                    "Text": "انقر على الدالة لعرض شرحها وأمثلتها",
                    "TextColor": "&HFF68756D",
                    "TextAlignment": "1",
                    "Uuid": "3004"
                  }
                ]
              }
            ]
          },
          {
            "$Name": "List",
            "$Type": "ListView",
            "$Version": "6",
            "BackgroundColor": "&HFFFFFFFF",
            "DividerColor": "&HFFE1E9E3",
            "SelectionColor": "&HFFE8F3EC",
            "TextColor": "&HFF1F2933",
            "Width": "-2",
            "Height": "380",
            "Uuid": "313656610"
          },
          {
            "$Name": "VerticalArrangementBottom",
            "$Type": "VerticalArrangement",
            "$Version": "4",
            "AlignHorizontal": "3",
            "AlignVertical": "2",
            "Width": "-2",
            "Uuid": "-889183577",
            "$Components": [
              {
                "$Name": "Button_Back",
                "$Type": "Button",
                "$Version": "7",
                "BackgroundColor": "&HFF217346",
                "FontBold": "True",
                "FontSize": "16",
                "FontTypeface": "Cairo-Bold.ttf",
                "Height": "48",
                "Shape": "1",
                "Text": "العودة للقائمة الرئيسية",
                "TextColor": "&HFFFFFFFF",
                "TextAlignment": "1",
                "Width": "-2",
                "Uuid": "1959212121"
              }
            ]
          }
        ]
      }
    ]
  }
}

sanitize_component_tree(logic_screen_scm["Properties"])
with open(os.path.join(SRC_DIR, "Logic_Screen.scm"), "w", encoding="utf-8") as f:
    f.write("#|\n$JSON\n" + json.dumps(logic_screen_scm, ensure_ascii=False) + "\n|#\n")

# Logic_Screen.bky
with open("original_extracted/src/appinventor/ai_yossef0srk/Excel_Project_V2/Logic_Screen.bky", "r", encoding="utf-8") as f:
    logic_bky_updated = f.read()

math_orig = """<block type="global_declaration" id="Z|pwi6_eid#:d[Zy22qe" x="-396" y="-484"><field name="NAME">MathList</field><value name="VALUE"><block type="lists_create_with" id="R+bGJ=z?^a1_13`:KGLq"><mutation xmlns="http://www.w3.org/1999/xhtml" items="3"></mutation><value name="ADD0"><block type="text" id=";},b`UaXCr{8FgWOGUeh"><field name="TEXT">SUM</field></block></value><value name="ADD1"><block type="text" id="%r-eJ#Ag[ek5UdN%y2Fz"><field name="TEXT">COUNT</field></block></value><value name="ADD2"><block type="text" id="93xqsTj)rjP,i2~:.5FX"><field name="TEXT">AVERAGE</field></block></value></block></value></block>"""
math_new = """<block type="global_declaration" id="Z|pwi6_eid#:d[Zy22qe" x="-396" y="-484"><field name="NAME">MathList</field><value name="VALUE"><block type="lists_create_with" id="R+bGJ=z?^a1_13`:KGLq"><mutation xmlns="http://www.w3.org/1999/xhtml" items="4"></mutation><value name="ADD0"><block type="text" id=";},b`UaXCr{8FgWOGUeh"><field name="TEXT">SUM</field></block></value><value name="ADD1"><block type="text" id="%r-eJ#Ag[ek5UdN%y2Fz"><field name="TEXT">COUNT</field></block></value><value name="ADD2"><block type="text" id="93xqsTj)rjP,i2~:.5FX"><field name="TEXT">AVERAGE</field></block></value><value name="ADD3"><block type="text" id="V{+au7@-LwpUHGH%W[0D"><field name="TEXT">MAX</field></block></value></block></value></block>"""

lookup_orig = """<block type="global_declaration" id="NJ?11a?,!YWt$a9_SQk!" x="87" y="-473"><field name="NAME">LookupList</field><value name="VALUE"><block type="lists_create_with" id="c8?p3mzOQv^Z9-Z_L/Xh"><mutation xmlns="http://www.w3.org/1999/xhtml" items="3"></mutation><value name="ADD0"><block type="text" id="=W`v(F_]:TZ,?d*s_@oi"><field name="TEXT">MATCH</field></block></value><value name="ADD1"><block type="text" id="YucoL@o7c-M,D%{T6dS#"><field name="TEXT">VLOOKUP</field></block></value><value name="ADD2"><block type="text" id="V{+au7@-LwpUHGH%W[0D"><field name="TEXT">MAX</field></block></value></block></value></block>"""
lookup_new = """<block type="global_declaration" id="NJ?11a?,!YWt$a9_SQk!" x="87" y="-473"><field name="NAME">LookupList</field><value name="VALUE"><block type="lists_create_with" id="c8?p3mzOQv^Z9-Z_L/Xh"><mutation xmlns="http://www.w3.org/1999/xhtml" items="2"></mutation><value name="ADD0"><block type="text" id="=W`v(F_]:TZ,?d*s_@oi"><field name="TEXT">MATCH</field></block></value><value name="ADD1"><block type="text" id="YucoL@o7c-M,D%{T6dS#"><field name="TEXT">VLOOKUP</field></block></value></block></value></block>"""

if math_orig in logic_bky_updated and lookup_orig in logic_bky_updated:
    logic_bky_updated = logic_bky_updated.replace(math_orig, math_new).replace(lookup_orig, lookup_new)
    print("Successfully corrected MAX to MathList in Logic_Screen.bky!")

logic_bky_updated = re.sub(r'ya-version="[^"]*"', 'ya-version="217"', logic_bky_updated)
with open(os.path.join(SRC_DIR, "Logic_Screen.bky"), "w", encoding="utf-8") as f:
    f.write(logic_bky_updated)

# SCREEN 4: Detail_Screen.scm
with open("original_extracted/src/appinventor/ai_yossef0srk/Excel_Project_V2/Detail_Screen.scm", "r", encoding="utf-8") as f:
    orig_detail_scm_raw = f.read()

match = re.search(r"\$JSON\s*(\{.*\})\s*\|\#", orig_detail_scm_raw, re.DOTALL)
if match:
    detail_data = json.loads(match.group(1))
    detail_data["YaVersion"] = "217"
    # Update styling to match palette
    props = detail_data.get("Properties", {})
    props["$Version"] = "30"
    props["BackgroundColor"] = "&HFFF5F8F6"
    props["PrimaryColor"] = "&HFF217346"
    props["PrimaryColorDark"] = "&HFF185C37"
    props["AppName"] = "Excel Learning Hub"
    # Recursively sanitize all child components
    sanitize_component_tree(props)
    with open(os.path.join(SRC_DIR, "Detail_Screen.scm"), "w", encoding="utf-8") as f:
        f.write("#|\n$JSON\n" + json.dumps(detail_data, ensure_ascii=False) + "\n|#\n")
    print("Successfully normalized Detail_Screen.scm component versions!")
else:
    print("Error parsing Detail_Screen.scm JSON")

# SCREEN 4: Detail_Screen.bky
# Update Button_Back so that MAX returns to MATH instead of LOOKUP
with open("original_extracted/src/appinventor/ai_yossef0srk/Excel_Project_V2/Detail_Screen.bky", "r", encoding="utf-8") as f:
    detail_bky = f.read()

# Update IF0 (Math return) to include MAX:
# Replace original IF0 compare with SUM, COUNT, AVERAGE to include MAX as 4th item
# And update IF2 (Lookup return) to have items="2" (MATCH, VLOOKUP)
detail_bky = re.sub(r'ya-version="[^"]*"', 'ya-version="217"', detail_bky)

# Let's inspect IF2 where MAX was checked
# Original IF2 checked MATCH, VLOOKUP, MAX
# We can adjust it so returning from MAX returns to MATH
lookup_check_old = """<value name="IF2"><block type="logic_operation" id="U{H-69;IBDpH,J=Q/$Nn"><mutation xmlns="http://www.w3.org/1999/xhtml" items="3"></mutation><field name="OP">OR</field><value name="A"><block type="logic_compare" id="{QcsD7~U0ei+@{^7;R|_"><field name="OP">EQ</field><value name="A"><block type="controls_getStartValue" id="k#UPnK6cl91;@pQr~oYU"></block></value><value name="B"><block type="text" id=":i1l^V1nK^4OaOtaHWvJ"><field name="TEXT">MATCH</field></block></value></block></value><value name="B"><block type="logic_compare" id="IS^6T6CuV4fm+8j*V:~k"><field name="OP">EQ</field><value name="A"><block type="controls_getStartValue" id="^8-CTZv{XC)i`7rC5N81"></block></value><value name="B"><block type="text" id="9L(Ib$ZK2XT;p6EMSdPh"><field name="TEXT">VLOOKUP</field></block></value></block></value><value name="BOOL2"><block type="logic_compare" id="+JdjT[IwMO*YZp@4aX%e"><field name="OP">EQ</field><value name="A"><block type="controls_getStartValue" id="+IJ,/OhpN,~Qp.i,9Ukx"></block></value><value name="B"><block type="text" id="mC?wAq3D.wxLO$yg,$TI"><field name="TEXT">MAX</field></block></value></block></value></block></value>"""

lookup_check_new = """<value name="IF2"><block type="logic_operation" id="U{H-69;IBDpH,J=Q/$Nn"><mutation xmlns="http://www.w3.org/1999/xhtml" items="2"></mutation><field name="OP">OR</field><value name="A"><block type="logic_compare" id="{QcsD7~U0ei+@{^7;R|_"><field name="OP">EQ</field><value name="A"><block type="controls_getStartValue" id="k#UPnK6cl91;@pQr~oYU"></block></value><value name="B"><block type="text" id=":i1l^V1nK^4OaOtaHWvJ"><field name="TEXT">MATCH</field></block></value></block></value><value name="B"><block type="logic_compare" id="IS^6T6CuV4fm+8j*V:~k"><field name="OP">EQ</field><value name="A"><block type="controls_getStartValue" id="^8-CTZv{XC)i`7rC5N81"></block></value><value name="B"><block type="text" id="9L(Ib$ZK2XT;p6EMSdPh"><field name="TEXT">VLOOKUP</field></block></value></block></value></block></value>"""

math_check_old = """<value name="IF0"><block type="logic_operation" id="?!%|N6DNih2J8+}Zcyn("><mutation xmlns="http://www.w3.org/1999/xhtml" items="3"></mutation><field name="OP">OR</field><value name="A"><block type="logic_compare" id="moRPh51Z0vKW~B;#=+/D"><field name="OP">EQ</field><value name="A"><block type="controls_getStartValue" id="_7Fo2Q8!N%5YZbS+Ue]I"></block></value><value name="B"><block type="text" id="=d([g=N9$Mg(^iwymq`0"><field name="TEXT">SUM</field></block></value></block></value><value name="B"><block type="logic_compare" id="t44~GAc5mnIR`4R7de$g"><field name="OP">EQ</field><value name="A"><block type="controls_getStartValue" id="3$,;)38yM[CNg-HInYV5"></block></value><value name="B"><block type="text" id="|nj#6ww-!4!AiFx$DZkd"><field name="TEXT">COUNT</field></block></value></block></value><value name="BOOL2"><block type="logic_compare" id="Or)]zghJJ}l(g)xyoB$d"><field name="OP">EQ</field><value name="A"><block type="controls_getStartValue" id="6eXXn5:*#D;NGd0vbiXA"></block></value><value name="B"><block type="text" id="@v|C4E,04iJ[Q?Sx]vtE"><field name="TEXT">AVERAGE</field></block></value></block></value></block></value>"""

math_check_new = """<value name="IF0"><block type="logic_operation" id="?!%|N6DNih2J8+}Zcyn("><mutation xmlns="http://www.w3.org/1999/xhtml" items="4"></mutation><field name="OP">OR</field><value name="A"><block type="logic_compare" id="moRPh51Z0vKW~B;#=+/D"><field name="OP">EQ</field><value name="A"><block type="controls_getStartValue" id="_7Fo2Q8!N%5YZbS+Ue]I"></block></value><value name="B"><block type="text" id="=d([g=N9$Mg(^iwymq`0"><field name="TEXT">SUM</field></block></value></block></value><value name="B"><block type="logic_compare" id="t44~GAc5mnIR`4R7de$g"><field name="OP">EQ</field><value name="A"><block type="controls_getStartValue" id="3$,;)38yM[CNg-HInYV5"></block></value><value name="B"><block type="text" id="|nj#6ww-!4!AiFx$DZkd"><field name="TEXT">COUNT</field></block></value></block></value><value name="BOOL2"><block type="logic_compare" id="Or)]zghJJ}l(g)xyoB$d"><field name="OP">EQ</field><value name="A"><block type="controls_getStartValue" id="6eXXn5:*#D;NGd0vbiXA"></block></value><value name="B"><block type="text" id="@v|C4E,04iJ[Q?Sx]vtE"><field name="TEXT">AVERAGE</field></block></value></block></value><value name="BOOL3"><block type="logic_compare" id="+JdjT[IwMO*YZp@4aX%e"><field name="OP">EQ</field><value name="A"><block type="controls_getStartValue" id="+IJ,/OhpN,~Qp.i,9Ukx"></block></value><value name="B"><block type="text" id="mC?wAq3D.wxLO$yg,$TI"><field name="TEXT">MAX</field></block></value></block></value></block></value>"""

if lookup_check_old in detail_bky and math_check_old in detail_bky:
    detail_bky = detail_bky.replace(lookup_check_old, lookup_check_new).replace(math_check_old, math_check_new)
    print("Successfully updated Detail_Screen.bky return navigation for MAX -> MATH!")
else:
    print("Note: lookup_check_old exact string pattern differed slightly")

with open(os.path.join(SRC_DIR, "Detail_Screen.bky"), "w", encoding="utf-8") as f:
    f.write(detail_bky)

# 4. Pack into Excel_Learning_Hub.aia (ZIP archive)
aia_dest = "public/Excel_Learning_Hub.aia"
with zipfile.ZipFile(aia_dest, "w", zipfile.ZIP_DEFLATED) as zip_f:
    for root, dirs, files in os.walk(BASE_DIR):
        for file in files:
            full_path = os.path.join(root, file)
            rel_path = os.path.relpath(full_path, BASE_DIR)
            zip_f.write(full_path, rel_path)

shutil.copy2(aia_dest, "Excel_Learning_Hub.aia")
print(f"Created {aia_dest} ({os.path.getsize(aia_dest)} bytes)")

# 5. Pack source zip Excel_Learning_Hub_Source.zip
src_zip_dest = "public/Excel_Learning_Hub_Source.zip"
with zipfile.ZipFile(src_zip_dest, "w", zipfile.ZIP_DEFLATED) as zip_f:
    for root, dirs, files in os.walk(BASE_DIR):
        for file in files:
            full_path = os.path.join(root, file)
            rel_path = os.path.relpath(full_path, BASE_DIR)
            zip_f.write(full_path, os.path.join("Excel_Learning_Hub", rel_path))

shutil.copy2(src_zip_dest, "Excel_Learning_Hub_Source.zip")
print(f"Created {src_zip_dest} ({os.path.getsize(src_zip_dest)} bytes)")

print("AIA and Source archives built successfully and normalized for Kodular Creator!")
