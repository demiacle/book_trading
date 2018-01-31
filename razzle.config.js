var razzleHeroku = require("razzle-heroku");
module.exports = {
  modify: (config, { target, dev }, webpack) => {
    config = razzleHeroku(config, { target, dev }, webpack);

    if (process.env.NODE_ENV !== "production") {
      config.devtool = "inline-source-map";
    }
    /*
    config.output.devtoolModuleFilenameTemplate = function(info){
      return info.absoluteResourcePath;
    }
    */
    return config;
  }
};
