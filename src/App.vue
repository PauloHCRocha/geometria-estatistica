<template>
  <div class="app-root">
    <NavBar :drawer-open="drawerOpen" @toggle-drawer="drawerOpen = !drawerOpen" />

    <!-- Overlay (mobile drawer backdrop) -->
    <Transition name="fade">
      <div v-if="drawerOpen" class="drawer-backdrop" @click="drawerOpen = false" />
    </Transition>

    <RouterView v-slot="{ Component }">
      <Transition name="page" mode="out-in">
        <component :is="Component" :drawer-open="drawerOpen" @close-drawer="drawerOpen = false" />
      </Transition>
    </RouterView>

    <BottomNav />
    <XpToast />
    <BadgeToast />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import NavBar     from './components/NavBar.vue'
import BottomNav  from './components/BottomNav.vue'
import XpToast    from './components/XpToast.vue'
import BadgeToast from './components/BadgeToast.vue'
import { useTheme } from './composables/useTheme.js'

useTheme() // initialise theme on app boot
const drawerOpen = ref(false)
const route = useRoute()

// Close drawer on route change
watch(() => route.path, () => { drawerOpen.value = false })
</script>

<style>
/* Page transition */
.page-enter-active, .page-leave-active { transition: opacity .18s ease; }
.page-enter-from, .page-leave-to       { opacity: 0; }

/* Backdrop transition */
.fade-enter-active, .fade-leave-active { transition: opacity .2s; }
.fade-enter-from, .fade-leave-to       { opacity: 0; }

.drawer-backdrop {
  position: fixed; inset: 0;
  background: rgba(0,0,0,.35);
  z-index: 90;
}
</style>
