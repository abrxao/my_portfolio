import { defineConfig } from 'i18next-cli';

export default defineConfig({
  locales: ['en', 'pt-BR', 'fr'],
  extract: {
    input: ['src/**/*.{ts,tsx}'],
    output: 'public/locales/{{language}}/{{namespace}}.json',
    defaultNS: 'common',
    keySeparator: '.',
    nsSeparator: false,
    functions: ['t', '*.t'],
    transComponents: ['Trans'],
    sort: true,
    // Never auto-delete keys: `extract` would otherwise remove any key it
    // can't see used in code. Run `bun run i18n:status --unused` to review
    // unused keys by hand instead of having them silently deleted.
    removeUnusedKeys: false,
  },
  types: {
    input: ['public/locales/{{language}}/{{namespace}}.json'],
    output: 'src/types/i18next.d.ts',
  },
});