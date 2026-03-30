const PAIR_LETTER_CLICK_ANIMATION_TIME = 700

let successfulPairsCount = 0
let firstButton = null

function updateProgressBar() {
  const progressBar = document.querySelector('.progressbar')
  const progressBarPicture = `url("./static/images/proc${successfulPairsCount}0.svg")`

  progressBar.style.backgroundImage = progressBarPicture
}

function handleButtonClick(button) {
  // уже нажата
  if (button.classList.contains('button_pressed')) return

  // проигрывается звук
  const letter = button.dataset.letter
  const soundUrl = getSoundByLetter(letter)
  if (soundUrl) {
    playSound(soundUrl)
  }

  button.classList.add('button_pressed')

  // если первая буква не была нажата
  if (!firstButton) {
    firstButton = button
  } else {
    checkPair(button)
  }
}

function playSound(soundUrl) {
  const audio = new Audio(soundUrl)
  audio.play()
}

function checkPair(secondButton) {
  const basePicture = './static/images/empty.svg'
  const wrongPicture = './static/images/wrong.svg'
  const successfulPicture = './static/images/true.svg'

  const firstLetter = firstButton.dataset.letter
  const secondLetter = secondButton.dataset.letter

  console.log(firstLetter)
  console.log(secondLetter)
  console.log(isEqualLetter(firstLetter, secondLetter))
  let victoryPicture = document.querySelector('.screen')

  if (isEqualLetter(firstLetter, secondLetter)) {
    firstButton = null

    successfulPairsCount++
    updateProgressBar()

    victoryPicture.style.backgroundImage = `url("${successfulPicture}")`
    if (successfulPairsCount < 10) {
      setTimeout(() => {
        victoryPicture.style.backgroundImage = `url("${basePicture}")`
      }, PAIR_LETTER_CLICK_ANIMATION_TIME)
    }
  } else {
    victoryPicture.style.backgroundImage = `url("${wrongPicture}")`
    setTimeout(() => {
      firstButton.classList.remove('button_pressed')
      secondButton.classList.remove('button_pressed')
      firstButton = null

      victoryPicture.style.backgroundImage = `url("${basePicture}")`
    }, PAIR_LETTER_CLICK_ANIMATION_TIME)
  }
}

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.btn').forEach((button) => {
    ;['mousedown', 'touchstart'].forEach((event) => {
      button.addEventListener(event, function (e) {
        e.preventDefault()
        handleButtonClick(this)
      })
    })
  })
})
