/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'schiphol-blue': 'var(--schiphol-blue)',
        'afternoon-blue': 'var(--afternoon-blue)',
        'seebuyfly-yellow': 'var(--seebuyfly-yellow)',
        'morning-pink': 'var(--morning-pink)',
        'lightmorning-pink': 'var(--lightmorning-pink)',
        'lightmorning-blue': 'var(--lightmorning-blue)',
        'dusk-green': 'var(--dusk-green)',
        'dusk-blue': 'var(--dusk-blue)',
        'evening-pink': 'var(--evening-pink)',
        'evening-lilac': 'var(--evening-lilac)',
        black: 'var(--black)',
        'grey-storm': 'var(--grey-storm)',
        'grey-overcast': 'var(--grey-overcast)',
        'grey-broken': 'var(--grey-broken)',
        'grey-scattered': 'var(--grey-scattered)',
        'grey-few': 'var(--grey-few)',
        white: 'var(--white)',
        'dark-red': 'var(--dark-red)',
        green: 'var(--green)',
        'light-blue': 'var(--light-blue)',
        'light-green': 'var(--light-green)',
        'light-yellow': 'var(--light-yellow)',
      },
      backgroundImage: {
        'gradient-flights': 'var(--gradient-flights)',
        'gradient-parking': 'var(--gradient-parking)',
        'gradient-at-schiphol': 'var(--gradient-at-schiphol)',
        'gradient-more': 'var(--gradient-more)',
        'gradient-privium': 'var(--gradient-privium)',
      },
    },
  },
  plugins: [
    function ({ addBase, theme }) {
      addBase({
        body: {
          backgroundColor: theme('colors.light-blue'),
        },
      });
    },
  ],
};
