class Player{
    constructor() {
        this.turn = 'Player 1'
    }

    switch() {
        if (this.turn === 'Player 1') {
            this.turn = 'Player 2'
        } else {
            this.turn = 'Player 1'
        }
    }
}
export default Player;