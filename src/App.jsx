import { useRef, useEffect } from 'react';
import initGame from './game/initGame';
import './App.css';

export function App() {
  const game = useRef(null);

  useEffect(() => {
    if (game) {
      initGame(game);
    }
  }, []);

  return <canvas ref={game}></canvas>;
}

export default App;
