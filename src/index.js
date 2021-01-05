import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
class Square extends React.Component {

    render() {
        return (
            <button className="square" onClick={() => this.props.onClick()}>
                {this.props.value}
            </button>
        );
    }
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            curPlayerX: true,
        };
    }

    curPlayer(){
        if(this.state.curPlayerX){
            return "X";
        }else{
            return "O";
        }
    }
    renderSquare(i) {
        return <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)} />;
    }

    render() {
        const status = 'Next player: ';

        return (
            <div>
                <div className="status">{status}{this.curPlayer()}</div>
                <div className="board-row">
                    {this.renderSquare(0)}{this.renderSquare(1)}{this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}{this.renderSquare(4)}{this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}{this.renderSquare(7)}{this.renderSquare(8)}
                </div>
            </div>
        );
    }

    handleClick(i) {
        const squares=this.state.squares.slice();//serve per creare una copia quindi rendere immutabile
        if(squares[i] == null){
            squares[i] = this.curPlayer();
            // eslint-disable-next-line react/no-direct-mutation-state
            this.state.curPlayerX = !this.state.curPlayerX;
            this.setState({squares: squares});
        }else{
            alert("Selezionare una casella vuota");
        }
        if(calculateWinner(squares)){
            alert("Il giocatore "+calculateWinner(squares)+" ha vinto");
        }
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);

function calculateWinner(squares){
    const matriceGioco = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for(let i=0; i < matriceGioco.length;i++){
        const [a, b, c] = matriceGioco[i];
        if(squares[a] && squares[a] === squares[b] && squares[b] === squares[c]){
            return squares[a];
        }
    }
    return null;
}
