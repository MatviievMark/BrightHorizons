import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Plus Jakarta Sans', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                'primary': '#2A1C6C',
                'purple' : '#BA7EFF',
                'blue' : '#BFD7FF', 
                'grey' : '#E5E7EB',
                'light-blue' : '#E3F2FD'
            }
        },
    },

    plugins: [forms],
};
