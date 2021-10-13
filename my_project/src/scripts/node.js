import Edge from "./edge";

// console.log('inside node class')
class Node{
    // debugger
    constructor(pos, game_instance) {
        paper.project.activeLayer.activate()
        this.object = new Path.Circle(new Point(pos),50);
        // this.object = paper.project.activeLayer.lastChild
        this.children = []
        this.game = game_instance

        // this.paper = paper
        // this.tool = Tool
        
        // view.draw()
        this.colorize();
        //change color to gradient

        // let tool = new Tool();
        // console.log(tool)
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
        // let color3 = this.object.fillColor.gradient.stops[2];
        // console.log(paper.activeLayer)
        // view.onFrame = function(event){
        //     // console.log('working')
        //     color1.offset = Math.sin(event.time*1)*0.1 + 0.1;
        //     color2.offset = Math.sin(event.time*3)*0.1 + 0.7;
        //     // color3.offset = Math.sin(event.time*5)*0.1 + 0.6;
        // }
        let that = this;
        let tool = new Tool();
        let path;
        // console.log(Path)
        this.object.onMouseEnter = function(event) {
            if (that.capacity()) event.stopPropagation();
            // console.log('hovering over node')
            that.object.shadowColor = new Color(0.4, 0.4, 1);
            that.object.shadowBlur = 50;
            that.object.shadowOffset = new Point(5, 5);
        }
        this.object.onMouseLeave = function(event) {
            // console.log('hovering over node')
            that.object.shadowColor = new Color(0, 0, 0);
            that.object.shadowBlur = 0;
            that.object.shadowOffset = new Point(0, 0);
        }
        this.object.onMouseDown = function(event) {
            
            // console.log('clicked')
            // if (that.capacity()) event.stopPropagation();
            //console.log(that.object.getNearestPoint(event.point))
            // edge.object.strokeColor = "green";
            // edge.object.add(event.point);
            // edge.object.smooth 
            path = new Path();
            
            path.strokeColor = 'green';
            path.strokeWidth = 10;
            path.strokeCap = 'round';
            path.strokeJoin = 'round';
            path.shadowColor = new Color(0,0,0);
            path.shadowBlue = 30;
            path.shadowOffset = new Point(5,5);
            path.opacity = 0.6;
            path.blendMode = 'multiply';
            // path.fillColor = 'green';
            path.add(that.object.getNearestPoint(event.point));

            let edge = new Edge(that, path);
            // console.log(that)
            // console.log(edge)
            that.addAChild(edge); //
            
        }
        this.object.onMouseDrag = function(event) {
            // console.log('dragged');
            // if (that.capacity()) event.stopPropagation();
            path.add(event.point);
        }
        this.object.onMouseUp = function(event) {
            // console.log(that) // node class
           
            // that.game.add(that.children.slice(-1)[0]);
            that.object.bringToFront();
            that.game.legalMove(that)
            if (!that.capacity()){
                that.deactivate()
            }
            // console.log(paper.project.activeLayer.lastChild.lastSegment.getPoint())
            // debugger

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
            
        //     // console.log('flag')
            
        //     test.rotate(nearestPoint.angleInDegrees, that.object.position)
        // }
        //////////

    }

    deactivate() {
        let that = this;
        let tool = new Tool();
        let path;
        // console.log(Path)
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
            this.object.fillColor = "red"
            
        } else {
            // console.log(this.capacity())
        }
    }
    
    capacity() {
        return this.children.length < 3;
    }


}













export default Node;