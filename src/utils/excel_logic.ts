/**
 * Core Excel Hub Logic & Data
 */

export interface ExcelFunction {
  id: string;
  name: string;
  arabicName: string;
  category: 'MATH' | 'LOGIC' | 'LOOKUP' | 'TEXT';
  categoryArabic: string;
  shortDescription: string;
  fullDescription: string;
  syntax: string;
  steps: {
    title: string;
    description: string;
    image: string;
  }[];
  practice: {
    instruction: string;
    sampleData?: string;
    defaultFormula?: string;
    expectedResult?: string;
    webViewerUrl?: string;
  };
}

export interface CategoryInfo {
  id: 'MATH' | 'LOGIC' | 'LOOKUP' | 'TEXT';
  titleArabic: string;
  titleEnglish: string;
  description: string;
  icon: string;
  badgeColor: string;
  functions: string[];
}

export const CATEGORIES: Record<string, CategoryInfo> = {
  MATH: {
    id: 'MATH',
    titleArabic: 'الدوال الحسابية',
    titleEnglish: 'Math Functions',
    description: 'تعلم إجراء العمليات الحسابية وحساب الإجماليات والمتوسطات وأكبر قيمة.',
    icon: '/assets/category_math.png',
    badgeColor: '#217346',
    functions: ['SUM', 'COUNT', 'AVERAGE', 'MAX'],
  },
  LOGIC: {
    id: 'LOGIC',
    titleArabic: 'الدوال المنطقية',
    titleEnglish: 'Logical Functions',
    description: 'استخدم الشروط المنطقية لاتخاذ القرارات واختبار الشروط داخل Excel.',
    icon: '/assets/category_logic.png',
    badgeColor: '#185C37',
    functions: ['IF', 'IFS', 'AND'],
  },
  LOOKUP: {
    id: 'LOOKUP',
    titleArabic: 'الدوال البحثية',
    titleEnglish: 'Lookup Functions',
    description: 'ابحث عن البيانات واسترجع المعلومات المقابلة لها من الجداول بدقة.',
    icon: '/assets/category_lookup.png',
    badgeColor: '#2878C8',
    functions: ['MATCH', 'VLOOKUP'],
  },
  TEXT: {
    id: 'TEXT',
    titleArabic: 'الدوال النصية',
    titleEnglish: 'Text Functions',
    description: 'تعلم دمج النصوص وتنظيف الفراغات وتنسيق حالة الأحرف الإنجليزية.',
    icon: '/assets/category_text.png',
    badgeColor: '#33A852',
    functions: ['CONCAT', 'TRIM', 'LOWER'],
  },
};

export const EXCEL_FUNCTIONS: Record<string, ExcelFunction> = {
  SUM: {
    id: 'SUM',
    name: 'SUM',
    arabicName: 'دالة الجمع',
    category: 'MATH',
    categoryArabic: 'الدوال الحسابية',
    shortDescription: 'جمع مجموعة من الأرقام وإظهار الناتج الإجمالي بسرعة.',
    fullDescription: 'تستخدم هذه الدالة لجمع الأرقام في نطاق معين بسرعة بدلاً من الجمع اليدوي، وتعتبر أكثر الدوال استخداماً في Excel.',
    syntax: '=SUM(number1, [number2], ...)',
    steps: [
      {
        title: 'الخطوة الأولى',
        description: 'حدد الخلية التي ترغب في ظهور المجموع بها واكتب فيها علامة (=)',
        image: 'https://www.w3schools.com/excel/sum2.png',
      },
      {
        title: 'الخطوة الثانية',
        description: 'اكتب دالة الجمع SUM، ثم افتح قوساً، وحدد نطاق الخلايا التي تريد جمعها، وأغلق القوس.',
        image: 'https://www.w3schools.com/excel/sum4.png',
      },
      {
        title: 'الخطوة الثالثة',
        description: 'اضغط Enter لحساب المجموع فوراً وتطبيقه على الجدول.',
        image: 'https://www.w3schools.com/excel/sum5.png',
      },
    ],
    practice: {
      instruction: 'جرب الدالة بنفسك لحساب إجمالي المبيعات أو درجات الطلاب.',
      sampleData: '10, 20, 30, 40',
      defaultFormula: '=SUM(10, 20, 30, 40)',
      expectedResult: '100',
      webViewerUrl: 'https://excel-practice-online.com/wp-content/uploads/2019/11/sum.gif',
    },
  },
  COUNT: {
    id: 'COUNT',
    name: 'COUNT',
    arabicName: 'دالة حساب عدد الخلايا',
    category: 'MATH',
    categoryArabic: 'الدوال الحسابية',
    shortDescription: 'حساب عدد الخلايا التي تحتوي على أرقام فقط داخل نطاق محدد.',
    fullDescription: 'تستخدم هذه الدالة لحساب عدد الخلايا التي تحتوي على أرقام فقط داخل نطاق محدد، وتتجاهل النصوص والخلايا الفارغة.',
    syntax: '=COUNT(value1, [value2], ...)',
    steps: [
      {
        title: 'الخطوة الأولى',
        description: 'اختر الخلية التي تريد إظهار عدد الأرقام بها واكتب علامة (=)',
        image: 'https://www.w3schools.com/excel/count2.png',
      },
      {
        title: 'الخطوة الثانية',
        description: 'اكتب COUNT وافتح قوساً ثم حدد نطاق الخلايا التي تريد عد الأرقام بداخلها.',
        image: 'https://www.w3schools.com/excel/count3.png',
      },
      {
        title: 'الخطوة الثالثة',
        description: 'أغلق القوس واضغط Enter لمعرفة عدد الخلايا الرقمية.',
        image: 'https://www.w3schools.com/excel/count4.png',
      },
    ],
    practice: {
      instruction: 'جرب الدالة لعد الموظفين الحاصلين على رواتب أو المنتجات المسعرة.',
      sampleData: '15, 25, "نص", 35, 45',
      defaultFormula: '=COUNT(15, 25, 35, 45)',
      expectedResult: '4',
      webViewerUrl: 'https://excel-practice-online.com/wp-content/uploads/2019/11/count.gif',
    },
  },
  AVERAGE: {
    id: 'AVERAGE',
    name: 'AVERAGE',
    arabicName: 'دالة المتوسط الحسابي',
    category: 'MATH',
    categoryArabic: 'الدوال الحسابية',
    shortDescription: 'حساب متوسط مجموعة من الأرقام وقسمتها تلقائياً على عددها.',
    fullDescription: 'تستخدم هذه الدالة لحساب متوسط مجموعة من الأرقام، حيث تجمع القيم وتقسمها تلقائياً على عددها للحصول على المعدل العام.',
    syntax: '=AVERAGE(number1, [number2], ...)',
    steps: [
      {
        title: 'الخطوة الأولى',
        description: 'حدد الخلية التي ترغب في ظهور المتوسط الحسابي بها واكتب علامة (=)',
        image: 'https://www.w3schools.com/excel/average3.png',
      },
      {
        title: 'الخطوة الثانية',
        description: 'اكتب AVERAGE ثم افتح قوساً وحدد نطاق الخلايا المراد حساب متوسطها.',
        image: 'https://www.w3schools.com/excel/average4.png',
      },
      {
        title: 'الخطوة الثالثة',
        description: 'اضغط Enter لحفظ الدالة وعرض معدل القيم مباشرة.',
        image: 'https://www.w3schools.com/excel/average5.png',
      },
    ],
    practice: {
      instruction: 'جرب حساب متوسط درجات الفصل أو متوسط درجات الحرارة.',
      sampleData: '70, 80, 90',
      defaultFormula: '=AVERAGE(70, 80, 90)',
      expectedResult: '80',
      webViewerUrl: 'https://excel-practice-online.com/wp-content/uploads/2019/11/lP1raiz3R3.gif',
    },
  },
  MAX: {
    id: 'MAX',
    name: 'MAX',
    arabicName: 'دالة إيجاد أكبر قيمة',
    category: 'MATH',
    categoryArabic: 'الدوال الحسابية',
    shortDescription: 'البحث في مجموعة أرقام واستخراج أعلى وأكبر قيمة بينها.',
    fullDescription: 'تستخدم هذه الدالة للبحث في مجموعة من الأرقام وإعطائك أكبر رقم موجود بينها (مثل أعلى راتب أو أعلى درجة طالب).',
    syntax: '=MAX(number1, [number2], ...)',
    steps: [
      {
        title: 'الخطوة الأولى',
        description: 'اضغط على الخلية التي تريد إظهار النتيجة بها واكتب علامة (=) متبوعة باسم الدالة MAX.',
        image: 'https://www.w3schools.com/excel/max1.png',
      },
      {
        title: 'الخطوة الثانية',
        description: 'قم بتحديد كافة الخلايا التي تحتوي على الأرقام التي تريد مقارنتها والبحث عن أكبرها.',
        image: 'https://www.w3schools.com/excel/max1.png',
      },
      {
        title: 'الخطوة الثالثة',
        description: 'أغلق القوس واضغط Enter. سيقوم الإكسيل فوراً بالتقاط أكبر رقم في القائمة وعرضه لك.',
        image: 'https://www.w3schools.com/excel/max1.png',
      },
    ],
    practice: {
      instruction: 'جرب الدالة لاستخراج أعلى درجة اختبار.',
      sampleData: '55, 92, 84, 76, 99',
      defaultFormula: '=MAX(55, 92, 84, 76, 99)',
      expectedResult: '99',
      webViewerUrl: 'https://excel-practice-online.com/wp-content/uploads/2019/11/MAX.gif',
    },
  },
  IF: {
    id: 'IF',
    name: 'IF',
    arabicName: 'دالة الشرط البسيط',
    category: 'LOGIC',
    categoryArabic: 'الدوال المنطقية',
    shortDescription: 'اختبار شرط معين وإظهار نتيجة بناءً على تحققه أو عدم تحققه.',
    fullDescription: 'تستخدم دالة IF للتحقق من شرط معين؛ فإذا تحقق الشرط ترجع قيمة محددة، وإذا لم يتحقق ترجع قيمة أخرى بديلة.',
    syntax: '=IF(logical_test, [value_if_true], [value_if_false])',
    steps: [
      {
        title: 'الخطوة الأولى',
        description: 'اكتب =IF( ثم حدد الشرط المنطقي المطلوب اختباره (مثلاً A1 >= 50).',
        image: 'https://www.w3schools.com/excel/img_excel_if_grass1.png',
      },
      {
        title: 'الخطوة الثانية',
        description: 'ضع فاصلة واكتب النتيجة في حال تحقق الشرط بين علامتي تنصيص (مثلاً "ناجح").',
        image: 'https://www.w3schools.com/excel/img_excel_if_grass4.png',
      },
      {
        title: 'الخطوة الثالثة',
        description: 'ضع فاصلة أخرى واكتب النتيجة في حال عدم تحققه (مثلاً "راسب") ثم أغلق القوس واضغط Enter.',
        image: 'https://www.w3schools.com/excel/img_excel_if_grass5.png',
      },
    ],
    practice: {
      instruction: 'جرب اختبار نجاح طالب حصل على 75 درجة (درجة النجاح 50).',
      sampleData: 'الدرجة = 75',
      defaultFormula: '=IF(75>=50, "ناجح", "راسب")',
      expectedResult: 'ناجح',
      webViewerUrl: 'https://excel-practice-online.com/wp-content/uploads/2019/11/if.gif',
    },
  },
  IFS: {
    id: 'IFS',
    name: 'IFS',
    arabicName: 'دالة الشروط المتعددة',
    category: 'LOGIC',
    categoryArabic: 'الدوال المنطقية',
    shortDescription: 'التحقق من عدة شروط متتالية وإعطاء نتيجة خاصة لكل شرط يتحقق.',
    fullDescription: 'تستخدم هذه الدالة للتحقق من عدة شروط في وقت واحد وإعطاء نتيجة لكل شرط، وهي البديل الأسهل لدوال IF المتداخلة المعقدة.',
    syntax: '=IFS(logical_test1, value_if_true1, [logical_test2, value_if_true2], ...)',
    steps: [
      {
        title: 'الخطوة الأولى',
        description: 'اكتب =IFS( ثم ابدأ بالشرط الأول ونتيجته، ثم الشرط الثاني ونتيجته (مثال: A1>=90, "ممتاز").',
        image: 'https://www.w3schools.com/excel/img_excel_ifs.png',
      },
      {
        title: 'الخطوة الثانية',
        description: 'استمر في إضافة الشروط والنتائج بنفس الترتيب، مع وضع النصوص بين علامتي تنصيص.',
        image: 'https://www.w3schools.com/excel/img_excel_ifs3.png',
      },
      {
        title: 'الخطوة الثالثة',
        description: 'اضغط Enter. سيفحص الإكسيل الخلية ويعطيك التقدير المناسب للشرط الذي تحقق أولاً.',
        image: 'https://www.w3schools.com/excel/img_excel_ifs5.png',
      },
    ],
    practice: {
      instruction: 'جرب تحديد تقدير طالب درجته 85 (ممتاز >= 90، جيد جداً >= 80).',
      sampleData: 'الدرجة = 85',
      defaultFormula: '=IFS(85>=90, "ممتاز", 85>=80, "جيد جداً")',
      expectedResult: 'جيد جداً',
      webViewerUrl: 'https://cdn.educba.com/academy/wp-content/uploads/2019/01/Multiple-IFS-Example-2.png',
    },
  },
  AND: {
    id: 'AND',
    name: 'AND',
    arabicName: 'دالة التحقق المشترك',
    category: 'LOGIC',
    categoryArabic: 'الدوال المنطقية',
    shortDescription: 'إرجاع TRUE فقط إذا تحققت كافة الشروط المحددة معاً.',
    fullDescription: 'تستخدم هذه الدالة للتحقق من عدة شروط في وقت واحد، وتكون النتيجة TRUE فقط إذا انطبقت كافة الشروط، بينما تعطي FALSE إذا اختل شرط واحد.',
    syntax: '=AND(logical1, [logical2], ...)',
    steps: [
      {
        title: 'الخطوة الأولى',
        description: 'اكتب =AND( ثم ابدأ بوضع شروطك يفصل بينها فاصلة (مثال: A1>50, B1>50).',
        image: 'https://www.w3schools.com/excel/img_excel_and2.png',
      },
      {
        title: 'الخطوة الثانية',
        description: 'أغلق القوس بعد الانتهاء من إضافة كافة الشروط التي تريد اختبارها.',
        image: 'https://www.w3schools.com/excel/img_excel_and3.png',
      },
      {
        title: 'الخطوة الثالثة',
        description: 'اضغط Enter. إذا ظهر TRUE فجميع الشروط انطبقت، وإذا ظهر FALSE فهناك شرط لم يتحقق.',
        image: 'https://www.w3schools.com/excel/img_excel_and5.png',
      },
    ],
    practice: {
      instruction: 'جرب اختبار ما إذا كان الطالب ناجحاً في المادتين (درجة 60 و 75).',
      sampleData: 'مادة 1 = 60, مادة 2 = 75',
      defaultFormula: '=AND(60>=50, 75>=50)',
      expectedResult: 'TRUE',
      webViewerUrl: 'https://excel-practice-online.com/wp-content/uploads/2020/10/and_or_if.gif',
    },
  },
  MATCH: {
    id: 'MATCH',
    name: 'MATCH',
    arabicName: 'دالة تحديد الموقع',
    category: 'LOOKUP',
    categoryArabic: 'الدوال البحثية',
    shortDescription: 'البحث عن قيمة داخل نطاق وإرجاع رقم موضعها وترتيبها.',
    fullDescription: 'تبحث هذه الدالة عن قيمة معينة داخل نطاق أو صف أو عمود، وترجع رقم ترتيب موقع هذه القيمة داخل النطاق وليس القيمة نفسها.',
    syntax: '=MATCH(lookup_value, lookup_array, [match_type])',
    steps: [
      {
        title: 'الخطوة الأولى',
        description: 'اكتب =MATCH( ثم حدد القيمة المراد البحث عن موضعها (lookup_value).',
        image: 'https://www.w3schools.com/excel/vlookup_col.png',
      },
      {
        title: 'الخطوة الثانية',
        description: 'حدد نطاق الصف أو العمود الذي تبحث بداخله (lookup_array).',
        image: 'https://www.w3schools.com/excel/vlookup7.png',
      },
      {
        title: 'الخطوة الثالثة',
        description: 'اكتب 0 للمطابقة التامة، أغلق القوس واضغط Enter لمعرفة رقم الصف أو العمود.',
        image: 'https://www.w3schools.com/excel/vlookup10.png',
      },
    ],
    practice: {
      instruction: 'جرب البحث عن ترتيب كلمة "تفاح" في قائمة الفواكه (موز، تفاح، برتقال).',
      sampleData: 'القائمة: ["موز", "تفاح", "برتقال"]',
      defaultFormula: '=MATCH("تفاح", {"موز", "تفاح", "برتقال"}, 0)',
      expectedResult: '2',
      webViewerUrl: 'https://excel-practice-online.com/wp-content/uploads/2019/11/Vlookup.gif',
    },
  },
  VLOOKUP: {
    id: 'VLOOKUP',
    name: 'VLOOKUP',
    arabicName: 'دالة البحث الرأسي',
    category: 'LOOKUP',
    categoryArabic: 'الدوال البحثية',
    shortDescription: 'البحث عن قيمة في العمود الأول واسترجاع بيانات مقابلة لها من عمود آخر.',
    fullDescription: 'تستخدم للبحث عن قيمة في العمود الأول من جدول معين، ثم جلب معلومة مقابلة لها في نفس الصف من عمود آخر (مثل استرجاع سعر منتج بواسطة كوده).',
    syntax: '=VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])',
    steps: [
      {
        title: 'الخطوة الأولى',
        description: 'اكتب =VLOOKUP( ثم حدد الخلية التي تحتوي على القيمة التي تبحث عنها (مثلاً كود الموظف).',
        image: 'https://www.w3schools.com/excel/vlookup_col.png',
      },
      {
        title: 'الخطوة الثانية',
        description: 'حدد الجدول كاملاً، ثم اكتب رقم العمود الذي يحتوي على المعلومة المطلوبة جلبها (مثلاً 2 للاسم).',
        image: 'https://www.w3schools.com/excel/vlookup7.png',
      },
      {
        title: 'الخطوة الثالثة',
        description: 'اكتب FALSE لضمان التطابق التام، ثم أغلق القوس واضغط Enter لعرض النتيجة فوراً.',
        image: 'https://www.w3schools.com/excel/vlookup10.png',
      },
    ],
    practice: {
      instruction: 'جرب استرجاع اسم الطالب صاحب المعرف 102 من جدول الطلاب.',
      sampleData: 'جدول: {101: "أحمد", 102: "سارة", 103: "خالد"}',
      defaultFormula: '=VLOOKUP(102, جدول_الطلاب, 2, FALSE)',
      expectedResult: 'سارة',
      webViewerUrl: 'https://excel-practice-online.com/wp-content/uploads/2019/11/Vlookup.gif',
    },
  },
  CONCAT: {
    id: 'CONCAT',
    name: 'CONCAT',
    arabicName: 'دالة دمج النصوص',
    category: 'TEXT',
    categoryArabic: 'الدوال النصية',
    shortDescription: 'ربط النصوص والكلمات الموجودة في خلايا متفرقة داخل خلية واحدة.',
    fullDescription: 'تستخدم هذه الدالة لربط النصوص الموجودة في عدة خلايا مختلفة ودمجها معاً في خلية واحدة (مثل دمج الاسم الأول مع اسم العائلة للحصول على الاسم الكامل).',
    syntax: '=CONCAT(text1, [text2], ...)',
    steps: [
      {
        title: 'الخطوة الأولى',
        description: 'اكتب =CONCAT( ثم حدد الخلية الأولى التي تحتوي على بداية النص (مثلاً الاسم الأول).',
        image: 'https://www.w3schools.com/excel/img_excel_concat1.png',
      },
      {
        title: 'الخطوة الثانية',
        description: 'ضع فاصلة، وإذا أردت مسافة اكتب " " ثم فاصلة، وحدد الخلية الثانية (اسم العائلة).',
        image: 'https://www.w3schools.com/excel/img_excel_concat2.png',
      },
      {
        title: 'الخطوة الثالثة',
        description: 'أغلق القوس واضغط Enter لترى الاسمين مدمجين معاً بسلاسة.',
        image: 'https://www.w3schools.com/excel/img_excel_concat3.png',
      },
    ],
    practice: {
      instruction: 'جرب دمج الاسم الأول "محمد" مع اسم العائلة "علي" بفاصل مسافة.',
      sampleData: 'النص 1: "محمد", النص 2: "علي"',
      defaultFormula: '=CONCAT("محمد", " ", "علي")',
      expectedResult: 'محمد علي',
      webViewerUrl: 'https://www.excelcampus.com/wp-content/uploads/2016/03/CONCAT-Function-Excel-Tutorial.gif',
    },
  },
  TRIM: {
    id: 'TRIM',
    name: 'TRIM',
    arabicName: 'دالة تنظيف المسافات',
    category: 'TEXT',
    categoryArabic: 'الدوال النصية',
    shortDescription: 'إزالة كافة المسافات الزائدة من النص وترك مسافة واحدة بين الكلمات.',
    fullDescription: 'تستخدم هذه الدالة لإزالة كافة المسافات الزائدة من النص، مع ترك مسافة واحدة طبيعية فقط بين الكلمات لتنظيف البيانات المنسوخة أو المجلوبة.',
    syntax: '=TRIM(text)',
    steps: [
      {
        title: 'الخطوة الأولى',
        description: 'اضغط على الخلية المطلوبة واكتب =TRIM( ثم حدد الخلية التي تحتوي على المسافات الزائدة.',
        image: 'https://www.w3schools.com/excel/img_excel_trim1.png',
      },
      {
        title: 'الخطوة الثانية',
        description: 'أغلق القوس مباشرة؛ الدالة بسيطة جداً ولا تحتاج لأي معطيات إضافية.',
        image: 'https://www.w3schools.com/excel/img_excel_trim2.png',
      },
      {
        title: 'الخطوة الثالثة',
        description: 'اضغط Enter، ستلاحظ أن النص أصبح منسقاً ومنظفاً تماماً من المسافات العشوائية.',
        image: 'https://www.w3schools.com/excel/img_excel_trim3.png',
      },
    ],
    practice: {
      instruction: 'جرب تنظيف النص الذي يحتوي على فراغات في البداية والنهاية: "  إكسيل رائع   "',
      sampleData: '"  إكسيل رائع   "',
      defaultFormula: '=TRIM("  إكسيل رائع   ")',
      expectedResult: 'إكسيل رائع',
      webViewerUrl: 'https://excel-practice-online.com/wp-content/uploads/2020/10/trim.gif',
    },
  },
  LOWER: {
    id: 'LOWER',
    name: 'LOWER',
    arabicName: 'دالة تصغير الحروف',
    category: 'TEXT',
    categoryArabic: 'الدوال النصية',
    shortDescription: 'تحويل الحروف الإنجليزية إلى أحرف صغيرة (lowercase).',
    fullDescription: 'تستخدم هذه الدالة لتحويل كل الحروف الإنجليزية الموجودة في النص إلى حروف صغيرة (lowercase) لتوحيد تنسيق البريد الإلكتروني أو المعرفات.',
    syntax: '=LOWER(text)',
    steps: [
      {
        title: 'الخطوة الأولى',
        description: 'اكتب علامة التساوي ثم اسم الدالة وافتح قوساً: =LOWER( ثم اختر الخلية المطلوبة.',
        image: 'https://www.w3schools.com/excel/img_excel_lower1.png',
      },
      {
        title: 'الخطوة الثانية',
        description: 'أغلق القوس ) دون أي إضافات.',
        image: 'https://www.w3schools.com/excel/img_excel_lower2.png',
      },
      {
        title: 'الخطوة الثالثة',
        description: 'اضغط Enter، ستلاحظ تحول كافة الحروف فوراً إلى أحرف صغيرة بشكل منتظم.',
        image: 'https://www.w3schools.com/excel/img_excel_concat3.png',
      },
    ],
    practice: {
      instruction: 'جرب تحويل النص "EXCEL HUB" إلى أحرف صغيرة.',
      sampleData: '"EXCEL HUB"',
      defaultFormula: '=LOWER("EXCEL HUB")',
      expectedResult: 'excel hub',
      webViewerUrl: 'https://excel-practice-online.com/wp-content/uploads/2020/11/lower-upper-proper.gif',
    },
  },
};

/**
 * Quiz Questions
 */
export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  functionTarget: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'أي دالة تستخدم لجمع نطاق واسع من الخلايا الرقمية تلقائياً في Excel؟',
    options: ['COUNT', 'SUM', 'AVERAGE', 'MATCH'],
    correctIndex: 1,
    explanation: 'دالة SUM هي الدالة المخصصة لجمع الأرقام وحساب الإجمالي.',
    functionTarget: 'SUM',
  },
  {
    id: 2,
    question: 'أي دالة تستخدم لاستخراج أعلى وأكبر درجة في اختبار الطلاب؟',
    options: ['MAX', 'AVERAGE', 'COUNT', 'VLOOKUP'],
    correctIndex: 0,
    explanation: 'دالة MAX تبحث في نطاق الأرقام وترجع أكبر قيمة بينها.',
    functionTarget: 'MAX',
  },
  {
    id: 3,
    question: 'إذا أردت فحص شرط "هل درجة الطالب أكبر من أو تساوي 50 لإظهار ناجح أو راسب"، فما هي الدالة الأنسب؟',
    options: ['AND', 'IF', 'VLOOKUP', 'TRIM'],
    correctIndex: 1,
    explanation: 'دالة IF تفحص شرطاً وترجع نتيجة في حالة تحققه ونتيجة أخرى عند عدم تحققه.',
    functionTarget: 'IF',
  },
  {
    id: 4,
    question: 'ما هي الدالة التي تبحث عن كود موظف في العمود الأول وتسترجع اسمه من عمود مجاور؟',
    options: ['CONCAT', 'MATCH', 'VLOOKUP', 'COUNT'],
    correctIndex: 2,
    explanation: 'دالة VLOOKUP مخصصة للبحث الرأسي في العمود الأول وجلب البيانات المقابلة له.',
    functionTarget: 'VLOOKUP',
  },
  {
    id: 5,
    question: 'ما الدالة المستخدمة لحذف المسافات العشوائية الزائدة وترك مسافة واحدة بين الكلمات؟',
    options: ['TRIM', 'LOWER', 'CONCAT', 'IFS'],
    correctIndex: 0,
    explanation: 'دالة TRIM تزيل المسافات الزائدة من البداية والنهاية وبين الكلمات.',
    functionTarget: 'TRIM',
  },
];

/**
 * Pure helper functions for search, filter, and formula simulation
 */
export function searchFunctions(query: string): ExcelFunction[] {
  const q = query.trim().toUpperCase();
  if (!q) return Object.values(EXCEL_FUNCTIONS);
  
  return Object.values(EXCEL_FUNCTIONS).filter((fn) => {
    return (
      fn.name.toUpperCase().includes(q) ||
      fn.arabicName.includes(query.trim()) ||
      fn.shortDescription.includes(query.trim()) ||
      fn.categoryArabic.includes(query.trim())
    );
  });
}

export function evaluateFormulaDemo(fnName: string, input: string): string {
  const cleanFn = fnName.toUpperCase().trim();
  switch (cleanFn) {
    case 'SUM': {
      const nums = input.split(',').map((s) => parseFloat(s.trim())).filter((n) => !isNaN(n));
      const total = nums.reduce((acc, curr) => acc + curr, 0);
      return total.toString();
    }
    case 'COUNT': {
      const items = input.split(',').map((s) => s.trim());
      const numCount = items.filter((s) => s !== '' && !isNaN(Number(s))).length;
      return numCount.toString();
    }
    case 'AVERAGE': {
      const nums = input.split(',').map((s) => parseFloat(s.trim())).filter((n) => !isNaN(n));
      if (nums.length === 0) return '0';
      const avg = nums.reduce((acc, curr) => acc + curr, 0) / nums.length;
      return (Math.round(avg * 100) / 100).toString();
    }
    case 'MAX': {
      const nums = input.split(',').map((s) => parseFloat(s.trim())).filter((n) => !isNaN(n));
      if (nums.length === 0) return '0';
      return Math.max(...nums).toString();
    }
    case 'CONCAT': {
      const parts = input.split(',').map((s) => s.trim().replace(/^["']|["']$/g, ''));
      return parts.join(' ');
    }
    case 'TRIM': {
      return input.replace(/^["']|["']$/g, '').trim().replace(/\s+/g, ' ');
    }
    case 'LOWER': {
      return input.replace(/^["']|["']$/g, '').toLowerCase();
    }
    case 'AND': {
      // Evaluate comma-separated numbers > 50
      const nums = input.split(',').map((s) => parseFloat(s.trim())).filter((n) => !isNaN(n));
      const allPass = nums.every((n) => n >= 50);
      return allPass ? 'TRUE' : 'FALSE';
    }
    case 'IF': {
      const val = parseFloat(input.trim());
      if (isNaN(val)) return 'ناجح';
      return val >= 50 ? 'ناجح' : 'راسب';
    }
    default:
      return 'تطبيق سليم ✔';
  }
}
