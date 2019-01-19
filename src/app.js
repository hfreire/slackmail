#!/usr/bin/env node

/*
 * Copyright (c) 2019, Hugo Freire <hugo@exec.sh>.
 *
 * This source code is licensed under the license found in the
 * LICENSE.md file in the root directory of this source tree.
 */

process.on('uncaughtException', (error) => {
  console.error(error)

  process.exit(1)
})

process.on('unhandledRejection', (error) => {
  console.error(error)

  process.exit(1)
})

const program = require('commander')

const Slackmail = require('../lib')

const { join } = require('path')
const { version } = require(join(__dirname, '../package'))

program
  .version(version)
  .option('-w, --webhook <webhook>', 'slack webhook.')
  .option('-u, --username <username>', 'slack username.')
  .option('-c, --channel <channel>', 'slack channel.')
  .parse(process.argv)

const { webhook, username, channel } = program
if (!webhook || !username || !channel) {
  program.outputHelp()

  process.exit(1)
}

process.stdin.once('readable', () => {
  let data = process.stdin.read()

  if (!data) {
    return
  }

  process.stdin.on('data', (chunk) => {
    data += chunk
  })

  process.stdin.on('end', () => {
    Slackmail.send(data, webhook, username, channel)
  })
})
