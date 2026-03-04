<template>
  <div class="page-layout">
    <SideBar
      title="Parte VII — Estatística Descritiva Bivariada"
      :sections="sections"
      :active-section="activeSection"
      :drawer-open="drawerOpen"
      @close-drawer="$emit('close-drawer')"
    />

    <div class="page-content">
      <!-- ─────────────────────────────── 1. Dados Bivariados ─── -->
      <section id="estat-bivariada" class="content-section">
        <h1>Parte VII — Estatística Descritiva Bivariada</h1>
        <h2>1. Dados Bivariados e Diagrama de Dispersão</h2>

        <ContentBox tipo="def" titulo="Dados Bivariados">
          <p>
            A análise bivariada estuda a relação entre <strong>duas variáveis</strong> observadas
            simultaneamente nas mesmas unidades estatísticas. Cada observação é um par
            $(x_i, y_i)$.
          </p>
        </ContentBox>

        <ContentBox tipo="def" titulo="Diagrama de Dispersão (Scatter Plot)">
          <p>
            Representa graficamente os pares $(x_i, y_i)$ num referencial cartesiano.
            Permite visualizar:
          </p>
          <ul>
            <li>A <strong>direção</strong> da relação (positiva, negativa ou nula).</li>
            <li>A <strong>forma</strong> da relação (linear ou não linear).</li>
            <li>A presença de <strong>outliers bivariados</strong>.</li>
          </ul>
        </ContentBox>

        <ScatterSketch />

        <ContentBox tipo="nota" titulo="Correlação não implica causalidade">
          <p>
            Uma correlação elevada entre duas variáveis <strong>não implica</strong> que
            uma cause a outra. As associações estatísticas devem ser interpretadas com cautela
            e fazer sentido substantivo.
          </p>
        </ContentBox>

        <QuizSection
          quiz-id="quiz-estat3-biv"
          :questions="qBiv"
          @completed="(s,t,p) => { store.markSectionDone('estat-bivariada'); store.markQuizDone('quiz-estat3-biv', s, t, p) }"
        />
      </section>

      <!-- ─────────────────────────────── 2. Covariância ─── -->
      <section id="estat-covariancia" class="content-section">
        <h2>2. Covariância</h2>

        <ContentBox tipo="def" titulo="Covariância Amostral">
          <p>
            A <strong>covariância</strong> mede o grau de variação conjunta de $X$ e $Y$:
            $$s_{xy} = \frac{1}{n-1} \sum_{i=1}^{n} (x_i - \bar{x})(y_i - \bar{y})$$
          </p>
        </ContentBox>

        <ContentBox tipo="prop" titulo="Interpretação da Covariância">
          <ul>
            <li>$s_{xy} > 0$ — quando $x$ aumenta, $y$ tende a aumentar (<strong>relação positiva</strong>).</li>
            <li>$s_{xy} &lt; 0$ — quando $x$ aumenta, $y$ tende a diminuir (<strong>relação negativa</strong>).</li>
            <li>$s_{xy} = 0$ — ausência de relação linear entre $X$ e $Y$.</li>
          </ul>
          <p>
            A covariância depende das unidades de medida, pelo que o seu valor absoluto
            é de difícil interpretação directa.
          </p>
        </ContentBox>

        <ContentBox tipo="ex" titulo="Interpretação geométrica">
          <p>
            Se os pontos $(x_i, y_i)$ se concentram nos quadrantes onde $(x_i - \bar{x})$
            e $(y_i - \bar{y})$ têm o mesmo sinal (I e III), os produtos são positivos →
            $s_{xy} > 0$. Se se concentram nos quadrantes onde têm sinais opostos (II e IV),
            $s_{xy} &lt; 0$.
          </p>
        </ContentBox>

        <QuizSection
          quiz-id="quiz-estat3-cov"
          :questions="qCov"
          @completed="(s,t,p) => { store.markSectionDone('estat-covariancia'); store.markQuizDone('quiz-estat3-cov', s, t, p) }"
        />
      </section>

      <!-- ─────────────────────────────── 3. Correlação de Pearson ─── -->
      <section id="estat-pearson" class="content-section">
        <h2>3. Correlação Linear de Pearson</h2>

        <ContentBox tipo="def" titulo="Coeficiente de Correlação de Pearson">
          <p>
            Versão padronizada da covariância, independente das unidades de medida:
            $$r = \frac{s_{xy}}{s_x \cdot s_y} \in [-1, 1]$$
          </p>
        </ContentBox>

        <ContentBox tipo="prop" titulo="Interpretação de r">
          <ul>
            <li>$r = 1$ — correlação positiva perfeita.</li>
            <li>$0 &lt; r &lt; 1$ — correlação positiva (maior $|r|$ → maior correlação).</li>
            <li>$r = 0$ — ausência de correlação linear.</li>
            <li>$-1 &lt; r &lt; 0$ — correlação negativa.</li>
            <li>$r = -1$ — correlação negativa perfeita.</li>
          </ul>
        </ContentBox>

        <ContentBox tipo="prop" titulo="Classificação de Pestana e Gageiro (2014)">
          <div style="overflow-x:auto">
            <table style="margin:0.5rem auto;border-collapse:collapse;font-size:0.9em">
              <thead><tr>
                <th style="border:1px solid #ccc;padding:4px 12px">$|r|$</th>
                <th style="border:1px solid #ccc;padding:4px 12px">Classificação</th>
              </tr></thead>
              <tbody>
                <tr><td style="border:1px solid #eee;padding:3px 12px;text-align:center">$[0;\; 0{,}2[$</td><td style="border:1px solid #eee;padding:3px 12px">Nula ou desprezável</td></tr>
                <tr><td style="border:1px solid #eee;padding:3px 12px;text-align:center">$[0{,}2;\; 0{,}7[$</td><td style="border:1px solid #eee;padding:3px 12px">Moderada</td></tr>
                <tr><td style="border:1px solid #eee;padding:3px 12px;text-align:center">$[0{,}7;\; 0{,}9[$</td><td style="border:1px solid #eee;padding:3px 12px">Forte</td></tr>
                <tr><td style="border:1px solid #eee;padding:3px 12px;text-align:center">$\geq 0{,}9$</td><td style="border:1px solid #eee;padding:3px 12px">Muito forte</td></tr>
              </tbody>
            </table>
          </div>
        </ContentBox>

        <ContentBox tipo="def" titulo="Coeficiente de Determinação">
          <p>
            $r^2 \in [0,1]$ indica a proporção da variação de $Y$ explicada linearmente por $X$.
            Ex.: $r^2 = 0{,}64$ → 64% da variação de $Y$ é explicada por $X$.
          </p>
        </ContentBox>

        <ContentBox tipo="ex" titulo="Exemplo — Pesos de meninos (7–11 anos)">
          <p>
            Dados: idades $x_i = 7, 8, 9, 10, 11$ e pesos $y_i = 22, 24, 28, 31, 32$ kg.
          </p>
          <p>
            $\bar{x}=9$, $\bar{y}=27{,}4$, $s_x\approx1{,}581$, $s_y\approx4{,}506$.
          </p>
          <p>
            $s_{xy} = \frac{1}{4}[10{,}8 + 3{,}4 + 0 + 3{,}6 + 9{,}2] = 6{,}75$
          </p>
          <p>
            $r = \frac{6{,}75}{1{,}581 \times 4{,}506} \approx 0{,}947$ — correlação
            <strong>muito forte e positiva</strong>.
          </p>
        </ContentBox>

        <QuizSection
          quiz-id="quiz-estat3-pear"
          :questions="qPear"
          @completed="(s,t,p) => { store.markSectionDone('estat-pearson'); store.markQuizDone('quiz-estat3-pear', s, t, p) }"
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
import ScatterSketch from '../sketches/ScatterSketch.vue'

defineProps({ drawerOpen: Boolean })
defineEmits(['close-drawer'])

const store = useProgressStore()
useMathJax()

const sections = [
  { id: 'estat-bivariada',   label: '1. Dados Bivariados' },
  { id: 'estat-covariancia', label: '2. Covariância' },
  { id: 'estat-pearson',     label: '3. Correlação de Pearson' },
]

const activeSection = ref('estat-bivariada')

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

// ── Quiz data (answers: B,C,D,B,B,C,C,B → índices 1,2,3,1,1,2,2,1) ──────────────────────────────

const qBiv = [
  {
    text: 'O diagrama de dispersão serve principalmente para:',
    options: [
      'Representar a distribuição de uma única variável.',
      'Visualizar a relação entre duas variáveis observadas em pares.',
      'Calcular a covariância.',
      'Ordenar os dados de duas variáveis.',
    ],
    correct: 1,
    feedbackCorrect: 'Correto! O scatter plot visualiza a relação entre dois pares de variáveis.',
    feedbackWrong: 'O diagrama de dispersão mostra como os pares $(x_i, y_i)$ se distribuem no plano.',
  },
  {
    text: 'Qual dos seguintes valores é <strong>impossível</strong> para o coeficiente de Pearson $r$?',
    options: ['$-1$', '$0$', '$0{,}99$', '$1{,}5$'],
    correct: 3,
    feedbackCorrect: 'Correto! $r \\in [-1, 1]$, logo $1{,}5$ é impossível.',
    feedbackWrong: '$r$ está sempre em $[-1, 1]$. O valor $1{,}5$ está fora deste intervalo.',
  },
]

const qCov = [
  {
    text: 'Uma covariância $s_{xy} > 0$ indica que:',
    options: [
      'Não existe qualquer relação entre $X$ e $Y$.',
      'Quando $X$ aumenta, $Y$ tende a diminuir.',
      'Quando $X$ aumenta, $Y$ tende a aumentar.',
      'A correlação entre $X$ e $Y$ é perfeita.',
    ],
    correct: 2,
    feedbackCorrect: 'Correto! Covariância positiva indica tendência de crescimento conjunto.',
    feedbackWrong: '$s_{xy}>0$: os desvios de $X$ e $Y$ têm o mesmo sinal em média → relação positiva.',
  },
  {
    text: 'A principal limitação da covariância como medida de associação é:',
    options: [
      'Só pode ser calculada para variáveis qualitativas.',
      'O seu valor depende das unidades de medida.',
      'Nunca pode assumir valores negativos.',
      'Não considera os desvios em relação às médias.',
    ],
    correct: 1,
    feedbackCorrect: 'Correto! A covariância depende das unidades → difícil de comparar entre estudos.',
    feedbackWrong: 'A covariância não é adimensional: o seu valor muda com as unidades → é difícil de interpretar.',
  },
]

const qPear = [
  {
    text: 'Uma correlação $r = -0{,}85$ classifica-se (Pestana e Gageiro) como:',
    options: [
      'Correlação moderada negativa.',
      'Correlação forte negativa.',
      'Correlação muito forte negativa.',
      'Correlação nula.',
    ],
    correct: 1,
    feedbackCorrect: 'Correto! $|r|=0{,}85 \\in [0{,}7;\\ 0{,}9[$ → forte (negativa).',
    feedbackWrong: '$|r|=0{,}85 \\in [0{,}7;\\ 0{,}9[$ → classificação: forte.',
  },
  {
    text: 'Se $r=0$ entre $X$ e $Y$, podemos concluir que:',
    options: [
      '$X$ e $Y$ são completamente independentes.',
      '$X$ e $Y$ têm variâncias iguais.',
      'Não existe relação <em>linear</em> entre $X$ e $Y$.',
      'A covariância é positiva.',
    ],
    correct: 2,
    feedbackCorrect: 'Correto! $r=0$ significa ausência de relação linear (pode existir relação não linear).',
    feedbackWrong: '$r=0$ implica apenas ausência de correlação LINEAR — pode haver relação não linear.',
  },
  {
    text: '«Correlação não implica causalidade» significa que:',
    options: [
      'Uma correlação elevada prova que $X$ causa $Y$.',
      'Correlações baixas indicam independência total.',
      'A existência de associação estatística não é suficiente para inferir causalidade.',
      'Só existe causalidade quando $r=\\pm1$.',
    ],
    correct: 2,
    feedbackCorrect: 'Correto! Correlação é associação estatística; causalidade requer evidência adicional.',
    feedbackWrong: 'Correlação mede associação, não causalidade. Pode haver uma terceira variável que explica ambas.',
  },
]
</script>
