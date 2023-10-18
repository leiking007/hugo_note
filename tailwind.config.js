/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./content/**/*.md","./themes/hugo-tl/layouts/**/*.{html,js,ts}"],
  theme: {
    fontSize: {
      'sm':['0.8rem',{
        lineHeight: '1.2',
        fontWeight: '500',
      }],
      'base': ['1rem',{
        lineHeight: '1.6',
        fontWeight: '500'
      }],
      'xl': ['1.25rem',{
        lineHeight: '1.6',
        fontWeight: '500'
      }],
      '2xl': ['1.5rem', {
        lineHeight: '2',
        fontWeight: '500',
      }],
      '3xl': ['1.875rem', {
        lineHeight: '2.25',
        fontWeight: '700',
      }],
    },
    extend: {
      typography: {
        DEFAULT: {
          css: {
            "code::before": {content: ''},
            "code::after": {content: ''}
          }
        }
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}

