module.exports = {
  pwa: {
    name: 'MetaMorfosi',
    themeColor: '#FF9800',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'public/service-worker.js'
    }
  },

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'ru',
      localeDir: 'locales',
      enableInSFC: true
    }
  }
}
