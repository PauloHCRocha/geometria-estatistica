<template>
  <div class="demo-container">
    <div class="demo-header">
      <span class="demo-badge">Demo</span>
      <span class="demo-title">Reta interativa — ajusta declive e ordenada na origem</span>
    </div>
    <div class="demo-canvas-wrapper" ref="container"></div>
    <div class="demo-controls">
      <label>m = <input type="range" min="-4" max="4" step="0.1" v-model.number="m" /><span class="val-display">{{ m.toFixed(1) }}</span></label>
      <label>b = <input type="range" min="-5" max="5" step="0.5" v-model.number="b" /><span class="val-display">{{ b.toFixed(1) }}</span></label>
    </div>
    <div class="demo-info" v-html="info" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useP5 } from '../composables/useP5.js'
import { drawGrid, bg, C, GU } from './sketchUtils.js'

const container = ref(null)
const m = ref(1.0), b = ref(0.0)
const info = computed(() => {
  const sign = b.value >= 0 ? '+' : '-'
  const desc = m.value > 0 ? 'Crescente' : m.value < 0 ? 'Decrescente' : 'Horizontal'
  return `y = ${m.value.toFixed(1)}x ${sign} ${Math.abs(b.value).toFixed(1)} &nbsp;|&nbsp; ${desc}`
})

useP5(container, (p) => {
  p.setup = () => {
    const w = container.value?.clientWidth || 440
    p.createCanvas(w, Math.min(Math.round(w * 0.65), 280))
  }

  p.draw = () => {
    p.background(...bg())
    const cx=p.width/2, cy=p.height/2
    drawGrid(p, cx, cy)

    // bisectors (reference)
    p.stroke(...C.grey()); p.strokeWeight(0.8)
    p.drawingContext.setLineDash([4,4])
    const xLu=-cx/GU, xRu=(p.width-cx)/GU
    p.line(0, cy-xLu*GU, p.width, cy-xRu*GU)
    p.line(0, cy+xLu*GU, p.width, cy+xRu*GU)
    p.drawingContext.setLineDash([])

    // main line y = m*x + b
    const yL = cy - (m.value * xLu + b.value) * GU
    const yR = cy - (m.value * xRu + b.value) * GU
    p.stroke(...C.azul()); p.strokeWeight(2.5); p.line(0, yL, p.width, yR)

    // y-intercept point
    const yBpt = cy - b.value * GU
    p.fill(...C.laranja()); p.noStroke(); p.ellipse(cx, yBpt, 10, 10)
    p.textSize(14); p.fill(...C.laranja())
    p.text(`b=${b.value.toFixed(1)}`, cx+6, yBpt-4)

    // axes labels
    p.stroke(...C.muted()); p.strokeWeight(1); p.line(0,cy,p.width,cy); p.line(cx,0,cx,p.height)
    p.fill(...C.muted()); p.noStroke(); p.textSize(13)
    p.text('x', p.width-13, cy-6); p.text('y', cx+5, 12)
  }

  p.windowResized = () => {
    const w = container.value?.clientWidth || 440
    p.resizeCanvas(w, Math.min(Math.round(w * 0.65), 280))
  }
})
</script>
