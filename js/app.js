$(document).ready(function () {

    // Function to generate the random number
    function secretNum(min, max) {
        var secretNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        return secretNumber;
    }

    var secretNumber = secretNum(1, 100);
    console.log("Secret Number: " + secretNumber);

    //change default bg color to neutral grey
    document.body.style.backgroundColor = '#333';

    var oldGuess = 0;

    //set the maximum number of guesses
    var counter = 30;
    $('#count').text(counter);

    // Function to start a new game
    function newGame() {
        document.location.reload(true);
    }

    // Function to provide feedback to the user
    function guessFeedback(secretNumber, guessedNumber) {
        var difference = Math.abs(secretNumber - guessedNumber);
        if (difference >= 50) {
            $('#feedback').text('Ice Cold!');
            document.body.style.backgroundColor = '#002cb3';
        } else if (difference >= 30 && difference <= 49) {
            $('#feedback').text('Cold!');
            document.body.style.backgroundColor = '#3333cc';
        } else if (difference >= 20 && difference <= 29) {
            $('#feedback').text('Warm!');
            document.body.style.backgroundColor = '#8533ff';
        } else if (difference >= 10 && difference <= 19) {
            $('#feedback').text('Hot!');
            document.body.style.backgroundColor = '#b84dff';
        } else if (difference >= 1 && difference <= 9) {
            $('#feedback').text('Very Hot!!');
            document.body.style.backgroundColor = '#fc0446';
        } else {
            $('#feedback').text('You got it. Well done!');
            document.body.style.backgroundColor = '#ff0404';
            document.getElementById("userGuess").disabled = true;
            document.getElementById("guessButton").disabled = true;
        }
    }

    // Function to provide relative feedback to the user
    function relativeFeedback(secretNumber, oldGuess, newGuess) {
        var oldDiff = parseInt(Math.abs(secretNumber - oldGuess));
        var newDiff = parseInt(Math.abs(secretNumber - newGuess));
        if (newDiff > oldDiff) {
            $('#relative-feedback').text('You are colder than the last guess!');
        } else if (newDiff === oldDiff) {
            $('#relative-feedback').text('You are as far as your previous guess!');
        } else {
            $('#relative-feedback').text('You are hotter than the last guess!');
        }
    }

    // Function to count the number of guesses
    function guessCounter(counter) {
        $('#count').text(counter);
    }

    // Function to show the history of guesses
    function guessHistory() {
        $('#guessList').append('<li>' + parseInt($('#userGuess').val(), 10) + '</li>');
    }


    // Function to implement a simple validation of the iser input
    function validation(guessedNumber) {
        console.log("Guessed Number: " + guessedNumber)
        if (guessedNumber % 1 !== 0) {
            alert('You must enter an integer value!!');
            $('#userGuess').val('');
            return false;
        } else if (guessedNumber < 1 || guessedNumber > 100) {
            alert('Please guess a number between 1 to 100!!');
            $('#userGuess').val('');
            return false;
        } else {
            guessFeedback(secretNumber, guessedNumber);
        }

        if (guessedNumber !== '' && guessedNumber <= 100) {
            guessFeedback(secretNumber, guessedNumber);
            counter--;
            guessHistory();
            $('#userGuess').val('');
        } else {
            alert('Please guess a number between 1 to 100!!');
            $('#userGuess').val('');
        }
        if (counter <= 0) {
            $('#feedback').text('Game Over!');
            document.getElementById("userGuess").disabled = true;
            document.getElementById("guessButton").disabled = true;
            alert('The Secret number was ' + secretNumber + ' ! Better luck next time !!');
        }
        guessCounter(counter);
    }



    $('.new').on('click', newGame);

    $('#guessButton').on('click', function () {
        var guessedNumber = parseInt($('#userGuess').val(), 10);
        var newGuess = parseInt(guessedNumber);

        validation(guessedNumber);

        if (oldGuess !== 0 && guessedNumber >= 1 && guessedNumber <= 100) {
            relativeFeedback(secretNumber, oldGuess, newGuess);
        }
        oldGuess = newGuess;
    });

    $('#userGuess').on('keypress', function (e) {
        if (e.which === 13) {
            e.preventDefault();
            var guessedNumber = parseInt($('#userGuess').val(), 10);
            var newGuess = parseInt(guessedNumber);

            validation(guessedNumber);

            if (oldGuess !== 0 && guessedNumber >= 1 && guessedNumber <= 100) {
                relativeFeedback(secretNumber, oldGuess, newGuess);
            }
            oldGuess = newGuess;
        }
    });

    // Display information modal box
    $('.what').click(function () {
        $('.overlay').fadeIn(1000);
    });

    // Hide information modal box
    $('a.close').click(function () {
        $('.overlay').fadeOut(1000);
    });

});
