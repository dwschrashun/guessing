var guesses = 5;

//display guess count at page load
$(document).ready(function() {
	$(".guessNum").text(guesses);
});

$(".guess-form").on("keypress", function(event) {
	if (event.which === 13) {
		checkForm();
	}
});

var checkForm = function () {
	//check for endgame
	if ($(".submit-button").text() === "PLAY AGAIN?") {
		window.location.reload();
	}
	//check that input is between 1 & 100
	else {
		var guess = $(".guess-form").val();
		if (!(guess > 0) && !(101 < guess)) {
			//if not put alerts on screen
			$(".submit-button").text("GUESS SOMETHING BETWEEN 1 & 100");
			$(".feedback").text("NO, NO, NO. BETWEEN 1 & 100, PLEASE")
		}
		else {
			//if so, continue with game
			onGuess(guess, target);
		}
	}
}

//basic turn function
var onGuess = function (num, target) {

	//return text to normal in case it has been previously altered
	$(".guess-form").val("");
	$("submit-button").text("SUBMIT YOUR GUESS NOW");
	$(".hint").text("");
	$(".guessNum").text(guesses);
	var diff = num - target;
	guesses--;

	//endgame scenarios
	if (diff === 0 || guesses === 0) {
		endGame(diff);
		updateFeedback (diff, num);
	}
	else {
		updateFeedback (diff, num);
	}
	$(".guessNum").text(guesses);
}

//updates feedback on screen for each guess
var updateFeedback = function (diff, num) {
	$(".feedback").removeClass("hot cold");
	var hotCold;
	if (diff === 0) {
		hotCold = "winner";
		$(".feedback").text("YOU WIN!");
	}
	//update feedback section
	else {
		if (-21 < diff && diff < 21) {
			$(".feedback").addClass("hot");
			$(".feedback").text("Hot! So Hot! But ");
			hotCold = "hot";
		}
		else {
			$(".feedback").addClass("cold");
			$(".feedback").text("Oh, very cold indeed. And");
			hotCold = "cold";
		}
		if (diff > 0) {
			$(".feedback").append("<div>somewhat too high.</div>");
		}
		else {
			$(".feedback").append("<div>somewhat too low.</div>");
		}
	}	
	//update list of guesses
	var newItem = "<li>" + num + "<h3>" + hotCold.toUpperCase() + "</h3></li>"
	$(".guess-list").append(newItem);
	$("h3").last().addClass(hotCold);
}

var endGame = function (diff) {
	//add image over form if won
	if (diff === 0) {
		$(".guessNum").text(guesses);
		var youWin = "<img class=\"winner-image\" src=\"winner-image.jpg\">";
		$(".guess-form").replaceWith(youWin);
	}
	//show target number if lost
	else if (guesses === 0) {
		var youLose = "<div class=\"loser-text\">OOPS YOU LOST. THE NUMBER YOU WERE LOOKING FOR IS " + target + ". PLAY AGAIN?</div>";
		$(".guessNum").text(guesses);
		$(".guess-form").replaceWith(youLose);
	}
	$(".submit-link").attr("href","javascript:window.location.reload()");
	$(".submit-button").text("PLAY AGAIN?");
}

//behavior when hint is requested
var hint = function () {
	$(".hint").text("The number you're looking for is " + target);
}