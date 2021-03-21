const {
	override,
	fixBabelImports,
	addDecoratorsLegacy,
	overrideDevServer,
} = require('customize-cra');

// const devServerConfig = () => config => {
// 	return {
// 		...config,
// 		output: {
// 			publicPath: '/',
// 		},
// 		devServer: {
// 			historyApiFallback: true,
// 		},
// 	};
// };

module.exports = {
	webpack: override(
		fixBabelImports('import', {
			libraryName: 'antd',
			libraryDirectory: 'es',
			style: 'css',
		}),
		addDecoratorsLegacy()
	),
	// devServer: overrideDevServer(devServerConfig()),
};
