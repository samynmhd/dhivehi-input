// webpack configuration file

const path = require("path");

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
        include: path.resolve(__dirname, "styles"),
      },
      {
        test: /\.(woff|woff2|ttf|eot|otf)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "fonts/", // Adjust this path to where you want the fonts to be output
            publicPath: "fonts/", // Adjust this path if needed to reflect where the fonts will be served
          },
        },
        include: path.resolve(__dirname, "fonts"),
      },
    ],
  },
};
