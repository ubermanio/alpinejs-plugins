import { program } from 'commander'

import {start} from './start'

export type CliOptions = {
  verbose?: boolean
}

export type CliCommands = 'start' | 'dev'

const run = async () => {
  program.option('--verbose')

  program.parse()

  const options = program.opts() as CliOptions;
  const command = program.args[0] as CliCommands;

  switch (command) {
    case 'start':
      await start(options)
      break;

    default:
      break;
  }
}

run()