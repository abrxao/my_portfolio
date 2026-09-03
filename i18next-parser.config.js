module.exports = {
  locales: ["en", "pt-BR", "fr"],
  defaultNamespace: "common",
  defaultValue: "",
  keySeparator: ".",
  namespaceSeparator: false,
  output: "public/locales/$LOCALE/$NAMESPACE.json",
  input: ["src/**/*.{ts,tsx}"],
  // Never auto-delete keys: this repo hand-maintains 3 languages and some
  // keys (e.g. language.en/pt-BR/fr) are only ever referenced dynamically,
  // so the static scan can't see every usage. Use `bun run i18n:check` to
  // find genuinely unused/missing keys instead.
  keepRemoved: true,
  sort: true,
  createOldCatalogs: false,
  lexers: {
    ts: ["JavascriptLexer"],
    tsx: ["JsxLexer"],
  },
};
