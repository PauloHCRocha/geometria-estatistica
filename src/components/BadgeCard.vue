<template>
  <div class="badge-wrap" :class="{ 'badge-earned': earned, 'badge-locked': !earned, small }">

    <!-- Hexagonal medal: outer = ring colour, inner = gradient fill -->
    <div class="badge-hex-outer" :class="`cat-${badge.category}`">
      <div class="badge-hex-inner" :class="`cat-${badge.category}`">
        <span class="badge-emoji">{{ badge.emoji }}</span>
        <span v-if="!earned" class="badge-padlock" aria-hidden="true">🔒</span>
      </div>
    </div>

    <span class="badge-name">{{ badge.title }}</span>

    <!-- Tooltip shown on hover -->
    <div class="badge-tooltip" role="tooltip">
      <span v-if="earned" class="badge-tip-earned">✓ Conquistado!</span>
      <span v-else>{{ badge.hint }}</span>
    </div>

  </div>
</template>

<script setup>
defineProps({
  badge:  { type: Object,  required: true },
  earned: { type: Boolean, default: false },
  small:  { type: Boolean, default: false }
})
</script>
