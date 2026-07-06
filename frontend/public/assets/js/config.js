'use strict';

// Digital HR - Vuexy Config (customizer disabled for clean HR app)
window.config = {
  colors: {
    primary: '#696cff',
    secondary: '#808390',
    success: '#28c76f',
    info: '#00cfe8',
    warning: '#ff9f43',
    danger: '#ff4c51',
    dark: '#4b4b4b',
    black: '#000',
    white: '#fff',
    cardColor: '#fff',
    bodyBg: '#f5f5f9',
    bodyColor: '#6d6b77',
    headingColor: '#444050',
    textMuted: '#acaab1',
    borderColor: '#e6e6e8'
  },
  colors_label: {
    primary: '#696cff29',
    secondary: '#a8aaae29',
    success: '#28c76f29',
    info: '#00cfe829',
    warning: '#ff9f4329',
    danger: '#ff4c5129',
    dark: '#4b4b4b29'
  },
  colors_dark: {
    cardColor: '#2f3349',
    bodyBg: '#25293c',
    bodyColor: '#b2b1cb',
    headingColor: '#cfcce4',
    textMuted: '#8285a0',
    borderColor: '#565b79'
  },
  enableMenuLocalStorage: true
};

window.assetsPath = document.documentElement.getAttribute('data-assets-path');
window.templateName = document.documentElement.getAttribute('data-template');
window.rtlSupport = false; // LTR only

if (typeof TemplateCustomizer !== 'undefined') {
  window.templateCustomizer = new TemplateCustomizer({
    cssPath: window.assetsPath + 'vendor/css/',
    themesPath: window.assetsPath + 'vendor/css/',
    displayCustomizer: false,
    lang: 'en',
    controls: ['style', 'layoutCollapsed']
  });
}
