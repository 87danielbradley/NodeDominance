
import Game from "./scripts/game.js"
import GameView from "./scripts/game_view.js"
import * as paper from 'paper'

paper.install(window)
document.addEventListener("DOMContentLoaded", () => {
    
    let myUL = document.getElementById('game-controls');
    // let newLI = document.createElement('li')
    let restartButton = document.createElement('button')
    restartButton.clasName = 'start';
    restartButton.innerText = 'New Game';
    restartButton.addEventListener('click', restartGame)
    function restartGame() {
        document.getElementById('paperCanvas').remove()
        if (formField.value > 0) {
            console.log(formField.value)
            newGame(formField.value)
        } else {
            newGame()
        }
    }

    let formButton = document.createElement('form');
    formButton.name = 'nodeCount';
    formButton.className = "nodeCount";

    
    let formField = document.createElement('INPUT')
    formField.value = "Number of Nodes"
    formField.name = "formInput";
    formField.type = "TEXT";
    
    formField.onkeydown = function(event) {
        if (event.key === 'Enter') {
            restartGame();
        }
    }
    
    formButton.append(formField)

    myUL.append(restartButton);
    myUL.append(formButton);

    let colorScheme = document.getElementById("color-scheme");
    let scheme1 = document.createElement('button')
    scheme1.className = 'colorScheme1 color-scheme'
    scheme1.innerText = 'Red Theme'
    let scheme2 = document.createElement('button')
    scheme2.className = 'colorScheme2 color-scheme'
    scheme2.innerText = 'Green Theme'
    let scheme3 = document.createElement('button')
    scheme3.className = 'colorScheme3 color-scheme'
    scheme3.innerText = 'Blue Theme'
    let scheme4 = document.createElement('button')
    scheme4.className = 'colorScheme3 color-scheme'
    scheme4.innerText = "Random Theme"

    scheme1.addEventListener('click', scheme1Change)
    function scheme1Change() {
        let body = document.getElementById('body');
        body.style.background = 'mediumvioletred';
    }
    scheme2.addEventListener('click', scheme2Change)
    function scheme2Change() {
        let body = document.getElementById('body')
        body.style.background = 'lawngreen'
    }
    scheme3.addEventListener('click', scheme3Change)
    function scheme3Change() {
        let body = document.getElementById('body')
        body.style.background = 'skyblue'
    }
    scheme4.addEventListener('click', scheme4Change)
    function scheme4Change() {
        let body = document.getElementById('body')
        let allColors = ["aliceblue","antiquewhite","aqua","aquamarine","azure","beige","bisque","black","blanchedalmond","blue","blueviolet","brown","burlywood","cadetblue","chartreuse","chocolate","coral","cornflowerblue","cornsilk","crimson","cyan","darkblue","darkcyan","darkgoldenrod","darkgray","darkgreen","darkgrey","darkkhaki","darkmagenta","darkolivegreen","darkorange","darkorchid","darkred","darksalmon","darkseagreen","darkslateblue","darkslategray","darkslategrey","darkturquoise","darkviolet","deeppink","deepskyblue","dimgray","dimgrey","dodgerblue","firebrick","floralwhite","forestgreen","fuchsia","gainsboro","ghostwhite","gold","goldenrod","gray","green","greenyellow","grey","honeydew","hotpink","indianred","indigo","ivory","khaki","lavender","lavenderblush","lawngreen","lemonchiffon","lightblue","lightcoral","lightcyan","lightgoldenrodyellow","lightgray","lightgreen","lightgrey","lightpink","lightsalmon","lightseagreen","lightskyblue","lightslategray","lightslategrey","lightsteelblue","lightyellow","lime","limegreen","linen","magenta","maroon","mediumaquamarine","mediumblue","mediumorchid","mediumpurple","mediumseagreen","mediumslateblue","mediumspringgreen","mediumturquoise","mediumvioletred","midnightblue","mintcream","mistyrose","moccasin","navajowhite","navy","oldlace","olive","olivedrab","orange","orangered","orchid","palegoldenrod","palegreen","paleturquoise","palevioletred","papayawhip","peachpuff","peru","pink","plum","powderblue","purple","red","rosybrown","royalblue","saddlebrown","salmon","sandybrown","seagreen","seashell","sienna","silver","skyblue","slateblue","slategray","slategrey","snow","springgreen","steelblue","tan","teal","thistle","tomato","turquoise","violet","wheat","white","whitesmoke","yellow","yellowgreen"]
        body.style.background = allColors[Math.floor(Math.random()*allColors.length)]
    }

     colorScheme.append(scheme4)
     colorScheme.append(scheme1)
     colorScheme.append(scheme2)
     colorScheme.append(scheme3)

    let personalLinks = document.getElementById('personal-links');
    let social1 = document.createElement('button')
    social1.className = "fa fa-github"
    let social2 = document.createElement('button')
    social2.className = "fa fa-linkedin"
    let social3 = document.createElement('button')
    social3.className = "porfolio"
    social3.innerText = "Me"

    social1.addEventListener('click', social1Link)
    function social1Link() {
        location.href = "https://github.com/87danielbradley/NodeDominance"
    }
    social2.addEventListener('click', social2Link)
    function social2Link() {
        location.href = "https://www.linkedin.com/in/87danielbradley/"
    }
    social3.addEventListener('click', social3Link)
    function social3Link() {
        location.href = "https://87danielbradley.github.io/portfolio/"
    }

    personalLinks.append(social1)
    personalLinks.append(social2)
    personalLinks.append(social3)


    let helpLink = document.getElementById('help');
    let help = document.createElement('button');
    help.className = "help-button";
    help.innerText = "?"
    help.addEventListener("click", helpPage);
    function helpPage() {
        splash.style.zIndex = 100;
        splash.style.opacity = 0.9;
    }

    helpLink.append(help);

    let splash = document.getElementById('splash-page')
    let splashPlay = document.createElement('button')
    splashPlay.className = "splash-button";
    splashPlay.innerText = "Play Game"

    splash.append(splashPlay);

    splashPlay.addEventListener("click", splashPage);
    function splashPage() {
        splash.style.zIndex = -100;
        splash.style.opacity = 0;
    }

    function newGame(numNodes=2) {
        const span = document.getElementById('canvas-span');
        const canvas = document.createElement('CANVAS');
        canvas.height = Game.HEIGHT;
        canvas.width = Game.WIDTH;
        canvas.id= 'paperCanvas';
        span.append(canvas);
        paper.setup('paperCanvas');
        const game = new Game(numNodes);
    }
    newGame();
})