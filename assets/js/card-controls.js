// Card Controls JavaScript - Simple Card Size Control
// This file provides simple control over card sizes without intrusive UI

class SimpleCardController {
    constructor() {
        this.galleryItems = document.querySelectorAll('.gallery-item');
        this.init();
    }

    init() {
        // لا تظهر أي لوحة تحكم - فقط وظائف مساعدة
        console.log('Card Controls loaded - Use CSS classes to control card sizes');
    }

    // دالة لتطبيق حجم معين على جميع الكروت
    applySizeToAll(size) {
        this.galleryItems.forEach(item => {
            // إزالة جميع أحجام الكروت
            item.classList.remove('card-size-compact', 'card-size-small', 'card-size-medium', 'card-size-large');
            // إضافة الحجم المطلوب
            item.classList.add(`card-size-${size}`);
        });
        console.log(`Applied ${size} size to all cards`);
    }

    // دالة لتطبيق نمط معين على جميع الكروت
    applyStyleToAll(style) {
        this.galleryItems.forEach(item => {
            // إزالة جميع أنماط الكروت
            item.classList.remove('card-style-modern', 'card-style-classic', 'card-style-minimal', 'card-style-rounded');
            // إضافة النمط المطلوب
            item.classList.add(`card-style-${style}`);
        });
        console.log(`Applied ${style} style to all cards`);
    }

    // دالة لتطبيق تأثير تحويم معين على جميع الكروت
    applyHoverToAll(hover) {
        this.galleryItems.forEach(item => {
            // إزالة جميع تأثيرات التحويم
            item.classList.remove('card-hover-subtle', 'card-hover-medium', 'card-hover-dramatic');
            // إضافة التأثير المطلوب
            item.classList.add(`card-hover-${hover}`);
        });
        console.log(`Applied ${hover} hover effect to all cards`);
    }

    // دالة لتطبيق أبعاد مخصصة
    applyCustomDimensions(height, imageHeight) {
        this.galleryItems.forEach(item => {
            item.style.setProperty('--card-height', height + 'px');
            item.style.setProperty('--image-height', imageHeight + 'px');
        });
        console.log(`Applied custom dimensions: ${height}px height, ${imageHeight}px image height`);
    }

    // دالة لإعادة تعيين جميع الكروت إلى الحجم الافتراضي
    resetToDefault() {
        this.galleryItems.forEach(item => {
            // إزالة جميع الكلاسات المخصصة
            item.classList.remove(
                'card-size-compact', 'card-size-small', 'card-size-medium', 'card-size-large',
                'card-style-modern', 'card-style-classic', 'card-style-minimal', 'card-style-rounded',
                'card-hover-subtle', 'card-hover-medium', 'card-hover-dramatic'
            );
            // إعادة تعيين الأبعاد المخصصة
            item.style.removeProperty('--card-height');
            item.style.removeProperty('--image-height');
        });
        console.log('Reset all cards to default settings');
    }

    // دالة لعرض معلومات الكروت الحالية
    getCurrentSettings() {
        const firstItem = this.galleryItems[0];
        if (firstItem) {
            const size = this.getAppliedClass(firstItem, 'card-size-');
            const style = this.getAppliedClass(firstItem, 'card-style-');
            const hover = this.getAppliedClass(firstItem, 'card-hover-');
            
            console.log('Current card settings:', {
                size: size || 'default',
                style: style || 'default',
                hover: hover || 'default',
                customHeight: firstItem.style.getPropertyValue('--card-height') || 'default',
                customImageHeight: firstItem.style.getPropertyValue('--image-height') || 'default'
            });
        }
    }

    // دالة مساعدة للحصول على الكلاس المطبق
    getAppliedClass(element, prefix) {
        for (let className of element.classList) {
            if (className.startsWith(prefix)) {
                return className.replace(prefix, '');
            }
        }
        return null;
    }
}

// تهيئة المتحكم عند تحميل الصفحة
let cardController;

document.addEventListener('DOMContentLoaded', function() {
    cardController = new SimpleCardController();
    
    // إضافة أوامر للتحكم من وحدة التحكم (Console)
    window.cardControls = {
        // تطبيق أحجام
        setSize: (size) => cardController.applySizeToAll(size),
        setStyle: (style) => cardController.applyStyleToAll(style),
        setHover: (hover) => cardController.applyHoverToAll(hover),
        setCustom: (height, imageHeight) => cardController.applyCustomDimensions(height, imageHeight),
        reset: () => cardController.resetToDefault(),
        info: () => cardController.getCurrentSettings()
    };
    
    console.log(`
🎨 Card Controls Loaded!

Available commands:
- cardControls.setSize('compact|small|medium|large')
- cardControls.setStyle('modern|classic|minimal|rounded')
- cardControls.setHover('subtle|medium|dramatic')
- cardControls.setCustom(height, imageHeight)
- cardControls.reset()
- cardControls.info()

Examples:
- cardControls.setSize('large')
- cardControls.setStyle('modern')
- cardControls.setCustom(700, 500)
    `);
});

// تصدير للاستخدام في ملفات أخرى
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SimpleCardController;
} 