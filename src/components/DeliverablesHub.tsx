import React, { useState } from 'react';
import {
  Download,
  FileCode,
  FileArchive,
  FileText,
  Image as ImageIcon,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Eye,
} from 'lucide-react';

export const DeliverablesHub: React.FC = () => {
  const [activePreview, setActivePreview] = useState<'readme' | 'validation' | null>(null);
  const [readmeContent, setReadmeContent] = useState<string>('');
  const [validationContent, setValidationContent] = useState<string>('');

  const loadTextFile = async (type: 'readme' | 'validation') => {
    setActivePreview(type);
    try {
      const url = type === 'readme' ? '/README_Arabic.txt' : '/Kodular_Migration_Audit_Report.txt';
      const res = await fetch(url);
      const txt = await res.text();
      if (type === 'readme') setReadmeContent(txt);
      else setValidationContent(txt);
    } catch {
      // fallback
    }
  };

  const deliverables = [
    {
      title: 'Excel_Learning_V2_Kodular.aia',
      titleArabic: 'مشروع كودولار الأصلي المحوّل بدقة (AIA)',
      description: 'النسخة الأصلية المحوّلة هندسياً لمنصة Kodular Creator مع الحفاظ التام 100% على نفس التصميم والشاشات والبلوكات والأصول الأصلية دون أي حذف.',
      size: '208 KB',
      icon: FileCode,
      downloadUrl: '/Excel_Learning_V2_Kodular.aia',
      color: '#185C37',
      badge: 'مشروع كودولار الجاهز للاستيراد',
    },
    {
      title: 'Kodular_Migration_Audit_Report.txt',
      titleArabic: 'تقرير الفحص والتحويل الهندسي الشامل',
      description: 'تقرير فني تفصيلي يوضح جذور مشاكل Width و Height و ActionBar و FontTypeface، وجميع الإصلاحات المنفذة، ونتائج التحقق.',
      size: '14 KB',
      icon: ShieldCheck,
      downloadUrl: '/Kodular_Migration_Audit_Report.txt',
      color: '#33A852',
      badge: 'تقرير الهندسة العكسية والتشخيص',
      previewType: 'validation' as const,
    },
    {
      title: 'Excel_Learning_V2_Kodular_Source.zip',
      titleArabic: 'الأرشيف المصدري الشامل للنسخة المحولة',
      description: 'حزمة مضغوطة تشمل كافة ملفات .scm و .bky و project.properties بحزمة io.kodular وجميع الأصول الرسومية الأصلية.',
      size: '209 KB',
      icon: FileArchive,
      downloadUrl: '/Excel_Learning_V2_Kodular_Source.zip',
      color: '#217346',
      badge: 'Source ZIP (Kodular)',
    },
    {
      title: 'Excel_Learning_Hub.aia',
      titleArabic: 'النسخة المطورة والموسعة (Redesigned Edition)',
      description: 'نسخة إضافية مطورة بهوية إكسيل الحديثة مع تصحيح تصنيف دالة MAX وإضافة شريط البحث ونظام الأيقونات المتجهية الحديث.',
      size: '250 KB',
      icon: FileCode,
      downloadUrl: '/Excel_Learning_Hub.aia',
      color: '#2878C8',
      badge: 'نسخة إضافية مطورة',
    },
    {
      title: 'README_Arabic.txt',
      titleArabic: 'دليل التطوير والتوثيق باللغة العربية',
      description: 'دليل تعليمي يوضح بنية الشاشات، آلية التنقل، كيفية إضافة دوال جديدة، وتعديل الشروحات والوسائط.',
      size: '13 KB',
      icon: FileText,
      downloadUrl: '/README_Arabic.txt',
      color: '#F4A340',
      badge: 'دليل المستخدم',
      previewType: 'readme' as const,
    },
    {
      title: 'Asset_Preview.png',
      titleArabic: 'لوحة الهوية البصرية ونظام الأصول',
      description: 'صورة عريضة (1200x800) تستعرض باليت الألوان المعتمدة، وتصاميم الأيقونات، والبطاقات، والخطوط.',
      size: '18 KB',
      icon: ImageIcon,
      downloadUrl: '/Asset_Preview.png',
      color: '#217346',
      badge: 'Design Preview',
      isImage: true,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Intro Banner */}
      <div className="bg-gradient-to-r from-[#185C37] to-[#217346] text-white rounded-3xl p-6 sm:p-8 shadow-md">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-xs font-semibold mb-3 border border-white/20">
            <CheckCircle2 className="w-4 h-4 text-[#33A852]" />
            <span>تم التحقق من جاهزية وبناء جميع الملفات الخمسة المطلوبة</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-2">
            مركز تحميل مخرجات مشروع كودولار (Deliverables Hub)
          </h2>
          <p className="text-sm sm:text-base text-white/90 leading-relaxed">
            تمت إعادة هندسة وتطوير تطبيق &ldquo;موسوعة إكسيل التعليمية&rdquo; بنجاح كامل مع المحافظة على كافة الشروحات
            والأمثلة الأصلية، وتصحيح تصنيف دالة MAX، وإضافة هوية بصرية مخصصة مستوحاة من Excel، وتوفير كافة الحزم للتنزيل المباشر أدناه.
          </p>
          <div className="mt-4 p-3 bg-white/10 rounded-xl border border-white/20 flex items-center gap-3 text-xs">
            <span className="bg-[#33A852] text-white font-bold px-2.5 py-1 rounded-md text-[11px] shrink-0">
              حل مشكلة Kodular
            </span>
            <p className="text-white/95">
              تمت معايرة وضبط إصدارات المكونات (Image v7, Button v7, Form v30, ListView v6) لمنع تعارض الإصدارات؛ أصبح ملف الـ AIA جاهزاً للاستيراد المباشر في <code className="bg-white/20 px-1 py-0.5 rounded font-mono">creator.kodular.io</code> بنجاح تام!
            </p>
          </div>
        </div>
      </div>

      {/* Deliverable Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {deliverables.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl p-5 border border-[#E1E9E3] hover:border-[#217346] shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#E8F3EC] text-[#217346] border border-[#217346]/20">
                    {item.badge}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-[#F5F8F6] text-[#217346] flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="font-formula font-bold text-base text-[#185C37] ltr text-right">
                  {item.title}
                </h3>
                <h4 className="font-bold text-sm text-[#1F2933] mt-0.5">
                  {item.titleArabic}
                </h4>
                <p className="text-xs text-[#68756D] mt-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-[#E1E9E3] flex items-center justify-between">
                <span className="text-xs font-mono font-semibold text-[#68756D]">
                  الحجم: {item.size}
                </span>

                <div className="flex items-center gap-2">
                  {item.previewType && (
                    <button
                      onClick={() => loadTextFile(item.previewType)}
                      className="flex items-center gap-1 text-xs text-[#2878C8] bg-[#F5F8F6] hover:bg-[#2878C8]/10 px-3 py-1.5 rounded-lg border border-[#E1E9E3] font-semibold transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>معاينة</span>
                    </button>
                  )}
                  {item.isImage && (
                    <a
                      href={item.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs text-[#F4A340] bg-[#F5F8F6] hover:bg-[#F4A340]/10 px-3 py-1.5 rounded-lg border border-[#E1E9E3] font-semibold transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>عرض</span>
                    </a>
                  )}
                  <a
                    href={item.downloadUrl}
                    download={item.title}
                    className="flex items-center gap-1.5 px-4 py-1.5 bg-[#217346] hover:bg-[#185C37] text-white text-xs font-bold rounded-lg shadow-xs transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>تحميل</span>
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Text Preview Modal / Accordion */}
      {activePreview && (
        <div className="bg-white rounded-2xl p-6 border border-[#217346] shadow-lg space-y-3">
          <div className="flex items-center justify-between border-b border-[#E1E9E3] pb-3">
            <h3 className="font-bold text-base text-[#185C37] flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#217346]" />
              <span>
                {activePreview === 'readme' ? 'معاينة ملف README_Arabic.txt' : 'معاينة تقرير الفحص والتحويل (Kodular Migration Audit Report)'}
              </span>
            </h3>
            <button
              onClick={() => setActivePreview(null)}
              className="text-xs text-[#68756D] hover:text-[#1F2933] font-bold px-2 py-1 rounded hover:bg-gray-100"
            >
              إغلاق المعاينة ✕
            </button>
          </div>
          <pre className="p-4 bg-[#F5F8F6] rounded-xl text-xs font-mono text-[#1F2933] max-h-96 overflow-y-auto whitespace-pre-wrap leading-relaxed border border-[#E1E9E3]">
            {activePreview === 'readme' ? readmeContent || 'جاري تحميل الدليل...' : validationContent || 'جاري تحميل التقرير...'}
          </pre>
        </div>
      )}

      {/* Visual Asset Preview Section */}
      <div className="bg-white rounded-2xl p-6 border border-[#E1E9E3] shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-right">
            <h3 className="text-lg font-bold text-[#185C37]">لوحة الأصول المعتمدة (Asset_Preview.png)</h3>
            <p className="text-xs text-[#68756D]">معاينة بصرية لنظام الألوان والبطاقات والأيقونات المنشأة</p>
          </div>
          <a
            href="/Asset_Preview.png"
            download="Asset_Preview.png"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F5F8F6] hover:bg-[#E8F3EC] text-[#217346] text-xs font-bold rounded-lg border border-[#E1E9E3] transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>تنزيل الصورة بدقة كاملة</span>
          </a>
        </div>
        <div className="rounded-xl overflow-hidden border border-[#E1E9E3] bg-[#F5F8F6]">
          <img
            src="/Asset_Preview.png"
            alt="Excel Learning Hub Asset Preview"
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
    </div>
  );
};
