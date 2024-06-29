module.exports = {
	root: true,
	env: { browser: true, es2020: true },
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'plugin:react/jsx-runtime',
	],
	ignorePatterns: ['dist', '.eslintrc.cjs'],
	parser: '@typescript-eslint/parser',
	plugins: ['react-refresh', 'react-hooks', 'react'],
	rules: {
		'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
		'react/react-in-jsx-scope': 'off',
		'react/jsx-uses-react': 'off',
		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': ['error'],
	},
};
