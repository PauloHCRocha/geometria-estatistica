<template>
  <Transition name="badge-pop">
    <div v-if="store.badgeToast" class="badge-toast-overlay" @click="store.badgeToast = null">
      <div class="badge-toast-card" @click.stop>

        <div class="btc-crown">🏅</div>
        <div class="btc-subtitle">Conquista desbloqueada!</div>

        <div class="btc-hex-outer" :class="`cat-${store.badgeToast.category}`">
          <div class="btc-hex-inner" :class="`cat-${store.badgeToast.category}`">
            <span class="btc-emoji">{{ store.badgeToast.emoji }}</span>
          </div>
        </div>

        <div class="btc-title">{{ store.badgeToast.title }}</div>
        <div class="btc-hint">{{ store.badgeToast.hint }}</div>

        <button class="btc-close" @click="store.badgeToast = null">Fechar</button>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { useProgressStore } from '../stores/progress.js'
const store = useProgressStore()
</script>
