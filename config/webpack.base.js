module.exports = {
  module: {
    rules: [
      {
        test: [/\.[jt]sx?$/],
        exclude: [/node_modules/],
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              plugins: ['@babel/plugin-transform-runtime'],
              presets: [
                [
                  '@babel/preset-env',
                  {
                    debug: false,
                    include: ['@babel/plugin-proposal-class-properties'],
                    targets: [],
                    useBuiltIns: 'usage'
                  }
                ],
                ['@babel/preset-react', { runtime: 'automatic' }],
                ['@babel/preset-typescript', { allowDeclareFields: true }]
              ]
            }
          }
        ],
        resolve: {
          extensions: ['.js', '.jsx', '.json', '.ts', '.tsx']
        }
      }
    ]
  }
};
