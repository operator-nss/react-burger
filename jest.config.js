module.exports = {
	transformIgnorePatterns: ['/node_modules/(?!(axios)/)'],
	transform: {
		'\\.[jt]sx?$': 'babel-jest',
		'\\.css$': 'some-css-transformer',
	},
};