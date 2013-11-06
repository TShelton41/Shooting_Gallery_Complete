var gameTimer,
    currentTime = 0,
    gameOver = false,
    widowWidth,
    widthHeight;
function centerGameBoard(){
    windowWidth = $(window).width();
    windowHeight = $(window).height();

    $('#startScreen').css({'top': ((windowHeight / 2) - ($('#gameBoard').height() / 2 )) + 50, "left": (windowWidth / 2)- ($("#title").width() / 2)+ 100});

    $('#gameBoard').css({'top': ((windowHeight / 2) - ($('#gameBoard').height() / 2 )) + 50, left: windowWidth + 100});
    $("#title").css("left", (windowWidth / 2)- ($("#title").width() / 2));

    TweenMax.set($('#container-wrapper'), {perspective:900, transformOrigin:"800px 105px",});
    TweenMax.set($("#title"), {textShadow:"0px 0px 25px rgba(41, 255, 5, 1)",color:"#29ff05"});
}


function bindEvents(){
    var plscore = 0;



    $('#startGameBtn').bind("click", function(){
        //turnOnLeftLight();
        var moveLine = new TimelineMax({onComplete:turnOnLeftLight})

        moveLine.add(TweenMax.to('#container-wrapper', 1,{scaleY:.9, scaleX:.9}));
        moveLine.add(TweenMax.to('#container-wrapper',.5,{left: -(windowWidth / 2) - ($('#gameBoard').height() / 2 )-50, ease: Quad.easeOut}));
    });

    $('#target img').bind("click", function(){
        if(!gameOver){
            TweenMax.to($(this),.2, {css:{left: (Math.random() * 450)}, delay:.3});
            TweenMax.to($(this),.3, {rotationX: 90, ease: Quad.easeOut, repeat: 1, yoyo: true});
            plscore += 1;
            console.log('score ' + plscore);

            TweenMax.to($('#playerScore'),.3, {scrambleText:plscore.toString()});
        }
    });
}

function turnOnLeftLight(){

    TweenMax.to('#container-wrapper', 3,{scaleX:1, scaleY:1, x: "-100px", ease: Quad.easeOut});
    var ladder = $('#ladder'),
        wallCrack = $('#wallCrack'),
        lightPole = $('#leftLightHolder #lightPole');
    TweenMax.to($('#leftLightHolder img'), .5, {visibility: "visible", boxShadow: "0px 0px 24px 6px rgba(252, 253, 243, 0.3)", backgroundColor:"rgba(252, 253, 243, 0.3)", repeat: 2});
    TweenMax.to($('#wallBlack'),.15, {display: "none", onComplete: turnOnRightLight});
    TweenMax.staggerTo([ladder, wallCrack, lightPole] ,.15, {visibility: "visible"}, 0.1);
}

function turnOnRightLight(){
    var web = $('#spiderWeb'),
        floorCrack = $('#floorCrack'),
        lightPole = $('#rightLightHolder #lightPole'),
        floor = $('#floor');
    TweenMax.to($('#rightLightHolder img'), .5, {visibility: "visible", boxShadow: "0px 0px 24px 6px rgba(252, 253, 243, 0.3)", backgroundColor:"rgba(252, 253, 243, 0.3)", repeat: 2});
    TweenMax.to($('#wallHalf'),.15, {display: "none", onComplete: assembleStage});//.attr("src", "images/halfLiteBackWall.png");
    TweenMax.staggerTo([web, floorCrack, lightPole, floor] ,.15, {visibility: "visible"}, 0.1);
}

function assembleStage(){

    //we set this delay so we can add to it on every tween
    //the leftX is a starting point and then we move the barrel over more once they animate in
    TweenMax.set($('#target img'), {perspective:600, rotationX:85, transformOrigin:"50px 165px"});
    var tl = new TimelineMax({delay:1.5}),
        leftX = 0;



    $("#barrels").children('img').each(function (index) {
        //get remainder to get every other image
        var oddNum = index%2;

        if(oddNum != 0){
            tl.add(TweenMax.to($(this),.2, {css:{left:leftX + "px", top: "-20px"}, ease: Linear.easeIn}));
        }else{
            tl.add(TweenMax.to($(this),.2, {css:{left:leftX + "px"}, ease: Linear.easeIn}));
        }
        leftX -= 15;
    });

    tl.add(TweenMax.to($('#tires img'),1, {css:{top: "300px"}, ease: Bounce.easeOut}));
    tl.add(TweenMax.from($('#tires img'),.5, {css:{skewX: 2}, ease: Elastic.easeIn, yoyo: true}));
    tl.add(TweenMax.to($('#cardBoardBoxes img'),.5, {css:{left: "100px"}, ease: Quad.easeOut}));
    tl.add(TweenMax.to($('#smallBoxes img'),.5, {css:{top: "0"}, ease: Quad.easeOut}));
    tl.add(TweenMax.to($('#largeBoxes img'),.5, {css:{top: "0"}, ease: Quad.easeOut}));
    tl.add(TweenMax.to($('#target img'),3, {rotationX: 0, visibility: "visible", ease: Quad.easeOut, onComplete:startGameTime}));
}

function removePane(){
   TweenMax.to('#windowPane',.4,{autoAlpha: 0});
}

function startGameTime(){
    removePane();

    gameTimer=setInterval(function(){
        currentTime += 1;

        $('#time').text(currentTime.toString());
        if(currentTime >=5){
            myStopFunction();
        }
    },1000);
}

function myStopFunction()
{
    clearInterval(gameTimer);
    gameOver = true;
    TweenMax.to('#gameOverModal', .5,{opacity:.5, display: "block"});
    TweenMax.to('#gameOverText',1, {scrambleText: "Game Over", delay:.5});
}



$('document').ready(function(e){
    console.log('ready load');
    centerGameBoard();
    bindEvents();
});

$(window).load(function(e){
    console.log('all assets loaded');


});