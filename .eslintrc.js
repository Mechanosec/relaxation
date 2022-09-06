module.exports = {
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    extends: [
        'plugin:@typescript-eslint/recommended', // Uses the recommended rules from @typescript-eslint/eslint-plugin
        'plugin:prettier/recommended',
        'plugin:import/typescript',
        'plugin:unicorn/recommended',
    ],
    parserOptions: {
        ecmaVersion: 2021, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module', // Allows for the use of imports
    },
    plugins: ['simple-import-sort', 'import', 'unused-imports', 'unicorn'],
    rules: {
        '@typescript-eslint/explicit-function-return-type': 'error',
        '@typescript-eslint/explicit-module-boundary-types': 'error',
        '@typescript-eslint/no-unused-vars': 'error',
        '@typescript-eslint/no-explicit-any': 'error',
        'object-curly-newline': 'error',
        'newline-before-return': 'error',
        'eol-last': 2,
        'no-console': ['error', { allow: ['warn', 'error'] }],
        'no-undef': 'error',
        'no-fallthrough': 'error',
        'unused-imports/no-unused-imports-ts': 'error',
        'import/newline-after-import': 'error',
        'unicorn/numeric-separators-style': 0,
        'unicorn/no-null': 0,
    },
};
