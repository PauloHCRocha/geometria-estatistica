<template>
  <div class="demo-container">
    <div class="demo-header">
      <span class="demo-badge">Demo</span>
      <span class="demo-title">Distância e ponto médio — arrasta A e B</span>
    </div>
    <div class="demo-canvas-wrapper" ref="container"></div>
    <div class="demo-info" v-html="info" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useP5 } from '../composables/useP5.js'
import { drawGrid, drawDot, bg, C, GU } from './sketchUtils.js'

const container = ref(null)
const info      = ref('Arrasta os pontos A e B.')

useP5(container, (p) => {
  let A, B, dragA=false, dragB=false

  p.setup = () => {
    const w = container.value?.clientWidth || 440
    p.createCanvas(w, Math.min(Math.round(w * 0.65), 280))
    const cx=p.width/2, cy=p.height/2
    A={x:cx-100,y:cy+60}; B={x:cx+120,y:cy-80}
  }

  p.draw = () => {
    p.background(...bg())
    const cx=p.width/2, cy=p.height/2
    drawGrid(p, cx, cy)

    const Ax=(A.x-cx)/GU, Ay=-(A.y-cy)/GU
    const Bx=(B.x-cx)/GU, By=-(B.y-cy)/GU
    const Mx=(Ax+Bx)/2, My=(Ay+By)/2
    const dist=Math.sqrt((Bx-Ax)**2+(By-Ay)**2)

    // Pythagorean triangle
    const dx=Math.abs(Bx-Ax), dy=Math.abs(By-Ay)
    p.stroke(...C.verde(), 100); p.strokeWeight(1)
    p.drawingContext.setLineDash([5,4])
    p.line(A.x, A.y, B.x, A.y)
    p.line(B.x, A.y, B.x, B.y)
    p.drawingContext.setLineDash([])

    // AB segment
    p.stroke(...C.azul()); p.strokeWeight(2.5); p.noFill()
    p.line(A.x, A.y, B.x, B.y)

    // midpoint M
    const Mpx=cx+Mx*GU, Mpy=cy-My*GU
    p.fill(...C.laranja()); p.noStroke(); p.ellipse(Mpx, Mpy, 10, 10)
    p.textSize(14); p.fill(...C.laranja())
    p.text(`M(${Mx.toFixed(1)},${My.toFixed(1)})`, Mpx+5, Mpy-5)

    // component labels
    p.fill(...C.verde()); p.textSize(14)
    p.text(`|Δx|=${dx.toFixed(1)}`, (A.x+B.x)/2, A.y+13)
    p.text(`|Δy|=${dy.toFixed(1)}`, B.x+4, (A.y+B.y)/2)

    const hA=dragA||p.dist(p.mouseX,p.mouseY,A.x,A.y)<14
    const hB=dragB||p.dist(p.mouseX,p.mouseY,B.x,B.y)<14
    drawDot(p, A.x, A.y, hA, C.azulHex())
    drawDot(p, B.x, B.y, hB, C.vermelhoHex())
    p.fill(...C.azul());    p.noStroke(); p.textSize(13); p.text(`A(${Ax.toFixed(1)},${Ay.toFixed(1)})`, A.x+6, A.y-6)
    p.fill(...C.vermelho()); p.text(`B(${Bx.toFixed(1)},${By.toFixed(1)})`, B.x+6, B.y-6)

    info.value = `d(A,B) = √(${(dx**2).toFixed(1)} + ${(dy**2).toFixed(1)}) = ${dist.toFixed(3)} &nbsp;|&nbsp; M = (${Mx.toFixed(2)}, ${My.toFixed(2)})`
  }

  p.mousePressed  = () => {
    if (p.dist(p.mouseX,p.mouseY,A.x,A.y)<14) dragA=true
    if (p.dist(p.mouseX,p.mouseY,B.x,B.y)<14) dragB=true
  }
  p.mouseReleased = () => { dragA=false; dragB=false }
  p.mouseDragged  = () => {
    if (dragA) { A.x=p.constrain(p.mouseX,5,p.width-5); A.y=p.constrain(p.mouseY,5,p.height-5) }
    if (dragB) { B.x=p.constrain(p.mouseX,5,p.width-5); B.y=p.constrain(p.mouseY,5,p.height-5) }
  }
  p.windowResized = () => {
    const w = container.value?.clientWidth || 440
    p.resizeCanvas(w, Math.min(Math.round(w * 0.65), 280))
  }
})
</script>
