class GameView{
    constructor(paperObj, game_instance) {
        this.paperObj = paperObj;
        this.game = game_instance;
    }

    start() {
        // debugger
       
        console.log('in game_view start')
        let tool = new Tool();
		let path;

		// Define a mousedown and mousedrag handler
		tool.onMouseDown = function(event) {
			path = new Path();
			path.strokeColor = 'black';
			path.add(event.point);
            path.smooth();
		}

		tool.onMouseDrag = function(event) {
			path.add(event.point);
            path.smooth();
		}

// function paper.project.view.onMouseDrag(event) {
// 	var path = new paper.Path();
// 	path.strokeColor = 'black';
// 	var vector = event.delta;

// 	// rotate the vector by 90 degrees:
// 	vector.angle += 90;

// 	// change its length to 5 pt:
// 	vector.length = 5;
	
// 	path.add(paper.project.event.middlePoint + vector);
// 	path.add(paper.projectevent.middlePoint - vector);
// }
    }
}













export default GameView;