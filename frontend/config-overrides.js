const { override, addWebpackAlias, addWebpackResolve, addWebpackPlugin } = require("customize-cra");
const webpack = require("webpack");
const path = require("path");

module.exports = override(
  addWebpackResolve({
    fallback: {
      "zlib": require.resolve("browserify-zlib"),
      "querystring": require.resolve("querystring-es3"),
      "path": require.resolve("path-browserify"),
      "crypto": require.resolve("crypto-browserify"),
      "stream": require.resolve("stream-browserify"),
      "http": require.resolve("stream-http"),
      "assert": require.resolve("assert/"),
      "vm": require.resolve("vm-browserify"),
      "fs": false,
      "net": false,
      "async_hooks": false
    }
  }),
  addWebpackAlias({
    "@": path.resolve(__dirname, "src"),
    "process/browser": require.resolve("process/browser.js")  // Add alias with extension
  }),
  addWebpackPlugin(
    new webpack.ProvidePlugin({
      process: "process/browser.js"  // Use full path with extension
    })
  )
);
