import Node from "./node.js"
import Edge from "./edge.js"
import * as paper from 'paper'
const Utility = require("./utility.js")

class Game{
    constructor(numNodes=3) {
        this.nodes = [];
        this.edges = [];
        this.start(numNodes);
        this.activate();
        
    }
    static WIDTH = window.innerWidth*4/5;
    static HEIGHT = window.innerHeight*2/3;
    start(numNodes) {
        for (let i = 0; i < numNodes; i++) {
            this.add(new Node(Utility.randomPosition((Game.WIDTH*0.75), (75 + Game.HEIGHT*0.75)), this)); //debugger
        }
    }
    add(object) {  
        
        if (object instanceof Node) {
            this.nodes.push(object);
        } else if (object instanceof Edge) {
            if (!this.checkCollisions) {
               
                this.edges.push(object);
            }
        } else {
            debugger
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
        const curPath = edge_instance.startPos
        for (let i = 0; i < paperItems.length; i++) {
            if (curPath.getIntersections(paperItems[i]).length > 0) {
                
                return true
            }
        }
        // let pathCollided = paperItems.some(path => {curPath.getIntersections(path).length > 0})
        
        // return pathCollided
        return false
    }

    collisionCount(edge_instance) { 
        const paperItem = paper.project.activeLayer.children;  
        const curEdge = edge_instance.startPos
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
        
        
        return [...new Set(parArr)] ;
        }

    checkCollisions(edge_instance){ 
        const objects = this.visibleObjects();  
        const curEdge = edge_instance.startPos
        let that = this;
        let collideWithPath = this.collisionPath(edge_instance)
        let collisions = this.collisionCount(edge_instance)
        if(!collideWithPath && collisions.length === 2) {
            //then legal move
            
            this.nodes.forEach(node => {
                if (collisions.includes(node.object)) {
                    node.addAChild(edge_instance);
                    node.object.bringToFront();
                }
            })
            // collisions.forEach(parent => )
            // objects[i].addAChild(edge_instance);
            // objects[i].object.bringToFront();


            that.buildNode(edge_instance)
            return true; //meaning good move
        } else {
            
            this.nodes.forEach(node => {
                if (collisions.includes(node.object)) {
                    node.remove(edge_instance);
                    node.object.bringToFront();
                    node.activate()
                }
            })
            edge_instance.startPos.visible = false;
            return false; //meaning bad move
        }
        
        
        
        
        
            }
            
            // checkCollisions(edge_instance) { 
            //     const objects = this.visibleObjects();  
            //     const curEdge = edge_instance.startPos
            //     let that = this;
                
            //     
            //     this.collisionPath(edge_instance)
        
            //     if (objects.every(node => curEdge.getIntersections(node.object).length < 2)) {
            //         
            //     }
        
                
            //     for (let i =0; i < objects.length; i++) {
            //         // let intersections = curEdge.getIntersections(objects[i]); // <===revert
            //         let intersections = curEdge.getIntersections(objects[i].object)
            //         //debugger on intersections formula
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
                                
            //                     objects[i].activate()//debugger
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
            //         let intersections = edge_instance.startPos.getIntersections(objects[i].object)
            //         //debugger on intersections formula
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
        if (!this.checkCollisions(node_instance.children.slice(-1)[0])) {
        }// We spliced here to removed child incase of illegal move
    }

    buildNode(edge_instance) {
        let that = this;
        let dottedCircle = new Path.Circle({
            center: view.center,
            radius: Game.WIDTH/20,
            strokeColor: 'black',
            stokeWidth: 3
        })
        dottedCircle.dashArray = [15, 5];
        dottedCircle.visible = false;
    
        edge_instance.startPos.onMouseMove = function(event) {
            let pointOnPath = edge_instance.startPos.getNearestPoint(event.point);
            dottedCircle.position = pointOnPath;
            dottedCircle.visible = true;
        }

        edge_instance.startPos.onClick = function(event) {
            that.add(edge_instance);
           
            that.add(new Node([event.point.x, event.point.y], that))
            that.nodes.slice(-1)[0].addAChild(edge_instance);
            that.nodes.slice(-1)[0].addAChild(edge_instance);
            dottedCircle.visible = false;
            edge_instance.startPos.onMouseMove = function(event) {
            event.stopPropagation();
            }
            edge_instance.startPos.onClick = function(event) {
                console.log(`You don't need to click here!`)
            }
        }
    }
}
export default Game;