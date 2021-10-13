import Node from "./node.js"
import Edge from "./edge.js"
const Utility = require("./utility.js")

class Game{
    constructor(numNodes=3) {
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
            this.add(new Node(Utility.randomPosition((Game.WIDTH*0.75), (75 + Game.HEIGHT*0.75)), this)); //debugger
        }
    }

    add(object) {
        
        
        if (object instanceof Node) {
            this.nodes.push(object);
        } else if (object instanceof Edge) {
            if (!this.checkCollisions) {
                // debugger
                this.edges.push(object);
            }
        } else {
            throw new Error('Unknown Object');
        }
    
    }
    activeNodes() {
        // console.log('line33')
        // console.log(this.nodes)
        // return this.nodes.filter(node => node.children < 3);
        return this.nodes.filter(node => node.capacity());
    }
    activate() {
        // console.log(paper.activeLayer)
        let a = this.activeNodes()
        // debugger
        let that = this
        // let nodeArr = that.activeNodes();
        // console.log(nodeArr)
        // nodeArr.forEach( node => {
            // node.onFrame = function(event){
            view.onFrame = function(event){
                console.log()
                let nodeArr = that.activeNodes();
                // console.log(nodeArr)
                nodeArr.forEach( node => {
                
                    // debugger
                    // console.log(node)
                let color1 = node.object.fillColor.gradient.stops[0];
                let color2 = node.object.fillColor.gradient.stops[1];
                // let color3 = node.object.fillColor.gradient.stops[2];
                // console.log('working')
                color1.offset = Math.cos(event.time*3)*0.1 + 0.1;
                color2.offset = Math.cos(event.time*3)*0.1 + 0.75;
                // color3.offset = Math.sin(event.time*5)*0.1 + 0.6;
        })}
    }
    deactivate(){

    }
    

    visibleObjects() {
        return this.nodes.concat(this.edges);
    }

    checkCollisions(edge_instance) {
      
        const objects = this.visibleObjects();  //<===revert back to this
        // const objects = paper.project.activeLayer.children
        // debugger
        const curEdge = edge_instance.startPos
        // console.log('68')
        // console.log(paper.project.activeLayer.lastChild)
        // console.log(curEdge)
          
        // console.log(this.visibleObjects())
        console.log(objects.length)
        // debugger
        for (let i =0; i < objects.length; i++) {
            // let intersections = curEdge.getIntersections(objects[i]); // <===revert
            let intersections = curEdge.getIntersections(objects[i].object)
            //debugger on intersections formula
            // if (intersections[0]["point"]['x']) {
            // debugger
            console.log(intersections)
            if (intersections.length>0) {
                // console.log(i)
                // objects[i].selection = true;
                // objects[i].fillColor = 'red';
                console.log(objects)
                // debugger
                if (!objects[i].object.closed) {
                    // debugger
                    return true;
                } 
                
            }
            //may need to compare edge vs node
            //to do logic check on number of connections
        }
        for (let i =0; i < objects.length; i++) {
            // let intersections = curEdge.getIntersections(objects[i]); // <===revert
            let intersections = edge_instance.startPos.getIntersections(objects[i].object)
            //debugger on intersections formula
            // if (intersections[0]["point"]['x']) {
            // debugger
            console.log(intersections)
            if (intersections.length>0) {
                // console.log(i)
                // objects[i].selection = true;
                // objects[i].fillColor = 'red';
                console.log(objects)
                // debugger
                if (objects[i].object.closed) {
                    if (!objects[i].children.includes(edge_instance)){
                    objects[i].addAChild(edge_instance)
                    }
                } 
                
            } 
            //may need to compare edge vs node
            //to do logic check on number of connections
        }

        return false;
    }

    moveObjects() {
        //grab all objects and gently shake them
        //if failed attempt
        //At later point I can add draggable nodes
    }

    legalMove(node_instance) {
        console.log('121')
        
        if (!this.checkCollisions(node_instance.children.slice(-1)[0])) {
        console.log(node_instance.children)
        }// We spliced here to removed child incase of illegal move
    }


}













export default Game;