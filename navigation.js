// // Navigation and Hamburger Menu Functionality
// // This file provides consistent navigation behavior across all pages

// document.addEventListener('DOMContentLoaded', function() {
//     // Initialize hamburger menu functionality
//     initializeHamburgerMenu();
    
//     // Initialize scroll-triggered navigation
//     initializeScrollNavigation();
    
//     // Initialize mobile menu item click handlers
//     initializeMobileMenuClicks();
// });

// function initializeHamburgerMenu() {
//     const hamburger = document.getElementById("hamburger");
//     const navLinks = document.getElementById("nav-links");
    
//     console.log('Initializing hamburger menu...');
//     console.log('Hamburger element:', hamburger);
//     console.log('Nav links element:', navLinks);
    
//     if (!hamburger || !navLinks) {
//         console.warn('Hamburger menu elements not found');
//         return;
//     }

//     console.log('Hamburger menu elements found, adding event listeners...');

//     // Toggle mobile menu on hamburger click
//     hamburger.addEventListener("click", () => {
//         console.log('Hamburger clicked!');
//         navLinks.classList.toggle("show");
//         hamburger.classList.toggle("active");
//         console.log('Nav links classes:', navLinks.classList.toString());
//         console.log('Hamburger classes:', hamburger.classList.toString());
//     });

//     // Close menu when clicking outside
//     document.addEventListener('click', (event) => {
//         const isClickInsideNav = navLinks.contains(event.target);
//         const isClickOnHamburger = hamburger.contains(event.target);
        
//         if (!isClickInsideNav && !isClickOnHamburger && navLinks.classList.contains('show')) {
//             navLinks.classList.remove('show');
//             hamburger.classList.remove('active');
//         }
//     });
// }

// function initializeScrollNavigation() {
//     const navbar = document.querySelector(".navbar");
    
//     if (!navbar) {
//         console.warn('Navbar element not found');
//         return;
//     }

//     // Check if we're on the index page
//     const isIndexPage = window.location.pathname.endsWith('index.html') || 
//                        window.location.pathname === '/' || 
//                        window.location.pathname.endsWith('/');
    
//     // Only apply scroll-triggered visibility on index page
//     if (!isIndexPage) {
//         // For non-index pages, ensure navbar is always visible
//         navbar.classList.add('visible');
//         return;
//     }

//     // Index page scroll behavior
//     let lastScrollTop = 0;

//     window.addEventListener('scroll', () => {
//         const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

//         // Show navbar when scrolling down after 100px (only on index page)
//         if (currentScroll > 100) {
//             navbar.classList.add('visible');
//         } else {
//             navbar.classList.remove('visible');
//         }

//         lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
//     });
// }

// function initializeMobileMenuClicks() {
//     const navLinks = document.getElementById("nav-links");
//     const hamburger = document.getElementById("hamburger");
    
//     if (!navLinks || !hamburger) {
//         return;
//     }

//     // Close mobile menu when clicking on navigation links
//     const navLinksItems = document.querySelectorAll('.nav-links a');
//     navLinksItems.forEach(link => {
//         link.addEventListener('click', () => {
//             navLinks.classList.remove('show');
//             hamburger.classList.remove('active');
//         });
//     });
// }

// // Utility function to handle smooth scrolling for anchor links
// function initializeSmoothScrolling() {
//     const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
//     anchorLinks.forEach(link => {
//         link.addEventListener('click', function(e) {
//             const targetId = this.getAttribute('href');
            
//             // Skip if it's just "#" or contains external references
//             if (targetId === '#' || targetId.includes('index.html#')) {
//                 return;
//             }
            
//             const targetElement = document.querySelector(targetId);
            
//             if (targetElement) {
//                 e.preventDefault();
                
//                 targetElement.scrollIntoView({
//                     behavior: 'smooth',
//                     block: 'start'
//                 });
//             }
//         });
//     });
// }

// // Initialize smooth scrolling if on the same page
// initializeSmoothScrolling();

// Открытие/закрытие меню при клике на гамбургер
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("nav-links");
    const navbar = document.querySelector(".navbar");

    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("show");
    });

    // Scroll-triggered navigation appearance
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

      // Show navbar when scrolling down after 100px
      if (currentScroll > 100) {
        navbar.classList.add('visible');
      } else {
        navbar.classList.remove('visible');
      }

      lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    });

    // Анимации появления секций при скролле
    document.addEventListener('DOMContentLoaded', function () {
      // Trigger hero section animations
      const heroSection = document.querySelector('.hero');
      if (heroSection) {
        setTimeout(() => {
          heroSection.classList.add('loaded');
        }, 300); // Small delay for smooth loading
      }
      // Настройки для Intersection Observer
      const observerOptions = {
        threshold: 0.1, // Элемент должен быть виден на 10%
        rootMargin: '0px 0px -50px 0px' // Запуск анимации чуть раньше
      };

      // Создаем наблюдатель
      const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Добавляем класс для запуска анимации
            entry.target.classList.add('visible');

            // Если это секция с дочерними элементами, анимируем их тоже
            const animatedChildren = entry.target.querySelectorAll('.animate-section, .animate-slide-left, .animate-slide-right, .animate-scale, .animate-rotate');
            animatedChildren.forEach((child, index) => {
              setTimeout(() => {
                child.classList.add('visible');
              }, index * 100); // Задержка между элементами
            });
          }
        });
      }, observerOptions);

      // Находим все элементы для анимации
      const animatedElements = document.querySelectorAll('.animate-section, .animate-slide-left, .animate-slide-right, .animate-scale, .animate-rotate');

      // Начинаем наблюдение за каждым элементом
      animatedElements.forEach(element => {
        observer.observe(element);
      });

      // Специальная обработка для элементов портфолио
      const portfolioItems = document.querySelectorAll('.portfolio-item');
      portfolioItems.forEach((item, index) => {
        setTimeout(() => {
          observer.observe(item);
        }, index * 50);
      });

      // Закрытие мобильного меню при клике на ссылку
      const navLinksItems = document.querySelectorAll('.nav-links a');
      navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
          navLinks.classList.remove('show');
        });
      });

      // Кнопка возврата наверх
      const scrollToTopButton = document.getElementById('scroll-to-top');

      // Показываем кнопку при скролле вниз
      window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
          scrollToTopButton.classList.add('visible');
        } else {
          scrollToTopButton.classList.remove('visible');
        }
      });

      // Обработчик клика по кнопке
      scrollToTopButton.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    });