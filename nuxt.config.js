// todo: fix vuetify types
// @ts-ignore
import colors from "vuetify/es5/util/colors"

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`
})

// todo: remove vue-smooth-dnd from project

const env = process.env
const nodeEnv = env.NODE_ENV === "production" ? "production" : "development"
const isDev = nodeEnv !== "production"

export default {

  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: "static",

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: "%s - SDO PROF",
    title: "Learning management system",
    htmlAttrs: {
      lang: "ru"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/sdoprof-favicon.png" },
      // add google montserrat font / bad practice
      // todo: download and connect normally montserrat font
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossorigin: true
      },
      {
        rel: "stylesheet",
        href: 'https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap'
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
      },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "~/assets/index.css",
    "~/assets/transition.css",
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/api/index",
    "~/plugins/axios",
    "~/plugins/rules",
    "~/plugins/filters",
    "~/plugins/v-mask",
    "~/plugins/masks",
    "~/plugins/configs",
    "~/plugins/settings",
    "~/plugins/confirm-modal"
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    "@nuxt/typescript-build",
    // https://go.nuxtjs.dev/stylelint
    "@nuxtjs/stylelint-module",
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify",
    "@nuxt/components",
    "nuxt-typed-vuex"
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    "@nuxtjs/auth-next",
    [
      "@nuxtjs/dotenv",
      {
        filename: `.env.${process.env.NODE_ENV}`
      }
    ],
    "@nuxtjs/toast",
    "portal-vue/nuxt"
  ],

  toast: {
    position: "bottom-left",
    duration: 20000,
    iconPack: "mdi",
    register: [
      {
        name: "save",
        message: "Сохранено",
        options: { type: "success", icon: "mdi-check" }
      },
      {
        name: "create",
        message: "Создано",
        options: { type: "success", icon: "mdi-check" }
      },
      {
        name: "update",
        message: "Обновлено",
        options: { type: "success", icon: "mdi-check" }
      },
      {
        name: "remove",
        message: "Удалено",
        options: { type: "error", icon: "mdi-trash-can-outline" }
      },
    ]
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    browserBaseURL: env.AXIOS_BASE_URL,
    credentials: true
  },

  auth: {
    plugins: [
      "~/plugins/auth",
      { src: '~/plugins/file-pond', mode: 'client' },
      { src: '~/plugins/pdf-embed', mode: 'client' }
    ],
    redirect: {
      // login: '/',
      // logout: '/',
      // home: false,
      // callback: false
    },
    strategies: {
      laravelSanctum: {
        provider: "laravel/sanctum",
        url: "/api",
        endpoints: {
          csrf: {
            url: "/csrf"
          },
          login: {
            url: "/login"
          },
          logout: {
            url: "/logout"
          },
          user: {
            url: "/user"
          }
        }
      }
    }
  },

  router: {
    middleware: isDev ? [] : ["auth"]
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: [
      "~/assets/variables.scss"
    ],
    theme: {
      // dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  typescript: {
    typeCheck: {
      eslint: {
        files: "./**/*.{ts,js,vue}"
      }
    }
  },

  env: {
    // @ts-ignore
    prod: !isDev
  }

}
