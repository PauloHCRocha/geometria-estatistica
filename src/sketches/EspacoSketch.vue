<template>
  <div class="demo-container">
    <div class="demo-header">
      <span class="demo-badge">Demo</span>
      <span class="demo-title">Referencial 3D — projeção isométrica</span>
    </div>
    <div class="demo-canvas-wrapper" ref="container"></div>
    <div class="demo-controls">
      <label>x = <input type="range" min="-4" max="4" step="0.5" v-model.number="px" /><span class="val-display">{{ px }}</span></label>
      <label>y = <input type="range" min="-4" max="4" step="0.5" v-model.number="py" /><span class="val-display">{{ py }}</span></label>
      <label>z = <input type="range" min="-4" max="4" step="0.5" v-model.number="pz" /><span class="val-display">{{ pz }}</span></label>
    </div>
    <div class="demo-info">
      P = ({{ px }}, {{ py }}, {{ pz }})
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useP5 } from '../composables/useP5.js'
import { bg, C } from './sketchUtils.js'

const container = ref(null)
const px = ref(2), py = ref(2), pz = ref(2)

const ISO_ANGLE = Math.PI / 6

useP5(container, (p) => {
  const SCALE = 36

  function iso(x, y, z) {
    const sx = (x - y) * Math.cos(ISO_ANGLE) * SCALE
    const sy = -(x + y) * Math.sin(ISO_ANGLE) * SCALE - z * SCALE
    return { sx, sy }
  }

  p.setup = () => {
    const w = container.value?.clientWidth || 440
    p.createCanvas(w, Math.min(Math.round(w * 0.65), 300))
    p.textFont('monospace')
  }

  p.draw = () => {
    p.background(...bg())
    const cx = p.width / 2, cy = p.height * 0.6

    const axLen = 4
    const colors = {
      x: C.azul(),
      y: C.verde(),
      z: C.laranja(),
    }

    const xe = iso(axLen, 0, 0)
    p.stroke(...colors.x); p.strokeWeight(2)
    p.line(cx, cy, cx + xe.sx, cy + xe.sy)
    p.fill(...colors.x); p.noStroke(); p.textSize(14)
    p.text('x', cx + xe.sx + 6, cy + xe.sy + 4)

    const ye = iso(0, axLen, 0)
    p.stroke(...colors.y); p.strokeWeight(2)
    p.line(cx, cy, cx + ye.sx, cy + ye.sy)
    p.fill(...colors.y); p.noStroke()
    p.text('y', cx + ye.sx - 14, cy + ye.sy + 4)

    const ze = iso(0, 0, axLen)
    p.stroke(...colors.z); p.strokeWeight(2)
    p.line(cx, cy, cx + ze.sx, cy + ze.sy)
    p.fill(...colors.z); p.noStroke()
    p.text('z', cx + ze.sx + 4, cy + ze.sy - 4)

    p.fill(...C.muted()); p.textSize(14)
    p.text('O', cx + 4, cy + 12)

    p.strokeWeight(0.5)
    for (let i = -4; i <= 4; i++) {
      if (i === 0) continue
      const xi = iso(i, 0, 0), yi = iso(0, i, 0), zi = iso(0, 0, i)
      p.stroke(...C.grey())
      p.line(cx + xi.sx - 2, cy + xi.sy - 2, cx + xi.sx + 2, cy + xi.sy + 2)
      p.line(cx + yi.sx - 2, cy + yi.sy - 2, cx + yi.sx + 2, cy + yi.sy + 2)
      p.line(cx + zi.sx - 2, cy + zi.sy, cx + zi.sx + 2, cy + zi.sy)
    }

    const P   = iso(px.value, py.value, pz.value)
    const Pxy = iso(px.value, py.value, 0)
    const Px0 = iso(px.value, 0, 0)
    const P0y = iso(0, py.value, 0)

    p.stroke(...C.grey()); p.strokeWeight(1)
    p.drawingContext.setLineDash([4, 3])
    p.line(cx + P.sx,   cy + P.sy,   cx + Pxy.sx, cy + Pxy.sy)
    p.line(cx + Pxy.sx, cy + Pxy.sy, cx + Px0.sx, cy + Px0.sy)
    p.line(cx + Pxy.sx, cy + Pxy.sy, cx + P0y.sx, cy + P0y.sy)
    p.drawingContext.setLineDash([])

    p.fill(...C.laranja()); p.noStroke()
    p.ellipse(cx + P.sx, cy + P.sy, 10, 10)

    p.textSize(13); p.fill(...C.text())
    p.text(`P(${px.value}, ${py.value}, ${pz.value})`, cx + P.sx + 8, cy + P.sy - 4)
  }

  p.windowResized = () => {
    const w = container.value?.clientWidth || 440
    p.resizeCanvas(w, Math.min(Math.round(w * 0.65), 300))
  }
})
</script>
