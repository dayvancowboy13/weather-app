import globals from 'globals';
import pluginJs from '@eslint/js';
import stylisticJs from '@stylistic/eslint-plugin-js';

export default [
  {
    ignores: [
      'eslint.config.mjs',
      'webpack.config.js',
    ]
  },
  {
    plugins: {
      '@stylistic/js': stylisticJs,

    },
    rules: {
      "@stylistic/js/space-before-function-paren": ["off", 'never'],
      // '@stylistic/js/space-before-function-paren': "off",
      '@stylistic/js/quotes': ['warn', 'single', { avoidEscape: true }],
      '@stylistic/js/eol-last': ['off', 'never'],
      '@stylistic/js/function-paren-newline': ["warn", { "minItems": 3 }],
    },
    languageOptions: { globals: globals.browser }
  },
  stylisticJs.configs["all-flat"],
  // pluginJs.configs.recommended,
];