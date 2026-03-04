import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

const STORAGE_KEY = 'ge_progress_v2'

const BADGE_DEFS = [
  { id: 'first-quiz',   category: 'quiz', emoji: '🎯', title: 'Primeiro Quiz',
    hint: 'Completa qualquer quiz pela primeira vez',
    cond: s => s.completedQuizzes.length >= 1 },
  { id: 'perfect-quiz', category: 'quiz', emoji: '⭐', title: 'Quiz Perfeito',
    hint: 'Obtém 100% numa tentativa de qualquer quiz',
    cond: s => s.badges.includes('perfect-quiz') },
  { id: 'vec-master',   category: 'geo',  emoji: '➡️',  title: 'Mestre dos Vetores',
    hint: 'Completa todas as secções de Vetores (Parte I)',
    cond: s => ['vec-livres','vec-ops','vec-coord','vec-pontos','prod-escalar'].every(x => s.completedSections.includes(x)) },
  { id: 'geo-plane',    category: 'geo',  emoji: '📐', title: 'Geómetra do Plano',
    hint: 'Completa toda a Geometria Analítica no Plano (Parte II)',
    cond: s => ['ref-cart','dist-pmedio','circ','retas','retas-repr'].every(x => s.completedSections.includes(x)) },
  { id: 'xp-100',       category: 'xp',   emoji: '💯', title: '100 XP',
    hint: 'Acumula 100 pontos XP no total',
    cond: s => s.xp >= 100 },
  { id: 'xp-250',       category: 'xp',   emoji: '🏆', title: '250 XP',
    hint: 'Acumula 250 pontos XP no total',
    cond: s => s.xp >= 250 },
  { id: 'geo-space',    category: 'geo',  emoji: '🌐', title: 'Geómetra do Espaço',
    hint: 'Completa toda a Geometria no Espaço (Parte III)',
    cond: s => ['geo3-ref-cart','geo3-dist','geo3-retas','geo3-planos','geo3-relativas'].every(x => s.completedSections.includes(x)) },
  { id: 'stat-intro',   category: 'stat', emoji: '📊', title: 'Intro à Estatística',
    hint: 'Completa a Introdução à Estatística (Estat. I)',
    cond: s => ['estat-conceitos','estat-variaveis','estat-amostragem'].every(x => s.completedSections.includes(x)) },
  { id: 'stat-master',  category: 'stat', emoji: '🎓', title: 'Mestre da Estatística',
    hint: 'Completa todas as secções de Estatística',
    cond: s => ['estat-tabelas','estat-graficos','estat-localizacao','estat-dispersao','estat-forma','estat-outliers','estat-bivariada','estat-covariancia','estat-pearson'].every(x => s.completedSections.includes(x)) },
]

function loadState() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || defaultState()
  } catch { return defaultState() }
}

function defaultState() {
  return { xp: 0, completedSections: [], completedQuizzes: [], badges: [] }
}

export const useProgressStore = defineStore('progress', () => {
  const saved = loadState()
  const xp                = ref(saved.xp)
  const completedSections = ref(saved.completedSections)
  const completedQuizzes  = ref(saved.completedQuizzes)
  const badges            = ref(saved.badges)
  const toastMsg          = ref('')
  const toastVisible      = ref(false)
  let toastTimer          = null
  const badgeToast        = ref(null)   // null | badge definition object
  let badgeToastTimer     = null

  // Persist to localStorage on any change
  watch([xp, completedSections, completedQuizzes, badges], () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      xp: xp.value,
      completedSections: completedSections.value,
      completedQuizzes: completedQuizzes.value,
      badges: badges.value
    }))
  }, { deep: true })

  function showToast(msg) {
    toastMsg.value = msg
    toastVisible.value = true
    clearTimeout(toastTimer)
    toastTimer = setTimeout(() => { toastVisible.value = false }, 2600)
  }

  function addXP(amount, reason) {
    xp.value += amount
    showToast(`+${amount} XP — ${reason}`)
    checkBadges()
  }

  function markSectionDone(sectionId) {
    if (!completedSections.value.includes(sectionId)) {
      completedSections.value = [...completedSections.value, sectionId]
      addXP(10, 'Secção completa!')
    }
  }

  function markQuizDone(quizId, score, total, isPerfect) {
    if (isPerfect && !badges.value.includes('perfect-quiz')) {
      badges.value = [...badges.value, 'perfect-quiz']
    }
    if (!completedQuizzes.value.includes(quizId)) {
      completedQuizzes.value = [...completedQuizzes.value, quizId]
    }
    const earned = Math.round((score / total) * 20)
    addXP(earned, `Quiz (${score}/${total} corretas)`)
    checkBadges()
  }

  function checkBadges() {
    const state = {
      xp: xp.value,
      completedSections: completedSections.value,
      completedQuizzes: completedQuizzes.value,
      badges: badges.value
    }
    BADGE_DEFS.forEach(def => {
      if (!badges.value.includes(def.id) && def.cond(state)) {
        badges.value = [...badges.value, def.id]
        // Badge popup (larger, celebratory)
        clearTimeout(badgeToastTimer)
        badgeToast.value = def
        badgeToastTimer = setTimeout(() => { badgeToast.value = null }, 4500)
      }
    })
  }

  function reset() {
    xp.value = 0
    completedSections.value = []
    completedQuizzes.value  = []
    badges.value            = []
  }

  function sectionProgress(sectionIds) {
    const done = sectionIds.filter(id => completedSections.value.includes(id)).length
    return Math.round((done / sectionIds.length) * 100)
  }

  return {
    xp, completedSections, completedQuizzes, badges,
    toastMsg, toastVisible,
    badgeToast,
    BADGE_DEFS,
    addXP, markSectionDone, markQuizDone, checkBadges, reset, sectionProgress
  }
})
