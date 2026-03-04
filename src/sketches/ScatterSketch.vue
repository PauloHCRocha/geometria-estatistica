<template>
  <div class="demo-container">
    <div class="demo-header">
      <span class="demo-badge">Demo</span>
      <span class="demo-title">Diagrama de dispersão — arrasta os pontos</span>
    </div>
    <div class="demo-canvas-wrapper" ref="container"></div>
    <div class="demo-controls">
      <button class="quiz-btn" @click="reset">Repor posições</button>
    </div>
    <div class="demo-info" v-html="info"></div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useP5 } from '../composables/useP5.js'
import { bg, C } from './sketchUtils.js'

const container = ref(null)
const rVal = ref(0)

const info = computed(() => {
  const r = rVal.value
  const abs = Math.abs(r)
  let cls = abs < 0.2 ? 'nula' : abs < 0.7 ? 'moderada' : abs < 0.9 ? 'forte' : 'muito forte'
  const dir = r > 0.05 ? 'positiva' : r < -0.05 ? 'negativa' : ''
  return `r = ${r.toFixed(3)} &nbsp;— correlação <strong>${dir ? dir + ' ' : ''}${cls}</strong>`
})

const DEFAULT_PTS = [
  [0.15, 0.20], [0.25, 0.30], [0.35, 0.25], [0.45, 0.45],
  [0.50, 0.55], [0.60, 0.60], [0.65, 0.50], [0.75, 0.70],
  [0.80, 0.75], [0.85, 0.85],
]
let pts = DEFAULT_PTS.map(([x, y]) => [x, y])
let dragging = -1

function pearsonR(pts) {
  const n = pts.length
  if (n < 2) return 0
  const xs = pts.map(p => p[0])
  const ys = pts.map(p => p[1])
  const mx = xs.reduce((a, b) => a + b) / n
  const my = ys.reduce((a, b) => a + b) / n
  const num = pts.reduce((s, [x, y]) => s + (x - mx) * (y - my), 0)
  const dx = Math.sqrt(xs.reduce((s, x) => s + (x - mx) ** 2, 0))
  const dy = Math.sqrt(ys.reduce((s, y) => s + (y - my) ** 2, 0))
  return (dx * dy < 1e-10) ? 0 : num / (dx * dy)
}

function linearRegression(pts) {
  const n = pts.length
  const mx = pts.reduce((s, p) => s + p[0], 0) / n
  const my = pts.reduce((s, p) => s + p[1], 0) / n
  const num = pts.reduce((s, [x, y]) => s + (x - mx) * (y - my), 0)
  const den = pts.reduce((s, [x]) => s + (x - mx) ** 2, 0)
  const slope = den < 1e-10 ? 0 : num / den
  const intercept = my - slope * mx
  return { slope, intercept }
}

function reset() {
  pts = DEFAULT_PTS.map(([x, y]) => [x, y])
}

useP5(container, (p) => {
  const PAD = 32

  function toCanvas(nx, ny) {
    const w = p.width - 2 * PAD, h = p.height - 2 * PAD
    return [PAD + nx * w, PAD + (1 - ny) * h]
  }
  function fromCanvas(cx, cy) {
    const w = p.width - 2 * PAD, h = p.height - 2 * PAD
    return [p.constrain((cx - PAD) / w, 0, 1), p.constrain(1 - (cy - PAD) / h, 0, 1)]
  }

  p.setup = () => {
    const w = container.value?.clientWidth || 440
    p.createCanvas(w, Math.min(Math.round(w * 0.7), 320))
  }

  p.draw = () => {
    p.background(...bg())

    // Grid
    p.stroke(...C.greyLight()); p.strokeWeight(0.5)
    for (let i = 0; i <= 4; i++) {
      const [gx] = toCanvas(i / 4, 0)
      const [, gy] = toCanvas(0, i / 4)
      p.line(gx, PAD, gx, p.height - PAD)
      p.line(PAD, gy, p.width - PAD, gy)
    }

    // Axes
    p.stroke(...C.grey()); p.strokeWeight(1.5)
    p.line(PAD, p.height - PAD, p.width - PAD, p.height - PAD)
    p.line(PAD, PAD, PAD, p.height - PAD)
    p.noStroke(); p.fill(...C.muted()); p.textSize(13); p.textAlign(p.CENTER)
    p.text('x', p.width - PAD + 12, p.height - PAD + 4)
    p.textAlign(p.LEFT)
    p.text('y', PAD - 14, PAD - 4)

    // Regression line
    const r = pearsonR(pts)
    rVal.value = Math.round(r * 1000) / 1000
    const { slope, intercept } = linearRegression(pts)
    const [lx0, ly0] = toCanvas(0, slope * 0 + intercept)
    const [lx1, ly1] = toCanvas(1, slope * 1 + intercept)
    p.stroke(...C.azul(), 110); p.strokeWeight(1.5)
    p.drawingContext.setLineDash([6, 4])
    p.line(lx0, ly0, lx1, ly1)
    p.drawingContext.setLineDash([])

    // Points
    pts.forEach(([nx, ny], i) => {
      const [cx, cy] = toCanvas(nx, ny)
      p.fill(...C.azul(), dragging === i ? 230 : 190)
      p.stroke(...C.azul()); p.strokeWeight(1.2)
      p.ellipse(cx, cy, 14, 14)
    })
  }

  p.mousePressed = () => {
    pts.forEach(([nx, ny], i) => {
      const [cx, cy] = toCanvas(nx, ny)
      if (p.dist(p.mouseX, p.mouseY, cx, cy) < 10) dragging = i
    })
  }
  p.mouseDragged = () => { if (dragging >= 0) pts[dragging] = fromCanvas(p.mouseX, p.mouseY) }
  p.mouseReleased = () => { dragging = -1 }

  p.windowResized = () => {
    const w = container.value?.clientWidth || 440
    p.resizeCanvas(w, Math.min(Math.round(w * 0.7), 320))
  }
})
</script>
