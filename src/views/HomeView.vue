<template>
  <div class="page-layout">
    <div class="home-wrap">
      <section class="hero">
        <h1>Apontamentos Online</h1>
        <p class="subtitle">Geometria &amp; Estatística — ISCTE · 2025/2026</p>
        <p>Estuda ao teu ritmo com demos interativos, exemplos passo a passo e quizzes com feedback imediato.</p>
      </section>

      <!-- Stats -->
      <div class="stat-row">
        <div class="stat-card"><div class="stat-val">{{ store.xp }}</div><div class="stat-lbl">Pontos XP</div></div>
        <div class="stat-card"><div class="stat-val">{{ store.completedSections.length }}</div><div class="stat-lbl">Secções concluídas</div></div>
        <div class="stat-card"><div class="stat-val">{{ store.completedQuizzes.length }}</div><div class="stat-lbl">Quizzes feitos</div></div>
      </div>

      <!-- Geometria -->
      <h3 class="group-label">Geometria</h3>
      <div class="parts-grid">
        <div class="part-card available" @click="$router.push('/parte1')">
          <div class="part-num">Parte I</div>
          <h2>Vetores</h2>
          <ul>
            <li>Vetores livres e norma</li>
            <li>Soma, diferença e produto por escalar</li>
            <li>Coordenadas de vetores</li>
            <li>Produto escalar e ortogonalidade</li>
          </ul>
          <div class="progress-bar"><div class="progress-fill" :style="{ width: store.sectionProgress(p1sections) + '%' }"></div></div>
        </div>

        <div class="part-card available" @click="$router.push('/parte2')">
          <div class="part-num">Parte II</div>
          <h2>Geometria Analítica no Plano</h2>
          <ul>
            <li>Referenciais cartesianos</li>
            <li>Distância euclidiana e ponto médio</li>
            <li>Circunferência e tangentes</li>
            <li>Retas no plano</li>
          </ul>
          <div class="progress-bar"><div class="progress-fill" :style="{ width: store.sectionProgress(p2sections) + '%' }"></div></div>
        </div>

        <div class="part-card available" @click="$router.push('/parte3')">
          <div class="part-num">Parte III</div>
          <h2>Geometria no Espaço</h2>
          <ul>
            <li>Referencial cartesiano 3D</li>
            <li>Distância e ponto médio no espaço</li>
            <li>Retas no espaço</li>
            <li>Planos e posições relativas</li>
          </ul>
          <div class="progress-bar"><div class="progress-fill" :style="{ width: store.sectionProgress(p3sections) + '%' }"></div></div>
        </div>

        <div class="part-card available" @click="$router.push('/parte4')">
          <div class="part-num">Parte IV</div>
          <h2>Subconjuntos Notáveis</h2>
          <ul>
            <li>Plano mediador de um segmento</li>
            <li>Esfera — equação e tangentes</li>
            <li>Produto escalar e subconjuntos</li>
          </ul>
          <div class="progress-bar"><div class="progress-fill" :style="{ width: store.sectionProgress(p4sections) + '%' }"></div></div>
        </div>
      </div>

      <!-- Estatística -->
      <h3 class="group-label">Estatística</h3>
      <div class="parts-grid">
        <div class="part-card available" @click="$router.push('/estat1')">
          <div class="part-num">Parte V</div>
          <h2>Introdução à Estatística</h2>
          <ul>
            <li>Conceitos e terminologia</li>
            <li>Tipos de variáveis e escalas de medida</li>
            <li>Técnicas de amostragem</li>
          </ul>
          <div class="progress-bar"><div class="progress-fill" :style="{ width: store.sectionProgress(e1sections) + '%' }"></div></div>
        </div>

        <div class="part-card available" @click="$router.push('/estat2')">
          <div class="part-num">Parte VI</div>
          <h2>Estatística Descritiva Univariada</h2>
          <ul>
            <li>Tabelas e gráficos de frequência</li>
            <li>Medidas de localização (média, mediana, moda)</li>
            <li>Dispersão, forma e outliers</li>
          </ul>
          <div class="progress-bar"><div class="progress-fill" :style="{ width: store.sectionProgress(e2sections) + '%' }"></div></div>
        </div>

        <div class="part-card available" @click="$router.push('/estat3')">
          <div class="part-num">Parte VII</div>
          <h2>Estatística Descritiva Bivariada</h2>
          <ul>
            <li>Diagrama de dispersão</li>
            <li>Covariância amostral</li>
            <li>Correlação linear de Pearson</li>
          </ul>
          <div class="progress-bar"><div class="progress-fill" :style="{ width: store.sectionProgress(e3sections) + '%' }"></div></div>
        </div>
      </div>

      <!-- Badges -->
      <div class="home-badges">
        <h3>Conquistas</h3>
        <div class="badges-row">
          <BadgeCard
            v-for="b in store.BADGE_DEFS" :key="b.id"
            :badge="b" :earned="store.badges.includes(b.id)"
          />
        </div>
        <button class="reset-btn" @click="confirmReset">Reiniciar progresso</button>
      </div>

      <!-- How to use -->
      <div class="info-box">
        <h4>Como usar estes apontamentos</h4>
        <ul>
          <li>Lê cada conceito e experimenta os <strong>demos interativos</strong> — arrasta, muda parâmetros.</li>
          <li>Responde aos <strong>quizzes</strong> — o feedback explica os erros.</li>
          <li>Ganha <strong>XP</strong> e desbloqueia <strong>conquistas</strong>.</li>
          <li>O teu progresso fica guardado automaticamente.</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useProgressStore } from '../stores/progress.js'
import BadgeCard from '../components/BadgeCard.vue'
const store = useProgressStore()

const p1sections = ['vec-livres','vec-ops','vec-coord','vec-pontos','prod-escalar']
const p2sections = ['ref-cart','dist-pmedio','circ','retas','retas-repr']
const p3sections = ['geo3-ref-cart','geo3-dist','geo3-retas','geo3-planos','geo3-relativas']
const p4sections = ['geo4-mediador','geo4-esfera','geo4-subconj']
const e1sections = ['estat-conceitos','estat-variaveis','estat-amostragem']
const e2sections = ['estat-tabelas','estat-graficos','estat-localizacao','estat-dispersao','estat-forma','estat-outliers']
const e3sections = ['estat-bivariada','estat-covariancia','estat-pearson']

function confirmReset() {
  if (confirm('Tens a certeza? Todo o progresso será apagado.')) store.reset()
}
</script>

<style scoped>
.group-label {
  font-size: .7rem; font-weight: 700; text-transform: uppercase;
  letter-spacing: .1em; color: var(--text-muted);
  max-width: 900px; margin: 2rem auto 0;
  padding-bottom: .5rem; border-bottom: 2px solid var(--border);
}
</style>
