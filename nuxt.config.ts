// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  app: {
    baseURL: '/',
    head: {
      title: 'Flickwords',
      meta: [
        { name: 'description', content: 'A flick input Japanese word game.' },
        {
          name: 'keywords',
          content: 'flickwords,flick,input,japanese,word,game,wordle'
        }
      ],
      link: [
        { rel: 'icon', type: 'image/vnd.microsoft.icon', href: '/favicon.ico' },
        {
          rel: 'stylesheet',
          href: 'https://unpkg.com/balloon-css/balloon.min.css'
        }
      ],
      script: [
        {
          async: true,
          src: 'https://www.googletagmanager.com/gtag/js?id=G-8R8VVHM76P'
        },
        {
          innerHTML: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-8R8VVHM76P');`
        }
      ]
    }
  },
  css: ['@/assets/styles/main.scss'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/styles/_variables.scss";'
        }
      }
    }
  }
})
