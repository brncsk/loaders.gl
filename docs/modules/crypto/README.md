# Overview

<p class="badges">
  <img src="https://img.shields.io/badge/From-v2.3-blue.svg?style=flat-square" alt="From-v3.0" />
</p>

The `@loaders.gl/crypto` module provides a selection of optional cryptographic hash plugins for loaders.gl.

Terminology:

- A **hash** is an

## Cryptographic Algorithmgs

MD5, SHA256 and many more, see [crypto-js](https://github.com/brix/crypto-js)

## Encoding

A hash algorithm takes input data and generates a digest. The digest is a number, usually containing a fixed number of bits.
Since the number of bits involved is often large (e.g. SHA256 generates a 256 bit digest), digests are typically encoded as strings instead of numbers.

The two most common string encodings of numbers are _hex_ and _base64_.
Which one you want to use often depends on what you are planning to do with the digest.
If you are calling an existing API (perhaps a cloud storage service)
you will want to generate the encoding that matches or is required by that API.

All hash functions in the `@loaders.gl/crypto` module take an `encoding` parameter that lets you specify the encoding.

## Cryptographic Hash API

The API offers "transforms" that can calculate a cryptographic hash incrementally on data as it comes in on a stream.

| Transforms                                                     | Sync | Description                       |
| -------------------------------------------------------------- | ---- | --------------------------------- |
| [`CRC32Hash`](/docs/modules/crypto/api-reference/crc32-hash)   | Y    | Base64-encoded Cryptographic Hash |
| [`CRC32CHash`](/docs/modules/crypto/api-reference/crc32c-hash) | Y    | Base64-encoded Cryptographic Hash |
| [`MD5Hash`](/docs/modules/crypto/api-reference/md5-hash)       | Y    | Base64-encoded Cryptographic Hash |
| [`SHA256Hash`](/docs/modules/crypto/api-reference/sha256-hash) | Y    | Base64-encoded Cryptographic Hash |

## Using Transforms

The `@loaders.gl/crypto` libraries exports transform that can be used to incrementally calculate a cryptographic hash as data is being loaded and parsed:

```typescript
import {loadInBatches} from '@loaders.gl/core';
import {CRC32Hash} from '@loaders.gl/crypto';

let hash;

const csvIterator = await loadInBatches(CSV_URL, CSVLoader, {
  transforms: [CRC32Hash],
  crypto: {
    onEnd: (result) => {
      hash = result.hash;
    }
  }
});

let csv;
for await (const batch of csvIterator) {
}

console.log(hash);
```

Note that by using a transform, the hash is calculated incrementally as batches are loaded and parsed, and does not require having the entire data source loaded into memory. It also distributes the potentially heavy hash calculation over the batches, keeping the main thread responsive.

## Performance

Note that cryptographic hashing is a computationally expensive operation, linear in the size of the data being hashed. Hashing speeds are currently in the order of 30-150MB/s on a 2019 MacBook Pro:

```
Cryptographic Hash
├─ CRC32Hash#run(): 150M bytes/s
├─ CRC32CHash#run(): 151M bytes/s
├─ MD5Hash#run(): 75.8M bytes/s
├─ SHA256Hash#run(SHA256): 30.6M bytes/s
```
