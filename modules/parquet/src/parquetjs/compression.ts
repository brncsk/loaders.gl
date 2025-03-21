// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
// Copyright (c) 2017 ironSource Ltd.
// Forked from https://github.com/kbajalc/parquets under MIT license
// Forked from https://github.com/ironSource/parquetjs under MIT license

import {
  Compression,
  NoCompression,
  GZipCompression,
  SnappyCompression,
  BrotliCompression,
  // LZOCompression,
  LZ4Compression,
  ZstdCompression
} from '@loaders.gl/compression';
import {registerJSModules} from '@loaders.gl/loader-utils';

import {ParquetCompression} from './schema/declare';

/** We can't use loaders-util buffer handling since we are dependent on buffers even in the browser */
function toBuffer(arrayBuffer: ArrayBuffer): Buffer {
  return Buffer.from(arrayBuffer);
}

function toArrayBuffer(buffer: Buffer): ArrayBuffer {
  // TODO - per docs we should just be able to call buffer.buffer, but there are issues
  if (Buffer.isBuffer(buffer)) {
    const typedArray = new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.length);
    return typedArray.slice().buffer;
  }
  return buffer;
}

// TODO switch to worker compression to avoid bundling...

// import brotli from 'brotli'; - brotli has problems with decompress in browsers
// import brotliDecompress from 'brotli/decompress';
import lz4js from 'lz4js';
// import lzo from 'lzo';
// import {ZstdCodec} from 'zstd-codec';

// Inject large dependencies through Compression constructor options
const modules = {
  // brotli has problems with decompress in browsers
  // brotli: {
  //   decompress: brotliDecompress,
  //   compress: () => {
  //     throw new Error('brotli compress');
  //   }
  // },
  lz4js
  // lzo
  // 'zstd-codec': ZstdCodec
};

/**
 * See https://github.com/apache/parquet-format/blob/master/Compression.md
 */
// @ts-expect-error
export const PARQUET_COMPRESSION_METHODS: Record<ParquetCompression, Compression> = {
  UNCOMPRESSED: new NoCompression(),
  GZIP: new GZipCompression(),
  SNAPPY: new SnappyCompression(),
  BROTLI: new BrotliCompression({modules}),
  // TODO: Understand difference between LZ4 and LZ4_RAW
  LZ4: new LZ4Compression({modules}),
  LZ4_RAW: new LZ4Compression({modules}),
  //
  // LZO: new LZOCompression({modules}),
  ZSTD: new ZstdCompression({modules})
};

/**
 * Register compressions that have big external libraries
 * @param options.modules External library dependencies
 */
export async function preloadCompressions(options?: {modules?: {[key: string]: any}}) {
  registerJSModules(options?.modules);
  const compressions = Object.values(PARQUET_COMPRESSION_METHODS);
  return await Promise.all(
    compressions.map((compression) => compression.preload(options?.modules))
  );
}

/**
 * Deflate a value using compression method `method`
 */
export async function deflate(method: ParquetCompression, value: Buffer): Promise<Buffer> {
  const compression = PARQUET_COMPRESSION_METHODS[method];
  if (!compression) {
    throw new Error(`parquet: invalid compression method: ${method}`);
  }
  const inputArrayBuffer = toArrayBuffer(value);
  const compressedArrayBuffer = await compression.compress(inputArrayBuffer);
  return toBuffer(compressedArrayBuffer);
}

/**
 * Inflate a value using compression method `method`
 */
export async function decompress(
  method: ParquetCompression,
  value: Buffer,
  size: number
): Promise<Buffer> {
  const compression = PARQUET_COMPRESSION_METHODS[method];
  if (!compression) {
    throw new Error(`parquet: invalid compression method: ${method}`);
  }
  const inputArrayBuffer = toArrayBuffer(value);
  const compressedArrayBuffer = await compression.decompress(inputArrayBuffer, size);
  return toBuffer(compressedArrayBuffer);
}

/*
 * Inflate a value using compression method `method`
 */
export function inflate(method: ParquetCompression, value: Buffer, size: number): Buffer {
  if (!(method in PARQUET_COMPRESSION_METHODS)) {
    throw new Error(`invalid compression method: ${method}`);
  }
  // @ts-ignore
  return PARQUET_COMPRESSION_METHODS[method].inflate(value, size);
}

/*
function deflate_identity(value: Buffer): Buffer {
  return value;
}

function deflate_gzip(value: Buffer): Buffer {
  return zlib.gzipSync(value);
}

function deflate_snappy(value: Buffer): Buffer {
  return snappyjs.compress(value);
}

function deflate_lzo(value: Buffer): Buffer {
  lzo = lzo || Util.load('lzo');
  return lzo.compress(value);
}

function deflate_brotli(value: Buffer): Buffer {
  brotli = brotli || Util.load('brotli');
  const result = brotli.compress(value, {
    mode: 0,
    quality: 8,
    lgwin: 22
  });
  return result ? Buffer.from(result) : Buffer.alloc(0);
}

function deflate_lz4(value: Buffer): Buffer {
  lz4js = lz4js || Util.load('lz4js');
  try {
    // let result = Buffer.alloc(lz4js.encodeBound(value.length));
    // const compressedSize = lz4.encodeBlock(value, result);
    // // remove unnecessary bytes
    // result = result.slice(0, compressedSize);
    // return result;
    return Buffer.from(lz4js.compress(value));
  } catch (err) {
    throw err;
  }
}
function inflate_identity(value: Buffer): Buffer {
  return value;
}

function inflate_gzip(value: Buffer): Buffer {
  return zlib.gunzipSync(value);
}

function inflate_snappy(value: Buffer): Buffer {
  return snappyjs.uncompress(value);
}

function inflate_lzo(value: Buffer, size: number): Buffer {
  lzo = lzo || Util.load('lzo');
  return lzo.decompress(value, size);
}

function inflate_lz4(value: Buffer, size: number): Buffer {
  lz4js = lz4js || Util.load('lz4js');
  try {
    // let result = Buffer.alloc(size);
    // const uncompressedSize = lz4js.decodeBlock(value, result);
    // // remove unnecessary bytes
    // result = result.slice(0, uncompressedSize);
    // return result;
    return Buffer.from(lz4js.decompress(value, size));
  } catch (err) {
    throw err;
  }
}

function inflate_brotli(value: Buffer): Buffer {
  brotli = brotli || Util.load('brotli');
  if (!value.length) {
    return Buffer.alloc(0);
  }
  return Buffer.from(brotli.decompress(value));
}
*/
