// АНИМАЦИЯ БУКВ
document.addEventListener('DOMContentLoaded', function () {
  const letterElement = document.getElementById('animation1-for-letter')
  letterElement.classList.add('blinkLetters')
  const replacementLetter = 'O'

  letterElement.addEventListener('mouseenter', function () {
    letterElement.style.animationPlayState = 'paused'
    letterElement.textContent = replacementLetter
  })

  letterElement.addEventListener('mouseleave', function () {
    letterElement.textContent = '#'
    letterElement.style.animationPlayState = 'running'
  })
})

document.addEventListener('DOMContentLoaded', function () {
  const letterElement = document.getElementById('animation2-for-letter')
  letterElement.classList.add('blinkLetters')
  const replacementLetter = 'Е'

  letterElement.addEventListener('mouseenter', function () {
    letterElement.style.animationPlayState = 'paused'
    letterElement.textContent = replacementLetter
  })

  letterElement.addEventListener('mouseleave', function () {
    letterElement.textContent = '%'
    letterElement.style.animationPlayState = 'running'
  })
})

document.addEventListener('DOMContentLoaded', function () {
  const letterElement = document.getElementById('animation3-for-letter')
  letterElement.classList.add('blinkLetters')
  const replacementLetter = 'М'

  letterElement.addEventListener('mouseenter', function () {
    letterElement.style.animationPlayState = 'paused'
    letterElement.textContent = replacementLetter
  })

  letterElement.addEventListener('mouseleave', function () {
    letterElement.textContent = '!'
    letterElement.style.animationPlayState = 'running'
  })
})
document.addEventListener('DOMContentLoaded', function () {
  const letterElement = document.getElementById('animation4-for-letter')
  letterElement.classList.add('blinkLetters')
  const replacementLetter = 'Щ'

  letterElement.addEventListener('mouseenter', function () {
    letterElement.style.animationPlayState = 'paused'
    letterElement.textContent = replacementLetter
  })

  letterElement.addEventListener('mouseleave', function () {
    letterElement.textContent = '7'
    letterElement.style.animationPlayState = 'running'
  })
})

document.addEventListener('DOMContentLoaded', function () {
  const letterElement = document.getElementById('animation5-for-letter')
  letterElement.classList.add('blinkLetters')
  const replacementLetter = 'Е'

  letterElement.addEventListener('mouseenter', function () {
    letterElement.style.animationPlayState = 'paused'
    letterElement.textContent = replacementLetter
  })

  letterElement.addEventListener('mouseleave', function () {
    letterElement.textContent = '%'
    letterElement.style.animationPlayState = 'running'
  })
})
