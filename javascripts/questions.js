const ALWAYS_ANSWERED_QUESTIONS = {
  'как тебя зовут': 'Эйра',
  'сколько тебе лет': 'двести два',
  'с какой ты планеты': 'Винтер',
  'какой твой любимый цвет': 'синий',
  'твой любимый напиток': 'кофе',
  'твоя любимая еда': 'бигтейсти',
  'лето или зима': 'лето',
  'кошки или собаки': 'это что за существа',
  'сладкое любишь': 'очень сильно',
  'любишь горы': 'да'
}

function clearQuestion(question) {
  let clearedQuestion = question.toLowerCase()

  clearedQuestion = clearedQuestion.replaceAll('?', '')
  clearedQuestion = clearedQuestion.replaceAll('!', '')
  clearedQuestion = clearedQuestion.replaceAll('.', '')
  clearedQuestion = clearedQuestion.replaceAll(',', '')
  clearedQuestion = clearedQuestion.replaceAll('  ', ' ')

  while (clearedQuestion.includes('  ')) {
    clearedQuestion = clearedQuestion.replaceAll('  ', ' ')
  }

  return clearedQuestion.trim()
}
