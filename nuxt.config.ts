import routes from "./config/routes";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  build: {
    transpile: ["@vuepic/vue-datepicker"]
  },
  i18n: {
    debug: false,
    strategy: "prefix_except_default",
    parsePages: false,
    seo: true,
    defaultLocale: process.env.NUXT_MAIN_LANGUAGE || "en",
    locale: process.env.NUXT_MAIN_LANGUAGE || "en",
    fallbackLocale: process.env.NUXT_MAIN_LANGUAGE || "en",
    locales: [
      {
        code: "tr",
        name: "Türkçe"
      },
      {
        code: "en",
        name: "English"
      },
      {
        code: "ru",
        name: "Русский"
      },
      {
        code: "de",
        name: "Deutsch"
      }
    ],
    vueI18n: "./i18n.config.ts", // if you are using custom path, default
    customRoutes: "config",
    pages: routes
  },
  mapbox: {
    accessToken:
      "pk.eyJ1IjoiYmlsZXRhbmRtb3JlIiwiYSI6ImNsbWdwODgwbjJseGcza3RjNWJ2ZjNzZHYifQ.aGzH4txyahZitBEfLpYWIQ"
  },
  nitro: {
    prerender: {
      autoSubfolderIndex: false
    },
    serveStatic: true
  },
  sourcemap: { server: false, client: false },
  typescript: {
    shim: false,
    tsConfig: {
      compilerOptions: {
        verbatimModuleSyntax: false
      }
    }
  },
  runtimeConfig: {
    public: {
      BNM_ID: process.env.NUXT_BNM_ID,
      BASE_API_URL: process.env.NUXT_BASE_API_URL,
      WEBSITE_ID: process.env.NUXT_WEBSITE_ID,
      MAIN_LANGUAGE: process.env.NUXT_MAIN_LANGUAGE || "en",
      MAIN_CURRENCY: process.env.NUXT_MAIN_CURRENCY || "USD"
    }
  },
  modules: [
    "@pinia/nuxt",
    'pinia-plugin-persistedstate/nuxt',
    "nuxt-mapbox",
    "@nuxtjs/i18n"
  ], 
})
