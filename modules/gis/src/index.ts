// Types from `@loaders.gl/schema`

// Geo Metadata
// import {default as GEOPARQUET_METADATA_SCHEMA} from './lib/geo/geoparquet-metadata-schema.json';
// export {GEOPARQUET_METADATA_SCHEMA};
// export {GEOPARQUET_METADATA_JSON_SCHEMA} from './lib/geoarrow/geoparquet-metadata-schema';

// export type {GeoMetadata} from './lib/geoarrow/geoparquet-metadata';
// export {
//   getGeoMetadata,
//   setGeoMetadata,
//   unpackGeoMetadata
// } from './lib/geoarrow/geoparquet-metadata';
// export {unpackJSONStringMetadata} from './lib/geoarrow/geoparquet-metadata';

//
export type {GeojsonGeometryInfo} from './lib/geometry-api/geometry-info';
export {getGeometryInfo} from './lib/geometry-api/geometry-info';

// Binary Geometry Utilities
export type {BinaryGeometryInfo} from './lib/binary-geometry-api/binary-geometry-info';
export {getBinaryGeometryInfo} from './lib/binary-geometry-api/binary-geometry-info';
export {
  transformBinaryCoords,
  transformGeoJsonCoords
} from './lib/binary-geometry-api/transform-coordinates';

// TABLE CONVERSION
export {convertGeoArrowToTable} from './lib/table-converters/convert-geoarrow-table';
export {convertWKBTableToGeoJSON} from './lib/table-converters/convert-wkb-table-to-geojson';

// FEATURE COLLECTION CONVERSION
export {
  convertFlatGeojsonToBinaryFeatureCollection,
  // deprecated
  convertFlatGeojsonToBinaryFeatureCollection as flatGeojsonToBinary
} from './lib/feature-collection-converters/convert-flat-geojson-to-binary-features';
export {
  convertGeojsonToBinaryFeatureCollection,
  // deprecated
  convertGeojsonToBinaryFeatureCollection as geojsonToBinary
} from './lib/feature-collection-converters/convert-geojson-to-binary-features';
export {
  convertGeojsonToFlatGeojson,
  // deprecated
  convertGeojsonToFlatGeojson as geojsonToFlatGeojson
} from './lib/feature-collection-converters/convert-geojson-to-flat-geojson';
export {
  convertBinaryFeatureCollectionToGeojson,
  convertBinaryFeatureCollectionToGeojson as binaryToGeojson
} from './lib/feature-collection-converters/convert-binary-features-to-geojson';

// GEOMETRY ENCODING DETECTION
export {isWKB, isTWKB, isWKT} from './lib/geometry-converters/wkb/helpers/parse-wkb-header';

export type {WKBHeader} from './lib/geometry-converters/wkb/helpers/wkb-types';
export {WKT_MAGIC_STRINGS} from './lib/geometry-converters/wkb/helpers/wkb-types';

// GEOMETRY CONVERSION
export {convertBinaryGeometryToGeometry} from './lib/geometry-converters/convert-binary-geometry-to-geojson';

export {convertWKTToGeometry} from './lib/geometry-converters/wkb/convert-wkt-to-geometry';
export {convertWKBToGeometry} from './lib/geometry-converters/wkb/convert-wkb-to-geometry';
export {convertWKBToBinaryGeometry} from './lib/geometry-converters/wkb/convert-wkb-to-binary-geometry';
export {convertTWKBToGeometry} from './lib/geometry-converters/wkb/convert-twkb-to-geometry';

export {convertGeometryToWKT} from './lib/geometry-converters/wkb/convert-geometry-to-wkt';
export {convertGeometryToWKB} from './lib/geometry-converters/wkb/convert-geometry-to-wkb';
export {convertGeometryToTWKB} from './lib/geometry-converters/wkb/convert-geometry-to-twkb';

// CRS
export type {WKTCRS, ParseWKTCRSOptions} from './lib//wkt-crs/parse-wkt-crs';
export {parseWKTCRS} from './lib//wkt-crs/parse-wkt-crs';
export type {EncodeWKTCRSOptions} from './lib//wkt-crs/encode-wkt-crs';
export {encodeWKTCRS} from './lib//wkt-crs/encode-wkt-crs';

// GEOARROW
export type {
  BinaryDataFromGeoArrow,
  BinaryGeometriesFromArrowOptions
} from './lib/feature-collection-converters/convert-geoarrow-to-binary-features';
export {
  convertGeoArrowToBinaryFeatureCollection,
  // deprecated
  convertGeoArrowToBinaryFeatureCollection as getBinaryGeometriesFromArrow,
  getBinaryGeometryTemplate,
  getTriangleIndices,
  getMeanCentersFromBinaryGeometries
} from './lib/feature-collection-converters/convert-geoarrow-to-binary-features';

export {convertGeoArrowGeometryToGeoJSON} from './lib/geometry-converters/convert-geoarrow-to-geojson';

// EXPERIMENTAL APIs

export {encodeHex, decodeHex} from './lib/utils/hex-transcoder';
export {extractNumericPropTypes as _extractNumericPropTypes} from './lib/feature-collection-converters/convert-flat-geojson-to-binary-features';
