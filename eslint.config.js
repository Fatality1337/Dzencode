import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import reactHooks from 'eslint-plugin-react-hooks';

export default [{ ignores: ['dist/**','node_modules/**','server/dist/**'] }, { files: ['src/**/*.ts','src/**/*.tsx','server/**/*.ts','test/**/*.ts'], languageOptions: { parser: tsParser, parserOptions: { ecmaVersion: 'latest', sourceType: 'module', ecmaFeatures: { jsx: true } }, globals: { window: 'readonly', document: 'readonly', navigator: 'readonly', self: 'readonly' } }, plugins: { '@typescript-eslint': tsPlugin, 'react-hooks': reactHooks }, rules: { ...tsPlugin.configs.recommended.rules, 'react-hooks/rules-of-hooks': 'error', 'react-hooks/exhaustive-deps': 'warn', '@typescript-eslint/no-explicit-any': 'error' } }];
