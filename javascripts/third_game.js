const quizData = [
  {
    question: 'На планете VOLRION живёт большой и грозный _____.',
    options: [';*@+#$', '8({#$8', '5>#{', ';%∗%6#'],
    correct: 0
  },
  {
    question: 'Он охраняет ____ под высокой ____.',
    options: ['{2~@  6#{$@', '!45#*  5>4{', '5#+*#627%  1#*@', '%;@  ;#!'],
    correct: 2
  },
  {
    question: 'Странник должен пройти сложное ___, чтобы найти заветный ____.',
    options: [
      ';№%$  (4+6@',
      '?+№@!%$  8({#+#',
      '6@$$@  6+45$89+@',
      '25&0>@$2%  +{-3'
    ],
    correct: 3
  }
]

let backgroundShift = 0

function shiftStoryBackground() {
  backgroundShift += 42
  const storyElement = document.querySelector('.story')
  if (storyElement) {
    storyElement.style.backgroundPosition = `-${backgroundShift}vw 0`
  }
}

function resetStoryBackground() {
  backgroundShift = 0
  const storyElement = document.querySelector('.story')
  if (storyElement) {
    storyElement.style.backgroundPosition = '0 0'
  }
}

let currentQuestion = 0
let score = 0

function showQuestion() {
  const question = quizData[currentQuestion]
  document.getElementById('question-number').textContent = currentQuestion + 1
  document.getElementById('question-text').textContent = question.question

  const optionsContainer = document.getElementById('options')
  optionsContainer.innerHTML = ''

  question.options.forEach((option, index) => {
    const optionElement = document.createElement('div')
    optionElement.className = 'option'
    optionElement.textContent = option
    optionElement.addEventListener('click', () =>
      selectOption(index, optionElement)
    )
    optionsContainer.appendChild(optionElement)
  })

  document.getElementById('next-btn').style.display = 'none'
}

function selectOption(selectedIndex, element) {
  const options = document.querySelectorAll('.option')
  options.forEach((opt) => {
    opt.classList.add('disabled')
  })

  const question = quizData[currentQuestion]

  if (selectedIndex === question.correct) {
    element.classList.add('correct')
    score++
  } else {
    element.classList.add('incorrect')
  }

  // Смещение фона после выбора ответа
  shiftStoryBackground()

  document.getElementById('next-btn').style.display = 'block'
}

function nextQuestion() {
  currentQuestion++

  if (currentQuestion < quizData.length) {
    showQuestion()
  } else {
    showResult()
  }
}

function showResult() {
  document.querySelector('.question-container').style.display = 'none'
  document.getElementById('result').style.display = 'block'
  document.getElementById('result').textContent =
    `Вы ответили правильно на ${score} из ${quizData.length} вопросов!`
  document.getElementById('restart-btn').style.display = 'block'
  document.getElementById('next-btn').style.display = 'none'
}

function restartQuiz() {
  currentQuestion = 0
  score = 0
  resetStoryBackground() // Сброс фона в начальное положение
  document.querySelector('.question-container').style.display = 'block'
  document.getElementById('result').style.display = 'none'
  document.getElementById('restart-btn').style.display = 'none'
  showQuestion()
}

document.getElementById('next-btn').addEventListener('click', nextQuestion)
document.getElementById('restart-btn').addEventListener('click', restartQuiz)

showQuestion()
