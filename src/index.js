
import Game from "./scripts/game.js"
import GameView from "./scripts/game_view.js"

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

    formButton.append(formField)


    myUL.append(restartButton);
    myUL.append(formButton);


  

     let colorScheme = document.getElementById("color-scheme");
     let scheme1 = document.createElement('button')
     scheme1.className = 'colorScheme1'
     let scheme2 = document.createElement('button')
     scheme1.className = 'colorScheme2'
     let scheme3 = document.createElement('button')
     scheme1.className = 'colorScheme3'


     colorScheme.append(scheme1)
     colorScheme.append(scheme2)
     colorScheme.append(scheme3)

    let personalLinks = document.getElementById('personal-links');
    let social1 = document.createElement('button')
    social1.className = "github"
    let social2 = document.createElement('button')
    social2.className = "linkedIn"
    let social3 = document.createElement('button')
    social3.className = "porfolio"

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
        splash.style.opacity = 0.75;
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


    // const canvas = document.getElementById("paperCanvas")
    // canvas.height = Game.HEIGHT;
    // canvas.width = Game.WIDTH;
    
    // paper.setup('paperCanvas');
    // const game = new Game()
    newGame()
    // const gameView = new GameView(paper, game);
    // gameView.start();

})