const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('canvas'),
  antialias: true,
  alpha: true // Включили поддержку прозрачности
})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setClearColor(0x000000, 0) // Прозрачный фон (вместо 0xffffff)
renderer.outputEncoding = THREE.sRGBEncoding // ВКЛЮЧАЕМ ГАММА‑КОРРЕКЦИЮ

// Окружающее освещение (рассеянный свет по всей сцене)
const ambientLight = new THREE.AmbientLight(0x404040, 0.8)
scene.add(ambientLight)

// Основной направленный свет (имитация солнца)
const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
directionalLight.position.set(10, 10, 5)
scene.add(directionalLight)

// Дополнительный направленный свет с другой стороны
const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5)
directionalLight2.position.set(-10, -5, -5)
scene.add(directionalLight2)

// Точечный свет для подсветки деталей
const pointLight = new THREE.PointLight(0xffffff, 0.5, 20)
pointLight.position.set(0, 5, 5)
scene.add(pointLight)

// Добавляем гемисферический свет для градиентного освещения (имитация неба/земли)
const hemiLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 0.6)
scene.add(hemiLight)

// Дополнительные точечные источники света с розовым оттенком для акцентов
const pointLightPink1 = new THREE.PointLight(0xffaacc, 1, 10) // Розовый оттенок
pointLightPink1.position.set(5, 5, 5)
scene.add(pointLightPink1)

const pointLightPink2 = new THREE.PointLight(0xffaacc, 1, 10)
pointLightPink2.position.set(-5, -5, -5)
scene.add(pointLightPink2)

// Включаем тени для реалистичности
renderer.shadowMap.enabled = true
directionalLight.castShadow = true
directionalLight.shadow.mapSize.width = 1024
directionalLight.shadow.mapSize.height = 1024

// Тоновая коррекция для баланса яркости
renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.toneMappingExposure = 1.2

// Функция для обновления масштаба модели в зависимости от размера экрана
function updateModelScale() {
  const windowWidth = window.innerWidth
  let scaleFactor = 1 // базовый масштаб

  // Логика масштабирования:
  // - при ширине >= 1200px: масштаб = 2.5 (исходный)
  // - при ширине < 1200px: плавное уменьшение масштаба
  // - при ширине <= 600px: минимальный масштаб = 1.5
  if (windowWidth >= 1200) {
    scaleFactor = 2.5
  } else if (windowWidth > 600) {
    // Линейная интерполяция между 1200px и 600px
    scaleFactor = 2.5 - (1200 - windowWidth) * (1.0 / 600)
  } else {
    scaleFactor = 1.5 // минимальный масштаб
  }

  // Применяем масштаб к модели (одинаково по всем осям)
  if (model) {
    model.scale.set(scaleFactor, scaleFactor, scaleFactor)
  }
}

// Загрузка модели
const loader = new THREE.GLTFLoader()
let model

loader.load(
  'static/models/tv3333.glb',
  function (gltf) {
    model = gltf.scene

    // ДИАГНОСТИКА: проверяем материалы и текстуры
    model.traverse((child) => {
      if (child.isMesh) {
        console.log('Материал:', child.material)
        if (child.material.map) {
          console.log('Текстура альбедо загружена:', child.material.map)
          child.material.map.encoding = THREE.sRGBEncoding // Убеждаемся, что текстура в sRGB
        } else {
          console.warn('Текстура альбедо не найдена для:', child.name)
        }
      }
    })

    // КОРРЕКЦИЯ ЦВЕТОВ: уменьшаем яркость, если цвет слишком насыщенный
    model.traverse((child) => {
      if (child.isMesh && child.material) {
        if (child.material.color) {
          // Если красный канал сильно доминирует (признак «ярко‑розового»)
          if (
            child.material.color.r > 0.9 &&
            child.material.g < 0.5 &&
            child.material.b < 0.5
          ) {
            child.material.color.setRGB(
              child.material.color.r * 0.6,
              child.material.color.g * 0.8,
              child.material.color.b * 0.8
            )
          }
        }

        // Корректируем параметры материала для более естественного вида
        child.material.metalness = child.material.metalness || 0.2
        child.material.roughness = child.material.roughness || 0.7
      }
    })

    // 1. Центрируем модель в сцене
    model.position.set(0, -3.9, 0)

    // 2. Устанавливаем начальный масштаб (будет скорректирован при загрузке)
    updateModelScale()

    // 3. Фиксируем начальный поворот
    model.rotation.y = 5.2

    scene.add(model)
    animateModel() // запускаем анимацию после загрузки модели
  },
  undefined,
  function (error) {
    console.error('Ошибка загрузки модели:', error)
  }
)

// Позиционирование камеры
camera.position.set(3, 1.5, 6)
camera.lookAt(0, 1, 0)

// Переменные для отслеживания движения курсора
let isMouseMoving = false
let targetRotationY = 0

window.addEventListener('mousemove', (event) => {
  isMouseMoving = true
  targetRotationY = (event.clientX - window.innerWidth / 2) * 0.0005 + 200
})

function animateModel() {
  requestAnimationFrame(animateModel)
  if (model) {
    if (isMouseMoving) {
      model.rotation.y = targetRotationY
    }
  }
  renderer.render(scene, camera)
}

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
  updateModelScale() // обновляем масштаб модели при изменении размера окна
})
