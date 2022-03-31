import { OrthographicCamera } from 'three'
import { VIEW_HEIGHT, VIEW_RATE, VIEW_WIDTH } from '../constants'

function createCamera(): OrthographicCamera {
  const camera = new OrthographicCamera(
    VIEW_WIDTH / -VIEW_RATE,
    VIEW_WIDTH / VIEW_RATE,
    VIEW_HEIGHT / -VIEW_RATE,
    VIEW_HEIGHT / VIEW_RATE,
    0,
    1000
  )
  camera.position.z = 100

  return camera
}

export default createCamera
