<template>
  <div class="demo-container">
    <div class="demo-header">
      <span class="demo-badge">Demo</span>
      <span class="demo-title">Histograma interativo — Regra de Sturges</span>
    </div>
    <div class="demo-canvas-wrapper" ref="container"></div>
    <div class="demo-controls">
      <label>
        k (classes) =
        <input type="range" min="3" max="10" step="1" v-model.number="k" />
        <span class="val-display">{{ k }}</span>
        <span style="font-size:0.8em; color:#888; margin-left:6px">(Sturges recomenda {{ sturgesK }})</span>
      </label>
    </div>
    <div class="demo-info">
      Amplitude A = {{ amplitude.toFixed(2) }} &nbsp;|&nbsp;
      x̄ = {{ mean.toFixed(2) }} &nbsp;|&nbsp;
      x̃ = {{ median.toFixed(2) }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useP5 } from '../composables/useP5.js'
import { bg, C } from './sketchUtils.js'

const container = ref(null)
const k = ref(6)

const DATA = [4,5,6,6,7,7,8,8,8,9,9,9,9,10,10,10,10,10,11,11,12,12,13,14,16]
const n = DATA.length
const dMin = Math.min(...DATA)
const dMax = Math.max(...DATA)

const sturgesK = computed(() => Math.ceil(1 + 3.32 * Math.log10(n)))
const amplitude = computed(() => (dMax - dMin) / k.value)
const mean = computed(() => DATA.reduce((a, b) => a + b, 0) / n)
const median = computed(() => {
  const sorted = [...DATA].sort((a, b) => a - b)
  const mid = Math.floor(sorted.length / 2)
  return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2
})

const bins = computed(() => {
  const A = amplitude.value
  const result = []
  for (let i = 0; i < k.value; i++) {
    const lo = dMin + i * A
    const hi = dMin + (i + 1) * A
    const count = DATA.filter(v => (i < k.value - 1) ? (v >= lo && v < hi) : (v >= lo && v <= hi)).length
    result.push({ lo, hi, count, xi: (lo + hi) / 2 })
  }
  return result
})

useP5(container, (p) => {
  p.setup = () => {
    const w = container.value?.clientWidth || 440
    p.createCanvas(w, Math.min(Math.round(w * 0.65), 300))
  }

  p.draw = () => {
    p.background(...bg())
    const PAD = { l: 38, r: 14, t: 16, b: 32 }
    const W = p.width - PAD.l - PAD.r
    const H = p.height - PAD.t - PAD.b

    const maxCount = Math.max(...bins.value.map(b => b.count), 1)

    // Grid y
    p.strokeWeight(0.5)
    const yTicks = 4
    for (let i = 0; i <= yTicks; i++) {
      const val = Math.round((maxCount / yTicks) * i)
      const yy = PAD.t + H - (val / maxCount) * H
      p.stroke(...C.greyLight()); p.line(PAD.l, yy, PAD.l + W, yy)
      p.noStroke(); p.fill(...C.muted()); p.textSize(11); p.textAlign(p.RIGHT)
      p.text(val, PAD.l - 3, yy + 3)
      p.stroke(...C.greyLight()); p.strokeWeight(0.5)
    }

    // Draw bars
    const barW = W / bins.value.length
    bins.value.forEach((b, i) => {
      const bh = (b.count / maxCount) * H
      const bx = PAD.l + i * barW
      const by = PAD.t + H - bh

      p.fill(...C.azul(), 180)
      p.stroke(...C.azul())
      p.strokeWeight(0.8)
      p.rect(bx, by, barW, bh)

      if (b.count > 0 && bh > 14) {
        p.noStroke(); p.fill(255); p.textSize(14); p.textAlign(p.CENTER)
        p.text(b.count, bx + barW / 2, by + Math.min(bh / 2 + 4, bh - 4))
      }

      p.noStroke(); p.fill(...C.muted()); p.textSize(11); p.textAlign(p.CENTER)
      p.text(b.lo.toFixed(1), bx, PAD.t + H + 12)
    })
    const lastBin = bins.value[bins.value.length - 1]
    p.noStroke(); p.fill(...C.muted()); p.textSize(11); p.textAlign(p.CENTER)
    p.text(lastBin.hi.toFixed(1), PAD.l + W, PAD.t + H + 12)

    // x-axis line
    p.stroke(...C.muted()); p.strokeWeight(1)
    p.line(PAD.l, PAD.t + H, PAD.l + W, PAD.t + H)

    // Mean marker
    const mx = PAD.l + ((mean.value - dMin) / (dMax - dMin)) * W
    p.stroke(...C.laranja()); p.strokeWeight(2)
    p.drawingContext.setLineDash([4, 3])
    p.line(mx, PAD.t, mx, PAD.t + H)
    p.drawingContext.setLineDash([])
    p.noStroke(); p.fill(...C.laranja()); p.textSize(11); p.textAlign(p.CENTER)
    p.text('x̄', mx, PAD.t - 4)

    // Median marker
    const mdx = PAD.l + ((median.value - dMin) / (dMax - dMin)) * W
    p.stroke(...C.verde()); p.strokeWeight(2)
    p.drawingContext.setLineDash([3, 4])
    p.line(mdx, PAD.t, mdx, PAD.t + H)
    p.drawingContext.setLineDash([])
    p.noStroke(); p.fill(...C.verde()); p.textSize(11); p.textAlign(p.CENTER)
    p.text('x̃', mdx, PAD.t - 4)
  }

  p.windowResized = () => {
    const w = container.value?.clientWidth || 440
    p.resizeCanvas(w, Math.min(Math.round(w * 0.65), 300))
  }
})
</script>
