import { Camera, Scene, WebGLRenderer } from 'three'
import createCamera from './camera'
import createScene from './scene'
import createRenderer from '../systems/renderer'
import { Loop } from '../systems/loop'
import { GameObject } from '../gameobjects/gameobject'

class World {
  private camera: Camera
  private scene: Scene
  private renderer: WebGLRenderer
  private loop: Loop

  constructor(container: Element | null) {
    this.camera = createCamera()
    this.scene = createScene()
    this.renderer = createRenderer()

    this.loop = new Loop(this.camera, this.scene, this.renderer)
    container?.append(this.renderer.domElement)
  }

  static get gameObjects() {
    return Loop.gameObjects
  }

  render() {
    this.renderer.render(this.scene, this.camera)
  }

  addGameObject(gameObject: GameObject) {
    this.loop.addGameObject(gameObject)
  }

  removeGameObject(gameObject: GameObject) {
    this.loop.removeGameObject(gameObject)
  }

  start() {
    this.loop.start()
  }

  stop() {
    this.loop.stop()
  }
}

export { World }
