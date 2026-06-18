document.addEventListener('DOMContentLoaded', () => {

  // 1. Page Loader
  const loader = document.querySelector('.page-loader');
  if (loader) {
    setTimeout(() => {
      loader.style.opacity = '0';
      setTimeout(() => {
        loader.style.display = 'none';
      }, 500);
    }, 700);
  }

  // 2. Scroll Progress Bar
  const progressBar = document.querySelector('.scroll-progress');
  window.addEventListener('scroll', () => {
    if (progressBar) {
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (window.scrollY / windowHeight) * 100;
      progressBar.style.width = `${scrolled}%`;
    }
  });

  // 3. Sticky Header Shrink
  const header = document.querySelector('.main-header');
  window.addEventListener('scroll', () => {
    if (header) {
      if (window.scrollY > 80) {
        header.classList.add('shrunk');
      } else {
        header.classList.remove('shrunk');
      }
    }
  });

  // 4. Hamburger / Mobile Nav & Overlay Reconstruction
  const hamburger = document.querySelector('.hamburger');
  const mainNav = document.querySelector('.main-nav');
  
  // Create and append backdrop overlay dynamically if it doesn't exist
  let navOverlay = document.querySelector('.nav-overlay');
  if (!navOverlay) {
    navOverlay = document.createElement('div');
    navOverlay.className = 'nav-overlay';
    document.body.appendChild(navOverlay);
  }

  // Inject Mobile Menu Footer dynamically if it doesn't exist
  if (mainNav && !mainNav.querySelector('.mobile-menu-footer')) {
    const footerDiv = document.createElement('div');
    footerDiv.className = 'mobile-menu-footer';
    footerDiv.innerHTML = `
      <div class="mobile-contact-info" style="margin-bottom: 20px; font-size: 0.9rem; color: var(--text);">
        <p style="margin-bottom: 10px;">
          <a href="tel:9799979532" style="color: var(--ink); font-weight: 700; display: inline-flex; align-items: center; gap: 8px;">
            <i class="fa-solid fa-phone" style="color: var(--rose);"></i> 9799979532
          </a>
        </p>
        <p style="margin-bottom: 10px;">
          <a href="mailto:info@kulkiivfgroup.com" style="color: var(--text); display: inline-flex; align-items: center; gap: 8px;">
            <i class="fa-solid fa-envelope" style="color: var(--rose);"></i> info@kulkiivfgroup.com
          </a>
        </p>
        <p style="line-height: 1.4; font-size: 0.85rem; display: inline-flex; align-items: flex-start; gap: 8px; margin: 0; color: var(--mid);">
          <i class="fa-solid fa-location-dot" style="color: var(--rose); margin-top: 3px;"></i>
          <span>Plot 184, Nandpuri-B, Near Maharana Pratap Circle, Pratap Nagar, Jaipur</span>
        </p>
      </div>
      <div class="mobile-socials" style="display: flex; gap: 18px; font-size: 1.25rem; margin-top: 16px;">
        <a href="http://www.facebook.com/kulkiivfgroup" target="_blank" style="color: #1877f2; transition: opacity 0.2s ease;"><i class="fa-brands fa-facebook"></i></a>
        <a href="https://www.instagram.com/kulki_ivf_group/" target="_blank" style="color: #c13584; transition: opacity 0.2s ease;"><i class="fa-brands fa-instagram"></i></a>
        <a href="https://www.youtube.com/@kulkiivfgroup" target="_blank" style="color: #ff0000; transition: opacity 0.2s ease;"><i class="fa-brands fa-youtube"></i></a>
      </div>
    `;
    mainNav.appendChild(footerDiv);
  }

  function toggleMenu() {
    const isOpen = mainNav.classList.toggle('on');
    hamburger.classList.toggle('on');
    navOverlay.classList.toggle('on');
    document.body.classList.toggle('menu-open', isOpen);
  }

  function closeMenu() {
    mainNav.classList.remove('on');
    hamburger.classList.remove('on');
    navOverlay.classList.remove('on');
    document.body.classList.remove('menu-open');
  }

  if (hamburger && mainNav) {
    hamburger.addEventListener('click', toggleMenu);
    navOverlay.addEventListener('click', closeMenu);
  }

  // Handle window resizing to clean up states automatically
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) {
      closeMenu();
    }
  });

  // Mobile Accordion Handling
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      // Accordion dropdown toggle only for viewport width <= 1024px
      if (window.innerWidth > 1024) return;
      if (!item.querySelector('.mega-menu')) return;
      if (e.target.closest('.mega-menu')) return;
      
      e.preventDefault(); 
      
      // Close other open items
      navItems.forEach(other => {
        if (other !== item) other.classList.remove('open');
      });

      item.classList.toggle('open');
    });
  });

  // 7. Booking Popup
  const modalOverlay = document.querySelector('.modal-overlay');
  const modalClose = document.querySelector('.modal-close');
  const bookBtns = document.querySelectorAll('a[href="#book"], button[data-action="book"]');
  
  function openPop(e) {
    if (e) e.preventDefault();
    if (modalOverlay) {
      modalOverlay.classList.add('active');
    }
  }

  function closePop() {
    if (modalOverlay) {
      modalOverlay.classList.remove('active');
    }
  }

  bookBtns.forEach(btn => {
    btn.addEventListener('click', openPop);
  });

  if (modalClose) {
    modalClose.addEventListener('click', closePop);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closePop();
      }
    });
  }

  // 8. Contact Form Submit (Dummy for visual)
  const contactForms = document.querySelectorAll('form');
  contactForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const successMsg = form.querySelector('.success-msg') || form.nextElementSibling;
      if (successMsg && successMsg.classList.contains('success-msg')) {
        successMsg.style.display = 'block';
        form.reset();
        setTimeout(() => {
          successMsg.style.display = 'none';
        }, 5000);
      }
    });
  });

  // 9. Scroll Reveal Animations
  const rvElements = document.querySelectorAll('.rv');
  
  if ('IntersectionObserver' in window) {
    const rvObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    
    rvElements.forEach(el => rvObserver.observe(el));
  } else {
    // Fallback
    rvElements.forEach(el => el.classList.add('active'));
  }

  // 10. Animated Counters
  const counters = document.querySelectorAll('.counter');
  
  if ('IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = +counter.getAttribute('data-target');
          const duration = 1800; // ms
          const increment = target / (duration / 16); // roughly 60fps
          let current = 0;
          
          const updateCounter = () => {
            current += increment;
            if (current < target) {
              counter.innerText = Math.ceil(current);
              requestAnimationFrame(updateCounter);
            } else {
              counter.innerText = target + (counter.getAttribute('data-plus') ? '+' : '');
            }
          };
          
          updateCounter();
          observer.unobserve(counter);
        }
      });
    }, { threshold: 0.1 });
    
    counters.forEach(counter => counterObserver.observe(counter));
  }

  // 11. Testimonial Slider
  const track = document.querySelector('.testimonial-track');
  const prevBtn = document.querySelector('.slider-btn.prev');
  const nextBtn = document.querySelector('.slider-btn.next');
  
  if (track) {
    let currentIndex = 0;
    const cards = Array.from(track.children);
    
    const getCardWidth = () => {
      if (!cards[0]) return 0;
      const margin = parseFloat(window.getComputedStyle(cards[0]).marginRight) || 0;
      return cards[0].getBoundingClientRect().width + margin;
    };

    let cardWidth = getCardWidth();
    let visibleCards = window.innerWidth >= 1024 ? 3 : (window.innerWidth >= 768 ? 2 : 1);
    
    window.addEventListener('resize', () => {
      cardWidth = getCardWidth();
      visibleCards = window.innerWidth >= 1024 ? 3 : (window.innerWidth >= 768 ? 2 : 1);
      updateSlider();
    });

    const updateSlider = () => {
      const maxIndex = Math.max(0, cards.length - visibleCards);
      currentIndex = Math.min(currentIndex, maxIndex);
      track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    };

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const maxIndex = Math.max(0, cards.length - visibleCards);
        if (currentIndex < maxIndex) {
          currentIndex++;
        } else {
          currentIndex = 0; // loop back
        }
        updateSlider();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
          currentIndex--;
        } else {
          currentIndex = Math.max(0, cards.length - visibleCards);
        }
        updateSlider();
      });
    }

    // Auto advance
    setInterval(() => {
      const maxIndex = Math.max(0, cards.length - visibleCards);
      if (currentIndex < maxIndex) {
        currentIndex++;
      } else {
        currentIndex = 0;
      }
      updateSlider();
    }, 5500);
  }

  // 12. Gallery Lightbox
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = document.querySelector('.lightbox-img');
  const lbClose = document.querySelector('.lightbox-close');
  const lbPrev = document.querySelector('.lightbox-prev');
  const lbNext = document.querySelector('.lightbox-next');
  
  if (galleryItems.length > 0 && lightbox) {
    let currentGalleryIndex = 0;
    // Get currently visible items (based on filter)
    let visibleGalleryItems = Array.from(galleryItems);
    
    const updateLightbox = (index) => {
      if (visibleGalleryItems.length === 0) return;
      const imgSrc = visibleGalleryItems[index].querySelector('img').src;
      lightboxImg.src = imgSrc;
      currentGalleryIndex = index;
    };

    galleryItems.forEach((item) => {
      item.addEventListener('click', () => {
        if (item.style.display === 'none') return;
        
        // Re-evaluate visible items based on current filter
        visibleGalleryItems = Array.from(galleryItems).filter(i => i.style.display !== 'none');
        const index = visibleGalleryItems.indexOf(item);
        
        if (index !== -1) {
          updateLightbox(index);
          lightbox.classList.add('active');
        }
      });
    });

    if (lbClose) {
      lbClose.addEventListener('click', () => {
        lightbox.classList.remove('active');
      });
    }

    if (lbNext) {
      lbNext.addEventListener('click', () => {
        let newIndex = currentGalleryIndex + 1;
        if (newIndex >= visibleGalleryItems.length) newIndex = 0;
        updateLightbox(newIndex);
      });
    }

    if (lbPrev) {
      lbPrev.addEventListener('click', () => {
        let newIndex = currentGalleryIndex - 1;
        if (newIndex < 0) newIndex = visibleGalleryItems.length - 1;
        updateLightbox(newIndex);
      });
    }
  }

  // 13. Gallery Filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  
  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from all
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        
        galleryItems.forEach(item => {
          if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
            item.style.display = 'block';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, 50);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  // 14. FAQ Accordion
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const isActive = question.classList.contains('active');
      
      // Close all
      faqQuestions.forEach(q => q.classList.remove('active'));
      
      // Open clicked if it wasn't already open
      if (!isActive) {
        question.classList.add('active');
      }
    });
  });

  // 15. Back to Top
  const backTop = document.getElementById('back-top');
  
  if (backTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backTop.classList.add('show');
      } else {
        backTop.classList.remove('show');
      }
    });

    backTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 16. Active Nav Link based on URL
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link, .mega-link');
  
  navLinks.forEach(link => {
    // Only check if link has an href and it's not a hash link
    if (link.getAttribute('href') && !link.getAttribute('href').startsWith('#')) {
      const linkPath = link.getAttribute('href').replace(/^\//, ''); // strip leading slash
      const currentPathStripped = currentPath.split('/').pop(); // get filename
      
      if (linkPath === currentPathStripped || 
         (currentPathStripped === '' && (linkPath === 'index.html' || linkPath === './'))) {
        
        // If it's a mega link, highlight parent
        if (link.classList.contains('mega-link')) {
          const parentItem = link.closest('.nav-item');
          if (parentItem) parentItem.classList.add('active');
        } else {
          const parentItem = link.closest('.nav-item');
          if (parentItem) parentItem.classList.add('active');
        }
      }
    }
  });
});