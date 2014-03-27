$(document).ready(function(){
/*--Globals--*/
console.log('document ready!');

	var questions =[
		{
		choices: ['Carrell', 'Marrell', 'Grarrell', 'Saurrell'],
		answer: 'Saurrell'
		},{
		choices: ['Bora', 'Darren', 'Beniel', 'Daumik'],
		answer: 'Beniel'
		},{
		choices: ['Mormik', 'Sauron', 'Carmen', 'Cargan'],
		answer: 'Cargan'
		},{
		choices: ['Saullen', 'Graellen', 'Marellen', 'Adellen'],
		answer: 'Graellen'
		},{
		choices: ['Ravina', 'Savina', 'Bhavina', 'Noravina'],
		answer: 'Noravina'
		},{
		choices: ['Maumik', 'Saumik', 'Evaumik', 'Raumik'],
		answer: 'Maumik'
		},{
		choices: ['Daymond', 'Dariellen', 'Dariavans', 'Darlos'],
		answer: 'Dariavans'
		},{
		choices: ['Adriana', 'Raymian', 'Damian', 'Marian'],
		answer: 'Raymian'
		}
	];
	var questionNum 	= 1;
	var spritePosition 	= 0;
	var btnState 		= 'Hide';
	var btnText			= '';
	var hintPos			= 0;
	var userGuess 		= '';
	var maxQuestions 	= questions.length;
	var numCorrect		= 0;
	var grade 			= '';
	var color = '';
	var gameState = 'play';
	
/*--Helper Functions--*/
function updateQuestionPhoto(){
	spritePosition -= 300;
	$('.facemorph').css('background-position',spritePosition + 'px 0');
	console.log("updated Facemorph Position");
}

function updateChoices(){
	$('.choices').empty();
	for (var i = 0; i <= 3; i++){	
		$('.choices').append('<input class=\"choice\" type=\"button\" name=\"choice\" value=\"'+questions[(questionNum-1)].choices[i]+'\">');
		console.log('Add photo');
	}
}
function updateHelpPhotos(){
	for (var i = 1; i <= 5; i++){
		$('.original:nth-child('+i+')').css('background-position',  ((i*(-150))+300) + ' 0');
		console.log('Add photo');
	}
}

function checkGuess(guess){
	var ans = questions[(questionNum-1)].answer;

	if (guess == ans){
		result = 'Correct!';
		color = '#50FF41';
		numCorrect++;
	} else{
		result = 'Wrong!';
		console.log('wrong');
		color = '#f00';
	}	
		$('.feedback p').text('You guessed ' + guess);
		$('.feedback h4').text(result).css('color', color);
		$('.choices').hide();
		$('.feedback').show();
		questionNum ++;
		console.log('check!' + guess + ans );
}
function replayGame(){
		spritePosition 	= 300;
		questionNum 	= 1;
		numCorrect 		= 0;
		gameState		= 'play';
		updateQuestionPhoto();
		updateChoices();
		$('.question').show();
		$('.feedback').hide();
		$('.feedback-btn').text('Next');
		$('.choices').show();
}
function endGame(){
		gameState = 'finished';
		$('.question').hide();
		$('.feedback p').text("You answered " + numCorrect + " out of " + maxQuestions);
		calcScore();
		$('.feedback h4').text(grade).css('color', color);
		$('.feedback-btn').text('Play Again?');
}
function calcScore(){
		var score = numCorrect/maxQuestions
		if ( score == 1){
			grade = 'Awesome!';
			color = '#50FF41';
		} else if (score >= 0.8){
			grade = 'Good';
			color = 'yellow';
		} else if (score >=0.6){
			grade = 'Meh';
			color = 'orange';
		} else if (score < 0.6){
			grade = 'Uh-oh...';
			color = '#f00';
		}
}

/*--Function Calls--*/
	$('.choices').delegate('.choice', 'click', function(){
		userGuess = $(this).val();
		checkGuess(userGuess);
	});

	$('.feedback-btn').on('click', function(){
		console.log($(this).val());
		if (gameState == 'finished'){
			replayGame();
			console.log('replay');
		} else if (questionNum <= maxQuestions){
			updateQuestionPhoto();
			$('.feedback').hide();
			updateChoices();
			$('.choices').show();
		} else	{
			endGame();
		}
		
	});
	
	$('.hint-btn').on('click', function(){
		if (btnState == 'Hide'){
			hintPos = '0';
			btnText = 'Hide';
			btnState = 'Show';
		} else if (btnState == 'Show'){
			hintPos = '-200px';
			btnText = 'Show';
			btnState = 'Hide';
		}		
		$('.hints').css('top', hintPos);
		$('.wrap').css('top', hintPos);
		$('.hint-btn').text( btnText +' Hints');		
		console.log('Activate Hints!');
	});
	
console.log('end');

});