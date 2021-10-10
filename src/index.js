import Node from "./scripts/node.js";
import User from "./scripts/user.js";
import Edge from "./scripts/edge.js";
import Game from "./scripts/game.js";
import GameView from "./scripts/game_view.js"
import MovingObject from "./scripts/moving_object.js";
import * as paper from "./scripts/paper.js";
import { Path, Point, Tool } from "paper/dist/paper-core";

paper.install(window)
document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById('myCanvas');
    paper.setup(canvas);
    canvas.height = Game.DIM_X;
    canvas.width = Game.DIM_Y;
    const paperObj = paper;
    const canvasObj = canvas.getContext('2d');
    const game = new Game();

    const gameView = new GameView(paperObj, canvasObj, game);
    gameView.start();

    console.log(canvas)
    console.log(paper)

    console.log()
    // let tool = new Tool();

    // myTool.onMouseDown = function (event) {
	console.log('You dragged the mouse!');
// }

    // myTool.onMouseUp = function (event) {
	console.log('You released the mouse!');
// }

// console.log(paper.project.view)
// console.log(paperScope.project)








    
    console.log('intital load working')












})