const Utility = {
    randomPosition(game_width, game_height){
        return [(game_width/30 + Math.floor(Math.random()*(game_width-game_width/30))), 
            (game_height/30 + Math.floor(Math.random()*(game_height-game_height/30)))]
    }
}

module.exports=Utility;