<template>
  <div class="demo-container">
    <div class="demo-header">
      <span class="demo-badge">Demo</span>
      <span class="demo-title">Soma de vetores — arrasta as extremidades</span>
    </div>
    <div class="demo-canvas-wrapper" ref="container"></div>
    <div class="demo-controls">
      <button class="demo-btn" :class="{ active: mode === 'triangulo' }" @click="mode = 'triangulo'">Regra do triângulo</button>
      <button class="demo-btn" :class="{ active: mode === 'paralelo'  }" @click="mode = 'paralelo'">Regra do paralelogramo</button>
    </div>
    <div class="demo-info" v-html="info" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useP5 } from '../composables/useP5.js'
import { drawGrid, drawArrow, drawDot, bg, C, GU } from './sketchUtils.js'

const container = ref(null)
const info      = ref('')
const mode      = ref('triangulo')

useP5(container, (p) => {
  const O = { x: 0, y: 0 }
  let ub = { x: 0, y: 0 }, vb = { x: 0, y: 0 }
  let dragU = false, dragV = false

  p.setup = () => {
    const w = container.value?.clientWidth || 420
    p.createCanvas(w, Math.min(Math.round(w * 0.68), 300))
    O.x = 60; O.y = p.height - 60
    ub = { x: O.x + 150, y: O.y - 80 }
    vb = { x: O.x + 100, y: O.y - 130 }
  }

  p.draw = () => {
    p.background(...bg())
    drawGrid(p, O.x, O.y)

    const ux = ub.x - O.x, uy = ub.y - O.y
    const vx = vb.x - O.x, vy = vb.y - O.y

    if (mode.value === 'triangulo') {
      p.stroke(...C.azul());  p.fill(...C.azul());  p.strokeWeight(2.5)
      drawArrow(p, O.x, O.y, ub.x, ub.y)
      lbl(p, 'u⃗', (O.x+ub.x)/2-14, (O.y+ub.y)/2, C.azul())

      p.stroke(...C.verde());  p.fill(...C.verde());  p.strokeWeight(2.5)
      drawArrow(p, ub.x, ub.y, ub.x+vx, ub.y+vy)
      lbl(p, 'v⃗', ub.x+vx/2+4, ub.y+vy/2, C.verde())

      p.stroke(...C.laranja()); p.fill(...C.laranja()); p.strokeWeight(2.5)
      drawArrow(p, O.x, O.y, ub.x+vx, ub.y+vy)
      lbl(p, 'u⃗+v⃗', (O.x+ub.x+vx)/2+4, (O.y+ub.y+vy)/2+14, C.laranja())
    } else {
      p.stroke(...C.azul());  p.fill(...C.azul());  p.strokeWeight(2.5)
      drawArrow(p, O.x, O.y, ub.x, ub.y)
      lbl(p, 'u⃗', (O.x+ub.x)/2, (O.y+ub.y)/2+14, C.azul())

      p.stroke(...C.verde());  p.fill(...C.verde());  p.strokeWeight(2.5)
      drawArrow(p, O.x, O.y, O.x+vx, O.y+vy)
      lbl(p, 'v⃗', (O.x+vx)/2-18, (O.y+vy)/2, C.verde())

      p.stroke(...C.greyLight()); p.strokeWeight(1); p.noFill()
      p.drawingContext.setLineDash([5,4])
      p.line(ub.x, ub.y, ub.x+vx, ub.y+vy)
      p.line(O.x+vx, O.y+vy, ub.x+vx, ub.y+vy)
      p.drawingContext.setLineDash([])

      p.stroke(...C.laranja()); p.fill(...C.laranja()); p.strokeWeight(2.5)
      drawArrow(p, O.x, O.y, ub.x+vx, ub.y+vy)
      lbl(p, 'u⃗+v⃗', (O.x+ub.x+vx)/2+4, (O.y+ub.y+vy)/2, C.laranja())
    }

    p.fill(...C.text()); p.noStroke(); p.ellipse(O.x, O.y, 7, 7)
    p.textSize(14); p.fill(...C.muted()); p.text('O', O.x-13, O.y+3)

    const hU = p.dist(p.mouseX,p.mouseY,ub.x,ub.y) < 14
    const hV = p.dist(p.mouseX,p.mouseY,O.x+(vb.x-O.x),O.y+(vb.y-O.y)) < 14
    drawDot(p, ub.x, ub.y, dragU||hU, C.azulHex())
    drawDot(p, O.x+(vb.x-O.x), O.y+(vb.y-O.y), dragV||hV, C.verdeHex())

    const sxu = ux/GU, syu = -uy/GU
    const sxv = (vb.x-O.x)/GU, syv = -(vb.y-O.y)/GU
    info.value = `u⃗ = (${sxu.toFixed(1)}, ${syu.toFixed(1)}) &nbsp;|&nbsp; v⃗ = (${sxv.toFixed(1)}, ${syv.toFixed(1)}) &nbsp;|&nbsp; u⃗+v⃗ = (${(sxu+sxv).toFixed(1)}, ${(syu+syv).toFixed(1)})`
  }

  function lbl(p, t, x, y, col) { p.fill(...col); p.noStroke(); p.textSize(14); p.text(t, x, y) }

  p.mousePressed  = () => {
    if (p.dist(p.mouseX,p.mouseY,ub.x,ub.y)<14) dragU=true
    const vpx=O.x+(vb.x-O.x), vpy=O.y+(vb.y-O.y)
    if (p.dist(p.mouseX,p.mouseY,vpx,vpy)<14) dragV=true
  }
  p.mouseReleased = () => { dragU=false; dragV=false }
  p.mouseDragged  = () => {
    if (dragU) { ub.x=p.mouseX; ub.y=p.mouseY }
    if (dragV) { vb.x=O.x+(p.mouseX-O.x); vb.y=O.y+(p.mouseY-O.y) }
  }
  p.windowResized = () => {
    const w = container.value?.clientWidth || 420
    p.resizeCanvas(w, Math.min(Math.round(w * 0.68), 300))
  }
})
</script>
