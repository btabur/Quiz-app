const quizData = []

  getData("https://the-trivia-api.com/v2/questions");

  const quiz = document.querySelector('#quiz');
  const answerElements = document.querySelectorAll('.answer');
  const questionElement = document.querySelector('#question');
  const submitBtn = document.querySelector('#submit');
  const a_text = document.querySelector('#a_text');
  const b_text = document.querySelector('#b_text');
  const c_text = document.querySelector('#c_text');
  const d_text = document.querySelector('#d_text');
  const title = document.querySelector('.title');
 

  let currentQuestion = 0;
  let score = 0;

  

function loadQuestion() {
    const currentQuestionData = quizData[currentQuestion];
    deselectedAnswers();

    questionElement.innerText = (currentQuestion +1)+" .)  " + currentQuestionData.question.text;
    let answers = currentQuestionData.incorrectAnswers;
    answers.push(currentQuestionData.correctAnswer);

    answers = shuffleArray(answers);
    a_text.innerText = answers[0];
    b_text.innerText = answers[1];
    c_text.innerText = answers[2];
    d_text.innerText = answers[3];
   
}

function deselectedAnswers() {
    answerElements.forEach(answer => {
        answer.checked =false
    })
}
function getSelected() {
    let answer;
    answerElements.forEach(answerEL => {

        if(answerEL.checked) {
          if(answerEL.id=="a"){
            answer = a_text.textContent;
          }else if(answerEL.id=="b") {
            answer = b_text.textContent;
          }else if(answerEL.id=="c") {
            answer = c_text.textContent;
          }else if(answerEL.id=="d") {
            answer = d_text.textContent;
          }
        }
    })
    return answer;
}

submitBtn.addEventListener("click", ()=> {
 
    const answer = getSelected();
   
    if(answer) {
        if(answer ===quizData[currentQuestion].correctAnswer) {
            score++;
        }
        currentQuestion++;
        if(currentQuestion< quizData.length) {
            loadQuestion()
        }else {

          quiz.innerHTML = `
         
          <h2> Test Completed.. You scored ${score*10} points  </h2>
          <button class="submit" onClick = "location.reload()">Try Again </button>
          `
          title.style.display = 'none';
        }
        
    }
})

function getData(url) {
  fetch(url).then((response)=> response.json())
  .then((data) => {
    data.forEach(madde=> {
      quizData.push(madde);
    })
  loadQuestion();
   
  })
}
//şıklardaki seçenekleri karıştır
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Rastgele bir index seç
    [array[i], array[j]] = [array[j], array[i]]; // Elemanları yer değiştir
  }
  return array;
}


//arkaplan müziği
const sound = document.querySelector('#sound');
sound.loop =true;

sound.play();