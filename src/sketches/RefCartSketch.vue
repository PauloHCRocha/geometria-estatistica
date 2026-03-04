<template>
  <div class="demo-container">
    <div class="demo-header">
      <span class="demo-badge">Demo</span>
      <span class="demo-title">Sistema de coordenadas — clica para colocar um ponto</span>
    </div>
    <div class="demo-canvas-wrapper" ref="container"></div>
    <div class="demo-info" v-html="info" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useP5 } from '../composables/useP5.js'
import { bg, C } from './sketchUtils.js'

const container = ref(null)
const info      = ref('Clica no plano para ver as coordenadas do ponto.')
const GU = 40

useP5(container, (p) => {
  let clickPt = null

  p.setup = () => {
    const w = container.value?.clientWidth || 440
    p.createCanvas(w, Math.min(Math.round(w * 0.67), 300))
  }

  p.draw = () => {
    p.background(...bg())
    const cx = p.width/2, cy = p.height/2

    // quadrant fills (subtle tint)
    p.noStroke()
    p.fill(...C.verde(),   15); p.rect(cx, 0, p.width-cx, cy)
    p.fill(...C.azul2(),   15); p.rect(0,  0, cx, cy)
    p.fill(...C.vermelho(),15); p.rect(0,  cy, cx, p.height-cy)
    p.fill(...C.laranja(), 15); p.rect(cx, cy, p.width-cx, p.height-cy)

    // grid
    p.stroke(...C.greyLight()); p.strokeWeight(0.5)
    for (let x=cx%GU; x<p.width;  x+=GU) p.line(x,0,x,p.height)
    for (let y=cy%GU; y<p.height; y+=GU) p.line(0,y,p.width,y)

    // axes
    p.stroke(...C.azul()); p.strokeWeight(1.5)
    p.line(0,cy,p.width,cy); p.line(cx,0,cx,p.height)

    // axis arrows
    p.fill(...C.azul()); p.noStroke()
    p.triangle(p.width-4,cy, p.width-12,cy-5, p.width-12,cy+5)
    p.triangle(cx,4, cx-5,12, cx+5,12)
    p.textSize(14); p.text('x', p.width-13, cy-8); p.text('y', cx+5, 13)

    // tick labels
    p.stroke(...C.azul()); p.strokeWeight(0.8); p.fill(...C.muted()); p.textSize(13)
    for (let i=-Math.ceil(cx/GU); i<=Math.ceil((p.width-cx)/GU); i++) {
      if (!i) continue
      const xp=cx+i*GU; p.stroke(...C.azul()); p.line(xp,cy-3,xp,cy+3)
      p.noStroke(); p.text(i, xp-4, cy+13)
    }
    for (let j=-Math.ceil(cy/GU); j<=Math.ceil((p.height-cy)/GU); j++) {
      if (!j) continue
      const yp=cy-j*GU; p.stroke(...C.azul()); p.line(cx-3,yp,cx+3,yp)
      p.noStroke(); p.text(j, cx+6, yp+4)
    }

    // quadrant labels
    p.noStroke(); p.textSize(13)
    p.fill(...C.verde(),   160); p.text('1.º', cx+8, 18)
    p.fill(...C.azul2(),   160); p.text('2.º', cx-28, 18)
    p.fill(...C.vermelho(),160); p.text('3.º', cx-28, p.height-8)
    p.fill(...C.laranja(), 160); p.text('4.º', cx+8, p.height-8)

    // clicked point
    if (clickPt) {
      p.fill(...C.laranja()); p.noStroke(); p.ellipse(clickPt.x, clickPt.y, 12,12)
      p.stroke(...C.laranja(), 100); p.strokeWeight(1)
      p.drawingContext.setLineDash([4,3])
      p.line(clickPt.x, clickPt.y, clickPt.x, cy)
      p.line(clickPt.x, clickPt.y, cx, clickPt.y)
      p.drawingContext.setLineDash([])
      const px=((clickPt.x-cx)/GU).toFixed(1), py=(-(clickPt.y-cy)/GU).toFixed(1)
      p.noStroke(); p.fill(...C.text()); p.textSize(13)
      p.text(`P(${px}, ${py})`, clickPt.x+6, clickPt.y-6)

      const quad=(parseFloat(px)>=0&&parseFloat(py)>=0)?'1.º':(parseFloat(px)<0&&parseFloat(py)>=0)?'2.º':(parseFloat(px)<0&&parseFloat(py)<0)?'3.º':'4.º'
      info.value = `Ponto P(${px}, ${py}) — ${quad} quadrante`
    }
  }

  p.mouseClicked = () => {
    if (p.mouseX>=0 && p.mouseX<=p.width && p.mouseY>=0 && p.mouseY<=p.height) {
      clickPt = { x: p.mouseX, y: p.mouseY }
    }
  }
  p.windowResized = () => {
    const w = container.value?.clientWidth || 440
    p.resizeCanvas(w, Math.min(Math.round(w * 0.67), 300))
  }
})
</script>
