/**
 * خدمة ترجمة صفحات طلب الخدمات (تصميم داخلي، خارجي، حدائق)
 * يدعم العربية والإنجليزية
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'serviceFormLang';

  var t = {
    en: {
      interiorTitle: 'Interior Design Request',
      exteriorTitle: 'Exterior Design Request',
      landscapeTitle: 'Landscape Design Request',
      fullName: 'Full Name',
      fullNamePlaceholder: 'Your full name',
      phone: 'Phone Number',
      phonePlaceholder: 'Your phone number',
      location: 'Location',
      locationPlaceholder: 'City / Area',
      constructionStatus: 'Construction Status',
      selectStatus: 'Select status',
      emptyLand: 'Empty Land',
      renovation: 'Renovation',
      fromScratch: 'From Scratch',
      structureOnly: 'Concrete Structure (عظم)',
      approxArea: 'Approximate Area (m²)',
      areaPlaceholder: 'e.g. 150',
      projectType: 'Project Type',
      selectType: 'Select type',
      residential: 'Residential',
      commercial: 'Commercial',
      additionalNotes: 'Additional Notes',
      notesPlaceholder: 'Any additional information...',
      submitRequest: 'Submit Request',
      langAr: 'العربية',
      langEn: 'English'
    },
    ar: {
      interiorTitle: 'طلب تصميم داخلي',
      exteriorTitle: 'طلب تصميم خارجي',
      landscapeTitle: 'طلب تصميم حدائق',
      fullName: 'الاسم الكامل',
      fullNamePlaceholder: 'الاسم الكامل',
      phone: 'رقم الهاتف',
      phonePlaceholder: 'رقم هاتفك',
      location: 'الموقع',
      locationPlaceholder: 'المدينة / المنطقة',
      constructionStatus: 'حالة البناء',
      selectStatus: 'اختر الحالة',
      emptyLand: 'أرض فاضية',
      renovation: 'تجديد',
      fromScratch: 'من الصفر',
      structureOnly: 'هيكل خرساني (عظم)',
      approxArea: 'المساحة التقريبية (م²)',
      areaPlaceholder: 'مثل 150',
      projectType: 'نوع المشروع',
      selectType: 'اختر النوع',
      residential: 'سكني',
      commercial: 'تجاري',
      additionalNotes: 'ملاحظات إضافية',
      notesPlaceholder: 'أي معلومات إضافية...',
      submitRequest: 'إرسال الطلب',
      langAr: 'العربية',
      langEn: 'English'
    }
  };

  function getLang() {
    var stored = localStorage.getItem(STORAGE_KEY);
    return stored === 'ar' ? 'ar' : 'en';
  }

  function setLang(lang) {
    localStorage.setItem(STORAGE_KEY, lang);
  }

  function getPageType() {
    var path = (window.location.pathname || window.location.href || '').toLowerCase();
    if (path.indexOf('exterior') !== -1) return 'exterior';
    if (path.indexOf('landscape') !== -1) return 'landscape';
    return 'interior';
  }

  function applyTranslations(lang) {
    var L = t[lang] || t.en;
    var page = getPageType();

    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

    var titleKey = page + 'Title';
    var h1 = document.querySelector('h1');
    if (h1 && L[titleKey]) h1.textContent = L[titleKey];

    var map = {
      'i18n-name-label': L.fullName,
      'i18n-name-ph': L.fullNamePlaceholder,
      'i18n-phone-label': L.phone,
      'i18n-phone-ph': L.phonePlaceholder,
      'i18n-location-label': L.location,
      'i18n-location-ph': L.locationPlaceholder,
      'i18n-status-label': L.constructionStatus,
      'i18n-status-ph': L.selectStatus,
      'i18n-area-label': L.approxArea,
      'i18n-area-ph': L.areaPlaceholder,
      'i18n-type-label': L.projectType,
      'i18n-type-ph': L.selectType,
      'i18n-notes-label': L.additionalNotes,
      'i18n-notes-ph': L.notesPlaceholder,
      'i18n-submit': L.submitRequest
    };

    Object.keys(map).forEach(function (key) {
      var el = document.querySelector('[data-i18n="' + key + '"]');
      if (!el) return;
      var tag = (el.tagName || '').toUpperCase();
      if ((key === 'i18n-name-ph' || key === 'i18n-phone-ph' || key === 'i18n-location-ph' || key === 'i18n-area-ph' || key === 'i18n-notes-ph') && (tag === 'INPUT' || tag === 'TEXTAREA')) {
        el.placeholder = map[key];
      } else {
        el.textContent = map[key];
      }
    });

    var optEmpty = document.querySelector('option[value="empty-land"]');
    var optReno = document.querySelector('option[value="renovation"]');
    var optScratch = document.querySelector('option[value="from-scratch"]');
    var optStruct = document.querySelector('option[value="structure-only"]');
    var optRes = document.querySelector('option[value="residential"]');
    var optComm = document.querySelector('option[value="commercial"]');
    if (optEmpty) optEmpty.textContent = L.emptyLand;
    if (optReno) optReno.textContent = L.renovation;
    if (optScratch) optScratch.textContent = L.fromScratch;
    if (optStruct) optStruct.textContent = L.structureOnly;
    if (optRes) optRes.textContent = L.residential;
    if (optComm) optComm.textContent = L.commercial;

    var toggle = document.getElementById('lang-toggle');
    if (toggle) toggle.textContent = lang === 'ar' ? L.langEn : L.langAr;
  }

  function init() {
    var lang = getLang();
    applyTranslations(lang);

    var btn = document.getElementById('lang-toggle');
    if (btn) {
      btn.addEventListener('click', function () {
        var newLang = lang === 'ar' ? 'en' : 'ar';
        setLang(newLang);
        lang = newLang;
        applyTranslations(lang);
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
