import { useScoreStore, type TeamId } from './store/useScoreStore';

export default function App() {
  const store = useScoreStore();

  const handleIncrement = (teamId: TeamId) => {
    store.incrementScore(teamId);
  };

  const handleSwap = () => {
    store.swapSides();
  };

  const handleReset = () => {
    store.resetGame();
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Volleyball Scoreboard</h1>

      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <button onClick={() => handleIncrement('teamA')}>+1 Team A</button>
        <button onClick={() => handleIncrement('teamB')}>+1 Team B</button>
        <button onClick={handleSwap}>Swap Sides</button>
        <button onClick={handleReset}>Reset</button>
      </div>

      <pre style={{ background: '#f4f4f4', padding: '15px', borderRadius: '5px' }}>
        {JSON.stringify({ teams: store.teams, layout: store.layout }, null, 2)}
      </pre>
    </div>
  );
}
