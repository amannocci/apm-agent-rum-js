/**
 * MIT License
 *
 * Copyright (c) 2017-present, Elasticsearch BV
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */

import { patchXMLHttpRequest } from './xhr-patch'
import { patchFetch } from './fetch-patch'
import { patchHistory } from './history-patch'
import EventHandler from '../event-handler'
import { HISTORY, FETCH, XMLHTTPREQUEST } from '../constants'

const patchEventHandler = new EventHandler()
let alreadyPatched = false

function patchAll() {
  if (!alreadyPatched) {
    alreadyPatched = true
    patchXMLHttpRequest(function (event, task) {
      patchEventHandler.send(XMLHTTPREQUEST, [event, task])
    })
    patchFetch(function (event, task) {
      patchEventHandler.send(FETCH, [event, task])
    })
    patchHistory(function (event, task) {
      patchEventHandler.send(HISTORY, [event, task])
    })
  }
  return patchEventHandler
}

export { patchAll, patchEventHandler }
