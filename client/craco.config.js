const path = require('path')
module.exports = {
  style: {
    postcss: {
      plugins: [require('tailwindcss'), require('autoprefixer')],
    },
  },
  webpack: {
    alias: {
      '@': path.resolve('./src'),
      '@components': path.resolve('./src/components/'),
      '@contexts': path.resolve('./src/contexts/'),
      '@pages': path.resolve('./src/pages/'),
      '@hooks': path.resolve('./src/hooks/'),
      '@services': path.resolve('./src/services/'),
      '@containers': path.resolve('./src/containers/'),
      '@utils': path.resolve('./src/utils/'),
      '@config': path.resolve('./src/config/'),
    },
  },
}
