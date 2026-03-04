<template>
  <div class="demo-container">
    <div class="demo-header">
      <span class="demo-badge">Demo</span>
      <span class="demo-title">Produto escalar e ângulo — arrasta os vetores</span>
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
const info      = ref('Arrasta as extremidades dos vetores.')

useP5(container, (p) => {
  let ub, vb, dragU=false, dragV=false

  p.setup = () => {
    const w = container.value?.clientWidth || 420
    p.createCanvas(w, Math.min(Math.round(w * 0.68), 300))
    const cx = p.width/2, cy = p.height/2
    ub = { x: cx+140, y: cy-60 }
    vb = { x: cx+60,  y: cy-130 }
  }

  p.draw = () => {
    p.background(...bg())
    const cx = p.width/2, cy = p.height/2
    drawGrid(p, cx, cy)

    const ux = ub.x-cx, uy = ub.y-cy
    const vx = vb.x-cx, vy = vb.y-cy
    const uN = Math.sqrt(ux**2+uy**2), vN = Math.sqrt(vx**2+vy**2)

    // angle arc
    if (uN>5 && vN>5) {
      const aU = Math.atan2(uy,ux), aV = Math.atan2(vy,vx)
      p.noFill(); p.stroke(...C.amarelo()); p.strokeWeight(1.5)
      p.arc(cx, cy, 50, 50, Math.min(aU,aV), Math.max(aU,aV))
      const mid = (aU+aV)/2
      p.fill(...C.amarelo()); p.noStroke(); p.textSize(13)
      p.text('θ', cx+32*Math.cos(mid), cy+32*Math.sin(mid))
    }

    p.stroke(...C.azul());  p.fill(...C.azul());  p.strokeWeight(2.5); drawArrow(p,cx,cy,ub.x,ub.y)
    p.noStroke(); p.fill(...C.azul()); p.textSize(14); p.text('u⃗', ub.x+5, ub.y-5)
    p.stroke(...C.vermelho()); p.fill(...C.vermelho()); p.strokeWeight(2.5); drawArrow(p,cx,cy,vb.x,vb.y)
    p.noStroke(); p.fill(...C.vermelho()); p.textSize(14); p.text('v⃗', vb.x+5, vb.y-5)

    drawDot(p, ub.x, ub.y, dragU||p.dist(p.mouseX,p.mouseY,ub.x,ub.y)<14, C.azulHex())
    drawDot(p, vb.x, vb.y, dragV||p.dist(p.mouseX,p.mouseY,vb.x,vb.y)<14, C.vermelhoHex())
    p.fill(...C.text()); p.noStroke(); p.ellipse(cx, cy, 7, 7)

    const uuvx=ux/GU, uuvy=-uy/GU, uvvx=vx/GU, uvvy=-vy/GU
    const dot  = uuvx*uvvx + uuvy*uvvy
    const cosT = (uN>0&&vN>0) ? Math.max(-1,Math.min(1,(ux*vx+uy*vy)/(uN*vN))) : 0
    const theta = (Math.acos(cosT)*180/Math.PI).toFixed(1)
    const ortho = Math.abs(dot) < 0.06

    info.value =
      `<span style="${ortho?'color:#4DD68A;font-weight:800':''}">u⃗·v⃗ = ${dot.toFixed(2)}</span>` +
      ` &nbsp;|&nbsp; θ ≈ ${theta}°` +
      (ortho ? ' &nbsp; 🟢 <strong>Ortogonais!</strong>' : '')
  }

  p.mousePressed  = () => {
    if (p.dist(p.mouseX,p.mouseY,ub.x,ub.y)<14) dragU=true
    if (p.dist(p.mouseX,p.mouseY,vb.x,vb.y)<14) dragV=true
  }
  p.mouseReleased = () => { dragU=false; dragV=false }
  p.mouseDragged  = () => {
    if (dragU) { ub.x=p.mouseX; ub.y=p.mouseY }
    if (dragV) { vb.x=p.mouseX; vb.y=p.mouseY }
  }
  p.windowResized = () => {
    const w = container.value?.clientWidth || 420
    p.resizeCanvas(w, Math.min(Math.round(w * 0.68), 300))
  }
})
</script>
