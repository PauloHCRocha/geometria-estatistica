<template>
  <nav class="top-nav">

    <!-- Hamburger (tablet/mobile) -->
    <button class="nav-hamburger" @click="$emit('toggle-drawer')"
            :aria-label="drawerOpen ? 'Fechar menu' : 'Abrir menu'">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
           stroke="currentColor" stroke-width="2.2" stroke-linecap="round">
        <template v-if="drawerOpen">
          <line x1="3" y1="3" x2="17" y2="17"/>
          <line x1="17" y1="3" x2="3" y2="17"/>
        </template>
        <template v-else>
          <line x1="2" y1="5"  x2="18" y2="5"/>
          <line x1="2" y1="10" x2="18" y2="10"/>
          <line x1="2" y1="15" x2="18" y2="15"/>
        </template>
      </svg>
    </button>

    <!-- Brand -->
    <RouterLink to="/" class="nav-brand">
      Geometria <span class="accent">&amp;</span> Estatística
    </RouterLink>

    <!-- Desktop links -->
    <ul class="nav-links">

      <li>
        <RouterLink to="/" class="nav-pill" :class="{ active: route.path === '/' }">
          Início
        </RouterLink>
      </li>

      <!-- Geometria dropdown -->
      <li class="has-dropdown" :class="{ active: isGeoActive }">
        <span class="dropdown-trigger" :class="{ active: isGeoActive }">
          📐
          Geometria
          <svg class="caret" width="10" height="10" viewBox="0 0 10 10" fill="none"
               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="2,3 5,7 8,3"/>
          </svg>
        </span>
        <div class="dropdown-panel">
          <div class="dp-header dp-geo">📐 Geometria</div>
          <div class="dp-links">
            <RouterLink to="/parte1" class="dp-item" :class="{ 'dp-active': route.path==='/parte1' }">
              <span class="dp-num">I</span><span class="dp-label">Vetores</span>
            </RouterLink>
            <RouterLink to="/parte2" class="dp-item" :class="{ 'dp-active': route.path==='/parte2' }">
              <span class="dp-num">II</span><span class="dp-label">Geometria Analítica</span>
            </RouterLink>
            <RouterLink to="/parte3" class="dp-item" :class="{ 'dp-active': route.path==='/parte3' }">
              <span class="dp-num">III</span><span class="dp-label">Geometria no Espaço</span>
            </RouterLink>
            <RouterLink to="/parte4" class="dp-item" :class="{ 'dp-active': route.path==='/parte4' }">
              <span class="dp-num">IV</span><span class="dp-label">Subconjuntos Notáveis</span>
            </RouterLink>
          </div>
        </div>
      </li>

      <!-- Estatística dropdown -->
      <li class="has-dropdown" :class="{ active: isEstatActive }">
        <span class="dropdown-trigger" :class="{ active: isEstatActive }">
          📊
          Estatística
          <svg class="caret" width="10" height="10" viewBox="0 0 10 10" fill="none"
               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="2,3 5,7 8,3"/>
          </svg>
        </span>
        <div class="dropdown-panel">
          <div class="dp-header dp-stat">📊 Estatística</div>
          <div class="dp-links">
            <RouterLink to="/estat1" class="dp-item" :class="{ 'dp-active': route.path==='/estat1' }">
              <span class="dp-num">V</span><span class="dp-label">Introdução</span>
            </RouterLink>
            <RouterLink to="/estat2" class="dp-item" :class="{ 'dp-active': route.path==='/estat2' }">
              <span class="dp-num">VI</span><span class="dp-label">Estatística Descritiva Univariada</span>
            </RouterLink>
            <RouterLink to="/estat3" class="dp-item" :class="{ 'dp-active': route.path==='/estat3' }">
              <span class="dp-num">VII</span><span class="dp-label">Estatística Descritiva Bivariada</span>
            </RouterLink>
          </div>
        </div>
      </li>

    </ul>

    <!-- Right actions -->
    <div class="nav-actions">
      <button class="theme-toggle" @click="toggle">
        <span class="toggle-icon">{{ dark ? '☀️' : '🌙' }}</span>
        <span class="toggle-label">{{ dark ? 'Claro' : 'Escuro' }}</span>
      </button>

      <div class="nav-xp">
        <span class="xp-bolt">⚡</span>
        <span class="xp-num">{{ store.xp }}</span>
        <span class="xp-unit">XP</span>
      </div>
    </div>

  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useProgressStore } from '../stores/progress.js'
import { useTheme } from '../composables/useTheme.js'

defineProps({ drawerOpen: Boolean })
defineEmits(['toggle-drawer'])

const route = useRoute()
const store = useProgressStore()
const { dark, toggle } = useTheme()

const isGeoActive   = computed(() => ['/parte1','/parte2','/parte3','/parte4'].includes(route.path))
const isEstatActive = computed(() => ['/estat1','/estat2','/estat3'].includes(route.path))
</script>

<style scoped>
/* ── Brand ────────────────────────────────────────────────── */

/* ── Nav pills (Início link) ──────────────────────────────── */
.nav-pill {
  display: inline-block;
  padding: .35rem .9rem; border-radius: 20px;
  color: rgba(255,255,255,.8); font-size: .875rem; font-weight: 700;
  transition: background .15s, color .15s; text-decoration: none;
}
.nav-pill:hover { background: rgba(255,255,255,.12); color: #fff; text-decoration: none; }
.nav-pill.active { background: rgba(255,255,255,.18); color: #fff; }

/* ── Dropdown trigger ─────────────────────────────────────── */
.has-dropdown { position: relative; }

.dropdown-trigger {
  display: inline-flex; align-items: center; gap: .4rem;
  padding: .35rem .9rem; border-radius: 20px;
  color: rgba(255,255,255,.8); font-size: .875rem; font-weight: 700;
  cursor: default; user-select: none;
  transition: background .15s, color .15s;
}
.has-dropdown:hover .dropdown-trigger,
.dropdown-trigger.active { color: #fff; }
.dropdown-trigger.active { background: rgba(255,255,255,.15); }
.has-dropdown:hover .dropdown-trigger { background: rgba(255,255,255,.12); }

.caret {
  transition: transform .25s ease;
  opacity: .7;
}
.has-dropdown:hover .caret { transform: rotate(180deg); opacity: 1; }

/* ── Dropdown panel ───────────────────────────────────────── */
.dropdown-panel {
  position: absolute; top: calc(100% + 10px); left: 50%;
  transform: translateX(-50%) translateY(-6px);
  background: var(--bg-card);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0,0,0,.18), 0 2px 8px rgba(0,0,0,.1);
  border: 1.5px solid var(--border);
  min-width: 240px; z-index: 200;
  overflow: hidden;
  /* Animated */
  opacity: 0; visibility: hidden;
  transition: opacity .2s ease, transform .2s ease, visibility .2s;
}
.has-dropdown:hover .dropdown-panel {
  opacity: 1; visibility: visible;
  transform: translateX(-50%) translateY(0);
}

.dp-header {
  padding: .65rem 1.1rem .55rem;
  font-size: .65rem; font-weight: 900; text-transform: uppercase;
  letter-spacing: .12em; color: #fff;
  border-bottom: 1px solid rgba(255,255,255,.12);
}
.dp-geo  { background: var(--azul); }
.dp-stat { background: var(--verde); }

.dp-links { padding: .4rem; }

.dp-item {
  display: flex; align-items: center; gap: .75rem;
  padding: .55rem .75rem; border-radius: 10px;
  text-decoration: none; transition: background .12s;
}
.dp-item:hover, .dp-item.dp-active {
  background: var(--bg-prop);
  text-decoration: none;
}

.dp-num {
  min-width: 28px; height: 28px; border-radius: 8px;
  display: inline-flex; align-items: center; justify-content: center;
  font-size: .65rem; font-weight: 900; flex-shrink: 0;
  background: var(--border); color: var(--text-muted);
  transition: background .12s, color .12s;
}
.dp-item:hover .dp-num, .dp-item.dp-active .dp-num {
  background: var(--azul); color: #fff;
}

.dp-label {
  font-size: .875rem; font-weight: 700; color: var(--text);
}
.dp-item:hover .dp-label, .dp-item.dp-active .dp-label {
  color: var(--azul);
}

/* ── Right actions ────────────────────────────────────────── */
.nav-actions {
  display: flex; align-items: center; gap: .6rem; flex-shrink: 0;
}

.theme-toggle {
  display: inline-flex; align-items: center; gap: .35rem;
  background: rgba(255,255,255,.12); border: none; border-radius: 20px;
  padding: 5px 12px; cursor: pointer;
  transition: background .15s; flex-shrink: 0;
}
.theme-toggle:hover { background: rgba(255,255,255,.22); }
.toggle-icon { font-size: .95rem; line-height: 1; }
.toggle-label { font-size: .75rem; font-weight: 800; color: rgba(255,255,255,.85); }

.nav-xp {
  display: flex; align-items: center; gap: .3rem;
  background: rgba(255,255,255,.13); border-radius: 20px;
  border-bottom: 3px solid rgba(0,0,0,.18);
  padding: 5px 14px; flex-shrink: 0;
}
.xp-bolt { font-size: .9rem; }
.xp-num  { font-size: .95rem; font-weight: 900; color: #fff; }
.xp-unit { font-size: .65rem; font-weight: 800; color: rgba(255,255,255,.65); text-transform: uppercase; letter-spacing: .06em; }

/* ── Dark mode overrides (scoped) ─────────────────────────── */
:global([data-theme="dark"]) .dropdown-panel {
  box-shadow: 0 8px 32px rgba(0,0,0,.5), 0 2px 8px rgba(0,0,0,.3);
}
:global([data-theme="dark"]) .dp-item:hover,
:global([data-theme="dark"]) .dp-item.dp-active {
  background: var(--bg-prop);
}
:global([data-theme="dark"]) .dp-label {
  color: var(--text);
}
:global([data-theme="dark"]) .dp-item:hover .dp-label,
:global([data-theme="dark"]) .dp-item.dp-active .dp-label {
  color: #5bb0ff;
}
:global([data-theme="dark"]) .dp-item:hover .dp-num,
:global([data-theme="dark"]) .dp-item.dp-active .dp-num {
  background: #1a4a8a; color: #5bb0ff;
}
</style>
