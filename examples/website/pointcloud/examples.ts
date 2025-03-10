// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors

import {Example} from './components/example-panel';

const DECK_DATA_URI = 'https://raw.githubusercontent.com/visgl/deck.gl-data/master';
const LOADERS_URI = 'https://raw.githubusercontent.com/visgl/loaders.gl/master';

export const EXAMPLES: Record<string, Record<string, Example>> = {
  PLY: {
    'Richmond Azaelias': {
      type: 'ply',
      url: `${LOADERS_URI}/modules/ply/test/data/richmond-azaelias.ply`
    },
    'Lucy 800K': {
      type: 'ply',
      url: `${DECK_DATA_URI}/examples/point-cloud-ply/lucy800k.ply`
    },
    'Lucy 100K': {
      type: 'ply',
      url: `${DECK_DATA_URI}/examples/point-cloud-ply/lucy100k.ply`
    },
    Bunny: {
      type: 'ply',
      url: `${LOADERS_URI}/modules/ply/test/data/bunny.ply`
    },
    'Bun Zipper (Text)': {
      type: 'ply',
      url: `${LOADERS_URI}/modules/ply/test/data/bun_zipper.ply`
    }
  },

  LAZ: {
    // Data source: kaarta.com
    'Indoor Scan 800K': {
      type: 'las',
      url: `${DECK_DATA_URI}/examples/point-cloud-laz/indoor.0.1.laz`
    },
    'LAS 1-4 example': {
      type: 'las',
      // TODO upload the file to deck data
      url: 'https://pub-0e04e4fabfef402d8789a24f6a393790.r2.dev/SerpentMound_LAS14_ExtraDims.laz'

    },
    // TODO need fix
    // 'Indoor Scan 8M': {
    //   type: 'las',
    //   url: `${DECK_DATA_URI}/examples/point-cloud-laz/indoor.laz`
    // },
  },

  Draco: {
    Bunny: {
      type: 'draco',
      url: `${LOADERS_URI}/modules/draco/test/data/bunny.drc`
    }
  },
  // TODO need fix
  PCD: {
    Zaghetto: {
      url: `${LOADERS_URI}/modules/pcd/test/data/Zaghetto.pcd`
    },
    'Simple (Text)': {
      url: `${LOADERS_URI}/modules/pcd/test/data/simple-ascii.pcd`
    }
  },

  OBJ: {
    Bunny: {
      type: 'obj',
      url: `${LOADERS_URI}/modules/obj/test/data/bunny.obj`
    },
    Magnolia: {
      type: 'obj',
      url: `${LOADERS_URI}/modules/obj/test/data/magnolia.obj`
    }
    // TODO need fix
    // Cube: {
    //   url: `${LOADERS_URI}/modules/obj/test/data/cube.obj`
    // }
  }
};
