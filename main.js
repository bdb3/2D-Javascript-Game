var x = true;
var y = false;
var matrix,startX,startY,goalX,goalY,testX,testY,aY,aX,testMatrix;
goalX = startX = rand(0,7);
goalY = startY = rand(0,7);
while(goalX==startX && goalY==startY){ 
		goalX = rand(0,7);
		goalY = rand(0,7);
	}
var populateArray = function(){
	matrix = cleanMap();
	testMatrix = cleanMap();
	matrix[startY][startX] = 'S';
	matrix[goalY][goalX] = 'G';
        var a = [challengeOne,challengeTwo,challengeThree,challengeFour,challengeFive];
	for (var i = 0; i <5;i++){
		var x1 = rand(0,7);
		var y1 = rand(0,7);
		if (matrix[y1][x1]!= ''){i--;}
		else{ 
			testX = x1;
			testY = y1;
			matrix[y1][x1] = a[i];}
	}

};

var firstHazard = function(){
	w("You have encountered an obnoxious man dancing. Between the whistle he continuously blows and his flailing arms you realize you must take action." + "<br>");
	w(" Do you want to leave or ask him to stop ?");
	w("Please choose an option below.");
};

var secondHazard = function(){
	w("You run into a friend from highschool. Do you want to leave or start chatting ?");
	w("Please choose an option below.");
};
var thirdHazard = function(){
	w("You slip on a spilled drink. You lose 20 minutes trying to get up and attempt to regain any respect you lost through dancing.");
	adventurer.time = adventurer.time - 20;

};
var fourthHazard = function(){
      w("You run into a friend. He is clearly quite drunk. Do you want to leave or start chatting ?");
      w("Please choose an option below.");
};
var fifthHazard = function(){
	w("You've make it to the bar. Do you want to leave or stand in line for a drink?");
	w("Please choose an option below.");
};
var checkGoal = function(){
  if (adventurer.prizes.length <2){w("You have not collected enough prizes to go to the stage yet. <br>");}
  if (adventurer.prizes.length >=2){w("Congratulations, you have made it to the stage with enough prizes!<br>");
					start();
					w("The map has been reset, continue playing if you would like!");}
};
var adventurer= { time: 100, aX:startX, aY:startY, prizes:[]};

var challengeOne={name: "Dancing Man", damage:20, hazard : function(){firstHazard();}
, result : function(){w("<br>The man cannot hear you over the music. You wasted 20 minutes.");
			 adventurer.time = adventurer.time - 15;}}; 
var challengeTwo={name: "Friend", damage:25, hazard : function(){secondHazard();}
, result : function(){w("<br>Your friend is nice and you have a great time catching up. You spend 30 minutes talking but he gives you a Club Mate, giving you the energy you need to get to the stage.");
			adventurer.time = adventurer.time - 30;
			adventurer.prizes[adventurer.prizes.length] = "Club Mate";}}; 
var challengeThree={name: "Spilled Drink", damage:5,hazard : function(){thirdHazard();}
, result : function(){}}; 
var challengeFour={name: "Drunk Friend", damage:50,hazard : function(){fourthHazard();}
, result : function(){w("<br>Your friend is maybe a bit annoying when he is drunk but you decide to approach. You chat for 25 minutes and he gives you a swig from his flask which makes you more ready to get to the stage.");
			adventurer.time = adventurer.time - 25;
			adventurer.prizes[adventurer.prizes.length] = "Alcohol";}}; 
var challengeFive={name: "Bar", damage:50,hazard : function(){fifthHazard();}
, result : function(){w("<br>The line is much longer than expected. People cut in from the left and right in front of you and it ends up taking 30 minutes to get a drink. However, you now have an Oude Geuze from Brouwerij Boon and are more ready to go to the stage. ");
			adventurer.time = adventurer.time - 30;
			adventurer.prizes[adventurer.prizes.length] = "Sour Beer";}};
function cleanMap(){
   var arr = [['','','','','','','',''],
            ['','','','','','','',''],
            ['','','','','','','',''],
            ['','','','','','','',''],
            ['','','','','','','',''],
            ['','','','','','','',''], 
            ['','','','','','','',''], 
            ['','','','','','','','']];
return arr;
};


function rand(low, high){
   return Math.floor(low + (Math.random()*high));
};
function playerAction(){
	testMatrix[adventurer.aY][adventurer.aX]=true;
	$(document).ready(function(){
		document.getElementById("map").innerHTML = "";
	});
	printMap();
  	checkSpace(adventurer.aX,adventurer.aY);
	w(" You have " +adventurer.time+ " minutes remaining.");
	if (adventurer.time <=0){y = false; w("You have run out of time.You do not make it to the stage. <br>");}
   
};
function start(){
	w("You are at a party that has a Marcel Dettman and Ben Klock b2b set on in 100 minutes. You must get two prizes before making it to the stage. The dancefloor has 8x8 spaces to move around. <br> ");
	populateArray();
	testMatrix[adventurer.aY][adventurer.aX]=true;
	printMap();
};

window.onload = function() {
	start();
	$(document).ready(function(){
		$("#upButton").click(function(){
					if (adventurer.aY-1>=0){adventurer.aY--;}
					else{w("You have reached the edge of the dancefloor, please choose another direction.");}
					playerAction();
		});
		$("#downButton").click(function(){
					if (adventurer.aY+1<=7){adventurer.aY++;}
					else{w("You have reached the edge of the dancefloor, please choose another direction.");}
					playerAction();
		});
		$("#rightButton").click(function(){
					if (adventurer.aX+1<=7){adventurer.aX++;}
					else{w("You have reached the edge of the dancefloor, please choose another direction.");}
					playerAction();
		});
		$("#leftButton").click(function(){
					if (adventurer.aX-1>=0){adventurer.aX--;}
					else{w("You have reached the edge of the dancefloor, please choose another direction.");}
					playerAction();
		});
		$("#leave").click(function(){
				if (typeof(matrix[adventurer.aY][adventurer.aX]) == 'object'){
					w("<br>You have left the challenge. Please choose up, down, left or right above.");
				}
				else{
					w("You are not at a challenge.");
				}
					
		});
		$("#engage").click(function(){
				if (typeof(matrix[adventurer.aY][adventurer.aX]) == 'object'){
					matrix[adventurer.aY][adventurer.aX].result();
					w("<br>Please choose up, down, right, or left above.");
				}
				else{
					w("You are not at a challenge");
				}
		});
	});
	
	
}
function checkSpace(xx,yy){
     if (matrix[yy][xx] == 'G'){w("<br>You are at the stage, at x: " + xx + " and y: " +yy+"<br>"); 
				checkGoal();}
     if (matrix[yy][xx] == 'S'){w("<br>You are back where you started, at x: " + xx + " and y: " +yy+"<br>");}
     if (matrix[yy][xx] == ''){w("<br>This space is empty, you are at x: " + xx + " and y: " +yy+"<br>");}
     if (typeof(matrix[yy][xx]) == 'object'){
	w("<br>You have encountered the " + matrix[yy][xx].name + " challenge. you are at x: " + xx + " and y: " +yy+"<br>");
	matrix[yy][xx].hazard();
     }
};
function w(a){
   $(document).ready(function(){
  	document.getElementById("instructions").innerHTML = document.getElementById("instructions").innerHTML +a;
   });
};

function w2(a){
	$(document).ready(function(){
  		document.getElementById("map").innerHTML = document.getElementById("map").innerHTML +a;
	});
};

function printMap(){
        var z= 1;
	for (var i = 0; i <8;i++){
		for (var j = 0; j <8;j++){
			var occ = testMatrix[i][j];
 			if (matrix[i][j] == ''&& occ){w2("E  ");}
			if (typeof(matrix[i][j]) == 'object'&& occ){w2("C ");z++;}
                        else if(occ) {w2(matrix[i][j]+"  ");}
			else{w2("x ");}
		
		};w2("<br>");	
	};
};




