$(document).ready(function() {

    var secretNumber = 0;
    var userGuess = 0;
    var guessCount = 0;
    var finish = false;

    /*--- Display information modal box ---*/
    $(".what").click(function() {
        $(".overlay").fadeIn(1000);

    });

    /*--- Hide information modal box ---*/
    $("a.close").click(function() {
        $(".overlay").fadeOut(1000);
    });

    function secretNumberGenerator() {
        secretNumber = (Math.floor(Math.random() * 100));
        console.log("Secret Number =" + secretNumber);
    }

    secretNumberGenerator();

    $(".new").click(function() {
        newGame();
        console.log("checking newgame click");
    });

    function newGame() {
        guessCount = 0;
        finish = false;
        $('#userGuess').val('');
        $('#count').text(guessCount);
        $("#guessList li").remove();
        secretNumber = (Math.floor(Math.random() * 100));
        feedback("Make your guess!!");
        console.log("works fine !! new secret number is " + secretNumber);
    }

    function setCount() {
        $("#count").text(guessCount);
    }

    function feedback(feedback) {
        $("#feedback").text(feedback);
    }

    function comparison() {
        if (userGuess / secretNumber === 1) {
            feedback("Congrats !! You Win");
            finish = true;
        } else if (Math.abs(secretNumber - userGuess) > 60.5) {
            feedback("Arctic!!");
            document.body.style.backgroundColor = '#002cb3';
        } else if (Math.abs(secretNumber - userGuess) > 50.5) {
            feedback("Its freezing");
            document.body.style.backgroundColor = '#0038e6';
        } else if (Math.abs(secretNumber - userGuess) > 40.5) {
            feedback("Its cold out there !! Put a coat on!!");
            document.body.style.backgroundColor = '#3333cc';
        } else if (Math.abs(secretNumber - userGuess) > 30.5) {
            feedback("Its cold!!");
            document.body.style.backgroundColor = '#6600ff';
        } else if (Math.abs(secretNumber - userGuess) > 20.5) {
            feedback("Its warm-ish!!");
            document.body.style.backgroundColor = '#8533ff';
        } else if (Math.abs(secretNumber - userGuess) > 15.5) {
            feedback("Its getting warm !!");
            document.body.style.backgroundColor = '#b84dff';
        } else if (Math.abs(secretNumber - userGuess) > 10.5) {
            feedback("Its warm!!");
            document.body.style.backgroundColor = '#fc0446';
        } else if (Math.abs(secretNumber - userGuess) > 0.5) {
            feedback("Its hotter now !!");
            document.body.style.backgroundColor = '#ff0404';
        } else {

        }
    }

    function checkInput() {
        if (isNaN(userGuess)) {
            alert("Please enter a number from 1 to 100!");

        } else if (userGuess === "") {
            alert("Please enter Something!!");
        } else if (userGuess < 0 || userGuess > 100) {
            alert("Please enter a number from 1 to 100!");
        } else if (userGuess === " ") {
            alert("Please enter a number!!");
        } else if (userGuess === "  ") {
            alert("Please enter a number!!");
        } else if (userGuess === "   ") {
            alert("Please enter a number!!");
        } else {
            comparison();
            console.log("User guess" + userGuess);
            $("#userGuess").val();
            guessCount++;
            setCount(guessCount);
            $('ul#guessList').append("<li>" + userGuess + "<li>");
        }

    }

    $("form").submit(function(e) {
        e.preventDefault();
        if (!finish) {
            userGuess = $("#userGuess").val();
            checkInput();
        } else {
            setFeedback("Please Restart the Game and Play again!!");
        }
    });

});