/* global $ */
// GameStart
var currentPlayer = 1
var playerScore = [0, 0]
var currentQuestion = 0
var userAnswer = []
var clickCounter = 0
var timer = []
var gridNos = []
var randomNosQuestion = []
var store = []
$('.start').on('click', function () {
  $('.timer').text('Go!')
  countDown()
  boardRefresh()
  // callStartGame()
  remove()
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
// function callStartGame () {
//   currentPlayer = 1 // player 1 or 2
//   playerScore = [0, 0] // playerScore[0] is player 1, playerScore[1] is player 2
//   // $('.PlayerOneScore').text(playerScore[0] * 10)
//   // $('.PlayerTwoScore').text(playerScore[1] * 10)
//   boardRefresh()
// }
// boardRefresh creates a new board
var boardRefresh = function () {
  userAnswer = []
  clickCounter = 0
  gridNos = []
  randomNosQuestion = []
  store = []
  $('.oneA').text(' _ ')
  $('.twoA').text(' _ =')  // CREATING AN ARRAYS OF RANDOM NUMBERS
  function randomNos () { // select 9 numbers out of the possible 12, and store them inside a variable called 'store'
  // var store = []
    while (store.length !== 9) {
      var randomNumber = Math.ceil(Math.random() * 12)
      if (!store.includes(randomNumber)) {
        store.push(randomNumber)
      }
    }
    return store // return 'store' to a variable called 'gridNos'
  }
  gridNos = randomNos() // fill 'gridNos' with randomNos function -- gridNos = store
  console.log('gridNos that is generated: ' + gridNos)
  console.log('what is store?' + store)
// SELECTING 2 RANDOM NUMBERS FOR A QUESTIOn
  var randomSelect = function (a) { // randomly selects 2 digits in my gridNos array, which was populated with randomNos function
    for (var i = 0; i < 2; i++) { // i < 2 because we only want 2 numbers
      randomNosQuestion.push(a[Math.floor(Math.random() * 9)]) // push these 2 numbers into randomPlus array
    }
  }
  randomSelect(gridNos) // i am passing in gridNos into randomSelect function, so that it selects 2 numbers from my gridNos and store it in randomPlus
  console.log(randomNosQuestion)
// THE CURRENT QUESTION
  var randomQuestion = function (x, y) {
    return x * y
  }
// console.log('Correct answer: ' + randomQuestion(randomNosQuestion[0], randomNosQuestion[1]))
  $('.Result').text(randomQuestion(randomNosQuestion[0], randomNosQuestion[1]))
  currentQuestion = randomQuestion(randomNosQuestion[0], randomNosQuestion[1])
  console.log('what is currentQuestion: ' + currentQuestion)
  $('.Zero').text(gridNos[0])
  $('.One').text(gridNos[1])
  $('.Two').text(gridNos[2])
  $('.Three').text(gridNos[3])
  $('.Four').text(gridNos[4])
  $('.Five').text(gridNos[5])
  $('.Six').text(gridNos[6])
  $('.Seven').text(gridNos[7])
  $('.Eight').text(gridNos[8])
// countDown()
}
// User Clicks
$('.Box').click(function (event) {
  if (clickCounter === 1) {
    console.log('2nd click: ' + clickCounter)
    userAnswer.push($(this).text())
    $('.twoA').text(userAnswer[1] + ' = ')
    // console.log($(this).text());
    console.log(userAnswer)
    gameState()
    // clickCounter = 0 clickcounter will not be executed if gameState has happened
  } else if (clickCounter === 0) {
    userAnswer.push($(this).text())
    $('.oneA').text(userAnswer[0])
    // console.log($(this).text());
    // countDown()
    clickCounter++
    console.log('after first click: ' + clickCounter)
    console.log('user answer ' + userAnswer)
  }
})
function checkAnswer () {
  if (userAnswer[0] * userAnswer[1] === currentQuestion) {
    return true
  } else {
    return false
  }
}
// if player 1 gets the wrong answer, it will be turned over to player 2
// if player 1 gets the correct answer, the next question will starts again and countdown again
function gameState () {
  if (checkAnswer() === true) {
    clearInterval(timer)
    console.log('Correct Answer:' + currentPlayer)
    updateScore()
    // userAnswer = []
    // clickCounter = 0
    console.log('after correct answer, what is the user answer array' + userAnswer + 'clickcounter' + clickCounter)
    // $('.oneA').text(' _ ')
    // $('.twoA').text(' _ =')
    boardRefresh()
    countDown()
  } else if (checkAnswer() === false) {
    clearInterval(timer)
    console.log('Wrong Answer:' + currentPlayer)
    // if (currentPlayer = 2) {
    //   whoWins()
    // }
    if (currentPlayer === 1) {
      currentPlayer = 2
      alert("It's Players Two Turn")
      $('.timer').text('Go!') // added this so that there is no zero when player two starts
      $('.whosTURN').text("Player's Two Turn")
      clearInterval(timer)
      boardRefresh()
      console.log('after wrong answer, what is the user answer array' + userAnswer + 'clickcounter' + clickCounter)
      countDown()
    } else {
      whoWins()
    }
    // clearInterval(timer)
    // boardRefresh()
    // countDown()
    // userAnswer = []
    // clickCounter = 0
    // console.log("after wrong answer, what is the user answer array" + userAnswer + "clickcounter" + clickCounter)
    // $('.oneA').text(' _ ')
    // $('.twoA').text(' _ =')
    // $('.timer').text('Go!') // added this so that there is no zero when player two starts
  }
}
function updateScore () {
  if (currentPlayer === 1) {
    playerScore[0] = playerScore[0] + 1
    console.log('playerScore ' + playerScore)
    $('.PlayerOneScore').text(playerScore[0] * 10)
  } else if (currentPlayer === 2) {
    playerScore[1] = playerScore[1] + 1
    console.log('playerScore ' + playerScore)
    $('.PlayerTwoScore').text(playerScore[1] * 10)
    // gameOver()
    // whoWins()
  }
}
// function switchPlayer () {
//   if (currentPlayer === 1) {
//     currentPlayer = 2
//     userAnswer = []
//     clickCounter = 0
//     currentQuestion = 0
//     timer = []
//     $('.oneA').text(' _ ')
//     $('.twoA').text(' _ =')
//     alert("It's Players Two Turn")
//     boardRefresh()
//     countDown()
//     $('.timer').text('Go!') // added this so that there is no zero when player two starts
//     $('.whosTURN').text("Player's Two Turn")
//     gameState()
//   }
//   if (currentPlayer === 2) {
//     whoWins()
//   }
// }
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
  } else if (playerScore[0] === playerScore[1]) {
    $('.whosTURN').text("It's a Draw")
  } else if (playerScore[0] > playerScore[1]) {
    $('.whosTURN').text('Player One Wins')
  }
}
var countDown = function () {
  (function () {
    var counter = 6
    clearInterval(timer)
    timer = setInterval(function () {
      counter--
      if (counter >= 0) {
        $('.timer').text(counter)
      }
      if ((counter === 0) && (currentPlayer === 1)) {
        clearInterval(timer)
        alert('Sorry, You are out of time')
        currentPlayer = 2
        $('.timer').text('Go!') // added this so that there is no zero when player two starts
        $('.whosTURN').text("Player's Two Turn")
        boardRefresh()
        // switchPlayer()
        countDown()
      } else if ((counter === 0) && (currentPlayer === 2)) {
        clearInterval(timer)
        alert('Sorry, You are out of time')
        // gameState()
        // alert('Game Over')
        whoWins()
        // gameOver()
      }
    }, 1000)
  })()
}
// var gameOver = function () {
//     clearInterval(timer)
//     whoWins()
//     playerScore[0,0]
//     $('.PlayerOneScore').text(0)
//     $('.PlayerTwoScore').text(0)
//   }
function reset () {
  playerScore = [0, 0] // playerScore[0] is player 1, playerScore[1] is player 2
  $('.PlayerOneScore').text(0)
  $('.PlayerTwoScore').text(0)
  $('.oneA').text(' _ ')
  $('.twoA').text(' _ =')
  currentPlayer = 1
  userAnswer = []
  clickCounter = 0
  currentQuestion = 0
  timer = []
  gridNos = []
  randomNosQuestion = []
  store = []
}
$('.reset').on('click', function () {
  $('.reset').addClass('hide')
  reset()
  remove()
  $('.DisplayEquation').removeClass('hide')
  $('.Mainboard').removeClass('hide')
  $('.timer').text('Go!')
  // callStartGame()
  countDown()
  boardRefresh()
})
