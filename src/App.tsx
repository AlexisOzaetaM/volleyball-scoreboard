import { ArrowLeftRight, RotateCcw } from 'lucide-react';
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
        className="w-1/2 h-full flex flex-col items-center justify-center cursor-pointer select-none"
        style={{ backgroundColor: leftTeam.color }}
        onClick={() => handleIncrement(leftTeamId)}
      >
        <h2 className="text-white text-5xl md:text-7xl font-bold uppercase tracking-wider">
          {leftTeam.name}
        </h2>
      </div>

      {/* Right Side */}
      <div
        className="w-1/2 h-full flex flex-col items-center justify-center cursor-pointer select-none"
        style={{ backgroundColor: rightTeam.color }}
        onClick={() => handleIncrement(rightTeamId)}
      >
        <h2 className="text-white text-5xl md:text-7xl font-bold uppercase tracking-wider">
          {rightTeam.name}
        </h2>
      </div>

      {/* Central Scoreboard */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-6 bg-white/20 backdrop-blur-md px-8 py-4 rounded-full shadow-lg border border-white/30 z-10 pointer-events-none">
        <span className="text-white font-black text-4xl md:text-5xl">
          {leftTeam.sets}
        </span>
        <span className="text-white/80 font-bold text-2xl md:text-3xl">-</span>
        <span className="text-white font-black text-4xl md:text-5xl">
          {rightTeam.sets}
        </span>
      </div>

      {/* Bottom Actions */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 bg-white/20 backdrop-blur-md p-2 rounded-full shadow-lg border border-white/30 z-20">
        <button
          onClick={handleSwap}
          className="p-4 bg-white/20 hover:bg-white/40 active:bg-white/50 text-white rounded-full transition-colors cursor-pointer"
          aria-label="Swap Sides"
        >
          <ArrowLeftRight className="w-8 h-8" />
        </button>
        <button
          onClick={handleReset}
          className="p-4 bg-white/20 hover:bg-white/40 active:bg-white/50 text-white rounded-full transition-colors cursor-pointer"
          aria-label="Reset Game"
        >
          <RotateCcw className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
}
