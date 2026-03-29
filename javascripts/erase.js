const canvas = document.getElementById('scratchCanvas')
const ctx = canvas.getContext('2d')
const resetBtn = document.getElementById('resetBtn')

let isScratching = false
let originalImageData

let scratchedArea = 0
const PERCENTAGE_TO_ERASE_FOR_MODAL = 55

function resizeCanvas() {
  const computedStyle = getComputedStyle(canvas)
  const width = parseFloat(computedStyle.width)
  const height = parseFloat(computedStyle.height)

  canvas.width = width
  canvas.height = height

  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(overlayImage, 0, 0, canvas.width, canvas.height)

  originalImageData = ctx.getImageData(0, 0, canvas.width, canvas.height)

  ctx.globalCompositeOperation = 'destination-out'
}

// Изображение для верхнего слоя
const overlayImage = new Image()
overlayImage.crossOrigin = 'anonymous'
overlayImage.onload = function () {
  resizeCanvas()
}
overlayImage.src = 'static/images/front_erase.svg'

canvas.addEventListener('mousedown', () => (isScratching = true))
canvas.addEventListener('mouseup', () => (isScratching = false))
canvas.addEventListener('mouseleave', () => (isScratching = false))

canvas.addEventListener('mousemove', (e) => {
  if (!isScratching) return

  const rect = canvas.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top

  ctx.beginPath()
  ctx.arc(x, y, 50, 0, Math.PI * 2)
  ctx.fill()

  if (Math.random() < 0.1) {
    checkScratchedPercentage()
  }
})

canvas.addEventListener('touchstart', (e) => {
  isScratching = true
  e.preventDefault()
})

canvas.addEventListener('touchend', () => {
  isScratching = false
})

canvas.addEventListener('touchmove', (e) => {
  if (!isScratching) return

  const touch = e.touches[0]
  const rect = canvas.getBoundingClientRect()
  const x = touch.clientX - rect.left
  const y = touch.clientY - rect.top

  ctx.beginPath()
  ctx.arc(x, y, 15, 0, Math.PI * 2)
  ctx.fill()

  if (Math.random() < 0.1) {
    checkScratchedPercentage()
  }
})

resetBtn.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.putImageData(originalImageData, 0, 0)
  ctx.globalCompositeOperation = 'destination-out'
  scratchedArea = 0
})

window.addEventListener('load', resizeCanvas)
window.addEventListener('resize', resizeCanvas)

function getScratchedPercentage() {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  const pixels = imageData.data
  let transparentCount = 0
  let totalPixels = 0

  for (let i = 3; i < pixels.length; i += 4) {
    if (pixels[i] === 0) transparentCount++
    totalPixels++
  }

  scratchedArea = (transparentCount / totalPixels) * 100
  return scratchedArea
}

function checkScratchedPercentage() {
  const percentage = getScratchedPercentage()
  console.log(`Стёрто: ${percentage.toFixed(1)}%`)

  if (percentage >= PERCENTAGE_TO_ERASE_FOR_MODAL) {
    onScratchComplete()
  }
}

function onScratchComplete() {
  document.getElementById('modal-overlay').style.display = 'flex'

  document.getElementById('close-modal').onclick = () => {
    document.getElementById('modal-overlay').style.display = 'none'
  }
}
