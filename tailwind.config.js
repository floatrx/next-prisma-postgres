/**
 * TODO:
 *  NEXT UI WAS REBRANDED TO HERO UI!
 *  REFACTOR ALL PROJECT ACCORDINGLY
 */
const { heroui } = require('@heroui/theme');
import { nextui } from '@nextui-org/theme';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './features/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    './node_modules/@heroui/theme/dist/components/(dropdown|menu|divider|popover|button|ripple|spinner).js',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)'],
        mono: ['var(--font-geist-mono)'],
      },
    },
  },
  darkMode: 'class',
  plugins: [nextui(), heroui()],
};
