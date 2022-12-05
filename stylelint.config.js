module.exports = {
  customSyntax: "postcss-html",
  extends: [
    "stylelint-config-standard",
    "stylelint-config-recommended-vue",
    "stylelint-config-prettier",
  ],
  // add your custom config here
  // https://stylelint.io/user-guide/configuration
  rules: {
    "alpha-value-notation": "number",
    "color-function-notation": "legacy",
    "rule-empty-line-before": "always-multi-line"
  },
}
