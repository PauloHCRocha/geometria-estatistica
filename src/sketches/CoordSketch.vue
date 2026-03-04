<template>
  <div class="demo-container">
    <div class="demo-header">
      <span class="demo-badge">Demo</span>
      <span class="demo-title">Coordenadas, norma e vetor unitário</span>
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
const info      = ref('Arrasta o ponto para explorar coordenadas e norma.')

useP5(container, (p) => {
  let bx, by, dragging = false

  p.setup = () => {
    const w = container.value?.clientWidth || 420
    p.createCanvas(w, Math.min(Math.round(w * 0.65), 280))
    bx = p.width / 2 + 3*GU; by = p.height / 2 - 2*GU
  }

  p.draw = () => {
    p.background(...bg())
    const cx = p.width / 2, cy = p.height / 2
    drawGrid(p, cx, cy)

    const ux = bx - cx, uy = by - cy
    const uvx = ux / GU, uvy = -uy / GU
    const norm = Math.sqrt(uvx**2 + uvy**2)

    // dashed components
    p.stroke(...C.azul2()); p.strokeWeight(1)
    p.drawingContext.setLineDash([5,4])
    p.line(cx, cy, bx, cy)
    p.line(bx, cy, bx, by)
    p.drawingContext.setLineDash([])

    // main vector
    p.stroke(...C.azul()); p.fill(...C.azul()); p.strokeWeight(2.5)
    drawArrow(p, cx, cy, bx, by)

    // unit vector
    if (norm > 0.01) {
      p.stroke(...C.laranja()); p.fill(...C.laranja()); p.strokeWeight(1.5)
      drawArrow(p, cx, cy, cx + ux/norm, cy + uy/norm)
      p.noStroke(); p.fill(...C.laranja()); p.textSize(14)
      p.text('û', cx + ux/norm + 3, cy + uy/norm - 3)
    }

    // component labels
    p.fill(...C.azul2()); p.noStroke(); p.textSize(13)
    p.text('u₁ = ' + uvx.toFixed(2), (cx+bx)/2, cy + 15)
    p.fill(...C.roxo())
    p.text('u₂ = ' + uvy.toFixed(2), bx + 6, (cy+by)/2)

    const hover = p.dist(p.mouseX, p.mouseY, bx, by) < 14
    drawDot(p, bx, by, hover || dragging, C.azulHex())
    p.fill(...C.text()); p.noStroke(); p.ellipse(cx, cy, 7, 7)

    info.value = `<b>u⃗</b> = (${uvx.toFixed(2)}, ${uvy.toFixed(2)}) &nbsp;|&nbsp; ‖u⃗‖ = ${norm.toFixed(3)}`
  }

  p.mousePressed  = () => { if (p.dist(p.mouseX,p.mouseY,bx,by)<14) dragging=true }
  p.mouseReleased = () => { dragging=false }
  p.mouseDragged  = () => {
    if (!dragging) return
    bx = p.constrain(p.mouseX, 5, p.width-5)
    by = p.constrain(p.mouseY, 5, p.height-5)
  }
  p.windowResized = () => {
    const w = container.value?.clientWidth || 420
    p.resizeCanvas(w, Math.min(Math.round(w * 0.65), 280))
  }
})
</script>
