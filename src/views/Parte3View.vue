<template>
  <div class="page-layout">
    <SideBar
      title="Parte III — Geometria no Espaço"
      :sections="sections"
      :active-section="activeSection"
      :drawer-open="drawerOpen"
      @close-drawer="$emit('close-drawer')"
    />

    <div class="page-content">
      <!-- ─────────────────────────────── 1. Referencial 3D ─── -->
      <section id="geo3-ref-cart" class="content-section">
        <h1>Parte III — Geometria Analítica no Espaço</h1>
        <h2>1. Referencial Cartesiano no Espaço</h2>

        <ContentBox tipo="def" titulo="Referencial Cartesiano no Espaço">
          <p>
            Um <strong>referencial cartesiano ortonormado</strong> no espaço é um quadruplo
            $(O, \vec{e}_1, \vec{e}_2, \vec{e}_3)$ onde $O$ é a origem e
            $\vec{e}_1 = (1,0,0)$, $\vec{e}_2 = (0,1,0)$, $\vec{e}_3 = (0,0,1)$
            são vetores unitários dois a dois ortogonais.
          </p>
          <p>
            Cada ponto $P$ do espaço corresponde de forma única a um triplo $(x, y, z) \in \mathbb{R}^3$,
            tal que $\overrightarrow{OP} = x\,\vec{e}_1 + y\,\vec{e}_2 + z\,\vec{e}_3$.
          </p>
        </ContentBox>

        <ContentBox tipo="def" titulo="Planos Coordenados e Octantes">
          <p>Os três eixos determinam três <strong>planos coordenados</strong>:</p>
          <ul>
            <li>Plano $xOy$: $z = 0$</li>
            <li>Plano $xOz$: $y = 0$</li>
            <li>Plano $yOz$: $x = 0$</li>
          </ul>
          <p>Os três planos coordenados dividem o espaço em <strong>8 octantes</strong>.</p>
        </ContentBox>

        <EspacoSketch />

        <ContentBox tipo="nota" titulo="Vetores em ℝ³">
          <p>
            Todas as propriedades dos vetores no plano (soma, produto escalar, norma)
            generalizam-se a $\mathbb{R}^3$ acrescentando uma terceira componente:
          </p>
          <ul>
            <li>$\vec{u} = (u_1, u_2, u_3)$, $\|\vec{u}\| = \sqrt{u_1^2 + u_2^2 + u_3^2}$</li>
            <li>$\vec{u} \cdot \vec{v} = u_1 v_1 + u_2 v_2 + u_3 v_3$</li>
          </ul>
        </ContentBox>

        <QuizSection
          quiz-id="quiz-geo3-ref"
          :questions="qGeo3Ref"
          @completed="(s,t,p) => { store.markSectionDone('geo3-ref-cart'); store.markQuizDone('quiz-geo3-ref', s, t, p) }"
        />
      </section>

      <!-- ─────────────────────────────── 2. Distância e Ponto Médio 3D ─── -->
      <section id="geo3-dist" class="content-section">
        <h2>2. Distância e Ponto Médio no Espaço</h2>

        <ContentBox tipo="def" titulo="Distância Euclidiana em ℝ³">
          <p>
            A distância entre $A = (x_A, y_A, z_A)$ e $B = (x_B, y_B, z_B)$ é:
            $$d(A,B) = \sqrt{(x_B-x_A)^2 + (y_B-y_A)^2 + (z_B-z_A)^2}$$
          </p>
        </ContentBox>

        <ContentBox tipo="def" titulo="Ponto Médio em ℝ³">
          <p>
            O ponto médio do segmento $[AB]$ é:
            $$M = \left(\frac{x_A+x_B}{2},\;\frac{y_A+y_B}{2},\;\frac{z_A+z_B}{2}\right)$$
          </p>
        </ContentBox>

        <ContentBox tipo="ex" titulo="Exemplo">
          <p>
            $A=(1,2,3)$, $B=(3,4,1)$.
            $d(A,B) = \sqrt{4+4+4} = 2\sqrt{3}$.
            $M = (2, 3, 2)$.
          </p>
        </ContentBox>

        <QuizSection
          quiz-id="quiz-geo3-dist"
          :questions="qGeo3Dist"
          @completed="(s,t,p) => { store.markSectionDone('geo3-dist'); store.markQuizDone('quiz-geo3-dist', s, t, p) }"
        />
      </section>

      <!-- ─────────────────────────────── 3. Retas no Espaço ─── -->
      <section id="geo3-retas" class="content-section">
        <h2>3. Retas no Espaço</h2>

        <ContentBox tipo="def" titulo="Equação Vetorial de uma Reta">
          <p>
            A reta que passa pelo ponto $P_0 = (x_0, y_0, z_0)$ com vetor diretor
            $\vec{d} = (d_1, d_2, d_3)$ tem <strong>equação vetorial</strong>:
            $$P = P_0 + t\,\vec{d}, \quad t \in \mathbb{R}$$
          </p>
        </ContentBox>

        <ContentBox tipo="def" titulo="Equações Paramétricas e Cartesianas">
          <p><strong>Paramétrica:</strong></p>
          <p>$$\begin{cases} x = x_0 + t\,d_1 \\ y = y_0 + t\,d_2 \\ z = z_0 + t\,d_3 \end{cases}$$</p>
          <p><strong>Cartesiana (simétrica)</strong>, se $d_1, d_2, d_3 \neq 0$:</p>
          <p>$$\frac{x - x_0}{d_1} = \frac{y - y_0}{d_2} = \frac{z - z_0}{d_3}$$</p>
        </ContentBox>

        <ContentBox tipo="nota" titulo="Casos especiais">
          <p>
            Se $d_i = 0$, a variável correspondente é constante ($x = x_0$, etc.) e
            a forma cartesiana não inclui essa fração.
          </p>
        </ContentBox>

        <ContentBox tipo="ex" titulo="Exemplo">
          <p>
            Reta por $A=(1,2,3)$ com vetor diretor $\vec{d}=(2,-1,1)$:
            $$\begin{cases}x=1+2t\\y=2-t\\z=3+t\end{cases} \quad\Leftrightarrow\quad
            \frac{x-1}{2}=\frac{y-2}{-1}=\frac{z-3}{1}$$
          </p>
        </ContentBox>

        <QuizSection
          quiz-id="quiz-geo3-retas"
          :questions="qGeo3Retas"
          @completed="(s,t,p) => { store.markSectionDone('geo3-retas'); store.markQuizDone('quiz-geo3-retas', s, t, p) }"
        />
      </section>

      <!-- ─────────────────────────────── 4. Planos no Espaço ─── -->
      <section id="geo3-planos" class="content-section">
        <h2>4. Planos no Espaço</h2>

        <ContentBox tipo="def" titulo="Equação Geral do Plano">
          <p>
            Um plano com <strong>vetor normal</strong> $\vec{n} = (a, b, c)$ que passa pelo
            ponto $P_0 = (x_0, y_0, z_0)$ tem equação:
            $$a(x - x_0) + b(y - y_0) + c(z - z_0) = 0$$
            ou na forma geral: $ax + by + cz + d = 0$, com $d = -(ax_0 + by_0 + cz_0)$.
          </p>
        </ContentBox>

        <ContentBox tipo="prop" titulo="Distância de um Ponto a um Plano">
          <p>
            A distância do ponto $Q = (x_0, y_0, z_0)$ ao plano $ax+by+cz+d=0$ é:
            $$d(Q, \pi) = \frac{|ax_0 + by_0 + cz_0 + d|}{\sqrt{a^2+b^2+c^2}}$$
          </p>
        </ContentBox>

        <ContentBox tipo="ex" titulo="Exemplo">
          <p>
            Plano por $P=(1,0,2)$ com $\vec{n}=(3,-1,2)$:
            $3(x-1) - 1(y-0) + 2(z-2) = 0 \Rightarrow 3x - y + 2z - 7 = 0$.
          </p>
          <p>
            Distância de $Q=(0,0,0)$ a este plano:
            $d = \frac{|0 - 0 + 0 - 7|}{\sqrt{9+1+4}} = \frac{7}{\sqrt{14}} = \frac{7\sqrt{14}}{14} = \frac{\sqrt{14}}{2}$.
          </p>
        </ContentBox>

        <QuizSection
          quiz-id="quiz-geo3-planos"
          :questions="qGeo3Planos"
          @completed="(s,t,p) => { store.markSectionDone('geo3-planos'); store.markQuizDone('quiz-geo3-planos', s, t, p) }"
        />
      </section>

      <!-- ─────────────────────────────── 5. Posições Relativas ─── -->
      <section id="geo3-relativas" class="content-section">
        <h2>5. Posições Relativas no Espaço</h2>

        <ContentBox tipo="prop" titulo="Dois Planos">
          <ul>
            <li><strong>Paralelos</strong>: $\vec{n}_1 \parallel \vec{n}_2$ e não coincidem.</li>
            <li><strong>Coincidentes</strong>: $\vec{n}_1 \parallel \vec{n}_2$ e coincidem.</li>
            <li><strong>Secantes</strong>: $\vec{n}_1 \not\parallel \vec{n}_2$ — interseção é uma reta.</li>
            <li><strong>Perpendiculares</strong>: $\vec{n}_1 \cdot \vec{n}_2 = 0$.</li>
          </ul>
        </ContentBox>

        <ContentBox tipo="prop" titulo="Reta e Plano">
          <ul>
            <li><strong>Reta contida no plano</strong>: $\vec{d} \perp \vec{n}$ e $P_0$ pertence ao plano.</li>
            <li><strong>Reta paralela ao plano</strong>: $\vec{d} \perp \vec{n}$ e $P_0$ não pertence ao plano.</li>
            <li><strong>Reta secante ao plano</strong>: $\vec{d} \cdot \vec{n} \neq 0$.</li>
            <li><strong>Reta perpendicular ao plano</strong>: $\vec{d} \parallel \vec{n}$.</li>
          </ul>
        </ContentBox>

        <ContentBox tipo="prop" titulo="Duas Retas no Espaço">
          <ul>
            <li><strong>Paralelas</strong>: $\vec{d}_1 \parallel \vec{d}_2$ e não coincidem.</li>
            <li><strong>Coincidentes</strong>: mesma direção e ponto em comum.</li>
            <li><strong>Concorrentes</strong>: não paralelas, têm um ponto em comum.</li>
            <li><strong>Reversas (ou cruzadas)</strong>: não paralelas, sem ponto em comum — apenas existem no espaço.</li>
          </ul>
        </ContentBox>

        <ContentBox tipo="nota" titulo="Três Planos">
          <p>
            Três planos podem ter: nenhum ponto em comum, uma reta em comum, um único ponto,
            uma reta em comum dois a dois, ou um plano em comum (coincidentes).
            Analisa-se resolvendo o sistema $3 \times 3$.
          </p>
        </ContentBox>

        <QuizSection
          quiz-id="quiz-geo3-relativas"
          :questions="qGeo3Relativas"
          @completed="(s,t,p) => { store.markSectionDone('geo3-relativas'); store.markQuizDone('quiz-geo3-relativas', s, t, p) }"
        />
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useProgressStore } from '../stores/progress.js'
import { useMathJax } from '../composables/useMathJax.js'
import SideBar     from '../components/SideBar.vue'
import ContentBox  from '../components/ContentBox.vue'
import QuizSection from '../components/QuizSection.vue'
import EspacoSketch from '../sketches/EspacoSketch.vue'

defineProps({ drawerOpen: Boolean })
defineEmits(['close-drawer'])

const store = useProgressStore()
useMathJax()

const sections = [
  { id: 'geo3-ref-cart',  label: '1. Referencial 3D' },
  { id: 'geo3-dist',      label: '2. Distância e Ponto Médio' },
  { id: 'geo3-retas',     label: '3. Retas no Espaço' },
  { id: 'geo3-planos',    label: '4. Planos no Espaço' },
  { id: 'geo3-relativas', label: '5. Posições Relativas' },
]

const activeSection = ref('geo3-ref-cart')

let observer = null
onMounted(() => {
  const els = sections.map(s => document.getElementById(s.id)).filter(Boolean)
  observer = new IntersectionObserver(
    entries => {
      const vis = entries.filter(e => e.isIntersecting)
      if (vis.length) {
        const top = vis.reduce((a, b) => a.boundingClientRect.top < b.boundingClientRect.top ? a : b)
        activeSection.value = top.target.id
      }
    },
    { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
  )
  els.forEach(el => observer.observe(el))
})
onUnmounted(() => observer?.disconnect())

// ── Quiz data ──────────────────────────────────────────────────────────────

const qGeo3Ref = [
  {
    text: 'O ponto $P=(2,-1,3)$ tem coordenada $z$ igual a:',
    options: ['$3$', '$2$', '$-1$', '$0$'],
    correct: 0,
    feedbackCorrect: 'Correto! A terceira componente é $z=3$.',
    feedbackWrong: 'A convenção é $(x, y, z)$, logo a terceira coordenada é $z=3$.',
  },
  {
    text: 'A norma de $\\vec{u}=(1,2,2)$ é:',
    options: ['$3$', '$5$', '$\\sqrt{5}$', '$9$'],
    correct: 0,
    feedbackCorrect: 'Correto! $\\sqrt{1+4+4}=\\sqrt{9}=3$.',
    feedbackWrong: '$\\|\\vec{u}\\|=\\sqrt{1^2+2^2+2^2}=\\sqrt{9}=3$.',
  },
  {
    text: 'Qual plano coordenado tem equação $z=0$?',
    options: ['Plano $xOy$', 'Plano $xOz$', 'Plano $yOz$', 'Nenhum dos anteriores'],
    correct: 0,
    feedbackCorrect: 'Correto! O plano $xOy$ é definido por $z=0$.',
    feedbackWrong: 'O plano $xOy$ contém todos os pontos com $z=0$.',
  },
]

const qGeo3Dist = [
  {
    text: 'A distância entre $A=(0,0,0)$ e $B=(1,2,2)$ é:',
    options: ['$3$', '$5$', '$\\sqrt{5}$', '$6$'],
    correct: 0,
    feedbackCorrect: 'Correto! $d=\\sqrt{1+4+4}=\\sqrt{9}=3$.',
    feedbackWrong: '$d=\\sqrt{1^2+2^2+2^2}=3$.',
  },
  {
    text: 'O ponto médio de $A=(2,4,0)$ e $B=(6,0,4)$ é:',
    options: ['$(4,2,2)$', '$(4,4,4)$', '$(3,2,1)$', '$(8,4,4)$'],
    correct: 0,
    feedbackCorrect: 'Correto! $M=\\left(\\frac{2+6}{2},\\frac{4+0}{2},\\frac{0+4}{2}\\right)=(4,2,2)$.',
    feedbackWrong: '$M=\\left(\\frac{2+6}{2},\\frac{4+0}{2},\\frac{0+4}{2}\\right)=(4,2,2)$.',
  },
  {
    text: '$\\overrightarrow{AB}$ com $A=(1,1,1)$ e $B=(3,0,4)$ é:',
    options: ['$(2,-1,3)$', '$(4,1,5)$', '$(-2,1,-3)$', '$(2,1,3)$'],
    correct: 0,
    feedbackCorrect: 'Correto! $B-A=(3-1, 0-1, 4-1)=(2,-1,3)$.',
    feedbackWrong: '$\\overrightarrow{AB}=B-A=(2,-1,3)$.',
  },
]

const qGeo3Retas = [
  {
    text: 'O vetor diretor da reta $\\frac{x-1}{2}=\\frac{y+3}{-1}=\\frac{z}{4}$ é:',
    options: ['$(2,-1,4)$', '$(1,-3,0)$', '$(-1,2,-4)$', '$(2,1,4)$'],
    correct: 0,
    feedbackCorrect: 'Correto! Os denominadores dão o vetor diretor $(2,-1,4)$.',
    feedbackWrong: 'Na forma $\\frac{x-x_0}{d_1}=\\frac{y-y_0}{d_2}=\\frac{z-z_0}{d_3}$, o vetor diretor é $(d_1,d_2,d_3)=(2,-1,4)$.',
  },
  {
    text: 'A reta paramétrica $x=1+t,\\ y=2,\\ z=3-2t$ tem vetor diretor:',
    options: ['$(1,0,-2)$', '$(1,2,-2)$', '$(t,0,-2t)$', '$(1,2,3)$'],
    correct: 0,
    feedbackCorrect: 'Correto! Os coeficientes de $t$ são $(1, 0, -2)$.',
    feedbackWrong: 'O vetor diretor são os coeficientes de $t$: $(1, 0, -2)$.',
  },
  {
    text: 'A reta por $A=(0,0,0)$ e $B=(1,1,1)$ tem vetor diretor:',
    options: ['$(1,1,1)$', '$(0,0,0)$', '$(2,2,2)$', 'Qualquer múltiplo de $(1,1,1)$'],
    correct: 3,
    feedbackCorrect: 'Correto! O vetor diretor é $\\overrightarrow{AB}=(1,1,1)$ e qualquer múltiplo não nulo também serve.',
    feedbackWrong: '$\\overrightarrow{AB}=(1,1,1)$ e qualquer múltiplo não nulo como $(2,2,2)$ também é válido.',
  },
]

const qGeo3Planos = [
  {
    text: 'O vetor normal ao plano $2x-3y+z=5$ é:',
    options: ['$(2,-3,1)$', '$(2,3,1)$', '$(-2,3,-1)$', '$(5,0,0)$'],
    correct: 0,
    feedbackCorrect: 'Correto! Os coeficientes de $x$, $y$, $z$ dão o vetor normal.',
    feedbackWrong: 'Na forma $ax+by+cz=d$, o vetor normal é $(a,b,c)=(2,-3,1)$.',
  },
  {
    text: 'A distância de $Q=(0,0,0)$ ao plano $x+y+z=3$ é:',
    options: ['$\\sqrt{3}$', '$3$', '$\\frac{3}{\\sqrt{3}}=\\sqrt{3}$', '$1$'],
    correct: 0,
    feedbackCorrect: 'Correto! $d=\\frac{|0+0+0-3|}{\\sqrt{1+1+1}}=\\frac{3}{\\sqrt{3}}=\\sqrt{3}$.',
    feedbackWrong: '$d=\\frac{|ax_0+by_0+cz_0+d|}{\\sqrt{a^2+b^2+c^2}}=\\frac{3}{\\sqrt{3}}=\\sqrt{3}$.',
  },
  {
    text: 'Qual dos seguintes é o plano $xOz$ (i.e., $y=0$)?',
    options: ['$y=0$', '$x=0$', '$z=0$', '$x+z=0$'],
    correct: 0,
    feedbackCorrect: 'Correto! O plano $xOz$ contém todos os pontos com $y=0$.',
    feedbackWrong: 'O plano $xOz$ é o conjunto de pontos com $y=0$.',
  },
]

const qGeo3Relativas = [
  {
    text: 'Duas retas no espaço que não se intersectam e não são paralelas chamam-se:',
    options: ['Reversas (cruzadas)', 'Concorrentes', 'Coincidentes', 'Ortogonais'],
    correct: 0,
    feedbackCorrect: 'Correto! Retas reversas (ou cruzadas) não se intersectam e não são paralelas.',
    feedbackWrong: 'A situação exclusiva do espaço 3D: retas que não se intersectam e não são paralelas chamam-se reversas.',
  },
  {
    text: 'O plano $2x+y-z=1$ e o plano $4x+2y-2z=3$ são:',
    options: ['Paralelos', 'Perpendiculares', 'Secantes', 'Coincidentes'],
    correct: 0,
    feedbackCorrect: 'Correto! $\\vec{n}_2=(4,2,-2)=2(2,1,-1)=2\\vec{n}_1$, logo são paralelos (e não coincidem pois $1/2\\neq3/4$).',
    feedbackWrong: '$\\vec{n}_2=2\\vec{n}_1$, logo os normais são paralelos → planos paralelos.',
  },
  {
    text: 'Dois planos $\\pi_1$ e $\\pi_2$ são perpendiculares se e só se:',
    options: [
      '$\\vec{n}_1 \\cdot \\vec{n}_2 = 0$',
      '$\\vec{n}_1 = \\vec{n}_2$',
      '$\\vec{n}_1 \\times \\vec{n}_2 = 0$',
      '$\\vec{n}_1 + \\vec{n}_2 = 0$',
    ],
    correct: 0,
    feedbackCorrect: 'Correto! Planos perpendiculares $\\Leftrightarrow$ normais ortogonais $\\Leftrightarrow$ $\\vec{n}_1\\cdot\\vec{n}_2=0$.',
    feedbackWrong: 'A perpendicularidade de planos equivale à ortogonalidade dos vetores normais: $\\vec{n}_1\\cdot\\vec{n}_2=0$.',
  },
]
</script>
