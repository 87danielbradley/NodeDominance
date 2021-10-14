import Edge from "./edge";
import Game from "./game.js";


class Node{
    
    constructor(pos, game_instance) {
        paper.project.activeLayer.activate()
        
        this.object = new Path.Circle(new Point(pos),Game.WIDTH/20);
        // this.object = paper.project.activeLayer.lastChild
        this.children = []
        this.game = game_instance

        this.colorize();
        //change color to gradient

        this.activate();
        
       

        
    }

    colorize() {
        // this.object.fillColor = 'green'; // working

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
        
        this.object.onMouseEnter = function(event) {
            if (that.capacity()) event.stopPropagation();
            
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
            
           
            // if (that.capacity()) event.stopPropagation();
            
            // edge.object.strokeColor = "green";
            // edge.object.add(event.point);
            // edge.object.smooth 
            path = new Path();
            
            path.strokeColor = 'green';
            path.strokeWidth = 10;
            // path.fillColor = "green";
            path.strokeCap = 'round';
            path.strokeJoin = 'round';
            path.shadowColor = new Color(0,0.75,1);
            path.shadowBlur = 30;
            path.shadowOffset = new Point(5,5);
            path.opacity = 0.6;
            path.blendMode = 'multiply';
            // path.fillColor = 'green';
            // path.add(that.object.getNearestPoint(event.point)); //snaps to edge, creates 2 contact points
            path.add(event.point);

            let edge = new Edge(that, path);
            
            that.addAChild(edge); //
            
        }
        this.object.onMouseDrag = function(event) {
            
            // if (that.capacity()) event.stopPropagation();
            path.add(event.point);
            
        }
        this.object.onMouseUp = function(event) {
           
           
            // that.game.add(that.children.slice(-1)[0]);
            that.object.bringToFront();
            that.game.legalMove(that)
            if (!that.capacity()){
                that.deactivate()
            }
           
            

        }

        /////////////may remove
        // let rectangle = new Rectangle(new Point(-1,-1), new Point(40,20));
        // let radius = new Size(10,10);
        // let recPath = new Path.Rectangle(rectangle, radius);
        // recPath.rotate(180)
        // recPath.fillColor = 'yellow';
        // recPath.bounds.bottomCenter;
        
        // let test = new Group();
        // test.addChild(recPath);
        // test.transformContent = false;
        


        // this.object.onMouseMove = function(event) {
        //     // Get the nearest point from the mouse position
        //     // to the star shaped path:
        //     // debugger
        //     var nearestPoint = that.object.getNearestPoint(event.point);

        //     // Move the red circle to the nearest point:
        //     // debugger
        //     recPath.position = nearestPoint;
        //     // recPath.applyMatrix = false;
            
        
            
        //     test.rotate(nearestPoint.angleInDegrees, that.object.position)
        // }
        //////////

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

    addAChild(object) {
        this.game.add(object);
        this.children.push(object);
        if (!this.capacity()) {
            
            this.object.fillColor.gradient.stops = [['red',0.01],['oraange', 0.75],['yellow', 1]]
              
            // this.object.fillColor = "red"
            
            
        } else {
           
        }
    }
    
    capacity() {
        return this.children.length < 3;
    }


}













export default Node;