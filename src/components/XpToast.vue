<template>
  <div class="xp-toast" :class="{ visible: store.toastVisible }">
    {{ store.toastMsg }}
  </div>
</template>

<script setup>
import { useProgressStore } from '../stores/progress.js'
const store = useProgressStore()
</script>
