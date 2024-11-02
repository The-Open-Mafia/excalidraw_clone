
export default [
  // { languageOptions: { globals: globals.browser } },
  // pluginJs.configs.recommended,
  // ...tseslint.configs.recommended,
  {
    ignores: [
      'coverage',
      '*/**/public',
      '*/**/dist',
      '*/**/build',
      '*/**/dev-dist',
      '*/**/*.config.ts',
      'pnpm-lock.yaml',
      'pnpm-workspace.yaml',
    ],
  },
];
