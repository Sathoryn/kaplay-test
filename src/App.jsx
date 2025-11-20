import { useRef, useEffect } from 'react';
import { atom, useAtom } from 'jotai';
import initGame from './game/initGame';
import './App.css';

const counter = atom(0);

export function App() {
  const [count, setCounter] = useAtom(counter);
  const game = useRef(null);

  useEffect(() => {
    if (game) {
      initGame(game, setCounter);
    }
  }, [setCounter]);

  const onClick = () => {
    setCounter(count + 1);
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
