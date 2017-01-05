// GameStart
$('.start').on('click', function () {
  $('.timer').text('Go!')
  countDown()
  callStartGame()
  remove()
})

$('.reset').on('click', function () {
  $('.timer').text('Go!')
    reset()
  remove()
  $('.reset').addClass('hide')
  countDown()
  callStartGame()
  $('.DisplayEquation').removeClass('hide')
  $('.Mainboard').removeClass('hide')
})

function remove () {
  $('.PlayerOneBox').removeClass('hide')
  $('.PlayerTwoBox').removeClass('hide')
  $('.oneA').removeClass('hide')
  $('.Operations').removeClass('hide')
  $('.twoA').removeClass('hide')
  $('.timer').removeClass('hide')
  $('.whosTURN').removeClass('hide')
  $('.whosTURN').text("Player One's Turn")
  $('.start').addClass('hide')
}

var currentPlayer = []
var playerScore = []

function callStartGame () {
  currentPlayer = 1 // player 1 or 2
  playerScore = [0, 0] // playerScore[0] is player 1, playerScore[1] is player 2
  // $('.PlayerOneScore').text(playerScore[0] * 10)
  // $('.PlayerTwoScore').text(playerScore[1] * 10)
  boardRefresh()
}


var currentQuestion = 0

var boardRefresh = function () {
  var gridNos = []
  var randomNosQuestion = []

// CREATING AN ARRAYS OF RANDOM NUMBERS
  function randomNos () { // select 9 numbers out of the possible 10, and store them inside a variable called 'store'
    var store = []
    while (store.length !== 9) {
      var randomNumber = Math.ceil(Math.random() * 12)
      if (!store.includes(randomNumber)) {
        store.push(randomNumber)
      }
    }
    return store // return 'store' to a variable called 'gridNos'
  }
  gridNos = randomNos() // fill 'gridNos' with randomNos function -- gridNos = store
  console.log(gridNos)

// SELECTING 2 RANDOM NUMBERS FOR A QUESTIOn
  var randomSelect = function (a) { // randomly selects 2 digits in my gridNos array, which was populated with randomNos function
    for (var i = 0; i < 2; i++) { // i < 2 because we only want 2 numbers
      randomNosQuestion.push(a[Math.floor(Math.random() * 9)]) // push these 2 numbers into randomPlus array
    }
  }

  randomSelect(gridNos) // i am passing in gridNos into randomSelect function, so that it selects 2 numbers from my gridNos and store it in randomPlus
  console.log(randomNosQuestion)
// THE CURRENT QUESTIOn

  var randomQuestion = function (x, y) {
    return x * y
  }
  // console.log('Correct answer: ' + randomQuestion(randomNosQuestion[0], randomNosQuestion[1]))
  $('.Result').text(randomQuestion(randomNosQuestion[0], randomNosQuestion[1]))

  currentQuestion = randomQuestion(randomNosQuestion[0], randomNosQuestion[1])

  $('.Zero').text(gridNos[0])
  $('.One').text(gridNos[1])
  $('.Two').text(gridNos[2])
  $('.Three').text(gridNos[3])
  $('.Four').text(gridNos[4])
  $('.Five').text(gridNos[5])
  $('.Six').text(gridNos[6])
  $('.Seven').text(gridNos[7])
  $('.Eight').text(gridNos[8])
}

var userAnswer = []
var clickCounter = 0
  // console.log(userAnswer)

// User Clicks
$('.Box').click(function (event) {
  if (clickCounter === 1) {
    userAnswer.push($(this).text())
    $('.twoA').text(userAnswer[1] + ' = ')
    // console.log($(this).text());
    console.log(userAnswer)
    gameState()
    clickCounter = 0
  } else if (clickCounter === 0) {
    userAnswer.push($(this).text())
    $('.oneA').text(userAnswer[0])
    // console.log($(this).text());
    clickCounter++
    console.log(userAnswer)
  }
})

function checkAnswer () {
  if (userAnswer[0] * userAnswer[1] === currentQuestion) {
    return true
  } else {
    return false
  }
}

function gameState () {
  if (checkAnswer() === true) {
    clearInterval(timer)
    console.log('Correct Answer')
    userAnswer = []
    boardRefresh()
    countDown()
    $('.oneA').text(' _ ')
    $('.twoA').text(' _ =')
    if (currentPlayer === 1) {
      playerScore[0] = playerScore[0] + 1
      $('.PlayerOneScore').text(playerScore[0] * 10)
    } else if (currentPlayer !== 1) {
      playerScore[1] = playerScore[1] + 1
      gameOver()
      // whoWins()
      $('.PlayerTwoScore').text(playerScore[1] * 10)
    } console.log(playerScore)
  } else {
    console.log('Wrong Answer')
    if (currentPlayer !== 1) {
      clearInterval(timer)
      alert('Game Over')
      gameOver()
      whoWins()
    } else if (currentPlayer === 1) {
      userAnswer = []
      boardRefresh()
      countDown()
      $('.oneA').text(' _ ')
      $('.twoA').text(' _ =')
      switchPlayer()
    }
  }
}

function switchPlayer () {
  currentPlayer = 2
  $('.whosTURN').text("Player's Two Turn")
  boardRefresh()
  countDown()
  alert("It's Players Two Turn")
}

function whoWins () {
  $('.PlayerOneBox').addClass('hide')
  $('.PlayerTwoBox').addClass('hide')
  $('.oneA').addClass('hide')
  $('.Operations').addClass('hide')
  $('.twoA').addClass('hide')
  $('.timer').addClass('hide')
  $('.DisplayEquation').addClass('hide')
  $('.Mainboard').addClass('hide')
  $('.reset').removeClass('hide')
  if (playerScore[0] < playerScore[1]) {
    $('.whosTURN').text('Player Two Wins')
  }else if (playerScore[0] === playerScore[1]) {
    $('.whosTURN').text("It's a Draw")
  } else if (playerScore[0] > playerScore[1]) {
    $('.whosTURN').text('Player One Wins')
  }
}

var timer = []
var countDown = function () {
  (function () {
    var counter = 6
    clearInterval(timer)
    timer = setInterval(function () {
      counter--
      if (counter >= 0) {
        $('.timer').text(counter)
      }
      if (counter === 0) {
        clearInterval(counter)
        if (currentPlayer === 1) {
          alert('Sorry, Your are out of time')
          switchPlayer()
        } else if (currentPlayer === 2) {
          alert('Game Over')
          whoWins()
        }
      }
    }, 1000)
  })()
}

function reset () {
  playerScore = [0, 0] // playerScore[0] is player 1, playerScore[1] is player 2
  $('.PlayerOneScore').text(0)
  $('.PlayerTwoScore').text(0)
  $('.oneA').text(' _ ')
  $('.twoA').text(' _ =')
  userAnswer =[]
}

var gameOver = function () {
  if (playerScore[0] < playerScore[1]) {
    clearInterval(timer)
    alert('Player Two Wins')
    whoWins()
    playerScore[0,0]
    $('.PlayerOneScore').text(0)
    $('.PlayerTwoScore').text(0)
  }
}

//
// var operation = {
//     plus: '+',
//     times: '*',
//     minus: '-',
//     divide: '/',
//   }

// Timer

  // var initial = 500;
  // var count = initial;
  // var counter;
  //
  // function timer() {
  //     if (initial <= 0) {
  //         clearInterval(counter);
  //         return;
  //     }
  //     count--;
  //     displayCount(count);
  // }
  //
  // function displayCount(count) {
  //     var res = count / 100;
  //     // $('.timer').text(res.toPrecision(count.toString().length); + " secs")
  //
  //     document.getElementById("timer").innerHTML = res.toPrecision(count.toString().length); + " secs";
  // }
  //
  // $('#start').on('click', function () {
  //     counter = setInterval(timer, 10);
  // });
  //
  // $('#stop').on('click', function () {
  //     clearInterval(counter);
  // });
  //
  // $('#reset').on('click', function () {
  //     clearInterval(counter);
  //     count = initial;
  //     displayCount(count);
  // });
  //
  // displayCount(initial);

  // if it's player1 turn chnage to player 2
  // if it's player 2 end game check score results/ game end since player2 dun meet the condition to win

    // var gridNos =[]
    // var randomNosQuestion = []
    // var falseNumber = [] //should not be a number in winningNos
    // var randomNos = function () { // select 9 numbers out of the possible 10, and store them inside a variable called 'store'
    // var store=[]
    // while(store.length !== 9) {
    //   var randomNumber = Math.ceil(Math.random()*12)
    //   if (!store.includes(randomNumber)) {
    //     store.push(randomNumber)
    //   }
    // }
    // return store // return 'store' to a variable called 'gridNos'
    // }
    // gridNos = randomNos()
    // console.log(gridNos);
    // var randomSelect = function(a) { // randomly selects 2 digits in my gridNos array, which was populated with randomNos function
    //   for (var i= 0 ; i <2 ; i++){ // i < 2 because we only want 2 numbers
    //     randomNosQuestion.push(a[Math.floor(Math.random()*9)]) // push these 2 numbers into randomPlus array
    //   }
    // }
    // randomSelect(gridNos)
    // console.log(randomNosQuestion);
    // var randomQuestion = function(x,y){
    //   return x * y
    // }
    //
    // console.log(randomQuestion(randomNosQuestion[0],randomNosQuestion[1]));
    // $('.Result').text(' = ' + randomQuestion(randomNosQuestion[0],randomNosQuestion[1]));

  // }

// //SAMPLE
//   function mainFunction () {
//     if (isCorrectAnswer()) {
//       // do something cos it's correct
//     } else if (!isCorrectAnswer()) {
//       // do if it's wrong
//     }
//
//
//
//   }
//   var isItTrueOrFalse = isCorrectAnswer()
//
//
//   function isCorrectAnswer (value) {
//     if (value == answersArray[0]) {
//       return true
//     } else {
//       return false
//     }
//   }
