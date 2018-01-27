module.exports = {
  modify: (config, {target, dev}, webpack )=>{
    config.devtool = 'inline-source-map'
    /*
    config.output.devtoolModuleFilenameTemplate = function(info){
      return info.absoluteResourcePath;
    }
    */
    return config
  }
}