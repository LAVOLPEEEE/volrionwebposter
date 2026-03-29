let draggingLetter = null
let successfulLettersInWords = [0, 0, 0]
const basePicture = `url("../static/images/empty1.svg")`

function makeDraggableElement(element) {
  let isDragging = false
  let initialX, initialY
  let baseLeft, baseTop
  const baseLetterZIndex = 30
  const draggableZIndex = 60

  element.draggable = false
  element.style.transition = 'none'

  element.addEventListener('pointerdown', startDragging)
  document.addEventListener('pointermove', drag)
  document.addEventListener('pointerup', stopDragging)

  function startDragging(e) {
    e.preventDefault()
    e.stopPropagation()

    const alph = document.querySelector('.alphabet')
    if (!alph.classList.contains('alphabet_hidden')) {
      alph.classList.add('alphabet_hidden')
    }

    isDragging = true
    element.style.zIndex = draggableZIndex
    draggingLetter = e

    baseLeft = parseFloat(getComputedStyle(element).left) || 0
    baseTop = parseFloat(getComputedStyle(element).top) || 0

    initialX = e.clientX
    initialY = e.clientY
  }

  function drag(e) {
    if (!isDragging) return

    element.style.zIndex = 90

    e.preventDefault()

    const deltaX = e.clientX - initialX
    const deltaY = e.clientY - initialY

    element.style.left = baseLeft + deltaX + 'px'
    element.style.top = baseTop + deltaY + 'px'
  }

  function stopDragging() {
    if (!isDragging) {
      return
    }

    element.style.zIndex = baseLetterZIndex

    const box = element.getBoundingClientRect()
    const centerOfDraggingLetterX = box.left + box.width / 2
    const centerOfDraggingLetterY = box.top + box.height / 2
    const currentPositionX = element.style.left
    const currentPositionY = element.style.top

    element.style.left = toVw(baseLeft, -1)
    element.style.top = toVw(baseTop, 0)

    const cell = document.elementFromPoint(
      centerOfDraggingLetterX,
      centerOfDraggingLetterY
    )
    console.log(cell)

    if (cell && cell.classList.contains('dragging_cell')) {
      if (cell.dataset.letter === element.dataset.letter) {
        cell.src = element.src
        element.remove()

        setSuccessfulPicture(cell)
      } else {
        setWrongPicture(cell)
      }
    } else if (cell && cell.classList.contains('right_flex_second_game')) {
      element.style.left = toVw(currentPositionX, -1)
      element.style.top = toVw(currentPositionY, 0)
    }

    isDragging = false
    draggingLetter = null
  }
}

function toVw(number, bias) {
  return (
    (parseInt(number) / document.documentElement.clientWidth) * 100 +
    bias +
    'vw'
  )
}

function setWrongPicture(elem) {
  const wrongPicture = `url("../static/images/wrong1.svg")`

  const wordNumber = elem.parentElement.dataset.answer_word_number
  const answerPicture = document.querySelector(
    '.answer_second_game' + wordNumber
  )

  answerPicture.style.backgroundImage = wrongPicture
  setTimeout(() => {
    answerPicture.style.backgroundImage = basePicture
  }, PAIR_LETTER_CLICK_ANIMATION_TIME)
}

function setSuccessfulPicture(elem) {
  const successfulPicture = `url("../static/images/true1.svg")`

  const wordNumber = elem.parentElement.dataset.answer_word_number
  const answerPicture = document.querySelector(
    '.answer_second_game' + wordNumber
  )

  successfulLettersInWords[wordNumber - 1]++

  answerPicture.style.backgroundImage = successfulPicture
  if (successfulLettersInWords[wordNumber - 1] < 6) {
    setTimeout(() => {
      answerPicture.style.backgroundImage = basePicture
    }, PAIR_LETTER_CLICK_ANIMATION_TIME)
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.draggable').forEach((element) => {
    makeDraggableElement(element)
  })
})

function showAlphabet(e) {
  e.stopPropagation()
  const alph = document.querySelector('.alphabet')
  if (!alph.classList.contains('alphabet_hidden')) {
    alph.classList.add('alphabet_hidden')

    return
  }

  alph.classList.remove('alphabet_hidden')

  document.addEventListener(
    'mousedown',
    function closeAlphabetOutside(clickEvent) {
      if (!alph.contains(clickEvent.target)) {
        alph.classList.add('alphabet_hidden')
        document.removeEventListener('mousedown', closeAlphabetOutside)
      }
    }
  )
}
document.addEventListener('DOMContentLoaded', () => {
  document
    .querySelector('.alphabet_button')
    .addEventListener('mousedown', showAlphabet)
})
