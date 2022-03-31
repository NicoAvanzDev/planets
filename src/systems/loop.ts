import { Camera, Scene, WebGLRenderer } from 'three'
import { GameObject } from '../gameobjects/gameobject'
class Loop {
  private camera: Camera
  private scene: Scene
  private renderer: WebGLRenderer

  private static updatables: GameObject[]

  constructor(camera: Camera, scene: Scene, renderer: WebGLRenderer) {
    this.camera = camera
    this.scene = scene
    this.renderer = renderer

    Loop.updatables = []
  }

  static get gameObjects(): GameObject[] {
    return this.updatables
  }

  start() {
    this.renderer.setAnimationLoop(() => {
      this.tick()
      this.renderer.render(this.scene, this.camera)
    })
  }

  stop() {
    this.renderer.setAnimationLoop(null)
  }

  tick() {
    for (const obj of Loop.updatables) {
      obj.update()
    }
  }

  addGameObject(gameObject: GameObject) {
    this.scene.add(gameObject.getGameObject)
    Loop.updatables.push(gameObject)
  }

  removeGameObject(gameObject: GameObject) {
    this.scene.remove(gameObject.getGameObject)
    Loop.updatables = Loop.updatables.filter(obj => obj !== gameObject)
  }
}

export { Loop }
