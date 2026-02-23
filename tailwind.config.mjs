/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#f0f5fa',
                    100: '#e1ecf4',
                    200: '#c8dceb',
                    300: '#a1c3dd',
                    400: '#73a3ca',
                    500: '#5286b3',
                    600: '#406a96',
                    700: '#34557a',
                    800: '#2d4865',
                    900: '#0d1e30', // Deep serious blue
                    950: '#06101c',
                },
                gold: {
                    50: '#fcfaf2',
                    100: '#f7f2de',
                    200: '#efe3be',
                    300: '#e5cf96',
                    400: '#d8b566',
                    500: '#ce9d41', // Authoritative gold
                    600: '#b47e33',
                    700: '#905d2b',
                    800: '#774a28',
                    900: '#613d23',
                    950: '#382011',
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                serif: ['Playfair Display', 'serif'],
            }
        },
    },
    plugins: [],
}
