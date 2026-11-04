/**
 * app.js - Dra. Erica Lacerda | Harmonização Facial de Luxo • Residência HOF Harvard
 * Interações refinadas, GSAP, ScrollTrigger, Lenis e simulação estética.
 */

import { SITE } from './config.js';

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

function initApp() {
  populateStaticContent();
  initLenisAndScroll();
  initCurtainReveal();
  initHeaderAndMobileNav();
  initWordArcs();
  initGoldenWandAndTransformation();
  initOrbitalRing();
  initServicesList();
  initGalleryAndLightbox();
  initStudioCarousel();
  initAboutCounters();
  initInstagramReels();
  initFeedbacksCarousel();
  initTimeline();
  initAppSimulator();
  initBookingFormAndWhatsApp();
  initFAQAccordion();
  initMagneticButtonsAndCursor();
  initAnalyticsTracking();
}

/**
 * 0. Popular Textos Globais a partir de config.js
 */
function populateStaticContent() {
  // Brand Names
  const navBrand = document.getElementById('navDocName');
  if (navBrand) navBrand.textContent = SITE.doutora.nome;

  const footerName = document.getElementById('footerName');
  if (footerName) footerName.textContent = SITE.doutora.nome;

  const footerReg = document.getElementById('footerReg');
  if (footerReg) footerReg.textContent = `${SITE.doutora.registro} • Especialista em Harmonização Facial`;

  const footerAddr = document.getElementById('footerAddr');
  if (footerAddr) footerAddr.textContent = `${SITE.estudio.endereco}, ${SITE.estudio.cidade}`;

  const currentYear = document.getElementById('currentYear');
  if (currentYear) currentYear.textContent = new Date().getFullYear().toString();

  // Hero
  const heroTitle = document.getElementById('heroTitle');
  if (heroTitle) heroTitle.innerHTML = SITE.hero.titulo;

  const heroSub = document.getElementById('heroSub');
  if (heroSub) heroSub.textContent = SITE.hero.subtitulo;

  const heroCards = document.getElementById('heroCards');
  if (heroCards) {
    if (SITE.hero.cards && SITE.hero.cards.length > 0) {
      heroCards.innerHTML = SITE.hero.cards.map(c => `<li class="glass-pill">${c}</li>`).join('');
    } else {
      heroCards.style.display = 'none';
      heroCards.innerHTML = '';
    }
  }

  // Band Track
  const bandTrack = document.getElementById('bandTrack');
  if (bandTrack && SITE.faixa) {
    const words = [...SITE.faixa, ...SITE.faixa];
    bandTrack.innerHTML = words.map(w => `<span>${w}</span>`).join('');
  }

  // Sobre
  const sobreTitle = document.getElementById('sobreTitle');
  if (sobreTitle) sobreTitle.innerHTML = SITE.sobre.titulo;

  const sobreSub = document.getElementById('sobreSub');
  if (sobreSub) sobreSub.textContent = SITE.sobre.subtitulo;

  const sobreEmocional = document.getElementById('sobreEmocional');
  if (sobreEmocional) sobreEmocional.textContent = SITE.sobre.emocional;

  const sobreTecnico = document.getElementById('sobreTecnico');
  if (sobreTecnico) sobreTecnico.textContent = SITE.sobre.tecnico;

  const sobreCitacao = document.getElementById('sobreCitacao');
  if (sobreCitacao && SITE.sobre.citacao) sobreCitacao.textContent = SITE.sobre.citacao;

  // Doctor Photos
  const docPhotoImg = document.getElementById('docPhotoImg');
  if (docPhotoImg && SITE.hero.foto) {
    docPhotoImg.src = SITE.hero.foto;
    docPhotoImg.alt = SITE.doutora.nome;
  }

  const sobrePhotoImg = document.getElementById('sobrePhotoImg');
  if (sobrePhotoImg && SITE.hero.foto) {
    sobrePhotoImg.src = SITE.hero.foto;
    sobrePhotoImg.alt = `${SITE.doutora.nome} no estúdio`;
  }

  // Estúdio
  const mapsFrame = document.getElementById('mapsFrame');
  if (mapsFrame && SITE.estudio.mapsEmbed) mapsFrame.src = SITE.estudio.mapsEmbed;

  const mapsLink = document.getElementById('mapsLink');
  if (mapsLink && SITE.estudio.mapsLink) mapsLink.href = SITE.estudio.mapsLink;

  const estudioEndereco = document.getElementById('estudioEndereco');
  if (estudioEndereco) estudioEndereco.textContent = `${SITE.estudio.endereco} - ${SITE.estudio.cidade}`;

  const estudioHorario = document.getElementById('estudioHorario');
  if (estudioHorario) estudioHorario.innerHTML = `<strong>Horário:</strong> ${SITE.estudio.horario}`;

  // Footer Social & WhatsApp
  const footerSocial = document.getElementById('footerSocial');
  if (footerSocial) {
    footerSocial.innerHTML = `Instagram: <a href="${SITE.doutora.instagramUrl || 'https://www.instagram.com/' + SITE.doutora.instagram}" target="_blank" rel="noopener noreferrer">@${SITE.doutora.instagram}</a><br />WhatsApp: <a href="https://wa.me/${SITE.doutora.whatsapp}" target="_blank" rel="noopener noreferrer">${SITE.doutora.telefone}</a>`;
  }

  const waFloat = document.getElementById('waFloat');
  if (waFloat) {
    waFloat.href = `https://wa.me/${SITE.doutora.whatsapp}?text=${encodeURIComponent('Olá! Vim pelo site e gostaria de saber mais sobre a avaliação com a Dra. Erica Lacerda.')}`;
  }
}

/**
 * 1. Lenis Smooth Scroll & GSAP ScrollTrigger Integration
 */
let lenisInstance = null;

function initLenisAndScroll() {
  if (typeof Lenis !== 'undefined') {
    lenisInstance = new Lenis({
      duration: 1.15,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false
    });

    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      lenisInstance.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => {
        lenisInstance.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);

      // Scroll Progress Bar
      gsap.to('#scrollProgress', {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          scrub: 0.15,
          start: 0,
          end: 'max'
        }
      });
    } else {
      function raf(time) {
        lenisInstance.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }
  }

  // Smooth anchor scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        // Ensure mobile curtain menu is closed and Lenis is running before scrolling
        const curtain = document.getElementById('mobileCurtain');
        const toggle = document.getElementById('navToggle');
        if (curtain && curtain.classList.contains('open')) {
          curtain.classList.remove('open');
          curtain.setAttribute('aria-hidden', 'true');
          document.body.classList.remove('menu-open');
          if (toggle) {
            toggle.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
          }
          if (lenisInstance) lenisInstance.start();
        }
        if (lenisInstance) {
          lenisInstance.scrollTo(targetEl, { offset: -70 });
        } else {
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
}

/**
 * 2. Curtain Entry Reveal Animation
 */
function initCurtainReveal() {
  const curtain = document.getElementById('entryCurtain');
  const line = document.getElementById('entryLine');
  if (!curtain || !line || typeof gsap === 'undefined') return;

  const tl = gsap.timeline({
    onComplete: () => {
      curtain.style.display = 'none';
    }
  });

  tl.to(line, { width: '100%', duration: 0.5, ease: 'power2.inOut' })
    .to(curtain, { opacity: 0, duration: 0.45, ease: 'power2.out' });
}

/**
 * 3. Floating Header & Mobile Navigation Curtain (Sanduíche)
 */
function initHeaderAndMobileNav() {
  const toggle = document.getElementById('navToggle');
  const curtain = document.getElementById('mobileCurtain');
  if (!toggle || !curtain) return;

  function closeMenu() {
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    curtain.classList.remove('open');
    curtain.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('menu-open');
    if (lenisInstance) lenisInstance.start();
  }

  function openMenu() {
    toggle.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    curtain.classList.add('open');
    curtain.setAttribute('aria-hidden', 'false');
    document.body.classList.add('menu-open');
    if (lenisInstance) lenisInstance.stop();
  }

  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    if (curtain.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  curtain.addEventListener('click', (e) => {
    if (e.target === curtain) {
      closeMenu();
    }
  });

  curtain.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && curtain.classList.contains('open')) {
      closeMenu();
    }
  });
}

/**
 * 4. Word Arcs (Hero Signature Feature)
 */
function initWordArcs() {
  if (typeof gsap === 'undefined') return;

  const spin = [
    gsap.to('.ring--txt', { rotation: 360, duration: 70, ease: 'none', repeat: -1, transformOrigin: '50% 50%' }),
    gsap.to('.ring--line', { rotation: -360, duration: 90, ease: 'none', repeat: -1, transformOrigin: '50% 50%' })
  ];

  if (typeof ScrollTrigger !== 'undefined') {
    ScrollTrigger.create({
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      onUpdate(s) {
        const k = 1 + Math.min(3, Math.abs(s.getVelocity()) / 600);
        spin.forEach(t => gsap.to(t, { timeScale: k, duration: 0.25, overwrite: true }));
        gsap.delayedCall(0.3, () => spin.forEach(t => gsap.to(t, { timeScale: 1, duration: 1.4, overwrite: true })));
      }
    });
  }
}

/**
 * 5. Golden Wand (Varinha Dourada - Trecho Único Absoluto) & Transformation
 */
function initGoldenWandAndTransformation() {
  const wand = document.getElementById('wand');
  const anchor = document.getElementById('wandAnchor');
  const mag = document.getElementById('mag');
  const magTag = document.getElementById('magTag');
  if (!wand || !anchor || !mag) return;

  const center = el => {
    const r = el.getBoundingClientRect();
    return {
      x: r.left + window.scrollX + r.width / 2,
      y: r.top + window.scrollY + r.height / 2
    };
  };

  let hasTriggered = false;
  let vanishTimer = null;

  function updateWand() {
    const a = center(anchor);
    const b = center(mag);
    // Target is reached when mag center aligns near viewport center
    const end = Math.max(1, b.y - window.innerHeight * 0.5);
    const p = Math.min(1, Math.max(0, window.scrollY / end));
    const e = p * p * (3 - 2 * p); // smooth cubic ease

    // Translate wand: start from doctor's photo bottom-right (#wandAnchor) to #mag center
    const curX = a.x + (b.x - a.x) * e - 14;
    const curY = a.y + (b.y - a.y) * e - 14;
    const rot = (1 - e) * 14;

    wand.style.transform = `translate3d(${curX}px, ${curY}px, 0) rotate(${rot}deg)`;
    wand.classList.toggle('pulse', p > 0.88 && p < 1);

    const on = mag.classList.contains('on');
    if (p >= 0.96 && !on) {
      mag.classList.add('on');
      if (magTag) magTag.textContent = 'Depois';
      if (!hasTriggered) {
        triggerGoldParticles();
        hasTriggered = true;
      }
      if (vanishTimer) clearTimeout(vanishTimer);
      vanishTimer = setTimeout(() => {
        if (mag.classList.contains('on')) {
          wand.classList.add('vanished');
        }
      }, 320);
    } else if (p < 0.78 && on) {
      mag.classList.remove('on');
      if (magTag) magTag.textContent = 'Antes';
      hasTriggered = false;
      if (vanishTimer) clearTimeout(vanishTimer);
      wand.classList.remove('vanished');
    } else if (p < 0.92 && !on) {
      wand.classList.remove('vanished');
    }
  }

  window.addEventListener('scroll', updateWand, { passive: true });
  window.addEventListener('resize', updateWand);
  window.addEventListener('load', updateWand);
  setTimeout(updateWand, 200);
  updateWand();
}

/**
 * 24 Partículas Douradas da Transformação Facial
 */
function triggerGoldParticles() {
  const container = document.getElementById('particleBurst');
  if (!container) return;
  container.innerHTML = '';

  const numParticles = 24;
  for (let i = 0; i < numParticles; i++) {
    const dot = document.createElement('i');
    container.appendChild(dot);

    const angle = (i * (360 / numParticles) + Math.random() * 15) * (Math.PI / 180);
    const distance = 70 + Math.random() * 80;
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;
    const delay = Math.random() * 0.35;

    if (typeof gsap !== 'undefined') {
      gsap.fromTo(dot, 
        { x: 0, y: 0, opacity: 1, scale: 0.6 },
        { 
          x: dx, 
          y: dy, 
          opacity: 0, 
          scale: 1.8, 
          duration: 1.3, 
          delay: delay, 
          ease: 'power2.out',
          onComplete: () => dot.remove()
        }
      );
    }
  }
}

/**
 * 6. Orbital Ring of Services (Overlay Inspiration)
 */
function initOrbitalRing() {
  const orb = document.getElementById('orb');
  if (!orb || !SITE.servicos) return;

  const chips = SITE.servicos.map((s) => {
    const c = document.createElement('span');
    c.className = 'chip';
    c.textContent = s.rotulo;

    orb.appendChild(c);
    return c;
  });

  // Calculate chip positions along ellipse: cx=50%, cy=50%, rx=38%, ry=42%
  function orbit() {
    const scrollOffset = window.scrollY * 0.12;
    chips.forEach((c, i) => {
      const angleDeg = i * (360 / chips.length) + scrollOffset - 90;
      const rad = (angleDeg * Math.PI) / 180;
      const x = 50 + 38 * Math.cos(rad);
      const y = 50 + 42 * Math.sin(rad);

      c.style.left = x + '%';
      c.style.top = y + '%';

      // 3D Depth effect: chips passing behind (top of ellipse) become slightly smaller and softer
      const depthFactor = (Math.sin(rad) + 1) / 2; // 0 to 1
      const scale = 0.88 + depthFactor * 0.18;
      const opacity = 0.72 + depthFactor * 0.28;
      c.style.opacity = opacity.toString();
      c.style.transform = `translate(-50%, -50%) scale(${scale})`;
      c.style.zIndex = y > 50 ? '7' : '4';
    });
  }

  window.addEventListener('scroll', orbit, { passive: true });
  orbit();
}

/**
 * 7. Services List (Espaço para Foto, Nome e Descrição do Serviço)
 */
function initServicesList() {
  const grid = document.getElementById('svcGrid');
  const servicoSel = document.getElementById('servicoSel');

  if (!grid || !SITE.servicos) return;

  // Populate Select in Appointment Form
  if (servicoSel) {
    servicoSel.innerHTML = '<option value="Ainda não sei, quero uma avaliação">Ainda não sei, quero uma avaliação completa</option>';
    SITE.servicos.forEach(s => {
      const opt = document.createElement('option');
      opt.value = s.nome;
      opt.textContent = s.nome;
      servicoSel.appendChild(opt);
    });
  }

  // Render Service Cards com espaço para foto, nome, descrição e mini-aba expansível de benefícios
  grid.innerHTML = SITE.servicos.map((s) => `
    <article class="svc" data-id="${s.id}">
      <div class="svc__pic">
        <img src="${s.foto}" alt="${s.nome}" loading="lazy" width="500" height="400" />
      </div>
      <div class="svc__tx">
        <h3 class="svc__name">${s.nome}</h3>
        <p class="svc__desc">${s.descricao}</p>
        <button type="button" class="svc-ben-btn" aria-expanded="false" aria-label="Ver benefícios de ${s.nome}">
          <span class="svc-ben-btn-lbl">Ver benefícios</span>
          <span class="svc-ben-icon" aria-hidden="true">+</span>
        </button>
        <div class="svc-ben-tab" aria-hidden="true">
          <div class="svc-ben-inner">
            <span class="svc-ben-title">Benefícios do procedimento</span>
            <ul class="svc-ben-list">
              ${(s.beneficios || []).map(b => `<li><span>${b}</span></li>`).join('')}
            </ul>
          </div>
        </div>
      </div>
    </article>
  `).join('');

  // Toggle da mini-aba de benefícios de cada serviço
  const cards = grid.querySelectorAll('.svc');
  cards.forEach(card => {
    const btn = card.querySelector('.svc-ben-btn');
    const tab = card.querySelector('.svc-ben-tab');
    const lbl = card.querySelector('.svc-ben-btn-lbl');
    if (!btn || !tab) return;

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = card.classList.contains('open');

      // Fecha outras abas abertas para manter o layout organizado
      cards.forEach(other => {
        if (other !== card && other.classList.contains('open')) {
          other.classList.remove('open');
          const obtn = other.querySelector('.svc-ben-btn');
          const otab = other.querySelector('.svc-ben-tab');
          const olbl = other.querySelector('.svc-ben-btn-lbl');
          if (obtn) obtn.setAttribute('aria-expanded', 'false');
          if (otab) otab.setAttribute('aria-hidden', 'true');
          if (olbl) olbl.textContent = 'Ver benefícios';
        }
      });

      if (isOpen) {
        card.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
        tab.setAttribute('aria-hidden', 'true');
        if (lbl) lbl.textContent = 'Ver benefícios';
      } else {
        card.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
        tab.setAttribute('aria-hidden', 'false');
        if (lbl) lbl.textContent = 'Ocultar benefícios';
      }
    });
  });
}

/**
 * 8. Static Gallery & Lightbox Modal (Mosaico 8-10 Fotos)
 */
function initGalleryAndLightbox() {
  const mosaic = document.getElementById('galMosaic');
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightboxImg');
  const lbCap = document.getElementById('lightboxCaption');
  const lbClose = document.getElementById('lightboxClose');
  const lbPrev = document.getElementById('lightboxPrev');
  const lbNext = document.getElementById('lightboxNext');

  if (!mosaic || !SITE.galeria || !lightbox) return;

  mosaic.innerHTML = SITE.galeria.map((item, idx) => `
    <figure data-index="${idx}" tabindex="0" role="button" aria-label="${item.legenda}">
      <img src="${item.src}" alt="${item.legenda}" loading="lazy" width="600" height="600" />
      <figcaption class="gal-caption">${item.legenda}</figcaption>
    </figure>
  `).join('');

  let currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    const item = SITE.galeria[currentIndex];
    if (!item) return;

    lbImg.src = item.src;
    lbImg.alt = '';
    lbCap.textContent = ''; // Sem título ao expandir conforme solicitado
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    if (lenisInstance) lenisInstance.stop();
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    if (lenisInstance) lenisInstance.start();
  }

  window.openCustomLightbox = function(src) {
    lbImg.src = src;
    lbImg.alt = '';
    lbCap.textContent = ''; // Sem título ao expandir conforme solicitado
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    if (lenisInstance) lenisInstance.stop();
  };

  function showNext() {
    currentIndex = (currentIndex + 1) % SITE.galeria.length;
    openLightbox(currentIndex);
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + SITE.galeria.length) % SITE.galeria.length;
    openLightbox(currentIndex);
  }

  mosaic.querySelectorAll('figure').forEach(fig => {
    const idx = parseInt(fig.dataset.index, 10);
    fig.addEventListener('click', () => openLightbox(idx));
    fig.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(idx);
      }
    });
  });

  if (lbClose) {
    lbClose.addEventListener('click', (e) => {
      e.stopPropagation();
      closeLightbox();
    });
  }
  if (lbNext) {
    lbNext.addEventListener('click', (e) => {
      e.stopPropagation();
      showNext();
    });
  }
  if (lbPrev) {
    lbPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      showPrev();
    });
  }

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox-content')) closeLightbox();
  });

  window.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
  });

  // Touch Swipe for Mobile (ignoring taps directly on prev/next/close buttons)
  let touchStartX = 0;
  let touchOnButton = false;
  lightbox.addEventListener('touchstart', (e) => {
    touchOnButton = Boolean(e.target.closest('.lightbox-btn, .lightbox-close'));
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  lightbox.addEventListener('touchend', (e) => {
    if (touchOnButton) return;
    const touchEndX = e.changedTouches[0].screenX;
    if (touchEndX < touchStartX - 45) showNext();
    if (touchEndX > touchStartX + 45) showPrev();
  }, { passive: true });
}

/**
 * 8.5. Infinite Carousel for Studio Photos (Square Borders, Gold Borders, Click to Expand)
 */
function initStudioCarousel() {
  const track = document.getElementById('estudioCarouselTrack');
  if (!track || !SITE.estudio || !SITE.estudio.fotos) return;

  const rawFotos = SITE.estudio.fotos;
  const normalizedFotos = rawFotos.map((f, idx) => {
    if (typeof f === 'string') {
      return {
        src: f,
        titulo: `Ambiente Exclusivo ${idx + 1}`,
        legenda: 'Espaço planejado com privacidade, conforto e biossegurança'
      };
    }
    return f;
  });

  // Se já houver cards no HTML, reaproveita imediatamente para não haver delay
  if (!track.children || track.children.length === 0) {
    const loopList = [...normalizedFotos, ...normalizedFotos];
    track.innerHTML = loopList.map((item, i) => `
      <div class="estudio-card" data-idx="${i % normalizedFotos.length}" tabindex="0" role="button" aria-label="Espaço Dra. Erica Lacerda">
        <img src="${item.src}" alt="Espaço da clínica" width="600" height="450" />
        <span class="estudio-card-badge">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
        </span>
      </div>
    `).join('');
  }

  track.querySelectorAll('.estudio-card').forEach(card => {
    const clickHandler = () => {
      const idx = parseInt(card.dataset.idx, 10);
      const foto = normalizedFotos[idx];
      if (foto && window.openCustomLightbox) {
        window.openCustomLightbox(foto.src);
      }
    };
    card.addEventListener('click', clickHandler);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        clickHandler();
      }
    });
  });
}

/**
 * 9. About Counters Count-up Animation
 */
function initAboutCounters() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  document.querySelectorAll('[data-count]').forEach(el => {
    const end = +el.dataset.count;
    ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter() {
        const o = { v: 0 };
        gsap.to(o, {
          v: end,
          duration: 1.8,
          ease: 'power2.out',
          onUpdate() {
            el.textContent = (end % 1 !== 0 ? o.v.toFixed(1) : Math.round(o.v)) + (el.dataset.sufixo || '');
          }
        });
      }
    });
  });
}

/**
 * 10. Instagram Reels Autoplay & Sound Toggle
 */
function initInstagramReels() {
  const video = document.getElementById('reelVideo');
  const soundBtn = document.getElementById('reelSoundBtn');
  const fallback = document.getElementById('reelFallback');
  if (!video) return;

  // Handle video error gracefully (fallback mock)
  video.addEventListener('error', () => {
    if (fallback) fallback.style.display = 'flex';
    video.style.display = 'none';
  });

  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, { threshold: 0.45 });

  observer.observe(video);

  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      video.muted = !video.muted;
      soundBtn.innerHTML = video.muted
        ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="1" y1="1" x2="23" y2="23"></line><path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path><path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>`
        : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>`;
    });
  }
}

/**
 * 11. Feedbacks (Vertical Infinite Slider Animation com 12+ Avaliações e 5 Estrelas)
 */
function initFeedbacksCarousel() {
  const col1 = document.getElementById('fbCol1');
  const col2 = document.getElementById('fbCol2');
  const col3 = document.getElementById('fbCol3');
  if (!col1 || !SITE.feedbacks) return;

  const starSVG = `
    <svg class="star" viewBox="0 0 24 24">
      <defs>
        <linearGradient id="starGold24k" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#FFF2A6" />
          <stop offset="35%" stop-color="#F5C842" />
          <stop offset="70%" stop-color="#D4AF37" />
          <stop offset="100%" stop-color="#B38728" />
        </linearGradient>
      </defs>
      <path fill="url(#starGold24k)" stroke="#C99A2E" stroke-width="0.6" d="M12 2l3 6.9 7.5.7-5.7 5 1.7 7.4L12 18l-6.5 4 1.7-7.4-5.7-5 7.5-.7z"/>
    </svg>
  `;

  const renderCard = (f) => `
    <div class="feedback-card-v">
      <div>
        <div class="feedback-stars-row">
          ${starSVG.repeat(5)}
        </div>
        <p class="feedback-quote-text">“${f.texto}”</p>
      </div>
      <div class="feedback-meta-row">
        <span class="feedback-client-name">${f.nome}</span>
        <span class="feedback-procedure-tag">${f.servico}</span>
      </div>
    </div>
  `;

  const list = SITE.feedbacks;
  const chunk1 = list.slice(0, 4);
  const chunk2 = list.slice(4, 8);
  const chunk3 = list.slice(8, 12);

  // Coluna 1
  if (col1) {
    const cardsHtml = [...chunk1, ...chunk1].map(renderCard).join('');
    col1.innerHTML = `<div class="infinite-slider-track infinite-slider-track--col1">${cardsHtml}</div>`;
  }

  // Coluna 2
  if (col2) {
    const cardsHtml = [...chunk2, ...chunk2].map(renderCard).join('');
    col2.innerHTML = `<div class="infinite-slider-track infinite-slider-track--col2">${cardsHtml}</div>`;
  }

  // Coluna 3
  if (col3) {
    const cardsHtml = [...chunk3, ...chunk3].map(renderCard).join('');
    col3.innerHTML = `<div class="infinite-slider-track infinite-slider-track--col3">${cardsHtml}</div>`;
  }
}

/**
 * 12. Timeline Drawn Line on Scroll
 */
function initTimeline() {
  const stepsWrap = document.getElementById('tlSteps');
  const line = document.querySelector('#tl line');
  if (!stepsWrap || !SITE.atendimento) return;

  stepsWrap.innerHTML = SITE.atendimento.map(s => `
    <div class="tl-step" data-step="${s.passo}">
      <div class="tl-badge">${s.passo}</div>
      <div class="tl-card glass">
        <h3>${s.titulo}</h3>
        <p>${s.descricao}</p>
      </div>
    </div>
  `).join('');

  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined' && line) {
    gsap.fromTo(line,
      { strokeDashoffset: 600 },
      {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: '#atendimento',
          start: 'top 70%',
          end: 'bottom 60%',
          scrub: 0.4,
          onUpdate(self) {
            const steps = stepsWrap.querySelectorAll('.tl-step');
            const activeCount = Math.floor(self.progress * (steps.length + 1));
            steps.forEach((step, idx) => {
              if (idx < activeCount) step.classList.add('active');
              else step.classList.remove('active');
            });
          }
        }
      }
    );
  }
}

/**
 * 13. App-Style Face Simulator (Inspired by Skynex)
 */
function initAppSimulator() {
  const app = document.getElementById('app');
  const simOpts = document.getElementById('simOpts');
  const it = document.getElementById('it');
  const itVal = document.getElementById('itVal');
  const servicoSel = document.getElementById('servicoSel');
  if (!app || !simOpts || !SITE.simulador) return;

  // Scan line animation on entry
  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      app.classList.add('go');
    }
  }, { threshold: 0.45 });
  observer.observe(app);

  // Mask generator for elliptical overlays
  function maskFor(r) {
    if (!r) return 'none';
    const g = (x, y, rx, ry) => `radial-gradient(ellipse ${rx}% ${ry}% at ${x}% ${y}%, #000000 45%, transparent 100%)`;
    if (Array.isArray(r)) {
      return r.map(a => g(a.x, a.y, a.rx, a.ry)).join(', ');
    }
    return g(r.x, r.y, r.rx, r.ry);
  }

  const R = SITE.simulador.regioes;
  const activeRegions = new Set();

  document.querySelectorAll('.ov').forEach(o => {
    const key = o.dataset.k;
    const mask = maskFor(R[key]);
    o.style.maskImage = mask;
    o.style.webkitMaskImage = mask;
  });

  function applySimulation() {
    const intensity = it ? +it.value / 100 : 0.8;
    if (itVal && it) itVal.textContent = `${it.value}%`;

    document.querySelectorAll('.ov').forEach(o => {
      const isSelected = activeRegions.has(o.dataset.k);
      o.style.opacity = isSelected ? intensity.toString() : '0';
    });

    // Auto-select in booking form
    const firstActive = [...activeRegions][0];
    if (firstActive && R[firstActive] && R[firstActive].servico && servicoSel) {
      servicoSel.value = R[firstActive].servico;
    }

    // Trigger preview update
    window.dispatchEvent(new Event('simulatorUpdate'));
  }

  // Handle Option Buttons
  simOpts.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
      const k = btn.dataset.k;
      if (activeRegions.has(k)) {
        activeRegions.delete(k);
        btn.classList.remove('on');
      } else {
        activeRegions.add(k);
        btn.classList.add('on');
      }
      applySimulation();
    });
  });

  if (it) {
    it.addEventListener('input', applySimulation);
  }

  // Expose active regions for WhatsApp message generator
  window.__activeSimRegions = activeRegions;
}

/**
 * 14. Qualified Lead Form & Live WhatsApp Speech Bubble Preview
 */
function initBookingFormAndWhatsApp() {
  const form = document.getElementById('bookingForm');
  const nome = document.getElementById('nomeField');
  const nomeError = document.getElementById('nomeError');
  const servicoSel = document.getElementById('servicoSel');
  const dia = document.getElementById('diaField');
  const horario = document.getElementById('horarioField');
  const queixa = document.getElementById('queixaField');
  const preview = document.getElementById('waBubblePreview');
  const bubbleTime = document.getElementById('waBubbleTime');
  const copyBtn = document.getElementById('copyBtn');

  if (!form || !preview) return;

  // Set current time in preview
  const now = new Date();
  const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  if (bubbleTime) bubbleTime.textContent = timeStr;

  function buildMessage() {
    const simSet = window.__activeSimRegions || new Set();
    const simDict = {
      labios: 'olhar descansado',
      queixo: 'mais boca',
      full: 'rejuvenescer tudo'
    };
    const simChoices = [...simSet].map(k => simDict[k] || k);

    const userName = (nome && nome.value.trim()) ? nome.value.trim() : '[seu nome]';
    const selectedSvc = servicoSel ? servicoSel.value : 'Avaliação geral';
    const prefDay = dia ? dia.value : 'Qualquer dia útil';
    const prefTime = horario ? horario.value : 'Tarde';
    const complaint = (queixa && queixa.value.trim()) ? queixa.value.trim() : '[conte aqui seus objetivos]';

    let msg = `Olá, ${SITE.doutora.nome}! Meu nome é ${userName}.\n` +
      `Tenho interesse em: ${selectedSvc}.\n` +
      `Dia de preferência: ${prefDay}.\n` +
      `Melhor horário: ${prefTime}.\n` +
      `O que mais me incomoda: ${complaint}.`;

    if (simChoices.length > 0) {
      msg += `\nNa simulação do site, quis: ${simChoices.join(', ')}.`;
    }

    msg += `\nVou enviar minha foto diretamente por aqui no WhatsApp para a pré-análise e agendamento da minha avaliação.`;
    return msg;
  }

  function updatePreview() {
    preview.textContent = buildMessage();
  }

  // Live input events
  ['input', 'change'].forEach(evt => {
    form.addEventListener(evt, () => {
      if (nome && nome.value.trim() && nomeError) {
        nomeError.classList.remove('visible');
      }
      updatePreview();
    });
  });

  window.addEventListener('simulatorUpdate', updatePreview);
  updatePreview();

  // Submit Handler
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!nome.value.trim()) {
      if (nomeError) nomeError.classList.add('visible');
      nome.focus();
      return;
    }

    if (nomeError) nomeError.classList.remove('visible');

    const msg = buildMessage();
    const waUrl = `https://wa.me/${SITE.doutora.whatsapp}?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  });

  // Copy Message Handler
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const msg = buildMessage();
      navigator.clipboard.writeText(msg).then(() => {
        const originalText = copyBtn.textContent;
        copyBtn.textContent = '✓ Mensagem copiada!';
        setTimeout(() => {
          copyBtn.textContent = originalText;
        }, 2400);
      }).catch(() => {
        alert('Não foi possível copiar automaticamente.');
      });
    });
  }
}

/**
 * 15. FAQ Accordion (Styled Details with One Open at a Time)
 */
function initFAQAccordion() {
  const faqList = document.getElementById('faqList');
  if (!faqList || !SITE.faq) return;

  faqList.innerHTML = SITE.faq.map((item, idx) => `
    <details class="faq-item" ${idx === 0 ? 'open' : ''}>
      <summary>
        <span>${item.p}</span>
        <span class="faq-icon" aria-hidden="true">+</span>
      </summary>
      <div class="faq-ans">
        <p>${item.r}</p>
      </div>
    </details>
  `).join('');

  const details = faqList.querySelectorAll('.faq-item');
  details.forEach(targetDetail => {
    targetDetail.addEventListener('toggle', () => {
      if (targetDetail.open) {
        details.forEach(otherDetail => {
          if (otherDetail !== targetDetail && otherDetail.open) {
            otherDetail.open = false;
          }
        });
      }
    });
  });
}

/**
 * 16. Magnetic Buttons & Custom Gold Cursor (Desktop Only)
 */
function initMagneticButtonsAndCursor() {
  const isTouchDevice = !window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const cursor = document.getElementById('cursorGlow');
  if (isTouchDevice || !cursor) {
    if (cursor) cursor.style.display = 'none';
    return;
  }

  // Smooth cursor follow
  window.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  }, { passive: true });

  // Hover states on interactive elements
  const hoverTargets = document.querySelectorAll('a, button, .chip, .svc, figure');
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });

  // Magnetic button displacement (up to 8px)
  document.querySelectorAll('.magnetic-btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const moveX = Math.max(-8, Math.min(8, x * 0.2));
      const moveY = Math.max(-8, Math.min(8, y * 0.2));
      btn.style.transform = `translate3d(${moveX}px, ${moveY}px, 0) scale(1.02)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
}

/**
 * 17. Analytics Event Tracking Stubs
 */
function initAnalyticsTracking() {
  window.trackEvent = function(eventName, eventData = {}) {
    if (window.dataLayer && typeof window.dataLayer.push === 'function') {
      window.dataLayer.push({ event: eventName, ...eventData });
    }
  };
}
