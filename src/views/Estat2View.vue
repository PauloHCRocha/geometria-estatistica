<template>
  <div class="page-layout">
    <SideBar
      title="Parte VI — Estatística Descritiva Univariada"
      :sections="sections"
      :active-section="activeSection"
      :drawer-open="drawerOpen"
      @close-drawer="$emit('close-drawer')"
    />

    <div class="page-content">
      <!-- ─────────────────────────────── 1. Tabelas de Frequências ─── -->
      <section id="estat-tabelas" class="content-section">
        <h1>Parte VI — Estatística Descritiva Univariada</h1>
        <h2>1. Tabelas de Frequências</h2>

        <ContentBox tipo="def" titulo="Frequências">
          <p>Para uma amostra de $n$ observações com $k$ classes:</p>
          <ul>
            <li>$n_i$ — <strong>frequência absoluta</strong>: número de observações na classe $i$.</li>
            <li>$f_i = \dfrac{n_i}{n}$ — <strong>frequência relativa</strong>.</li>
            <li>$N_i = \displaystyle\sum_{j=1}^{i} n_j$ — <strong>freq. absoluta acumulada</strong>.</li>
            <li>$F_i = \dfrac{N_i}{n}$ — <strong>freq. relativa acumulada</strong>.</li>
          </ul>
          <p>Verifica-se: $\displaystyle\sum_{i=1}^{k} n_i = n$ e $\displaystyle\sum_{i=1}^{k} f_i = 1$.</p>
        </ContentBox>

        <ContentBox tipo="prop" titulo="Regra de Sturges">
          <p>O número de classes $k$ para dados contínuos:</p>
          <p>$$k = \left\lceil 1 + 3{,}32 \cdot \log_{10}(n) \right\rceil$$</p>
          <p>A amplitude de cada classe: $A = \dfrac{\max - \min}{k}$.</p>
          <p>O ponto central de $[L_{\inf}, L_{\sup}[$: $x_i = \dfrac{L_{\inf}+L_{\sup}}{2}$.</p>
        </ContentBox>

        <ContentBox tipo="ex" titulo="Exemplo — Tabela discreta">
          <p>Número de irmãos de $n=40$ alunos:</p>
          <div style="overflow-x:auto">
            <table style="margin: 0.5rem auto; border-collapse:collapse; font-size:0.9em">
              <thead><tr>
                <th style="border:1px solid #ccc;padding:4px 10px">$x_i$</th>
                <th style="border:1px solid #ccc;padding:4px 10px">$n_i$</th>
                <th style="border:1px solid #ccc;padding:4px 10px">$f_i$</th>
                <th style="border:1px solid #ccc;padding:4px 10px">$N_i$</th>
                <th style="border:1px solid #ccc;padding:4px 10px">$F_i$</th>
              </tr></thead>
              <tbody>
                <tr v-for="row in tableDiscreta" :key="row[0]">
                  <td v-for="cell in row" :key="cell" style="border:1px solid #eee;padding:3px 10px;text-align:center">{{ cell }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </ContentBox>

        <HistSketch />

        <QuizSection
          quiz-id="quiz-estat2-tab"
          :questions="qTab"
          @completed="(s,t,p) => { store.markSectionDone('estat-tabelas'); store.markQuizDone('quiz-estat2-tab', s, t, p) }"
        />
      </section>

      <!-- ─────────────────────────────── 2. Representações Gráficas ─── -->
      <section id="estat-graficos" class="content-section">
        <h2>2. Representações Gráficas</h2>

        <ContentBox tipo="def" titulo="Gráfico Circular (Pie Chart)">
          <p>
            Representa a proporção de cada categoria através de sectores de um círculo.
            A amplitude angular do sector $i$ é $f_i \times 360°$.
            Adequado para variáveis qualitativas ou discretas com poucas categorias.
          </p>
        </ContentBox>

        <ContentBox tipo="def" titulo="Gráfico de Barras">
          <p>
            Cada categoria é uma barra com altura proporcional à frequência ($n_i$ ou $f_i$).
            Existe <strong>espaço</strong> entre barras. Adequado para dados qualitativos e
            quantitativos discretos.
          </p>
        </ContentBox>

        <ContentBox tipo="def" titulo="Histograma">
          <p>
            Semelhante ao gráfico de barras, mas <strong>sem espaço</strong> entre as barras.
            A área de cada barra é proporcional à frequência relativa. Adequado para dados
            contínuos agrupados em classes.
          </p>
        </ContentBox>

        <ContentBox tipo="def" titulo="Polígono de Frequências">
          <p>
            Liga os <strong>pontos centrais</strong> do topo de cada barra do histograma com
            segmentos de reta. Permite comparar visualmente duas distribuições.
          </p>
        </ContentBox>

        <ContentBox tipo="def" titulo="Ogiva (Freq. Acumuladas)">
          <p>
            Representa os pares $(L_{\sup,i},\ F_i)$ ligados por segmentos de reta. Permite
            ler percentis e a mediana (onde $F_i = 0{,}5$) diretamente do gráfico.
          </p>
        </ContentBox>

        <ContentBox tipo="def" titulo="Diagrama de Extremos e Quartis (Box Plot)">
          <p>
            Sintetiza a distribuição com cinco números: mínimo, $Q_1$, mediana ($Q_2$),
            $Q_3$, máximo. Os outliers são representados como pontos isolados.
          </p>
        </ContentBox>

        <BoxPlotSketch />

        <QuizSection
          quiz-id="quiz-estat2-graf"
          :questions="qGraf"
          @completed="(s,t,p) => { store.markSectionDone('estat-graficos'); store.markQuizDone('quiz-estat2-graf', s, t, p) }"
        />
      </section>

      <!-- ─────────────────────────────── 3. Medidas de Localização ─── -->
      <section id="estat-localizacao" class="content-section">
        <h2>3. Medidas de Localização</h2>

        <ContentBox tipo="def" titulo="Média Aritmética">
          <p>
            $$\bar{x} = \frac{1}{n}\sum_{i=1}^{n} x_i \quad\text{(dados não agrupados)}$$
            $$\bar{x} = \frac{1}{n}\sum_{i=1}^{k} n_i x_i \quad\text{(dados agrupados)}$$
          </p>
          <p>A média é sensível a outliers.</p>
        </ContentBox>

        <ContentBox tipo="def" titulo="Mediana">
          <p>
            A <strong>mediana</strong> $\tilde{x}$ divide a distribuição ordenada em dois metades iguais.
          </p>
          <p>Dados não agrupados (ordenados $x_{(1)}\leq\cdots\leq x_{(n)}$):</p>
          <p>$$\tilde{x} = \begin{cases} x_{\left(\frac{n+1}{2}\right)} & \text{se } n \text{ ímpar}\\[6pt]
            \dfrac{x_{\left(\frac{n}{2}\right)} + x_{\left(\frac{n}{2}+1\right)}}{2} & \text{se } n \text{ par}
            \end{cases}$$</p>
          <p>Dados agrupados (interpolação na classe mediana):</p>
          <p>$$\tilde{x} = L_{\inf} + \frac{\frac{n}{2} - N_{i-1}}{n_i} \cdot A_i$$</p>
        </ContentBox>

        <ContentBox tipo="def" titulo="Moda">
          <p>
            A <strong>moda</strong> $\hat{x}$ é o valor (ou classe) com maior frequência absoluta.
            Para dados agrupados, é o ponto central da classe modal.
          </p>
        </ContentBox>

        <ContentBox tipo="def" titulo="Quartis e Percentis">
          <p>
            Os <strong>quartis</strong> dividem a distribuição em 4 partes iguais:
            $Q_1$ (25%), $Q_2$ = mediana (50%), $Q_3$ (75%).
            O <strong>percentil</strong> $P_p$ é o valor abaixo do qual estão $p\%$ das observações.
          </p>
        </ContentBox>

        <ContentBox tipo="ex" titulo="Exemplo">
          <p>
            Notas de 5 alunos: $4, 6, 8, 10, 12$.
            $\bar{x} = 40/5 = 8$. $\tilde{x} = 8$ ($n$ ímpar, posição 3). $\hat{x}$ = não há moda (todos únicos).
          </p>
          <p>
            Mediana de $\{3, 7, 7, 8, 10, 12\}$ ($n=6$, par): $\tilde{x} = \frac{7+8}{2} = 7{,}5$.
          </p>
        </ContentBox>

        <QuizSection
          quiz-id="quiz-estat2-loc"
          :questions="qLoc"
          @completed="(s,t,p) => { store.markSectionDone('estat-localizacao'); store.markQuizDone('quiz-estat2-loc', s, t, p) }"
        />
      </section>

      <!-- ─────────────────────────────── 4. Medidas de Dispersão ─── -->
      <section id="estat-dispersao" class="content-section">
        <h2>4. Medidas de Dispersão</h2>

        <ContentBox tipo="def" titulo="Amplitude Total e AIQ">
          <p>
            $$A = \max(x_i) - \min(x_i)$$
            $$\mathrm{AIQ} = Q_3 - Q_1$$
          </p>
          <p>A AIQ mede a dispersão dos 50% centrais e é robusta a outliers.</p>
        </ContentBox>

        <ContentBox tipo="def" titulo="Variância e Desvio Padrão">
          <p>
            $$s^2 = \frac{1}{n-1}\sum_{i=1}^{n}(x_i - \bar{x})^2 \quad\text{(amostral)}$$
            $$s = \sqrt{s^2}$$
          </p>
          <p>
            Usamos $n-1$ (correção de Bessel) para obter um estimador não enviesado de $\sigma^2$.
            O desvio padrão $s$ tem a mesma unidade que os dados.
          </p>
        </ContentBox>

        <ContentBox tipo="def" titulo="Coeficiente de Variação">
          <p>
            $$CV = \frac{s}{\bar{x}} \times 100\,\%$$
          </p>
          <p>
            Medida de dispersão relativa (adimensional). Referência: $CV &lt; 15\%$ — baixa;
            $15\% \leq CV \leq 30\%$ — moderada; $CV > 30\%$ — elevada variabilidade.
          </p>
        </ContentBox>

        <ContentBox tipo="ex" titulo="Exemplo">
          <p>
            Notas: $4, 6, 8, 10, 12$. $\bar{x}=8$.
            $s^2 = \frac{(4+0+0+4+16)}{4} = \frac{40}{4} = 10$.
            $s = \sqrt{10} \approx 3{,}16$.
            $CV = \frac{3{,}16}{8} \times 100 \approx 39{,}5\%$ — elevada variabilidade.
          </p>
        </ContentBox>

        <QuizSection
          quiz-id="quiz-estat2-disp"
          :questions="qDisp"
          @completed="(s,t,p) => { store.markSectionDone('estat-dispersao'); store.markQuizDone('quiz-estat2-disp', s, t, p) }"
        />
      </section>

      <!-- ─────────────────────────────── 5. Medidas de Forma ─── -->
      <section id="estat-forma" class="content-section">
        <h2>5. Medidas de Forma</h2>

        <ContentBox tipo="def" titulo="Coeficiente de Assimetria">
          <p>
            $$s_k = \frac{m_3}{s^3}, \quad m_3 = \frac{1}{n}\sum_{i=1}^{n}(x_i-\bar{x})^3$$
          </p>
          <ul>
            <li>$s_k = 0$ — simétrica: moda $=$ mediana $=$ média.</li>
            <li>$s_k > 0$ — cauda à direita (positiva): moda $&lt;$ mediana $&lt;$ média.</li>
            <li>$s_k &lt; 0$ — cauda à esquerda (negativa): média $&lt;$ mediana $&lt;$ moda.</li>
          </ul>
        </ContentBox>

        <ContentBox tipo="def" titulo="Coeficiente de Curtose">
          <p>
            $$k = \frac{m_4}{s^4}, \quad m_4 = \frac{1}{n}\sum_{i=1}^{n}(x_i-\bar{x})^4$$
          </p>
          <ul>
            <li>$k = 3$ — <strong>mesocúrtica</strong> (como a normal).</li>
            <li>$k > 3$ — <strong>leptocúrtica</strong>: pico mais aguçado, caudas mais pesadas.</li>
            <li>$k &lt; 3$ — <strong>platicúrtica</strong>: mais achatada, caudas mais leves.</li>
          </ul>
        </ContentBox>

        <QuizSection
          quiz-id="quiz-estat2-forma"
          :questions="qForma"
          @completed="(s,t,p) => { store.markSectionDone('estat-forma'); store.markQuizDone('quiz-estat2-forma', s, t, p) }"
        />
      </section>

      <!-- ─────────────────────────────── 6. Outliers ─── -->
      <section id="estat-outliers" class="content-section">
        <h2>6. Identificação de Outliers</h2>

        <ContentBox tipo="def" titulo="Outlier">
          <p>
            Um <strong>outlier</strong> é uma observação que se afasta significativamente das
            restantes, podendo resultar de erros de medição, erros de registo ou variabilidade
            natural extrema.
          </p>
        </ContentBox>

        <ContentBox tipo="prop" titulo="Critério de Identificação">
          <ul>
            <li>
              <strong>Outlier moderado</strong>: $x_i &lt; Q_1 - 1{,}5 \times \mathrm{AIQ}$
              ou $x_i > Q_3 + 1{,}5 \times \mathrm{AIQ}$
            </li>
            <li>
              <strong>Outlier severo</strong>: $x_i &lt; Q_1 - 3 \times \mathrm{AIQ}$
              ou $x_i > Q_3 + 3 \times \mathrm{AIQ}$
            </li>
          </ul>
          <p>
            No box plot, os bigodes estendem-se até ao valor mais extremo <em>dentro</em>
            dos limites moderados; os outliers são assinalados individualmente.
          </p>
        </ContentBox>

        <ContentBox tipo="ex" titulo="Exemplo">
          <p>
            $Q_1 = 15$, $Q_3 = 45$, $\mathrm{AIQ} = 30$.
          </p>
          <ul>
            <li>Limite moderado inferior: $15 - 1{,}5 \times 30 = -30$</li>
            <li>Limite moderado superior: $45 + 1{,}5 \times 30 = 90$</li>
            <li>Limite severo inferior: $15 - 3 \times 30 = -75$</li>
            <li>Limite severo superior: $45 + 3 \times 30 = 135$</li>
          </ul>
        </ContentBox>

        <QuizSection
          quiz-id="quiz-estat2-out"
          :questions="qOut"
          @completed="(s,t,p) => { store.markSectionDone('estat-outliers'); store.markQuizDone('quiz-estat2-out', s, t, p) }"
        />
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useProgressStore } from '../stores/progress.js'
import { useMathJax } from '../composables/useMathJax.js'
import SideBar       from '../components/SideBar.vue'
import ContentBox    from '../components/ContentBox.vue'
import QuizSection   from '../components/QuizSection.vue'
import HistSketch    from '../sketches/HistSketch.vue'
import BoxPlotSketch from '../sketches/BoxPlotSketch.vue'

defineProps({ drawerOpen: Boolean })
defineEmits(['close-drawer'])

const store = useProgressStore()
useMathJax()

const sections = [
  { id: 'estat-tabelas',     label: '1. Tabelas de Frequências' },
  { id: 'estat-graficos',    label: '2. Representações Gráficas' },
  { id: 'estat-localizacao', label: '3. Medidas de Localização' },
  { id: 'estat-dispersao',   label: '4. Medidas de Dispersão' },
  { id: 'estat-forma',       label: '5. Medidas de Forma' },
  { id: 'estat-outliers',    label: '6. Identificação de Outliers' },
]

const activeSection = ref('estat-tabelas')

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

// Table data for discrete example
const tableDiscreta = [
  [0, 2, '0,050', 2, '0,050'],
  [1, 8, '0,200', 10, '0,250'],
  [2, 20, '0,500', 30, '0,750'],
  [3, 6, '0,150', 36, '0,900'],
  [4, 4, '0,100', 40, '1,000'],
]

// ── Quiz data (answers: B,B,D,B,B,B,C,C,B,C → índices 1,1,3,1,1,1,2,2,1,2) ──────────────────────

const qTab = [
  {
    text: 'Se $n_i=25$ e $n=100$, a frequência relativa $f_i$ é:',
    options: ['$0{,}025$', '$0{,}25$', '$2{,}5$', '$25$'],
    correct: 1,
    feedbackCorrect: 'Correto! $f_i = n_i/n = 25/100 = 0{,}25$.',
    feedbackWrong: '$f_i = n_i / n = 25/100 = 0{,}25$.',
  },
  {
    text: 'A fórmula de Sturges $k = \\lceil 1+3{,}32\\log_{10}(n)\\rceil$ determina:',
    options: [
      'A frequência relativa.',
      'O número recomendado de classes.',
      'A amplitude de cada classe.',
      'A mediana para dados agrupados.',
    ],
    correct: 1,
    feedbackCorrect: 'Correto! Sturges dá o número $k$ de classes para um histograma.',
    feedbackWrong: 'A Regra de Sturges determina o número $k$ de classes a usar no histograma.',
  },
  {
    text: 'Num conjunto com $n=25$ observações, $k$ de Sturges é:',
    options: ['$4$', '$5$', '$6$', '$7$'],
    correct: 2,
    feedbackCorrect: 'Correto! $k=\\lceil 1+3{,}32\\times\\log_{10}(25)\\rceil = \\lceil 5{,}64 \\rceil = 6$.',
    feedbackWrong: '$k=\\lceil 1+3{,}32\\times 1{,}398\\rceil = \\lceil 5{,}64 \\rceil = 6$.',
  },
]

const qGraf = [
  {
    text: 'A <em>ogiva</em> representa graficamente:',
    options: [
      'As frequências absolutas de cada classe.',
      'As frequências relativas de cada classe.',
      'As frequências acumuladas (absolutas ou relativas).',
      'A amplitude de cada classe.',
    ],
    correct: 2,
    feedbackCorrect: 'Correto! A ogiva representa as frequências acumuladas.',
    feedbackWrong: 'A ogiva (gráfico de frequências acumuladas) representa os pares $(L_{\\sup,i}, F_i)$.',
  },
  {
    text: 'O histograma difere do gráfico de barras porque:',
    options: [
      'As barras têm espaço entre si.',
      'As barras são adjacentes, sem espaço — adequado para dados contínuos.',
      'As barras representam categorias qualitativas.',
      'As barras não têm altura proporcional à frequência.',
    ],
    correct: 1,
    feedbackCorrect: 'Correto! Histograma = barras adjacentes, sem espaço, para dados contínuos.',
    feedbackWrong: 'A diferença chave: histograma tem barras adjacentes (sem espaço) para dados contínuos.',
  },
]

const qLoc = [
  {
    text: 'A mediana do conjunto $\\{3, 7, 7, 8, 10, 12\\}$ é:',
    options: ['$7$', '$7{,}5$', '$8$', '$7{,}8$'],
    correct: 1,
    feedbackCorrect: 'Correto! $n=6$ (par): $\\tilde{x}=(7+8)/2=7{,}5$.',
    feedbackWrong: '$n=6$ (par): posições 3 e 4 são $7$ e $8$ → $\\tilde{x}=(7+8)/2=7{,}5$.',
  },
  {
    text: 'Qual das seguintes medidas é a mais resistente a outliers?',
    options: ['Média aritmética.', 'Variância amostral.', 'Desvio padrão.', 'Mediana.'],
    correct: 3,
    feedbackCorrect: 'Correto! A mediana é robusta: um único outlier extremo não a altera muito.',
    feedbackWrong: 'A mediana é robusta a outliers; a média é muito sensível a valores extremos.',
  },
]

const qDisp = [
  {
    text: 'O desvio padrão amostral usa $n-1$ no denominador para:',
    options: [
      'Facilitar os cálculos manuais.',
      'Produzir um estimador não enviesado da variância populacional (correção de Bessel).',
      'Garantir que o desvio padrão é sempre positivo.',
      'Ajustar as unidades ao quadrado.',
    ],
    correct: 1,
    feedbackCorrect: 'Correto! A correção de Bessel ($n-1$ em vez de $n$) remove o enviesamento.',
    feedbackWrong: 'Dividir por $n-1$ (graus de liberdade) produz um estimador não enviesado de $\\sigma^2$.',
  },
  {
    text: 'A AIQ é preferida à amplitude total porque:',
    options: [
      'É sempre maior que a amplitude total.',
      'Considera todas as observações.',
      'É insensível a valores extremos (outliers).',
      'Só é válida para dados agrupados.',
    ],
    correct: 2,
    feedbackCorrect: 'Correto! A AIQ mede a dispersão dos 50% centrais — não é afetada por outliers.',
    feedbackWrong: 'AIQ = $Q_3 - Q_1$: apenas os 50% centrais, independente de valores extremos.',
  },
]

const qForma = [
  {
    text: 'Uma distribuição com assimetria negativa tem:',
    options: [
      'Cauda à direita e $\\bar{x} > \\tilde{x}$.',
      'Cauda à esquerda e $\\bar{x} &lt; \\tilde{x}$.',
      'Média igual à mediana.',
      'Curtose superior a 3.',
    ],
    correct: 1,
    feedbackCorrect: 'Correto! Assimetria negativa: cauda à esquerda, $\\bar{x} &lt; \\tilde{x} &lt;$ moda.',
    feedbackWrong: 'Assimetria negativa ($s_k &lt; 0$): cauda alongada à esquerda → $\\bar{x} &lt; \\tilde{x}$.',
  },
  {
    text: 'Uma distribuição leptocúrtica ($k > 3$) apresenta:',
    options: [
      'Pico mais aguçado e caudas mais pesadas.',
      'Pico mais achatado e caudas mais leves.',
      'Curtose igual a zero.',
      'Curtose negativa.',
    ],
    correct: 0,
    feedbackCorrect: 'Correto! Leptocúrtica: mais concentrada no centro, caudas mais pesadas que a normal.',
    feedbackWrong: 'Lepto ($k>3$) = pico aguçado + caudas pesadas. Plati ($k<3$) = achatada + caudas leves.',
  },
]

const qOut = [
  {
    text: 'Com $Q_1=15$ e $Q_3=45$, um valor é outlier moderado superior se for maior que:',
    options: ['$60$', '$90$', '$135$', '$45$'],
    correct: 1,
    feedbackCorrect: 'Correto! $\\mathrm{AIQ}=30$; limite $= Q_3+1{,}5\\times30 = 45+45 = 90$.',
    feedbackWrong: '$\\mathrm{AIQ}=Q_3-Q_1=30$; limite moderado $= 45+1{,}5\\times30 = 90$.',
  },
]
</script>
