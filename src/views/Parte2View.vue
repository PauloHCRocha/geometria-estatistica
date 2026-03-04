<template>
  <div class="page-layout">
    <SideBar
      title="Parte II — Geometria no Plano"
      :sections="sections"
      :active-section="activeSection"
      :drawer-open="drawerOpen"
      @close-drawer="$emit('close-drawer')"
    />

    <div class="page-content">
      <!-- ─────────────────────────────── 1. Referenciais Cartesianos ─── -->
      <section id="ref-cart" class="content-section">
        <h1>Parte II — Geometria Analítica no Plano</h1>
        <h2>1. Referenciais Cartesianos</h2>

        <ContentBox tipo="def" titulo="Referencial Cartesiano">
          <p>
            Um <strong>referencial cartesiano</strong> no plano é um par $(O, \{\vec{e}_1, \vec{e}_2\})$
            constituído por um ponto $O$ (a <em>origem</em>) e dois vetores unitários e ortogonais
            $\vec{e}_1 = (1, 0)$ e $\vec{e}_2 = (0, 1)$.
          </p>
          <p>
            Cada ponto $P$ do plano corresponde de forma única a um par $(x, y) \in \mathbb{R}^2$,
            as suas <em>coordenadas cartesianas</em>, tal que $\overrightarrow{OP} = x\,\vec{e}_1 + y\,\vec{e}_2$.
          </p>
        </ContentBox>

        <ContentBox tipo="def" titulo="Quadrantes">
          <p>Os eixos dividem o plano em quatro <strong>quadrantes</strong>:</p>
          <ul>
            <li><strong>1.º Q</strong>: $x > 0,\; y > 0$</li>
            <li><strong>2.º Q</strong>: $x &lt; 0,\; y > 0$</li>
            <li><strong>3.º Q</strong>: $x &lt; 0,\; y &lt; 0$</li>
            <li><strong>4.º Q</strong>: $x > 0,\; y &lt; 0$</li>
          </ul>
        </ContentBox>

        <RefCartSketch />

        <ContentBox tipo="nota" titulo="Convenção de eixos">
          <p>
            O eixo horizontal chama-se <em>eixo dos xx</em> (ou abcissas) e o vertical chama-se
            <em>eixo dos yy</em> (ou ordenadas). O ponto de interseção é a origem $O = (0, 0)$.
          </p>
        </ContentBox>

        <QuizSection
          quiz-id="quiz-ref-cart"
          :questions="qRefCart"
          @completed="(s,t,p) => { store.markSectionDone('ref-cart'); store.markQuizDone('quiz-ref-cart', s, t, p) }"
        />
      </section>

      <!-- ─────────────────────────────── 2. Distância e Ponto Médio ─── -->
      <section id="dist-pmedio" class="content-section">
        <h2>2. Distância Euclidiana e Ponto Médio</h2>

        <ContentBox tipo="def" titulo="Distância entre Dois Pontos">
          <p>
            A <strong>distância euclidiana</strong> entre $A = (x_A, y_A)$ e $B = (x_B, y_B)$ é:
            $$d(A, B) = \|\overrightarrow{AB}\| = \sqrt{(x_B - x_A)^2 + (y_B - y_A)^2}$$
          </p>
        </ContentBox>

        <ContentBox tipo="prop" titulo="Propriedades da Distância">
          <ul>
            <li>$d(A,B) \ge 0$, e $d(A,B) = 0 \Leftrightarrow A = B$</li>
            <li>Simetria: $d(A,B) = d(B,A)$</li>
            <li>Desigualdade triangular: $d(A,C) \le d(A,B) + d(B,C)$</li>
          </ul>
        </ContentBox>

        <DistSketch />

        <ContentBox tipo="def" titulo="Ponto Médio">
          <p>
            O <strong>ponto médio</strong> do segmento $[AB]$ é o ponto $M$ equidistante de $A$ e $B$:
            $$M = \left(\frac{x_A + x_B}{2},\;\frac{y_A + y_B}{2}\right)$$
          </p>
        </ContentBox>

        <ContentBox tipo="ex" titulo="Exemplo">
          <p>
            Sejam $A = (-1, 3)$ e $B = (5, -1)$.
          </p>
          <ul>
            <li>$d(A,B) = \sqrt{(5-(-1))^2 + (-1-3)^2} = \sqrt{36+16} = \sqrt{52} = 2\sqrt{13}$</li>
            <li>$M = \left(\dfrac{-1+5}{2}, \dfrac{3+(-1)}{2}\right) = (2, 1)$</li>
          </ul>
        </ContentBox>

        <QuizSection
          quiz-id="quiz-dist-pmedio"
          :questions="qDistPmedio"
          @completed="(s,t,p) => { store.markSectionDone('dist-pmedio'); store.markQuizDone('quiz-dist-pmedio', s, t, p) }"
        />
      </section>

      <!-- ─────────────────────────────── 3. Circunferência ─── -->
      <section id="circ" class="content-section">
        <h2>3. Circunferência e Tangentes</h2>

        <ContentBox tipo="def" titulo="Circunferência">
          <p>
            A <strong>circunferência</strong> de centro $C = (a, b)$ e raio $r > 0$ é o conjunto
            de todos os pontos do plano equidistantes de $C$ com distância $r$:
            $$\mathcal{C}:\quad (x-a)^2 + (y-b)^2 = r^2$$
          </p>
          <p>
            O <strong>disco</strong> aberto associado é $\{(x,y): (x-a)^2+(y-b)^2 &lt; r^2\}$ e o
            disco fechado inclui a circunferência.
          </p>
        </ContentBox>

        <ContentBox tipo="prop" titulo="Posição relativa ponto–circunferência">
          <p>
            Dado $P = (x_0, y_0)$ e a circunferência de centro $C=(a,b)$ e raio $r$:
          </p>
          <ul>
            <li>$P$ é <strong>interior</strong> se $(x_0-a)^2+(y_0-b)^2 &lt; r^2$</li>
            <li>$P$ é <strong>na circunferência</strong> se $(x_0-a)^2+(y_0-b)^2 = r^2$</li>
            <li>$P$ é <strong>exterior</strong> se $(x_0-a)^2+(y_0-b)^2 > r^2$</li>
          </ul>
        </ContentBox>

        <CircSketch />

        <ContentBox tipo="teo" titulo="Tangente a uma Circunferência">
          <p>
            Se $P = (x_0, y_0)$ pertence à circunferência $(x-a)^2+(y-b)^2=r^2$, então a tangente
            à circunferência em $P$ é perpendicular ao raio $\overrightarrow{CP}$ e tem equação:
            $$(x_0 - a)(x - a) + (y_0 - b)(y - b) = r^2$$
          </p>
        </ContentBox>

        <ContentBox tipo="ex" titulo="Exemplo">
          <p>
            Circunferência $x^2 + y^2 = 25$ (centro $O=(0,0)$, raio $r=5$).
            O ponto $P=(3,4)$ pertence à circunferência pois $9+16=25$.
            A tangente em $P$ é $3(x-0)+4(y-0)=25$, i.e., $3x+4y=25$.
          </p>
        </ContentBox>

        <QuizSection
          quiz-id="quiz-circ"
          :questions="qCirc"
          @completed="(s,t,p) => { store.markSectionDone('circ'); store.markQuizDone('quiz-circ', s, t, p) }"
        />
      </section>

      <!-- ─────────────────────────────── 4. Retas no Plano ─── -->
      <section id="retas" class="content-section">
        <h2>4. Retas no Plano</h2>

        <ContentBox tipo="def" titulo="Equação Reduzida da Reta">
          <p>
            A <strong>equação reduzida</strong> de uma reta não-vertical é $y = mx + b$, onde:
          </p>
          <ul>
            <li>$m$ é o <strong>declive</strong> (tangente do ângulo com o eixo $xx$)</li>
            <li>$b$ é a <strong>ordenada na origem</strong> (valor de $y$ quando $x=0$)</li>
          </ul>
          <p>Retas verticais escrevem-se $x = c$, com $c$ constante.</p>
        </ContentBox>

        <ContentBox tipo="def" titulo="Declive e Paralelismo">
          <p>
            Dados dois pontos $A=(x_1,y_1)$ e $B=(x_2,y_2)$ com $x_1 \neq x_2$:
            $$m = \frac{y_2 - y_1}{x_2 - x_1}$$
          </p>
          <p>
            Duas retas $r_1: y=m_1 x + b_1$ e $r_2: y = m_2 x + b_2$ são:
          </p>
          <ul>
            <li><strong>Paralelas</strong> se $m_1 = m_2$ (e $b_1 \neq b_2$)</li>
            <li><strong>Perpendiculares</strong> se $m_1 \cdot m_2 = -1$</li>
            <li><strong>Coincidentes</strong> se $m_1 = m_2$ e $b_1 = b_2$</li>
          </ul>
        </ContentBox>

        <RetaSketch />

        <ContentBox tipo="def" titulo="Equação Geral da Reta">
          <p>
            Qualquer reta no plano pode escrever-se na forma geral:
            $$ax + by + c = 0 \quad (a, b \text{ não ambos nulos})$$
          </p>
          <p>
            O vetor $\vec{n} = (a, b)$ é um <strong>vetor normal</strong> à reta.
            O vetor $\vec{d} = (-b, a)$ é um <strong>vetor diretor</strong>.
          </p>
        </ContentBox>

        <ContentBox tipo="ex" titulo="Exemplo">
          <p>
            Reta que passa em $A=(1,2)$ e $B=(3,8)$:
            $m = \frac{8-2}{3-1} = 3$. Equação: $y - 2 = 3(x-1) \Rightarrow y = 3x - 1$.
          </p>
          <p>
            Reta perpendicular pela origem: declive $-\frac{1}{3}$, equação $y = -\frac{x}{3}$.
          </p>
        </ContentBox>

        <QuizSection
          quiz-id="quiz-retas"
          :questions="qRetas"
          @completed="(s,t,p) => { store.markSectionDone('retas'); store.markQuizDone('quiz-retas', s, t, p) }"
        />
      </section>

      <!-- ─────────────────────────────── 5. Representação Paramétrica ─── -->
      <section id="retas-repr" class="content-section">
        <h2>5. Outras Representações de Retas</h2>

        <ContentBox tipo="def" titulo="Equação Paramétrica">
          <p>
            Uma reta que passa pelo ponto $P_0 = (x_0, y_0)$ com vetor diretor $\vec{d} = (d_1, d_2)$
            tem <strong>representação paramétrica</strong>:
            $$\begin{cases} x = x_0 + t\,d_1 \\ y = y_0 + t\,d_2 \end{cases},\quad t \in \mathbb{R}$$
          </p>
        </ContentBox>

        <ContentBox tipo="def" titulo="Equação Vetorial">
          <p>
            Na forma vetorial: $P = P_0 + t\,\vec{d}$, ou seja, todos os pontos obtidos ao
            transladar $P_0$ ao longo de $\vec{d}$.
          </p>
        </ContentBox>

        <ContentBox tipo="prop" titulo="Distância de um Ponto a uma Reta">
          <p>
            A distância do ponto $Q=(x_0, y_0)$ à reta $ax+by+c=0$ é:
            $$d(Q, r) = \frac{|ax_0 + by_0 + c|}{\sqrt{a^2+b^2}}$$
          </p>
        </ContentBox>

        <ContentBox tipo="ex" titulo="Exemplo">
          <p>
            Reta $r: 3x + 4y - 10 = 0$. Distância de $Q=(1,1)$ a $r$:
            $$d = \frac{|3 \cdot 1 + 4 \cdot 1 - 10|}{\sqrt{9+16}} = \frac{|3+4-10|}{5} = \frac{3}{5}$$
          </p>
        </ContentBox>

        <ContentBox tipo="nota" titulo="Interseção de duas retas">
          <p>
            Para encontrar o ponto de interseção de $r_1$ e $r_2$, resolve-se o sistema de equações.
            Se as retas forem paralelas (mesmo declive), o sistema é impossível (sem solução) ou
            indeterminado (coincidentes).
          </p>
        </ContentBox>

        <ContentBox tipo="ex" titulo="Exemplo — Representação paramétrica">
          <p>
            Reta que passa em $A=(2,1)$ com vetor diretor $\vec{d}=(3,2)$:
            $$\begin{cases} x = 2 + 3t \\ y = 1 + 2t \end{cases}$$
            Para $t=1$: $(5,3)$. Para $t=-1$: $(-1,-1)$.
          </p>
        </ContentBox>

        <QuizSection
          quiz-id="quiz-retas-repr"
          :questions="qRetasRepr"
          @completed="(s,t,p) => { store.markSectionDone('retas-repr'); store.markQuizDone('quiz-retas-repr', s, t, p) }"
        />
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useProgressStore } from '../stores/progress.js'
import { useMathJax } from '../composables/useMathJax.js'
import SideBar      from '../components/SideBar.vue'
import ContentBox   from '../components/ContentBox.vue'
import QuizSection  from '../components/QuizSection.vue'
import RefCartSketch from '../sketches/RefCartSketch.vue'
import DistSketch    from '../sketches/DistSketch.vue'
import CircSketch    from '../sketches/CircSketch.vue'
import RetaSketch    from '../sketches/RetaSketch.vue'

defineProps({ drawerOpen: Boolean })
defineEmits(['close-drawer'])

const store = useProgressStore()
useMathJax()

const sections = [
  { id: 'ref-cart',    label: '1. Referenciais Cartesianos' },
  { id: 'dist-pmedio', label: '2. Distância e Ponto Médio' },
  { id: 'circ',        label: '3. Circunferência e Tangentes' },
  { id: 'retas',       label: '4. Retas no Plano' },
  { id: 'retas-repr',  label: '5. Outras Representações' },
]

const activeSection = ref('ref-cart')

let observer = null
onMounted(() => {
  const sectionEls = sections.map(s => document.getElementById(s.id)).filter(Boolean)
  observer = new IntersectionObserver(
    (entries) => {
      const visible = entries.filter(e => e.isIntersecting)
      if (visible.length) {
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

const qRefCart = [
  {
    text: 'O ponto $P = (-3, 2)$ está em que quadrante?',
    options: ['2.º Quadrante', '1.º Quadrante', '3.º Quadrante', '4.º Quadrante'],
    correct: 0,
    feedbackCorrect: 'Correto! $x < 0$ e $y > 0$ define o 2.º quadrante.',
    feedbackWrong: '$x = -3 < 0$ e $y = 2 > 0$, logo P está no 2.º quadrante.',
  },
  {
    text: 'Qual é o vetor posição do ponto $A = (4, -1)$?',
    options: ['$(4, -1)$', '$(-4, 1)$', '$(-1, 4)$', '$(1, -4)$'],
    correct: 0,
    feedbackCorrect: 'Correto! O vetor posição de $A$ é $\\overrightarrow{OA} = (4, -1)$.',
    feedbackWrong: 'O vetor posição de $A$ é $\\overrightarrow{OA} = A - O = (4,-1) - (0,0) = (4,-1)$.',
  },
  {
    text: 'Quantos referenciais cartesianos existem para o mesmo plano?',
    options: [
      'Infinitos (dependem da escolha da origem e dos eixos)',
      'Exatamente um (canónico)',
      'Dois (um por eixo)',
      'Quatro (um por quadrante)',
    ],
    correct: 0,
    feedbackCorrect: 'Correto! Podemos escolher qualquer ponto como origem e qualquer par de eixos ortogonais.',
    feedbackWrong: 'Existem infinitos referenciais: a origem pode ser qualquer ponto e os eixos podem ter qualquer orientação (desde que sejam ortogonais).',
  },
]

const qDistPmedio = [
  {
    text: 'Qual é a distância entre $A=(0,0)$ e $B=(3,4)$?',
    options: ['$5$', '$7$', '$\\sqrt{7}$', '$12$'],
    correct: 0,
    feedbackCorrect: 'Correto! $d = \\sqrt{9+16} = \\sqrt{25} = 5$.',
    feedbackWrong: '$d(A,B) = \\sqrt{(3-0)^2+(4-0)^2} = \\sqrt{9+16} = 5$.',
  },
  {
    text: 'O ponto médio de $A=(2,4)$ e $B=(8,-2)$ é:',
    options: ['$(5, 1)$', '$(6, 2)$', '$(10, 2)$', '$(3, -1)$'],
    correct: 0,
    feedbackCorrect: 'Correto! $M = \\left(\\frac{2+8}{2}, \\frac{4+(-2)}{2}\\right) = (5, 1)$.',
    feedbackWrong: '$M = \\left(\\frac{2+8}{2}, \\frac{4-2}{2}\\right) = (5, 1)$.',
  },
  {
    text: 'Se $d(A,B) = 0$, então:',
    options: ['$A = B$', '$A$ e $B$ são simétricos', '$A$ está na origem', 'A distância não está definida'],
    correct: 0,
    feedbackCorrect: 'Exato! A distância só é zero quando os pontos coincidem.',
    feedbackWrong: 'Pela definição de distância, $d(A,B)=0 \\Leftrightarrow A=B$.',
  },
]

const qCirc = [
  {
    text: 'Qual é o centro e raio da circunferência $(x-2)^2 + (y+3)^2 = 16$?',
    options: ['Centro $(2,-3)$, raio $4$', 'Centro $(-2,3)$, raio $4$', 'Centro $(2,-3)$, raio $16$', 'Centro $(2,3)$, raio $4$'],
    correct: 0,
    feedbackCorrect: 'Correto! Centro $C=(2,-3)$ e raio $r=\\sqrt{16}=4$.',
    feedbackWrong: 'Forma padrão: $(x-a)^2+(y-b)^2=r^2$. Aqui $a=2$, $b=-3$, $r=\\sqrt{16}=4$.',
  },
  {
    text: 'O ponto $P=(1,1)$ é interior, exterior ou pertence à circunferência $x^2+y^2=4$?',
    options: ['Interior', 'Exterior', 'Pertence à circunferência', 'Não é possível determinar'],
    correct: 0,
    feedbackCorrect: 'Correto! $1^2+1^2=2 < 4$, logo P é interior.',
    feedbackWrong: '$d(O,P)^2 = 1^2+1^2 = 2 < 4 = r^2$, logo P é interior à circunferência.',
  },
  {
    text: 'A circunferência com centro $C=(3,0)$ e raio $r=5$. Pertence à circunferência o ponto:',
    options: ['$(3,5)$', '$(0,0)$', '$(8,1)$', '$(3,4)$'],
    correct: 0,
    feedbackCorrect: 'Correto! $(3-3)^2+(5-0)^2=0+25=25=r^2$.',
    feedbackWrong: '$(3-3)^2+(5-0)^2=25=r^2$ ✓. Verifica os outros: $(3-3)^2+0^2=0\\neq25$.',
  },
]

const qRetas = [
  {
    text: 'A reta $y = -2x + 5$ tem declive:',
    options: ['$-2$', '$5$', '$2$', '$-5$'],
    correct: 0,
    feedbackCorrect: 'Correto! Na forma $y=mx+b$, o declive é $m=-2$.',
    feedbackWrong: 'Na equação $y=mx+b$, $m$ é o coeficiente de $x$. Aqui $m=-2$.',
  },
  {
    text: 'Duas retas com declives $m_1=2$ e $m_2=-\\frac{1}{2}$ são:',
    options: ['Perpendiculares', 'Paralelas', 'Coincidentes', 'Oblíquas sem relação especial'],
    correct: 0,
    feedbackCorrect: 'Correto! $m_1 \\cdot m_2 = 2 \\times (-\\frac{1}{2}) = -1$, logo são perpendiculares.',
    feedbackWrong: 'Condição de perpendicularidade: $m_1 \\cdot m_2 = -1$. Aqui $2 \\times (-\\frac{1}{2}) = -1$ ✓.',
  },
  {
    text: 'O declive da reta que passa em $A=(1,2)$ e $B=(3,6)$ é:',
    options: ['$2$', '$4$', '$\\frac{1}{2}$', '$-2$'],
    correct: 0,
    feedbackCorrect: 'Correto! $m = \\frac{6-2}{3-1} = \\frac{4}{2} = 2$.',
    feedbackWrong: '$m = \\frac{y_B-y_A}{x_B-x_A} = \\frac{6-2}{3-1} = \\frac{4}{2} = 2$.',
  },
]

const qRetasRepr = [
  {
    text: 'Na representação paramétrica $\\begin{cases}x=1+2t\\\\y=3-t\\end{cases}$, o vetor diretor é:',
    options: ['$(2,-1)$', '$(1,3)$', '$(-2,1)$', '$(1,-1)$'],
    correct: 0,
    feedbackCorrect: 'Correto! Os coeficientes de $t$ dão o vetor diretor: $(2,-1)$.',
    feedbackWrong: 'Na forma $x=x_0+d_1 t$, $y=y_0+d_2 t$, o vetor diretor é $(d_1,d_2)=(2,-1)$.',
  },
  {
    text: 'A distância do ponto $Q=(0,0)$ à reta $3x+4y-15=0$ é:',
    options: ['$3$', '$5$', '$15$', '$\\frac{15}{12}$'],
    correct: 0,
    feedbackCorrect: 'Correto! $d = \\frac{|3\\cdot0+4\\cdot0-15|}{\\sqrt{9+16}} = \\frac{15}{5} = 3$.',
    feedbackWrong: '$d = \\frac{|ax_0+by_0+c|}{\\sqrt{a^2+b^2}} = \\frac{|0+0-15|}{5} = \\frac{15}{5} = 3$.',
  },
  {
    text: 'Um vetor normal à reta $2x - 3y + 1 = 0$ é:',
    options: ['$(2,-3)$', '$(-3,2)$', '$(3,2)$', '$(1,0)$'],
    correct: 0,
    feedbackCorrect: 'Correto! Na forma $ax+by+c=0$, o vetor normal é $(a,b)=(2,-3)$.',
    feedbackWrong: 'Na equação geral $ax+by+c=0$, o vetor normal é $(a,b)$. Aqui $(a,b)=(2,-3)$.',
  },
]
</script>
