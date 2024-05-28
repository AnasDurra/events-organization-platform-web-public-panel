/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
    theme: {
        extend: {
            colors: {
                primary: '#4E6C50',
                secondary: '#AA8B56',
                bgSecondary: '#F0EBCE',
            },
        },
    },
    plugins: [],
};
