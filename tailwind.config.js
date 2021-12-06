module.exports = {
  purge   : ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme   : {
    extend: {
      colors: {
        retro: {
          DEFAULT: '#969E7B',
          50     : '#EAECE5',
          100    : '#E1E3D9',
          200    : '#CED2C2',
          300    : '#BBC1AA',
          400    : '#A9AF93',
          500    : '#969E7B',
          600    : '#7A825F',
          700    : '#5B6148',
          800    : '#3D4130',
          900    : '#1F2118',
        },
        pokedex: {
          DEFAULT: '#E63740',
          50     : '#FADADC',
          100    : '#F8C8CB',
          200    : '#F4A4A8',
          300    : '#EF8085',
          400    : '#EB5B63',
          500    : '#E63740',
          600    : '#CB1923',
          700    : '#9A131A',
          800    : '#680D12',
          900    : '#360709',
        },
      },
      fontFamily: {
        body   : ['VT323', 'monospace'],
        loading: ['"Flow Block"', 'monospace'],
      },
      backgroundSize: {
        '1.25x': '125%',
        '1.5x' : '150%',
        '2x'   : '200%',
      },
      boxShadow: {
        'retro'   : 'inset 4px 4px 0 0 #3D4130',
        'retro-sm': 'inset 2px 2px 0 0 #3D4130',
      },
    },
  },
  variants: {
    extend: {
      opacity        : ['disabled'],
      backgroundColor: ['disabled'],
      textColor      : ['disabled'],
    },
  },
  plugins: [require('tailwindcss-image-rendering')(), require('@tailwindcss/forms')()],
}
