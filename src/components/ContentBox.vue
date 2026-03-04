<template>
  <div :class="['box', `box-${tipo}`]">
    <div class="box-title">{{ label }}</div>
    <slot />
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  tipo:   { type: String, default: 'def' },  // def | prop | teo | ex | nota
  titulo: { type: String, default: '' }
})

const LABELS = {
  def:  'Definição',
  prop: 'Proposição',
  teo:  'Teorema',
  ex:   'Exemplo',
  nota: 'Nota'
}

const label = computed(() =>
  props.titulo
    ? `${LABELS[props.tipo] ?? props.tipo} — ${props.titulo}`
    : (LABELS[props.tipo] ?? props.tipo)
)
</script>
