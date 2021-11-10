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
        xIsNext: true, //para saber de quien es el turno y tambien para setear el primer movimiento a X
      };
    }


    handleClick(i){
      const squares = this.state.squares.slice(); //crea un nuevo array con los mismos datos
      squares[i] = this.state.xIsNext ? 'X' : 'O'; //guarda el nuevo value en la posicion (el lugar donde se marco la X o O)
      this.setState({
        squares:squares, //se actualiza el state para saber los datos del tablero
        xIsNext: !this.state.xIsNext, //se actualiza el state para saber quien sigue
      }); 
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
      
      //se verifica si hay algun ganador, en caso de que no, se muestra el turno del siguiente
      const winner = calculateWinner(this.state.squares);
      let status;
      if(winner){
        status = 'Winner ' + winner;
      }else{
        status = 'Next player: '+ (this.state.xIsNext ? 'X' : 'O');
      }

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


function calculateWinner(squares){
  const lines = [ //array con las formas posibles para ganar
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ];

  for(let i= 0; i< lines.length; i++){ //recorre el array de lines
    const [a,b,c] = lines[i]; //cargo los valores de cada fila en cada variable
    
    // verifica si los valores son iguales en las posiciones de las filas del array lines
    // ej: si X esta en las posiciones a=0, b=3 y c=6 (diagonal, linea 4 del array lines)
    // entonces retorna X
    // asi hasta encontrar alguno que encaje el mismo valor en las 3 posiciones
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){ 
      return squares [a];
    }
  }

  return null;
}