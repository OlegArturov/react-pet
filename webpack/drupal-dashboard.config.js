const path = require('path');

module.exports = {
  entry: './src/widgets/drupal-dashboard/index.jsx',
  output: {
    path: path.resolve(__dirname, '../src/packages/dashboard'),
    filename: 'drupal-dashboard.js',
    library: 'DrupalDashboard',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  externals: {
    react: 'react',
    'react-dom': 'react-dom',
    '@mui/material': '@mui/material',
    '@emotion/react': '@emotion/react',
    '@emotion/styled': '@emotion/styled',
  },
  mode: 'production',
};
