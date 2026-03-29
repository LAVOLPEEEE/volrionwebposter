import * as THREE from 'three'
import { GLTFLoader } from 'GLTFLoader'
import { RectAreaLightUniformsLib } from 'RectAreaLightUniformsLib'

document.addEventListener('DOMContentLoaded', () => {
  initThree()
})

function initThree() {
  const model = document.querySelector('.canvas')

  const scene = new THREE.Scene()
  scene.background = null

  const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    3000
  )
  camera.position.set(3, 5, 45)
  camera.lookAt(3, 5.5, 0)

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  model.appendChild(renderer.domElement)

  function updateRendererSize() {
    const containerRect = model.getBoundingClientRect()
    renderer.setSize(containerRect.width, containerRect.height)
    camera.aspect = containerRect.width / containerRect.height
    camera.updateProjectionMatrix()
  }

  updateRendererSize()
  window.addEventListener('resize', updateRendererSize)

  const loader = new GLTFLoader()
  loader.load(
    'static/models/tv.glb',
    function (gltf) {
      scene.add(gltf.scene)
      console.log('Модель загружена успешно')
    },
    function (xhr) {
      console.log(((xhr.loaded / xhr.total) * 100).toFixed(2) + '% loaded')
    },
    function (error) {
      console.error('Ошибка загрузки модели:', error)
    }
  )

  const light = new THREE.AmbientLight(0xeeeeee)
  scene.add(light)

  const mousePosition = {
    x: 0,
    y: 0
  }

  function updateMousePosition(event) {
    const rect = renderer.domElement.getBoundingClientRect()
    mousePosition.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
    mousePosition.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
  }

  renderer.domElement.addEventListener('mousemove', updateMousePosition)

  function animate() {
    requestAnimationFrame(animate)

    const targetRotationY = mousePosition.x * 0.5
    scene.rotation.y += (targetRotationY - scene.rotation.y) * 0.1

    renderer.render(scene, camera)
  }
  animate()
}
