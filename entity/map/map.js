import uuidV4 from 'uuid/v4'
import { Vector2 }  from 'three'

export const map = [
  {
    entity: 'Sector',
    id: uuidV4(),
    name: 'Alpha',
    size: new Vector2(1000, 1000),
    position: new Vector2(0, 0),
    SectorHasPlanet: [
      {
        entity: 'Planet',
        id: uuidV4(),
        name: 'Земля',
      },
      {
        entity: 'Planet',
        id: uuidV4(),
        name: 'Меркурий',
      }
    ],
    SectorHasStation: [

    ]
  },
  {
    entity: 'Sector',
    id: uuidV4(),
    name: 'Betta',
    size: new Vector2(1000, 1000),
    position: new Vector2(0, 1000),
    SectorHasPlanet: [

    ],
    SectorHasStation: [

    ]
  }
]