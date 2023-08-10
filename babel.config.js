module.exports = {
	presets: [
		['@babel/preset-env','@babel/preset-typescript', {targets: {node: 'current'}}],
		'@babel/preset-typescript',
	],
	plugins: [
		['@babel/plugin-proposal-decorators', { legacy: true }],
	  ["dynamic-import-node", { "noInterop": true }]]
};