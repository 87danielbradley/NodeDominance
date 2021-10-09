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

    let myPath = new paper.Path();
        myPath.strokeColor = 'black';
        myPath.add(new Point(20,20), new Point(40,60), new Point(55,22));
        myPath.strokeWidth = 10;
        myPath.strokeCap = 'round';
        myPath.strokJoin = 'round';
        myPath.smooth();
    let path1 = new paper.Path();
        path1.strokeColor = 'red';
        path1.add(new Point(0,0), new Point(100,100));
    let path2 = new paper.Path();
        path2.strokeColor = 'green';
        path2.add(new Point(0,100), new Point(100,0));
    
    let intersections = path1.getIntersections(path2)
    console.log(intersections[0]["_point"]['x'])
    console.log(intersections[0]["_point"]['y'])
    

    paper.view.draw();













    
    console.log('intital load working')












})