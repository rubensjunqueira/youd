import { system, filesystem } from 'gluegun'
import path = require('path')
import ytdl = require('ytdl-core')
import { getBasePath } from '../src/basePath'

const src = filesystem.path(__dirname, '..')
const basePath = getBasePath()
const urlVideo = 'https://www.youtube.com/watch?v=aqz-KE-bpKQ'

jest.setTimeout(30000)

const cli = async (cmd: string) =>
  system.run('node ' + filesystem.path(src, 'bin', 'youd') + ` ${cmd}`)

test('outputs version', async () => {
  const output = await cli('--version')
  expect(output).toContain('0.0.1')
})

test('outputs help', async () => {
  const output = await cli('--help')
  expect(output).toContain('0.0.1')
})

test('should download a mp4 format', async () => {
  const output = await cli(urlVideo)

  const { videoDetails } = await ytdl.getInfo(urlVideo)
  const reg = new RegExp('[\\/:*?"<>|]', 'g')
  const title = videoDetails.title.replace(reg, '').concat('.mp4')

  expect(output).toContain(title)
  expect(filesystem.exists(path.resolve(String(basePath), 'mp4', title))).toBe(
    'file'
  )

  filesystem.remove(path.resolve(String(basePath)))
})

test('should download a mp3 format', async () => {
  const output = await cli(urlVideo.concat(' --mp3'))

  const { videoDetails } = await ytdl.getInfo(urlVideo)
  const reg = new RegExp('[\\/:*?"<>|]', 'g')
  const title = videoDetails.title.replace(reg, '').concat('.mp3')

  expect(output).toContain(title)
  expect(filesystem.exists(path.resolve(String(basePath), 'mp3', title))).toBe(
    'file'
  )

  filesystem.remove(path.resolve(String(basePath)))
})

test('should display a warning message if the URL parameter is not passed', async () => {
  const output = await cli('')
  expect(output).toContain('Warning: Video URL is required!')
})

test('should display an error message if the URL parameter is not valid', async () => {
  const output = await cli(urlVideo.replace('com', 'a'))
  expect(output).toContain('Error: Video URL invalid!')
})
