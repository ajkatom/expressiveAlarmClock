const path = require('path');
module.exports={
  devtool:'sourcemap',
  entry:'./src/index.js',
  output: {
    path:path.join(__dirname,'dist'),
    filename: 'bundle.js'
  },
  module:{
    loaders:[
      {
        test: /\.js$/,
        exlude: /node_modules/,
        loader: 'bable-loader',
        query:{
          presets:['es2015','react']
        }
      }
    ]
  }
};
