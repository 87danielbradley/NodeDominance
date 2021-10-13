
import Game from "./scripts/game.js"
import GameView from "./scripts/game_view.js"

paper.install(window)
document.addEventListener("DOMContentLoaded", () => {
    











    const canvas = document.getElementById("paperCanvas")
    canvas.height = Game.HEIGHT;
    canvas.width = Game.WIDTH;
    
    paper.setup('paperCanvas');

    const game = new Game()
    const gameView = new GameView(paper, game);
    gameView.start();

})