import { filesystem, GluegunCommand, GluegunToolbox } from 'gluegun';
import ytdl = require('ytdl-core');
import path = require('path');
import BarProgress = require('progress');

const basePath = path.resolve(filesystem.homedir(), 'Documents', 'Youd');
const extensions = {
  mp3: '.mp3',
  mp4: '.mp4'
}

const command: GluegunCommand = {
  name: 'youd',
  run: async (toolbox: GluegunToolbox) => {
    const { print, parameters, createDownloadFile } = toolbox
    try {

      if (!parameters.first) {
        print.warning('Warning: Video URL is required!');
        return;
      }

      if (!ytdl.validateURL(parameters.first)) {
        print.error('Error: Video URL invalid!');
        return;
      }

      const { videoDetails } = await ytdl.getInfo(parameters.first);

      const { mp3 } = parameters.options;
      const extension = extensions[mp3 ? 'mp3' : 'mp4'];

      const reg = new RegExp('[\\\/:*?"<>|]', 'g');
      const title = videoDetails.title.replace(reg, '').concat(extension);

      let progress = 0;
      const bar = new BarProgress('⬇️ :bar :counter', { total: 100, width: 100 });

      ytdl(parameters.first, {
        quality: 'highest',
        filter: extension === '.mp3' ? 'audioonly' : 'videoandaudio'
      }).on('progress', (x, y, z) => {
        progress = (y * 100 / z);
        bar.update(progress / bar.total, { counter: Number(progress.toFixed(0)) });
      }).on('end', () => {
        print.success(`✔️  ${title} downloaded!`);
      }).pipe(createDownloadFile({ basePath, extension, title }));

    } catch (err) {
      print.error(`Error: ${err.message}`);
    }
  }
}

module.exports = command
