import React, { useState } from 'react';
import { Download, Check, Copy, Palette, Type } from 'lucide-react';

export const AssetGallery: React.FC = () => {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const colors = [
    { name: 'Excel Dark Green', hex: '#185C37', usage: 'Main brand color & dark accents', textColor: '#FFFFFF' },
    { name: 'Excel Green', hex: '#217346', usage: 'Primary buttons & active highlights', textColor: '#FFFFFF' },
    { name: 'Fresh Green', hex: '#33A852', usage: 'Secondary highlights & success states', textColor: '#FFFFFF' },
    { name: 'Light Green', hex: '#E8F3EC', usage: 'Soft backgrounds & category cards', textColor: '#185C37' },
    { name: 'Pure White', hex: '#FFFFFF', usage: 'Main card backgrounds', textColor: '#1F2933', hasBorder: true },
    { name: 'Soft Gray/Green', hex: '#F5F8F6', usage: 'App-wide soft canvas background', textColor: '#1F2933', hasBorder: true },
    { name: 'Dark Text', hex: '#1F2933', usage: 'High contrast readable Arabic text', textColor: '#FFFFFF' },
    { name: 'Secondary Text', hex: '#68756D', usage: 'Descriptions & subtitles', textColor: '#FFFFFF' },
    { name: 'Border Color', hex: '#E1E9E3', usage: 'Dividers & card borders', textColor: '#1F2933', hasBorder: true },
    { name: 'Formula Blue', hex: '#2878C8', usage: 'Formula bar & syntax highlights', textColor: '#FFFFFF' },
    { name: 'Soft Orange', hex: '#F4A340', usage: 'Tips, warnings & quiz accents', textColor: '#FFFFFF' },
  ];

  const assets = [
    { name: 'app_logo.png', title: 'شعار التطبيق الرئيسي', dims: '512x512', category: 'Logo' },
    { name: 'welcome_illustration.png', title: 'رسم شاشة الترحيب', dims: '600x450', category: 'Illustration' },
    { name: 'category_math.png', title: 'أيقونة الدوال الحسابية', dims: '256x256', category: 'Category' },
    { name: 'category_logic.png', title: 'أيقونة الدوال المنطقية', dims: '256x256', category: 'Category' },
    { name: 'category_lookup.png', title: 'أيقونة الدوال البحثية', dims: '256x256', category: 'Category' },
    { name: 'category_text.png', title: 'أيقونة الدوال النصية', dims: '256x256', category: 'Category' },
    { name: 'icon_search.png', title: 'أيقونة البحث', dims: '128x128', category: 'Icon' },
    { name: 'icon_favorite.png', title: 'أيقونة المفضلة', dims: '128x128', category: 'Icon' },
    { name: 'icon_formula.png', title: 'أيقونة الصيغة fx', dims: '128x128', category: 'Icon' },
    { name: 'empty_search.png', title: 'رسم حالة البحث الفارغ', dims: '400x300', category: 'State' },
    { name: 'practice_illustration.png', title: 'رسم قسم التطبيق العملي', dims: '400x300', category: 'Illustration' },
    { name: 'quiz_illustration.png', title: 'رسم قسم الاختبارات', dims: '400x300', category: 'Illustration' },
  ];

  const copyHex = (hex: string) => {
    navigator.clipboard?.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1500);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-8 text-right">
      {/* Intro */}
      <div className="bg-white rounded-3xl p-6 border border-[#E1E9E3] shadow-xs">
        <h2 className="text-xl sm:text-2xl font-bold text-[#185C37]">
          نظام الهوية البصرية والأصول الرسومية (Excel Design System)
        </h2>
        <p className="text-xs sm:text-sm text-[#68756D] mt-1">
          تم تصميم كافة الأيقونات والرسومات التوضيحية بهوية عصرية مستوحاة مباشرة من Microsoft Excel ومنصات الإنتاجية الحديثة، بعيداً عن الطابع الطفولي أو الرسوم العشوائية.
        </p>
      </div>

      {/* Color Palette Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-[#185C37] font-bold text-base">
          <Palette className="w-5 h-5 text-[#217346]" />
          <h3>لوحة الألوان المعتمدة (Design Palette):</h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {colors.map((c) => (
            <div
              key={c.hex}
              onClick={() => copyHex(c.hex)}
              className={`bg-white rounded-2xl p-3 border shadow-2xs hover:shadow-md cursor-pointer transition-all flex flex-col justify-between ${
                c.hasBorder ? 'border-[#E1E9E3]' : 'border-transparent'
              }`}
            >
              <div
                dir="ltr"
                className="w-full h-16 rounded-xl mb-3 flex items-center justify-center font-mono font-bold text-xs shadow-inner"
                style={{ backgroundColor: c.hex, color: c.textColor }}
              >
                {c.hex}
              </div>
              <div className="text-right">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-xs text-[#1F2933]">{c.name}</h4>
                  <button className="text-[10px] text-[#68756D] hover:text-[#217346]">
                    {copiedHex === c.hex ? (
                      <Check className="w-3 h-3 text-[#33A852]" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </button>
                </div>
                <p className="text-[11px] text-[#68756D] mt-1">{c.usage}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Typography Section */}
      <div className="bg-white rounded-2xl p-6 border border-[#E1E9E3] shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-[#185C37] font-bold text-base">
          <Type className="w-5 h-5 text-[#217346]" />
          <h3>النظام الطباعي والخطوط (Typography Hierarchy):</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-[#F5F8F6] rounded-xl border border-[#E1E9E3] space-y-2">
            <span className="font-bold text-[#185C37] block text-sm">
              خط القاهرة (Cairo-Bold.ttf):
            </span>
            <p className="text-[#1F2933] leading-relaxed">
              هو الخط المعتمد لكافة واجهات التطبيق، العناوين، الأزرار، والفقرات التوضيحية العربية لما يوفره من وضوح وقراءة مريحة على جميع شاشات هواتف أندرويد.
            </p>
            <div className="pt-2 text-[#217346] font-bold space-y-1">
              <div>عناوين الشاشات: 24–28sp Bold</div>
              <div>عناوين الأقسام: 18–21sp Bold</div>
              <div>النصوص والشروحات: 14–16sp Regular</div>
            </div>
          </div>

          <div className="p-4 bg-[#F5F8F6] rounded-xl border border-[#E1E9E3] space-y-2">
            <span className="font-bold text-[#2878C8] block text-sm">
              صيغ الدوال واللغة الإنجليزية (LTR Syntax):
            </span>
            <p className="text-[#1F2933] leading-relaxed">
              أسماء الدوال بالإنجليزية دائماً بالأحرف الكبيرة (مثل SUM, VLOOKUP, IF) وتظهر بصيغة كود متناسقة من اليسار إلى اليمين داخل بطاقات رمادية أو زرقاء ناعمة مع المحافظة التامة على الأقواس والفواصل.
            </p>
            <div className="pt-2 font-mono text-[#2878C8] font-bold text-left ltr">
              =VLOOKUP(A2, Table1, 2, FALSE)
            </div>
          </div>
        </div>
      </div>

      {/* Vector Assets Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-base text-[#185C37]">
            الأصول الرسومية المضمنة في المشروع ({assets.length} أصل):
          </h3>
          <span className="text-xs text-[#68756D]">صيغ PNG عالية الدقة داخل مجلد assets/</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {assets.map((item) => (
            <div
              key={item.name}
              className="bg-white rounded-2xl p-4 border border-[#E1E9E3] hover:border-[#217346] shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="w-full h-32 rounded-xl bg-[#F5F8F6] p-3 mb-3 flex items-center justify-center overflow-hidden border border-[#E1E9E3]/60 group-hover:bg-[#E8F3EC] transition-colors">
                  <img
                    src={`/assets/${item.name}`}
                    alt={item.title}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E8F3EC] text-[#217346]">
                    {item.category}
                  </span>
                  <h4 className="font-formula font-bold text-xs text-[#185C37] mt-1.5 ltr text-right">
                    {item.name}
                  </h4>
                  <p className="text-xs text-[#1F2933] font-semibold mt-0.5">{item.title}</p>
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-[#E1E9E3] flex items-center justify-between text-[11px] text-[#68756D]">
                <span className="font-mono">{item.dims}</span>
                <a
                  href={`/assets/${item.name}`}
                  download={item.name}
                  className="text-[#217346] hover:text-[#185C37] p-1 font-semibold flex items-center gap-1"
                  title="تحميل الأصل"
                >
                  <Download className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
