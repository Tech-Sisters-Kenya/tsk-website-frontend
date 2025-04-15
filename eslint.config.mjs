import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import prettierConfig from 'eslint-config-prettier'; // 👈 Import Prettier

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Existing Next.js + TypeScript config
  ...compat.extends('next/core-web-vitals', 'next/typescript'),

  // Prettier config to turn off conflicting rules
  prettierConfig,
];

export default eslintConfig;
