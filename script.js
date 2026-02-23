const themeButton = document.getElementById('theme-toggle');
const isEvening = new Date().getHours() > 18;
// Проверить наличие сохраненной темы в localStorage
// Если вечер то тема при обновлении страницы каждый раз будет темная
if(isEvening) {
   localStorage.setItem('theme', 'dark');
}

const savedTheme = localStorage.getItem('theme');
if(savedTheme === 'dark') {
   document.body.classList.add('dark-theme');
   themeButton.innerText = '🌙';
}

themeButton.addEventListener('click', function() {
   document.body.classList.toggle('dark-theme');
    
   const isDarkMode = document.body.classList.contains('dark-theme');

   if(isDarkMode) {
      localStorage.setItem('theme', 'dark');
      themeButton.innerText = '🌙';
   } else {
      localStorage.setItem('theme', 'light');
      themeButton.innerText = '☀️'
   }
});

// Вспомогательная функция для проверки ввода на пустое значение или NaN
function isValidNumber(input) {
  return input && !Number.isNaN(input) && input > 0;
}

function isValidCoins(sum) {
  const coins = sum.toString().split('.')[1];
  return coins.length === 2;
}


// ЗАДАНИЕ 1: Валидация
function checkLogin() {
  const age = Number(document.getElementById("ageInput").value);
  const pass = document.getElementById("passInput").value;
  const email = document.getElementById("emailInput").value;
  const res = document.getElementById("loginResult");

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/;

  res.textContent;

  let errorMessage;
  if (!emailRegex.test(email)) {
    errorMessage = "Ошибка: Неправильный формат электронной почты!"
  } else if (!isValidNumber(age)) {
    errorMessage = "Ошибка: Введите правильный тип данных!"
  } else if (age > 150) {
    errorMessage = "Ошибка: Укажите корректный возраст!"
  } else if (age < 18) {
    errorMessage = "Ошибка: Вход разрешен только для лиц старше 18 лет!"
  } else if (pass.length < 6) {
    errorMessage = "Ошибка: Пароль должен содержать не менее 6 символов!"
  } else if (pass.length > 128) {
    errorMessage = "Ошибка: Пароль не должен содержать больше 128 символов!"
  }

  if (errorMessage) {
    res.textContent = errorMessage
    res.classList.add("error")
  } else {
    res.classList.remove("error");
    res.textContent = "Доступ разрешен!!!"
  }
}


// ЗАДАНИЕ 2: Скидки
function calculateDiscount() {
  const sumInput = document.getElementById("sumInput");
  const sum = Number(sumInput.value);
  const res = document.getElementById("discountResult");

  if(sumInput.value.length > 10) {
    res.textContent = "Ошибка: Поле ввода может содержать не более 10 символов"
    res.classList.add("error");
    return
  }
  
  if(!isValidNumber(sum)) {
    res.textContent = "Ошибка: Значение не может быть пустым, 0 или отрицательным!!!"
    res.classList.add("error");
    return;
  } ;

  if(!Number.isInteger(sum) && !isValidCoins(sum)) {
    res.textContent = "Ошибка: У денежных сумм может быть только два знака после запятой!"
    res.classList.add("error");
      return;
  }

  res.classList.remove("error");

  let discount; 

  if(sum < 100) {
    discount = 0;
  } else if (sum >= 100 && sum <= 500) {
    discount = 10;
  } else {
    discount = 20;
  }

  const finalPrice = sum - (sum * discount / 100);

  res.textContent = `
  К оплате ${finalPrice.toFixed(2)}
  (скидка ${discount}%).
  ${finalPrice >= 200 ? "Доставка бесплатная.": "Доставка платная"}
  `
}


// ЗАДАНИЕ 3: Конвертер валют
function convertCurrency() {
  const RATE_USD = 0.35;
  const RATE_EUR = 0.30;
  const RATE_RUB = 26.75;

  
  const currency = document.getElementById("currencySelect").value
  const res = document.getElementById("convertResult");
  const sumInput = document.getElementById("amountInput")
  const sum = Number(sumInput.value);
  
  if(sumInput.value.length > 15) {
    res.textContent = "Ошибка: Поле ввода может содержать не более 15 символов"
    res.classList.add("error");
    return
  }

  if(!isValidNumber(sum)) {
    res.textContent = "Ошибка: Значение не может быть пустым, 0 или отрицательным!!!"
    res.classList.add("error");
    return;
  } 

  if(!Number.isInteger(sum) && !isValidCoins(sum)) {
    res.textContent = "Ошибка: У денежных сумм может быть только два знака после запятой!"
    res.classList.add("error");
    return;
  }

  res.classList.remove("error");

  let rate; 

  switch (currency) {
    case "USD":
      rate = RATE_USD;
      break;
    case "EUR":
      rate = RATE_EUR;
      break;
    case "RUB":
      rate = RATE_RUB;
      break;
    default:
      rate = RATE_USD;
  };

  const result = sum * rate;

  res.textContent = sum.toFixed(2) + " BYN = " + result.toFixed(2) + " " + currency;

}


// ЗАДАНИЕ 4: Интерактивный квиз
function startQuiz() {
  // Для проверки ответа на вопрос используем массив ключевых слов
  // если есть хоть одно совпадение, то ответ засчитываем

  let count = 0; // счетчик правильных ответов

  const questions = [
    {
      questionText: "Чем отличается === от == ?",
      answerKeys: ['не прив', 'приведением тип', 'приводит тип', 'по значению и типу', 'значений и типов', 'к общему типу']
    },
    {
      questionText: "Зачем нужна проверка NaN?",
      answerKeys:  ['избежания ошибок', 'обнаружения ошибок', 'неправильный тип', 'неправильным типом', 'валидации знач']
    },
    {
      questionText: "Напишите результат выражения 2 + '2'",
      answerKeys: ['22']
    }
  ];

  for ({questionText, answerKeys} of questions) {
    const answer = prompt(questionText);
    
    if(answer === null) {
      alert("Квиз отменён!!!")
      return;
    }
    
   for (const answerKey of answerKeys) {  // Перебираем ключевые слова для поиска совпадений
      if(answer.includes(answerKey)) {
        count++;
        break;
      }
   }
  }

  alert(`Ваш результат ${count}/3`);
}

const loginBtn = document.getElementById("loginBtn");
loginBtn.addEventListener("click", checkLogin)

const discountBtn = document.getElementById("discountBtn");
discountBtn.addEventListener("click", calculateDiscount);

const convertBtn = document.getElementById("convertBtn");
convertBtn.addEventListener("click", convertCurrency);

const quizBtn = document.getElementById("quizBtn");
quizBtn.addEventListener("click", startQuiz);