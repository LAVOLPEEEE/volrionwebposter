// АНИМАЦИЯ БУКВ
function setupLetterAnimation(element) {
  element.addEventListener('mouseenter', function () {
    element.style.animationPlayState = 'paused'
    element.textContent = translateForeignToRu(element.textContent)
  })

  element.addEventListener('mouseleave', function () {
    element.textContent = translateRuToForeign(element.textContent)
    element.style.animationPlayState = 'running'
  })
}

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.toh').forEach(setupLetterAnimation)
})
