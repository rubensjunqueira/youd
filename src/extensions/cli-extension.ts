import { GluegunToolbox, filesystem } from 'gluegun'
import path = require('path')
import { WriteStream } from 'node:fs'
import { Props } from '../types'

// add your CLI-specific functionality here, which will then be accessible
// to your commands

module.exports = (toolbox: GluegunToolbox) => {
  toolbox.createDownloadFile = ({
    basePath,
    extension,
    title
  }: Props): WriteStream => {
    try {
      return filesystem.createWriteStream(
        filesystem
          .dir(
            path.resolve(
              basePath.toString(),
              extension === '.mp3' ? 'mp3' : 'mp4'
            )
          )
          .cwd()
          .concat(`/${title}`)
      )
    } catch (err) {
      throw new Error(err.message)
    }
  }
  // enable this if you want to read configuration in from
  // the current folder's package.json (in a "youd" property),
  // youd.config.json, etc.
  // toolbox.config = {
  // ...toolbox.config,
  // ...toolbox.config.loadConfig("youd", process.cwd())
  // }
}
