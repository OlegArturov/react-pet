const path = require('path');

module.exports = {
  entry: './src/pages/Analytics/index.tsx',
  output: {
    path: path.resolve(__dirname, '../src/packages/analytics-dashboard'),
    filename: 'analytics-dashboard.js',
    library: 'AnalyticsDashboard',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
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
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  externals: [
    ({ request }, cb) => {
      const externals = [
        /^react$/,
        /^react-dom$/,
        /^react-apexcharts$/,
        /^apexcharts$/,
        /^@mui\/material(\/.*)?$/,
        /^@mui\/material\/styles(\/.*)?$/,
        /^@mui\/system(\/.*)?$/,
        /^@mui\/icons-material(\/.*)?$/,
        /^@emotion\/react(\/.*)?$/,
        /^@emotion\/styled(\/.*)?$/,
      ];
      if (externals.some((re) => re.test(request))) {
        return cb(null, `commonjs2 ${request}`);
      }
      cb();
    },
  ],
  mode: 'production',
};
