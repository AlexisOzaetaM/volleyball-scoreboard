import { ArrowLeftRight, Plus, RotateCcw } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useDrag } from '@use-gesture/react';
import { useScoreStore } from './store/useScoreStore';
import { Card } from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export default function App() {
  const store = useScoreStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const prevTotalScore = useRef(0);

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

  const totalScore = leftTeam.score + rightTeam.score;

  useEffect(() => {
    if (totalScore > prevTotalScore.current) {
      if (totalScore === 21) {
        // Use timeout to avoid synchronous state update in effect during render phase
        setTimeout(() => {
          setModalMessage('¡Tiempo Técnico (TTO) y Cambio de Cancha!');
          setIsModalOpen(true);
        }, 0);
      } else if (totalScore % 7 === 0 && totalScore > 0) {
        setTimeout(() => {
          setModalMessage('¡Cambio de Cancha!');
          setIsModalOpen(true);
        }, 0);
      }
    }
    prevTotalScore.current = totalScore;
  }, [totalScore]);

  const handleModalOpenChange = (open: boolean) => {
    if (!open) {
      setIsModalOpen(false);
      store.swapSides();
    }
  };

  return (
    <div className='bg-white'>
      {/* Portrait Warning Overlay */}
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-zinc-900 text-white p-6 text-center landscape:hidden">
        <RotateCcw className="w-16 h-16 mb-4 animate-spin-slow" />
        <h2 className="text-2xl font-bold mb-2">Por favor, gira tu dispositivo</h2>
        <p className="text-zinc-400">El marcador está diseñado para verse en modo horizontal.</p>
      </div>

      <div className="bg-white flex w-screen h-[100dvh] fixed inset-0 overflow-hidden portrait:hidden">
        {/* Left Side */}
        <div
          {...bindLeft()}
          className="w-1/2 h-full flex flex-col items-center justify-center cursor-pointer select-none touch-none"
          style={{ backgroundColor: leftTeam.color }}
        >
          <h2 className="text-white text-4xl md:text-5xl font-bold uppercase tracking-wider">
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
          <h2 className="text-white text-4xl md:text-5xl font-bold uppercase tracking-wider">
            {rightTeam.name}
          </h2>
          <span className="text-white text-[15rem] md:text-[14rem] font-black leading-none">
            {rightTeam.score}
          </span>
        </div>

        {/* Central Scoreboard */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-white backdrop-blur-md px-6 py-2 rounded-full shadow-lg border border-white/30 z-10">
          <span
            className="font-black text-4xl md:text-4xl cursor-pointer hover:scale-110 transition-transform select-none"
            onClick={() => store.addSet(leftTeamId)}
            style={{ color: leftTeam.color }}
          >
            {leftTeam.sets}
          </span>
          <span className="text-black font-bold text-2xl md:text-3xl select-none">-</span>
          <span
            className="text-white font-black text-4xl md:text-4xl cursor-pointer hover:scale-110 transition-transform select-none"
            onClick={() => store.addSet(rightTeamId)}
            style={{ color: rightTeam.color }}
          >
            {rightTeam.sets}
          </span>
        </div>

        {/* Bottom Actions */}
        <Card className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-row items-center gap-4 bg-white backdrop-blur-md p-2 rounded-full shadow-lg border-white/30 z-20">
          <button
            onClick={handleReset}
            className="p-2 bg-white hover:bg-white active:bg-white text-white rounded-full transition-colors cursor-pointer"
            aria-label="Reset Game"
          >
            <Plus className="w-6 h-6" color='black' />
          </button>
          <button
            onClick={handleSwap}
            className="p-2 bg-white hover:bg-white active:bg-white text-white rounded-full transition-colors cursor-pointer"
            aria-label="Swap Sides"
          >
            <ArrowLeftRight className="w-6 h-6" color='black' />
          </button>
        </Card>
      </div>

      <AlertDialog open={isModalOpen} onOpenChange={handleModalOpenChange}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl text-center">Interrupción de Juego</AlertDialogTitle>
            <AlertDialogDescription className="text-xl text-center font-semibold text-black mt-4">
              {modalMessage}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="sm:justify-center mt-6">
            <AlertDialogAction className="w-full sm:w-auto text-lg px-8">OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
