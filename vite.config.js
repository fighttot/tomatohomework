// Plugins
import vue from '@vitejs/plugin-vue'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import { VitePluginRadar } from 'vite-plugin-radar'
import { VitePWA } from 'vite-plugin-pwa'

// Utilities
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue({
      template: { transformAssetUrls }
    }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
    vuetify({
      autoImport: true,
      styles: {
        configFile: 'src/styles/settings.scss',
      },
    }),
    VitePluginRadar({
      analytics: {
        id: 'G-YG76536GH6'
      }
    }),
    VitePWA({
      //設定快取更新方式
      //設定自動更新
      registerType: 'autoUpdate',
      workbox: {
        //自動清除過期快取
        cleanupOutdatedCaches: true,
        //忽略網址參數
        ignoreURLParametersMatching: [/^[0-9a-zA-Z]*$/],
        //設定快取檔案格式
        globPatterns: [
          '**/*.{html,css,js,mp3,woff,eot,ttf,woff2,ico,png,jpg,jpeg,svg,gif}**'
        ]
      },
      manifest: {
        name: '絕唱番茄鐘',
        short_name: '絕唱番茄鐘',
        theme_color: '#9454c4',
        background_color: '#9454c4',
        scope: './',
        start_url: './',
        display: 'standalone',
        icons: [
          {
            "src": "./android-chrome-192x192.png",
            "sizes": "192x192",
            "type": "image/png"
          },
          {
            "src": "./android-chrome-512x512.png",
            "sizes": "512x512",
            "type": "image/png"
          }
        ]
      }
    })
  ],
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ],
  },
  server: {
    port: 3000,
  },
})
