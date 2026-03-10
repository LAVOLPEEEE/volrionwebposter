const canvas = document.getElementById('scratchCanvas')
const ctx = canvas.getContext('2d')
const resetBtn = document.getElementById('resetBtn')

let isScratching = false
let originalImageData

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
})

// Кнопка сброса
resetBtn.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.putImageData(originalImageData, 0, 0)
  ctx.globalCompositeOperation = 'destination-out'
})

window.addEventListener('load', resizeCanvas)
window.addEventListener('resize', resizeCanvas)
