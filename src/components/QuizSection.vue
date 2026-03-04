<template>
  <div class="quiz-container">
    <div class="quiz-header">
      <span class="quiz-badge">Quiz</span>
      <span class="quiz-xp-label">Até +20 XP</span>
    </div>

    <div class="quiz-questions">
      <div v-for="(q, qi) in questions" :key="qi" class="quiz-question">
        <div class="q-text" v-html="`${qi + 1}. ${q.text}`" />

        <div class="quiz-options">
          <div v-for="(opt, oi) in q.options" :key="oi"
               class="quiz-option"
               :class="optClass(qi, oi)"
               @click="selectOption(qi, oi)">
            <span class="opt-letter">{{ letters[oi] }}</span>
            <span v-html="opt" />
          </div>
        </div>

        <Transition name="fb">
          <div v-if="submitted && answers[qi] !== null"
               class="quiz-feedback"
               :class="answers[qi] === q.correct ? 'feedback-correct' : 'feedback-wrong'"
               v-html="answers[qi] === q.correct ? '✓ ' + q.feedbackCorrect : '✗ ' + q.feedbackWrong" />
        </Transition>
      </div>
    </div>

    <div class="quiz-actions">
      <button class="quiz-submit" :disabled="!allAnswered || submitted" @click="submit">
        Verificar respostas
      </button>
      <button v-if="submitted && score < questions.length" class="quiz-retry" @click="retry">
        Tentar novamente
      </button>
    </div>

    <Transition name="fb">
      <div v-if="submitted" class="quiz-result" :class="resultClass">
        {{ resultMsg }}
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useProgressStore } from '../stores/progress.js'
import { useMathJax } from '../composables/useMathJax.js'

const props = defineProps({
  quizId:    { type: String,  required: true },
  questions: { type: Array,   required: true }
})
const emit = defineEmits(['completed'])

const store    = useProgressStore()
const { typeset } = useMathJax()

const letters  = ['A', 'B', 'C', 'D']
const answers  = ref(new Array(props.questions.length).fill(null))
const submitted = ref(false)
const score    = ref(0)

const allAnswered = computed(() => answers.value.every(a => a !== null))

function selectOption(qi, oi) {
  if (submitted.value) return
  answers.value[qi] = oi
}

function optClass(qi, oi) {
  if (!submitted.value) {
    return { selected: answers.value[qi] === oi, disabled: false }
  }
  const correct = props.questions[qi].correct
  return {
    disabled: true,
    correct:  oi === correct,
    wrong:    oi === answers.value[qi] && oi !== correct
  }
}

async function submit() {
  score.value = props.questions.filter((q, i) => answers.value[i] === q.correct).length
  submitted.value = true
  const isPerfect = score.value === props.questions.length
  store.markQuizDone(props.quizId, score.value, props.questions.length, isPerfect)
  emit('completed', score.value, props.questions.length, isPerfect)
  await typeset()
}

function retry() {
  answers.value  = new Array(props.questions.length).fill(null)
  submitted.value = false
  score.value    = 0
}

const resultClass = computed(() => {
  const pct = score.value / props.questions.length
  return pct === 1 ? 'result-perfect' : pct >= .5 ? 'result-good' : 'result-retry'
})

const resultMsg = computed(() => {
  const pct = score.value / props.questions.length
  const xp  = Math.round(pct * 20)
  if (pct === 1) return `🎉 Perfeito! ${score.value}/${props.questions.length} — +${xp} XP`
  if (pct >= .5) return `👍 Bom! ${score.value}/${props.questions.length} — +${xp} XP`
  return `${score.value}/${props.questions.length} — Tenta novamente! +${xp} XP`
})
</script>

<style scoped>
.fb-enter-active, .fb-leave-active { transition: opacity .2s, transform .2s; }
.fb-enter-from, .fb-leave-to       { opacity: 0; transform: translateY(-4px); }
</style>
