import js from "@eslint/js";
import globals from "globals";

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.webextensions,
        checkEngagement: "readonly",
        seedEngagement: "readonly",
        ENGAGEMENT_CONFIG: "readonly",
        copyShareLink: "readonly",
        recordEngagementShown: "readonly",
        snoozeEngagement: "readonly",
        dismissEngagement: "readonly"
      },
    },
    rules: {
      "no-unused-vars": "warn",
      "no-console": "off"
    },
  },
];
