import { WebGLRenderer } from 'three'
import { VIEW_HEIGHT, VIEW_WIDTH } from '../constants'

function createRenderer(): WebGLRenderer {
  const renderer = new WebGLRenderer()
  renderer.setViewport(0, 0, VIEW_WIDTH, VIEW_HEIGHT)
  renderer.setSize(VIEW_WIDTH, VIEW_HEIGHT)
  return renderer
}

export default createRenderer
