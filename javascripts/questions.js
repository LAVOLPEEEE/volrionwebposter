const ALWAYS_ANSWERED_QUESTIONS = {
    "как тебя зовут": "Я инопланетянин Полинка-Пиписька",
    "сколько тебе лет": "Я уже старая писька",
    "": "",
    "": "",
    "": "",
}

function clearQuestion(question) {
    let clearedQuestion = question.toLowerCase();

    clearedQuestion = clearedQuestion.replaceAll('?', '');
    clearedQuestion = clearedQuestion.replaceAll('!', '');
    clearedQuestion = clearedQuestion.replaceAll('.', '');
    clearedQuestion = clearedQuestion.replaceAll(',', '');
    clearedQuestion = clearedQuestion.replaceAll('  ', ' ');

    while (clearedQuestion.includes('  ')) {
        clearedQuestion = clearedQuestion.replaceAll('  ', ' ');
    }

    return clearedQuestion.trim();
}
