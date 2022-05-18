module.exports = {
	env: {
		es2021: true,
		node: true,
		jest: true
	},
	extends: [
		'standard',
		'eslint:recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react-hooks/recommended',
		'plugin:react/recommended'
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module'
	},
	plugins: [
		'@typescript-eslint'
	],
	rules: {
		'no-tabs': 'off',
		indent: ['error', 'tab']
	}
}
