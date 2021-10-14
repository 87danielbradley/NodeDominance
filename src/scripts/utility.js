const Utility = {
    randomPosition(game_width, game_height){
        return [(game_width/35+Math.floor(Math.random()*game_width)), 
            (game_height/35+Math.floor(Math.random()*game_height))]
    }
}

module.exports=Utility;