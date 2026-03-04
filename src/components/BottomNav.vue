<template>
  <nav class="bottom-nav">
    <RouterLink to="/" class="bottom-nav-item" :class="{ active: route.path === '/' }">
      <span class="bnav-icon">🏠</span>
      <span>Início</span>
    </RouterLink>
    <RouterLink to="/parte1" class="bottom-nav-item" :class="{ active: isGeoActive }">
      <span class="bnav-icon">📐</span>
      <span>Geometria</span>
    </RouterLink>
    <RouterLink to="/estat1" class="bottom-nav-item" :class="{ active: isEstatActive }">
      <span class="bnav-icon">📊</span>
      <span>Estatística</span>
    </RouterLink>
    <div class="bottom-nav-item">
      <span class="bnav-icon">⭐</span>
      <span>{{ store.xp }} XP</span>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useProgressStore } from '../stores/progress.js'
const route = useRoute()
const store = useProgressStore()

const isGeoActive = computed(() => ['/parte1','/parte2','/parte3','/parte4'].includes(route.path))
const isEstatActive = computed(() => ['/estat1','/estat2','/estat3'].includes(route.path))
</script>
