import { pwa } from './utils/config/pwa'
import { URLS, apolloClientConfig } from './utils/constants'
import * as fs from 'fs'
import { sentryVitePlugin } from '@sentry/vite-plugin'

const baseUrl = process.env.BASE_URL || 'http://localhost:9090'

export default defineNuxtConfig({
  server: {
    port: 9090, // default: 3000
    host: '0.0.0.0',
  },

  sourcemap: false,

  vue: {
    compilerOptions: {
      // model-viewer from ModelMedia throw warning
      isCustomElement: (tag) => tag.includes('model-viewer'),
    },
  },

  vite: {
    build: {
      sourcemap: false,
    },
    plugins: [
      process.env.NODE_ENV === 'development'
        ? null
        : sentryVitePlugin({
            org: 'kodadot',
            project: 'nft-gallery',
            authToken: process.env.SENTRY_AUTH_TOKEN,
          }),
    ],
  },

  nitro: {
    publicAssets: [],
  },

  // 🔧 Cloudflare build
  experimental: {
    appManifest: false,
  },

  // Global page headers: https://nuxt.com/docs/api/configuration/nuxt-config#head
  app: {
    head: {
      title: 'KodaDot - One Stop Shop for Polkadot NFTs',
      titleTemplate: '%s | One Stop Shop for Polkadot NFTs',
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        { name: 'name', content: 'KodaDot NFT Marketplace' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' },
        { property: 'og:locale', content: 'en_US' },
        { hid: 'og:type', property: 'og:type', content: 'website' },
        baseUrl === URLS.koda.baseUrl
          ? {}
          : {
              hid: 'robots',
              property: 'robots',
              content: 'noindex',
            },
      ],
      link: [
        { rel: 'icon', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png',
        },
        { rel: 'icon', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', sizes: '16x16', href: '/favicon-16x16.png' },
      ],
      script: [
        {
          src: 'https://kit.fontawesome.com/54f29b7997.js',
          crossorigin: 'anonymous',
          async: true,
        },
        {
          src: `https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS_ID}`,
          async: true,
        },
        {
          innerHTML: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', '${process.env.GOOGLE_ANALYTICS_ID}');
        `,
          type: 'text/javascript',
        },
      ],
    },
  },

  // Global CSS: https://nuxt.com/docs/api/nuxt-config#components
  css: [
    '@/assets/styles/index.scss',
    '@fortawesome/fontawesome-svg-core/styles.css',
  ],

  // Auto import components: https://nuxt.com/docs/api/nuxt-config#components
  components: {
    dirs: [
      // ordering matters
      {
        path: '~/components/shared',
        extensions: ['vue'],
        pathPrefix: false,
      },
      {
        path: '~/components/common',
        extensions: ['vue'],
        pathPrefix: false,
      },
      {
        path: '~/components',
        extensions: ['vue'],
      },
      {
        path: '~/components/landing',
        extensions: ['vue'],
      },
      {
        path: '~/components/metadata',
        extensions: ['vue'],
      },
      {
        path: '~/components/rmrk',
        extensions: ['vue'],
      },
      {
        path: '~/components/series',
        extensions: ['vue'],
      },
      {
        path: '~/components/settings',
        extensions: ['vue'],
      },
      {
        path: '~/components/spotlight',
        extensions: ['vue'],
      },
      {
        path: '~/components/transfer',
        extensions: ['vue'],
      },
      {
        path: '~/components/unique',
        extensions: ['vue'],
      },
    ],
  },

  // Modules: https://nuxt.com/docs/api/nuxt-config#components
  modules: [
    '@nuxtjs/apollo',
    '@nuxtjs/i18n',
    // '@nuxtjs/sentry',
    '@vite-pwa/nuxt',
    '@nuxtjs/color-mode',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxt/content',
    'nuxt-simple-sitemap',
    '@nuxtjs/google-fonts',
  ],

  googleFonts: {
    families: {
      'Work+Sans': {
        wght: [400, 700],
        ital: [400, 700],
      },
      'Fira+Code': {
        wght: [600, 700],
      },
    },
    display: 'swap',
    prefetch: true,
    preconnect: true,
    preload: true,
    download: false,
    inject: false,
  },

  pwa,

  i18n: {
    skipSettingLocaleOnNavigate: true,
    defaultLocale: 'en',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'lang',
      fallbackLocale: 'en',
      alwaysRedirect: true,
    },
    strategy: 'no_prefix',
    vueI18n: './utils/config/i18n.ts',
  },

  apollo: {
    clients: apolloClientConfig,
    clientConfigs: apolloClientConfig,
    // https://github.com/nuxt-community/apollo-module#options
  },

  site: {
    url: process.env.BASE_URL || 'http://localhost:9090',
    strictNuxtContentPaths: true,
  },

  sitemap: {
    sitemaps: true,
    urls: () => {
      const posts = fs.readdirSync('content/blog')
      return posts
        .map((post) => post.split('.')[0])
        .map((page) => ({
          loc: `/blog/${page}`,
          changefreq: 'weekly',
          priority: 0.8,
        }))
    },
  },

  routeRules: {
    '/ahp/collection/13': { sitemap: { changefreq: 'daily', priority: 0.3 } },
  },

  hooks: {
    sitemap: {
      generate: {
        done(nuxtInstance) {
          fs.copyFileSync(
            `${nuxtInstance.options.generate.dir}/sitemap.xml`,
            'public/sitemap.xml',
          )
        },
      },
    },
  },

  // https://nuxt.com/docs/api/nuxt-config#runtimeconfig
  runtimeConfig: {
    public: {
      prefix: process.env.URL_PREFIX || 'rmrk',
      baseUrl: process.env.BASE_URL || 'http://localhost:9090',
      googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID || '',
      dev: process.env.NODE_ENV === 'development',
      rampApiKey: process.env.RAMP_API_KEY,
      transakApiKey: process.env.TRANSAK_API_KEY || '',
      transakEnvironment: process.env.TRANSAK_ENV || 'PRODUCTION',
    },
  },
  // In case of using ssr
  // privateRuntimeConfig: {}
})
