import Edge from "./edge";

console.log('inside node class')
class Node{
    debugger
    constructor(pos) {
        paper.project.activeLayer.activate()
        this.object = new Path.Circle(new Point(pos),50);
        // this.object = paper.project.activeLayer.lastChild
        this.children = []

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
        console.log(Path)
        this.object.onMouseEnter = function(event) {
            if (that.capacity()) event.stopPropagation();
            console.log('hovering over node')
            that.object.shadowColor = new Color(0.4, 0.4, 1);
            that.object.shadowBlur = 50;
            that.object.shadowOffset = new Point(5, 5);
        }
        this.object.onMouseLeave = function(event) {
            console.log('hovering over node')
            that.object.shadowColor = new Color(0, 0, 0);
            that.object.shadowBlur = 0;
            that.object.shadowOffset = new Point(0, 0);
        }
        this.object.onMouseDown = function(event) {
            
            console.log('clicked')
            // if (that.capacity()) event.stopPropagation();
            //console.log(that.object.getNearestPoint(event.point))
            // edge.object.strokeColor = "green";
            // edge.object.add(event.point);
            // edge.object.smooth 
            path = new Path();
            path.stokeColor = 'green';
            path.add(that.object.getNearestPoint(event.point));

            var edge = new Edge(that, path); //
        }
        this.object.onMouseDrag = function(event) {
            console.log('dragged')
            // if (that.capacity()) event.stopPropagation();
            path.add(event.point);
        }

        ////borrowed to understand nearest point
 


    }

    deactivate() {

    }

    addChild(object) {
        this.children.push(object);
        if (this.capacity) {
            this.object.fillColor = "red"
        }
    }
    
    capacity() {
        return this.children.length < 3;
    }


}













export default Node;