import { useRef, useEffect, useState } from 'react';
import initGame from './game/initGame';
import './App.css';

export function App() {
  const [count, setCount] = useState(0);
  const game = useRef(null);

  useEffect(() => {
    if (game) {
      initGame(game);
    }
  }, []);

  const onClick = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={onClick}>Click</button>
      <canvas ref={game}></canvas>;
    </div>
  );
}

export default App;
