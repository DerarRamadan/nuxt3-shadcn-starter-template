import { defineNuxtConfig } from 'nuxt/config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  modules: [// Keep if you plan to use Nuxt Image for optimization
  '@nuxt/image', // Keep if you use Pinia for state management
  '@pinia/nuxt', // Keep if you use VueUse composables
  '@vueuse/nuxt', // 'shadcn-nuxt' // REMOVED
  '@nuxtjs/tailwindcss', 
  '@nuxtjs/i18n'],

  // REMOVED shadcn configuration block
i18n: {
  strategy: 'prefix_except_default', // Keep routing strategy
 locales: [
      {
        code: 'en',
        iso: 'en-US',
        name: 'English',
        file: 'en.json',
        dir: 'ltr'
      },
      {
        code: 'fr',
        iso: 'fr-FR',
        name: 'Français',
        file: 'fr.json',
        dir: 'ltr'
      },
      {
        code: 'ar',
        iso: 'ar-LY',
        name: 'العربية',
        file: 'ar.json',
        dir: 'rtl'
      }
    ],
  langDir: 'locales/',            // Correct path to locales
  defaultLocale: 'ar',            // Your default
  detectBrowserLanguage: false,
  // NO lazy loading, NO iso codes, NO name - just the essentials
},
  tailwindcss: {
    // Ensure these paths are correct for your project
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config.js', // Make sure this matches your actual Tailwind config filename (e.g., .js or .ts)
  }
})