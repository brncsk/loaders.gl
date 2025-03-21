// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors

import type {WriterWithEncoder, WriterOptions} from '@loaders.gl/loader-utils';
import type {EncodeBSONOptions} from './lib/encoders/encode-bson';
import {encodeBSONSync} from './lib/encoders/encode-bson';
import {BSONFormat} from './bson-format';

// __VERSION__ is injected by babel-plugin-version-inline
// @ts-ignore TS2304: Cannot find name '__VERSION__'.
const VERSION = typeof __VERSION__ !== 'undefined' ? __VERSION__ : 'latest';

export type BSONWriterOptions = WriterOptions & {
  bson?: EncodeBSONOptions
}

export const BSONWriter = {
  ...BSONFormat,
  name: 'BSON',
  id: 'bson',
  module: 'bson',
  version: VERSION,
  extensions: ['bson'],
  options: {
    bson: {}
  },
  async encode(data: Record<string, unknown>, options?: WriterOptions): Promise<ArrayBuffer> {
    return encodeBSONSync(data, {}); // options
  },
  encodeSync(data: Record<string, unknown>, options?: WriterOptions): ArrayBuffer {
    return encodeBSONSync(data, {}); // options
  }
} as const satisfies WriterWithEncoder<Record<string, unknown>, never, BSONWriterOptions>;
