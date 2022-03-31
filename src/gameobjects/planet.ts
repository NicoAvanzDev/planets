import {
  BufferGeometry,
  CircleGeometry,
  Mesh,
  MeshBasicMaterial,
  Vector2,
} from 'three'
import { World } from '../components/world'
import { G, SCALE, TIMESTEP } from '../constants'
import { GameObject } from './gameobject'

class Planet extends GameObject {
  private geometry: BufferGeometry
  private material: MeshBasicMaterial
  private mesh: Mesh

  private mass: number

  private isSun: boolean

  private x: number
  private y: number
  private velx: number
  private vely: number

  constructor(
    position: Vector2,
    radius: number,
    mass: number,
    color: string,
    velocity: Vector2 = new Vector2(0, 0),
    isSun: boolean = false
  ) {
    super()
    this.geometry = new CircleGeometry(radius, 32)
    this.material = new MeshBasicMaterial({ color: color, wireframe: true })
    this.mesh = new Mesh(this.geometry, this.material)

    this.mass = mass

    this.isSun = isSun

    this.velx = velocity.x
    this.vely = velocity.y

    // Initial position
    this.x = position.x
    this.y = position.y

    this.setup()
  }

  get getGameObject(): Mesh {
    return this.mesh
  }

  update(): void {
    if (this.isSun) return
    this.updatePosition()
  }

  private setup(): void {}

  private updatePosition(): void {
    const totalForce = { x: 0, y: 0 }
    for (const planet of World.gameObjects) {
      if (planet == this) continue

      const attraction = this.calculateAttraction(planet as Planet)
      totalForce.x += attraction.x
      totalForce.y += attraction.y
    }

    this.velx += (totalForce.x / this.mass) * TIMESTEP
    this.vely += (totalForce.y / this.mass) * TIMESTEP

    this.x += this.velx * TIMESTEP
    this.y += this.vely * TIMESTEP

    this.mesh.position.x = this.x * SCALE
    this.mesh.position.y = this.y * SCALE
    this.mesh.position.z = 0
  }

  private calculateAttraction(other: Planet): Vector2 {
    const distancex = other.x - this.x
    const distancey = other.y - this.y
    const distance = Math.sqrt(distancex ** 2 + distancey ** 2)

    const force = (G * this.mass * other.mass) / distance ** 2
    const theta = Math.atan2(distancey, distancex)
    const forceX = force * Math.cos(theta)
    const forceY = force * Math.sin(theta)

    return new Vector2(forceX, forceY)
  }
}

export default Planet
