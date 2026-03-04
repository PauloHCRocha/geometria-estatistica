<template>
  <div class="demo-container">
    <div class="demo-header">
      <span class="demo-badge">Demo</span>
      <span class="demo-title">Box plot interativo — arrasta os pontos</span>
    </div>
    <div class="demo-canvas-wrapper" ref="container"></div>
    <div class="demo-info" v-html="info"></div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useP5 } from '../composables/useP5.js'
import { bg, C } from './sketchUtils.js'

const container = ref(null)
const statsInfo = ref({ q1: 0, q2: 0, q3: 0, aiq: 0 })

const info = computed(() => {
  const s = statsInfo.value
  return `Q₁ = ${s.q1} &nbsp;|&nbsp; Q₂ = ${s.q2} &nbsp;|&nbsp; Q₃ = ${s.q3} &nbsp;|&nbsp; AIQ = ${s.aiq}`
})

useP5(container, (p) => {
  let pts = [5, 8, 10, 11, 12, 14, 18, 25]
  let dragging = -1

  const PAD = { l: 32, r: 32, t: 50, bDots: 30, bBox: 60 }

  function getRange(w) {
    return { lo: -5, hi: 40, W: w - PAD.l - PAD.r }
  }

  function valToX(v, lo, W, hi) {
    return PAD.l + ((v - lo) / (hi - lo)) * W
  }

  function quartiles(data) {
    const s = [...data].sort((a, b) => a - b)
    const n = s.length
    const median = arr => {
      const m = Math.floor(arr.length / 2)
      return arr.length % 2 !== 0 ? arr[m] : (arr[m - 1] + arr[m]) / 2
    }
    const q2 = median(s)
    const lower = n % 2 === 0 ? s.slice(0, n / 2) : s.slice(0, Math.floor(n / 2))
    const upper = n % 2 === 0 ? s.slice(n / 2) : s.slice(Math.ceil(n / 2))
    const q1 = median(lower)
    const q3 = median(upper)
    return { q1, q2, q3, aiq: q3 - q1, min: s[0], max: s[n - 1] }
  }

  function outlierType(v, q1, q3, aiq) {
    if (v < q1 - 3 * aiq || v > q3 + 3 * aiq) return 'severe'
    if (v < q1 - 1.5 * aiq || v > q3 + 1.5 * aiq) return 'moderate'
    return 'normal'
  }

  p.setup = () => {
    const w = container.value?.clientWidth || 440
    p.createCanvas(w, Math.min(Math.round(w * 0.55), 260))
  }

  p.draw = () => {
    p.background(...bg())
    const { lo, hi, W } = getRange(p.width)
    const dotY = PAD.t
    const boxY = p.height - PAD.bBox

    const stats = quartiles(pts)
    statsInfo.value = {
      q1: Math.round(stats.q1 * 10) / 10,
      q2: Math.round(stats.q2 * 10) / 10,
      q3: Math.round(stats.q3 * 10) / 10,
      aiq: Math.round(stats.aiq * 10) / 10,
    }

    // ── axis ──
    p.stroke(...C.grey()); p.strokeWeight(1)
    p.line(PAD.l, boxY, PAD.l + W, boxY)
    for (let v = 0; v <= 40; v += 5) {
      if (v < lo || v > hi) continue
      const tx = valToX(v, lo, W, hi)
      p.stroke(...C.grey()); p.line(tx, boxY - 4, tx, boxY + 4)
      p.noStroke(); p.fill(...C.muted()); p.textSize(13); p.textAlign(p.CENTER)
      p.text(v, tx, boxY + 15)
    }

    // ── fence lines ──
    const limModLo = stats.q1 - 1.5 * stats.aiq
    const limModHi = stats.q3 + 1.5 * stats.aiq
    const limSevLo = stats.q1 - 3 * stats.aiq
    const limSevHi = stats.q3 + 3 * stats.aiq

    const drawFence = (v, col) => {
      if (v < lo || v > hi) return
      const fx = valToX(v, lo, W, hi)
      p.stroke(...col); p.strokeWeight(0.8)
      p.drawingContext.setLineDash([3, 3])
      p.line(fx, boxY - 20, fx, dotY - 12)
      p.drawingContext.setLineDash([])
    }
    drawFence(limModLo, C.amarelo())
    drawFence(limModHi, C.amarelo())
    drawFence(limSevLo, C.vermelho())
    drawFence(limSevHi, C.vermelho())

    // ── box plot ──
    const wMin = Math.max(stats.min, limModLo)
    const wMax = Math.min(stats.max, limModHi)
    const xQ1 = valToX(stats.q1, lo, W, hi)
    const xQ2 = valToX(stats.q2, lo, W, hi)
    const xQ3 = valToX(stats.q3, lo, W, hi)
    const xWMin = valToX(Math.max(wMin, lo), lo, W, hi)
    const xWMax = valToX(Math.min(wMax, hi), lo, W, hi)
    const bh = 22

    // whiskers
    p.stroke(...C.azul()); p.strokeWeight(1.5)
    p.line(xWMin, boxY, xQ1, boxY)
    p.line(xQ3, boxY, xWMax, boxY)
    p.line(xWMin, boxY - bh * 0.5, xWMin, boxY + bh * 0.5)
    p.line(xWMax, boxY - bh * 0.5, xWMax, boxY + bh * 0.5)

    // box
    p.fill(...C.azul(), 55); p.stroke(...C.azul()); p.strokeWeight(1.5)
    p.rect(xQ1, boxY - bh, xQ3 - xQ1, bh * 2)

    // median line
    p.stroke(...C.laranja()); p.strokeWeight(3)
    p.line(xQ2, boxY - bh, xQ2, boxY + bh)

    // labels
    p.noStroke(); p.textSize(13); p.textAlign(p.CENTER)
    p.fill(...C.azul())
    p.text('Q₁', xQ1, boxY - bh - 4)
    p.text('Q₃', xQ3, boxY - bh - 4)
    p.fill(...C.laranja())
    p.text('Q₂', xQ2, boxY - bh - 4)

    // ── data points ──
    const R = 9
    pts.forEach((v, i) => {
      const type = outlierType(v, stats.q1, stats.q3, stats.aiq)
      const px2 = valToX(p.constrain(v, lo, hi), lo, W, hi)
      let col = C.azul()
      if (type === 'moderate') col = C.amarelo()
      if (type === 'severe')   col = C.vermelho()
      p.fill(...col, dragging === i ? 200 : 160)
      p.stroke(...col); p.strokeWeight(1.2)
      p.ellipse(px2, dotY, R * 2, R * 2)
      p.noStroke(); p.fill(255); p.textSize(10); p.textAlign(p.CENTER)
      p.text(Math.round(v), px2, dotY + 3)
    })
  }

  p.mousePressed = () => {
    const { lo, hi, W } = getRange(p.width)
    const dotY = PAD.t
    pts.forEach((v, i) => {
      const px2 = valToX(p.constrain(v, lo, hi), lo, W, hi)
      if (p.dist(p.mouseX, p.mouseY, px2, dotY) < 12) dragging = i
    })
  }

  p.mouseDragged = () => {
    if (dragging < 0) return
    const { lo, hi, W } = getRange(p.width)
    const raw = lo + ((p.mouseX - PAD.l) / W) * (hi - lo)
    pts[dragging] = Math.round(p.constrain(raw, lo, hi) * 2) / 2
  }

  p.mouseReleased = () => { dragging = -1 }

  p.windowResized = () => {
    const w = container.value?.clientWidth || 440
    p.resizeCanvas(w, Math.min(Math.round(w * 0.55), 260))
  }
})
</script>
