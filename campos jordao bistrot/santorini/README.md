# Santorini Lounge — Website & Administrative System

Website premium e sistema administrativo para o **Santorini Lounge** (Restaurante, Lounge & Experiências) com estética inspirada na ilha de Santorini, alta gastronomia mediterrânea, cardápio digital interativo, eventos temáticos, galeria touch lightbox e reservas online.

---

## 🏛️ Funcionalidades

- **Design Editorial Premium**: Cores Azul Marinho (`#071A3D`), Azul Profundo (`#0B2A5B`), Off-White (`#F7F4EE`), Areia/Bege (`#D8CBB8`) e Dourado Suave (`#C9A66B`). Tipografia com *Cinzel* e *Plus Jakarta Sans*.
- **Hero Cinematográfico**: Banner de 100vh com atmosfera grega, overlays e chamadas para ação.
- **Cardápio Digital Interativo**: Filtros de categoria (*Entradas, Pratos Principais, Porções, Sobremesas, Drinks, Bebidas*), busca em tempo real e tags nutricionais/chef.
- **Destaque de Evento Especial**: Banner promocional ativável via admin para eventos como *Noite do Ouzo* ou *Jantar dos Namorados*.
- **Sistema de Reservas**: Formulario interativo com preferências de horário e mesa.
- **Galeria Lightbox**: Exibição de fotografias do ambiente e gastronomia com lightbox e filtros.
- **Painel Administrativo (`/admin` ou `#admin`)**: Gestão de cardápio, ativação de eventos especiais e visualização de reservas.
- **Integração Supabase**: Arquitetura SQL pronta em `supabase/schema.sql` e cliente em `supabaseClient.js`.

---

## 🚀 Implantação na Vercel (Vercel Deployment)

O projeto já está 100% estruturado para a Vercel com o arquivo `vercel.json`.

### Opção 1: Via Vercel CLI
No terminal:
```bash
npx vercel
```

### Opção 2: Importando pelo Dashboard da Vercel (GitHub)
1. Suba esta pasta para um repositório no seu GitHub.
2. Acesse [vercel.com/new](https://vercel.com/new).
3. Selecione o repositório **Santorini Lounge**.
4. Mantenha o Framework Preset como **Other** (HTML/CSS/JS estático).
5. Clique em **Deploy**.

---

## ⚙️ Configuração de Variáveis de Ambiente (Opcional - Supabase)

No dashboard da Vercel, adicione em **Settings > Environment Variables**:
- `ENV_SUPABASE_URL`: URL do seu projeto Supabase
- `ENV_SUPABASE_ANON_KEY`: Chave anônima do Supabase
