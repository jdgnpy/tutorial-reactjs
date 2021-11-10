import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/* Se dejara de usar la clase Square y se utilizara una funcion
class Square extends React.Component {

  render() {
    return (
      <button 
        className="square" 
        onClick={() => this.props.onClick()} //llama al evento onClick (handleClick)
      > 
        {this.props.value}
      </button>
    );
  }
}
*/ 

function Square(props){
  return(
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}


class Board extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        squares : Array(9).fill(null), //array para guardar los valores de la tabla
      };
    }


    handleClick(i){
      const squares = this.state.squares.slice(); //crea un nuevo array con los mismos datos
      squares[i] = 'X'; //guarda el nuevo value en la posicion (el lugar donde se marco la X)
      this.setState({squares:squares}); //se actualiza el state con el nuevo valor
    }


    renderSquare(i) {
      return (
        <Square 
          value={this.state.squares[i]} //cargo el valor de la celda en value
          onClick={() => this.handleClick(i)} //cargo el handleClick en onClick
        />
      );
    }
  
    render() {
      const status = 'Next player: X';
  
      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
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