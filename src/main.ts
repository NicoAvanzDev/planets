import { Vector2 } from 'three'
import { World } from './components/world'
import { AU } from './constants'
import { GameObject } from './gameobjects/gameobject'
import Planet from './gameobjects/planet'
import './main.css'

function main() {
  const container = document.querySelector('#app')

  const world = new World(container)

  const planets: GameObject[] = []

  const sun = new Planet(
    new Vector2(0, 0),
    15,
    1.98892 * 10e30,
    'yellow',
    undefined,
    true
  )

  const earth = new Planet(
    new Vector2(AU, 0),
    4,
    5.97219 * 10e24,
    'blue',
    new Vector2(0, 29.783 * 1000)
  )

  const mercury = new Planet(
    new Vector2(0.387 * AU, 0),
    2,
    3.3 * 10e23,
    'red',
    new Vector2(0, -47.4 * 1000)
  )

  planets.push(sun, earth, mercury)

  for (const planet of planets) {
    world.addGameObject(planet)
  }

  world.start()
}

main()
