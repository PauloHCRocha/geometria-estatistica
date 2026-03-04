<template>
  <div class="demo-container">
    <div class="demo-header">
      <span class="demo-badge">Demo</span>
      <span class="demo-title">Vetor interativo — arrasta a extremidade B</span>
    </div>
    <div class="demo-canvas-wrapper" ref="container"></div>
    <div class="demo-info" v-html="info" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useP5 } from '../composables/useP5.js'
import { drawGrid, drawArrow, drawDot, bg, C, GU } from './sketchUtils.js'

const container = ref(null)
const info      = ref('Arrasta o ponto <strong>B</strong> para alterar o vetor.')

useP5(container, (p) => {
  let bx, by, dragging = false
  const cx = () => p.width / 2
  const cy = () => p.height / 2

  p.setup = () => {
    const w = container.value?.clientWidth || 420
    p.createCanvas(w, Math.min(Math.round(w * 0.65), 280))
    bx = p.width / 2 + 120; by = p.height / 2 - 80
  }

  p.draw = () => {
    p.background(...bg())
    drawGrid(p, cx(), cy())
    const ux = bx - cx(), uy = by - cy()
    const uvx = ux / GU, uvy = -uy / GU
    const norm = Math.sqrt(uvx ** 2 + uvy ** 2)

    p.stroke(...C.azul()); p.fill(...C.azul()); p.strokeWeight(2.5)
    drawArrow(p, cx(), cy(), bx, by)

    p.fill(...C.azul()); p.noStroke(); p.ellipse(cx(), cy(), 8, 8)
    p.textSize(13); p.text('A', cx() + 6, cy() - 8)

    const hover = p.dist(p.mouseX, p.mouseY, bx, by) < 14
    drawDot(p, bx, by, hover || dragging, C.azulHex())
    p.fill(...C.muted()); p.textSize(14); p.noStroke()
    p.text('B (arrasta)', bx + 7, by - 5)

    info.value = `<b>u⃗</b> = (${uvx.toFixed(2)}, ${uvy.toFixed(2)}) &nbsp;|&nbsp; ‖u⃗‖ = ${norm.toFixed(3)}`
  }

  p.mousePressed  = () => { if (p.dist(p.mouseX, p.mouseY, bx, by) < 14) dragging = true }
  p.mouseReleased = () => { dragging = false }
  p.mouseDragged  = () => {
    if (!dragging) return
    bx = p.constrain(p.mouseX, 5, p.width - 5)
    by = p.constrain(p.mouseY, 5, p.height - 5)
  }
  p.windowResized = () => {
    const w = container.value?.clientWidth || 420
    p.resizeCanvas(w, Math.min(Math.round(w * 0.65), 280))
  }
})
</script>
