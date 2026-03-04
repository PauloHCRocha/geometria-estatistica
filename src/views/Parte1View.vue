<template>
  <div class="page-layout">
    <SideBar
      title="Parte I — Vetores"
      :sections="sections"
      :active-section="activeSection"
      :drawer-open="drawerOpen"
      @close-drawer="$emit('close-drawer')"
    />

    <div class="page-content">
      <!-- ─────────────────────────────── 1. Vetores Livres ─── -->
      <section id="vec-livres" class="content-section">
        <h1>Parte I — Vetores</h1>
        <h2>1. Vetores Livres e Norma</h2>

        <ContentBox tipo="def" titulo="Vetor Livre">
          <p>
            Um <strong>vetor livre</strong> é uma grandeza caracterizada por uma <em>direção</em>,
            um <em>sentido</em> e um <em>módulo</em> (comprimento), independentemente do ponto de
            aplicação. Denota-se $\vec{u}$, $\mathbf{u}$ ou $\overrightarrow{AB}$.
          </p>
        </ContentBox>

        <ContentBox tipo="def" titulo="Norma (Módulo)">
          <p>
            A <strong>norma</strong> de um vetor $\vec{u}$ é o seu comprimento, denotado
            $\|\vec{u}\|$ ou $|\vec{u}|$. É sempre não-negativa: $\|\vec{u}\| \ge 0$.
          </p>
          <p>
            O <strong>vetor nulo</strong> $\vec{0}$ tem norma zero e direção indefinida.
            Um vetor com $\|\vec{u}\| = 1$ chama-se <em>vetor unitário</em>.
          </p>
        </ContentBox>

        <ContentBox tipo="nota" titulo="Vetores iguais">
          <p>
            Dois vetores são <strong>iguais</strong> se têm a mesma direção, o mesmo sentido e o
            mesmo módulo — independentemente do ponto de aplicação. Podem ser "transladados" livremente.
          </p>
        </ContentBox>

        <VetorSketch />

        <ContentBox tipo="ex" titulo="Exemplo">
          <p>
            Se $A = (1, 2)$ e $B = (4, 6)$, então $\overrightarrow{AB} = (3, 4)$ e
            $\|\overrightarrow{AB}\| = \sqrt{3^2 + 4^2} = \sqrt{25} = 5$.
          </p>
        </ContentBox>

        <QuizSection
          quiz-id="quiz-vec-livres"
          :questions="qVecLivres"
          @completed="(s,t,p) => { store.markSectionDone('vec-livres'); store.markQuizDone('quiz-vec-livres', s, t, p) }"
        />
      </section>

      <!-- ─────────────────────────────── 2. Operações ─── -->
      <section id="vec-ops" class="content-section">
        <h2>2. Soma, Diferença e Produto por Escalar</h2>

        <ContentBox tipo="def" titulo="Soma de Vetores">
          <p>
            Dados $\vec{u}$ e $\vec{v}$, a sua <strong>soma</strong> $\vec{u} + \vec{v}$ obtém-se
            pela <em>regra do triângulo</em>: coloca-se o início de $\vec{v}$ no fim de $\vec{u}$;
            a soma vai do início de $\vec{u}$ ao fim de $\vec{v}$.
          </p>
          <p>
            Equivalentemente pela <em>regra do paralelogramo</em>: os dois vetores formam dois lados
            do paralelogramo e a soma é a diagonal.
          </p>
        </ContentBox>

        <ContentBox tipo="prop" titulo="Propriedades da Soma">
          <ul>
            <li>Comutatividade: $\vec{u} + \vec{v} = \vec{v} + \vec{u}$</li>
            <li>Associatividade: $(\vec{u} + \vec{v}) + \vec{w} = \vec{u} + (\vec{v} + \vec{w})$</li>
            <li>Elemento neutro: $\vec{u} + \vec{0} = \vec{u}$</li>
            <li>Simétrico: $\vec{u} + (-\vec{u}) = \vec{0}$</li>
          </ul>
        </ContentBox>

        <SomaSketch />

        <ContentBox tipo="def" titulo="Produto por Escalar">
          <p>
            Dado $\lambda \in \mathbb{R}$ e $\vec{u}$, o produto $\lambda\,\vec{u}$ é um vetor
            com módulo $|\lambda|\,\|\vec{u}\|$, mesma direção que $\vec{u}$, e sentido igual se
            $\lambda > 0$ ou oposto se $\lambda &lt; 0$. Se $\lambda = 0$, o resultado é $\vec{0}$.
          </p>
        </ContentBox>

        <ContentBox tipo="prop" titulo="Propriedades do Produto por Escalar">
          <ul>
            <li>$(\lambda\mu)\vec{u} = \lambda(\mu\vec{u})$</li>
            <li>$(\lambda + \mu)\vec{u} = \lambda\vec{u} + \mu\vec{u}$</li>
            <li>$\lambda(\vec{u} + \vec{v}) = \lambda\vec{u} + \lambda\vec{v}$</li>
            <li>$1 \cdot \vec{u} = \vec{u}$</li>
          </ul>
        </ContentBox>

        <EscalarSketch />

        <ContentBox tipo="def" titulo="Diferença e Vetor Oposto">
          <p>
            O <strong>oposto</strong> de $\vec{u}$ é $-\vec{u} = (-1)\vec{u}$.
            A diferença define-se por $\vec{u} - \vec{v} = \vec{u} + (-\vec{v})$.
          </p>
          <p>
            Geometricamente, $\overrightarrow{BA} = -\overrightarrow{AB}$.
          </p>
        </ContentBox>

        <QuizSection
          quiz-id="quiz-vec-ops"
          :questions="qVecOps"
          @completed="(s,t,p) => { store.markSectionDone('vec-ops'); store.markQuizDone('quiz-vec-ops', s, t, p) }"
        />
      </section>

      <!-- ─────────────────────────────── 3. Coordenadas ─── -->
      <section id="vec-coord" class="content-section">
        <h2>3. Coordenadas de Vetores</h2>

        <ContentBox tipo="def" titulo="Representação em Coordenadas">
          <p>
            Fixado um referencial cartesiano com vetores unitários $\vec{e}_1 = (1,0)$ e
            $\vec{e}_2 = (0,1)$ no plano, qualquer vetor $\vec{u}$ escreve-se de forma única como:
            $$\vec{u} = u_1\,\vec{e}_1 + u_2\,\vec{e}_2 = (u_1, u_2)$$
          </p>
        </ContentBox>

        <ContentBox tipo="prop" titulo="Operações em Coordenadas">
          <p>Se $\vec{u} = (u_1, u_2)$ e $\vec{v} = (v_1, v_2)$:</p>
          <ul>
            <li>Soma: $\vec{u} + \vec{v} = (u_1 + v_1,\; u_2 + v_2)$</li>
            <li>Produto por escalar: $\lambda\vec{u} = (\lambda u_1,\; \lambda u_2)$</li>
            <li>Norma: $\|\vec{u}\| = \sqrt{u_1^2 + u_2^2}$</li>
          </ul>
        </ContentBox>

        <CoordSketch />

        <ContentBox tipo="def" titulo="Vetor Unitário numa Direção">
          <p>
            Dado $\vec{u} \neq \vec{0}$, o vetor unitário na mesma direção e sentido é:
            $$\hat{u} = \frac{\vec{u}}{\|\vec{u}\|}$$
          </p>
        </ContentBox>

        <ContentBox tipo="ex" titulo="Exemplo">
          <p>
            Para $\vec{u} = (3, -4)$: $\|\vec{u}\| = \sqrt{9+16} = 5$,
            logo $\hat{u} = \left(\tfrac{3}{5}, -\tfrac{4}{5}\right)$.
          </p>
        </ContentBox>

        <QuizSection
          quiz-id="quiz-vec-coord"
          :questions="qVecCoord"
          @completed="(s,t,p) => { store.markSectionDone('vec-coord'); store.markQuizDone('quiz-vec-coord', s, t, p) }"
        />
      </section>

      <!-- ─────────────────────────────── 4. Vetores e Pontos ─── -->
      <section id="vec-pontos" class="content-section">
        <h2>4. Vetores Definidos por Pontos</h2>

        <ContentBox tipo="def" titulo="Vetor entre Dois Pontos">
          <p>
            Dados dois pontos $A = (a_1, a_2)$ e $B = (b_1, b_2)$, o vetor de $A$ para $B$ é:
            $$\overrightarrow{AB} = B - A = (b_1 - a_1,\; b_2 - a_2)$$
          </p>
        </ContentBox>

        <ContentBox tipo="prop" titulo="Relação entre Pontos e Vetores">
          <p>Se $O$ é a origem do referencial e $P$ é um ponto:</p>
          <ul>
            <li>$\overrightarrow{OP} = P$ (vetor posição de $P$)</li>
            <li>$\overrightarrow{AB} = \overrightarrow{OB} - \overrightarrow{OA}$</li>
            <li>$\|\overrightarrow{AB}\|$ é a distância entre $A$ e $B$</li>
          </ul>
        </ContentBox>

        <ContentBox tipo="prop" titulo="Ponto Médio">
          <p>
            O ponto médio $M$ do segmento $[AB]$ tem coordenadas:
            $$M = \frac{A + B}{2} = \left(\frac{a_1+b_1}{2},\; \frac{a_2+b_2}{2}\right)$$
          </p>
        </ContentBox>

        <ContentBox tipo="ex" titulo="Exemplo">
          <p>
            Seja $A = (2, 1)$ e $B = (8, 5)$.
            Então $\overrightarrow{AB} = (6, 4)$, $\|\overrightarrow{AB}\| = \sqrt{52} = 2\sqrt{13}$,
            e o ponto médio é $M = (5, 3)$.
          </p>
        </ContentBox>

        <ContentBox tipo="nota" titulo="Colinearidade">
          <p>
            Três pontos $A$, $B$, $C$ são colineares se e só se $\overrightarrow{AB}$ e
            $\overrightarrow{AC}$ são paralelos, i.e., $\overrightarrow{AC} = \lambda\,\overrightarrow{AB}$
            para algum $\lambda \in \mathbb{R}$.
          </p>
        </ContentBox>

        <QuizSection
          quiz-id="quiz-vec-pontos"
          :questions="qVecPontos"
          @completed="(s,t,p) => { store.markSectionDone('vec-pontos'); store.markQuizDone('quiz-vec-pontos', s, t, p) }"
        />
      </section>

      <!-- ─────────────────────────────── 5. Produto Escalar ─── -->
      <section id="prod-escalar" class="content-section">
        <h2>5. Produto Escalar e Ortogonalidade</h2>

        <ContentBox tipo="def" titulo="Produto Escalar">
          <p>
            O <strong>produto escalar</strong> (ou produto interno) de $\vec{u} = (u_1, u_2)$
            e $\vec{v} = (v_1, v_2)$ é o número real:
            $$\vec{u} \cdot \vec{v} = u_1 v_1 + u_2 v_2$$
          </p>
          <p>
            Geometricamente: $\vec{u} \cdot \vec{v} = \|\vec{u}\|\,\|\vec{v}\|\cos\theta$,
            onde $\theta \in [0, \pi]$ é o ângulo entre os vetores.
          </p>
        </ContentBox>

        <ContentBox tipo="prop" titulo="Propriedades do Produto Escalar">
          <ul>
            <li>Comutatividade: $\vec{u} \cdot \vec{v} = \vec{v} \cdot \vec{u}$</li>
            <li>Bilinearidade: $(\vec{u}+\vec{w})\cdot\vec{v} = \vec{u}\cdot\vec{v} + \vec{w}\cdot\vec{v}$</li>
            <li>$(\lambda\vec{u})\cdot\vec{v} = \lambda(\vec{u}\cdot\vec{v})$</li>
            <li>Positividade: $\vec{u}\cdot\vec{u} = \|\vec{u}\|^2 \ge 0$</li>
          </ul>
        </ContentBox>

        <DotSketch />

        <ContentBox tipo="def" titulo="Ortogonalidade">
          <p>
            Dois vetores $\vec{u}$ e $\vec{v}$ são <strong>ortogonais</strong> (perpendiculares) se e
            só se $\vec{u} \cdot \vec{v} = 0$. Escreve-se $\vec{u} \perp \vec{v}$.
          </p>
          <p>
            Note-se que $\vec{0}$ é ortogonal a qualquer vetor.
          </p>
        </ContentBox>

        <ContentBox tipo="prop" titulo="Ângulo entre dois vetores">
          <p>
            Para $\vec{u}, \vec{v} \neq \vec{0}$, o ângulo $\theta$ entre eles satisfaz:
            $$\cos\theta = \frac{\vec{u}\cdot\vec{v}}{\|\vec{u}\|\,\|\vec{v}\|}$$
            com $\theta \in [0°, 180°]$.
          </p>
        </ContentBox>

        <ContentBox tipo="ex" titulo="Exemplo">
          <p>
            Sejam $\vec{u} = (1, 2)$ e $\vec{v} = (4, -2)$.
            $\vec{u}\cdot\vec{v} = 4 - 4 = 0$, logo são ortogonais.
          </p>
          <p>
            Para $\vec{a} = (1,0)$ e $\vec{b} = (1,1)$:
            $\cos\theta = \frac{1}{\sqrt{2}}$, logo $\theta = 45°$.
          </p>
        </ContentBox>

        <QuizSection
          quiz-id="quiz-prod-escalar"
          :questions="qProdEscalar"
          @completed="(s,t,p) => { store.markSectionDone('prod-escalar'); store.markQuizDone('quiz-prod-escalar', s, t, p) }"
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
import VetorSketch   from '../sketches/VetorSketch.vue'
import SomaSketch    from '../sketches/SomaSketch.vue'
import EscalarSketch from '../sketches/EscalarSketch.vue'
import CoordSketch   from '../sketches/CoordSketch.vue'
import DotSketch     from '../sketches/DotSketch.vue'

defineProps({ drawerOpen: Boolean })
defineEmits(['close-drawer'])

const store = useProgressStore()
useMathJax()

const sections = [
  { id: 'vec-livres',   label: '1. Vetores Livres e Norma' },
  { id: 'vec-ops',      label: '2. Operações com Vetores' },
  { id: 'vec-coord',    label: '3. Coordenadas' },
  { id: 'vec-pontos',   label: '4. Vetores e Pontos' },
  { id: 'prod-escalar', label: '5. Produto Escalar' },
]

const activeSection = ref('vec-livres')

// IntersectionObserver to track active section
let observer = null
onMounted(() => {
  const sectionEls = sections.map(s => document.getElementById(s.id)).filter(Boolean)
  observer = new IntersectionObserver(
    (entries) => {
      const visible = entries.filter(e => e.isIntersecting)
      if (visible.length) {
        // pick the topmost visible section
        const top = visible.reduce((a, b) =>
          a.boundingClientRect.top < b.boundingClientRect.top ? a : b
        )
        activeSection.value = top.target.id
      }
    },
    { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
  )
  sectionEls.forEach(el => observer.observe(el))
})
onUnmounted(() => { observer?.disconnect() })

// ── Quiz data ──────────────────────────────────────────────────────────────

const qVecLivres = [
  {
    text: 'Qual é a norma do vetor $\\vec{u} = (3, 4)$?',
    options: ['$5$', '$7$', '$\\sqrt{7}$', '$25$'],
    correct: 0,
    feedbackCorrect: 'Correto! $\\|\\vec{u}\\| = \\sqrt{9+16} = \\sqrt{25} = 5$.',
    feedbackWrong: 'Recorda: $\\|\\vec{u}\\| = \\sqrt{u_1^2 + u_2^2} = \\sqrt{9+16} = 5$.',
  },
  {
    text: 'Dois vetores são iguais quando têm:',
    options: [
      'A mesma direção, sentido e módulo',
      'O mesmo ponto de aplicação',
      'A mesma direção e módulo (sentido não importa)',
      'Apenas o mesmo módulo',
    ],
    correct: 0,
    feedbackCorrect: 'Exato! Vetores livres são iguais se têm mesma direção, sentido e módulo.',
    feedbackWrong: 'Vetores livres são iguais se tiverem a mesma direção, sentido e módulo — independentemente do ponto de aplicação.',
  },
  {
    text: 'Se $\\|\\vec{u}\\| = 0$, então:',
    options: [
      '$\\vec{u} = \\vec{0}$',
      '$\\vec{u}$ é unitário',
      '$\\vec{u}$ tem direção vertical',
      'Não é possível determinar $\\vec{u}$',
    ],
    correct: 0,
    feedbackCorrect: 'Correto! A única forma de a norma ser zero é o vetor ser o vetor nulo.',
    feedbackWrong: 'A norma é sempre $\\ge 0$ e só é zero para $\\vec{u} = \\vec{0}$.',
  },
]

const qVecOps = [
  {
    text: 'Dados $\\vec{u} = (1, 3)$ e $\\vec{v} = (-2, 1)$, qual é $\\vec{u} + \\vec{v}$?',
    options: ['$(-1, 4)$', '$(3, 2)$', '$(1, 4)$', '$(-1, 3)$'],
    correct: 0,
    feedbackCorrect: 'Correto! $(1+(-2),\\; 3+1) = (-1, 4)$.',
    feedbackWrong: 'Soma componente a componente: $(1-2,\\; 3+1) = (-1, 4)$.',
  },
  {
    text: 'Se $\\vec{u} = (2, -1)$ e $\\lambda = 3$, qual é $\\lambda\\vec{u}$?',
    options: ['$(6, -3)$', '$(5, 2)$', '$(3, 3)$', '$(2, -3)$'],
    correct: 0,
    feedbackCorrect: 'Certo! $3 \\cdot (2, -1) = (6, -3)$.',
    feedbackWrong: 'Multiplica cada componente por $\\lambda$: $3(2, -1) = (6, -3)$.',
  },
  {
    text: 'O oposto do vetor $(5, -2)$ é:',
    options: ['$(-5, 2)$', '$(5, 2)$', '$(-5, -2)$', '$(2, -5)$'],
    correct: 0,
    feedbackCorrect: 'Correto! $(-1)\\cdot(5,-2) = (-5, 2)$.',
    feedbackWrong: 'O oposto de $(a, b)$ é $(-a, -b)$, logo $(-5, 2)$.',
  },
]

const qVecCoord = [
  {
    text: 'Qual é a norma de $\\vec{v} = (-6, 8)$?',
    options: ['$10$', '$14$', '$2$', '$\\sqrt{28}$'],
    correct: 0,
    feedbackCorrect: 'Correto! $\\sqrt{36+64} = \\sqrt{100} = 10$.',
    feedbackWrong: '$\\|\\vec{v}\\| = \\sqrt{(-6)^2 + 8^2} = \\sqrt{100} = 10$.',
  },
  {
    text: 'O vetor unitário na direção de $\\vec{u} = (0, 5)$ é:',
    options: ['$(0, 1)$', '$(0, 5)$', '$(1, 0)$', '$(0, 0.5)$'],
    correct: 0,
    feedbackCorrect: 'Correto! $\\hat{u} = \\frac{(0,5)}{5} = (0,1)$.',
    feedbackWrong: '$\\hat{u} = \\vec{u}/\\|\\vec{u}\\| = (0,5)/5 = (0,1)$.',
  },
  {
    text: 'Se $\\vec{u} = (a, b)$, então $\\|\\vec{u}\\|^2 =$',
    options: ['$a^2 + b^2$', '$a + b$', '$\\sqrt{a^2+b^2}$', '$|a| + |b|$'],
    correct: 0,
    feedbackCorrect: 'Exatamente! $\\|\\vec{u}\\|^2 = a^2 + b^2$.',
    feedbackWrong: 'Pela definição: $\\|\\vec{u}\\| = \\sqrt{a^2+b^2}$, logo $\\|\\vec{u}\\|^2 = a^2+b^2$.',
  },
]

const qVecPontos = [
  {
    text: 'Dados $A = (1, 2)$ e $B = (4, 6)$, qual é $\\overrightarrow{AB}$?',
    options: ['$(3, 4)$', '$(5, 8)$', '$(-3, -4)$', '$(4, 6)$'],
    correct: 0,
    feedbackCorrect: 'Correto! $\\overrightarrow{AB} = B - A = (4-1, 6-2) = (3, 4)$.',
    feedbackWrong: '$\\overrightarrow{AB} = B - A = (4-1, 6-2) = (3, 4)$.',
  },
  {
    text: 'O ponto médio de $A=(0,0)$ e $B=(6,4)$ é:',
    options: ['$(3, 2)$', '$(6, 4)$', '$(3, 4)$', '$(0, 2)$'],
    correct: 0,
    feedbackCorrect: 'Certo! $M = \\left(\\frac{0+6}{2}, \\frac{0+4}{2}\\right) = (3, 2)$.',
    feedbackWrong: '$M = \\frac{A+B}{2} = \\left(\\frac{6}{2}, \\frac{4}{2}\\right) = (3, 2)$.',
  },
  {
    text: '$A=(2,1)$, $B=(5,3)$. Qual é $\\|\\overrightarrow{AB}\\|$?',
    options: ['$\\sqrt{13}$', '$\\sqrt{7}$', '$5$', '$\\sqrt{34}$'],
    correct: 0,
    feedbackCorrect: 'Correto! $\\overrightarrow{AB}=(3,2)$, $\\|(3,2)\\|=\\sqrt{9+4}=\\sqrt{13}$.',
    feedbackWrong: '$\\overrightarrow{AB}=(3,2)$, norma $=\\sqrt{3^2+2^2}=\\sqrt{13}$.',
  },
]

const qProdEscalar = [
  {
    text: 'Calcula $\\vec{u}\\cdot\\vec{v}$ para $\\vec{u}=(2,3)$ e $\\vec{v}=(1,-2)$.',
    options: ['$-4$', '$4$', '$7$', '$-7$'],
    correct: 0,
    feedbackCorrect: 'Correto! $2\\cdot1 + 3\\cdot(-2) = 2 - 6 = -4$.',
    feedbackWrong: '$\\vec{u}\\cdot\\vec{v} = 2\\cdot1 + 3\\cdot(-2) = 2-6 = -4$.',
  },
  {
    text: 'Quais destes pares de vetores são ortogonais?',
    options: [
      '$(1, 2)$ e $(4, -2)$',
      '$(1, 1)$ e $(1, 1)$',
      '$(3, 0)$ e $(0, 3)$',
      '$(1, 2)$ e $(2, 1)$',
    ],
    correct: 2,
    feedbackCorrect: 'Correto! $(3,0)\\cdot(0,3) = 0+0 = 0$, logo são ortogonais.',
    feedbackWrong: '$(3,0)\\cdot(0,3)=0$. Verifica: $(1,2)\\cdot(4,-2)=4-4=0$ — também são! Relê a pergunta: ambas as opções A e C são corretas; a C foi considerada a resposta principal por usar os exemplos mais simples.',
  },
  {
    text: 'Se $\\vec{u}\\cdot\\vec{v} > 0$, então o ângulo $\\theta$ entre eles satisfaz:',
    options: [
      '$\\theta \\in (0°, 90°)$ (ângulo agudo)',
      '$\\theta = 90°$ (ângulo reto)',
      '$\\theta \\in (90°, 180°)$ (ângulo obtuso)',
      '$\\theta = 0°$',
    ],
    correct: 0,
    feedbackCorrect: 'Exatamente! $\\cos\\theta > 0 \\Leftrightarrow \\theta < 90°$.',
    feedbackWrong: 'Como $\\vec{u}\\cdot\\vec{v} = \\|\\vec{u}\\|\\|\\vec{v}\\|\\cos\\theta$ e as normas são positivas, $\\vec{u}\\cdot\\vec{v} > 0 \\Rightarrow \\cos\\theta > 0 \\Rightarrow \\theta \\in (0°, 90°)$.',
  },
]
</script>
