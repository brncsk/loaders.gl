// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors

import type {
  Schema,
  TableBatch,
  Table,
  ObjectRowTable,
  ArrayRowTable,
  Feature
} from '@loaders.gl/schema';
import {getTableLength} from '../tables/table-accessors';

/**
 * Assembles all batches from an async iterator into a single table.
 * @note All batches must have the same shape and schema
 * @param batchIterator
 * @returns `null` if no batches are yielded by the async iterator
 */
// eslint-disable-next-line complexity
export async function makeTableFromBatches(
  batchIterator: AsyncIterable<TableBatch> | Iterable<TableBatch>
): Promise<Table | null> {
  let arrayRows: ArrayRowTable['data'];
  let objectRows: ObjectRowTable['data'];
  let features: Feature[];
  let shape: Table['shape'] | null = null;
  let schema: Schema | undefined;

  for await (const batch of batchIterator) {
    shape = shape || batch.shape;
    schema = schema || batch.schema;

    switch (batch.shape) {
      case 'array-row-table':
        arrayRows = arrayRows! || [];
        for (let rowIndex = 0; rowIndex < getTableLength(batch); rowIndex++) {
          const row = batch.data[rowIndex];
          arrayRows.push(row);
        }
        break;

      case 'object-row-table':
        objectRows = objectRows! || [];
        for (let rowIndex = 0; rowIndex < getTableLength(batch); rowIndex++) {
          const row = batch.data[rowIndex];
          objectRows.push(row);
        }
        break;

      case 'geojson-table':
        features = features! || [];
        for (let rowIndex = 0; rowIndex < getTableLength(batch); rowIndex++) {
          const row = batch.features[rowIndex];
          features.push(row);
        }
        break;

      case 'columnar-table':
      case 'arrow-table':
      default:
        throw new Error('shape');
    }
  }

  if (!shape) {
    return null;
  }

  switch (shape) {
    case 'array-row-table':
      return {shape: 'array-row-table', data: arrayRows!, schema};

    case 'object-row-table':
      return {shape: 'object-row-table', data: objectRows!, schema};

    case 'geojson-table':
      return {shape: 'geojson-table', type: 'FeatureCollection', features: features!, schema};

    default:
      return null;
  }
}
