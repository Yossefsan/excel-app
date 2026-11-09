import React from 'react';
import { Smartphone, Download, Layers, Palette, FileText, CheckCircle2 } from 'lucide-react';

interface HeaderProps {
  activeTab: 'simulator' | 'downloads' | 'explorer' | 'assets';
  setActiveTab: (tab: 'simulator' | 'downloads' | 'explorer' | 'assets') => void;
  isPhoneFrame: boolean;
  setIsPhoneFrame: (val: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  isPhoneFrame,
  setIsPhoneFrame,
}) => {
  return (
    <header className="bg-white border-b border-[#E1E9E3] sticky top-0 z-50 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Branding */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden shadow-xs flex items-center justify-center bg-[#185C37]">
              <img
                src="/assets/app_logo.png"
                alt="Excel Learning Hub Logo"
                className="w-10 h-10 object-contain"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-[#185C37] tracking-tight">
                  موسوعة إكسيل التعليمية
                </h1>
                <span className="text-xs bg-[#E8F3EC] text-[#217346] font-semibold px-2 py-0.5 rounded-full border border-[#217346]/20">
                  Kodular AIA V2
                </span>
              </div>
              <p className="text-xs text-[#68756D]">Excel Learning Hub - Redesign & Engineering</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setActiveTab('simulator')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                activeTab === 'simulator'
                  ? 'bg-[#217346] text-white shadow-xs'
                  : 'text-[#1F2933] hover:bg-[#F5F8F6]'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>المحاكي التفاعلي</span>
            </button>

            <button
              onClick={() => setActiveTab('downloads')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                activeTab === 'downloads'
                  ? 'bg-[#217346] text-white shadow-xs'
                  : 'text-[#1F2933] hover:bg-[#F5F8F6]'
              }`}
            >
              <Download className="w-4 h-4" />
              <span>تحميل المشروع (AIA)</span>
            </button>

            <button
              onClick={() => setActiveTab('explorer')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                activeTab === 'explorer'
                  ? 'bg-[#217346] text-white shadow-xs'
                  : 'text-[#1F2933] hover:bg-[#F5F8F6]'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>فاحص الأكواد واللبنات</span>
            </button>

            <button
              onClick={() => setActiveTab('assets')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                activeTab === 'assets'
                  ? 'bg-[#217346] text-white shadow-xs'
                  : 'text-[#1F2933] hover:bg-[#F5F8F6]'
              }`}
            >
              <Palette className="w-4 h-4" />
              <span>نظام الهوية البصرية</span>
            </button>
          </nav>

          {/* Controls: Frame toggle & status */}
          <div className="hidden lg:flex items-center gap-3">
            {activeTab === 'simulator' && (
              <button
                onClick={() => setIsPhoneFrame(!isPhoneFrame)}
                className="flex items-center gap-1.5 text-xs text-[#217346] bg-[#E8F3EC] hover:bg-[#217346]/20 px-2.5 py-1.5 rounded-md font-medium transition-colors"
                title="التبديل بين إطار الهاتف الذكي والعرض الواسع"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>{isPhoneFrame ? 'إطار هاتف: نشط' : 'عرض واسع'}</span>
              </button>
            )}
            <div className="flex items-center gap-1.5 text-xs text-[#217346] font-medium bg-[#E8F3EC] px-2.5 py-1.5 rounded-md">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#33A852]" />
              <span>جاهز للتحميل والتعديل</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
