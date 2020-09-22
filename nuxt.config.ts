import type { NuxtConfig } from '@nuxt/types'

export default <NuxtConfig>{
  head: {
    title: 'incubator',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
  },

  buildModules: ['@nuxt/typescript-build', '@nuxtjs/stylelint-module'],
}
