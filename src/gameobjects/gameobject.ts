import { Mesh } from 'three'

abstract class GameObject {
  abstract update(): void
  abstract get getGameObject(): Mesh
}

export { GameObject }
