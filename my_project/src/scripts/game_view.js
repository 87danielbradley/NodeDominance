class GameView{
    constructor(paperObj, game_instance) {
        this.paperObj = paperObj;
        this.game = game_instance;
    }

    start() {
        // debugger
       
        // console.log('in game_view start')
        // let tempTool = new Tool();
		// let tempPath;

		// // Define a mousedown and mousedrag handler
		// tempTool.onMouseDown = function(event) {
		// 	tempPath = new Path();
		// 	tempPath.strokeColor = 'black';
		// 	tempPath.add(event.point);
        //     tempPath.smooth();
		// }

		// tempTool.onMouseDrag = function(event) {
		// 	tempPath.add(event.point);
        //     tempPath.smooth();
		// }

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