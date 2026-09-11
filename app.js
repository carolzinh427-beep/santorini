/* ==========================================================================
   SANTORINI LOUNGE — FRONTEND APPLICATION LOGIC (app.js)
   ========================================================================== */

// Initial Seed Data for Menu Items with high quality distinct images
const INITIAL_MENU_ITEMS = [
  {
    id: 'm1',
    category: 'entradas',
    name: 'Tzatziki com Pão Pita Artesanal',
    price: 28.00,
    badge: 'Clássico Grego',
    description: 'Iogurte grego artesanal, pepino crocante, alho suave, azeite extra virgem grego e hortelã fresca.',
    image: 'assets/entrada.png',
    is_active: true
  },
  {
    id: 'm2',
    category: 'entradas',
    name: 'Bruschetta Greca com Queijo Feta',
    price: 32.00,
    badge: 'Mais Pedido',
    description: 'Pão de fermentação natural grelhado, tomates assados no azeite, queijo Feta DOP, azeitonas Kalamata e orégano.',
    image: 'assets/entrada.png',
    is_active: true
  },
  {
    id: 'm3',
    category: 'entradas',
    name: 'Polvo Grelhado à Moda Santorini',
    price: 48.00,
    badge: 'Destaque Chef',
    description: 'Tentáculos de polvo marinado grelhado no carvão, servido com purê de fava amarela, limão siciliano e alcaparras.',
    image: 'assets/polvo_grelhado.png',
    is_active: true
  },
  {
    id: 'm4',
    category: 'pratos',
    name: 'Moussaka Tradicional Gratinada',
    price: 78.00,
    badge: 'Especialidade',
    description: 'Camadas intercaladas de berinjela grelhada, batata, ragù de carne temperado com especiarias mediterrâneas e béchamel cremoso.',
    image: 'assets/moussaka.png',
    is_active: true
  },
  {
    id: 'm5',
    category: 'pratos',
    name: 'Risoto de Limão Siciliano com Camarões',
    price: 84.00,
    badge: 'Imperdível',
    description: 'Arroz arbóreo cremoso aromatizado com limão siciliano grelhado, camarões rosa grandes grelhados e finalizado com Feta.',
    image: 'assets/prato-salmao.png',
    is_active: true
  },
  {
    id: 'm6',
    category: 'pratos',
    name: 'Filé Mignon ao Molho de Ervas',
    price: 89.00,
    badge: 'Premium',
    description: 'Medalhão de filé mignon grelhado na crosta de pimentas e molho demi-glace aromatizado com alecrim, acompanhado de batatas rústicas.',
    image: 'assets/prato-carne.png',
    is_active: true
  },
  {
    id: 'm7',
    category: 'porcoes',
    name: 'Meze Platter Mediterrâneo',
    price: 64.00,
    badge: 'Para Compartilhar',
    description: 'Seleção artesanal de Tzatziki, Hommus, Babaganoush, azeitonas marroquinas, falafel crocante e pão pita quente.',
    image: 'assets/prato-ragu.png',
    is_active: true
  },
  {
    id: 'm8',
    category: 'sobremesas',
    name: 'Baklava Tradicional Folhada',
    price: 28.00,
    badge: 'Sobremesa Guia',
    description: 'Massa folhada artesanal recheada com nozes, pistache moído, aromatizada com calda de mel e água de azahar.',
    image: 'assets/baklava.png',
    is_active: true
  },
  {
    id: 'm9',
    category: 'sobremesas',
    name: 'Cheesecake de Frutas Vermelhas Grega',
    price: 26.00,
    badge: 'Refrescante',
    description: 'Base de biscoito amanteigado, creme leve à base de iogurte grego e coulis artesanal de frutas vermelhas.',
    image: 'assets/sobremesa.png',
    is_active: true
  },
  {
    id: 'm10',
    category: 'sobremesas',
    name: 'Sorvete Grego com Mel e Pistache',
    price: 24.00,
    badge: 'Autoral',
    description: 'Sorvete artesanal de iogurte grego cremoso, mel puro orgânico e praliné de pistaches crocantes.',
    image: 'assets/sobremesa-fondue.png',
    is_active: true
  },
  {
    id: 'm11',
    category: 'drinks',
    name: 'Santorini Sunset',
    price: 36.00,
    badge: 'Signature',
    description: 'Gin premium, licor Aperol, xarope artesanal de maracujá, citrus infusionado com alecrim e espuma leve.',
    image: 'assets/santorini_sunset.png',
    is_active: true
  },
  {
    id: 'm12',
    category: 'drinks',
    name: 'Ouzo Lemonade Refresh',
    price: 32.00,
    badge: 'Tradição',
    description: 'Autêntico Ouzo grego, suco de limão siciliano fresco, xarope de hortelã, água com gás e gelo cristalino.',
    image: 'assets/noite_ouzo.png',
    is_active: true
  },
  {
    id: 'm13',
    category: 'drinks',
    name: 'Blue Aegean Cocktail',
    price: 34.00,
    badge: 'Visual Único',
    description: 'Vodka refinada, curaçau blue, água de coco, infusão de capim-santo e lâmina de limão taiti.',
    image: 'assets/blue_aegean.png',
    is_active: true
  },
  {
    id: 'm14',
    category: 'bebidas',
    name: 'Vinho Branco Grego Assyrtiko 750ml',
    price: 140.00,
    badge: 'Carta Especial',
    description: 'Vinho de acidez vibrante, notas minerais e cítricas produzidas na região vulcânica de Santorini.',
    image: 'assets/blue_aegean.png',
    is_active: true
  }
];

// Initial Seed Data for Events & Experiences
const INITIAL_EVENTS = [
  {
    id: 'ev1',
    title: 'Jantar Harmonizado Mediterrâneo',
    subtitle: 'Uma experiência gastronômica em 5 passos com harmonização de vinhos.',
    day: '25',
    month: 'MAI',
    priceText: 'R$ 180 / pessoa',
    description: 'Uma noite imersiva com menu degustação grego, coquetéis artesanais e música ao vivo mediterrânea.',
    image: 'assets/lounge_experience.png',
    is_active: true
  },
  {
    id: 'ev2',
    title: 'Jantar dos Namorados',
    subtitle: 'Romance à luz de velas e menu autoral.',
    day: '12',
    month: 'JUN',
    priceText: 'R$ 290 / casal',
    description: 'Romance sob as estrelas com menu especial de 5 tempos, harmonização de vinhos e trilha sonora intimista.',
    image: 'assets/hero_santorini.png',
    is_active: true
  },
  {
    id: 'ev3',
    title: 'Sunset Lounge Sessions',
    subtitle: 'DJ Set com Deep House mediterrâneo no crepúsculo.',
    day: 'SÁB',
    month: '18H',
    priceText: 'Couvert R$ 25',
    description: 'Todos os sábados no pôr do sol. DJ set refinado, ambiente sofisticado e carta de drinks promocional.',
    image: 'assets/santorini_sunset.png',
    is_active: true
  }
];

// Menu Expand State
let isMenuExpanded = false;
let currentCategoryFilter = 'todos';

// Initialize Application Data Store in localStorage
function initializeDataStore() {
  if (!localStorage.getItem('santorini_menu_items')) {
    localStorage.setItem('santorini_menu_items', JSON.stringify(INITIAL_MENU_ITEMS));
  }
  if (!localStorage.getItem('santorini_events')) {
    localStorage.setItem('santorini_events', JSON.stringify(INITIAL_EVENTS));
  }
}

// Get Menu Items from LocalStorage
function getMenuItems() {
  const data = localStorage.getItem('santorini_menu_items');
  return data ? JSON.parse(data) : INITIAL_MENU_ITEMS;
}

// Get Events from LocalStorage
function getEvents() {
  const data = localStorage.getItem('santorini_events');
  return data ? JSON.parse(data) : INITIAL_EVENTS;
}

// Format Price to BRL
function formatPrice(val) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
}

// Render Menu Cards with Compact View & Toggle Button
function renderMenu(filterCategory = 'todos') {
  currentCategoryFilter = filterCategory;
  const container = document.getElementById('menuItemsGrid');
  const expandWrapper = document.getElementById('menuExpandWrapper');
  if (!container) return;

  const items = getMenuItems();
  const filtered = items.filter(item => {
    if (!item.is_active) return false;
    if (filterCategory === 'todos') return true;
    return item.category === filterCategory;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-muted);">
        <p>Nenhum item disponível nesta categoria no momento.</p>
      </div>
    `;
    if (expandWrapper) expandWrapper.innerHTML = '';
    return;
  }

  // Display only first 6 items if not expanded
  const displayItems = isMenuExpanded ? filtered : filtered.slice(0, 6);

  container.innerHTML = displayItems.map(item => `
    <article class="menu-item-card" data-category="${item.category}">
      <div class="menu-item-img-wrapper">
        <img src="${item.image || 'assets/moussaka.png'}" alt="${item.name}" class="menu-item-img" loading="lazy">
        ${item.badge ? `<span class="menu-item-badge">${item.badge}</span>` : ''}
      </div>
      <div class="menu-item-info">
        <div class="menu-item-header">
          <h3 class="menu-item-name">${item.name}</h3>
          <span class="menu-item-price">${formatPrice(item.price)}</span>
        </div>
        <p class="menu-item-description">${item.description}</p>
      </div>
    </article>
  `).join('');

  // Render "Ver Cardápio Completo" button if there are more than 6 items
  if (expandWrapper) {
    if (filtered.length > 6) {
      expandWrapper.innerHTML = `
        <button id="toggleMenuExpandBtn" class="btn-secondary" style="padding: 12px 32px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">
          ${isMenuExpanded ? 'Recolher Cardápio ▲' : `Ver Cardápio Completo (${filtered.length} itens) ▼`}
        </button>
      `;

      const btn = document.getElementById('toggleMenuExpandBtn');
      if (btn) {
        btn.addEventListener('click', () => {
          isMenuExpanded = !isMenuExpanded;
          renderMenu(currentCategoryFilter);
        });
      }
    } else {
      expandWrapper.innerHTML = '';
    }
  }
}

// Category Filter Listener
function setupMenuFilters() {
  const filterBtns = document.querySelectorAll('.menu-filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      isMenuExpanded = false; // reset expand on category change
      renderMenu(filter);
    });
  });
}

// Render Events & Experiences Section
function renderEventsSection() {
  const container = document.getElementById('eventsContainer');
  if (!container) return;

  const events = getEvents().filter(e => e.is_active);

  if (events.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--areia);">
        <p>Nenhum evento programado no momento. Acompanhe nossas redes sociais!</p>
      </div>
    `;
    return;
  }

  container.innerHTML = events.map(event => `
    <article class="event-card">
      <div class="event-card-img-wrapper">
        <img src="${event.image || 'assets/lounge_experience.png'}" alt="${event.title}" class="event-card-img" loading="lazy">
        <div class="event-date-badge">
          <div class="day">${event.day || 'EV'}</div>
          <div class="month">${event.month || 'AGO'}</div>
        </div>
      </div>
      <div class="event-card-body">
        <h3 class="event-card-title">${event.title}</h3>
        <p style="color: var(--gold); font-size: 0.85rem; font-weight: 600; margin-bottom: 8px;">${event.subtitle || ''}</p>
        <p class="event-card-desc">${event.description}</p>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: auto; padding-top: 16px;">
          <span style="font-weight: 700; color: var(--navy); font-size: 1rem;">${event.priceText || ''}</span>
          <a href="#reservas" class="btn-navy" style="padding: 6px 16px; font-size: 0.8rem;">Reservar</a>
        </div>
      </div>
    </article>
  `).join('');
}

// Handle Reservation Form Submit
function setupReservationForm() {
  const form = document.getElementById('reservationForm');
  const successMsg = document.getElementById('reservationSuccessMessage');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const reservation = {
      id: 'res_' + Date.now(),
      name: document.getElementById('resName').value,
      phone: document.getElementById('resPhone').value,
      email: document.getElementById('resEmail').value,
      date: document.getElementById('resDate').value,
      time: document.getElementById('resTime').value,
      guests: document.getElementById('resGuests').value,
      notes: document.getElementById('resNotes').value,
      created_at: new Date().toISOString(),
      status: 'pendente'
    };

    // Store in localStorage
    const existing = JSON.parse(localStorage.getItem('santorini_reservations') || '[]');
    existing.unshift(reservation);
    localStorage.setItem('santorini_reservations', JSON.stringify(existing));

    form.style.display = 'none';
    if (successMsg) successMsg.style.display = 'block';
  });
}

// Navbar Scroll Effect & Mobile Drawer
function setupNavigation() {
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
      });
    });
  }
}

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  initializeDataStore();
  renderMenu('todos');
  setupMenuFilters();
  renderEventsSection();
  setupReservationForm();
  setupNavigation();
});
