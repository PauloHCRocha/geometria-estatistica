/** Shared p5 drawing utilities — with dark-mode support */

// ── Theme helpers ────────────────────────────────────────────────
export const isDark = () =>
  document.documentElement.getAttribute('data-theme') === 'dark'

/** Canvas background colour [r, g, b] */
export const bg = () => isDark() ? [26, 27, 46] : [250, 251, 252]

/**
 * Theme-aware accent colours.
 * Light values: designed for white bg.
 * Dark values:  bright enough to read on dark canvas.
 */
export const C = {
  azul:        () => isDark() ? [91, 176, 255]  : [0,   70,  127],
  verde:       () => isDark() ? [77, 214, 138]  : [0,   110,  60],
  laranja:     () => isDark() ? [255, 145,  70]  : [210,  90,  20],
  vermelho:    () => isDark() ? [255, 100, 100]  : [160,  30,  30],
  azul2:       () => isDark() ? [70,  160, 255]  : [20,   80, 160],
  roxo:        () => isDark() ? [190, 110, 255]  : [110,   0, 130],
  amarelo:     () => isDark() ? [255, 210,  50]  : [200, 150,   0],
  text:        () => isDark() ? [200, 215, 235]  : [50,   50,  60],
  muted:       () => isDark() ? [130, 145, 175]  : [110, 110, 120],
  textLight:   () => isDark() ? [160, 175, 200]  : [120, 120, 130],
  grey:        () => isDark() ? [100, 112, 155]  : [185, 185, 185],
  greyLight:   () => isDark() ? [65,  70, 110]   : [215, 215, 215],
  // Hex versions for drawDot (which accepts a CSS colour string)
  azulHex:     () => isDark() ? '#5BB0FF' : '#00467F',
  verdeHex:    () => isDark() ? '#4DD68A' : '#006E3C',
  laranjaHex:  () => isDark() ? '#FF9146' : '#D25A14',
  vermelhoHex: () => isDark() ? '#FF6464' : '#A01E1E',
}

// ── Drawing utilities ────────────────────────────────────────────

/** Coordinate grid centred at (cx, cy). Respects dark mode. */
export function drawGrid(p, cx, cy) {
  const dark = isDark()
  // minor grid lines
  p.stroke(...(dark ? [55, 60, 92] : [215, 215, 215]))
  p.strokeWeight(0.5)
  for (let x = cx % GU; x < p.width;  x += GU) p.line(x, 0, x, p.height)
  for (let y = cy % GU; y < p.height; y += GU) p.line(0, y, p.width, y)
  // axes
  p.stroke(...(dark ? [80, 90, 140] : [160, 160, 165]))
  p.strokeWeight(1.2)
  p.line(0, cy, p.width, cy)
  p.line(cx, 0, cx, p.height)
}

/** Arrow with filled arrowhead. */
export function drawArrow(p, x1, y1, x2, y2, headLen = 10) {
  p.line(x1, y1, x2, y2)
  const angle = Math.atan2(y2 - y1, x2 - x1)
  p.push()
  p.translate(x2, y2)
  p.rotate(angle)
  p.noStroke()
  p.triangle(0, 0, -headLen, -headLen / 2.2, -headLen, headLen / 2.2)
  p.pop()
}

/** Draggable dot. col is a CSS colour hex string (use C.azulHex() etc.). */
export function drawDot(p, x, y, hover, col) {
  const c = p.color(col)
  p.fill(hover ? p.lerpColor(c, p.color(C.laranjaHex()), 0.4) : c)
  p.noStroke()
  p.ellipse(x, y, hover ? 14 : 10, hover ? 14 : 10)
}

export const GU = 40  // grid unit (pixels per unit)
