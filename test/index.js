/*
 * Copyright (c) 2019, Hugo Freire <hugo@exec.sh>.
 *
 * This source code is licensed under the license found in the
 * LICENSE.md file in the root directory of this source tree.
 */

describe('Module', () => {
  let subject
  let Slackmail

  describe('when loading', () => {
    beforeEach(() => {
      Slackmail = require('../src/slackmail')
      jest.mock('../src/slackmail')

      subject = require('../src/index')
    })

    it('should export slackmail', () => {
      expect(subject).toBe(Slackmail)
    })
  })
})
