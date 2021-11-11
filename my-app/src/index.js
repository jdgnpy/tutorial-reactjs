import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


function Square(props){
  return(
    <button className="square" onClick={props.onClick}> 
      {props.value}
    </button>
  );
}


class Board extends React.Component {
    renderSquare(i) {
      return (
        <Square 
          value={this.props.squares[i]} //cargo el valor de la celda en value
          onClick={() => this.props.onClick(i)} //cargo la funcion onClick
        />
      );
    }
  
    render() {
      return (
        <div>
          {/* <div className="status">{status}</div> */}
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

  //para el historial de movimientos
  constructor(props){
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i){
      
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length -1];
    const squares = current.squares.slice(); //crea un nuevo array con los mismos datos
    
    if(calculateWinner(squares) || squares[i]){ //en caso de que haya un ganador o la celda este con un valor se sale de la funcion
      return;
    }
    
    squares[i] = this.state.xIsNext ? 'X' : 'O'; //guarda el nuevo value en la posicion (el lugar donde se marco la X o O)
    this.setState({
      history: history.concat([{ //se concatena el historial con lo nuevo
        squares:squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext, //se actualiza el state para saber quien sigue
    }); 
  }


  jumpTo(step){
    this.setState({
      stepNumber : step,
      xIsNext: (step % 2) === 0, //se le carga true en caso de que sea par el turno
    });
  }


    render() {
      //cargo los datos a utilizar para el historial y guardo el estado de la partida
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares);


      //step es para el valor del elemento y move es para el index, estos de history
      //luego muestra una lista de botones para poder ir a un movimiento anterior
      const moves = history.map((step, move) => {
        const desc = move ? 'Go to move #' + move : 'Go to game start';
        return(
          <li key = {move}>
            <button onClick={() => this.jumpTo(move)}> {desc} </button>
          </li>
        );
      });


      //verificacion si ya hay ganador o sigue la partida
      let status;
      if (winner) {
        status = "Winner: " + winner;
      } else {
        status = "Next player: " + (this.state.xIsNext ? "X" : "O");
      }


      return (
        <div className="game">
          <div className="game-board">
            <Board 
              // se envian los valores actuales del tablero y el evento click con la pos
              squares ={current.squares}
              onClick={i => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
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
      return squares[a];
    }
  }

  return null;
}