module.exports = {
    entry: "./timeline.js",
    output: {
        path: __dirname,
        filename: "tbundle.js"
    },
    module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/,  loader: 'babel-loader?presets[]=es2015'}
    ]
  }
};
