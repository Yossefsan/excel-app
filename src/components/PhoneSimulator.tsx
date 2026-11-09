import React, { useState } from 'react';
import {
  CATEGORIES,
  EXCEL_FUNCTIONS,
  ExcelFunction,
  QUIZ_QUESTIONS,
  searchFunctions,
  evaluateFormulaDemo,
} from '../utils/excel_logic';
import {
  Search,
  ArrowRight,
  Bookmark,
  Check,
  Copy,
  ChevronLeft,
  HelpCircle,
  Play,
  RotateCcw,
  Sparkles,
  ExternalLink,
  BookOpen,
} from 'lucide-react';

interface PhoneSimulatorProps {
  isPhoneFrame: boolean;
  onOpenDeliverables?: () => void;
}

export const PhoneSimulator: React.FC<PhoneSimulatorProps> = ({ isPhoneFrame, onOpenDeliverables }) => {
  // Screen navigation state matching Kodular screens:
  // 'Screen1' -> 'Start_Screen' -> 'Logic_Screen' -> 'Detail_Screen' | 'Quiz_Screen'
  const [currentScreen, setCurrentScreen] = useState<
    'Screen1' | 'Start_Screen' | 'Logic_Screen' | 'Detail_Screen' | 'Quiz_Screen'
  >('Screen1');

  // Start Value state
  const [selectedCategory, setSelectedCategory] = useState<'MATH' | 'LOGIC' | 'LOOKUP' | 'TEXT'>('MATH');
  const [selectedFunctionId, setSelectedFunctionId] = useState<string>('SUM');

  // Search input state in Start_Screen
  const [searchQuery, setSearchQuery] = useState('');

  // Favorites state (persisted locally)
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('excel_favorites');
      return saved ? JSON.parse(saved) : ['SUM', 'VLOOKUP', 'IF'];
    } catch {
      return ['SUM', 'VLOOKUP'];
    }
  });

  // Practice Interactive Input in Detail_Screen
  const [practiceInput, setPracticeInput] = useState<string>('');
  const [practiceResult, setPracticeResult] = useState<string | null>(null);
  const [copiedSyntax, setCopiedSyntax] = useState(false);

  // Quiz state
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [showQuizExplanation, setShowQuizExplanation] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  const toggleFavorite = (fnId: string) => {
    const updated = favorites.includes(fnId)
      ? favorites.filter((id) => id !== fnId)
      : [...favorites, fnId];
    setFavorites(updated);
    try {
      localStorage.setItem('excel_favorites', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleOpenCategory = (catKey: 'MATH' | 'LOGIC' | 'LOOKUP' | 'TEXT') => {
    setSelectedCategory(catKey);
    setCurrentScreen('Logic_Screen');
  };

  const handleOpenFunction = (fnId: string) => {
    setSelectedFunctionId(fnId);
    setPracticeInput(EXCEL_FUNCTIONS[fnId]?.practice?.sampleData || '');
    setPracticeResult(null);
    setCurrentScreen('Detail_Screen');
  };

  const currentFn: ExcelFunction = EXCEL_FUNCTIONS[selectedFunctionId] || EXCEL_FUNCTIONS.SUM;
  const currentCatInfo = CATEGORIES[selectedCategory] || CATEGORIES.MATH;

  const copyToClipboard = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedSyntax(true);
    setTimeout(() => setCopiedSyntax(false), 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center p-2 sm:p-6 bg-[#F5F8F6]">
      {/* Device Frame or Wide Container */}
      <div
        className={`w-full transition-all duration-300 ${
          isPhoneFrame
            ? 'max-w-[400px] rounded-[44px] shadow-2xl border-[10px] border-[#1F2933] overflow-hidden bg-white ring-1 ring-black/10'
            : 'max-w-4xl rounded-2xl shadow-md border border-[#E1E9E3] bg-white overflow-hidden'
        }`}
      >
        {/* Android Phone Top Status Bar (if phone frame) */}
        {isPhoneFrame && (
          <div dir="ltr" className="bg-[#185C37] text-white px-6 pt-3 pb-2 flex items-center justify-between text-xs font-mono select-none">
            <span>9:41</span>
            <div className="w-16 h-4 bg-black/40 rounded-full mx-auto" />
            <div className="flex items-center gap-1.5 text-[10px]">
              <span>5G</span>
              <span>100%</span>
            </div>
          </div>
        )}

        {/* SCREEN 1: Welcome Screen (Screen1.scm / Screen1.bky) */}
        {currentScreen === 'Screen1' && (
          <div className="min-h-[640px] flex flex-col justify-between p-6 bg-gradient-to-b from-[#F5F8F6] via-white to-[#E8F3EC]/40 text-center">
            <div className="pt-6">
              {/* Logo */}
              <div className="w-24 h-24 mx-auto mb-4 rounded-3xl overflow-hidden shadow-lg bg-[#185C37] p-2 border-2 border-white flex items-center justify-center">
                <img
                  src="/assets/app_logo.png"
                  alt="Excel Learning Hub"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>

              {/* Title & Subtitle */}
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#185C37] mb-1">
                موسوعة إكسيل التعليمية
              </h2>
              <p className="text-sm sm:text-base font-semibold text-[#217346] mb-6">
                تعلم دوال Excel خطوة بخطوة
              </p>

              {/* Welcome Illustration */}
              <div className="max-w-[280px] mx-auto mb-6 rounded-2xl overflow-hidden bg-white/80 p-3 shadow-xs border border-[#E1E9E3]">
                <img
                  src="/assets/welcome_illustration.png"
                  alt="Welcome Illustration"
                  className="w-full h-auto object-contain mx-auto"
                />
              </div>

              {/* Description */}
              <div className="bg-white rounded-xl p-4 shadow-xs border border-[#E1E9E3] mb-6 text-right">
                <p className="text-sm text-[#1F2933] leading-relaxed">
                  اكتشف أهم دوال Excel وتعلم كيفية استخدامها من خلال شروحات مبسطة وأمثلة عملية واختبارات تفاعلية.
                </p>
              </div>
            </div>

            {/* Start Button */}
            <div className="pb-4">
              <button
                onClick={() => setCurrentScreen('Start_Screen')}
                className="w-full py-4 bg-[#217346] hover:bg-[#185C37] text-white font-bold text-lg rounded-2xl shadow-md flex items-center justify-center gap-2 transition-transform active:scale-[0.98]"
              >
                <span>ابدأ التعلم</span>
                <ChevronLeft className="w-5 h-5" />
              </button>
              <p className="text-[11px] text-[#68756D] mt-2">
                مشروع كودولار المطور (Kodular Creator V2)
              </p>
            </div>
          </div>
        )}

        {/* SCREEN 2: Main Learning Hub (Start_Screen.scm / Start_Screen.bky) */}
        {currentScreen === 'Start_Screen' && (
          <div className="min-h-[640px] flex flex-col bg-[#F5F8F6]">
            {/* Header */}
            <div className="bg-white border-b border-[#E1E9E3] p-4 flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-3">
                <img
                  src="/assets/app_logo.png"
                  alt="Logo"
                  className="w-10 h-10 rounded-xl object-contain bg-[#185C37] p-1"
                />
                <div className="text-right">
                  <h3 className="text-base font-bold text-[#185C37]">مرحباً بك في عالم Excel</h3>
                  <p className="text-xs text-[#68756D]">اختر المجال الذي تريد تعلمه وابدأ رحلتك</p>
                </div>
              </div>
              <button
                onClick={() => setCurrentScreen('Screen1')}
                className="text-xs text-[#68756D] hover:text-[#185C37] p-1.5 rounded-lg hover:bg-[#F5F8F6]"
                title="الشاشة الافتتاحية"
              >
                الرئيسية
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-[#68756D]">
                  <Search className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ابحث عن دالة مثل SUM أو VLOOKUP..."
                  className="w-full pl-4 pr-10 py-3 text-sm bg-white border border-[#E1E9E3] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#217346] text-[#1F2933] placeholder-[#68756D]/70 shadow-2xs"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute inset-y-0 left-3 flex items-center text-xs text-[#68756D] hover:text-[#1F2933]"
                  >
                    مسح
                  </button>
                )}
              </div>

              {/* If Searching, show search results */}
              {searchQuery ? (
                <div className="bg-white rounded-2xl p-4 border border-[#E1E9E3] shadow-xs">
                  <h4 className="text-xs font-bold text-[#68756D] mb-3">
                    نتائج البحث عن &ldquo;{searchQuery}&rdquo;:
                  </h4>
                  {searchFunctions(searchQuery).length > 0 ? (
                    <div className="space-y-2">
                      {searchFunctions(searchQuery).map((fn) => (
                        <div
                          key={fn.id}
                          onClick={() => handleOpenFunction(fn.id)}
                          className="flex items-center justify-between p-3 rounded-xl bg-[#F5F8F6] hover:bg-[#E8F3EC] cursor-pointer transition-colors border border-transparent hover:border-[#217346]/20"
                        >
                          <div className="text-right">
                            <div className="flex items-center gap-2">
                              <span className="font-formula font-bold text-sm text-[#217346]">
                                {fn.name}
                              </span>
                              <span className="text-xs text-[#1F2933] font-semibold">
                                {fn.arabicName}
                              </span>
                            </div>
                            <p className="text-xs text-[#68756D] mt-0.5 line-clamp-1">
                              {fn.shortDescription}
                            </p>
                          </div>
                          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white text-[#217346] border border-[#E1E9E3]">
                            {fn.categoryArabic}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <img
                        src="/assets/empty_search.png"
                        alt="No results"
                        className="w-24 h-24 mx-auto mb-2 opacity-80"
                      />
                      <p className="text-sm font-semibold text-[#1F2933]">لم يتم العثور على دالة بهذا الاسم</p>
                      <p className="text-xs text-[#68756D] mt-1">
                        تأكد من كتابة اسم الدالة بالإنجليزية مثل SUM أو IF أو MATCH
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  {/* Overview Stats Card */}
                  <div className="bg-[#E8F3EC] rounded-2xl p-4 border border-[#217346]/20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#217346] text-white flex items-center justify-center font-bold text-sm">
                        📊
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#185C37]">نظرة عامة على المحتوى</div>
                        <div className="text-xs text-[#217346]">4 تصنيفات رئيسية • 11 دالة شاملة</div>
                      </div>
                    </div>
                    <span className="text-xs bg-white text-[#185C37] font-bold px-2.5 py-1 rounded-full shadow-2xs">
                      جاهز 100%
                    </span>
                  </div>

                  {/* 4 Category Cards */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-bold text-[#1F2933]">تصنيفات الدوال</h4>
                      <span className="text-xs text-[#68756D]">اختر للبدء</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {/* 1. Math */}
                      <div
                        onClick={() => handleOpenCategory('MATH')}
                        className="bg-white rounded-2xl p-3.5 border border-[#E1E9E3] hover:border-[#217346] shadow-xs hover:shadow-md cursor-pointer transition-all text-right flex flex-col justify-between group"
                      >
                        <div>
                          <div className="w-12 h-12 rounded-xl bg-[#E8F3EC] p-1.5 mb-2 group-hover:scale-105 transition-transform">
                            <img
                              src="/assets/category_math.png"
                              alt="Math"
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <h5 className="font-bold text-sm text-[#185C37]">الدوال الحسابية</h5>
                          <span className="text-[11px] font-mono text-[#68756D]">Math Functions</span>
                          <p className="text-[11px] text-[#68756D] mt-1 line-clamp-2">
                            SUM, COUNT, AVERAGE, MAX
                          </p>
                        </div>
                        <div className="mt-3 pt-2 border-t border-[#E1E9E3] flex items-center justify-between text-xs text-[#217346] font-bold">
                          <span>4 دوال</span>
                          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        </div>
                      </div>

                      {/* 2. Logic */}
                      <div
                        onClick={() => handleOpenCategory('LOGIC')}
                        className="bg-white rounded-2xl p-3.5 border border-[#E1E9E3] hover:border-[#185C37] shadow-xs hover:shadow-md cursor-pointer transition-all text-right flex flex-col justify-between group"
                      >
                        <div>
                          <div className="w-12 h-12 rounded-xl bg-[#E8F3EC] p-1.5 mb-2 group-hover:scale-105 transition-transform">
                            <img
                              src="/assets/category_logic.png"
                              alt="Logic"
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <h5 className="font-bold text-sm text-[#185C37]">الدوال المنطقية</h5>
                          <span className="text-[11px] font-mono text-[#68756D]">Logical Functions</span>
                          <p className="text-[11px] text-[#68756D] mt-1 line-clamp-2">
                            IF, IFS, AND
                          </p>
                        </div>
                        <div className="mt-3 pt-2 border-t border-[#E1E9E3] flex items-center justify-between text-xs text-[#185C37] font-bold">
                          <span>3 دوال</span>
                          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        </div>
                      </div>

                      {/* 3. Lookup */}
                      <div
                        onClick={() => handleOpenCategory('LOOKUP')}
                        className="bg-white rounded-2xl p-3.5 border border-[#E1E9E3] hover:border-[#2878C8] shadow-xs hover:shadow-md cursor-pointer transition-all text-right flex flex-col justify-between group"
                      >
                        <div>
                          <div className="w-12 h-12 rounded-xl bg-[#E8F3EC] p-1.5 mb-2 group-hover:scale-105 transition-transform">
                            <img
                              src="/assets/category_lookup.png"
                              alt="Lookup"
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <h5 className="font-bold text-sm text-[#2878C8]">الدوال البحثية</h5>
                          <span className="text-[11px] font-mono text-[#68756D]">Lookup Functions</span>
                          <p className="text-[11px] text-[#68756D] mt-1 line-clamp-2">
                            MATCH, VLOOKUP
                          </p>
                        </div>
                        <div className="mt-3 pt-2 border-t border-[#E1E9E3] flex items-center justify-between text-xs text-[#2878C8] font-bold">
                          <span>دالتان</span>
                          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        </div>
                      </div>

                      {/* 4. Text */}
                      <div
                        onClick={() => handleOpenCategory('TEXT')}
                        className="bg-white rounded-2xl p-3.5 border border-[#E1E9E3] hover:border-[#33A852] shadow-xs hover:shadow-md cursor-pointer transition-all text-right flex flex-col justify-between group"
                      >
                        <div>
                          <div className="w-12 h-12 rounded-xl bg-[#E8F3EC] p-1.5 mb-2 group-hover:scale-105 transition-transform">
                            <img
                              src="/assets/category_text.png"
                              alt="Text"
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <h5 className="font-bold text-sm text-[#33A852]">الدوال النصية</h5>
                          <span className="text-[11px] font-mono text-[#68756D]">Text Functions</span>
                          <p className="text-[11px] text-[#68756D] mt-1 line-clamp-2">
                            CONCAT, TRIM, LOWER
                          </p>
                        </div>
                        <div className="mt-3 pt-2 border-t border-[#E1E9E3] flex items-center justify-between text-xs text-[#33A852] font-bold">
                          <span>3 دوال</span>
                          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Practice & Quiz Banner */}
                  <div
                    onClick={() => {
                      setQuizIndex(0);
                      setSelectedOption(null);
                      setQuizScore(0);
                      setQuizFinished(false);
                      setCurrentScreen('Quiz_Screen');
                    }}
                    className="bg-gradient-to-r from-[#F4A340] to-[#e68a1f] text-white rounded-2xl p-4 shadow-sm cursor-pointer flex items-center justify-between hover:opacity-95 transition-opacity"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-lg">
                        🎯
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold">اختبر معلوماتك في Excel</div>
                        <div className="text-xs text-white/90">أسئلة تفاعلية سريعة لقياس استيعابك للدوال</div>
                      </div>
                    </div>
                    <ChevronLeft className="w-5 h-5" />
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* SCREEN 3: Function List (Logic_Screen.scm / Logic_Screen.bky) */}
        {currentScreen === 'Logic_Screen' && (
          <div className="min-h-[640px] flex flex-col bg-[#F5F8F6]">
            {/* Category Header */}
            <div className="bg-white border-b border-[#E1E9E3] p-4 flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-3 text-right">
                <img
                  src={currentCatInfo.icon}
                  alt={currentCatInfo.titleArabic}
                  className="w-10 h-10 rounded-xl object-contain bg-[#E8F3EC] p-1"
                />
                <div>
                  <h3 className="text-base font-bold text-[#185C37]">
                    {currentCatInfo.titleArabic}
                  </h3>
                  <p className="text-xs text-[#68756D]">{currentCatInfo.titleEnglish}</p>
                </div>
              </div>
              <button
                onClick={() => setCurrentScreen('Start_Screen')}
                className="flex items-center gap-1 text-xs font-semibold text-[#217346] bg-[#E8F3EC] px-3 py-1.5 rounded-lg hover:bg-[#217346]/20 transition-colors"
              >
                <span>الرئيسية</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Subtitle bar */}
            <div className="bg-[#E8F3EC] px-4 py-2 border-b border-[#217346]/10 text-right">
              <p className="text-xs text-[#185C37] font-medium">{currentCatInfo.description}</p>
            </div>

            {/* List of Functions */}
            <div className="flex-1 p-4 space-y-3 overflow-y-auto">
              {currentCatInfo.functions.map((fnId) => {
                const fn = EXCEL_FUNCTIONS[fnId];
                if (!fn) return null;
                const isFav = favorites.includes(fn.id);
                return (
                  <div
                    key={fn.id}
                    onClick={() => handleOpenFunction(fn.id)}
                    className="bg-white rounded-2xl p-4 border border-[#E1E9E3] hover:border-[#217346] shadow-2xs hover:shadow-md cursor-pointer transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#E8F3EC] group-hover:bg-[#217346] text-[#217346] group-hover:text-white flex items-center justify-center font-formula font-bold text-xs transition-colors">
                        fx
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2">
                          <span className="font-formula font-bold text-base text-[#185C37]">
                            {fn.name}
                          </span>
                          <span className="text-xs font-semibold text-[#68756D]">
                            {fn.arabicName}
                          </span>
                        </div>
                        <p className="text-xs text-[#68756D] mt-0.5 line-clamp-1">
                          {fn.shortDescription}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(fn.id);
                        }}
                        className={`p-1.5 rounded-full transition-colors ${
                          isFav
                            ? 'text-[#F4A340] bg-[#F4A340]/10'
                            : 'text-gray-300 hover:text-[#F4A340]'
                        }`}
                        title={isFav ? 'إزالة من المحفوظات' : 'حفظ في المفضلة'}
                      >
                        <Bookmark className="w-4 h-4 fill-current" />
                      </button>
                      <ChevronLeft className="w-4 h-4 text-[#68756D] group-hover:-translate-x-1 transition-transform" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Back button */}
            <div className="p-4 bg-white border-t border-[#E1E9E3]">
              <button
                onClick={() => setCurrentScreen('Start_Screen')}
                className="w-full py-3 bg-[#F5F8F6] hover:bg-[#E8F3EC] text-[#185C37] font-bold text-sm rounded-xl border border-[#E1E9E3] flex items-center justify-center gap-2 transition-colors"
              >
                <span>العودة للتصنيفات</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* SCREEN 4: Function Details (Detail_Screen.scm / Detail_Screen.bky) */}
        {currentScreen === 'Detail_Screen' && (
          <div className="min-h-[640px] flex flex-col bg-[#F5F8F6]">
            {/* Top Bar */}
            <div className="bg-white border-b border-[#E1E9E3] p-4 flex items-center justify-between sticky top-0 z-10 shadow-xs">
              <div className="flex items-center gap-2">
                <span className="font-formula font-bold text-lg text-[#185C37]">
                  {currentFn.name}
                </span>
                <span className="text-xs text-[#68756D] font-semibold">
                  ({currentFn.arabicName})
                </span>
              </div>
              <button
                onClick={() => setCurrentScreen('Logic_Screen')}
                className="flex items-center gap-1 text-xs font-semibold text-[#217346] bg-[#E8F3EC] px-3 py-1.5 rounded-lg hover:bg-[#217346]/20 transition-colors"
              >
                <span>قائمة الدوال</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Scrollable Lesson Content */}
            <div className="flex-1 p-4 space-y-4 overflow-y-auto text-right">
              {/* Category Badge & Favorite */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#217346] bg-[#E8F3EC] px-3 py-1 rounded-full border border-[#217346]/20">
                  {currentFn.categoryArabic}
                </span>
                <button
                  onClick={() => toggleFavorite(currentFn.id)}
                  className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors ${
                    favorites.includes(currentFn.id)
                      ? 'bg-[#F4A340]/10 text-[#F4A340]'
                      : 'bg-white border border-[#E1E9E3] text-[#68756D]'
                  }`}
                >
                  <Bookmark className="w-3.5 h-3.5 fill-current" />
                  <span>{favorites.includes(currentFn.id) ? 'محفوظة' : 'حفظ الدالة'}</span>
                </button>
              </div>

              {/* Function Overview Card */}
              <div className="bg-white rounded-2xl p-4 border border-[#E1E9E3] shadow-xs">
                <h4 className="text-xs font-bold text-[#217346] mb-2 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4" />
                  <span>ما هي وظيفة الدالة؟</span>
                </h4>
                <p className="text-sm text-[#1F2933] leading-relaxed">
                  {currentFn.fullDescription}
                </p>
              </div>

              {/* Formula Syntax Card (Formula Bar Style) */}
              <div className="bg-white rounded-2xl p-4 border border-[#2878C8]/30 shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#2878C8] flex items-center gap-1">
                    <span className="w-5 h-5 rounded bg-[#2878C8] text-white flex items-center justify-center text-[10px] font-mono">
                      fx
                    </span>
                    <span>الصيغة العامة (Syntax)</span>
                  </span>
                  <button
                    onClick={() => copyToClipboard(currentFn.syntax)}
                    className="flex items-center gap-1 text-[11px] text-[#2878C8] hover:text-[#185C37] bg-[#F5F8F6] px-2 py-1 rounded border border-[#E1E9E3]"
                  >
                    {copiedSyntax ? (
                      <>
                        <Check className="w-3 h-3 text-[#33A852]" />
                        <span>تم النسخ!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>نسخ الصيغة</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="bg-[#F5F8F6] p-3 rounded-xl border border-[#E1E9E3] font-formula text-sm font-bold text-[#1F2933] tracking-wide text-left overflow-x-auto">
                  {currentFn.syntax}
                </div>
              </div>

              {/* Step-by-Step Instructions */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-[#68756D]">خطوات الاستخدام والتطبيق:</h4>
                {currentFn.steps.map((step, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl p-4 border border-[#E1E9E3] shadow-xs space-y-3"
                  >
                    <div className="flex items-start gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-[#217346] text-white text-xs font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <div className="text-right">
                        <h5 className="font-bold text-xs text-[#185C37]">{step.title}</h5>
                        <p className="text-xs text-[#1F2933] leading-relaxed mt-1">
                          {step.description}
                        </p>
                      </div>
                    </div>
                    {step.image && (
                      <div className="rounded-xl overflow-hidden border border-[#E1E9E3] bg-[#F5F8F6] p-2 text-center">
                        <img
                          src={step.image}
                          alt={step.title}
                          className="max-h-36 mx-auto object-contain rounded"
                          loading="lazy"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Interactive "Try it yourself" Section */}
              <div className="bg-gradient-to-br from-[#E8F3EC] to-white rounded-2xl p-4 border border-[#217346]/30 shadow-xs space-y-3">
                <div className="flex items-center gap-2 text-[#185C37]">
                  <Sparkles className="w-4 h-4 text-[#F4A340]" />
                  <h4 className="text-xs font-bold">جرب بنفسك (تطبيق تفاعلي):</h4>
                </div>
                <p className="text-xs text-[#68756D]">
                  {currentFn.practice.instruction}
                </p>

                <div className="space-y-2">
                  <div className="text-[11px] font-semibold text-[#1F2933]">
                    المدخلات (قيم مفصولة بفواصل):
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={practiceInput}
                      onChange={(e) => setPracticeInput(e.target.value)}
                      placeholder={currentFn.practice.sampleData}
                      className="flex-1 px-3 py-2 text-xs bg-white border border-[#E1E9E3] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#217346] font-mono text-left"
                    />
                    <button
                      onClick={() => {
                        const res = evaluateFormulaDemo(
                          currentFn.id,
                          practiceInput || currentFn.practice.sampleData || '10, 20'
                        );
                        setPracticeResult(res);
                      }}
                      className="px-4 py-2 bg-[#217346] hover:bg-[#185C37] text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-1"
                    >
                      <Play className="w-3.5 h-3.5" />
                      <span>حساب</span>
                    </button>
                  </div>
                </div>

                {practiceResult !== null && (
                  <div className="p-3 bg-white rounded-xl border border-[#33A852]/30 flex items-center justify-between">
                    <span className="text-xs font-bold text-[#185C37]">نتيجة الدالة المحسوبة:</span>
                    <span className="font-formula font-bold text-sm text-[#217346] bg-[#E8F3EC] px-3 py-1 rounded-lg">
                      {practiceResult}
                    </span>
                  </div>
                )}

                {/* WebViewer / Simulation link */}
                {currentFn.practice.webViewerUrl && (
                  <div className="pt-2 border-t border-[#E1E9E3]/60 flex items-center justify-between text-[11px]">
                    <span className="text-[#68756D]">محاكاة تعليمية متحركة:</span>
                    <a
                      href={currentFn.practice.webViewerUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#2878C8] hover:underline flex items-center gap-1 font-semibold"
                    >
                      <span>عرض الشرح المتحرك</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Navigation */}
            <div className="p-4 bg-white border-t border-[#E1E9E3]">
              <button
                onClick={() => setCurrentScreen('Logic_Screen')}
                className="w-full py-3 bg-[#217346] hover:bg-[#185C37] text-white font-bold text-sm rounded-xl shadow-xs flex items-center justify-center gap-2 transition-colors"
              >
                <span>العودة لقائمة الدوال ({currentFn.categoryArabic})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* SCREEN 5: Quiz Mode */}
        {currentScreen === 'Quiz_Screen' && (
          <div className="min-h-[640px] flex flex-col bg-[#F5F8F6]">
            {/* Top Bar */}
            <div className="bg-white border-b border-[#E1E9E3] p-4 flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-[#185C37]">اختبار دوال Excel</span>
                <span className="text-xs text-[#68756D]">
                  (السؤال {quizIndex + 1} من {QUIZ_QUESTIONS.length})
                </span>
              </div>
              <button
                onClick={() => setCurrentScreen('Start_Screen')}
                className="text-xs font-semibold text-[#68756D] hover:text-[#185C37] p-1"
              >
                إنهاء
              </button>
            </div>

            {/* Quiz Content */}
            <div className="flex-1 p-5 overflow-y-auto text-right flex flex-col justify-between">
              {!quizFinished ? (
                <div className="space-y-4">
                  {/* Progress Bar */}
                  <div className="w-full bg-[#E1E9E3] h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-[#217346] h-full transition-all duration-300"
                      style={{
                        width: `${((quizIndex + 1) / QUIZ_QUESTIONS.length) * 100}%`,
                      }}
                    />
                  </div>

                  {/* Question Card */}
                  <div className="bg-white rounded-2xl p-5 border border-[#E1E9E3] shadow-xs">
                    <span className="text-[11px] font-bold text-[#F4A340] mb-2 block">
                      سؤال {quizIndex + 1}
                    </span>
                    <h4 className="text-base font-bold text-[#1F2933] leading-relaxed">
                      {QUIZ_QUESTIONS[quizIndex].question}
                    </h4>
                  </div>

                  {/* Options */}
                  <div className="space-y-2.5">
                    {QUIZ_QUESTIONS[quizIndex].options.map((opt, optIdx) => {
                      let btnStyle = 'bg-white border-[#E1E9E3] text-[#1F2933] hover:bg-[#F5F8F6]';
                      if (selectedOption !== null) {
                        if (optIdx === QUIZ_QUESTIONS[quizIndex].correctIndex) {
                          btnStyle = 'bg-[#E8F3EC] border-[#33A852] text-[#185C37] font-bold';
                        } else if (optIdx === selectedOption) {
                          btnStyle = 'bg-red-50 border-red-300 text-red-700';
                        }
                      }
                      return (
                        <button
                          key={optIdx}
                          disabled={selectedOption !== null}
                          onClick={() => {
                            setSelectedOption(optIdx);
                            setShowQuizExplanation(true);
                            if (optIdx === QUIZ_QUESTIONS[quizIndex].correctIndex) {
                              setQuizScore((prev) => prev + 1);
                            }
                          }}
                          className={`w-full p-4 rounded-xl border text-right font-medium text-sm flex items-center justify-between transition-all ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          <span className="w-6 h-6 rounded-full border border-current text-xs flex items-center justify-center font-mono">
                            {['A', 'B', 'C', 'D'][optIdx]}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation feedback */}
                  {showQuizExplanation && (
                    <div className="bg-[#E8F3EC] rounded-xl p-4 border border-[#33A852]/30 text-right">
                      <div className="flex items-center gap-1.5 font-bold text-xs text-[#185C37] mb-1">
                        <HelpCircle className="w-4 h-4" />
                        <span>التوضيح:</span>
                      </div>
                      <p className="text-xs text-[#1F2933]">
                        {QUIZ_QUESTIONS[quizIndex].explanation}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                /* Quiz Results */
                <div className="text-center py-8 space-y-4">
                  <div className="w-20 h-20 rounded-full bg-[#E8F3EC] text-[#217346] flex items-center justify-center mx-auto text-3xl shadow-sm border border-[#217346]/20">
                    🏆
                  </div>
                  <h3 className="text-xl font-bold text-[#185C37]">أحسنت! أكملت الاختبار</h3>
                  <p className="text-sm text-[#68756D]">
                    لقد أجبت على {quizScore} من أصل {QUIZ_QUESTIONS.length} بشكل صحيح!
                  </p>

                  <div className="inline-block bg-[#E8F3EC] px-6 py-3 rounded-2xl border border-[#217346]/20 text-lg font-bold text-[#185C37]">
                    النسبة: {Math.round((quizScore / QUIZ_QUESTIONS.length) * 100)}%
                  </div>

                  <div className="pt-6 space-y-2">
                    <button
                      onClick={() => {
                        setQuizIndex(0);
                        setSelectedOption(null);
                        setQuizScore(0);
                        setQuizFinished(false);
                      }}
                      className="w-full py-3 bg-[#217346] text-white font-bold rounded-xl shadow-xs flex items-center justify-center gap-2"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>إعادة الاختبار</span>
                    </button>
                    <button
                      onClick={() => setCurrentScreen('Start_Screen')}
                      className="w-full py-3 bg-white text-[#185C37] font-bold rounded-xl border border-[#E1E9E3]"
                    >
                      العودة للرئيسية
                    </button>
                  </div>
                </div>
              )}

              {/* Next Question Button */}
              {!quizFinished && selectedOption !== null && (
                <div className="pt-4">
                  <button
                    onClick={() => {
                      if (quizIndex + 1 < QUIZ_QUESTIONS.length) {
                        setQuizIndex((prev) => prev + 1);
                        setSelectedOption(null);
                        setShowQuizExplanation(false);
                      } else {
                        setQuizFinished(true);
                      }
                    }}
                    className="w-full py-3.5 bg-[#217346] hover:bg-[#185C37] text-white font-bold rounded-xl shadow-md flex items-center justify-center gap-2 transition-colors"
                  >
                    <span>
                      {quizIndex + 1 < QUIZ_QUESTIONS.length ? 'السؤال التالي' : 'عرض النتيجة'}
                    </span>
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Android Bottom Gesture Bar (if phone frame) */}
        {isPhoneFrame && (
          <div className="bg-white py-2 flex items-center justify-center border-t border-[#E1E9E3]">
            <div className="w-32 h-1 bg-gray-300 rounded-full" />
          </div>
        )}
      </div>
    </div>
  );
};
