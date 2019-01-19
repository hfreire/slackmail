/*
 * Copyright (c) 2019, Hugo Freire <hugo@exec.sh>.
 *
 * This source code is licensed under the license found in the
 * LICENSE.md file in the root directory of this source tree.
 */

const _ = require('lodash')

const { simpleParser } = require('mailparser')

const { IncomingWebhook } = require('@slack/client')

class Slackmail {
  async send (email, url, username, channel) {
    if (!email || !url || !username || !channel) {
      throw new Error('invalid arguments')
    }

    const { text, headers, date } = await simpleParser(email)
    const subject = headers.get('subject')
    const from = _.get(headers.get('from'), 'value[0].address')

    const webhook = new IncomingWebhook(url)

    const message = {
      text: subject,
      username,
      channel,
      attachments: [
        {
          text,
          fields: [ { title: 'From', value: from, short: true }, { title: 'Date', value: date, short: true } ]
        }
      ]
    }

    await webhook.send(message)
  }
}

module.exports = new Slackmail()
