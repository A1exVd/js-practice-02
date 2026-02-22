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




// ЗАДАНИЕ 1: Валидация
function checkLogin() {
  const age = Number(document.getElementById("ageInput").value);
  const pass = document.getElementById("passInput").value;
  const email = document.getElementById("emailInput").value;
  const res = document.getElementById("loginResult");

  res.textContent;

  let errorMessage;
  if (!email.includes("@")) {
    errorMessage = "Ошибка: email должен содержать символ '@'!"
  } else if (!isValidNumber(age)) {
    errorMessage = "Ошибка: Введите правильный тип данных!"
  } else if (age < 18) {
    errorMessage = "Ошибка: Вход разрешен только для лиц старше 18 лет!"
  } else if (pass.length < 6) {
    errorMessage = "Ошибка: Пароль должен содержать не менее 6 символов!"
  }

  if (errorMessage) {
    res.textContent = errorMessage
    res.classList.add("error")
  } else {
    res.classList.remove("error");
    res.textContent = "Доступ разрешен!!!"
  }
}

function isValidNumber(input) {
  // проверяем есть ли значение и является ли числом.
  return input && !Number.isNaN(input);
}

// ЗАДАНИЕ 2: Скидки
function calculateDiscount() {
  const sum = Number(document.getElementById("sumInput").value);
  const res = document.getElementById("discountResult");

  if(!isValidNumber(sum)) {
    res.textContent = "Ошибка: Значение не может быть пустым и должно быть числом!!"
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

// Остальные функции аналогично...

function convertCurrency() {
  const RATE_USD = 0.35;
  const RATE_EUR = 0.30;
  const RATE_RUB = 26.75;

  const sum = Number(document.getElementById("amountInput").value)
  const currency = document.getElementById("currencySelect").value
  const res = document.getElementById("convertResult");

  if(!isValidNumber(sum) && sum !== 0) {
    res.textContent = "Ошибка: значение должно быть числом!!!"
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

  res.textContent = sum + " BYN = " + result.toFixed(2) + " " + currency;

}

function startQuiz() {

  let count = 0; // счетчик правильных ответов

  const questions = [
    {
      questionText: "Чем отличается === от == ?",
      answerKeys: ['не прив', 'тип', 'cравнив']
    },
    {
      questionText: "Зачем нужна проверка NaN?",
      answerKeys:  ['избежания ошибок', 'обнаружения ошибок']
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
    
   for (const answerKey of answerKeys) {
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