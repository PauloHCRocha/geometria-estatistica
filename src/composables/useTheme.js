import { ref } from 'vue'

// Singleton — shared across all components
const dark = ref(localStorage.getItem('theme') === 'dark')

function apply(isDark) {
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
  localStorage.setItem('theme', isDark ? 'dark' : 'light')
}

// Apply immediately when module is first loaded
apply(dark.value)

export function useTheme() {
  function toggle() {
    dark.value = !dark.value
    apply(dark.value)
  }
  return { dark, toggle }
}
