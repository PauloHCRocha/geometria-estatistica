<template>
  <div class="demo-container">
    <div class="demo-header">
      <span class="demo-badge">Demo</span>
      <span class="demo-title">Produto por escalar λu⃗</span>
    </div>
    <div class="demo-canvas-wrapper" ref="container"></div>
    <div class="demo-controls">
      <label>
        λ =
        <input type="range" min="-3" max="3" step="0.1" v-model.number="lambda" />
        <span class="val-display">{{ lambda.toFixed(1) }}</span>
      </label>
    </div>
    <div class="demo-info" v-html="info" />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useP5 } from '../composables/useP5.js'
import { drawGrid, drawArrow, bg, C, GU } from './sketchUtils.js'

const container = ref(null)
const lambda    = ref(1.0)
const info      = ref('')
const ux = 3, uy = 1.5

watch(lambda, updateInfo)

function updateInfo() {
  const norm = Math.sqrt((lambda.value*ux)**2 + (lambda.value*uy)**2)
  info.value = `λ = ${lambda.value.toFixed(1)} &nbsp;→&nbsp; λu⃗ = (${(lambda.value*ux).toFixed(1)}, ${(lambda.value*uy).toFixed(1)}) &nbsp;|&nbsp; ‖λu⃗‖ = ${norm.toFixed(2)}`
}
updateInfo()

useP5(container, (p) => {
  p.setup = () => {
    const w = container.value?.clientWidth || 420
    p.createCanvas(w, Math.min(Math.round(w * 0.6), 260))
  }

  p.draw = () => {
    p.background(...bg())
    const cx = p.width / 2, cy = p.height / 2
    drawGrid(p, cx, cy)

    // Reference vector (grey)
    p.stroke(...C.grey()); p.fill(...C.grey()); p.strokeWeight(1.5)
    drawArrow(p, cx, cy, cx + ux*GU, cy - uy*GU)
    p.fill(...C.grey()); p.noStroke(); p.textSize(14)
    p.text('u⃗ (referência)', cx + ux*GU + 4, cy - uy*GU - 2)

    // Scaled vector
    const lx = lambda.value * ux, ly = lambda.value * uy
    const col = lambda.value >= 0 ? C.azul() : C.vermelho()
    p.stroke(...col); p.fill(...col); p.strokeWeight(3)
    drawArrow(p, cx, cy, cx + lx*GU, cy - ly*GU)

    p.fill(...col); p.noStroke(); p.textSize(14)
    p.text(`λu⃗ = (${lx.toFixed(1)}, ${ly.toFixed(1)})`, 10, 20)

    p.fill(...C.text()); p.noStroke(); p.ellipse(cx, cy, 7, 7)
  }

  p.windowResized = () => {
    const w = container.value?.clientWidth || 420
    p.resizeCanvas(w, Math.min(Math.round(w * 0.6), 260))
  }
})
</script>
