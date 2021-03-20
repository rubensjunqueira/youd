import * as path from 'path'
import { filesystem } from 'gluegun'

export function getBasePath(): string {
  let basePath = ''

  if (process.platform === 'win32' || process.platform === 'darwin') {
    basePath = path.resolve(filesystem.homedir(), 'Documents', 'Youd')
  } else if (process.platform === 'linux') {
    basePath = path.resolve(filesystem.homedir(), 'Youd')
  }

  return basePath
}
