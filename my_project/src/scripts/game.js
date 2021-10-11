import Node from "./node.js"
const Utility = require("./utility.js")

class Game{
    constructor(numNodes=2) {
        this.nodes = [];
        this.edges = [];
        this.start(numNodes);
        this.activate();
    }
    static BACKGROUND = "#CFCFEA";
    static WIDTH = 1200;
    static HEIGHT = 900;


    start(numNodes) {
        // debugger
        for (let i = 0; i < numNodes; i++) {
            this.add(new Node(Utility.randomPosition((Game.WIDTH*0.75), (75 + Game.HEIGHT*0.75)))); //debugger
        }
    }

    add(object) {
        if (object instanceof Node) {
            this.nodes.push(object);
        } else if (object instanceof Edge) {
            this.edges.push(object);
        } else {
            throw new Error('Unknown Object');
        }
    }
    activeNodes() {
        // console.log('line33')
        // console.log(this.nodes)
        return this.nodes.filter(node => node.children < 3);
    }
    activate() {
        // console.log(paper.activeLayer)
        let a = this.activeNodes()
        debugger
        // view.onFrame = function(event){
        //     this.activeNodes().forEach( node => {
        //     let color1 = node.object.fillColor.gradient.stops[0];
        //     let color2 = node.object.fillColor.gradient.stops[1];
        //     let color3 = node.object.fillColor.gradient.stops[2];
        //     // console.log('working')
        //     color1.offset = Math.sin(event.time*1)*0.1 + 0.1;
        //     color2.offset = Math.sin(event.time*3)*0.1 + 0.7;
        //     // color3.offset = Math.sin(event.time*5)*0.1 + 0.6;
        // })}
    }
    

    visibleObjects() {
        return this.nodes.concat(this.edges);
    }

    checkCollisions() {
        const objects = this.visibleObjects();
        const curEdge = paper.project.activeLayer.lastChild
        for (let i =0; i < objects; i++) {
            let intersections = curEdge.getIntersections(objects[i]);
            //debugger on intersections formula
            if (intersections[0]["_point"]['x']) {
                return true;
            } else {
                return false;
            }
            //may need to compare edge vs node
            //to do logic check on number of connections
        }
    }

    moveObjects() {
        //grab all objects and gently shake them
        //if failed attempt
        //At later point I can add draggable nodes
    }



}













export default Game;