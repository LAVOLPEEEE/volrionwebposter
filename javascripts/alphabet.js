const RU_TO_FOREIGN = {
  а: '@',
  б: '(',
  в: '6',
  г: '1',
  д: ';',
  е: '%',
  ё: '<',
  ж: '[',
  з: '№',
  и: '2',
  й: "'",
  к: '+',
  л: '{',
  м: '!',
  н: '$',
  о: '#',
  п: '&',
  р: '*',
  с: '~',
  т: '>',
  у: '4',
  ф: '7',
  х: ')',
  ц: '=',
  ч: '3',
  ш: '9',
  щ: '"',
  ъ: '5',
  ы: '0',
  ь: '/',
  э: '?',
  ю: '-',
  я: '8'
}

const FOREIGN_TO_RU = {}
for (let ru in RU_TO_FOREIGN) {
  FOREIGN_TO_RU[RU_TO_FOREIGN[ru]] = ru
}

function translateRuToForeign(text) {
  return text
    .toLowerCase()
    .split('')
    .map((char) => RU_TO_FOREIGN[char] || char)
    .join('')
}
function translateForeignToRu(text) {
  return text
    .toLowerCase()
    .split('')
    .map((char) => FOREIGN_TO_RU[char] || char)
    .join('')
}

function isEqualLetter(letter1, letter2) {
  letter1 = letter1.toLowerCase()
  letter2 = letter2.toLowerCase()

  // обе буквы русские
  if (RU_TO_FOREIGN[letter1] && RU_TO_FOREIGN[letter2]) {
    return letter1 === letter2
  }

  // обе буквы иностранные
  if (FOREIGN_TO_RU[letter1] && FOREIGN_TO_RU[letter2]) {
    return FOREIGN_TO_RU[letter1] === FOREIGN_TO_RU[letter2]
  }

  let ru1
  if (RU_TO_FOREIGN[letter1]) {
    ru1 = letter1
  } else {
    ru1 = FOREIGN_TO_RU[letter1]
  }

  let ru2
  if (RU_TO_FOREIGN[letter2]) {
    ru2 = letter2
  } else {
    ru2 = FOREIGN_TO_RU[letter2]
  }

  return ru1 === ru2
}

function getSoundByLetter(letter) {
  let ruLetter

  if (isRussianLetter(letter)) {
    ruLetter = letter.toLowerCase()
  } else {
    ruLetter = translateForeignToRu(letter)
  }

  const letterToSoundIndex = {
    э: 1,
    о: 2,
    м: 3,
    к: 4,
    р: 5,
    г: 6,
    и: 7,
    ч: 8,
    у: 9,
    ъ: 10
  }

  const soundIndex = letterToSoundIndex[ruLetter]

  if (soundIndex) {
    return `static/sounds/sound_${soundIndex}.mp3`
  }

  // звук не найден
  return null
}

function isRussianLetter(letter) {
  return RU_TO_FOREIGN[letter.toLowerCase()] !== undefined
}
