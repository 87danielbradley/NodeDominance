// import Edge from "./edge";
import Game from "./game.js";
import * as paper from 'paper'

class Node{
    constructor(pos, game_instance, maxChildren = 2) {
        paper.project.activeLayer.activate()
        this.object = new Path.Circle(new Point(pos),Game.WIDTH/20);
        this.maxChildren = maxChildren
        this.active = true
        this.children = []
        this.paths = []
        this.game = game_instance
        this.colorize(); //change color to gradient
        this.activate();

        
       

        
    }

    colorize() {
        this.object.fillColor = {
            gradient: {
                stops: [['yellow',0.01],['green', 0.75],['black', 1]],
                radial: true
            },
                origin: this.object.position,
                destination: this.object.bounds.topLeft
            };
    }
    activate() {
        // let color1 = this.object.fillColor.gradient.stops[0];
        // let color2 = this.object.fillColor.gradient.stops[1];
        
        // view.onFrame = function(event){
        //     
        //     color1.offset = Math.sin(event.time*1)*0.1 + 0.1;
        //     color2.offset = Math.sin(event.time*3)*0.1 + 0.7;
        //     
        // }
        let that = this;
        let tool = new Tool();
        tool.minDistance = 15;
        tool.maxDistance = 40;
        let path;
        this.deactivate()
        
        if (that.active){
            this.object.onMouseEnter = function(event) {
            


                // if (that.capacity()) event.stopPropagation();
                
                that.object.shadowColor = new Color(0.4, 0.4, 1);
                that.object.shadowBlur = 50;
                that.object.shadowOffset = new Point(5, 5);
            }
            this.object.onMouseLeave = function(event) {
                
                that.object.shadowColor = new Color(0, 0, 0);
                that.object.shadowBlur = 0;
                that.object.shadowOffset = new Point(0, 0);
            }
            this.object.onMouseDown = function(event) {
                path = new Path();
                path.strokeColor = that.game.players[0].color;
                path.strokeWidth = 10;
                path.strokeCap = 'round';
                path.strokeJoin = 'round';
                path.shadowColor = new Color(0,0.75,1);
                path.shadowBlur = 30;
                path.shadowOffset = new Point(5,5);
                path.opacity = 0.6;
                path.blendMode = 'multiply';
                // path.add(event.point);
                // let edge = new Edge(that, path);
                // that.addAChild(edge);
                

                //workaround.  if you remove addAChild the propagation never stops
                that.addAChild(path);
                
                // that.test()
                
            }
            this.object.onMouseDrag = function(event) {
                path.add(event.point);
            }
            this.object.onMouseUp = function(event) {
                
                that.children[that.children.length-1].add(event.point)
                that.object.bringToFront();
                that.game.legalMove(that)
                if (!that.capacity()){
                    that.deactivate()
                }
            }
        } else {
            that.deactivate()
        }
    }

    deactivate() {
        let that = this;
        let tool = new Tool();
        let path;
        
        this.object.onMouseEnter = function(event) {
            event.stopPropagation();
        }
        this.object.onMouseLeave = function(event) {
            event.stopPropagation();
        }
        this.object.onMouseDown = function(event) {
            event.stopPropagation();
        }
        this.object.onMouseDrag = function(event) {
            event.stopPropagation();
        }

        this.object.onMouseMove = function(event) {
            event.stopPropagation();
        }
    }
    addAChild(path) {
        
        this.game.add(path);
        if (this.capacity()) {
            this.children.push(path)
        }else{
            
        }
        
    }
    capacity() {
        
        // let visibleChild = this.children.filter(child => child.visible)
        let visibleChild = [...new Set(this.children.filter(child => child.visible).map(child => child.id))]
        
        
        if (visibleChild.length >= this.maxChildren){
            
            this.object.fillColor.gradient.stops = [['red',0.01],['oraange', 0.75],['yellow', 1]]
            this.active = false;
        } else {
            this.object.fillColor.gradient.stops = [['yellow',0.01],['green', 0.75],['black', 1]]
            this.active = true;
            
            
        }
        if (visibleChild.length > 3){
            
        }
        return visibleChild.length <= this.maxChildren;
    }
    remove(edge_instance) {
        this.children.filter(child => child !== edge_instance)
    }
    test(){
        console.log('test')
    }
}
export default Node;