// GameStart
$('.start').on('click', function () {
  $('.timer').text('5')
  // countDown()
  callStartGame()
  $('.PlayerOneBox').removeClass('hide')
  $('.PlayerTwoBox').removeClass('hide')
  $('.oneA').removeClass('hide')
  $('.Operations').removeClass('hide')
  $('.twoA').removeClass('hide')
  $('.timer').removeClass('hide')
  $('.whosTURN').removeClass('hide')
  $('.whosTURN').text("Player One's Turn")
  $('.start').addClass('hide')
})
var currentPlayer = []
var playerScore = []

function callStartGame () {
  currentPlayer = 1 // player 1 or 2
  playerScore = [0, 0] // playerScore[0] is player 1, playerScore[1] is player 2
  $('.PlayerOneScore').text(playerScore[0] * 10)
  $('.PlayerTwoScore').text(playerScore[1] * 10)
  boardRefresh()
}

var boardRefresh = function () {
  var gridNos = []
  var randomNosQuestion = []

// CREATING AN ARRAYS OF RANDOM NUMBERS
  var randomNos = function () { // select 9 numbers out of the possible 10, and store them inside a variable called 'store'
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
  console.log(randomQuestion(randomNosQuestion[0], randomNosQuestion[1]))
  $('.Result').text(randomQuestion(randomNosQuestion[0], randomNosQuestion[1]))

  $('.Zero').text(gridNos[0])
  $('.One').text(gridNos[1])
  $('.Two').text(gridNos[2])
  $('.Three').text(gridNos[3])
  $('.Four').text(gridNos[4])
  $('.Five').text(gridNos[5])
  $('.Six').text(gridNos[6])
  $('.Seven').text(gridNos[7])
  $('.Eight').text(gridNos[8])

  var userAnswer = []
  var clickCounter = 0
  console.log(userAnswer)

// User Clicks
  $('.Box').click(function (event) {
    if (clickCounter === 1) {
      userAnswer.push($(this).text())
      $('.twoA').text(userAnswer[1] + ' = ')
    // console.log($(this).text());
      checkAnswer()
      gameState()
      clickCounter = 0
    }
    if (clickCounter === 0) {
      userAnswer.push($(this).text())
      $('.oneA').text(userAnswer[0])
    // console.log($(this).text());
      clickCounter++
    }
  })

  var currentQuestion = randomQuestion(randomNosQuestion[0], randomNosQuestion[1])

  function checkAnswer () {
    if (userAnswer[0] * userAnswer[1] === currentQuestion) {
       return true
      console.log('true')
    } else {
       return false
      console.log('false')
    }
  }

  var gameState = function () {
    if (checkAnswer() === true) {
      console.log("steady");
      boardRefresh()
          $('.oneA').text(' _ ')
          $('.twoA').text(' _ =')
      if (currentPlayer === 1) {
        playerScore[0] = playerScore[0] + 1
        $('.PlayerOneScore').text(playerScore[0] * 10)
        console.log(playerScore)
      } else if (currentPlayer === 2) {
        playerScore[1] + 1
        $('.PlayerTwoScore').text(playerScore[1] * 10)
      }
    } else {
      console.log("not true");
      boardRefresh()
      $('.oneA').text(' _ ')
      $('.twoA').text(' _ =')
      currentPlayer = 2
      $('.whosTURN').text("Player's Two Turn")
    }
  }


  function whoWins () {
    if (playerScore[0] < playerScore[1]){
      $('.whosTURN').text("Player Two Wins")
    } else if (playerScore[0] === playerScore[1]) {
      $('.whosTURN').text("It's a Draw")
    } else if (playerScore[0] > playerScore[1]) {
      $('.whosTURN').text("Player One Wins")
    }
  }

}


//
//     // nextquestion
//     } else {
//       console.log('False')
//       if (currentPlayer === 1) {
//         currentPlayer = 2
//         $('.whosTURN').text("Player Two's Turn")
//       } else {
//         gameOver()
//       }
//     }
//   }
// }

function isGameOver () {
  // check timer
  // check score
}

function changeTurn () {

}

function gameOver () {
  // happens when Player2 is not able to finish a question or when Player2 hits above Player1 score
}



function restart () {
  currentPlayer = 1 // restart to Player1
  playerScore = [0, 0] // restart to 0 for both players
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

// var countDown = function () {
//   (function () {
//     var counter = 5
//     setInterval(function () {
//       counter--
//       if (counter >= 0) {
//         $('.timer').text(counter)
//       }
//       if (counter === 0) {
//         alert('Sorry, Your are out of time')
//         clearInterval(counter)
//       }
//     }, 1000)
//   })()
// }

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
