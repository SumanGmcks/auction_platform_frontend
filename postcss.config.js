module.exports = {
  plugins: [
    require('tailwindcss'),  
    require('autoprefixer'),
    require('postcss-preset-env')({
      stage: 0,  
      features: {
        'custom-properties': false  
      }
    }),
    require('cssnano')({
      preset: ['default', {
        discardComments: { removeAll: true },
        normalizeWhitespace: true,
        calc: false,  
        convertValues: false, 
      }]
    }),
  ],
};