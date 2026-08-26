/* ==========================================================================
   SANTORINI LOUNGE — APP LOGIC ENGINE
   ========================================================================== */

(function () {
  'use strict';

  // --- INITIAL DATA STORE ---
  const DEFAULT_MENU_ITEMS = [
    {
      id: 'm1',
      name: 'Tzatziki com Pão Pita Artesanal',
      category: 'entradas',
      price: 34.00,
      description: 'Labneh cremoso com pepino fresco, alho, azeite grego extravirgem e pão pita quentinho.',
      image: 'assets/entrada.png',
      badge: 'Chef Special',
      available: true
    },
    {
      id: 'm2',
      name: 'Bruschetta Grega de Queijo Feta',
      category: 'entradas',
      price: 38.00,
      description: 'Pão de fermentação natural grelhado, tomates sweet grape, queijo feta, azeitonas e orégano fresco.',
      image: 'assets/entrada.png',
      badge: 'Vegetariano',
      available: true
    },
    {
      id: 'm3',
      name: 'Polvo Grelhado em Fava de Santorini',
      category: 'principais',
      price: 98.00,
      description: 'Tentáculo de polvo grelhado no carvão, servido sobre fava amarela tradicional, alcaparras e redução de vinagre balsâmico.',
      image: 'assets/octopus.png',
      badge: 'Mais Pedido',
      available: true
    },
    {
      id: 'm4',
      name: 'Moussaka Tradicional da Casa',
      category: 'principais',
      price: 78.00,
      description: 'Camadas de berinjela grelhada, batata, ragu artesanal de carne com especiarias mediterrâneas e molho béchamel gratinado.',
      image: 'assets/carne.png',
      badge: 'Clássico',
      available: true
    },
    {
      id: 'm5',
      name: 'Salmão ao Molho Champagne & Risoto',
      category: 'principais',
      price: 92.00,
      description: 'Posta de salmão grelhada ao molho champagne acompanhada de risoto cremoso de alho-poró.',
      image: 'assets/salmao.png',
      badge: 'Premium',
      available: true
    },
    {
      id: 'm6',
      name: 'Tábua Mezze Santorini (2 Pessoas)',
      category: 'porcoes',
      price: 78.00,
      description: 'Seleção de queijos gregos, azeitonas Kalamata, falafel, hummus de grão de bico e pita artesanal.',
      image: 'assets/entrada.png',
      badge: 'Compartilhar',
      available: true
    },
    {
      id: 'm7',
      name: 'Baklava de Pistache com Gelato',
      category: 'sobremesas',
      price: 32.00,
      description: 'Massa folhada crocante recheada com pistaches selecionados, calda de mel e sorvete artesanal de baunilha.',
      image: 'assets/sobremesa.png',
      badge: 'Sobremesa',
      available: true
    },
    {
      id: 'm8',
      name: 'Santorini Sunset Cocktail',
      category: 'drinks',
      price: 38.00,
      description: 'Gin premium, curaçao blue, suco de maracujá, xarope de frutas amarelas e tônica infusionada com hortelã.',
      image: 'assets/drink.png',
      badge: 'Autoral',
      available: true
    },
    {
      id: 'm9',
      name: 'Ouzo Lesvos Shot Tradicional',
      category: 'drinks',
      price: 26.00,
      description: 'Destilado grego de aneto e ervas, servido nevado com pedras de gelo.',
      image: 'assets/ouzo_event.png',
      badge: 'Tradicional',
      available: true
    }
  ];

  const DEFAULT_EVENTS = [
    {
      id: 'e1',
      title: 'Noite do Ouzo & Gastronomia Grega',
      subtitle: 'Menu harmonizado em 4 tempos sob as estrelas',
      date: '25 de Maio, 2026',
      time: '20:00 às 02:00',
      price: 190.00,
      description: 'Uma celebração especial inspirada nas noites de Santorini com coquetéis de Ouzo exclusivos, alta gastronomia e música mediterrânea ao vivo.',
      image: 'assets/ouzo_event.png',
      isActive: true
    },
    {
      id: 'e2',
      title: 'Sunset Lounge Sessions & Wine Tasting',
      subtitle: 'Degustação de rótulos gregos e DJ set ao vivo',
      date: '12 de Junho, 2026',
      time: '18:00 às 00:00',
      price: 160.00,
      description: 'Contemple o pôr do sol acompanhado de uma seleção exclusiva de vinhos brancos da variedade Assyrtiko.',
      image: 'assets/hero.png',
      isActive: false
    }
  ];

  const DEFAULT_GALLERY = [
    { id: 'g1', title: 'Terraço Santorini', category: 'ambiente', image: 'assets/hero.png', isLarge: true },
    { id: 'g2', title: 'Arcos Mediterrâneos', category: 'ambiente', image: 'assets/lounge.png' },
    { id: 'g3', title: 'Polvo Grelhado em Fava', category: 'gastronomia', image: 'assets/octopus.png' },
    { id: 'g4', title: 'Santorini Sunset Drink', category: 'drinks', image: 'assets/drink.png' },
    { id: 'g5', title: 'Noite do Ouzo', category: 'drinks', image: 'assets/ouzo_event.png' },
    { id: 'g6', title: 'Entrada Provençal', category: 'gastronomia', image: 'assets/entrada.png' }
  ];

  const DEFAULT_RESERVATIONS = [
    {
      id: 'r101',
      name: 'Gabriel Siqueira',
      phone: '(31) 99882-1144',
      email: 'gabriel@email.com',
      date: '2026-06-12',
      time: '19:00',
      guests: '2 pessoas',
      notes: 'Mesa na varanda com vista.',
      status: 'Confirmada'
    }
  ];

  // --- STATE CONTROLLER ---
  class AppController {
    constructor() {
      this.menuItems = JSON.parse(localStorage.getItem('santorini_menu')) || DEFAULT_MENU_ITEMS;
      this.events = JSON.parse(localStorage.getItem('santorini_events')) || DEFAULT_EVENTS;
      this.gallery = JSON.parse(localStorage.getItem('santorini_gallery')) || DEFAULT_GALLERY;
      this.reservations = JSON.parse(localStorage.getItem('santorini_reservations')) || DEFAULT_RESERVATIONS;

      this.currentCategory = 'todos';
      this.searchQuery = '';
      this.currentGalleryCat = 'todos';

      this.init();
    }

    init() {
      this.bindEvents();
      this.renderMenu();
      this.renderSpecialEvent();
      this.renderEventsGrid();
      this.renderGallery();
      this.checkUrlRoute();
    }

    saveState() {
      localStorage.setItem('santorini_menu', JSON.stringify(this.menuItems));
      localStorage.setItem('santorini_events', JSON.stringify(this.events));
      localStorage.setItem('santorini_gallery', JSON.stringify(this.gallery));
      localStorage.setItem('santorini_reservations', JSON.stringify(this.reservations));
    }

    bindEvents() {
      // Header Scroll Effect
      const header = document.getElementById('mainHeader');
      window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      });

      // Mobile Nav Drawer Toggle
      const navToggle = document.getElementById('mobileNavToggle');
      const navDrawer = document.getElementById('mobileNavDrawer');
      if (navToggle && navDrawer) {
        navToggle.addEventListener('click', () => {
          navDrawer.classList.toggle('active');
        });
        document.querySelectorAll('.js-close-mobile').forEach(item => {
          item.addEventListener('click', () => navDrawer.classList.remove('active'));
        });
      }

      // Search Input
      const searchInput = document.getElementById('menuSearchInput');
      if (searchInput) {
        searchInput.addEventListener('input', (e) => {
          this.searchQuery = e.target.value.toLowerCase().trim();
          this.renderMenu();
        });
      }

      // Category Chips
      const filterChips = document.querySelectorAll('#menuFilterChips .filter-chip');
      filterChips.forEach(chip => {
        chip.addEventListener('click', () => {
          filterChips.forEach(c => c.classList.remove('active'));
          chip.classList.add('active');
          this.currentCategory = chip.getAttribute('data-category');
          this.renderMenu();
        });
      });

      // Gallery Chips
      const galChips = document.querySelectorAll('#galleryFilterChips .filter-chip');
      galChips.forEach(chip => {
        chip.addEventListener('click', () => {
          galChips.forEach(c => c.classList.remove('active'));
          chip.classList.add('active');
          this.currentGalleryCat = chip.getAttribute('data-gal-cat');
          this.renderGallery();
        });
      });

      // Reservation Form Submission
      const resForm = document.getElementById('publicReservationForm');
      if (resForm) {
        resForm.addEventListener('submit', (e) => {
          e.preventDefault();
          this.handleReservationSubmission();
        });
      }

      // Lightbox Close
      const lbClose = document.getElementById('lightboxClose');
      const lbModal = document.getElementById('lightboxModal');
      if (lbClose && lbModal) {
        lbClose.addEventListener('click', () => lbModal.classList.remove('active'));
        lbModal.addEventListener('click', (e) => {
          if (e.target === lbModal) lbModal.classList.remove('active');
        });
      }

      // Booking Trigger CTAs
      document.querySelectorAll('.js-open-booking').forEach(btn => {
        btn.addEventListener('click', () => {
          document.getElementById('reservationSection').scrollIntoView({ behavior: 'smooth' });
        });
      });

      // Check Hash for #admin
      window.addEventListener('hashchange', () => this.checkUrlRoute());
    }

    checkUrlRoute() {
      if (window.location.hash === '#admin') {
        this.openAdminOverlay();
      }
    }

    // --- DIGITAL MENU RENDER ---
    filterMenuCategory(cat) {
      this.currentCategory = cat;
      const chips = document.querySelectorAll('#menuFilterChips .filter-chip');
      chips.forEach(c => {
        if (c.getAttribute('data-category') === cat) c.classList.add('active');
        else c.classList.remove('active');
      });
      document.getElementById('menuSection').scrollIntoView({ behavior: 'smooth' });
      this.renderMenu();
    }

    renderMenu() {
      const container = document.getElementById('menuItemsContainer');
      if (!container) return;

      const filtered = this.menuItems.filter(item => {
        const matchesCategory = this.currentCategory === 'todos' || item.category === this.currentCategory;
        const matchesSearch = item.name.toLowerCase().includes(this.searchQuery) ||
                              item.description.toLowerCase().includes(this.searchQuery);
        return matchesCategory && matchesSearch && item.available;
      });

      if (filtered.length === 0) {
        container.innerHTML = `
          <div style="grid-column: span 2; text-align: center; padding: 40px; color: var(--text-muted);">
            <p>Nenhum item encontrado nesta categoria.</p>
          </div>
        `;
        return;
      }

      container.innerHTML = filtered.map(item => `
        <article class="menu-item-card">
          <img src="${item.image}" alt="${item.name}" class="menu-item-img">
          <div class="menu-item-info">
            <div class="menu-item-header">
              <h3 class="menu-item-title">${item.name}</h3>
              <span class="menu-item-price">R$ ${item.price.toFixed(2).replace('.', ',')}</span>
            </div>
            <p class="menu-item-desc">${item.description}</p>
            <div class="menu-item-tags">
              ${item.badge ? `<span class="badge-tag">${item.badge}</span>` : ''}
            </div>
          </div>
        </article>
      `).join('');
    }

    // --- SPECIAL EVENT RENDER ---
    renderSpecialEvent() {
      const activeEvent = this.events.find(e => e.isActive);
      const banner = document.getElementById('specialEventBanner');
      if (!banner || !activeEvent) return;

      document.getElementById('specialEventTitle').textContent = activeEvent.title;
      document.getElementById('specialEventDate').textContent = `📅 ${activeEvent.date}`;
      document.getElementById('specialEventTime').textContent = `⏰ ${activeEvent.time}`;
      document.getElementById('specialEventPrice').textContent = `💳 R$ ${activeEvent.price.toFixed(2).replace('.', ',')} por pessoa`;
      document.getElementById('specialEventDesc').textContent = activeEvent.description;
      document.getElementById('specialEventImg').src = activeEvent.image;
    }

    // --- EVENTS GRID RENDER ---
    renderEventsGrid() {
      const container = document.getElementById('eventsGridContainer');
      if (!container) return;

      container.innerHTML = this.events.map(ev => `
        <article class="event-card">
          <img src="${ev.image}" alt="${ev.title}" class="event-card-img">
          <div class="event-card-body">
            <div class="event-date-tag">${ev.date} • ${ev.time}</div>
            <h3>${ev.title}</h3>
            <p>${ev.description}</p>
            <button class="btn-primary js-open-booking" style="width: 100%; padding: 12px 20px;">
              Reservar Evento
            </button>
          </div>
        </article>
      `).join('');

      // Re-bind booking buttons
      document.querySelectorAll('.js-open-booking').forEach(btn => {
        btn.addEventListener('click', () => {
          document.getElementById('reservationSection').scrollIntoView({ behavior: 'smooth' });
        });
      });
    }

    // --- GALLERY RENDER ---
    renderGallery() {
      const container = document.getElementById('galleryContainer');
      if (!container) return;

      const filtered = this.gallery.filter(g => 
        this.currentGalleryCat === 'todos' || g.category === this.currentGalleryCat
      );

      container.innerHTML = filtered.map(item => `
        <div class="gallery-item ${item.isLarge ? 'large' : ''}" onclick="app.openLightbox('${item.image}')">
          <img src="${item.image}" alt="${item.title}">
          <div class="gallery-hover-overlay">
            <span style="color: var(--off-white); font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; font-size: 0.85rem;">
              🔍 ${item.title}
            </span>
          </div>
        </div>
      `).join('');
    }

    openLightbox(imgUrl) {
      const modal = document.getElementById('lightboxModal');
      const img = document.getElementById('lightboxImg');
      if (modal && img) {
        img.src = imgUrl;
        modal.classList.add('active');
      }
    }

    // --- PUBLIC RESERVATION HANDLER ---
    handleReservationSubmission() {
      const name = document.getElementById('resName').value;
      const phone = document.getElementById('resPhone').value;
      const email = document.getElementById('resEmail').value;
      const guests = document.getElementById('resGuests').value;
      const date = document.getElementById('resDate').value;
      const time = document.getElementById('resTime').value;
      const notes = document.getElementById('resNotes').value;

      const newRes = {
        id: 'r' + Date.now().toString().slice(-4),
        name, phone, email, guests, date, time, notes,
        status: 'Pendente'
      };

      this.reservations.unshift(newRes);
      this.saveState();

      alert(`🏛️ PRÉ-RESERVA SOLICITADA COM SUCESSO!\n\nConvidado: ${name}\nData: ${date} às ${time}\nPessoas: ${guests}\n\nNossa equipe do Santorini Lounge entrará em contato via WhatsApp no número ${phone} para confirmação final.`);
      document.getElementById('publicReservationForm').reset();
    }

    // --- ADMIN DASHBOARD PANEL ---
    openAdminOverlay() {
      const overlay = document.getElementById('adminOverlay');
      if (overlay) {
        overlay.classList.add('active');
        this.switchAdminTab('menu');
      }
    }

    closeAdminOverlay() {
      const overlay = document.getElementById('adminOverlay');
      if (overlay) overlay.classList.remove('active');
      if (window.location.hash === '#admin') {
        history.pushState("", document.title, window.location.pathname + window.location.search);
      }
    }

    switchAdminTab(tabName) {
      const buttons = document.querySelectorAll('.admin-tab-btn');
      buttons.forEach(btn => btn.classList.remove('active'));

      const container = document.getElementById('adminTabContent');
      if (!container) return;

      if (tabName === 'menu') {
        buttons[0]?.classList.add('active');
        this.renderAdminMenuTab(container);
      } else if (tabName === 'events') {
        buttons[1]?.classList.add('active');
        this.renderAdminEventsTab(container);
      } else if (tabName === 'reservations') {
        buttons[2]?.classList.add('active');
        this.renderAdminReservationsTab(container);
      }
    }

    renderAdminMenuTab(container) {
      container.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
          <h3>Itens do Cardápio Digital (${this.menuItems.length})</h3>
          <button class="btn-primary btn-gold" onclick="app.addMenuItemPrompt()">+ Adicionar Novo Prato/Drink</button>
        </div>

        <table class="admin-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Categoria</th>
              <th>Preço</th>
              <th>Badge</th>
              <th>Disponível</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            ${this.menuItems.map(item => `
              <tr>
                <td><strong>${item.name}</strong></td>
                <td>${item.category.toUpperCase()}</td>
                <td>R$ ${item.price.toFixed(2)}</td>
                <td>${item.badge || '-'}</td>
                <td>${item.available ? '✅ Sim' : '❌ Não'}</td>
                <td>
                  <button onclick="app.toggleMenuItemAvailable('${item.id}')" style="color: var(--gold-muted); margin-right: 12px; font-weight: 600;">
                    Alternar Status
                  </button>
                  <button onclick="app.deleteMenuItem('${item.id}')" style="color: #ef4444; font-weight: 600;">
                    Excluir
                  </button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;
    }

    addMenuItemPrompt() {
      const name = prompt('Nome do Item:');
      if (!name) return;
      const category = prompt('Categoria (entradas, principais, porcoes, sobremesas, drinks, bebidas):', 'principais');
      const price = parseFloat(prompt('Preço (R$):', '65.00')) || 0;
      const description = prompt('Descrição:');

      const newItem = {
        id: 'm' + Date.now(),
        name,
        category: category.toLowerCase(),
        price,
        description: description || '',
        image: 'assets/octopus.png',
        badge: 'Novo',
        available: true
      };

      this.menuItems.unshift(newItem);
      this.saveState();
      this.renderMenu();
      this.switchAdminTab('menu');
    }

    toggleMenuItemAvailable(id) {
      const item = this.menuItems.find(i => i.id === id);
      if (item) {
        item.available = !item.available;
        this.saveState();
        this.renderMenu();
        this.switchAdminTab('menu');
      }
    }

    deleteMenuItem(id) {
      if (confirm('Tem certeza que deseja excluir este item?')) {
        this.menuItems = this.menuItems.filter(i => i.id !== id);
        this.saveState();
        this.renderMenu();
        this.switchAdminTab('menu');
      }
    }

    renderAdminEventsTab(container) {
      container.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
          <h3>Gerenciador de Eventos & Cardápios Especiais</h3>
        </div>

        <table class="admin-table">
          <thead>
            <tr>
              <th>Título do Evento</th>
              <th>Data</th>
              <th>Preço/Pessoa</th>
              <th>Destaque Ativo no Site</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            ${this.events.map(ev => `
              <tr>
                <td><strong>${ev.title}</strong></td>
                <td>${ev.date}</td>
                <td>R$ ${ev.price.toFixed(2)}</td>
                <td>${ev.isActive ? '⭐ SIM (BANNER ATIVO)' : 'Não'}</td>
                <td>
                  <button onclick="app.setActiveEvent('${ev.id}')" style="color: var(--gold-muted); font-weight: 600;">
                    ${ev.isActive ? 'Desativar Destaque' : 'Ativar Destaque no Site'}
                  </button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;
    }

    setActiveEvent(id) {
      this.events.forEach(e => {
        if (e.id === id) e.isActive = !e.isActive;
        else e.isActive = false;
      });
      this.saveState();
      this.renderSpecialEvent();
      this.renderEventsGrid();
      this.switchAdminTab('events');
    }

    renderAdminReservationsTab(container) {
      container.innerHTML = `
        <div style="margin-bottom: 24px;">
          <h3>Solicitações de Reservas (${this.reservations.length})</h3>
        </div>

        <table class="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>WhatsApp</th>
              <th>Data & Horário</th>
              <th>Pessoas</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            ${this.reservations.map(r => `
              <tr>
                <td>#${r.id}</td>
                <td><strong>${r.name}</strong></td>
                <td>${r.phone}</td>
                <td>${r.date} às ${r.time}</td>
                <td>${r.guests}</td>
                <td>
                  <span style="padding: 4px 10px; border-radius: 12px; font-size: 0.75rem; font-weight: 700; background: ${r.status === 'Confirmada' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(234, 179, 8, 0.2)'}; color: ${r.status === 'Confirmada' ? '#4ade80' : '#fde047'};">
                    ${r.status}
                  </span>
                </td>
                <td>
                  <button onclick="app.toggleReservationStatus('${r.id}')" style="color: var(--gold-muted); font-weight: 600;">
                    Alternar Status
                  </button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;
    }

    toggleReservationStatus(id) {
      const res = this.reservations.find(r => r.id === id);
      if (res) {
        res.status = res.status === 'Confirmada' ? 'Pendente' : 'Confirmada';
        this.saveState();
        this.switchAdminTab('reservations');
      }
    }
  }

  // Global Export
  window.app = new AppController();

})();
