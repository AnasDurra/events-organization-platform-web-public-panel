/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
    theme: {
        extend: {
            colors: {
                primary: '#2A9D8F',
                textPrimary:'#264653',
                secondary: '#F4A261',
                bgSecondary: '#E9C46A',
            },
        },
    },
    plugins: [],
};
