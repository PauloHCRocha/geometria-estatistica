<template>
  <div class="page-layout">
    <SideBar
      title="Parte IV — Subconjuntos Notáveis"
      :sections="sections"
      :active-section="activeSection"
      :drawer-open="drawerOpen"
      @close-drawer="$emit('close-drawer')"
    />

    <div class="page-content">
      <!-- ─────────────────────────────── 1. Plano Mediador ─── -->
      <section id="geo4-mediador" class="content-section">
        <h1>Parte IV — Subconjuntos Geométricos Notáveis</h1>
        <h2>1. Plano Mediador</h2>

        <ContentBox tipo="def" titulo="Plano Mediador (Mediatriz no Espaço)">
          <p>
            O <strong>plano mediador</strong> do segmento $[AB]$ é o conjunto de todos os
            pontos do espaço equidistantes de $A$ e $B$:
            $$\mathcal{M}_{AB} = \{P \in \mathbb{R}^3 : d(P,A) = d(P,B)\}$$
          </p>
          <p>
            É perpendicular a $\overrightarrow{AB}$ e passa pelo ponto médio $M$ de $[AB]$.
          </p>
        </ContentBox>

        <ContentBox tipo="prop" titulo="Equação do Plano Mediador via Produto Escalar">
          <p>
            $P$ pertence ao plano mediador de $[AB]$ se e só se:
            $$\overrightarrow{MP} \cdot \overrightarrow{AB} = 0$$
            onde $M$ é o ponto médio de $[AB]$. Equivalentemente:
            $$\overrightarrow{PA} \cdot \overrightarrow{AB} + \overrightarrow{PB} \cdot \overrightarrow{AB} = 0
            \quad\Leftrightarrow\quad d(P,A)^2 = d(P,B)^2$$
          </p>
        </ContentBox>

        <ContentBox tipo="ex" titulo="Exemplo">
          <p>
            $A=(2,0,0)$, $B=(0,4,0)$. $M=(1,2,0)$, $\overrightarrow{AB}=(-2,4,0)$.
          </p>
          <p>
            Plano mediador: $-2(x-1)+4(y-2)+0(z-0)=0$
            $\Rightarrow -2x+4y-6=0 \Rightarrow x-2y+3=0$.
          </p>
        </ContentBox>

        <ContentBox tipo="nota" titulo="Mediatriz no Plano">
          <p>
            Em $\mathbb{R}^2$, o análogo é a <strong>mediatriz</strong> do segmento $[AB]$,
            que é uma reta (em vez de um plano). A condição é a mesma:
            $\overrightarrow{MP}\cdot\overrightarrow{AB}=0$.
          </p>
        </ContentBox>

        <QuizSection
          quiz-id="quiz-geo4-mediador"
          :questions="qGeo4Mediador"
          @completed="(s,t,p) => { store.markSectionDone('geo4-mediador'); store.markQuizDone('quiz-geo4-mediador', s, t, p) }"
        />
      </section>

      <!-- ─────────────────────────────── 2. Esferas ─── -->
      <section id="geo4-esfera" class="content-section">
        <h2>2. Superfícies Esféricas</h2>

        <ContentBox tipo="def" titulo="Esfera">
          <p>
            A <strong>esfera</strong> de centro $C=(a,b,c)$ e raio $r > 0$ é o conjunto
            de pontos do espaço equidistantes de $C$ com distância $r$:
            $$(x-a)^2 + (y-b)^2 + (z-c)^2 = r^2$$
          </p>
          <p>
            A <strong>bola</strong> (sólido) é o interior: $(x-a)^2+(y-b)^2+(z-c)^2 \leq r^2$.
          </p>
        </ContentBox>

        <ContentBox tipo="prop" titulo="Posição relativa ponto–esfera">
          <ul>
            <li><strong>Interior</strong>: $d(P,C) < r$</li>
            <li><strong>Na esfera</strong>: $d(P,C) = r$</li>
            <li><strong>Exterior</strong>: $d(P,C) > r$</li>
          </ul>
        </ContentBox>

        <ContentBox tipo="teo" titulo="Esfera com diâmetro [AB]">
          <p>
            A esfera de diâmetro $[AB]$ é o conjunto de pontos $P$ tais que
            $\angle APB = 90°$, i.e., $\overrightarrow{PA} \cdot \overrightarrow{PB} = 0$.
          </p>
          <p>
            Tem centro $M$ (ponto médio de $[AB]$) e raio $r = \frac{d(A,B)}{2}$.
          </p>
        </ContentBox>

        <ContentBox tipo="teo" titulo="Plano Tangente a uma Esfera">
          <p>
            Se $P_0=(x_0,y_0,z_0)$ pertence à esfera $(x-a)^2+(y-b)^2+(z-c)^2=r^2$,
            o plano tangente em $P_0$ é perpendicular a $\overrightarrow{CP_0}$:
            $$(x_0-a)(x-a)+(y_0-b)(y-b)+(z_0-c)(z-c)=r^2$$
          </p>
        </ContentBox>

        <ContentBox tipo="ex" titulo="Exemplo">
          <p>
            Esfera de diâmetro $[A,B]$ com $A=(2,0,0)$, $B=(0,0,4)$:
            centro $M=(1,0,2)$, raio $r=\sqrt{1+0+4}=\sqrt{5}$.
            Equação: $(x-1)^2+y^2+(z-2)^2=5$.
          </p>
        </ContentBox>

        <CircSketch />

        <QuizSection
          quiz-id="quiz-geo4-esfera"
          :questions="qGeo4Esfera"
          @completed="(s,t,p) => { store.markSectionDone('geo4-esfera'); store.markQuizDone('quiz-geo4-esfera', s, t, p) }"
        />
      </section>

      <!-- ─────────────────────────────── 3. Subconjuntos via Produto Escalar ─── -->
      <section id="geo4-subconj" class="content-section">
        <h2>3. Subconjuntos Caracterizados pelo Produto Escalar</h2>

        <ContentBox tipo="prop" titulo="Tabela Resumo">
          <p>
            Muitos subconjuntos geométricos notáveis podem ser caracterizados por condições de
            produto escalar:
          </p>
          <ul>
            <li>
              <strong>Mediatriz de $[AB]$ em $\mathbb{R}^2$</strong>:
              $\{P : \overrightarrow{MP}\cdot\overrightarrow{AB}=0\}$
              (reta perpendicular a $AB$ no ponto médio $M$)
            </li>
            <li>
              <strong>Plano mediador de $[AB]$ em $\mathbb{R}^3$</strong>:
              $\{P : \overrightarrow{MP}\cdot\overrightarrow{AB}=0\}$
            </li>
            <li>
              <strong>Circunferência de diâmetro $[AB]$ em $\mathbb{R}^2$</strong>:
              $\{P : \overrightarrow{PA}\cdot\overrightarrow{PB}=0\}$
            </li>
            <li>
              <strong>Esfera de diâmetro $[AB]$ em $\mathbb{R}^3$</strong>:
              $\{P : \overrightarrow{PA}\cdot\overrightarrow{PB}=0\}$
            </li>
            <li>
              <strong>Tangente à circunferência em $P_0$</strong>:
              $\{P : \overrightarrow{CP_0}\cdot\overrightarrow{P_0P}=0\}$
            </li>
            <li>
              <strong>Plano tangente à esfera em $P_0$</strong>:
              $\{P : \overrightarrow{CP_0}\cdot\overrightarrow{P_0P}=0\}$
            </li>
          </ul>
        </ContentBox>

        <ContentBox tipo="nota" titulo="Unificação">
          <p>
            O produto escalar é a ferramenta que unifica a caracterização de todos estes
            subconjuntos. A condição $\vec{u}\cdot\vec{v}=0$ expressa perpendicularidade
            e é o ingrediente central em cada caso.
          </p>
        </ContentBox>

        <ContentBox tipo="ex" titulo="Exemplo — Circunferência de diâmetro [AB]">
          <p>
            Dados $A=(0,0)$ e $B=(4,0)$ em $\mathbb{R}^2$, a circunferência de diâmetro $[AB]$
            tem equação: $\overrightarrow{PA}\cdot\overrightarrow{PB}=0$, i.e.,
            $(-x)(4-x)+(-y)(-y)=0 \Rightarrow x^2+y^2-4x=0 \Rightarrow (x-2)^2+y^2=4$.
          </p>
          <p>
            Centro $(2,0)$ e raio $2$, como esperado (ponto médio de $[AB]$ e metade de $|AB|=4$).
          </p>
        </ContentBox>

        <QuizSection
          quiz-id="quiz-geo4-subconj"
          :questions="qGeo4Subconj"
          @completed="(s,t,p) => { store.markSectionDone('geo4-subconj'); store.markQuizDone('quiz-geo4-subconj', s, t, p) }"
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
import CircSketch  from '../sketches/CircSketch.vue'

defineProps({ drawerOpen: Boolean })
defineEmits(['close-drawer'])

const store = useProgressStore()
useMathJax()

const sections = [
  { id: 'geo4-mediador', label: '1. Plano Mediador' },
  { id: 'geo4-esfera',   label: '2. Esferas' },
  { id: 'geo4-subconj',  label: '3. Subconjuntos e Produto Escalar' },
]

const activeSection = ref('geo4-mediador')

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

const qGeo4Mediador = [
  {
    text: 'O plano mediador de $[AB]$ é perpendicular a $\\overrightarrow{AB}$ e passa por:',
    options: ['O ponto médio de $[AB]$', 'O ponto $A$', 'O ponto $B$', 'A origem'],
    correct: 0,
    feedbackCorrect: 'Correto! O plano mediador passa pelo ponto médio $M$ de $[AB]$.',
    feedbackWrong: 'O plano mediador é perpendicular a $\\overrightarrow{AB}$ e passa pelo ponto médio $M$ de $[AB]$.',
  },
  {
    text: 'Um ponto $P$ pertence ao plano mediador de $[AB]$ se e só se:',
    options: ['$d(P,A)=d(P,B)$', '$d(P,A)=0$', '$\\overrightarrow{PA}=\\overrightarrow{PB}$', '$P$ é o ponto médio'],
    correct: 0,
    feedbackCorrect: 'Correto! Equidistância a $A$ e $B$.',
    feedbackWrong: 'O plano mediador é o lugar geométrico dos pontos equidistantes de $A$ e $B$.',
  },
  {
    text: 'A condição via produto escalar para o plano mediador de $[AB]$ é:',
    options: [
      '$\\overrightarrow{MP}\\cdot\\overrightarrow{AB}=0$',
      '$\\overrightarrow{PA}\\cdot\\overrightarrow{PB}=0$',
      '$\\overrightarrow{AB}\\cdot\\overrightarrow{AB}=0$',
      '$P=M$',
    ],
    correct: 0,
    feedbackCorrect: 'Correto! $P$ está no plano mediador $\\Leftrightarrow$ $\\overrightarrow{MP}\\perp\\overrightarrow{AB}$.',
    feedbackWrong: '$\\overrightarrow{MP}\\cdot\\overrightarrow{AB}=0$ expressa que $\\overrightarrow{MP}$ é perpendicular a $\\overrightarrow{AB}$.',
  },
]

const qGeo4Esfera = [
  {
    text: 'O centro e raio da esfera $(x-1)^2+(y+2)^2+(z-3)^2=9$ são:',
    options: ['Centro $(1,-2,3)$, raio $3$', 'Centro $(-1,2,-3)$, raio $9$', 'Centro $(1,-2,3)$, raio $9$', 'Centro $(1,2,3)$, raio $3$'],
    correct: 0,
    feedbackCorrect: 'Correto! Centro $(1,-2,3)$ e raio $\\sqrt{9}=3$.',
    feedbackWrong: 'Forma padrão $(x-a)^2+(y-b)^2+(z-c)^2=r^2$: centro $(1,-2,3)$, raio $3$.',
  },
  {
    text: 'A esfera de diâmetro $[A,B]$ com $A=(0,0,0)$ e $B=(0,0,6)$ tem centro e raio:',
    options: ['Centro $(0,0,3)$, raio $3$', 'Centro $(0,0,0)$, raio $6$', 'Centro $(0,3,0)$, raio $6$', 'Centro $(0,0,6)$, raio $3$'],
    correct: 0,
    feedbackCorrect: 'Correto! $M=(0,0,3)$ e $r=d(A,B)/2=3$.',
    feedbackWrong: 'Centro $=$ ponto médio $=(0,0,3)$; raio $=d(A,B)/2=6/2=3$.',
  },
  {
    text: 'A condição $\\overrightarrow{PA}\\cdot\\overrightarrow{PB}=0$ caracteriza:',
    options: ['A esfera de diâmetro $[AB]$', 'O plano mediador de $[AB]$', 'A reta $AB$', 'O centro da esfera'],
    correct: 0,
    feedbackCorrect: 'Correto! $\\angle APB=90°$ caracteriza a esfera de diâmetro $[AB]$ (Teorema de Thales em 3D).',
    feedbackWrong: 'O produto escalar nulo implica ângulo reto: $P$ vê $[AB]$ com ângulo $90°$, caracterizando a esfera de diâmetro $[AB]$.',
  },
]

const qGeo4Subconj = [
  {
    text: 'A mediatriz de um segmento $[AB]$ em $\\mathbb{R}^2$ é:',
    options: [
      'A reta perpendicular a $[AB]$ pelo seu ponto médio',
      'A reta paralela a $[AB]$',
      'O plano que contém $[AB]$',
      'O ponto médio de $[AB]$',
    ],
    correct: 0,
    feedbackCorrect: 'Correto! A mediatriz é a reta perpendicular a $[AB]$ que passa pelo ponto médio.',
    feedbackWrong: 'A mediatriz é perpendicular a $[AB]$ e passa pelo seu ponto médio — análogo 2D do plano mediador.',
  },
  {
    text: 'O plano tangente a uma esfera em $P_0$ é perpendicular a:',
    options: [
      'O raio $\\overrightarrow{CP_0}$',
      'A equação da esfera',
      'O ponto $P_0$',
      'O eixo $z$',
    ],
    correct: 0,
    feedbackCorrect: 'Correto! O plano tangente é perpendicular ao raio $\\overrightarrow{CP_0}$.',
    feedbackWrong: 'O plano tangente à esfera em $P_0$ tem como normal o vetor raio $\\overrightarrow{CP_0}$.',
  },
  {
    text: 'Qual condição caracteriza a circunferência de diâmetro $[AB]$ no plano?',
    options: [
      '$\\overrightarrow{PA}\\cdot\\overrightarrow{PB}=0$',
      '$\\overrightarrow{MP}\\cdot\\overrightarrow{AB}=0$',
      '$d(P,A)+d(P,B)=d(A,B)$',
      '$d(P,A)=d(P,B)$',
    ],
    correct: 0,
    feedbackCorrect: 'Correto! Pelo Teorema de Thales: $P$ vê $[AB]$ com ângulo $90°$, i.e., $\\overrightarrow{PA}\\cdot\\overrightarrow{PB}=0$.',
    feedbackWrong: 'Teorema de Thales: $P$ pertence à circunferência de diâmetro $[AB]$ $\\Leftrightarrow$ $\\overrightarrow{PA}\\cdot\\overrightarrow{PB}=0$.',
  },
]
</script>
