const Utility = {
    randomPosition(game_width, game_height){
        return [(50+Math.floor(Math.random()*game_width)), 
            (50+Math.floor(Math.random()*game_height))]
    }
}

module.exports=Utility;