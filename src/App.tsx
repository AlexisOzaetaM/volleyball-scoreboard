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

  const leftTeamId = store.layout.left;
  const rightTeamId = store.layout.right;
  const leftTeam = store.teams[leftTeamId];
  const rightTeam = store.teams[rightTeamId];

  return (
    <div className="flex w-screen h-screen relative overflow-hidden">
      {/* Left Side */}
      <div
        className="w-1/2 h-full flex flex-col items-center pt-8"
        style={{ backgroundColor: leftTeam.color }}
        onClick={() => handleIncrement(leftTeamId)}
      >
        <h2 className="text-white text-4xl font-bold uppercase tracking-wider">
          {leftTeam.name}
        </h2>
      </div>

      {/* Right Side */}
      <div
        className="w-1/2 h-full flex flex-col items-center pt-8"
        style={{ backgroundColor: rightTeam.color }}
        onClick={() => handleIncrement(rightTeamId)}
      >
        <h2 className="text-white text-4xl font-bold uppercase tracking-wider">
          {rightTeam.name}
        </h2>
      </div>

      {/* Central Scoreboard */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-white/20 backdrop-blur-md px-6 py-3 rounded-full shadow-lg border border-white/30 z-10 pointer-events-none">
        <span className="text-white font-bold text-2xl">
          {leftTeam.sets}
        </span>
        <span className="text-white/80 font-bold text-xl">-</span>
        <span className="text-white font-bold text-2xl">
          {rightTeam.sets}
        </span>
      </div>

      {/* Debug Data (Temporary) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/80 p-2 rounded text-xs opacity-50 z-20">
        <button className="mr-2 underline" onClick={handleSwap}>Swap</button>
        <button className="underline" onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}
