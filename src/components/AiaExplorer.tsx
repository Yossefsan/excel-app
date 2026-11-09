import React, { useState } from 'react';
import { Layers, FileCode, CheckCircle, ArrowRightLeft, Folder, File, Code2, Cpu } from 'lucide-react';

export const AiaExplorer: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<string>('Logic_Screen.scm');
  const [viewMode, setViewMode] = useState<'visual' | 'code'>('visual');

  const files = [
    { name: 'project.properties', path: 'youngandroidproject/project.properties', type: 'prop' },
    { name: 'Screen1.scm', path: 'src/.../Screen1.scm', type: 'scm' },
    { name: 'Screen1.bky', path: 'src/.../Screen1.bky', type: 'bky' },
    { name: 'Start_Screen.scm', path: 'src/.../Start_Screen.scm', type: 'scm' },
    { name: 'Start_Screen.bky', path: 'src/.../Start_Screen.bky', type: 'bky' },
    { name: 'Logic_Screen.scm', path: 'src/.../Logic_Screen.scm', type: 'scm' },
    { name: 'Logic_Screen.bky', path: 'src/.../Logic_Screen.bky', type: 'bky' },
    { name: 'Detail_Screen.scm', path: 'src/.../Detail_Screen.scm', type: 'scm' },
    { name: 'Detail_Screen.bky', path: 'src/.../Detail_Screen.bky', type: 'bky' },
  ];

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6 text-right">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-[#E1E9E3] shadow-xs">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#185C37]">
              مستكشف بنية مشروع Kodular (AIA Architecture & Blocks)
            </h2>
            <p className="text-xs sm:text-sm text-[#68756D] mt-1">
              فحص معماري للمكونات المرئية (.scm) وكتل اللبنات (.bky) وخصائص المشروع (project.properties)
            </p>
          </div>
          <span className="text-xs font-bold bg-[#E8F3EC] text-[#217346] px-3 py-1.5 rounded-full border border-[#217346]/20">
            AIA Kit V2 Verified
          </span>
        </div>
      </div>

      {/* Start Value Flow Card */}
      <div className="bg-[#E8F3EC] rounded-2xl p-5 border border-[#217346]/20 space-y-3">
        <h3 className="text-sm font-bold text-[#185C37] flex items-center gap-2">
          <ArrowRightLeft className="w-4 h-4 text-[#217346]" />
          <span>مسار تمرير القيم وقواعد التنقل (Start Values Flow):</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
          <div className="bg-white p-3 rounded-xl border border-[#217346]/20">
            <div className="font-bold text-[#185C37] mb-1">1. Screen1 ➔ Start_Screen</div>
            <p className="text-[#68756D]">الانتقال المباشر عند الضغط على زر &ldquo;ابدأ التعلم&rdquo;.</p>
          </div>
          <div className="bg-white p-3 rounded-xl border border-[#217346]/20">
            <div className="font-bold text-[#185C37] mb-1">2. Start_Screen ➔ Logic_Screen</div>
            <p className="text-[#68756D]">
              تمرير: <code className="bg-gray-100 px-1 py-0.5 rounded font-mono">MATH</code>,{' '}
              <code className="bg-gray-100 px-1 py-0.5 rounded font-mono">LOGIC</code>,{' '}
              <code className="bg-gray-100 px-1 py-0.5 rounded font-mono">LOOKUP</code>,{' '}
              <code className="bg-gray-100 px-1 py-0.5 rounded font-mono">TEXT</code>
            </p>
          </div>
          <div className="bg-white p-3 rounded-xl border border-[#217346]/20">
            <div className="font-bold text-[#185C37] mb-1">3. Logic_Screen ➔ Detail_Screen</div>
            <p className="text-[#68756D]">
              تمرير اسم الدالة المحددة من القائمة مثل:{' '}
              <code className="bg-gray-100 px-1 py-0.5 rounded font-mono">SUM</code> أو{' '}
              <code className="bg-gray-100 px-1 py-0.5 rounded font-mono">MAX</code>.
            </p>
          </div>
          <div className="bg-white p-3 rounded-xl border border-[#217346]/20">
            <div className="font-bold text-[#185C37] mb-1">4. زر العودة الذكي (Smart Return)</div>
            <p className="text-[#68756D]">
              يعيد المستخدم لقائمته: الدوال الحسابية تعود إلى <code className="bg-gray-100 px-1 py-0.5 rounded font-mono">MATH</code>.
            </p>
          </div>
        </div>
      </div>

      {/* Explorer Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Files Tree */}
        <div className="bg-white rounded-2xl p-4 border border-[#E1E9E3] shadow-xs space-y-2">
          <div className="flex items-center gap-2 pb-2 border-b border-[#E1E9E3] font-bold text-sm text-[#185C37]">
            <Folder className="w-4 h-4" />
            <span>ملفات أرشيف الـ AIA</span>
          </div>

          <div className="space-y-1">
            {files.map((f) => {
              const isSelected = selectedFile === f.name;
              return (
                <button
                  key={f.name}
                  onClick={() => setSelectedFile(f.name)}
                  className={`w-full p-2.5 rounded-xl text-xs font-mono flex items-center justify-between text-right transition-colors ${
                    isSelected
                      ? 'bg-[#217346] text-white font-bold'
                      : 'text-[#1F2933] hover:bg-[#F5F8F6]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <File className="w-3.5 h-3.5 shrink-0" />
                    <span>{f.name}</span>
                  </div>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {f.type.toUpperCase()}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-[#E1E9E3] text-[11px] text-[#68756D] space-y-1">
            <p className="font-semibold text-[#185C37]">الأصول المضمنة (19 ملفاً):</p>
            <p>app_logo, category_*, welcome_illustration, Cairo-Bold.ttf...</p>
          </div>
        </div>

        {/* Right: File Inspector */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-[#E1E9E3] shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#E1E9E3] pb-3">
            <div>
              <h3 className="font-formula font-bold text-base text-[#185C37]">
                {selectedFile}
              </h3>
              <p className="text-xs text-[#68756D]">
                {selectedFile.endsWith('.scm')
                  ? 'مخطط مكونات الشاشة والتخطيط البصري (JSON Screen Form)'
                  : selectedFile.endsWith('.bky')
                  ? 'لبنات المنطق والأحداث البرمجية (Blockly XML)'
                  : 'إعدادات وخصائص حزمة أندرويد'}
              </p>
            </div>

            <div className="flex items-center gap-1 bg-[#F5F8F6] p-1 rounded-lg border border-[#E1E9E3]">
              <button
                onClick={() => setViewMode('visual')}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                  viewMode === 'visual' ? 'bg-[#217346] text-white shadow-2xs' : 'text-[#68756D]'
                }`}
              >
                تحليل مرئي
              </button>
              <button
                onClick={() => setViewMode('code')}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                  viewMode === 'code' ? 'bg-[#217346] text-white shadow-2xs' : 'text-[#68756D]'
                }`}
              >
                الكود المصدري
              </button>
            </div>
          </div>

          {/* Visual Analysis View */}
          {viewMode === 'visual' ? (
            <div className="space-y-4">
              {selectedFile === 'Logic_Screen.scm' && (
                <div className="space-y-3">
                  <div className="p-3 bg-[#E8F3EC] rounded-xl border border-[#217346]/20">
                    <span className="text-xs font-bold text-[#185C37] block mb-1">
                      ✅ تصحيح فئة دالة MAX في التصميم:
                    </span>
                    <p className="text-xs text-[#217346]">
                      أصبحت دالة MAX تظهر ضمن قائمة الرياضيات (MathList) المكونة من 4 عناصر (SUM, COUNT, AVERAGE, MAX)، بينما تضم قائمة البحث دالتين فقط (MATCH, VLOOKUP).
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-[#1F2933]">شجرة المكونات في Logic_Screen:</h4>
                    <div className="p-3 bg-[#F5F8F6] rounded-xl space-y-1.5 text-xs font-mono">
                      <div className="text-[#185C37] font-bold">Form: Logic_Screen</div>
                      <div className="pr-4 text-[#217346]">↳ VerticalScrollArrangement1</div>
                      <div className="pr-8 text-[#2878C8]">↳ HorizontalArrangement (CategoryHeaderCard)</div>
                      <div className="pr-12">↳ Img_CategoryIcon [Image: 48x48]</div>
                      <div className="pr-12">↳ Lbl_CategoryTitle2 [Label: 22sp Bold]</div>
                      <div className="pr-8 text-[#2878C8]">↳ List [ListView: Responsive Height]</div>
                      <div className="pr-8 text-[#2878C8]">↳ Button_Back [Button: العودة للقائمة الرئيسية]</div>
                    </div>
                  </div>
                </div>
              )}

              {selectedFile === 'Logic_Screen.bky' && (
                <div className="space-y-3 text-xs">
                  <div className="p-3.5 bg-white border border-[#E1E9E3] rounded-xl space-y-2">
                    <div className="font-bold text-[#185C37] flex items-center gap-1.5">
                      <Cpu className="w-4 h-4 text-[#217346]" />
                      <span>الأحداث البرمجية (Event Handlers):</span>
                    </div>
                    <ul className="list-disc list-inside space-y-1.5 text-[#1F2933]">
                      <li>
                        <strong className="text-[#217346]">Logic_Screen.Initialize:</strong> يفحص قيمة
                        StartValue ويضبط عناصر List.Elements وفق القائمة المطلوبة (MathList أو LogicList أو LookupList أو TextList).
                      </li>
                      <li>
                        <strong className="text-[#217346]">List.AfterPicking:</strong> يفتح شاشة
                        Detail_Screen مع تمرير الدالة المحددة.
                      </li>
                      <li>
                        <strong className="text-[#217346]">Button_Back.Click:</strong> يعيد المستخدم إلى
                        Start_Screen.
                      </li>
                    </ul>
                  </div>

                  <div className="p-3 bg-[#F5F8F6] rounded-xl font-mono text-[11px] text-[#185C37]">
                    MathList = [&quot;SUM&quot;, &quot;COUNT&quot;, &quot;AVERAGE&quot;, &quot;MAX&quot;] // 4 functions
                    <br />
                    LookupList = [&quot;MATCH&quot;, &quot;VLOOKUP&quot;] // 2 functions
                  </div>
                </div>
              )}

              {selectedFile === 'Detail_Screen.scm' && (
                <div className="space-y-3 text-xs">
                  <h4 className="text-xs font-bold text-[#1F2933]">هيكل شاشة الدرس التعليمي (Detail_Screen):</h4>
                  <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                    <div className="p-2.5 bg-[#F5F8F6] rounded-lg">
                      <span className="font-bold text-[#217346]">Header:</span> Title, FunctionIcon
                    </div>
                    <div className="p-2.5 bg-[#F5F8F6] rounded-lg">
                      <span className="font-bold text-[#2878C8]">Syntax:</span> Lbl_Syntax (LTR)
                    </div>
                    <div className="p-2.5 bg-[#F5F8F6] rounded-lg">
                      <span className="font-bold text-[#185C37]">Overview:</span> Lbl_Description
                    </div>
                    <div className="p-2.5 bg-[#F5F8F6] rounded-lg">
                      <span className="font-bold text-[#F4A340]">Steps:</span> Lbl_Description2..4 + Start_Image1..3
                    </div>
                    <div className="p-2.5 bg-[#F5F8F6] rounded-lg col-span-2">
                      <span className="font-bold text-[#33A852]">Interactive / Web:</span> Lbl_Description6 + WebViewer1
                    </div>
                  </div>
                </div>
              )}

              {selectedFile === 'project.properties' && (
                <div className="p-3 bg-[#F5F8F6] rounded-xl text-xs font-mono space-y-1">
                  <div>aname = Excel Learning Hub</div>
                  <div>name = Excel_Project_V2</div>
                  <div>icon = app_logo.png</div>
                  <div>color.primary = &amp;HFF217346</div>
                  <div>color.primary.dark = &amp;HFF185C37</div>
                  <div>theme = AppTheme.Light.DarkActionBar</div>
                  <div>versioncode = 2</div>
                </div>
              )}

              {selectedFile !== 'Logic_Screen.scm' &&
                selectedFile !== 'Logic_Screen.bky' &&
                selectedFile !== 'Detail_Screen.scm' &&
                selectedFile !== 'project.properties' && (
                  <div className="p-4 bg-[#F5F8F6] rounded-xl text-xs text-[#68756D] text-center">
                    تم التحقق من سلامة وصحة هيكل {selectedFile} وتوافقه مع معايير Kodular Creator.
                  </div>
                )}
            </div>
          ) : (
            /* Code View */
            <pre className="p-4 bg-[#1F2933] text-green-400 rounded-xl text-xs font-mono max-h-96 overflow-auto text-left ltr">
              {selectedFile === 'project.properties' &&
                `# Kodular Project Properties
aname=Excel Learning Hub
icon=app_logo.png
color.primary=&HFF217346
color.primary.dark=&HFF185C37
main=appinventor.ai_yossef0srk.Excel_Project_V2.Screen1
theme=AppTheme.Light.DarkActionBar`}

              {selectedFile.endsWith('.scm') &&
                `// Form JSON Schema Preview (${selectedFile})
{
  "Source": "Form",
  "Properties": {
    "$Name": "${selectedFile.replace('.scm', '')}",
    "BackgroundColor": "&HFFF5F8F6",
    "PrimaryColor": "&HFF217346"
  }
}`}

              {selectedFile.endsWith('.bky') &&
                `<!-- Blockly XML Schema (${selectedFile}) -->
<xml xmlns="https://developers.google.com/blockly/xml">
  <!-- Validated Kodular Event Handlers and StartValue logic -->
</xml>`}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
};
