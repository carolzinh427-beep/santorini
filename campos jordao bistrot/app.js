/**
 * Bistrot de Ville - Campos do Jordão
 * Premium Valentine's Day Campaign Interactive Logic
 * Incorporates a premium synthesized audio generator (Web Audio API), 
 * dynamic multi-step booking modal, ambient auto-selectors, scroll reveal and scarcity counter.
 */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. Floating WhatsApp Link ---
  // Managed directly via static HTML anchor link, no custom audio synthesis required.

  // --- Header Scroll State ---
  const siteHeader = document.querySelector('header');

  function updateHeaderState() {
    if (!siteHeader) return;
    siteHeader.classList.toggle('scrolled', window.scrollY > 24);
  }

  updateHeaderState();
  window.addEventListener('scroll', updateHeaderState, { passive: true });


  // --- 2. Interactive Multi-Step Reservation Modal ---
  const modal = document.getElementById('bookingModal');
  const openModalBtns = document.querySelectorAll('.js-open-modal');
  const scrollToAmbientsBtns = document.querySelectorAll('.js-scroll-to-ambients');
  const closeModalBtn = document.getElementById('closeModal');
  const formSteps = document.querySelectorAll('.form-step');
  const progressSteps = document.querySelectorAll('.progress-step');
  const btnNext = document.getElementById('btnNext');
  const btnBack = document.getElementById('btnBack');
  const modalFooter = document.getElementById('modalFooter');

  if (modal) {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  }

  let currentStep = 1;
  const totalSteps = 3;

  // Selected reservation state
  const bookingState = {
    ambient: 'Belle Époque (Interno)',
    date: '12 de Junho - Jantar Especial',
    time: '19:30',
    guests: '2 pessoas (Casal)',
    name: '',
    phone: '',
    wishes: ''
  };

  // Open Modal
  function openBookingModal(preselectedAmbient = '') {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';

    if (preselectedAmbient) {
      bookingState.ambient = preselectedAmbient;
      // Highlight in the selector UI
      const ambientOptions = document.querySelectorAll('.ambient-option');
      ambientOptions.forEach(opt => {
        if (opt.dataset.ambient === preselectedAmbient) {
          opt.classList.add('selected');
        } else {
          opt.classList.remove('selected');
        }
      });
    }
    goToStep(1);
  }

  // Close Modal
  function closeBookingModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const selectedAmbient = btn.getAttribute('data-ambient') || '';
      const message = selectedAmbient
        ? `Olá! Gostaria de reservar uma mesa para o jantar especial de Dia dos Namorados no Bistrot de Ville. Ambiente desejado: ${selectedAmbient}.`
        : 'Olá! Gostaria de reservar uma mesa para o jantar especial de Dia dos Namorados no Bistrot de Ville.';
      window.location.href = `https://wa.me/5512997421206?text=${encodeURIComponent(message)}`;
    });
  });

  scrollToAmbientsBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      document.getElementById('ambientSection')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  closeModalBtn.addEventListener('click', closeBookingModal);

  // Close on backdrop click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeBookingModal();
    }
  });

  // Handle ambient option click in step 1
  const ambientOptions = document.querySelectorAll('.ambient-option');
  ambientOptions.forEach(option => {
    option.addEventListener('click', () => {
      ambientOptions.forEach(opt => opt.classList.remove('selected'));
      option.classList.add('selected');
      bookingState.ambient = option.dataset.ambient;
    });
  });

  // Stepper logic
  function goToStep(step) {
    currentStep = step;

    // Update step visibility
    formSteps.forEach(stepEl => {
      stepEl.classList.remove('active');
      if (parseInt(stepEl.dataset.step) === step) {
        stepEl.classList.add('active');
      }
    });

    // Update progress bar
    progressSteps.forEach((progressEl, index) => {
      const stepIndex = index + 1;
      progressEl.classList.remove('active', 'completed');
      if (stepIndex === step) {
        progressEl.classList.add('active');
      } else if (stepIndex < step) {
        progressEl.classList.add('completed');
      }
    });

    // Footer actions
    if (step === 1) {
      btnBack.style.display = 'none';
      btnNext.innerText = 'Próximo Passo';
    } else if (step === 2) {
      btnBack.style.display = 'block';
      btnNext.innerText = 'Confirmar Reserva';
    } else if (step === 3) {
      // Success step: Hide standard footer buttons
      modalFooter.style.display = 'none';

      // Update receipt summary info dynamically
      document.getElementById('receiptName').innerText = bookingState.name;
      document.getElementById('receiptPhone').innerText = bookingState.phone;
      document.getElementById('receiptAmbient').innerText = bookingState.ambient;
      document.getElementById('receiptTime').innerText = bookingState.time;
    }
  }

  function validateStep(step) {
    if (step === 1) {
      // Save date and time selection
      bookingState.date = document.getElementById('bookingDate').value;
      bookingState.time = document.getElementById('bookingTime').value;
      bookingState.guests = document.getElementById('bookingGuests').value;
      return true;
    }

    if (step === 2) {
      const nameInput = document.getElementById('userName');
      const phoneInput = document.getElementById('userPhone');

      if (!nameInput.value.trim()) {
        alert('Por favor, informe seu nome completo para a reserva.');
        nameInput.focus();
        return false;
      }

      if (!phoneInput.value.trim()) {
        alert('Por favor, forneça um número de WhatsApp para confirmação.');
        phoneInput.focus();
        return false;
      }

      bookingState.name = nameInput.value;
      bookingState.phone = phoneInput.value;
      bookingState.wishes = document.getElementById('userWishes').value;
      return true;
    }

    return true;
  }

  btnNext.addEventListener('click', () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        goToStep(currentStep + 1);
      }
    }
  });

  btnBack.addEventListener('click', () => {
    if (currentStep > 1) {
      goToStep(currentStep - 1);
    }
  });

  // --- 4. Scroll Reveal Animations ---
  const revealElements = document.querySelectorAll('.reveal');

  function checkReveal() {
    const triggerBottom = window.innerHeight * 0.85;

    revealElements.forEach(el => {
      const elTop = el.getBoundingClientRect().top;
      if (elTop < triggerBottom) {
        el.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', checkReveal);
  // Run once on load to reveal hero or top elements
  checkReveal();

  // --- 5. Falling Purple Petals Animation ---
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isSmallScreen = window.matchMedia('(max-width: 600px)').matches;

  if (prefersReducedMotion || isSmallScreen) {
    return;
  }

  const petalsContainer = document.createElement('div');
  petalsContainer.id = 'petalsContainer';
  document.body.appendChild(petalsContainer);

  const petalColors = ['#6a9770ff', '#548352ff', '#76a670ff', '#6F654F']; // Harmony of romantic tones

  function createPetal() {
    const petal = document.createElement('div');
    petal.classList.add('petal');

    // Randomize initial position and size
    const size = Math.random() * 15 + 10; // between 10px and 25px
    petal.style.width = `${size}px`;
    petal.style.height = `${size}px`;
    petal.style.left = `${Math.random() * 100}vw`;

    // Randomize rotation
    petal.style.transform = `rotate(${Math.random() * 360}deg)`;

    // Choose random romantic gradient tone
    const color1 = petalColors[Math.floor(Math.random() * petalColors.length)];
    const color2 = '#131010'; // Blend with black wine
    petal.style.background = `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`;

    // Randomize duration and delay
    const duration = Math.random() * 6 + 6; // between 6s and 12s
    petal.style.animationDuration = `${duration}s`;

    // Remove petal after animation completes
    setTimeout(() => {
      petal.remove();
    }, duration * 1000);

    petalsContainer.appendChild(petal);
  }

  // Initial burst of petals when landing page is loaded
  for (let i = 0; i < 20; i++) {
    setTimeout(createPetal, Math.random() * 2000); // spread initial burst over 2 seconds
  }

  // Continuous slow drift of falling petals
  setInterval(createPetal, 450);
});
