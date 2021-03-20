// export types
import { WriteStream } from 'node:fs'

export interface Props {
  basePath: String
  extension: String
  title: String
}
declare module 'gluegun' {
  // export class Toolbox extends EmptyToolbox implements GluegunToolbox {
  //     [key: string]: any;
  //     createDownloadFile: ({ basePath, extension, title }: Props) => WriteStream;
  //     result?: any;
  //     plugin?: Plugin;
  //     command?: Command;
  //     pluginName?: string;
  //     commandName?: string;
  //     runtime?: Runtime;
  //     config: Options;
  //     parameters: GluegunParameters;
  //     filesystem: GluegunFilesystem;
  //     http: GluegunHttp;
  //     meta: GluegunMeta;
  //     patching: GluegunPatching;
  //     print: GluegunPrint;
  //     prompt: GluegunPrompt;
  //     semver: GluegunSemver;
  //     strings: GluegunStrings;
  //     system: GluegunSystem;
  //     template: GluegunTemplate;
  //     generate: any;
  //     packageManager: GluegunPackageManager;
  // }
  export interface GluegunToolbox {
    createDownloadFile({ basePath, extension, title }: Props): WriteStream
  }
}
