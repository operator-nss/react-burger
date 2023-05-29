module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		"airbnb",
		"airbnb-base",
		"airbnb-typescript",
		"prettier",
		"airbnb/hooks",
		"plugin:@typescript-eslint/recommended"
	],
	parserOptions: {
		"project": "./tsconfig.json",
		ecmaVersion: 'latest',
		parser: '@typescript-eslint/parser',
		sourceType: 'module',
	},
	plugins: [
		'@typescript-eslint',
	],
	rules: {
		"react/function-component-definition": [
			2,
			{
				namedComponents: "arrow-function",
				unnamedComponents: "arrow-function",
			},
		],
		"jsx-a11y/no-static-element-interactions": [
			"error",
			{
				"handlers": [
					"onClick"
				]
			}
		],
		"jsx-a11y/mouse-events-have-key-events": 'off',
		"jsx-a11y/no-noninteractive-element-interactions": 'off',
		"jsx-a11y/anchor-is-valid": 'off',
		"no-underscore-dangle": 'off',
		"react/react-in-jsx-scope": "off",
		'jsx-a11y/click-events-have-key-events': 'off',
		"react/jsx-filename-extension": [1, {"extensions": [".ts", ".tsx"]}],
		"linebreak-style": 0,
		"vue/multi-word-component-names": 'off',
		"import/prefer-default-export": "off",
		'import/extensions': [
			'error',
			'ignorePackages',
			{
				'ts': 'never',
				'tsx': 'never',
			},
		],
	},
};