import { onMounted, onUnmounted } from 'vue'
import p5 from 'p5'

/**
 * Mounts a p5 sketch inside `containerRef`.
 * `sketchFn(p, containerRef)` receives the p5 instance and the container.
 * Returns `{ getInstance }` so callers can access the live p5 instance.
 */
export function useP5(containerRef, sketchFn) {
  let instance = null

  onMounted(() => {
    if (!containerRef.value) return
    instance = new p5((p) => sketchFn(p, containerRef), containerRef.value)
  })

  onUnmounted(() => {
    instance?.remove()
    instance = null
  })

  return {
    getInstance: () => instance
  }
}
