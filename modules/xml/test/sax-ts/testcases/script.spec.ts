// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
// Forked from sax-ts & sax under ISC license

import test from 'tape-promise/tape';
import {testSax} from '../utils/test-utils';

test('SAXParser#script', (t) => {
  testSax(t, {
    xml: '<html><head><script>if (1 < 0) { console.log(\'elo there\'); }</script></head></html>',
    expect: [
      [
        'opentagstart',
        {
          name: 'HTML',
          attributes: {}
        }
      ],
      [
        'opentag',
        {
          name: 'HTML',
          attributes: {},
          isSelfClosing: false
        }
      ],
      [
        'opentagstart',
        {
          name: 'HEAD',
          attributes: {}
        }
      ],
      [
        'opentag',
        {
          name: 'HEAD',
          attributes: {},
          isSelfClosing: false
        }
      ],
      [
        'opentagstart',
        {
          name: 'SCRIPT',
          attributes: {}
        }
      ],
      [
        'opentag',
        {
          name: 'SCRIPT',
          attributes: {},
          isSelfClosing: false
        }
      ],
      ['script', 'if (1 < 0) { console.log(\'elo there\'); }'],
      ['closetag', 'SCRIPT'],
      ['closetag', 'HEAD'],
      ['closetag', 'HTML']
    ]
  });

  t.end();
});
