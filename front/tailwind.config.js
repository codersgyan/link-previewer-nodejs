/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    theme: {
        fontFamily: {
            sans: ['Manrope', 'sans-serif'],
        },
        extend: {
            colors: {
                primary: '#0989E5',
                mild: '#F7F7F7',
            },
        },
    },
    plugins: [],
};
