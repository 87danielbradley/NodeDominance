import Node from "./scripts/node.js";
import User from "./scripts/user.js";
import Edge from "./scripts/edge.js";
import MovingObject from "./scripts/moving_object.js";
import * as paper from "./scripts/paper.js";
import { Path, Point } from "paper/dist/paper-core";

document.addEventListener("DOMContentLoaded", () => {
    var canvas = document.getElementById('myCanvas');
    // Create an empty project and a view for the canvas:
    paper.setup(canvas);
    // Create a Paper.js Path to draw a line into it:
    // var path = new paper.Path();
    // // Give the stroke a color
    // path.strokeColor = 'black';
    // var start = new paper.Point(100, 100);
    // // Move to start and draw a line from there
    // path.moveTo(start);
    // // Note that the plus operator on Point objects does not work
    // // in JavaScript. Instead, we need to call the add() function:
    // path.lineTo(start.add([ 200, -50 ]));
    // Draw the view now:

//     let myPath = new paper.Path();
//         myPath.strokeColor = 'black';
//         myPath.add(new Point(20,20), new Point(40,60), new Point(55,22));
//         myPath.strokeWidth = 10;
//         myPath.strokeCap = 'round';
//         myPath.strokJoin = 'round';
//         myPath.smooth();
//     let path1 = new paper.Path();
//         path1.strokeColor = 'red';
//         path1.add(new Point(0,0), new Point(100,100));
//     let path2 = new paper.Path();
//         path2.strokeColor = 'green';
//         path2.add(new Point(0,100), new Point(100,0));
    
//     let intersections = path1.getIntersections(myPath)
//     console.log(intersections[0]["_point"]['x'])
//     console.log(intersections[0]["_point"]['y'])
//     console.log(intersections)

//     var path;
// function onMouseDown(event) {
//     // If we already made a path before, deselect it:
//     if (path) {
//         path.selected = false;
//     }

//     // Create a new path and add the position of the mouse
//     // as its first segment. Select it, so we can see the
//     // segment points:
//     path = new paper.Path({
//         segments: [event.point],
//         strokeColor: 'black',
//         selected: true
//     });
// }

// function onMouseDrag(event) {
//     // On every drag event, add a segment to the path
//     // at the position of the mouse:
//     path.add(event.point);
// }

// function onMouseUp(event) {
//     // When the mouse is released, simplify the path:
//     path.simplify();
//     path.selected = false;
// }
// onMou
// function onMouseDown(event) {
// 	console.log('You pressed the mouse!');
// }

// function onMouseDrag(event) {
// 	console.log('You dragged the mouse!');
// }

// function onMouseUp(event) {
// 	console.log('You released the mouse!');
// } 

//     // paper.view.draw();
// var myPath = new paper.Path();
// myPath.strokeColor = 'black';

// // This function is called whenever the user
// // clicks the mouse in the view:
// function onMouseDown(event) {
// 	// Add a segment to the path at the position of the mouse:
// 	myPath.add(event.point);
// }
// function paper.project.view.onMouseDown(event) {
// 	console.log('You pressed the mouse!');
// }

paper.project.view.onMouseDown = function (event) {
	console.log('You dragged the mouse!');
}

paper.project.view.onMouseUp = function (event) {
	console.log('You released the mouse!');
}

console.log(paper.project.view)
// console.log(paperScope.project)








    
    console.log('intital load working')












})