document.addEventListener('DOMContentLoaded', function () {
  let drag_elements = document.querySelectorAll('.letter_о1')

  drag_elements.forEach(function (element) {
    let isDragging = false
    let offsetX = 0
    let offsetY = 0
    let startX = 0
    let startY = 0
    let currentX = 0
    let currentY = 0

    element.addEventListener('mousedown', function (event) {
      isDragging = true
      // Считываем начальные координаты
      startX = event.clientX
      startY = event.clientY
      // Считываем текущий `transform`, если он есть
      let transform = window.getComputedStyle(element).transform
      if (transform !== 'none') {
        let matrix = new DOMMatrix(transform)
        currentX = matrix.m41 // Смещение по X
        currentY = matrix.m42 // Смещение по Y
      }
      function onMouseMove(event) {
        if (isDragging) {
          offsetX = event.clientX - startX
          offsetY = event.clientY - startY
          element.style.transform = `translate(${currentX + offsetX}px, ${currentY + offsetY}px)`
        }
      }
      function onMouseUp() {
        isDragging = false
        // Обновляем текущие координаты после отпускания
        currentX += offsetX
        currentY += offsetY
        document.removeEventListener('mousemove', onMouseMove)
        document.removeEventListener('mouseup', onMouseUp)
      }
      document.addEventListener('mousemove', onMouseMove)
      document.addEventListener('mouseup', onMouseUp)
    })
  })

  window.addEventListener(
    'keydown',
    function (e) {
      if (
        ['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].indexOf(
          e.code
        ) > -1
      ) {
        e.preventDefault()
      }
    },
    false
  )
})
