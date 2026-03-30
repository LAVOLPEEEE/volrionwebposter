const input = document.getElementById('message_input')
const messagesRoot = document.getElementById('messages')

const inner = document.createElement('div')
inner.className = 'messages-inner'
messagesRoot.appendChild(inner)

const API_KEY = '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'
const API_URL = 'https://api.groq.com/openai/v1/chat/completions'

const SYSTEM_PROMPT = `
Ты простой чат-бот для учебного проекта.
Отвечай очень коротко: 2-3 слова или одно короткое предложение.
Только на простые вопросы: "привет", "как дела", "как тебя зовут".
Не объясняй ничего лишнего, не отвечай развёрнуто.
`

window.addEventListener('load', () => {
  startConversation()
})

function startConversation() {
  try {
    const greeting = askLLM('Поприветствуй коротко')
    addMessage(greeting, 'bot')
  } catch (e) {
    console.error('Стартовый промт не сработал:', e)
    addMessage('Приветик', 'bot')
  }
}

function askLLM(userText) {
  const response = fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`,
      Accept: 'application/json'
    },
    body: JSON.stringify({
      model: 'llama-3.1-8b-instant',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userText }
      ],
      temperature: 0.3,
      max_tokens: 30
    })
  })

  if (!response.ok) {
    const errorText = response.text()
    throw new Error(`HTTP ${response.status}: ${errorText}`)
  }

  const data = response.json()
  return data.choices[0].message.content.trim()
}

function addMessage(text, author) {
  const msgEl = document.createElement('div')
  msgEl.className = 'toh message ' + author

  msgEl.textContent = translateRuToForeign(text)
  msgEl.dataset.originalru = text

  setupLetterAnimation(msgEl)

  inner.appendChild(msgEl)
  messagesRoot.scrollTop = messagesRoot.scrollHeight
}

function sendMessage() {
  const text = input.dataset.originalru
  if (!text) return

  addMessage(text, 'user')
  input.value = ''
  input.focus()

  const typingMsg = document.createElement('div')
  typingMsg.className = 'message bot'
  typingMsg.textContent = translateRuToForeign('печатает...')
  inner.appendChild(typingMsg)
  messagesRoot.scrollTop = messagesRoot.scrollHeight

  const defaultAnswer = ALWAYS_ANSWERED_QUESTIONS[clearQuestion(text)]
  console.log(defaultAnswer)
  if (defaultAnswer != null) {
    inner.removeChild(typingMsg)
    addMessage(defaultAnswer, 'bot')

    return
  }

  try {
    const botReply = askLLM(text)

    inner.removeChild(typingMsg)

    addMessage(botReply, 'bot')
  } catch (e) {
    inner.removeChild(typingMsg)
    console.error(e)

    console.log(clearQuestion(text))
    addMessage('Я не поняла', 'bot')
  }
}

input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    sendMessage()
  }
})

document.addEventListener('DOMContentLoaded', () => {
  input.addEventListener('input', (e) => {
    e.target.dataset.originalru = e.target.value
  })
})

document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('keydown', (e) => {
    const blocks = document.querySelectorAll('.key[data-letter]')

    for (let block of blocks) {
      if (e.key === block.dataset.letter) {
        pressAnimation(block)
      }
    }
    if (e.key === 'Enter') {
      pressAnimation(document.querySelector('.key.row1_return'))
    }
    if (e.key === 'ArrowLeft') {
      pressAnimation(document.querySelector('.key.row1_left'))
    }
    if (e.key === 'ArrowRight') {
      pressAnimation(document.querySelector('.key.row1_right'))
    }
  })
})

function keyPressedToInput(key) {
  pressAnimation(key)

  if (key.classList.contains('row1_return')) {
    console.log('нажали на Ret')
    sendMessage()

    return
  } else if (key.classList.contains('row1_left')) {
    console.log('нажали на Left')
    moveCursor(-1)

    return
  } else if (key.classList.contains('row1_right')) {
    console.log('нажали на right')
    moveCursor(1)

    return
  }

  input.dataset.originalru += key.dataset.letter
  input.value += key.dataset.letter
}

function moveCursor(delta) {
  input.focus()
  let pos = input.selectionStart
  pos = Math.max(0, Math.min(input.value.length, pos + delta))
  input.setSelectionRange(pos, pos)
}

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.key').forEach((button) => {
    ;['mousedown', 'touchstart'].forEach((event) => {
      button.addEventListener(event, function (e) {
        e.preventDefault()
        keyPressedToInput(button)
      })
    })
  })
})

function pressAnimation(key) {
  key.classList.add('key_pressed')

  setTimeout(() => {
    key.classList.remove('key_pressed')
  }, 150)
}

function showQuestions(e) {
  e.stopPropagation()
  const quests = document.querySelector('.questions')
  if (!quests.classList.contains('questions_hidden')) {
    quests.classList.add('questions_hidden')

    return
  }

  quests.classList.remove('questions_hidden')

  document.addEventListener(
    'mousedown',
    function closeQuestionsOutside(clickEvent) {
      if (!quests.contains(clickEvent.target)) {
        quests.classList.add('questions_hidden')
        document.removeEventListener('mousedown', closeQuestionsOutside)
      }
    }
  )
}
document.addEventListener('DOMContentLoaded', () => {
  document
    .querySelector('.button_questions')
    .addEventListener('mousedown', showQuestions)
})
