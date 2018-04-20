import { CollectionEquipment } from './CollectionEquipment'
import { CollectionMineral } from './CollectionMineral'
import { CollectionPlanet } from './CollectionPlanet'
import { CollectionPlayer } from './CollectionPlayer'
import { CollectionRace } from './CollectionRace'
import { CollectionSector } from './CollectionSector'
import { CollectionStation } from './CollectionStation'
import { CollectionStatus } from './CollectionStatus'
import { CollectionFactory } from './CollectionFactory'

export const install = [
  new CollectionEquipment(),
  new CollectionMineral(),
  new CollectionPlanet(),
  new CollectionPlayer(),
  new CollectionRace(),
  new CollectionSector(),
  new CollectionStation(),
  new CollectionStatus(),
  new CollectionFactory(),
]
