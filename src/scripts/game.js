import Node from "./node.js"
import Edge from "./edge.js"
import * as paper from 'paper'
import Player from "./player"
const Utility = require("./utility.js")

class Game{
    constructor(numNodes=3) {
        this.nodes = [];
        this.edges = [];
        this.legalPaths = [];
        this.players = [new Player(1,"green"),
                        new Player(2, "blue")]
        this.start(numNodes);
        this.activate();
        
    }
    static WIDTH = window.innerWidth*4/5;
    static HEIGHT = window.innerHeight*2/3;
    // static WIDTH = window.innerWidth;
    // static HEIGHT = window.innerHeight;
    static MINIMUM = Math.min(Game.WIDTH, Game.HEIGHT)
    
    start(numNodes) {
       
        for (let i = 0; i < numNodes; i++) {
            this.add(new Node(Utility.randomPosition((Game.MINIMUM), (Game.MINIMUM)), this, 3)); 
        }
    }
    add(object) {  
        //simply adds object to correct path and doesn't perform logic
        
        if (object instanceof Node) {
            this.nodes.push(object);
        } else if (object instanceof Path) {
               
            this.edges.push(object);
            
            
        } 
        
        
    }
    activeNodes() {
        return this.nodes.filter(node => node.capacity());
    }
    activate() {
        let a = this.activeNodes()
        let that = this
            view.onFrame = function(event){  
                let nodeArr = that.activeNodes();
                nodeArr.forEach( node => {
                let color1 = node.object.fillColor.gradient.stops[0];
                let color2 = node.object.fillColor.gradient.stops[1];
                color1.offset = Math.cos(event.time*3)*0.1 + 0.1;
                color2.offset = Math.cos(event.time*3)*0.1 + 0.75;
        })}
    }
    deactivate(){
    }
    visibleObjects() {
        
        return this.nodes.concat(this.edges);
        //returns array of nodes objects [{}, {}]

    }
    //true edge instance
    collisionPath(edge_instance) {
        const paperItems = paper.project.activeLayer.children.filter( child => child.visible && !child.closed);
        const curPath = edge_instance
        for (let i = 0; i < paperItems.length; i++) {
            if (curPath.getIntersections(paperItems[i]).length > 0) {
                edge_instance.visible = false
                return true
            }
        }
        // let pathCollided = paperItems.some(path => {curPath.getIntersections(path).length > 0})
        
        // return pathCollided
        return false
    }

    collisionCount(edge_instance) { 
        const paperItem = paper.project.activeLayer.children;  
        const curEdge = edge_instance
        let that = this;
        let count = 0
        
        let parArr = [];
        
        for (let i = 0; i< paperItem.length; i++) {
            
            if (paperItem[i].visible && paperItem[i] !== curEdge) {
                paper.project.activeLayer.children[1].getIntersections(curEdge.segments[0].path)
                if (paperItem[i].getIntersections(curEdge.segments[0].path).length> 0) {
                    count++;
                    parArr.push(paperItem[i]);
                }
                if (paperItem[i].getIntersections(curEdge.segments[curEdge.segments.length-1].path).length> 0) {
                    count++;
                    parArr.push(paperItem[i]);
                }
                // count += paperItem[i].getIntersections(curEdge.segments[0].path).length;
                // count += paperItem[i].getIntersections(curEdge.segments[curEdge.segments.length-1].path).length;

                // count += curEdge.getIntersections(paperItem[i]).length
                
            }
        }
        const output = [...new Set(parArr)]

        if (parArr.length === 2 && parArr[0].id === parArr[1].id){
            const parentNode = that.nodes.filter(node => node.object.id === parArr[0].id)[0]
            if ([...new Set(parentNode.children.filter(child => child.visible && child.length>0).map(child => child.id))].length <= parentNode.maxChildren-1){
                
                return parArr;
            }
            
            // that.nodes.filter(node => node.object.id === parArr[0].id)[0].maxChildren -= 1
            
        } else {
            
            if (output.length !== 2){
                edge_instance.visible = false
            }
        }
        
        return output ;

        }
    checkCapacity(edge_instance){
        let that = this;
        // 
        let collisions = this.collisionCount(edge_instance)
        let capacity = true
        this.nodes.forEach(node => {
                if (collisions.includes(node.object)) {
                    if (!node.active || [...new Set(node.children.filter(child => child.visible && child.length>0).map(child => child.id))].length > node.maxChildren){
                        capacity = false
                        // 
                    } else {
                        // 
                    }
                    // // const nodeObject = that.nodes.filter(nodeInstance => nodeInstance.object.id === node.object.id)[0]
                    // 
                    // // if ([...new Set(nodeObject.filter(child => child.visible && child.length>0))].length < nodeObject.maxChildren) {
                    
                    //     capacity = false
                    // // }
                    // // edge_instance.visible = false
                } else{
                    // 
                    
                }
            })
            // 
        return capacity
    }

    checkCollisions(edge_instance){ 
        let that = this;
        
        //checks if line intersects with itself or another line
        let collideWithPath = this.collisionPath(edge_instance)

        //finds the number of collisions and ensures two nodes or two connections with initial node
        let collisions = this.collisionCount(edge_instance)

        //ensures each node in collision had space for a new connection
        let capacity = this.checkCapacity(edge_instance)

        // legal move when true
        if(!collideWithPath && collisions.length === 2 && capacity) {
            
            that.legalPaths.push(edge_instance)
            this.nodes.forEach(node => {
                if (collisions.includes(node.object)) {
                    node.addAChild(edge_instance);
                    node.object.bringToFront();
                    if (collisions[0].id === collisions[1].id){
                        node.maxChildren -= 1
                    }
                    
                    if (!node.capacity()){
                        // 
                        node.active = false;
                        node.deactivate()
                    }
                }
            })
            // collisions.forEach(parent => )
            // objects[i].addAChild(edge_instance);
            // objects[i].object.bringToFront();

            //switch player colors after legal move
            let turn = this.players.shift();
            this.players = this.players.concat(turn);

            that.buildNode(edge_instance)
            return true; //meaning good move
        } else {
            // 
            this.nodes.forEach(node => {
                if (collisions.includes(node.object)) {
                    node.remove(edge_instance);
                    node.object.bringToFront();
                    if (node.capacity()){

                        node.activate()
                    }
                }
            })
            
            // if (parentNode.curPath === edge_instance.id){
                edge_instance.visible = false;
                // 
            // redraw all paths in case one is deleted
                // that.legalPaths.forEach(path => that.checkCollisions(path));
                that.legalPaths.forEach(path => {path.visible = true});
                // 
                // that.legalPaths[that.legalPaths.length-1].visible = true;
                // 
            
            return false; //meaning bad move
        }
        
        
        
        
        
            }
            
            // checkCollisions(edge_instance) { 
            //     const objects = this.visibleObjects();  
            //     const curEdge = edge_instance
            //     let that = this;
                
            //     
            //     this.collisionPath(edge_instance)
        
            //     if (objects.every(node => curEdge.getIntersections(node.object).length < 2)) {
            //         
            //     }
        
                
            //     for (let i =0; i < objects.length; i++) {
            //         // let intersections = curEdge.getIntersections(objects[i]); // <===revert
            //         let intersections = curEdge.getIntersections(objects[i].object)
            //          on intersections formula
            //         // if (intersections[0]["point"]['x']) {
                    
                    
            //         if (intersections.length>0) {
                       
            //             // objects[i].selection = true;
            //             // objects[i].fillColor = 'red';
                        
                        
            //             if (!objects[i].object.closed) {
                            
            //                 let edge_idx = that.edges.indexOf(edge_instance);
            //                 if (edge_idx > -1) {
            //                 that.edges.splice(edge_idx,1);
            //                 }
            //                 let node_idx = objects[i].children.indexOf(edge_instance);
            //                 if (node_idx > -1) {
                                
            //                     objects[i].activate()
            //                     objects[i].splice(node_idx,1)
            //                 }
        
            //                 return true;
            //             } 
                        
            //         }
            //         //may need to compare edge vs node
            //         //to do logic check on number of connections
            //     }
            //     for (let i =0; i < objects.length; i++) {
            //         // let intersections = curEdge.getIntersections(objects[i]); // <===revert
            //         let intersections = edge_instance.getIntersections(objects[i].object)
            //          on intersections formula
            //         // if (intersections[0]["point"]['x']) {
                    
            //         if (intersections.length>0) {
                        
            //             // objects[i].fillColor = 'red';
                        
            //             if (objects[i].object.closed) {
            //                 if (!objects[i].children.includes(edge_instance)){
        
            //                 objects[i].addAChild(edge_instance);
            //                 objects[i].object.bringToFront();
            //                 }
            //             } 
                        
            //         } 
            //         //may need to compare edge vs node
            //         //to do logic check on number of connections
            //     }
                
            //     this.buildNode(edge_instance)
            //     return false;
            // }
    moveObjects() {
        //grab all objects and gently shake them
        //if failed attempt
        //At later point I can add draggable nodes
    }

    legalMove(node_instance) { 
        if (!this.checkCollisions(node_instance.children.slice(-1)[0], node_instance)) {
        }// We spliced here to removed child incase of illegal move
    }

    buildNode(edge_instance) {
        let that = this;

        that.nodes.forEach(node => {
                node.deactivate()
            })


        let dottedCircle = new Path.Circle({
            center: view.center,
            radius: Game.MINIMUM/20,
            strokeColor: 'black',
            stokeWidth: 3
        })
        dottedCircle.dashArray = [15, 5];
        dottedCircle.visible = false;
    
        edge_instance.onMouseMove = function(event) {
            let pointOnPath = edge_instance.getNearestPoint(event.point);
            dottedCircle.position = pointOnPath;
            dottedCircle.visible = true;
        }

        edge_instance.onClick = function(event) {




            that.add(edge_instance);
           
            that.add(new Node([event.point.x, event.point.y], that, 2))
            that.nodes.slice(-1)[0].addAChild(edge_instance);
            // that.nodes.slice(-1)[0].addAChild(edge_instance);
            dottedCircle.visible = false;
            edge_instance.onMouseMove = function(event) {
            event.stopPropagation();
            }
            edge_instance.onClick = function(event) {
                console.log(`${edge_instance.id}`)
            }

            that.nodes.forEach(node => {
                if( node.capacity()) {
                    // 
                    node.activate()
                }
            })
        }
    }
}
export default Game;