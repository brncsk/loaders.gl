// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
// Forked from sax-ts & sax under ISC license

// import {testSax} from '../utils/test-utils';

/* TODO: enable for streams
var tap = require('tap')
var saxStream = require('../build/src/sax.js').createStream()

var b = new Buffer('误')

saxStream.on('text', function (text) {
  tap.equal(text, b.toString())
})

saxStream.write(new Buffer('<test><a>'))
saxStream.write(b.slice(0, 1))
saxStream.write(b.slice(1))
saxStream.write(new Buffer('</a><b>'))
saxStream.write(b.slice(0, 2))
saxStream.write(b.slice(2))
saxStream.write(new Buffer('</b><c>'))
saxStream.write(b)
saxStream.write(new Buffer('</c>'))
saxStream.write(Buffer.concat([new Buffer('<d>'), b.slice(0, 1)]))
saxStream.end(Buffer.concat([b.slice(1), new Buffer('</d></test>')]))

var saxStream2 = require('../build/src/sax.js').createStream()

saxStream2.on('text', function (text) {
  tap.equal(text, '�')
})

saxStream2.write(new Buffer('<root>'))
saxStream2.write(new Buffer('<e>'))
saxStream2.write(new Buffer([0xC0]))
saxStream2.write(new Buffer('</e>'))
saxStream2.write(Buffer.concat([new Buffer('<f>'), b.slice(0, 1)]))
saxStream2.write(new Buffer('</root>'))
saxStream2.end()
*/
