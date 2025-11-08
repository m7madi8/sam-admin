// ===== RANDOM IMAGES SELECTOR =====
// هذا الملف يقوم باختيار صور عشوائية من كل مجلد للبطاقات

const projectImages = {
  // التصميم الداخلي - فيلا السيد داوود
  "dawoud-villa": [
    "assets/images/interior-photos/تصميم فيلا السيد داوود -اريحا/الطابق الارضي/WhatsApp Image 2024-10-12 at 11.01.55 AM (3).webp",
    "assets/images/interior-photos/تصميم فيلا السيد داوود -اريحا/الطابق الارضي/WhatsApp Image 2024-10-12 at 11.01.56 AM (2).webp",
    "assets/images/interior-photos/تصميم فيلا السيد داوود -اريحا/الطابق الارضي/WhatsApp Image 2024-10-12 at 11.01.57 AM (2).webp",
    "assets/images/interior-photos/تصميم فيلا السيد داوود -اريحا/الطابق الارضي/WhatsApp Image 2024-10-12 at 11.01.58 AM (2).webp",
    "assets/images/interior-photos/تصميم فيلا السيد داوود -اريحا/الطابق الارضي/WhatsApp Image 2024-10-12 at 11.01.59 AM (1).webp"
  ],
  
  // التصميم الداخلي - فيلا السيدة خولة
  "khawla-villa": [
    "assets/images/interior-photos/فيلا السيدة خولة/الطابق الارضي/A.webp",
    "assets/images/interior-photos/فيلا السيدة خولة/الطابق الارضي/B.webp",
    "assets/images/interior-photos/فيلا السيدة خولة/الطابق الارضي/C.webp",
    "assets/images/interior-photos/فيلا السيدة خولة/الطابق الارضي/1.webp",
    "assets/images/interior-photos/فيلا السيدة خولة/الطابق الارضي/2.webp",
    "assets/images/interior-photos/فيلا السيدة خولة/الطابق الارضي/3.webp",
    "assets/images/interior-photos/فيلا السيدة خولة/الطابق الارضي/4.webp"
  ],
  
  // التصميم الداخلي - قصر معين حواره
  "main-palace": [
    "assets/images/interior-photos/قصر معين حواره/الطابق الارضي/WhatsApp Image 2025-02-03 at 1.01.12 PM.webp",
    "assets/images/interior-photos/قصر معين حواره/الطابق الارضي/WhatsApp Image 2025-02-03 at 1.01.14 PM.webp",
    "assets/images/interior-photos/قصر معين حواره/الطابق الاول/WhatsApp Image 2025-02-03 at 1.00.00 PM.webp",
    "assets/images/interior-photos/قصر معين حواره/الطابق الاول/WhatsApp Image 2025-02-03 at 1.00.01 PM.webp"
  ],
  
  // التصميم الداخلي - شقة السيد علي
  "ali-apartment": [
    "assets/images/interior-photos/شقة السيد علي -الطيرة/WhatsApp Image 2024-12-16 at 10.55.19 AM.webp",
    "assets/images/interior-photos/شقة السيد علي -الطيرة/WhatsApp Image 2024-12-16 at 10.55.20 AM (1).webp",
    "assets/images/interior-photos/شقة السيد علي -الطيرة/WhatsApp Image 2024-12-16 at 10.55.20 AM (2).webp"
  ],
  
  // التصميم الداخلي - صالون جميلة
  "jamila-salon": [
    "assets/images/interior-photos/صالون جميلة -الداخل/WhatsApp Image 2025-05-20 at 10.13.17 AM (1).webp",
    "assets/images/interior-photos/صالون جميلة -الداخل/WhatsApp Image 2025-05-20 at 10.13.17 AM.webp",
    "assets/images/interior-photos/صالون جميلة -الداخل/WhatsApp Image 2025-05-20 at 10.13.18 AM.webp"
  ],
  
  // التصميم الداخلي - محل flavor
  "flavor-shop": [
    "assets/images/interior-photos/محل flavor/WhatsApp Image 2024-07-13 at 4.11.26 PM (1).jpeg",
    "assets/images/interior-photos/محل flavor/WhatsApp Image 2024-07-13 at 4.11.26 PM (10).jpeg",
    "assets/images/interior-photos/محل flavor/WhatsApp Image 2024-07-13 at 4.11.26 PM (11).jpeg"
  ],
  
  // التصميم الداخلي - محل المجوهرات
  "jewelry-shop": [
    "assets/images/interior-photos/محل المجوهرات -رام الله/11.jpg",
    "assets/images/interior-photos/محل المجوهرات -رام الله/14.jpg",
    "assets/images/interior-photos/محل المجوهرات -رام الله/15.jpg"
  ],
  
  // التصميم الداخلي - محل فساتين السيدة رولا
  "rula-dresses": [
    "assets/images/interior-photos/محل فساتين السيدة رولا -رام الله/WhatsApp Image 2025-05-05 at 10.59.59 AM.jpeg",
    "assets/images/interior-photos/محل فساتين السيدة رولا -رام الله/WhatsApp Image 2025-05-05 at 11.00.00 AM (1).jpeg",
    "assets/images/interior-photos/محل فساتين السيدة رولا -رام الله/WhatsApp Image 2025-05-05 at 11.00.00 AM (2).jpeg"
  ],
  
  // التصميم الداخلي - مطعم perfeito
  "perfeito-restaurant": [
    "assets/images/interior-photos/مطعم perfeito -يقع برام الله/WhatsApp Image 2025-06-23 at 3.37.17 PM (1).jpeg",
    "assets/images/interior-photos/مطعم perfeito -يقع برام الله/WhatsApp Image 2025-06-23 at 3.37.17 PM (2).jpeg",
    "assets/images/interior-photos/مطعم perfeito -يقع برام الله/WhatsApp Image 2025-06-23 at 3.37.17 PM (3).jpeg"
  ],
  
  // التصميم الخارجي
  "exterior-design": [
    "assets/images/exterior-photos/Ex7.webp",
    "assets/images/exterior-photos/Ex8.webp",
    "assets/images/exterior-photos/Ex9.webp",
    "assets/images/exterior-photos/Ex10.webp",
    "assets/images/exterior-photos/Ex11.webp",
    "assets/images/exterior-photos/Ex12.webp",
    "assets/images/exterior-photos/Ex13.webp",
    "assets/images/exterior-photos/Ex14.webp",
    "assets/images/exterior-photos/Ex15.webp",
    "assets/images/exterior-photos/Ex16.webp",
    "assets/images/exterior-photos/Ex17.webp",
    "assets/images/exterior-photos/Ex18.webp",
    "assets/images/exterior-photos/Ex19.webp",
    "assets/images/exterior-photos/Ex20.webp"
  ],
  
  // تصميم الحدائق - حديقة السيد داوود
  "dawoud-garden": [
    "assets/images/landscape-photos/تصميم الحديقة السيد داوود/la1.jpeg",
    "assets/images/landscape-photos/تصميم الحديقة السيد داوود/la2.jpeg",
    "assets/images/landscape-photos/تصميم الحديقة السيد داوود/la3.jpeg",
    "assets/images/landscape-photos/تصميم الحديقة السيد داوود/WhatsApp Image 2024-08-31 at 11.17.58 AM (1).jpeg",
    "assets/images/landscape-photos/تصميم الحديقة السيد داوود/WhatsApp Image 2024-08-31 at 11.17.58 AM (2).jpeg",
    "assets/images/landscape-photos/تصميم الحديقة السيد داوود/WhatsApp Image 2024-08-31 at 11.17.58 AM (3).jpeg"
  ],
  
  // تصميم الحدائق - حديقة السيدة خولة
  "khawla-garden": [
    "assets/images/landscape-photos/تصميم الحديقة السيدة خولة/00d78dba-2efe-413b-9c8a-913e493d1934.jpg",
    "assets/images/landscape-photos/تصميم الحديقة السيدة خولة/07ab3a92-8c21-4a92-9565-15df7e3ad410.jpg",
    "assets/images/landscape-photos/تصميم الحديقة السيدة خولة/16d47c19-bbeb-4c22-817c-2c70aa232625.jpg"
  ],
  
  // تصميم الحدائق - حديقة السيد سامر
  "samar-garden": [
    "assets/images/landscape-photos/حديقة السيد سامر -بيت دجن/la1.jpeg",
    "assets/images/landscape-photos/حديقة السيد سامر -بيت دجن/la2.jpeg",
    "assets/images/landscape-photos/حديقة السيد سامر -بيت دجن/WhatsApp Image 2025-05-15 at 7.22.21 PM (1).jpeg"
  ],
  
  // تصميم الحدائق - منزل لارا
  "lara-house": [
    "assets/images/landscape-photos/منزل لارا/15e464e7-34ca-4fb3-9380-337e77d0c235.jpg",
    "assets/images/landscape-photos/منزل لارا/1c43dec4-7ab2-4109-a042-e7952354ba1e.jpg",
    "assets/images/landscape-photos/منزل لارا/2524db97-9937-4183-9786-795bbd872070.jpg"
  ]
};

// دالة لاختيار صورة عشوائية من مصفوفة
function getRandomImage(imageArray) {
  if (!imageArray || imageArray.length === 0) {
    return null;
  }
  const randomIndex = Math.floor(Math.random() * imageArray.length);
  return imageArray[randomIndex];
}

// دالة لإنشاء بطاقة مشروع مع صورة عشوائية
function createProjectCard(projectKey, title, description, category) {
  const images = projectImages[projectKey];
  if (!images) {
    console.warn(`No images found for project: ${projectKey}`);
    return null;
  }
  
  const randomImage = getRandomImage(images);
  
  return {
    id: projectKey,
    title: title,
    description: description,
    category: category,
    image: randomImage,
    date: new Date().toLocaleDateString('ar-SA')
  };
}

// دالة لإنشاء جميع البطاقات
function generateAllProjectCards() {
  const projects = [
    // التصميم الداخلي
    createProjectCard("dawoud-villa", "فيلا السيد داوود - أريحا", "تصميم داخلي فاخر لفيلا حديثة في أريحا", "interior"),
    createProjectCard("khawla-villa", "فيلا السيدة خولة", "تصميم داخلي أنيق لفيلا عائلية", "interior"),
    createProjectCard("main-palace", "قصر معين حواره", "تصميم داخلي فاخر لقصر حديث", "interior"),
    createProjectCard("ali-apartment", "شقة السيد علي - الطيرة", "تصميم داخلي عملي لشقة عائلية", "interior"),
    createProjectCard("jamila-salon", "صالون جميلة - الداخل", "تصميم داخلي أنيق لصالون تجميل", "interior"),
    createProjectCard("flavor-shop", "محل Flavor", "تصميم داخلي جذاب لمحل تجاري", "interior"),
    createProjectCard("jewelry-shop", "محل المجوهرات - رام الله", "تصميم داخلي فاخر لمحل مجوهرات", "interior"),
    createProjectCard("rula-dresses", "محل فساتين السيدة رولا", "تصميم داخلي أنيق لمحل أزياء", "interior"),
    createProjectCard("perfeito-restaurant", "مطعم Perfeito - رام الله", "تصميم داخلي دافئ لمطعم", "interior"),
    
    // التصميم الخارجي
    createProjectCard("exterior-design", "تصميم خارجي", "تصميم خارجي حديث للمباني", "exterior"),
    
    // تصميم الحدائق
    createProjectCard("dawoud-garden", "حديقة السيد داوود", "تصميم حديقة خارجية فاخرة", "landscape"),
    createProjectCard("khawla-garden", "حديقة السيدة خولة", "تصميم حديقة عائلية أنيقة", "landscape"),
    createProjectCard("samar-garden", "حديقة السيد سامر - بيت دجن", "تصميم حديقة خارجية حديثة", "landscape"),
    createProjectCard("lara-house", "منزل لارا", "تصميم حديقة خارجية للمنزل", "landscape")
  ];
  
  return projects.filter(project => project !== null);
}

// دالة لإنشاء HTML للبطاقات
function createProjectCardHTML(project) {
  return `
    <div class="project-card" data-category="${project.category}" data-project-id="${project.id}">
      <div class="image-container">
        <img src="${project.image}" alt="${project.title}" loading="lazy">
      </div>
      <div class="content">
        <h3 class="title">${project.title}</h3>
        <div class="meta">
          <span class="category">${getCategoryName(project.category)}</span>
          <span class="date">${project.date}</span>
        </div>
        <p class="description">${project.description}</p>
      </div>
    </div>
  `;
}

// دالة لتحويل رمز الفئة إلى اسم عربي
function getCategoryName(category) {
  const categories = {
    'interior': 'التصميم الداخلي',
    'exterior': 'التصميم الخارجي',
    'landscape': 'تصميم الحدائق'
  };
  return categories[category] || category;
}

// دالة لتحميل البطاقات في الصفحة
function loadProjectCards() {
  const gallery = document.querySelector('.gallery');
  if (!gallery) {
    console.warn('Gallery element not found');
    return;
  }
  
  const projects = generateAllProjectCards();
  
  // تفريغ المعرض
  gallery.innerHTML = '';
  
  // إضافة البطاقات
  projects.forEach(project => {
    const cardHTML = createProjectCardHTML(project);
    gallery.insertAdjacentHTML('beforeend', cardHTML);
  });
  
  // إضافة تأثير الظهور
  setTimeout(() => {
    gallery.classList.add('visible');
  }, 100);
}

// دالة لتصفية البطاقات حسب الفئة
function filterProjects(category) {
  const cards = document.querySelectorAll('.project-card');
  const activeButton = document.querySelector('.services ul li a.active');
  
  // إزالة الفئة النشطة من جميع الأزرار
  document.querySelectorAll('.services ul li a').forEach(btn => {
    btn.classList.remove('active');
  });
  
  // إضافة الفئة النشطة للزر المحدد
  if (activeButton) {
    activeButton.classList.add('active');
  }
  
  cards.forEach(card => {
    if (category === 'all' || card.dataset.category === category) {
      card.style.display = 'block';
      card.style.animation = 'fadeIn 0.5s ease';
    } else {
      card.style.display = 'none';
    }
  });
}

// دالة لإنشاء معرض الصور
function createLightbox() {
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML = `
    <img class="lightbox-img" src="" alt="">
    <span class="close">&times;</span>
    <span class="prev">&#10094;</span>
    <span class="next">&#10095;</span>
  `;
  
  document.body.appendChild(lightbox);
  
  // إضافة مستمعي الأحداث
  const closeBtn = lightbox.querySelector('.close');
  const prevBtn = lightbox.querySelector('.prev');
  const nextBtn = lightbox.querySelector('.next');
  
  closeBtn.addEventListener('click', () => {
    lightbox.classList.remove('active');
  });
  
  // إغلاق المعرض عند النقر خارجه
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove('active');
    }
  });
  
  return lightbox;
}

// دالة لفتح الصورة في المعرض
function openLightbox(imageSrc, imageAlt) {
  const lightbox = document.querySelector('.lightbox') || createLightbox();
  const lightboxImg = lightbox.querySelector('.lightbox-img');
  
  lightboxImg.src = imageSrc;
  lightboxImg.alt = imageAlt;
  lightbox.classList.add('active');
}

// إضافة مستمعي الأحداث عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
  // تحميل البطاقات
  loadProjectCards();
  
  // إضافة مستمعي الأحداث للبطاقات
  document.addEventListener('click', function(e) {
    if (e.target.closest('.project-card')) {
      const card = e.target.closest('.project-card');
      const img = card.querySelector('img');
      if (img) {
        openLightbox(img.src, img.alt);
      }
    }
  });
  
  // إضافة مستمعي الأحداث لأزرار التصفية
  document.addEventListener('click', function(e) {
    if (e.target.matches('.services ul li a')) {
      e.preventDefault();
      const category = e.target.dataset.category || 'all';
      filterProjects(category);
    }
  });
});

// تصدير الدوال للاستخدام الخارجي
window.ProjectGallery = {
  loadProjectCards,
  filterProjects,
  createProjectCard,
  getRandomImage
}; 