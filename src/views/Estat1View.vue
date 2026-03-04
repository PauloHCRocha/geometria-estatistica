<template>
  <div class="page-layout">
    <SideBar
      title="Parte V — Introdução à Estatística"
      :sections="sections"
      :active-section="activeSection"
      :drawer-open="drawerOpen"
      @close-drawer="$emit('close-drawer')"
    />

    <div class="page-content">
      <!-- ─────────────────────────────── 1. Conceitos Fundamentais ─── -->
      <section id="estat-conceitos" class="content-section">
        <h1>Parte V — Introdução à Estatística</h1>
        <h2>1. Conceitos Fundamentais</h2>

        <ContentBox tipo="def" titulo="Estatística">
          <p>
            A <strong>Estatística</strong> é a ciência que tem como objetivo
            <em>recolher, organizar, analisar e interpretar dados</em>, de modo a extrair
            informação útil e apoiar a tomada de decisão.
          </p>
          <p>Divide-se em duas grandes áreas:</p>
          <ul>
            <li>
              <strong>Estatística Descritiva</strong> — descreve, resume e apresenta os dados
              de forma organizada, através de tabelas, gráficos e medidas numéricas.
            </li>
            <li>
              <strong>Estatística Inferencial</strong> — a partir de uma amostra, generaliza
              conclusões para a população, com recurso a testes de hipóteses e intervalos de
              confiança.
            </li>
          </ul>
        </ContentBox>

        <ContentBox tipo="def" titulo="Conceitos-chave">
          <ul>
            <li>
              <strong>População</strong> — conjunto de todos os elementos que partilham pelo
              menos uma característica de interesse para o estudo.
            </li>
            <li>
              <strong>Amostra</strong> — subconjunto da população, selecionado para análise.
            </li>
            <li>
              <strong>Parâmetro</strong> — medida numérica que descreve uma característica
              da <em>população</em> (ex.: média populacional $\mu$, desvio padrão $\sigma$).
            </li>
            <li>
              <strong>Estatística</strong> (estimativa) — medida numérica calculada a partir
              da <em>amostra</em> (ex.: média amostral $\bar{x}$, desvio padrão amostral $s$).
            </li>
            <li>
              <strong>Unidade estatística</strong> — cada elemento individual da população ou
              amostra sobre o qual são recolhidos dados.
            </li>
            <li>
              <strong>Variável estatística</strong> — característica observada ou medida em
              cada unidade estatística.
            </li>
          </ul>
        </ContentBox>

        <ContentBox tipo="ex" titulo="Exemplo">
          <p>
            Estudo sobre salários de 500 trabalhadores de uma empresa (população).
            Recolhem-se dados de 50 deles (amostra). O salário médio dos 50 é $\bar{x} = 1\,800$€
            (estatística); o salário médio de todos os 500 é $\mu$ (parâmetro desconhecido).
          </p>
        </ContentBox>

        <QuizSection
          quiz-id="quiz-estat1-conc"
          :questions="qConc"
          @completed="(s,t,p) => { store.markSectionDone('estat-conceitos'); store.markQuizDone('quiz-estat1-conc', s, t, p) }"
        />
      </section>

      <!-- ─────────────────────────────── 2. Tipos de Variáveis ─── -->
      <section id="estat-variaveis" class="content-section">
        <h2>2. Tipos de Variáveis e Escalas de Medida</h2>

        <ContentBox tipo="def" titulo="Classificação das Variáveis">
          <ul>
            <li>
              <strong>Qualitativas (categóricas)</strong> — expressam categorias ou atributos,
              sem sentido numérico intrínseco.
              <ul>
                <li><em>Nominais</em> — sem ordem natural (ex.: género, cor dos olhos).</li>
                <li><em>Ordinais</em> — com ordem natural, sem distância quantificável
                    (ex.: grau de satisfação, nível socioeconómico).</li>
              </ul>
            </li>
            <li>
              <strong>Quantitativas (numéricas)</strong> — expressam quantidades numéricas
              com sentido aritmético.
              <ul>
                <li><em>Discretas</em> — valores inteiros e contáveis (ex.: número de filhos).</li>
                <li><em>Contínuas</em> — qualquer valor num intervalo real (ex.: altura, peso).</li>
              </ul>
            </li>
          </ul>
        </ContentBox>

        <ContentBox tipo="def" titulo="Escalas de Medida">
          <ul>
            <li>
              <strong>Nominal</strong> — classifica em categorias sem ordem.
              Só se calcula a moda. (ex.: género, cor favorita)
            </li>
            <li>
              <strong>Ordinal</strong> — classifica com ordem, sem distâncias iguais.
              Permite moda e mediana. (ex.: nível de satisfação 1–5)
            </li>
            <li>
              <strong>De Intervalo</strong> — ordem e distâncias iguais, sem zero absoluto.
              (ex.: temperatura em ºC, datas)
            </li>
            <li>
              <strong>De Rácio</strong> — ordem, distâncias iguais e zero absoluto.
              Permite todas as operações. (ex.: peso, altura, rendimento)
            </li>
          </ul>
        </ContentBox>

        <ContentBox tipo="nota" titulo="Relação entre tipo de variável e escala">
          <p>
            Variáveis qualitativas usam escalas nominal ou ordinal.
            Variáveis quantitativas usam escalas de intervalo ou rácio.
          </p>
        </ContentBox>

        <ContentBox tipo="ex" titulo="Exemplos de classificação">
          <ul>
            <li>«Temperatura em °C» → quantitativa contínua, escala de intervalo.</li>
            <li>«Número de erros num teste» → quantitativa discreta, escala de rácio.</li>
            <li>«Nível de escolaridade» → qualitativa ordinal.</li>
            <li>«Cor dos olhos» → qualitativa nominal.</li>
          </ul>
        </ContentBox>

        <QuizSection
          quiz-id="quiz-estat1-var"
          :questions="qVar"
          @completed="(s,t,p) => { store.markSectionDone('estat-variaveis'); store.markQuizDone('quiz-estat1-var', s, t, p) }"
        />
      </section>

      <!-- ─────────────────────────────── 3. Amostragem ─── -->
      <section id="estat-amostragem" class="content-section">
        <h2>3. Métodos de Amostragem</h2>

        <ContentBox tipo="def" titulo="Amostragem">
          <p>
            <strong>Amostragem</strong> é o processo de selecionar um subconjunto (amostra)
            da população, de forma a que as conclusões obtidas possam ser generalizadas com
            rigor para toda a população.
          </p>
          <p>
            As fases do processo são: (1) definir a população-alvo; (2) definir a base de
            sondagem; (3) escolher o método; (4) determinar a dimensão $n$; (5) recolher dados.
          </p>
        </ContentBox>

        <ContentBox tipo="def" titulo="Amostragem Aleatória Simples (AAS)">
          <p>
            Cada elemento da população tem <strong>igual probabilidade</strong> de ser
            selecionado. Feita sem reposição, por sorteio ou tabela de números aleatórios.
          </p>
        </ContentBox>

        <ContentBox tipo="def" titulo="Amostragem Sistemática">
          <p>
            Os elementos são numerados de $1$ a $N$. Define-se o intervalo
            $k = \lfloor N/n \rfloor$. Sorteia-se aleatoriamente o primeiro elemento
            $r \in \{1,\ldots,k\}$ e depois seleccionam-se $r, r+k, r+2k, \ldots$
          </p>
        </ContentBox>

        <ContentBox tipo="def" titulo="Amostragem por Clusters (Conglomerados)">
          <p>
            A população divide-se em <strong>grupos heterogéneos</strong> (clusters).
            Selecionam-se aleatoriamente alguns clusters e recolhem-se dados de
            <em>todos</em> os elementos dentro dos clusters selecionados.
          </p>
        </ContentBox>

        <ContentBox tipo="def" titulo="Amostragem Estratificada">
          <p>
            A população divide-se em <strong>subgrupos homogéneos</strong> (estratos) com base
            numa característica relevante. Extrai-se uma amostra aleatória simples de
            <em>cada estrato</em>, proporcionalmente à sua dimensão.
          </p>
        </ContentBox>

        <ContentBox tipo="nota" titulo="Comparação: Clusters vs. Estratificada">
          <ul>
            <li>
              <strong>Clusters</strong>: grupos <em>heterogéneos</em> internamente;
              seleccionam-se grupos completos.
            </li>
            <li>
              <strong>Estratificada</strong>: grupos <em>homogéneos</em> internamente;
              selecionam-se elementos dentro de cada grupo.
            </li>
          </ul>
        </ContentBox>

        <ContentBox tipo="nota" titulo="Métodos não probabilísticos">
          <p>
            Existem também métodos não probabilísticos (conveniência, quotas, snowball),
            onde nem todos os elementos têm igual probabilidade de seleção. São mais fáceis
            de implementar mas menos rigorosos para inferência.
          </p>
        </ContentBox>

        <QuizSection
          quiz-id="quiz-estat1-amos"
          :questions="qAmos"
          @completed="(s,t,p) => { store.markSectionDone('estat-amostragem'); store.markQuizDone('quiz-estat1-amos', s, t, p) }"
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

defineProps({ drawerOpen: Boolean })
defineEmits(['close-drawer'])

const store = useProgressStore()
useMathJax()

const sections = [
  { id: 'estat-conceitos',  label: '1. Conceitos Fundamentais' },
  { id: 'estat-variaveis',  label: '2. Tipos de Variáveis' },
  { id: 'estat-amostragem', label: '3. Métodos de Amostragem' },
]

const activeSection = ref('estat-conceitos')

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

// ── Quiz data (answers from LaTeX: B,D,B,C,B,B,B,A,C,B → índices 1,3,1,2,1,1,1,0,2,1) ─────────

const qConc = [
  {
    text: 'O que distingue <em>população</em> de <em>amostra</em>?',
    options: [
      'A população é sempre de maior dimensão que a amostra.',
      'A população engloba todos os elementos com a característica em estudo; a amostra é um subconjunto.',
      'A amostra é sempre representativa da população.',
      'A população refere-se apenas a pessoas.',
    ],
    correct: 1,
    feedbackCorrect: 'Correto! A população é o conjunto completo; a amostra é um subconjunto selecionado para análise.',
    feedbackWrong: 'A população é o conjunto de TODOS os elementos; a amostra é apenas um subconjunto.',
  },
  {
    text: 'Um <em>parâmetro</em> é uma medida que descreve:',
    options: ['A amostra recolhida.', 'O estimador calculado.', 'O erro amostral.', 'A população.'],
    correct: 3,
    feedbackCorrect: 'Correto! Um parâmetro descreve a população (ex.: $\\mu$, $\\sigma$).',
    feedbackWrong: 'Parâmetro → população (ex.: média $\\mu$). Estatística → amostra (ex.: $\\bar{x}$).',
  },
  {
    text: 'Uma variável quantitativa contínua pode assumir:',
    options: [
      'Apenas valores inteiros.',
      'Um número finito de valores distintos.',
      'Qualquer valor num intervalo real.',
      'Apenas valores positivos.',
    ],
    correct: 2,
    feedbackCorrect: 'Correto! Variáveis contínuas assumem qualquer valor num intervalo real.',
    feedbackWrong: 'Contínua = qualquer valor num intervalo real (ex.: altura = 1,732 m).',
  },
]

const qVar = [
  {
    text: 'A variável «número de carros produzidos por dia» é:',
    options: [
      'Qualitativa nominal.',
      'Qualitativa ordinal.',
      'Quantitativa contínua.',
      'Quantitativa discreta.',
    ],
    correct: 3,
    feedbackCorrect: 'Correto! Número de carros é inteiro e contável → quantitativa discreta.',
    feedbackWrong: 'Número de carros toma valores inteiros (0, 1, 2, …) → quantitativa discreta.',
  },
  {
    text: 'Uma escala que permite ordenar categorias mas sem distâncias mensuráveis é:',
    options: ['Nominal.', 'Ordinal.', 'De intervalo.', 'De rácio.'],
    correct: 1,
    feedbackCorrect: 'Correto! A escala ordinal permite ordenação sem distâncias iguais.',
    feedbackWrong: 'Ordinal = ordem sem distâncias quantificáveis (ex.: satisfação Baixa/Média/Alta).',
  },
  {
    text: 'Qual das seguintes é qualitativa nominal?',
    options: [
      'Temperatura em graus Celsius.',
      'Nível de escolaridade (Básico, Secundário, Superior).',
      'Cor dos olhos.',
      'Número de filhos.',
    ],
    correct: 2,
    feedbackCorrect: 'Correto! Cor dos olhos é uma categoria sem ordem → nominal.',
    feedbackWrong: 'Cor dos olhos não tem ordem natural nem sentido numérico → qualitativa nominal.',
  },
]

const qAmos = [
  {
    text: 'Na amostragem estratificada:',
    options: [
      'Seleciona-se um elemento inicial aleatório e depois cada $k$-ésimo.',
      'A população divide-se em grupos homogéneos e retira-se uma AAS de cada.',
      'Selecionam-se grupos completos (clusters) aleatoriamente.',
      'Cada elemento tem a mesma probabilidade, sem divisão prévia.',
    ],
    correct: 1,
    feedbackCorrect: 'Correto! Estratificada = estratos homogéneos + AAS dentro de cada estrato.',
    feedbackWrong: 'Estratificada: grupos homogéneos (estratos) + AAS dentro de cada um.',
  },
  {
    text: 'Amostragem sistemática com $N=500$ e $n=25$. O salto $k$ é:',
    options: ['10.', '20.', '25.', '50.'],
    correct: 1,
    feedbackCorrect: 'Correto! $k = \\lfloor 500/25 \\rfloor = 20$.',
    feedbackWrong: '$k = \\lfloor N/n \\rfloor = \\lfloor 500/25 \\rfloor = 20$.',
  },
  {
    text: 'A amostragem por clusters difere da estratificada porque:',
    options: [
      'Os grupos são heterogéneos internamente e selecionam-se grupos completos.',
      'Na clusters cada elemento é selecionado individualmente dentro do grupo.',
      'Os grupos são homogéneos internamente, tal como na estratificada.',
      'Não há diferença prática.',
    ],
    correct: 0,
    feedbackCorrect: 'Correto! Clusters = grupos heterogéneos selecionados por inteiro; estratificada = grupos homogéneos com AAS dentro.',
    feedbackWrong: 'Clusters: grupos heterogéneos, seleciona grupos completos. Estratificada: grupos homogéneos, seleciona elementos.',
  },
]
</script>
