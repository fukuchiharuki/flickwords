// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  modules: ['@vite-pwa/nuxt'],
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Flickwords',
      short_name: 'Fw',
      description: 'A flick-typing Japanese word game.',
      theme_color: '#333333',
      background_color: '#ffffff',
      display: 'standalone',
      orientation: 'portrait',
      scope: 'https://fukuchiharuki.me/flickwords/',
      start_url: 'https://fukuchiharuki.me/flickwords/',
      icons: [
        {
          src: 'icon/maskable_icon_x48.png',
          sizes: '48x48',
          type: 'image/png',
          purpose: 'any maskable'
        },
        {
          src: 'icon/maskable_icon_x72.png',
          sizes: '72x72',
          type: 'image/png',
          purpose: 'any maskable'
        },
        {
          src: 'icon/maskable_icon_x96.png',
          sizes: '96x96',
          type: 'image/png',
          purpose: 'any maskable'
        },
        {
          src: 'icon/maskable_icon_x128.png',
          sizes: '128x128',
          type: 'image/png',
          purpose: 'any maskable'
        },
        {
          src: 'icon/maskable_icon_x192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'any maskable'
        },
        {
          src: 'icon/maskable_icon_x384.png',
          sizes: '384x384',
          type: 'image/png',
          purpose: 'any maskable'
        },
        {
          src: 'icon/maskable_icon_x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable'
        }
      ]
    }
  },
  app: {
    baseURL: '/flickwords/',
    head: {
      title: 'Flickwords',
      meta: [
        { name: 'description', content: 'A flick-typing Japanese word game.' },
        {
          name: 'keywords',
          content: 'flickwords,flick,typing,japanese,word,game,wordle'
        }
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/vnd.microsoft.icon',
          href: '/flickwords/favicon.ico'
        },
        {
          rel: 'stylesheet',
          href: 'https://unpkg.com/balloon-css/balloon.min.css'
        }
      ],
      script: [
        {
          async: true,
          src: 'https://www.googletagmanager.com/gtag/js?id=G-HW3SJX60GZ'
        },
        {
          innerHTML: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-HW3SJX60GZ');`
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
  },
  runtimeConfig: {
    public: {
      dictionariesBaseURL: 'https://fukuchiharuki.me/kana345/'
    }
  }
})
