<template>
  <aside class="sidebar" :class="{ open: drawerOpen }">
    <div class="sidebar-title">{{ title }}</div>

    <ul class="sidebar-nav">
      <li v-for="sec in sections" :key="sec.id">
        <a :href="`#${sec.id}`" :data-section="sec.id"
           :class="{ active: activeSection === sec.id }"
           @click="$emit('close-drawer')">
          <span class="section-check" :class="{ done: store.completedSections.includes(sec.id) }">
            {{ store.completedSections.includes(sec.id) ? '✓' : '' }}
          </span>
          {{ sec.label }}
        </a>
      </li>
    </ul>

    <div class="sidebar-xp">
      <div class="xp-val">{{ store.xp }}</div>
      <div class="xp-lbl">XP ganhos</div>
    </div>

    <div class="sidebar-badges-title">Conquistas</div>
    <div class="sidebar-badges">
      <BadgeCard
        v-for="b in store.BADGE_DEFS" :key="b.id"
        :badge="b" :earned="store.badges.includes(b.id)" :small="true"
      />
    </div>
  </aside>
</template>

<script setup>
import { useProgressStore } from '../stores/progress.js'
import BadgeCard from './BadgeCard.vue'

defineProps({
  title:         { type: String, default: '' },
  sections:      { type: Array,  default: () => [] },
  activeSection: { type: String, default: '' },
  drawerOpen:    { type: Boolean, default: false }
})
defineEmits(['close-drawer'])

const store = useProgressStore()
</script>
