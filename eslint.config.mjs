import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: [
      'next/core-web-vitals',
      'next/typescript',
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:prettier/recommended',
    ],

    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },

    rules: {
      // **React Rules**
      'react/jsx-uses-react': 'off', // No need to import React in Next.js (React 17+)
      'react/react-in-jsx-scope': 'off', // Next.js handles imports
      'react/prop-types': 'off', // Using TypeScript, so prop-types are unnecessary
      'react/jsx-sort-props': ['error', { ignoreCase: true }], // Sort JSX props alphabetically
      'react/sort-prop-types': [
        'warn',
        {
          callbacksLast: true,
          requiredFirst: true,
          ignoreCase: true,
        },
      ],
      'react-hooks/rules-of-hooks': 'error', // Enforce React Hooks rules
      'react-hooks/exhaustive-deps': 'warn', // Warn for missing dependencies in hooks

      // **TypeScript Rules**
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // Ignore unused vars prefixed with "_"
      '@typescript-eslint/explicit-module-boundary-types': 'off', // No need to explicitly type function return types
      '@typescript-eslint/no-explicit-any': 'warn', // Discourage `any` but don't enforce

      // **Best Practices**
      'no-console': 'warn', // Warn for console logs
      'no-debugger': 'warn', // Warn for debugger statements
      'no-unused-vars': 'off', // Use TypeScript's rule instead
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      'prettier/prettier': [
        'error',
        {
          jsxSingleQuote: true,
          singleQuote: true,
          semi: true,
          tabWidth: 2,
          trailingComma: 'all',
          printWidth: 120,
          bracketSameLine: true,
          bracketSpacing: true,
          useTabs: false,
          arrowParens: 'always',
          endOfLine: 'auto',
        },
      ],
    },
  }),
];

export default eslintConfig;
