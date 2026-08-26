/* ==========================================================================
   SANTORINI LOUNGE — ADMINISTRATIVE PANEL LOGIC (admin.js)
   ========================================================================== */

const ADMIN_DEFAULT_USER = 'Santorini2026';
const ADMIN_DEFAULT_PASS = 'LoungeSantorini';

// Check Auth state
function checkAdminAuth() {
  const isAuth = sessionStorage.getItem('santorini_admin_auth');
  const loginOverlay = document.getElementById('adminLoginOverlay');
  const mainContent = document.getElementById('adminMainContent');

  if (isAuth === 'true') {
    if (loginOverlay) loginOverlay.style.display = 'none';
    if (mainContent) mainContent.style.display = 'block';
    loadAdminData();
  } else {
    if (loginOverlay) loginOverlay.style.display = 'flex';
    if (mainContent) mainContent.style.display = 'none';
  }
}

// Setup Login Form
function setupLoginForm() {
  const form = document.getElementById('adminLoginForm');
  const errorMsg = document.getElementById('loginErrorMsg');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const user = document.getElementById('adminUserInput').value;
      const pass = document.getElementById('adminPasswordInput').value;
      if (user === ADMIN_DEFAULT_USER && pass === ADMIN_DEFAULT_PASS) {
        sessionStorage.setItem('santorini_admin_auth', 'true');
        if (errorMsg) errorMsg.style.display = 'none';
        checkAdminAuth();
      } else {
        if (errorMsg) errorMsg.style.display = 'block';
      }
    });
  }

  const logoutBtn = document.getElementById('adminLogoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      sessionStorage.removeItem('santorini_admin_auth');
      checkAdminAuth();
    });
  }
}

// Tab Switching
function setupTabNavigation() {
  const tabBtns = document.querySelectorAll('.admin-tab-btn');
  const tabContents = document.querySelectorAll('.admin-tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.style.display = 'none');

      btn.classList.add('active');
      const targetId = btn.getAttribute('data-tab');
      const targetEl = document.getElementById(targetId);
      if (targetEl) targetEl.style.display = 'block';
    });
  });
}

// Load Data into Tables
function loadAdminData() {
  renderAdminMenuTable();
  loadSpecialEventForm();
  renderAdminReservationsTable();
}

// Render Menu Items in Admin Table
function renderAdminMenuTable() {
  const tbody = document.getElementById('adminMenuTableBody');
  if (!tbody) return;

  const items = JSON.parse(localStorage.getItem('santorini_menu_items') || '[]');

  if (items.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align: center;">Nenhum item encontrado.</td></tr>`;
    return;
  }

  tbody.innerHTML = items.map(item => `
    <tr>
      <td><img src="${item.image || 'assets/moussaka.png'}" style="width: 48px; height: 48px; object-fit: cover; border-radius: 4px;"></td>
      <td><strong>${item.name}</strong><br><span style="font-size: 0.75rem; color: var(--text-muted);">${item.description}</span></td>
      <td style="text-transform: capitalize;">${item.category}</td>
      <td>R$ ${Number(item.price).toFixed(2)}</td>
      <td>${item.badge ? `<span style="background: var(--gold); color: var(--navy); padding: 2px 8px; border-radius: 4px; font-size: 0.75rem;">${item.badge}</span>` : '-'}</td>
      <td>
        <button onclick="toggleItemStatus('${item.id}')" style="background: ${item.is_active ? '#10B981' : '#EF4444'}; color: #FFF; border: none; padding: 4px 10px; border-radius: 4px; font-size: 0.75rem; cursor: pointer;">
          ${item.is_active ? 'Ativo' : 'Inativo'}
        </button>
      </td>
      <td>
        <div style="display: flex; gap: 6px;">
          <button onclick="editMenuItem('${item.id}')" style="background: var(--navy-light); color: var(--gold); border: 1px solid var(--gold); padding: 4px 8px; border-radius: 4px; font-size: 0.75rem; cursor: pointer;">Editar</button>
          <button onclick="deleteMenuItem('${item.id}')" style="background: #7F1D1D; color: #FFF; border: none; padding: 4px 8px; border-radius: 4px; font-size: 0.75rem; cursor: pointer;">Excluir</button>
        </div>
      </td>
    </tr>
  `).join('');
}

// Toggle Item Active Status
window.toggleItemStatus = function(id) {
  const items = JSON.parse(localStorage.getItem('santorini_menu_items') || '[]');
  const index = items.findIndex(i => i.id === id);
  if (index !== -1) {
    items[index].is_active = !items[index].is_active;
    localStorage.setItem('santorini_menu_items', JSON.stringify(items));
    renderAdminMenuTable();
  }
};

// Delete Item
window.deleteMenuItem = function(id) {
  if (confirm('Tem certeza que deseja excluir este item do cardápio?')) {
    let items = JSON.parse(localStorage.getItem('santorini_menu_items') || '[]');
    items = items.filter(i => i.id !== id);
    localStorage.setItem('santorini_menu_items', JSON.stringify(items));
    renderAdminMenuTable();
  }
};

// Open Item Modal for Create or Edit
function setupMenuItemModal() {
  const modal = document.getElementById('menuItemModal');
  const btnOpen = document.getElementById('btnOpenNewItemModal');
  const btnClose = document.getElementById('closeMenuItemModal');
  const btnCancel = document.getElementById('cancelMenuItemModal');
  const form = document.getElementById('menuItemForm');

  if (!modal) return;

  const openFn = () => {
    form.reset();
    document.getElementById('menuItemId').value = '';
    document.getElementById('menuModalTitle').innerText = 'Adicionar Item ao Cardápio';
    modal.classList.add('open');
  };

  const closeFn = () => {
    modal.classList.remove('open');
  };

  if (btnOpen) btnOpen.addEventListener('click', openFn);
  if (btnClose) btnClose.addEventListener('click', closeFn);
  if (btnCancel) btnCancel.addEventListener('click', closeFn);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('menuItemId').value || 'm_' + Date.now();
    const newItem = {
      id: id,
      name: document.getElementById('menuItemName').value,
      category: document.getElementById('menuItemCategory').value,
      price: parseFloat(document.getElementById('menuItemPrice').value),
      badge: document.getElementById('menuItemBadge').value,
      image: document.getElementById('menuItemImage').value,
      description: document.getElementById('menuItemDesc').value,
      is_active: true
    };

    let items = JSON.parse(localStorage.getItem('santorini_menu_items') || '[]');
    const index = items.findIndex(i => i.id === id);

    if (index !== -1) {
      items[index] = newItem;
    } else {
      items.unshift(newItem);
    }

    localStorage.setItem('santorini_menu_items', JSON.stringify(items));
    closeFn();
    renderAdminMenuTable();
  });
}

// Edit Menu Item
window.editMenuItem = function(id) {
  const items = JSON.parse(localStorage.getItem('santorini_menu_items') || '[]');
  const item = items.find(i => i.id === id);
  if (!item) return;

  document.getElementById('menuItemId').value = item.id;
  document.getElementById('menuItemName').value = item.name;
  document.getElementById('menuItemCategory').value = item.category;
  document.getElementById('menuItemPrice').value = item.price;
  document.getElementById('menuItemBadge').value = item.badge || '';
  document.getElementById('menuItemImage').value = item.image || '';
  document.getElementById('menuItemDesc').value = item.description || '';

  document.getElementById('menuModalTitle').innerText = 'Editar Item do Cardápio';
  document.getElementById('menuItemModal').classList.add('open');
};

// Special Event Manager
function loadSpecialEventForm() {
  const form = document.getElementById('adminSpecialEventForm');
  if (!form) return;

  const eventData = JSON.parse(localStorage.getItem('santorini_special_event') || '{}');

  document.getElementById('eventIsActive').checked = eventData.is_active !== false;
  document.getElementById('adminEventTitle').value = eventData.title || '';
  document.getElementById('adminEventSubtitle').value = eventData.subtitle || '';
  document.getElementById('adminEventDate').value = eventData.eventDate || '';
  document.getElementById('adminEventTime').value = eventData.eventTime || '';

  form.onsubmit = function(e) {
    e.preventDefault();
    const updated = {
      is_active: document.getElementById('eventIsActive').checked,
      title: document.getElementById('adminEventTitle').value,
      subtitle: document.getElementById('adminEventSubtitle').value,
      eventDate: document.getElementById('adminEventDate').value,
      eventTime: document.getElementById('adminEventTime').value
    };

    localStorage.setItem('santorini_special_event', JSON.stringify(updated));
    alert('Configuração do Evento Especial atualizada com sucesso!');
  };
}

// Render Reservations Table
function renderAdminReservationsTable() {
  const tbody = document.getElementById('adminReservationsTableBody');
  if (!tbody) return;

  const reservations = JSON.parse(localStorage.getItem('santorini_reservations') || '[]');

  if (reservations.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align: center;">Nenhuma reserva registrada ainda.</td></tr>`;
    return;
  }

  tbody.innerHTML = reservations.map(r => `
    <tr>
      <td>${new Date(r.created_at || Date.now()).toLocaleDateString('pt-BR')} ${new Date(r.created_at || Date.now()).toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'})}</td>
      <td><strong>${r.name}</strong><br><span style="font-size: 0.75rem; color: var(--text-muted);">${r.email || '-'}</span></td>
      <td><a href="https://wa.me/55${r.phone.replace(/\D/g, '')}" target="_blank" style="color: var(--gold); font-weight: 600;">📱 ${r.phone}</a></td>
      <td>${r.date}</td>
      <td>${r.time}</td>
      <td>${r.guests} pess.</td>
      <td>${r.notes || '-'}</td>
      <td><span style="background: #F59E0B; color: #FFF; padding: 2px 8px; border-radius: 4px; font-size: 0.75rem;">${r.status || 'pendente'}</span></td>
    </tr>
  `).join('');

  const btnClear = document.getElementById('btnClearReservations');
  if (btnClear) {
    btnClear.onclick = () => {
      if (confirm('Deseja realmente limpar todo o histórico de reservas?')) {
        localStorage.removeItem('santorini_reservations');
        renderAdminReservationsTable();
      }
    };
  }
}

// Initialize Admin
document.addEventListener('DOMContentLoaded', () => {
  setupLoginForm();
  checkAdminAuth();
  setupTabNavigation();
  setupMenuItemModal();
});
