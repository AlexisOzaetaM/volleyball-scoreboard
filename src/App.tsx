import { ArrowLeftRight, Plus, RotateCcw } from 'lucide-react';
import { useDrag } from '@use-gesture/react';
import { useScoreStore } from './store/useScoreStore';
import { Card } from '@/components/ui/card';

export default function App() {
  const store = useScoreStore();

  const bindLeft = useDrag(({ swipe: [, swipeY], tap }) => {
    if (tap) {
      store.incrementScore(store.layout.left);
    } else if (swipeY === -1) {
      store.incrementScore(store.layout.left); // Swipe up
    } else if (swipeY === 1) {
      store.decrementScore(store.layout.left); // Swipe down
    }
  }, { filterTaps: true });

  const bindRight = useDrag(({ swipe: [, swipeY], tap }) => {
    if (tap) {
      store.incrementScore(store.layout.right);
    } else if (swipeY === -1) {
      store.incrementScore(store.layout.right); // Swipe up
    } else if (swipeY === 1) {
      store.decrementScore(store.layout.right); // Swipe down
    }
  }, { filterTaps: true });

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
        {...bindLeft()}
        className="w-1/2 h-full flex flex-col items-center justify-center cursor-pointer select-none touch-none"
        style={{ backgroundColor: leftTeam.color }}
      >
        <h2 className="text-white/80 text-4xl md:text-5xl font-bold uppercase tracking-wider">
          {leftTeam.name}
        </h2>
        <span className="text-white text-[15rem] md:text-[14rem] font-black leading-none">
          {leftTeam.score}
        </span>
      </div>

      {/* Right Side */}
      <div
        {...bindRight()}
        className="w-1/2 h-full flex flex-col items-center justify-center cursor-pointer select-none touch-none"
        style={{ backgroundColor: rightTeam.color }}
      >
        <h2 className="text-white/80 text-4xl md:text-5xl font-bold uppercase tracking-wider">
          {rightTeam.name}
        </h2>
        <span className="text-white text-[15rem] md:text-[14rem] font-black leading-none">
          {rightTeam.score}
        </span>
      </div>

      {/* Central Scoreboard */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-white/20 backdrop-blur-md px-6 py-2 rounded-full shadow-lg border border-white/30 z-10">
        <span
          className="text-white font-black text-4xl md:text-4xl cursor-pointer hover:scale-110 transition-transform select-none"
          onClick={() => store.addSet(leftTeamId)}
        >
          {leftTeam.sets}
        </span>
        <span className="text-white/80 font-bold text-2xl md:text-3xl select-none">-</span>
        <span
          className="text-white font-black text-4xl md:text-4xl cursor-pointer hover:scale-110 transition-transform select-none"
          onClick={() => store.addSet(rightTeamId)}
        >
          {rightTeam.sets}
        </span>
      </div>

      {/* Bottom Actions */}
      <Card className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-row items-center gap-4 bg-white/20 backdrop-blur-md p-2 rounded-full shadow-lg border-white/30 z-20">
        <button
          onClick={handleReset}
          className="p-2 bg-white/20 hover:bg-white/40 active:bg-white/50 text-white rounded-full transition-colors cursor-pointer"
          aria-label="Reset Game"
        >
          <Plus className="w-6 h-6" />
        </button>
        <button
          onClick={handleSwap}
          className="p-2 bg-white/20 hover:bg-white/40 active:bg-white/50 text-white rounded-full transition-colors cursor-pointer"
          aria-label="Swap Sides"
        >
          <ArrowLeftRight className="w-6 h-6" />
        </button>
      </Card>
    </div>
  );
}
