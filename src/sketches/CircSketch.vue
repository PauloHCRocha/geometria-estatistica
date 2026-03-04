<template>
  <div class="demo-container">
    <div class="demo-header">
      <span class="demo-badge">Demo</span>
      <span class="demo-title">Circunferência interativa — arrasta C e o ponto no raio</span>
    </div>
    <div class="demo-canvas-wrapper" ref="container"></div>
    <div class="demo-controls">
      <button class="demo-btn" :class="{active:mode==='circ'}" @click="mode='circ'">Circunferência</button>
      <button class="demo-btn" :class="{active:mode==='int'}"  @click="mode='int'">Interior</button>
      <button class="demo-btn" :class="{active:mode==='ext'}"  @click="mode='ext'">Exterior</button>
      <button class="demo-btn" :class="{active:mode==='tang'}" @click="mode='tang'">Tangente</button>
    </div>
    <div class="demo-info" v-html="info" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useP5 } from '../composables/useP5.js'
import { drawGrid, drawDot, bg, C, GU } from './sketchUtils.js'

const container = ref(null)
const info      = ref('')
const mode      = ref('circ')

useP5(container, (p) => {
  let Cpt, R, dragC=false, dragR=false

  p.setup = () => {
    const w = container.value?.clientWidth || 440
    p.createCanvas(w, Math.min(Math.round(w * 0.7), 320))
    Cpt = { x: p.width/2, y: p.height/2 }
    R   = { x: p.width/2 + 100, y: p.height/2 }
  }

  p.draw = () => {
    p.background(...bg())
    drawGrid(p, p.width/2, p.height/2)

    const r   = p.dist(Cpt.x, Cpt.y, R.x, R.y)
    const Cx  = (Cpt.x - p.width/2)/GU, Cy = -(Cpt.y - p.height/2)/GU
    const Ru  = r / GU
    const m   = mode.value

    if (m==='circ') {
      p.noFill(); p.stroke(...C.azul()); p.strokeWeight(2.5); p.circle(Cpt.x,Cpt.y,r*2)
    } else if (m==='int') {
      p.fill(...C.azul2(), 40); p.strokeWeight(0); p.circle(Cpt.x,Cpt.y,r*2)
      p.noFill(); p.stroke(...C.azul2()); p.strokeWeight(1.5)
      p.drawingContext.setLineDash([6,4]); p.circle(Cpt.x,Cpt.y,r*2); p.drawingContext.setLineDash([])
    } else if (m==='ext') {
      p.fill(...C.vermelho(), 22); p.strokeWeight(0); p.rect(0,0,p.width,p.height)
      p.fill(...bg()); p.circle(Cpt.x,Cpt.y,r*2)
      p.noFill(); p.stroke(...C.vermelho()); p.strokeWeight(1.5)
      p.drawingContext.setLineDash([6,4]); p.circle(Cpt.x,Cpt.y,r*2); p.drawingContext.setLineDash([])
    } else { // tang
      p.noFill(); p.stroke(...C.azul()); p.strokeWeight(2); p.circle(Cpt.x,Cpt.y,r*2)
      const ang = Math.atan2(R.y-Cpt.y, R.x-Cpt.x)
      const tx=-Math.sin(ang), ty=Math.cos(ang), L=130
      p.stroke(...C.laranja()); p.strokeWeight(2)
      p.line(R.x-tx*L, R.y-ty*L, R.x+tx*L, R.y+ty*L)
      p.stroke(...C.azul()); p.strokeWeight(1.5); p.line(Cpt.x,Cpt.y,R.x,R.y)
      const s=12, rx=Math.cos(ang)*s, ry=Math.sin(ang)*s
      const nx=-Math.sin(ang)*s, ny=Math.cos(ang)*s
      p.stroke(...C.grey()); p.strokeWeight(1)
      p.line(R.x+nx,R.y+ny, R.x+nx-rx,R.y+ny-ry)
      p.line(R.x+nx-rx,R.y+ny-ry, R.x-rx,R.y-ry)
    }

    p.stroke(...C.grey()); p.strokeWeight(1)
    p.drawingContext.setLineDash([4,3])
    p.line(Cpt.x,Cpt.y,R.x,R.y); p.drawingContext.setLineDash([])

    drawDot(p, Cpt.x, Cpt.y, dragC||p.dist(p.mouseX,p.mouseY,Cpt.x,Cpt.y)<14, C.azulHex())
    drawDot(p, R.x,   R.y,   dragR||p.dist(p.mouseX,p.mouseY,R.x,R.y)<14,     C.laranjaHex())
    p.fill(...C.azul());    p.noStroke(); p.textSize(13); p.text(`C(${Cx.toFixed(1)},${Cy.toFixed(1)})`, Cpt.x+6, Cpt.y-6)
    p.fill(...C.laranja()); p.textSize(14); p.text(`r=${Ru.toFixed(2)}`, Cpt.x+(R.x-Cpt.x)/2+4, Cpt.y+(R.y-Cpt.y)/2-4)

    const sign = m==='circ'?'=':m==='int'?'<':m==='ext'?'>':'='
    info.value = `(x − ${Cx.toFixed(1)})² + (y − ${Cy.toFixed(1)})² ${sign} ${(Ru**2).toFixed(2)} &nbsp;|&nbsp; r = ${Ru.toFixed(2)}`
  }

  p.mousePressed  = () => {
    if (p.dist(p.mouseX,p.mouseY,Cpt.x,Cpt.y)<14) dragC=true
    if (p.dist(p.mouseX,p.mouseY,R.x,R.y)<14)     dragR=true
  }
  p.mouseReleased = () => { dragC=false; dragR=false }
  p.mouseDragged  = () => {
    if (dragC) { Cpt.x=p.constrain(p.mouseX,5,p.width-5); Cpt.y=p.constrain(p.mouseY,5,p.height-5) }
    if (dragR) { R.x=p.constrain(p.mouseX,5,p.width-5);   R.y=p.constrain(p.mouseY,5,p.height-5)   }
  }
  p.windowResized = () => {
    const w = container.value?.clientWidth || 440
    p.resizeCanvas(w, Math.min(Math.round(w * 0.7), 320))
  }
})
</script>
