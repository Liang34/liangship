const someLargerSize = 300000;
module.exports = ({ config }) => {
    config.performance = {
      hints: process.env.NODE_ENV === 'production' ? 'warning' : false,
      maxAssetSize: someLargerSize, // 例如：300000
      maxEntrypointSize: someLargerSize, // 例如：300000
    };
    return config;
  };
  
  