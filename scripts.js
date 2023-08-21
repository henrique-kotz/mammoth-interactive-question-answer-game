var questionNumber = 0;
var aux;


function calculateDaysTo(inputDate, inputYear, inputMonth, inputDay) {
    let daysToInput = (inputDate - new Date())/(1000*60*60*24);

    if (Math.ceil(daysToInput) < 0) {
        inputDate = new Date(inputYear + 1, inputMonth, inputDay);
        daysToInput = (inputDate - new Date())/(1000*60*60*24);
    }

    return Math.ceil(daysToInput);
}

function calculateNextHoliday() {
    const selectedHoliday = document.getElementById('holidays').value;
    let month;
    let day;

    switch (selectedHoliday) {
        case "Chinese New Year":
            month = 1;
            day = 22;
            break;
        case "Christmas":
            month = 12;
            day = 25;
            break;
        case "Halloween":
            month = 10;
            day = 31;
            break;
        case "Hannukah":
            month = 12;
            day = 7;
            break;
        case "Kwanza":
            month = 12;
            day = 26;
            break;
        case "New Year":
            month = 1;
            day = 1;
            break;
        case "Ramadan":
            month = 3;
            day = 26;
            break;
        default:
            month = 1;
            day = 1;
    }

    const currentYear = new Date().getFullYear();

    let holidayDate = new Date(currentYear, month, day);

    const daysToHoliday = calculateDaysTo(holidayDate, currentYear, month, day);
    const holiday = {
        name: selectedHoliday,
        daysAway: daysToHoliday
    };

    return holiday;
}

function calculateNextBirthday() {
    const currentYear = new Date().getFullYear();
    const birthdayMonth = document.getElementById('months').selectedIndex;
    const birthdayDay = parseInt(document.getElementById('dayInput').value);

    let birthdayDate = new Date(currentYear, birthdayMonth, birthdayDay);

    const daysToBirthDay = calculateDaysTo(birthdayDate, currentYear, birthdayMonth, birthdayDay);
    const birthday = {
        date: birthdayDate,
        daysAway: daysToBirthDay
    }

    return birthday;
}

function runChatbot(e) {
    e.preventDefault();

    const response = document.getElementById('response');
    const answer = document.getElementById('answer');
    const question = document.getElementById('question');

    if (questionNumber === -1) {
        answerForm.style.display = 'block';
        birthdayForm.style.display = 'none';
        holidayForm.style.display = 'none';

        response.innerText = '';
        question.innerText = 'What is your name?'
        answer.value = '';
    } else if (questionNumber === 0) {
        birthdayForm.style.display = 'block';
        answerForm.style.display = 'none';

        response.innerText = `Your name is ${answer.value}.`;
        question.innerText = 'When is your birthday?';
        answer.value = '';
    } else if (questionNumber === 1) {
        const { date, daysAway} = calculateNextBirthday();
        aux = date;

        holidayForm.style.display = 'block';
        birthdayForm.style.display = 'none';

        response.innerText = `Your birthday is ${daysAway} day${daysAway === 1 ? '' : 's'} away. ${daysAway === 0 ? 'Happy birthday!' : ''}`;
        question.innerText = 'What is your favorite holiday?';
    } else if (questionNumber === 2) {
        const { name, daysAway } = calculateNextHoliday();

        answerForm.style.display = 'block';
        holidayForm.style.display = 'none';

        response.innerText = `${name} is ${daysAway} day${daysAway === 1 ? '' : 's'} away. ${daysAway === 0 ? 'Happy holidays!' : ''}`;
        question.innerText = 'How old are you?';
    } else if (questionNumber === 3) {
        let yearOfBirth = new Date().getFullYear() - parseInt(answer.value);
        if (aux > new Date()) yearOfBirth++;
        
        answerForm.style.display = 'none';
        restartButton.style.display = 'block';
        answer.value = '';
        
        response.innerText = `You were born in ${yearOfBirth}.`;
        question.innerText = 'Thanks for playing!';
    }

    questionNumber++;
}


const answerForm = document.getElementById('answerForm');
answerForm.addEventListener('submit', e => runChatbot(e));

const birthdayForm = document.getElementById('birthdayForm');
birthdayForm.addEventListener('submit', e => runChatbot(e));

const holidayForm = document.getElementById('holidayForm');
holidayForm.addEventListener('submit', e => runChatbot(e));

const restartButton = document.getElementById('restartButton');
restartButton.addEventListener('click', e => {
    restartButton.style.display = 'none';
    questionNumber = -1;
    runChatbot(e);
});