import { onMounted, nextTick } from 'vue'

export function useMathJax() {
  async function typeset() {
    await nextTick()
    if (window.MathJax?.typesetPromise) {
      await window.MathJax.typesetPromise()
    }
  }
  onMounted(typeset)
  return { typeset }
}
