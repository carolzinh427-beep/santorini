/* ==========================================================================
   SUPABASE CLIENT INTEGRATION LAYER — SANTORINI LOUNGE
   ========================================================================== */

// Environment configuration keys (configured in Vercel or local environment)
const SUPABASE_URL = window.ENV_SUPABASE_URL || 'https://your-supabase-project.supabase.co';
const SUPABASE_ANON_KEY = window.ENV_SUPABASE_ANON_KEY || 'your-anon-key-here';

class SupabaseService {
  constructor() {
    this.isConfigured = !!(window.ENV_SUPABASE_URL && window.ENV_SUPABASE_ANON_KEY);
    this.client = null;

    if (this.isConfigured && window.supabase) {
      this.client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      console.log('🏛️ Supabase connected successfully!');
    } else {
      console.log('🏛️ Supabase credentials not set — Using high-performance Local Storage engine.');
    }
  }

  async getMenuItems() {
    if (this.client) {
      const { data, error } = await this.client.from('menu_items').select('*').order('created_at', { ascending: true });
      if (!error && data) return data;
    }
    return JSON.parse(localStorage.getItem('santorini_menu')) || [];
  }

  async createReservation(reservationData) {
    if (this.client) {
      const { data, error } = await this.client.from('reservations').insert([reservationData]);
      if (error) console.error('Supabase Reservation Error:', error);
      return { data, error };
    }
    const current = JSON.parse(localStorage.getItem('santorini_reservations')) || [];
    current.unshift(reservationData);
    localStorage.setItem('santorini_reservations', JSON.stringify(current));
    return { data: reservationData, error: null };
  }

  async getEvents() {
    if (this.client) {
      const { data, error } = await this.client.from('special_events').select('*');
      if (!error && data) return data;
    }
    return JSON.parse(localStorage.getItem('santorini_events')) || [];
  }
}

window.supabaseService = new SupabaseService();
